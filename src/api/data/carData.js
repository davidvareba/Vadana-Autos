import axios from 'axios';
import firebaseConfig from '../apiKeys';

const baseURL = firebaseConfig.databaseURL;

const getItems = (user) => new Promise((resolve, reject) => {
  axios
    .get(`${baseURL}/cars.json?orderBy="uid"&equalTo="${user}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

// then((response) => resolve(Object.values(response.data))) is converting to obj, so instead pass
const getItemsFB = (fbKey) => new Promise((resolve, reject) => {
  axios
    .get(`${baseURL}/cars/${fbKey}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

const createItem = (object) => new Promise((resolve, reject) => {
  axios
    .post(`${baseURL}/cars.json`, object)
    .then((response) => {
      axios
        .patch(`${baseURL}/cars/${response.data.name}.json`, {
          firebaseKey: response.data.name,
        })
        .then(() => getItems(object.uid).then(resolve));
    })
    .catch(reject);
});

const deleteItem = (itemObj) => new Promise((resolve, reject) => {
  axios
    .delete(`${baseURL}/cars/${itemObj.firebaseKey}.json`)
    .then(() => getItems(itemObj.uid).then(resolve))
    .catch(reject);
});

const updateItem = (itemObj) => new Promise((resolve, reject) => {
  axios
    .patch(`${baseURL}/cars/${itemObj.firebaseKey}.json`, itemObj)
    .then(() => getItems(itemObj.uid).then(resolve))
    .catch(reject);
});

const updateFav = (itemObj) => new Promise((resolve, reject) => {
  axios
    .patch(`${baseURL}/cars/${itemObj.firebaseKey}.json`, itemObj)
    .then(resolve)
    .catch(reject);
});

const getNotes = (itemID) => new Promise((resolve, reject) => {
  axios
    .get(`${baseURL}/notes.json?orderBy="itemID"&equalTo="${itemID}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const createNote = (object) => new Promise((resolve, reject) => {
  axios
    .post(`${baseURL}/notes.json`, object)
    .then((response) => {
      axios
        .patch(`${baseURL}/notes/${response.data.name}.json`, {
          firebaseKey: response.data.name,
        })
        .then(() => getNotes(object.itemID).then(resolve));
    })
    .catch(reject);
});

const deleteNote = (noteObj) => new Promise((resolve, reject) => {
  axios
    .delete(`${baseURL}/notes/${noteObj.firebaseKey}.json`)
    .then(() => resolve(getNotes(noteObj.itemID)))
    .catch(reject);
});

// FILTER FAVORITE CARS
const getFavCars = () => new Promise((resolve, reject) => {
  axios.get(`${baseURL}/cars.json?orderBy="favorite"&equalTo=true`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

// UPDATE FAVORITE CARS
const favCars = (updateObj) => new Promise((resolve, reject) => {
  axios.patch(`${baseURL}/cars/${updateObj.firebaseKey}.json`, updateObj)
    .then(() => getFavCars().then(resolve))
    .catch(reject);
});
// FILTER NEW CARS
const getNewCars = () => new Promise((resolve, reject) => {
  axios.get(`${baseURL}/cars.json?orderBy="new"&equalTo=true`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

// UPDATE NEW CARS
const newCars = (updateObj) => new Promise((resolve, reject) => {
  axios.patch(`${baseURL}/cars/${updateObj.firebaseKey}.json`, updateObj)
    .then(() => getNewCars().then(resolve))
    .catch(reject);
});

export {
  getItems,
  createItem,
  deleteItem,
  updateItem,
  getItemsFB,
  updateFav,
  getNotes,
  createNote,
  deleteNote,
  getFavCars,
  favCars,
  getNewCars,
  newCars,

};
