export function getURLParameter(name) {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

export function redirectTo(link, delaySeconds) {
    let delay = 0;
    if (null !== delaySeconds) {
        delay = delaySeconds;
    }

    setTimeout(function () {
        window.location.href = link;
    }, delay * 1000);
}