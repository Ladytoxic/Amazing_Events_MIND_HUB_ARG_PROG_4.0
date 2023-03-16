let dataEvents
const cards = document.querySelector('.cards');
const loader = cards.querySelector('.loader');

fetch('https://mindhub-xj03.onrender.com/api/amazing')
  .then(response => response.json())
  .then(data => {
    dataEvents = data
    pintarEventCards(dataEvents.events);
    search()
    loader.style.display = 'none';
  })
  .catch(error => console.log(error));

loader.style.display = 'block';

function pintarEventCard(evento) {
  const { image, date, name, category, place, description, price, _id } = evento;

  return `
    <div class="fade-in">
      <img src="${image}" alt="${name} ${description}">
      <div>
        <p class="date">${date}</p>   
        <h5>${name}</h5>         
        <span class="category">${category}</span>
        <p>${place}</p>
        <p>${description}</p>
        <span class="price">${price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
      </div>
      <a href="./details.html?id=${_id}">Details</a>
    </div>
  `;
}


function pintarEventCards(events) {
  events.sort((a, b) => new Date(a.date) - new Date(b.date));
  cards.innerHTML = '';
  events.forEach(evento => {
    const Evento = document.createElement('div');
    Evento.classList.add('Card');
    Evento.innerHTML = pintarEventCard(evento);
    cards.appendChild(Evento);
  });
}

function search() {
  const categoryList = dataEvents.events
    .map(event => event.category)
    .filter((category, index, categories) => {
      return categories.indexOf(category) === index;
    });
  const searchForm = document.querySelector('form.search');
  const checkboxList = `<ul class="listCheck">${categoryList.map(category => `
    <li>
    <label>
      <input type="checkbox" name="category" value="${category}" class="my-checkbox">
       ${category}
    </label>
    </li>
    `).join('')}</ul>`;
  const searchDiv = `<input type="text" placeholder="Search">`;
  searchForm.innerHTML = checkboxList + searchDiv;

  const categoryInputs = searchForm.querySelectorAll('input[name="category"]');
  categoryInputs.forEach(input => {
    input.addEventListener('click', () => {
      const searchInput = searchForm.querySelector('input[type="text"]');
      const searchValue = searchInput.value.toLowerCase();
      const categoriesInputs = searchForm.querySelectorAll('input[name="category"]:checked');
      const categories = [...categoriesInputs].map(input => input.value);
      const filteredEvents = dataEvents.events.filter(event => {
        const nameMatches = event.name.toLowerCase().includes(searchValue);
        const categoryMatches = categories.length === 0 || categories.includes(event.category);
        return nameMatches && categoryMatches;
      });
      pintarEventCards(filteredEvents);
      if (filteredEvents.length === 0) {
        const noResults = document.createElement('h5');
        noResults.classList.add('no_results')
        noResults.textContent = 'No results found.';
        const eventsContainer = document.querySelector('.cards');
        eventsContainer.innerHTML = '';
        eventsContainer.appendChild(noResults);
      }
    });
  });

  const searchInput = searchForm.querySelector('input[type="text"]');
  searchInput.addEventListener('input', () => {
    const searchValue = searchInput.value.toLowerCase();
    const categoriesInputs = searchForm.querySelectorAll('input[name="category"]:checked');
    const categories = [...categoriesInputs].map(input => input.value);
    const filteredEvents = dataEvents.events.filter(event => {
      const nameMatches = event.name.toLowerCase().includes(searchValue);
      const categoryMatches = categories.length === 0 || categories.includes(event.category);
      return nameMatches && categoryMatches;
    });
    pintarEventCards(filteredEvents);
    if (filteredEvents.length === 0) {
      const noResults = document.createElement('h5');
      noResults.classList.add('no_results')
      noResults.textContent = 'No results found.';
      const eventsContainer = document.querySelector('.cards');
      eventsContainer.innerHTML = '';
      eventsContainer.appendChild(noResults);
    }
  });

  searchForm.addEventListener('submit', event => {
    event.preventDefault();
  });

}



