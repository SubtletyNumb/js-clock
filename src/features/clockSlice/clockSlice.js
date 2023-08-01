import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
  sessionLength: 25,
  seconds: '00',
  breakLength: 5,
  timeLeft: 25,
  start_stopBtnText: 'start',
  start_stop: false,
  timerLabelText: 'session',
}
let counter = initialState.sessionLength;

const clockSlice = createSlice({
    name: 'clockSlice',
    initialState,
    reducers: {
      toggleTimer: (state) => {
        state.start_stop = !state.start_stop;
        if(state.start_stop === true){
          state.start_stopBtnText = 'pause';
        }else{
          state.start_stopBtnText = 'start';
        }
        console.log('timer stop: ' + state.start_stop)
      },
      timerReduction: (state) => {  
        console.log('reducing timer')
      if(state.seconds > 0){
        if(state.seconds <= 10){
          console.log('adding zero')
          state.seconds = `0${state.seconds - 1}`;
        }else{
          state.seconds -= 1;
        }
      }else if(state.seconds == 0 && state.timeLeft > 0){
        console.log('minutes reducing')
          state.seconds = 59;
          state.timeLeft -= 1;
      }else if(state.seconds == 0 && state.timeLeft < 1){
        console.log('timer at zero!')
      }
      },
      reset: (state) => {
        state.sessionLength = 25;
        state.seconds = '00';
        state.breakLength = 5;
        state.start_stop = false;
        state.start_stopBtnText = 'start';
        state.timerLabelText = 'session';
        state.timeLeft = 25;
        document.getElementById('beep').pause();
        document.getElementById('beep').currentTime = 0;
      },
      toggleLengths: (state, {payload}) => {
        if(state.start_stop) return;
        if(payload.timer === 'session'){
          if(payload.increment === false){
            if(state.sessionLength > 1){
              state.sessionLength -= 1;
              state.timeLeft = state.sessionLength; 
            }
          }else{
            if(state.sessionLength < 60){
              state.sessionLength += 1;
              state.timeLeft = state.sessionLength;
          }
        }
      }
        if(payload.timer === 'break'){
          if(payload.increment === false){
            if(state.breakLength > 1){
              state.breakLength -= 1;
            }
          }else{
            if(state.breakLength < 60){
              state.breakLength += 1;
            }
          }
        }
      },
      breakStart: (state) => {
        document.getElementById('beep').play();
        state.timerLabelText = 'break';
        state.timeLeft = state.breakLength;
        state.start_stop = true;
        state.start_stopBtnText = 'pause';
      },
      sessionStart: (state) => {
        document.getElementById('beep').play();
        state.timerLabelText = 'session';
        state.timeLeft = state.sessionLength;
        state.start_stop = true;
        state.start_stopBtnText = 'pause';
      }
      
      }
  });

  export default clockSlice.reducer;
  export const {toggleTimer,timerReduction,reset,toggleLengths, breakStart, sessionStart} = clockSlice.actions;