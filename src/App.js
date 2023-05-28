import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import Login from './component/Login';
import MyPage from './component/MyPage';
import Statics from './component/Statics';
import Manage from './component/Manage';
import { isMobile } from 'react-device-detect';
import { useState } from 'react';
import { getFirebaseToken, onMessageListener } from './FirebaseConfig';
import { BASE_URL } from './Common';

function App() {
  const [notifications, setNotifications] = useState([]);

  const updateToken = async (fcmRegistrationToken) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user === null) return;
    try {
      const response = await fetch(BASE_URL + '/users/profiles', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          'Refresh' : `Bearer ${localStorage.getItem('refreshToken')}`
        },
        body: JSON.stringify({ fcmRegistrationToken: fcmRegistrationToken })
      });

      const data = await response.json();
      const statusCode = response.status;
      if (statusCode == 200) {
        console.log("FcmRegistrationToken is updated");
      } else {
        console.log("Failed to update token: " + data._metadata.message);
      }
    } catch (error) {
      console.log("Failed to update token: " + error);
    }
  }
  
  useState(() => {
    getFirebaseToken(updateToken);
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