import { useFetch } from 'src/utils/useHook';

// 封装自己的ajax
function ajax(type: string, url: string) {
  return new Promise(resolve => {
    // xhr
    const xhr = new XMLHttpRequest();
    // 先open再设置响应头
    xhr.open(type, `http://127.0.0.1:3000 ${url}`);
    // 设置响应头

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        resolve(xhr.responseText);
      }
    };
    xhr.send();
  });
}

const ListComponent = () => {
  const [data, loading, getList] = useFetch<any, any>(
    () => ajax('GET', '/test'),
    {},
    () => console.log('完成请求了')
  );
  return (
    <div style={{ marginBottom: '20px' }}>
      {loading ? '请求中...' : '请求完成'}
      <div>结果:{data}</div>
      <button onClick={() => getList()}>重新请求</button>
    </div>
  );
};
export default ListComponent;
