import './Manage.css';
import { BASE_URL, fetchUserProfile, mobilable } from '../Common';
import Navigation from './Navigation';

function Manage() {
    return (
        <div className={mobilable('home')}>
            <Navigation />
            <div className={mobilable('home-contents')}>

            </div>
        </div>
    );
}

export default Manage;