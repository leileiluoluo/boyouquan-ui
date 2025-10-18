import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import RequestUtil from '../../utils/APIRequestUtil';
import { Link, ScrollArea } from '@radix-ui/themes';

export default function LinkGraphResult({ sourceDomainName, targetDomainName, setLoading, className }) {
  const [path, setPath] = useState([]);
  const [lines, setLines] = useState([]);
  const [score, setScore] = useState(null);
  const [searching, setSearching] = useState(false);
  const [contentWidth, setContentWidth] = useState(800);

  const nodeRefs = useRef([]);
  const svgRef = useRef(null);
  const scrollRef = useRef(null); // ✅ 新增滚动容器引用

  // 请求数据
  const fetchData = async () => {
    if (!sourceDomainName || !targetDomainName) return;
    setLoading(true);
    setSearching(true);
    setPath([]);
    setLines([]);
    setScore(null);

    try {
      const resp = await RequestUtil.get(
        `/api/blog-intimacies?sourceDomainName=${sourceDomainName}&targetDomainName=${targetDomainName}`
      );
      const respBody = await resp.json();
      const newPath = Array.isArray(respBody.path) ? respBody.path : [];
      setPath(newPath);

      const maxSteps = 10;
      setScore(newPath.length === 0 ? 0 : Math.max(0, Math.round(((maxSteps - newPath.length + 1) / maxSteps) * 100)));
    } catch (err) {
      console.error(err);
      setPath([]);
      setScore(0);
    } finally {
      setLoading(false);
      setSearching(false);
    }
  };

  useEffect(() => {
    fetchData();
    nodeRefs.current = [];
  }, [sourceDomainName, targetDomainName]);

  // 节点布局计算
  useEffect(() => {
    if (!path || path.length === 0) return;

    const computeLayout = () => {
      if (!svgRef.current) return;
      const nodeCount = path.length + 1;
      const spacingX = 180;
      const spacingY = 120;

      const totalWidth = spacingX * (nodeCount + 1);
      setContentWidth(totalWidth);

      nodeRefs.current.forEach((el, idx) => {
        if (!el) return;
        const row = idx % 2;
        el.style.position = 'absolute';
        el.style.left = `${spacingX * (idx + 1)}px`;
        el.style.top = `${200 + (row === 0 ? -spacingY / 2 : spacingY / 2)}px`;
      });

      const newLines = [];
      for (let i = 0; i < path.length; i++) {
        const a = nodeRefs.current[i];
        const b = nodeRefs.current[i + 1];
        if (!a || !b) continue;
        const startX = a.offsetLeft + a.offsetWidth / 2;
        const startY = a.offsetTop + a.offsetHeight / 2;
        const endX = b.offsetLeft + b.offsetWidth / 2;
        const endY = b.offsetTop + b.offsetHeight / 2;
        newLines.push({
          startX,
          startY,
          endX,
          endY,
          pageTitle: path[i].pageTitle,
          pageUrl: path[i].pageUrl,
        });
      }
      setLines(newLines);
    };

    const timer = setTimeout(() => {
      computeLayout();

      // ✅ 自动滚动到最左侧
      if (scrollRef.current) {
        const scrollEl = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
        if (scrollEl) scrollEl.scrollLeft = 0;
      }
    }, 50);

    window.addEventListener('resize', computeLayout);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', computeLayout);
    };
  }, [path]);

  const nodes = path.length > 0 ? [path[0]?.sourceBlog, ...path.map(item => item.targetBlog)] : [];

  return (
    <ScrollArea ref={scrollRef} scrollbars="horizontal" style={{ width: '100%', overflowX: 'auto' }}>
      <div
        style={{
          position: 'relative',
          padding: '20px',
          backgroundColor: 'rgba(255,255,255,0.6)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          fontFamily: 'sans-serif',
          minHeight: '400px',
          ...(className ? { className } : {}),
        }}
      >
        {/* 上方文字 */}
        <div
          style={{
            fontSize: '14px',
            color: '#1E40AF',
            textAlign: 'center',
            marginBottom: '50px',
            minHeight: '24px',
          }}
        >
          {!sourceDomainName || !targetDomainName
            ? '填入源博客域名和目的博客域名，然后检索源博客到目的博客的连接系数'
            : searching
              ? '正在搜索源博客到目的博客的连接系数...'
              : path.length === 0
                ? '源博客到目的博客的连接系数为 0'
                : `源博客到目的博客的连接系数为 ${score}`}
        </div>

        {/* 横向滚动区域内容 */}
        <div style={{ position: 'relative', width: `${contentWidth}px`, height: '400px' }}>
          <svg
            ref={svgRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: `${contentWidth}px`,
              height: '400px',
              pointerEvents: 'none',
            }}
          >
            <defs>
              <marker id="arrowhead" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M0 0 L10 5 L0 10 z" fill="#4f46e5" />
              </marker>
            </defs>

            {lines.map((ln, idx) => {
              const dx = ln.endX - ln.startX;
              const d = `M ${ln.startX} ${ln.startY} C ${ln.startX + dx / 3} ${ln.startY} ${ln.endX - dx / 3} ${ln.endY} ${ln.endX} ${ln.endY}`;
              const midX = (ln.startX + ln.endX) / 2;
              const midY = (ln.startY + ln.endY) / 2 - 15;
              return (
                <g key={idx}>
                  <motion.path
                    d={d}
                    fill="none"
                    strokeWidth={2.5}
                    stroke="#4f46e5"
                    markerEnd="url(#arrowhead)"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, delay: idx * 0.08 }}
                  />
                  <a href={ln.pageUrl} target="_blank" rel="noreferrer">
                    <text
                      x={midX}
                      y={midY}
                      textAnchor="middle"
                      fill="#1E40AF"
                      fontSize="12"
                      style={{ cursor: 'pointer', userSelect: 'none', pointerEvents: 'all' }}
                    >
                      {ln.pageTitle}
                    </text>
                  </a>
                </g>
              );
            })}
          </svg>

          {nodes.map((blog, i) => (
            <div
              key={blog.domainName}
              ref={el => (nodeRefs.current[i] = el)}
              style={{
                position: 'absolute',
                textAlign: 'center',
                width: '120px',
              }}
            >
              <div
                style={{
                  marginBottom: '8px',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#1E40AF',
                }}
              >
                <Link href={`/blogs/${blog.domainName}`} target="_blank">
                  {blog.name}
                </Link>
              </div>
              <motion.div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '1px solid #E2E8F0',
                  margin: '0 auto',
                }}
                whileHover={{ scale: 1.06 }}
              >
                <Link href={`/blogs/${blog.domainName}`} target="_blank">
                  <img
                    src={blog.blogAdminLargeImageURL}
                    alt={blog.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Link>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}
