import React, { useEffect, useState } from 'react';

export default function MonthlySelectedComp() {
    const tableStyle = { display: 'table', tableLayout: 'fixed' };
    const dateStyle = { marginRight: '6px' };

    const [items, setItems] = useState([]);

    useEffect(() => {
        document.title = '每月精选 - 博友圈 · 博客人的朋友圈！';

        fetch('https://www.boyouquan.com/api/monthly-selected/all')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setItems(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return (
        <>
            <div className="monthly-selected-container">
                {
                    items.map(
                        (item, index) => (
                            <div className="monthly-selected-single">
                                <div className="blog-detail-articles">
                                    <div className="articles-title">
                                        <h4 key={`Outter-${index}`}>{item.yearMonthStr}</h4>
                                    </div>
                                    <div className="articles-container">
                                        <table style={tableStyle}>
                                            <thead>
                                                <tr>
                                                    <td width="20%"><span>博客名称</span></td>
                                                    <td width="60%"><span>文章标题</span></td>
                                                    <td width="20%"><span>发布时间</span></td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    item.postInfos.map(
                                                        (itemt, indext) => {
                                                            return (
                                                                <tr key={`Inner-${indext}`}>
                                                                    <td width="20%">
                                                                        <a href={`https://www.boyouquan.com/blogs/${itemt.blogDomainName}`}>{itemt.blogName}</a>
                                                                    </td>
                                                                    <td width="60%">
                                                                        <a href={`https://www.boyouquan.com/go?link=${itemt.link}`} target="_blank">{itemt.title}</a>
                                                                    </td>
                                                                    <td width="20%">
                                                                        <p style={dateStyle}>{itemt.publishedAt}</p>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        }
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        ))
                }
            </div>
            {/* <footer className="page-footer blog-footer">
                <nav className="pagination">
                    <a className="next" onClick={() => goToPage(currentPage - 1)}>上一页 《</a>
                    <a className="next" onClick={() => goToPage(currentPage + 1)}>下一页 »</a>
                </nav>
            </footer> */}
        </>
    )
}