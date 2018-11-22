import React from "react";

const Counter = React.createClass({
    render() {
        return <span>{this.props.count}</span>;
    },
});

Counter.propTypes = {
    count: React.PropTypes.number.isRequired,
};

export default Counter;
