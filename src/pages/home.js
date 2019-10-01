import { API_KEY, contentEl, navigationEl } from "../config";
import { showLoading } from "../utils";

import renderShowPage from "./show";

export default async function main(page = 1, showTopRated = false) {
  showLoading();
  const shows = await loadPopularShows(page, showTopRated);
  renderShows(shows, showTopRated);
}

function renderShows(shows, showTopRated) {
  let items = "";
  for (const show of shows.results) {
    items += `<li data-show-id="${show.id}"> ${show.name}</li>`;
  }

  const showsUl = `<ul class="shows-list">${items}</ul>`;

  const pagination = `<div class="pagination">
    <button id="back_page_button" ${
      shows.page === 1 ? "disabled" : ""
    }>back</button>
    ${shows.page} 
    <button id="next_page_button" ${
      shows.page === shows.total_pages ? "disabled" : ""
    }>next</button>
  </div>`;
  contentEl.innerHTML = `<div class="home-page">${showsUl}${pagination}</div>`;
  contentEl.querySelector(".shows-list").addEventListener("click", event => {
    const li = event.target;
    const tvId = li.getAttribute("data-show-id");
    renderShowPage(tvId);
  });

  document.getElementById("back_page_button").addEventListener("click", () => {
    main(shows.page - 1, showTopRated);
  });

  document.getElementById("next_page_button").addEventListener("click", () => {
    main(shows.page + 1, showTopRated);
  });

  navigationEl.innerHTML = `<div>
    <a class="sort-button ${
      showTopRated ? "" : "active"
    }" id="popular_button"> Popular </a> |
    <a class="sort-button  ${
      showTopRated ? "active" : ""
    }"id="top_rated_button"> Top Rated </a>
  </div>`;

  document.getElementById("popular_button").addEventListener("click", () => {
    main(1, false);
  });

  document.getElementById("top_rated_button").addEventListener("click", () => {
    main(1, true);
  });
}

async function loadPopularShows(page, topRated) {
  const sortBy = topRated ? `vote_average.desc` : "popularity.desc";
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&sort_by=${sortBy}&page=${page}`
  );
  return await response.json();
}
