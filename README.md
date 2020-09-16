# Puppy
 
A game for js13k 2020  
Take charge of Puppy who must find help for his owner who has become trapped. Find help and guide them back to Tony, your owner.
Look out for big mean dogs who prowl the woods.

## Gameplay
Move Puppy using WASD or Arrows  
SPACE to bark or interact

Search the map for someone to help you. Get close and Bark to get their attention and enter into a dialog and convince them to help you.  
Guide the rescuer back to Tony, your owner before time runs out for Tony.  
Collect Toys to extend time.  
Collect treats to boost your bark power. The bigger the bark the bigger the range.  
Locate rescuers with a bark, if they hear you you will get a '!!' indicating their general direction.  
Bring the rescuer to the Well where Tony is trapped.

# Development
I went with a similar style to my previous 2019 entry and addressd a few issues raised from comments and from my own 'wish id done differently' list.  
I replaced the isometric perspective with a more 'crossy road' perspective which is what i originally would have prefered so i rotated the view by about 22 degrees.  
I kept the overall blocky style. I wanted to make it more fun this time, in fact I wanted to make people laugh, so i tried to add some more comedy touches such as the newspaper front page to announce the players success or failures.  
I had an audio manager already developed but didnt have room to add any sound again this year. This was the first time I was seriously struggling to make the 13k limit and had to seriously golf the last 100bytes.  

The game originally was convieved as a series of levels with each level being losing Tony to a variety of different hazards like caves, cliffs, wells and the rescuer being further away and harder to find each time but thought it would be funny (and k saving) to make each rescuer join Tony in falling down the well and puppy having to go find the next. This I think saved some much needed bytes and makes a better game I think.  
The newspaper effect also came late and was just going to be a game over splash screen with some text but this idea just popped into my head from somewhere so I thought imediately of th eold Arcade Game Paperboy for inspiration. Did anyone get the 4 April reference ;)  


* Developed using Visual studio code
* Minified with Xem's online terser (https://xem.github.io/terser-online/)
* Game assets created with my own polygon editor
* Maps generated with my own map generator from regular png maps
* Compressed using advzip 
