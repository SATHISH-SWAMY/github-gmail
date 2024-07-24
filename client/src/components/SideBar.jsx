import React from 'react'
import { Drawer,styled } from '@mui/material'; 
import  SideBarContent  from "../components/SideBarContent";

function SideBar({openDrawer}) {
  return (
    <Drawer anchor='left' 
    open={openDrawer}
    hideBackdrop={true}
    modalprops={{
      keepMounted:true
    }}
    variant='persistent'
      //now the side pages is top on yje screen to align it we have to sellect the (class="MuiPaper)
      sx={{
        '& .MuiDrawer-paper': {
          marginTop:'64px',
          width:250,
          background:'#f5f5f5',
          borderRight:'none',
          height:'calc(100vh - 64px)'
        }
      }}
    >

      <SideBarContent/>
    </Drawer>
  )
}

export default SideBar