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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var Selectbox = (function (_super) {
    __extends(Selectbox, _super);
    function Selectbox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            y: 0,
            x: 0,
            width: 0,
            height: 0,
            isSelecting: false
        };
        _this.selectbox = null;
        _this.getRef = function () { return _this.selectbox; };
        _this.getSelectboxRef = function (ref) {
            _this.selectbox = ref;
        };
        return _this;
    }
    Selectbox.prototype.render = function () {
        var _a = this.props, fixedPosition = _a.fixedPosition, className = _a.className;
        var boxStyle = {
            left: this.state.x,
            top: this.state.y,
            width: this.state.width,
            height: this.state.height,
            zIndex: 9000,
            position: fixedPosition ? 'fixed' : 'absolute',
            cursor: 'default'
        };
        return (react_1.default.createElement("div", null, this.state.isSelecting && (react_1.default.createElement("div", { ref: this.getSelectboxRef, style: boxStyle, className: className }))));
    };
    Selectbox.defaultProps = {
        className: 'selectable-selectbox'
    };
    return Selectbox;
}(react_1.Component));
exports.default = Selectbox;
//# sourceMappingURL=Selectbox.js.map