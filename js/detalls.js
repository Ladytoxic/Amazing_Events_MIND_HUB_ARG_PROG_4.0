let dataEvents
const container = document.querySelector('.container');
const loader = container.querySelector('.loader');

const urlParams = new URLSearchParams(location.search);
const id = parseInt(urlParams.get('id'));


fetch('https://mindhub-xj03.onrender.com/api/amazing')
  .then(response => response.json())
  .then(data => {
    dataEvents = data
    const eventoBusc = dataEvents.events.find(evento => evento._id === id);
    pintarEventCard(eventoBusc);
    loader.style.display = 'none';
  })
  .catch(error => console.log(error));

loader.style.display = 'block';

function pintarEventCard(evento) {
  const card = document.createElement('div');
  card.classList.add('Card');
  card.innerHTML = `
       <div class="fade-in">
         <img src="${evento.image}" alt="${evento.name} ${evento.description}">
         <div>
             <p class="date">${evento.date}</p>   
             <h5>${evento.name}</h5>         
             <span class="category">${evento.category}</span>
             <p>${evento.place}</p>
             <p>${evento.description}</p>
             <p>Capacity: ${evento.capacity}</p>
             <p>${evento.assistance !== undefined ? 'Assistance: ' + evento.assistance : ''}</p>
             <p>${evento.estimate !== undefined ? 'Estimate: ' + evento.estimate : ''}</p>
           <span class="price">${evento.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
         </div>
       </div>
     `;

  container.appendChild(card);
}


