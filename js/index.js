function pintarEventCard(evento) {
  const { image, date, name, category, place, description, price, _id } = evento;

  return `
    <div class="fade-in">
      <img class="card-img-top" src="${image}" alt="Img event">
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
  const cards = document.querySelector('.cards');
  cards.innerHTML = '';
  events.forEach(evento => {
    const Evento = document.createElement('div');
    Evento.classList.add('Card');
    Evento.innerHTML = pintarEventCard(evento);
    cards.appendChild(Evento);
  });
}

pintarEventCards(data.events);


function search() {
  const categoryList = data.events
    .map(event => event.category)
    .filter((category, index, categories) => {
      return categories.indexOf(category) === index;
    });
  const searchForm = document.querySelector('form.search');
  const checkboxList = categoryList.map(category => `
      <li>
        <input type="checkbox" name="category" value="${category}">
        <label>${category}</label>
      </li>
    `).join('');
  const searchDiv = `<input type="text" placeholder="Search">`;
  searchForm.innerHTML = checkboxList + searchDiv;

  const categoryInputs = searchForm.querySelectorAll('input[name="category"]');
  categoryInputs.forEach(input => {
    input.addEventListener('click', () => {
      const searchInput = searchForm.querySelector('input[type="text"]');
      const searchValue = searchInput.value.toLowerCase();
      const categoriesInputs = searchForm.querySelectorAll('input[name="category"]:checked');
      const categories = [...categoriesInputs].map(input => input.value);
      const filteredEvents = data.events.filter(event => {
        const nameMatches = event.name.toLowerCase().includes(searchValue);
        const categoryMatches = categories.length === 0 || categories.includes(event.category);
        return nameMatches && categoryMatches;
      });
      pintarEventCards(filteredEvents);
    });
  });

  const searchInput = searchForm.querySelector('input[type="text"]');
  searchInput.addEventListener('input', () => {
    const searchValue = searchInput.value.toLowerCase();
    const categoriesInputs = searchForm.querySelectorAll('input[name="category"]:checked');
    const categories = [...categoriesInputs].map(input => input.value);
    const filteredEvents = data.events.filter(event => {
      const nameMatches = event.name.toLowerCase().includes(searchValue);
      const categoryMatches = categories.length === 0 || categories.includes(event.category);
      return nameMatches && categoryMatches;
    });
    pintarEventCards(filteredEvents);
  });

  searchForm.addEventListener('submit', event => {
    event.preventDefault();
  });

}

search();


