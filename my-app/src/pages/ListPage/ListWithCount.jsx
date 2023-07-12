// import React, { useEffect, useState } from "react";
// import ListItem from "./ListItem";

// const ListWithCount = ({ webtoonName }) => {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     // 웹툰 정보를 가져오는 비동기 작업 등을 수행하여 count 값을 설정
//     fetch(`/api/webtoondetail?name=${encodeURIComponent(webtoonName)}`)
//       .then((response) => response.json())
//       .then((data) => {
//         const { count } = data;
//         setCount(count);
//       })
//       .catch((error) => {
//         console.error("Error fetching API:", error);
//       });
//   }, [webtoonName]);

//   // 카운트에 따라 리스트 아이템 생성
//   const renderListItems = () => {
//     const items = [];
//     for (let i = 0; i < count; i++) {
//       items.push(<ListItem key={i} webtoonName={webtoonName} />);
//     }
//     return items;
//   };

//   return <div>{renderListItems()}</div>;
// };

// export default ListWithCount;
