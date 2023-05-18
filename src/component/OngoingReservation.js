import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL, convertDateToHHmmss, fetchTodayReservation, mobilable } from "../Common";
import './OngoingReservation.css';

function OngoingReservation() {
    const navigate = useNavigate();

    const [ongoingReservation, setOngoingReservation] = useState(null);

    useEffect(() => {
        fetchTodayReservation((reservations) => {
            const currentTime = convertDateToHHmmss(new Date());
            reservations.forEach(reservation => {
                if (reservation.start <= currentTime && currentTime <= reservation.end) {
                    setOngoingReservation(reservation);
                }
            });
        }, () => {
            alert("정보를 불러오는 데 실패했습니다.");
            navigate("/login");
        });
    }, []);

    const toggleCheckIn = async () => {
        const checkInCode = prompt('회의실 내에 있는 인증 코드를 입력하세요', '');
        try {
            const response = await fetch(BASE_URL + '/reservation/profiles/checkin', {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: 1, // TODO: room's id
                    checkInCode: checkInCode
                })
            });
    
            const data = await response.json();
            const statusCode = response.status;
            if (statusCode == 200) {
                alert("인증에 성공했습니다.");
            } else {
                alert("인증에 실패했습니다.");
            }
        } catch (error) {
            alert("인증에 실패했습니다.");
        }
    }

    const representStartAndEndTime = (ongoingReservation) => {
        if (ongoingReservation == null) return "";

        const [startHour, startMinute, startSecond] = ongoingReservation.start.split(':');
        const [endHour, endMinute, endSecond] = ongoingReservation.end.split(':');

        const startTimestamp = Number(startHour) * 60 + Number(startMinute);
        const endTimestamp = Number(endHour) * 60 + Number(endMinute);
        
        const timestampDiff = endTimestamp - startTimestamp;
        const hourDiff = Math.floor(timestampDiff / 60);
        const minuteDiff = timestampDiff % 60;

        let result = "";
        if (hourDiff >= 1) result += hourDiff + "시간";
        if (hourDiff >= 1 && minuteDiff >= 1) result += " ";
        if (minuteDiff >= 1) result += minuteDiff + "분";
        return result;
    }

    return (
        <div>
            { ongoingReservation != null &&
            <div className={`${mobilable('contents-with-title-box')} margin-top-2rem`}>
                <a className='contents-box-title-text'>현재 진행 중인 회의</a>
                <div className={`${mobilable('contents-box')} ${mobilable('ongoing-meeting-box')} margin-top-1rem`}>
                    <a className={mobilable('ongoing-meeting-time-text')}>{`${ongoingReservation?.start.slice(0, 5)} ~ ${ongoingReservation?.end.slice(0, 5)}`}</a>
                    <a className={mobilable('ongoing-meeting-description-text')}>
                        <b>{ongoingReservation?.room.name}</b>에서 <b>{representStartAndEndTime(ongoingReservation)}</b> 동안 진행
                    </a>
                    <div className={mobilable('ongoing-meeting-end-box')}>
                        <a className={`${mobilable('ongoing-meeting-participants-text')} text-ellipsis`}>{`참여자: ${ ongoingReservation?.attendants.map((item) => (item.name)) }`}</a>
                        <div className={`red-box ${mobilable('admission-confirm-button')}`}>
                        <a className='red-box-text' onClick={toggleCheckIn}>입실 인증</a>
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>
    );
}

export default OngoingReservation;