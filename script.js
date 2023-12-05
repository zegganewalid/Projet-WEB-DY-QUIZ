// Fonction pour récupérer les films à partir de l'API
function obtenirFilmsDeAPI() {
  // URL de l'API
  const urlApi = "https://ghibliapi.vercel.app/films";

  // Utilisation de l'API Fetch pour récupérer les données
  fetch(urlApi)
    .then(response => {
      // Vérification de la réponse HTTP
      if (!response.ok) {
        throw new Error(`Erreur de réseau (statut ${response.status})`);
      }

      // Conversion de la réponse en format JSON
      return response.json();
    })
    .then(films => {
      // Appel de la fonction pour afficher les films
      afficherFilms(films);
    })
    .catch(error => {
      // Gestion des erreurs lors de la récupération des films
      console.error("Erreur lors de la récupération des films :", error.message);
    });
}

// Fonction pour afficher les films sur la page
function afficherFilms(films) {
  // Récupération de l'élément HTML de la liste des films
  const filmList = document.getElementById("filmList");

  // Parcours de la liste des films et création des éléments HTML correspondants
  films.forEach(film => {
    const li = document.createElement("li");

    // Récupération de la description du film, soit à partir des données, soit en effectuant une requête asynchrone
    const description = film.description || obtenirDescriptionDepuisUrl(film.url);

    // Construction de la structure HTML pour chaque film
    li.innerHTML = `
      <div class="film-item">
        <img src="${film.image}" alt="${film.title}">
        <div class="film-details">
          <p id="filmeTitre_Director">${film.title} <br> ${film.director}</p>
        </div>
        <div class="film-actions">
          <!-- Bouton pour afficher les détails du film -->
          <button onclick="afficherDetails('${film.title}', '${film.original_title}', '${film.director}', '${description.replace(/'/g, "\\'") || 'Description not available'}')" id="view">View</button>
          <p id="original_title">${film.original_title}</p>
        </div>
      </div>
    `;
    // Ajout de l'élément à la liste des films
    filmList.appendChild(li);
  });
}

// Fonction asynchrone pour obtenir la description d'un film depuis une URL
async function obtenirDescriptionDepuisUrl(url) {
  try {
    // Requête asynchrone pour obtenir les détails du film
    const response = await fetch(url);
    // Vérification de la réponse HTTP
    if (!response.ok) {
      throw new Error(`Erreur de réseau (statut ${response.status})`);
    }
    // Conversion de la réponse en format JSON
    const data = await response.json();
    // Renvoi de la description du film ou d'un message par défaut
    return data.description || 'Description not available';
  } catch (error) {
    // Gestion des erreurs lors de la récupération des détails du film
    console.error("Erreur lors de la récupération des détails du film :", error.message);
    return 'Description not available';
  }
}

// Fonction pour afficher les détails d'un film dans une alerte
function afficherDetails(title, originalTitle, director, description) {
  alert(`View details for ${title} (${originalTitle}) directed by ${director}\n\nDescription: ${description}`);
}

// Appel initial pour récupérer et afficher les films
obtenirFilmsDeAPI();
