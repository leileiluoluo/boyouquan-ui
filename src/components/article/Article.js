export default function Article({ title, content, publishedAt }) {
    return (
        <>
            <header className="post-header">
                <h1 className="post-title">
                    {title}
                </h1>
                {
                    publishedAt ? <div className="post-publish-date">
                        <p>{publishedAt}</p>
                    </div> : ''
                }
            </header>
            <article className="post-single">
                <div className="post-content">
                    {content}
                </div>
            </article>
        </>
    )
}