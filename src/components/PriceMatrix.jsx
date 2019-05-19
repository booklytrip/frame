/**
 * @flow
 */

import React, { Component } from 'react';
import classNames from 'classnames';
import { isEmpty, min as minValue, map } from 'lodash';
import { generate } from '../lib/matrix';
import { format as formatDate } from 'date-fns';

import { Popup } from 'semantic-ui-react';

type CellType = 'th' | 'td';

type PriceMatrixHeaderCellProps = {
    type: CellType,
    value: string,
    isActive: boolean,
    nthChild?: number,
};

type CellPointer = {
    row: string,
    column: string,
};

type PriceMatrixCellProps = {
    row: string,
    column: string,
    data: Array<number>,
    min: number,
    valuePrefix: string,
    active: CellPointer,
    current: CellPointer,
    onHover: Function,
    onClick: Function,
};

type PriceMatrixRowProps = {
    row: string,
    data: Object,
    active: CellPointer,
};

type PriceMatrixTableProps = {
    data: Array<any>,
    columns: Array<string>,
    rows: Array<string>,
    columnLabel: string,
    rowLabel: string,
};

type PriceMatrixProps = {
    onClick: Function,
    columns: Array<string>,
    rows: Array<string>,
    current: CellPointer,
    loading: boolean,
    prices: Array<any>,
    columnHeader: string,
    rowHeader: string,
    valuePrefix: string,
    columnLabel: Array<string>,
    rowLabel: Array<string>,
};

const DATE_FORMAT = 'ddd, D MMM';

const styles = {
    container: {
        padding: 0,
    },
    hover: {
        background: 'rgba(0,0,0,.08)',
        color: 'rgba(0,0,0,.8)',
    },
    current: {
        background: 'rgba(33, 133, 208, 0.8)',
        color: 'rgb(255, 255, 255)',
    },
    cell: {
        cursor: 'pointer',
    },
    thCell: {
        borderTop: '1px solid rgba(34,36,38,.15)',
        boxShadow: '0px -1px 0 0px #FFF',
    },
    thRoundedCell: {
        borderRadius: '3px 0px 0px 0px',
    },
    columnLabel: {
        border: 0,
        background: 'transparent',
        boxShadow: '0 0px 0 1px #FFF',
        color: 'rgba(0,0,0,.4)',
        fontWeight: 400,
        borderRadius: 0,
    },
    lowestPrice: {
        color: '#9c0',
        background: 'rgba(153,204,0,0.1)',
        fontWeight: 600,
    },
};

/**
 * Single header cell which is highlighted when is set as active.
 */
const PriceMatrixHeaderCell = ({
    type,
    value,
    isActive,
    nthChild,
}: PriceMatrixHeaderCellProps) =>
    React.createElement(type, {
        children: formatDate(value, DATE_FORMAT),
        style: {
            ...(type === 'th' && styles.thCell),
            ...(isActive && styles.hover),
            ...(nthChild === 0 && styles.thRoundedCell),
        },
    });

/**
 * Single cell that represents value
 */
const PriceMatrixCell = ({
    row,
    column,
    data,
    min,
    valuePrefix,
    active,
    current,
    onHover,
    onClick,
}: PriceMatrixCellProps) => {
    const isCurrent =
        current && current.column === column && current.row === row;
    const isActive = active && active.row === row && active.column === column;
    const lowestPrice = data && minValue(data) === min;

    return (
        <Popup
            content={lowestPrice ? 'The lowest price' : null}
            position="top center"
            size="small"
            inverted
        >
            <td
                className="center aligned"
                style={{
                    ...styles.cell,
                    ...(isActive && styles.hover),
                    ...(isCurrent && styles.current),
                    ...(lowestPrice && styles.lowestPrice),
                }}
                onMouseEnter={() => onHover({ row, column })}
                onMouseLeave={() => onHover({ row: null, column: null })}
                onClick={e => {
                    e.preventDefault();
                    onClick({
                        departureDate: column,
                        returnDate: row,
                    });
                }}
            >
                {isEmpty(data)
                    ? <i
                          className={classNames('search icon', {
                              grey: !isCurrent,
                              white: isCurrent,
                          })}
                      />
                    : <span>
                          {valuePrefix && <span>{valuePrefix}&nbsp;</span>}
                          {minValue(data)}
                      </span>}
            </td>
        </Popup>
    );
};

/**
 * Row component which renders list of cells
 */
const PriceMatrixRow = ({
    row,
    data,
    active,
    ...props
}: PriceMatrixRowProps) => (
    <tr>
        <PriceMatrixHeaderCell
            type="td"
            value={row}
            isActive={row === active.row}
        />

        {map(data, (columns, column) => (
            <PriceMatrixCell
                {...props}
                key={column}
                data={columns}
                row={row}
                column={column}
                active={active}
            />
        ))}
    </tr>
);

/**
 * Table component renders table and manage hovering
 */
class PriceMatrixTable extends Component {
    props: PriceMatrixTableProps;

    state: {
        activeRow: string,
        activeColumn: string,
    };

    onHover: Function;

    constructor(props: PriceMatrixTableProps) {
        super(props);
        this.state = {
            activeRow: null,
            activeColumn: null,
        };

        this.onHover = this.onHover.bind(this);
    }

    onHover({ row: activeRow, column: activeColumn }) {
        this.setState({
            activeRow,
            activeColumn,
        });
    }

    render() {
        const { data, columns, rows, columnLabel, rowLabel } = this.props;
        const { activeRow, activeColumn } = this.state;

        const matrix = generate({ data, columns, rows });

        return (
            <table
                className={classNames('ui celled table', {
                    definition: rows,
                })}
            >
                <thead>
                    {columnLabel
                        ? <tr>
                              {rows && <th />}
                              <th
                                  colSpan={matrix.columns}
                                  style={styles.columnLabel}
                              >
                                  {columnLabel}
                              </th>
                          </tr>
                        : null}

                    <tr>
                        {rows && <th>{rowLabel}</th>}
                        {map(matrix.columns, (column, idx) => (
                            <PriceMatrixHeaderCell
                                key={column}
                                nthChild={idx}
                                type="th"
                                value={column}
                                isActive={activeColumn === column}
                            />
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows &&
                        map(rows, row => (
                            <PriceMatrixRow
                                {...this.props}
                                key={row}
                                row={row}
                                data={matrix.data[row]}
                                min={matrix.min}
                                onHover={this.onHover}
                                active={{
                                    row: activeRow,
                                    column: activeColumn,
                                }}
                            />
                        ))}

                    {!rows
                        ? <tr>
                              {map(columns, column => (
                                  <PriceMatrixCell
                                      {...this.props}
                                      key={column}
                                      column={column}
                                      data={matrix.data[column]}
                                      min={matrix.min}
                                      onHover={this.onHover}
                                      active={{
                                          column: activeColumn,
                                      }}
                                  />
                              ))}
                          </tr>
                        : null}
                </tbody>
            </table>
        );
    }
}

/**
 * Container component renders matrix
 */
const PriceMatrix = ({
    onClick,
    loading,
    prices,
    columns,
    rows,
    current,
    columnLabel,
    rowLabel,
    valuePrefix,
}: PriceMatrixProps) => (
    <div
        className={classNames('ui vertical basic segment', {
            loading,
        })}
        style={styles.container}
    >
        <PriceMatrixTable
            data={prices}
            columns={columns}
            rows={rows}
            columnLabel={columnLabel}
            rowLabel={rowLabel}
            valuePrefix={valuePrefix}
            current={current}
            onClick={onClick}
        />
    </div>
);

PriceMatrix.defaultProps = {
    current: {},
};

export { PriceMatrix, PriceMatrixTable, PriceMatrixRow, PriceMatrixCell };
