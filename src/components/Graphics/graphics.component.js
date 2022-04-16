import React, { Component } from "react";
import { Bar  , Doughnut } from "react-chartjs-2";
import { Row , Col} from 'react-bootstrap';
import {
  status
} from "../../fixtures/task.fixture";
import ChannelServices from '../../services/channels.service'
import TaskServices from '../../services/task.service'
import UserServices from '../../services/user.service'

 const countOccurrencesPerCategory = (arr, val) =>
  arr.reduce((a, v) => (v.compartiment === val ? a + 1 : a), 0);

  const countOccurrencesPerUser = (arr, val) =>
  arr.reduce((a, v) => (v.collaborators.includes(val) ? a + 1 : a), 0);

export default class Graphics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks : [],
      channels :[],
      users:[],
      OccurencesPercategory : {
        
      },

      OccurencesPerUsers : {
             
      },
      OccurencesPerStatus : {
        
      }
      
    };

    
  }

  componentDidMount()
  {
    
   

    ChannelServices.getAllChannels(JSON.parse(localStorage.getItem("project")).project.id).then(
      response => {
        this.setState({ channels: response.data });
      })

      TaskServices.getAllTasks(JSON.parse(localStorage.getItem("project")).project.id).then(
        response => {
          alert(JSON.stringify(response.data))   
          this.setState({ tasks: response.data });

         
        })

        UserServices.getUsers().then(
          response => {
           // alert(JSON.stringify(response.data))
            this.setState({ users: response.data });

           
          })
          
          
          
       

        
  }

  componentDidUpdate(){
    
  }

  render() {
    
    const {tasks , channels,users}  = this.state;

    return (
      <div className="container">
        Graphics
        <div style = {{ width : 1070 , height : 600}}>
        <Row>
          <Col>
          <Bar
          
          data={{
            labels: channels.map(ch => ch.name),
            datasets: [
              {
                label: "nb tasks todo",
                data: channels.map((channel) => {
                  let arr = tasks.filter(item => item.status === 'todo')
                  return countOccurrencesPerCategory(arr, channel.name);
                }),
                backgroundColor: '#D6E9C6'
              },
              {
                  label: "nb tasks doing",
                  data: channels.map((channel) => {
                    let arr = tasks.filter(item => item.status === 'doing')
                    return countOccurrencesPerCategory(arr, channel.name);
                  }),
                  backgroundColor: '#ace0f2'
                },
                {
                  label: "nb tasks done",
                  data: channels.map((channel) => {
                    let arr = tasks.filter(item => item.status === 'done')
                    return countOccurrencesPerCategory(arr, channel.name);
                  }),
                  backgroundColor: '#EBCCD1'
                }
            ],
          }}
          options={{
            title: {
              display: true,
              text: "NB Task per category and status",
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "right",
            },
            scales: {
                xAxes: [{ stacked: true }],
                yAxes: [{ stacked: true }]
              }
          }}
        />
          </Col>
          <Col>
          <Doughnut
          data = {{
            labels: status,
            datasets: [{
              data: [
                     this.state.tasks.filter(item => item.status === 'todo').length,
                     this.state.tasks.filter(item => item.status === 'doing').length,
                     this.state.tasks.filter(item => item.status === 'done').length
              ],
              backgroundColor : [
                '#D6E9C6',
                '#ace0f2',
                '#EBCCD1'
              ]
            }
              
                
            ],
          }}
          options={{
            title: {
              display: true,
              text: "NB Task per status",
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "right",
            }
          }}
        />
          </Col>

        </Row>
        <Row>
            <Col>
            <div className="card">
            <Bar
          
          data={{
            labels: users.map(user => user.username),
            datasets: [
              {
                label: "nb tasks todo",
                data: users.map((user) => {
                  let arr = tasks.filter(item => item.status === 'todo')
                  return countOccurrencesPerUser(arr, user.username);
                }),
                backgroundColor: '#D6E9C6'
              },
              {
                  label: "nb tasks doing",
                  data: users.map((user) => {
                    let arr = tasks.filter(item => item.status === 'doing')
                    return countOccurrencesPerUser(arr, user.username);
                  }),
                  backgroundColor: '#ace0f2'
                },
                {
                  label: "nb tasks done",
                  data: users.map((user) => {
                    let arr = tasks.filter(item => item.status === 'done')
                    return countOccurrencesPerUser(arr, user.username);
                  }),
                  backgroundColor: '#EBCCD1'
                }
            ],
          }}
          options={{
            title: {
              display: true,
              text: "NB Task per users and status",
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "right",
            },
            scales: {
                xAxes: [{ stacked: true }],
                yAxes: [{ stacked: true }]
              }
          }}
        />
            </div>
            
            </Col>
        </Row>
        

        


        </div>

        
        
      </div>
    );
  }
}
