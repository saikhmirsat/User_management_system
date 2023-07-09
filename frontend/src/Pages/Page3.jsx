import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'


export default function Page3() {

    const [user, setUser] = useState({})


    let id = localStorage.getItem('id')
    console.log(id)

    const getData = async () => {
        try {
            await fetch(`http://localhost:8080/users/${id}`)
                .then((res) => res.json())
                .then((res) => {
                    setUser(res)

                    console.log(res)
                })
                .catch((e) => console.log(e))
        } catch (e) {
            console.log(e)
        }

    }
    useEffect(() => {
        getData()
    }, [])



    return (
        <div className='Page_2'>
            <table >
                <tr >
                    <th>ID</th>
                    <th>NAME</th>
                    <th>Email</th>
                    <th>PHONE</th>
                </tr>
                {
                    // user && user.map((ele) => <tr key={ele._id}>
                    //     <td>{ele._id}</td>
                    //     <td>{ele.name}</td>
                    //     <td>{ele.email}</td>
                    //     <td>{ele.phone}</td>
                    // </tr>)
                }

            </table>
        </div>
    )
}
