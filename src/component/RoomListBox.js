import { useState } from "react";
import { BASE_URL, mobilable } from "../Common";
import RoomModal from "./RoomModal";

function RoomListBox({ rooms, roomsImages }) {
    const [showingRoom, setShowingRoom] = useState(null);
    const [showingRoomImages, setShowingRoomImages] = useState(null);

    return (
        <div className={`${mobilable('contents-with-title-box')} margin-top-2rem`}>
            <a className='contents-box-title-text margin-top-2rem'>회의실 목록</a>
            <div className={`${mobilable('reservation-room-list-box')} ${mobilable('contents-box')} margin-top-1rem`}>
                {rooms.map((item, index) => (
                <a className='reservation-room-title' onClick={() => { setShowingRoom(item); setShowingRoomImages(roomsImages[index]); }}>{item.name}</a>
                ))}
            </div>

            {showingRoom != null && <RoomModal room={showingRoom} roomImages={showingRoomImages} closeModal={() => { setShowingRoom(null); }} />}
        </div>
    );
}

export default RoomListBox;

const BUILDING = "대양AI센터";
const pageIdx = 0;
const PAGE_LIMIT = 20;
export const fetchRoom = async (setRooms, setRoomsImages) => {
    const response = await fetch(BASE_URL + '/rooms/profiles?building=' + BUILDING + '&pageIdx=' + pageIdx + '&pageLimit=' + PAGE_LIMIT, {
        method: 'GET',
        headers: {
            'Request-Type': 'BUILDING',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            'Refresh' : `Bearer ${localStorage.getItem('refreshToken')}`
        }
    });

    const data = await response.json();
    const statusCode = response.status;
    if (statusCode == 200) {
        setRooms(data.rooms);
        if (setRoomsImages != null) setRoomsImages(data.roomsImages);
    }
}