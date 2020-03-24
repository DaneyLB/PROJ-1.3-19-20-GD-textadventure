const divLocation = document.getElementById('location');
const myPossibilities = document.getElementById('possibilities');
const myInput = document.getElementById('myInput');
const feedback = document.getElementById('feedback');
const imageLocation = document.getElementById('imageLocation');
const myDescription = document.getElementById('description');
const myInventory = document.getElementById('inventory');
const treasures = document.getElementById('treasure');

let currentLocation = 4;
let treasureGepakt = false;
let deurSlot = true;

let locations = [];
locations[0] = "kantine";
locations[1] = "trap";
locations[2] = "eind";
locations[3] = "docentenkamer";
locations[4] = "poort naar de stad";
locations[5] = "medialab";
locations[6] = "toiletten";
locations[7] = "klaslokaal";
locations[8] = "examenlokaal";

images = [];
images[0] = "room0.jpg";
images[1] = "room1.jpg";
images[2] = "room2.jpg";
images[3] = "room3.jpg";
images[4] = "room4.jpg";
images[5] = "room5.jpg";
images[6] = "room6.jpg";
images[7] = "room7.jpg";
images[8] = "room8.jpg";

directions = [];
directions[0] = ["zuid"];
directions[1] = ["west", "zuid"];
directions[2] = ["zuid"];
directions[3] = ["zuid"];
directions[4] = ["noord", "zuid"];
directions[5] = ["zuid"];
directions[6] = ["oost"];
directions[7] = ["noord", "west", "oost"];
directions[8] = ["noord", "west"];

descriptions = [];
descriptions[0] = "u staat in een kantine. Hier zitten studenten te eten of computerspelletjes te doen";
descriptions[1] = "u staat op een trap naar de eerste etage. Om u heen lopen studenten omhoog en omlaag";
descriptions[2] = "u heeft gewonnen";
descriptions[3] = "u staat in de lerarenkamer. De leraren eten hier hun lunch of drinken koffie of thee";
descriptions[4] = "u staat in een gang. Studenten en leraren lopen richting de klaslokalen";
descriptions[5] = "u staat in het medialab. Hier kan geexperimenteerd worden met bijvoorbeeld virtual reality brillen";
descriptions[6] = "u staat bij de toiletten";
descriptions[7] = "u staat in een klaslokaal. De tafels staan recht achter elkaar en voorin is een projector en een smartboard";
descriptions[8] = "u staat in het examenlokaal. Hier zijn de vierdejaars studenten bezig met het voorbereiden van hun examen";

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
    treasures.src = "treasures/" + treasureImages[currentLocation];
  }
}

function giveLocation() {
  divLocation.innerHTML = locations[currentLocation] + " daney jij bent in grid " + currentLocation;
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
