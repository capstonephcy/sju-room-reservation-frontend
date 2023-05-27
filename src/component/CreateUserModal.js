import { useState } from "react";
import { BASE_URL, mobilable } from "../Common";

function CreateUserModal({ closeModal }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");
    const [department, setDepartment] = useState("");
    const [permission, setPermission] = useState("");

    const toggleCreateUser = async () => {
        try {
            const response = await fetch(BASE_URL + '/users/profiles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password, email, phone, name, department, permission })
            });
    
            const data = await response.json();
            const statusCode = response.status;
            if (statusCode == 200) {
                alert("사용자가 추가되었습니다.");
            } else {
                alert("요청이 실패했습니다: " + data._metadata.message);
            }
        } catch (error) {
            alert("요청이 실패했습니다: " + error);
        }
    }

    return (
        <div className='modal-background'>
            <div className={mobilable('modal')}>
                <div className='modal-title-box'>
                    <a className='modal-title'>사용자 추가</a>
                </div>

                <div className="column-box margin-top-05rem">
                    <div className="row-space-between">
                        <a>username</a>
                        <input type="text" onChange={(event) => { setUsername(event.target.value); }}/>
                    </div>
                    <div className="row-space-between">
                        <a>password</a>
                        <input type="password" onChange={(event) => { setPassword(event.target.value); }}/>
                    </div>
                    <div className="row-space-between">
                        <a>email</a>
                        <input type="text" onChange={(event) => { setEmail(event.target.value); }}/>
                    </div>
                    <div className="row-space-between">
                        <a>phone</a>
                        <input type="text" onChange={(event) => { setPhone(event.target.value); }}/>
                    </div>
                    <div className="row-space-between">
                        <a>name</a>
                        <input type="text" onChange={(event) => { setName(event.target.value); }}/>
                    </div>
                    <div className="row-space-between">
                        <a>department</a>
                        <input type="text" onChange={(event) => { setDepartment(event.target.value); }}/>
                    </div>
                    <div className="row-space-between">
                        <a>permission</a>
                        <input type="text" onChange={(event) => { setPermission(event.target.value); }}/>
                    </div>
                </div>
                <div className='modal-button-box'>
                    <div className='modal-cancel-button' onClick={closeModal}>
                        <a className='modal-cancel-text'>취소</a>
                    </div>
                    <div className='modal-ok-button' onClick={toggleCreateUser}>
                        <a className='red-box-text'>확인</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateUserModal;