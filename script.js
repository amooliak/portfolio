
const projects = [
  
  {
    title: 'God Is A Woman',
    author: 'Amoolia K',
    category: 'Philosophy', 
    category: 'Essays', 
    year: 2024,
    cover: 'assets/spine.png',
    spine: '#c55549',
    edge: '#eadcbf',
    height: 295,
    width: 52,
    lean: 0.6,
    depth: -1,
    note: 'A reported feature about the objects and stories people choose to carry forward.',
    link: 'projects/what-we-keep.html'
  },
  {
    title: 'An Inheritance Of Words',
    author: 'Amoolia K',
    category: 'Essays',
    year: 2024,
    cover: 'assets/notes-on-looking.svg',
    spine: '#ad344f',
    edge: '#f4dfd0',
    height: 230,
    width: 36,
    lean: -0.8,
    depth: 2,
    note: 'A recurring column about images, attention, and the pleasure of close looking.',
    link: 'projects/notes-on-looking.html'
  },
  {
    title: 'Scent As a Portal',
    author: 'Amoolia K',
    category: 'Essays',
    year: 2023,
    cover: 'assets/after-the-rain.svg',
    spine: '#435568',
    edge: '#e8dfc7',
    height: 278,
    width: 47,
    lean: 1.1,
    depth: 0,
    note: 'A photo essay made in the quiet stretch after a storm.',
    link: 'projects/after-the-rain.html'
  },
  {
    title: 'Panchali',
    author: 'Amoolia K',
    category: 'Productions',
    year: 2025,
    cover: 'assets/spine.png',
    spine: '#72172a',
    edge: '#f1ddbd',
    height: 265,
    width: 43,
    lean: -1.2,
    depth: 1,
    note: 'A personal essay on interiors, memory, and the rooms that hold us.',
    link: 'projects/panchali.html'
  },
  {
    title: 'Living In Poems',
    author: 'Amoolia K',
    category: 'Poetry',
    year: 2025,
    cover: 'assets/shape-of-a-room.svg',
    spine: '#5a2637',
    edge: '#e4d4af',
    height: 245,
    width: 40,
    lean: -0.5,
    depth: 1,
    note: 'A short story about waiting, weather, and a missed train.',
    link: 'projects/shape-of-a-room.html'
  },
  {
    title: 'Metamorphosis',
    author: 'Amoolia K',
    category: 'Journal',
    year: 2025,
    cover: 'assets/shape-of-a-room.svg',
    spine: '#5a2637',
    edge: '#e4d4af',
    height: 245,
    width: 40,
    lean: -0.5,
    depth: 1,
    note: 'A short story about waiting, weather, and a missed train.',
    link: 'projects/metamorphosis.html'
  },
  {
    title: 'A Blue Poem',
    author: 'Amoolia K',
    category: 'Poetry',
    year: 2023,
    cover: 'assets/notes-on-looking.svg',
    spine: '#74233b',
    edge: '#e6d4ca',
    height: 285,
    width: 55,
    lean: -1.3,
    depth: 2,
    note: 'Notes toward a slower, more ordinary way of paying attention.',
    link: 'projects/blue-poem.html'
  },
  {
    title: 'Belmont',
    author: 'Amoolia K',
    category: 'Fiction',
    year: 2025,
    cover: 'assets/shape-of-a-room.svg',
    spine: '#5a2637',
    edge: '#e4d4af',
    height: 245,
    width: 40,
    lean: -0.5,
    depth: 1,
    note: 'A short story about waiting, weather, and a missed train.',
    link: 'projects/belmont.html'
  },
  {
    title: 'Stream Of Consciousness',
    author: 'Amoolia K',
    category: 'Philosophy',
    year: 2024,
    cover: 'assets/after-the-rain.svg',
    spine: '#253c54',
    edge: '#d9d3c2',
    height: 250,
    width: 44,
    lean: 0.4,
    depth: 0,
    note: 'A sequence of small poems for the end of the day.',
    link: 'projects/stream-of-consciousness.html'
  }
];

const grid = document.querySelector('#book-grid');
const search = document.querySelector('#book-search');
const filters = document.querySelector('#filters');
const empty = document.querySelector('#empty-state');

if (grid && search && filters && empty) {

  const categories = [
    'All',
    ...new Set(projects.map(project => project.category))
  ];

  let activeCategory = 'All';

  // FILTER BUTTONS

  function renderFilters() {
    filters.innerHTML = categories.map(category =>
      `<button
        class="filter"
        type="button"
        data-category="${category}"
        aria-pressed="${category === activeCategory}"
      >${category}</button>`
    ).join('');
  }

  // BOOK ANIMATION

  function revealBooks() {
    const books = grid.querySelectorAll('.book');

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) {
      books.forEach(book => book.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12
    });

    books.forEach(book => observer.observe(book));
  }

  // RENDER BOOKS

  function renderProjects() {

    const term = search.value.trim().toLowerCase();

    const visible = projects.filter(project =>
      (activeCategory === 'All' ||
        project.category === activeCategory) &&
      `${project.title} ${project.author} ${project.category}`
        .toLowerCase()
        .includes(term)
    );

    grid.innerHTML = visible.map(project => `
      <a
        class="book"
        href="${project.link}"
        role="listitem"
        aria-label="Read ${project.title}, ${project.author}"
        title="${project.title}"
        style="
          --book-h: ${project.height}px;
          --book-w: ${project.width}px;
          --lean: ${project.lean}deg;
          --depth: ${project.depth}px;
          --spine: ${project.spine};
        "
      >

        <span class="book-spine">
          <span class="spine-title">${project.title}</span>
          <span class="spine-author">${project.author}</span>
        </span>

        <span class="book-info">
          <strong>${project.title}</strong>
          <small>${project.author} · ${project.year}</small>
        </span>

      </a>
    `).join('');

    empty.hidden = visible.length !== 0;

    revealBooks();
  }

  // CATEGORY FILTERING

  filters.addEventListener('click', event => {

    const button = event.target.closest('[data-category]');

    if (!button) return;

    activeCategory = button.dataset.category;

    renderFilters();
    renderProjects();

  });

  // SEARCH

  search.addEventListener('input', renderProjects);

  // INITIALISE

  renderFilters();
  renderProjects();

}
