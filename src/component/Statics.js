import './Statics.css';
import { checkIsAdmin, mobilable } from '../Common';
import Navigation from './Navigation';
import NoShowChart from './NoShowChart';
import { useEffect } from 'react';

function Statics() {
    useEffect(() => {
        if (!checkIsAdmin()) {
            alert("접근할 수 없는 페이지입니다.");
            window.history.back();
        }
    }, []);

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