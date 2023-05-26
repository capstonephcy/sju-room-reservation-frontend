import './Manage.css';
import { BASE_URL, fetchUserProfile, mobilable } from '../Common';
import Navigation from './Navigation';
import ManageRoomBox from './ManageRoomBox';
import AdminReservationBox from './AdminReservationBox';

function Manage() {
    return (
        <div className={mobilable('home')}>
            <Navigation />
            <div className={mobilable('home-contents')}>
                <ManageRoomBox />
                <AdminReservationBox />
            </div>
        </div>
    );
}

export default Manage;