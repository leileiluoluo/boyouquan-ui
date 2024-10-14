export default function GoToTop() {
    const style = {
        visibility: 'hidden', opacity: 0
    }

    return (
        <div>
            <a href="#top" aria-label="go to top" title="Go to Top (Alt + G)" className="top-link" id="top-link" accessKey="g" style={style}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 6" fill="currentColor">
                    <path d="M12 6H0l6-6z"></path>
                </svg>
            </a>
        </div>
    )
}