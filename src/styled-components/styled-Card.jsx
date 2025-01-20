import styled from 'styled-components';
import { VARIANTS } from '../components/Card';

export const CardContainer = styled.div`
  width: ${({ variant }) => variant === VARIANTS.PROJECT ? '530px' : '480px'};
  height: ${({ variant }) => variant === VARIANTS.PROJECT ? '100px' : '160px'};
  display: flex;
  ${({ variant }) => (variant === VARIANTS.CLUB || variant === VARIANTS.PROJECT) ? `
    background-color: #F2F2F2;
    border-radius: 16px;
    padding: 20px;
    gap: 20px;
  ` : `
    flex-direction: column;
    justify-content: space-between;
    padding: 12px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    background-color: #ffffff;
  `}
`;

export const Thumbnail = styled.div`
  ${props => {
    if (props.variant === 'project') {
      return `
        width: 100px;
        height: 100px;
        background-color: #D9D9D9;
        border-radius: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
      `;
    } else if (props.variant === 'club') {
      return `
        width: 153px;
        height: 153px;
        background-color: #D9D9D9;
        border-radius: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 24px;
      `;
    } else {
      return `
        width: 40px;
        height: 40px;
        background-color: #e0e0e0;
        border-radius: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
      `;
    }
  }}
`;

export const ContentSection = styled.div`
  ${props => {
    if (props.variant === 'project') {
      return `
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 15px;
      `;
    } else if (props.variant === 'club') {
      return `
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 8px;
      `;
    }
  }}
`;

export const Badge = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  padding: 6px 12px;
  border-radius: 100px;
  width: fit-content;
  font-size: 14px;
  font-weight: 500;
`;

export const Title = styled.h3`
  ${props => {
    if (props.variant === 'project') {
      return `
        font-size: 21px;
        font-weight: 600;
        margin: 0;
        color: #000;
      `;
    } else if (props.variant === 'club') {
      return `
        font-size: 24px;
        font-weight: 600;
        margin: 0;
        color: #000;
      `;
    }
  }}
`;

export const Content = styled.p`
  font-size: ${props => props.variant === 'project' ? '14px' : '16px'};
  color: ${props => props.variant === 'project' ? '#666' : '#757575'};
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #757575;
`; 