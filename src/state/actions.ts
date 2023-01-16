import { AnyAction } from "redux";


export const RESET_BOARD = "RESET_BOARD";

export const LEFT_CLICK = "LEFT_CLICK";
export const RIGHT_CLICK = "RIGHT_CLICK";




export const leftClickAction = (tileId: number): AnyAction => ({
    type: LEFT_CLICK,
    payload: {tileId}
});

export const rightClickAction = (tileId: number): AnyAction => ({
    type: RIGHT_CLICK,
    payload: {tileId}
});
