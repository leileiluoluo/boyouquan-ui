export default function SearchBox({placeholder}) {
    return (
        <div id="searchbox">
            <input id="searchInput" autofocus="" placeholder={placeholder} aria-label="search" type="search" autocomplete="off"/>
        </div>
    )
}