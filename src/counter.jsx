import React from "react";

const Counter = React.createClass({
    calculateStripPosition(movement, subDivision, range) {
        return movement === "none"
            ? 0
            : movement === "up"
            ? -Math.abs((range / 10) * subDivision)
            : Math.abs((range / 10) * (subDivision - 10)) - range;
    },

    calculateStripPositions(currentDivisions, targetDivisions, movement, range) {
        return {
            thousands:
                targetDivisions.thousands === currentDivisions.thousands
                    ? 0
                    : this.calculateStripPosition(movement, currentDivisions.hundreds, range),
            hundreds:
                targetDivisions.hundreds == currentDivisions.hundreds
                    ? 0
                    : this.calculateStripPosition(movement, currentDivisions.tens, range),
            tens:
                targetDivisions.tens === currentDivisions.tens
                    ? 0
                    : this.calculateStripPosition(movement, currentDivisions.units, range),
        };
    },

    deriveMovement(oldCount, targetCount) {
        return oldCount === targetCount ? "none" : oldCount > targetCount ? "up" : "down";
    },

    render() {
        const currentDivisions = {
            thousands: Math.floor((this.props.currentCount % 10000) / 1000),
            hundreds: Math.floor((this.props.currentCount / 100) % 10),
            tens: Math.floor((this.props.currentCount / 10) % 10),
            units: Math.floor(this.props.currentCount % 10),
        };

        const targetDivisions = {
            thousands: Math.floor((this.props.targetCount % 10000) / 1000),
            hundreds: Math.floor((this.props.targetCount / 100) % 10),
            tens: Math.floor((this.props.targetCount / 10) % 10),
            units: Math.floor(this.props.targetCount % 10),
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

        const movement = this.deriveMovement(this.props.oldCount, this.props.targetCount);
        const stripPositions = this.calculateStripPositions(currentDivisions, targetDivisions, movement, digitHeight);

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
    oldCount: React.PropTypes.number.isRequired,
    targetCount: React.PropTypes.number.isRequired,
};

export default Counter;
