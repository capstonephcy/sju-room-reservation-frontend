import './Login.css';
import { useState } from 'react';
import { BASE_URL } from '../Common';
import { useNavigate } from "react-router-dom";
import { useUser } from './UserContext';

function Login() {
    const navigate = useNavigate();
    const { setUser } = useUser();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            toggleLogin(event);
        }
    };

    const toggleLogin = async (event) => {
        event.preventDefault();
        try {
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
                fetchUserProfile()
            } else {
                alert("로그인에 실패했습니다.");
            }
        } catch (error) {
            alert("로그인에 실패했습니다.");
        }
    };

    const fetchUserProfile = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await fetch(BASE_URL + '/users/profiles', {
                method: 'GET',
                headers: {
                    'Request-Type': 'CURRENT',
                    'Authorization': `Bearer ${token}`
                }
            });
    
            const data = await response.json();
            const statusCode = response.status;
            if (statusCode == 200) {
                setUser(data.userProfile);
                alert("로그인에 성공했습니다.");
                if (data.userProfile.permissions[0] == "ADMIN" || data.userProfile.permissions[0] == "ROOT_ADMIN") {
                    navigate("/statics");
                } else {
                    navigate("/");
                }
            } else {
                alert("로그인에 실패했습니다.");
            }
        } catch (error) {
            alert("로그인에 실패했습니다.");
        }
    }

    return (
        <div className='login'>
            <div className='login-box'>
                <a className='login-title-kor semi-bold'>포탈 로그인</a>
                <a className='login-title-eng semi-bold'>PORTAL LOGIN</a>

                <form className='login-input-box-list'>
                    <div className='login-input-box'>
                        <img src="/img/user.png" className="login-input-icon" alt="logo" />
                        <input type='text' className='login-input' placeholder='학번'
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        onKeyDown={handleKeyDown}
                        />
                    </div>
                    <div className='login-input-box'>
                        <img src="/img/password.png" className="login-input-icon" alt="logo" />
                        <input type='password' className='login-input' placeholder='비밀번호'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        onKeyDown={handleKeyDown}
                        />
                    </div>

                    <div className='login-button cursor-pointer' onClick={toggleLogin}>
                        <a className='login-button-text semi-bold'>로그인</a>
                    </div>
                </form>

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