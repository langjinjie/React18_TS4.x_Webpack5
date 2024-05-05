/**
 * 这里需要设计两个组件，一个是通知列表组件（Notifications），一个是单个通知组件（NotificationItem）。通知列表组件主要是管理通知列表和动画管理，而单个通知组件主要是渲染通知和移除控制，两个组件设计如下：
 */

import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  ReactElement,
  useRef
} from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

interface INotificationItem {
  content: string;
  onRemove: () => void;
}

/**
 * @NotificationItem 单通知组件
 * @returns
 */
export const NotificationItem: React.FC<INotificationItem> = ({ content, onRemove }) => {
  // 如果鼠标在通知上,则不会进行消除
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    let timerId: NodeJS.Timer;
    // 如果鼠标在通知上,则不会进行消除
    if (!isHover) {
      timerId = setTimeout(() => {
        // 移除当前
        onRemove();
      }, 30000);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, []);

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      style={{
        background: 'white',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
        padding: '10px',
        marginBottom: '10px',
        color: 'black'
      }}
    >
      {content}
    </div>
  );
};

// 使用forwardRef能够自动接收ref
export const Notifications: React.FC<any> = forwardRef((_, ref) => {
  // 通知列表
  const [list, setList] = useState<ReactElement[]>([]);

  // 通知自增 key
  const incrementKeyRef = useRef(0);

  // 暴露当前组件的一些方法
  useImperativeHandle(ref, () => ({
    // 暴露出一个notify方法
    notify(content: string) {
      // 自增 key
      const key = incrementKeyRef.current++;
      setList(list => {
        // 动画使用的是 React Transition Group
        const noti = (
          <CSSTransition key={key} timeout={300} classNames='message' className='message'>
            <NotificationItem
              onRemove={() => {
                // 移除通知
                setList(list => {
                  return list.filter(item => item.key !== key.toString());
                });
              }}
              content={content}
            />
          </CSSTransition>
        );
        const newList = [...list, noti];
        return newList;
      });
    }
  }));

  return <TransitionGroup>{list}</TransitionGroup>;
});
