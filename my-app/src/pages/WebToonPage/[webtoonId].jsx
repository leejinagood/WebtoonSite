import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "../Header/header";
import Footer from "../Footer/footer";
import ClickLayoutComponent from "./ClickLayoutComponent";
import WebToonPageCss from "./styles/WebToonPageCss.css";


const WebToonPage = () => {
  const router = useRouter();




  const { webtoonName } = router.query;
  //undefined일 때 경우 추가
  const episodeNumber = typeof router.query.episodeNumber === "string" ? parseInt(router.query.episodeNumber) : undefined;
  // parseInt 함수를 사용하여 문자열로 변환된 경우에만 숫자로 변환하도록

  const [webtoons, setWebtoons] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [selectedWebtoon, setSelectedWebtoon] = useState(null);
  const [count, setCount] = useState(0);




  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/webtoondetail?name=${encodeURIComponent(webtoonName)}`);
        const data = await response.json();
        const { webtoons } = data;
        //data 의 webtoon_name을 찾아 맞는 webtoon_name를
        const selectedWebtoon = webtoons.find((webtoon) => webtoon.webtoon_name === webtoonName);
        // selectedWebtoon로 할당
        setSelectedWebtoon(selectedWebtoon);
        setWebtoons(webtoons);
        setCount(selectedWebtoon?.count || 0);
      } catch (error) {
        console.error("Error fetching API:", error);
      }
    };

    if (webtoonName) {
      fetchData();
    }
  }, [webtoonName]);
  // 기존 코드에서 간소화
  // episodeNumber 추가
  const getWebtoonImage = (webtoon, episodeNumber) => {
    const webtoonImages = {
      "똑 닮은 딸": {
        1: [
          "/WebtoonImg/web1/web1_1/web1_1_1.png",
          "/WebtoonImg/web1/web1_1/web1_1_2.png",
          "/WebtoonImg/web1/web1_1/web1_1_3.png",
          "/WebtoonImg/web1/web1_1/web1_1_4.png",
          "/WebtoonImg/web1/web1_1/web1_1_5.png",
          "/WebtoonImg/web1/web1_1/web1_1_6.png",
          "/WebtoonImg/web1/web1_1/web1_1_7.png",
          "/WebtoonImg/web1/web1_1/web1_1_8.png",
          "/WebtoonImg/web1/web1_1/web1_1_9.png",
          "/WebtoonImg/web1/web1_1/web1_1_10.png",
          "/WebtoonImg/web1/web1_1/web1_1_11.png",
          "/WebtoonImg/web1/web1_1/web1_1_12.png",
          "/WebtoonImg/web1/web1_1/web1_1_13.png",
          "/WebtoonImg/web1/web1_1/web1_1_14.png",
          "/WebtoonImg/web1/web1_1/web1_1_15.png",
          "/WebtoonImg/web1/web1_1/web1_1_16.png",
          "/WebtoonImg/web1/web1_1/web1_1_17.png",
          "/WebtoonImg/web1/web1_1/web1_1_18.png",
          "/WebtoonImg/web1/web1_1/web1_1_19.png",
          "/WebtoonImg/web1/web1_1/web1_1_20.png",
          "/WebtoonImg/web1/web1_1/web1_1_21.png",
          "/WebtoonImg/web1/web1_1/web1_1_22.png",
          "/WebtoonImg/web1/web1_1/web1_1_23.png",
          "/WebtoonImg/web1/web1_1/web1_1_24.png",
          "/WebtoonImg/web1/web1_1/web1_1_25.png",
          "/WebtoonImg/web1/web1_1/web1_1_26.png",
          "/WebtoonImg/web1/web1_1/web1_1_27.png",
          "/WebtoonImg/web1/web1_1/web1_1_28.png",
          "/WebtoonImg/web1/web1_1/web1_1_29.png",
          "/WebtoonImg/web1/web1_1/web1_1_30.png",
          "/WebtoonImg/web1/web1_1/web1_1_31.png",
          "/WebtoonImg/web1/web1_1/web1_1_32.png",
          "/WebtoonImg/web1/web1_1/web1_1_33.png",
          "/WebtoonImg/web1/web1_1/web1_1_34.png",
          "/WebtoonImg/web1/web1_1/web1_1_35.png",
          "/WebtoonImg/web1/web1_1/web1_1_36.png",
          "/WebtoonImg/web1/web1_1/web1_1_37.png",
          "/WebtoonImg/web1/web1_1/web1_1_38.png",
          "/WebtoonImg/web1/web1_1/web1_1_39.png",
          "/WebtoonImg/web1/web1_1/web1_1_40.png",
          "/WebtoonImg/web1/web1_1/web1_1_41.png",
          "/WebtoonImg/web1/web1_1/web1_1_42.png",
          "/WebtoonImg/web1/web1_1/web1_1_43.png",
          "/WebtoonImg/web1/web1_1/web1_1_44.png",
          "/WebtoonImg/web1/web1_1/web1_1_45.png",
          "/WebtoonImg/web1/web1_1/web1_1_46.png",
          "/WebtoonImg/web1/web1_1/web1_1_47.png",
          "/WebtoonImg/web1/web1_1/web1_1_48.png",
          "/WebtoonImg/web1/web1_1/web1_1_49.png",
          "/WebtoonImg/web1/web1_1/web1_1_50.png",
          "/WebtoonImg/web1/web1_1/web1_1_51.png",
          "/WebtoonImg/web1/web1_1/web1_1_52.png",
          "/WebtoonImg/web1/web1_1/web1_1_53.png",
          "/WebtoonImg/web1/web1_1/web1_1_54.png",
          "/WebtoonImg/web1/web1_1/web1_1_55.png",
          "/WebtoonImg/web1/web1_1/web1_1_56.png",
          "/WebtoonImg/web1/web1_1/web1_1_57.png",
          "/WebtoonImg/web1/web1_1/web1_1_58.png",
          "/WebtoonImg/web1/web1_1/web1_1_59.png",
          "/WebtoonImg/web1/web1_1/web1_1_60.png",
          "/WebtoonImg/web1/web1_1/web1_1_61.png",
          "/WebtoonImg/web1/web1_1/web1_1_62.png",
          "/WebtoonImg/web1/web1_1/web1_1_63.png",
          "/WebtoonImg/web1/web1_1/web1_1_64.png",
          "/WebtoonImg/web1/web1_1/web1_1_65.png",
          "/WebtoonImg/web1/web1_1/web1_1_66.png",
          "/WebtoonImg/web1/web1_1/web1_1_67.png",
          "/WebtoonImg/web1/web1_1/web1_1_68.png",
          "/WebtoonImg/web1/web1_1/web1_1_69.png",
          "/WebtoonImg/web1/web1_1/web1_1_70.png",
          "/WebtoonImg/web1/web1_1/web1_1_71.png",
          "/WebtoonImg/web1/web1_1/web1_1_72.png",
          "/WebtoonImg/web1/web1_1/web1_1_73.png",
          "/WebtoonImg/web1/web1_1/web1_1_74.png",
          "/WebtoonImg/web1/web1_1/web1_1_75.png",
          "/WebtoonImg/web1/web1_1/web1_1_76.png",
          "/WebtoonImg/web1/web1_1/web1_1_77.png",
          "/WebtoonImg/web1/web1_1/web1_1_78.png",
          "/WebtoonImg/web1/web1_1/web1_1_79.png",
          "/WebtoonImg/web1/web1_1/web1_1_80.png",
          "/WebtoonImg/web1/web1_1/web1_1_81.png",
          "/WebtoonImg/web1/web1_1/web1_1_82.png",
          "/WebtoonImg/web1/web1_1/web1_1_83.png",
          "/WebtoonImg/web1/web1_1/web1_1_84.png",
          "/WebtoonImg/web1/web1_1/web1_1_85.png",
          "/WebtoonImg/web1/web1_1/web1_1_86.png",
          "/WebtoonImg/web1/web1_1/web1_1_87.png",
          "/WebtoonImg/web1/web1_1/web1_1_88.png",
          "/WebtoonImg/web1/web1_1/web1_1_89.png",
          "/WebtoonImg/web1/web1_1/web1_1_90.png",
          "/WebtoonImg/web1/web1_1/web1_1_91.png",
          "/WebtoonImg/web1/web1_1/web1_1_92.png",
          "/WebtoonImg/web1/web1_1/web1_1_93.png",
          "/WebtoonImg/web1/web1_1/web1_1_94.png",
          "/WebtoonImg/web1/web1_1/web1_1_95.png",
          "/WebtoonImg/web1/web1_1/web1_1_96.png",
          "/WebtoonImg/web1/web1_1/web1_1_97.png",
          "/WebtoonImg/web1/web1_1/web1_1_98.png",
          "/WebtoonImg/web1/web1_1/web1_1_99.png",
          "/WebtoonImg/web1/web1_1/web1_1_100.png", 
          "/WebtoonImg/web1/web1_1/web1_1_101.png",
          "/WebtoonImg/web1/web1_1/web1_1_102.png"
        ],
        2: [
          "/WebtoonImg/web1/web1_2/web1_2_1.png",
          "/WebtoonImg/web1/web1_2/web1_2_2.png",
          "/WebtoonImg/web1/web1_2/web1_2_3.png",
          "/WebtoonImg/web1/web1_2/web1_2_4.png",
          "/WebtoonImg/web1/web1_2/web1_2_5.png"
        ],
        3: [
          "/WebtoonImg/web1/web1_3/web1_3_1.png",
          "/WebtoonImg/web1/web1_3/web1_3_2.png",
          "/WebtoonImg/web1/web1_3/web1_3_3.png",
          "/WebtoonImg/web1/web1_3/web1_3_4.png",
          "/WebtoonImg/web1/web1_3/web1_3_5.png"
        ]
      },
      "마루는 강쥐": {
        1: [
          "/WebtoonImg/web2/web2_1/web2_1_1.png",
          "/WebtoonImg/web2/web2_1/web2_1_2.png",
          "/WebtoonImg/web2/web2_1/web2_1_3.png"
        ],
        2: [
          "/WebtoonImg/web2/web2_2/web2_2_1.png",
          "/WebtoonImg/web2/web2_2/web2_2_2.png",
          "/WebtoonImg/web2/web2_2/web2_2_3.png",
          "/WebtoonImg/web2/web2_2/web2_2_4.png"
        ],
        3: [
          "/WebtoonImg/web2/web2_3/web2_3_1.png",
          "/WebtoonImg/web2/web2_3/web2_3_2.png",
          "/WebtoonImg/web2/web2_3/web2_3_3.png"
        ]
      },
      "소녀재판": {
        1: [
          "/WebtoonImg/web3/web3_1/web3_1_1.png",
          "/WebtoonImg/web3/web3_1/web3_1_2.png",
          "/WebtoonImg/web3/web3_1/web3_1_3.png"
        ],
        2: [
          "/WebtoonImg/web3/web3_2/web3_2_1.png",
          "/WebtoonImg/web3/web3_2/web3_2_2.png",
          "/WebtoonImg/web3/web3_2/web3_2_3.png"
        ],
        3: [
          "/WebtoonImg/web3/web3_3/web3_3_1.png",
          "/WebtoonImg/web3/web3_3/web3_3_2.png",
          "/WebtoonImg/web3/web3_3/web3_3_3.png"
        ]
      },
    "신혼일기":{
        1: [
          "/WebtoonImg/web4/web4_1/web4_1_1.png",
          "/WebtoonImg/web4/web4_1/web4_1_2.png",
          "/WebtoonImg/web4/web4_1/web4_1_3.png"
        ],
        2: [
          "/WebtoonImg/web4/web4_2/web4_2_1.png",
          "/WebtoonImg/web4/web4_2/web4_2_2.png",
          "/WebtoonImg/web4/web4_2/web4_2_3.png"
        ]
      },
    "외모지상주의":{
      1: [
        "/WebtoonImg/web5/web5_1/web5_1_1.png",
        "/WebtoonImg/web5/web5_1/web5_1_2.png",
        "/WebtoonImg/web5/web5_1/web5_1_3.png",
        "/WebtoonImg/web5/web5_1/web5_1_4.png",
        "/WebtoonImg/web5/web5_1/web5_1_5.png",
        "/WebtoonImg/web5/web5_1/web5_1_6.png"
      ],
      2: [
        "/WebtoonImg/web5/web5_2/web5_2_1.png",
        "/WebtoonImg/web5/web5_2/web5_2_2.png",
        "/WebtoonImg/web5/web5_2/web5_2_3.png",
        "/WebtoonImg/web5/web5_2/web5_2_4.png",
        "/WebtoonImg/web5/web5_2/web5_2_5.png"
      ],
      3: [
        "/WebtoonImg/web5/web5_3/web5_3_1.png",
        "/WebtoonImg/web5/web5_3/web5_3_2.png",
        "/WebtoonImg/web5/web5_3/web5_3_3.png"
      ]
      },
      "퀘스트지상주의":{
        1: [
          "/WebtoonImg/web6/web6_1/web6_1_1.png",
          "/WebtoonImg/web6/web6_1/web6_1_2.png",
          "/WebtoonImg/web6/web6_1/web6_1_3.png"
        ],
        2: [
          "/WebtoonImg/web6/web6_2/web6_2_1.png",
          "/WebtoonImg/web6/web6_2/web6_2_2.png",
          "/WebtoonImg/web6/web6_2/web6_2_3.png",
          "/WebtoonImg/web6/web6_2/web6_2_4.png"
        ]
        }
    };
  
    return webtoonImages[webtoon.webtoon_name]?.[episodeNumber] || [];
  };
  
  


  const handleWebToonCutClick = (webtoon) => {
    setSelectedWebtoon(webtoon);
    setIsVisible(true);

    setTimeout(() => {
      setIsVisible(false);
    }, 2500);
  };

  const handleScreenClick = () => {
    setIsVisible(!isVisible);
  };


  
  console.log(webtoonName, episodeNumber );

  return (
    <div className="WebToonPage" onClick={handleScreenClick}>
      <Header />
      <div className="WebToonBox">
      {webtoons.map((webtoon, index) => (
        <div className="WebToonCut" key={index} onClick={() => handleWebToonCutClick(webtoon)}>
          {webtoon.webtoon_name === webtoonName && episodeNumber ? (
            //getWebtoonImage 함수 교체
            getWebtoonImage(webtoon, episodeNumber).map((image, imageIndex) => (
              <img key={imageIndex} src={image} alt={`Webtoon Image ${imageIndex}`} />
            ))
          ) : (
            <img src={getWebtoonImage(webtoon, 1)[0]} alt="Webtoon Image" />
          )}
        </div>
      ))}
      </div>

      {/* {selectedWebtoon && isVisible && <ClickLayoutComponent webtoonName={WebToonName} ep={Episode}/>} */}

      {selectedWebtoon && isVisible && <ClickLayoutComponent webtoonName={webtoonName} episodeNumber={episodeNumber} maxEp={count} />}

      <Footer />
    </div>
  );
};

export default WebToonPage;