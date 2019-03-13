import { digitize } from "../src/number";

describe("digitize", () => {
    test("ignores undefined", () => {
        expect(digitize(undefined)).toEqual([]);
    });

    test("ignores object", () => {
        expect(digitize({})).toEqual([]);
    });

    test("ignores zero", () => {
        expect(digitize(0)).toEqual([]);
    });

    test("digitizes a very small number", () => {
        expect(digitize(9)).toEqual([9]);
    });

    test("digitizes a small number", () => {
        expect(digitize(98)).toEqual([9, 8]);
    });

    test("digitizes a large number", () => {
        expect(digitize(9876)).toEqual([9, 8, 7, 6]);
    });

    test("digitizes a larger number", () => {
        expect(digitize(987654)).toEqual([9, 8, 7, 6, 5, 4]);
    });

    test("digitizes a very large number", () => {
        expect(digitize(9876543)).toEqual([9, 8, 7, 6, 5, 4, 3]);
    });
});
