import React from 'react'
import './About.css'

const About = () => {
  return (
    <div className="about-container">
        <div className="about-box">
            <div className="about-box-left">
                <div className="box-img">
                    <img src="/images/1.jpg" alt="피크니크 홍대경의선숲길점" />
                </div>
                <div className="box-img-shadow"></div>
            </div>
            <div className="about-box-right">
                <ul>
                    <li className="italic">about</li>
                    <li className="placeName">피크니크 홍대경의선숲길점</li>
                    <li className="address">서울 마포구 서강로 13길 24</li>
                    <li className="placeEx">
                        <pre>
{`피크니크는 여유와 설렘 속에서 시작되었습니다. 도심 속 맛있는 휴식을 제공하기 위해 시작된 피크니크는 즐거운 일상을 제공합니다.
수플레 팬케이크와 에그타르트, 쌀사브레 쿠키등 직접 제조된 시설에서 공급하며, 누구도 흉내내기 어려운 맛으로 차별화를 꾀하고 있습니다. 
​손님과 점주 모두 만족스러운 푸드 브랜드가 되기위해 꾸준히 노력하겠습니다. 

영업시간(동절기) 11:00 ~ 21:00*
주차:신촌2노외주차장, 서강민영주차장

경의선숲길 공원뷰 카페. 도심속 피크닉`}
                        </pre>
                    </li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default About
