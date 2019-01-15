import * as R from "ramda";

export function digitize(number) {
    return R.compose(
        R.reverse,
        R.unfold,
    )(factor => {
        const digit = Math.floor((number % (10 * factor)) / factor);
        return digit ? [digit, factor * 10] : false;
    }, 1);
}

export function matricize(digits) {
    return R.map(digit => [digit - 1, digit, digit + 1], digits);
}
