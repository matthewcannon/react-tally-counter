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

    render() {
        const roll = {
            low: {
                thousands: this.props.thousands === 0 ? 9 : this.props.thousands - 1,
                hundreds: this.props.hundreds === 0 ? 9 : this.props.hundreds - 1,
                tens: this.props.tens === 0 ? 9 : this.props.tens - 1,
                units: this.props.units === 0 ? 9 : this.props.units - 1,
            },
            current: {
                thousands: this.props.thousands,
                hundreds: this.props.hundreds,
                tens: this.props.tens,
                units: this.props.units,
            },
            high: {
                thousands: this.props.thousands === 9 ? 0 : this.props.thousands + 1,
                hundreds: this.props.hundreds === 9 ? 0 : this.props.hundreds + 1,
                tens: this.props.tens === 9 ? 0 : this.props.tens + 1,
                units: this.props.units === 9 ? 0 : this.props.units + 1,
            },
        };

        const digitHeight = 60;
        const stripPositions = this.calculateStripPositions(this.props.movement, this.props, digitHeight);

        const digitStyle = {
            height: `{digitHeight}px`,
            // Can't use string interpolation on a React CSS property name if the original CSS property is hyphenated (in this case "font-size").
            fontSize: digitHeight + "px",
        };

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
    thousands: React.PropTypes.number.isRequired,
    hundreds: React.PropTypes.number.isRequired,
    tens: React.PropTypes.number.isRequired,
    units: React.PropTypes.number.isRequired,
    movement: React.PropTypes.string.isRequired,
};

export default Counter;
