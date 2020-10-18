function displayScores() {
  
  // Retrieve scores from local storage, or create a blank one.
  var scores = JSON.parse(window.localStorage.getItem("scores")) || [];

  // Order scores highest to lowest.
  scores.sort(function(a, b) { return b.score - a.score;});

  // Goes through the scores and displays them.
  for (i = 0; i<scores.length; i++) {

    var listItem = document.createElement("li");
    listItem.textContent = scores[i].initials + " ---- " + scores[i].score;
    var olEl = document.getElementById("scores");
    olEl.appendChild(listItem);
  }

}

function emptyScores() {

  // Deletes high scores from localstorage.
  window.localStorage.removeItem("scores");
  window.location.reload();
}

//When clear button is clicked, it empties the high scores.
document.getElementById("clear").onclick = emptyScores;

// Function is called when scores.html page is displayed.
displayScores();
