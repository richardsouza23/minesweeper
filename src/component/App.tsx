import './App.css';
import Board from './board';
import { PresetOptions,  ConfigMenu } from './configMenu';


function App() {

  return (
    <div className="App">

      <div className='sidebar'>
        <div className='title-container'>
            <div className='title'>MINESWEEPER</div>
        </div>

        <PresetOptions/>
        <ConfigMenu/>

      </div>

      <div className="board-container">
        <Board/>
      </div>
    </div>
  );
}

export default App;