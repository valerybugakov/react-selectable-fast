import React, { Component, ReactNode } from 'react';
import { ReactComponentLike } from 'prop-types';
declare type TSelectAllButton = {
    children: ReactNode;
    component?: ReactComponentLike;
    className?: string;
    [key: string]: any;
};
declare class SelectAllButton extends Component<TSelectAllButton> {
    static contextType: React.Context<import("./Selectable.types").TSelectableGroupContext>;
    root: HTMLDivElement | null;
    componentDidMount(): void;
    getRootRef: (ref: import("./utils").Maybe<HTMLDivElement>) => void;
    render(): JSX.Element;
}
export default SelectAllButton;
