import Header from "@/src/Header/header";
import React, { useState ,useEffect} from "react";
import style from "./style/adminpageCss.module.css";
import AddAllToonAdmin from "../../Component/AddAllToonAdmin";

import jwt_decode from 'jwt-decode'; // JWT 토큰을 디코딩하기 위한 라이브러리
import { parseCookies } from 'nookies'; // nookies 라이브러리 import
import { useRouter } from 'next/router';
// import axios from 'axios';
import Link from "next/link";
const AdminPage = () => {

    const router = useRouter();

    const [selectedImage, setSelectedImage] = useState(null); // 선택된 이미지 파일을 저장
    const [selectedDay, setSelectedDay] = useState(""); // 초기 값을 빈 문자열로 설정
    const [webtoonName, setWebtoonName] = useState(""); // 웹툰 제목을 저장
    const [webtoonEnName, setWebtoonEnName] = useState(""); // 웹툰 영문 제목을 저장
    const [author, setAuthor] = useState(""); // 작가명을 저장
    const [content, setContent] = useState(""); // 웹툰 내용을 저장


    const [admin,setAdmin] = useState("");
    let token = "";

    useEffect(() => {
      fetch("api/adminWebtoon")
      .then((response) => response.json())
      .then((data) => {
        setWebtoonData(data); 
      })
      .catch((error) => {
        console.error("Error fetching API:", error);
      });
    },[])

    useEffect(() => {
      const cookies = parseCookies();
      const token = cookies.token; // 실제 JWT 토큰 쿠키 이름으로 대체해주세요
      if (token) {
        const decodedToken = jwt_decode(token);
        setAdmin(decodedToken.UserEmail); 
        if (decodedToken.UserEmail !== "qkaejwnj%40naver.com" 
        && decodedToken.UserEmail !== "mnb2098%40naver.com" 
        && decodedToken.UserEmail !== "admin" ) {
          window.alert("접근불가");
          router.push('/'); // 다른 페이지로 리다이렉트
        }
      }
      else{
        window.alert("접근불가");
        router.push('/'); // 다른 페이지로 리다이렉트
      }
    }, []);
  





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
    const data = {
      content:content,
      author:author,
      WebtoonName: webtoonName,
      WebtoonEnName: webtoonEnName,
      week: selectedDay,
      thumbnail: selectedImage, // 이미지 파일로 변경
      categories:JSON.stringify(selectedGenres),
      genres: selectedGenres, // 선택한 장르 목록

    };
    const errors = []; // 발생한 예외 메시지들을 저장할 배열

    if (!content) {
      errors.push("내용을 작성해주세요");
    }
    else if (author.length > 100) {
      errors.push("작품설명은 최대 100글자까지 가능합니다");
    }
    if (!author) {
      errors.push("작가를 작성해주세요");
    } else if (author.length > 6) {
      errors.push("작가 이름은 최대 6글자까지 가능합니다");
    }
  
    if (!webtoonName) {
      errors.push("웹툰이름을 작성해주세요");
    } else if (webtoonName.length > 12) {
      errors.push("웹툰 이름은 최대 6글자까지 가능합니다");
    }
    if (!webtoonEnName) {
      errors.push("웹툰영어이름을 작성해주세요");
    }
    else if (!/^[A-Za-z]+$/.test(webtoonEnName)) {
      errors.push("웹툰 영어 이름은 영어로만 구성되어야 합니다");
    }
    if (!selectedDay) {
      errors.push("요일을 선택해주세요");
    }
    if (selectedGenres.length === 0) {
      errors.push("장르를 체크해주세요");
    }
    if (selectedImage === null) {
      errors.push("이미지 경로를 입력해주세요");
    }
    

    if (errors.length > 0) {
      // 에러 메시지를 출력하거나 필요한 동작을 수행
      console.error("에러 발생:", errors);
      window.alert(errors);

    } else {
      try {
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }

      const response = await fetch("/api/webtoonAdd", {
        method: "POST",
        body: formData,
      });
      // . json 

      if (response.ok) {
        console.log("웹툰 추가 성공");
        window.alert("웹툰 추가 성공");
        window.location.reload(); // 페이지 리프레시

        // 웹툰 추가 성공 후 필요한 동작 수행
      }else if(response.status===500){
        console.log("이미 존재하는 웹툰이름입니다.");
        window.alert("이미 존재하는 웹툰이름입니다");

      }
      else {
        console.error("웹툰 추가 실패");
        // 웹툰 추가 실패 처리
      }
    } catch (error) {
      console.error("API 호출 오류:", error);
      // 오류 처리
    }
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
  

// 핸들 펀션 스테이트 하나로 줄이기
// 쪼개기 메뉴로
// 웹툰 목록 체크박스로 지우듯이
  return (
    <div className={style.adminpage}>
      <Header showAdminLink={isAdminPage} />
        <nav className={style.Nav}>
          <ul>
            <li className={style.choise}>
              <Link href="/adminpage">웹툰 등록</Link>
            </li>
            <li>
              <Link href="/adminpage/episodeAddDelete">에피소드 등록 / 삭제</Link>
            </li>
            <li>
              <Link href="/adminpage/webtoonDelete">웹툰 삭제</Link>
            </li>
          </ul>
        </nav>
      
      {admin === "qkaejwnj%40naver.com" ||
      admin === "mnb2098%40naver.com" || admin === "admin"? (
      <form>
        <div className={style.newWebtoon}>
          <h2>현재 웹툰 목록</h2>
            <AddAllToonAdmin/>
          <h2 className={style.top}>신규 웹툰 등록</h2>

          {/* 작품 정보 입력 부분 */}
          <input
            type="text"
            placeholder="웹툰 제목"
            value={webtoonName}
            onChange={(e) => {
              setWebtoonName(e.target.value);
            }}
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
            <span className={style.inputP}>사진 업로드 <br/>/  미리보기</span>
            <div className={style.inputBox}>
                <input
                    type="text"
                    placeholder="이미지 경로 입력"
                    onChange={handleImageChange}
                />
                {handleImageChange && ( // 경로가 입력된 경우에만 이미지 표시
                <div className={style.show}>
                  <img src={selectedImage} alt="미리보기" />
                  <div className={style.hoverP}>
                    <p className={style.lp}>{webtoonName}</p>
                    <p className={style.rp}>{author}</p>
                  </div>
                </div>
                )}
            </div>
          </div>

          {/* 웹툰 등록 버튼 */}
          <button id={style.uploadBtn} type="button" onClick={handleWebtoonAdd}>
            웹툰 등록
          </button>
        </div>
      </form>
            ) : (
              <p className={style.accessDenied} >접근 불가</p>
              )}
    </div>
  );
};

export default AdminPage;
