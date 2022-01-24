import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoMdArrowBack } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { Table } from 'reactstrap';
import FavItem from './FavItem';

const Favourite = () => {
    const [tableData, setTableData] = useState<any[]>([]);
    const id = localStorage.getItem('id')
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5000/contact/favourites/true`)
            .then(response => {
                setTableData(response.data);
            })
            .catch(err => console.log(err))
    }, [])
    return <>

        <div className="d-flex align-items-center justify-content-between">
            <h4>Favourites Lists </h4>

            <div className='link-back' onClick={() => navigate(-1)}>
                <IoMdArrowBack />
                <div>Back</div>
            </div>
        </div>
        <Table className="table mt-3">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Image</th>
                    <th>Email</th>
                    <th>Address</th>
                </tr>
            </thead>
            <tbody>
                {
                    tableData.map((data: any, key: number) => {
                        return (
                            <FavItem data={data} key={key} />
                        )
                    }
                    )
                }
            </tbody>
        </Table>
    </>;
}

export default Favourite;
