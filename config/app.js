"use strict";

// Import necessary modules and components
const express = require('express');
const app = express();
const path = require('path');

// Define the main application class
class HarmonyHubApp {
    // Function to load header
    loadHeader() {
        // Load header from header.ejs using EJS render
        app.get('/header', (req, res) => {
            res.render('header');
        });
    }

    // Function to load footer
    loadFooter() {
        // Load footer from footer.ejs using EJS render
        app.get('/footer', (req, res) => {
            res.render('footer');
        });
    }

    // Function to load blog content
    loadBlogContent() {
        // Load blog content from blog.ejs using EJS render
        app.get('/blog', (req, res) => {
            res.render('blog');
        });
    }

    // Function to check if user is logged in and adjust UI accordingly
    checkLogin(req, res, next) {
        // Check login status and adjust UI
        const isLoggedIn = req.session.user !== undefined;
        res.locals.isLoggedIn = isLoggedIn;
        next();
    }

    // Function to handle navigation
    navigate(req, res) {
        const url = req.params.url;
        res.render(url);
    }

    // Main function to start the application
    start() {
        console.log('App Started...');
        // Set EJS as view engine
        app.set('view engine', 'ejs');
        // Set views directory
        app.set('views', path.join(__dirname, 'views'));
        // Serve static files from public directory
        app.use(express.static(path.join(__dirname, 'public')));
        // Middleware to check login status
        app.use(this.checkLogin);

        // Call necessary functions to initialize the application
        this.loadHeader();
        this.loadFooter();
        this.loadBlogContent();

        // Define routes for page navigation
        app.get('/:url', this.navigate.bind(this));

        // Start server
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
}

// Instantiate HarmonyHubApp and start the application
const appInstance = new HarmonyHubApp();
appInstance.start();
