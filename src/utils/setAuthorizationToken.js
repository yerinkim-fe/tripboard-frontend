import axios from 'axios';

export default function setAuthorizationToken() {
  const token = localStorage.jwtToken;

  if (token) {
    axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['authorization'];
  }
}
