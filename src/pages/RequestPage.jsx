import React, { useState, useEffect } from "react";
import Request from "../components/Request";
import {
  RequestPageContainer,
  RequestTypeContainer,
  Type,
  RequestGrid
} from "../styled-components/styled-Collaboration";

export const TYPES = {
  SENDTO: 'sendto',
  RECEIVETO: 'receiveto',
};

const INITIAL_REQUESTS = [];

const TEMP_REQUESTS = [
  {
    otherUser: "UMC",
    title: "2025 IT 컨퍼런스 공동 개최",
  },
  {
    otherUser: "Techtech",
    title: "2025 IT 컨퍼런스 공동 개최",
  }
];

function RequestPage( type ) {
  const [requests, setRequests] = useState(INITIAL_REQUESTS);

  useEffect(() => {
    async function fetchCollabRequests() {
      try {
        // const response = await fetch('/api/collabRequest/');
        // const data = await response.json();
        // setRequests(data.slice(0, 2)); // 몇개 
      } catch (error) {
        console.error('Failed to fetch requests:', error);
      }
    }

    fetchCollabRequests();
  }, []);

  const displayRequests = requests.length > 0 ? requests : TEMP_REQUESTS;

  return (
    <RequestPageContainer>
      <h1>협업 요청 확인하기</h1>
      <RequestTypeContainer>
        <SelectType type={type}>보낸 요청</SelectType> | <SelectType type={type}>받은 요청</SelectType>
      </RequestTypeContainer>
      <RequestGrid>
        {displayRequests.slice(0, 4).map((request, index) => (
          <Request
            key={index}
            profile={request.profile}
            otherUser={request.otherUser}
            title={request.title}
          />
        ))}
      </RequestGrid>
    </RequestPageContainer>
  );
}

export default RequestPage;
