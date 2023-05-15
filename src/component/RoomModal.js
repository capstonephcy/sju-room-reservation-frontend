import { mobilable } from "../Common";

function RoomModal({ room, closeModal }) {
    return (
        <div className='modal-background'>
            <div className={mobilable('modal')}>
                <div className='modal-title-box'>
                    <a className='modal-title'>{room.name}</a>
                </div>

                <a>{room.description}</a>

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