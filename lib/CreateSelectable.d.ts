import React from 'react';
import { TComputedBounds, TGetBoundsForNodeArgs } from './utils';
import { TSelectableItemState } from './Selectable.types';
declare const createSelectable: (WrappedComponent: React.ComponentType<any>) => {
    new (props: Readonly<any>): {
        state: {
            isSelected: any;
            isSelecting: boolean;
        };
        node: HTMLElement | null;
        bounds: import("./utils").Maybe<TComputedBounds[]>;
        componentDidMount(): void;
        componentWillUnmount(): void;
        registerSelectable: (containerScroll?: TGetBoundsForNodeArgs | undefined) => void;
        getSelectableRef: (ref: HTMLElement | null) => void;
        render(): JSX.Element;
        context: any;
        setState<K extends "isSelected" | "isSelecting">(state: TSelectableItemState | ((prevState: Readonly<TSelectableItemState>, props: Readonly<any>) => TSelectableItemState | Pick<TSelectableItemState, K> | null) | Pick<TSelectableItemState, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<any> & Readonly<{
            children?: React.ReactNode;
        }>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        shouldComponentUpdate?(nextProps: Readonly<any>, nextState: Readonly<TSelectableItemState>, nextContext: any): boolean;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<any>, prevState: Readonly<TSelectableItemState>): any;
        componentDidUpdate?(prevProps: Readonly<any>, prevState: Readonly<TSelectableItemState>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<any>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<any>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<any>, nextState: Readonly<TSelectableItemState>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<any>, nextState: Readonly<TSelectableItemState>, nextContext: any): void;
    };
    new (props: any, context?: any): {
        state: {
            isSelected: any;
            isSelecting: boolean;
        };
        node: HTMLElement | null;
        bounds: import("./utils").Maybe<TComputedBounds[]>;
        componentDidMount(): void;
        componentWillUnmount(): void;
        registerSelectable: (containerScroll?: TGetBoundsForNodeArgs | undefined) => void;
        getSelectableRef: (ref: HTMLElement | null) => void;
        render(): JSX.Element;
        context: any;
        setState<K extends "isSelected" | "isSelecting">(state: TSelectableItemState | ((prevState: Readonly<TSelectableItemState>, props: Readonly<any>) => TSelectableItemState | Pick<TSelectableItemState, K> | null) | Pick<TSelectableItemState, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<any> & Readonly<{
            children?: React.ReactNode;
        }>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        shouldComponentUpdate?(nextProps: Readonly<any>, nextState: Readonly<TSelectableItemState>, nextContext: any): boolean;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<any>, prevState: Readonly<TSelectableItemState>): any;
        componentDidUpdate?(prevProps: Readonly<any>, prevState: Readonly<TSelectableItemState>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<any>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<any>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<any>, nextState: Readonly<TSelectableItemState>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<any>, nextState: Readonly<TSelectableItemState>, nextContext: any): void;
    };
    contextType: React.Context<import("./Selectable.types").TSelectableGroupContext>;
    propTypes: {
        isSelected: import("prop-types").Requireable<boolean>;
    };
    defaultProps: {
        isSelected: boolean;
    };
};
export default createSelectable;
