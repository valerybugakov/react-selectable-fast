"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var Context_1 = __importDefault(require("./Context"));
var DeselectAllButton = (function (_super) {
    __extends(DeselectAllButton, _super);
    function DeselectAllButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.root = null;
        _this.getRootRef = function (ref) {
            _this.root = ref;
        };
        return _this;
    }
    DeselectAllButton.prototype.componentDidMount = function () {
        this.root.addEventListener('mousedown', function (evt) { return evt.stopPropagation(); });
    };
    DeselectAllButton.prototype.render = function () {
        var _a = this.props, _b = _a.component, ButtonComponent = _b === void 0 ? 'div' : _b, children = _a.children, className = _a.className, rest = __rest(_a, ["component", "children", "className"]);
        return (react_1.default.createElement(ButtonComponent, __assign({ ref: this.getRootRef, className: "selectable-select-all " + className, onClick: this.context.selectable.clearSelection }, rest), children));
    };
    DeselectAllButton.contextType = Context_1.default;
    return DeselectAllButton;
}(react_1.Component));
exports.default = DeselectAllButton;
//# sourceMappingURL=DeselectAll.js.map