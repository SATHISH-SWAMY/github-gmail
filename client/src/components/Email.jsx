import React from 'react';
import { Box, Typography, Checkbox, styled } from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { routes } from "../routes/routes";
import useApi from '../hooks/useApi';
import { API_URLS } from './services/api.urls';

const Wrapper = styled(Box)({
  padding: '0 0 0 10px',
  backgroundColor: '#f2f6fc',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  '& > div': {
    display: 'flex',
    width: '100%',
    '& > p': {
      fontSize: 14
    }
  }
});

const Indicator = styled(Typography)({
  fontSize: '12px !important',
  backgroundColor: '#ddd',
  color: '#222',
  padding: '0 4px',
  borderRadius: 4,
  marginRight: 6
});

const Data = styled(Typography)({
  marginLeft: 'auto',
  marginRight: 20,
  fontSize: 12,
  color: '#5f6368'
});

const Email = ({ email, selectedEmails, setRefereshScreen, setSelectedEmails }) => {
  const navigate = useNavigate();
  const toggleStarredService = useApi(API_URLS.toggleStarredMails);

  const toggleStarredMails = () => {
    toggleStarredService.call({ id: email._id, value: !email.starred });
    setRefereshScreen(prevstate => !prevstate);
  };

  const onValueChange = () => {
    if (selectedEmails.includes(email._id)) {
      setSelectedEmails(prevstate => prevstate.filter(id => id !== email._id));
    } else {
      setSelectedEmails(prevstate => [...prevstate, email._id]);
    }
  };

  return (
    <Wrapper>
      <Checkbox
        size="small"
        checked={selectedEmails.includes(email._id)}
        onClick={onValueChange}
      />
      {email.starred ? (
        <Star fontSize="small" style={{ marginRight: 10, color: '#FFF200' }} onClick={toggleStarredMails} />
      ) : (
        <StarBorder fontSize="small" style={{ marginRight: 10 }} onClick={toggleStarredMails} />
      )}
      <Box onClick={() => navigate(routes.view.path, { state: { email: email } })}>
        <Typography style={{ width: 200, overflow: 'hidden' }}>{email.name}</Typography>
        <Indicator>Inbox</Indicator>
        <Typography>{email.subject} {email.body && '-'} {email.body}</Typography>
        <Data>
          {new Date(email.date).getDate()}&nbsp;
          {new Date(email.date).toLocaleDateString('default', { month: 'long' })}
        </Data>
      </Box>
    </Wrapper>
  );
};

export default Email;
