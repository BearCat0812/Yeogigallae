import React, { useState, useEffect } from 'react'
import './Review.css'
import { useNavigate } from 'react-router-dom';

const Review = ({ placeId }) => {
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isReviewPopupOpen, setIsReviewPopupOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [reviews, setReviews] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserNum, setCurrentUserNum] = useState(null);

  // 로그인 상태 확인
  useEffect(() => {
    fetch('http://localhost:8080/session-check', {
      method: 'GET',
      credentials: 'include'
    })
    .then(res => res.json())
    .then(res => {
      setIsLoggedIn(res.loggedIn);
      if (res.loggedIn) {
        setCurrentUserNum(res.userNum);
      }
    });
  }, []);

  // 리뷰 데이터 로드
  useEffect(() => {
    fetch(`http://localhost:8080/reviews/${placeId}`)
      .then(res => res.json())
      .then(data => {
        setReviews(data.reviews || []); // 서버 응답에서 reviews 배열을 가져오거나, 없으면 빈 배열 사용
      })
      .catch(error => {
        console.error('리뷰 목록 조회 실패:', error);
        setReviews([]); // 에러 발생 시 빈 배열로 설정
      });
  }, [placeId]);

  useEffect(() => {
    if (isPopupOpen || isReviewPopupOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isPopupOpen, isReviewPopupOpen]);

  const handleReviewClick = () => {
    if (!isLoggedIn) {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/login');
      return;
    }
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleReviewItemClick = (review) => {
    setSelectedReview(review);
    setIsReviewPopupOpen(true);
  };

  const handleCloseReviewPopup = () => {
    setIsReviewPopupOpen(false);
    setSelectedReview(null);
  };

  const comment = (e) => {
    e.preventDefault();
    
    if (!isLoggedIn) {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/login');
      return;
    }

    // 제목과 내용이 비어있는지 검증
    if (!title.trim()) {
      alert('제목을 입력해 주세요.');
      return;
    }
    
    if (!detail.trim()) {
      alert('내용을 입력해 주세요.');
      return;
    }

    const date = new Date();
    const now = date.toLocaleString();

    fetch("http://localhost:8080/about", {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, detail, now, placeId }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          // 리뷰 작성 성공 시 리뷰 목록 새로고침
          fetch(`http://localhost:8080/reviews/${placeId}`)
            .then(res => res.json())
            .then(data => {
              setReviews(data.reviews || []);
              alert('리뷰가 등록되었습니다!');
            })
            .catch(error => {
              console.error('리뷰 목록 조회 실패:', error);
              setReviews([]);
            });

          // 입력 필드 초기화
          setTitle('');
          setDetail('');
          // 팝업 닫기
          setIsPopupOpen(false);
        } else {
          alert('리뷰 등록에 실패했습니다. 다시 시도해 주세요.');
        }
      })
      .catch(error => {
        console.error('리뷰 작성 실패:', error);
        alert('일시적인 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
      });
  };

  const handleDeleteReview = async (review) => {
    if (!window.confirm('정말로 이 리뷰를 삭제하시겠습니까?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/reviews/${placeId}/${review.users_num}/${review.num}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      const data = await response.json();

      if (data.success) {
        alert('리뷰가 삭제되었습니다.');
        // 리뷰 목록에서 삭제된 리뷰 제거
        setReviews(reviews.filter(r => r.num !== review.num));
        setIsReviewPopupOpen(false);
      } else {
        alert(data.message || '리뷰 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('리뷰 삭제 실패:', error);
      alert('리뷰 삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="review-container container">
      <div className="review-plus">
        <p>어땠어요? 솔직한 한마디!</p>
        <button 
          className={`review-plus-btn ${!isLoggedIn ? 'not-logged-in' : ''}`} 
          onClick={handleReviewClick}
        >
          {isLoggedIn ? '리뷰 작성하기' : '로그인하고 리뷰 작성하기'}
        </button>
      </div>
      {reviews.length === 0 ? (
        <div className="no-reviews">
          <p>아직 작성된 리뷰가 없습니다.</p>
          <p>첫 번째 리뷰의 주인공이 되어주세요.</p>
        </div>
      ) : (
        <ul>
          {reviews.map((review, index) => (
            <li key={index} onClick={() => handleReviewItemClick(review)}>
              <ul>
                <li>{review.title}</li>
                <li>{review.userName} <span>
                  {`${new Date(review.date).getFullYear()}-${String(new Date(review.date).getMonth() + 1).padStart(2, '0')}-${String(new Date(review.date).getDate()).padStart(2, '0')} ${String(new Date(review.date).getHours()).padStart(2, '0')}:${String(new Date(review.date).getMinutes()).padStart(2, '0')}`}
                </span></li>
                <li>
                  <pre>{review.detail}</pre>
                </li>
              </ul>
            </li>
          ))}
        </ul>
      )}

      {isPopupOpen && (
        <div className="review-popup">
          <div className="review-popup-content">
            <span>리뷰 작성하기</span>
            <form>
              <div className="review-form-group">
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)} 
                  placeholder="제목을 입력해주세요." 
                />
              </div>
              <div className="review-form-group">
                <textarea 
                  value={detail}
                  onChange={(e) => setDetail(e.target.value)} 
                  placeholder="내용을 입력해주세요."
                ></textarea>
              </div>
              <div className="review-popup-buttons">
                <button type="submit" onClick={comment}>작성완료</button>
                <button type="button" onClick={handleClosePopup}>취소</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isReviewPopupOpen && selectedReview && (
        <div className="review-popup">
          <div className="review-popup-content review-detail-popup">
            <span>{selectedReview.title}</span>
            <div className="review-info">
              <span>{selectedReview.userName}</span>
              <span>
                {`${new Date(selectedReview.date).getFullYear()}-${String(new Date(selectedReview.date).getMonth() + 1).padStart(2, '0')}-${String(new Date(selectedReview.date).getDate()).padStart(2, '0')} ${String(new Date(selectedReview.date).getHours()).padStart(2, '0')}:${String(new Date(selectedReview.date).getMinutes()).padStart(2, '0')}`}
              </span>
            </div>
            <div className="review-detail-content">
              <pre>{selectedReview.detail}</pre>
            </div>
            <div className="review-popup-buttons">
              {currentUserNum === selectedReview.users_num && (
                <button 
                  type="button" 
                  onClick={() => handleDeleteReview(selectedReview)}
                  className="delete-button"
                >
                  삭제
                </button>
              )}
              <button type="button" onClick={handleCloseReviewPopup}>닫기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Review