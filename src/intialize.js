import * as EXP from "./explanaria/main";

function polarToCartesian(theta, r) {
  return [r * Math.cos(theta), r * Math.sin(theta), 0];
}

export function create_diamond(params) {
  let blue = 0x00ffee;
  var diamond = new EXP.Area({
    bounds: [
      [0, 2 * Math.PI],
      [0, params.diamond_radius],
    ],
    numItems: 30,
  });
  var circleTransform = new EXP.Transformation({
    expr: (i, t, theta, r) => polarToCartesian(theta, r),
  });

  var coordinates = new EXP.Transformation({
    expr: (i, t, x, y, z) => [x, y, z],
  });

  var line = new EXP.LineOutput({
    width: 3,
    color: blue,
    opacity: 1,
  });

  return {
    diamond: diamond,
    circleTransform: circleTransform,
    coordinates: coordinates,
    line: line,
  };
}

export function create_person(params) {
  let purple = 0x2a0a4d;
  let green = 0x0a4d1c;
  let red = 0x6e0404;
  var person = new EXP.Area({
    bounds: [
      [-params.box_width, params.box_width],
      [-params.box_height, params.box_height],
    ],
    numItems: 2,
  });

  var coordinates = new EXP.Transformation({
    expr: (i, t, x, y, z) => [x, y, z],
  });

  var line = new EXP.LineOutput({
    width: 5,
    color: purple,
    opacity: 1,
  });
  return { person: person, coordinates: coordinates, line: line };
}
