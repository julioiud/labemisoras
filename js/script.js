const reproductor = document.getElementById('reproductor');

const selectEmisoras = document.getElementById('select-emisoras');

const signalIcon = document.getElementById('signal');

const btnPlay = document.getElementById('play');

const btnPause = document.getElementById('pause');

const ctrlVolume = document.getElementById('volume');

let playing;

let currentVolume;

const emisoras = [
    {
        id: 0,
        nombre: 'Selecciona una emisora',
        url: '',
        param: 'selected'
    },
    {
        id: 1,
        nombre: 'Radio tiempo',
        url: 'https://i70.letio.com/9144.aac',
        param: ''
    },
    {
        id: 2,
        nombre: 'Olimpica Bucaramanga',
        url: 'http://i50.letio.com/9122.aac',
        param: ''
    },
    {
        id: 3,
        nombre: 'Es.Radio',
        url: 'https://libertaddigital-radio-live1.flumotion.com/libertaddigital/ld-live1-low.mp3',
        param: ''
    }
]

function init(){
    currentVolume = 20;
    btnPause.disabled = true;
    btnPlay.disabled = true;
    ctrlVolume.disabled = true;
    playing = false;
    ctrlVolume.value = currentVolume;
    reproductor.volume = currentVolume/100;
    changeSignal()
    llenarSelectEmisoras()
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
    }else{
        btnPlay.disabled = false;
        btnPause.disabled = false;
        ctrlVolume.disabled = false;
    }
    reproductor.src = emisoras[evt.value].url;
    if(evt.value > 0){
        playing = true;
    }else{
        playing = false;
    }
    changeSignal()
    reproductor.volume = currentVolume/100;
}

function play(){
    playing = true;
    reproductor.play();
    reproductor.volume = currentVolume/100;
    changeSignal()
}

function pause(){
    playing = false;
    reproductor.pause()
    changeSignal()
}

function changeVolume(evt){
    currentVolume = evt.value;
    reproductor.volume = currentVolume/100;
    changeSignal()
}

function changeSignal(){
    const color = playing ? 'green' : 'red';
    signalIcon.style.color = color;
}

(function(){
    init();
})();



