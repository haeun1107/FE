import React from 'react';

function WritePostPage() {
  const handleSubmit = () => {
    // TODO: 게시글 등록 API 연결 예정 (POST /api/posts)
    // const data = {
    //   content: ..., 
    //   images: [...]
    // };
    // axios.post('/api/posts', data).then(...).catch(...);
    alert('게시글 등록은 백엔드 API 연결 후 작동합니다.');
  };

  return (
    <div style={styles.outer}>
      <div style={styles.wrapper}>
        <h3 style={styles.title}>새 글 작성</h3>
        <textarea
          placeholder="텍스트를 입력하세요"
          style={styles.textarea}
        ></textarea>

        <div style={styles.imagePreviewContainer}>
          <div style={styles.imageBox}>이미지1</div>
          <div style={styles.imageBox}>이미지2</div>
          <div style={styles.imageBox}>이미지3</div>
        </div>

        <button style={styles.sendButton} onClick={handleSubmit}>📩</button>
      </div>
    </div>
  );
}

const styles = {
  outer: {
    backgroundColor: '#f1f1f1',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
  },
  wrapper: {
    width: '100%',
    maxWidth: '430px',
    backgroundColor: '#fff',
    padding: '16px',
    boxSizing: 'border-box',
    fontFamily: 'sans-serif',
  },
  title: {
    marginBottom: '12px',
  },
  textarea: {
    width: '100%',
    height: '200px',
    padding: '12px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    resize: 'none',
    boxSizing: 'border-box',
  },
  imagePreviewContainer: {
    display: 'flex',
    gap: '10px',
    marginTop: '12px',
  },
  imageBox: {
    flex: '1 1 0',
    height: '80px',
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    textAlign: 'center',
    lineHeight: '80px',
    color: '#999',
    fontSize: '14px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  sendButton: {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    backgroundColor: '#4e74f9',
    border: 'none',
    color: 'white',
    fontSize: '20px',
    cursor: 'pointer',
  },
};

export default WritePostPage;
