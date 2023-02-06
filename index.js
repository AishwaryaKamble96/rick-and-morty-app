import { createCharacterCard } from "./components/card/card.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let maxPage = 1;
let page = 1;
const searchQuery = "";

async function fetchCharacters() {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${page}&name=${searchQuery}`
    );
    // Data in Json
    const data = await response.json();
    console.log(data);
    maxPage = data.info.pages;
    pagination.textContent = `${page} / ${maxPage}`;

    cardContainer.innerHTML = "";
    data.results.forEach((element) => {
      const li = createCharacterCard(element);
      cardContainer.append(li);
    });
  } catch {
    console.error("Something went wrong");
  }
}

//Search bar event Listner
searchBar.addEventListener("submit", (e) => {
  e.preventDefault();

  searchQuery = searchBar.query.value;
  fetchCharacters();
  searchBar.query.value = "";
});

// Event listner for next button
nextButton.addEventListener("click", () => {
  page++;
  pagination.textContent = `${page} / ${maxPage}`;
  fetchCharacters();
});

//Event listner for previous button
prevButton.addEventListener("click", () => {
  if (page > 1) {
    page--;
    pagination.textContent = `${page} / ${maxPage}`;
  }

  fetchCharacters();
});

fetchCharacters();
