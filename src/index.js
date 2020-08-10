import "./static/styles/style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Diamond, Person, Line } from "./initialize";

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
  black: 0x000000,
  yellow: 0xdba40d,
  light_green: 0x74b309,
  teal: 0x09b397,
  pink: 0xb30980,
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
  2,
  presentation
);
let person1Ent = person1.create_person();

let person2 = new Person(
  params.box_width,
  params.box_height,
  params.green,
  2,
  presentation
);
let person2Ent = person2.create_person();

let person3 = new Person(
  params.box_width,
  params.box_height,
  params.red,
  2,
  presentation
);
let person3Ent = person3.create_person();

person1Ent.person.add(person1Ent.coordinates).add(person1Ent.line);
person2Ent.person.add(person2Ent.coordinates).add(person2Ent.line);
person3Ent.person.add(person3Ent.coordinates).add(person3Ent.line);

// creating vertial seperation linesz
let line1 = new Line([0, 0], [-1, 1], params.black, presentation);
let line1Ent = line1.create_line();

line1Ent.line.add(line1Ent.coordinates).add(line1Ent.output);

let line2 = new Line([0, 0], [-1, 1], params.black, presentation);
let line2Ent = line2.create_line();

line2Ent.line.add(line2Ent.coordinates).add(line2Ent.output);

// creating horizontal lines for slots for slides beginning 13
let slot1 = new Line([-0.5, 0.5], [-0.1, 0], params.yellow, presentation);
let slot1Ent = slot1.create_line();

let slot2 = new Line([-0.5, 0.5], [-0.1, 0], params.light_green, presentation);
let slot2Ent = slot2.create_line();

let slot3 = new Line([-0.5, 0.5], [-0.1, 0], params.teal, presentation);
let slot3Ent = slot3.create_line();

let slot4 = new Line([-0.5, 0.5], [-0.1, 0], params.pink, presentation);
let slot4Ent = slot4.create_line();

slot1Ent.line.add(slot1Ent.coordinates).add(slot1Ent.output);
slot2Ent.line.add(slot2Ent.coordinates).add(slot2Ent.output);
slot3Ent.line.add(slot3Ent.coordinates).add(slot3Ent.output);
slot4Ent.line.add(slot4Ent.coordinates).add(slot4Ent.output);

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
    line1Ent.line,
    line2Ent.line,
    slot1Ent.line,
    slot2Ent.line,
    slot3Ent.line,
    slot4Ent.line,
  ].map((i) => i.activate(time.t));
  controls.update();
});

async function animate() {
  controls.enablePan = false;
  let reading_time = 1500;

  await presentation.begin();

  /* --------------------------- slide 1 -------------------------- */
  {
    // await presentation.delay(3*reading_time);
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
    // await presentation.delay(3*reading_time);

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
    // await presentation.delay(3*reading_time);

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
    // await presentation.delay(3*reading_time);
  }
  /* ------------------------------- slide 5 ------------------------------ */
  {
    await presentation.nextSlide();
    // await presentation.delay(3*reading_time);

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
    // await presentation.delay(3*reading_time);

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
    // await presentation.delay(3*reading_time);
  }

  /* --------------------------------- slide 8 -------------------------------- */
  {
    await presentation.nextSlide();
    // await presentation.delay(3*reading_time);

    // allowing the user to read the text before animating begins
    // await presentation.delay(reading_time);

    // move the diamond up
    diamond3.move({ b: 2 });

    // await presentation.delay(reading_time);

    // move the lines for person 2 in
    person2.move({ a: 1, scaleA: 2 });

    // await presentation.delay(reading_time);

    // move diamond over
    diamond3.move({ a: -2 });

    // await presentation.delay(reading_time);

    // move diamond down
    diamond3.move({ b: -2 });
    // await presentation.delay(reading_time);

    // bounce diamond up and down
    let i;
    for (i = 0; i < 3; i++) {
      diamond3.move({ b: 2, length: 500 });
      // await presentation.delay(reading_time);

      diamond3.move({ b: -2, length: 500 });
      // await presentation.delay(reading_time);
    }

    // move diamond back
    diamond3.move({ b: 2 });
    person2.move({ a: -1, scaleA: 3 });

    // await presentation.delay(reading_time);

    diamond3.move({ a: 2 });
    diamond3.move({ b: -2 });

    // await presentation.delay(reading_time);
  }

  /* -------------------------------- slide 9 -------------------------------- */
  {
    await presentation.nextSlide();
    // await presentation.delay(3*reading_time);

    // merging the two lines together
    person1.reset();
    person3.reset();

    person1.move({ a: -6, scaleA: 4, scaleB: 0.25 });
    person3.move({ a: 7, scaleA: 3, scaleB: 0.25 });
    // await presentation.delay(reading_time);

    // removing the objects
    person1.switch(0);
    person2.switch(0);
    person3.switch(0);

    // await presentation.delay(reading_time);

    // making lines reappear in the slideshow
    line1.switch(1);
    line1.move({ a: -2 });

    // await presentation.delay(reading_time);

    line2.switch(1);
    line2.move({ a: 4 });

    // await presentation.delay(reading_time);

    // rearrange the rest of the diamonds
    diamond1.move({ a: 2 });
    diamond2.move({ a: 2 });
    diamond5.move({ a: -2 });
  }

  /* -------------------------------- slide 10 -------------------------------- */
  {
    await presentation.nextSlide();
    // await presentation.delay(3*reading_time);
  }

  /* -------------------------------- slide 11 -------------------------------- */
  {
    await presentation.nextSlide();
    // await presentation.delay(3*reading_time);
  }

  /* -------------------------------- slide 12 -------------------------------- */
  {
    await presentation.nextSlide();
    // await presentation.delay(3*reading_time);

    // moving the lines up
    line1.move({ b: 3 });
    line2.move({ a: -2, b: 3 });

    // await presentation.delay(reading_time);

    // moving all of the diamonds apart with even spacing
    diamond1.move({ a: 2 });
    diamond2.move({ a: 2 });
    diamond5.move({ a: -2 });

    // await presentation.delay(reading_time);

    // flip two of the diamonds around
    diamond1.move({ b: -2 });
    diamond5.move({ b: -2 });

    // await presentation.delay(reading_time);

    diamond1.move({ a: 8 });
    diamond5.move({ a: -8 });

    // await presentation.delay(reading_time);

    diamond1.move({ b: 2 });
    diamond5.move({ b: 2 });

    // await presentation.delay(reading_time);

    // flip them back
    diamond1.move({ b: -2 });
    diamond5.move({ b: -2 });

    // await presentation.delay(reading_time);

    diamond5.move({ a: 8 });
    diamond1.move({ a: -8 });

    // await presentation.delay(reading_time);

    diamond1.move({ b: 2 });
    diamond5.move({ b: 2 });
  }

  /* -------------------------------- slide 13 -------------------------------- */
  {
    await presentation.nextSlide();
    // await presentation.delay(3*reading_time);

    // spreading the diamonds out first
    diamond1.move({ a: -4 });
    diamond2.move({ a: -2 });
    diamond4.move({ a: 2 });
    diamond5.move({ a: 4 });

    // await presentation.delay(reading_time);

    // showing and moving all of the slots
    slot1.switch(1);
    slot1.move({ a: -6, b: -1.75 });
    // await presentation.delay(reading_time);

    slot2.switch(1);
    slot2.move({ a: -2, b: -1.75 });
    // await presentation.delay(reading_time);

    slot3.switch(1);
    slot3.move({ a: 2, b: -1.75 });
    // await presentation.delay(reading_time);

    slot4.switch(1);
    slot4.move({ a: 6, b: -1.75 });
    // await presentation.delay(reading_time);
  }

  /* -------------------------------- slide 14 -------------------------------- */
  {
    await presentation.nextSlide();
    // await presentation.delay(3*reading_time);

    // placing lines in the slots
    line1.move({ a: -4, b: -3 });
    line2.move({ b: -3 });

    // await presentation.delay(reading_time);

    // fading out the slots
    slot1.switch(0, 1000);
    slot2.switch(0, 1000);
    slot3.switch(0, 1000);
    slot4.switch(0, 1000);

    // await presentation.delay(reading_time);

    // bringing the diamonds closer together
    diamond1.move({ a: 2 });
    line1.move({ a: 2 });
    diamond2.move({ a: 2 });
    diamond5.move({ a: -2 });

    // await presentation.delay(reading_time);

    // pushing the diamonds apart again
    diamond1.move({ a: -2 });
    line1.move({ a: -2 });
    diamond2.move({ a: -2 });
    diamond5.move({ a: 2 });

    // await presentation.delay(reading_time);

    // moving the lines up again
    line1.move({ a: 4, b: 3 });
    line2.move({ b: 3 });

    // await presentation.delay(reading_time);

    // making the slots reappear again
    slot1.switch(1, 1000);
    slot2.switch(1, 1000);
    slot3.switch(1, 1000);
    slot4.switch(1, 1000);
    // await presentation.delay(reading_time);

    // placing lines in slots
    line1.move({ b: -3 });
    line2.move({ a: 4, b: -3 });
    // await presentation.delay(reading_time);

    // fading out the slots
    slot1.switch(0, 1000);
    slot2.switch(0, 1000);
    slot3.switch(0, 1000);
    slot4.switch(0, 1000);
    // await presentation.delay(reading_time);

    // bringing the diamonds closer together
    diamond1.move({ a: 2 });
    diamond4.move({ a: -2 });
    line2.move({ a: -2 });
    diamond5.move({ a: -2 });
    // await presentation.delay(reading_time);

    // pushing the diamonds apart again
    diamond1.move({ a: -2 });
    diamond4.move({ a: 2 });
    line2.move({ a: 2 });
    diamond5.move({ a: 2 });
    // await presentation.delay(reading_time);

    // moving the lines back up again
    line1.move({ b: 3 });
    line2.move({ a: -4, b: 3 });
    // await presentation.delay(reading_time);

    // making the slots appear again
    slot1.switch(1, 1000);
    slot2.switch(1, 1000);
    slot3.switch(1, 1000);
    slot4.switch(1, 1000);
    // await presentation.delay(reading_time);
  }

  /* -------------------------------- slide 15 -------------------------------- */
  {
    await presentation.nextSlide();
    // await presentation.delay(3*reading_time);

    // remove the diamonds from the canvas
    diamond1.switch(0, 1000);
    diamond2.switch(0, 1000);
    diamond3.switch(0, 1000);
    diamond4.switch(0, 1000);
    diamond5.switch(0, 1000);
    // await presentation.delay(reading_time);

    // move the slots together
    slot1.move({ b: 1.75 });
    slot2.move({ b: 1.75 });
    slot3.move({ b: 1.75 });
    slot4.move({ b: 1.75 });
    // await presentation.delay(reading_time);

    // move all of the slots closer together
    slot1.reset();
    slot2.reset();
    slot3.reset();
    slot4.reset();

    slot1.move({ a: -3 });
    slot2.move({ a: -1 });
    slot3.move({ a: 1 });
    slot4.move({ a: 3 });
    // await presentation.delay(reading_time);
  }

  /* -------------------------------- slide 16 -------------------------------- */
  {
    await presentation.nextSlide();
    // await presentation.delay(3*reading_time);

    // try placing lines in the slots
    line1.move({ a: 1, b: -1.5 });
    line2.move({ a: 1, b: -1.5 });
    // await presentation.delay(reading_time);

    // move around line 2
    line2.move({ b: 1.5 });
    // await presentation.delay(reading_time);
    line2.move({ a: -6 });
    // await presentation.delay(reading_time);
    line2.move({ b: -1.5 });
  }

  /* -------------------------------- slide 17 -------------------------------- */
  {
    await presentation.nextSlide();
    // await presentation.delay(3*reading_time)

    // reorder the slots
    slot1.move({ b: -1 });
    slot2.move({ b: -1 });
    slot3.move({ b: -1 });
    slot4.move({ b: -1 });
    // await presentation.delay(reading_time)

    // place the slots in a different order
    slot3.move({ a: -4, b: 1 });
    // await presentation.delay(reading_time)
    slot2.move({ a: 2, b: 1 });
    // await presentation.delay(reading_time)
    slot1.move({ a: 6, b: 1 });
    // await presentation.delay(reading_time)
    slot4.move({ a: -4, b: 1 });
    // await presentation.delay(reading_time)
  }

  /* -------------------------------- slide 18 -------------------------------- */
  {
    await presentation.nextSlide();
    // await presentation.delay(3*reading_time);
  }

  /* -------------------------------- slide 19 -------------------------------- */
  {
    await presentation.nextSlide();
    // await presentation.delay(3*reading_time);

    // reordering the four slots
    slot2.move({ b: -1 });
    slot1.move({ b: -1 });
    // await presentation.delay(reading_time);

    slot3.move({ a: 4 });
    line2.move({ a: 4 });
    // await presentation.delay(reading_time);

    slot4.move({ a: 4 });
    line1.move({ a: 4 });
    // await presentation.delay(reading_time);

    slot1.move({ a: -6 });
    slot2.move({ a: -2 });
    // await presentation.delay(reading_time);

    slot2.move({ b: 1 });
    slot1.move({ b: 1 });
    // await presentation.delay(reading_time);
  }

  /* -------------------------------- slide 20 -------------------------------- */
  {
    await presentation.nextSlide();
    // await presentation.delay(3*reading_time);

    // spread out the slots
    slot1.move({ a: -3 });
    slot2.move({ a: -1 });
    slot3.move({ a: 1 });
    line1.move({ a: -1 });
    line2.move({ a: 5 });
    slot4.move({ a: 3 });
    // await presentation.delay(reading_time);

    // turn on diamonds
    diamond1.switch(1);
    diamond2.switch(1);
    diamond3.switch(1);
    diamond4.switch(1);
    diamond5.switch(1);
    // await presentation.delay(reading_time);

    // lower slots
    slot1.move({ b: -1.75 });
    slot2.move({ b: -1.75 });
    slot3.move({ b: -1.75 });
    slot4.move({ b: -1.75 });
    line1.move({ b: -1.75 });
    line2.move({ b: -1.75 });
    // await presentation.delay(2 * reading_time);

    // reverse it all
    slot1.move({ b: 1.75 });
    slot2.move({ b: 1.75 });
    slot3.move({ b: 1.75 });
    slot4.move({ b: 1.75 });
    line1.move({ b: 1.75 });
    line2.move({ b: 1.75 });
    // await presentation.delay(reading_time);

    // turn on diamonds
    diamond1.switch(0);
    diamond2.switch(0);
    diamond3.switch(0);
    diamond4.switch(0);
    diamond5.switch(0);
    // await presentation.delay(reading_time);

    // spread out the slots
    slot1.move({ a: 3 });
    slot2.move({ a: 1 });
    slot3.move({ a: -1 });
    line1.move({ a: 1 });
    line2.move({ a: -5 });
    slot4.move({ a: -3 });
    // await presentation.delay(reading_time);

    // move the slots back
    slot1.move({ b: -1 });
    slot2.move({ b: -1 });
    // await presentation.delay(reading_time);

    slot3.move({ a: -4 });
    line2.move({ a: -4 });
    // await presentation.delay(reading_time);

    slot4.move({ a: -4 });
    line1.move({ a: -4 });
    // await presentation.delay(reading_time);

    slot2.move({ a: 2, b: 1 });
    slot1.move({ a: 6, b: 1 });
    // await presentation.delay(reading_time);
  }

  /* -------------------------------- slide 21 -------------------------------- */
  {
    await presentation.nextSlide();
    // await presentation.delay(3*reading_time);
  }

  /* -------------------------------- slide 22 -------------------------------- */
  {
    await presentation.nextSlide();
    // await presentation.delay(3*reading_time);
  }

  /* -------------------------------- slide 23 -------------------------------- */
  {
    await presentation.nextSlide();
    // await presentation.delay(3*reading_time);

    // move all the slots down
    slot1.move({ b: -1 });
    slot2.move({ b: -1 });
    slot3.move({ b: -1 });
    slot4.move({ b: -1 });
    // await presentation.delay(3*reading_time);

    // move one slot up one at a time
    slot3.move({ b: 1 });
    // await presentation.delay(reading_time);
    slot4.move({ b: 1 });
    // await presentation.delay(reading_time);
    slot2.move({ b: 1 });
    // await presentation.delay(reading_time);
    slot1.move({ b: 1 });
    // await presentation.delay(reading_time);
  }

  /* -------------------------------- slide 24 -------------------------------- */
  {
    await presentation.nextSlide();
    // await presentation.delay(3*reading_time);
  }

  /* -------------------------------- slide 25 -------------------------------- */
  {
    await presentation.nextSlide();
    // await presentation.delay(5*reading_time);

    // switching around the order for the last two
    slot2.move({ a: 2 });
    slot1.move({ a: -2 });
    // await presentation.delay(reading_time);

    slot2.move({ a: -2 });
    slot1.move({ a: 2 });
    // await presentation.delay(reading_time);
  }

  /* -------------------------------- slide 26 -------------------------------- */
  {
    await presentation.nextSlide();
    // await presentation.delay(5*reading_time);

    // move the last two far away
    slot1.move({ a: 4 });
    slot1.switch(0, 1500);
    // await presentation.delay(reading_time);

    slot2.move({ a: 4 });
    slot2.switch(0, 1500);
    // await presentation.delay(reading_time);
  }

  /* -------------------------------- slide 27 -------------------------------- */
  {
    await presentation.nextSlide();
    // await presentation.delay(3 * reading_time);

    // move the two to the center of the stage
    slot4.move({ a: 2 });
    line1.move({ a: 2 });
    line2.move({ a: 2 });
    slot3.move({ a: 2 });
    // await presentation.delay(reading_time);

    // switch the slots
    slot4.move({ a: -2 });
    slot3.move({ a: 2 });
    // await presentation.delay(reading_time);

    slot4.move({ a: 2 });
    slot3.move({ a: -2 });
    // await presentation.delay(reading_time);
  }
  
  /* -------------------------------- slide 28 -------------------------------- */
  {
    await presentation.nextSlide();
    await presentation.delay(3*reading_time);
    
    // move both of the slots down and them move them back up
    slot4.move({b:-1});
    slot3.move({b:-1});
    await presentation.delay(reading_time);
    
    slot4.move({b:1});
    await presentation.delay(reading_time);
    slot3.move({b:1});
    await presentation.delay(reading_time);
  }
  
  /* -------------------------------- slide 29 -------------------------------- */
  {
    await presentation.nextSlide();
    await presentation.delay(3*reading_time);
  }
  
  /* -------------------------------- slide 30 -------------------------------- */
  {
    await presentation.nextSlide();
    await presentation.delay(3*reading_time);
    
    // make the lines bounch up and down
    line1.move({b:1});
    line2.move({b:1});
    await presentation.delay(reading_time);
    
    line1.move({b:-1});
    line2.move({b:-1});
    await presentation.delay(reading_time);

    line1.move({b:1});
    line2.move({b:1});
    await presentation.delay(reading_time);
    
    line1.move({b:-1});
    line2.move({b:-1});
    await presentation.delay(reading_time);

  }
}
window.onload = animate;
