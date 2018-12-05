import React from "react";

const Counter = React.createClass({
    deriveDigits(number) {
        return {
            thousands: Math.floor((number % 10000) / 1000),
            hundreds: Math.floor((number / 100) % 10),
            tens: Math.floor((number / 10) % 10),
            units: Math.floor(number % 10),
        };
    },

    calculateStripPosition(movement, subDigit, range) {
        // REFACTOR: Pattern-matching.
        return movement === "none"
            ? 0
            : movement === "up"
            ? -Math.abs((range / 10) * subDigit)
            : Math.abs((range / 10) * (subDigit - 10)) - range;
    },

    calculateStripPositions(currentDigits, newDigits, movement, range) {
        // REFACTOR: Recursive function over collection.
        return [
            newDigits.thousands === currentDigits.thousands
                ? 0
                : this.calculateStripPosition(movement, currentDigits.hundreds, range),
            newDigits.hundreds == currentDigits.hundreds
                ? 0
                : this.calculateStripPosition(movement, currentDigits.tens, range),
            newDigits.tens === currentDigits.tens
                ? 0
                : this.calculateStripPosition(movement, currentDigits.units, range),
            0,
        ];
    },

    deriveMovement(previousCount, newCount) {
        return previousCount === newCount ? "none" : previousCount > newCount ? "up" : "down";
    },

    makeRows(digits) {
        // REFACTOR: Recursive function over collection.
        return [
            [
                digits.thousands === 0 ? 9 : digits.thousands - 1,
                digits.hundreds === 0 ? 9 : digits.hundreds - 1,
                digits.tens === 0 ? 9 : digits.tens - 1,
                digits.units === 0 ? 9 : digits.units - 1,
            ],
            [digits.thousands, digits.hundreds, digits.tens, digits.units],
            [
                digits.thousands === 9 ? 0 : digits.thousands + 1,
                digits.hundreds === 9 ? 0 : digits.hundreds + 1,
                digits.tens === 9 ? 0 : digits.tens + 1,
                digits.units === 9 ? 0 : digits.units + 1,
            ],
        ];
    },

    render() {
        const newDigits = this.deriveDigits(this.props.newCount);
        const movement = this.deriveMovement(this.props.previousCount, this.props.newCount);
        // REFACTOR: Compose chain.
        const currentDigits = this.deriveDigits(this.props.currentCount);
        const roll = this.makeRows(currentDigits);
        const digitHeight = 60;
        const stripPositions = this.calculateStripPositions(currentDigits, newDigits, movement, digitHeight);

        const digitStyle = {
            height: `{digitHeight}px`,
            // Can't use string interpolation on a React CSS property name if the original CSS property is hyphenated (in this case "font-size").
            fontSize: digitHeight + "px",
        };

        const digits = stripIndex => {
            return roll.map((row, index) => (
                <div key={index} style={digitStyle}>
                    <span>{row[stripIndex]}</span>
                </div>
            ));
        };

        const strips = stripPositions.map((strip, index) => (
            <div key={index} style={{ position: "relative", float: "left", top: strip + "px" }}>
                {digits(index)}
            </div>
        ));

        return <div>{strips}</div>;
    },
});

Counter.propTypes = {
    currentCount: React.PropTypes.number.isRequired,
    previousCount: React.PropTypes.number.isRequired,
    newCount: React.PropTypes.number.isRequired,
};

export default Counter;
