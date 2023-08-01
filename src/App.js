import './style-sheets/App.css';
import Clock from './Components/Clock';
function App() {
  return (
    <div className="App">
      <header>
        <h2>Pomodoro Clock</h2>
        </header>
      <Clock />
      <footer>Developed by <a target='_blank' href={'https://github.com/SubtletyNumb'}>SubtletyNumb</a></footer>
    </div>
  );
}

export default App;
