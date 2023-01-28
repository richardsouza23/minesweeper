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

    return (
        <div className="preset-options">
            <div className="title">PRESETS</div>

            <div className="button-container">
                <CustomButton 
                    backgroundColor="green"
                    fontColor="white"
                    label={makePresetDescription("EASY", EASY_CONFIG)} 
                    onClick={setConfig(EASY_CONFIG)}/>
            </div>

            <div className="button-container">
                <CustomButton 
                    label={makePresetDescription("MEDIUM", MEDIUM_CONFIG)}
                    backgroundColor="yellow"
                    fontColor="#4a3c39"
                    onClick={setConfig(MEDIUM_CONFIG)}/>
            </div>

            <div className="button-container">
                <CustomButton 
                    label={makePresetDescription("HARD", HARD_CONFIG)}
                    backgroundColor="red"
                    fontColor="white" 
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
