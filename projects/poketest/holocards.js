window.addEventListener('load', runsWhenReady);

let card1 = document.getElementById('card1');

let showInputsButton;
let hideInputsButton;

let inputsArray = [

  // 0 name, 1 set value, 2 unit, 3 min, 4 max, 5 what
  ['--posx', '50', '%', '38', '65', 'diagonal line shift'],
  ['--posy', '50', '%', '38', '65', 'color shift'],

  ['--hyp', '0.2', 'none', '0', '1', 'how bright css filter is'],

  ['--o', '1', 'none', '0', '1', 'opacity aka show hide'],

  ['--mx', '50', '%', '1', '99', 'control location of radial glare gradient'],
  ['--my', '50', '%', '1', '99', 'control location of radial glare gradient']
];


function addGlow(){

  card1.classList.add('glow');

  setTimeout(function(){
    card1.classList.remove('glow');
  }, 3000);
}

function createCards(){

  boxArray.forEach(
    (box, index) => {
    let boxElement = document.createElement('div');
    boxElement.id = box.id;

    let boxContents = `<div class="cardUpper">
      <div class="boxTitle">
        ${box.title}
      </div>
      <div class="boxText">
        ${box.text}
      </div>
    </div>
    <div class="cardLower"> 
      <div class="buttonHolder" id="buttonHolder${box.id}">

      </div>
    </div>  
    `
    boxElement.innerHTML = boxContents;
    boxHolder.appendChild(boxElement);
    
    //create buttons, handle clicks
    let yesButton = document.createElement('button');
    yesButton.classList.add('boxButton');
    yesButton.classList.add('yesButton');
    yesButton.innerText = 'Yes';


    let noButton = document.createElement('button');
    noButton.classList.add('boxButton');
    noButton.classList.add('noButton');
    noButton.innerText = 'No';
    noButton.onclick = function(){
      moveBoxes('right');
    }
  });
}



function updateCSSFromInputs(inputsArray) {
  inputsArray.forEach(parameter => {
    if (parameter[2] != 'none') {
      document.documentElement.style.setProperty(parameter[0], parameter[1] + parameter[2]);

    } else {
      document.documentElement.style.setProperty(parameter[0], parameter[1]);
    }
  });
}


function runsWhenReady() {
  console.log('everything is loaded. Ready to run code.');



  const body = document.querySelector("body");

  // function updateDisplay(event) {
  //   // console.log(event.pageX);
  //   // console.log(event.pageY);
  //   inputsArray[0][1] = event.pageX // x
  //   inputsArray[1][1] = event.pageY // y
  //   updateCSSFromInputs(inputsArray);
  // }

  // body.addEventListener("mousemove", updateDisplay);
  // body.addEventListener("mouseenter", updateDisplay);
  // body.addEventListener("mouseleave", updateDisplay);


  if (window.DeviceOrientationEvent) {
      window.addEventListener(
        "deviceorientation",
        (event) => {
          const rotateDegrees = event.alpha;   // [0, 360)
          const frontToBack   = event.beta;    // [-180, 180)
          const leftToRight   = event.gamma;   // [-90, 90)
          handleOrientationEvent(frontToBack, leftToRight, rotateDegrees);
        },
        true
      );
    }

    const min_xy = 38;
    const max_xy = 65;
    const range_xy = max_xy - min_xy;

    const handleOrientationEvent = (frontToBack, leftToRight, rotateDegrees) => {
      const b = rotateDegrees;                        // 0–360
      const x = 100 * (leftToRight + 90) / 180;       // -90–90 → 38-65
      const y = 200 * (frontToBack + 180) / 360;      // -180–180 → 38-65

      inputsArray[0][1] = x; // x
      inputsArray[1][1] = y; // y
      // inputsArray[4][1] = b % 100;
      // inputsArray[5][1] = 100 -(b % 100);
      updateCSSFromInputs(inputsArray);
    };
  
}