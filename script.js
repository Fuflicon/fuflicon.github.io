document.getElementById('search').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const movieCards = document.querySelectorAll('.movie-card');

    movieCards.forEach(card => {
        const title = card.getAttribute('data-title').toLowerCase();
        if (title.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});


document.querySelectorAll('.favorite-btn').forEach(button => {
    button.addEventListener('click', function() {
        this.textContent = '❤️ В избранном';
        this.style.backgroundColor = '#4CAF50';
        this.disabled = true;
    });
});

document.getElementById('search').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const movieCards = document.querySelectorAll('.movie-card');

    movieCards.forEach(card => {
        const title = card.getAttribute('data-title').toLowerCase();
        card.style.display = title.includes(searchTerm) ? 'block' : 'none';
    });
});

const favoriteMovies = new Set();
const moviesList = document.getElementById('movies-list');
const favoritesList = document.getElementById('favorites-list');
const favoritesContainer = document.getElementById('favorite-movies');
const emptyFavoritesMsg = document.getElementById('empty-favorites');

document.querySelectorAll('.favorite-btn').forEach(button => {
    button.addEventListener('click', function() {
        const movieCard = this.closest('.movie-card');
        const title = movieCard.getAttribute('data-title');

        if (!favoriteMovies.has(title)) {
            favoriteMovies.add(title);
            this.textContent = '❤️ В избранном';
            this.style.backgroundColor = '#4CAF50';
            this.disabled = true;
            updateFavorites();
        }
    });
});

document.getElementById('home-btn').addEventListener('click', () => {
    moviesList.classList.remove('hidden');
    favoritesList.classList.add('hidden');
});

document.getElementById('favorites-btn').addEventListener('click', () => {
    moviesList.classList.add('hidden');
    favoritesList.classList.remove('hidden');
    updateFavorites();
});

function updateFavorites() {
    favoritesContainer.innerHTML = '';

    if (favoriteMovies.size === 0) {
        emptyFavoritesMsg.classList.remove('hidden');
    } else {
        emptyFavoritesMsg.classList.add('hidden');

        document.querySelectorAll('.movie-card').forEach(movieCard => {
            const title = movieCard.getAttribute('data-title');
            if (favoriteMovies.has(title)) {
                const clone = movieCard.cloneNode(true);
                const removeBtn = document.createElement('button');
                
                removeBtn.classList.add('remove-btn');
                removeBtn.innerHTML = '🗑️';
                removeBtn.addEventListener('click', function() {
                    favoriteMovies.delete(title);
                    updateFavorites();

                    document.querySelectorAll('.movie-card').forEach(card => {
                        if (card.getAttribute('data-title') === title) {
                            const favBtn = card.querySelector('.favorite-btn');
                            favBtn.textContent = '❤️ Добавить в избранное';
                            favBtn.style.backgroundColor = '#ff6f61';
                            favBtn.disabled = false;
                        }
                    });
                });

                clone.appendChild(removeBtn);
                clone.querySelector('.favorite-btn').remove();
                favoritesContainer.appendChild(clone);
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const contextMenu = document.createElement("div");
    contextMenu.classList.add("context-menu", "hidden");
    document.body.appendChild(contextMenu);

    document.addEventListener("click", function(event) {
        if (event.target.classList.contains("film-btn")) {
            event.stopPropagation();
            const button = event.target;
            const movieCard = button.closest(".movie-card");
            if (!movieCard) return;

            const movieTitle = movieCard.dataset.title;
            const movieSrc = movieCard.dataset.src;
            
            contextMenu.innerHTML = `
                <h3>${movieTitle}</h3>
                <iframe
                    width="600"
                    height="480"
                    src="${movieSrc}"
                    frameBorder="0"
                    allow="clipboard-write; autoplay"
                    webkitAllowFullScreen
                    mozallowfullscreen
                    allowFullScreen
                ></iframe>
                <button class="close-btn">Закрыть</button>
            `;

            contextMenu.classList.remove("hidden");
        }
    });

    document.addEventListener("click", (event) => {
        if (!event.target.closest(".movie-card") && !event.target.closest(".context-menu")) {
            contextMenu.classList.add("hidden");
        }
    });

    contextMenu.addEventListener("click", (event) => {
        if (event.target.classList.contains("close-btn")) {
            contextMenu.classList.add("hidden");
        }
    });
});
