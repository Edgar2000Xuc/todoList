import logo from './logo.svg';
import './App.css';
import {MiBoton} from './componentes/MiBoton';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Aprende React
        </a>
        <MiBoton />
        <MiBoton />
        <MiBoton />
        
      </header>
      
    </div>
  );
}

export default App;







