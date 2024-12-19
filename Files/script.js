// Character class declaration
class Character {
  constructor(jsonSheet) {
	  try{
		  this.characterData = JSON.parse(jsonSheet);
		  this.name = characterData.name;
	  }
	  catch (error){
		  console.error("Error Reading JSON file", error);
	  }
  }
}

// Document ready event
document.addEventListener("DOMContentLoaded", function () {
  const skillsButton = document.getElementById("skills-button");
  let skillsPopup = null; // Variable to store the skills popup window
  let isPopupUp = false;

  // Skills button click event
  skillsButton.addEventListener("click", function () {
    // Remove existing skills popup if present
    if (skillsPopup) {
      document.body.removeChild(skillsPopup);
      skillsPopup = null;
      return;
    }

    const skillsContainer = document.getElementById("skills-data");
    const skillElements = skillsContainer.querySelectorAll(".skill");
    const skills = Array.from(skillElements).map(skillElement => ({
      name: skillElement.dataset.name,
      bonus: skillElement.dataset.bonus
    }));

    // Create skills popup
    const popup = document.createElement("div");
    popup.className = "popup";
    Object.assign(popup.style, {
      width: "300px",
      height: "auto",
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#AB7E4C",
      border: "1px solid #ccc",
      padding: "20px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      zIndex: "9999",
      overflowY: "auto"
    });

    // Populate skills popup
    skills.forEach(skill => {
      const skillDiv = document.createElement("div");
      skillDiv.textContent = `${skill.name} ${skill.bonus}`;
      Object.assign(skillDiv.style, {
        width: "100%",
        border: "1px solid black",
        minHeight: "20px"
      });

      const rollButton = document.createElement("button");
      rollButton.textContent = "Roll";
      rollButton.className = "roll-button";
      rollButton.style.float = "right";

      rollButton.addEventListener("click", function () {
        if (isPopupUp) {
          console.info("Attempted to open a roll popup when one was already open. Stopping Operation.");
          return;
        }
        isPopupUp = true;

        const rollResult = Math.floor(Math.random() * 20) + 1;
        const resultPopup = document.createElement("div");
        resultPopup.className = "result-popup";
        Object.assign(resultPopup.style, {
          width: "300px",
          height: "auto",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#D2B48C",
          border: "1px solid #ccc",
          padding: "20px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          zIndex: "9999",
          overflowY: "auto"
        });

        const rollResultDiv = document.createElement("div");
        rollResultDiv.innerHTML =
          `<b>TELL JAMIE THIS NUMBER:</b><br><br>
          <span style='font-size: 3em; font-weight: bold;'>${rollResult + parseInt(skill.bonus.slice(1))}</span><br>
          You rolled : ${rollResult} + ${skill.bonus.slice(1)}`;

        const closeButton = document.createElement("button");
        closeButton.textContent = "Close";
        Object.assign(closeButton.style, {
          position: "absolute",
          top: "10px",
          right: "10px",
          padding: "5px 10px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          cursor: "pointer"
        });

        closeButton.addEventListener("click", function () {
          document.body.removeChild(resultPopup);
          isPopupUp = false;
        });

        resultPopup.appendChild(rollResultDiv);
        resultPopup.appendChild(closeButton);
        document.body.appendChild(resultPopup);
      });

      skillDiv.appendChild(rollButton);
      popup.appendChild(skillDiv);
    });

    document.body.appendChild(popup);
    skillsPopup = popup;
  });

  // Move button click events
  const buttons = document.querySelectorAll(".move-button");
  buttons.forEach(button => {
    button.addEventListener("click", function () {
      if (isPopupUp) {
        console.info("Attempted to open a move popup when one was already open. Stopping Operation.");
        return;
      }
      isPopupUp = true;

      const headerText = this.getAttribute("data-header");
      const bodyText = this.getAttribute("data-body");

      const popup = document.createElement("div");
      popup.className = "popup";
      Object.assign(popup.style, {
        width: "300px",
        height: "auto",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#fff",
        border: "1px solid #ccc",
        padding: "20px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        zIndex: "9999",
        overflowY: "auto"
      });

      const header = document.createElement("h2");
      header.innerHTML = headerText;

      const body = document.createElement("p");
      body.innerHTML = bodyText;

      const closeButton = document.createElement("button");
      closeButton.textContent = "Close";
      Object.assign(closeButton.style, {
        position: "absolute",
        top: "10px",
        right: "10px",
        padding: "5px 10px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        cursor: "pointer"
      });

      closeButton.addEventListener("click", function () {
        document.body.removeChild(popup);
        isPopupUp = false;
      });

      popup.appendChild(header);
      popup.appendChild(body);
      popup.appendChild(closeButton);

      document.body.appendChild(popup);

      if (popup.offsetHeight > 600) {
        popup.style.height = "600px";
      }
    });
  });
});
