"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeselectAll = exports.SelectAll = exports.createSelectable = exports.SelectableGroup = void 0;
var SelectableGroup_1 = require("./SelectableGroup");
Object.defineProperty(exports, "SelectableGroup", { enumerable: true, get: function () { return SelectableGroup_1.SelectableGroup; } });
var CreateSelectable_1 = require("./CreateSelectable");
Object.defineProperty(exports, "createSelectable", { enumerable: true, get: function () { return CreateSelectable_1.createSelectable; } });
var SelectAll_1 = require("./SelectAll");
Object.defineProperty(exports, "SelectAll", { enumerable: true, get: function () { return SelectAll_1.SelectAll; } });
var DeselectAll_1 = require("./DeselectAll");
Object.defineProperty(exports, "DeselectAll", { enumerable: true, get: function () { return DeselectAll_1.DeselectAll; } });
if (process.env.NODE_ENV === 'development') {
    if (typeof Map !== 'function' ||
        typeof Set !== 'function' ||
        typeof Array.from !== 'function' ||
        typeof Array.isArray !== 'function' ||
        typeof Object.assign !== 'function') {
        throw new Error("\n      React-Selectable-Fast requires Map, Set, Array.from,\n      Array.isArray, and Object.assign to exist.\n      Use a polyfill to provide these for older browsers.\n    ");
    }
}
//# sourceMappingURL=index.js.map