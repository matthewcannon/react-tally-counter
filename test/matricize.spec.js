import { matricize } from "../src/number";

describe("matricize", () => {
    it("ignores object", () => {
        expect(matricize({})).toEqual({});
    });

    it("ignores zero", () => {
        expect(matricize(0)).toEqual([undefined]);
    });

    it("matricizes an empty array", () => {
        expect(matricize([])).toEqual([]);
    });

    it("matricizes one digit without wrapping", () => {
        expect(matricize([5])).toEqual([[4, 5, 6]]);
    });

    it("matricizes two digits without wrapping", () => {
        expect(matricize([5, 6])).toEqual([[4, 5, 6], [5, 6, 7]]);
    });

    it("matricizes one digit with upper wrapping", () => {
        expect(matricize([9])).toEqual([[8, 9, 0]]);
    });

    it("matricizes one digit with lower wrapping", () => {
        expect(matricize([0])).toEqual([[9, 0, 1]]);
    });

    it("matricizes several digits with upper and lower wrapping", () => {
        expect(matricize([1, 0, 5, 9])).toEqual([[0, 1, 2], [9, 0, 1], [4, 5, 6], [8, 9, 0]]);
    });
});
