//
// Idea for a kata.
//
// One of the pair writes the test (the navigator). The other of the pair (the driver) gets the test to green.
//
// The driver doesn't know *what* is being implemented (actually a grid-shaped view model).
//
// In a similar approach to the game of life kata, the navigator begins building the column and row aspects before
// revealing the bigger picture of the grid view model.
//
describe("Building a view model", () => {
    describe("Building columns", () => {
        test("Builds one column", () => {
            // Driver: "How can we test this if it's already in our component?"
            // Navigator: "We can agree to a trade-off of code smells and break encapsulation!"
            const columns = [{}];
            expect(columns.length).toBe(1);
        });

        test("Builds one column with an index", () => {
            // Driver: "What's an index?"
            // Navigator: "I think the identifier should be a zero-based numerical index."
            // Driver: "Do we still need the first test?"
            // Navigator: "Not until we triangulate!"
        });
    });
});
