import { useEffect, useState } from "react";
import { mobilable } from "../Common";
import { fetchRoom } from "./RoomListBox";
import "./ManageRoomBox.css";

function ManageRoomBox() {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        fetchRoom(setRooms);
    }, []);

    const [showsManageRoomModal, setShowsManageRoomModal] = useState(null);

    return (
        <div className={`${mobilable('contents-with-title-box')} margin-top-2rem`}>
            <div className='margin-top-2rem'>
                <a className='contents-box-title-text'>회의실 목록</a>
                <a className='add-button cursor-pointer'>➕</a>
            </div>
            <div className={`${mobilable('reservation-room-list-box')} ${mobilable('contents-box')} margin-top-1rem`}>
                {rooms.map((item) => (
                <a className='reservation-room-title' onClick={() => { setShowsManageRoomModal(item) }}>{item.name}</a>
                ))}
            </div>

            {showsManageRoomModal != null && <a>ManageRoomModal</a> }
        </div>
    );
}

export default ManageRoomBox;