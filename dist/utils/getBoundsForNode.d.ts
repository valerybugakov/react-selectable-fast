export declare type TGetBoundsForNodeArgs = {
    scrollTop: number;
    scrollLeft: number;
};
export declare type TComputedBounds = {
    top: number;
    left: number;
    width: number;
    height: number;
    offsetWidth: number;
    offsetHeight: number;
};
export declare function getDocumentScroll(): {
    documentScrollTop: number;
    documentScrollLeft: number;
};
export declare function getBoundsForNode(node: HTMLElement, containerScroll?: TGetBoundsForNodeArgs): TComputedBounds[];
