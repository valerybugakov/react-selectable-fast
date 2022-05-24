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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Selectbox = void 0;
const react_1 = __importStar(require("react"));
const initialState = {
    y: 0,
    x: 0,
    width: 0,
    height: 0,
};
function Selectbox(props) {
    const { fixedPosition, getSetState, className } = props;
    const [state, setState] = (0, react_1.useState)(initialState);
    (0, react_1.useEffect)(() => {
        getSetState(setState);
    }, []);
    const boxStyle = {
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