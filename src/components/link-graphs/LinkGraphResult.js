import { useEffect, useRef, useState } from 'react';

import RequestUtil from '../../utils/APIRequestUtil';
import { Box, Card, Flex, ScrollArea, Text } from '@radix-ui/themes';
import LinkGraphRelationResult from './LinkGraphRelationResult';

function computeScore(newPath) {
  const maxSteps = 10;
  return newPath.length === 0 ? 0 : Math.max(0, Math.round(((maxSteps - newPath.length + 1) / maxSteps) * 100))
}

export default function LinkGraphResult({ sourceDomainName, targetDomainName, setLoading }) {
  const [path, setPath] = useState([]);
  const [lines, setLines] = useState([]);
  const [score, setScore] = useState(null);
  const [searching, setSearching] = useState(false);
  const [contentWidth, setContentWidth] = useState(800);

  const nodeRefs = useRef([]);
  const svgRef = useRef(null);
  const scrollRef = useRef(null);

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
      setScore(computeScore(newPath));
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
    <Card>
      <Flex direction="column" align="center">
        <Box>
          <Text size="2" color="gray">
            {!sourceDomainName || !targetDomainName
              ? '填入源博客域名和目的博客域名，然后检索源博客到目的博客的连接系数'
              : searching
                ? '正在搜索源博客到目的博客的连接系数...'
                : path.length === 0
                  ? '源博客到目的博客的连接系数为 0'
                  : `源博客到目的博客的连接系数为 ${score}`}
          </Text>
        </Box>

        {
          !sourceDomainName || !targetDomainName || searching ?
            <Box>
              <img src="/assets/images/sites/link-graph/spherical_network_25_nodes.svg" alt="No Data" style={{ width: '300px', marginTop: '40px' }} />
            </Box> :
            <ScrollArea type="always" ref={scrollRef} scrollbars="horizontal" style={{ width: '100%', overflowX: 'auto' }}>
              <LinkGraphRelationResult
                contentWidth={contentWidth}
                lines={lines}
                nodes={nodes}
                svgRef={svgRef}
                nodeRefs={nodeRefs} />
            </ScrollArea>
        }
      </Flex>
    </Card>
  );
}
