import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import Login from './component/Login';
import MyPage from './component/MyPage'
import { isMobile } from 'react-device-detect';

function App() {
  const rootFontSize = isMobile ? 12 : 16;
  document.documentElement.style.fontSize = `${rootFontSize}px`;
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/mypage" element={<MyPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;