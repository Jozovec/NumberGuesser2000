# NumberGuesser2000
I honestly don't know any of the definitions of AI, Machine Learning, QLearning, Neural Networking, or Neuroevolution, and I doubt this is somewhere in them. But I like to call it AI.
## How to make it work
Open the **main.js** file in a text editor and modify the values however you want:
```javascript
var goal = 69420;                   // Set this to the number you want your AI to guess

var min = 0;                        // Minimal value to guess
var max = 100000;                   // Maximal value to guess

var population = 100;               // Number of guesses per generation
var startingMutation = 250;         // Range of guesses for the new generation
var proportionalToGen = true;       // Decrease mutation when approaching goal
```
Install **Node JS** and run:
```shell
cd C:/Navigate/To/Your/Folder
node main.js
```
## How it works
The idea is simple:  
1. Make the first generation  
That generation will make x completely random guesses of the number (within set boundries).  
Make two arrays to store the guessed value and it's accuracy.  
Put all data you collect throughout the generation in those arrays.  
2. Check the accuracy  
Check for the highest accuracy in the accuracy array.  
Get the index of the accuracy value in the array.  
Get the guess value corresponding to that index and save it to a variable.  
3. Modify the mutation and end generation  
If the accuracy is approaching 1 (and the guess is approaching the goal), lower the mutation, so that it you guess more precisely.  
Clear both guess and accuracy arrays.  
4. Check if you got the goal  
If the accuracy is 1 and the guess is the goal, you did it.  
5. Make a new generation  
Make x guesses in a new range, centered in the best guess of the last generation with the mutation value added and subtracted as minimum and maximum.  
Again, store all of the guesses and all of the accuracies in two separate arrays.  
6. Check the accuracy  
Same as step 2  
7. Modify the mutation and end generation  
Same as step 3  
8. Check if you got the goal  
Same as step 4  
9. Repeat steps 4-9 until you get the goal value  

Thats it man, I fucking hope you got it cause thats the best way I can explain it. Also, check the script comments for some details.
