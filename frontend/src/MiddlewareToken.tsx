import api from "./services/api";


export function addAuthorizationHeader() {
  const token = localStorage.getItem('token');
  console.log('middleware do token front end ' , token)
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
}
