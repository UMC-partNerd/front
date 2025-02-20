import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TabMenu,
  Tab,
} from "../../../styled-components/styled-chat/chat";

const Tab = ({ tab1, tab2 }) => {
  const [selectedTab, setSelectedTab] = useState({tab1}); // tab1
  const navigate = useNavigate();

  // 요청 목록 불러오기
  useEffect(() => {
    fetchChats(selectedTab);
  }, [selectedTab]);

  return (
    <TabMenu>
        <Tab
            active={selectedTab === "tab1"}
            onClick={() => setSelectedTab("tab1")}
        >
            {tab1}
        </Tab>
        <Tab
            active={selectedTab === "tab2"}
            onClick={() => setSelectedTab("tab2")}
        >
            {tab2}
        </Tab>
    </TabMenu>
  )
};

export default Tab;