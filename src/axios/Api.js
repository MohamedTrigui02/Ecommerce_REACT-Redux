import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:3001/api'
});

instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem("CC_Token");
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  error => {
    return Promise.reject(error); // Fixed the error handling here
  }
);


//Response interceptor
instance.interceptors.response.use((response) => {
return response
},
function (error) {
const originalRequest = error.config;
if (error.response.status === 403 && !originalRequest._retry) {

originalRequest._retry = true;
let refreshToken = localStorage.getItem('refresh_token');
if(refreshToken && refreshToken !== ""){
return axios
.post('http://localhost:3001/api/users/refreshToken/', {refreshToken:refreshToken})
.then(res => {

if (res.status === 200) {
// 1) put tokens to LocalStorage
localStorage.setItem('CC_Token', res.data.token);
localStorage.setItem('refresh_token', res.data.refreshToken);
// 2) Change Authorization header
axios.defaults.headers.common['Authorization'] = 'Bearer ' +

localStorage.getItem('CC_Token');

// 3) return originalRequest object with Axios.
return axios(originalRequest);
}
})
}
}
}
);
export default instance;