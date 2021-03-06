import React from "react";
import * as R from "ramda";
import { digitize, matricize } from "./number";

const Counter = React.createClass({
    render() {
        const matrix = R.compose(
            matricize,
            digitize,
        )(this.props.currentCount);

        const digits = column =>
            column.map(digit => (
                <div
                    style={{
                        height: this.props.height + "px",
                        fontSize: this.props.height + "px",
                    }}
                >
                    <span>{digit}</span>
                </div>
            ));

        const strips = matrix.map(column => (
            <div
                style={{
                    float: "left",
                }}
            >
                {digits(column)}
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
