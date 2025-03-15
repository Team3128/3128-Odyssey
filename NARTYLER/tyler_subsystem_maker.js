//created by tyler enderwick
var motorNumberInput = document.getElementById("num");
var subsystemNameInput = document.getElementById("subName");
var outputFrame = document.getElementById("output");
var refreshButton = document.getElementById("sumbitNum");

var motorsArray = [];

var numberOfMotors = 0;

function motorInput() {
    numberOfMotors = motorNumberInput.value;

    if (numberOfMotors < 1) {
        numberOfMotors = 1;
    }

    var difference = Math.abs(numberOfMotors - motorsArray.length);

    //console.log(numberOfMotors, motorsArray.length, difference);

    if (numberOfMotors > motorsArray.length) {
        //make more motors
        for (i = 0; i < difference; i++) {
            var motorDiv = document.createElement("div");
            var motorNumber = String(motorsArray.length + 1)

            motorDiv.innerHTML =
            `<label for="motor` + motorNumber +`">Motor ` + motorNumber + `: </label>
                <select id="motor` + motorNumber +`">
                    <option value="CAN">CAN</option>
                    <option value="PWM">PWM</option>
                </select>
            `;

            document.getElementById("motorArray").appendChild(motorDiv);

            motorsArray.push(motorDiv);
        }
    } else if (numberOfMotors < motorsArray.length){
        //get rid of motors
        for (i = 0; i < difference; i++) {
            motorsArray[motorsArray.length - 1].remove();
            motorsArray.pop();
        }
    }

    setTimeout(motorInput, 100);
}

motorInput();