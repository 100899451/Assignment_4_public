"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterPage = void 0;
var RegisterPage = /** @class */ (function () {
    function RegisterPage() {
        // Constructor logic
    }
    // Method to handle user registration
    RegisterPage.prototype.register = function (username, email, password) {
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
            .then(function (response) {
            if (!response.ok) {
                throw new Error('Failed to register');
            }
            return response.json();
        })
            .then(function (data) {
            // Process registration response data
            return data;
        })
            .catch(function (error) {
            console.error('Error registering:', error);
            throw error;
        });
    };
    RegisterPage.render = function () {
        // Rendering logic for registration page
    };
    return RegisterPage;
}());
exports.RegisterPage = RegisterPage;
//# sourceMappingURL=register.js.map