import { Component } from 'react';
declare type TSelectboxProps = {
    fixedPosition: boolean;
    className: string;
};
declare class Selectbox extends Component<TSelectboxProps> {
    static defaultProps: {
        className: string;
    };
    state: {
        y: number;
        x: number;
        width: number;
        height: number;
        isSelecting: boolean;
    };
    selectbox: HTMLDivElement | null;
    getRef: () => import("./utils").Maybe<HTMLDivElement>;
    getSelectboxRef: (ref: import("./utils").Maybe<HTMLDivElement>) => void;
    render(): JSX.Element;
}
export default Selectbox;
