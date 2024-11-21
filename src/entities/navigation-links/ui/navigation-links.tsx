import React from 'react';

import Link from 'next/link';

import { config } from '../config';

import styles from './styles.module.css';

const { links } = config;

const NavigationLinks = () => {
  return (
    <ul>
      {links.map((item, index) => (
        <Link href={item.link} key={index} className={styles.nav_links}>
          {item.text}
        </Link>
      ))}
    </ul>
  );
};

export default NavigationLinks;
