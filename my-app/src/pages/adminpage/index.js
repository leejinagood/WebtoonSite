import Header from "@/src/Header/header";
import React,{useState} from "react";
import style from "./style/adminpageCss.module.css";

const adminPage = () => {
    const [selectedImage, setSelectedImage] = useState(null); // 선택된 이미지 파일을 저장

    const isAdminPage = true; // 어드민 페이지 여부를 true 또는 false로 설정
    const [checkboxStates, setCheckboxStates] = useState({
        romance: false,
        action: false,
        fear: false,
        daily: false,
        healing: false,
        sports: false,
        drama: false,
        martial:false

        // ... 여러 개의 체크박스 상태를 추가
      });
      const handleCheckboxChange = (genre) => {
        setCheckboxStates((prevState) => ({
          ...prevState,
          [genre]: !prevState[genre],
        }));
      };
      const handleImageChange = (event) => {
        const imageFile = event.target.files[0];
        setSelectedImage(imageFile);
      };
    
    return (
        <div className={style.adminpage}>
            <Header showAdminLink={isAdminPage} />

            <form>
                <div className={style.newWebtoon}>
                    <h1 className={style.newToonTitle}>신규 작품 등록</h1>
                    <div className={style.inputRow}>
                        <span className={style.inputP}>작품명</span>
                        <div className={style.inputBox}>
                            <input type="text" placeholder="" />
                            <span className={style.placeholder}>Placeholder</span>
                        </div>
                    </div>
                    <div className={style.inputRow}>
                        <span className={style.inputP}>작품 영어명</span>
                        <div className={style.inputBox}>
                            <input type="text" placeholder="" />
                            <span className={style.placeholder}>Placeholder</span>
                        </div>
                    </div>
                    <div className={style.inputRow}>
                        <span className={style.inputP}>작가</span>
                        <div className={style.inputBox}>
                            <input type="text" placeholder="" />
                            <span className={style.placeholder}>Placeholder</span>
                        </div>
                    </div>
                    <div className={style.inputRow}>
                        <span className={style.inputP}>작품 소개</span>
                        <div className={style.inputBox}>
                            <input type="text" placeholder="" />
                            <span className={style.placeholder}>Placeholder</span>
                        </div>
                    </div>
                    <div>
                    {/* <span className={style.Categori}>로맨스</span> */}
                    <div className={style.checkBox}>
                    <span className={style.inputP}>장르</span>

                        <label>
                        <input
                            type="checkbox"
                            checked={checkboxStates.genre1}
                            onChange={() => handleCheckboxChange('romance')}
                            /><span className={style.Categori}>로맨스</span>
                            </label>
                            <label>

                            <input
                            type="checkbox"
                            checked={checkboxStates.genre1}
                            onChange={() => handleCheckboxChange('action')}
                            /><span className={style.Categori}>액션</span>
                            </label>
                            <label>
                            <input
                            type="checkbox"
                            checked={checkboxStates.genre1}
                            onChange={() => handleCheckboxChange('fear')}
                            /><span className={style.Categori}>공포</span></label>
                            <label>
                            <input
                            type="checkbox"
                            checked={checkboxStates.genre1}
                            onChange={() => handleCheckboxChange('daily')}
                            /> <span className={style.Categori}>일상</span></label>
                            <label>
                            <input
                            type="checkbox"
                            checked={checkboxStates.genre1}
                            onChange={() => handleCheckboxChange('healing')}
                            /><span className={style.Categori}>힐링</span>
                            </label>
                            <label>
                            <input
                            type="checkbox"
                            checked={checkboxStates.genre1}
                            onChange={() => handleCheckboxChange('sports')}
                            /><span className={style.Categori}>스포츠</span>
                            </label>
                            <label>
                            <input
                            type="checkbox"
                            checked={checkboxStates.genre1}
                            onChange={() => handleCheckboxChange('drama')}
                            /><span className={style.Categori}>드라마</span>
                            </label>
                            <label>
                            <input
                            type="checkbox"
                            checked={checkboxStates.genre1}
                            onChange={() => handleCheckboxChange('martial')}
                            /><span className={style.Categori}>무협</span>
                        </label>
                        </div>
                        <div className={style.inputRow}>
                            <span className={style.inputP}>사진 업로드</span>
                            <div className={style.inputBox}>
                            <input
                              type="file"
                             accept="image/*" // 이미지 파일만 선택 가능하도록 설정
                              onChange={handleImageChange}
                            />
                        </div>
                    </div>

                    </div>                    
                </div>
            </form>
        </div>
    )
}

export default adminPage;
