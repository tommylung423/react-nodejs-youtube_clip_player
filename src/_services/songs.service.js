import { authHeader } from '../_helpers';
import axios from "axios";


export const songService = {
    getSongLists,  
    getSongs, 
    addSongs,
    addSongLists,
    delSongLists,
    updateSongLists,
    sortSongs,
    delSongs,
    updateSongs   
};
// const API_URL = "http://localhost:8000/api";

// const API_URL = "https://clip-nodejs.herokuapp.com/api";
const API_URL = "https://main-test-au-dyoyl6odci8iiu2c-gtw.qovery.io/api";

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

async function addSongLists(data) {
    try {
        const res = await axios.post(`${API_URL}/songlists/`,data , axiosConfig);        
        return res.data
    } catch (err) {
        console.log(err.response.data);
        throw  new Error(err.response.data);
    }
}

async function delSongLists(id) {
    try {
        const res = await axios.delete(`${API_URL}/songlists/${id}`, axiosConfig);
        return res.data
    } catch (err) {
        console.log(err.response.data);
        throw  new Error(err.response.data);
    }
}

async function updateSongLists(songlist) {
    try {
        const res = await axios.put(`${API_URL}/songlists/${songlist._id}`, songlist , axiosConfig);
        return res.data
    } catch (err) {
        console.log(err.response.data);
        throw  new Error(err.response.data);
    }
}
 

async function getSongs(id) {
    try {        
        const res = await axios.get(`${API_URL}/songs/${id}` , axiosConfig);
        return res.data
    } catch (err) {
        console.log(err.response.data);
        throw  new Error(err.response.data);
    }
}

async function addSongs(song) {
    try {        
        const res = await axios.post(`${API_URL}/songs/`,song , axiosConfig);
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        return res.data
    } catch (err) {
        console.log(err.response.data);
        throw  new Error(err.response.data);
    }
}

async function sortSongs(id,song) {
    try {        
        const res = await axios.put(`${API_URL}/songs/${id}`,song , axiosConfig);
        return res.data
    } catch (err) {
        console.log(err.response.data);
        throw  new Error(err.response.data);
    }
}

async function delSongs(id,song) {
    try {        
        const res = await axios.delete(`${API_URL}/songs/${id}` , axiosConfig);
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        return res.data
    } catch (err) {
        console.log(err.response.data);
        throw  new Error(err.response.data);
    }
}

async function updateSongs(id,song) {
    try {        
        const res = await axios.put(`${API_URL}/songs/updatesong/${id}`, song , axiosConfig);
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        return res.data
    } catch (err) {
        console.log(err.response.data);
        throw  new Error(err.response.data);
    }
}

