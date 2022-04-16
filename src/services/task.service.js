import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://teamsandprojectapi-env.eba-mdhaamar.us-east-1.elasticbeanstalk.com/api/projects';

class TaskService {
  getAllTasks(projectId) {
    return axios.get(API_URL + '/' + projectId + '/tasks',  { headers: authHeader() });
  }

  getProject(id) {
    return axios.get(API_URL + id , { headers: authHeader() });
  }

  createTask(projectId,data){
    console.log('-------------> create Project');
    return axios.post(API_URL + '/' + projectId + '/tasks' , data, { headers: authHeader() })
                .then(response => {
                    console.log(response.data);
                    return response.data;
                });
  }
  updateTask(projectId,data){
    return axios.put(API_URL + '/' + projectId + '/tasks' + '/' + data.id, data , { headers: authHeader() })
                .then(response => {
                    return response.data;
                }); 
  }
  deleteTask(projectId,data){
    return axios.delete(API_URL + '/' + projectId + '/tasks' + '/' + data.id, { headers: authHeader() });
  }
}

export default new TaskService();