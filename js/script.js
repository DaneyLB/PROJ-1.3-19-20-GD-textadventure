const divLocation = document.getElementById('location');
const myPossibilities = document.getElementById('possibilities');
const myInput = document.getElementById('myInput');
const feedback = document.getElementById('feedback');
const imageLocation = document.getElementById('imageLocation');
const myDescription = document.getElementById('description');
const myInventory = document.getElementById('inventory');
const treasure = document.getElementById('treasure');

let currentLocation = 4;
let treasureGepakt = false;
let deurSlot = true;

let locations = [];
locations[0] = "Grot";
locations[1] = "Grot";
locations[2] = "Uitgang";
locations[3] = "Grot";
locations[4] = "Grot";
locations[5] = "Grot met een crack in de muur";
locations[6] = "Grot";
locations[7] = "Grot";
locations[8] = "Grot";

images = [];
images[0] = "room0.png";
images[1] = "room1.png";
images[2] = "room2.png";
images[3] = "room3.png";
images[4] = "room4.png";
images[5] = "room5.png";
images[6] = "room6.png";
images[7] = "room7.png";
images[8] = "room8.png";

directions = [];
directions[0] = ["zuid", "oost"];
directions[1] = ["west", "zuid"];
directions[2] = ["zuid"];
directions[3] = ["noord", "zuid"];
directions[4] = ["noord", "zuid"];
directions[5] = ["zuid"];
directions[6] = ["noord", "oost"];
directions[7] = ["noord", "west", "oost"];
directions[8] = ["noord", "west"];

descriptions = [];
descriptions[0] = "Der ligt hier een bom opgeslagen... Misschien handig om deze mee te nemen (type: pak Bom)";
descriptions[1] = "Hmmm , je kan hier 2 richtingen op.";
descriptions[2] = "Je bent weer veilig naar buiten gekomen!!";
descriptions[3] = "Je kan hier 2 richtingen op.";
descriptions[4] = "U bent van boven naar beneden in deze grot gevallen... er moet vast wel een uitweg zijn!";
descriptions[5] = "Er zit hier een gat in de muur, mischien kan deze kapot! (type: gebruik (item), hierna kan je naar het noorden gaan!";
descriptions[6] = "Er zijn hier weer 2 kanten die we op kunnen";
descriptions[7] = "Oef 3 kanten die we op kunnen.... waar gaan we heen?";
descriptions[8] = "Volgens mij zie ik daar iets in de verte!";

let gebruikTreasure = [];
  gebruikTreasure[5] = "Bom";

let pakTreasure = [];
  pakTreasure[0] = "Bom";

treasureImages = [];
  treasureImages[0] = "Bomb.png";


myInput.addEventListener('keydown', getInput, false);

function getInput(evt) {
  if (evt.key == "Enter") {
    let inputArray = myInput.value.split(" ");

    if (inputArray[0] == "ga") {
      if (directions[currentLocation].indexOf(inputArray[1]) != -1) {
        switch (inputArray[1]) {
          case "noord":
            currentLocation -= 3;
            break;
          case "zuid":
            currentLocation += 3;
            break;
          case "oost":
            currentLocation += 1;
            break;
          case "oost":
            currentLocation += 1;
            break;
          case "west":
            currentLocation -= 1;
            break;
        }
      }

   
  
       else {
        feedback.innerHTML = "dat mag niet";
        setTimeout(removeFeedback, 2000);

      }
      giveLocation();
      myInput.value = "";
    }

    if (inputArray[0] == "pak") {
      if (pakTreasure[currentLocation].indexOf(inputArray[1]) != -1)
      {
        treasureGepakt = true;
        console.log("Je hebt de bom");
      }
      myInput.value = "";
    }

    if (inputArray[0] == "gebruik")
    {
      if (gebruikTreasure[currentLocation].indexOf(inputArray[1]) != -1)
      {
        if (treasureGepakt == true)
        {
          doorSlot = false;
          directions[5] = ["noord", "zuid"];
          console.log("Deur open");
        }
      }
      myInput.value = "";
    }

    if (inputArray[0] != "ga" && inputArray[0] != "pak" && inputArray[0] != "gebruik" ){
      feedback.innerHTML = "mogelijke commando's zijn: ga, pak, gebruik en help";
      myInput.value = "";
      setTimeout(removeFeedback, 4000);
    }

  }
}

function showTreasure(currentLocation){
  if(typeof treasureImages[currentLocation] != "undefined"){
    console.log(treasureImages[currentLocation]);
    treasure.src = "treasures/" + treasureImages[currentLocation];
    if(treasureGepakt == true){
      treasure.src = "";
    }
  }
  else{
    treasure.src = "";
  }
}

function giveLocation() {
  divLocation.innerHTML = locations[currentLocation] + " Grid => " + currentLocation;
  myDescription.innerHTML = descriptions[currentLocation];
  imageLocation.src = "media/" + images[currentLocation];
  myDirections = "mogelijke richtingen zijn: ";
  for (let i = 0; i < directions[currentLocation].length; i++) {
    myDirections += "<li>" + directions[currentLocation][i] + "</li>";
  }
  myPossibilities.innerHTML = myDirections;
  if (treasureGepakt == true)
  {
    myInventory.innerHTML = "Je hebt een Bom in je inventory."; 
  }
  else
  {
    myInventory.innerHTML = "uw inventory is leeg";
  }
  showTreasure(currentLocation);
}

function removeFeedback() {
  feedback.innerHTML = "";
}

giveLocation();
