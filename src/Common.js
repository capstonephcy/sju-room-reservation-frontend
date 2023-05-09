import { isMobile } from 'react-device-detect';

export const BASE_URL = "http://127.0.0.1:8080";

export const mobilable = (str) => {
    if (isMobile) return str + '-mobile'
    else return str
}

export const fetchUserProfile = async (onSuccess, onFailure) => {
    const token = localStorage.getItem('refreshToken');
    const response = await fetch(BASE_URL + '/users/profiles', {
      method: 'GET',
      headers: {
        'Request-Type': 'CURRENT',
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();
    const statusCode = response.status;
    if (statusCode == 200) {
      onSuccess(data);
    } else {
      onFailure(data);
    }
  }