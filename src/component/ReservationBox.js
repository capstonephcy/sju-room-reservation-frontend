import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";
import { BASE_URL, convertDateToHHmmss, convertDateToYYYYMMDD, mobilable, roundToNearestFiveMinutes, sliceContinuousTimes } from "../Common";
import RepModal from "./RepModal";
import './ReservationBox.css';

function ReservationBox({ rooms }) {
    const navigate = useNavigate();

    const [availableTimes, setAvailableTimes] = useState([]);

    const [selectedRoom, setSelectedRoom] = useState(null);
    const [date, setDate] = useState(new Date());
    const [start, setStart] = useState("09:00");
    const [end, setEnd] = useState("09:00");
    const [members, setMembers] = useState([]);
    const [isRepChecked, setIsRepChecked] = useState(false);

    const [showsCalendar, setShowsCalendar] = useState(false);
    const [showsRepModal, setShowsRepModal] = useState(false);

    useEffect(() => {
        fetchReservationAndUpdateAvailableTimes();
    }, [selectedRoom, date]);

    const fetchReservationAndUpdateAvailableTimes = async () => {
        try {
            const currentYYYYMMDD = convertDateToYYYYMMDD(new Date());
            const currentHHmmss = convertDateToHHmmss(new Date());
            const response = await fetch(BASE_URL + '/reservation/profiles?startDate=' + currentYYYYMMDD + '&endDate=' + currentYYYYMMDD + '&startTime=' + currentHHmmss + '&endTime=23:59:59&pageIdx=0&pageLimit=100', {
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
                const reservationsForSelectedRoom = data.reservations.filter((item) => (
                    item.room.id == selectedRoom?.id
                ));
                updateAvailableTimes(reservationsForSelectedRoom);
            } else {
                alert("정보를 불러오는 데 실패했습니다: " + data._metadata.message);
                navigate("/login");
            }
        } catch (error) {
            alert("정보를 불러오는 데 실패했습니다: " + error);
            navigate("/login");
        }
    }

    const updateAvailableTimes = (reservations) => {
        const currentYYYYMMDD = convertDateToYYYYMMDD(new Date());
        const currentHHmmss = convertDateToHHmmss(new Date());

        // Define time slot intervals
        const timeSlotIntervalMinutes = 5;
        let startTime = "09:00:00";
        if (currentYYYYMMDD == convertDateToYYYYMMDD(date)) {
            startTime = roundToNearestFiveMinutes(currentHHmmss);
        }
        const endTime = "22:00:00";

        // Calculate available times
        const newAvailableTimes = [];
        let currentTime = startTime;

        while (currentTime <= endTime) {
            // Check if the current time falls within any reservation
            const isReserved = reservations.some(reservation => {
                const reservationStart = reservation.start;
                const reservationEnd = reservation.end;
                
                return currentTime >= reservationStart && currentTime <= reservationEnd;
            });

            if (!isReserved) {
                newAvailableTimes.push(currentTime);
            }

            // Increment current time by the time slot interval
            const [hours, minutes, seconds] = currentTime.split(":").map(Number);
            const newTime = new Date(0, 0, 0, hours, minutes + timeSlotIntervalMinutes, seconds);
            currentTime = newTime.toTimeString().slice(0, 8);
        }
        
        setAvailableTimes(newAvailableTimes);
    }

    const onChangeDate = date => {
        setDate(date);
        setShowsCalendar(false);
    };

    const toggleDate = () => {
        setShowsCalendar(!showsCalendar);
    }

    const toggleReservationButton = () => {
        if (selectedRoom == null) alert("예약 장소를 선택해주세요.");
        else if (start >= end) alert("예약 종료 시간은 시작 시간 이후로 설정되어야 합니다.");
        else {
            if (isRepChecked) setShowsRepModal(true);
            else createReservation();
        }
    }

    const createReservation = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await fetch(BASE_URL + '/reservation/profiles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Refresh' : `Bearer ${localStorage.getItem('refreshToken')}`
                },
                body: JSON.stringify({
                    roomId: selectedRoom.id,
                    date: convertDateToYYYYMMDD(date),
                    start: start,
                    end: end,
                    attendants: [
                        // TODO: members.map { it.id }
                    ]
                })
            });
    
            const data = await response.json();
            const statusCode = response.status;
            if (statusCode == 200) {
                alert("예약되었습니다.");
            } else {
                alert("예약에 실패했습니다: " + data._metadata.message);
            }
        } catch (error) {
            alert("예약에 실패했습니다: " + error);
        }
    }

    return (
        <div>
            <div className={`${mobilable('reservation-box')} ${mobilable('contents-box')} margin-top-1rem`}>
                <div className='gray-box'>
                    <img src='/img/room.png' className='gray-box-icon'/>
                    <select className={`${mobilable('gray-dropdown')} 'text-ellipsis'`}
                    onChange={(event) => { 
                        const index = event.target.selectedIndex;
                        if (index == 0) setSelectedRoom(null);
                        else setSelectedRoom(rooms[index - 1]);
                    }}>
                        <option>회의실 명</option>
                        {rooms.map((item) => (
                            <option>{item.name}</option>
                        ))}
                    </select>
                </div>
                <div className='gray-box' onClick={toggleDate}>
                    <img src='/img/schedule.png' className='gray-box-icon'/>
                    <a className='gray-box-text'>{date.toLocaleDateString('ko-KR', { year: '2-digit', month: '2-digit', day: '2-digit' })}</a>
                </div>
                <div className='gray-box'>
                    <img src='/img/clock.png' className='gray-box-icon'/>
                    <select className={mobilable('gray-dropdown')} onChange={(event) => { setStart(event.target.value ); }}>
                        {availableTimes.map((item) => (
                            <option>{item.slice(0, 5)}</option>
                        ))}
                    </select>
                    <a> ~ </a>
                    <select className={mobilable('gray-dropdown')} onChange={(event) => { setEnd(event.target.value ); }}>
                        {sliceContinuousTimes(availableTimes.filter((item) => (item >= start)))
                            .map((item) => (
                                <option>{item.slice(0, 5)}</option>
                            ))
                        }
                            
                    </select>
                </div>
                <div className={`gray-box ${mobilable('search-box')}`}>
                    <img src='/img/search.png' className='gray-box-icon'/>
                    <input className='search-box-input gray-box-text text-ellipsis' placeholder={members.length > 0 ? members.join(", ") : "참여 인원 이름 검색"}></input>
                </div>
                <div className='gray-box'>
                    <input className='checkbox' type="checkbox" checked={isRepChecked} onChange={({ target: { checked } }) => setIsRepChecked(checked)}/>
                    <a className='gray-box-text' onClick={() => setIsRepChecked(!isRepChecked)}>반복</a>
                </div>
                <div className='red-box' onClick={toggleReservationButton}>
                    <a className='red-box-text'>예약하기</a>
                </div>
            </div>
            {showsCalendar && <Calendar className='reservation-date-calendar' onChange={onChangeDate} value={date}/>}

            {showsRepModal && <RepModal selectedRoom={selectedRoom} date={date} start={start} end={end} members={members} closeModal={() => { setShowsRepModal(false); }} />}
        </div>
    );
}

export default ReservationBox;