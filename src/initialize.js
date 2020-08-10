import * as EXP from "./explanaria/main";

function polarToCartesian(theta, r) {
  return [r * Math.cos(theta), r * Math.sin(theta), 0];
}

/* ------------------------ Diamond Class Declaration ----------------------- */
export class Diamond {
  constructor(diamond_radius, presentation, color) {
    this.color = color;
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
      expr: (i, t, theta, r) => polarToCartesian(theta, r),
    });
    this.coordinates = new EXP.Transformation({
      expr: (i, t, x, y, z) => [x, y, z],
    });
    this.line = new EXP.LineOutput({
      width: 3,
      color: this.color,
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
        expr: (i, t, x, y, z) => [
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
    this.coordinates, (this.scaleX = 1);
    this.scaleY = 1;
    this.scaleZ = 1;

    this.x = 0;
    this.y = 0;
    this.z = 0;

    EXP.TransitionTo({ expr: (i, t, x, y, z) => [x, y, z] }, 50);
  }
  switch(opacity) {
    this.opacity = opacity;
    this.presentation.TransitionTo(this.line, { opacity: this.opacity }, 300);
  }
}
/* ------------------------ Person Class Declaration ------------------------ */
// this was a less great way of completing things but I am going to keep things the way they are because i have spent way too much time reformating code up till this point
export class Person {
  constructor(box_width, box_height, color, numItems, presentation) {
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
    this.numItems = numItems;
  }

  create_person() {
    this.person = new EXP.Area({
      bounds: [
        [-this.box_width, this.box_width],
        [-this.box_height, this.box_height],
      ],
      numItems: this.numItems,
    });

    this.coordinates = new EXP.Transformation({
      expr: (i, t, x, y, z) => [x, y, z],
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
        expr: (i, t, x, y, z) => [
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
      { expr: (i, t, x, y, z) => [x, y, z] },
      50
    );
  }
  switch(opacity) {
    this.opacity = opacity;
    this.presentation.TransitionTo(this.line, { opacity: opacity }, 300);
  }
}

// better way of doing this
export class Line {
  constructor(xdomain, ydomain, color, presentation) {
    this.xdomain = xdomain;
    this.ydomain = ydomain;
    this.color = color;
    this.presentation = presentation;

    this.x = 0;
    this.y = 0;
    this.scaleX = 1;
    this.scaleY = 1;
  }
  create_line() {
    this.line = new EXP.Area({
      bounds: [this.xdomain, this.ydomain],
      numItems: 40,
    });
    this.coordinates = new EXP.Transformation({ expr: (i, t, x, y) => [x, y] });
    this.output = new EXP.LineOutput({
      width: 5,
      color: this.color,
      opacity: 0,
    });

    return {
      line: this.line,
      coordinates: this.coordinates,
      output: this.output,
    };
  }
  move({ a = 0, b = 0, scaleA, scaleB, length = 1000 }) {
    this.scaleX = scaleA || this.scaleX;
    this.scaleY = scaleB || this.scaleY;

    let x_calc = this.x + a;
    let y_calc = this.y + b;

    this.presentation.TransitionTo(
      this.coordinates,
      {
        expr: (i, t, x, y, z) => [
          this.scaleX * x + x_calc,
          this.scaleY * y + y_calc,
        ],
      },
      length
    );
    this.a = a;
    this.b = b;
    this.x = this.x + this.a;
    this.y = this.y + this.b;
  }
  reset() {
    this.scaleX = 1;
    this.scaleY = 1;

    this.x = 0;
    this.y = 0;
    EXP.TransitionTo(this.coordinates, { expr: (i, t, x, y) => [x, y] }, 50);
  }
  switch(opacity, length=300) {
    this.opacity = opacity;
    this.presentation.TransitionTo(this.output, { opacity: opacity }, length);
  }
}

export function makeTexPlane(textureName, width, height, apparentWidth){

  var tex = new THREE.TextureLoader().load( textureName );
  var plane = new THREE.Mesh(new THREE.PlaneGeometry(apparentWidth, apparentWidth*height/width,1,1), new THREE.MeshBasicMaterial({ opacity: 0.0, transparent: true, side: THREE.BothSides, map:tex}));
  three.scene.add(plane);
  return plane;
}