import React, { useState, useEffect } from "react";
import NewToonCss from "../styles/NewToonCss.css";

const NewToon = () => {
  const [result, setResult] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/new`);
        const data = await response.json();
        setResult(data.result);
        console.log(data.result);
      } catch (error) {
        console.error("Error fetching API:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="NewToon">
      <div className="slider">
        {result.map((title, index) => (
          <div className="NewToonInfo" key={index}>
            <img src={`${index + 1}.jpg`} alt="" />
            <h3 className="NewToonTitle">{title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewToon;
