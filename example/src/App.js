import './App.css';
import ReactGol from 'react-gol'

function App() {
  return (
    <div className="App">
      <ReactGol cellSize={4} motionBlur={0} fillStyle={'red'} />
    </div>
  );
}

export default App;
