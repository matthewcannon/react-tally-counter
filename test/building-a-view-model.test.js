describe("Building a view model", () => {
    const buildColumns = (index = 0, length = 1) => {
        let array = [];

        for (var i = index; i < length; ++i) {
            array.push({
                index: i,
            });
        }

        return array;
    };

    describe("Building columns", () => {
        test("Builds one column", () => {
            expect(buildColumns().length).toBe(1);
        });

        test("Builds a column with an index", () => {
            const index = 0;
            expect(buildColumns(index)[0].index).toEqual(index);
        });

        test("Builds 2 columns", () => {
            const index = 0;
            const length = 2;
            expect(buildColumns(index, length).length).toBe(2);
        });
    });
});
