import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL, mobilable, onFailure } from "../Common";
import './ManageRoomModal.css';

function ManageRoomModal({ prevRoom, closeModal }) {
    const navigate = useNavigate();

    const [name, setName] = useState(prevRoom ? prevRoom.name : "");
    const [building, setBuilding] = useState(prevRoom ? prevRoom.building : "대양AI센터"); // immutable for PUT + room 쿼리 시 building을 지정해야 해서 우선은 고정하였음
    const [number, setNumber] = useState(prevRoom ? prevRoom.number.toString() : ""); // Number
    const [whiteboard, setWhiteboard] = useState(prevRoom ? prevRoom.whiteboard : false);
    const [projector, setProjector] = useState(prevRoom ? prevRoom.projector : false);
    const [maxPeakTimeForGrad, setMaxPeakTimeForGrad] = useState(prevRoom ? prevRoom.maxPeakTimeForGrad : 4);
    const [maxPeakTimeForStud, setMaxPeakTimeForStud] = useState(prevRoom ? prevRoom.maxPeakTimeForStud : 3);
    const [maxNormalTimeForGrad, setMaxNormalTimeForGrad] = useState(prevRoom ? prevRoom.maxNormalTimeForGrad : 3);
    const [maxNormalTimeForStud, setMaxNormalTimeForStud] = useState(prevRoom ? prevRoom.maxNormalTimeForStud : 2);
    const [maxLooseTimeForGrad, setMaxLooseTimeForGrad] = useState(prevRoom ? prevRoom.maxLooseTimeForGrad : 2);
    const [maxLooseTimeForStud, setMaxLooseTimeForStud] = useState(prevRoom ? prevRoom.maxLooseTimeForStud : 1);
    const [capacity, setCapacity] = useState(8);

    const toggleConfirmButton = async () => {
        if (prevRoom == null) {
            // 생성
            try {
                const response = await fetch(BASE_URL + '/rooms/profiles', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        'Refresh' : `Bearer ${localStorage.getItem('refreshToken')}`
                    },
                    body: JSON.stringify({ name, building, number, whiteboard, projector, maxPeakTimeForGrad, maxPeakTimeForStud, maxNormalTimeForGrad, maxNormalTimeForStud, maxLooseTimeForGrad, maxLooseTimeForStud, capacity })
                });
        
                const data = await response.json();
                const statusCode = response.status;
                if (statusCode == 200) {
                    alert("회의실이 생성되었습니다.");
                    window.location.reload();
                } else {
                    onFailure(navigate);
                }
            } catch (error) {
                onFailure(navigate);
            }
        } else {
            // 수정
            try {
                const response = await fetch(BASE_URL + '/rooms/profiles', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        'Refresh' : `Bearer ${localStorage.getItem('refreshToken')}`
                    },
                    body: JSON.stringify({ id: prevRoom.id, name, whiteboard, projector, maxPeakTimeForGrad, maxPeakTimeForStud, maxNormalTimeForGrad, maxNormalTimeForStud, maxLooseTimeForGrad, maxLooseTimeForStud, capacity })
                });
                const data = await response.json();
                const statusCode = response.status;
                if (statusCode == 200) {
                    alert("회의실 정보가 수정되었습니다.");
                    window.location.reload();
                } else {
                    onFailure(navigate);
                }
            } catch (error) {
                onFailure(navigate);
            }
        }
    }

    const toggleDeleteButton = () => {

    }

    return (
        <div className='modal-background'>
            <div className={mobilable('modal')}>
                <div className='modal-title-box'>
                    <a className='modal-title'>회의실 {prevRoom ? "변경" : "생성"}</a>
                </div>

                <div className='room-input-list-box margin-top-05rem'>
                    <div className='room-input-box'>
                        <a>회의실명</a>
                        <input type='text' value={name} onChange={((event) => setName(event.target.value))} />
                    </div>
                    <div className='room-input-box'>
                        <a>건물</a>
                        <input type='text' value={building} onChange={((event) => setBuilding(event.target.value))} readOnly />
                    </div>
                    <div className='room-input-box'>
                        <a>회의실 번호</a>
                        <input type='number' value={number} onChange={((event) => setNumber(event.target.value))} />
                    </div>
                    <div className='room-input-box'>
                        <a>최대 인원</a>
                        <input type='number' value={capacity} onChange={((event) => setCapacity(event.target.value))} />
                    </div>
                    
                    <div className='room-input-box'>
                        <a className='room-input-description'>피크타임 최대예약시간(대학원생, 교수)</a>
                        <input type='number' value={maxPeakTimeForGrad} onChange={((event) => setMaxPeakTimeForGrad(event.target.value))} />
                    </div>
                    <div className='room-input-box'>
                        <a className='room-input-description'>피크타임 최대예약시간(일반학생)</a>
                        <input type='number' value={maxPeakTimeForStud} onChange={((event) => setMaxPeakTimeForStud(event.target.value))} />
                    </div>
                    <div className='room-input-box'>
                        <a className='room-input-description'>평시 최대예약시간(대학원생, 교수)</a>
                        <input type='number' value={maxNormalTimeForGrad} onChange={((event) => setMaxNormalTimeForGrad(event.target.value))} />
                    </div>
                    <div className='room-input-box'>
                        <a className='room-input-description'>평시 최대예약시간(일반 학생)</a>
                        <input type='number' value={maxNormalTimeForStud} onChange={((event) => setMaxNormalTimeForStud(event.target.value))} />
                    </div>
                    <div className='room-input-box'>
                        <a className='room-input-description'>루즈타임 최대예약시간(대학원생, 교수)</a>
                        <input type='number' value={maxLooseTimeForGrad} onChange={((event) => setMaxLooseTimeForGrad(event.target.value))} />
                    </div>
                    <div className='room-input-box'>
                        <a className='room-input-description'>루즈타임 최대예약시간(일반 학생)</a>
                        <input type='number' value={maxLooseTimeForStud} onChange={((event) => setMaxLooseTimeForStud(event.target.value))} />
                    </div>
                </div>
                <div className="row-box margin-top-05rem">
                    <div>
                        <input type="checkbox" checked={whiteboard} onChange={(event) => { setWhiteboard(event.target.checked) }}/>
                        <label>화이트보드</label>
                    </div>
                    <div>
                        <input type="checkbox" checked={projector} onChange={(event) => { setProjector(event.target.checked) }}/>
                        <label>프로젝터</label>
                    </div>
                </div>

                {prevRoom != null &&
                <div className="delete-room-box">
                    <a className="delete-room-button" onClick={toggleDeleteButton}>삭제하기</a>
                </div>
                }

                <div className='modal-button-box'>
                    <div className='modal-cancel-button' onClick={closeModal}>
                        <a className='modal-cancel-text'>취소</a>
                    </div>
                    <div className='modal-ok-button' onClick={toggleConfirmButton}>
                        <a className='red-box-text'>확인</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManageRoomModal;