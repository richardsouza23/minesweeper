import './App.css';
import Board from './board';
import { PresetOptions,  ConfigMenu } from './configMenu';
import FlagCounter from './flagCounter';


function App() {

  return (
    <div className="App">

      <div className='sidebar'>
        <div className='title-container'>
            <div className='title'>MINESWEEPER</div>
        </div>

        <div className='presets-container'>
          <PresetOptions/>
        </div>

        <div className='custom-config-container'>
          <ConfigMenu/>
        </div>

        <div className='flag-counter-container'>
           <FlagCounter/>
        </div>

      </div>

      <div className="board-container">
        <Board/>
      </div>
    </div>
  );
}

export default App;