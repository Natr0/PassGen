// Utility functions for DOM manipulation and common operations
export function isElementPresent(id) {
    return document.getElementById(id) !== null;
}

export function setElementStyle(element, styles) {
    if (!element) return;
    Object.assign(element.style, styles);
}

export function addClass(element, className) {
    if (!element) return;
    element.classList.add(className);
}

export function removeClass(element, className) {
    if (!element) return;
    element.classList.remove(className);
}