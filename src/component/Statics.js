import './Statics.css';
import { BASE_URL, fetchUserProfile, mobilable } from '../Common';
import AdminNavigation from './AdminNavigation';

function Statics() {
    return (
        <div className={mobilable('home')}>
            <AdminNavigation />
            <div className={mobilable('home-contents')}>

            </div>
        </div>
    );
}

export default Statics;