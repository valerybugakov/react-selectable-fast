"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isNodeInRoot(node, root) {
    while (node) {
        if (node === root) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}
exports.isNodeInRoot = isNodeInRoot;
//# sourceMappingURL=nodeInRoot.js.map