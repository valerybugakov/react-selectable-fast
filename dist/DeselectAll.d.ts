import React, { Component, FunctionComponent, ReactNode } from 'react';
import { SelectableGroupContext } from './SelectableGroup.context';
declare type TDeselectAllProps = {
    children: ReactNode;
    component?: string | FunctionComponent;
    className?: string;
    [key: string]: any;
};
export declare class DeselectAll extends Component<TDeselectAllProps> {
    static contextType: React.Context<import("./Selectable.types").TSelectableGroupContext>;
    context: React.ContextType<typeof SelectableGroupContext>;
    root: HTMLDivElement | null;
    componentDidMount(): void;
    getRootRef: (ref: HTMLDivElement | null) => void;
    render(): JSX.Element;
}
export {};
