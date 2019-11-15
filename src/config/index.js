let SERVER_URL;
if (process.env.REACT_APP_NODE_ENV === 'development') {
  SERVER_URL = 'http://localhost:4000';
} else {
  SERVER_URL = 'http://tripboardapi.yerinsite.com';
}

export const config = {
  SERVER_URL
};
