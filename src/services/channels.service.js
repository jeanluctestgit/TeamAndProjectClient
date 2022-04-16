import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://teamsandprojectapi-env.eba-mdhaamar.us-east-1.elasticbeanstalk.com/api/projects';

class ChannelService {
  getAllChannels(projectId) {
    return axios.get(API_URL + '/' + projectId + '/compartiments',  { headers: authHeader() });
  }

  getProject(id) {
    return axios.get(API_URL + id , { headers: authHeader() });
  }

  createChannel(projectId,data){
    console.log('-------------> create Project');
    return axios.post(API_URL + '/' + projectId + '/compartiments' , data, { headers: authHeader() })
                .then(response => {
                    console.log(response.data);
                    return response.data;
                });
  }
  updateChannel(projectId,data){
    return axios.put(API_URL + '/' + projectId + '/compartiments' + '/' + data.id, data , { headers: authHeader() })
                .then(response => {
                    return response.data;
                }); 
  }
  deleteChannel(projectId,data){
    return axios.delete(API_URL + '/' + projectId + '/compartiments' + '/' + data.id, { headers: authHeader() });
  }
}

export default new ChannelService();