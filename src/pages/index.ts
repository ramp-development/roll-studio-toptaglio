import { home } from './home';

export const pages = () => {
  const { pathname } = window.location;
  switch (pathname) {
    case '/':
      home();
      break;
    case '/en':
      home();
      break;
    default:
      break;
  }
};
