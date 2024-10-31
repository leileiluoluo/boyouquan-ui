export function getGoAddress(originalLink) {
    return '/go?from=website&link=' + encodeURIComponent(originalLink);
}

export function getBlogAddress(domainName) {
    return `/blogs/${domainName}`;
}

export function getAbstractAddress(originalLink) {
    return `/abstract?link=${encodeURIComponent(originalLink)}`;
}

export function getSharingAddress(originalLink) {
    return `/sharing?link=${encodeURIComponent(originalLink)}`;
}

export function getBlogRequestAddress(id) {
    return `/blog-requests/${id}`;
}

export function getGravatarImageFullURL(imageURL) {
    return `https://www.boyouquan.com${imageURL}`;
}