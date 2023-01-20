import { SelectedTile, UnselectedTile } from "../tile";
import { map, range } from "ramda";
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
            const { isSelected, flagged, minesAround } = tiles[position];
            return isSelected ? 
                <SelectedTile key={position} minesAround={minesAround}/> : 
                <UnselectedTile key={position} editable={editable} flagged={flagged} position={position} />;
        }, 
        range(0, tiles.length)
    );

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
        <div className="board8x8">
            {tilesComponents}
        </div>
    )
}

export default enhance(Board);