// Function to fetch content via AJAX
function loadContent(url) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            document.getElementById('content').innerHTML = html;
        })
        .catch(error => console.error('Error fetching content:', error));
}

// Function to handle navigation
function navigate(event) {
    event.preventDefault();
    const url = event.target.getAttribute('href');
    loadContent(url);
    history.pushState({}, '', url);
}

// Event listener for navigation links
document.querySelectorAll('.navbar-nav a').forEach(link => {
    link.addEventListener('click', navigate);
});

// Event listener for popstate (back/forward navigation)
window.addEventListener('popstate', () => {
    const url = location.pathname;
    loadContent(url);
});

// Initial page load
window.onload = () => {
    const initialUrl = location.pathname;
    loadContent(initialUrl);
};
