import { LoginPage } from './login';
import { RegisterPage } from './register';
import { EventPlanningPage } from './event-planning';
import { StatisticsPage } from './statistics'; // Import StatisticsPage

enum Router {
    LOGIN = 'login',
    REGISTER = 'register',
    EVENT_PLANNING = 'event-planning',
    STATISTICS = 'statistics', // Add statistics route
    // Add more routes as needed
}

// Function to fetch content via AJAX
export function loadContent(url: string): void {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            document.getElementById('content').innerHTML = html;
        })
        .catch(error => console.error('Error fetching content:', error));
}

// Function to handle navigation
export function navigate(event: Event): void {
    event.preventDefault();
    const url = (event.target as HTMLAnchorElement).getAttribute('href');
    loadContent(url);
    history.pushState({}, '', url);
}

export class RouteHandler {
    private currentPage: any;

    constructor() {
        this.currentPage = null;
    }

    // Method to navigate to a specific route
    navigateTo(route: Router): void {
        switch (route) {
            case Router.LOGIN:
                this.currentPage = new LoginPage();
                break;
            case Router.REGISTER:
                this.currentPage = new RegisterPage();
                break;
            case Router.EVENT_PLANNING:
                this.currentPage = new EventPlanningPage();
                break;
            case Router.STATISTICS: // Handle statistics route
                this.currentPage = new StatisticsPage();
                break;
            // Add more cases for additional routes
            default:
                console.error('Invalid route:', route);
                return;
        }
        this.renderCurrentPage();
    }

    // Method to render the current page
    renderCurrentPage(): void {
        if (this.currentPage) {
            this.currentPage.render();
        } else {
            console.error('Current page not set.');
        }
    }

    // Method to handle routing based on URL hash
    handleRouting(): void {
        const hash = window.location.hash.slice(1);
        switch (hash) {
            case Router.LOGIN:
            case Router.REGISTER:
            case Router.EVENT_PLANNING:
            case Router.STATISTICS: // Handle statistics route
                this.navigateTo(hash as Router);
                break;
            default:
                // Default route
                this.navigateTo(Router.LOGIN);
                break;
        }
    }

    // Method to initialize the router
    init(): void {
        window.addEventListener('hashchange', () => {
            this.handleRouting();
        });
        this.handleRouting(); // Handle routing when the page loads
    }
}

// Instantiate and initialize the router
const routeHandler = new RouteHandler();
routeHandler.init();

// Export the routeHandler instance
export default routeHandler;
