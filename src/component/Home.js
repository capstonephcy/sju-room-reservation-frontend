import './Home.css';
import Navigation from './Navigation';

function Home() {
    return (
      <div className='home'>
        <Navigation />
        <div className='home-contents'>
          <div className='home-greetings-box'>
            <a className='home-greetings-emoji'>🙌</a>
            <a className='home-greetings-text semi-bold'>강한빛님,<br/>회의실 예약 시스템에 오신 것을 환영합니다!</a>
          </div>
          <div className='contents-box margin-top-2rem'>
            <a>TEST</a>
          </div>
          <div className='margin-top-2rem'>
            <a className='contents-box-title-text'>현재 진행 중인 회의</a>
            <div className='contents-box margin-top-1rem'>
              <a>TEST</a>
            </div>
          </div>
          <div className='margin-top-2rem'>
            <a className='contents-box-title-text margin-top-2rem'>회의실 목록</a>
            <div className='reservation-room-list-box contents-box margin-top-1rem'>
              <a className='reservation-room-title'>835 회의실</a>
              <a className='reservation-room-title'>836 회의실</a>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Home;