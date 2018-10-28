
function statuschanged(ele,s) {
    console.log(ele,s);
    droneNo=ele;
    firebase.database().ref("drones/"+ele+"/status").set(s);
    firebase.database().ref("drones/"+ele+"/dronestatus").set(s);
    if(s===true){
        $('#exampleModalCenter').modal();
    }
}



function setDestinationLocation(){
    console.log({"lat":destLat, "lng":destLng}, droneNo);
    firebase.database().ref("drones/"+droneNo+"/destination").set({"lat":destLat, "lng":destLng});
    $('#exampleModalCenter').modal('hide')

}
function showMoreInfo(det){
    $('#moreInfo').modal();
    var x =data[det];
    var t = `<div><span><b>Battery status : </b>${x.battery}%<br></span><span><b>Destination Latitude:</b> ${x.destination.lat}<br> <b>Destination Longitude:</b>${x.destination.lng}<br></span><span><b>Current Location Latitude:</b> ${x.currentloc.lat}<br> <b>Current Location Longitude:</b>${x.currentloc.lng}<br></span></div><a href="https://drone-footage.netlify.com/" target="_blank">View Drone Footage</a></a><div id="droneMap"></div>`;
    $('#moreInfobody').html(t);
    var droneMap = new google.maps.Map(document.getElementById('droneMap'), {
        center: {lat: (x.destination.lat+x.currentloc.lat)/2, lng: (x.destination.lng+x.currentloc.lng)/2},
        zoom: 9,
        mapTypeId: 'roadmap'
    });
    var droneMarker = new google.maps.Marker({
        position: {lat: x.destination.lat, lng: x.destination.lng},
        map: droneMap,
        title: x.name
    });
    droneMarker = new google.maps.Marker({
        position: {lat: x.currentloc.lat, lng: x.currentloc.lng},
        map: droneMap,
        title: x.name
    });
}

$(document).ready(function() {

    var ref = db.ref('drones');
    ref.on('value', function(snapshot) {
        $('#content').html('');
        data = snapshot.val();
        data.forEach( (ele,i) => {
            console.log(ele,i);
            var eleId =`customCheck${i}`;
            $("#content").append(`<div class='col-sm-12 col-md-4 col-lg-3'><div class='card' data-id=${i}><div class='card-body'><h4 class='card-title center'>${ele.name}</h4><h6 class='card-subtitle mb-2'><div class='custom-control custom-checkbox'><input type='checkbox' onchange="statuschanged($(this).attr('data-input-id'),$(this).prop('checked')===true)" data-input-id=${i} class='custom-control-input' id=${eleId}><label class='custom-control-label' for=${eleId}>Arm ${ele.name}</label></div></h6><p class='card-text' data-info-id=${i}></p><a href='#' class='card-link center' onclick="showMoreInfo($(this).attr('data-input-id'))" data-input-id=${i}>More Information</a></div></div></div>`);
            if(ele.status === true){
                $(`#${eleId}`).prop('checked', true);
                var con = `<div class='row'><span><img src='./images/battery.svg' class='image'>${ele.battery}%</span></div><div class='row'><span><img src='./images/location-arrow.svg' class='image'> Lat: ${ele.destination.lat} Lng: ${ele.destination.lng}</span></div>`;
                $(`[data-info-id=${i}]`).html(con);
            }
        });

    }, function(error){
        console.log(error)
    });

    // db.collection('drones').get().then( (snapshot) =>{
    //     var t = '';
    //     snapshot.docs.forEach( (doc,i) => {
    //         console.log(doc.data(),i,doc.data().name);
    //         var det = doc.data();
    //         t += `<div class='col-sm-12 col-md-4 col-lg-3'><div class='card'><div class='card-body'><h5 class='card-title'>${det.name}</h5><h6 class='card-subtitle mb-2 text-muted'><img src="./images/battery-three-quarters.svg"></h6><p class='card-text'>Some quick example text to build on the card title and make up the bulk of the card's content.</p><a href='#' class='card-link'>Another link</a><a href='#' class='card-link'>Another link</a></div></div></div>`;
    //     });
    //     document.getElementById("content").innerHTML = t;
    // });
});

(function() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./service-worker.js')
            .then(function (registration) {
                console.log('Registration successful, scope is:', registration.scope);
            })
            .catch(function (error) {
                console.log('Service worker registration failed, error:', error);
            });
    }
})();