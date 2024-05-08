import React, { useState } from 'react';
import { Mask } from 'src/components';
import style from './style.module.less';

const PortalsDemo: React.FC = () => {
  const [showMask, setShowMask] = useState(false);

  return (
    <div className={style.wrap}>
      {showMask && (
        <Mask>
          <div>test</div>
          <button onClick={() => setShowMask(false)}>hidden</button>
        </Mask>
      )}

      <button onClick={() => setShowMask(true)}>showMask</button>
    </div>
  );
};
export default PortalsDemo;
