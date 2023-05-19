import './MyPage.css';
import Navigation from './Navigation';
import { mobilable } from '../Common';
import { useState } from 'react';
import UpdatePasswordModal from './UpdatePasswordModal';
import MyInformationBox from './MyInformationBox';

function MyPage() {
    const [showsUpdatePasswordModal, setShowsUpdatePasswordModal] = useState(false);

    return (
        <div className={mobilable('home')}>
            <Navigation />
            <div className={mobilable('home-contents')}>
                <MyInformationBox setShowsUpdatePasswordModal={setShowsUpdatePasswordModal} />
            </div>
        {showsUpdatePasswordModal && <UpdatePasswordModal setShowsUpdatePasswordModal={setShowsUpdatePasswordModal} />}
        </div>
    )
}

export default MyPage;