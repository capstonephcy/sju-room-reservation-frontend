import { useState } from "react";
import Calendar from "react-calendar";
import { BASE_URL, convertDateToYYYYMMDD, mobilable } from "../Common";
import './RepModal.css';

function RepModal({ selectedRoom, date, start, end, members, closeModal }) {
    const CYCLE = { DAILY: "DAILY", WEEKLY: "WEEKLY", MONTHLY: "MONTHLY" };
    const TYPE = { ITERATION: "ITERATION", END_DATE: "END_DATE" };

    const [cycle, setCycle] = useState(CYCLE.DAILY);
    const [type, setType] = useState(TYPE.ITERATION);
  
    const [iteration, setIteration] = useState(3);
    const [endDate, setEndDate] = useState(new Date());
  
    const toggleCycle = (cycle) => {
      setCycle(cycle)
    }
  
    const toggleType = (type) => {
      setType(type)
    }
  
    const toggleReservationButton = () => {
      if (type == TYPE.ITERATION) {
        createReservationRegular(iteration);
      } else {
        const dayDiff = calculateDayDiff();
        let iter = 0;
        if (cycle == CYCLE.DAILY) iter = dayDiff;
        else if (cycle == CYCLE.WEEKLY) iter = dayDiff / 7;
        else iter = dayDiff / 28;
        createReservationRegular(iter);
      }
    }

    const calculateDayDiff = () => {
        const date1 = new Date(date);
        const date2 = new Date(endDate);

        date1.setHours(0, 0, 0, 0);
        date2.setHours(0, 0, 0, 0);

        const timeDiff = Math.abs(date2.getTime() - date1.getTime());
        return Math.floor(timeDiff / (1000 * 3600 * 24));
    }

    const createReservationRegular = async (iter) => {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await fetch(BASE_URL + '/reservation/regulars', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    roomId: selectedRoom.id,
                    type: cycle,
                    date: convertDateToYYYYMMDD(date),
                    start: start,
                    end: end,
                    iteration: iter,
                    attendants: [
                        // TODO: members.map { it.id }
                    ]
                })
            });
    
            const data = await response.json();
            const statusCode = response.status;
            if (statusCode == 200) {
                alert("예약되었습니다.");
                window.location.reload();
            } else {
                alert("예약에 실패했습니다: " + data._metadata.message);
            }
        } catch (error) {
            alert("예약에 실패했습니다: " + error);
        }
    }

    return (
        <div className='modal-background'>
            <div className={mobilable('modal')}>
                <div className='modal-title-box'>
                    <a className='modal-title'>반복 예약 설정</a>
                </div>
                <div className='rep-modal-option-box'>
                    <a className={cycle == CYCLE.DAILY ? 'rep-modal-option-selected' : 'rep-modal-option'} onClick={() => toggleCycle(CYCLE.DAILY)}>매일</a>
                    <a className={cycle == CYCLE.WEEKLY ? 'rep-modal-option-selected' : 'rep-modal-option'} onClick={() => toggleCycle(CYCLE.WEEKLY)}>매주</a>
                    <a className={cycle == CYCLE.MONTHLY ? 'rep-modal-option-selected' : 'rep-modal-option'} onClick={() => toggleCycle(CYCLE.MONTHLY)}>매월</a>
                </div>
                <div className='rep-modal-option-box'>
                    <a className={type == TYPE.ITERATION ? 'rep-modal-option-selected' : 'rep-modal-option'} onClick={() => toggleType(TYPE.ITERATION)}>반복 횟수</a>
                    <a className={type == TYPE.END_DATE ? 'rep-modal-option-selected' : 'rep-modal-option'} onClick={() => toggleType(TYPE.END_DATE)}>종료 날짜</a>
                </div>

                {type == TYPE.ITERATION &&
                <div className='rep-end-count-box'>
                    <input className='rep-count-input' onChange={(event) => { setIteration(event.target.value) }} maxLength="2"/>
                    <a className='rep-end-count-description'>회 반복</a>
                </div>
                }

                {type == TYPE.END_DATE &&
                <Calendar className='end-date-calendar' value={endDate} onChange={setEndDate}/>
                }

                <div className='modal-button-box'>
                    <div className='modal-cancel-button' onClick={closeModal}>
                        <a className='modal-cancel-text'>취소</a>
                    </div>
                    <div className='modal-ok-button' onClick={toggleReservationButton}>
                        <a className='red-box-text'>예약하기</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RepModal;