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
  const [showingRoom, setShowingRoom] = useState(null);

  const [showsRepModal, setShowsRepModal] = useState(false);

  useEffect(() => {
    fetchRoom(setRooms);
  });

  return (
    <div className={mobilable('home')}>
      <Navigation />
      <div className={mobilable('home-contents')}>
        <HomeGreetings />
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