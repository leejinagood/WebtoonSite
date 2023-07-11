// TestItem.jsx
import React from 'react';

const TestItem = ({ data }) => {
  const styleInfo = {
    paddingRight: '10px'
  };

  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>
        <div>
            <ul>
                <li>
                <span style={styleInfo}>{item.name}</span>
                <span style={styleInfo}>{item.age}</span>
                <span style={styleInfo}>{item.country}</span>
                </li>
            </ul>
            <div>

            </div>
          </div>
        </div>
        
      ))}

      <div><h1>ss</h1></div>
    </div>
  );
}

export default TestItem;
