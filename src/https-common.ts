import axios from 'axios';

export default axios.create({
  baseURL: 'https://node-express-conduit.appspot.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
