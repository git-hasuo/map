/* 
    тест библиотеки leaflet
*/



// Инициализирую карту
let map = L.map('mapid').setView([44.3364, 131.6594], 7);
//Добавляю слой с плитками карты
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiaGFzdW8iLCJhIjoiY2s3OXFqbHQ1MHc0dTNscGNnN2k5cWIwZCJ9.z4eqlaXwfOdxV_EYBE8qQw'
}).addTo(map);
/* 
//Загружаю файл с координатами объектов
$.getJSON("/data.json", function(data){
    L.geoJSON(data).addTo(map);
});
*/


//объявляю иконки
// ---------------------------------
let greenGsmIcon = L.icon({
    iconUrl: '/img/gsm_green.png',
    iconSize: [30, 30],
    iconAnchor: [0, 30],
    popupAnchor: [15, -15]


});

let redGsmIcon = L.icon({
    iconUrl: '/img/gsm_red.png',
    iconSize: [30, 30],
    iconAnchor: [0, 30],
    popupAnchor: [15, -15]
});
// --------------------------------

// все маркеры
// -----------------------------------------------
let markers = [{
    "name": "17230210",
    "coordinates": [45.89694, 134.940817],
    "note": "Школа Вострецово"
},
{   
    "name": "17230211",
    "coordinates": [44.337666, 131.655309],
    "note":	"Школа Сергеевка: Класс"

},
{
    "name": "17230212",
    "coordinates": [44.450595, 131.759038],
    "note":	"Школа Нестеровка"


},
{
    "name": "17230213",
    "coordinates": [44.486946,	131.575943],
    "note": "Школа Богуславка"

},
{
    "name": "17230214",
    "coordinates": [53.141589, 140.71728],
    "note": "КГБУЗ Судмедэкспертиза"

},
{
    "name": "17230216",
    "coordinates": [45.519561, 133.575925],
    "note": "Школа Ружино"

},
{
    "name": "17230217",
    "coordinates": [45.638485, 133.594583],
    "note": "Школа Пантелеймоновка"

},
{
    "name": "17230215",
    "coordinates": [44.337336799794116, 131.65478580019337],
    "note": "Школа Сергеевка: Директор" 
}
]; 
// --------------------------------------------------------



// список для красных маркеров
let stateMarkersRed = [
    
    "17230217"
    
];




let nameMarkers = [];
//инициализируем маркеры на карте
function initMarkers(){
    
        for (let marker of markers){

            nameMarkers[marker.name] = L.marker(marker['coordinates'], {icon: greenGsmIcon}).addTo(map).bindPopup(marker['note']);
        }
        

};

function clearStateMarkers(){
    for (let marker of markers){
        nameMarkers[marker.name].setIcon(greenGsmIcon);

    }

};

function changeStateMarksToRed(){
    for (let redMarker of stateMarkersRed){
        nameMarkers[redMarker].setIcon(redGsmIcon);
    }

};

initMarkers();

setInterval(function(){
    clearStateMarkers();
    changeStateMarksToRed();
}, 1000);