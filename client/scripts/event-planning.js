"use strict";

class EventPlanningPage {
    constructor() {
        // Constructor logic
    }

    fetchData() {
        return fetch('../../client/data/events.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch event data');
                }
                return response.json();
            })
            .catch(error => {
                console.error('Error fetching event data:', error);
                throw error;
            });
    }

    renderEvents(data) {
        const eventsContainer = document.getElementById('events-container');
        if (eventsContainer) {
            eventsContainer.innerHTML = '';
            data.events.forEach(event => {
                const eventElement = document.createElement('div');
                eventElement.classList.add('event');
                eventElement.innerHTML = `
                    <h2>${event.title}</h2>
                    <p>Date: ${event.date}</p>
                    <img src="${event.image}" alt="${event.title}" class="img-fluid mb-3">
                    <p>Description: ${event.description}</p>
                `;
                eventsContainer.appendChild(eventElement);
            });
        }
    }

    static render() {
        const eventPlanningPage = new EventPlanningPage();
        eventPlanningPage.fetchData()
            .then(data => {
                eventPlanningPage.renderEvents(data);
            })
            .catch(error => {
                console.error('Error rendering event planning page:', error);
            });
    }
}

EventPlanningPage.render();

$(document).ready(function() {
    var events = []; // Array to store event data

    // Event listener for Save Event button
    $('#saveEventBtn').click(function() {
        var eventName = $('#eventNameInput').val();
        var eventDescription = $('#eventDescriptionInput').val();
        var eventImage = $('#eventImageInput').prop('files')[0];

        if (eventName && eventDescription && eventImage) {
            var reader = new FileReader();
            reader.onload = function(event) {
                var imageDataUrl = event.target.result;

                var newEvent = {
                    name: eventName,
                    description: eventDescription,
                    image: imageDataUrl
                };

                events.push(newEvent); // Add new event to the array
                displayEvents(); // Update the events display
                $('#eventModal').modal('hide'); // Hide the modal after saving
            };

            reader.readAsDataURL(eventImage); // Read the uploaded image file
        } else {
            alert('Please fill in all fields and select an image.');
        }
    });

    // Function to display events on the page
    function displayEvents() {
        var eventsContainer = $('#eventsContainer');
        eventsContainer.empty(); // Clear previous events

        events.forEach(function(event) {
            var eventCard = `
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <img src="${event.image}" class="card-img-top" alt="Event Image">
                        <div class="card-body">
                            <h5 class="card-title">${event.name}</h5>
                            <p class="card-text">${event.description}</p>
                            <button class="btn btn-primary edit-event-btn" data-toggle="modal" data-target="#eventModal">Edit</button>
                            <button class="btn btn-danger delete-event-btn">Delete</button>
                        </div>
                    </div>
                </div>
            `;
            eventsContainer.append(eventCard);
        });

        // Attach event listener to delete buttons
        $('.delete-event-btn').click(function() {
            var index = $(this).closest('.col-md-4').index(); // Get index of the event card
            events.splice(index, 1); // Remove event from array
            displayEvents(); // Update the events display
        });
    }
});
