document.addEventListener("DOMContentLoaded", function() {

  var skillsButton = document.getElementById("skills-button");
  var skillsPopup = null;// Variable to store the skills popup window
  let isPopupUp = false;
  
  skillsButton.addEventListener("click", function() {
	  // If a skills popup window is already open, remove it
	if (skillsPopup) {
		document.body.removeChild(skillsPopup);
		skillsPopup = null; // Reset skillsPopup variable
		return; // Exit the function to prevent creating another popup
	}
	var skillsContainer = document.getElementById("skills-data");
	var skillElements = skillsContainer.querySelectorAll(".skill");
	var skills = [];
	
	skillElements.forEach(function(skillElement) {
	  var name = skillElement.dataset.name;
	  var bonus = skillElement.dataset.bonus;
	  skills.push({ name: name, bonus: bonus });
	});

    var popup = document.createElement("div");
    popup.className = "popup";
    popup.style.width = "300px";
    popup.style.height = "auto";
    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.backgroundColor = "#AB7E4C";
    popup.style.border = "1px solid #ccc";
    popup.style.padding = "20px";
    popup.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";
    popup.style.zIndex = "9999";
    popup.style.overflowY = "auto";

    skills.forEach(function(skill) {
		var skillDiv = document.createElement("div");
		skillDiv.textContent = skill.name + " " + skill.bonus;
		skillDiv.style.width = "100%";
		skillDiv.style.border = "1px solid black"; // Add black border
		skillDiv.style.minHeight = "20px"; // Set minimum height to 20 pixels
		var rollButton = document.createElement("button");
		rollButton.textContent = "Roll";
		rollButton.className = "roll-button";
		rollButton.style.float = "right"; // Align roll button to the right
	
	
		rollButton.addEventListener("click", function() {
			if(isPopupUp){
				console.info("Attempted to open a roll popup when one was already open. Stopping Operation.");
			}
			else{
				//Popup Detection Boolean
				isPopupUp = true;
				
				var rollResult = Math.floor(Math.random() * 20) + 1;
				var resultPopup = document.createElement("div");
				resultPopup.className = ".result-popup";
				resultPopup.style.width = "300px";
				resultPopup.style.height = "auto";
				resultPopup.style.position = "fixed";
				resultPopup.style.top = "50%";
				resultPopup.style.left = "50%";
				resultPopup.style.transform = "translate(-50%, -50%)";
				resultPopup.style.backgroundColor = "#D2B48C";
				resultPopup.style.border = "1px solid #ccc";
				resultPopup.style.padding = "20px";
				resultPopup.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";
				resultPopup.style.zIndex = "9999";
				resultPopup.style.overflowY = "auto";

				var rollResultDiv = document.createElement("div");
				rollResultDiv.innerHTML =
					"<b>TELL JAMIE THIS NUMBER:</b><br><br>" +
					"<span style='font-size: 3em; font-weight: bold;'>" +
					(rollResult + parseInt(skill.bonus.slice(1))) +
					"</span><br>" +
					"You rolled : " +
					rollResult +
					" + "+ skill.bonus.slice(1);
				resultPopup.appendChild(rollResultDiv);

				var closeButton = document.createElement("button");
				closeButton.textContent = "Close";
				closeButton.style.position = "absolute";
				closeButton.style.top = "10px";
				closeButton.style.right = "10px";
				closeButton.style.padding = "5px 10px";
				closeButton.style.backgroundColor = "#007bff";
				closeButton.style.color = "#fff";
				closeButton.style.border = "none";
				closeButton.style.cursor = "pointer";

				closeButton.addEventListener("click", function() {
				  document.body.removeChild(resultPopup);
				  isPopupUp = false; //Set PopupUp to false, so new popups can be created.
				});

				resultPopup.appendChild(closeButton);
				document.body.appendChild(resultPopup);
			}

      });
	  
	  
		skillDiv.appendChild(rollButton);
		popup.appendChild(skillDiv);
    });

    document.body.appendChild(popup);

	// Store the reference to the skills popup window
    skillsPopup = popup;
  });

  var buttons = document.querySelectorAll(".move-button");

  buttons.forEach(function(button) {
    button.addEventListener("click", function() {
	if(!isPopupUp){
	  isPopupUp = true;
      var headerText = this.getAttribute("data-header");
      var bodyText = this.getAttribute("data-body");

      var popup = document.createElement("div");
      popup.className = "popup";
      popup.style.width = "300px";
      popup.style.height = "auto";
      popup.style.position = "fixed";
      popup.style.top = "50%";
      popup.style.left = "50%";
      popup.style.transform = "translate(-50%, -50%)";
      popup.style.backgroundColor = "#fff";
      popup.style.border = "1px solid #ccc";
      popup.style.padding = "20px";
      popup.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";
      popup.style.zIndex = "9999";
      popup.style.overflowY = "auto";

      var header = document.createElement("h2");
      header.innerHTML = headerText;

      var body = document.createElement("p");
      body.innerHTML = bodyText;

      var closeButton = document.createElement("button");
      closeButton.textContent = "Close";
      closeButton.style.position = "absolute";
      closeButton.style.top = "10px";
      closeButton.style.right = "10px";
      closeButton.style.padding = "5px 10px";
      closeButton.style.backgroundColor = "#007bff";
      closeButton.style.color = "#fff";
      closeButton.style.border = "none";
      closeButton.style.cursor = "pointer";

      closeButton.addEventListener("click", function() {
        document.body.removeChild(popup);
		isPopupUp = false;
      });

      popup.appendChild(header);
      popup.appendChild(body);
      popup.appendChild(closeButton);

      document.body.appendChild(popup);

      var popupHeight = popup.offsetHeight;
      if (popupHeight > 600) {
        popup.style.height = "600px";
      }
	}
	else{
		console.info("Attempted to open a move popup when one was already open. Stopping Operation.");
	}
    });
  });
});