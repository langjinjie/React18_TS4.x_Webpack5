// 自定义hook

import { useEffect, useRef, useState } from 'react';

/**
 *
 */
export function useFetch<R, P>(
  getFunction: any,
  params: P,
  callBack?: () => void,
  initRes?: R,
  execute: boolean = true
): [R, boolean, (params?: Partial<P>) => void] {
  const [res, setRes] = useState(initRes as R);
  const [fetching, setFetch] = useState(false);

  // 定义一个发送请求的函数
  // 参数也许并不是每次都完整需要 Partial<P>
  const run: (params?: Partial<P>) => void = async (params?: any) => {
    if (fetching) return;
    console.log('开始请求');
    setFetch(true);
    try {
      setRes(await getFunction(params));
      setFetch(false);
      // 请求完成的回调
      callBack?.();
    } catch (err) {
      console.error(err);
      setFetch(false);
    }
  };

  useEffect(() => {
    execute && run(params);
  }, []);

  return [res, fetching, run];
}

// custom Hook
export function usePrevious(data: any) {
  const ref = useRef();
  // useEffect会在组件渲染之后才会执行,所以这个hook,在初始化或者更新的时候,会先返回 值 再进行更新,每次每次都是拿到旧的值
  useEffect(() => {
    ref.current = data;
  }, [data]);
  return ref.current;
}
