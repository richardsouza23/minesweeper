import { filter, map, range, reduce, set, view } from "ramda";
import { AnyAction } from "redux";
import { LEFT_CLICK, RIGHT_CLICK } from "./actions";
import { MIN_BOARD_HEIGHT, MIN_BOARD_WIDTH, MIN_MINE_COUNT } from "./constants";
import { isMineLens, minesAroundLens, tileFlaggedLens, tileSelectedLens } from "./selectors";


export type TileState = {
    isSelected: boolean;
    flagged: boolean;
    minesAround: number;
    hasMine: boolean;
}
  
export type State = {
    boardWidth: number;
    boardHeight: number;
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
    boardWidth,
    boardHeight,
    tiles: generateBoard(mineCount, boardHeight*boardWidth)
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
const hasMine = (tileId: number, state: State) => view(isMineLens(tileId), state);

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

const isSelected = (position: number, state: State): boolean => 
    view(tileSelectedLens(position), state);

const isFlagged = (position: number, state: State): boolean =>
    view(tileFlaggedLens(position), state);

const toggleFlagged = (position: number, state: State) => {
    const flaggedLens = tileFlaggedLens(position);
    const currentValue = view(flaggedLens, state);
    return set(flaggedLens, !currentValue, state);
}

const floodFill = (tileId: number, state: State): State => {

    if(isSelected(tileId, state) || hasMine(tileId, state)){
        return state;
    }

    const positionsAround = getPositionsAround(tileId, state.boardWidth, state.boardHeight);
    const mineCount = filter((pos) => hasMine(pos, state), positionsAround).length;

    let newState: State = set(tileSelectedLens(tileId), true, state);

    return mineCount > 0 ?
        set(minesAroundLens(tileId), mineCount, newState) :
        reduce(
            (st, pos) => floodFill(pos, st), 
            newState, 
            positionsAround
        );
}



const initialState: State = getInitialState(
    MIN_BOARD_WIDTH, 
    MIN_BOARD_HEIGHT, 
    MIN_MINE_COUNT
);

const mainReducer = (state:State = initialState, {type, payload}: AnyAction) => {

    // Debug only
    console.log("TYPE:", type);
    console.log("PAYLOAD:", payload);
    console.log("STATE BEFORE ACTION:", state);

    
    switch(type){
        case LEFT_CLICK:
            if(isSelected(payload.tileId, state) || isFlagged(payload.tileId, state)){
                return state;
            } else if (hasMine(payload.tileId, state)) {
                alert("You lost!");
                return initialState;
            }
            
            return floodFill(payload.tileId, state);

        case RIGHT_CLICK:
            const { tileId } = payload;

            return isSelected(tileId, state) ? 
                state : 
                toggleFlagged(tileId, state);
        default:
            return state;
    }
}

export default mainReducer;