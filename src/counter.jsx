import React from "react";

const Counter = React.createClass({
    makeDigits(number) {
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

    makeStrips(currentDigits, newDigits, movement, range) {
        // REFACTOR: Recursive function over collection.
        return [
            {
                position: 0,
                offset:
                    newDigits.thousands === currentDigits.thousands
                        ? 0
                        : this.calculateStripPosition(movement, currentDigits.hundreds, range),
            },
            {
                position: 1,
                offset:
                    newDigits.hundreds == currentDigits.hundreds
                        ? 0
                        : this.calculateStripPosition(movement, currentDigits.tens, range),
            },
            {
                position: 2,
                offset:
                    newDigits.tens === currentDigits.tens
                        ? 0
                        : this.calculateStripPosition(movement, currentDigits.units, range),
            },
            {
                position: 3,
                offset: 0,
            },
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
        const newDigits = this.makeDigits(this.props.newCount);
        const currentDigits = this.makeDigits(this.props.currentCount);
        const movement = this.deriveMovement(this.props.previousCount, this.props.newCount);
        const rows = this.makeRows(currentDigits);
        const columns = this.makeStrips(currentDigits, newDigits, movement, this.props.height);

        const digits = strip =>
            rows.map((row, index) => (
                <div key={index} style={{ height: this.props.height + "px", fontSize: this.props.height + "px" }}>
                    <span>{row[strip.position]}</span>
                </div>
            ));

        const strips = columns.map((strip, index) => (
            <div key={index} style={{ position: "relative", float: "left", top: strip.offset + "px" }}>
                {digits(strip)}
            </div>
        ));

        return <div>{strips}</div>;
    },
});

Counter.propTypes = {
    currentCount: React.PropTypes.number.isRequired,
    previousCount: React.PropTypes.number.isRequired,
    newCount: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
};

export default Counter;
