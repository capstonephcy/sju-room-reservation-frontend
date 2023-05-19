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

export const convertDateToHHmmss = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
}

export const roundToNearestFiveMinutes = (time) => {
    const [hours, minutes, seconds] = time.split(':').map(Number);
  
    // Calculate the total minutes
    const totalMinutes = hours * 60 + minutes;
  
    // Round the total minutes to the nearest multiple of 5
    const roundedMinutes = Math.round(totalMinutes / 5) * 5;
  
    // Calculate the new hours and minutes
    const newHours = Math.floor(roundedMinutes / 60);
    const newMinutes = roundedMinutes % 60;
  
    // Format the new time with leading zeros
    const formattedTime = `${String(newHours).padStart(2, '0')}:${String(
      newMinutes
    ).padStart(2, '0')}:00`;
  
    return formattedTime;
  }
  

export const sliceContinuousTimes = (times) => {
    const continuousTimes = [];
    for (let i = 0; i < times.length; i++) {
        if (i === 0) {
            continuousTimes.push(times[i]);
            continue;
        }

        const [prevHour, prevMinute] = times[i - 1].split(':');
        const [currentHour, currentMinute] = times[i].split(':');

        const prevTimestamp = Number(prevHour) * 60 + Number(prevMinute);
        const currentTimestamp = Number(currentHour) * 60 + Number(currentMinute);

        const minuteDiff = currentTimestamp - prevTimestamp;
        if (minuteDiff !== 5) break;
        continuousTimes.push(times[i]);
    }
    return continuousTimes;
}

export const fetchTodayReservation = async (onSuccess, onFailure) => {
    try {
        const currentYYYYMMDD = convertDateToYYYYMMDD(new Date());
        const response = await fetch(BASE_URL + '/reservation/profiles?startDate=' + currentYYYYMMDD + '&endDate=' + currentYYYYMMDD + '&startTime=00:00:00&endTime=23:59:59&pageIdx=0&pageLimit=100', {
            method: 'GET',
            headers: {
                'Request-Type': 'TIME_RANGE',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                'Refresh' : `Bearer ${localStorage.getItem('refreshToken')}`
            }
        });

        const data = await response.json();
        const statusCode = response.status;
        if (statusCode == 200) {
            onSuccess(data.reservations);
        } else {
            onFailure();
        }
    } catch (error) {
        onFailure();
    }
}

export const onFailure = (navigate) => {
    alert("정보를 불러오는 데 실패했습니다.");
    navigate("/login");
}

export const checkIsAdmin = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user.permissions[0].includes("ADMIN");
}