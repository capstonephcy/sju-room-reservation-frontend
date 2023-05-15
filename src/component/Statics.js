import './Statics.css';
import { BASE_URL, fetchUserProfile, mobilable } from '../Common';
import Navigation from './Navigation';

function Statics() {
    return (
        <div className={mobilable('home')}>
            <Navigation />
            <div className={mobilable('home-contents')}>

            </div>
        </div>
    );
}

export default Statics;