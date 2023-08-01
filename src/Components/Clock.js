import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../style-sheets/Clock.css';
import { faL, faRotateRight, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { breakStart, reset, sessionStart, timerReduction, toggleLengths, toggleTimer } from '../features/clockSlice/clockSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
const Clock = () => { 
  const {seconds, timerLabelText, timeLeft, sessionLength, breakLength} = useSelector(store => store.clock);
  const start_stop = useSelector(store => store.clock.start_stop)
  const startBtnText = useSelector(store => store.clock.start_stopBtnText);
  useEffect(() => {
    if(start_stop){
      let timer = setInterval(() => {
        if(timeLeft < 1 && Number(seconds) === 0){
          if(timerLabelText === 'session'){
            dispatch(breakStart());
          }else if(timerLabelText === 'break'){
            dispatch(sessionStart());
          }
          return () => {
            clearInterval(timer);
          }
        }
          if(timeLeft >= 0 && Number(seconds) >= 0){
            console.log(Number(seconds))
          dispatch(timerReduction());
        }
      }, 1000)
    return () => {
      clearInterval(timer);
    }
  }
  }, [start_stop, timeLeft, seconds])
  
  const dispatch = useDispatch();
  return(
  <div className="main-container">
    <div className='buttons-wrapper'>
      <div className='break-wrapper'>
        <p className='label' id='break-label'>break length</p>
        <div className='buttons'>
          <button id='break-decrement' onClick={() => dispatch(toggleLengths({timer: 'break', increment : false}))}><FontAwesomeIcon icon={faMinus}/></button>
          <p id='break-length'>{breakLength}</p>
          <button id='break-increment' onClick={() => dispatch(toggleLengths({timer: 'break', increment : true}))}><FontAwesomeIcon icon={faPlus}/></button>
        </div>
      </div>
      <div className='session-wrapper'>
        <p className='label' id='session-label'>session length</p>
        <div className='buttons'>
          <button id='session-decrement' onClick={() => dispatch(toggleLengths({timer: 'session', increment : false}))}><FontAwesomeIcon icon={faMinus}/></button>
          <p id='session-length'>{sessionLength}</p>
          <button id='session-increment' onClick={() => dispatch(toggleLengths({timer: 'session', increment : true}))}><FontAwesomeIcon icon={faPlus}/></button>
        </div>
      </div>
    </div>
    <div className="timer-wrapper">
      <audio id='beep' src={require('../audio/beep.mp3')}></audio>
      <p id="timer-label">{timerLabelText}</p>
      <p id="time-left">{timeLeft < 10 ? `0${timeLeft}:${seconds}` : `${timeLeft}:${seconds}`}</p>
      <div className='timer-buttons-wrapper'>
        <button id='start_stop' onClick={() => dispatch(toggleTimer())}>{startBtnText}</button>
        <i id='reset' onClick={() => dispatch(reset())}><FontAwesomeIcon icon={faRotateRight}/></i>
      </div>
    </div>
    </div>
  ) 
}
export default Clock;