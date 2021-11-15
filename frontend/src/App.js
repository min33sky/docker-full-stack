import logo from './logo.svg';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [lists, setLists] = useState([]);
  const [value, setValue] = useState('');

  useEffect(() => {
    axios.get('/api/values').then((response) => {
      console.log('response: ', response.data);
      setLists(response.data);
    });
  }, []);

  const changeHandler = (e) => {
    setValue(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post('/api/value', {
        value,
      })
      .then((response) => {
        if (response.data.success) {
          // 성공
          console.log('response', response.data);
          setLists([...lists, response.data]);
          setValue('');
        } else {
          alert('값을 DB에 넣는데 실패했습니다.');
        }
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <div className="container">
          {lists && lists.map((list, idx) => <li key={idx}>{list.value}</li>)}

          <form className="example" onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="입력해주세요..."
              onChange={changeHandler}
              value={value}
            />
            <button type="submit">확인</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
