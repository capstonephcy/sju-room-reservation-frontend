import { BASE_URL, mobilable } from "../Common";
import './RoomModal.css';

function RoomModal({ room, roomImages, closeModal }) {
    return (
        <div className='modal-background'>
            <div className={mobilable('modal')}>
                <div className='modal-title-box'>
                    <a className='modal-title'>{room.name}</a>
                </div>

                {roomImages[0] != null && <img className="room-image" src={`${BASE_URL}${roomImages[0].fileURL}`}/>}

                <a>{room.description}</a>

                <div className="equipment-box">
                    {room.whiteboard && <img src="/img/whiteboard.png" className="equipment-icon"/>}
                    {room.projector && <img src="/img/projector.jpeg" className="equipment-icon"/>}
                </div>

                <div className='modal-button-box'>
                    <div className='modal-ok-button' onClick={closeModal}>
                    <a className='red-box-text'>확인</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RoomModal;