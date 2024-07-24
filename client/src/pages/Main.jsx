import React, { Suspense, useState } from 'react'
import Header from "../components/Header.jsx";
import SideBar from '../components/SideBar.jsx';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

function Mein() {
  //for drawer opening and clossing
  const [openDrawer, setOpenDrawer] = useState(true);

  const toggleDrawer =()=>{
    setOpenDrawer(prevState => !prevState)
  }


  return (
    <>
      <Header toggleDrawer={toggleDrawer} />
      <Box>
        <SideBar openDrawer={openDrawer} />
        <Suspense fallback={<Suspense/>}>
          <Outlet context={{openDrawer}} />
        </Suspense>
      </Box>
    </>
  )
}

export default Mein