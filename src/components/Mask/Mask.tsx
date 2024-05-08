import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import style from './style.module.less';

const maskRoot = document.getElementById('mask-root');

const Mask: React.FC<any> = ({ children }) => {
  const [el] = useState(document.createElement('div'));

  useEffect(() => {
    maskRoot?.appendChild(el);
    return () => {
      maskRoot?.removeChild(el);
    };
  }, []);
  return createPortal(<div className={style.modal}>{children}</div>, el);
};

export default Mask;
