//hi 🤪
var typeInput = document.getElementById("type");
var motorInput = document.getElementById("type");
var output = document.getElementById("output");

var variables =  `
hi
`;

var help = `
hi
`;









function createSubsystem(typeBase, motors){  
    var fullScript = `//copy and paste this:
    `;
    fullScript += variables;
    fullScript += typeInput;


    output.innerText = fullScript;
}


createSubsystem(
    "Velocity", //TYPE
    [//MOTORS
    ["motor1", "Kraken"],
    ["motor2","Kraken"]
    ]
);

//types we could have: velocity, voltage, position
//motor types: kraken, neo, 
//motor controlelrs: talon, spark max, spark flex
//class name