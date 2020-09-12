import React from 'react';
import { useAuthState, useAuthDispatch } from '../../../contexts/AuthContext';
import {
  Row,
  Col,
  Tooltip,
  Button,
  Avatar,
  Typography,
  Divider,
  Dropdown,
  Menu
} from 'antd';
import {
  SettingFilled,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined
} from '@ant-design/icons';

const UserInformation = () => {
  const { username, firstname, lastname, email } = useAuthState();
  const dispatch = useAuthDispatch();

  const dropdownMenu = (
    <Menu>
      <Menu.Item key={'profile'} icon={<UserOutlined />}>
        My Profile
      </Menu.Item>
      <Menu.Item key={'settings'} icon={<SettingOutlined />}>
        Settings
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        key={'signOut'}
        icon={<LogoutOutlined />}
        onClick={() => dispatch({ type: 'SIGN_OUT' })}
      >
        Sign out
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <Row style={{ padding: 12 }}>
        <Col>
          <Dropdown overlay={dropdownMenu}>
            <Button shape={'circle-outline'} icon={<SettingFilled />} />
          </Dropdown>
        </Col>
      </Row>
      <Row justify={'center'} className={'margin-bottom'}>
        <Col>
          <Avatar
            className={'user-avatar'}
            size={142}
            icon={<UserOutlined />}
          />
        </Col>
      </Row>
      <Row justify={'center'}>
        <Col>
          <Typography.Title
            level={3}
          >{`${firstname} ${lastname}`}</Typography.Title>
        </Col>
      </Row>
      <Row justify={'center'}>
        <Col>{email}</Col>
      </Row>
      <Divider />
    </>
  );
};

export default UserInformation;
