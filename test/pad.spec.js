describe("pad", () => {
    const pad = (number, length) => {
        const spaces = "0".repeat(length);
        return String(spaces + number).slice(-spaces.length);
    };

    it("pads a small number", () => {
        expect(pad(5, 2)).toEqual("05");
    });

    it("pads a large number", () => {
        expect(pad(765, 4)).toEqual("0765");
    });

    it("fills all the spaces", () => {
        expect(pad(8765, 4)).toEqual("8765");
    });
});
