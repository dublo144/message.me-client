import React from 'react';
import { useLazyQuery } from '@apollo/client';
import { queries } from '../../helpers/graphqlQueries';
import { Select, Spin, Option } from 'antd';

const UserAutoSearch = (props) => {
  const [users, setUsers] = React.useState([]);

  const [userSearch, { loading: searchLoading }] = useLazyQuery(
    queries.USER_SEARCH,
    {
      fetchPolicy: 'network-only',
      onCompleted: (data) => {
        const mappedUsers = data.users.map((user) => ({
          text: `${user.firstName} ${user.lastName} (${user.email})`,
          value: user.email
        }));
        setUsers(mappedUsers);
      }
      // Add on error
    }
  );

  const search = (email) => {
    userSearch({ variables: { email } });
  };

  const onChange = (value) => {
    props.setSelectedMembers(value);
  };

  return (
    <Select
      mode={'multiple'}
      value={props.selectedMembers}
      notFoundContent={searchLoading ? <Spin size={'small'} /> : null}
      onSearch={search}
      onChange={onChange}
    >
      {users.map((d) => (
        <Select.Option key={d.value}>{d.text}</Select.Option>
      ))}
    </Select>
  );
};

export default UserAutoSearch;
