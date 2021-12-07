import axios from 'axios';
import firebaseConfig from '../apiKeys';

const baseURL = firebaseConfig.databaseURL;

const getCars = (user) => new Promise((resolve, reject) => {
  axios
    .get(`${baseURL}/cars.json?orderBy="uid"&equalTo="$${user}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const getCarsFB = (fbKey) => new Promise((resolve, reject) => {
  axios
    .get(`${baseURL}/cars/${fbKey}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

const createCar = (object) => new Promise((resolve, reject) => {
  axios
    .post(`${baseURL}/items.json`, object)
    .then((response) => {
      axios
        .patch(`${baseURL}/items/${response.data.name}.json`, {
          firebaseKey: response.data.name,
        })
        .then(() => getCars(object.uid).then(resolve));
    })
    .catch(reject);
});

const deleteCar = (itemObj) => new Promise((resolve, reject) => {
  axios
    .delete(`${baseURL}/cars/${itemObj.firebaseKey}.json`)
    .then(() => getCars(itemObj.uid).then(resolve))
    .catch(reject);
});

const updateCar = (itemObj) => new Promise((resolve, reject) => {
  axios
    .patch(`${baseURL}/cars/${itemObj.firebaseKey}.json`, itemObj)
    .then(() => getCars(itemObj.uid).then(resolve))
    .catch(reject);
});

const updateFav = (itemObj) => new Promise((resolve, reject) => {
  axios
    .patch(`${baseURL}/favorite/${itemObj.firebaseKey}.json`, itemObj)
    .then(resolve)
    .catch(reject);
});

export {
  getCars,
  deleteCar,
  updateCar,
  getCarsFB,
  updateFav,
  createCar,
};
