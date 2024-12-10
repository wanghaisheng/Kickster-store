export const priceStringToInt = (value) => {
    const intArray = value.split(",").map((price) => parseInt(price));
    return parseInt(intArray.join(""));
}

export const priceCorrection = (orgPrice) => {
    const price = orgPrice.toString();
    if (orgPrice < 1000) return price;
    const commaPos = parseInt(orgPrice / 1000).toString().length;
    let priceArray = [...price];
    priceArray.splice(commaPos, 0, ",");
    return priceArray.join("");
};

export const discountCalculator = (price, discount) => {
    return Math.round(priceStringToInt(price) - (priceStringToInt(price) * discount) / 100)
}