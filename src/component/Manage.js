import './Manage.css';
import { BASE_URL, fetchUserProfile, mobilable } from '../Common';
import Navigation from './Navigation';
import ManageRoomBox from './ManageRoomBox';

function Manage() {
    return (
        <div className={mobilable('home')}>
            <Navigation />
            <div className={mobilable('home-contents')}>
                <ManageRoomBox />
            </div>
        </div>
    );
}

export default Manage;