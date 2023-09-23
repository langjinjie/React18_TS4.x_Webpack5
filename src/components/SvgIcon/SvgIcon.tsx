// import React from 'react'
// import style from './style.module.less'

interface ISvgIconProps {
  name: string
}

const SvgIcon: React.FC<ISvgIconProps> = ({ name }) => (
  <svg className={'icon'} aria-hidden='true'>
    <use xlinkHref={`#${name}`}></use>
  </svg>
);
export default SvgIcon;
