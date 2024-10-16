import { useEffect } from "react"

export default function SearchBox({ placeholder, gotoPage, sortType }) {
    useEffect(() => {
        document.onkeydown = function () {
            var evt = window.event || arguments[0];
            if (evt && evt.keyCode == 13) {
                var input = document.getElementById('searchInput').value;
                if (sortType != null) {
                    window.location = gotoPage + '?sort=' + sortType + '&keyword=' + encodeURIComponent(input);
                } else {
                    window.location = gotoPage + '?keyword=' + encodeURIComponent(input);
                }
            }
        }

        var query = window.location.href.split('?');
        if (query.length > 1) {
            var urlStr = query[1];
            var params = new URLSearchParams(urlStr);
            var keyword = params.get('keyword');
            document.getElementById('searchInput').value = keyword;
        }
    });

    return (
        <div id="searchbox">
            <input id="searchInput" autofocus="" placeholder={placeholder} aria-label="search" type="search" autocomplete="off" />
        </div>
    )
}