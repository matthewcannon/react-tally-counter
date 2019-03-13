import React from "react";
import Counter from "./counter.jsx";

const tweenState = require("react-tween-state");

const TallyCounter = React.createClass({
    mixins: [tweenState.Mixin],

    getInitialState: () => ({
        newTally: 0,
        previousTally: 0,
        tweenTally: 0,
    }),

    componentDidMount() {
        this.timer = setInterval(this.setNewTally, 1000 * 5);
    },

    setNewTally() {
        const newTally = Math.floor(Math.random() * 5000);

        this.setState({ newTally });

        this.tweenState("tweenTally", {
            duration: 3000,
            endValue: newTally,
            onEnd: () => {
                this.setState({
                    previousTally: newTally,
                });
            },
        });
    },

    render() {
        const counterProps = {
            currentCount: Math.floor(this.getTweeningValue("tweenTally")),
            previousCount: this.state.previousTally,
            newCount: this.state.newTally,
            height: 60,
        };

        return (
            <div>
                <Counter {...counterProps} />
            </div>
        );
    },
});

export default TallyCounter;
