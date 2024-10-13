import React, { useEffect } from 'react';
import Header from '../components/Header'
import MainContentHeader from '../components/MainContentHeader';

export default function MonthlySelected() {
    useEffect(() => {
        document.title = '每月精选 - 博友圈 · 博客人的朋友圈！';
    }, []);

    const tableStyle = {display: 'table', tableLayout: 'fixed'};
    const dateStyle = {marginRight: '6px'};

    return (
        <>
            <Header></Header>
            <main className="main">
                <MainContentHeader></MainContentHeader>

                <div className="monthly-selected-container">
                    <div className="monthly-selected-single">
                        <div className="blog-detail-articles">
                            <div className="articles-title">
                                <h4>2024/09 精选文章</h4>
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
                                        <tr>
                                            <td width="20%">
                                                <a href="/blogs/macin.org">Macin的博客</a>
                                            </td>
                                            <td width="60%">
                                                <a href="/go?ssss" target="_blank">贵阳筑城</a>
                                            </td>
                                            <td width="20%">
                                                <p style={dateStyle}>2024/09/24</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="page-footer blog-footer">
                    <nav className="pagination">

                        <a className="next" href="/monthly-selected/page/2">下一页 »</a>
                    </nav>
                </footer>
            </main>
        </>
    )
}