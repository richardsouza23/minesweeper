import { identity } from "ramda";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { newConfigAction } from "../../state/actions";
import { 
    ConfigInterval, 
    DEFAULT_BOARD_HEIGHT, 
    DEFAULT_BOARD_WIDTH, 
    DEFAULT_MINE_COUNT, 
    EASY_CONFIG, 
    GameConfig, 
    HARD_CONFIG, 
    HEIGHT_INTERVAL, 
    MEDIUM_CONFIG, 
    MINE_COUNT_INTERVAL, 
    WIDTH_INTERVAL 
} from "../../state/constants";
import { CustomButton } from "../button";
import "./configMenu.css";



type ConfigFieldProps = {
    label: string,
    initialValue?: number
    valueInterval?: ConfigInterval;
    onChange?: (nValue: number) => void
}


export const PresetOptions = () => {
    const dispatch = useDispatch();

    return (
        <div className="preset-options">
            <div>Presets</div>
            <CustomButton 
                label="Easy" 
                onClick={() => dispatch(newConfigAction(EASY_CONFIG))}/>

            <CustomButton 
                label="Medium" 
                onClick={() => dispatch(newConfigAction(MEDIUM_CONFIG))}/>
            <CustomButton 
                label="Hard" 
                onClick={() => dispatch(newConfigAction(HARD_CONFIG))}/>
        </div>
    )
}





const initialConfigState: GameConfig = {
    width: DEFAULT_BOARD_WIDTH,
    height: DEFAULT_BOARD_HEIGHT,
    mineCount: DEFAULT_MINE_COUNT
}

export const ConfigMenu = () => {
    const dispatch = useDispatch();

    const [configState, setConfigState] = useState(initialConfigState);
    const {width, height, mineCount} = configState;

    console.log("CONFIG STATE:", configState);
    
    return (
      <div className='config-menu'>
        <div>Custom Config</div>
        <ConfigField
            label="Width" 
            initialValue={width}
            valueInterval={WIDTH_INTERVAL} 
            onChange={(width) => setConfigState({...configState, width})} />

        <ConfigField
            label="Height" 
            initialValue={height}
            valueInterval={HEIGHT_INTERVAL} 
            onChange={(height) => setConfigState({...configState, height})} />
            
        <ConfigField
            label="Mines" 
            initialValue={mineCount}
            valueInterval={MINE_COUNT_INTERVAL} 
            onChange={(mineCount) => setConfigState({...configState, mineCount})} />

        <CustomButton 
            label="Start" 
            onClick={() => dispatch(newConfigAction(configState))} />
      </div>
    );
}



const ConfigField = ({
    label, 
    initialValue, 
    valueInterval,
    onChange = identity
}: ConfigFieldProps) => {

    const changeHandler = (e:React.FormEvent<HTMLInputElement>) => 
        onChange(parseInt(e.currentTarget.value))

    return (
        <div>
            <span>{label}</span>
            <input 
                type="number" 
                name={label} 
                defaultValue={initialValue}
                min={valueInterval && valueInterval.minValue}
                max={valueInterval && valueInterval.maxValue}
                onChange={changeHandler} />
        </div>
    )
}
