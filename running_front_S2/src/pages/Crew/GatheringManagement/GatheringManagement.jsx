/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { useGetGatheringsQuery } from "../../../queries/useGetGatheringsQuery";
import * as s from "./styles";
import ContentLayout from "../../../components/ContentLayout/ContentLayout";
import { useCrewStore } from "../../../stores/useCrewStroes";

function GatheringManagement() {
  const { crewId } = useCrewStore();
  const gatheringsQuery = useGetGatheringsQuery(crewId);
  const [gatherings, setGatherings] = useState([]);
  const [participants, setParticipants] = useState([]);

  return (
    <ContentLayout>
      <div>
        <header>
          <h2>정모 관리</h2>
        </header>
      </div>
    </ContentLayout>
  );
}

export default GatheringManagement;
