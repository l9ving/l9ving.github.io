// 1. Block right-click context menu
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// 2. Block keyboard shortcuts for Inspect, View Source, etc.
window.addEventListener('keydown', function(e) {
    // F12
    if (e.keyCode === 123) {
        e.preventDefault();
        return false;
    }
    
    // Ctrl + Shift + I, J, or C
    if (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) {
        e.preventDefault();
        return false;
    }
    
    // Ctrl + U
    if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
        return false;
    }
});

document.addEventListener("DOMContentLoaded", function () {
    new TypeIt("#typewriter-text", {
        strings: ["welcome", "all socials are below", "thanks for stopping by xd"],
        speed: 150,
        loop: true,
        breakLines: false,
        waitUntilVisible: true,
    }).go();
});
