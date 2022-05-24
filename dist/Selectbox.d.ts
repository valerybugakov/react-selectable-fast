import React from 'react';
export declare type TSetSelectboxState = React.Dispatch<React.SetStateAction<TSelectboxState>>;
export declare type TSelectboxProps = {
    fixedPosition: boolean;
    className: string;
    getSetState(setState: TSetSelectboxState): void;
};
export declare type TSelectboxState = {
    y: number;
    x: number;
    width: number;
    height: number;
};
export declare function Selectbox(props: TSelectboxProps): JSX.Element;
export declare namespace Selectbox {
    var defaultProps: {
        className: string;
    };
}
