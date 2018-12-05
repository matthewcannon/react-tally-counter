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
        return {
            thousands:
                newDigits.thousands === currentDigits.thousands
                    ? 0
                    : this.calculateStripPosition(movement, currentDigits.hundreds, range),
            hundreds:
                newDigits.hundreds == currentDigits.hundreds
                    ? 0
                    : this.calculateStripPosition(movement, currentDigits.tens, range),
            tens:
                newDigits.tens === currentDigits.tens
                    ? 0
                    : this.calculateStripPosition(movement, currentDigits.units, range),
        };
    },

    deriveMovement(previousCount, newCount) {
        return previousCount === newCount ? "none" : previousCount > newCount ? "up" : "down";
    },

    makeRoll(digits) {
        // REFACTOR: Recursive function over collection.
        return {
            low: {
                thousands: digits.thousands === 0 ? 9 : digits.thousands - 1,
                hundreds: digits.hundreds === 0 ? 9 : digits.hundreds - 1,
                tens: digits.tens === 0 ? 9 : digits.tens - 1,
                units: digits.units === 0 ? 9 : digits.units - 1,
            },
            current: {
                thousands: digits.thousands,
                hundreds: digits.hundreds,
                tens: digits.tens,
                units: digits.units,
            },
            high: {
                thousands: digits.thousands === 9 ? 0 : digits.thousands + 1,
                hundreds: digits.hundreds === 9 ? 0 : digits.hundreds + 1,
                tens: digits.tens === 9 ? 0 : digits.tens + 1,
                units: digits.units === 9 ? 0 : digits.units + 1,
            },
        };
    },

    render() {
        const previousCount = this.props.previousCount;
        const newCount = this.props.newCount;
        const newDigits = this.deriveDigits(newCount);
        const currentCount = this.props.currentCount;
        // REFACTOR: Compose chain.
        const currentDigits = this.deriveDigits(currentCount);
        const roll = this.makeRoll(currentDigits);
        const movement = this.deriveMovement(this.props.previousCount, newCount);

        const digitHeight = 60;
        const digitStyle = {
            height: `{digitHeight}px`,
            // Can't use string interpolation on a React CSS property name if the original CSS property is hyphenated (in this case "font-size").
            fontSize: digitHeight + "px",
        };

        const stripPositions = this.calculateStripPositions(currentDigits, newDigits, movement, digitHeight);

        // REFACTOR: Loop over collection.
        return (
            <div>
                <div style={{ position: "relative", float: "left", top: stripPositions.thousands + "px" }}>
                    <div style={digitStyle}>
                        <span>{roll.low.thousands}</span>
                    </div>
                    <div style={digitStyle}>
                        <span>{roll.current.thousands}</span>
                    </div>
                    <div style={digitStyle}>
                        <span>{roll.high.thousands}</span>
                    </div>
                </div>
                <div style={{ position: "relative", float: "left", top: stripPositions.hundreds + "px" }}>
                    <div style={digitStyle}>
                        <span>{roll.low.hundreds}</span>
                    </div>
                    <div style={digitStyle}>
                        <span>{roll.current.hundreds}</span>
                    </div>
                    <div style={digitStyle}>
                        <span>{roll.high.hundreds}</span>
                    </div>
                </div>
                <div style={{ position: "relative", float: "left", top: stripPositions.tens + "px" }}>
                    <div style={digitStyle}>
                        <span>{roll.low.tens}</span>
                    </div>
                    <div style={digitStyle}>
                        <span>{roll.current.tens}</span>
                    </div>
                    <div style={digitStyle}>
                        <span>{roll.high.tens}</span>
                    </div>
                </div>
                <div style={{ position: "relative", float: "left" }}>
                    <div style={digitStyle}>
                        <span>{roll.low.units}</span>
                    </div>
                    <div style={digitStyle}>
                        <span>{roll.current.units}</span>
                    </div>
                    <div style={digitStyle}>
                        <span>{roll.high.units}</span>
                    </div>
                </div>
            </div>
        );
    },
});

Counter.propTypes = {
    currentCount: React.PropTypes.number.isRequired,
    previousCount: React.PropTypes.number.isRequired,
    newCount: React.PropTypes.number.isRequired,
};

export default Counter;
