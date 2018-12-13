describe("Building a model", () => {
    const buildColumns = (length = 1) => Array.from({ length }, (value, index) => ({ index }));

    describe("Building columns", () => {
        test("Builds one column", () => {
            expect(buildColumns().length).toBe(1);
        });

        test("Builds a column with an index", () => {
            expect(buildColumns()[0].index).toEqual(0);
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
