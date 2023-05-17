import { mobilable } from "../Common";
import { isMobile } from 'react-device-detect';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './HomeGreetings.css';

function HomeGreetings() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (user == null) {
            alert("로그인 후 이용해주세요.");
            navigate("/login");
        }
    }, []);

    return (
        <div className={mobilable('home-greetings-box')}>
          <a className={mobilable('home-greetings-emoji')}>🙌</a>
          <a className={`${mobilable('home-greetings-text')} semi-bold`}>{user?.name}님,<br/>{isMobile ? '오늘도 방문해주셔서 감사합니다!' : '회의실 예약 시스템에 오신 것을 환영합니다!'}</a>
        </div>
    );
}

export default HomeGreetings;