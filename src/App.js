import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [responseData, setResponseData] = useState(null);
  const [errorData, setErrorData] = useState(null);
  const [flag, setFlag] = useState(0);

  // API 호출 함수
  const callTestAPI = () => {
    axios.get('http://13.209.198.1:8080/temp/test')
	    .then(response => {
	      setResponseData(response.data);
	    })
	    .catch(error => {
		    console.error(error);  // 오류 상세 출력
	      setErrorData(error.response ? error.response.data : '알 수 없는 오류');
	    });
	};
  const callExceptionAPI = () => {
    axios.get(`http://13.209.198.1:8080/temp/exception?flag=${flag}`)
      .then(response => {
	      setResponseData(response.data);
	    })
	    .catch(error => {
		    console.error(error);  // 오류 상세 출력
	      setErrorData(error.response ? error.response.data : '알 수 없는 오류');
	    });
	};

  return (
    <div className="App">
      <h1>Spring Boot API 호출</h1>

      <button onClick={callTestAPI}>Test API 호출</button>
      <button onClick={callExceptionAPI}>Exception API 호출</button>

      <div>
        <h2>응답 데이터</h2>
        {responseData && <pre>{JSON.stringify(responseData, null, 2)}</pre>}
      </div>

      <div>
        <h2>에러 데이터</h2>
        {errorData && <pre>{JSON.stringify(errorData, null, 2)}</pre>}
      </div>

      <div>
        <input
          type="number"
          value={flag}
          onChange={(e) => setFlag(e.target.value)}
          placeholder="Flag 값 입력"
        />
      </div>
    </div>
  );
}

export default App;