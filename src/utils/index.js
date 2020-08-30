const debug = true

export const log = (...args) => {
    let isDebug = Array.prototype.slice(args, 0).unshift()
    if (isDebug) {
        console.log.apply(null, args)
    } else if (debug) {
        console.log.apply(null, args)
    }
}