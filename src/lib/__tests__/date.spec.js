import { humanizeDuration } from '../date';

describe('date', () => {
    describe('humanizeDuration', () => {
        it('should return 01d 01h 15m for 90900 seconds', () => {
            expect(humanizeDuration(90900)).toEqual('01d 01h 15m');
        });
        it('should return 01h 05m for 3900 seconds', () => {
            expect(humanizeDuration(3900)).toEqual('01h 05m');
        });
        it('should return 15m for 900 seconds', () => {
            expect(humanizeDuration(900)).toEqual('15m');
        });
        it('should return 10s for 10 seconds', () => {
            expect(humanizeDuration(10)).toEqual('10s');
        });
        it('should return only hours', () => {
            expect(
                humanizeDuration(90000, {
                    magnitudes: ['h'],
                }),
            ).toEqual('25h');
        });
        it('should not skip empty segments', () => {
            expect(
                humanizeDuration(90000, {
                    magnitudes: ['h', 'm'],
                    skip: false,
                }),
            ).toEqual('25h 00m');
        });
    });
});
