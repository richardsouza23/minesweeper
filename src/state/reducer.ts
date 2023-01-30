import { filter, map, pipe, range, reduce, set } from "ramda";
import { AnyAction } from "redux";
import { LEFT_CLICK, NEW_CONFIG, RIGHT_CLICK } from "./actions";
import { 
    DEFAULT_BOARD_HEIGHT, 
    DEFAULT_BOARD_WIDTH, 
    DEFAULT_MINE_COUNT 
} from "./constants";
import { 
    flagCountLens, 
    gameStatusLens, 
    getFlagCount, 
    getTotalMines, 
    getUnselectedTileCount, 
    hasMine, isFlagged, 
    isSelected, 
    minesAroundLens, 
    tileFlaggedLens, 
    tileSelectedLens, 
    unselectedTileCountLens 
} from "./selectors";

export enum GameStatus {
    WON,
    LOST,
    NOT_FINALIZED
}

export type TileState = {
    isSelected: boolean;
    flagged: boolean;
    minesAround: number;
    hasMine: boolean;
}
  
export type State = {
    gameStatus: GameStatus,
    boardWidth: number;
    boardHeight: number;
    totalMines: number,
    unselectedTileCount: number,
    flagCount: number,
    tiles: TileState[]
}

type Coordinate = {
    row: number,
    column: number
}


const getInitialState = (
    boardWidth: number, 
    boardHeight: number, 
    mineCount: number
): State => ({
    gameStatus: GameStatus.NOT_FINALIZED,
    boardWidth,
    boardHeight,
    totalMines: mineCount,
    unselectedTileCount: boardHeight * boardWidth,
    flagCount: mineCount,
    tiles: generateBoard(mineCount, boardHeight * boardWidth)
});

const generateBoard = (mineCount: number, size: number): TileState[] => {

    const mineSet = generateMines(mineCount, size);

    return map(
        (num) => ({
            isSelected: false, 
            flagged: false, 
            minesAround: 0, 
            hasMine: mineSet.has(num)
        }),
        range(0, size)
    )
}

const getRandomNumber = (max: number) => Math.floor(Math.random() * max);

const generateMines = (minesQty: number, boardSize: number): Set<number> => {
    
    const mineSet = new Set<number>();
    while (mineSet.size < minesQty){
        mineSet.add(getRandomNumber(boardSize));
    }

    return mineSet;
}

const getCoordinates = (position: number, width: number): Coordinate => ({
    row: (position/width) >> 0,
    column: position % width
})

const getPosition = ({row, column}: Coordinate, width: number) => row*width + column;

const getPositionsAround = (
    rootPosition: number, 
    boardWidth: number, 
    boardHeight: number
) => {

    const {row, column} = getCoordinates(rootPosition, boardWidth);
    const positionsAround: number[] = [];

    for(let i = row-1; i <= row+1 ; i++){
        if(i >= 0 && i < boardHeight) {

            for(let j = column-1; j <= column+1 ; j++){
                if(j >= 0 && j < boardWidth && (i !== row || j !== column)){
                    positionsAround.push(getPosition({row: i, column: j}, boardWidth))
                }
            }
        }
    }
    
    return positionsAround;
}

const toggleFlagged = (position: number, state: State) => {
        
    const tileIsFlagged = isFlagged(position, state);
    const flagCount = getFlagCount(state);

    return pipe(
        set(tileFlaggedLens(position), !tileIsFlagged),
        set(flagCountLens, tileIsFlagged ? flagCount+1 : flagCount-1)
    )(state);
}

const floodFill = (tileId: number, state: State): State => {

    if(isSelected(tileId, state) || hasMine(tileId, state)){
        return state;
    }

    const positionsAround = getPositionsAround(tileId, state.boardWidth, state.boardHeight);
    const mineCount = filter((pos) => hasMine(pos, state), positionsAround).length;

    let newState: State = pipe(
        set(tileSelectedLens(tileId), true),
        set(unselectedTileCountLens, getUnselectedTileCount(state) - 1)
    )(state);

    return mineCount > 0 ?
        set(minesAroundLens(tileId), mineCount, newState) :
        reduce(
            (st, pos) => floodFill(pos, st), 
            newState, 
            positionsAround
        );
}



const initialState: State = getInitialState(
    DEFAULT_BOARD_WIDTH, 
    DEFAULT_BOARD_HEIGHT, 
    DEFAULT_MINE_COUNT
);

const mainReducer = (state:State = initialState, {type, payload}: AnyAction) => {
    
    switch(type){
        case LEFT_CLICK:
            if(isSelected(payload.tileId, state) || isFlagged(payload.tileId, state)){
                return state;

            } else if (hasMine(payload.tileId, state)) {
                return set(gameStatusLens, GameStatus.LOST, state);
            }

            const newState = floodFill(payload.tileId, state);
            
            return getUnselectedTileCount(newState) === getTotalMines(state) ?
                set(gameStatusLens, GameStatus.WON, newState) :
                newState;

        case RIGHT_CLICK:
            const { tileId } = payload;

            return isSelected(tileId, state) || (getFlagCount(state) === 0 && !isFlagged(tileId, state)) ? 
                state : 
                toggleFlagged(tileId, state);

        case NEW_CONFIG:
            const {width, height, mineCount} = payload;

            return width*height <= 0 || mineCount > width*height ? 
                state :
                getInitialState(width, height, mineCount);

        default:
            return state;
    }
}

export default mainReducer;