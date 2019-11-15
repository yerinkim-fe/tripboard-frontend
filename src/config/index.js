let SERVER_URL;
if (process.env.REACT_APP_NODE_ENV === 'development') {
  SERVER_URL = 'http://localhost:4000';
} else {
  SERVER_URL = 'https://tripboardbackend.nr3apggekj.ap-northeast-2.elasticbeanstalk.com';
}

export const config = {
  SERVER_URL
};
