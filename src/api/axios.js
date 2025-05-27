import axios from 'axios';

const instance = axios.create({
  baseURL: "https://port-0-lounge-springboot-m9gp6v3d656fa265.sel4.cloudtype.app",
  withCredentials: true,
});

export default instance;
