"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var propertiesToNormalize = ['pageX', 'pageY', 'clientX', 'clientY'];
function patchEventProperties(evt, touchKey) {
    propertiesToNormalize.forEach(function (key) {
        if (typeof evt[key] === 'undefined') {
            evt[key] = evt[touchKey][0][key];
        }
    });
}
function castTouchToMouseEvent(evt) {
    if (evt.type.includes('mouse')) {
        return evt;
    }
    try {
        if (evt.type === 'touchstart') {
            patchEventProperties(evt, 'targetTouches');
        }
        else if (evt.type === 'touchmove') {
            patchEventProperties(evt, 'changedTouches');
        }
    }
    catch (err) {
        console.error(err.message);
    }
    return evt;
}
exports.castTouchToMouseEvent = castTouchToMouseEvent;
//# sourceMappingURL=castTouchToMouseEvent.js.map