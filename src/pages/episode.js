import { API_KEY, contentEl } from "../config";
import { setBackButton, showLoading } from "../utils";

import renderSeason from "./season";

export default async function main(tvId, seasonNumber, episodeNumber) {
  showLoading();
  setBackButton("Back to season details", () => {
    renderSeason(tvId, seasonNumber);
  });
  const episode = await loadEpisode(tvId, seasonNumber, episodeNumber);
  renderEpisode(episode);
}

async function loadEpisode(tvId, seasonNumber, episodeNumber) {
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}?api_key=${API_KEY}`
  );
  return await response.json();
}

function renderEpisode(episode) {
  let html = `
    <h2> Season ${episode.season_number} Episode: ${episode.episode_number} ${
    episode.name
  } </h2>
    <img height="200px" src="https://image.tmdb.org/t/p/w500/${
      episode.still_path
    }"/>
    <div> ${episode.overview} </div>
    `;

  contentEl.innerHTML = `<div class="episode-page">${html}</div>`;
}
