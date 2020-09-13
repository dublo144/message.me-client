import React from 'react';
import './MessageInput.less';
import {
  Fab,
  IconButton,
  InputAdornment,
  TextField,
  Typography
} from '@material-ui/core';
import { Send } from '@material-ui/icons';
import { queries } from '../../../helpers/graphqlQueries';
import { useMutation } from '@apollo/client';

const MessageInput = ({ channelName, channelId }) => {
  const [content, setContent] = React.useState();

  const [message] = useMutation(queries.MESSAGE);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(channelId);
    if (content) {
      message({ variables: { channelId, content } });
      setContent();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) handleSubmit(e);
  };

  return (
    <div className={'messageInput'}>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          multiline
          rowsMax={4}
          rows={3}
          variant='outlined'
          label={`Message ${channelName}...`}
          helperText='Enter to send, shift + enter for new line'
          value={content}
          onKeyDown={handleKeyDown}
          onChange={(e) => setContent(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <Fab
                  size={'small'}
                  color='primary'
                  type='submit'
                  aria-label='send'
                  disabled={!content}
                >
                  <Send />
                </Fab>
              </InputAdornment>
            )
          }}
        />
      </form>
      <Typography />
    </div>
  );
};

export default MessageInput;
