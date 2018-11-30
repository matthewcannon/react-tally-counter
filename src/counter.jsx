import React from "react";

const Counter = React.createClass({
    calculateStripPosition(movement, subDivision, height) {
        return movement === "none"
            ? 0
            : movement === "up"
            ? -Math.abs((height / 10) * subDivision)
            : Math.abs((height / 10) * (subDivision - 10)) - height;
    },

    calculateStripPositions(movement, divisions, height) {
        return {
            thousands: this.calculateStripPosition(movement, divisions.hundreds, height),
            hundreds: this.calculateStripPosition(movement, divisions.tens, height),
            tens: this.calculateStripPosition(movement, divisions.units, height),
        };
    },

    deriveMovement(toCount, fromCount) {
        return toCount === fromCount ? "none" : toCount > fromCount ? "up" : "down";
    },

    render() {
        const currentDivisions = {
            thousands: Math.floor((this.props.currentCount % 10000) / 1000),
            hundreds: Math.floor((this.props.currentCount / 100) % 10),
            tens: Math.floor((this.props.currentCount / 10) % 10),
            units: Math.floor(this.props.currentCount % 10),
        };

        const roll = {
            low: {
                thousands: currentDivisions.thousands === 0 ? 9 : currentDivisions.thousands - 1,
                hundreds: currentDivisions.hundreds === 0 ? 9 : currentDivisions.hundreds - 1,
                tens: currentDivisions.tens === 0 ? 9 : currentDivisions.tens - 1,
                units: currentDivisions.units === 0 ? 9 : currentDivisions.units - 1,
            },
            current: {
                thousands: currentDivisions.thousands,
                hundreds: currentDivisions.hundreds,
                tens: currentDivisions.tens,
                units: currentDivisions.units,
            },
            high: {
                thousands: currentDivisions.thousands === 9 ? 0 : currentDivisions.thousands + 1,
                hundreds: currentDivisions.hundreds === 9 ? 0 : currentDivisions.hundreds + 1,
                tens: currentDivisions.tens === 9 ? 0 : currentDivisions.tens + 1,
                units: currentDivisions.units === 9 ? 0 : currentDivisions.units + 1,
            },
        };

        const digitHeight = 60;

        const digitStyle = {
            height: `{digitHeight}px`,
            // Can't use string interpolation on a React CSS property name if the original CSS property is hyphenated (in this case "font-size").
            fontSize: digitHeight + "px",
        };

        const movement = this.deriveMovement(this.props.toCount, this.props.fromCount);
        const stripPositions = this.calculateStripPositions(movement, currentDivisions, digitHeight);

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
    fromCount: React.PropTypes.number.isRequired,
    toCount: React.PropTypes.number.isRequired,
};

export default Counter;
