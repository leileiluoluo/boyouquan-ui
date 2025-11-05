export function getURLParameter(name: string): string | null {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

export function redirectTo(link: string, delaySeconds?: number | null): void {
    let delay = 0;
    if (null !== delaySeconds && undefined !== delaySeconds) {
        delay = delaySeconds;
    }

    setTimeout(function () {
        window.location.href = link;
    }, delay * 1000);
}

