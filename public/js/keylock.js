// Disable right-click context menu
window.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});

document.onkeydown = function (e) {
    if (e.ctrlKey && e.keyCode === 85) {
        return false;
    }
};

// Disable keyboard shortcuts for developer tools
window.addEventListener('keydown', function (e) {
    if (e.ctrlKey && e.shiftKey && (e.key === 'C' || e.key === 'I' || e.key === 'J' || e.key === 'U' || e.key === 'c' || e.key === 'i' || e.key === 'j' || e.key === 'u')) {
        e.preventDefault();
        console.log('Developer tools are not allowed!');
    }
});