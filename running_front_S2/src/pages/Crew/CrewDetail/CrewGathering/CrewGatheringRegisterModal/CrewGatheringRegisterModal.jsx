/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { FiPlus } from "react-icons/fi";
import {
  Map,
  MapMarker,
  MarkerClusterer,
  useKakaoLoader,
} from "react-kakao-maps-sdk";
import { reqRegisterGathering } from "../../../../../api/Crew/crewGatheringApi";

function CrewGatheringRegisterModal({ crewId, isOpen, onClose }) {
  const mapLoader = useKakaoLoader({
    appkey: import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY,
    libraries: ["clusterer", "drawing", "services"],
  });
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [map, setMap] = useState(<></>);
  const [preview, setPreview] = useState({
    crewThumbnailImg: "",
  });
  const [addressText, setAddressText] = useState("");
  const [searchResultList, setSearchResultList] = useState([]);
  const [gatheringData, setGatheringData] = useState({
    title: "",
    content: "",
    crewThumbnailImg: "",
    runningDate: "",
    runningTime: "",
    placeName: "",
    address: "",
    roadAddress: "",
    latitude: "",
    longitude: "",
    cost: "",
    maxParticipants: "",
    km: "",
  });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (err) => {
          setError(err.message);
        },
        {
          enableHighAccuracy: true, // 정확한 위치
          timeout: 5000, // 5초 후 타임아웃
          maximumAge: 0, // 캐시된 위치 사용 안 함
        }
      );
    } else {
      setError("이 브라우저에서는 위치 정보를 지원하지 않습니다.");
    }
  }, []);

  useEffect(() => {
    console.log(location);
    if (!!location.lat && !!location.lng) {
      setMap(
        <Map
          center={{
            lat: location.lat,
            lng: location.lng,
          }}
          style={{
            flexGrow: 1,
          }}
          level={5}
        >
          <MapMarker
            position={{
              lat: location.lat,
              lng: location.lng,
            }}
          />
        </Map>
      );
    }
  }, [location]);

  const handleImgAddOnClick = (e, name) => {
    const fileInput = document.createElement("input");
    fileInput.setAttribute("type", "file");
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      setGatheringData((prev) => ({
        ...prev,
        [name]: file,
      }));
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        setPreview((prev) => ({
          ...prev,
          [name]: e.target.result,
        }));
      };

      fileReader.readAsDataURL(file);
    };

    fileInput.click();
  };

  const handleSearchAddressOnClick = () => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(addressText, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds();
        console.log(data);
        const handleClick = (item) => {
          setLocation({
            lat: item.y,
            lng: item.x,
          });
          setGatheringData((prev) => ({
            ...prev,
            placeName: item.place_name,
            address: item.address_name,
            roadAddress: item.road_address_name,
            latitude: item.y,
            longitude: item.x,
          }));
        };
        setSearchResultList(
          <div>
            {data.map((item) => (
              <div key={item.id} onClick={() => handleClick(item)}>
                <h3>{item.place_name}</h3>
                <p>{item.address_name}</p>
                <p>{item.road_address_name}</p>
                {item.phone && <p>전화: {item.phone}</p>}
              </div>
            ))}
          </div>
        );

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        // map.setBounds(bounds);
      }
    });
  };

  const handleInputOnChange = (e) => {
    setGatheringData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // const handleRegisterOnClick = () => {
  //   const formData = new FormData();
  //   Object.entries(gatheringData).forEach(([key, value]) => {
  //     formData.append(key, value);
  //   });
  //   formData.append("crewId", crewId);
  //   reqRegisterGathering(crewId, formData);
  // };

  const handleRegisterOnClick = async () => {
  try {
    const formData = new FormData();
    Object.entries(gatheringData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("crewId", crewId);

    await reqRegisterGathering(crewId, formData);

    onClose();
  } catch (error) {
    console.error("등록 실패:", error);
    alert("등록 중 오류가 발생했습니다.");
  }
}

  return (
    <ReactModal
      style={{
        overlay: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000000bb",
        },
        content: {
          position: "static",
          backgroundColor: "transparent",
          padding: "0",
          border: "none",
          borderRadius: "0",
        },
      }}
      isOpen={isOpen}
      onRequestClose={onClose}
    >
      <div css={s.layout}>
        <header css={s.header}>
          <h2>정모 일정 등록</h2>
        </header>
        <main css={s.main}>
          <div>
            {/* 썸네일 업로드 */}
            <div>
              <div>
                <img src={preview.crewThumbnailImg} alt="" />
              </div>
              <div
                css={s.plus}
                onClick={(e) => handleImgAddOnClick(e, "crewThumbnailImg")}
              >
                <FiPlus />
              </div>
              <div>썸네일 이미지</div>
            </div>
          </div>
          <div>
            <input
              type="text"
              placeholder="모임명"
              name="title"
              value={gatheringData.title}
              onChange={handleInputOnChange}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="설명"
              name="content"
              value={gatheringData.content}
              onChange={handleInputOnChange}
            />
          </div>
          <div>
            <input
              type="date"
              name="runningDate"
              value={gatheringData.runningDate}
              onChange={handleInputOnChange}
            />
          </div>
          <div>
            <input
              type="time"
              name="runningTime"
              value={gatheringData.runningTime}
              onChange={handleInputOnChange}
            />
          </div>
          <div>
            <div>
              <input
                type="text"
                placeholder="주소입력"
                value={addressText}
                onChange={(e) => setAddressText(e.target.value)}
              />
              <button onClick={handleSearchAddressOnClick}>검색</button>
            </div>
            <div css={s.mapContainer}>
              <div css={s.mapSearchResultList}>{searchResultList}</div>
              {map}
            </div>
          </div>
          <div>
            <input
              type="text"
              placeholder="러닝거리"
              name="km"
              value={gatheringData.km}
              onChange={handleInputOnChange}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="정모비용"
              name="cost"
              value={gatheringData.cost}
              onChange={handleInputOnChange}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="최대인원"
              name="maxParticipants"
              value={gatheringData.maxParticipants}
              onChange={handleInputOnChange}
            />
          </div>
          <div>
            <button onClick={handleRegisterOnClick}>등록하기</button>
          </div>
        </main>
      </div>
    </ReactModal>
  );
}

export default CrewGatheringRegisterModal;