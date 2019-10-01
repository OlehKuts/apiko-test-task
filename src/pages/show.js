import { API_KEY, contentEl } from "../config";
import { setBackButton, showLoading } from "../utils";

import renderSeason from "./season";
import renderHome from "./home";

export default async function main(id) {
  showLoading();
  setBackButton("Back to shows list", () => {
    renderHome();
  });
  const tvShow = await loadTvShow(id);
  renderShow(tvShow);
}

async function loadTvShow(id) {
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`
  );
  return await response.json();
}

function renderShow(tvShow) {
  let summary = `
    <h2> ${tvShow.name} </h2>
    <img height="100px" src="https://image.tmdb.org/t/p/w500/${
      tvShow.poster_path
    }"/>
    <div> ${tvShow.overview} </div>
    <div> Total seasons: ${tvShow.number_of_seasons} </div>
    <div> Total episodes: ${tvShow.number_of_episodes} </div>
    `;

  let seasons = ``;
  for (const season of tvShow.seasons) {
    seasons += `<li class="season-item" data-season-number="${
      season.season_number
    }"> ${season.name} </li>`;
  }

  const html = `${summary} <ul class="season-list"> ${seasons} </ul>`;

  contentEl.innerHTML = `<div class="season-page">${html}</div>`;
  contentEl.querySelector(".season-list").addEventListener("click", event => {
    const li = event.target;
    const seasonNumber = li.getAttribute("data-season-number");
    renderSeason(tvShow.id, seasonNumber);
  });
}
