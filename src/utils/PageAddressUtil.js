export function getGoAddress(originalLink) {
    return '/go?from=website&link=' + encodeURIComponent(originalLink);
}

export function getBlogAddress(domainName) {
    return `/blogs/${domainName}`;
}

export function getGravatarImageFullURL(imageURL) {
    return `https://www.boyouquan.com${imageURL}`;
}