import { MouseEvent } from 'react';
declare type TDetectMouseButtonOptions = {
    allowAltClick?: boolean;
    allowCtrlClick?: boolean;
    allowMetaClick?: boolean;
    allowShiftClick?: boolean;
};
export declare function detectMouseButton(evt: MouseEvent<HTMLElement>, buttonNumber?: number, options?: TDetectMouseButtonOptions): boolean;
export {};
