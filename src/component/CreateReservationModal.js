import { useState } from "react";
import { BASE_URL, mobilable } from "../Common";

function CreateReservationModal({ closeModal }) {
    const [roomId, setRoomId] = useState("");
    const [date, setDate] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [attendants, setAttendants] = useState("");

    const toggleCreateUser = async () => {
        try {
            const response = await fetch(BASE_URL + '/reservation/profiles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Refresh' : `Bearer ${localStorage.getItem('refreshToken')}`
                },
                body: JSON.stringify({ roomId, date, start, end, attendants: JSON.parse(attendants) })
            });
    
            const data = await response.json();
            const statusCode = response.status;
            if (statusCode == 200) {
                alert("예약이 추가되었습니다.");
            } else {
                alert("요청이 실패했습니다: " + data._metadata.message);
            }
        } catch (error) {
            alert("요청이 실패했습니다: " + error);
        }
    }

    return (
        <div className='modal-background'>
            <div className={mobilable('modal')}>
                <div className='modal-title-box'>
                    <a className='modal-title'>예약 추가</a>
                </div>

                <div className="column-box margin-top-05rem">
                    <div className="row-space-between">
                        <a>roomId</a>
                        <input type="number" placeholder="14" onChange={(event) => { setRoomId(event.target.value); }}/>
                    </div>
                    <div className="row-space-between">
                        <a>date</a>
                        <input type="text" placeholder="2023-05-23" onChange={(event) => { setDate(event.target.value); }}/>
                    </div>
                    <div className="row-space-between">
                        <a>start</a>
                        <input type="text" placeholder="12:00:00" onChange={(event) => { setStart(event.target.value); }}/>
                    </div>
                    <div className="row-space-between">
                        <a>end</a>
                        <input type="text" placeholder="13:00:00" onChange={(event) => { setEnd(event.target.value); }}/>
                    </div>
                    <div className="row-space-between">
                        <a>attendants(userIdList)</a>
                        <input type="text" placeholder="[1, 4]" onChange={(event) => { setAttendants(event.target.value); }}/>
                    </div>
                </div>
                <div className='modal-button-box'>
                    <div className='modal-cancel-button' onClick={closeModal}>
                        <a className='modal-cancel-text'>취소</a>
                    </div>
                    <div className='modal-ok-button' onClick={toggleCreateUser}>
                        <a className='red-box-text'>확인</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateReservationModal;