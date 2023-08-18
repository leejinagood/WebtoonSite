// api.js

export const insertComment = async (webtoonName, episodeNumber, userEmail, commentContent) => {
  try {
    const response = await fetch('http://107.23.243.5:4000/api/comment_insert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        WebEnName: webtoonName,
        Ep: episodeNumber,
        UserEmail: userEmail,
        content: commentContent,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to insert comment');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error uploading comment:', error);
    throw error;
  }
};

export const loadCommentList = async (webtoonName, episodeNumber) => {
  try {
    const response = await fetch(`http://107.23.243.5:4000/api/comment?EnName=${webtoonName}&ep=${episodeNumber}`);

    if (!response.ok) {
      throw new Error('Failed to fetch comment list');
    }

    const data = await response.json();
    return data; // data 자체가 배열이므로, commentList에 바로 설정
  } catch (error) {
    console.error('Error fetching API:', error);
    throw error;
  }
};

