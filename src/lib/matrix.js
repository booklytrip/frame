/**
 * Small utility that helps to generate matrix like tables (or pivot tables).
 *
 * NOTE: Matrix does not perform values aggregation, the array will be returned.
 */

import {
    isEmpty,
    indexOf,
    has,
    get,
    set,
    each,
    castArray,
    min,
    max,
    compact,
    chain,
} from 'lodash';

class Matrix {
    /**
     * @param {Array} rows    - A row headers
     * @param {Array} columns - A column headers
     */
    constructor({ rows, columns } = {}) {
        this._data = {};
        this._min = null;
        this._max = null;
        this._rows = rows;
        this._columns = columns;
    }

    /**
     * Add value to specified row and column
     *
     * @param {String} row    - A row name
     * @param {String} column - A column name
     * @param {Mix}    value  - A value to add
     */
    add({ row, column, value }) {
        if (!isEmpty(this._rows) && indexOf(this._rows, row) === -1) {
            throw new Error(`Trying to add value to undefined row "${row}"`);
        }

        if (indexOf(this._columns, column) === -1) {
            throw new Error(`Trying to add value to undefined column "${column}"`);
        }

        if (!has(this._data, compact([row, column]))) {
            set(this._data, compact([row, column]), []);
        }

        each(castArray(value), item => {
            get(this._data, compact([row, column])).push(item);
            this._min = min([this._min, item]);
            this._max = max([this._max, item]);
        });
    }

    result() {
        return {
            data: this._data,
            min: this._min,
            max: this._max,
            rows: this._rows,
            columns: this._columns,
        };
    }
}

/**
 * Returns list of values filter by specified criterias
 *
 * @param {Array}  data   - An array to process
 * @param {Object} filter - Filter to apply on data array
 */
const getValues = (data, filter) => (
    chain(data).filter(filter).map(item => item['value']).value()
);

/**
 * Generator takes raw data and push it to the matrix. The matrix
 * will be return as a result.
 *
 * @param {Array}  data    - An array of objects
 * @param {String} columns - Predefined list of columns
 * @param {String} rows    - Predefined list of rows
 */
const generate = ({
    data,
    rows,
    columns,
}) => {
    const matrix = new Matrix({
        rows,
        columns,
    });

    // Populate matrix with data
    if (rows) {
        each(rows, row => {
            each(columns, column => {
                matrix.add({
                    row,
                    column,
                    value: getValues(data, { row, column }),
                });
            });
        });
    } else {
        each(columns, column => {
            matrix.add({
                column,
                value: getValues(data, { column }),
            });
        });
    }

    return matrix.result();
};

export {
    Matrix,
    generate,
};
