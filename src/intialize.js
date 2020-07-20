import * as EXP from "./explanaria/main";
function polarToCartesian(theta, r) {
  return [r * Math.cos(theta), r * Math.sin(theta), 0];
}

export class Diamond {
  constructor(diamond_radius) {
    this.blue = 0x00ffee;
    this.diamond_radius = diamond_radius;
  }

  create_diamond() {
    let diamond = new EXP.Area({
      bounds: [
        [0, 2 * Math.PI],
        [0, this.diamond_radius],
      ],
      numItems: 30,
    });
    let circleTransform = new EXP.Transformation({
      expr: (i, t, theta, r) => polarToCartesian(theta, r),
    });
    let coordinates = new EXP.Transformation({
      expr: (i, t, x, y, z) => [x, y, z],
    });
    let line = new EXP.LineOutput({
      width: 3,
      color: this.blue,
      opacity: 1,
    });
    return {
      diamond: diamond,
      circleTransform: circleTransform,
      coordinates: coordinates,
      line: line,
    };
  }
}

export class Person {
  constructor(box_width, box_height, color) {
    this.box_height = box_height;
    this.box_width = box_width;
    this.color = color;
  }

  create_person() {
    var person = new EXP.Area({
      bounds: [
        [-this.box_width, this.box_width],
        [-this.box_height, this.box_height],
      ],
      numItems: 2,
    });

    var coordinates = new EXP.Transformation({
      expr: (i, t, x, y, z) => [x, y, z],
    });

    var line = new EXP.LineOutput({
      width: 5,
      color: this.color,
      opacity: 1,
    });
    return { person: person, coordinates: coordinates, line: line };
  }
}
