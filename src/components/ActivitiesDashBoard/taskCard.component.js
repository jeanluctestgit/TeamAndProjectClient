import React, { Component } from "react";
import Avatar, { ConfigProvider } from "react-avatar";
import { Button, Col, Form, ListGroup, Modal, Row } from "react-bootstrap";
import Moment from "react-moment";
import * as Icon from "react-bootstrap-icons";

export default class TaskCard extends Component {

  constructor(props)
  {
    super(props)
  }

  componentDidMount()
  {
    //alert(JSON.stringify(this.props.item))
  }
  render() {
    return (
      <div
        className="card"
        style={
          
          this.props.item.status === "todo" ? 
          { marginTop: 3,
            marginLeft: 2,
            marginRight: 2,
            borderTop: "5px solid red",
            backgroundColor: "rgb(226, 180, 63)" } :
          this.props.item.status === "doing" ? 
          { marginTop: 3,
            marginLeft: 2,
            marginRight: 2,
            borderTop: "5px solid blue",
            backgroundColor: "rgb(226, 180, 63)" } :
          this.props.item.status === "done" ? 
          {marginTop: 3,
            marginLeft: 2,
            marginRight: 2,
            borderTop: "5px solid green",
            backgroundColor: "rgb(226, 180, 63)"} :
          {marginTop: 3,
            marginLeft: 2,
            marginRight: 2,
            borderTop: "4px solid black",
            backgroundColor: "rgb(226, 180, 63)"} 
          }
        onDoubleClick={this.props.onDblClick}
      >
        <div className="px-1 pt-1 card-header">
          <Col>
          <h3 className="">
            {this.props.item.name}
            <span
              className="float-end"
              style={{ cursor: "pointer" }}
              onClick={this.props.onDeleteTask}
            >
              <Icon.Trash color="black" size={18} />
            </span>
          </h3>
          </Col>
          
          
        </div>
        <div className="px-3 pt-3 card-body">
          <p className="quote2" style={{ fontSize: "14px" }}>
            {this.props.item.description}
          </p>
        </div>
        <div class="d-flex justify-content-start px-3 align-items-center">
          {" "}
          <i className="mdi mdi-view-comfy task"></i>{" "}
          <span class="quote2 pl-2">
            status:{" "}
            <span
              style={
                this.props.item.status === "to do" ? { color: "red" , fontWeight : 'bold' } :
                this.props.item.status === "doing" ? { color: "blue" , fontWeight : 'bold' } :
                this.props.item.status === "done" ? { color: "green" , fontWeight : 'bold' } :
                {} 
              }
            >
              {this.props.item.status}
            </span>{" "}
          </span>{" "}
        </div>

        <div className="d-flex justify-content-start px-3 align-items-center">
          {" "}
          <i className="mdi mdi-calendar-clock date"></i>
          <Col className="pl-2">
            Start:{" "}
            <Moment format="DD-MM-YYYY" style={{ fontSize: 13 }}>
              {new Date(this.props.item.dateStart)}
            </Moment>
          </Col>{"    "}
          <Col className="quote2 pl-2">
            End:{" "}
            <Moment format="DD-MM-YYYY" style={{ fontSize: 13 }}>
              {this.props.item.dateEnd}
            </Moment>{" "}
          </Col>{" "}
        </div>
        <hr></hr>
        <div className="d-flex justify-content-start px-3 pb-2 align-items-center">
          {this.props.item.collaborators.map((p) => {
            return <Avatar name={p} size="24" round={true} />;
          })}{" "}
        </div>
      </div>
    );
  }
}
