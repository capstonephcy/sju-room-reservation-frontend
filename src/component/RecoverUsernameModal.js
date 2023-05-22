import { useState } from "react";
import { BASE_URL, mobilable } from "../Common";

function RecoverUsernameModal({ closeModal }) {

    const [email, setEmail] = useState("");

    const toggleRecoverButton = async () => {
        try {
            const response = await fetch(BASE_URL + '/users/recovery/username', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });
    
            const data = await response.json();
            const statusCode = response.status;
            if (statusCode == 200) {
                alert(`이메일에 연결된 아이디는 [${data.username}]입니다.`);
                closeModal();
            } else {
                alert("이메일 확인에 실패했습니다.");
            }
        } catch (error) {
            alert("이메일 확인에 실패했습니다.");
        }
    }

    return (
        <div className='modal-background'>
            <div className={mobilable('modal')}>
                <div className='modal-title-box'>
                    <a className='modal-title'>아이디 찾기</a>
                </div>
                
                <div className="column-box margin-top-05rem">
                    <label>이메일</label>
                    <input type='text' className="margin-top-05rem" placeholder="가입 시 입력한 이메일을 입력해주세요."
                    value={email} onChange={(event) => { setEmail(event.target.value) }}/>
                </div>

                <div className='modal-button-box'>
                    <div className='modal-cancel-button' onClick={closeModal}>
                        <a className='modal-cancel-text'>취소</a>
                    </div>
                    <div className='modal-ok-button' onClick={toggleRecoverButton}>
                        <a className='red-box-text'>찾기</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecoverUsernameModal;