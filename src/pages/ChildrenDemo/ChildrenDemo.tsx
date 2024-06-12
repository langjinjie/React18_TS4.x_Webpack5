import React from 'react';

const ChildrenDemo: React.FC<any> = ({ children }) => {
  console.log(children);
  console.log(React.Children.map(children, child => child));
  return (
    <div>
      <span>
        1<span>1-1</span>
        <span>1-2</span>
        <span>1-3</span>
      </span>
      <span>
        2<span>2-1</span>
        <span>2-2</span>
        <span>2-3</span>
      </span>
      <span>
        3<span>3-1</span>
        <span>3-2</span>
        <span>3-3</span>
      </span>
    </div>
  );
};
export default ChildrenDemo;
