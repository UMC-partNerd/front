export const getRedirectURI = () => {
  const hostname = window.location.hostname;

  if (hostname === 'localhost') {
      return 'http://localhost:3000/oauth/kakao/callback';
  } else if (hostname === 'api.partnerd.site') {
      return 'https://api.partnerd.site/oauth/kakao/callback';
  } else if (hostname === 'part-nerd-fe.vercel.app') {
      return 'https://part-nerd-fe.vercel.app/oauth/kakao/callback';
  } else {
      throw new Error('Error: ', error);
  }
};