import FullCalendar from "@fullcalendar/react";
import { useNavigate } from "react-router-dom";
import { BASE_URL, combineDateAndTime, convertDateToYYYYMMDD, mobilable, onFailure } from "../Common";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useState } from "react";

function AdminReservationBox() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    // { id: (reservation object for additional information) title: 'test1', 'date': '2023-05-19' }
    const [events, setEvents] = useState([]);
    const fetchReservationForMonth = async (dateInfo) => {
        try {
            const startYYYYMMDD = convertDateToYYYYMMDD(dateInfo.start);
            const endYYYYMMDD = convertDateToYYYYMMDD(dateInfo.end);
            const response = await fetch(BASE_URL + '/reservation/profiles?startDate=' + startYYYYMMDD + '&endDate=' + endYYYYMMDD + '&startTime=00:00:00&endTime=23:59:59&pageIdx=0&pageLimit=1000', {
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
                    newEvents.push({ id: JSON.stringify(reservation), title: `${reservation.room.name} ${reservation.revOwner.name}`, date: reservation.date, start:combineDateAndTime(reservation.date, reservation.start), end:combineDateAndTime(reservation.date, reservation.end) });
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
        alert(data.event.id);
    }

    return (
        <div className={`${mobilable('contents-with-title-box')} margin-top-2rem column-box`}>
            <a className='contents-box-title-text'>예약 정보</a>
            <FullCalendar
                allDaySlot={false}
                locale={'ko'}
                plugins={[dayGridPlugin, timeGridPlugin]}
                initialView="dayGridMonth"
                events={events}
                datesSet={fetchReservationForMonth}
                eventColor="#C31632"
                eventClick={toggleEventClick}
                headerToolbar={{
                    left: 'title',
                    center: '',
                    right: 'timeGridDay,timeGridWeek,dayGridMonth today prev,next'
                }}
            />
        </div>
    );
}

export default AdminReservationBox;