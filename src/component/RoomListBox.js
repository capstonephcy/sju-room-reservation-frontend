import { BASE_URL, mobilable } from "../Common";

function RoomListBox({ rooms, setShowingRoom }) {
    return (
        <div className={`${mobilable('contents-with-title-box')} margin-top-2rem`}>
            <a className='contents-box-title-text margin-top-2rem'>회의실 목록</a>
            <div className={`${mobilable('reservation-room-list-box')} ${mobilable('contents-box')} margin-top-1rem`}>
                {rooms.map((item) => (
                <a className='reservation-room-title' onClick={() => { setShowingRoom(item) }}>{item.name}</a>
                ))}
            </div>
        </div>
    );
}

export default RoomListBox;

const BUILDING = "대양AI센터";
const pageIdx = 0;
const PAGE_LIMIT = 20;
export const fetchRoom = async (setRooms) => {
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
    }
}