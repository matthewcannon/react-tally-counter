describe("Building a view model", () => {
    const buildColumns = index => [{ index: index }];

    describe("Building columns", () => {
        test("Builds one column", () => {
            expect(buildColumns().length).toBe(1);
        });

        test("Builds a column with an index", () => {
            const index = 0;
            expect(buildColumns(index)[0].index).toEqual(index);
        });
    });
});
