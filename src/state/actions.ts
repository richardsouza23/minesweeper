import { AnyAction } from "redux";
import { GameConfig } from "./constants";


export const LEFT_CLICK = "LEFT_CLICK";
export const RIGHT_CLICK = "RIGHT_CLICK";
export const NEW_CONFIG = "NEW_CONFIG";




export const leftClickAction = (tileId: number): AnyAction => ({
    type: LEFT_CLICK,
    payload: {tileId}
});

export const rightClickAction = (tileId: number): AnyAction => ({
    type: RIGHT_CLICK,
    payload: {tileId}
});

export const newConfigAction = (config: GameConfig): AnyAction => ({
    type: NEW_CONFIG,
    payload: config
});