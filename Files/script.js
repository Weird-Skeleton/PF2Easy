class Character {
  constructor(jsonSheet) {
    try {
      this.characterData = JSON.parse(jsonSheet);  // Define this.characterData
      this.name = this.characterData.build.name;   // Use this.characterData
      this.level = this.characterData.build.level;
      this.charClass = this.characterData.build.class;
      this.maxHP = this.characterData.build.attributes.ancestryhp + 
                   ((this.characterData.build.attributes.classhp + 
                     ((this.characterData.build.abilities.con - 10) / 2)) * this.characterData.build.level) + 
                   this.characterData.build.attributes.bonushp;
      this.curHP = this.maxHP;  // Saving cur HP will be implemented in future update
      this.ACTotal = this.characterData.build.acTotal.acTotal;

      for (const [key, value] of Object.entries(this.characterData.build.proficiencies)) {
        this.abilityKey = "";
        if (key === "athletics" || key === "advanced" || key === "martial" || key === "simple" || key === "unarmed") {
          this.abilityKey = "str";
        }
        if (key === "reflex" || key === "heavy" || key === "medium" || key === "light" || key === "unarmored" || key === "acrobatics" || key === "stealth" || key === "thievery") {
          this.abilityKey = "dex";
        }
        if (key === "fortitude") {
          this.abilityKey = "con";
        }
        if (key === "castingArcane" || key === "arcana" || key === "crafting" || key === "occultism" || key === "society") {
          this.abilityKey = "int";
        }
        if (key === "will" || key === "castingPrimal" || key === "castingDivine" || key === "medicine" || key === "nature" || key === "perception" || key === "religion" || key === "survival") {
          this.abilityKey = "wis";
        }
        if (key === "deception" || key === "diplomacy" || key === "intimidation" || key === "castingOccult" || key === "performance") {
          this.abilityKey = "cha";
        }
        this[key + "Total"] = this.calculateProficiencyTotal(key,this.abilityKey);
      }

      for (const [key, value] of Object.entries(this.characterData.build.lores)) {
        this.abilityKey = "int";
        this[key + "Total"] = this.calculateProficiencyTotal(key,this.abilityKey);
      }
	  
	  
    } catch (error) {
      console.error("Error Reading JSON file", error);
    }
  }

  calculateProficiencyTotal(proficiencyKey, abilityKey) {
    const proficiencyValue = this.characterData.build.proficiencies[proficiencyKey];
    const abilityModifier = ((this.characterData.build.abilities[abilityKey] - 10) / 2);
    return proficiencyValue + this.level + abilityModifier;
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
