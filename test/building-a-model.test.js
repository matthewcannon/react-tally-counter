describe("Building a model", () => {
    describe("Building rows", () => {
        const buildRows = length => Array.from({ length }, () => ({}));

        test("Builds one row", () => {
            const length = 1;
            expect(buildRows(length).length).toBe(length);
        });

        test("Builds a row with one digit", () => {});

        test("Builds 2 rows with one digit", () => {});

        test("Builds a row with all digits", () => {});

        test("Builds 3 rows with all digits", () => {});
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

        test("Builds 2 columns with zero-based indices", () => {
            const length = 2;
            const columns = buildColumns(length);
            expect(columns.length).toBe(length);
            expect(columns[0].index).toEqual(0);
            expect(columns[1].index).toEqual(1);
        });
    });
});
