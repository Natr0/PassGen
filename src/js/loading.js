// Loading Screen Management
export function initLoading() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Only proceed if loading screen exists
    if (!loadingScreen) return;
    
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1500);
}