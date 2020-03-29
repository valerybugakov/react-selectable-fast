"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getBoundsForNode_1 = require("./getBoundsForNode");
var areBoundsCollide = function (a, b, _a) {
    var _b = _a.tolerance, tolerance = _b === void 0 ? 0 : _b, _c = _a.useOffsetSize, useOffsetSize = _c === void 0 ? false : _c;
    var aHeight = useOffsetSize ? a.offsetHeight : a.height;
    var bHeight = useOffsetSize ? b.offsetHeight : b.height;
    var aWidth = useOffsetSize ? a.offsetWidth : a.width;
    var bWidth = useOffsetSize ? b.offsetWidth : b.width;
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
function doObjectsCollide(a, b, tolerance, delta) {
    if (tolerance === void 0) { tolerance = 0; }
    if (delta === void 0) { delta = 1; }
    var aBounds = a instanceof HTMLElement ? getBoundsForNode_1.getBoundsForNode(a) : toArray(a);
    var bBounds = b instanceof HTMLElement ? getBoundsForNode_1.getBoundsForNode(b) : toArray(b);
    for (var i = 0; i < aBounds.length; i++) {
        for (var j = 0; j < bBounds.length; j++) {
            return areBoundsCollide(aBounds[i], bBounds[j], { tolerance: tolerance, useOffsetSize: delta === 1 });
        }
    }
}
exports.doObjectsCollide = doObjectsCollide;
//# sourceMappingURL=doObjectsCollide.js.map