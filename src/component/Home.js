import './Home.css';
import Navigation from './Navigation';
import 'react-calendar/dist/Calendar.css';
import { useEffect, useState } from 'react';
import { checkIsAdmin, mobilable } from '../Common';
import ReservationBox from './ReservationBox';
import RoomListBox, { fetchRoom } from './RoomListBox';
import HomeGreetings from './HomeGreetings';
import OngoingReservation from './OngoingReservation';
import { useNavigate } from 'react-router-dom';
import { getFirebaseToken, onMessageListener } from './FirebaseConfig';

function Home() {
  const navigate = useNavigate();

  const [rooms, setRooms] = useState([]);
  const [isTokenFound, setTokenFound] = useState(false);
  const [notifications, setNotifications] = useState([]);
  
  useEffect(() => {
    if (checkIsAdmin()) {
      alert("관리자 계정은 접근할 수 없는 페이지입니다.");
      navigate("/statics");
    }
    fetchRoom(setRooms);
    getFirebaseToken(setTokenFound);
  }, []);

  onMessageListener()
    .then((payload) => {
      console.log(payload);

      const title = payload.notification.title;
      const body = payload.notification.body;
      const message = {
        id: 1,
        title: title,
        subText: body,
        time: '1 min ago',
        icon: 'mdi mdi-comment-account-outline',
        variant: 'primary',
        isRead: true,
      };

      const messages = [];
      messages.push(message);

      const notification = { day: 'Today', messages: messages };
      notifications.push(notification);

      setNotifications(notifications);
    })
    .catch((err) => console.log('failed: ', err));

  return (
    <div className={mobilable('home')}>
      <Navigation />
      <div className={mobilable('home-contents')}>
        <HomeGreetings />
        <ReservationBox rooms={rooms} />
        <OngoingReservation />
        <RoomListBox rooms={rooms} />
      </div>

    </div>
  );
}

export default Home;
