import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import Login from './component/Login';
import MyPage from './component/MyPage';
import Statics from './component/Statics';
import Manage from './component/Manage';
import { isMobile } from 'react-device-detect';
import { useState } from 'react';
import { getFirebaseToken, onMessageListener } from './FirebaseConfig';

function App() {
  const [isTokenFound, setIsTokenFound] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useState(() => {
    getFirebaseToken(setIsTokenFound);
  }, [])

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
    .catch((error) => console.log('failed: ', error));

  const rootFontSize = isMobile ? 12 : 16;
  document.documentElement.style.fontSize = `${rootFontSize}px`;
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/mypage" element={<MyPage />} />
          <Route exact path="/statics" element={<Statics />} />
          <Route exact path="/manage" element={<Manage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;