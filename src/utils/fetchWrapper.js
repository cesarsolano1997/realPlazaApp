import {getTokenUser} from '../db/table-User';

const URL_BASE = 'http://192.168.1.100/ApiRealPlaza/api/';

export const fetchWrapper = {
  get,
  post,
  put,
  delete: _delete,
};

const token_user = async () => {
  const token = await getTokenUser();
  console.log('token_user', token);
  if (token.length > 0) {
    return token[0].token_user;
  }
  return '';
};

async function get(url) {
  const token = await token_user();

  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(URL_BASE + url, requestOptions)
    .then(handleResponse)
    .catch(error => console.error(error));
}

async function post(url, body) {
  try {
    const token = await token_user();
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    };
    return fetch(URL_BASE + url, requestOptions).then(handleResponse);
  } catch (error) {
    console.error(error);
    return null;
  }
}

function put(url, body) {
  const requestOptions = {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body),
  };
  return fetch(URL_BASE + url, requestOptions).then(handleResponse);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url) {
  const requestOptions = {
    method: 'DELETE',
  };
  return fetch(URL_BASE + url, requestOptions).then(handleResponse);
}

// helper functions

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
