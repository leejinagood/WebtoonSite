import Header from "@/src/Header/header";
import React, { useState } from "react";
import style from "./style/adminpageCss.module.css";

const AdminPage = () => {
  const [selectedImage, setSelectedImage] = useState(null); // 선택된 이미지 파일을 저장
  const [selectedDay, setSelectedDay] = useState(""); // 초기 값을 빈 문자열로 설정
  const [webtoonName, setWebtoonName] = useState(""); // 웹툰 제목을 저장
  const [webtoonEnName, setWebtoonEnName] = useState(""); // 웹툰 영문 제목을 저장
  const [author, setAuthor] = useState(""); // 작가명을 저장
  const [content, setContent] = useState(""); // 웹툰 내용을 저장
  const [categories, setCategories] = useState([]); // 선택된 카테고리를 저장

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
    console.log(content,author,webtoonName,webtoonEnName,selectedDay,selectedImage,categories)
    const data = {
      content:content,
      author:author,
      WebtoonName: webtoonName,
      WebtoonEnName: webtoonEnName,
      week: selectedDay,
      thumbnail: selectedImage, // 이미지 파일로 변경
      categories:categories,
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
  

  return (
    <div className={style.adminpage}>
      <Header showAdminLink={isAdminPage} />

      <form>
        <div className={style.newWebtoon}>
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
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <div className={style.inputRow}>
            <span className={style.inputP}>요일 선택</span>
            <div className={style.inputBox}>
              <select value={selectedDay} onChange={handleDayChange}>
                <option value="">요일을 선택하세요</option>
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
            <span className={style.inputP}>장르</span>
            {/* 장르 체크박스 목록 */}
            {Object.entries(checkboxStates).map(([genre, isChecked]) => (
              <label key={genre}>
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
          <div className={style.inputRow}>
            <span className={style.inputP}>사진 업로드</span>
            <div className={style.inputBox}>
                <input
                    type="text"
                    placeholder="이미지 경로 입력"
                    onChange={handleImageChange}
                />
          </div>
          </div>

          {/* 웹툰 등록 버튼 */}
          <button type="button" onClick={handleWebtoonAdd}>
            웹툰 등록
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminPage;
