import { SelectedTile, UnselectedTile } from "../tile";
import { map, range } from "ramda";
import { connect, ConnectedProps } from "react-redux";

import "./board.css";
import { State } from "../../state/reducer";
import { getBoardWidth, getTiles } from "../../state/selectors";



const enhance = connect(
    (state: State) => ({
        tiles: getTiles(state),
        width: getBoardWidth(state)
    })
);


const Board = ({width, tiles}: ConnectedProps<typeof enhance>) => {

    const tilesComponents = map(
        (position: number) => {
            const { isSelected, flagged, minesAround } = tiles[position];
            return isSelected ? 
                <SelectedTile key={position} minesAround={minesAround}/> : 
                <UnselectedTile key={position} flagged={flagged} position={position} />;
        }, 
        range(0, tiles.length)
    );

    return (
        <div className="board8x8">
            {tilesComponents}
        </div>
    )
}

export default enhance(Board);