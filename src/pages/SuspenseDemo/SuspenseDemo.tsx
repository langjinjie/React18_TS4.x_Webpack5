import React, { Suspense, useEffect } from 'react';

let data = '';
let promise: any = '';
function requestData() {
  if (data) return data;
  if (promise) throw data;
  promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      data = 'Data resolved';
      reject(data);
    }, 2000);
  });
  console.log(promise);
  throw promise;
}
function SuspenseDemo() {
  console.log('开始~');
  const data = requestData();
  useEffect(() => {
    console.log('useEffect');
  }, []);
  return <p>data: {data}</p>;
}

export default () => {
  return (
    <Suspense fallback='loading data'>
      <SuspenseDemo />
    </Suspense>
  );
};
