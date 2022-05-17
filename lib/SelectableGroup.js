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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectableGroup = void 0;
var react_1 = __importStar(require("react"));
var utils_1 = require("./utils");
var SelectableGroup_context_1 = require("./SelectableGroup.context");
var Selectbox_1 = require("./Selectbox");
var SelectableGroup = (function (_super) {
    __extends(SelectableGroup, _super);
    function SelectableGroup() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { selectionMode: false };
        _this.mouseDownStarted = false;
        _this.mouseMoveStarted = false;
        _this.mouseMoved = false;
        _this.mouseUpStarted = false;
        _this.selectionStarted = false;
        _this.deselectionStarted = false;
        _this.mouseDownData = {
            selectboxY: 0,
            selectboxX: 0,
            target: null
        };
        _this.registry = new Set();
        _this.selectedItems = new Set();
        _this.selectingItems = new Set();
        _this.ignoreCheckCache = new Map();
        _this.ignoreList = _this.props.ignoreList.concat(['.selectable-select-all', '.selectable-deselect-all']);
        _this.ignoreListNodes = [];
        _this.setSelectboxState = null;
        _this.selectableGroup = null;
        _this.scrollContainer = null;
        _this.maxScrollTop = 0;
        _this.maxScrollLeft = 0;
        _this.scrollBounds = null;
        _this.containerScroll = {
            scrollTop: 0,
            scrollLeft: 0
        };
        _this.documentScroll = {
            scrollTop: 0,
            scrollLeft: 0
        };
        _this.saveContainerScroll = function () {
            var _a = _this.scrollContainer, scrollTop = _a.scrollTop, scrollLeft = _a.scrollLeft;
            _this.containerScroll = {
                scrollTop: scrollTop,
                scrollLeft: scrollLeft
            };
        };
        _this.saveDocumentScroll = function () {
            var _a = (0, utils_1.getDocumentScroll)(), documentScrollLeft = _a.documentScrollLeft, documentScrollTop = _a.documentScrollTop;
            _this.documentScroll = {
                scrollTop: documentScrollTop,
                scrollLeft: documentScrollLeft
            };
        };
        _this.updateRegistry = function () {
            var e_1, _a;
            try {
                for (var _b = __values(_this.registry.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var selectableItem = _c.value;
                    selectableItem.updateBounds(_this.containerDocumentScroll);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        _this.registerSelectable = function (selectableItem) {
            _this.registry.add(selectableItem);
            if (selectableItem.state.isSelected) {
                _this.selectedItems.add(selectableItem);
            }
        };
        _this.unregisterSelectable = function (selectableItem) {
            _this.registry.delete(selectableItem);
            var isRemoved = _this.selectedItems.has(selectableItem) || _this.selectingItems.has(selectableItem);
            _this.selectedItems.delete(selectableItem);
            _this.selectingItems.delete(selectableItem);
            if (isRemoved) {
                _this.props.onSelectedItemUnmount(selectableItem, __spreadArray([], __read(_this.selectedItems), false));
            }
        };
        _this.updateContainerScroll = function (evt) {
            var _a = _this.containerScroll, scrollTop = _a.scrollTop, scrollLeft = _a.scrollLeft;
            _this.checkScrollTop(evt.clientY, scrollTop);
            _this.checkScrollBottom(evt.clientY, scrollTop);
            _this.checkScrollLeft(evt.clientX, scrollLeft);
            _this.checkScrollRight(evt.clientX, scrollLeft);
        };
        _this.getScrollStep = function (offset) {
            var _a = _this.props, minimumSpeedFactor = _a.minimumSpeedFactor, scrollSpeed = _a.scrollSpeed;
            return Math.max(offset, minimumSpeedFactor) * scrollSpeed;
        };
        _this.checkScrollTop = function (clientY, currentTop) {
            var offset = _this.scrollBounds.top - clientY;
            if (offset > 0 || clientY < 0) {
                _this.scrollContainer.scrollTop = currentTop - _this.getScrollStep(offset);
            }
        };
        _this.checkScrollBottom = function (clientY, currentTop) {
            var offset = clientY - _this.scrollBounds.bottom;
            if (offset > 0 || clientY > window.innerHeight) {
                var newTop = currentTop + _this.getScrollStep(offset);
                _this.scrollContainer.scrollTop = Math.min(newTop, _this.maxScrollTop);
            }
        };
        _this.checkScrollLeft = function (clientX, currentLeft) {
            var offset = _this.scrollBounds.left - clientX;
            if (offset > 0 || clientX < 0) {
                var newLeft = currentLeft - _this.getScrollStep(offset);
                _this.scrollContainer.scrollLeft = newLeft;
            }
        };
        _this.checkScrollRight = function (clientX, currentLeft) {
            var offset = clientX - _this.scrollBounds.right;
            if (offset > 0 || clientX > window.innerWidth) {
                var newLeft = currentLeft + _this.getScrollStep(offset);
                _this.scrollContainer.scrollLeft = Math.min(newLeft, _this.maxScrollLeft);
            }
        };
        _this.updateSelectBox = function (event) {
            var evt = (0, utils_1.castTouchToMouseEvent)(event);
            _this.updateContainerScroll(evt);
            if (_this.mouseMoveStarted) {
                return;
            }
            _this.mouseMoveStarted = true;
            _this.mouseMoved = true;
            var mouseDownData = _this.mouseDownData;
            var clientX = evt.clientX, clientY = evt.clientY;
            var pointY = clientY - _this.scrollBounds.top + _this.containerScroll.scrollTop;
            var selectboxY = Math.min(pointY, mouseDownData.selectboxY);
            var pointX = clientX - _this.scrollBounds.left + _this.containerScroll.scrollLeft;
            var selectboxX = Math.min(pointX, mouseDownData.selectboxX);
            var selectboxState = {
                x: selectboxX,
                y: selectboxY,
                width: Math.abs(pointX - mouseDownData.selectboxX),
                height: Math.abs(pointY - mouseDownData.selectboxY)
            };
            _this.setSelectboxState(selectboxState);
            var selectboxBounds = {
                top: selectboxState.y + _this.scrollBounds.top + _this.documentScroll.scrollTop,
                left: selectboxState.x + _this.scrollBounds.left + _this.documentScroll.scrollLeft,
                width: selectboxState.width,
                height: selectboxState.height,
                offsetWidth: selectboxState.width || 1,
                offsetHeight: selectboxState.height || 1
            };
            _this.selectItems(selectboxBounds);
            _this.props.duringSelection(__spreadArray([], __read(_this.selectingItems), false));
            _this.mouseMoveStarted = false;
        };
        _this.selectItems = function (selectboxBounds, options) {
            var e_2, _a;
            if (options === void 0) { options = {}; }
            var _b = _this.props, tolerance = _b.tolerance, enableDeselect = _b.enableDeselect, mixedDeselect = _b.mixedDeselect;
            try {
                for (var _c = __values(_this.registry.values()), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var item = _d.value;
                    _this.processItem({
                        item: item,
                        selectboxBounds: selectboxBounds,
                        tolerance: tolerance,
                        mixedDeselect: mixedDeselect,
                        enableDeselect: enableDeselect,
                        isFromClick: options && options.isFromClick
                    });
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_2) throw e_2.error; }
            }
        };
        _this.clearSelection = function () {
            var e_3, _a;
            try {
                for (var _b = __values(_this.selectedItems.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var item = _c.value;
                    item.setState({ isSelected: false });
                    _this.selectedItems.delete(item);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_3) throw e_3.error; }
            }
            _this.setState({ selectionMode: false });
            _this.props.onSelectionFinish(__spreadArray([], __read(_this.selectedItems), false), _this.selectableGroup);
            _this.props.onSelectionClear();
        };
        _this.selectAll = function () {
            var e_4, _a;
            _this.removeIgnoredItemsFromRegistry();
            try {
                for (var _b = __values(_this.registry.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var item = _c.value;
                    if (!item.state.isSelected) {
                        item.setState({ isSelected: true });
                        _this.selectedItems.add(item);
                    }
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_4) throw e_4.error; }
            }
            _this.setState({ selectionMode: true });
            _this.props.onSelectionFinish(__spreadArray([], __read(_this.selectedItems), false), _this.selectableGroup);
        };
        _this.mouseDown = function (e) {
            var isNotLeftButtonClick = !e.type.includes('touch') &&
                !(0, utils_1.detectMouseButton)(e, 1, {
                    allowAltClick: _this.props.allowAltClick,
                    allowCtrlClick: _this.props.allowCtrlClick,
                    allowMetaClick: _this.props.allowMetaClick,
                    allowShiftClick: _this.props.allowShiftClick
                });
            if (_this.mouseDownStarted || _this.props.disabled || isNotLeftButtonClick) {
                return;
            }
            _this.removeIgnoredItemsFromRegistry();
            if (_this.isInIgnoreList(e.target)) {
                _this.mouseDownStarted = false;
                return;
            }
            if (_this.props.resetOnStart) {
                _this.clearSelection();
            }
            _this.mouseDownStarted = true;
            _this.mouseUpStarted = false;
            var evt = (0, utils_1.castTouchToMouseEvent)(e);
            if (!_this.props.globalMouse && !(0, utils_1.isNodeInRoot)(evt.target, _this.selectableGroup)) {
                var _a = __read((0, utils_1.getBoundsForNode)(_this.selectableGroup, _this.documentScroll), 1), bounds = _a[0];
                var collides = (0, utils_1.doObjectsCollide)({
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
            _this.updateRootBounds();
            _this.updateRegistry();
            _this.mouseDownData = {
                target: evt.target,
                selectboxY: evt.clientY - _this.scrollBounds.top + _this.containerScroll.scrollTop,
                selectboxX: evt.clientX - _this.scrollBounds.left + _this.containerScroll.scrollLeft
            };
            if (_this.props.selectingWithoutMouseMove) {
                _this.updateSelectBox(evt);
            }
            evt.preventDefault();
            document.addEventListener('mousemove', _this.updateSelectBox);
            document.addEventListener('mouseup', _this.mouseUp);
            document.addEventListener('touchend', _this.mouseUp);
        };
        _this.mouseUp = function (event) {
            var e_5, _a;
            if (_this.mouseUpStarted) {
                return;
            }
            _this.mouseUpStarted = true;
            _this.mouseDownStarted = false;
            _this.removeTempEventListeners();
            if (!_this.mouseDownData) {
                return;
            }
            var evt = (0, utils_1.castTouchToMouseEvent)(event);
            var pageX = evt.pageX, pageY = evt.pageY;
            if (!_this.mouseMoved && (0, utils_1.isNodeInRoot)(evt.target, _this.selectableGroup)) {
                _this.handleClick(evt, pageY, pageX);
            }
            else {
                try {
                    for (var _b = __values(_this.selectingItems.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var item = _c.value;
                        item.setState({ isSelected: true, isSelecting: false });
                    }
                }
                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_5) throw e_5.error; }
                }
                _this.selectedItems = new Set(__spreadArray(__spreadArray([], __read(_this.selectedItems), false), __read(_this.selectingItems), false));
                _this.selectingItems.clear();
                if (evt.which === 1 && _this.mouseDownData.target === evt.target) {
                    _this.preventEvent(evt.target, 'click');
                }
                _this.setSelectboxState({
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0
                });
                _this.props.onSelectionFinish(__spreadArray([], __read(_this.selectedItems), false), _this.selectableGroup);
            }
            _this.toggleSelectionMode();
            _this.cleanUp();
            _this.mouseMoved = false;
        };
        _this.keyListener = function (evt) {
            if (evt.keyCode === 27) {
                _this.clearSelection();
            }
        };
        _this.getGroupRef = function (ref) {
            _this.selectableGroup = ref;
        };
        _this.getSelectboxSetState = function (setState) {
            _this.setSelectboxState = setState;
        };
        _this.defaultContainerStyle = {
            position: 'relative'
        };
        _this.contextValue = {
            selectable: {
                register: _this.registerSelectable,
                unregister: _this.unregisterSelectable,
                selectAll: _this.selectAll,
                clearSelection: _this.clearSelection,
                getScrolledContainer: function () { return _this.scrollContainer; }
            }
        };
        return _this;
    }
    SelectableGroup.prototype.componentDidMount = function () {
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
    };
    SelectableGroup.prototype.componentWillUnmount = function () {
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
    };
    Object.defineProperty(SelectableGroup.prototype, "containerDocumentScroll", {
        get: function () {
            return {
                scrollTop: this.containerScroll.scrollTop + this.documentScroll.scrollTop,
                scrollLeft: this.containerScroll.scrollLeft + this.documentScroll.scrollLeft
            };
        },
        enumerable: false,
        configurable: true
    });
    SelectableGroup.prototype.removeTempEventListeners = function () {
        document.removeEventListener('mousemove', this.updateSelectBox);
        document.removeEventListener('mouseup', this.mouseUp);
        document.removeEventListener('touchend', this.mouseUp);
    };
    SelectableGroup.prototype.updateRootBounds = function () {
        this.scrollBounds = this.scrollContainer.getBoundingClientRect();
        this.maxScrollTop = this.scrollContainer.scrollHeight - this.scrollContainer.clientHeight;
        this.maxScrollLeft = this.scrollContainer.scrollWidth - this.scrollContainer.clientWidth;
    };
    SelectableGroup.prototype.toggleSelectionMode = function () {
        var _a = this, selectedItems = _a.selectedItems, selectionMode = _a.state.selectionMode;
        if (selectedItems.size && !selectionMode) {
            this.setState({ selectionMode: true });
        }
        if (!selectedItems.size && selectionMode) {
            this.setState({ selectionMode: false });
        }
    };
    SelectableGroup.prototype.processItem = function (options) {
        var item = options.item, tolerance = options.tolerance, selectboxBounds = options.selectboxBounds, enableDeselect = options.enableDeselect, mixedDeselect = options.mixedDeselect, isFromClick = options.isFromClick;
        var delta = this.props.delta;
        var isCollided = (0, utils_1.doObjectsCollide)(selectboxBounds, item.bounds, tolerance, delta);
        var _a = item.state, isSelecting = _a.isSelecting, isSelected = _a.isSelected;
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
            var canSelect = mixedDeselect ? !item.deselected : !this.deselectionStarted;
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
    };
    SelectableGroup.prototype.isInIgnoreList = function (target) {
        if (!target) {
            return;
        }
        if (this.ignoreCheckCache.get(target) !== undefined) {
            return this.ignoreCheckCache.get(target);
        }
        var shouldBeIgnored = this.ignoreListNodes.some(function (ignoredNode) { return target === ignoredNode || ignoredNode.contains(target); });
        this.ignoreCheckCache.set(target, shouldBeIgnored);
        return shouldBeIgnored;
    };
    SelectableGroup.prototype.removeIgnoredItemsFromRegistry = function () {
        var _this = this;
        this.ignoreListNodes = Array.from(document.querySelectorAll(this.ignoreList.join(', ')));
        this.registry = new Set(__spreadArray([], __read(this.registry), false).filter(function (item) { return !_this.isInIgnoreList(item.node); }));
        this.selectedItems = new Set(__spreadArray([], __read(this.selectedItems), false).filter(function (item) { return !_this.isInIgnoreList(item.node); }));
    };
    SelectableGroup.prototype.preventEvent = function (target, type) {
        var preventHandler = function (evt) {
            target.removeEventListener(type, preventHandler, true);
            evt.preventDefault();
            evt.stopPropagation();
        };
        target.addEventListener(type, preventHandler, true);
    };
    SelectableGroup.prototype.cleanUp = function () {
        var e_6, _a;
        this.deselectionStarted = false;
        this.selectionStarted = false;
        if (this.props.mixedDeselect) {
            try {
                for (var _b = __values(this.registry.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var item = _c.value;
                    item.deselected = false;
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_6) throw e_6.error; }
            }
        }
    };
    SelectableGroup.prototype.handleClick = function (evt, top, left) {
        if (!this.props.selectOnClick) {
            return;
        }
        var _a = this.props, clickClassName = _a.clickClassName, allowClickWithoutSelected = _a.allowClickWithoutSelected, onSelectionFinish = _a.onSelectionFinish;
        var classNames = evt.target.classList || [];
        var isMouseUpOnClickElement = Array.from(classNames).includes(clickClassName);
        if (allowClickWithoutSelected ||
            this.selectedItems.size ||
            isMouseUpOnClickElement ||
            evt.ctrlKey) {
            this.selectItems({
                top: top,
                left: left,
                width: 0,
                height: 0,
                offsetWidth: 0,
                offsetHeight: 0
            }, { isFromClick: true });
            onSelectionFinish(__spreadArray([], __read(this.selectedItems), false), this.selectableGroup, this.clickedItem);
            if (evt.which === 1) {
                this.preventEvent(evt.target, 'click');
            }
            if (evt.which === 2 || evt.which === 3) {
                this.preventEvent(evt.target, 'contextmenu');
            }
        }
    };
    SelectableGroup.prototype.render = function () {
        var selectionMode = this.state.selectionMode;
        var _a = this.props, _b = _a.component, GroupComponent = _b === void 0 ? 'div' : _b, className = _a.className, style = _a.style, selectionModeClass = _a.selectionModeClass, fixedPosition = _a.fixedPosition, selectboxClassName = _a.selectboxClassName, children = _a.children;
        return (react_1.default.createElement(SelectableGroup_context_1.SelectableGroupContext.Provider, { value: this.contextValue },
            react_1.default.createElement(GroupComponent, { ref: this.getGroupRef, style: __assign(__assign({}, this.defaultContainerStyle), style), className: "".concat(className, " ").concat(selectionMode ? selectionModeClass : '') },
                children,
                react_1.default.createElement(Selectbox_1.Selectbox, { getSetState: this.getSelectboxSetState, className: selectboxClassName, fixedPosition: fixedPosition }))));
    };
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
    return SelectableGroup;
}(react_1.Component));
exports.SelectableGroup = SelectableGroup;
//# sourceMappingURL=SelectableGroup.js.map