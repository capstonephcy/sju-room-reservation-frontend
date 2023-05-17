import './MyPage.css';
import Navigation from './Navigation';
import { BASE_URL, mobilable } from '../Common';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function MyPage() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (user == null) {
            alert("로그인 후 이용해주세요.");
            navigate("/login");
        }
    }, []);

    const toggleLogout = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('accessToken');
        const response = await fetch(BASE_URL + '/users/auths/logout', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        const statusCode = response.status;
        if (statusCode == 200) {
            localStorage.setItem("user", null);
            alert("로그아웃에 성공했습니다.");
            navigate("/login");
        } else {
            alert("로그아웃에 실패했습니다.");
        }
    };

    // 비밀번호 변경
    const [showsUpdatePasswordModal, setShowsUpdatePasswordModal] = useState(false);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newConfirmPassword, setNewConfirmPassword] = useState("");

    const toggleUpdatePassword = async (event) => {
        if (newPassword != newConfirmPassword) {
            alert("입력하신 두 개의 새 비밀번호가 서로 다릅니다.");
            return;
        }

        try {
            const token = localStorage.getItem('accessToken');
            const response = await fetch(BASE_URL + '/users/profiles/password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ password: currentPassword, newPassword })
            });
        
            const data = await response.json();
            const statusCode = response.status;
            if (statusCode == 200) {
                alert("비밀번호가 변경되었습니다.");
                setShowsUpdatePasswordModal(false);
            } else {
                alert("비밀번호 변경에 실패하였습니다.");
            }
        } catch (error) {
            alert("비밀번호 변경에 실패하였습니다.");
        }
    }

    return (
        <div className={mobilable('home')}>
            <Navigation />
            <div className={mobilable('home-contents')}>
                <div className={`${mobilable('contents-with-title-box')} margin-top-2rem`}>
                    <a className='contents-box-title-text margin-top-2rem'>내 정보</a>
                    <div className={`${mobilable('profile-box')} ${mobilable('contents-box')} margin-top-1rem`}>
                        <img className='profile-img' src='/img/sample.png'/>
                        <div className='profile-contents-box'>
                            <a className={mobilable('id-name-text')}>{`${user?.department} ${user?.name}`}</a>
                            <div className={mobilable('profile-command-box')}>
                                <a className='profile-command-text' onClick={toggleLogout}>· 로그아웃</a>
                                <a className='profile-command-text' onClick={() => { setShowsUpdatePasswordModal(true) }}>· 비밀번호 변경</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        {showsUpdatePasswordModal &&
        <div className='modal-background'>
            <div className={mobilable('modal')}>
                <div className='modal-title-box'>
                    <a className='modal-title'>비밀번호 변경</a>
                </div>

                <div className='column-box margin-top-1rem'>
                    <a>현재 비밀번호</a>
                    <input type="password" className='update-password-input'
                        value={currentPassword}
                        onChange={(event) => setCurrentPassword(event.target.value)}/>
                    <a className='margin-top-05rem'>새 비밀번호</a>
                    <input type="password" className='update-password-input'
                        value={newPassword}
                        onChange={(event) => setNewPassword(event.target.value)}/>
                    <a className='margin-top-05rem'>새 비밀번호 확인</a>
                    <input type="password" className='update-password-input'
                        value={newConfirmPassword}
                        onChange={(event) => setNewConfirmPassword(event.target.value)}/>
                </div>
            
                <div className='modal-button-box'>
                    <div className='modal-cancel-button' onClick={() => { setShowsUpdatePasswordModal(false) }}>
                        <a className='modal-cancel-text'>취소</a>
                    </div>
                    <div className='modal-ok-button' onClick={toggleUpdatePassword}>
                        <a className='red-box-text'>변경하기</a>
                    </div>
                </div>
            </div>
        </div>
        }
        </div>
    )
}

export default MyPage;