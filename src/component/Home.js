import './Home.css';
import Navigation from './Navigation';
import 'react-calendar/dist/Calendar.css';
import { useEffect, useState } from 'react';
import { mobilable } from '../Common';
import RoomModal from './RoomModal';
import RepModal from './RepModal';
import ReservationBox from './ReservationBox';
import RoomListBox, { fetchRoom } from './RoomListBox';
import OngoingMeeting from './OngoingMeeting';
import HomeGreetings from './HomeGreetings';

function Home() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetchRoom(setRooms);
  });

  return (
    <div className={mobilable('home')}>
      <Navigation />
      <div className={mobilable('home-contents')}>
        <HomeGreetings />
        <ReservationBox rooms={rooms} />
        <OngoingMeeting />
        <RoomListBox rooms={rooms} />
      </div>

    </div>
  );
}

export default Home;