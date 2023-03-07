function buscarEventosPasados(data) {
    const eventos_pasado = [];
    
    for (let i = 0; i < data.events.length; i++) {
        if (data.events[i].date < data.currentDate) {
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
                <p>Assistance: ${data.events[i].assistance ? data.events[i].assistance : ''}</p>
            </div>
            <div class="card-footer">
                <span>${data.events[i].price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                <a href="./details.html">Details</a>
            </div>
          </div>
        `;
            eventos_pasado.push(Evento);
        }
    }

    return eventos_pasado;
}

const eventos_pasados = buscarEventosPasados(data);
const cards = document.querySelector('.cards');
eventos_pasados.forEach(evento => cards.appendChild(evento));
console.log(eventos_pasados);