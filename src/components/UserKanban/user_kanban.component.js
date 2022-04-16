import React, { Component } from 'react';
import UserKanban from "./userKanban.component";
import { DndProvider } from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import { DataContext } from "../MemberSpace/member_space.component";

export default class UserKanBanWrapper extends Component {
  constructor(props) {
    super(props);
  }
    render() {
        
        return (
            <div>
              <h2>User's Kanban</h2><hr></hr>
               <DndProvider backend={HTML5Backend}>
                
                <DataContext.Consumer >
                {
                  value => {
                    return (
                      <UserKanban currentUser = {this.props.currentUser } projectProps = { value.projectProps}/>
                    )
                  }
                }
                 
               </DataContext.Consumer>
                      
            </DndProvider>
          </div>
        )
    }
}
