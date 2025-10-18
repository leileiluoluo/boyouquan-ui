import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import RequestUtil from '../../utils/APIRequestUtil';

export default function LinkGraphResult({ sourceDomainName, targetDomainName, setLoading, className }) {
  const [path, setPath] = useState([]);
  const [lines, setLines] = useState([]);
  const [score, setScore] = useState(null);

  const nodeRefs = useRef([]);
  const svgRef = useRef(null);

  // 请求数据
  const fetchData = async () => {
    if (!sourceDomainName || !targetDomainName) return;

    setLoading(true);
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
    }
  };

  useEffect(() => {
    fetchData();
    // 清空节点引用，防止残留
    nodeRefs.current = [];
  }, [sourceDomainName, targetDomainName]);

  // 布局计算
  useEffect(() => {
    if (!path || path.length === 0) return;

    const computeLayout = () => {
      if (!svgRef.current) return;
      const container = svgRef.current.parentElement;
      const containerRect = container.getBoundingClientRect();
      const nodeCount = path.length + 1;
      const spacingX = Math.max(150, containerRect.width / (nodeCount + 1));
      const spacingY = 120; // 上下偏移

      nodeRefs.current.forEach((el, idx) => {
        if (!el) return;
        const row = idx % 2; // 两行布局
        el.style.position = 'absolute';
        el.style.left = `${spacingX * (idx + 1) - el.offsetWidth / 2}px`;
        el.style.top = `${containerRect.height / 2 + (row === 0 ? -spacingY/2 : spacingY/2) - el.offsetHeight/2}px`;
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

    const timer = setTimeout(computeLayout, 50);
    window.addEventListener('resize', computeLayout);
    const ro = new ResizeObserver(computeLayout);
    nodeRefs.current.forEach(el => el && ro.observe(el));

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', computeLayout);
      ro.disconnect();
    };
  }, [path]);

  const nodes = path.length > 0 ? [path[0]?.sourceBlog, ...path.map(item => item.targetBlog)] : [];

  return (
    <div
      style={{
        position: 'relative',
        padding: '24px',
        backgroundColor: 'rgba(255,255,255,0.6)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        fontFamily: 'sans-serif',
        minHeight: '400px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        ...(className ? { className } : {}),
      }}
    >
      {/* 连接系数文字 */}
      <div
        style={{
          fontSize: '14px',
          color: '#1E40AF',
          textAlign: 'center',
          marginBottom: `${Math.min(50 + path.length * 10, 80)}px`,
          minHeight: '24px',
        }}
      >
        {!sourceDomainName || !targetDomainName
          ? '填入源博客域名和目的博客域名，然后检索源博客到目的博客的连接系数'
          : path.length === 0
          ? '正在搜索源博客到目的博客的连接系数...'
          : `源博客到目的博客的连接系数为 ${score}`}
      </div>

      {/* 图形容器 */}
      <div
        style={{
          position: 'relative',
          flex: 1,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '200px',
        }}
      >
        {/* SVG 连线 */}
        <svg
          ref={svgRef}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        >
          <defs>
            <marker id="arrowhead" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0 0 L10 5 L0 10 z" fill="#4f46e5" />
            </marker>
            <linearGradient id="gradLine" x1="0" x2="1">
              <stop offset="0%" stopColor="#4f46e5" stopOpacity="1" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.7" />
            </linearGradient>
          </defs>

          {lines.map((ln, idx) => {
            const dx = ln.endX - ln.startX;
            const d = `M ${ln.startX} ${ln.startY} C ${ln.startX + dx/3} ${ln.startY} ${ln.endX - dx/3} ${ln.endY} ${ln.endX} ${ln.endY}`;
            const midX = (ln.startX + ln.endX) / 2;
            const midY = (ln.startY + ln.endY) / 2 - 15;

            return (
              <g key={idx}>
                <motion.path
                  d={d}
                  fill="none"
                  strokeWidth={2.5}
                  stroke="url(#gradLine)"
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

        {/* 节点 */}
        {nodes.map((blog, i) => (
          <div
            key={blog.domainName}
            ref={el => (nodeRefs.current[i] = el)}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '120px' }}
          >
            <div
              style={{
                marginBottom: '8px',
                fontSize: '12px',
                fontWeight: 600,
                color: '#1E40AF',
                textAlign: 'center',
              }}
            >
              {blog.name}
            </div>
            <motion.div
              layout
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                border: '1px solid #E2E8F0',
                background: '#fff',
              }}
              whileHover={{ scale: 1.06 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <img
                src={blog.blogAdminLargeImageURL}
                alt={blog.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
