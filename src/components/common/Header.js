import { useEffect } from 'react';

export default function Header() {
    useEffect(() => {
        let currentURL = window.location.href;
        let currentPath = currentURL.split('?')[0];
        let menuItems = document.getElementById('menu').getElementsByTagName('a');
        for (let i = 0; i < menuItems.length; i++) {
            let item = menuItems[i];
            if (currentPath == item.href) {
                item.classList.add('active');
            }
        }
    });

    return (
        <header className="header">
            <nav className="nav">
                <div className="logo">
                    <a
                        href="/home"
                        accessKey="h"
                        title="博友圈 (Alt + H)"
                    >博友圈</a>
                </div>
                <div className="menu">
                    <ul id="menu">
                        <li>
                            <a href="/home" title="首页">
                                <span>首页</span>
                            </a>
                        </li>
                        <li>
                            <a href="/monthly-selected" title="每月精选">
                                <span>每月精选</span>
                            </a>
                        </li>
                        <li>
                            <a href="/blogs" title="博客广场">
                                <span>博客广场</span>
                            </a>
                        </li>
                        <li>
                            <a href="/blog-requests/add" title="提交博客">
                                <span>提交博客</span>
                            </a>
                        </li>
                        <li>
                            <a href="/blog-requests" title="审核结果">
                                <span>审核结果</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}