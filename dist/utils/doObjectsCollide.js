"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doObjectsCollide = void 0;
const areBoundsCollide = (a, b, { tolerance = 0, useOffsetSize = false }) => {
    const aHeight = useOffsetSize ? a.offsetHeight : a.height;
    const bHeight = useOffsetSize ? b.offsetHeight : b.height;
    const aWidth = useOffsetSize ? a.offsetWidth : a.width;
    const bWidth = useOffsetSize ? b.offsetWidth : b.width;
    return !(a.top + aHeight - tolerance < b.top ||
        a.top + tolerance > b.top + bHeight ||
        a.left + aWidth - tolerance < b.left ||
        a.left + tolerance > b.left + bWidth);
};
function toArray(value) {
    if (Array.isArray(value)) {
        return value;
    }
    return [value];
}
function doObjectsCollide(a, b, tolerance = 0, delta = 1) {
    const aBounds = toArray(a);
    const bBounds = toArray(b);
    for (let i = 0; i < aBounds.length; i++) {
        for (let j = 0; j < bBounds.length; j++) {
            return areBoundsCollide(aBounds[i], bBounds[j], { tolerance, useOffsetSize: delta === 1 });
        }
    }
}
exports.doObjectsCollide = doObjectsCollide;
//# sourceMappingURL=doObjectsCollide.js.map