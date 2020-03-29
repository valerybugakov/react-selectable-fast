import { Component } from 'react';
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
export declare type TSelectableItem = Component & {
    registerSelectable(containerScroll?: TGetBoundsForNodeArgs): void;
    state: TSelectableItemState;
    deselected: boolean;
    node: Maybe<HTMLDivElement>;
    bounds: Maybe<TComputedBounds[]>;
};
export declare type TSelectableItemProps = TSelectableItemState & {
    selectableRef(node: HTMLElement | null): void;
};
export {};
