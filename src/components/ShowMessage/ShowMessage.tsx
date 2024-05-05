import { MutableRefObject, createRef } from 'react';
// 引入react-dom
import { createRoot } from 'react-dom/client';
import { Notifications } from './Notification';
// 创建一个容器来加载message
const el = document.createElement('div');
el.style.position = 'fixed';
el.style.top = '10px';
el.style.zIndex = '999';
el.style.left = '50%';
el.style.transform = 'translateX(-40%)';

// 将这个el挂载到body的最后一个元素
document.body.appendChild(el);

const root = createRoot(el);

// 创建一个 Ref
const notificationRef: MutableRefObject<any> = createRef();

// 渲染jsx组件
root.render(<Notifications ref={notificationRef} />);

export default function ShowMessage(content: string) {
  // 创建一个
  notificationRef.current.notify(content);
}
