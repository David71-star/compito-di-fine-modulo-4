import { deleteProduct, putProduct } from "./home.js";

export function createCard(product) {
  // Create div element with the specified classes

  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card", "col-6", "col-md-4", "col-lg-3");

  // Create img element with src and classes
  const imgElement = document.createElement("img");
  imgElement.src = product.imageUrl;
  imgElement.classList.add("card-img-top");

  // Create div element for card body
  const cardBodyDiv = document.createElement("div");
  cardBodyDiv.classList.add("card-body");

  // Create h5 element with class and text content
  const titleElement = document.createElement("h5");
  titleElement.classList.add("card-title", "text-truncate");
  titleElement.textContent = product.name;

  // Create p element with class and text content
  const descriptionElement = document.createElement("p");
  descriptionElement.classList.add("card-text", "text-truncate");
  descriptionElement.textContent = "Descrizione: " + product.description;

  // Append title and description to card body
  cardBodyDiv.appendChild(titleElement);
  cardBodyDiv.appendChild(descriptionElement);

  // Create ul element with class
  const listGroupElement = document.createElement("ul");
  listGroupElement.classList.add("list-group", "list-group-flush");

  // Create li elements for brand and price
  const brandElement = document.createElement("li");
  brandElement.classList.add("list-group-item");
  brandElement.textContent = "Brand: " + product.brand;

  const priceElement = document.createElement("li");
  priceElement.classList.add("list-group-item");
  priceElement.textContent = "Prezzo: " + product.price + "€";

  // Append brand and price to list group
  listGroupElement.appendChild(brandElement);
  listGroupElement.appendChild(priceElement);

  // Create another div element for the second card body
  const secondCardBodyDiv = document.createElement("div");
  secondCardBodyDiv.classList.add(
    "card-body",
    "row",
    "flex-wrap",
    "justify-content-center",
    "gap-3"
  );

  // Create anchor elements for Dettaglio, Rimuovi, and Modifica
  const detailLink = document.createElement("a");
  detailLink.href = `./product.html?id=${product._id}`;
  detailLink.classList.add("bottonicard");
  detailLink.textContent = "Dettaglio";

  const removeButton = document.createElement("button");
  removeButton.onclick = () => {
    deleteProduct(product._id);
  };
  removeButton.id = "rimuovi";
  removeButton.type = "button";
  removeButton.classList.add("bottonicard");
  removeButton.textContent = "Rimuovi";

  const buttonEdit = document.createElement("button");
  buttonEdit.type = "button";
  buttonEdit.classList.add("bottonicard");
  buttonEdit.textContent = "Modifica";
  buttonEdit.onclick = () => {
    createModal(product);
    const modalDiv = document.getElementById("modalCustom");
    const modal = new bootstrap.Modal(modalDiv);
    modal.show();
  };

  // Append anchor elements to the second card body
  secondCardBodyDiv.appendChild(detailLink);
  secondCardBodyDiv.appendChild(removeButton);
  secondCardBodyDiv.appendChild(buttonEdit);

  // Append all elements to the main card div
  cardDiv.appendChild(imgElement);
  cardDiv.appendChild(cardBodyDiv);
  cardDiv.appendChild(listGroupElement);
  cardDiv.appendChild(secondCardBodyDiv);

  return cardDiv;
}

function createModal(product) {
  // Creazione del div principale del modal
  const modalDiv = document.createElement("div");
  modalDiv.classList.add("modal", "fade");
  modalDiv.id = "modalCustom";
  modalDiv.tabIndex = "-1";
  modalDiv.setAttribute("aria-labelledby", "modalCustomLabel");
  modalDiv.setAttribute("aria-hidden", "true");

  // Creazione del div del dialogo del modal
  const modalDialogDiv = document.createElement("div");
  modalDialogDiv.classList.add("modal-dialog");

  // Creazione del contenuto del modal
  const modalContentDiv = document.createElement("div");
  modalContentDiv.classList.add("modal-content");

  // Creazione dell'intestazione del modal
  const modalHeaderDiv = document.createElement("div");
  modalHeaderDiv.classList.add("modal-header");

  // Creazione del titolo h1 del modal
  const modalTitle = document.createElement("h1");
  modalTitle.classList.add("modal-title", "fs-5");
  modalTitle.id = "modalCustomLabel";
  modalTitle.textContent = "Modifica Prodotto";

  // Creazione del bottone di chiusura
  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.classList.add("btn-close");
  closeButton.setAttribute("data-bs-dismiss", "modal");
  closeButton.setAttribute("aria-label", "Close");

  // Aggiunta del titolo e del bottone di chiusura all'intestazione del modal
  modalHeaderDiv.appendChild(modalTitle);
  modalHeaderDiv.appendChild(closeButton);

  // Creazione del corpo del modal
  const modalBodyDiv = document.createElement("div");
  modalBodyDiv.classList.add("modal-body");

  // Creazione del form all'interno del corpo del modal
  const form = document.createElement("form");
  form.classList.add(
    "mb-4",
    "d-flex",
    "justify-content-start",
    "gap-3",
    "flex-wrap"
  );

  // Creazione degli input del form

  const inputName = document.createElement("input");
  inputName.placeholder = "name";
  inputName.value = product.name;
  inputName.type = "text";
  form.appendChild(inputName);

  const inputImg = document.createElement("input");
  inputImg.placeholder = "link img";
  inputImg.value = product.imageUrl;
  inputImg.type = "text";
  form.appendChild(inputImg);

  const inputBrand = document.createElement("input");
  inputBrand.placeholder = "brand";
  inputBrand.value = product.brand;
  inputBrand.type = "text";
  form.appendChild(inputBrand);

  const inputPrice = document.createElement("input");
  inputPrice.placeholder = "price";
  inputPrice.value = product.price;
  inputPrice.type = "number";
  form.appendChild(inputPrice);

  const inputDescription = document.createElement("input");
  inputDescription.placeholder = "description";
  inputDescription.type = "text";
  inputDescription.value = product.description;
  form.appendChild(inputDescription);

  // Aggiunta del form al corpo del modal
  modalBodyDiv.appendChild(form);

  // Creazione del piè di pagina del modal
  const modalFooterDiv = document.createElement("div");
  modalFooterDiv.classList.add("modal-footer");

  // Creazione dei due bottoni nel piè di pagina con rispettive classi
  const cancelButton = document.createElement("button");
  cancelButton.type = "button";
  cancelButton.classList.add("btn", "btn-secondary");
  cancelButton.setAttribute("data-bs-dismiss", "modal");
  cancelButton.textContent = "Annulla";

  const confirmButton = document.createElement("button");
  confirmButton.type = "button";
  confirmButton.classList.add("btn", "btn-primary");
  confirmButton.setAttribute("data-bs-dismiss", "modal");
  confirmButton.textContent = "Conferma modifica";
  confirmButton.onclick = () => {
    const editProduct = {
      name: inputName.value,
      description: inputDescription.value,
      brand: inputBrand.value,
      imageUrl: inputImg.value,
      price: inputPrice.value,
    };
    putProduct(product._id, editProduct);
  };

  // Aggiunta dei bottoni al piè di pagina del modal
  modalFooterDiv.appendChild(cancelButton);
  modalFooterDiv.appendChild(confirmButton);

  // Aggiunta dell'intestazione, corpo e piè di pagina al contenuto del modal
  modalContentDiv.appendChild(modalHeaderDiv);
  modalContentDiv.appendChild(modalBodyDiv);
  modalContentDiv.appendChild(modalFooterDiv);

  // Aggiunta del contenuto del modal al dialogo del modal
  modalDialogDiv.appendChild(modalContentDiv);

  // Aggiunta del dialogo del modal al div principale del modal
  modalDiv.appendChild(modalDialogDiv);

  const modalContainer = document.querySelector(".modal-container");
  modalContainer.innerHTML = "";
  modalContainer.appendChild(modalDiv);
}
