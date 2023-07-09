import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ValueContext } from '../Context/ValueContext';

export default function Page2() {


    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    const navigate = useNavigate()

    const { isUpdate } = useContext(ValueContext)

    const updateID = localStorage.getItem('id')


    const AddUser = async () => {
        const obj = {
            name,
            email,
            phone
        }
        await fetch('http://localhost:8080/users/add', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                "Content-type": "application/json"
            }
        }).then((res) => res.json())
            .then((res) => {
                alert(res.msg)
                navigate('/')
            })
            .catch((e) => console.log(e))


    }

    const UpdateFunc = async () => {
        let user = JSON.parse(localStorage.getItem('user'))

        const obj = {
            name: name || user.name,
            email: email || user.email,
            phone: phone || user.phone
        }

        await fetch(`http://localhost:8080/users/edit/${updateID}`, {
            method: 'PATCH',
            body: JSON.stringify(obj),
            headers: {
                "Content-type": "application/json"
            }
        }).then((res) => res.json())
            .then((res) => {
                alert(res.msg)
                navigate('/')
            })
            .catch((e) => console.log(e))

    }

    return (
        <div>
            <h1>{isUpdate ? 'Update User' : 'Create User'}</h1>

            <input type="text" placeholder='Name' onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder='Phone' onChange={(e) => setPhone(e.target.value)} />

            <button onClick={isUpdate ? UpdateFunc : AddUser}>{isUpdate ? 'Update User' : 'Create User'}</button>

            <button onClick={() => navigate('/')}>goBack</button>
        </div>
    )
}
