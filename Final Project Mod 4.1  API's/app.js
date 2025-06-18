
const apiKey = "2c647a3d";
const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=`;
function getQueryParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

const query = getQueryParameter("search");
async function performSearch(query) {
  searchResults.innerHTML = "";
  try {
    const response = await fetch(`${apiUrl}${encodeURIComponent(query)}`);
    const data = await response.json();

    if (data.Response === "True" && data.Search.length > 0) {
      data.Search.forEach((movie) => {
        const movieDiv = document.createElement("div");
        movieDiv.classList.add("movie-item");
        movieDiv.innerHTML = `
          <h3>${movie.Title}</h3>
          <img src="${movie.Poster}" alt="${movie.Title}" />
          <p>${movie.Year}</p>
        `;
        searchResults.appendChild(movieDiv);
      });
    } else {
      searchResults.innerHTML = "<p>No movies found!</p>";
    }
  } catch (error) {
    console.error("Error fetching movie data:", error);
    searchResults.innerHTML =
      "<p>Error fetching data. Please try again later.</p>";
  }
}
document.addEventListener("DOMContentLoaded", function () {
  if (query) {
    document.getElementById("search-input").value = query;
    performSearch(query);
  }
  document.getElementById("search-button").addEventListener("click", () => {
    const newQuery = document.getElementById("search-input").value.trim();
    if (newQuery) {
    
      window.location.href = `index2.html?search=${encodeURIComponent(query)}`;
    } else {
      alert("Please enter a movie title.");
    }
  });
});
const yearFilter = document.getElementById('year-filter');
if (yearFilter) {
  for (let year = 2025; year >= 1900; year--) {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    yearFilter.appendChild(option);
  }
}
