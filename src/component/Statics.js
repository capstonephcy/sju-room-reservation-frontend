import './Statics.css';
import { mobilable } from '../Common';
import Navigation from './Navigation';
import NoShowChart from './NoShowChart';

function Statics() {
    return (
        <div className={mobilable('home')}>
            <Navigation />
            <div className={mobilable('home-contents')}>
                <NoShowChart />
            </div>
        </div>
    );
}

export default Statics;