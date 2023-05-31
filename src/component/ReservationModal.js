import { BASE_URL, mobilable } from "../Common";

function ReservationModal({ reservation, closeModal }) {
    const toggleCancelReservation = () => {
        if (window.confirm("정말 예약을 취소하시겠습니까?")) cancelReservation();
    }
    const cancelReservation = async () => {
        try {
            const response = await fetch(BASE_URL + '/reservation/profiles', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Refresh' : `Bearer ${localStorage.getItem('refreshToken')}`
                },
                body: JSON.stringify({ id: reservation.id })
            });

            const data = await response.json();
            const statusCode = response.status;
            if (statusCode == 200) {
                alert("예약을 취소하였습니다.");
                window.location.reload();
            } else {
                alert("예약을 취소할 수 없습니다.");
            }
        } catch (error) {
            alert("예약을 취소할 수 없습니다.");
        }
    }

    return (
        <div className='modal-background'>
            <div className={mobilable('modal')}>
                <div className='modal-title-box'>
                    <a className='modal-title'>예약 정보</a>
                </div>

                <div className="column-box">
                    <a>{`${reservation.room.building} ${reservation.room.name}`}</a>
                    <a>{`${reservation.date} ${reservation.start.slice(0,5)}~${reservation.end.slice(0,5)}`}</a>
                    <a>참여자: {reservation.attendants.map((item) => (<a>{item.name}</a>))}</a>
                </div>
                
                <div className="delete-room-box">
                    <a className="delete-room-button margin-left-05rem" onClick={toggleCancelReservation}>취소하기</a>
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

export default ReservationModal;