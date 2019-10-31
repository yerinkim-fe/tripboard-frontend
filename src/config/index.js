let SERVER_URL;

if (process.env.NODE_ENV === 'development') {
  SERVER_URL = 'http://localhost:4000';
} else if (process.env.NODE_ENV === 'production') {
  SERVER_URL = 'null';
}

export const config = {
  SERVER_URL
};
