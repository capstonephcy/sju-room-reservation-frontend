import './Home.css';
import Navigation from './Navigation';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';
import { isMobile } from 'react-device-detect';

function Home() {
  const mobilable = (str) => {
    if (isMobile) return str + '-mobile'
    else return str
  }

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

  // rep-modal
  const [showsRepModal, setShowsRepModal] = useState(false);
  const REP_CYCLE = { DAY: "DAY", WEEK: "WEEK", MONTH: "MONTH" };
  const [repCycle, setRepCycle] = useState(REP_CYCLE.DAY);
  const REP_TYPE = { REP_COUNT: "REP_COUNT", END_DATE: "END_DATE" };
  const [repType, setRepType] = useState(REP_TYPE.REP_COUNT);

  const [repCount, setRepCount] = useState(3);
  const [endDate, setEndDate] = useState(new Date());

  const toggleRepCycle = (repCycle) => {
    setRepCycle(repCycle)
  }

  const toggleRepType = (repType) => {
    setRepType(repType)
  }

  const toggleReservationButtonInRepModal = () => {
    // TODO: 반복 예약 요청
    if (repType == REP_TYPE.REP_COUNT) {
      alert([repCycle, repType, repCount].join(", "));
    } else {
      alert([repCycle, repType, endDate].join(", "));
    }
    setShowsRepModal(false);
  }

  return (
    <div className={mobilable('home')}>
      <Navigation />
      <div className={mobilable('home-contents')}>
        <div className={mobilable('home-greetings-box')}>
          <a className={mobilable('home-greetings-emoji')}>🙌</a>
          <a className={`${mobilable('home-greetings-text')} semi-bold`}>강한빛님,<br/>{isMobile ? '오늘도 방문해주셔서 감사합니다!' : '회의실 예약 시스템에 오신 것을 환영합니다!'}</a>
        </div>

        <div className={`${mobilable('reservation-box')} ${mobilable('contents-box')} margin-top-1rem`}>
          <div className='gray-box'>
            <img src='/img/room.png' className='gray-box-icon'/>
            <select className={`${mobilable('gray-dropdown')} 'text-ellipsis'`}>
              <option>회의실 명</option>
              <option>835 회의실</option>
              <option>836 회의실</option>
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
            <input className='checkbox' type="checkbox" checked={isRepChecked} onChange={setIsRepChecked}/>
            <a className='gray-box-text' onClick={() => setIsRepChecked(!isRepChecked)}>반복</a>
          </div>
          <div className='red-box' onClick={toggleReservationButton}>
            <a className='red-box-text'>예약하기</a>
          </div>
        </div>
        {showsCalendar && <Calendar className='reservation-date-calendar' onChange={onChangeReservationDate} value={reservationDate}/>}

        <div className={`${mobilable('contents-with-title-box')} margin-top-2rem`}>
          <a className='contents-box-title-text'>현재 진행 중인 회의</a>
          <div className={`${mobilable('contents-box')} margin-top-1rem`}>
            <a>TEST</a>
          </div>
        </div>

        <div className={`${mobilable('contents-with-title-box')} margin-top-2rem`}>
          <a className='contents-box-title-text margin-top-2rem'>회의실 목록</a>
          <div className={`${mobilable('reservation-room-list-box')} ${mobilable('contents-box')} margin-top-1rem`}>
            <a className='reservation-room-title'>835 회의실</a>
            <a className='reservation-room-title'>836 회의실</a>
          </div>
        </div>
      </div>

      {showsRepModal &&
      <div className='rep-modal-background'>
        <div className={mobilable('rep-modal')}>
          <div className='rep-modal-title-box'>
            <a className='rep-modal-title'>반복 예약 설정</a>
            <a className='cursor-pointer semi-bold' onClick={() => setShowsRepModal(false)}>X</a>
          </div>
          <div className='rep-modal-option-box'>
            <a className={repCycle == REP_CYCLE.DAY ? 'rep-modal-option-selected' : 'rep-modal-option'} onClick={() => toggleRepCycle(REP_CYCLE.DAY)}>매일</a>
            <a className={repCycle == REP_CYCLE.WEEK ? 'rep-modal-option-selected' : 'rep-modal-option'} onClick={() => toggleRepCycle(REP_CYCLE.WEEK)}>매주</a>
            <a className={repCycle == REP_CYCLE.MONTH ? 'rep-modal-option-selected' : 'rep-modal-option'} onClick={() => toggleRepCycle(REP_CYCLE.MONTH)}>매월</a>
          </div>
          <div className='rep-modal-option-box'>
            <a className={repType == REP_TYPE.REP_COUNT ? 'rep-modal-option-selected' : 'rep-modal-option'} onClick={() => toggleRepType(REP_TYPE.REP_COUNT)}>반복 횟수</a>
            <a className={repType == REP_TYPE.END_DATE ? 'rep-modal-option-selected' : 'rep-modal-option'} onClick={() => toggleRepType(REP_TYPE.END_DATE)}>종료 날짜</a>
          </div>

          {repType == REP_TYPE.REP_COUNT &&
          <div className='rep-end-count-box'>
            <input className='rep-count-input' value={repCount} onChange={(event) => { setRepCount(event.target.value) }} maxLength="2"/>
            <a className='rep-end-count-description'>회 반복</a>
          </div>
          }

          {repType == REP_TYPE.END_DATE &&
          <Calendar className='end-date-calendar' value={endDate} onChange={setEndDate}/>
          }

          <div className='rep-reservation-button' onClick={toggleReservationButtonInRepModal}>
            <a className='red-box-text'>예약하기</a>
          </div>
        </div>
      </div>
      }
    </div>
  );
}

export default Home;