"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeselectAll = void 0;
var react_1 = __importStar(require("react"));
var SelectableGroup_context_1 = require("./SelectableGroup.context");
var DeselectAll = (function (_super) {
    __extends(DeselectAll, _super);
    function DeselectAll() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.root = null;
        _this.getRootRef = function (ref) {
            _this.root = ref;
        };
        return _this;
    }
    DeselectAll.prototype.componentDidMount = function () {
        this.root.addEventListener('mousedown', function (evt) { return evt.stopPropagation(); });
    };
    DeselectAll.prototype.render = function () {
        var _a = this.props, _b = _a.component, component = _b === void 0 ? 'div' : _b, children = _a.children, className = _a.className, rest = __rest(_a, ["component", "children", "className"]);
        var ButtonComponent = component;
        return (react_1.default.createElement(ButtonComponent, __assign({ ref: this.getRootRef, className: "selectable-select-all ".concat(className), onClick: this.context.selectable.clearSelection }, rest), children));
    };
    DeselectAll.contextType = SelectableGroup_context_1.SelectableGroupContext;
    return DeselectAll;
}(react_1.Component));
exports.DeselectAll = DeselectAll;
//# sourceMappingURL=DeselectAll.js.map