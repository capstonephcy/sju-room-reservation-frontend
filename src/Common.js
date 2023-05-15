import { isMobile } from 'react-device-detect';

export const BASE_URL = "http://127.0.0.1:8080";

export const mobilable = (str) => {
    if (isMobile) return str + '-mobile'
    else return str
}