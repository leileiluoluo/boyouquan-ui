export function getGoAddress(originalLink) {
    return '/go?from=website&link=' + encodeURIComponent(originalLink);
}