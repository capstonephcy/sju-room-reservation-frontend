import './Login.css';
import user from './user.png';
import password from './password.png';

function Login() {
    return (
        <div className='login'>
            <div className='login-box'>
                <a className='login-title-kor semi-bold'>포탈 로그인</a>
                <a className='login-title-eng semi-bold'>PORTAL LOGIN</a>

                <div className='login-input-box-list'>
                    <div className='login-input-box'>
                        <img src={user} className="login-input-icon" alt="logo" />
                        <input type='text' className='login-input' placeholder='학번' />
                    </div>
                    <div className='login-input-box'>
                        <img src={password} className="login-input-icon" alt="logo" />
                        <input type='password' className='login-input' placeholder='비밀번호' />
                    </div>

                    <div className='login-button cursor-pointer'>
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