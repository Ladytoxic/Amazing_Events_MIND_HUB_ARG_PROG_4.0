function todoLosEventos(data) {
  const cards = document.querySelector('.cards');

  for (let i = 0; i < data.events.length; i++) {
    const Evento = document.createElement('div');
    Evento.classList.add('card');
    Evento.innerHTML = `
        <div style="width: 18rem;">
            <img class="card-img-top" src="${data.events[i].image}" alt="Img event">
            <div class="card-body">
                <p class="date">${data.events[i].date}</p>   
                <h5 class="card-title">${data.events[i].name}</h5>         
                <p class="text-muted">${data.events[i].category}</p>
                <p>Place: ${data.events[i].place}</p>
                <p class="card-text">${data.events[i].description}<br>
                <p>Capacity: ${data.events[i].capacity}</p>
          </div>
          <div class="card-footer">
                <span>${data.events[i].price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                <a href="./details.html">Details</a>
          </div>
        </div>
      `;
    cards.appendChild(Evento);
  }
}

todoLosEventos(data);
console.log(data.events);
