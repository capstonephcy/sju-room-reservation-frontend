import { useState } from "react";
import { BASE_URL, mobilable } from "../../src/Common";

function UpdatePasswordModal({ setShowsUpdatePasswordModal }) {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newConfirmPassword, setNewConfirmPassword] = useState("");

    const toggleUpdatePassword = async () => {
        if (newPassword != newConfirmPassword) {
            alert("입력하신 두 개의 새 비밀번호가 서로 다릅니다.");
            return;
        }

        try {
            const token = localStorage.getItem('accessToken');
            const response = await fetch(BASE_URL + '/users/profiles/password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ password: currentPassword, newPassword })
            });
        
            const data = await response.json();
            const statusCode = response.status;
            if (statusCode == 200) {
                alert("비밀번호가 변경되었습니다.");
                setShowsUpdatePasswordModal(false);
            } else {
                alert("비밀번호 변경에 실패하였습니다.");
            }
        } catch (error) {
            alert("비밀번호 변경에 실패하였습니다.");
        }
    }
    
    return (
        <div className='modal-background'>
            <div className={mobilable('modal')}>
                <div className='modal-title-box'>
                    <a className='modal-title'>비밀번호 변경</a>
                </div>

                <div className='column-box margin-top-1rem'>
                    <a>현재 비밀번호</a>
                    <input type="password" className='update-password-input'
                        onChange={(event) => setCurrentPassword(event.target.value)}/>
                    <a className='margin-top-05rem'>새 비밀번호</a>
                    <input type="password" className='update-password-input'
                        onChange={(event) => setNewPassword(event.target.value)}/>
                    <a className='margin-top-05rem'>새 비밀번호 확인</a>
                    <input type="password" className='update-password-input'
                        onChange={(event) => setNewConfirmPassword(event.target.value)}/>
                </div>
            
                <div className='modal-button-box'>
                    <div className='modal-cancel-button' onClick={() => { setShowsUpdatePasswordModal(false) }}>
                        <a className='modal-cancel-text'>취소</a>
                    </div>
                    <div className='modal-ok-button' onClick={toggleUpdatePassword}>
                        <a className='red-box-text'>변경하기</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdatePasswordModal;