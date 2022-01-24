import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { Table } from 'reactstrap'
import TableItem from '../ListItem/TableItem'

const List = () => {
    const [tableData, setTableData] = useState<any[]>([]);
    const id = localStorage.getItem('id')

    useEffect(() => {
        axios.get(`http://localhost:5000/contact/${id}`)
            .then(response => {
                setTableData(response.data);
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <>
            <div className="d-flex align-items-center justify-content-between">
                <h4>Contact Lists </h4>
                <div>
                    <Link to="/favourite" >Show Favourites List</Link>
                    <Link to="/create-contact" className="btn btn-primary btn-sm ml-3" >Create New Contact</Link>
                </div>
            </div>
            <Table className="table mt-3">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        {/* <th>Image</th> */}
                        <th>Email</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tableData.map((data: any, key: number) => {
                            return (
                                <TableItem data={data} key={key} />
                            )
                        }
                        )
                    }
                </tbody>
            </Table>


        </>
    )
}

export default List
