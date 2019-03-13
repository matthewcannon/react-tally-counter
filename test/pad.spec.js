import * as R from "ramda";

describe("Pad", () => {
    const pad = (number, length) => {
        const spaces = "0".repeat(length);
        return String(spaces + number).slice(-spaces.length);
    };

    test("Pads a small number", () => {
        expect(pad(5, 2)).toEqual("05");
    });

    test("Pads a large number", () => {
        expect(pad(765, 4)).toEqual("0765");
    });

    test("Fills all the spaces", () => {
        expect(pad(8765, 4)).toEqual("8765");
    });
});
