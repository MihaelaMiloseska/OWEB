function start() {

    var words = ["мајка", "татко", "трева", "пушка", "змија", "куче", "рекет", "отров", "мачка", "лебед"];
    var selectedWord = words[Math.floor(Math.random() * words.length)];
    var attempts = 5;
    
    // 2рандом букви
    let hintIndices = new Set();
    while (hintIndices.size < 2) {
        hintIndices.add(Math.floor(Math.random() * selectedWord.length));
    }
    let hint = "";
    for (let i = 0; i < selectedWord.length; i++) {
        hint += hintIndices.has(i) ? selectedWord[i] : "_";
    }
    document.getElementById("hint").textContent = "Зборот е: " + hint;


    const attemptsElement = document.getElementById("attempts");
    attemptsElement.textContent = "Преостанати обиди: " + attempts;

    
    const modal = document.getElementById("gameModal");
    const modalMessage = document.getElementById("modalMessage");
    const modalClose = document.getElementById("modalClose");
    const restartButton = document.getElementById("restartButton");

    
    document.getElementById("checkButton").addEventListener("click", function () {
        var guess = document.getElementById("guess").value.toLowerCase();

        if (guess === selectedWord) {
            
            modalMessage.textContent = "УСПЕШНА ИГРА! ГО ПОГОДИВТЕ ЗБОРОТ :)";
            modal.style.display = "block";
        } else {
            attempts--;
            if (attempts > 0) {
                attemptsElement.textContent = "Преостанати обиди: " + attempts;
                alert("Неточно! Пробај повторно.");
            } else {
            
                modalMessage.textContent = "НЕУСПЕШНА ИГРА :( Зборот беше: " + selectedWord;
                modal.style.display = "block";
            }
        }
    });

   
    restartButton.onclick = function () {
        location.reload();
    }
}

window.addEventListener("load", start, false);