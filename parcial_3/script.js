class TrieNode {
  constructor() {
    this.children = new Map();
    this.isEndOfSong = false;
    this.songTitle = null;
  }
}

class SongTrie {
  constructor() {
    this.root = new TrieNode();
  }

  normalize(text) {
    return text.trim().toLowerCase();
  }

  insert(title) {
    const normalizedTitle = this.normalize(title);
    if (!normalizedTitle) return false;

    let current = this.root;
    for (const character of normalizedTitle) {
      if (!current.children.has(character)) {
        current.children.set(character, new TrieNode());
      }
      current = current.children.get(character);
    }

    current.isEndOfSong = true;
    current.songTitle = title.trim();
    return true;
  }

  search(title) {
    const node = this.findNode(this.normalize(title));
    return Boolean(node && node.isEndOfSong);
  }

  suggestions(prefix) {
    const normalizedPrefix = this.normalize(prefix);
    const startNode = this.findNode(normalizedPrefix);
    if (!startNode) return [];

    const results = [];
    this.collectSongs(startNode, results);
    return results.sort((a, b) => a.localeCompare(b));
  }

  findNode(text) {
    let current = this.root;
    for (const character of text) {
      if (!current.children.has(character)) return null;
      current = current.children.get(character);
    }
    return current;
  }

  collectSongs(node, results) {
    if (node.isEndOfSong) results.push(node.songTitle);

    for (const child of node.children.values()) {
      this.collectSongs(child, results);
    }
  }
}

class MaxHeap {
  constructor() {
    this.heap = [];
  }

  insert(song) {
    this.heap.push(song);
    this.bubbleUp(this.heap.length - 1);
  }

  extractMax() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const max = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.sinkDown(0);
    return max;
  }

  getTop(limit) {
    const copy = new MaxHeap();
    this.heap.forEach((song) => copy.insert(song));

    const topSongs = [];
    while (topSongs.length < limit && copy.heap.length > 0) {
      topSongs.push(copy.extractMax());
    }
    return topSongs;
  }

  bubbleUp(index) {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex].plays >= this.heap[index].plays) break;

      this.swap(parentIndex, index);
      index = parentIndex;
    }
  }

  sinkDown(index) {
    while (true) {
      const leftChild = index * 2 + 1;
      const rightChild = index * 2 + 2;
      let largest = index;

      if (
        leftChild < this.heap.length &&
        this.heap[leftChild].plays > this.heap[largest].plays
      ) {
        largest = leftChild;
      }

      if (
        rightChild < this.heap.length &&
        this.heap[rightChild].plays > this.heap[largest].plays
      ) {
        largest = rightChild;
      }

      if (largest === index) break;
      this.swap(index, largest);
      index = largest;
    }
  }

  swap(firstIndex, secondIndex) {
    [this.heap[firstIndex], this.heap[secondIndex]] = [
      this.heap[secondIndex],
      this.heap[firstIndex],
    ];
  }
}

class SongGraph {
  constructor() {
    this.adjacencyList = new Map();
  }

  addSong(song) {
    if (!this.adjacencyList.has(song)) {
      this.adjacencyList.set(song, new Set());
    }
  }

  connect(songA, songB) {
    this.addSong(songA);
    this.addSong(songB);
    this.adjacencyList.get(songA).add(songB);
    this.adjacencyList.get(songB).add(songA);
  }

  getRecommendations(song) {
    return [...(this.adjacencyList.get(song) ?? [])].sort((a, b) =>
      a.localeCompare(b),
    );
  }

  getConnections() {
    const connections = [];
    const visited = new Set();

    for (const [song, relatedSongs] of this.adjacencyList.entries()) {
      for (const relatedSong of relatedSongs) {
        const key = [song, relatedSong].sort().join("|");
        if (!visited.has(key)) {
          connections.push([song, relatedSong]);
          visited.add(key);
        }
      }
    }

    return connections;
  }
}

const songs = [
  { title: "Gasolina - Daddy Yankee", plays: 4860000, genre: "Regueton" },
  { title: "Dile - Don Omar", plays: 4410000, genre: "Regueton" },
  { title: "Titi Me Pregunto - Bad Bunny", plays: 4290000, genre: "Regueton" },
  { title: "Safaera - Bad Bunny", plays: 4140000, genre: "Regueton" },
  { title: "Despacito - Luis Fonsi y Daddy Yankee", plays: 3980000, genre: "Regueton" },
  { title: "Bichota - Karol G", plays: 3760000, genre: "Regueton" },
  { title: "Provenza - Karol G", plays: 3610000, genre: "Regueton" },
  { title: "Mi Gente - J Balvin", plays: 3480000, genre: "Regueton" },
  { title: "Blinding Lights - The Weeknd", plays: 4720000, genre: "Ingles" },
  { title: "Billie Jean - Michael Jackson", plays: 4380000, genre: "Ingles" },
  { title: "Bohemian Rhapsody - Queen", plays: 4210000, genre: "Ingles" },
  { title: "Shape of You - Ed Sheeran", plays: 4070000, genre: "Ingles" },
  { title: "Rolling in the Deep - Adele", plays: 3890000, genre: "Ingles" },
  { title: "Bad Guy - Billie Eilish", plays: 3520000, genre: "Ingles" },
  { title: "Smells Like Teen Spirit - Nirvana", plays: 3360000, genre: "Ingles" },
  { title: "Viva La Vida - Coldplay", plays: 3220000, genre: "Ingles" },
  { title: "Pedro Navaja - Willie Colon", plays: 4520000, genre: "Salsa" },
  { title: "El Gran Varon - Willie Colon", plays: 4280000, genre: "Salsa" },
  { title: "Anacaona - Cheo Feliciano", plays: 3910000, genre: "Salsa" },
  { title: "Amada Mia - Cheo Feliciano", plays: 3560000, genre: "Salsa" },
  { title: "Fuego en el 23 - La Sonora Poncena", plays: 3420000, genre: "Salsa" },
  { title: "Yambeque - La Sonora Poncena", plays: 3190000, genre: "Salsa" },
  { title: "Periodico de Ayer - Hector Lavoe", plays: 2980000, genre: "Salsa" },
  { title: "La Murga - Willie Colon", plays: 2810000, genre: "Salsa" },
];

const trie = new SongTrie();
const heap = new MaxHeap();
const graph = new SongGraph();

songs.forEach((song) => {
  trie.insert(song.title);
  heap.insert(song);
  graph.addSong(song.title);
});

graph.connect("Gasolina - Daddy Yankee", "Dile - Don Omar");
graph.connect("Gasolina - Daddy Yankee", "Despacito - Luis Fonsi y Daddy Yankee");
graph.connect("Dile - Don Omar", "Mi Gente - J Balvin");
graph.connect("Titi Me Pregunto - Bad Bunny", "Safaera - Bad Bunny");
graph.connect("Titi Me Pregunto - Bad Bunny", "Bichota - Karol G");
graph.connect("Bichota - Karol G", "Provenza - Karol G");
graph.connect("Provenza - Karol G", "Mi Gente - J Balvin");
graph.connect("Blinding Lights - The Weeknd", "Bad Guy - Billie Eilish");
graph.connect("Blinding Lights - The Weeknd", "Shape of You - Ed Sheeran");
graph.connect("Billie Jean - Michael Jackson", "Bohemian Rhapsody - Queen");
graph.connect("Billie Jean - Michael Jackson", "Bad Guy - Billie Eilish");
graph.connect("Bohemian Rhapsody - Queen", "Smells Like Teen Spirit - Nirvana");
graph.connect("Rolling in the Deep - Adele", "Viva La Vida - Coldplay");
graph.connect("Shape of You - Ed Sheeran", "Viva La Vida - Coldplay");
graph.connect("Pedro Navaja - Willie Colon", "El Gran Varon - Willie Colon");
graph.connect("Pedro Navaja - Willie Colon", "Periodico de Ayer - Hector Lavoe");
graph.connect("Pedro Navaja - Willie Colon", "La Murga - Willie Colon");
graph.connect("Anacaona - Cheo Feliciano", "Amada Mia - Cheo Feliciano");
graph.connect("Anacaona - Cheo Feliciano", "Fuego en el 23 - La Sonora Poncena");
graph.connect("Fuego en el 23 - La Sonora Poncena", "Yambeque - La Sonora Poncena");
graph.connect("Periodico de Ayer - Hector Lavoe", "La Murga - Willie Colon");
graph.connect("El Gran Varon - Willie Colon", "Amada Mia - Cheo Feliciano");

const songForm = document.querySelector("#song-form");
const songTitleInput = document.querySelector("#song-title");
const songGenreInput = document.querySelector("#song-genre");
const searchInput = document.querySelector("#search-input");
const existsResult = document.querySelector("#exists-result");
const suggestionsList = document.querySelector("#suggestions-list");
const rankingList = document.querySelector("#ranking-list");
const recommendationSelect = document.querySelector("#recommendation-select");
const recommendationCards = document.querySelector("#recommendation-cards");
const graphView = document.querySelector("#graph-view");
const genreButtons = document.querySelectorAll(".genre-button");
const genreSongs = document.querySelector("#genre-songs");

function getSong(title) {
  return songs.find((song) => song.title === title);
}

function createRealisticPlays(genre) {
  const ranges = {
    Regueton: [2600000, 5200000],
    Ingles: [2400000, 5000000],
    Salsa: [1500000, 4600000],
  };
  const [min, max] = ranges[genre] ?? [1200000, 4200000];
  const plays = Math.floor(Math.random() * (max - min + 1)) + min;

  return Math.round(plays / 10000) * 10000;
}

function getRandomRelatedSongs(genre, insertedTitle, limit = 3) {
  const candidates = songs.filter(
    (song) => song.genre === genre && song.title !== insertedTitle,
  );

  return candidates
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.min(limit, candidates.length));
}

function renderSuggestions() {
  const value = searchInput.value;
  const exists = trie.search(value);
  const suggestions = value.trim() ? trie.suggestions(value) : [];

  existsResult.textContent = value.trim()
    ? exists
      ? `"${value}" existe en la plataforma.`
      : `"${value}" no existe como titulo exacto.`
    : "Escribe una cancion para validar si existe.";

  suggestionsList.innerHTML = suggestions.length
    ? suggestions.map((song) => `<li>${song}</li>`).join("")
    : "<li>No hay sugerencias para ese prefijo.</li>";
}

function renderRanking() {
  rankingList.innerHTML = heap
    .getTop(8)
    .map(
      (song, index) => `
        <li>
          <span class="ranking__place">#${index + 1}</span>
          <div>
            <strong>${song.title}</strong>
            <em>${song.genre}</em>
            <span>${song.plays.toLocaleString("es-CO")} reproducciones</span>
          </div>
        </li>
      `,
    )
    .join("");
}

function renderRecommendationOptions() {
  recommendationSelect.innerHTML = songs
    .map((song) => `<option value="${song.title}">${song.title}</option>`)
    .join("");
}

function renderRecommendations() {
  const selectedSong = recommendationSelect.value;
  const recommendations = graph.getRecommendations(selectedSong);
  const recommendedSongs = recommendations
    .map((title) => getSong(title))
    .filter(Boolean);
  const selected = getSong(selectedSong);

  recommendationCards.innerHTML = [selected, ...recommendedSongs]
    .filter(Boolean)
    .map(
      (song, index) => `
        <article class="song-card ${index === 0 ? "song-card--active" : ""}">
          <span class="song-card__cover">${song.genre.slice(0, 1)}</span>
          <div>
            <strong>${song.title}</strong>
            <small>${index === 0 ? "Cancion base" : "Recomendada"} - ${song.genre}</small>
            <span>${song.plays.toLocaleString("es-CO")} reproducciones</span>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderGraph() {
  graphView.innerHTML = songs
    .map((song) => {
      const relatedSongs = graph.getRecommendations(song.title);
      return `
        <div class="graph__node">
          <strong>${song.title}</strong>
          <div>
            ${relatedSongs.map((relatedSong) => `<span>${relatedSong}</span>`).join("")}
          </div>
        </div>
      `;
    })
    .join("");
}

function renderGenreSongs(genre) {
  const genreLabel = genre === "Ingles" ? "Musica en ingles" : genre;
  const filteredSongs = songs.filter((song) => song.genre === genre);

  genreSongs.innerHTML = `
    <h3>${genreLabel}</h3>
    <ul>
      ${filteredSongs
        .map(
          (song) => `
            <li>
              <strong>${song.title}</strong>
              <span>${song.plays.toLocaleString("es-CO")} reproducciones</span>
            </li>
          `,
        )
        .join("")}
    </ul>
  `;
}

songForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = songTitleInput.value.trim();
  const genre = songGenreInput.value;
  if (!title) return;

  if (getSong(title)) {
    searchInput.value = title;
    renderSuggestions();
    return;
  }

  const newSong = {
    title,
    genre,
    plays: createRealisticPlays(genre),
  };

  songs.push(newSong);
  trie.insert(title);
  heap.insert(newSong);
  graph.addSong(title);
  getRandomRelatedSongs(genre, title).forEach((song) => {
    graph.connect(title, song.title);
  });

  songTitleInput.value = "";
  searchInput.value = title;
  renderSuggestions();
  renderRanking();
  renderRecommendationOptions();
  recommendationSelect.value = title;
  renderRecommendations();
  renderGraph();
});

searchInput.addEventListener("input", renderSuggestions);
recommendationSelect.addEventListener("change", renderRecommendations);
genreButtons.forEach((button) => {
  button.addEventListener("click", () => {
    genreButtons.forEach((genreButton) => {
      genreButton.classList.remove("is-active");
    });
    button.classList.add("is-active");
    renderGenreSongs(button.dataset.genre);
  });
});

renderSuggestions();
renderRanking();
renderRecommendationOptions();
renderRecommendations();
renderGraph();
renderGenreSongs("Regueton");
