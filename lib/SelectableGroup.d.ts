import { Component, ComponentType, CSSProperties, PropsWithChildren } from 'react';
import { Maybe, TComputedBounds } from './utils';
import { TSelectableItem } from './Selectable.types';
import { TSetSelectboxState } from './Selectbox';
declare type TSelectItemsOptions = {
    isFromClick?: boolean;
};
declare type TMouseDownData = {
    selectboxY: number;
    selectboxX: number;
    target: HTMLElement | null;
};
declare type TProcessItemOptions = TSelectItemsOptions & {
    item: TSelectableItem;
    tolerance: number;
    selectboxBounds: TComputedBounds;
    enableDeselect: boolean;
    mixedDeselect: boolean;
};
export declare type TSelectableGroupProps = PropsWithChildren<{
    selectingWithoutMouseMove?: boolean;
    globalMouse?: boolean;
    ignoreList?: string[];
    scrollSpeed?: number;
    minimumSpeedFactor?: number;
    allowClickWithoutSelected?: boolean;
    className?: string;
    clickClassName?: string;
    selectboxClassName?: string;
    style?: CSSProperties;
    selectionModeClass?: string;
    onSelectionFinish?: Function;
    onSelectionClear?: Function;
    onSelectedItemUnmount?: Function;
    enableDeselect?: boolean;
    mixedDeselect?: boolean;
    deselectOnEsc?: boolean;
    resetOnStart?: boolean;
    disabled?: boolean;
    delta?: number;
    allowAltClick?: boolean;
    allowCtrlClick?: boolean;
    allowMetaClick?: boolean;
    allowShiftClick?: boolean;
    selectOnClick?: boolean;
    scrollContainer?: string;
    duringSelection?: Function;
    component?: ComponentType;
    tolerance?: number;
    fixedPosition?: boolean;
}>;
export declare class SelectableGroup extends Component<TSelectableGroupProps> {
    static defaultProps: {
        clickClassName: string;
        tolerance: number;
        globalMouse: boolean;
        ignoreList: never[];
        scrollSpeed: number;
        minimumSpeedFactor: number;
        duringSelection: () => void;
        onSelectionFinish: () => void;
        onSelectionClear: () => void;
        onSelectedItemUnmount: () => void;
        allowClickWithoutSelected: boolean;
        selectionModeClass: string;
        resetOnStart: boolean;
        disabled: boolean;
        deselectOnEsc: boolean;
        fixedPosition: boolean;
        delta: number;
        allowAltClick: boolean;
        allowCtrlClick: boolean;
        allowMetaClick: boolean;
        allowShiftClick: boolean;
        selectOnClick: boolean;
    };
    state: {
        selectionMode: boolean;
    };
    mouseDownStarted: boolean;
    mouseMoveStarted: boolean;
    mouseMoved: boolean;
    mouseUpStarted: boolean;
    selectionStarted: boolean;
    deselectionStarted: boolean;
    clickedItem?: TSelectableItem;
    mouseDownData: TMouseDownData;
    registry: Set<TSelectableItem>;
    selectedItems: Set<TSelectableItem>;
    selectingItems: Set<TSelectableItem>;
    ignoreCheckCache: Map<HTMLElement, boolean>;
    ignoreList: string[];
    ignoreListNodes: HTMLElement[];
    setSelectboxState: Maybe<TSetSelectboxState>;
    selectableGroup: Maybe<HTMLElement>;
    scrollContainer: Maybe<HTMLElement>;
    maxScrollTop: number;
    maxScrollLeft: number;
    scrollBounds: Maybe<DOMRect | ClientRect>;
    containerScroll: {
        scrollTop: number;
        scrollLeft: number;
    };
    documentScroll: {
        scrollTop: number;
        scrollLeft: number;
    };
    componentDidMount(): void;
    componentWillUnmount(): void;
    saveContainerScroll: () => void;
    saveDocumentScroll: () => void;
    get containerDocumentScroll(): {
        scrollTop: number;
        scrollLeft: number;
    };
    removeTempEventListeners(): void;
    updateRootBounds(): void;
    updateRegistry: () => void;
    registerSelectable: (selectableItem: TSelectableItem) => void;
    unregisterSelectable: (selectableItem: TSelectableItem) => void;
    toggleSelectionMode(): void;
    private updateContainerScroll;
    getScrollStep: (offset: number) => number;
    checkScrollTop: (clientY: number, currentTop: number) => void;
    checkScrollBottom: (clientY: number, currentTop: number) => void;
    checkScrollLeft: (clientX: number, currentLeft: number) => void;
    checkScrollRight: (clientX: number, currentLeft: number) => void;
    updateSelectBox: (event: Event) => void;
    selectItems: (selectboxBounds: TComputedBounds, options?: TSelectItemsOptions) => void;
    processItem(options: TProcessItemOptions): boolean | TSelectableItem | {
        updateSelecting: boolean;
    } | null;
    clearSelection: () => void;
    selectAll: () => void;
    isInIgnoreList(target: HTMLElement | null): boolean | undefined;
    removeIgnoredItemsFromRegistry(): void;
    mouseDown: (e: Event) => void;
    preventEvent(target: HTMLElement, type: string): void;
    private mouseUp;
    keyListener: (evt: KeyboardEvent) => void;
    cleanUp(): void;
    getGroupRef: (ref: HTMLElement | null) => void;
    getSelectboxSetState: (setState: TSetSelectboxState) => void;
    defaultContainerStyle: CSSProperties;
    contextValue: {
        selectable: {
            register: (selectableItem: TSelectableItem) => void;
            unregister: (selectableItem: TSelectableItem) => void;
            selectAll: () => void;
            clearSelection: () => void;
            getScrolledContainer: () => Maybe<HTMLElement>;
        };
    };
    handleClick(evt: any, top: number, left: number): void;
    render(): JSX.Element;
}
export {};
