import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/home/Home'
import Details from '../pages/details/Details'

const MovieRouter = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='details/:id' element={<Details />}/>
    </Routes>
  )
}

export default MovieRouter