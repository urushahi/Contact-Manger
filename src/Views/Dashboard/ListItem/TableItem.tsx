import React, { useContext, useEffect, useState } from 'react';
import axios from "axios"
import { MdDelete, MdSettings, MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { useNavigate } from 'react-router';

const TableItem = (props: any) => {

    const { name, address, phone, email, _id, favourite } = props.data

    const navigate = useNavigate();

    // editList
    const editList = (id: any) => {
        navigate(`/contact/edit/${id}`);
    }


    // delete list 
    const deleteList = (id: any) => {
        axios.delete(`http://localhost:5000/contact/delete/${id}`)
            .then(response => {
                window.location.reload();
            })
            .catch(err => console.log(err))
    }



    // get Data by id 
    const getDataById = async (id: any) => {
        await axios.get(`http://localhost:5000/contact/get/${id}`)
            .then(response => {
                addToFavourite(response.data._id, response.data.favourite)
                console.log(response.data._id, response.data.favourite)
            })
            .catch(err => console.log(err))
    }

    // add to favourite 

    const addToFavourite = async (id: any, fav: any) => {
        await axios.get(`http://localhost:5000/contact/favourites/${id}/${fav}`)
            .then(response => {
                console.log(response.data)
                window.location.reload()
            })
            .catch(err => console.log(err))
    }


    return (
        <>
            <tr >
                <td>
                    {name}
                </td>
                <td>{phone}</td>
                {/* <td>
                    Image
                </td> */}
                <td>
                    {email}
                </td>
                <td>
                    {address}
                </td>
                <td className="table-icons">
                    {
                        favourite ?
                            <MdFavorite color='red' onClick={() => {
                                getDataById(_id)
                            }} /> :

                            <MdFavoriteBorder onClick={() => {
                                getDataById(_id)
                            }} />
                    }
                    <MdSettings onClick={() => { editList(_id) }} />
                    <MdDelete onClick={() => {
                        deleteList(_id)
                    }} />
                </td>
            </tr>
        </>
    )
}

export default TableItem
