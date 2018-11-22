import React from "react";
import Counter from "./counter.jsx";
var tweenState = require("react-tween-state");

const TallyCounter = React.createClass({
    mixins: [tweenState.Mixin],

    getInitialState: () => ({
        tally: 0,
    }),

    componentDidMount() {
        this.timer = setInterval(this.setNewTicketCount, 1000 * 5);
    },

    setNewTicketCount() {
        const newTally = Math.floor(Math.random() * 1000);

        this.tweenState("tally", {
            duration: 2000,
            endValue: newTally,
        });
    },

    render() {
        const counterProps = {
            count: Math.floor(this.getTweeningValue("tally")),
        };

        return (
            <div>
                <h2>Tally counter</h2>
                <Counter {...counterProps} />
            </div>
        );
    },
});

export default TallyCounter;
