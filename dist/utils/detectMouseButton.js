"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectMouseButton = void 0;
function detectMouseButton(evt, buttonNumber = 1, options = {}) {
    if ((evt.metaKey && !options.allowMetaClick) ||
        (evt.ctrlKey && !options.allowCtrlClick) ||
        (evt.altKey && !options.allowAltClick) ||
        (evt.shiftKey && !options.allowShiftClick)) {
        return false;
    }
    if ('buttons' in evt) {
        return evt.buttons === buttonNumber;
    }
    if ('which' in evt) {
        return evt.which === buttonNumber;
    }
    return evt.button === buttonNumber - 1;
}
exports.detectMouseButton = detectMouseButton;
//# sourceMappingURL=detectMouseButton.js.map