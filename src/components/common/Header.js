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
                    >博友圈</a
                    >
                    <span className="logo-switches">
                        <button id="theme-toggle" accessKey="t" title="(Alt + T)">
                            <svg
                                id="moon"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path
                                    d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                                ></path>
                            </svg>
                            <svg
                                id="sun"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="12" cy="12" r="5"></circle>
                                <line x1="12" y1="1" x2="12" y2="3"></line>
                                <line x1="12" y1="21" x2="12" y2="23"></line>
                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                                <line x1="1" y1="12" x2="3" y2="12"></line>
                                <line x1="21" y1="12" x2="23" y2="12"></line>
                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                            </svg>
                        </button>
                    </span>
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