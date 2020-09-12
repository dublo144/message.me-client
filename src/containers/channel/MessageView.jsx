import React from 'react';
import { useChannelState } from '../../contexts/ChannelContext';
import {
  PageHeader,
  Tooltip,
  Button,
  Comment,
  List,
  Divider,
  message,
  Modal,
  Row
} from 'antd';
import moment from 'moment';
import { UserAddOutlined, DeleteOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { queries } from '../../helpers/graphqlQueries';
import { useAuthState } from '../../contexts/AuthContext';

const MessageView = () => {
  const { selectedChannel, subscribeToMore } = useChannelState();
  const userId = useAuthState();
  const isAdmin = selectedChannel?.admins?.filter((a) => a.id === userId);

  React.useEffect(() => {
    subscribeToMore({
      document: queries.MESSAGE_SUBSCRIPTION,
      variables: { channelId: selectedChannel.id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newMessage = subscriptionData.data.message;
        dispatch({
          type: 'NEW_MESSAGE',
          payload: {
            newMessage
          }
        });
      }
    });
  }, []);

  const [deleteChannel] = useMutation(queries.DELETE_CHANNEL, {
    onCompleted: (data) => {
      message.success(`${data.deleteChannel.name} deleted`);
      dispatch({
        type: 'DELETE_CHANNEL_SUCCESS',
        payload: {
          channelId: data.deleteChannel.id
        }
      });
    },
    onError: (error) => {
      message.error(error);
    }
  });

  const confirmDelete = () => {
    Modal.confirm({
      title: 'Are you sure you want to delete this channel?',
      content:
        'This will delete the channel and all messages in the channel, and cannot be undone.',
      okText: 'Yes, I know what i am doing',
      okType: 'danger',
      onOk() {
        deleteChannel({ variables: { channelId: selectedChannel.id } });
      }
    });
  };

  return (
    <>
      <PageHeader
        className='message-view-header'
        title={`# ${selectedChannel.name}`}
        subTitle={selectedChannel.description}
        avatar={{ src: `${selectedChannel.avatar}` }}
        extra={[
          <Tooltip title={'Add user to channel'} key={'addUserBtn'}>
            <Button shape='circle-outline' icon={<UserAddOutlined />} />
          </Tooltip>,
          isAdmin && (
            <Tooltip title={'Delete channel'} key={'deleteChannelBtn'}>
              <Button
                danger
                shape='circle-outline'
                icon={<DeleteOutlined />}
                onClick={confirmDelete}
              />
            </Tooltip>
          )
        ]}
      />
      <List
        className={'message-list'}
        itemLayout='horizontal'
        dataSource={selectedChannel.messages}
        renderItem={(item) => (
          <li>
            <Comment
              actions={item.actions}
              author={item.user.username}
              avatar={
                'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
              }
              content={item.content}
              datetime={moment(item.datetime).fromNow()}
            />
            <Divider />
          </li>
        )}
      />
    </>
  );
};

export default MessageView;
