import './Manage.css';
import { BASE_URL, fetchUserProfile, mobilable } from '../Common';
import AdminNavigation from './AdminNavigation';

function Manage() {
    return (
        <div className={mobilable('home')}>
            <AdminNavigation />
            <div className={mobilable('home-contents')}>

            </div>
        </div>
    );
}

export default Manage;