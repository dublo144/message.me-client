import React from 'react';
import { Tooltip, Button, Input, Form, Modal } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import UserAutoSearch from '../helpers/UserAutoSearch';
import { useLazyQuery, useMutation } from '@apollo/client';
import { queries } from '../../helpers/graphqlQueries';
import { useChannelDispatch } from '../../contexts/ChannelContext';

const NewChannelModal = () => {
  const [visible, setVisible] = React.useState(false);
  const [selectedMembers, setSelectedMembers] = React.useState([]);
  const dispatch = useChannelDispatch();

  const [createChannel, { loading: createChannelLoading }] = useMutation(
    queries.CREATE_CHANNEL,
    {
      onCompleted: (data) =>
        dispatch({
          type: 'CREATE_CHANNEL_SUCCESS',
          payload: {
            createdChannel: data.createChannel
          }
        })
    }
  );

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 }
    }
  };

  const handleSubmit = (values) => {
    createChannel({
      variables: { input: { ...values, members: selectedMembers } }
    });
  };

  return (
    <>
      <Tooltip title={'New channel'} placement={'right'}>
        <Button
          icon={<PlusCircleOutlined />}
          style={{ width: '100%' }}
          type={'dashed'}
          onClick={() => setVisible(true)}
        />
      </Tooltip>
      <Modal
        visible={visible}
        title='New Channel'
        onCancel={() => setVisible(false)}
        footer={[
          <Button key='back' onClick={() => setVisible(false)}>
            Cancel
          </Button>,
          <Button
            key='submit'
            type='primary'
            htmlType='submit'
            form='newChannelForm'
            onClick={() => setVisible(false)}
            loading={createChannelLoading}
          >
            Create channel
          </Button>
        ]}
      >
        <Form
          id='newChannelForm'
          name='newChannelForm'
          scrollToFirstError={true}
          {...formItemLayout}
          onFinish={handleSubmit}
        >
          <Form.Item
            name='name'
            label='Name'
            rules={[
              {
                required: true,
                message: 'Please enter a name for the channel'
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item name='description' label='Description'>
            <Input.TextArea />
          </Form.Item>

          <Form.Item name='members' label='Members'>
            <UserAutoSearch
              selectedMembers={selectedMembers}
              setSelectedMembers={setSelectedMembers}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default NewChannelModal;
