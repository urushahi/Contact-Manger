import React, { useContext, useEffect, useState } from 'react';
import axios from "axios"
import { MdDelete, MdSettings, MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { useNavigate } from 'react-router';

const FavItem = (props: any) => {
    const { name, address, phone, email, _id } = props.data

    const navigate = useNavigate();

    return (
        <>
            <tr >
                <td>
                    {name}
                </td>
                <td>{phone}</td>
                <td>
                    Image
                </td>
                <td>
                    {email}
                </td>
                <td>
                    {address}
                </td>
            </tr>
        </>
    )
}

export default FavItem
