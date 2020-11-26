import React, { Component } from "react";
import "./settings.css";

const BREAK = "break";
const POMODORO = "pomodoro";
const LONG_BREAK = "longBreak";
const CYCLE = "cycle";

class Settings extends Component {
   state = {
      breakCount: "",
      pomodoroCount: "",
      longBreakCount: "",
      cycle: "",
   };

   onInputChange(e, type) {
      const value = e.target.value;

      switch (type) {
         case BREAK:
            this.setState({
               breakCount: value,
            });
            break;
         case POMODORO:
            this.setState({
               pomodoroCount: value,
            });

            break;
         case LONG_BREAK:
            this.setState({
               longBreakCount: value,
            });
            break;
         case CYCLE:
            this.setState({
               cycle: value,
            });
            break;
         default:
            break;
      }
   }

   onSubmit = (e) => {
      e.preventDefault();
      const { breakCount, pomodoroCount, longBreakCount, cycle } = this.state;
      this.props.onSettingsUpdate(pomodoroCount, breakCount, longBreakCount, cycle);
   };

   render() {
      console.log("settings");
      const { breakCount, pomodoroCount, longBreakCount, cycle } = this.state;
      return (
         <div className="settings-container">
            <form className="settings" onSubmit={this.onSubmit}>
               <h1>Settings</h1>
               <label>Break</label>
               <input
                  type="number"
                  className="form-control"
                  onChange={(e) => this.onInputChange(e, BREAK)}
                  placeholder="Break"
                  value={breakCount}
               />
               <label className="mt-3">Pomodoro</label>
               <input
                  type="number"
                  className="form-control"
                  placeholder="Pomodoro"
                  onChange={(e) => this.onInputChange(e, POMODORO)}
                  value={pomodoroCount}
               />
               <label className="mt-3">Long Break</label>
               <input
                  type="number"
                  className="form-control"
                  placeholder="Long Break"
                  onChange={(e) => this.onInputChange(e, LONG_BREAK)}
                  value={longBreakCount}
               />
               <label className="mt-3">Cycle</label>
               <input
                  type="number"
                  className="form-control"
                  placeholder="Cycle"
                  onChange={(e) => this.onInputChange(e, CYCLE)}
                  value={cycle}
               />

               <div className="mt-3 d-flex justify-content-end ">
                  <button
                     className="btn btn-outline-light rounded-pill mr-4 "
                     onClick={this.props.onClose}
                  >
                     Close
                  </button>
                  <button type="submit" className="btn btn-outline-light rounded-pill mr-2 ">
                     Save
                  </button>
               </div>
            </form>
         </div>
      );
   }
}

export default Settings;
