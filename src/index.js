import "./static/styles/style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { create_diamond, create_person } from "./intialize";

import * as EXP from "./explanaria/main";

// setting up three
var three = EXP.setupThree(60, 25);
var controls = new OrbitControls(three.camera, three.renderer.domElement);
controls.enableRotate = false;

three.camera.position.set(0, 0, 10);
three.camera.lookAt(new THREE.Vector3(0, 0, 0));

console.log("Loaded.");

// setting up parameters
var params = {};
params.diamond_radius = 0.5;
params.freq = 2;
params.box_width = 1;
params.box_height = 2;

var diamond1 = create_diamond(params);
var diamond2 = create_diamond(params);
var diamond3 = create_diamond(params);
var diamond4 = create_diamond(params);
var diamond5 = create_diamond(params);

diamond1.diamond
  .add(diamond1.circleTransform)
  .add(diamond1.coordinates)
  .add(diamond1.line);
diamond2.diamond
  .add(diamond2.circleTransform)
  .add(diamond2.coordinates)
  .add(diamond2.line);
diamond3.diamond
  .add(diamond3.circleTransform)
  .add(diamond3.coordinates)
  .add(diamond3.line);
diamond4.diamond
  .add(diamond4.circleTransform)
  .add(diamond4.coordinates)
  .add(diamond4.line);
diamond5.diamond
  .add(diamond5.circleTransform)
  .add(diamond5.coordinates)
  .add(diamond5.line);

var person1 = create_person(params);
var person2 = create_person(params);
var person3 = create_person(params);

person1.person.add(person1.coordinates).add(person1.line);
person2.person.add(person2.coordinates).add(person2.line);
person3.person.add(person3.coordinates).add(person3.line);

three.on("update", function (time) {
  [
    diamond1.diamond,
    diamond2.diamond,
    diamond3.diamond,
    diamond4.diamond,
    diamond5.diamond,
    person1.person,
    person2.person,
    person3.person,
  ].map((i) => i.activate(time.t));
  controls.update();
});

animate();

var presentation = new EXP.UndoCapableDirector();

async function animate() {
  controls.enablePan = false;
  let reading_time = 1000;

  await presentation.begin();

  /* --------------------------- first slide: label1 -------------------------- */
  {
    // setting initial coordinates of the diamonds
    EXP.TransitionTo(
      diamond1.coordinates,
      { expr: (i, t, x, y, z) => [x, y, z] },
      5
    );
    EXP.TransitionTo(
      diamond2.coordinates,
      { expr: (i, t, x, y, z) => [x, y, z] },
      5
    );
    EXP.TransitionTo(
      diamond3.coordinates,
      { expr: (i, t, x, y, z) => [x, y, z] },
      5
    );
    EXP.TransitionTo(
      diamond4.coordinates,
      { expr: (i, t, x, y, z) => [x, y, z] },
      5
    );
    EXP.TransitionTo(
      diamond5.coordinates,
      { expr: (i, t, x, y, z) => [x, y, z] },
      5
    );

    // moving the coordinates of the people
    EXP.TransitionTo(
      person1.coordinates,
      { expr: (i, t, x, y, z) => [x, y, z] },
      5
    );
    EXP.TransitionTo(
      person3.coordinates,
      { expr: (i, t, x, y, z) => [x, y, z] },
      5
    );

    // moving the coordinates of the diamonds
    EXP.TransitionTo(
      diamond1.coordinates,
      { expr: (i, t, x, y, z) => [x - 6, y + 6, z] },
      1000
    );
    EXP.TransitionTo(
      diamond2.coordinates,
      { expr: (i, t, x, y, z) => [x - 3, y + 6, z] },
      1000
    );
    EXP.TransitionTo(
      diamond3.coordinates,
      { expr: (i, t, x, y, z) => [x, y + 6, z] },
      1000
    );
    EXP.TransitionTo(
      diamond4.coordinates,
      { expr: (i, t, x, y, z) => [x + 3, y + 6, z] },
      1000
    );
    EXP.TransitionTo(
      diamond5.coordinates,
      { expr: (i, t, x, y, z) => [x + 6, y + 6, z] },
      1000
    );

    // moving the coordinates of the people
    EXP.TransitionTo(
      person1.coordinates,
      { expr: (i, t, x, y, z) => [x - 6, y, z] },
      1000
    );
    EXP.TransitionTo(
      person3.coordinates,
      { expr: (i, t, x, y, z) => [x + 6, y, z] },
      1000
    );

    await presentation.delay(1000);
  }

  /* -------------------------- second slide: label2 -------------------------- */
  {
    await presentation.nextSlide();

    await presentation.delay(reading_time);

    // putting the diamonds into stacks

    // moving first 3 diamonds into person1
    EXP.TransitionTo(
      diamond1.coordinates,
      {
        expr: (i, t, x, y, z) => [
          x - 6,
          y - params.box_height + params.diamond_radius,
          z,
        ],
      },
      500
    );

    EXP.TransitionTo(
      diamond2.coordinates,
      {
        expr: (i, t, x, y, z) => [
          x - 6,
          y - params.box_height + 3 * params.diamond_radius,
          z,
        ],
      },
      500
    );

    EXP.TransitionTo(
      diamond3.coordinates,
      {
        expr: (i, t, x, y, z) => [
          x - 6,
          y - params.box_height + 5 * params.diamond_radius,
          z,
        ],
      },
      500
    );

    // moving fourth diamond into person2
    EXP.TransitionTo(
      diamond4.coordinates,
      {
        expr: (i, t, x, y, z) => [
          x,
          y - params.box_height + params.diamond_radius,
          z,
        ],
      },
      500
    );

    // moving fifth diamond into person3
    EXP.TransitionTo(
      diamond5.coordinates,
      {
        expr: (i, t, x, y, z) => [
          x + 6,
          y - params.box_height + params.diamond_radius,
          z,
        ],
      },
      500
    );

    await presentation.delay(reading_time);
  }
  /* --------------------------- third slide: label3 -------------------------- */
  {
    await presentation.nextSlide();

    // switching two diamonds out of the stack
    EXP.TransitionTo(
      diamond1.coordinates,
      {
        expr: (i, t, x, y, z) => [
          x - 8,
          y - params.box_height + 3 * params.diamond_radius,
          z,
        ],
      },
      500
    );

    EXP.TransitionTo(
      diamond3.coordinates,
      {
        expr: (i, t, x, y, z) => [
          x - 4,
          y - params.box_height + 3 * params.diamond_radius,
          z,
        ],
      },
      500
    );

    await presentation.delay(reading_time);

    // switching two diamonds back into stack
    EXP.TransitionTo(
      diamond1.coordinates,
      {
        expr: (i, t, x, y, z) => [
          x - 6,
          y - params.box_height + 5 * params.diamond_radius,
          z,
        ],
      },
      500
    );

    EXP.TransitionTo(
      diamond3.coordinates,
      {
        expr: (i, t, x, y, z) => [
          x - 6,
          y - params.box_height + params.diamond_radius,
          z,
        ],
      },
      500
    );

    await presentation.delay(reading_time + 300);
  }
  /* -------------------------- fourth slide: label4 -------------------------- */
  {
    await presentation.nextSlide();
  }
  /* ------------------------------- fifth slide ------------------------------ */
  {
    await presentation.nextSlide();

    // aligning the bars to fit outside
    EXP.TransitionTo(
      person1.coordinates,
      { expr: (i, t, x, y, z) => [4 * x - 6, y, z] },
      1000
    );
    EXP.TransitionTo(
      person2.coordinates,
      { expr: (i, t, x, y, z) => [2 * x + 2, y, z] },
      1000
    );
    EXP.TransitionTo(
      person3.coordinates,
      { expr: (i, t, x, y, z) => [2 * x + 8, y, z] },
      1000
    );
    await presentation.delay(reading_time);

    EXP.TransitionTo(
      person1.coordinates,
      { expr: (i, t, x, y, z) => [4 * x - 6, 0.25 * y, z] },
      1000
    );
    EXP.TransitionTo(
      person2.coordinates,
      { expr: (i, t, x, y, z) => [2 * x + 2, 0.25 * y, z] },
      1000
    );
    EXP.TransitionTo(
      person3.coordinates,
      { expr: (i, t, x, y, z) => [2 * x + 8, 0.25 * y, z] },
      1000
    );
    await presentation.delay(reading_time);

    // horizontal aligning of the diamonds
    EXP.TransitionTo(
      diamond1.coordinates,
      { expr: (i, t, x, y, z) => [x - 8, y, z] },
      1000
    );
    EXP.TransitionTo(
      diamond2.coordinates,
      { expr: (i, t, x, y, z) => [x - 6, y, z] },
      1000
    );
    EXP.TransitionTo(
      diamond3.coordinates,
      { expr: (i, t, x, y, z) => [x - 4, y, z] },
      1000
    );
    EXP.TransitionTo(
      diamond4.coordinates,
      { expr: (i, t, x, y, z) => [x + 2, y, z] },
      1000
    );
    EXP.TransitionTo(
      diamond5.coordinates,
      { expr: (i, t, x, y, z) => [x + 8, y, z] },
      1000
    );
  }
  /* ------------------------------- sixth slide ------------------------------ */
  {
    await presentation.delay(reading_time);
    
  }
}
window.onload = animate;
