
// Get query parameter from URL
function getQueryParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// DOM elements
const searchResults = document.getElementById("search-results");
const searchSection = document.getElementById("search-section");
const loadingSpinner = document.getElementById("loading-spinner");
const query = getQueryParameter("search");
const yearParam = getQueryParameter("year");
const apiUrl = "http://www.omdbapi.com/?apikey=2c647a3d&s=";

// Populate year filter dropdown from 2025 to 1900
const yearFilter = document.getElementById('year-filter');
if (yearFilter) {
  for (let year = 2025; year >= 1900; year--) {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    yearFilter.appendChild(option);
  }
  // Set the dropdown to the selected year if present in URL
  if (yearParam) {
    yearFilter.value = yearParam;
  }
}

// If there's a search query in the URL, perform search
if (query) {
  document.getElementById("search-input").value = query; 
  performSearch(query, yearParam);
}

// Search button click event
document.getElementById("search-button").addEventListener("click", () => {
  const query = document.getElementById("search-input").value.trim();
  if (query !== "") {
    window.location.href = `index2.html?search=${encodeURIComponent(query)}`;
  }
});

// Search input "Enter" key event
document.getElementById("search-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const query = document.getElementById("search-input").value.trim();
    if (query !== "") {
      window.location.href = `index2.html?search=${encodeURIComponent(query)}`;
    }
  }
});

// Perform search and display results, with year support
async function performSearch(query, year) {
  loadingSpinner.style.display = "flex";
  searchSection.style.display = "none";  
  try {
    let fetchUrl = `${apiUrl}${encodeURIComponent(query)}`;
    if (year) {
      fetchUrl += `&y=${encodeURIComponent(year)}`;
    }
    const response = await fetch(fetchUrl);
    const data = await response.json();
    if (data.Response === "True") {
      searchResults.innerHTML = ""; 
      data.Search.forEach((movie) => {
        const movieDiv = document.createElement("div");
        movieDiv.classList.add("movie-item");
        movieDiv.innerHTML = `
          <img src="${movie.Poster}" alt="${movie.Title}" />
          <h3>${movie.Title}</h3>
          <p>${movie.Year}</p>
        `;
        searchResults.appendChild(movieDiv);
      });
    } else {
      searchResults.innerHTML = "<p>No movies found!</p>";
    }
  } catch (error) {
    console.error("Error fetching movie data:", error);
    searchResults.innerHTML = "<p>Error fetching data. Please try again later.</p>";
  } finally {
    setTimeout(() => {
      loadingSpinner.style.display = "none"; 
      searchSection.style.display = "block"; 
    }, 1000); 
  }
}

// Filter button event listener (only year filter works with OMDb API)
document.getElementById('apply-filters-btn').addEventListener('click', function() {
  const query = document.getElementById('search-input').value.trim();
  const year = document.getElementById('year-filter').value;
  let url = `index2.html?search=${encodeURIComponent(query)}`;
  if (year) {
    url += `&year=${encodeURIComponent(year)}`;
  }
  window.location.href = url;
});

// Show .btn__menu only at the top of the page with transition
window.addEventListener('scroll', function() {
  const btnMenu = document.querySelector('.btn__menu');
  if (btnMenu) {
    if (window.scrollY === 0) {
      btnMenu.classList.remove('hide');
    } else {
      btnMenu.classList.add('hide');
    }
  }
});