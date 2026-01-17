export const BLOG_REQUESTS_ADDRESS = '/blog-requests';
export const BLOG_REQUEST_ADD_ADDRESS = '/blog-requests/add';
export const BLOG_REQUEST_ADD_EMAIL_VERIFICATION_ADDRESS = '/blog-requests/add/email-validation';
export const MOMENTS_ADDRESS = '/moments';

export const ADMIN_LOGIN_ADDRESS = '/admin/login';
export const ADMIN_BLOG_REQUESTS_ADDRESS = '/admin/blog-requests';
export const ADMIN_RECOMMENDED_POSTS_ADDRESS = '/admin/recommended-posts';
export const ADMIN_POST_IMAGE_ADD_ADDRESS = '/admin/post-images/add';
export const ADMIN_MONTHLY_SELECTED_ADDRESS = '/admin/monthly-selected';

export const NOT_FOUND_ADDRESS = '/404-not-found';

export function getGoAddress(originalLink: string): string {
    return '/go?from=website&link=' + encodeURI(originalLink);
}

export function getBlogAddress(domainName: string): string {
    return `/blogs/${domainName}`;
}

export function getAbstractAddress(originalLink: string): string {
    return `/abstract?link=${encodeURI(originalLink)}`;
}

export function getSharingAddress(originalLink: string): string {
    return `/sharing?link=${encodeURI(originalLink)}`;
}

export function getBlogRequestAddress(id: number | string): string {
    return `/blog-requests/${id}`;
}

export function getGravatarImageFullURL(imageURL: string): string {
    return imageURL;
}

export function getAdminBlogRequestAddress(id: number | string): string {
    return `/admin/blog-requests/${id}`;
}

