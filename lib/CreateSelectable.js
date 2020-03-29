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
var prop_types_1 = require("prop-types");
var utils_1 = require("./utils");
var Context_1 = __importDefault(require("./Context"));
var createSelectable = function (WrappedComponent) { var _a; return _a = (function (_super) {
        __extends(SelectableItem, _super);
        function SelectableItem() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.state = {
                isSelected: _this.props.isSelected,
                isSelecting: false
            };
            _this.node = null;
            _this.bounds = null;
            _this.registerSelectable = function (containerScroll) {
                _this.bounds = utils_1.getBoundsForNode(_this.node, containerScroll);
                _this.context.selectable.register(_this);
            };
            _this.getSelectableRef = function (ref) {
                _this.node = ref;
            };
            return _this;
        }
        SelectableItem.prototype.componentDidMount = function () {
            this.registerSelectable();
        };
        SelectableItem.prototype.componentWillUnmount = function () {
            this.context.selectable.unregister(this);
        };
        SelectableItem.prototype.render = function () {
            return (react_1.default.createElement(WrappedComponent, __assign({}, this.props, this.state, { selectableRef: this.getSelectableRef })));
        };
        return SelectableItem;
    }(react_1.Component)),
    _a.contextType = Context_1.default,
    _a.propTypes = {
        isSelected: prop_types_1.bool
    },
    _a.defaultProps = {
        isSelected: false
    },
    _a; };
exports.default = createSelectable;
//# sourceMappingURL=CreateSelectable.js.map