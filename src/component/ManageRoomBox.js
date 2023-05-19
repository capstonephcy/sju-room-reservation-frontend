import { useEffect, useState } from "react";
import { mobilable } from "../Common";
import { fetchRoom } from "./RoomListBox";
import "./ManageRoomBox.css";
import ManageRoomModal from "./ManageRoomModal";

function ManageRoomBox() {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        fetchRoom(setRooms);
    }, []);

    const [showsManageRoomModal, setShowsManageRoomModal] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);

    return (
        <div className={`${mobilable('contents-with-title-box')} margin-top-2rem`}>
            <div className='margin-top-2rem'>
                <a className='contents-box-title-text'>회의실 목록</a>
                <a className='add-button cursor-pointer' onClick={() => { setSelectedRoom(null); setShowsManageRoomModal(true); }}>➕</a>
            </div>
            <div className={`${mobilable('reservation-room-list-box')} ${mobilable('contents-box')} margin-top-1rem`}>
                {rooms.map((item) => (
                <a className='reservation-room-title' onClick={() => { setSelectedRoom(item); setShowsManageRoomModal(true); }}>{item.name}</a>
                ))}
            </div>

            {showsManageRoomModal && <ManageRoomModal prevRoom={selectedRoom} closeModal={() => { setShowsManageRoomModal(false); }} /> }
        </div>
    );
}

export default ManageRoomBox;