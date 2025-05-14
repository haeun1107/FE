import React, { useState } from 'react';

function SearchPage() {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    // TODO: 검색 API 연동 예정 (GET /api/posts?keyword=키워드)
    // fetch(`/api/posts?keyword=${query}`)
    //   .then(res => res.json())
    //   .then(data => {
    //     // 결과 렌더링 처리
    //   })
    //   .catch(err => console.error(err));
    alert('검색 기능은 백엔드 API 연결 후 작동합니다.');
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.title}>검색</h2>
      <input
        type="text"
        placeholder="제목을 검색하세요"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSearch();
        }}
        style={styles.input}
      />
    </div>
  );
}

const styles = {
  wrapper: {
    maxWidth: '430px',
    margin: '0 auto',
    padding: '16px',
    fontFamily: 'sans-serif',
  },
  title: {
    marginBottom: '12px',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '10px 14px',
    fontSize: '14px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
};

export default SearchPage;
