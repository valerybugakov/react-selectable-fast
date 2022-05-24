import React from 'react';
import { TSelectableItemState, TSelectableItemProps } from './Selectable.types';
declare type TAddedProps = Partial<Pick<TSelectableItemProps, 'isSelected'>>;
export declare const createSelectable: <T extends unknown>(WrappedComponent: React.ComponentType<TSelectableItemState & {
    selectableRef(node: HTMLElement | null): void;
} & T>) => React.ComponentType<T & Partial<Pick<TSelectableItemProps, "isSelected">>>;
export {};
