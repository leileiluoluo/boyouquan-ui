export default function getURLParameter(name) {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}