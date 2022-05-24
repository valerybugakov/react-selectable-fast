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
exports.SelectableGroup = void 0;
const react_1 = __importStar(require("react"));
const utils_1 = require("./utils");
const SelectableGroup_context_1 = require("./SelectableGroup.context");
const Selectbox_1 = require("./Selectbox");
class SelectableGroup extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = { selectionMode: false };
        this.mouseDownStarted = false;
        this.mouseMoveStarted = false;
        this.mouseMoved = false;
        this.mouseUpStarted = false;
        this.selectionStarted = false;
        this.deselectionStarted = false;
        this.mouseDownData = {
            selectboxY: 0,
            selectboxX: 0,
            target: null
        };
        this.registry = new Set();
        this.selectedItems = new Set();
        this.selectingItems = new Set();
        this.ignoreCheckCache = new Map();
        this.ignoreList = this.props.ignoreList.concat(['.selectable-select-all', '.selectable-deselect-all']);
        this.ignoreListNodes = [];
        this.setSelectboxState = null;
        this.selectableGroup = null;
        this.scrollContainer = null;
        this.maxScrollTop = 0;
        this.maxScrollLeft = 0;
        this.scrollBounds = null;
        this.containerScroll = {
            scrollTop: 0,
            scrollLeft: 0
        };
        this.documentScroll = {
            scrollTop: 0,
            scrollLeft: 0
        };
        this.saveContainerScroll = () => {
            const { scrollTop, scrollLeft } = this.scrollContainer;
            this.containerScroll = {
                scrollTop,
                scrollLeft
            };
        };
        this.saveDocumentScroll = () => {
            const { documentScrollLeft, documentScrollTop } = (0, utils_1.getDocumentScroll)();
            this.documentScroll = {
                scrollTop: documentScrollTop,
                scrollLeft: documentScrollLeft
            };
        };
        this.updateRegistry = () => {
            for (const selectableItem of this.registry.values()) {
                selectableItem.updateBounds(this.containerDocumentScroll);
            }
        };
        this.registerSelectable = (selectableItem) => {
            this.registry.add(selectableItem);
            if (selectableItem.state.isSelected) {
                this.selectedItems.add(selectableItem);
            }
        };
        this.unregisterSelectable = (selectableItem) => {
            this.registry.delete(selectableItem);
            const isRemoved = this.selectedItems.has(selectableItem) || this.selectingItems.has(selectableItem);
            this.selectedItems.delete(selectableItem);
            this.selectingItems.delete(selectableItem);
            if (isRemoved) {
                this.props.onSelectedItemUnmount(selectableItem, [...this.selectedItems]);
            }
        };
        this.updateContainerScroll = (evt) => {
            const { scrollTop, scrollLeft } = this.containerScroll;
            this.checkScrollTop(evt.clientY, scrollTop);
            this.checkScrollBottom(evt.clientY, scrollTop);
            this.checkScrollLeft(evt.clientX, scrollLeft);
            this.checkScrollRight(evt.clientX, scrollLeft);
        };
        this.getScrollStep = (offset) => {
            const { minimumSpeedFactor, scrollSpeed } = this.props;
            return Math.max(offset, minimumSpeedFactor) * scrollSpeed;
        };
        this.checkScrollTop = (clientY, currentTop) => {
            const offset = this.scrollBounds.top - clientY;
            if (offset > 0 || clientY < 0) {
                this.scrollContainer.scrollTop = currentTop - this.getScrollStep(offset);
            }
        };
        this.checkScrollBottom = (clientY, currentTop) => {
            const offset = clientY - this.scrollBounds.bottom;
            if (offset > 0 || clientY > window.innerHeight) {
                const newTop = currentTop + this.getScrollStep(offset);
                this.scrollContainer.scrollTop = Math.min(newTop, this.maxScrollTop);
            }
        };
        this.checkScrollLeft = (clientX, currentLeft) => {
            const offset = this.scrollBounds.left - clientX;
            if (offset > 0 || clientX < 0) {
                const newLeft = currentLeft - this.getScrollStep(offset);
                this.scrollContainer.scrollLeft = newLeft;
            }
        };
        this.checkScrollRight = (clientX, currentLeft) => {
            const offset = clientX - this.scrollBounds.right;
            if (offset > 0 || clientX > window.innerWidth) {
                const newLeft = currentLeft + this.getScrollStep(offset);
                this.scrollContainer.scrollLeft = Math.min(newLeft, this.maxScrollLeft);
            }
        };
        this.updateSelectBox = (event) => {
            const evt = (0, utils_1.castTouchToMouseEvent)(event);
            this.updateContainerScroll(evt);
            if (this.mouseMoveStarted) {
                return;
            }
            this.mouseMoveStarted = true;
            this.mouseMoved = true;
            const { mouseDownData } = this;
            const { clientX, clientY } = evt;
            const pointY = clientY - this.scrollBounds.top + this.containerScroll.scrollTop;
            const selectboxY = Math.min(pointY, mouseDownData.selectboxY);
            const pointX = clientX - this.scrollBounds.left + this.containerScroll.scrollLeft;
            const selectboxX = Math.min(pointX, mouseDownData.selectboxX);
            const selectboxState = {
                x: selectboxX,
                y: selectboxY,
                width: Math.abs(pointX - mouseDownData.selectboxX),
                height: Math.abs(pointY - mouseDownData.selectboxY)
            };
            this.setSelectboxState(selectboxState);
            const selectboxBounds = {
                top: selectboxState.y + this.scrollBounds.top + this.documentScroll.scrollTop,
                left: selectboxState.x + this.scrollBounds.left + this.documentScroll.scrollLeft,
                width: selectboxState.width,
                height: selectboxState.height,
                offsetWidth: selectboxState.width || 1,
                offsetHeight: selectboxState.height || 1
            };
            this.selectItems(selectboxBounds);
            this.props.duringSelection([...this.selectingItems]);
            this.mouseMoveStarted = false;
        };
        this.selectItems = (selectboxBounds, options = {}) => {
            const { tolerance, enableDeselect, mixedDeselect } = this.props;
            for (const item of this.registry.values()) {
                this.processItem({
                    item,
                    selectboxBounds,
                    tolerance: tolerance,
                    mixedDeselect: mixedDeselect,
                    enableDeselect: enableDeselect,
                    isFromClick: options && options.isFromClick
                });
            }
        };
        this.clearSelection = () => {
            for (const item of this.selectedItems.values()) {
                item.setState({ isSelected: false });
                this.selectedItems.delete(item);
            }
            this.setState({ selectionMode: false });
            this.props.onSelectionFinish([...this.selectedItems], this.selectableGroup);
            this.props.onSelectionClear();
        };
        this.selectAll = () => {
            this.removeIgnoredItemsFromRegistry();
            for (const item of this.registry.values()) {
                if (!item.state.isSelected) {
                    item.setState({ isSelected: true });
                    this.selectedItems.add(item);
                }
            }
            this.setState({ selectionMode: true });
            this.props.onSelectionFinish([...this.selectedItems], this.selectableGroup);
        };
        this.mouseDown = (e) => {
            const isNotLeftButtonClick = !e.type.includes('touch') &&
                !(0, utils_1.detectMouseButton)(e, 1, {
                    allowAltClick: this.props.allowAltClick,
                    allowCtrlClick: this.props.allowCtrlClick,
                    allowMetaClick: this.props.allowMetaClick,
                    allowShiftClick: this.props.allowShiftClick
                });
            if (this.mouseDownStarted || this.props.disabled || isNotLeftButtonClick) {
                return;
            }
            this.removeIgnoredItemsFromRegistry();
            if (this.isInIgnoreList(e.target)) {
                this.mouseDownStarted = false;
                return;
            }
            if (this.props.resetOnStart) {
                this.clearSelection();
            }
            this.mouseDownStarted = true;
            this.mouseUpStarted = false;
            const evt = (0, utils_1.castTouchToMouseEvent)(e);
            if (!this.props.globalMouse && !(0, utils_1.isNodeInRoot)(evt.target, this.selectableGroup)) {
                const [bounds] = (0, utils_1.getBoundsForNode)(this.selectableGroup, this.documentScroll);
                const collides = (0, utils_1.doObjectsCollide)({
                    top: bounds.top,
                    left: bounds.left,
                    width: 0,
                    height: 0,
                    offsetHeight: bounds.offsetHeight,
                    offsetWidth: bounds.offsetWidth
                }, {
                    top: evt.pageY,
                    left: evt.pageX,
                    width: 0,
                    height: 0,
                    offsetWidth: 0,
                    offsetHeight: 0
                });
                if (!collides) {
                    return;
                }
            }
            this.updateRootBounds();
            this.updateRegistry();
            this.mouseDownData = {
                target: evt.target,
                selectboxY: evt.clientY - this.scrollBounds.top + this.containerScroll.scrollTop,
                selectboxX: evt.clientX - this.scrollBounds.left + this.containerScroll.scrollLeft
            };
            if (this.props.selectingWithoutMouseMove) {
                this.updateSelectBox(evt);
            }
            evt.preventDefault();
            document.addEventListener('mousemove', this.updateSelectBox);
            document.addEventListener('mouseup', this.mouseUp);
            document.addEventListener('touchend', this.mouseUp);
        };
        this.mouseUp = (event) => {
            if (this.mouseUpStarted) {
                return;
            }
            this.mouseUpStarted = true;
            this.mouseDownStarted = false;
            this.removeTempEventListeners();
            if (!this.mouseDownData) {
                return;
            }
            const evt = (0, utils_1.castTouchToMouseEvent)(event);
            const { pageX, pageY } = evt;
            if (!this.mouseMoved && (0, utils_1.isNodeInRoot)(evt.target, this.selectableGroup)) {
                this.handleClick(evt, pageY, pageX);
            }
            else {
                for (const item of this.selectingItems.values()) {
                    item.setState({ isSelected: true, isSelecting: false });
                }
                this.selectedItems = new Set([...this.selectedItems, ...this.selectingItems]);
                this.selectingItems.clear();
                if (evt.which === 1 && this.mouseDownData.target === evt.target) {
                    this.preventEvent(evt.target, 'click');
                }
                this.setSelectboxState({
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0
                });
                this.props.onSelectionFinish([...this.selectedItems], this.selectableGroup);
            }
            this.toggleSelectionMode();
            this.cleanUp();
            this.mouseMoved = false;
        };
        this.keyListener = (evt) => {
            if (evt.keyCode === 27) {
                this.clearSelection();
            }
        };
        this.getGroupRef = (ref) => {
            this.selectableGroup = ref;
        };
        this.getSelectboxSetState = (setState) => {
            this.setSelectboxState = setState;
        };
        this.defaultContainerStyle = {
            position: 'relative'
        };
        this.contextValue = {
            selectable: {
                register: this.registerSelectable,
                unregister: this.unregisterSelectable,
                selectAll: this.selectAll,
                clearSelection: this.clearSelection,
                getScrolledContainer: () => this.scrollContainer
            }
        };
    }
    componentDidMount() {
        if (this.props.scrollContainer) {
            this.scrollContainer = document.querySelector(this.props.scrollContainer);
        }
        else {
            this.scrollContainer = this.selectableGroup;
        }
        this.scrollContainer.addEventListener('scroll', this.saveContainerScroll);
        document.addEventListener('scroll', this.saveDocumentScroll);
        this.selectableGroup.addEventListener('mousedown', this.mouseDown);
        this.selectableGroup.addEventListener('touchstart', this.mouseDown);
        if (this.props.deselectOnEsc) {
            document.addEventListener('keydown', this.keyListener);
            document.addEventListener('keyup', this.keyListener);
        }
        this.removeIgnoredItemsFromRegistry();
    }
    componentWillUnmount() {
        this.scrollContainer.removeEventListener('scroll', this.saveContainerScroll);
        document.removeEventListener('scroll', this.saveDocumentScroll);
        this.selectableGroup.removeEventListener('mousedown', this.mouseDown);
        this.selectableGroup.removeEventListener('touchstart', this.mouseDown);
        if (this.props.deselectOnEsc) {
            document.removeEventListener('keydown', this.keyListener);
            document.removeEventListener('keyup', this.keyListener);
        }
        this.removeTempEventListeners();
        this.selectedItems.clear();
        this.selectingItems.clear();
    }
    get containerDocumentScroll() {
        return {
            scrollTop: this.containerScroll.scrollTop + this.documentScroll.scrollTop,
            scrollLeft: this.containerScroll.scrollLeft + this.documentScroll.scrollLeft
        };
    }
    removeTempEventListeners() {
        document.removeEventListener('mousemove', this.updateSelectBox);
        document.removeEventListener('mouseup', this.mouseUp);
        document.removeEventListener('touchend', this.mouseUp);
    }
    updateRootBounds() {
        this.scrollBounds = this.scrollContainer.getBoundingClientRect();
        this.maxScrollTop = this.scrollContainer.scrollHeight - this.scrollContainer.clientHeight;
        this.maxScrollLeft = this.scrollContainer.scrollWidth - this.scrollContainer.clientWidth;
    }
    toggleSelectionMode() {
        const { selectedItems, state: { selectionMode } } = this;
        if (selectedItems.size && !selectionMode) {
            this.setState({ selectionMode: true });
        }
        if (!selectedItems.size && selectionMode) {
            this.setState({ selectionMode: false });
        }
    }
    processItem(options) {
        const { item, tolerance, selectboxBounds, enableDeselect, mixedDeselect, isFromClick } = options;
        const { delta } = this.props;
        const isCollided = (0, utils_1.doObjectsCollide)(selectboxBounds, item.bounds, tolerance, delta);
        const { isSelecting, isSelected } = item.state;
        if (isFromClick && isCollided) {
            if (isSelected) {
                this.selectedItems.delete(item);
            }
            else {
                this.selectedItems.add(item);
            }
            item.setState({ isSelected: !isSelected });
            this.clickedItem = item;
            return item;
        }
        if (!isFromClick && isCollided) {
            if (isSelected && enableDeselect && (!this.selectionStarted || mixedDeselect)) {
                item.setState({ isSelected: false });
                item.deselected = true;
                this.deselectionStarted = true;
                return this.selectedItems.delete(item);
            }
            const canSelect = mixedDeselect ? !item.deselected : !this.deselectionStarted;
            if (!isSelecting && !isSelected && canSelect) {
                item.setState({ isSelecting: true });
                this.selectionStarted = true;
                this.selectingItems.add(item);
                return { updateSelecting: true };
            }
        }
        if (!isFromClick && !isCollided && isSelecting) {
            if (this.selectingItems.has(item)) {
                item.setState({ isSelecting: false });
                this.selectingItems.delete(item);
                return { updateSelecting: true };
            }
        }
        return null;
    }
    isInIgnoreList(target) {
        if (!target) {
            return;
        }
        if (this.ignoreCheckCache.get(target) !== undefined) {
            return this.ignoreCheckCache.get(target);
        }
        const shouldBeIgnored = this.ignoreListNodes.some(ignoredNode => target === ignoredNode || ignoredNode.contains(target));
        this.ignoreCheckCache.set(target, shouldBeIgnored);
        return shouldBeIgnored;
    }
    removeIgnoredItemsFromRegistry() {
        this.ignoreListNodes = Array.from(document.querySelectorAll(this.ignoreList.join(', ')));
        this.registry = new Set([...this.registry].filter(item => !this.isInIgnoreList(item.node)));
        this.selectedItems = new Set([...this.selectedItems].filter(item => !this.isInIgnoreList(item.node)));
    }
    preventEvent(target, type) {
        const preventHandler = (evt) => {
            target.removeEventListener(type, preventHandler, true);
            evt.preventDefault();
            evt.stopPropagation();
        };
        target.addEventListener(type, preventHandler, true);
    }
    cleanUp() {
        this.deselectionStarted = false;
        this.selectionStarted = false;
        if (this.props.mixedDeselect) {
            for (const item of this.registry.values()) {
                item.deselected = false;
            }
        }
    }
    handleClick(evt, top, left) {
        if (!this.props.selectOnClick) {
            return;
        }
        const { clickClassName, allowClickWithoutSelected, onSelectionFinish } = this.props;
        const classNames = evt.target.classList || [];
        const isMouseUpOnClickElement = Array.from(classNames).includes(clickClassName);
        if (allowClickWithoutSelected ||
            this.selectedItems.size ||
            isMouseUpOnClickElement ||
            evt.ctrlKey) {
            this.selectItems({
                top,
                left,
                width: 0,
                height: 0,
                offsetWidth: 0,
                offsetHeight: 0
            }, { isFromClick: true });
            onSelectionFinish([...this.selectedItems], this.selectableGroup, this.clickedItem);
            if (evt.which === 1) {
                this.preventEvent(evt.target, 'click');
            }
            if (evt.which === 2 || evt.which === 3) {
                this.preventEvent(evt.target, 'contextmenu');
            }
        }
    }
    render() {
        const { selectionMode } = this.state;
        const { component: GroupComponent = 'div', className, style, selectionModeClass, fixedPosition, selectboxClassName, children } = this.props;
        return (react_1.default.createElement(SelectableGroup_context_1.SelectableGroupContext.Provider, { value: this.contextValue },
            react_1.default.createElement(GroupComponent, { ref: this.getGroupRef, style: { ...this.defaultContainerStyle, ...style }, className: `${className} ${selectionMode ? selectionModeClass : ''}` },
                children,
                react_1.default.createElement(Selectbox_1.Selectbox, { getSetState: this.getSelectboxSetState, className: selectboxClassName, fixedPosition: fixedPosition }))));
    }
}
exports.SelectableGroup = SelectableGroup;
SelectableGroup.defaultProps = {
    clickClassName: '',
    tolerance: 0,
    globalMouse: false,
    ignoreList: [],
    scrollSpeed: 0.25,
    minimumSpeedFactor: 60,
    duringSelection: utils_1.noop,
    onSelectionFinish: utils_1.noop,
    onSelectionClear: utils_1.noop,
    onSelectedItemUnmount: utils_1.noop,
    allowClickWithoutSelected: true,
    selectionModeClass: 'in-selection-mode',
    resetOnStart: false,
    disabled: false,
    deselectOnEsc: true,
    fixedPosition: false,
    delta: 1,
    allowAltClick: false,
    allowCtrlClick: false,
    allowMetaClick: false,
    allowShiftClick: false,
    selectOnClick: true
};
//# sourceMappingURL=SelectableGroup.js.map