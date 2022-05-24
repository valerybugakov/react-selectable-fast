"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectableGroupContext = void 0;
const react_1 = __importDefault(require("react"));
const utils_1 = require("./utils");
exports.SelectableGroupContext = react_1.default.createContext({
    selectable: {
        register(_) { },
        unregister(_) { },
        selectAll: utils_1.noop,
        clearSelection: utils_1.noop,
        getScrolledContainer: () => null,
    },
});
//# sourceMappingURL=SelectableGroup.context.js.map