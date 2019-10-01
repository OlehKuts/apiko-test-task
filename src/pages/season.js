import { API_KEY, contentEl } from "../config";
import { setBackButton, showLoading } from "../utils";

import renderEpisode from "./episode";
import renderShow from "./show";

export default async function main(tvId, seasonId) {
  showLoading();
  setBackButton("Back to show details", () => {
    renderShow(tvId);
  });
  const season = await loadSeason(tvId, seasonId);
  renderSeason(season, tvId);
}

async function loadSeason(tvId, seasonNumber) {
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${tvId}/season/${seasonNumber}?api_key=${API_KEY}`
  );
  return await response.json();
}

function renderSeason(season, tvId) {
  let summary = `
    <h2> ${season.name} </h2>
    <img height="100px" src="https://image.tmdb.org/t/p/w500/${
      season.poster_path
    }"/>
    <div> ${season.overview} </div>
    <div> Total episodes: ${season.episodes.length} </div>
    `;

  let episodes = ``;
  for (const episode of season.episodes) {
    episodes += `<li data-episode-number="${episode.episode_number}"> ${
      episode.episode_number
    }. ${episode.name} </li>`;
  }

  const html = `${summary} <ul class="episode-list"> ${episodes} </ul>`;

  contentEl.innerHTML = `<div class="season-page">${html}</div>`;
  contentEl.querySelector(".episode-list").addEventListener("click", event => {
    const li = event.target;
    const episodeNumber = li.getAttribute("data-episode-number");
    renderEpisode(tvId, season.season_number, episodeNumber);
  });
}
