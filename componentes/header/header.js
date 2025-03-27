function createLogo() {
    const logo = document.createElement("img");
    logo.src = "data:image/png;base64,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";
    logo.alt = "Logo";
    logo.classList.add("logo");
    return logo;
}

function createTitle() {
    const title = document.createElement("h1");
    title.textContent = "Listado SCL";
    title.classList.add("title");
    return title;
}

function createDateInput() {
    const dateContainer = document.createElement("div");
    dateContainer.classList.add("date-container");
    
    const dateDisplay = document.createElement("span");
    dateDisplay.textContent = "Selecciona una fecha";
    dateDisplay.classList.add("date-display");
    dateContainer.appendChild(dateDisplay);
    
    const dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.classList.add("date-input");
    dateInput.style.display = "none";
    
    dateDisplay.addEventListener("click", () => {
        dateInput.style.display = "block";
        dateInput.focus();
    });
    
    dateInput.addEventListener("change", () => {
        dateDisplay.textContent = dateInput.value;
        dateInput.style.display = "none";
    });
    
    dateContainer.appendChild(dateInput);
    return dateContainer;
}

function Header() {
    const header = document.createElement("header");
    header.classList.add("header");
    
    const container = document.createElement("div");
    container.classList.add("header-container");
    
    container.appendChild(createLogo());
    container.appendChild(createTitle());
    container.appendChild(createDateInput());
    
    header.appendChild(container);
    
    return header;
}

export { Header };