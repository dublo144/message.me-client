import { useQuery } from '@apollo/client';
import { InfoOutlined, StarBorderOutlined } from '@material-ui/icons';
import React from 'react';
import { useParams } from 'react-router-dom';
import { queries } from '../../helpers/graphqlQueries';
import './Channel.less';

const Channel = () => {
  const { channelId } = useParams();

  const { data, loading } = useQuery(queries.CHANNEL_DETAILS, {
    variables: {
      input: channelId
    }
  });

  return (
    !loading && (
      <div className={'channel'}>
        <div className='channel__header'>
          <div className='channel__headerLeft'>
            <h4 className='channel__channelName'>
              <strong># {data.channelDetails.name}</strong>
              <StarBorderOutlined />
            </h4>
          </div>
          <div className='channel__headerRight'>
            <p>
              <InfoOutlined /> Details
            </p>
          </div>
        </div>
        <div className='channel__messages'>{/* Add messages */}</div>
      </div>
    )
  );
};

export default Channel;
