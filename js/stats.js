let dataEvents;
let eventos_pasados;
let eventos_proximos;

const container = document.querySelector('.container-fluid');
const loader = container.querySelector('.loader');

const events_statistics = document.getElementById('events_statistics');
const upcoming_events = document.getElementById('upcoming_events');
const past_events = document.getElementById('past_events');


fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(response => response.json())
    .then(data => {
        dataEvents = data;
        eventos_pasados = buscarEventosPasados(dataEvents);
        eventos_proximos = buscarEventosProximos(dataEvents)
        pintarEventsTable(eventos_pasados);
        // loader.style.display = 'none';
    })
    .catch(error => console.log(error));

// loader.style.display = 'block';

function buscarEventosPasados(data) {
    const eventos_past = data.events.filter(evento => evento.date < data.currentDate);
    return eventos_past;
}

function buscarEventosProximos(data) {
    const eventos_prox = data.events.filter(evento => evento.date >= data.currentDate);
    return eventos_prox;
}

function percentage(assistance) {
    const events_percentage = assistance.map(evento => {
        const attendance_percentage = ((evento.assistance / evento.capacity) * 100).toFixed(2);
        return { ...evento, attendance_percentage };
    });
    return events_percentage
}

function eventsCategory(events) {
    return events.reduce((acc, event) => {
        if (!acc[event.category]) {
            acc[event.category] = [];
        }
        acc[event.category].push(event);
        return acc;
    }, {});
}

function statisticsByCategory(events, tabla) {
    const eventsByCategory = eventsCategory(events);
    const statisticsByCategory = Object.keys(eventsByCategory).map(category => {
        const categoryEvents = eventsByCategory[category];
        const totalCapacity = categoryEvents.reduce((acc, event) => acc + event.capacity, 0);
        const totalAssistance = categoryEvents.reduce((acc, event) => acc + (event.assistance || event.estimate), 0);
        const attendancePercentage = ((totalAssistance / totalCapacity) * 100).toFixed(2);
        const totalRevenues = categoryEvents.reduce((acc, event) => acc + (event.price * (event.assistance || event.estimate)), 0);

        return {
            category,
            attendancePercentage,
            totalRevenues
        };
    });
    statisticsByCategory.forEach((evento) => {
        tabla.innerHTML += `
        <tr>
        <td>${evento.category}</td>
            <td>${evento.totalRevenues.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
            <td>${evento.attendancePercentage}%</td>
        </tr>
        `;
    });
    return statisticsByCategory;
}

function pintarEventsTable(evento) {
    const perc = percentage(evento);
    perc.sort((a, b) => b.attendance_percentage - a.attendance_percentage);
    const assistMayor = perc.slice(0, 1);
    const assistMenor = perc.slice(-1)
    const evento_capacity = evento.reduce((event1, event2) => {
        if (event1.capacity > event2.capacity) {
            return event1;
        } else {
            return event2;
        }
    });

    events_statistics.innerHTML = `
            <tr>
                <td>${assistMayor[0].name} (${assistMayor[0].attendance_percentage}%)</td>
                <td>${assistMenor[0].name} (${assistMenor[0].attendance_percentage}%)</td>
                <td>${evento_capacity.name} (${evento_capacity.capacity})</td>
            </tr>`;
    statisticsByCategory(eventos_pasados, past_events);
    statisticsByCategory(eventos_proximos, upcoming_events);
}