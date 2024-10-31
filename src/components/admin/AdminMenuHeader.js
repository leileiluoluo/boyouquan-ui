const redStyle = { color: 'red' };

export default function AdminMenuHeader({ title }) {
    return (
        <header className="post-header">
            <h3 className="post-title" style={redStyle}>
                {title}
            </h3>
        </header>
    )
}