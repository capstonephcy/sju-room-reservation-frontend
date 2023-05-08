import './MyPage.css';
import Navigation from './Navigation';
import { isMobile } from 'react-device-detect';

function MyPage() {
    const mobilable = (str) => {
        if (isMobile) return str + '-mobile'
        else return str
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
                            <a className={mobilable('id-name-text')}>18011542 강한빛</a>
                            <div className={mobilable('profile-command-box')}>
                                <a className='profile-command-text'>· 로그아웃</a>
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