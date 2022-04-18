import React from 'react'
import { useQuery } from 'react-query';
import { useMutation, useQueryClient , queryCache } from 'react-query';
import { useState, useEffect } from 'react';
import UserServices from '../../services/user.service';
import ProjectServices from '../../services/project.service'

import {
    Form,
    Table,
    Button,
    Row,
    Container,
    Col,
    ListGroupItem,
    ListGroup,
  } from "react-bootstrap";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { Switch, Route, Link ,NavLink} from "react-router-dom";

export default function Project(props) {
    let [Users, setUsers] = useState([]);
    let [pUsers , setpUsers] = useState([]);
    let [Projects, setProjects] = useState([]);
    let [SelProject,setSelProject] = useState({});
    let [ProjectName , setProjectName] = useState("");
    let [DateStart , setDateStart] = useState("");
    let [DateEnd , setDateEnd] = useState("");
    let [Collaborators , setCollaborators] = useState([]);
    let [SelectedCollaborator , setSelectedCollaborator] = useState({});
    let [UpdateData,setUpdateData] = useState(false);

    /*const { isUserLoading, user_error, user_data } = useQuery('fetchUsers', UserServices.getUsers().then(
        response => {
            //setUsers(response.data);
            setpUsers(response.data);
            console.log(response.data)
        }
        
    ),{
      retry : false
    })

    const { isProjectLoading, project_error, project_data } = useQuery('fetchProjects', ProjectServices.getAllProjects().then(
        response => {
            setProjects(response.data);
        }
    ))*/

    const queryClient = useQueryClient();
    const { mutate } = useMutation(ProjectServices.createProject, {
        onSuccess: data => {
          console.log(data);
          const message = "success"
          console.log(message)
        },
        onError: () => {
          console.log("there was an error")
        },
        onSettled: () => {
            //console.log(data);
          queryClient.invalidateQueries('create');
        }
      });

      const  mutate2 = useMutation(ProjectServices.updateProject, {
        
        onSuccess: (data )=> {
          console.log(data);
          const message = "success"
          console.log(message)
          //queryCache.setQueryData(['listData', { id: variables.id }], variables)
        },
        onError: (error) => {
          console.log("there was an error" + error)
        },
        onSettled: () => {
            //console.log(data);
          queryClient.invalidateQueries('create');
        }
      });

      const  deleteProject = useMutation(ProjectServices.deleteProject, {
        
        onSuccess: (data )=> {
          console.log(data);
          const message = "success"
          console.log(message)
          //queryCache.setQueryData(['listData', { id: variables.id }], variables)
        },
        onError: (error) => {
          console.log("there was an error" + error)
        },
        onSettled: () => {
            //console.log(data);
          queryClient.invalidateQueries('delete');
        }
      });

      useEffect(() => {
        // Met à jour le titre du document via l’API du navigateur
        UserServices.getUsers().then(
          response => {
              setUsers(response.data);
              setpUsers(response.data);
              console.log(response.data)
          })

          ProjectServices.getAllProjects().then(
            response => {
                setProjects(response.data);
               
            })

          
        
      },[]);

    

    

    const handleDeleteProject = (e, id) => {
        e.preventDefault();
        let projectId = id;
        let data = {}
        data.id = id;
        ProjectServices.deleteProject(data)
        window.location.reload(false)
      }
    
    const  handleUpdateProject = (e, id) => {
        e.preventDefault();
        setUpdateData(true);
        let selProject = Projects.filter(p => p.id === id)[0];
        setSelProject(selProject);
        let projectId = document.querySelector('#project_id');
        let projectName = document.querySelector('#project_name');
        let projectDescription = document.querySelector('#project_description');
        let projectDateStart = document.querySelector('#DateStart');
        let projectDateEnd = document.querySelector('#DateEnd');
        projectId.value = id;
        projectName.value = selProject.name;
        projectDescription.value = selProject.description;
        setDateStart(new Date(selProject.dateStart));
        setDateEnd(new Date(selProject.dateEnd));
        Collaborators = selProject.collaborators.map(c => c);
        setCollaborators(Collaborators);
      }

    const handleSaveProject = (e) => {
      e.preventDefault();
      let ProjectData = new FormData(e.target);
      let project_id = ProjectData.get('project_id');
      let project_name = ProjectData.get('project_name');
      alert(project_name);
      let DateStart = ProjectData.get('DateStart');
      let DateEnd = ProjectData.get('DateEnd');
      let project_description = ProjectData.get('project_description');
      let project_collabs = Collaborators;
      alert(Collaborators);
      let collabs = [];
      /*project_collabs.forEach(element => {
        let t = pUsers.filter(u => u.username === element);
        console.log(t)
        collabs = [...collabs , (pUsers.filter(u => u.username === element))[0].id];
      });*/
      
      /*let project_author = (pUsers.filter(u => u.username === props.currentUser.username))[0].id;
      alert(project_author)*/
      alert(JSON.parse(props['currentUser']))
      let data = {}
      if(UpdateData)
       data.id = project_id;
      console.log(DateStart);
      data.name = project_name;
      data.description = project_description;
      data.dateStart = DateStart;
      data.dateEnd = DateEnd;
      data.createdBy = JSON.parse(props['currentUser'])['username'];
      data.collaborators = Collaborators;
      if(UpdateData)
      {
        alert('update')
       //mutate2.mutate(data);
       ProjectServices.updateProject(data)
       
      }else{
        mutate(data);
      }
      window.location.reload(false)
      //mutate(data);
     /* alert('-----> create' + JSON.stringify(data));
      ProjectServices.createProject(data);*/
    }
    const onChangeProjectName = (e) => {
      setProjectName(e.target.value);
    }
    const onChangeDateStart = (date) => {
      setDateStart(date);
    }
    const onChangeDateEnd = (date) => {
      setDateEnd(date);
    }
    const handleSelectCollaborator = (e) => {
      setSelectedCollaborator(e.target.value);
    }
    const handleAddCollaborator = () => {
      Collaborators = [...Collaborators , SelectedCollaborator];
      setCollaborators(Collaborators);
     /* if(pUsers.length > 0){
        pUsers = pUsers.filter(u => u.username !== SelectedCollaborator);
      setpUsers(pUsers);
      }*/
      
    }
    const handleDeSelectCollaborator = (coll) => {
      Collaborators = Collaborators.filter(c => c !== coll)
      setCollaborators(Collaborators);
    }

    const handleSaveProjectProps = (e,p) => {
      localStorage.setItem("project",JSON.stringify({user: props.currentUser,project : p}));
    }



    return (
        <div className="container">
            
            <div className="jumbotron">
          <Form id="project_data" onSubmit={handleSaveProject}>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Project Name</Form.Label>
              <Form.Control type="hidden" id="project_id" name="project_id" />
              <Form.Control type="text" id="project_name" name="project_name" onChange={onChangeProjectName} />
              
              
            </Form.Group>
            <Container>
               <Row>
                 <Col>
                 <Form.Label>Date Start</Form.Label>
                 <DatePicker selected = {DateStart ? DateStart : new Date()} name="DateStart" dateFormat="yyyy-MM-dd" onChange={onChangeDateStart}/>
                 
                 </Col>
                 <Col>
                 <Form.Label>Date End</Form.Label>
                 <DatePicker selected = {DateEnd ? DateEnd : new Date()} name="DateEnd" dateFormat="yyyy-MM-dd" onChange={onChangeDateEnd}/>
                 </Col>
               </Row>
            </Container>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Project Description</Form.Label>
              <Form.Control as="textarea" rows={3} id="project_description" name="project_description" />
            </Form.Group>
            <Container>
            <Row>
             <Col>
              <Form.Group as={Col} controlId="exampleForm.ControlSelect1">
                <Form.Label>Collaborators</Form.Label>
                <Form.Control
                  as="select"
                  onLoad={handleSelectCollaborator}
                  onChange={handleSelectCollaborator}
                  
                >
                  {pUsers.map((u, index) => {
                    return <option key={index}>{u.username}</option>;
                  })}
                </Form.Control>

                <Button
                  className="float-right"
                  style={{ marginTop: 30 }}
                  onClick={handleAddCollaborator}
                >
                  Add Collaborator
              </Button>
              </Form.Group>
              </Col>
              <Col>
              <Form.Group as={Col} controlId="exampleForm.ControlSelect2">
                <Form.Label>Project Collaborator List</Form.Label>
                <ListGroup name="collaborators" style={{ height: 200, overflow: 'scroll' }}>
                  {Collaborators.map((coll) => {
                    return (
                      <ListGroupItem key={coll}>
                        {coll}
                        <span
                          className="float-right btn btn-primary"
                          onClick={() => handleDeSelectCollaborator(coll)}
                        >
                          X
                      </span>
                      </ListGroupItem>
                    );
                  })}
                </ListGroup>
              </Form.Group>
             </Col>
            </Row>
            </Container>
            <Button className="float-right" type="submit">Save Project</Button>
          </Form>
        </div>

            <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Project Name</th>
              <th>Project Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Projects
              .filter(
                (p) => (p.createdBy === JSON.parse(props.currentUser).username)
              )
              .map((p, index) => {
                return (
                  <tr key={index}>
                    <td>{p.id}</td>
                    <td>{p.name}</td>
                    <td width="600px">{p.description}</td>
                    <td
                      width="300px"
                      style={{
                        display: "flex",
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                      }}
                    >
                      <NavLink to={{
                        pathname: "/member_space",
                        projectprops: {
                          user: props.currentUser,
                          project: p
                        }
                      }} className="btn btn-primary" onClick={(e) => handleSaveProjectProps(e,p)}>
                        Follow
                      </NavLink>
                      <Button onClick={(e) => handleUpdateProject(e, p.id)}>Update</Button>
                      <Button onClick={(e) => handleDeleteProject(e, p.id)} 
                      >Delete</Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
        </div>
    )
}
