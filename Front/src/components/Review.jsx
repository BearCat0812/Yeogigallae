import React, { useState, useEffect } from 'react'
import './Review.css'

const Review = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

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
                <input type="text" placeholder="제목을 입력해주세요."/>
              </div>
              <div className="review-form-group">
                <textarea placeholder="내용을 입력해주세요."></textarea>
              </div>
              <div className="review-popup-buttons">
                <button type="submit">작성완료</button>
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
