import './MyPage.css';
import Navigation from './Navigation';
import { BASE_URL, fetchUserProfile, mobilable } from '../Common';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function MyPage() {
    const navigate = useNavigate();

    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        fetchUserProfile((data) => { setUserProfile(data.userProfile); },
        () => {
            alert("정보를 불러오는 데 실패했습니다.");
            navigate("/login");
        }
        );
    }, []);

    const toggleLogout = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('refreshToken');
        const response = await fetch(BASE_URL + '/users/auths/logout', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        const statusCode = response.status;
        if (statusCode == 200) {
            alert("로그아웃에 성공했습니다.");
            navigate("/login");
        } else {
            alert("로그아웃에 실패했습니다.");
        }
    };

    return (
        <div className={mobilable('home')}>
            <Navigation />
            <div className={mobilable('home-contents')}>
                <div className={`${mobilable('contents-with-title-box')} margin-top-2rem`}>
                    <a className='contents-box-title-text margin-top-2rem'>내 정보</a>
                    <div className={`${mobilable('profile-box')} ${mobilable('contents-box')} margin-top-1rem`}>
                        <img className='profile-img' src='/img/sample.png'/>
                        <div className='profile-contents-box'>
                            <a className={mobilable('id-name-text')}>{`${userProfile.department} ${userProfile.name}`}</a>
                            <div className={mobilable('profile-command-box')}>
                                <a className='profile-command-text' onClick={toggleLogout}>· 로그아웃</a>
                                <a className='profile-command-text'>· 회원 탈퇴</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyPage;