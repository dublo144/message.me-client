import React from 'react';
import './Header.less';
import { Avatar } from '@material-ui/core';
import { AccessTime, HelpOutline, Search } from '@material-ui/icons';

const Header = () => {
  return (
    <div className={'header'}>
      <div className='header__left'>
        <AccessTime />
      </div>
      <div className='div header__search'>
        <Search />
        <input placeholder={'Input'} />
      </div>
      <div className='header__right'>
        <HelpOutline />
      </div>
    </div>
  );
};

export default Header;
