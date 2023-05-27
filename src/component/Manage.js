import './Manage.css';
import { mobilable } from '../Common';
import Navigation from './Navigation';
import ManageRoomBox from './ManageRoomBox';
import AdminReservationBox from './AdminReservationBox';
import ManageUserBox from './ManageUserBox';
import RoomLogsBox from './RoomLogsBox';

function Manage() {
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