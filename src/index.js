import "./static/styles/style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Diamond, Person } from "./initialize";

import * as EXP from "./explanaria/main";

// setting up three
var three = EXP.setupThree(60, 25);
var controls = new OrbitControls(three.camera, three.renderer.domElement);
controls.enableRotate = false;

three.camera.position.set(0, 0, 10);
three.camera.lookAt(new THREE.Vector3(0, 0, 0));

console.log("Loaded.");

let presentation = new EXP.UndoCapableDirector();

// setting up parameters
let params = {
  diamond_radius: 0.5,
  box_width: 1,
  box_height: 2,
  purple: 0x2a0a4d,
  green: 0x0a4d1c,
  red: 0x6e0404,
  blue: 0x00ffee,
  wrong_red: 0xed2424,
};

let diamond1 = new Diamond(params.diamond_radius, presentation, params.blue);
let diamond1Ent = diamond1.create_diamond();

let diamond2 = new Diamond(params.diamond_radius, presentation, params.blue);
let diamond2Ent = diamond2.create_diamond();

let diamond3 = new Diamond(params.diamond_radius, presentation, params.blue);
let diamond3Ent = diamond3.create_diamond();

let diamond4 = new Diamond(params.diamond_radius, presentation, params.blue);
let diamond4Ent = diamond4.create_diamond();

let diamond5 = new Diamond(params.diamond_radius, presentation, params.blue);
let diamond5Ent = diamond5.create_diamond();

diamond1Ent.diamond
  .add(diamond1Ent.circleTransform)
  .add(diamond1Ent.coordinates)
  .add(diamond1Ent.line);
diamond2Ent.diamond
  .add(diamond2Ent.circleTransform)
  .add(diamond2Ent.coordinates)
  .add(diamond2Ent.line);
diamond3Ent.diamond
  .add(diamond3Ent.circleTransform)
  .add(diamond3Ent.coordinates)
  .add(diamond3Ent.line);
diamond4Ent.diamond
  .add(diamond4Ent.circleTransform)
  .add(diamond4Ent.coordinates)
  .add(diamond4Ent.line);
diamond5Ent.diamond
  .add(diamond5Ent.circleTransform)
  .add(diamond5Ent.coordinates)
  .add(diamond5Ent.line);

let person1 = new Person(
  params.box_width,
  params.box_height,
  params.purple,
  presentation
);
let person1Ent = person1.create_person();

let person2 = new Person(
  params.box_width,
  params.box_height,
  params.green,
  presentation
);
let person2Ent = person2.create_person();

let person3 = new Person(
  params.box_width,
  params.box_height,
  params.red,
  presentation
);
let person3Ent = person3.create_person();

person1Ent.person.add(person1Ent.coordinates).add(person1Ent.line);
person2Ent.person.add(person2Ent.coordinates).add(person2Ent.line);
person3Ent.person.add(person3Ent.coordinates).add(person3Ent.line);

three.on("update", function (time) {
  [
    diamond1Ent.diamond,
    diamond2Ent.diamond,
    diamond3Ent.diamond,
    diamond4Ent.diamond,
    diamond5Ent.diamond,
    person1Ent.person,
    person2Ent.person,
    person3Ent.person,
  ].map((i) => i.activate(time.t));
  controls.update();
});

async function animate() {
  controls.enablePan = false;
  let reading_time = 1000;

  await presentation.begin();

  /* --------------------------- slide 1 -------------------------- */
  {
    // await presentation.nextSlide();
    // initializing the people and the diamonds in the slide.
    diamond1.move({ length: 5 });
    diamond2.move({ length: 5 });
    diamond3.move({ length: 5 });
    diamond4.move({ length: 5 });
    diamond5.move({ length: 5 });

    person1.move({ length: 5 });
    person2.move({ length: 5 });
    person3.move({ length: 5 });

    // moving the coordinates of the diamonds
    diamond1.move({ a: -6, b: 6 });
    diamond2.move({ a: -3, b: 6 });
    diamond3.move({ b: 6 });
    diamond4.move({ a: 3, b: 6 });
    diamond5.move({ a: 6, b: 6 });

    // moving the coordinates of the people
    person1.move({ a: -6 });
    person3.move({ a: 6 });

    // await presentation.delay(1000);
  }

  /* -------------------------- slide 2 -------------------------- */
  {
    await presentation.nextSlide();

    // putting the diamonds into stacks
    // moving first 3 diamonds into person1
    diamond1.move({
      b: -6 - params.box_height + params.diamond_radius,
      length: 500,
    });

    diamond2.move({
      a: -3,
      b: -6 - params.box_height + 3 * params.diamond_radius,
      length: 500,
    });
    diamond3.move({
      a: -6,
      b: -6 - params.box_height + 5 * params.diamond_radius,
      length: 500,
    });

    // moving fourth diamond into person2
    diamond4.move({
      a: -3,
      b: -6 - params.box_height + params.diamond_radius,
      length: 500,
    });

    // moving fifth diamond into person3
    diamond5.move({
      b: -6 - params.box_height + params.diamond_radius,
      length: 500,
    });

    // await presentation.delay(reading_time);
  }
  /* --------------------------- slide 3  -------------------------- */
  {
    await presentation.nextSlide();
    // switching two diamonds out of the stack
    diamond1.move({ a: -2, b: 2 * params.diamond_radius, length: 500 });
    diamond3.move({ a: 2, b: -2 * params.diamond_radius, length: 500 });

    // await presentation.delay(reading_time);

    // switching two diamonds back into stack
    diamond1.move({ a: 2, b: 2 * params.diamond_radius, length: 500 });
    diamond3.move({ a: -2, b: -2 * params.diamond_radius, length: 500 });

    // await presentation.delay(reading_time + 300);
  }
  /* -------------------------- slide 4 -------------------------- */
  {
    await presentation.nextSlide();
  }
  /* ------------------------------- slide 5 ------------------------------ */
  {
    await presentation.nextSlide();
    // reset the people
    person1.reset();
    person2.reset();
    person3.reset();

    // aligning the bars to fit outside
    person1.move({ a: -6, scaleA: 4 });
    person2.move({ a: 2, scaleA: 2 });
    person3.move({ a: 8, scaleA: 2 });

    // await presentation.delay(reading_time);

    // decreasing the height of the bars
    person1.move({ scaleB: 0.25 });
    person2.move({ scaleB: 0.25 });
    person3.move({ scaleB: 0.25 });

    // await presentation.delay(reading_time);

    // horizontal aligning of the diamonds
    diamond1.reset();
    diamond2.reset();
    diamond3.reset();
    diamond4.reset();
    diamond5.reset();

    diamond1.move({ a: -8 });
    diamond2.move({ a: -6 });
    diamond3.move({ a: -4 });
    diamond4.move({ a: 2 });
    diamond5.move({ a: 8 });
  }
  /* ------------------------------- slide 6 ------------------------------ */
  {
    await presentation.nextSlide();
    // moving one diamond up
    diamond3.move({ b: 2 });

    // await presentation.delay(reading_time);

    // moving the lines over
    person1.move({ a: -1, scaleA: 3 });
    person2.move({ a: -1, scaleA: 3 });

    // await presentation.delay(reading_time);

    // moving diamond over again
    diamond3.move({ a: 4 });

    // await presentation.delay(reading_time);

    // moving diamond down again
    diamond3.move({ b: -2 });

    // await presentation.delay(reading_time);
  }

  /* --------------------------------- slide 7 -------------------------------- */
  {
    await presentation.nextSlide();
  }

  /* --------------------------------- slide 8 -------------------------------- */
  {
    await presentation.nextSlide();

    // allowing the user to read the text before animating begins
    await presentation.delay(reading_time);

    // move the diamond up
    diamond3.move({ b: 2 });

    await presentation.delay(reading_time);

    // move the lines for person 2 in
    person2.move({ a: 1, scaleA: 2 });

    await presentation.delay(reading_time);

    // move diamond over
    diamond3.move({ a: -2 });

    await presentation.delay(reading_time);

    // move diamond down
    diamond3.move({ b: -2 });
    await presentation.delay(reading_time);

    // bounce diamond up and down
    let i;
    for (i = 0; i < 3; i++) {
      diamond3.move({ b: 2, length: 500 });
      await presentation.delay(reading_time);

      diamond3.move({ b: -2, length: 500 });
      await presentation.delay(reading_time);
    }
  }

  /* -------------------------------- slide9 9 -------------------------------- */
  {
  }
}
window.onload = animate;
