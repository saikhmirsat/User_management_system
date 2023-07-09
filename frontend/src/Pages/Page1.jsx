import React, { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ValueContext } from '../Context/ValueContext'
import './Page1.css'

export default function Page1() {
    const [userData, setUserData] = useState([]) || []
    console.log(userData)

    const { setIsUpdate } = useContext(ValueContext)




    const getData = async () => {
        try {
            await fetch('http://localhost:8080/users')
                .then((res) => res.json())
                .then((res) => {
                    setUserData(res)

                    // console.log(res)
                })
                .catch((e) => console.log(e))
        } catch (e) {
            console.log(e)
        }

    }
    useEffect(() => {
        getData()
    }, [])

    const navigate = useNavigate()

    const GotoPage3Func = (ele) => {
        localStorage.setItem('id', ele._id)
        localStorage.setItem('user', JSON.stringify(ele))
        navigate('/page3')
    }

    const AddUserBTNFUNC = () => {
        setIsUpdate(false)
        navigate('/page2')
    }

    const GotoPage2Func = (ele) => {
        setIsUpdate(true)
        localStorage.setItem('id', ele._id)
        localStorage.setItem('user', JSON.stringify(ele))
        navigate('/page2')
    }

    const Deletefunc = async (id) => {
        console.log(id)
        try {
            await fetch(`http://localhost:8080/users/delete/${id}`, {
                method: 'DELETE'
            }).then((res) => res.json())
                .then((res) => {
                    setUserData(res)
                    console.log(res)
                })

        } catch (error) {
            console.log('Error deleting user:', error);
        }
    }


    return (
        <div className='Page_2'>
            <h1>page1</h1>

            <button onClick={AddUserBTNFUNC}>Add User</button>

            <table >
                <tr >
                    <th>ID</th>
                    <th>NAME</th>
                    <th>View User Detail</th>
                    <th>Update User Detail</th>
                    <th>Delete User</th>
                </tr>
                {
                    userData && userData.map((ele) => <tr key={ele._id}>
                        <td>{ele._id}</td>
                        <td>{ele.name}</td>
                        <td>
                            <button onClick={() => GotoPage3Func(ele)}>View</button>
                        </td>
                        <td>
                            <button onClick={() => GotoPage2Func(ele)}>Edit</button>
                        </td>
                        <td>
                            <button onClick={() => Deletefunc(ele._id)}>Delete</button>
                        </td>
                    </tr>)
                }

            </table>
        </div>
    )
}