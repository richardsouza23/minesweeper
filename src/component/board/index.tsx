import { SelectedTile, UnselectedTile } from "../tile";
import { map, pipe, range, splitEvery } from "ramda";
import { connect, ConnectedProps } from "react-redux";

import "./board.css";
import { GameStatus, State } from "../../state/reducer";
import { getBoardWidth, getGameStatus, getTiles } from "../../state/selectors";
import { useEffect } from "react";



const enhance = connect(
    (state: State) => ({
        tiles: getTiles(state),
        width: getBoardWidth(state),
        gameStatus: getGameStatus(state)
    })
);


const Board = ({width, tiles, gameStatus}: ConnectedProps<typeof enhance>) => {

    const editable = gameStatus === GameStatus.NOT_FINALIZED;

    const tilesComponents = map(
        (position: number) => {
            const { isSelected, flagged, minesAround, hasMine } = tiles[position];
            return isSelected ? 
                <SelectedTile 
                    key={position} 
                    minesAround={minesAround}/> : 
                <UnselectedTile 
                    key={position} 
                    editable={editable} 
                    flagged={flagged} 
                    showMine={gameStatus === GameStatus.LOST}
                    hasMine={hasMine}
                    position={position} />;
        }, 
        range(0, tiles.length)
    );

    const table = pipe(
        map((tile: JSX.Element) => <td>{tile}</td>),
        splitEvery(width),
        map((row: JSX.Element[]) => <tr>{row}</tr>)
    )(tilesComponents);
    

    useEffect(() => {
        const delay = 200;
        switch(gameStatus){
            case GameStatus.WON:
                setTimeout(() => alert("You Won!"), delay);
                break;
            case GameStatus.LOST:
                setTimeout(() => alert("You Lost!"), delay);
                break;
        }

    }, [gameStatus]);

    
    return (
        <table className="board">
            {table}
        </table>
    )
}

export default enhance(Board);