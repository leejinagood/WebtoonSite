// import React, { Component } from "react";
// import Link from 'next/link';

// class DayToonItem extends Component {
//   static defaultProps = {
//     week: '월',
//     writer: '작가',
//     star: 9.9
//   }

//   state = {
//     title: ''
//   }

//   componentDidMount() {
//     fetch("/api/daywebtoon?day=Mon") 
//       .then((response) => response.json())
//       .then((data) => {
//         const { webtoons } = data;
//         if (webtoons.length > 0) {
//           this.setState({ title: webtoons[0] });
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching API:", error);
//       });
//   }

//   render() {
//     const { title, week, writer, star } = this.props;

//     return (
//       <div className="DayToonItem">
//         <img src="1.jpg" alt="ss" />
//         <p className="ToonTitle">{this.state.title || title}</p>
//         <p className="Writer">{writer}</p>
//         <p className="Star">⭐️{star}</p>
//       </div>
//     );
//   }
// }

// export default DayToonItem;
