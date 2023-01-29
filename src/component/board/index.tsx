import { useEffect } from "react";
import { map, pipe, range, splitEvery } from "ramda";
import { connect, ConnectedProps } from "react-redux";

import { SelectedTile, UnselectedTile } from "../tile";
import { GameStatus, State } from "../../state/reducer";
import { getBoardWidth, getGameStatus, getTiles } from "../../state/selectors";
import "./board.css";



const enhance = connect(
    (state: State) => ({
        tiles: getTiles(state),
        width: getBoardWidth(state),
        gameStatus: getGameStatus(state)
    })
);


const Board = ({width, tiles, gameStatus}: ConnectedProps<typeof enhance>) => {

    const tilesComponents = map(
        (position: number) => {
            const { isSelected, flagged, minesAround, hasMine } = tiles[position];
            return isSelected ? 
                <SelectedTile 
                    key={position} 
                    minesAround={minesAround}/> : 
                <UnselectedTile 
                    key={position} 
                    editable={gameStatus === GameStatus.NOT_FINALIZED} 
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

    const onContextMenu = (e:React.MouseEvent<HTMLDivElement>) => 
        e.preventDefault();
    
    return (
        <div className="board" onContextMenu={onContextMenu}>
            <table>
                {table}
            </table>
        </div>
    )
}

export default enhance(Board);