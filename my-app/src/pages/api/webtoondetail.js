export default function handler(req, res) {
  const { query } = req;
  const { name } = query;

  if (name) {
    // 웹툰 상세 정보를 가져오는 비동기 함수를 구현합니다.
    fetchWebtoonDetail(name)
      .then((data) => {
        const { webtoons, count } = data;
        console.log(name);
        res.status(200).json({ webtoons, count });
      })
      .catch((error) => {
        console.log(name);
        console.error("Error fetching API:", error);
        res.status(500).json({ error: "Error fetching API" });
      });
  } else {
    res.status(400).json({ error: "Missing parameters" });
  }
}

// 웹툰 상세 정보를 가져오는 비동기 함수를 정의합니다.
async function fetchWebtoonDetail(name) {
  const response = await fetch(`/api/webtoondetail?name=${encodeURIComponent(name)}`);
  const data = await response.json();
  console.log(name);
  return data;
}
