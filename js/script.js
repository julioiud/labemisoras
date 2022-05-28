const emisoras = [
    {
        id: 0,
        nombre: 'Selecciona una emisora',
        url: '',
        param: 'selected'
    },
    {
        id: 1,
        nombre: 'Radio Tiempo',
        url: 'https://i70.letio.com/9144.aac',
        param: ''
    },
    {
        id: 2,
        nombre: 'Olimpica Stereo',
        url: 'https://i70.letio.com/9122.aac',
        param: ''
    },
    {
        id: 3,
        nombre: 'La X',
        url: 'http://stream.eleden.com:8230/lax.aac',
        param: ''
    }
];

const reproducir = document.getElementById('reproductor');
const signalIcon = document.getElementById('signal');
const selectEmisoras = document.getElementById('select-emisoras');
const btnPlay = document.getElementById('play');
const btnPause = document.getElementById('pause');
const ctrlVolume = document.getElementById('volume');

let playing;
let currentVolume;

function init(){
    currentVolume = 20;
    btnPlay.disabled = true;
    btnPause.disabled = true;
    ctrlVolume.disabled = true;
    playing = false;
    ctrlVolume.value = currentVolume;
    reproducir.volume = currentVolume/100;
    llenarSelectEmisoras();
    changeSignal();
}

function llenarSelectEmisoras(){
    let info = '';
    for(const element of emisoras){
        info += `<option ${element.param} value="${element.id}">${element.nombre}</option>`;
    }
    selectEmisoras.innerHTML = info;
}

function changeSelectEmisoras(evt){
    if(evt.value == 0){
        btnPlay.disabled = true;
        btnPause.disabled = true;
        ctrlVolume.disabled = true;
        playing = false;
    }else{
        btnPlay.disabled = false;
        btnPause.disabled = false;
        ctrlVolume.disabled = false;
        playing = true;
    }
    reproducir.src = emisoras[evt.value].url;
    changeSignal();
    reproducir.volume = currentVolume/100;
}

function play(){
    playing = true;
    reproducir.play();
    reproducir.volume = currentVolume/100;
    changeSignal();
}

function pause(){
    playing = false;
    reproducir.pause();
    changeSignal();
}

function changeVolume(evt){
    currentVolume = evt.value;
    reproducir.volume = currentVolume/100;
    changeSignal();
}

function changeSignal(){
    const color = playing ? 'green' : 'red';
    signalIcon.style.color = color;
}

(function(){
    init();
})();

