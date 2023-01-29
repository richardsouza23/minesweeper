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


const makePresetDescription = (presetName: string, preset: GameConfig) => {
    return `${presetName}\n(${preset.width}x${preset.height}, ${preset.mineCount} mines)`;
}

export const PresetOptions = () => {
    const dispatch = useDispatch();
    const setConfig = (config: GameConfig) => 
        () => dispatch(newConfigAction(config));

    const minWidth = "214px";

    return (
        <div className="preset-options">
            <div className="title">PRESETS</div>

            <div className="button-container">
                <CustomButton 
                    backgroundColor="green"
                    fontColor="white"
                    minWidth={minWidth}
                    label={makePresetDescription("EASY", EASY_CONFIG)} 
                    onClick={setConfig(EASY_CONFIG)}/>
            </div>

            <div className="button-container">
                <CustomButton 
                    label={makePresetDescription("MEDIUM", MEDIUM_CONFIG)}
                    backgroundColor="yellow"
                    fontColor="#4a3c39"
                    minWidth={minWidth}
                    onClick={setConfig(MEDIUM_CONFIG)}/>
            </div>

            <div className="button-container">
                <CustomButton 
                    label={makePresetDescription("HARD", HARD_CONFIG)}
                    backgroundColor="red"
                    fontColor="white" 
                    minWidth={minWidth}
                    onClick={setConfig(HARD_CONFIG)}/>
            </div>
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
    
    return (
      <div className='config-menu'>
        <div className="title">CUSTOM CONFIG</div>

        <div className='config-field-container'>
            <ConfigField
                label="Width" 
                initialValue={width}
                valueInterval={WIDTH_INTERVAL} 
                onChange={(width) => setConfigState({...configState, width})} />
        </div>

        <div className='config-field-container'>
            <ConfigField
                label="Height" 
                initialValue={height}
                valueInterval={HEIGHT_INTERVAL} 
                onChange={(height) => setConfigState({...configState, height})} />
        </div>

        <div className='config-field-container'>
            <ConfigField
                label="Mines" 
                initialValue={mineCount}
                valueInterval={MINE_COUNT_INTERVAL} 
                onChange={(mineCount) => setConfigState({...configState, mineCount})} />
        </div>

        <div className="start-btton-container">
            <CustomButton 
                label="START" 
                fontColor="white"
                backgroundColor="#3a3396"
                onClick={() => dispatch(newConfigAction(configState))} />
        </div>
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
        <div className="config-field">
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
