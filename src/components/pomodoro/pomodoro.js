import React, { Component } from "react";
import "./pomodoro.css";

const POMODORO = "Pomodoro";
const BREAK = "Break";

const size = 200;
const strokeWidth = 12;

const center = size / 2;
const radius = size / 2 - strokeWidth / 2;
const circumference = 2 * Math.PI * radius;

class Pomodoro extends Component {
   loop = undefined;

   state = {
      clockCount: 0,
      cycleCounter: 1,
      currentTimer: POMODORO,
      play: false,
      stop: false,
      showStop: false,
      dashOffset: circumference,
   };

   componentDidMount() {
      const { pomodoroCount } = this.props;
      this.setState({
         clockCount: pomodoroCount * 60,
      });
   }

   componentDidUpdate(prevProps) {
      if (this.props.pomodoroCount !== prevProps.pomodoroCount) {
         this.setState({
            clockCount: this.props.pomodoroCount * 60,
         });
      }
   }

   componentWillUnmount() {
      clearInterval(this.loop);
   }

   handlePlay = () => {
      clearInterval(this.loop);
      this.setState({
         play: true,
         stop: false,
      });

      this.loop = setInterval(() => {
         const { clockCount, currentTimer, dashOffset } = this.state;
         const { pomodoroCount, cycle, breakCount, longBreakCount } = this.props;

         if (clockCount === 0) {
            switch (currentTimer) {
               case POMODORO:
                  this.setState((state) => {
                     return {
                        currentTimer: BREAK,
                        dashOffset: circumference,
                        cycleCounter: state.cycleCounter + 1,
                        clockCount:
                           state.cycleCounter && Number(state.cycleCounter % cycle) === 0
                              ? longBreakCount * 60
                              : breakCount * 60,
                     };
                  });
                  break;
               case BREAK:
                  this.setState({
                     currentTimer: POMODORO,
                     dashOffset: circumference,
                     clockCount: pomodoroCount * 60,
                  });
                  break;
               default:
                  console.log("nn");
                  break;
            }
         } else {
            this.setState((state) => {
               return {
                  dashOffset: state.dashOffset - dashOffset / clockCount,
                  clockCount: clockCount - 1,
               };
            });
         }
      }, 1000);
   };

   getStopClockCount() {
      const { currentTimer, cycleCounter } = this.state;
      const { cycle, pomodoroCount, breakCount, longBreakCount } = this.props;

      if (currentTimer === POMODORO) {
         return pomodoroCount * 60;
      }

      if (cycleCounter && Number((cycleCounter - 1) % cycle) === 0) {
         return longBreakCount * 60;
      }

      return breakCount * 60;
   }

   handleStop = () => {
      clearInterval(this.loop);

      this.setState({
         dashOffset: circumference,
         clockCount: this.getStopClockCount(),
         stop: true,
         play: false,
      });
   };

   handlePause = () => {
      clearInterval(this.loop);
      if (this.state.play) {
         this.setState({
            play: false,
            stop: true,
         });
      }
   };

   convertToTime = (count) => {
      const minutes = Math.floor(count / 60);
      let seconds = count % 60;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      return `${minutes}: ${seconds}`;
   };

   render() {
      console.log("pomodoro");
      const { currentTimer, clockCount, play, stop } = this.state;

      let cls = "pomodoro";

      if (currentTimer === "Break") {
         cls += " background";
      }

      return (
         <div className={cls}>
            <h4>{currentTimer}</h4>
            <svg className="svg" width={size} height={size}>
               <circle
                  stroke="rgba(224,224,224 ,0.2)"
                  fill="transparent"
                  cx={center}
                  cy={center}
                  r={radius}
                  strokeWidth={strokeWidth}
                  strokeDashoffset={circumference}
               />
               <circle
                  style={{ transition: "stroke-dashoffset 0.9s ease-in" }}
                  fill="transparent"
                  transform="rotate (270 100 100)"
                  stroke="white"
                  cx={center}
                  cy={center}
                  r={radius}
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={this.state.dashOffset}
               ></circle>

               <text x="50%" y="53%" fill="white" textAnchor="middle">
                  {stop && clockCount === this.getStopClockCount()
                     ? this.convertToTime(0)
                     : this.convertToTime(clockCount)}
               </text>
            </svg>

            <div className="d-flex justify-content-center mt-5">
               {!play ? (
                  <button
                     className="btn btn-outline-light rounded-pill btn-lg bb mr-2"
                     onClick={this.handlePlay}
                  >
                     {stop ? "Continue" : "Play"}
                  </button>
               ) : (
                  <button
                     className="btn btn-outline-light rounded-pill btn-lg bb"
                     onClick={this.handlePause}
                  >
                     Pause
                  </button>
               )}

               {stop && (
                  <button
                     className="btn btn-outline-light rounded-pill btn-lg bb"
                     onClick={this.handleStop}
                  >
                     Stop
                  </button>
               )}
            </div>
         </div>
      );
   }
}

export default Pomodoro;
