import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";
import { BASE_URL, convertDateToHHmmss, convertDateToYYYYMMDD, fetchTodayReservation, mobilable, roundToNearestFiveMinutes, sliceContinuousTimes } from "../Common";
import RepModal from "./RepModal";
import './ReservationBox.css';

function ReservationBox({ rooms }) {
    const navigate = useNavigate();

    useEffect(() => {
        const reservationDateCalendar = document.querySelector('.reservation-date-calendar');
        const dateBox = document.querySelector('.date-box');
        if (reservationDateCalendar && dateBox) {
            reservationDateCalendar.style.left = dateBox.offsetLeft + 'px';
        }

        const searchResultBox = document.querySelector('.search-result-box');
        const searchBox = document.querySelector('.search-box, .search-box-mobile');
        if (searchResultBox && searchBox) {
            searchResultBox.style.top = searchBox.offsetTop + searchBox.clientHeight + 'px';
            searchResultBox.style.left = searchBox.offsetLeft + 'px';
        }
    });

    const [availableTimes, setAvailableTimes] = useState([]);

    const [selectedRoom, setSelectedRoom] = useState(null);
    const [date, setDate] = useState(new Date());
    const [start, setStart] = useState("09:00");
    const [end, setEnd] = useState("09:00");

    const [query, setQuery] = useState("");
    const [searchedMembers, setSearchedMembers] = useState([]);
    const [members, setMembers] = useState([]);
    useEffect(() => {
        toggleSearch(query);
    }, [query]);

    const [isRepChecked, setIsRepChecked] = useState(false);

    const [showsCalendar, setShowsCalendar] = useState(false);
    const [showsRepModal, setShowsRepModal] = useState(false);

    useEffect(() => {
        fetchTodayReservation((reservations) => {
            const reservationsForSelectedRoom = reservations.filter((item) => (
                item.room.id == selectedRoom?.id
            ));
            updateAvailableTimes(reservationsForSelectedRoom);
        }, () => {
            alert("정보를 불러오는 데 실패했습니다.");
            navigate("/login");
        });
    }, [selectedRoom, date]);

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
        if (convertDateToYYYYMMDD(date) < convertDateToYYYYMMDD(new Date())) return;
        setDate(date);
        setShowsCalendar(false);
    };

    const toggleDate = () => {
        setShowsCalendar(!showsCalendar);
    }

    const toggleSearch = async (query) => {
        const response = await fetch(BASE_URL + '/users/profiles?name=' + query, {
            method: 'GET',
            headers: {
                'Request-Type': 'NAME',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                'Refresh' : `Bearer ${localStorage.getItem('refreshToken')}`
            }
        });

        const data = await response.json();
        const statusCode = response.status;
        if (statusCode == 200) {
            setSearchedMembers(data.userProfiles);
        }
    }

    const toggleSearchedMember = (user) => {
        setQuery("");
        const newMembers = [...members];
        newMembers.push(user);
        setMembers(newMembers);
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
                    attendants: members.map((item) => (item.id))
                })
            });
    
            const data = await response.json();
            const statusCode = response.status;
            if (statusCode == 200) {
                alert("예약되었습니다.");
                window.location.reload();
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

                <div className='date-box gray-box' onClick={toggleDate}>
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
                    <input className='search-box-input gray-box-text text-ellipsis' value={query} onChange={(event) => { setQuery(event.target.value); }} placeholder={members.length > 0 ? members.map(user => user.name).join(", ") : "참여 인원 이름 검색"}></input>
                </div>
                <div className='search-result-box'>
                    {searchedMembers.map((user) => (
                        <a className='search-result-item' onClick={() => toggleSearchedMember(user)}>{user.username} {user.name}</a>
                    ))}
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