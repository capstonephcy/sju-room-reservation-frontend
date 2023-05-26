import { BarElement, CategoryScale, Chart, Legend, LinearScale, Title, Tooltip } from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import { BASE_URL, convertDateToYYYYMMDD, getLastWeekDay, onFailure, minus7Days, plus7Days, fetchRoom } from "../Common";
import './NoShowChart.css';

function NoShowChart() {
    const navigate = useNavigate();

    const [rooms, setRooms] = useState([]);
    const [roomId, setRoomId] = useState(null);

    useEffect(() => {
        fetchRoom(setRooms);
    }, []);
    useEffect(() => {
        if (rooms != null && rooms.length >= 1) setRoomId(rooms[0].id);
    }, [rooms]);

    const [startDate, setStartDate] = useState(getLastWeekDay());
    const [endDate, setEndDate] = useState(new Date());

    const minus7DaysForDates = () => {
        setStartDate(minus7Days(startDate));
        setEndDate(minus7Days(endDate));
    }

    const plus7DaysForDates = () => {
        setStartDate(plus7Days(startDate));
        setEndDate(plus7Days(endDate));
    }

    useEffect(() => {
        if (roomId == null) return;
        fetchRoomReservationStats();
    }, [roomId, startDate, endDate]);

    const [data, setData] = useState({ labels: [], datasets: [] });
    const [labels, setLabels] = useState([]);
    const [noShowRates, setNoShowRates] = useState([]);
    const [revCnts, setRevCnts] = useState([]);
    const [noShowCnts, setNoShowCnts] = useState([]);
    
    useEffect(() => {
        setData({
            labels,
            datasets: [
                {
                    label: '노쇼 비율',
                    data: noShowRates,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
                {
                    label: '예약',
                    data: revCnts,
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                },
                {
                    label: '노쇼',
                    data: noShowCnts,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
            ],
        });
    }, [labels, noShowRates, revCnts, noShowCnts]);

    const fetchRoomReservationStats = async () => {
        try {
            const startYYYYMMDD = convertDateToYYYYMMDD(startDate);
            const endYYYYMMDD = convertDateToYYYYMMDD(endDate);
            const response = await fetch(BASE_URL + '/metrics/rooms/reservations/stats?roomId=' + roomId + '&date=' + startYYYYMMDD + '&endDate=' + endYYYYMMDD, {
                method: 'GET',
                headers: {
                    'Request-Type': 'TIME_RANGE',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Refresh' : `Bearer ${localStorage.getItem('refreshToken')}`
                }
            });
    
            const data = await response.json();
            const statusCode = response.status;
            if (statusCode == 200) {
                const newLabels = [];
                const newNoShowRates = [];
                const newRevCnts = [];
                const newNoShowCnts = [];
                data.roomStats.forEach((roomStat) => {
                    newLabels.push(roomStat.date);
                    newNoShowRates.push(roomStat.noShowRate);
                    newRevCnts.push(roomStat.revCnt);
                    newNoShowCnts.push(roomStat.noShowCnt);
                });
                setLabels(newLabels);
                setNoShowRates(newNoShowRates);
                setRevCnts(newRevCnts);
                setNoShowCnts(newNoShowCnts);
            } else {
                onFailure(navigate);
            }
        } catch (error) {
            onFailure(navigate);
        }
    }

    Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

    return (
        <div>
            <div className="chart-title-box">
                <a className='contents-box-title-text'>노쇼 통계</a>
                <div className="row-box">
                    <a className="red-button" onClick={minus7DaysForDates}>←</a>
                    <a className="red-button margin-left-05rem" onClick={plus7DaysForDates}>→</a>
                    <select
                        className="margin-left-05rem"
                        onChange={(event) => { 
                            const index = event.target.selectedIndex;
                            setRoomId(rooms[index].id);
                        }}>
                        {rooms.map((item) => (
                            <option>{item.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <Bar data={data} />
        </div>
    );
}

export default NoShowChart;