import { atom } from 'recoil';

// 알림: 목록
export const alarmListState = atom({
    key: 'alarmListState',
    default: [],
});
  
// 알림: 아이콘 배지
export const alarmCountState = atom({ 
    key: 'alarmCountState',
    default: 0,
});

// 프로젝트>홍보: 투표하기
export const voteCountState = atom({ 
    key: 'voteCountState',
    default: 0,
});

// 커뮤니티: 좋아요
export const likeCountState = atom({ 
    key: 'likeCountState',
    default: 0,
});

