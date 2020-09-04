import React from 'react';
import { Form, Input, Avatar, Comment } from 'antd';
import { useChannelState } from '../../contexts/ChannelContext';
import { useMutation } from '@apollo/client';
import { queries } from '../../helpers/graphqlQueries';

const Editor = () => {
  const [content, setContent] = React.useState();

  const [message] = useMutation(queries.MESSAGE);

  const {
    selectedChannel: { id, name }
  } = useChannelState();

  const handleKeyPress = (e) => {
    if (e.which && e.shiftKey) {
    } else if (e.which === 13) {
      e.preventDefault();
      message({ variables: { channelId: id, content } });
      setContent();
    }
  };

  return (
    <Comment
      avatar={
        <Avatar
          src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
          alt='Han Solo'
        />
      }
      content={
        <Form.Item extra='Enter to send message. Shift + Enter for new line.'>
          <Input.TextArea
            placeholder={`message ${name}...`}
            autoSize={{ minRows: 4, maxRows: 8 }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </Form.Item>
      }
    />
  );
};

export default Editor;
