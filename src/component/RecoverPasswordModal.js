import { useState } from "react";
import { BASE_URL, mobilable } from "../Common";
import './RecoverPasswordModal.css';

function RecoverPasswordModal({ closeModal }) {

    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");

    const [showsCode, setShowsCode] = useState(false);

    const [isApiLoading, setIsApiLoading] = useState(false);

    const toggleSendCode = async () => {
        if (isApiLoading || showsCode) return;
        setIsApiLoading(true);
        alert("요청을 처리 중입니다. 잠시만 기다려주세요.");

        try {
            const response = await fetch(BASE_URL + '/users/auths/email/send', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });
    
            const data = await response.json();
            const statusCode = response.status;
            if (statusCode == 200) {
                alert("이메일로 인증코드가 전송되었습니다.");
                setShowsCode(true);
            } else {
                alert("인증코드 전송에 실패했습니다.");
            }
        } catch (error) {
            alert("인증코드 전송에 실패했습니다.");
        } finally {
            setIsApiLoading(false);
        }
    }

    const toggleRecoverButton = async () => {
        if (isApiLoading || !showsCode) return;
        setIsApiLoading(true);
        alert("요청을 처리 중입니다. 잠시만 기다려주세요.");

        try {
            const response = await fetch(BASE_URL + '/users/recovery/password', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, code })
            });
    
            const data = await response.json();
            const statusCode = response.status;
            if (statusCode == 200) {
                alert("임시 비밀번호가 이메일로 전송되었습니다. 임시 비밀번호로 로그인하신 뒤 비밀번호를 반드시 변경해주세요.");
                closeModal();
            } else {
                alert("인증코드 확인에 실패했습니다.");
            }
        } catch (error) {
            alert("인증코드 확인에 실패했습니다.");
        } finally {
            setIsApiLoading(false);
        }
    }

    return (
        <div className='modal-background'>
            <div className={mobilable('modal')}>
                <div className='modal-title-box'>
                    <a className='modal-title'>비밀번호 찾기</a>
                </div>
                
                <div className="column-box margin-top-05rem">
                    <label>이메일</label>
                    <div className="email-input-box">
                        <input type='text' className="margin-top-05rem email-input" placeholder="가입 시 입력한 이메일을 입력해주세요."
                        onChange={(event) => { setEmail(event.target.value) }} disabled={showsCode}/>
                        <a className={`send-code-button${showsCode?"-disabled":""}`} onClick={toggleSendCode}>확인</a>
                    </div>
                </div>

                {showsCode &&
                <div className="column-box margin-top-05rem">
                    <label>인증번호</label>
                    <input type='text' className="margin-top-05rem" placeholder="이메일로 전송된 인증번호를 입력해주세요."
                    onChange={(event) => { setCode(event.target.value) }}/>
                </div>
                }

                <div className='modal-button-box'>
                    <div className='modal-cancel-button' onClick={closeModal}>
                        <a className='modal-cancel-text'>취소</a>
                    </div>
                    <div className={`modal-ok-button${showsCode ? '' : '-disabled'}`} onClick={toggleRecoverButton}>
                        <a className='red-box-text'>찾기</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecoverPasswordModal;