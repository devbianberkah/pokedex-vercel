export const serialConverter = (val) => {
    var str = "" + val
    var pad = "000"
    var ans = pad.substring(0, pad.length - str.length) + str
    return ans;
}

// export const heightCo