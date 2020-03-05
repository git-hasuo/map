/* 
    тест библиотеки leaflet
*/
let nameMarkers = []; // массив ссылок на объекты маркеров расположенных на карте
let markers = []; // массив маркеров объектов на карте
let stateMarkersActive = []; // активные маркеры

// Инициализирую карту
let map = L.map('mapid').setView([47.887526, 136.693355], 5);
//Добавляю слой с плитками карты
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiaGFzdW8iLCJhIjoiY2s3OXFqbHQ1MHc0dTNscGNnN2k5cWIwZCJ9.z4eqlaXwfOdxV_EYBE8qQw'
}).addTo(map);


//объявляю иконки
// ---------------------------------
let greenGsmIcon = L.icon({
    iconUrl: 'init/static/images/gsm_green.png',
    iconSize: [30, 30],
    iconAnchor: [0, 30],
    popupAnchor: [15, -15]


});

let redGsmIcon = L.icon({
    iconUrl: 'init/static/images/gsm_red.png',
    iconSize: [30, 30],
    iconAnchor: [0, 30],
    popupAnchor: [15, -15]
});


// функция сброса статусов объектов до исходного состояния
function clearStateMarkers(){
    for (let marker of markers){
        nameMarkers[marker.name].setIcon(redGsmIcon);

    }

};
//-----------------------------------

function getActiveStateFromServer(){
    $.getJSON("https://hasuo.pythonanywhere.com/init/default/incidentStatus", function(activeMarkers){
         for (let activeMarker of activeMarkers){
            nameMarkers[activeMarker].setIcon(greenGsmIcon);
         }
    });
};

// функция изменения статусов объектов при аварию
function changeStateMarksToActive(){
    clearStateMarkers();
    getActiveStateFromServer();
    
};
   


// --------------------------------------








function initMap(){
    // заполняю массив маркеров объектов для размещения на карте (markers и nameMarkers)
    $.getJSON("https://hasuo.pythonanywhere.com/init/default/allStations", function(data){

            for (let item of data){
                markers.push({'name': item['name'],
                              'coordinates': [item['lat'],	item['long']],
                              'note': item['note']
                             });

            }

            for (let marker of markers){

                nameMarkers[marker.name] = L.marker(marker['coordinates'], {icon: redGsmIcon}).addTo(map).bindPopup(marker['note']);

            }
    });
};
//------------------------------------

initMap();
changeStateMarksToActive();