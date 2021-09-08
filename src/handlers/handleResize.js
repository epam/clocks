let row = 1;
let screenWidth = 0;
let maxQuantity = 1;
let quantity = 1;
let width = 280;

function handleResize(itemsCount) {
    screenWidth = window.innerWidth;

    maxQuantity = Math.floor(screenWidth / 280);
    row = Math.ceil(itemsCount / maxQuantity);
    quantity = Math.ceil(itemsCount / row);
    width = Math.floor(screenWidth / quantity) - 10;
    return width;
}

export default handleResize;
