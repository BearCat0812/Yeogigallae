import React, { useState, useEffect } from 'react'
import './Review.css'

const Review = ({ placeId }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [reviews, setReviews] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 로그인 상태 확인
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    setIsLoggedIn(!!userId);
  }, []);

  // 리뷰 목록 불러오기
  useEffect(() => {
    if (placeId) {
      fetch(`http://localhost:8080/reviews/${placeId}`, {
        credentials: 'include'
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setReviews(data.reviews);
          }
        })
        .catch(error => {
          console.error('Error fetching reviews:', error);
        });
    }
  }, [placeId]);

  useEffect(() => {
    if (isPopupOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isPopupOpen]);

  const handleReviewClick = () => {
    if (!isLoggedIn) {
      alert('리뷰를 작성하려면 로그인이 필요합니다.');
      return;
    }
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setTitle('');
    setDetail('');
  };

  const comment = (e) => {
    e.preventDefault();

    if (!title.trim() || !detail.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
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
      .then(res => {
        if (res.success) {
          setReviews(prevReviews => [res, ...prevReviews]);
          handleClosePopup();
        } else {
          alert(res.message || '리뷰 작성에 실패했습니다.');
        }
      })
      .catch(error => {
        console.error('Error posting review:', error);
        alert('리뷰 작성 중 오류가 발생했습니다.');
      });
  }

  return (
    <div className="review-container container">
      <div className="review-plus">
        <p>어땠어요? 솔직한 한마디!</p>
        <button className="review-plus-btn" onClick={handleReviewClick}>리뷰 작성하기</button>
      </div>
      <ul>
        <li>
          <ul>
            <li>lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</li>
            <li>User <span>2025.06.03</span></li>
            <li>
              <pre>
                {`lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.`}
              </pre>
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li>lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</li>
            <li>User <span>2025.06.03</span></li>
            <li>
              <pre>
                {`lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.`}
              </pre>
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li>lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</li>
            <li>User <span>2025.06.03</span></li>
            <li>
              <pre>
                {`lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.`}
              </pre>
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li>lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</li>
            <li>User <span>2025.06.03</span></li>
            <li>
              <pre>
                {`lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.`}
              </pre>
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li>lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</li>
            <li>User <span>2025.06.03</span></li>
            <li>
              <pre>
                {`lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.`}
              </pre>
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li>lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</li>
            <li>User <span>2025.06.03</span></li>
            <li>
              <pre>
                {`lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.`}
              </pre>
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li>lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</li>
            <li>User <span>2025.06.03</span></li>
            <li>
              <pre>
                {`lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.`}
              </pre>
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li>lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</li>
            <li>User <span>2025.06.03</span></li>
            <li>
              <pre>
                {`lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.`}
              </pre>
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li>lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</li>
            <li>User <span>2025.06.03</span></li>
            <li>
              <pre>
                {`lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.`}
              </pre>
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li>lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</li>
            <li>User <span>2025.06.03</span></li>
            <li>
              <pre>
                {`lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.`}
              </pre>
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li>lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</li>
            <li>User <span>2025.06.03</span></li>
            <li>
              <pre>
                {`lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.`}
              </pre>
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li>lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</li>
            <li>User <span>2025.06.03</span></li>
            <li>
              <pre>
                {`lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.`}
              </pre>
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li>lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</li>
            <li>User <span>2025.06.03</span></li>
            <li>
              <pre>
                {`lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.`}
              </pre>
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li>lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</li>
            <li>User <span>2025.06.03</span></li>
            <li>
              <pre>
                {`lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.`}
              </pre>
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li>lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</li>
            <li>User <span>2025.06.03</span></li>
            <li>
              <pre>
                {`lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.`}
              </pre>
            </li>
          </ul>
        </li>

      </ul>

      {isPopupOpen && (
        <div className="review-popup">
          <div className="review-popup-content">
            <span>리뷰 작성하기</span>
            <form>
              <div className="review-form-group">
                <input type="text" onChange={(e) => setTitle(e.target.value)} placeholder="제목을 입력해주세요." />
              </div>
              <div className="review-form-group">
                <textarea onChange={(e) => setDetail(e.target.value)} placeholder="내용을 입력해주세요."></textarea>
              </div>
              <div className="review-popup-buttons">
                <button type="submit" onClick={comment}>작성완료</button>
                <button type="button" onClick={handleClosePopup}>취소</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Review
