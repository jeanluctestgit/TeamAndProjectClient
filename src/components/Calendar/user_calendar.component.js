import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import {tasks} from "../../fixtures/task.fixture";
import { DataContext } from "../MemberSpace/member_space.component";
import TaskServices from '../../services/task.service'

export default class UserCalendar extends Component {
  constructor(props){
    super(props);
    this.state = {
      tasks : []
    }
  }

  componentDidMount() {

    //alert(this.props.currentUser);
    TaskServices.getAllTasks(JSON.parse(localStorage.getItem("project")).project.id).then(
      response => {
        //alert(JSON.stringify(response.data))
        this.setState({ tasks: response.data });
      })

      
  }
  render() {
    const { tasks } = this.state;
    const currentusername = JSON.parse(this.props.currentUser).username
    return (
      
      <div  >
        <div>
          <h1>Calendar {
                JSON.parse(this.props.currentUser).username
               }</h1>
            <pre>
               
            </pre>
      </div>
            <div className = "container" style = {{ width : 860 , height : 960}}>
            <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" 
                          events = {tasks
                            .filter((item) => item.collaborators.includes(currentusername))
                            .map( item => {
              return {
                  title : item.name,
                  start : item.dateStart,
                  end : item.dateEnd
              }
          })}  themeSystem = 'bootstrap'/>
            </div >
            
       
        
       
        
      </div>
    );
  }
}
