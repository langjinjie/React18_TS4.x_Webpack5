import React, { useState, useEffect } from 'react';

export default function EventBind() {
  const [isShowText, setIsShowText] = useState(false);

  const handleShowText = (e: React.MouseEvent) => {
    // 阻止冒泡
    e.stopPropagation(); // v16无效
    // e.nativeEvent.stopImmediatePropagation() // 阻止监听同一事件的其他事件监听器被调用
    setIsShowText(() => true);
  };

  useEffect(() => {
    document.addEventListener('click', () => {
      setIsShowText(() => false);
    });
  }, []);

  return (
    <div className='App'>
      <button onClick={handleShowText}>事件委托变更</button>

      {isShowText && <div>展示文字</div>}
    </div>
  );
}
