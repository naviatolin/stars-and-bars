import * as EXP from "./explanaria/main";
import { textSpanIntersectsWithTextSpan } from "typescript";

function polarToCartesian(theta, r) {
  return [r * Math.cos(theta), r * Math.sin(theta), 0];
}

/* ------------------------ Diamond Class Declaration ----------------------- */
export class Diamond {
  blue = 0x00ffee;
  x = 0;
  y = 0;
  z = 0;
  scaleX = 1;
  scaleY = 1;
  scaleZ = 1;

  constructor(diamond_radius, presentation) {
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
      expr: (i, t, theta, r) => polarToCartesian(theta, r),
    });
    this.coordinates = new EXP.Transformation({
      expr: (i, t, x, y, z) => [x, y, z],
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
    this.scaleX = scaleA ?? this.scaleX;
    this.scaleY = scaleB ?? this.scaleY;
    this.scaleZ = scaleC ?? this.scaleZ;

    this.x = a + this.x;
    this.y = b + this.y;
    this.z = c + this.z;

    this.presentation.TransitionTo(
      this.coordinates,
      {
        expr: (i, y, z) => [
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
        expr: (i, y, z) => [
          this.scaleX * x + this.x,
          this.scaleY * y + this.y,
          this.scaleZ * z + this.z,
        ],
      },
      500
    );
  }
}
/* ------------------------ Person Class Declaration ------------------------ */
export class Person {
  x = 0;
  y = 0;
  z = 0;
  scaleX = 1;
  scaleY = 1;
  scaleZ = 1;

  constructor(box_width, box_height, color) {
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
      expr: (i, y, z) => [x, y, z],
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
    this.scaleX = scaleA ?? this.scaleX;
    this.scaleY = scaleB ?? this.scaleY;
    this.scaleZ = scaleC ?? this.scaleZ;

    this.x = a + this.x;
    this.y = b + this.y;
    this.z = c + this.z;

    EXP.TransitionTo(
      this.coordinates,
      {
        expr: (i, y, z) => [
          this.scaleX * x + this.x,
          this.scaleY * y + this.y,
          this.scaleZ * z + this.z,
        ],
      },
      length
    );
  }
}
