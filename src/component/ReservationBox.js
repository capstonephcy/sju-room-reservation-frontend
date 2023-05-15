import { useState } from "react";
import Calendar from "react-calendar";
import { mobilable } from "../Common";

function ReservationBox({ rooms, setShowsRepModal }) {
    const [reservationDate, setReservationDate] = useState(new Date());
    const [showsCalendar, setShowsCalendar] = useState(false);
    const [members, setMembers] = useState([]);
    const [isRepChecked, setIsRepChecked] = useState(false);

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
        // TODO: 단기 예약 요청
        }
    }

    return (
        <div>
            <div className={`${mobilable('reservation-box')} ${mobilable('contents-box')} margin-top-1rem`}>
                <div className='gray-box'>
                    <img src='/img/room.png' className='gray-box-icon'/>
                    <select className={`${mobilable('gray-dropdown')} 'text-ellipsis'`}>
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
                    <a className='gray-box-text'>16:00 ~ 17:30</a>
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