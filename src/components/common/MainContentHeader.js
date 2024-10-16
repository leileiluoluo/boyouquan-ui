export default function MainContentHeader( {content} ) {
    return (
        <article className="first-entry home-info">
            <div className="entry-content">
                <p></p>
                <ul>
                    <li>
                        <strong>{content}</strong>
                    </li>
                </ul>
                <p></p>
            </div>
        </article>
    )
}