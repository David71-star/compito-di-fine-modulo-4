import { createCard } from "./components.js";

const url = "https://striveschool-api.herokuapp.com/api/product/";
const key =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWIyZWVjNDMxYTczZjAwMTlkNWM3MGEiLCJpYXQiOjE3MDYyMjUzNDgsImV4cCI6MTcwNzQzNDk0OH0.RqWIKGkrXE_oTWlFcWBN9h_Ge7XnmkMYiGWqKkTwqfw";
const buttonsAdd = document.getElementById("add");
const container = document.querySelector("#pack");

export async function putProduct(id, product) {
  try {
    const response = await fetch(url + id, {
      method: "PUT",
      body: JSON.stringify(product),
      headers: {
        Authorization: key,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    displayCard();
  } catch (error) {
    console.error("Errore nella richiesta:", error);
  }
}

export async function deleteProduct(id) {
  try {
    const response = await fetch(url + id, {
      method: "DELETE",
      headers: {
        Authorization: key,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    displayCard();
  } catch (error) {
    console.error("Errore nella richiesta:", error);
  }
}

async function postProduct() {
  const name = document.getElementById("name").value;
  const img = document.getElementById("image").value;
  const brand = document.getElementById("brand").value;
  const price = document.getElementById("price").value;
  const description = document.getElementById("description").value;

  try {
    const data = {
      name: name,
      description: description,
      brand: brand,
      imageUrl: img,
      price: price,
    };

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: key,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    displayCard();
  } catch (error) {
    console.error("Errore nella richiesta:", error);
  }
}
buttonsAdd.addEventListener("click", postProduct);

async function inviaModulo() {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: key,
      },
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Errore nella richiesta:", error);
  }
}

async function displayCard() {
  container.innerHTML = "";
  try {
    const products = await inviaModulo();
    products.map((product) => {
      container.append(createCard(product));
    });
  } catch (error) {
    console.log(error);
  }
}
displayCard();
