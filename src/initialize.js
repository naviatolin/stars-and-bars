import * as EXP from "./explanaria/main";

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

    let x_calc = this.x + a;
    let y_calc = this.y + b;
    let z_calc = this.z + c;

    this.presentation.TransitionTo(
      this.coordinates,
      {
        'expr': (i, t, x, y, z) => [
          this.scaleX * x + x_calc,
          this.scaleY * y + y_calc,
          this.scaleZ * z + z_calc,
        ],
      },
      length
    );
    this.a = a;
    this.b = b;
    this.c = c;
    this.x = this.x + this.a;
    this.y = this.y + this.b;
    this.z = this.z + this.c;
  }

  reset() {
    this.coordinates,
    this.scaleX = 1;
    this.scaleY = 1;
    this.scaleZ = 1;
    
    this.x = 0;
    this.y = 0;
    this.z = 0;
    
    EXP.TransitionTo(
      { 'expr': (i, t, x, y, z) => [x, y, z], },
      500
    );
  }
}
/* ------------------------ Person Class Declaration ------------------------ */
export class Person {
  constructor(box_width, box_height, color, presentation) {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.scaleZ = 1;
    this.box_height = box_height;
    this.box_width = box_width;
    this.color = color;
    this.presentation = presentation;
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
    
    let x_calc = this.x + a;
    let y_calc = this.y + b;
    let z_calc = this.z + c;
    
    this.presentation.TransitionTo(
      this.coordinates,
      {
        'expr': (i, t, x, y, z) => [
          this.scaleX * x + x_calc,
          this.scaleY * y + y_calc,
          this.scaleZ * z + z_calc,
        ],
      },
      length
      );
      this.a = a;
      this.b = b;
      this.c = c;
      this.x = this.x + this.a;
      this.y = this.y + this.b;
      this.z = this.z + this.c;
    }
    reset() {
      this.scaleX = 1;
      this.scaleY = 1;
      this.scaleZ = 1;

      this.x = 0;
      this.y = 0;
      this.z = 0;
      EXP.TransitionTo(
        this.coordinates,
        { 'expr': (i, t, x, y, z) => [x, y, z], },
        500
      );
    }
  }
  