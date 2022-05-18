"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBoundsForNode = exports.getDocumentScroll = void 0;
function getDocumentScroll() {
    const documentScrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
    const documentScrollLeft = Math.max(window.pageXOffset, document.documentElement.scrollLeft, document.body.scrollLeft);
    return { documentScrollTop, documentScrollLeft };
}
exports.getDocumentScroll = getDocumentScroll;
function getBoundsForNode(node, containerScroll = { scrollTop: 0, scrollLeft: 0 }) {
    const { scrollTop, scrollLeft } = containerScroll;
    return Array.from(node.getClientRects()).map(rect => ({
        top: rect.top + scrollTop,
        left: rect.left + scrollLeft,
        offsetWidth: node.offsetWidth,
        offsetHeight: node.offsetHeight,
        width: rect.width,
        height: rect.height,
    }));
}
exports.getBoundsForNode = getBoundsForNode;
//# sourceMappingURL=getBoundsForNode.js.map