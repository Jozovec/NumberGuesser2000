// Variables
var goal = 69420;                   // Set this to the number you want your AI to guess

var min = 0;                        // Minimal value to guess
var max = 100000;                   // Maximal value to guess

var population = 100;               // Number of guesses per generation
var startingMutation = 250;         // Range of guesses for the new generation
var proportionalToGen = true;       // Decrease mutation when approaching goal

// Declarations
var guesses = [];                   // Array for all guesses of current generation
var accuracies = [];                // Array for guesses' accuracies of current generation

var gen = 0;                        // Number of generation
var lastGenBestVal;                 // Best guess of last generation
var lastGenBestAcc;                 // Accuracy of the best guess from latest generation
var mutation = startingMutation;    // Mutation rate

// Logic
if (goal < min || goal > max){      // If goal is not in range
    console.error("ERROR: Goal is not within range!");  // Error
    process.exit(1);                                    // Exit
}

//   First generation
gen++;              // Declare new generation
for (var i = 0; i < population; i++) {          // Repeat for number of guesses
    var currentGuess = randomGuess();           // Create new completely random guess
    guesses.push(currentGuess);                 // Add value of new guess
    accuracies.push(accuracy(currentGuess));    // Add accuracy of new guess
}

lastGenBestAcc = Math.max(...accuracies);                           // Get highest accuracy
lastGenBestVal = guesses[accuracies.indexOf(lastGenBestAcc)];       // Get guess of that accuracy
mutation = accuracyToMutation(lastGenBestAcc);                      // Change mutation rate based on accuracy
console.log("Gen:" + gen + " BestVal:" + lastGenBestVal + " BestAcc:" + lastGenBestAcc);
guesses = [];       // Clear guess array
accuracies = [];    // Clear accuracy array

//   Repeating generations
var interval = setInterval(() => {
    if (lastGenBestVal == goal) {       // If best guess is goal
        console.log("\nGoal reached!\nValue: " + lastGenBestVal + "\nGeneration: " + gen);
        clearInterval(interval);        // Stop repeating generations
        return;
    }

    gen++;              // Declare new generation
    for (var i = 0; i < population; i++) {          // Repeat for number of guesses
        var currentGuess = guess();                 // Create a guess in new range
        guesses.push(currentGuess);                 // Add value of new guess
        accuracies.push(accuracy(currentGuess));    // Add accuracy of new guess
    }

    lastGenBestAcc = Math.max(...accuracies);                           // Get highest accuracy
    lastGenBestVal = guesses[accuracies.indexOf(lastGenBestAcc)];       // Get guess of that accuracy
    mutation = accuracyToMutation(lastGenBestAcc);                      // Change mutation rate based on accuracy
    console.log("Gen:" + gen + " BestVal:" + lastGenBestVal + " BestAcc:" + lastGenBestAcc);
    guesses = [];       // Clear guess array
    accuracies = [];    // Clear accuracy array
}, 500);        // Repeat twice a second

// Functions
function randomGuess() {
    return Math.floor(Math.random() * (max - min + 1) + min);   // Make a completely random guess
}

function guess() {
    var highest = lastGenBestVal + mutation;        // Set guess min to mutation
    var lowest = lastGenBestVal - mutation;         // Set guess max to mutation

    return Math.floor(Math.random() * (highest - lowest + 1) + lowest);     // Make a new random guess in mutation boundries
}

function accuracy(guess) {
    return Math.abs((Math.abs(goal - guess) / max) - 1);    // Get the accuracy of the guess (0 = completely wrong - 1 = goal)
}

function accuracyToMutation(accuracy) {
    if(accuracy <= 0.995 || !proportionalToGen){        // If not approaching goal or mutation not proportional
        return startingMutation;                        // Set mutation to default
    }else{                                              // Else
        return (accuracy - 1) * (startingMutation - 1) / (0.995 - 1) + 1;   // Map accuracy (0.9 - 1.0) to mutation (default - 1.0)
    }
}


// That's it man
// We're done