export const ADMIN_LOGIN_ADDRESS = '/admin/login';
export const ADMIN_BLOG_REQUESTS_ADDRESS = '/admin/blog-requests';

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

export function getAdminBlogRequestAddress(id) {
    return `/admin/blog-requests/${id}`;
}