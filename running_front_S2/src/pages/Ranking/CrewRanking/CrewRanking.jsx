/** @jsxImportSource @emotion/react */
import * as s from './styles';
import { useEffect, useState } from "react";
import MainContainer from "../../../components/MainContainer/MainContainer";
import { reqGetCrewRankingTotalKM } from "../../../api/Ranking/rankingApi";

function CrewRanking(props) {
  const [ crewsRanking, setCrewsRanking ] = useState([]);

  useEffect(() => {
    reqGetCrewRankingTotalKM()
    .then(res => {
      setCrewsRanking(res.data.body);
    });
  },[])

  console.log(crewsRanking);
  

  return (
    <MainContainer>
      <div css={s.layout}>
        <div>
          <h3>뛴 거리 순</h3>
          <table>
            <thead>
              <tr>
                <th>등수</th>
                <th>크루 이름</th>
                <th>총 뛴 거리</th>
              </tr>
            </thead>
            <tbody>
              {
              crewsRanking.map((crew, index) => (
                <tr key={crew.crewId}>
                <td>{index + 1}</td>
                <td>{crew.crewName}</td>
                <td>{crew.gunguName}</td>
                <td>{crew.totalKm}</td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h3>유저 많은 순</h3>
          <table>
            <thead>
              <tr>
                <th>등수</th>
                <th>닉네임</th>
                <th>총 뛴 거리</th>
              </tr>
            </thead>
            <tbody>
              {
              crewsRanking.map((crew, index) => (
                <tr key={crew.crewId}>
                <td>{index + 1}</td>
                <td>{crew.crewName}</td>
                <td>{crew.gunguName}</td>
                <td>{crew.totalKm}</td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </MainContainer>
  );
}

export default CrewRanking;