// import React, { useState, useEffect } from "react";
// import Request from "../components/collaboration/Request";
// import {
//   RequestPageContainer,
//   RequestTypeContainer,
//   SelectType,
//   RequestsContainer
// } from "../styled-components/styled-Request";


// const TYPES = {
//   SENDTO: 'sendto',
//   RECEIVETO: 'receiveto',
// };

// const INIT = [];

// const TEMP_SENDTO = [
//   {
//     otherUser: "UMC",
//     title: "2025 IT 컨퍼런스 공동 개최",
//   },
//   {
//     otherUser: "더쿠",
//     title: "2D 픽셀 게임 런칭 프로젝트",
//   }
// ];

// const TEMP_RECEIVETO = [
//   {
//     otherUser: "LVflower",
//     title: "2025 IT 컨퍼런스 공동 개최",
//   },
//   {
//     otherUser: "갓페퍼민트",
//     title: "2D 픽셀 게임 런칭 프로젝트",
//   }
// ];

// function RequestPage( type ) {
//   const [requests, setRequests] = useState(INIT);

//   useEffect(() => {
//     async function fetchCollabRequests() {
//       try {
//         // const response = await fetch('/api/collabRequest/');
//         // const data = await response.json();
//         // setRequests(data.slice(0, 2)); // 몇개 
//       } catch (error) {
//         console.error('Failed to fetch requests:', error);
//       }
//     }

//     fetchCollabRequests();
//   }, []);

//   const displaySendto = requests.length > 0 ? requests : TEMP_SENDTO;
//   const displayRecieveto = requests.length > 0 ? requests : TEMP_RECEIVETO;

//   return (
//     <RequestPageContainer>
//       <h1>협업 요청 확인하기</h1>
//       <RequestTypeContainer>
//         <SelectType type={type}>보낸 요청</SelectType> | <SelectType type={type}>받은 요청</SelectType>
//       </RequestTypeContainer>
//       <RequestGrid>
//         {displayRequests.slice(0, 2).map((request, index) => (
//           <Request
//             key={index}
//             profile={request.profile}
//             clubName={request.clubName}
//             collabName={request.collabName}
//           />
//         ))}
//       </RequestGrid>
//     </RequestPageContainer>
//   );
// }

// export default RequestPage;
import React from 'react';
// import Pagenation from "../components/pagenation";

const RequestPage = () =>{
  return(
      <>
          <h3>협업 요청 페이지</h3>

          {/* <Pagenation></Pagenation> */}
      </>
  )
}

export default RequestPage;