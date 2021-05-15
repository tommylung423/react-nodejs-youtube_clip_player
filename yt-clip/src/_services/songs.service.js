import { authHeader } from '../_helpers';
import axios from "axios";

<<<<<<< HEAD

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

=======
export const songService = {
    getSongLists,  
    getSongs,    
};
>>>>>>> a83ad60a090e58a9f8ed852680bc5625ab544dac
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

<<<<<<< HEAD
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
=======
async function getSongs(id) {
    try {        
        const res = await axios.get(`${API_URL}/songs/${id}` , axiosConfig);
>>>>>>> a83ad60a090e58a9f8ed852680bc5625ab544dac
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        return res.data
    } catch (err) {
        console.log(err.response.data);
        throw  new Error(err.response.data);
    }
}

<<<<<<< HEAD
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
=======
async function addSongs(id) {
    try {        
        const res = await axios.post(`${API_URL}/songs/${id}` , axiosConfig);
>>>>>>> a83ad60a090e58a9f8ed852680bc5625ab544dac
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        return res.data
    } catch (err) {
        console.log(err.response.data);
        throw  new Error(err.response.data);
    }
}

<<<<<<< HEAD
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
=======
>>>>>>> a83ad60a090e58a9f8ed852680bc5625ab544dac

