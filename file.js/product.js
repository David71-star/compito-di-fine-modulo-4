const params = new URLSearchParams(location.search);
const id = params.get("id");
let container = document.querySelector(".container");
fetch("https://striveschool-api.herokuapp.com/api/product/" + id, {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWIyZWVjNDMxYTczZjAwMTlkNWM3MGEiLCJpYXQiOjE3MDYyMjUzNDgsImV4cCI6MTcwNzQzNDk0OH0.RqWIKGkrXE_oTWlFcWBN9h_Ge7XnmkMYiGWqKkTwqfw",
  },
})
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    container.innerHTML = `<h1>${data.name}</h1>
    <div class="d-flex justify-content-start mt-3">
    <img src="${data.imageUrl}"/>
    <h4>Price: ${data.price} €</h4>
    </div>
    <p>Descrizione: ${data.description}</p>
    `;
  });
