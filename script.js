let map;
let markers = [];
var R =0;

let polyline;

async function initMap() {
    const latInput = document.getElementById("latitude");
    const longInput = document.getElementById("longitude");
    const infoInput = document.getElementById("information");

    try {
        
        const position = await getCurrentLocation();

        const lat = latInput.value ? parseFloat(latInput.value) : position.lat;
        const long = longInput.value ? parseFloat(longInput.value) : position.lng;
        const info = infoInput.value || "Your Current Location";

        if (!map) {
            map = new google.maps.Map(document.getElementById("map"), {
                zoom: 2,
                center: { lat, lng: long },
                mapId: "DEMO_MAP_ID",
            });
        }

        const marker = new google.maps.Marker({
            map: map,
            position: { lat, lng: long },
            title: info,
        });

        const infowindow = new google.maps.InfoWindow({
            content: `<strong>${info}</strong>`,
        });

        
        infowindow.open(map, marker);

        marker.addListener("click", () => {
            infowindow.open(map, marker);
        });

        markers.push(marker);
        

        addMarkerToTable({ lat, lng: long }, info);
        latInput.value = "";
        longInput.value = "";
        infoInput.value = "";
        
    } catch (error) {
        console.error("Error getting location: " + error.message);
        initmap();
    }
}
async function initmap() {
    const latInput = document.getElementById("latitude");
    const longInput = document.getElementById("longitude");
    const infoInput = document.getElementById("information");

    
    const defaultPosition = { lat: 8.51399, lng: 76.93706 };

    
    const lat = latInput.value ? parseFloat(latInput.value) : defaultPosition.lat;
    const long = longInput.value ? parseFloat(longInput.value) : defaultPosition.lng;
    const info = infoInput.value || "Sieva Networks";

    
    const position = { lat, lng: long };

    
    if (!map) {
        map = new google.maps.Map(document.getElementById("map"), {
            zoom: 4,
            center: position,
            mapId: "DEMO_MAP_ID",
        });
    }

    
    const marker = new google.maps.Marker({
        map: map,
        position: position,
        title: info,
    });

    const infowindow = new google.maps.InfoWindow({
        content: `<strong>${info}</strong>`,
    });

    infowindow.open(map, marker);
    
    marker.addListener("click", () => {
        infowindow.open(map, marker);
    });

    
    markers.push(marker);
    
    
    addMarkerToTable(position, info);
    latInput.value = "";
    longInput.value = "";
    infoInput.value = "";
}

async function Initmap() {
    const latInput = document.getElementById("latitude");
    const longInput = document.getElementById("longitude");
    const infoInput = document.getElementById("information");

    // Validate latitude, longitude, and information
    const lat = validateCoordinate(latInput.value, "Latitude");
    const long = validateCoordinate(longInput.value, "Longitude");
    const info = validateInformation(infoInput.value);

    if (lat === null || long === null || info === null) {
        return; // Validation failed, do not proceed
    }

    const position = { lat, lng: long };

    if (!map) {
        map = new google.maps.Map(document.getElementById("map"), {
            zoom: 4,
            center: position,
            mapId: "DEMO_MAP_ID",
        });
    }

    const marker = new google.maps.Marker({
        map: map,
        position: position,
        title: info,
    });

    const infowindow = new google.maps.InfoWindow({
        content: `<strong>${info}</strong>`,
    });

    infowindow.open(map, marker);

    marker.addListener("click", () => {
        infowindow.open(map, marker);
    });

    markers.push(marker);

    // Add the marker to the table only if validations are successful
    addMarkerToTable(position, info);
    latInput.value = "";
    longInput.value = "";
    infoInput.value = "";
}

function validateCoordinate(value, coordinateName) {
    const coordinate = parseFloat(value);

    if (isNaN(coordinate) || coordinate < -90 || coordinate > 90) {
        alert(`${coordinateName} must be a valid number between -90 and 90.`);
        return null;
    }

    return coordinate;
}

// Function to validate information
function validateInformation(value) {
    if (!value.trim()) {
        alert("Information cannot be empty.");
        return null;
    }

    // You can add additional validation for information as needed

    return value.trim();
}

// Function to get current location using Geolocation API
function getCurrentLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => resolve({ lat: position.coords.latitude, lng: position.coords.longitude }),
            (error) => reject(error)
        );
    });
}



function addMarkerToTable(position, info) {
    const tableBody = document.querySelector("#markers-table tbody");

    
    const newRow = tableBody.insertRow();

    
    const latCell = newRow.insertCell(0);
    const longCell = newRow.insertCell(1);
    const infoCell = newRow.insertCell(2);
    const actionCell = newRow.insertCell(3);

    latCell.textContent = position.lat;
    longCell.textContent = position.lng;
    infoCell.textContent = info;

    
    const viewButton = createButton("View", () => {
        viewMarker(position);
    });

    const editButton = createButton("Edit", () => {
        editMarker(newRow, position, info);
    });

    const deleteButton = createButton("Delete", () => {
        deleteMarker(newRow);
    });

    actionCell.appendChild(viewButton);
    actionCell.appendChild(editButton);
    actionCell.appendChild(deleteButton);
}

function createButton(text, clickHandler) {
    const button = document.createElement("button");
    button.textContent = text;
    button.addEventListener("click", clickHandler);
    return button;
}

function viewMarker(position) {
    map.setCenter(position);
    map.setZoom(8);
}




function deleteMarker(row) {
    const confirmDelete = confirm("Are you sure you want to delete this marker?");

    if (confirmDelete) {
        // Get the index of the marker in the markers array
        const rowIndex = row.rowIndex - 1; // Adjusting for header row

        // Remove the marker from the map
        if (markers[rowIndex]) {
            markers[rowIndex].setMap(null);
            markers.splice(rowIndex, 1); // Remove the marker from the array
            updatePolyline();
        }

        // Remove the row from the table
        row.parentNode.removeChild(row);
    }
}



function clearMarkers() {
    markers.forEach(marker => {
        marker.setMap(null);
    });
    markers = [];
}


function deleteMarker1(row) {
    

    
        // Get the index of the marker in the markers array
        const rowIndex = row.rowIndex - 1; // Adjusting for header row

        // Remove the marker from the map
        if (markers[rowIndex]) {
            markers[rowIndex].setMap(null);
            markers.splice(rowIndex, 1); // Remove the marker from the array
        }

        // Remove the row from the table
        row.parentNode.removeChild(row);
    
}


function editMarker(row, position, info) {
    const latitudeInput = document.getElementById("latitude");
    const longitudeInput = document.getElementById("longitude");
    const informationInput = document.getElementById("information");

    latitudeInput.value = position.lat;
    longitudeInput.value = position.lng;
    informationInput.value = info;

    // Remove the 'disabled' attribute
    latitudeInput.removeAttribute("disabled");
    longitudeInput.removeAttribute("disabled");

    R = row;

    // Show the container
    document.querySelector(".container").style.display = "flex";

    // Hide the "Search" button
    document.getElementById("searchButton").style.display = "none";

    // Show the "Save Changes" and "Cancel" buttons
    document.getElementById("saveChangesButton").style.display = "inline-block";
    document.getElementById("cancelButton").style.display = "inline-block";

    // Remove the row from the table
    
}


function saveChanges() {
    const editLatInput = document.getElementById("latitude");
    const editLngInput = document.getElementById("longitude");
    const editInfoInput = document.getElementById("information");

    // Validate the edited values
    const editLat = validateCoordinate(editLatInput.value, "Edited Latitude");
    const editLng = validateCoordinate(editLngInput.value, "Edited Longitude");
    const editInfo = validateInformation(editInfoInput.value);

    if (editLat === null || editLng === null || editInfo === null) {
        return; // Validation failed, do not proceed
    }

    // Delete the existing marker
    deleteMarker1(R);

    // Create a new marker
    const marker = new google.maps.Marker({
        map: map,
        position: { lat: editLat, lng: editLng },
        title: editInfo,
    });

    const infowindow = new google.maps.InfoWindow({
        content: `<strong>${editInfo}</strong>`,
    });

    // Open the InfoWindow immediately after creating the marker
    infowindow.open(map, marker);

    marker.addListener("click", () => {
        infowindow.open(map, marker);
    });

    // Add the new marker to the array
    markers.push(marker);

    // Add the edited marker to the table
    const tableBody = document.querySelector("#markers-table tbody");
    const newRow = tableBody.insertRow();
    const latCell = newRow.insertCell(0);
    const longCell = newRow.insertCell(1);
    const infoCell = newRow.insertCell(2);
    const actionCell = newRow.insertCell(3);

    latCell.textContent = editLat;
    longCell.textContent = editLng;
    infoCell.textContent = editInfo;

    updatePolyline();

    const viewButton = createButton("View", () => {
        viewMarker({ lat: editLat, lng: editLng });
    });

    const editButton = createButton("Edit", () => {
        editMarker(newRow, { lat: editLat, lng: editLng }, editInfo);
    });

    const deleteButton = createButton("Delete", () => {
        deleteMarker(newRow);
    });

    actionCell.appendChild(viewButton);
    actionCell.appendChild(editButton);
    actionCell.appendChild(deleteButton);

    // Clear the edit input fields
    editLatInput.value = "";
    editLngInput.value = "";
    editInfoInput.value = "";

    // Show the "Search" button
    document.getElementById("searchButton").style.display = "inline-block";

    // Hide the "Save Changes" and "Cancel" buttons
    document.getElementById("saveChangesButton").style.display = "none";
    document.getElementById("cancelButton").style.display = "none";
}



function cancelChanges() {
    const editLatInput = document.getElementById("latitude");
    const editLngInput = document.getElementById("longitude");
    const editInfoInput = document.getElementById("information");

    editLatInput.value = "";
    editLngInput.value = "";
    editInfoInput.value = "";
    // Show the "Search" button
    document.getElementById("searchButton").style.display = "inline-block";

    // Hide the "Save Changes" and "Cancel" buttons
    document.getElementById("saveChangesButton").style.display = "none";
    document.getElementById("cancelButton").style.display = "none";
}









function openModal() {
    document.getElementById("myModal").style.display = "block";
}

function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

function openSidebar() {
    document.getElementById("mySidebar").style.width = "150px";
}

function closeSidebar() {
    document.getElementById("mySidebar").style.width = "10px";
}
// Add a function to handle radio button changes

document.querySelectorAll('input[name="markerType"]').forEach((radio) => {
    radio.addEventListener("change", function () {
        markerType = this.value;

        // Enable or disable latitude and longitude inputs based on marker type
        document.getElementById("latitude").disabled = markerType === "multiple";
        document.getElementById("longitude").disabled = markerType === "multiple";

        // Show/hide container and import button based on marker type
        const container = document.querySelector(".container");
        const importButton = document.getElementById("importExcelButton");
        const fileInput = document.getElementById("excelFileInput");

        if (markerType === "single") {
            const tableBody = document.querySelector("#markers-table tbody");
            clearTable(tableBody);
            clearMarkers();
            clearPolyline();
            container.style.display = "flex";
            importButton.style.display = "none";
            fileInput.style.display = "none"; // Hide file input for single marker
        } else {
            clearMarkers();
            clearPolyline();
            container.style.display = "none";
            importButton.style.display = "block";
            fileInput.style.display = "block"; // Show file input for multiple markers
        }
    });
});

// Add a function to handle Excel import
// Function to handle Excel import
function importExcel() {
    const fileInput = document.getElementById("excelFileInput");

    // Validate if a file is selected
    if (!fileInput.files || fileInput.files.length === 0) {
        alert("Please select an Excel file.");
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        // Use SheetJS to parse the Excel file
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        // Assume the first sheet is used
        const sheet = workbook.Sheets[workbook.SheetNames[0]];

        // Convert sheet data to JSON
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        // Display data in a table
        displayDataInTable(jsonData);
    };

    reader.readAsArrayBuffer(file);
}

// Function to display data in a table
function displayDataInTable(data) {
    const tableBody = document.querySelector("#markers-table tbody");
    clearTable(tableBody); // Clear existing table data

    clearMarkers();
    

    data.forEach((row) => {
        const newRow = tableBody.insertRow();
        const latCell = newRow.insertCell(0);
        const longCell = newRow.insertCell(1);
        const infoCell = newRow.insertCell(2);
        const actionCell = newRow.insertCell(3);

        latCell.textContent = row.latitude;
        longCell.textContent = row.longitude;
        infoCell.textContent = row.text;

        var lat = row.latitude;
        var long = row.longitude;
        var info = row.text;

        // Add action buttons
        const viewButton = createButton("View", () => {
            viewMarker({ lat: parseFloat(row.latitude), lng: parseFloat(row.longitude) });
        });

        const editButton = createButton("Edit", () => {
            editMarker(newRow, { lat: parseFloat(row.latitude), lng: parseFloat(row.longitude) }, info);
        });

        const deleteButton = createButton("Delete", () => {
            deleteMarker(newRow);
        });

        actionCell.appendChild(viewButton);
        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);

        if (!map) {
            map = new google.maps.Map(document.getElementById("map"), {
                zoom: 2,
                center: { lat, lng: long },
                mapId: "DEMO_MAP_ID",
            });
        }

        const marker = new google.maps.Marker({
            map: map,
            position: { lat, lng: long },
            title: info,
        });

        const infowindow = new google.maps.InfoWindow({
            content: `<strong>${info}</strong>`,
        });

        // Open the InfoWindow immediately after creating the marker
        infowindow.open(map, marker);

        marker.addListener("click", () => {
            infowindow.open(map, marker);
        });

        markers.push(marker);
        
        


        
    });

    
}



function updatePolyline() {
    
    markers.sort((a, b) => {
        const positionA = a.getPosition();
        const positionB = b.getPosition();
        const distanceToA = google.maps.geometry.spherical.computeDistanceBetween(positionA, markers[0].getPosition());
        const distanceToB = google.maps.geometry.spherical.computeDistanceBetween(positionB, markers[0].getPosition());
        return distanceToA - distanceToB;
    });

    
    if (markers.length > 1) {
        if (!polyline) {
            polyline = new google.maps.Polyline({
                path: markers.map(marker => marker.getPosition()),
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 2,
                map: map
            });
        } else {
            polyline.setPath(markers.map(marker => marker.getPosition()));
        }
    } else {
        // If there are fewer than two markers, clear the polyline
        clearPolyline();
    }
}

function clearPolyline() {
    // Clear the Polyline from the map
    if (polyline) {
        polyline.setMap(null);
        polyline = null;
    }
}

// Function to clear the table
function clearTable(tableBody) {
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }
}


function createButton(text, clickHandler) {
    const button = document.createElement("button");
    button.textContent = text;
    button.addEventListener("click", clickHandler);
    return button;
}


