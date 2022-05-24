import React, { Component, ReactNode, FunctionComponent } from 'react';
import { SelectableGroupContext } from './SelectableGroup.context';
declare type TSelectAllProps = {
    children: ReactNode;
    component?: string | FunctionComponent;
    className?: string;
    [key: string]: any;
};
export declare class SelectAll extends Component<TSelectAllProps> {
    static contextType: React.Context<import("./Selectable.types").TSelectableGroupContext>;
    context: React.ContextType<typeof SelectableGroupContext>;
    root: HTMLDivElement | null;
    componentDidMount(): void;
    getRootRef: (ref: HTMLDivElement | null) => void;
    render(): JSX.Element;
}
export {};
