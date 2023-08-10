import Header from "@/src/Header/header";
import React, { useState ,useEffect} from "react";
import style from "./style/adminpageCss.module.css";
import jwt_decode from 'jwt-decode'; // JWT 토큰을 디코딩하기 위한 라이브러리
import { parseCookies ,destroyCookie} from 'nookies'; // nookies 라이브러리 import
import { useRouter } from 'next/router';

const AdminPage = () => {
  const router = useRouter();
  const [webtoonId, setWebtoonId] = useState(""); // 웹툰 아이디를 저장할 상태 변수
  const [episodeId, setEpisodeId] = useState(""); // 웹툰 아이디를 저장할 상태 변수
  const [ep, setEp] = useState(""); // 웹툰 아이디를 저장할 상태 변수

  const [selectedImage, setSelectedImage] = useState(null); // 선택된 이미지 파일을 저장
  const [selectedDay, setSelectedDay] = useState(""); // 초기 값을 빈 문자열로 설정
  const [webtoonName, setWebtoonName] = useState(""); // 웹툰 제목을 저장
  const [webtoonEnName, setWebtoonEnName] = useState(""); // 웹툰 영문 제목을 저장
  const [epEnName, setEpEnName] = useState(""); // 웹툰 영문 제목을 저장

  const [author, setAuthor] = useState(""); // 작가명을 저장
  const [content, setContent] = useState(""); // 웹툰 내용을 저장
  const [categories, setCategories] = useState([]); // 선택된 카테고리를 저장
  const [count, setCount] = useState(""); // 초기값을 0으로 설정
  const [thumbnailPath, setThumbnailPath] = useState(""); // 초기값은 빈 문자열
  const [episode, setEpisode] = useState(""); // 에피소드 입력 상태


  const [admin,setAdmin] = useState("");
  let token = "";
  

  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies.token; // 실제 JWT 토큰 쿠키 이름으로 대체해주세요
      if (token) {
        const decodedToken = jwt_decode(token);
        setAdmin(decodedToken.UserEmail);
        console.log(decodedToken.UserEmail);
        console.log(admin);
  
        if (decodedToken.UserEmail !== "qkaejwnj%40naver.com" 
        && decodedToken.UserEmail !== "mnb2098%40naver.com") {
          window.alert("접근불가");
          router.push('/'); // 다른 페이지로 리다이렉트
        }
      }
      else{
        window.alert("접근불가");
        router.push('/'); // 다른 페이지로 리다이렉트
      }
    }, []);
  



  const handleEpisodeChange = (event) => {
    const newEpisode = event.target.value;
    setEpisode(newEpisode);
  };
  const handleThumbnailChange = (event) => {
    const newPath = event.target.value;
    setThumbnailPath(newPath);
  };
  const handleCountChange = (event) => {
    const newCount = parseInt(event.target.value); // 입력된 값을 정수로 변환
    setCount(newCount);
  };
  const isAdminPage = true; // 어드민 페이지 여부를 true 또는 false로 설정


  const handleImageChange = (event) => {
    const imagePath = event.target.value;
    setSelectedImage(imagePath);
  };

  const handleDayChange = (event) => {
    const selectedDay = event.target.value;
    setSelectedDay(selectedDay);
  };

  const handleWebtoonAdd = async () => {
    const selectedGenres = Object.entries(checkboxStates)
    .filter(([genre, isChecked]) => isChecked)
    .map(([genre]) => genre);
  
    console.log(content,author,webtoonName,webtoonEnName,selectedDay,selectedImage,categories,selectedGenres)
    const data = {
      content:content,
      author:author,
      WebtoonName: webtoonName,
      WebtoonEnName: webtoonEnName,
      week: selectedDay,
      thumbnail: selectedImage, // 이미지 파일로 변경
      categories:selectedGenres,
      genres: selectedGenres, // 선택한 장르 목록

    };

    try {
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }

      const response = await fetch("/api/webtoonAdd", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("웹툰 추가 성공");
        // 웹툰 추가 성공 후 필요한 동작 수행
      } else {
        console.error("웹툰 추가 실패");
        // 웹툰 추가 실패 처리
      }
    } catch (error) {
      console.error("API 호출 오류:", error);
      // 오류 처리
    }
  };

  const dayOptions = [
    { value: "", label: "요일을 선택하세요" }, // 초기 값은 빈 문자열로 설정
    { value: "mon", label: "월요일" },
    { value: "tues", label: "화요일" },
    { value: "wendes", label: "수요일" },
    { value: "thurs", label: "목요일" },
    { value: "fri", label: "금요일" },
    { value: "satur", label: "토요일" },
    { value: "sun", label: "일요일" },
  ];

  const [checkboxStates, setCheckboxStates] = useState({
    로맨스: false,
    액션: false,
    공포: false,
    일상: false,
    힐링: false,
    스포츠: false,
    드라마: false,
    무협: false,
  });
  
  const handleCheckboxChange = (genre) => {
    setCheckboxStates((prevState) => ({
      ...prevState,
      [genre]: !prevState[genre],
    }));
  };
  

  const handleEpisodeAdd = async () => {
    console.log(epEnName,count,thumbnailPath,episode);
    try {
      const response = await fetch("/api/episodeAdd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          WebtoonEnName: epEnName,
          count: count,
          thumbnail: thumbnailPath,
          ep: episode,
        }),
      });

      if (response.ok) {
        console.log("에피소드 추가 성공");
        // 에피소드 추가 성공 후 필요한 동작 수행
      } else {
        console.error("에피소드 추가 실패");
        // 에피소드 추가 실패 처리
      }
    } catch (error) {
      console.error("API 호출 오류:", error);
      // 오류 처리
    }
  };

  const handleWebtoonDelete = async () => {
    try {
      const response = await fetch("/api/webtoonDelete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ID: webtoonId, // 웹툰 아이디 전달
        }),
      });
  
      if (response.ok) {
        console.log("웹툰 전체 삭제 성공");
        // 웹툰 전체 삭제 성공 후 필요한 동작 수행
      } else {
        console.error("웹툰 전체 삭제 실패");
        // 웹툰 전체 삭제 실패 처리
      }
    } catch (error) {
      console.error("API 호출 오류:", error);
      // 오류 처리
    }
  };


  const handleEpisodeDelete = async () => {
    try {
      const response = await fetch("/api/episodeDelete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ID: episodeId, // 웹툰 아이디 전달
          ep: ep, // 삭제할 에피소드 번호 전달
        }),
      });

      if (response.ok) {
        console.log("에피소드 삭제 성공");
        // 에피소드 삭제 성공 후 필요한 동작 수행
      } else {
        console.error("에피소드 삭제 실패");
        // 에피소드 삭제 실패 처리
      }
    } catch (error) {
      console.error("API 호출 오류:", error);
      // 오류 처리
    }
  };
  return (
    <div className={style.adminpage}>
      <Header showAdminLink={isAdminPage} />
      {admin === "qkaejwnj%40naver.com" ||
      admin === "mnb2098%40naver.com" ? (
      <form>
        <div className={style.newWebtoon}>

          <h2>신규 웹툰 등록</h2>

          {/* 작품 정보 입력 부분 */}
          <input
            type="text"
            placeholder="웹툰 제목"
            value={webtoonName}
            onChange={(e) => setWebtoonName(e.target.value)}
          />
          <input
            type="text"
            placeholder="웹툰 영문 제목"
            value={webtoonEnName}
            onChange={(e) => setWebtoonEnName(e.target.value)}
          />
          <input
            type="text"
            placeholder="작가명"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <input
            type="text"
            placeholder="웹툰 내용"
            id={style.bottom}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <div className={style.inputRow}>
            <span className={style.inputP}>요일 선택</span>
            <div className={style.inputBox}>
              <select id={style.dayOption} value={selectedDay} onChange={handleDayChange}>
                <option  value="">요일을 선택하세요</option>
                {dayOptions.map((day) => (
                  <option key={day.value} value={day.value}>
                    {day.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 장르 선택 부분 */}
          <div className={style.checkBox}>
            <span id={style.CategoriP} className={style.inputP}>장르</span>
            {/* 장르 체크박스 목록 */}
            {Object.entries(checkboxStates).map(([genre, isChecked]) => (
              <label key={genre} className={style.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleCheckboxChange(genre)}
                />
                <span className={style.Categori}>{genre}</span>
              </label>
            ))}
          </div>
          {/* 사진 업로드 부분 */}
          <div id={style.imgUpload} className={style.inputRow}>
            <span className={style.inputP}>사진 업로드</span>
            <div className={style.inputBox}>
                <input
                    type="text"
                    placeholder="이미지 경로 입력"
                    onChange={handleImageChange}
                />
                      {handleImageChange && ( // 경로가 입력된 경우에만 이미지 표시
        <img src={selectedImage} alt="Thumbnail" style={{ maxWidth: "300px", maxHeight: "500px"  }} />
      )}
          </div>
          </div>

          {/* 웹툰 등록 버튼 */}
          <button id={style.uploadBtn} type="button" onClick={handleWebtoonAdd}>
            웹툰 등록
          </button>

          <h2  id={style.newEpH}>신규 회차 등록</h2>

          {/* 에피소드 정보 입력 부분 */}

          <input
            type="text"
            placeholder="웹툰 영문 제목"
            value={epEnName}
            onChange={(e) => setEpEnName(e.target.value)}
          />
      <input
        type="number"
        id="countInput"
        placeholder="에피소드 컷 수"

        value={count} 
        onChange={handleCountChange}
      />
      <input
        type="number"
        id="episodeInput"
        value={episode}
        placeholder="에피소드 회차"
        onChange={handleEpisodeChange}
      />
      <input
        type="text"
        id={style.bottom}
        value={thumbnailPath}
        placeholder="썸네일경로"
        onChange={handleThumbnailChange}
      />
      

      {thumbnailPath && ( // 경로가 입력된 경우에만 이미지 표시
        <img src={thumbnailPath} alt="Thumbnail" style={{ maxWidth: "200px", maxHeight: "100px" }} />
      )}
        <button id={style.uploadBtn}onClick={handleEpisodeAdd}>회차등록</button>


        <h2 id={style.top}>웹툰 전체 삭제</h2>

          {/* 웹툰 전체  삭제 */}
          <input
              type="number"
              placeholder="삭제할 웹툰 아이디"
              value={webtoonId}
              onChange={(e) => setWebtoonId(e.target.value)}
            />
            <button id={style.uploadBtn} onClick={handleWebtoonDelete}>웹툰 전체 삭제</button>

            <h2 id={style.top}>웹툰 회차 삭제</h2>

          {/* 웹툰 회차  삭제 */}
          <input
              type="number"
              placeholder="에피소드를 삭제할 웹툰 아이디"
              value={episodeId}
              onChange={(e) => setEpisodeId(e.target.value)}
            />
            <input
              type="number"
              placeholder="삭제할 에피소드"
              value={ep}
              onChange={(e) => setEp(e.target.value)}
            />
            <button id={style.uploadBtn} onClick={handleEpisodeDelete}>선택한 웹툰 회차 삭제</button>
        </div>
        

      </form>
            ) : (
              <p className={style.accessDenied} >접근 불가</p>
              )}
    </div>
  );
};

export default AdminPage;
