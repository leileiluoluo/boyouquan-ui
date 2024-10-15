export default function BlogsSwitchSortType() {
    return (
        <div className="switch-sort-type">
            <ul className="menu">
                <li>
                    <a href="/blogs?sort=collect_time" title="最近收录" className="active">
                        <span>最近收录</span>
                    </a>
                </li>
                <li>
                    <a href="/blogs?sort=access_count" title="最多浏览">
                        <span>最多浏览</span>
                    </a>
                </li>
            </ul>
        </div>
    )
}