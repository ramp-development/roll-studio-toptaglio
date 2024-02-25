import { easeInOutExpo } from './easeInOutExpo';

interface Point {
  x: number;
  y: number;
}

export class HomeAnimation {
  path: SVGPathElement | null;
  copy: HTMLElement | null;
  profile1: Point[];
  line1: Point[];
  profile2: Point[];
  line2: Point[];
  startTime?: number;
  fromSet?: Point[];
  toSet?: Point[];
  step?: number;
  fromTranslation?: number;
  toTranslation?: number;
  duration?: number;

  constructor() {
    this.path = document.querySelector('.line-intro path');
    this.copy = document.querySelector('.home-title-animated-wrapper');

    this.profile1 = [
      {
        x: -2000,
        y: 526,
      },
      {
        x: 0,
        y: 526,
      },
      {
        x: 96,
        y: 526,
      },
      {
        x: 96,
        y: 288.805,
      },
      {
        x: 216,
        y: 288.805,
      },
      {
        x: 307,
        y: 211.44,
      },
      {
        x: 307,
        y: 515.798,
      },
      {
        x: 651,
        y: 223.342,
      },
      {
        x: 749,
        y: 526,
      },
      {
        x: 861,
        y: 526,
      },
      {
        x: 861,
        y: 4,
      },
      {
        x: 1082,
        y: 4,
      },
      {
        x: 1082,
        y: 526,
      },
      {
        x: 1198,
        y: 526,
      },
      {
        x: 1308,
        y: 432.82,
      },
      {
        x: 3500,
        y: 432.82,
      },
    ];

    this.line1 = this.profile1.map((p) => {
      return { x: p.x, y: 526 };
    });

    const delta = 526 - 357;
    this.profile2 = [
      {
        x: -2000,
        y: delta + 357,
      },
      {
        x: 0,
        y: delta + 357,
      },
      {
        x: 92.9645,
        y: delta + 357,
      },
      {
        x: 303.884,
        y: delta + 4,
      },
      {
        x: 524.799,
        y: delta + 4,
      },
      {
        x: 745.715,
        y: delta + 357,
      },
      {
        x: 745.715,
        y: delta + 69.8323,
      },
      {
        x: 1078.59,
        y: delta + 69.8323,
      },
      {
        x: 1078.59,
        y: delta + 357,
      },
      {
        x: 1283,
        y: delta + 357,
      },
      {
        x: 1288,
        y: delta + 357,
      },
      {
        x: 1293,
        y: delta + 357,
      },
      {
        x: 1298,
        y: delta + 357,
      },
      {
        x: 1303,
        y: delta + 357,
      },
      {
        x: 1308,
        y: delta + 357,
      },
      {
        x: 3500,
        y: delta + 357,
      },
    ];

    this.line2 = this.profile2.map((p) => {
      return { x: p.x, y: 526 };
    });

    this.update = this.update.bind(this);
    setTimeout(this.startAnimation.bind(this), 1000);
  }

  startAnimation() {
    requestAnimationFrame(this.update);
    this.startTime = performance.now();
    this.fromSet = this.profile1;
    this.toSet = this.line1;
    this.step = 0;
    this.fromTranslation = -100;
    this.toTranslation = -100;
    this.duration = 1000;
  }

  update(time: number) {
    requestAnimationFrame(this.update);

    const progress = easeInOutExpo(Math.min((time - this.startTime) / this.duration, 1));

    if (this.path) {
      this.path.setAttribute('d', this.calculatePath(progress));
    }

    if (this.copy) {
      this.copy.style.transform = this.calculateTranslation(progress);
    }

    if (progress === 1) {
      this.step = (this.step + 1) % 8;
      this.startTime = performance.now();

      switch (this.step) {
        case 0:
          //demolition
          console.log('case: 0');
          this.fromSet = this.profile1;
          this.toSet = this.line1;
          this.fromTranslation = 0;
          this.toTranslation = -100;
          break;
        case 1:
          //delay
          console.log('case: 1');
          this.fromSet = this.line1;
          this.toSet = this.line1;
          this.fromTranslation = -100;
          this.toTranslation = -100;
          break;
        case 2:
          //building
          console.log('case: 2');
          this.fromSet = this.line2;
          this.toSet = this.profile2;
          this.fromTranslation = -100;
          this.toTranslation = 0;
          break;
        case 3:
          //delay
          console.log('case: 3');
          this.fromSet = this.profile2;
          this.toSet = this.profile2;
          this.fromTranslation = 0;
          this.toTranslation = 0;
          break;
        case 4:
          //demolition
          console.log('case: 4');
          this.fromSet = this.profile2;
          this.toSet = this.line2;
          this.fromTranslation = 0;
          this.toTranslation = -100;
          break;
        case 5:
          //delay
          console.log('case: 5');
          this.fromSet = this.line2;
          this.toSet = this.line2;
          this.fromTranslation = -100;
          this.toTranslation = -100;
          break;
        case 6:
          //building
          console.log('case: 6');
          this.fromSet = this.line1;
          this.toSet = this.profile1;
          this.fromTranslation = -100;
          this.toTranslation = 0;
          break;
        case 7:
          //delay
          console.log('case: 7');
          this.fromSet = this.profile1;
          this.toSet = this.profile1;
          this.fromTranslation = 0;
          this.toTranslation = 0;
          break;
      }
    }
  }

  calculatePath(progress: number) {
    const path = [];
    this.fromSet.forEach(
      function (p, index) {
        if (index === 0) {
          path.push('M');
        } else {
          path.push('L');
        }
        path.push(
          Math.round(
            (this.toSet[index].x + progress * (this.toSet[index].x - this.fromSet[index].x)) * 100
          ) / 100
        );
        path.push(' ');
        path.push(
          Math.round(
            (this.fromSet[index].y + progress * (this.toSet[index].y - this.fromSet[index].y)) * 100
          ) / 100
        );
      }.bind(this)
    );

    return path.join('');
  }

  calculateTranslation(progress: number) {
    const value = this.fromTranslation + progress * (this.toTranslation - this.fromTranslation);
    return 'translateY(' + value.toString() + '%)';
  }
}
