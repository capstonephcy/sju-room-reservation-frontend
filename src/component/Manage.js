import './Manage.css';
import { checkIsAdmin, mobilable } from '../Common';
import Navigation from './Navigation';
import ManageRoomBox from './ManageRoomBox';
import AdminReservationBox from './AdminReservationBox';
import ManageUserBox from './ManageUserBox';
import RoomLogsBox from './RoomLogsBox';
import { useEffect } from 'react';

function Manage() {
    useEffect(() => {
        if (!checkIsAdmin()) {
            alert("접근할 수 없는 페이지입니다.");
            window.history.back();
        }
    }, [])

    return (
        <div className={mobilable('home')}>
            <Navigation />
            <div className={mobilable('home-contents')}>
                <ManageRoomBox />
                <AdminReservationBox />
                <ManageUserBox />
                <RoomLogsBox />
            </div>
        </div>
    );
}

export default Manage;