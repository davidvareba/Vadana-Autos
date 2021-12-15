import axios from 'axios';
import firebaseConfig from '../apiKeys';

const baseURL = firebaseConfig.databaseURL;

const getContact = (user) => new Promise((resolve, reject) => {
  axios
    .get(`${baseURL}/contact.json?orderBy="uid"&equalTo="${user}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const createContact = (object) => new Promise((resolve, reject) => {
  axios
    .post(`${baseURL}/contact.json`, object)
    .then((response) => {
      axios
        .patch(`${baseURL}/contact/${response.data.name}.json`, {
          firebaseKey: response.data.name,
        })
        .then(() => getContact(object.uid).then(resolve));
    })
    .catch(reject);
});

const updateContact = (itemObj) => new Promise((resolve, reject) => {
  axios
    .patch(`${baseURL}/contact/${itemObj.firebaseKey}.json`, itemObj)
    .then(() => getContact(itemObj.uid).then(resolve))
    .catch(reject);
});

export {
  createContact,
  updateContact,
};
