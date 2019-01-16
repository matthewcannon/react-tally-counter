import { matricize } from "../src/number";

describe("Matricizing digits", () => {
    test("Doesn't matricize an object", () => {
        expect(matricize({})).toEqual({});
    });

    test("Ignores zero", () => {
        expect(matricize(0)).toEqual([undefined]);
    });

    test("Matricizes an empty array", () => {
        expect(matricize([])).toEqual([]);
    });

    test("Matricizes one digit without wrapping", () => {
        expect(matricize([5])).toEqual([[4, 5, 6]]);
    });

    test("Matricizes two digits without wrapping", () => {
        expect(matricize([5, 6])).toEqual([[4, 5, 6], [5, 6, 7]]);
    });

    test("Matricizes one digit with upper wrapping", () => {
        expect(matricize([9])).toEqual([[8, 9, 0]]);
    });

    test("Matricizes one digit with lower wrapping", () => {
        expect(matricize([0])).toEqual([[9, 0, 1]]);
    });

    test("Matricizes several digits with upper and lower wrapping", () => {
        expect(matricize([1, 0, 5, 9])).toEqual([[0, 1, 2], [9, 0, 1], [4, 5, 6], [8, 9, 0]]);
    });
});
