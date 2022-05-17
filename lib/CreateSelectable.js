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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSelectable = void 0;
var react_1 = __importStar(require("react"));
var utils_1 = require("./utils");
var SelectableGroup_context_1 = require("./SelectableGroup.context");
var createSelectable = function (WrappedComponent) { var _a; return _a = (function (_super) {
        __extends(SelectableItem, _super);
        function SelectableItem() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.state = {
                isSelected: _this.props.isSelected,
                isSelecting: false,
            };
            _this.node = null;
            _this.bounds = null;
            _this.updateBounds = function (containerScroll) {
                _this.bounds = (0, utils_1.getBoundsForNode)(_this.node, containerScroll);
            };
            _this.getSelectableRef = function (ref) {
                _this.node = ref;
            };
            return _this;
        }
        SelectableItem.prototype.componentDidMount = function () {
            this.updateBounds();
            this.context.selectable.register(this);
        };
        SelectableItem.prototype.componentWillUnmount = function () {
            this.context.selectable.unregister(this);
        };
        SelectableItem.prototype.render = function () {
            return (react_1.default.createElement(WrappedComponent, __assign({}, this.props, this.state, { selectableRef: this.getSelectableRef })));
        };
        return SelectableItem;
    }(react_1.Component)),
    _a.contextType = SelectableGroup_context_1.SelectableGroupContext,
    _a.defaultProps = {
        isSelected: false,
    },
    _a; };
exports.createSelectable = createSelectable;
//# sourceMappingURL=CreateSelectable.js.map