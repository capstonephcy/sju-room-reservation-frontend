import './Home.css';
import Navigation from './Navigation';
import 'react-calendar/dist/Calendar.css';
import { useEffect, useState } from 'react';
import { checkIsAdmin, mobilable, fetchRoom } from '../Common';
import ReservationBox from './ReservationBox';
import RoomListBox from './RoomListBox';
import HomeGreetings from './HomeGreetings';
import OngoingReservation from './OngoingReservation';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const [rooms, setRooms] = useState([]);
  const [roomsImages, setRoomsImages] = useState([]);

  useEffect(() => {
    if (checkIsAdmin()) {
      alert("관리자 계정은 접근할 수 없는 페이지입니다.");
      navigate("/statics");
    }
    fetchRoom(setRooms, setRoomsImages);
  }, []);

  return (
    <div className={mobilable('home')}>
      <Navigation />
      <div className={mobilable('home-contents')}>
        <HomeGreetings />
        <ReservationBox rooms={rooms} />
        <OngoingReservation />
        <RoomListBox rooms={rooms} roomsImages={roomsImages} />
      </div>

    </div>
  );
}

export default Home;