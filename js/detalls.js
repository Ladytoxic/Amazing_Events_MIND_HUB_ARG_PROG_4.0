 const urlParams = new URLSearchParams(location.search);
 const id = parseInt(urlParams.get('id'));
 const eventoBusc = data.events.find(evento => evento._id === id);

 function pintarEventCard(evento) {
   const container = document.querySelector('.container');
   const card = document.createElement('div');
   card.classList.add('Card');
   card.innerHTML = `
       <div class="fade-in">
         <img class="card-img-top" src="${evento.image}" alt="Img event">
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


 pintarEventCard(eventoBusc);

