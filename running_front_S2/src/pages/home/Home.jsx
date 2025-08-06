/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import * as s from "./styles";
import { FiUser } from "react-icons/fi";
import running from "../../assets/videos/running.mp4";
import runninPhoto from "../../assets/images/러닝.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

function Home(props) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [ searchParams ] = useSearchParams();
  const [showDropdown, setShowDropdown] = useState(false);
  const error = searchParams.get("error");

  if (error === "oauth2") {
    alert("OAuth2 인증에 실패했습니다. 다시 시도해주세요.");
    return;
  }

  useEffect(() => {
        const accessToken= searchParams.get("accessToken");
        if (!!accessToken) {
            localStorage.setItem("AccessToken", `Bearer ${accessToken}`);
            queryClient.invalidateQueries({
                queryKey: ["principal"],
            }).then(() => {
                navigate("/");
            })
        } else {
            navigate("/");
        }
    }, []);

  const handleLoginOnClick = () => {
    navigate("/auth/oauth2/login");
  }

  return (
    <div>
      <header css={s.header}>
        <div css={s.logo}>S2BestTeam</div>
        <nav css={s.nav}>
          <ul css={s.menu}>
            <li
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <a href="#">크루소개</a>
            </li>

            <li
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <a href="#">러닝안내</a>
            </li>

            <li
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <a href="#">커뮤니티</a>
            </li>
            <li
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <a href="#">갤러리</a>
            </li>
            <li
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <a href="#">고객센터</a>
            </li>
            <li
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <a href="#">크루등록</a>
            </li>
          </ul>

          {showDropdown && (
            <div
              css={s.fullDropdown}
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <div css={s.menuDetail}>
                <div>크루소개</div>
                <a href="#">지역별 크루</a>
              </div>
              <div css={s.menuDetail}>
                <div>러닝안내</div>
                <a href="#">정기런 일정</a>
                <a href="#">캘린더</a>
              </div>
              <div css={s.menuDetail}>
                <div>커뮤니티</div>
                <a href="#">자유게시판</a>
              </div>
              <div css={s.menuDetail}>
                <div>갤러리</div>
                <a href="#">사진첩</a>
              </div>
              <div css={s.menuDetail}>
                <div>고객센터</div>
                <a href="#">공지사항</a>
                <a href="#">러너의 소리</a>
              </div>
              <div css={s.menuDetail}>
                <div>크루등록</div>
                <a href="#">크루등록</a>
              </div>
            </div>
          )}
        </nav>
``
        <div css={s.icons}>
          {/* 로그인시 프로필 이미지로 바뀜*/}
          <div css={s.icon} onClick={handleLoginOnClick}>
            <FiUser />
          </div>
        </div>
      </header>

      <main>
        <div css={s.main}>
          <div css={s.mainVideo}>
            <video
              src={running}
              controls={false}
              muted={true}
              autoPlay={true}
              loop={true}
            />
          </div>
          <div css={s.mainText}>
            <div>코리아 아이티 아카데미 최강팀 S2</div>
            <div>Running Crew Gallery</div>
          </div>
          <div css={s.mainGallery}>
            <Slider
              centerMode={true}
              infinite={true}
              sliderToShow={1}
              speed={500}
              initialSlide={2}
              slidesToScroll={1}
              variableWidth={true}
              centerPadding={"60px"}
              autoplay={true}
              autoplaySpeed={4000}
              ltr={true}
            >
              <div css={s.sliderImg}>
                1
                <img src={runninPhoto} alt="" />
              </div>
              <div css={s.sliderImg}>
                1
                <img src={runninPhoto} alt="" />
              </div>
              <div css={s.sliderImg}>
                1
                <img src={runninPhoto} alt="" />
              </div>
              <div css={s.sliderImg}>
                1
                <img src={runninPhoto} alt="" />
              </div>
              <div css={s.sliderImg}>
                1
                <img src={runninPhoto} alt="" />
              </div>
            </Slider>
          </div>
        </div>
      </main>
      <footer>
        <div css={s.footer}>footer 자리입니다.</div>
      </footer>
    </div>
  );
}

export default Home;