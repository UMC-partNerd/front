import React, { useState } from 'react';
import {
    ManageConcainer,
    CancelContainer,
    ManageNavBar,
    ManageItem,
    UnderBarWrapper,
    SelectedItem,
    UnderBar,
    UserListWrapper
} from '../../../styled-components/member-Manage/styled-manageWindow';
import Modal from 'react-modal';
import Button, { TYPES } from "../../common/button";
import MemberList from './memberList';

export const VERSIONS = {
    APPROVE: 'approve', // 동아리 가입 승인
    MANAGE: 'manage'    // 멤버 관리
};

function ManageWindow ({ variant }) {
    const [openWindow, setOpenWindow] = useState(false);
    const closeWindow = setOpenWindow(false);

    const renderManageWindow = () => (
        <Modal 
            isOpen={openWindow}
            onRequestClose={closeWindow}
            style={ManageConcainer}
            ariaHideApp={false}     // appElement 숨김 여부
            contentLabel= '동아리 멤버 관리'
            shouldCloseOnOverlayClick={false}
        >
            {/* 창 끄기 x */}
            <CancelContainer>
                <Button
                    type={TYPES.CANCEL}
                    onClick={closeWindow}
                />
            </CancelContainer>
            {/* 승인 / 관리 */}
            <ManageNavBar>
                <ManageItem>동아리 가입 승인</ManageItem>
                <ManageItem>멤버 관리</ManageItem>
            </ManageNavBar>

            <UnderBarWrapper>
                <SelectedItem/>
                <UnderBar/>
            </UnderBarWrapper>

            {/* 사용자 리스트 x */}
            <UserListWrapper>
                <MemberList/>
            </UserListWrapper>
        </Modal>
    );

    if (variant === VERSIONS.APPROVE) {
    }

    if (variant === VERSIONS.MANAGE) {
    }

    return renderManageWindow();
};

export default ManageWindow;