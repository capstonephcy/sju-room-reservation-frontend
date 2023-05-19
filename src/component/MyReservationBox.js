import FullCalendar from "@fullcalendar/react";
import { useNavigate } from "react-router-dom";
import { BASE_URL, mobilable } from "../Common";
import dayGridPlugin from '@fullcalendar/daygrid';

function MyReservationBox() {
    const navigate = useNavigate();

    return (
        <div className={`${mobilable('contents-with-title-box')} margin-top-2rem column-box`}>
            <a className='contents-box-title-text'>내 예약</a>
            <FullCalendar
                locale={'ko'}
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={[
                    { title: 'test1', 'date': '2023-05-19' }
                ]}
            />
        </div>
    );
}

export default MyReservationBox;