import { useQuery } from '@apollo/client';
import { InfoOutlined, StarBorderOutlined } from '@material-ui/icons';
import React from 'react';
import { useParams } from 'react-router-dom';
import MessageInput from '../../components/channel/messageInput/MessageInput';
import Message from '../../components/message/Message';
import {
  useChannelDispatch,
  useChannelState
} from '../../contexts/ChannelContext';
import { queries } from '../../helpers/graphqlQueries';
import './Channel.less';

const Channel = () => {
  const { channelId } = useParams();
  const { selectedChannel } = useChannelState();
  const dispatch = useChannelDispatch();

  const { loading, subscribeToMore } = useQuery(queries.CHANNEL_DETAILS, {
    variables: {
      input: channelId
    },
    fetchPolicy: 'network-only',
    onCompleted: (data) =>
      dispatch({
        type: 'SELECT_CHANNEL_SUCCESS',
        payload: {
          selectedChannel: data.channelDetails,
          subscribeToMore
        }
      }),
    onError: (error) =>
      dispatch({
        type: 'SELECT_CHANNEL_ERROR',
        payload: {
          error
        }
      })
  });

  React.useEffect(() => {
    subscribeToMore({
      document: queries.MESSAGE_SUBSCRIPTION,
      variables: { channelId },
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

  return (
    !loading && (
      <div className={'channel'}>
        <div className='channel__header'>
          <div className='channel__headerLeft'>
            <h4 className='channel__channelName'>
              <strong># {selectedChannel?.name}</strong>
              <StarBorderOutlined />
            </h4>
          </div>
          <div className='channel__headerRight'>
            <p>
              <InfoOutlined /> Details
            </p>
          </div>
        </div>
        <div className='channel__messages'>
          {selectedChannel?.messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
        </div>
        <MessageInput
          channelName={selectedChannel?.name}
          channelId={selectedChannel?.id}
        />
      </div>
    )
  );
};

export default Channel;
