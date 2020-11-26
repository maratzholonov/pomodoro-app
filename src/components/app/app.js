import React, { Component } from "react";
import Pomodoro from "../pomodoro/pomodoro";
import Settings from "../settings/settings";
import "./app.css";

class App extends Component {
   state = {
      pomodoroCount: 1, // minutes
      breakCount: 1, // minutes
      longBreakCount: 3, // minutes
      cycle: 3,
      isOpen: false,
   };

   onSettingsUpdate = (pomodoroCount, breakCount, longBreakCount, cycle) => {
      this.setState({
         pomodoroCount,
         breakCount,
         longBreakCount,
         cycle,
         isOpen: false,
      });
   };

   render() {
      console.log("app");
      const { pomodoroCount, breakCount, longBreakCount, cycle, isOpen } = this.state;

      const pomodoro = (
         <Pomodoro
            pomodoroCount={pomodoroCount}
            breakCount={breakCount}
            longBreakCount={longBreakCount}
            cycle={cycle}
            isOpen={isOpen}
         />
      );

      const settings = (
         <Settings
            onSettingsUpdate={this.onSettingsUpdate}
            onClose={() => {
               this.setState({
                  isOpen: false,
               });
            }}
         />
      );
      return (
         <div className="app">
            {!isOpen ? pomodoro : settings}

            <button
               className="btn gear"
               onClick={() => {
                  this.setState(({ isOpen }) => {
                     return {
                        isOpen: !isOpen,
                     };
                  });
               }}
            >
               <i className="fa fa-cogs" aria-hidden="true"></i>
            </button>
         </div>
      );
   }
}

export default App;
