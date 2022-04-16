import axios from 'axios';
import authHeader from './auth-header';

const BASE_URL = "http://teamsandprojectapi-env.eba-mdhaamar.us-east-1.elasticbeanstalk.com/api";

class UserServices {
    getUsers()
    {
        return axios.get(BASE_URL + "/users");
    }
}

export default new UserServices();