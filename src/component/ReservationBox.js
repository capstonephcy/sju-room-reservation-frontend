import { useState } from "react";
import Calendar from "react-calendar";
import { BASE_URL, convertDateToYYYYMMDD, mobilable } from "../Common";
import './ReservationBox.css';

function ReservationBox({ rooms, setShowsRepModal }) {
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [reservationDate, setReservationDate] = useState(new Date());
    const [start, setStart] = useState("09:00");
    const [end, setEnd] = useState("09:00");
    const [members, setMembers] = useState([]);
    const [isRepChecked, setIsRepChecked] = useState(false);

    const [showsCalendar, setShowsCalendar] = useState(false);

    const onChangeReservationDate = reservationDate => {
        setReservationDate(reservationDate);
        setShowsCalendar(false);
    };

    const toggleDate = () => {
        setShowsCalendar(!showsCalendar);
    }

    const toggleReservationButton = () => {
        if (isRepChecked) setShowsRepModal(true);
        else {
            if (selectedRoom == null) alert("예약 장소를 선택해주세요.");
            else if (start >= end) alert("예약 종료 시간은 시작 시간 이후로 설정되어야 합니다.");
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
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    roomId: selectedRoom.id,
                    date: convertDateToYYYYMMDD(reservationDate),
                    start: start,
                    end: end,
                    attendants: [
                        // TODO
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
                    <a className='gray-box-text'>{reservationDate.toLocaleDateString('ko-KR', { year: '2-digit', month: '2-digit', day: '2-digit' })}</a>
                </div>
                <div className='gray-box'>
                    <img src='/img/clock.png' className='gray-box-icon'/>
                    <select className={mobilable('gray-dropdown')} onChange={(event) => { setStart(event.target.value ); }}>
                        <option>09:00</option>
                        <option>16:00</option>
                    </select>
                    <a> ~ </a>
                    <select className={mobilable('gray-dropdown')} onChange={(event) => { setEnd(event.target.value ); }}>
                        <option>09:00</option>
                        <option>17:30</option>
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
            {showsCalendar && <Calendar className='reservation-date-calendar' onChange={onChangeReservationDate} value={reservationDate}/>}
        </div>
    );
}

export default ReservationBox;