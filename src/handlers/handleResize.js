let row = 1;
let screenWidth = 0;
let maxQuantity = 1;
let quantity = 1;
let width = 280;

function handleResize(itemsCount, grid) {
    screenWidth = grid.offsetWidth - 2; // innerWidth rounds number so subtract x to escape errors
    if (screenWidth < 280) return screenWidth;

    maxQuantity = Math.floor(screenWidth / 280);
    row = Math.ceil(itemsCount / maxQuantity);
    quantity = Math.ceil(itemsCount / row);
    width = Math.floor(screenWidth / quantity);
    return width;
}

export default handleResize;
