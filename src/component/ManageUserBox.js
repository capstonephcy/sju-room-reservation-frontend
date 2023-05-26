import { useState } from "react";
import { BASE_URL, mobilable } from "../Common";
import './ManageUserBox.css';

function ManageUserBox() {
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

    const importUser = async () => {
        try {
            const csvInput = document.querySelector('.csv-input');

            const formData = new FormData();
            formData.append('csvFile', csvInput.files[0]);

            const response = await fetch(BASE_URL + '/users/imports/csv', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: formData
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
        <div className={`${mobilable('contents-with-title-box')} margin-top-2rem column-box`}>
            <a className='contents-box-title-text'>사용자 추가</a>
            <div className={`${mobilable('contents-box')} margin-top-1rem`}>
                <div className="column-box">
                    <div className="row-box">
                        <div className="column-box">
                            <a className="create-user-item">username</a>
                            <a className="create-user-item">password</a>
                            <a className="create-user-item">email</a>
                            <a className="create-user-item">phone</a>
                            <a className="create-user-item">name</a>
                            <a className="create-user-item">department</a>
                            <a className="create-user-item">permission</a>
                        </div>
                        <div className="column-box margin-left-05rem">
                            <input type="text" onChange={(event) => { setUsername(event.target.value); }}/>
                            <input type="password" onChange={(event) => { setPassword(event.target.value); }}/>
                            <input type="text" onChange={(event) => { setEmail(event.target.value); }}/>
                            <input type="text" onChange={(event) => { setPhone(event.target.value); }}/>
                            <input type="text" onChange={(event) => { setName(event.target.value); }}/>
                            <input type="text" onChange={(event) => { setDepartment(event.target.value); }}/>
                            <input type="text" onChange={(event) => { setPermission(event.target.value); }}/>
                        </div>
                    </div>
                    <a className="red-button margin-top-05rem" onClick={toggleCreateUser}>추가하기</a>

                    <div className="margin-top-05rem">
                        <a>csv로 추가: </a>
                        <input className="csv-input" type="file" accept=".csv" onChange={() => { importUser(); }} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManageUserBox;