import { authHeader } from '../_helpers';
import axios from "axios";

export const songService = {
    getSongLists,  
    getSongs,    
};
const API_URL = "http://localhost:8000/api";
const axiosConfig = {
    headers: {
        'token':`${authHeader()}`,        
    }
  };
async function getSongLists(uid) {
    try {        
        const res = await axios.get(`${API_URL}/songlists/${uid}` , axiosConfig);
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        return res.data
    } catch (err) {
        console.log(err.response.data);
        throw  new Error(err.response.data);
    }
}

async function getSongs(id) {
    try {        
        const res = await axios.get(`${API_URL}/songs/${id}` , axiosConfig);
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        return res.data
    } catch (err) {
        console.log(err.response.data);
        throw  new Error(err.response.data);
    }
}

async function addSongs(id) {
    try {        
        const res = await axios.post(`${API_URL}/songs/${id}` , axiosConfig);
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        return res.data
    } catch (err) {
        console.log(err.response.data);
        throw  new Error(err.response.data);
    }
}


