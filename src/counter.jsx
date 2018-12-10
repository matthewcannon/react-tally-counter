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

    buildColumns(currentDigits, newDigits, movement, range) {
        // REFACTOR: Recursive function over collection.
        return [
            {
                index: 0,
                position:
                    newDigits.thousands === currentDigits.thousands
                        ? 0
                        : this.calculateStripPosition(movement, currentDigits.hundreds, range),
            },
            {
                index: 1,
                position:
                    newDigits.hundreds == currentDigits.hundreds
                        ? 0
                        : this.calculateStripPosition(movement, currentDigits.tens, range),
            },
            {
                index: 2,
                position:
                    newDigits.tens === currentDigits.tens
                        ? 0
                        : this.calculateStripPosition(movement, currentDigits.units, range),
            },
            {
                index: 3,
                position: 0,
            },
        ];
    },

    deriveMovement(previousCount, newCount) {
        return previousCount === newCount ? "none" : previousCount > newCount ? "up" : "down";
    },

    buildRows(digits) {
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
        const rows = this.buildRows(currentDigits);
        const columns = this.buildColumns(currentDigits, newDigits, movement, this.props.height);

        const digits = strip =>
            rows.map((row, index) => (
                <div
                    key={index}
                    style={{
                        height: this.props.height + "px",
                        fontSize: this.props.height + "px",
                        borderStyle: "groove",
                        borderColor: "lightgoldenrodyellow",
                    }}
                >
                    <span>{row[strip.index]}</span>
                </div>
            ));

        const strips = columns.map((strip, index) => (
            <div
                key={index}
                style={{
                    position: "relative",
                    float: "left",
                    top: strip.position + "px",
                    borderStyle: "groove",
                    borderColor: "lightgoldenrodyellow",
                }}
            >
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
