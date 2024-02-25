import gsap from 'gsap';
import MorphSVGPlugin from 'gsap/MorphSVGPlugin';

import { pages } from './pages';

window.Webflow ||= [];
window.Webflow.push(() => {
  gsap.registerPlugin(MorphSVGPlugin);
  pages();
});
