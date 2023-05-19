import { useNavigate } from "react-router-dom";
import { BASE_URL, mobilable } from "../Common";

function MyInformationBox({ setShowsUpdatePasswordModal }) {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

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

    return (
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
    );
}

export default MyInformationBox;