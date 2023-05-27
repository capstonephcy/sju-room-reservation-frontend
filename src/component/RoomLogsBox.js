import { useEffect, useState } from "react";
import { BASE_URL, mobilable } from "../Common";

function RoomLogsBox() {
    const PAGE_LIMIT = 100;

    const [roomId, setRoomId] = useState(0);
    const [pageIdx, setPageIdx] = useState(0);

    const [roomLogs, setRoomLogs] = useState([]);

    useEffect(() => {
        fetchRoomReservationLogs();
    }, [roomId, pageIdx]);

    const fetchRoomReservationLogs = async () => {
        try {
            const response = await fetch(BASE_URL + `/metrics/rooms/reservations/logs?roomId=${roomId}&pageIdx=${pageIdx}&pageLimit=${PAGE_LIMIT}`, {
                method: 'GET',
                headers: {
                    'Request-Type': 'ALL',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Refresh' : `Bearer ${localStorage.getItem('refreshToken')}`
                }
            });
        
            const data = await response.json();
            const statusCode = response.status;
            if (statusCode == 200) {
                setRoomLogs(data.roomLogs);
            } else {
                alert(data._metadata.message);
            }
        } catch (error) {
            alert(error);
        }
    }
    
    // TODO: NoShow쪽에서 페이지, 룸 선택 가져와서 페이지네이션, 룸 선택 구현하기
    return (
        <div className={`${mobilable('contents-with-title-box')} margin-top-2rem column-box`}>
            <div className='margin-top-2rem'>
                <a className='contents-box-title-text'>Logs</a>
            </div>
            {
                roomLogs.forEach((item) => {
                    <a>{JSON.stringify(item)}</a>
                })
            }
        </div>
    );
}

export default RoomLogsBox;