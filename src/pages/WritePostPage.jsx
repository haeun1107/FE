import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const WritePostPage = () => {
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5);
    setImages(files);
    const previewList = files.map((file) => URL.createObjectURL(file));
    setPreviews(previewList);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const formData = new FormData();
      formData.append('content', content);
      images.forEach((img) => formData.append('images', img));

      await axios.post('/api/posts', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('게시글이 등록되었습니다.');
      navigate('/main');
    } catch (err) {
      console.error('게시글 등록 실패:', err);
      alert('게시글 등록에 실패했습니다.');
    }
  };

  return (
    <div style={styles.container}>
      <div onClick={() => navigate(-1)} style={styles.backArrow}>←</div>

      <h2 style={styles.header}>톡 작성</h2>

      <textarea
        placeholder="나누고 싶은 이야기를 작성해주세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        maxLength={300}
        rows={8}
        style={styles.textarea}
      />
      <div style={styles.counter}>{content.length}/300</div>

      <div style={styles.previewWrapper}>
        {previews.map((src, idx) => (
          <img key={idx} src={src} alt={`preview-${idx}`} style={styles.imagePreview} />
        ))}
      </div>

      <label htmlFor="imageInput" style={styles.imageBox}>
        <span role="img" aria-label="upload">🖼️</span>
      </label>
      <input
        type="file"
        id="imageInput"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />

      <button onClick={handleSubmit} style={styles.button}>완료</button>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: "'Apple SD Gothic Neo', sans-serif",
    backgroundColor: '#ffffff',
    minHeight: '100vh',
    position: 'relative'
  },
  backArrow: {
    position: 'absolute',
    top: 20,
    left: 20,
    fontSize: '24px',
    cursor: 'pointer',
    color: '#333'
  },
  header: {
    textAlign: 'center',
    fontSize: '20px',
    marginBottom: '20px',
    fontWeight: '600',
    color: '#333'
  },
  textarea: {
    width: '100%',
    padding: '14px',
    fontSize: '15px',
    borderRadius: '14px',
    border: '1px solid #e1e1e1',
    backgroundColor: '#fdfcfc', // 완전 연한 핑크
    resize: 'none',
    boxSizing: 'border-box',
    outline: 'none'
  },
  counter: {
    textAlign: 'right',
    marginTop: '6px',
    fontSize: '12px',
    color: '#999'
  },
  previewWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginTop: '10px'
  },
  imagePreview: {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
    borderRadius: '10px',
    border: '1px solid #ddd'
  },
  imageBox: {
    marginTop: '12px',
    width: '100px',
    height: '100px',
    border: '1.5px dashed #aaa',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    backgroundColor: '#fff'
  },
  button: {
    marginTop: '24px',
    width: '100%',
    padding: '14px',
    fontSize: '16px',
    borderRadius: '8px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer'
  }
};

export default WritePostPage;
