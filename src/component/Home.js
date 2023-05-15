import './Home.css';
import Navigation from './Navigation';
import 'react-calendar/dist/Calendar.css';
import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { mobilable } from '../Common';
import { useNavigate } from 'react-router-dom';
import RoomModal from './RoomModal';
import RepModal from './RepModal';
import ReservationBox from './ReservationBox';
import RoomListBox, { fetchRoom } from './RoomListBox';

function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [rooms, setRooms] = useState([]);
  const [showingRoom, setShowingRoom] = useState(null);

  const [showsRepModal, setShowsRepModal] = useState(false);

  useEffect(() => {
      if (user == null) {
          alert("로그인 후 이용해주세요.");
          navigate("/login");
      }
      fetchRoom(setRooms);
  });

  return (
    <div className={mobilable('home')}>
      <Navigation />
      <div className={mobilable('home-contents')}>
        <div className={mobilable('home-greetings-box')}>
          <a className={mobilable('home-greetings-emoji')}>🙌</a>
          <a className={`${mobilable('home-greetings-text')} semi-bold`}>{user?.name}님,<br/>{isMobile ? '오늘도 방문해주셔서 감사합니다!' : '회의실 예약 시스템에 오신 것을 환영합니다!'}</a>
        </div>

        <ReservationBox rooms={rooms} setShowsRepModal={setShowsRepModal} />

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

        <RoomListBox rooms={rooms} showingRoom={showingRoom} setShowingRoom={setShowingRoom} />
      </div>


      {showsRepModal &&
        <RepModal closeModal={() => { setShowsRepModal(false); }} />
      }

      {showingRoom != null &&
        <RoomModal room={showingRoom} closeModal={() => { setShowingRoom(null); }} />
      }
    </div>
  );
}

export default Home;