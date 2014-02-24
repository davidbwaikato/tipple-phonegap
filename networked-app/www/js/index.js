/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();	
					
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, app.onFileSystemSuccess, app.fail);

    },

    fail: function(error) {
	console.error("Phonegap app failure: code=" + error.code + " message=" + error.message);
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);

    },

    resizeMap: function() {
	$("#map-canvas").height(Math.max(100,$(window).height()-90));// TODO set 
    },


    onFileSystemSuccess: function(fileSystem) {
        console.log("Filesystem name = " + fileSystem.name);
        console.log("Filesystem root name = " + fileSystem.root.fullPath);
	app.initializeMap(fileSystem.root.fullPath);
    },

    initializeMap: function(rootFullPath) {
	app.resizeMap();
	
	var start_lat  = -37.7886;
	var start_long =  175.317;

	// Create and store Leaflet map
	//this._map = L.map('map-canvas').setView([-37.760, 175.300], 15);				
	this._map = L.map('map-canvas').setView([start_lat,start_long], 16);
	var map = this._map;

	// On line map
	
	L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	    maxZoom: 18
	}).addTo(map);
	
	

	//L.tileLayer(rootFullPath + 'tipple-store/geodata/MapQuest/{z}/{x}/{y}.png', {
	/*	
	L.tileLayer('img/MapQuest/{z}/{x}/{y}.png', {
	    maxZoom: 18
	}).addTo(map);
*/


	var uni_message= "The University of Waikato (... in Maaori: Te far-eh Waananga o Waikato), is a comprehensive university in Hamilton, New Zealand, with a satellite campus located in Tauranga. Established in 1964, it was the first university in New Zealand to be designed from a blank canvas.\n\n Waikato is made up of seven faculties and schools, and had more than 12,500 students enrolled at the end of 2012.";

	var marker_popup = L.popup()
	    .setContent("<b>The University of Waikato</b><br />Established 1964.");

	//    .setContent("<b>Hello world!</b><br />I am a popup.");

			
	// Marker location within Uni
	var marker = L.marker([start_lat, start_long])
	    .addTo(map)
	    .bindPopup(marker_popup);

	function onMarkerClick(e) {
	    app.speakToMe(uni_message);
	}
	marker.on('click', onMarkerClick);

	function onMarkerPopupClose(e) {
	    speechSynthesis.cancel();
	}
	marker_popup.on('popupclosed',onMarkerPopupClose);
	//map.on('popupclose',onMarkerPopupClose);

	// Dynamic popup on map where you click/touch

	var popup = L.popup();
	
	function onMapClick(e) {
	    popup.setLatLng(e.latlng)
		.setContent("You clicked the map at " + e.latlng.toString())
		.openOn(map);
	    
	    //app.speakToMe("You clicked the map at " + e.latlng.toString());
	}
	
	map.on('click', onMapClick);

	app.displayCurrentPosition();

    },

    displayCurrentPosition: function() {

	var map = this._map;
	
	var geoSuccess = function(pos) {

	    console.log("Retrieved geolocation position: (" 
			+ pos.coords.latitude
			+ "," + pos.coords.longitude
			+ ") accuracy="+ pos.coords.accuracy);

	    var circle = L.circle([pos.coords.latitude, pos.coords.longitude], pos.coords.accuracy, 
				  {
				      color: 'red',
				      fillColor: '#f03',
				      fillOpacity: 0.5
				  });
	    circle.addTo(map);
	};

	var geoFail = function(error) {
	    console.error("Error getting geolocation: code=" + error.code + " message=" + error.message);
	};

	console.log("Requesting geolocation ...");
	navigator.geolocation.getCurrentPosition(geoSuccess, geoFail);

    },

    speakToMe: function(mess) {
	console.log('TTS: Away to create SpeechSynthesisUtterance');
		
	u = new SpeechSynthesisUtterance();
	u.text = mess;
	u.lang = 'en-US';
	console.log('TTS: Away to perform speak');
	speechSynthesis.speak(u);
	console.log('TTS: Done.');

	return u;
    }
};

	

$(window).resize(function() {
    app.resizeMap();
});



