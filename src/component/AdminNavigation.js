import './AdminNavigation.css';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

function AdminNavigation() {
  const navigate = useNavigate();

  const toggleStatics = () => {
    navigate("/statics");
  }

  const toggleManage = () => {
    navigate("/manage");
  }

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const url = window.location.href;
    if (url.endsWith("statics")) {
      setIndex(0);
    } else {
      setIndex(1);
    }
  }, []);

  return (
    <div className='navigation'>
      <img className='logo-img cursor-pointer' src="/img/sejong.png" />
      <div className='menu-box'>
          <div className={`${index == 0 ? 'background-red' : ''} menu-item-box cursor-pointer`} onClick={toggleStatics}>
              <img className='menu-item-logo-img' src={index == 0 ? `/img/statics_white.png` : `/img/statics_black.png`} />
              <a className={`${index == 0 ? 'menu-item-text' : 'menu-item-text-off'} menu-item-text semi-bold`}>통계</a>
          </div>
          <div className={`${index == 1 ? 'background-red' : ''} menu-item-box cursor-pointer`} onClick={toggleManage}>
              <img className='menu-item-logo-img' src={index == 1 ? `/img/manage_white.png` : `/img/manage_black.png`} />
              <a className={`${index == 1 ? 'menu-item-text' : 'menu-item-text-off'} semi-bold`}>관리</a>
          </div>
      </div>
      <a/>
    </div>
  );
}

export default AdminNavigation;