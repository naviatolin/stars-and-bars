import * as EXP from "./explanaria/main";
import { textSpanIntersectsWithTextSpan } from "typescript";

type Transformation = {
  a?: number;
  b?: number;
  c?: number;
  scaleA?: number;
  scaleB?: number;
  scaleC?: number;
  length?: number;
};

function polarToCartesian(theta: number, r: number) {
  return [r * Math.cos(theta), r * Math.sin(theta), 0];
}

/* ------------------------ Diamond Class Declaration ----------------------- */
export class Diamond {
  blue = 0x00ffee;
  x: number = 0;
  y: number = 0;
  z: number = 0;
  scaleX: number = 1;
  scaleY: number = 1;
  scaleZ: number = 1;
  diamond_radius: number;
  diamond: any;
  circleTransform: any;
  coordinates: any;
  line: any;

  constructor(diamond_radius: number) {
    this.diamond_radius = diamond_radius;
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
      expr: (i: any, t: any, theta: any, r: any) => polarToCartesian(theta, r),
    });
    this.coordinates = new EXP.Transformation({
      expr: (i: any, t: any, x: any, y: any, z: any) => [x, y, z],
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

  move({
    a = 0,
    b = 0,
    c = 0,
    scaleA,
    scaleB,
    scaleC,
    length = 1000,
  }: Transformation) {
    this.scaleX = scaleA ?? this.scaleX;
    this.scaleY = scaleB ?? this.scaleY;
    this.scaleZ = scaleC ?? this.scaleZ;

    this.x = a + this.x;
    this.y = b + this.y;
    this.z = c + this.z;

    EXP.TransitionTo(
      this.coordinates,
      {
        expr: (i: any, t: any, x: number, y: number, z: number) => [
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
        expr: (i: any, t: any, x: number, y: number, z: number) => [
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
  box_height: number;
  box_width: number;
  color: number;
  x: number = 0;
  y: number = 0;
  z: number = 0;
  scaleX: number = 1;
  scaleY: number = 1;
  scaleZ: number = 1;
  person: any;
  coordinates: any;
  line: any;

  constructor(box_width: number, box_height: number, color: number) {
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
      expr: (i: any, t: any, x: number, y: number, z: number) => [x, y, z],
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
  move({
    a = 0,
    b = 0,
    c = 0,
    scaleA,
    scaleB,
    scaleC,
    length = 1000,
  }: Transformation) {
    this.scaleX = scaleA ?? this.scaleX;
    this.scaleY = scaleB ?? this.scaleY;
    this.scaleZ = scaleC ?? this.scaleZ;

    this.x = a + this.x;
    this.y = b + this.y;
    this.z = c + this.z;

    EXP.TransitionTo(
      this.coordinates,
      {
        expr: (i: any, t: any, x: number, y: number, z: number) => [
          this.scaleX * x + this.x,
          this.scaleY * y + this.y,
          this.scaleZ * z + this.z,
        ],
      },
      length
    );
  }
}
