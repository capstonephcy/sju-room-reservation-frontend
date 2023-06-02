import { useEffect, useState } from "react";
import { BASE_URL, fetchRoom, mobilable } from "../Common";
import './RoomLogsBox.css';

function RoomLogsBox() {
    const PAGE_LIMIT = 10;

    const [rooms, setRooms] = useState([]);
    const [roomId, setRoomId] = useState(0);
    const [pageIdx, setPageIdx] = useState(0);

    const [roomLogs, setRoomLogs] = useState([]);

    useEffect(() => {
        fetchRoom(setRooms);
    }, []);
    useEffect(() => {
        if (rooms != null && rooms.length >= 1) setRoomId(rooms[0].id);
    }, [rooms]);

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
    
    return (
        <div className={`${mobilable('contents-with-title-box')} margin-top-2rem column-box`}>
            <div className='row-space-between margin-top-2rem'>
                <a className='contents-box-title-text'>Logs</a>
                <div className="row-box">
                    <a className="red-button" onClick={() => { if (pageIdx >= 1) setPageIdx(pageIdx - 1); }}>←</a>
                    <a className="red-button margin-left-05rem" onClick={() => { setPageIdx(pageIdx + 1); }}>→</a>
                    <select
                        className="margin-left-05rem"
                        onChange={(event) => { 
                            const index = event.target.selectedIndex;
                            setRoomId(rooms[index].id);
                        }}>
                        {rooms.map((item, index) => (
                            <option key={index}>{item.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className={`${mobilable('contents-box')} margin-top-1rem`}>
                <div className="table-wrapper">
                    {roomLogs.map((item, index) => (
                        <table key={index}>
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>action</th>
                                    <th>date</th>
                                    <th>time</th>
                                    <th>room.id</th>
                                    <th>name</th>
                                    <th>user.id</th>
                                    <th>username</th>
                                    <th>name</th>
                                    <th>department</th>
                                    <th>noShowRate</th>
                                    <th>reserveCnt</th>
                                    <th>noShowCnt</th>
                                    <th>permissions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.action}</td>
                                    <td>{item.date}</td>
                                    <td>{item.time}</td>
                                    <td className="cursor-pointer" onClick={() => { alert(JSON.stringify(item.room)) }}>{item.room.id}</td>
                                    <td>{item.room.name}</td>
                                    <td className="cursor-pointer" onClick={() => { alert(JSON.stringify(item.user)) }}>{item.user.id}</td>
                                    <td>{item.user.username}</td>
                                    <td>{item.user.name}</td>
                                    <td>{item.user.department}</td>
                                    <td>{item.user.noShowRate}</td>
                                    <td>{item.user.reserveCnt}</td>
                                    <td>{item.user.noShowCnt}</td>
                                    <td>{item.user.permissions}</td>
                                </tr>
                            </tbody>
                        </table>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default RoomLogsBox;
