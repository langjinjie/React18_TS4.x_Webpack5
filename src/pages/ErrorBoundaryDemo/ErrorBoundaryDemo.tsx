import React, { useEffect, useState } from 'react';

const ErrorBoundaryDemo: React.FC = () => {
  const [rest, setRest] = useState<any>({ amount: 0 });

  const getRest = () => {
    setTimeout(() => {
      setRest({ amount: 1000000 });
    }, 5000);
  };

  useEffect(() => {
    getRest();
  }, []);
  return (
    <div>
      <strong>余额：</strong>
      <span className='highlight'>{rest.amount}元</span>
    </div>
  );
};
export default ErrorBoundaryDemo;
