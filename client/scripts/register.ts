export class RegisterPage {
    constructor() {
        // Constructor logic
    }

    // Method to handle user registration
    static register(username: string, email: string, password: string): Promise<any> {
        // Example: Send registration request to server
        return fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to register');
                }
                return response.json();
            })
            .then(data => {
                // Process registration response data
                return data;
            })
            .catch(error => {
                console.error('Error registering:', error);
                throw error;
            });
    }

    // Method to render the registration page
    static render() {
        // Rendering logic for registration page

        // Assuming you have HTML elements for username, email, password, and a submit button
        const usernameInput = document.getElementById('username') as HTMLInputElement;
        const emailInput = document.getElementById('email') as HTMLInputElement;
        const passwordInput = document.getElementById('password') as HTMLInputElement;
        const submitButton = document.getElementById('submit-button');

        // Add an event listener to the submit button
        submitButton.addEventListener('click', () => {
            // Get the values from input fields
            const username = usernameInput.value;
            const email = emailInput.value;
            const password = passwordInput.value;

            // Call the register method to send registration request
            this.register(username, email, password)
                .then(data => {
                    // Handle successful registration
                    console.log('Registration successful:', data);
                    // Optionally, redirect to another page or show a success message
                })
                .catch(error => {
                    // Handle registration error
                    console.error('Error registering:', error);
                    // Optionally, display an error message to the user
                });
        });
    }
}
