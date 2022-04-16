import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://teamsandprojectapi-env.eba-mdhaamar.us-east-1.elasticbeanstalk.com/api/projects';

class ProjectService {
  getAllProjects() {
    return axios.get(API_URL + '' ,  { headers: authHeader() });
  }

  getProject(id) {
    return axios.get(API_URL + id , { headers: authHeader() });
  }

  createProject(data){
    console.log('-------------> create Project');
    return axios.post(API_URL , data, { headers: authHeader() })
                .then(response => {
                    console.log(response.data);
                    return response.data;
                });
  }
  updateProject(data){
    return axios.put(API_URL + '/' + data.id, data , { headers: authHeader() })
                .then(response => {
                    return response.data;
                }); 
  }
  deleteProject(data){
    return axios.delete(API_URL + '/' + data.id, { headers: authHeader() });
  }
}

export default new ProjectService();