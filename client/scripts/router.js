"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
var login_1 = require("./login");
var register_1 = require("./register");
var event_Planning_1 = require("./event-planning");
var statistics_1 = require("./statistics"); // Import StatisticsPage
var Router;
(function (Route) {
    Route["LOGIN"] = "login";
    Route["REGISTER"] = "register";
    Route["EVENT_PLANNING"] = "event-planning";
    Route["STATISTICS"] = "statistics";
    // Add more routes as needed
})(Router || (Router = {}));
var Route = /** @class */ (function () {
    function Router() {
        this.currentPage = null;
    }
    // Method to navigate to a specific route
    Router.prototype.navigateTo = function (route) {
        switch (route) {
            case Route.LOGIN:
                this.currentPage = new login_1.LoginPage();
                login_1.LoginPage.render(); // Render login page
                break;
            case Route.REGISTER:
                this.currentPage = new register_1.RegisterPage();
                register_1.RegisterPage.render(); // Render register page
                break;
            case Route.EVENT_PLANNING:
                this.currentPage = new event_Planning_1.EventPlanningPage();
                event_Planning_1.EventPlanningPage.render(); // Render event planning page
                break;
            case Route.STATISTICS: // Handle statistics route
                this.currentPage = new statistics_1.StatisticsPage();
                statistics_1.StatisticsPage.render(); // Render statistics page
                break;
            // Add more cases for additional routes
            default:
                console.error('Invalid route:', route);
        }
    };
    // Method to handle routing based on URL hash
    Router.prototype.handleRouting = function () {
        var hash = window.location.hash.slice(1);
        switch (hash) {
            case Route.LOGIN:
            case Route.REGISTER:
            case Route.EVENT_PLANNING:
            case Route.STATISTICS: // Handle statistics route
                this.navigateTo(hash);
                break;
            default:
                // Default route
                this.navigateTo(Route.LOGIN);
                break;
        }
    };
    // Method to initialize the router
    Router.prototype.init = function () {
        var _this = this;
        window.addEventListener('hashchange', function () {
            _this.handleRouting();
        });
        this.handleRouting(); // Handle routing when the page loads
    };
    return Router;
}());
exports.Router = Route;
// Instantiate and initialize the router
var router = new Route();
router.init();
//# sourceMappingURL=router.js.map