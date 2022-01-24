import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoMdArrowBack } from "react-icons/io"
import { useNavigate, useParams } from 'react-router';

const CreateContact = (props: any) => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState("");
    const [filename, setFilename] = useState("");
    const { editItem } = props;
    const { id } = useParams();

    const contactId = localStorage.getItem('id')
    const navigate = useNavigate();

    const onChangeName = (event: any) => {
        setName(event.target.value);
    }
    const onChangePhone = (event: any) => {
        setPhone(event.target.value);
    }
    const onChangeAddress = (event: any) => {
        setAddress(event.target.value);
    }
    const onChangeEmail = (event: any) => {
        setEmail(event.target.value);
    }
    const onImageUpload = (event: any) => {
        setImage(event.target.files[0]);
        setFilename(event.target.files[0].name)
    }

    const onFormSubmit = async (e: any) => {
        e.preventDefault();
        const contacts = {
            name: name,
            phone: phone,
            address: address,
            email: email,
            image: image,
            contactId: contactId,
        };
        editItem ?
            await axios.post(`http://localhost:5000/contact/update/${id}`, contacts)
                .then(res => {
                    console.log("Updated successful")
                    navigate("/index")
                })
            :
            await axios.post("http://localhost:5000/contact/add", contacts)
                .then(res => {

                    navigate("/index")
                })
    }


    const fetchData = () => {
        axios.get(`http://localhost:5000/contact/edit/${id}`)
            .then(response => {
                setName(response.data.name);
                setAddress(response.data.address);
                setEmail(response.data.email);
                setPhone(response.data.phone)
            })
            .catch(err => console.log(err))
    }


    useEffect(() => {
        if (editItem) {
            fetchData()
        }
    }, [])


    return <>
        <div className="d-flex justify-content-between">
            <h3 className='mb-3'>{editItem ? "Update Contact" : "Add New Contact"}</h3>
            <div className='link-back' onClick={() => navigate(-1)}>
                <IoMdArrowBack />
                <div>Back</div>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-6">
                <form className="form-wrapper" onSubmit={onFormSubmit} >
                    <div className="form-group">
                        <label htmlFor="">Name</label>
                        <input type="text" placeholder="Name" className='form-control' onChange={onChangeName} value={editItem && name} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Phone</label>
                        <input type="text" placeholder="Phone" className='form-control' onChange={onChangePhone} value={editItem && phone} />
                    </div>
                    {/* <div className="form-group input-group custom-file mb-5">
                        <label htmlFor="">Upload Image</label>
                        <input type="file" className="form-control" id="imageInput" name="image" onChange={onImageUpload} accept='.png,.jpg,.jpeg' />
                        <label className="input-group-text" htmlFor="imageInput">{filename ? filename : "Upload Image"}</label>
                    </div> */}
                    <div className="form-group">
                        <label htmlFor="">Address</label>
                        <input type="text" placeholder="Address" className='form-control' onChange={onChangeAddress} value={editItem && address} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Email</label>
                        <input type="email" placeholder="Email" className='form-control' onChange={onChangeEmail} value={editItem && email} />
                    </div>
                    <button className='btn btn-success btn-block' type='submit'>{editItem ? "Update Contact" : "Create Contact"}</button>
                </form>
            </div>
        </div>
    </>;
}

export default CreateContact;
