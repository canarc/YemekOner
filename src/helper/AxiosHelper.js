import Axios from 'axios';
import {API_ADDRESS} from '../common/constants';

export const AxiosGet = async (endpoint, token) => {
  return new Promise((resolve, reject) => {
    Axios.get(
      API_ADDRESS + endpoint,
      token
        ? {
            headers: {Authorization: 'Bearer ' + token},
          }
        : null,
    )
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

export const AxiosPost = async (endpoint, data, token) => {
  return new Promise((resolve, reject) => {
    Axios.post(
      API_ADDRESS + endpoint,
      data ? data : {},
      token
        ? {
            headers: {Authorization: 'Bearer ' + token},
          }
        : null,
    )
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};
