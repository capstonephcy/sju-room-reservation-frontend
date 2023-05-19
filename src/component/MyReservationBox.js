import FullCalendar from "@fullcalendar/react";
import { useNavigate } from "react-router-dom";
import { BASE_URL, convertDateToYYYYMMDD, mobilable, onFailure } from "../Common";
import dayGridPlugin from '@fullcalendar/daygrid';
import { useState } from "react";

function MyReservationBox() {
    const navigate = useNavigate();

    // { id: (reservation object for additional information) title: 'test1', 'date': '2023-05-19' }
    const [events, setEvents] = useState([]);
    const fetchReservationForMonth = async (dateInfo) => {
        try {
            const startYYYYMMDD = convertDateToYYYYMMDD(dateInfo.start);
            const endYYYYMMDD = convertDateToYYYYMMDD(dateInfo.end);
            const response = await fetch(BASE_URL + '/reservation/profiles?startDate=' + startYYYYMMDD + '&endDate=' + endYYYYMMDD + '&startTime=00:00:00&endTime=23:59:59&pageIdx=0&pageLimit=100', {
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
                const newEvents = [];
                data.reservations.forEach(reservation => {
                    newEvents.push({ id: JSON.stringify(reservation), title: `${reservation.start.slice(0,5)} ${reservation.room.name}`, date: reservation.date });
                });
                setEvents(newEvents);
            } else {
                onFailure(navigate);
            }
        } catch (error) {
            alert(error);
            onFailure(navigate);
        }
    }

    const toggleEventClick = (data) => {
        const reservation = JSON.parse(data.event.id);
        alert(`${reservation.room.name} ${reservation.start.slice(0, 5)}~${reservation.end.slice(0, 5)}`);
    }

    return (
        <div className={`${mobilable('contents-with-title-box')} margin-top-2rem column-box`}>
            <a className='contents-box-title-text'>내 예약</a>
            <FullCalendar
                locale={'ko'}
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={events}
                datesSet={fetchReservationForMonth}
                eventColor="#C31632"
                eventClick={toggleEventClick}
            />
        </div>
    );
}

export default MyReservationBox;