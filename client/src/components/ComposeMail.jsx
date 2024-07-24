import React, { useState } from 'react'
import { Dialog,Box, Typography,styled, InputBase, TextField ,Button} from '@mui/material';
import {Close, DeleteOutline} from "@mui/icons-material";
import useApi from '../hooks/useApi';
import { API_URLS } from './services/api.urls';

const dialogStyle = {
    height:'90%',
    width:'80%',
    maxWidth:'100%',
    maxHeight:'100%',
    boxShadow:'none',
    borderRadius:'10px 10px 0 0'
};

//css for Header
const Header = styled(Box)({
    display:'flex',
    justifyContent:'space-between',
    padding:'10px 15px',
    background:'#f2f6fc',
    //using parent to targete the child component using this ( '& > p' )
    '& > p': {
        fontSize: 14,
        fontWeight: 500
    }
})

//css for Recipients and Subject part 
const RecipientsWrapper = styled(Box)({
    display:'flex',
    flexDirection:'column',
    padding:'15px',
    '& > div': {
        fontSize: 14,
        borderBottom:'1px solid #f5f5f5',
        marginTop:10
    }
})

/* css for Footer area  part */

const Footer = styled(Box)({
   display:'flex',
   justifyContent:'space-between',
   padding:'10px 15px',
   alignItems:'center',
})

const SendButton = styled(Button)({
    background:'#0857d0',
    color:'#fff',
    fontWeight:500,
    textTransform:'none',
    borderRadius:18,
    width:100
})

function ComposeMail({openDialog,setOpenDialog}) {

    const [data, setData]= useState({});
    const sentEmailService = useApi(API_URLS.saveSentEmails);
    const saveDraftService = useApi(API_URLS.saveDraftEmails);

    const config = {
        
            Host : "smtp.elasticemail.com",
            Username : "codeforintr12345@yopmail.com",
            Password : "28B4BFF9B8BA2C7A16E3BEDB481573B65C5B",
            port : 2525
    }




    const closeComposeMail = (e) =>{        //function for closing the compose mail
        e.preventDefault();
        const payload ={
            to:data.to,
            from:'sathishswamy380@gmail.com',
            subject : data.subject,
            body : data.body,
            date: new Date(),
            image:'',
            name: 'sathish swamy',
            starred:false,
            type:"drafts"
        }

          saveDraftService.call(payload);

        if (!saveDraftService.error){
            setOpenDialog(false);
            setData({});
        } else {

        }
    }
    
    const sendEmail =async(e) =>{
        e.preventDefault();
        if (window.Email){

            window.Email.send({
            ...config,
            To : data.to,
            From : "sathishswamy380@gmail.com" ,
            Subject : data.subject,
            Body : data.body
        }).then(
          message => alert(message)
        );

        }

        const payload ={
            to:data.to,
            from:'sathishswamy380@gmail.com',
            subject : data.subject,
            body : data.body,
            date: new Date(),
            image:'',
            name: 'sathish swamy',
            starred:false,
            type:"sent"
        }

        sentEmailService.call(payload);

        if (!sentEmailService.error){
            setOpenDialog(false);
            setData({});
        } else {

        }


        setOpenDialog(false);
    }

    const onValueChange=(e)=>{
        setData({...data , [e.target.name]: e.target.value})
    }

    
  return (

    //to open the popop fo the compose 
    <Dialog

       open = {openDialog} //hard code

       //to apply the css for have to take paperProps
       PaperProps={{sx: dialogStyle}}
    >
        {/* Header part */}
       <Header>
           <Typography>New Message</Typography>
           <Close fontSize='small' onClick={(e) => closeComposeMail(e)} />
       </Header>

        {/* Recipients and Subject part */}
       <RecipientsWrapper>
         <InputBase placeholder='Recipients' name="to" onClick={(e)=> onValueChange(e)} onChange={(e)=>{data.to = e.target.value;}}/>
         <InputBase placeholder='Subject' name="subject" onClick={(e)=> onValueChange(e)} onChange={(e)=>{data.subject = e.target.value;}} />
       </RecipientsWrapper>

        {/* Text area part */}
        <TextField 
            multiline
            rows={27}
            //sx is used to handle the internal class or props
            sx={{'& .MuiOutlinedInput-notchedOutline': { border:'none'}}}
            name='body'
            onClick={(e)=> onValueChange(e)} onChange={(e)=>{data.body = e.target.value;}}
        />

        {/* Footer area  part */}
       <Footer>
           <SendButton onClick={(e) => sendEmail(e)} >Send</SendButton>
           <DeleteOutline onClick={() => setOpenDialog(false)} />
       </Footer>
    </Dialog>
  )
}

export default ComposeMail