import React, { useEffect, useState } from "react";
import style from "./AdminList.module.css";
import AdminListItem from "./AdminListItem";
import { parseCookies ,destroyCookie} from 'nookies'; // nookies 라이브러리 import
import jwt_decode from 'jwt-decode'; // JWT 토큰을 디코딩하기 위한 라이브러리

const AdminList = ({EnName ,id}) => {
  const [webtoonInfo, setWebtoonInfo] = useState({});
  const [webtoons] = useState([]);
  const [loading, setLoading] = useState(true);

  const [ascSort, setAscSort] = useState(false); // 오름차순 여부
  const [descSort, setDescSort] = useState(false); // 내림차순 여부

  const [ep ,setEp]=useState([]);
  //리스트아이템 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/listinfo?ID=${id}`, {
          cache: 'no-store', // 캐시 사용 안 함
        });
        const { webtoonData } = await response.json(); // 데이터를 가져와서 변수에 저장
        setWebtoonInfo(webtoonData[0]);
        setLoading(false);
        console.log(webtoonData);
        console.log(webtoonInfo);

      } catch (error) {
        console.error("Error fetching API:", error);
        setLoading(false);
      }
    };

    if (EnName) {
      fetchData();
    } else {
      setWebtoonInfo(null);
      setLoading(false);
    }
  }, [EnName]);
  const [webtoonItem, setWebtoonItem] = useState([]);

  // 리스트 아이템을 받아오는 useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/listitem?ID=${id}`);
        const { webtoonData } = await response.json();
        setWebtoonItem(webtoonData.reverse());

        console.log(webtoonData[0]);
        
        console.log(webtoonItem);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching API:", error);
        setLoading(false);
      }
    };

    if (EnName) {
      fetchData();
    } else {
      setWebtoonItem(null);
    }
  }, [EnName]);

  const [like , setLike] =useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/likecount?id=${id}`);
        const data = await response.json(); // JSON 데이터를 받아옵니다.
        setLike(data.likecount);
        console.log(like);
        console.log(data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching API:", error);
        setLoading(false);
      }
    };

    if (EnName) {
      fetchData();
    } else {
      setWebtoonItem(null);
    }
  }, [EnName]);

  if (loading) {
    return <div>Loading...</div>;
  }
  let token;
  const handleLike = async () => {
    const cookies = parseCookies();
    token = cookies.token; // 쿠키에서 토큰 값을 'token' 변수에 할당합니다.



    if(token){
      const decodedToken = jwt_decode(token);
      console.log(decodedToken);
      console.log(decodedToken.UserID,EnName);
      try {
        // 좋아요 요청을 서버에 보냅니다.
        console.log(decodedToken.UserID,EnName);

        const response = await fetch("/api/update_like", {
          method: "PUT", // PUT 메서드로 변경
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            EnName: EnName,
            userID: decodedToken.UserID, // userEmail 변수를 사용
          }),

        });


              
        if (response.ok) {
          // 서버로부터 좋아요 갯수를 다시 받아와서 업데이트합니다.
          const likeResponse = await fetch(`/api/likecount?id=${id}`);
          const data = await likeResponse.json();
          setLike(data.likecount);
          console.log(like);
        }
      } 
      catch (error) {
        console.error("좋아요 추가 오류:", error);
      }

    }
    else{
      window.alert("로그인 후 이용 가능");
    }
}
  if (loading) {
    return <div>Loading...</div>;
  }


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEpChange = (ep) => {
    setEp(ep);
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  const handleEpisodeAdd = async () => {
    
    const errors = []; // 오류 메시지를 저장할 배열입니다.
  
    // 사용자 입력값을 검증합니다.
  
    // 다음 회차를 자동으로 설정합니다.
    const nextEpisode = webtoonItem.length > 0 ? webtoonItem[0].episodeNumber + 1 : 1;
  
    const episode = nextEpisode;
  
  
    // 사용자에게 썸네일 경로를 입력하도록 안내합니다.
    const thumbnailPath = prompt("썸네일 경로를 입력해주세요:", "");
    const count = prompt("에피소드 컷수를 입력해주세요:", "");
  
    // 썸네일 경로를 검증합니다.
    if (!thumbnailPath) {
      errors.push("썸네일 경로를 입력해주세요");
    }
  
    // 오류가 있다면 오류 메시지를 표시합니다.
    if (errors.length > 0) {
      window.alert(errors.join("\n"));
      console.error("오류:", errors);
      return; // 오류 발생 시 함수 종료
    }
    console.log(EnName,count,thumbnailPath,episode);
    try {
      // 에피소드를 추가하기 위해 POST 요청을 보냅니다.
      const response = await fetch("/api/episodeAdd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          WebtoonEnName: EnName,
          count: count,
          thumbnail: thumbnailPath,
          ep: episode,
        }),
      });
  
      if (response.ok) {
        console.log("에피소드가 성공적으로 추가되었습니다");
        window.alert("에피소드가 성공적으로 추가되었습니다");
        // 에피소드 추가 성공 후 필요한 동작을 수행합니다.
      } else {
        console.error("에피소드 추가에 실패했습니다");
        window.alert("에피소드 추가에 실패했습니다");
        // 에피소드 추가 실패 시 처리합니다.
      }
    } catch (error) {
      console.error("API 호출 오류:", error);
      // 오류 처리
    }
  };
  

  const webtoonsPerPage = 8;
  const totalWebtoons = webtoons.length;


 

  // 내림차순 정렬 버튼을 클릭했을 때
  const handleAscSort = () => {
    if (!ascSort) {
      setAscSort(true);
      setDescSort(false);
      // webtoonItem을 오름차순으로 정렬
      setWebtoonItem((prevItems) =>
        prevItems.slice().sort((a, b) => a.episodeNumber - b.episodeNumber)
      );
    }
  };

  // 내림차순 정렬 버튼을 클릭했을 때
  const handleDescSort = () => {
    if (!descSort) {
      setDescSort(true);
      setAscSort(false);
      // webtoonItem을 내림차순으로 정렬
      setWebtoonItem((prevItems) =>
        prevItems.slice().sort((a, b) => b.episodeNumber - a.episodeNumber)
      );
    }
  };

  let KrDay = "";
  if (webtoonInfo && webtoonInfo.webtoonWeek) {
  if(webtoonInfo.webtoonWeek === "mon"){
    KrDay = "월";
  }else if(webtoonInfo.webtoonWeek === "tues"){
    KrDay = "화";
  }else if(webtoonInfo.webtoonWeek === "wendes"){
    KrDay = "수";
  }else if(webtoonInfo.webtoonWeek === "thurs"){
    KrDay = "목";
  }else if(webtoonInfo.webtoonWeek === "fri"){
    KrDay = "금";
  }else if(webtoonInfo.webtoonWeek === "satur"){
    KrDay = "토";
  }else if(webtoonInfo.webtoonWeek === "sun"){
    KrDay = "일";
  }else {
    // 웹툰 정보가 없거나 요일 정보가 없는 경우
    KrDay = "요일 정보 없음";
  }
  }
  



  const handleDelete = async (episodeNumber) => {
    // episodeNumber를 이용하여 에피소드 삭제 처리를 구현

    try {
      const response = await fetch("/api/episodeDelete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          EnName: EnName, // 웹툰 아이디 전달
          ep: episodeNumber, // 삭제할 에피소드 번호 전달
        }),
      });

      if (response.ok) {
        console.log("에피소드 삭제 성공");
        window.alert("에피소드가 삭제되었습니다.");
        // 에피소드 삭제 성공 후 필요한 동작 수행
      } else {
        console.error("에피소드 삭제 실패");
        window.alert("없는 웹툰 에피소드 입니다");
        // 에피소드 삭제 실패 처리
      }
    } catch (error) {
      console.error("API 호출 오류:", error);
      // 오류 처리
    }
  };

  return (
    <div className={style.ListPage}>


      <div className={style.ListInfoBox}>
        {webtoonInfo && (
          <div className={style.ListInfo}>
            <div className={style.ListImgBox}>
              <img
                src={webtoonInfo.webtoonThumbnail}
                alt={webtoonInfo.webtoonName}
              />
            </div>
            
            <div className={style.ListInfot}>
              <div className={style.TextBox}>
                <>
                  <p id="line" className={style.tab2}>
                    {webtoonInfo.webtoonName}
                  </p>
                  <p id={style.line} className={style.GrayP}>
                  글/그림<span>{webtoonInfo.webtoonAuthor}</span> | {KrDay}요웹툰

                    </p>
                    <p className={style.ConTent}>
                    {webtoonInfo.webtoonContent}
                    </p>

                </>
                
              </div>

                    <div className={style.InfoBtn}>
                      <button id={style.PointBtn} className={style.IBtn} onClick={handleLike}> 
                        좋아요 {like}
                      </button>
                      <button className={style.IBtn}>첫화보기 1화</button>
                      <button className={style.SNSBTN}>공유<a className={style.short}>하기</a></button>
                    </div>
            </div>
          </div>
        )}
        
      </div>
      {!webtoonItem ? (
  <div>Loading...</div>
) : (
  
  <>
  <div className={style.DESC}>
      <span onClick={handleDescSort}>오름차순 /</span><span onClick={handleAscSort}> 내림차순</span>
    </div>
  <div className={style.ListBox}>
  <button className={style.handleEpisodeAdd} onClick={handleEpisodeAdd}>에피소드추가</button>

    <ul className={style.List}>
      {webtoonInfo && Array.from({ length: webtoonInfo.episodeCount }).map((_, index) => (
        <li key={index}>

          <AdminListItem
            ID={id}
            EnName={EnName}
            thumbnail = {webtoonItem[index]?.episodeThumbnail}
            webtoonName={webtoonItem[index]?.webtoonName}
            ep={webtoonItem[index]?.episodeNumber}
            uploadDate={webtoonItem[index]?.uploadDate}
            handleClick={handleEpChange}
            handleDelete={() => handleDelete(webtoonItem[index]?.episodeNumber)} // 삭제 버튼 클릭 처리

          />
            
        </li>
      ))}
    </ul>
    </div>
  </>
)}



      <div className={style.dn}></div>
    </div>
  );
};

export default AdminList;
