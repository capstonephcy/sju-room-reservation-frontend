import './Login.css';
import { useState } from 'react';
import { BASE_URL } from '../Common';
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const toggleLogin = async (event) => {
        event.preventDefault();
        const response = await fetch(BASE_URL + '/users/auths/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        const statusCode = response.status;
        if (statusCode == 200) {
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken.refreshToken);
            alert("로그인에 성공했습니다.");
            navigate("/");
        } else {
            alert("로그인에 실패했습니다.");
        }
    };

    return (
        <div className='login'>
            <div className='login-box'>
                <a className='login-title-kor semi-bold'>포탈 로그인</a>
                <a className='login-title-eng semi-bold'>PORTAL LOGIN</a>

                <div className='login-input-box-list'>
                    <div className='login-input-box'>
                        <img src="/img/user.png" className="login-input-icon" alt="logo" />
                        <input type='text' className='login-input' value={username} onChange={(event) => setUsername(event.target.value)} on placeholder='학번' />
                    </div>
                    <div className='login-input-box'>
                        <img src="/img/password.png" className="login-input-icon" alt="logo" />
                        <input type='password' className='login-input' value={password} onChange={(event) => setPassword(event.target.value)} placeholder='비밀번호' />
                    </div>

                    <div className='login-button cursor-pointer' onClick={toggleLogin}>
                        <a className='login-button-text semi-bold'>로그인</a>
                    </div>
                </div>

                <div className='find-box'>
                    <a className='find-text semi-bold cursor-pointer'>아이디 찾기</a>
                    <a className='find-text semi-bold cursor-pointer'> | </a>
                    <a className='find-text semi-bold cursor-pointer'>비밀번호 찾기</a>
                </div>

                <a className='bottom-title-text semi-bold'>세종대학교 회의실 예약 시스템</a>
            </div>
        </div>
    );
}

export default Login;