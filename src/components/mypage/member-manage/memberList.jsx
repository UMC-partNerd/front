import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Button, { TYPES } from '../components/common/button';

import styled from "styled-components";

const memberList = () =>{
    return(
        <Container>
            <SubContainer>
            <ImageComp />
            <NameField>
                <Name>이름</Name>
                <Explan>설명</Explan>
            </NameField>
            </SubContainer>
            <ButtonBlue style={{width:'60px', height:'15px'}}>채팅</ButtonBlue>
        </Container>
    )
}

export default memberList;