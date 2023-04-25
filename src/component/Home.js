import './Home.css';
import Navigation from './Navigation';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';

function Home() {
  const [date, setDate] = useState(new Date());
  const [showsCalendar, setShowsCalendar] = useState(false);

  const onChange = date => {
    setDate(date);
    setShowsCalendar(false);
  };

  const toggleDate = () => {
    setShowsCalendar(!showsCalendar);
  }

  return (
    <div className='home'>
      <Navigation />
      <div className='home-contents'>
        <div className='home-greetings-box'>
          <a className='home-greetings-emoji'>🙌</a>
          <a className='home-greetings-text semi-bold'>강한빛님,<br/>회의실 예약 시스템에 오신 것을 환영합니다!</a>
        </div>

        <div className='reservation-box contents-box margin-top-2rem'>
          <div className='gray-box'>
            <img src='/img/room.png' className='gray-box-icon'/>
            <select className='gray-dropdown text-ellipsis'>
              <option>회의실 명</option>
              <option>835 회의실</option>
              <option>836 회의실</option>
            </select>
          </div>
          <div className='gray-box' onClick={toggleDate}>
            <img src='/img/schedule.png' className='gray-box-icon'/>
            <a className='gray-box-text'>{date.toLocaleDateString('ko-KR', { year: '2-digit', month: '2-digit', day: '2-digit' })}</a>
          </div>
          <div className='gray-box'>
            <img src='/img/clock.png' className='gray-box-icon'/>
            <a className='gray-box-text'>16:00 ~ 17:30</a>
          </div>
          <div className='search-box gray-box'>
            <img src='/img/search.png' className='gray-box-icon'/>
            <a className='gray-box-text text-ellipsis'>홍길동, 홍길동, 홍길동, 홍길</a>
          </div>
          <div className='gray-box'>
            <input className='checkbox' type="checkbox"/>
            <a className='gray-box-text'>반복</a>
          </div>
          <div className='red-box'>
            <a className='red-box-text'>예약하기</a>
          </div>
        </div>
        {showsCalendar && <Calendar className='hidden' onChange={onChange} value={date}/>}

        <div className='margin-top-2rem'>
          <a className='contents-box-title-text'>현재 진행 중인 회의</a>
          <div className='contents-box margin-top-1rem'>
            <a>TEST</a>
          </div>
        </div>
        <div className='margin-top-2rem'>
          <a className='contents-box-title-text margin-top-2rem'>회의실 목록</a>
          <div className='reservation-room-list-box contents-box margin-top-1rem'>
            <a className='reservation-room-title'>835 회의실</a>
            <a className='reservation-room-title'>836 회의실</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;