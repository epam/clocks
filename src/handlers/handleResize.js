let row = 1;
let screenWidth = window.innerWidth;
let maxQuantity = Math.floor(screenWidth / 280);
let quantity = 1;
let width = 280;

function handleResize(itemsCount) {
    screenWidth = window.innerWidth;
    maxQuantity = Math.floor(screenWidth / 280);
    row = Math.ceil(itemsCount / maxQuantity);
    quantity = Math.ceil(itemsCount / row);
    width = Math.floor(screenWidth / quantity) - 2; // subtract 2px to remove errors;

    return width;
}

export default handleResize;
