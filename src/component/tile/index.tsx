import { connect, ConnectedProps } from "react-redux";
import { identity } from "ramda";
import { leftClickAction, rightClickAction } from "../../state/actions";
import "./tile.css";
import flag from "../../assets/flag-variant.svg";
// import mine from "../../assets/bomb-icon.svg";



const enhance = connect(
    null,
    (dispatch) => ({
        rightClick: (tileId: number) => dispatch(rightClickAction(tileId)),
        leftClick: (tileId: number) => dispatch(leftClickAction(tileId))
    })
);

interface UnselectedTileProps extends ConnectedProps<typeof enhance> {
    flagged: boolean;
    position: number;
    editable: boolean;
}


export const UnselectedTile = enhance(({
    flagged, 
    position, 
    editable,
    rightClick, 
    leftClick
}: UnselectedTileProps) => {

    const contextMenuClick = (e: React.MouseEvent<HTMLDivElement>): void => {
        e.preventDefault();
        if(editable){
            rightClick(position);
        }
    }

    const onClick = editable ? (() => leftClick(position)) : identity;

    return (
        <div className="tile unselected-tile" 
            onClick={onClick} 
            onContextMenu={contextMenuClick}>
            {flagged && <img src={flag} alt=""/>}
        </div>
    )
});



type SelectedTileProps = {
    minesAround?: number;
};

export const SelectedTile = ({minesAround}: SelectedTileProps) => {
    return (
        <div className="tile selected-tile">
            <div className="value-container">{minesAround || ""}</div>
        </div>
    )
}