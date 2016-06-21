/**
 * Safe chained function
 *
 * Will only create a new function if needed,
 * otherwise will pass back existing functions or null.
 *
 * @param {function} functions to chain
 * @returns {function|null} chained finction, if avaliable
 */
export function createChainedFunction(...funcs) {
    return funcs
        .filter((f) => Boolean(f))
        .reduce((acc, f) => {
            if(typeof f !== 'function') {
                throw new Error('Invalid Argument Type, must only provide functions, undefined, or null.');
            }

            if(acc === null) {
                return f;
            }

            return function chainedFunction(...args) {
                acc.apply(this, args);
                f.apply(this, args);
            };
        }, null);
}
