export function scrollToHash(): void {
    let hash = window.location.hash;

    if (hash) {
        // 去掉开头的 # 字符
        hash = hash.substring(1);
    }

    const elem = document.getElementById(hash);
    if (elem) {
        elem.scrollIntoView();
    }
}

export function clearHash(): void {
    window.history.replaceState(null, '', ' ');
}

