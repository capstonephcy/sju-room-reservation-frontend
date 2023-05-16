import { isMobile } from 'react-device-detect';

export const BASE_URL = "http://127.0.0.1:8080";

export const mobilable = (str) => {
    if (isMobile) return str + '-mobile'
    else return str
}

export const convertDateToYYYYMMDD = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}