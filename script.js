function getFilmsFromAPI() {
    const apiUrl = "https://ghibliapi.vercel.app/films";
  
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erreur de réseau (statut ${response.status})`);
        }
  
        return response.json();
      })
      .then(films => {
        displayFilms(films);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des films :", error.message);
      });
  }

  function displayFilms(films) {
    const filmList = document.getElementById("filmList");
  
    films.forEach(film => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div class="film-item">
            <img src="${film.image}" alt="${film.title}">
          <div class="film-details">
            <p id="filmeTitre_Director">${film.title} <br> ${film.director}</p>
          </div>
          <div class="film-actions">
            <button onclick="viewDetails('${film.title}', '${film.original_title}', '${film.director}')" id = "view">View</button>
            <p id = "original_title">${film.original_title}</p>
          </div>
        </div>
      `;
      filmList.appendChild(li);
    });
  }
  
  function viewDetails(title, originalTitle, director) {
    alert(`View details for ${title} (${originalTitle}) directed by ${director}`);
  }
  
  
  function viewDetails(title, originalTitle) {
    alert(`View details for ${title} (${originalTitle})`);
  }

  getFilmsFromAPI();  
