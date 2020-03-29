"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var SelectableGroup_1 = __importDefault(require("./SelectableGroup"));
exports.SelectableGroup = SelectableGroup_1.default;
var CreateSelectable_1 = __importDefault(require("./CreateSelectable"));
exports.createSelectable = CreateSelectable_1.default;
var SelectAll_1 = __importDefault(require("./SelectAll"));
exports.SelectAll = SelectAll_1.default;
var DeselectAll_1 = __importDefault(require("./DeselectAll"));
exports.DeselectAll = DeselectAll_1.default;
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