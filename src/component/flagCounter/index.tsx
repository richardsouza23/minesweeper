import { connect, ConnectedProps } from "react-redux";
import { State } from "../../state/reducer";
import { getFlagCount } from "../../state/selectors";

import "./flagCounter.css";
import flagIcon from "../../assets/flag-variant.svg";

const enhance = connect(
    (state: State) => ({
        remainingFlags: getFlagCount(state)
    }
))


const FlagCounter = ({remainingFlags}: ConnectedProps<typeof enhance>) => {
    
    return (
        <div className="flag-counter">
            <img src={flagIcon} alt="Flags"/>
            <span>{remainingFlags}</span>
        </div>
    )
}


export default enhance(FlagCounter);