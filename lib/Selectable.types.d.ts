import { Maybe, TComputedBounds, TGetBoundsForNodeArgs } from './utils';
declare type TSelectableContext = {
    register(selectableItem: TSelectableItem): void;
    unregister(selectableItem: TSelectableItem): void;
    selectAll(): void;
    clearSelection(): void;
    getScrolledContainer(): Maybe<HTMLElement>;
};
export declare type TSelectableGroupContext = {
    selectable: TSelectableContext;
};
export declare type TSelectableItemState = {
    isSelected: boolean;
    isSelecting: boolean;
};
export declare type TSelectableItem = {
    updateBounds(containerScroll?: TGetBoundsForNodeArgs): void;
    registerSelectable(containerScroll?: TGetBoundsForNodeArgs): void;
    setState(state: any): void;
    state: TSelectableItemState;
    deselected: boolean;
    node: Maybe<HTMLElement>;
    bounds: Maybe<TComputedBounds[]>;
};
export declare type TSelectableItemProps = TSelectableItemState & {
    selectableRef(node: HTMLElement | null): void;
};
export {};
