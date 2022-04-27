import React, { PropsWithChildren } from 'react';
import s from './Header.module.css';
// import { getStaticPath } from '../../utils/getStaticPath';

export const Header = ({ children }: PropsWithChildren<any>) => (
  <header className={s.header}>
    <div className={s.logo}>
      <img
        src={
          'https://res.cloudinary.com/dengcb3ex/image/upload/v1640003550/mystash-app/Layer_1_w4r2kd.png'
        }
        alt="MyStash Dashboard"
      />
      Bull Dashboard
    </div>
    {children}
  </header>
);
