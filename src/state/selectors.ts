import { lensPath, lensProp, view } from "ramda";
import { State } from "./reducer";

const tilesLens = lensProp<State, 'tiles'>('tiles');
const boatdWidthLens = lensProp<State, 'boardWidth'>('boardWidth');



export const tileFlaggedLens = (position: number) => 
    lensPath<State, boolean>(["tiles", position, "flagged"]);

export const tileSelectedLens = (position: number) => 
    lensPath<State, boolean>(["tiles", position, "isSelected"]);

export const isMineLens = (position: number) => 
    lensPath<State, boolean>(["tiles", position, "hasMine"]);
    
export const minesAroundLens = (position: number) => 
    lensPath<State, number>(["tiles", position, "minesAround"]);

export const getTiles = view(tilesLens);
export const getBoardWidth = view(boatdWidthLens);
