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
import OngoingMeeting from './OngoingMeeting';

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
        <OngoingMeeting />
        <RoomListBox rooms={rooms} showingRoom={showingRoom} setShowingRoom={setShowingRoom} />
      </div>

      {showsRepModal && <RepModal closeModal={() => { setShowsRepModal(false); }} />}
      {showingRoom != null && <RoomModal room={showingRoom} closeModal={() => { setShowingRoom(null); }} />}
    </div>
  );
}

export default Home;