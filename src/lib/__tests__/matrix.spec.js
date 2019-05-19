import { Matrix, generate } from '../matrix.js';
import { distinct } from 'lodash';
import '../lodash';

describe('matrix', () => {
    describe('a main class', () => {
        it('throws if adding value to undefined row', () => {
            const matrix = new Matrix({
                rows: ['R1'],
                columns: ['C1'],
            });

            expect(() => {
                matrix.add({ row: 'R2', column: 'C1', value: 1 })
            }).toThrowError('Trying to add value to undefined row "R2"');
        });

        it('throws if adding value to undefined column', () => {
            const matrix = new Matrix({
                rows: ['R1'],
                columns: ['C1'],
            });

            expect(() => {
                matrix.add({ row: 'R1', column: 'C2', value: 1 })
            }).toThrowError('Trying to add value to undefined column "C2"');
        });

        it('adds value to defined row and column', () => {
            const matrix = new Matrix({
                rows: ['R1'],
                columns: ['C1'],
            });

            expect(() => {
                matrix.add({ row: 'R1', column: 'C1', value: 1 })
            }).not.toThrowError();
        });

        it('groups matrix by rows and columns', () => {
            const matrix = new Matrix({
                rows: ['R1', 'R2'],
                columns: ['C1', 'C2'],
            });

            matrix.add({ row: 'R1', column: 'C1', value: 1 });
            matrix.add({ row: 'R1', column: 'C2', value: 2 });
            matrix.add({ row: 'R2', column: 'C1', value: 3 });
            matrix.add({ row: 'R2', column: 'C2', value: [4, 5] });

            expect(matrix.result().data).toEqual({
                R1: {
                    C1: [1],
                    C2: [2],
                },
                R2: {
                    C1: [3],
                    C2: [4, 5],
                },
            });
        });

        it('groups matrix by columns only', () => {
            const matrix = new Matrix({
                columns: ['C1', 'C2', 'C3'],
            });

            matrix.add({ column: 'C1', value: 1 });
            matrix.add({ column: 'C2', value: 2 });
            matrix.add({ column: 'C3', value: 3 });
            matrix.add({ column: 'C1', value: 4 });
            matrix.add({ column: 'C2', value: 5 });
            matrix.add({ column: 'C3', value: 6 });

            expect(matrix.result().data).toEqual({
                C1: [1, 4],
                C2: [2, 5],
                C3: [3, 6],
            });
        });

        it('calculates min and max values', () => {
            const matrix = new Matrix({
                rows: ['R1', 'R2'],
                columns: ['C1', 'C2'],
            });

            matrix.add({ row: 'R1', column: 'C1', value: [1, 4, 6] });
            matrix.add({ row: 'R1', column: 'C2', value: [7, 2, 5] });
            matrix.add({ row: 'R2', column: 'C1', value: [9, 8, 3] });

            const result = matrix.result();
            expect(result.min).toBe(1);
            expect(result.max).toBe(9);
        });
    });

    describe('generator helper', () => {
        it('takes list of objects and generate matrix', () => {
            const data = [
                { row: 'R1', column: 'C1', value: 1 },
                { row: 'R1', column: 'C2', value: 2 },
                { row: 'R1', column: 'C3', value: 3 },
                { row: 'R2', column: 'C1', value: 4 },
                { row: 'R2', column: 'C2', value: 5 },
                { row: 'R2', column: 'C3', value: 6 },
            ];

            expect(generate({
                data,
                rows: distinct(data, 'row'),
                columns: distinct(data, 'column'),
            }).data).toEqual({
                R1: {
                    C1: [1],
                    C2: [2],
                    C3: [3],
                },
                R2: {
                    C1: [4],
                    C2: [5],
                    C3: [6],
                },
            });
        });

        it('generate matrix with columns only', () => {
            const data = [
                { column: 'C1', value: 1 },
                { column: 'C2', value: 2 },
                { column: 'C3', value: 3 },
                { column: 'C1', value: 4 },
                { column: 'C2', value: 5 },
                { column: 'C3', value: 6 },
            ];

            expect(generate({
                data,
                columns: distinct(data, 'column'),
            }).data).toEqual({
                C1: [1, 4],
                C2: [2, 5],
                C3: [3, 6],
            });
        });
    });
});
