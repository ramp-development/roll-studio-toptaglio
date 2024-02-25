import { home } from './home';

export const pages = () => {
  console.log('pages');

  const { pathname } = window.location;
  switch (pathname) {
    case '/':
      home();
      break;
    default:
      break;
  }
};
