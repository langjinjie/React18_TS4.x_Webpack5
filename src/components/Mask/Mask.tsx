// import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import style from './style.module.less';

const maskRoot: Element = document.getElementById('mask-root') as Element;

const Mask: React.FC<any> = ({ children }) => {
  // const [el] = useState(document.createElement('div'));

  // useEffect(() => {
  //   maskRoot?.appendChild(el);
  //   return () => {
  //     maskRoot?.removeChild(el);
  //   };
  // }, []);
  return createPortal(<div className={style.modal}>{children}</div>, maskRoot);
};

export default Mask;
