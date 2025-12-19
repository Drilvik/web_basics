let isF = false; 
let map;

const SVG = {
    sun: `<svg viewBox="0 0 24 24" fill="none" stroke="#ffb800" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/></svg>`,
    cloud: `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round"><path d="M18 10h-1.3A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>`,
    rain: `<svg viewBox="0 0 24 24" fill="none" stroke="#3db8ff" stroke-width="1.8" stroke-linecap="round"><path d="M16 13a4 4 0 0 1-8 0"/><path d="M8 19l.5 2M12 21l.5 2M16 19l.5 2M18 10h-1.3A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>`,
    bolt: `<svg viewBox="0 0 24 24" fill="none" stroke="#ffcc00" stroke-width="1.8" stroke-linecap="round"><path d="M13 2 L3 14 L12 14 L11 22 L21 10 L12 10 L13 2 Z"/></svg>`,
    rising: `<svg viewBox="0 0 24 24" fill="#ffb800"><path d="M12 2v4M5 12H2M22 12h-3M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1M18.4 18.4l-2.1-2.1M7.7 7.7L5.6 5.6M16 12a4 4 0 11-8 0 4 4 0 018 0zM2 20h20" stroke="#ffb800" stroke-width="1"/></svg>`,
    moon: `<svg viewBox="0 0 24 24" fill="#f8fafc"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`
};

const cities = {
    'Ужгород': { 
        temp: 4, uv: 0.8, wind: 6.5, s: 8.05, e: 16.63, lat: 48.62, lon: 22.28, 
        bg: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?q=80&w=1920', icon: 'cloud', cond: 'Переважно хмарно',
        f: [
            {d:'Сьогодні', i:'cloud', min:2, max:4},   
            {d:'Вівторок', i:'rain', min:2, max:5},    
            {d:'Середа', i:'cloud', min:1, max:4},   
            {d:'Четвер', i:'rain', min:1, max:3},      
            {d:'П\'ятниця', i:'cloud', min:0, max:3},  
            {d:'Субота', i:'cloud', min:-1, max:2},    
            {d:'Неділя', i:'sun', min:-2, max:2},      
            {d:'Понеділок', i:'cloud', min:0, max:4}   
        ]
    },
    'Київ': { 
        temp: 1, uv: 0.5, wind: 15.2, s: 7.95, e: 15.9, lat: 50.45, lon: 30.52, 
        bg: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=1920', icon: 'rain', cond: 'Мокрий сніг',
        f: [
            {d:'Сьогодні', i:'rain', min:-1, max:1},
            {d:'Вівторок', i:'cloud', min:-2, max:0},
            {d:'Середа', i:'rain', min:0, max:2},
            {d:'Четвер', i:'cloud', min:-3, max:-1},
            {d:'П\'ятниця', i:'cloud', min:-4, max:-1},
            {d:'Субота', i:'cloud', min:-5, max:-2},
            {d:'Неділя', i:'sun', min:-3, max:0},
            {d:'Понеділок', i:'cloud', min:-2, max:1}
        ]
    },
    'Терново': { 
        temp: 2, uv: 0.6, wind: 5.1, s: 8.02, e: 16.6, lat: 48.06, lon: 23.73, 
        bg: 'https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?q=80&w=1920', icon: 'cloud', cond: 'Туманно',
        f: [
            {d:'Сьогодні', i:'cloud', min:1, max:2},
            {d:'Вівторок', i:'cloud', min:0, max:4},
            {d:'Середа', i:'cloud', min:-1, max:2},
            {d:'Четвер', i:'rain', min:0, max:3},
            {d:'П\'ятниця', i:'cloud', min:-2, max:1},
            {d:'Субота', i:'cloud', min:-3, max:0},
            {d:'Неділя', i:'cloud', min:-1, max:2},
            {d:'Понеділок', i:'cloud', min:0, max:3}
        ]
    },
    'Плзень': { 
        temp: 3, uv: 1.0, wind: 9.4, s: 8.05, e: 16.08, lat: 49.74, lon: 13.37, 
        bg: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1920', icon: 'sun', cond: 'Ясно',
        f: [
            {d:'Сьогодні', i:'sun', min:1, max:3},
            {d:'Вівторок', i:'sun', min:0, max:5},
            {d:'Середа', i:'cloud', min:1, max:4},
            {d:'Четвер', i:'rain', min:2, max:5},
            {d:'П\'ятниця', i:'sun', min:1, max:6},
            {d:'Субота', i:'sun', min:-1, max:4},
            {d:'Неділя', i:'sun', min:0, max:5},
            {d:'Понеділок', i:'sun', min:1, max:4}
        ]
    }
};

window.onload = () => { 
    setTimeout(() => { 
        document.getElementById('loader').style.opacity = '0'; 
        setTimeout(() => document.getElementById('loader').style.display='none', 800); 
    }, 2500); 
    initMap(); 
    changeCity('Ужгород'); 
    setInterval(updateClock, 60000); 
};

function initMap() { 
    map = L.map('map', { zoomControl: false }).setView([48.62, 22.28], 11); 
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(map); 
}

function format(c) { return isF ? Math.round((c*9/5)+32)+"°F" : c+"°C"; }

function toggleUnits() { 
    isF = !isF; 
    const currentName = document.getElementById('currCity').innerText.split(',')[0];
    changeCity(currentName); 
}

function changeCity(name) {
    const d = cities[name];
    if (!d) return;

    const today = d.f[0];

    document.getElementById('currCity').innerText = name + (name === 'Плзень' ? ', CZ' : ', UA');
    document.getElementById('currTemp').innerText = format(today.max); 
    document.getElementById('windVal').innerHTML = d.wind.toFixed(1) + " <small>км/год</small>";
    document.getElementById('uvVal').innerText = d.uv.toFixed(1);
    document.getElementById('uvArc').style.strokeDashoffset = 126 - ((d.uv / 12) * 126);
    
    document.getElementById('dynamic-bg').style.backgroundImage = "url('" + d.bg + "')";
    document.getElementById('currCond').innerText = d.cond;
    document.getElementById('mainIcon').innerHTML = SVG[today.i];
    document.getElementById('side-icon').innerHTML = SVG[today.i];
    
    if (map) map.flyTo([d.lat, d.lon], 12);

    document.getElementById('f-list').innerHTML = d.f.slice(1).map(item => `
        <div class="f-item">
            <span class="day-name">${item.d}</span>
            <div class="icon-box">${SVG[item.i]}</div>
            <span class="temp-range">${format(item.min)} / ${format(item.max)}</span>
        </div>
    `).join('');
    
    updateSun(d.s, d.e);
}

function updateSun(s, e) {
    const now = new Date(); 
    const h = now.getHours() + now.getMinutes()/60;
    let p = Math.max(0, Math.min(100, ((h - s) / (e - s)) * 100));
    document.getElementById('sunTimeline').innerHTML = `<div class="s-svg">${SVG.rising}</div><div class="sun-node" style="left:${p}%"></div><div class="m-svg">${SVG.moon}</div>`;
    document.getElementById('sunCount').innerText = h > e ? "Сонце вже зайшло" : `До заходу: ${Math.floor(e-h)}г ${Math.round((e-h)%1*60)}хв`;
}

function updateClock() { 
    const cityEl = document.getElementById('currCity');
    if(cityEl) {
        const name = cityEl.innerText.split(',')[0]; 
        if(cities[name]) updateSun(cities[name].s, cities[name].e); 
    }
}

function showR() { document.getElementById('searchRecs').style.display = 'block'; }
function hideR() { document.getElementById('searchRecs').style.display = 'none'; }
function toggleSettings() { document.getElementById('settings-side').classList.toggle('open'); }
function openM(id) { document.getElementById(id).style.display = 'flex'; }
function closeM(id) { document.getElementById(id).style.display = 'none'; }

document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('cityInput');

    cityInput.addEventListener('focus', () => {
        cityInput.style.backgroundColor = 'rgba(61, 184, 255, 0.1)';
        cityInput.style.borderColor = 'var(--accent)';
    });
    cityInput.addEventListener('blur', () => {
        cityInput.style.backgroundColor = 'rgba(0,0,0,0.4)';
        cityInput.style.borderColor = 'rgba(255,255,255,0.15)';
    });

    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const cityName = cityInput.value.trim();
            if (cities[cityName]) {
                changeCity(cityName);
                cityInput.value = '';
                cityInput.blur();
            } else if (cityName !== "") {
                alert('Місто не знайдено в демо-базі');
            }
        }
    });
});