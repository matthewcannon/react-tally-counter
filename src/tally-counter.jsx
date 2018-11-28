import React from "react";
import Counter from "./counter.jsx";
var tweenState = require("react-tween-state");

const TallyCounter = React.createClass({
    mixins: [tweenState.Mixin],

    getInitialState: () => ({
        newTally: 0,
        oldTally: 0,
    }),

    componentDidMount() {
        this.timer = setInterval(this.setNewTally, 1000 * 4);
    },

    setNewTally() {
        const newTally = Math.floor(Math.random() * 5000);

        this.tweenState("newTally", {
            duration: 3000,
            endValue: newTally,
            onEnd: () => {
                this.setState({
                    oldTally: newTally,
                });
            },
        });
    },

    deriveCounterMovement(newTally, oldTally) {
        return newTally === oldTally ? "none" : newTally > oldTally ? "up" : "down";
    },

    render() {
        const count = Math.floor(this.getTweeningValue("newTally"));

        const counterProps = {
            thousands: Math.floor((count % 10000) / 1000),
            hundreds: Math.floor((count / 100) % 10),
            tens: Math.floor((count / 10) % 10),
            units: Math.floor(count % 10),
            movement: this.deriveCounterMovement(this.state.newTally, this.state.oldTally),
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
