import * as EXP from "./explanaria/main";
import { textSpanIntersectsWithTextSpan } from "typescript";

function polarToCartesian(theta, r) {
  return [r * Math.cos(theta), r * Math.sin(theta), 0];
}

/* ------------------------ Diamond Class Declaration ----------------------- */
export class Diamond {
  
  constructor(diamond_radius, presentation) {
    this.blue = 0x00ffee;
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.scaleZ = 1;
    this.diamond_radius = diamond_radius;
    this.presentation = presentation;
  }

  create_diamond() {
    this.diamond = new EXP.Area({
      bounds: [
        [0, 2 * Math.PI],
        [0, this.diamond_radius],
      ],
      numItems: 30,
    });
    this.circleTransform = new EXP.Transformation({
      'expr': (i, t, theta, r) => polarToCartesian(theta, r),
    });
    this.coordinates = new EXP.Transformation({
      'expr': (i, t, x, y, z) => [x, y, z],
    });
    this.line = new EXP.LineOutput({
      width: 3,
      color: this.blue,
      opacity: 1,
    });

    return {
      diamond: this.diamond,
      circleTransform: this.circleTransform,
      coordinates: this.coordinates,
      line: this.line,
    };
  }

  move({ a = 0, b = 0, c = 0, scaleA, scaleB, scaleC, length = 1000 }) {
    this.scaleX = scaleA || this.scaleX;
    this.scaleY = scaleB || this.scaleY;
    this.scaleZ = scaleC || this.scaleZ;

    this.x = a + this.x;
    this.y = b + this.y;
    this.z = c + this.z;

    this.presentation.TransitionTo(
      this.coordinates,
      {
        'expr': (i, t, x, y, z) => [
          this.scaleX * x + this.x,
          this.scaleY * y + this.y,
          this.scaleZ * z + this.z,
        ],
      },
      length
    );
  }
  last_state() {
    EXP.TransitionTo(
      this.coordinates,
      {
        'expr': (i, t, x, y, z) => [
          this.scaleX * x + this.x,
          this.scaleY * y + this.y,
          this.scaleZ * z + this.z,
        ],
      },
      500
    );
  }
  reset(){
    EXP.TransitionTo(this.coordinates,{'expr': (i, t, x, y, z) => [x, y, z]}, 500);
  }
}
/* ------------------------ Person Class Declaration ------------------------ */
export class Person {
  
  constructor(box_width, box_height, color) {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.scaleZ = 1;
    this.box_height = box_height;
    this.box_width = box_width;
    this.color = color;
  }

  create_person() {
    this.person = new EXP.Area({
      bounds: [
        [-this.box_width, this.box_width],
        [-this.box_height, this.box_height],
      ],
      numItems: 2,
    });

    this.coordinates = new EXP.Transformation({
      'expr': (i, t, x, y, z) => [x, y, z],
    });

    this.line = new EXP.LineOutput({
      width: 5,
      color: this.color,
      opacity: 1,
    });

    return {
      person: this.person,
      coordinates: this.coordinates,
      line: this.line,
    };
  }
  move({ a = 0, b = 0, c = 0, scaleA, scaleB, scaleC, length = 1000 }) {
    this.scaleX = scaleA || this.scaleX;
    this.scaleY = scaleB || this.scaleY;
    this.scaleZ = scaleC || this.scaleZ;

    this.x = a + this.x;
    this.y = b + this.y;
    this.z = c + this.z;

    EXP.TransitionTo(
      this.coordinates,
      {
        'expr': (i, t, x, y, z) => [
          this.scaleX * x + this.x,
          this.scaleY * y + this.y,
          this.scaleZ * z + this.z,
        ],
      },
      length
    );
  }
}
