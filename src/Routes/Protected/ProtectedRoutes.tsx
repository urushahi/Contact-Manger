import React from 'react'
import { Route, Routes } from 'react-router'
import Header from '../../Components/header'
import CreateContact from '../../Views/CreateContact'
import List from '../../Views/Dashboard/List'
import Favourite from '../../Views/FavouriteList'

const ProtectedRoutes = () => {
    return (
        <>
            <Header />
            <main className="container py-4">
                <Routes>
                    <Route path="/index" element={<List />} />
                    <Route path="/create-contact" element={<CreateContact />} />
                    <Route path="/contact/edit/:id" element={<CreateContact editItem={true} />} />
                    <Route path="/favourite" element={<Favourite />} />
                </Routes>
            </main>
        </>
    )
}

export default ProtectedRoutes
