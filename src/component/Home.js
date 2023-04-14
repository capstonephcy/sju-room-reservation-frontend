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
        </div>
      </div>
    );
}

export default Home;