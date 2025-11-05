import React from 'react';
import { motion } from 'framer-motion';
import { Link } from '@radix-ui/themes';

export default function LinkGraphRelationResult({ contentWidth, lines, nodes, svgRef, nodeRefs }) {
  return (
    <div
      style={{
        position: 'relative',
        padding: '2px',
        backgroundColor: 'rgba(255,255,255,0.6)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        fontFamily: 'sans-serif',
        minHeight: '100px'
      }}
    >
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
  );
}
