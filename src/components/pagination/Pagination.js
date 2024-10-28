export default function Pagination({pageNo, pageSize, total, setCurrectPage}) {
    const hasPre = pageNo > 1 ? true : false;
    const hasNext = total > pageNo * pageSize ? true : false;

    return (
        <section className="page-footer blog-footer">
            <nav className="pagination">
                {
                    hasPre && <button className="pre" onClick={() => setCurrectPage(pageNo - 1)}>« 上一页</button>
                }
                {
                    hasNext && <button className="next" onClick={() => setCurrectPage(pageNo + 1)}>下一页 »</button>
                }
            </nav>
        </section>
    )
}