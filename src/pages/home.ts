import gsap from 'gsap';
import MorphSVGPlugin from 'gsap/MorphSVGPlugin';

import { queryElement } from '$utils/queryElement';

export const home = () => {
  const attr = 'data-hero';
  const path = queryElement<SVGPathElement>(`[${attr}="path"]`);
  const text1 = queryElement<HTMLDivElement>(`[${attr}="text1"]`);
  const text2 = queryElement<HTMLDivElement>(`[${attr}="text2"]`);
  if (!path || !text1 || !text2) return;

  // define the paths for reuse
  const profile1Path =
      'M-2000 526 L0 526 L96 526 L96 288.805 L216 288.805 L307 211.44 L307 515.798 L651 223.342 L749 526 L861 526 L861 4 L1082 4 L1082 526 L1198 526 L1308 432.82 L3500 432.82',
    profile2Path =
      'M-2000 526 L0 526 L92.9645 526 L303.884 173 L524.799 173 L745.715 526 L745.715 238.8323 L1078.59 238.8323 L1078.59 526 L1283 526 L1288 526 L1293 526 L1298 526 L1303 526 L1308 526 L3500 526',
    linePath = 'M0 526 L1311 526';

  // define structure for the points
  interface Point {
    d: string;
    text: string;
  }

  // define the points
  const points: Point[] = [
    {
      d: profile1Path,
      text: 'think',
    },
    {
      d: linePath,
      text: 'move',
    },
    {
      d: profile2Path,
      text: 'build',
    },
    {
      d: linePath,
      text: 'peat',
    },
  ];

  // create a line timeline that repeats indefinitely
  const lineTimeline = gsap.timeline({
    repeat: -1,
    defaults: { duration: 1, ease: 'Power2.easeInOut' },
  });

  // create a text timeline
  const textTimeline = gsap.timeline({
    defaults: { duration: 1, ease: 'Power2.easeInOut' },
    paused: true,
  });

  // animate the texts up
  textTimeline.to([text1, text2], { yPercent: -100 });

  points.forEach((point, index) => {
    /**
     * index === 0
     * - set initial path
     * - set text1
     *
     * index === 1
     * - set text2
     *
     * index is even
     * - set text1
     * - yPercent is 0
     *
     * index is odd
     * - set text2
     * - yPercent is -100
     *
     * index is last
     * - set back to the initial path
     * - set back to text1
     */

    // determine if the point is first, last and/or even
    const isFirst = index === 0,
      isLast = index === points.length - 1,
      isEven = index % 2 === 0;

    // destructure the point
    const { d, text } = point;

    if (index === 0) {
      // if its the first point, set initial path and text1
      path.setAttribute('d', d);
      text1.textContent = text;
    } else if (index === 1) {
      // if its the second point, set initial text2
      text2.textContent = text;
    }

    // morph to the point
    lineTimeline.to(
      path,
      {
        morphSVG: d,
        onStart: () => {
          switch (isEven) {
            case true:
              // set the text and animate the texts down
              text1.textContent = text;
              textTimeline.reverse();
              break;
            case false:
              // set the text and animate the texts up
              text2.textContent = text;
              textTimeline.play();
              break;
          }
        },
      },
      isFirst ? 0 : '>1'
    );

    // if its the last point, morph back to the initial point
    if (isLast) {
      lineTimeline.to(
        path,
        {
          morphSVG: points[0].d,
          onStart: () => {
            text1.textContent = points[0].text;
            textTimeline.reverse();
          },
        },
        '>1'
      );
    }
  });
};
