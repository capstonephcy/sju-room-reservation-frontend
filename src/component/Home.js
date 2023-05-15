import './Home.css';
import Navigation from './Navigation';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { BASE_URL, mobilable } from '../Common';
import { useNavigate } from 'react-router-dom';
import RoomModal from './RoomModal';
import RepModal from './RepModal';

function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
      if (user == null) {
          alert("로그인 후 이용해주세요.");
          navigate("/login");
      }
      fetchRoom();
  });

  const [rooms, setRooms] = useState([]);
  const BUILDING = "대양AI센터";
  const pageIdx = 0;
  const PAGE_LIMIT = 20;
  const fetchRoom = async () => {
    const response = await fetch(BASE_URL + '/rooms/profiles?building=' + BUILDING + '&pageIdx=' + pageIdx + '&pageLimit=' + PAGE_LIMIT, {
        method: 'GET',
        headers: {
            'Request-Type': 'BUILDING',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            'Refresh' : `Bearer ${localStorage.getItem('refreshToken')}`
        }
    });

    const data = await response.json();
    const statusCode = response.status;
    if (statusCode == 200) {
      setRooms(data.rooms);
    }
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

  const [selectedRoom, setSelectedRoom] = useState(null);

  // rep-modal
  const [showsRepModal, setShowsRepModal] = useState(false);

  return (
    <div className={mobilable('home')}>
      <Navigation />
      <div className={mobilable('home-contents')}>
        <div className={mobilable('home-greetings-box')}>
          <a className={mobilable('home-greetings-emoji')}>🙌</a>
          <a className={`${mobilable('home-greetings-text')} semi-bold`}>{user?.name}님,<br/>{isMobile ? '오늘도 방문해주셔서 감사합니다!' : '회의실 예약 시스템에 오신 것을 환영합니다!'}</a>
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
            <input className='checkbox' type="checkbox" checked={isRepChecked} onChange={({ target: { checked } }) => setIsRepChecked(checked)}/>
            <a className='gray-box-text' onClick={() => setIsRepChecked(!isRepChecked)}>반복</a>
          </div>
          <div className='red-box' onClick={toggleReservationButton}>
            <a className='red-box-text'>예약하기</a>
          </div>
        </div>
        {showsCalendar && <Calendar className='reservation-date-calendar' onChange={onChangeReservationDate} value={reservationDate}/>}


        <div className={`${mobilable('contents-with-title-box')} margin-top-2rem`}>
          <a className='contents-box-title-text'>현재 진행 중인 회의</a>
          <div className={`${mobilable('contents-box')} ${mobilable('wip-box')} margin-top-1rem`}>
            <a className={mobilable('wip-time-text')}>10:00 ~ 11:00</a>
            <a className={mobilable('wip-description-text')}>
              <b>836 회의실</b>에서 <b>1시간</b> 동안 진행
            </a>
            <div className={mobilable('wip-end-box')}>
              <a className={`${mobilable('wip-participants-text')} text-ellipsis`}>참여자: 최지웅, 강한빛</a>
              <div className={`red-box ${mobilable('admission-confirm-button')}`}>
                <a className='red-box-text'>입실 인증</a>
              </div>
            </div>
          </div>
        </div>


        <div className={`${mobilable('contents-with-title-box')} margin-top-2rem`}>
          <a className='contents-box-title-text margin-top-2rem'>회의실 목록</a>
          <div className={`${mobilable('reservation-room-list-box')} ${mobilable('contents-box')} margin-top-1rem`}>
            {rooms.map((item) => (
              <a className='reservation-room-title' onClick={() => { setSelectedRoom(item) }}>{item.name}</a>
            ))}
          </div>
        </div>
      </div>


      {showsRepModal &&
        <RepModal closeModal={() => { setShowsRepModal(false); }}/>
      }

      {selectedRoom != null &&
        <RoomModal room={selectedRoom} closeModal={() => { setSelectedRoom(null); }} />
      }
    </div>
  );
}

export default Home;