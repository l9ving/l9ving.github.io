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


/* epic games creator code copy interaction */

document.addEventListener("DOMContentLoaded", () => {
    const epicCode = document.getElementById("epicCode");
    const copyButton = document.getElementById("epicCopyButton");

    let resetTimer;

    copyButton.addEventListener("click", async () => {
        try {
            // Copy ONLY the creator code
            await navigator.clipboard.writeText("wuvabl");

            // Fade out original text and show confirmation
            epicCode.classList.add("is-copied");

            // Reset the timer
            clearTimeout(resetTimer);

            // Return to the original text after 3 seconds
            resetTimer = setTimeout(() => {
                epicCode.classList.remove("is-copied");
            }, 3000);

        } catch (error) {
            console.error("Failed to copy code:", error);
        }
    });
});

