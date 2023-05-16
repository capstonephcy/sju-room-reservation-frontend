import { mobilable } from "../Common";
import './OngoingMeeting.css';

function OngoingMeeting() {
    return (
        <div className={`${mobilable('contents-with-title-box')} margin-top-2rem`}>
            <a className='contents-box-title-text'>현재 진행 중인 회의</a>
            <div className={`${mobilable('contents-box')} ${mobilable('ongoing-meeting-box')} margin-top-1rem`}>
                <a className={mobilable('ongoing-meeting-time-text')}>10:00 ~ 11:00</a>
                <a className={mobilable('ongoing-meeting-description-text')}>
                    <b>836 회의실</b>에서 <b>1시간</b> 동안 진행
                </a>
                <div className={mobilable('ongoing-meeting-end-box')}>
                    <a className={`${mobilable('ongoing-meeting-participants-text')} text-ellipsis`}>참여자: 최지웅, 강한빛</a>
                    <div className={`red-box ${mobilable('admission-confirm-button')}`}>
                    <a className='red-box-text'>입실 인증</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OngoingMeeting;