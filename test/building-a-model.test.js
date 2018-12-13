describe("Building a model", () => {
    describe("Building rows", () => {
        const buildRows = length => Array.from({ length }, (value, index) => ({}));

        test("Builds one row", () => {
            const length = 1;
            expect(buildRows(length).length).toBe(length);
        });
    });

    describe("Building columns", () => {
        const buildColumns = length => Array.from({ length }, (value, index) => ({ index }));

        test("Builds one column", () => {
            const length = 1;
            expect(buildColumns(length).length).toBe(length);
        });

        test("Builds a column with a zero-based index", () => {
            const length = 1;
            expect(buildColumns(length)[0].index).toEqual(length - 1);
        });

        test("Builds 2 columns", () => {
            const length = 2;
            expect(buildColumns(length).length).toBe(length);
        });

        test("Builds 2 columns with indices", () => {
            const length = 2;
            const columns = buildColumns(length);
            expect(columns.length).toBe(length);
            expect(columns[0].index).toEqual(0);
            expect(columns[1].index).toEqual(1);
        });
    });
});
