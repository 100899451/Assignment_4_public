export class LoginPage {
    constructor() {
        // Constructor logic
    }

    // Method to handle login functionality
    static async login(username: string, password: string): Promise<any> {
        // Example: Send login request to server
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to log in');
            }
            return await response.json();
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    }

    // Method to render the login page
    static render() {
        // Rendering logic for login page
        const loginForm = document.createElement('form');
        loginForm.innerHTML = `
            <label for="username">Username:</label>
            <input type="text" id="username" name="username"><br>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password"><br>
            <button type="submit" id="login-button">Login</button>
        `;

        // Add event listener to the form for handling login submission
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent form submission
            const usernameInput = document.getElementById('username') as HTMLInputElement;
            const passwordInput = document.getElementById('password') as HTMLInputElement;
            const username = usernameInput.value;
            const password = passwordInput.value;

            // Call login method to perform login
            LoginPage.login(username, password)
                .then(data => {
                    console.log('Login successful:', data);
                    // Optionally, redirect to another page or update UI
                })
                .catch(error => {
                    console.error('Login failed:', error);
                    // Optionally, display an error message to the user
                });
        });

        const contentDiv = document.getElementById('content');
        contentDiv.innerHTML = ''; // Clear previous content
        contentDiv.appendChild(loginForm);
    }
}
