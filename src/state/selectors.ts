import { lensPath, lensProp, view } from "ramda";
import { State } from "./reducer";

const tilesLens = lensProp<State, 'tiles'>('tiles');
const boardWidthLens = lensProp<State, 'boardWidth'>('boardWidth');
const isMineLens = (position: number) => lensPath<State, boolean>(["tiles", position, "hasMine"]);

export const gameStatusLens = lensProp<State, "gameStatus">("gameStatus");
export const flagCountLens = lensProp<State, 'flagCount'>('flagCount');
export const tileFlaggedLens = (position: number) => lensPath<State, boolean>(["tiles", position, "flagged"]);
export const tileSelectedLens = (position: number) => lensPath<State, boolean>(["tiles", position, "isSelected"]);
export const unselectedTileCountLens = lensProp<State, 'unselectedTileCount'>('unselectedTileCount');

    
export const minesAroundLens = (position: number) => lensPath<State, number>(["tiles", position, "minesAround"]);
export const isSelected = (position: number, state: State): boolean => view(tileSelectedLens(position), state);
export const isFlagged = (position: number, state: State): boolean => view(tileFlaggedLens(position), state);
export const hasMine = (tileId: number, state: State) => view(isMineLens(tileId), state);

export const getTiles = view(tilesLens);
export const getBoardWidth = view(boardWidthLens);
export const getUnselectedTileCount = view(unselectedTileCountLens);
export const getFlagCount = view(flagCountLens);
export const getTotalMines = view(lensProp<State, 'totalMines'>('totalMines'));
export const getGameStatus = view(gameStatusLens);


