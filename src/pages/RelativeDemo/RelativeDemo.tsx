import React from 'react';
import { useNavigate } from 'react-router-dom-v6';

const RelativeDemo: React.FC = () => {
  const navigate = useNavigate();
  return (
    <form
      onSubmit={() => {
        // let newRecord = await saveDataFromForm(event.target);
        // you can build up the URL yourself
        // navigate(`/stuff/${newRecord.id}`);
        // // or navigate relative, just like Link
        // navigate(`${newRecord.id}`);
        navigate('/');
      }}
    >
      <table>
        <thead>
          <td>
            <tr>123</tr>
          </td>
        </thead>
        <tbody></tbody>
      </table>
      <button type='submit'>提交</button>
    </form>
  );
};
export default RelativeDemo;
