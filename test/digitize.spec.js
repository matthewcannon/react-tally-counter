import { digitize } from "../src/number";

describe("Digitize", () => {
    test("Ignores undefined", () => {
        expect(digitize(undefined)).toEqual([]);
    });

    test("Ignores object", () => {
        expect(digitize({})).toEqual([]);
    });

    test("Ignores zero", () => {
        expect(digitize(0)).toEqual([]);
    });

    test("Digitizes a very small number", () => {
        expect(digitize(9)).toEqual([9]);
    });

    test("Digitizes a small number", () => {
        expect(digitize(98)).toEqual([9, 8]);
    });

    test("Digitizes a large number", () => {
        expect(digitize(9876)).toEqual([9, 8, 7, 6]);
    });

    test("Digitizes a larger number", () => {
        expect(digitize(987654)).toEqual([9, 8, 7, 6, 5, 4]);
    });

    test("Digitizes a very large number", () => {
        expect(digitize(9876543)).toEqual([9, 8, 7, 6, 5, 4, 3]);
    });
});
