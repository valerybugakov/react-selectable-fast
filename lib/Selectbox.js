"use strict";
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Selectbox = void 0;
var react_1 = __importStar(require("react"));
var initialState = {
    y: 0,
    x: 0,
    width: 0,
    height: 0,
};
function Selectbox(props) {
    var fixedPosition = props.fixedPosition, getSetState = props.getSetState, className = props.className;
    var _a = __read((0, react_1.useState)(initialState), 2), state = _a[0], setState = _a[1];
    (0, react_1.useEffect)(function () {
        getSetState(setState);
    }, []);
    var boxStyle = {
        left: state.x,
        top: state.y,
        width: state.width,
        height: state.height,
        zIndex: 9000,
        position: fixedPosition ? 'fixed' : 'absolute',
        cursor: 'default',
        willChange: 'transform',
        transform: 'translateZ(0)',
    };
    return react_1.default.createElement("div", { className: className, style: boxStyle });
}
exports.Selectbox = Selectbox;
Selectbox.defaultProps = {
    className: 'selectable-selectbox',
};
//# sourceMappingURL=Selectbox.js.map