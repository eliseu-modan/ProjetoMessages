import api from "./services/api";


export function addAuthorizationHeader() {
  const token = localStorage.getItem('token');
  if (token) {
    console.log('Token chegou no middleware do fron tend ', token);
    api.defaults.headers.common['Authorization']=`Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
}
