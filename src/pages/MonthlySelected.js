import React, { useEffect, useState, Fragment } from 'react';
import Header from '../components/Header'
import MainContentHeader from '../components/MainContentHeader';
import FooterBlock from '../components/FooterBlock';
import SiteFooter from '../components/SiteFooter';
import FooterJS from '../components/FooterJS';
import HeaderJS from '../components/HeaderJS';
import GoToTop from '../components/GoToTop';

export default function MonthlySelected() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        document.title = '每月精选 - 博友圈 · 博客人的朋友圈！';

        fetch('https://www.boyouquan.com/api/monthly-selected/all')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setPosts(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    console.log('posts:' + JSON.stringify(posts));

    const tableStyle = { display: 'table', tableLayout: 'fixed' };
    const dateStyle = { marginRight: '6px' };

    return (
        <>
            <HeaderJS />
            <Header />
            <main className="main">
                <MainContentHeader />

                <div className="monthly-selected-container">
                    {
                        posts.map(
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
                        <a className="next" href="/monthly-selected/page/2">下一页 »</a>
                    </nav>
                </footer> */}
            </main>
            <FooterBlock />
            <SiteFooter />
            <GoToTop />
            <FooterJS />
        </>
    )
}