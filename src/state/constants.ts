export type GameConfig = {
    width: number;
    height: number;
    mineCount: number;
}

export type ConfigInterval = {
    minValue: number;
    maxValue: number;
}

export const DEFAULT_BOARD_WIDTH: number = parseInt(process.env.REACT_APP_DEFAULT_BOARD_WIDTH || "8");
export const DEFAULT_BOARD_HEIGHT: number = parseInt(process.env.REACT_APP_DEFAULT_BOARD_HEIGHT || "8");
export const DEFAULT_MINE_COUNT: number = parseInt(process.env.REACT_APP_DEFAULT_MINE_COUNT || "10");


export const EASY_CONFIG: GameConfig = {
    width: 8,
    height: 8,
    mineCount: 10
} 
export const MEDIUM_CONFIG: GameConfig = {
    width: 16,
    height: 16,
    mineCount: 40
} 
export const HARD_CONFIG: GameConfig = {
    width: 22,
    height: 22,
    mineCount: 100
} 

export const WIDTH_INTERVAL:ConfigInterval = {
    minValue: 8,
    maxValue: 30
}
export const HEIGHT_INTERVAL:ConfigInterval = {
    minValue: 8,
    maxValue: 30
}
export const MINE_COUNT_INTERVAL:ConfigInterval = {
    minValue: 10,
    maxValue: 200
}