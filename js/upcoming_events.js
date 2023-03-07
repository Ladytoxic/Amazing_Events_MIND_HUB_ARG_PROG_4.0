function buscarEventosProximos(data) {
    const eventos_prox = [];

    for (let i = 0; i < data.events.length; i++) {
        if (data.events[i].date >= data.currentDate) {
            const Evento = document.createElement('div');
            Evento.classList.add('card');
            Evento.innerHTML = `
          <div style="width: 18rem;">
            <img class="card-img-top" src="${data.events[i].image}" alt="Im event">
            <div class="card-body">
              <p class="date">${data.events[i].date}</p>   
              <h5 class="card-title">${data.events[i].name}</h5>         
              <p class="text-muted">${data.events[i].category}</p>
              <p>Place: ${data.events[i].place}</p>
              <p class="card-text">${data.events[i].description}<br>
              <p>Capacity: ${data.events[i].capacity}</p>
              <p>Estimate: ${data.events[i].estimate ? data.events[i].estimate : ''}</p>
            </div>
            <div class="card-footer">
              <span>${data.events[i].price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
              <a href="./details.html">Details</a>
            </div>
          </div>
        `;
            eventos_prox.push(Evento);
        }
    }

    return eventos_prox;
}

const eventos_proximos = buscarEventosProximos(data);
const cards = document.querySelector('.cards');
eventos_proximos.forEach(evento => cards.appendChild(evento));
console.log(eventos_proximos);
