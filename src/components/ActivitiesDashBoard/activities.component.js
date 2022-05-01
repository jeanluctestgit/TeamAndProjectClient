import React, { Component } from "react";
import { Button, Col, Form, ListGroup, Modal, Row } from "react-bootstrap";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext, DropTarget, DragSource } from "react-dnd";
import ActivityColumn from "./activityColumn.component";
import ActivityItem from "./activityItem.component";
import TaskCard from "./taskCard.component";
import update from "immutability-helper";
import Moment from "react-moment";
import moment from "moment";
import Avatar, { ConfigProvider } from "react-avatar";
import * as Icon from 'react-bootstrap-icons';
import "./style.css";
import {  status} from "../../fixtures/task.fixture";
import ChannelServices from '../../services/channels.service'
import TaskServices from '../../services/task.service'
import UserServices from '../../services/user.service'


const classes = {
  board: {
    display: "flex",
    margin: "0 auto",
    width: "78vw",
    height: "80vh",
    fontFamily: 'Arial, "Helvetica Neue", sans-serif',
    overflow: "auto",
  },
  column: {
    minWidth: 150,
    width: "24vw",
    height: "78vh",
    margin: "0 auto",
    backgroundColor: "#ECECEC",
    marginLeft: 0,
  },
  columnHead: {
    textAlign: "center",
    padding: 10,
    fontSize: "1.2em",
    color: "white",
  },
  item: {
    padding: 10,
    margin: 10,
    fontSize: "0.8em",
    cursor: "pointer",
    backgroundColor: "yellow",
  },
};

class Activities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks : [],
      projectProps : this.props.projectProps,
      show: false,
      showTask: false,
      updateTask: false,
      selectedTaskId: 0,
      selectedCollab: [],
      selectedUser: "",
      selectedTaskName: "",
      selectedTaskDescription: "",
      selectedTaskCategory: "",
      selectedDateStart: "",
      selectedDateEnd: "",
      channels:[],
      labelsMap:[],
      users:[]
    };
    this.collabRef = React.createRef();
   // localStorage.setItem("project",JSON.stringify( this.props.projectProps));
  }

  componentDidMount() {
    
    ChannelServices.getAllChannels(JSON.parse(localStorage.getItem("project")).project.id).then(
      response => {
        this.setState({ channels: response.data });
      })

      TaskServices.getAllTasks(JSON.parse(localStorage.getItem("project")).project.id).then(
        response => {
          this.setState({ tasks: response.data });
        })

        UserServices.getUsers().then(
          response => {
           // alert(JSON.stringify(response.data))
            this.setState({ users: response.data });
          })

  }

  update = (id, status) => {
    const { tasks } = this.state;
    const task = tasks.find((task) => task.id === id);
    //alert(JSON.stringify(status))
    task.compartiment = status.name;
    /*const taskIndex = tasks.indexOf(task);
    const newTasks = update(tasks, {
      [taskIndex]: { $set: task },
    });
    this.setState({ tasks: newTasks });*/
    //alert(JSON.stringify(task))
    TaskServices.updateTask(JSON.parse(localStorage.getItem("project")).project.id,task)
      window.location.reload(false)
  };

  handleChangeCollab = (e) => {
    this.setState({
      selectedUser: e.target.value,
    });
  };

  handleTaskDescriptionChange = (e) => {
    this.setState({
      selectedTaskDescription: e.target.value,
    });
  };

  handleStartChange = (e) => {
    this.setState({
        selectedDateStart: e.target.value,
      });
  }

  handleEndChange = (e) => {
    this.setState({
        selectedDateEnd: e.target.value,
      });
  }

  handleTaskNameChange = (e) => {
    this.setState({
      selectedTaskName: e.target.value,
    });
  };

  handleTaskCategoryChange = (e) => {
    this.setState({
      selectedTaskCategory: e.target.value,
    });
  };

  handleAddCollaborator = (event) => {
    let { tasks, selectedCollab, selectedUser, selectedTaskId } = this.state;
    selectedCollab = this.state.updateTask ? selectedCollab : selectedCollab;
    selectedCollab.push(this.collabRef.current.value);
    /*if (this.state.updateTask) {
      let task = tasks.find((t) => t._id === selectedTaskId);
      let index  = tasks.indexOf(task);
      tasks[index].for.push(this.collabRef.current.value);

      this.setState({ tasks });
    }*/

    this.setState({ selectedCollab });
  };

  handleDeleteCollaborator = (event, selectcollab) => {
    let { selectedCollab } = this.state;
    let user = selectcollab;

    selectedCollab = selectedCollab.filter((c) => c !== user);
    this.setState({ selectedCollab });
  };

  handleDeleteTask = (e, id) => {
    let { tasks } = this.state;
    /*tasks = tasks.filter((task) => task._id !== id);
    this.setState({ tasks });*/
    var data = {}
    data.id=id;
    TaskServices.deleteTask(JSON.parse(localStorage.getItem("project")).project.id,data)
    window.location.reload(false)
  };

  handleDeleteChannel = (e, id) => {
    let { tasks } = this.state;
    /*tasks = tasks.filter((task) => task._id !== id);
    this.setState({ tasks });*/
    var data = {}
    data.id=id;
    ChannelServices.deleteChannel(JSON.parse(localStorage.getItem("project")).project.id,data)
    window.location.reload(false)
  };

  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });
  handleSaveChannel = (event) => {
    event.preventDefault();
    let tname = new FormData(event.target);
    let {channels , labelsMap} =this.state;
    //console.log(channels);
    //channels = [...channels, tname.get("Channel")];
    /*channels.push(tname.get("Channel"));
    labelsMap[tname.get("Channel")] = tname.get("Channel");
    this.setState({ show: false ,channels , labelsMap });*/
    ChannelServices.createChannel(JSON.parse(localStorage.getItem("project")).project.id,{name :  tname.get("Channel")})
    window.location.reload(false)
  };

  handleCloseTask = () => this.setState({ showTask: false });
  handleShowTask = (event, id) => {
    let {
      selectedTaskName,
      selectedTaskDescription,
      selectedTaskCategory,
      selectedCollab,
      selectedDateStart,
      selectedDateEnd,
    } = this.state;
    this.setState({
      showTask: true,
      updateTask: event.type === "dblclick",
      selectedTaskId: id,
    });
    console.log(this.state.updateTask);
    selectedTaskName =
      event.type === "dblclick"
        ? this.state.tasks.find((t) => t.id === id).name
        : "";
    selectedTaskDescription =
      event.type === "dblclick"
        ? this.state.tasks.find((t) => t.id === id).description
        : "";
    selectedDateStart =
      event.type === "dblclick"
        ? this.state.tasks.find((t) => t.id === id).dateStart
        : "";
    selectedDateEnd =
      event.type === "dblclick"
        ? this.state.tasks.find((t) => t.id === id).dateEnd
        : "";
    selectedTaskCategory =
      event.type === "dblclick"
        ? this.state.tasks.find((t) => t.id === id).compartiment
        : "";
    selectedCollab =
      event.type === "dblclick"
        ? this.state.tasks.find((t) => t.id === id).collaborators
        : [];
    console.log("------------------> ", selectedTaskName);
    alert(selectedDateStart)
    this.setState({
      selectedTaskName,
      selectedTaskDescription,
      selectedTaskCategory,
      selectedCollab,
      selectedDateStart,
      selectedDateEnd,
    });
  };
  handleSaveTask = (event, id) => {
    event.preventDefault();

    let tname = new FormData(event.target);
    let { tasks, selectedCollab } = this.state;
    let task = {};
    let newTasks = null;
    if (!this.state.updateTask) {
      console.log("add task");
      task._id = tasks.length + 1;
      task.name = tname.get("Task");
      task.compartiment = tname.get("Category");
      task.description = tname.get("Description");
      task.status = tname.get("Status");
      task.dateStart = tname.get("Start");
      task.dateEnd = tname.get("End");
      task.collaborators = this.state.selectedCollab;

      //alert(JSON.stringify(task))
      //newTasks = update(tasks, { $push: [task] });
      TaskServices.createTask(JSON.parse(localStorage.getItem("project")).project.id,task)
      window.location.reload(false)
    } else {
      console.log(this.state.selectedTaskId);
      task = tasks.find((t) => t.id === this.state.selectedTaskId);
      console.log(task, this.state.selectedTaskId);
      task.name = tname.get("Task");
      task.compartiment = tname.get("Category");
      task.description = tname.get("Description");
      task.status = tname.get("Status");
      task.dateStart = tname.get("Start");
      task.dateEnd = tname.get("End");
      task.collaborators = this.state.selectedCollab;

      /*const taskIndex = tasks.indexOf(task);
      newTasks = update(tasks, {
        [taskIndex]: { $set: task },
      });*/
      TaskServices.updateTask(JSON.parse(localStorage.getItem("project")).project.id,task)
      window.location.reload(false)
    }

    console.log(newTasks);
    this.setState({ tasks: newTasks });
    console.log("new tasks : " + JSON.stringify(this.state.tasks));
    this.setState({ showTask: false });
  };

  render() {
    const { tasks } = this.state;

    const { show, showTask } = this.state;
    const { channels , labelsMap , users} =this.state;

    return (
      <main style={{ fontSize: 12 }}>
        <section style={classes.board}>
          {channels.map((channel) => (
            <ActivityColumn status={channel}>
              <div className="card" style={classes.column}>
                <div className="card-header bg-dark" style={classes.columnHead}>
                  {channel.name}
                  <span onClick={(e) =>
                              this.handleDeleteChannel(e, channel.id)
                            } className = "float-end" style = {{ cursor : 'pointer'}}>
                  <Icon.Trash color="white" size={24} />
                  </span>
                  <span onClick={this.handleShowTask} className = "float-end" style = {{ cursor : 'pointer'}}>
                  <Icon.PlusCircle color="white" size={24} />
                  </span>
                  
                  
                </div>
                <div style = {{ height : "77vh"}}>
                  <div style={{ width: "18vw" , margin: "0 auto" }}>
                   
                    <Modal
                      show={showTask}
                      onHide={this.handleCloseTask}
                      
                      
                    >
                      <Modal.Header style = {{ backgroundColor : '#559dc9' , color : 'white'}} closeButton>
                        <Modal.Title>Task</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form id="TaskForm" onSubmit={this.handleSaveTask}>
                          <Form.Group controlId="formChannel">
                            <Form.Label>Channel</Form.Label>
                            <Form.Control
                              as="select"
                              name="Category"
                              value={this.state.selectedTaskCategory}
                              onChange={this.handleTaskCategoryChange}
                            >
                              {channels.map((ch) => (
                                <option value={ch.name}>{ch.name}</option>
                              ))}
                            </Form.Control>
                            <Form.Label>Task</Form.Label>
                            <Form.Control
                              type="text"
                              name="Task"
                              id="TaskName"
                              placeholder="Enter Name"
                              value={this.state.selectedTaskName}
                              onChange={this.handleTaskNameChange}
                              readOnly={false}
                            />

                            <Form.Label>Description</Form.Label>
                            <Form.Control
                              as="textarea"
                              name="Description"
                              placeholder="Enter description"
                              value={this.state.selectedTaskDescription}
                              onChange={this.handleTaskDescriptionChange}
                            />
                            <Form.Label>Status</Form.Label>
                            <Form.Control as="select" name="Status">
                              {status.map((s) => (
                                <option value={s}>{s}</option>
                              ))}
                            </Form.Control>
                            <Row>
                              <Col>
                                <Form.Label>Start</Form.Label>
                                <Form.Control
                                  type="Date"
                                  name="Start"
                                  value= {this.state.selectedDateStart}                        
                                  onChange = {this.handleStartChange}
                                />
                              </Col>
                              <Col>
                                <Form.Label>End</Form.Label>
                                <Form.Control
                                  type="Date"
                                  name="End"
                                  value={this.state.selectedDateEnd}
                                  onChange = {this.handleEndChange }
                                />
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <Form.Label>User list</Form.Label>
                                <Form.Control
                                  as="select"
                                  name="Collaborators"
                                  onChange={this.handleChangeCollab.bind(this)}
                                  id="Collaborators"
                                  ref={this.collabRef}
                                >
                                  {this.state.updateTask
                                    ? users
                                        .filter(
                                          (u) =>
                                            !this.state.selectedCollab.includes(
                                              u.username
                                            )
                                        )
                                        .map((u, index) => (
                                          <option key={index} value={u.username}>
                                            {u.username}
                                          </option>
                                        ))
                                    : users
                                        .filter(
                                          (u) =>
                                            !this.state.selectedCollab.includes(
                                              u.username
                                            )
                                        )
                                        .map((u, index) => (
                                          <option key={index} value={u.username}>
                                            {u.username}
                                          </option>
                                        ))}
                                </Form.Control>
                                <Button
                                  className="btn btn-primary float-right"
                                  onClick={this.handleAddCollaborator}
                                >
                                 <Icon.PlusCircle color="white" size={24} />
                                </Button>
                              </Col>
                              <Col>
                              <Form.Label>Collaborators</Form.Label>
                                <ListGroup
                                  style={{ height: 100, overflow: "auto" }}
                                >
                                  {this.state.updateTask
                                    ? this.state.selectedCollab.map((sel) => {
                                        return (
                                          <ListGroup.Item>
                                            <Avatar name={sel} size="24" round={true} /> 
                                            {sel}
                                            <span
                                              className="btn btn-primary float-right"
                                              onClick={(e) =>
                                                this.handleDeleteCollaborator(
                                                  e,
                                                  sel
                                                )
                                              }
                                            >
                                             <Icon.Trash color="white" size={16} />
                                            </span>
                                          </ListGroup.Item>
                                        );
                                      })
                                    : this.state.selectedCollab.map((sel) => {
                                        return (
                                          <ListGroup.Item>
                                            {sel}
                                            <span
                                              className="btn btn-primary float-right"
                                              onClick={(e) =>
                                                this.handleDeleteCollaborator(
                                                  e,
                                                  sel
                                                )
                                              }
                                            >
                                              X
                                            </span>
                                          </ListGroup.Item>
                                        );
                                      })}
                                </ListGroup>
                              </Col>
                            </Row>
                          </Form.Group>
                           <div className = "float-right">
                           <Button
                            variant="secondary"
                            onClick={this.handleCloseTask}
                            className = "mr-1"
                          >
                            Close
                          </Button>
                          <Button variant="primary" type="submit">
                            Save Changes
                          </Button>
                          </div>
                          
                        </Form>
                      </Modal.Body>
                    </Modal>
                  </div>
                  <div style={{ height: "92%", overflowY: "auto" }}>
                    
                    
                    {tasks
                      .filter((item) => item.compartiment === channel.name)
                      .map((item) => (
                        <ActivityItem id={item.id} onDrop={this.update}>
                          <TaskCard
                            item={item}
                            onDblClick={(e) => this.handleShowTask(e, item.id)}
                            onDeleteTask={(e) =>
                              this.handleDeleteTask(e, item.id)
                            }
                          />
                        </ActivityItem>
                      ))}
                    
                    
                  </div>
                </div>
              </div>
            </ActivityColumn>
          ))}
          <div style={{ width: "18vw", margin: "0 auto", marginLeft: 5 }}>
            <Button
              variant="primary"
              onClick={this.handleShow}
              style={{ width: "18vw" }}
            >
              Add Channel
            </Button>
          </div>

          <Modal show={show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>ADD CHANNEL</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={this.handleSaveChannel}>
                <Form.Group controlId="formChannel">
                  <Form.Label>Channel</Form.Label>
                  <Form.Control
                    type="text"
                    name="Channel"
                    placeholder="Enter Name"
                  />
                </Form.Group>
                <Button variant="secondary" onClick={this.handleClose}>
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  Save Changes
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </section>
      </main>
    );
  }
}
export default Activities;
