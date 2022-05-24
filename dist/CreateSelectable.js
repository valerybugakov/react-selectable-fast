"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSelectable = void 0;
const react_1 = __importDefault(require("react"));
const utils_1 = require("./utils");
const SelectableGroup_context_1 = require("./SelectableGroup.context");
const createSelectable = (WrappedComponent) => { var _a; return _a = class SelectableItem extends react_1.default.Component {
        constructor() {
            super(...arguments);
            this.state = {
                isSelected: this.props.isSelected == true,
                isSelecting: false,
            };
            this.node = null;
            this.bounds = null;
            this.deselected = false;
            this.registerSelectable = (containerScroll) => {
                console.log("registerSelectable", containerScroll);
            };
            this.updateBounds = (containerScroll) => {
                this.bounds = (0, utils_1.getBoundsForNode)(this.node, containerScroll);
            };
            this.getSelectableRef = (ref) => {
                this.node = ref;
            };
        }
        componentDidMount() {
            this.updateBounds();
            this.context.selectable.register(this);
        }
        componentWillUnmount() {
            this.context.selectable.unregister(this);
        }
        render() {
            return (react_1.default.createElement(WrappedComponent, { ...this.props, ...this.state, selectableRef: this.getSelectableRef }));
        }
    },
    _a.contextType = SelectableGroup_context_1.SelectableGroupContext,
    _a.defaultProps = {
        isSelected: false
    },
    _a; };
exports.createSelectable = createSelectable;
//# sourceMappingURL=CreateSelectable.js.map