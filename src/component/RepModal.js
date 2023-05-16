import { useState } from "react";
import Calendar from "react-calendar";
import { mobilable } from "../Common";
import './RepModal.css';

function RepModal({ closeModal }) {
    const REP_CYCLE = { DAY: "DAY", WEEK: "WEEK", MONTH: "MONTH" };
    const REP_TYPE = { REP_COUNT: "REP_COUNT", END_DATE: "END_DATE" };

    const [repCycle, setRepCycle] = useState(REP_CYCLE.DAY);
    const [repType, setRepType] = useState(REP_TYPE.REP_COUNT);
  
    const [repCount, setRepCount] = useState(3);
    const [endDate, setEndDate] = useState(new Date());
  
    const toggleRepCycle = (repCycle) => {
      setRepCycle(repCycle)
    }
  
    const toggleRepType = (repType) => {
      setRepType(repType)
    }
  
    const toggleReservationButtonInRepModal = () => {
      // TODO: 반복 예약 요청
      if (repType == REP_TYPE.REP_COUNT) {
        alert([repCycle, repType, repCount].join(", "));
      } else {
        alert([repCycle, repType, endDate].join(", "));
      }
      closeModal();
    }

    return (
        <div className='modal-background'>
            <div className={mobilable('modal')}>
                <div className='modal-title-box'>
                    <a className='modal-title'>반복 예약 설정</a>
                </div>
                <div className='rep-modal-option-box'>
                    <a className={repCycle == REP_CYCLE.DAY ? 'rep-modal-option-selected' : 'rep-modal-option'} onClick={() => toggleRepCycle(REP_CYCLE.DAY)}>매일</a>
                    <a className={repCycle == REP_CYCLE.WEEK ? 'rep-modal-option-selected' : 'rep-modal-option'} onClick={() => toggleRepCycle(REP_CYCLE.WEEK)}>매주</a>
                    <a className={repCycle == REP_CYCLE.MONTH ? 'rep-modal-option-selected' : 'rep-modal-option'} onClick={() => toggleRepCycle(REP_CYCLE.MONTH)}>매월</a>
                </div>
                <div className='rep-modal-option-box'>
                    <a className={repType == REP_TYPE.REP_COUNT ? 'rep-modal-option-selected' : 'rep-modal-option'} onClick={() => toggleRepType(REP_TYPE.REP_COUNT)}>반복 횟수</a>
                    <a className={repType == REP_TYPE.END_DATE ? 'rep-modal-option-selected' : 'rep-modal-option'} onClick={() => toggleRepType(REP_TYPE.END_DATE)}>종료 날짜</a>
                </div>

                {repType == REP_TYPE.REP_COUNT &&
                <div className='rep-end-count-box'>
                    <input className='rep-count-input' value={repCount} onChange={(event) => { setRepCount(event.target.value) }} maxLength="2"/>
                    <a className='rep-end-count-description'>회 반복</a>
                </div>
                }

                {repType == REP_TYPE.END_DATE &&
                <Calendar className='end-date-calendar' value={endDate} onChange={setEndDate}/>
                }

                <div className='modal-button-box'>
                    <div className='modal-cancel-button' onClick={closeModal}>
                        <a className='modal-cancel-text'>취소</a>
                    </div>
                    <div className='modal-ok-button' onClick={toggleReservationButtonInRepModal}>
                        <a className='red-box-text'>예약하기</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RepModal;