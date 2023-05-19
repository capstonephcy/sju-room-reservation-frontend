import './MyPage.css';
import Navigation from './Navigation';
import { checkIsAdmin, mobilable } from '../Common';
import { useEffect, useState } from 'react';
import UpdatePasswordModal from './UpdatePasswordModal';
import MyInformationBox from './MyInformationBox';
import MyReservationBox from './MyReservationBox';

function MyPage() {
    const [showsUpdatePasswordModal, setShowsUpdatePasswordModal] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        setIsAdmin(checkIsAdmin());
    });

    return (
        <div className={mobilable('home')}>
            <Navigation />
            <div className={mobilable('home-contents')}>
                <MyInformationBox setShowsUpdatePasswordModal={setShowsUpdatePasswordModal} />
                {!isAdmin &&
                    <MyReservationBox />
                }
            </div>
        {showsUpdatePasswordModal && <UpdatePasswordModal setShowsUpdatePasswordModal={setShowsUpdatePasswordModal} />}
        </div>
    )
}

export default MyPage;