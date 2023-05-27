import { useState } from "react";
import { BASE_URL, mobilable } from "../Common";
import CreateUserModal from "./CreateUserModal";

function ManageUserBox() {
    const [showsCreateUserModal, setShowsCreateUserModal] = useState(false);

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
            <div className='margin-top-2rem'>
                <a className='contents-box-title-text'>사용자 추가</a>
                <a className='add-button cursor-pointer' onClick={() => { setShowsCreateUserModal(true); }}>➕</a>
            </div>
            <div className={`${mobilable('contents-box')} margin-top-1rem`}>
                <div className="column-box">
                    <div>
                        <a>Create user by csv: </a>
                        <input className="csv-input" type="file" accept=".csv" onChange={() => { importUser(); }} />
                    </div>
                </div>
            </div>
            { showsCreateUserModal && <CreateUserModal closeModal={() => {setShowsCreateUserModal(false)}} /> }
        </div>
    );
}

export default ManageUserBox;