import { useEffect, useRef, useState } from "react";

import RequestUtil from "../../utils/APIRequestUtil";
import { Card, Flex, Typography, Spin, Image } from "antd";
import LinkGraphRelationResult from "./LinkGraphRelationResult";
import GlobalDialog from "../common/dialog/GlobalDialog";
import { ApiResponse } from "@/types";

const { Text, Link } = Typography;

function computeScore(newPath) {
  const maxSteps = 10;
  return newPath.length === 0
    ? 0
    : Math.max(
        0,
        Math.round(((maxSteps - newPath.length + 1) / maxSteps) * 100)
      );
}

export default function LinkGraphResult({
  sourceDomainName,
  targetDomainName,
  setLoading,
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [error, setError] = useState({ code: "", message: "" });

  const [sourceBlog, setSourceBlog] = useState(null);
  const [targetBlog, setTargetBlog] = useState(null);
  const [path, setPath] = useState([]);
  const [lines, setLines] = useState([]);
  const [score, setScore] = useState(null);
  const [searching, setSearching] = useState(false);
  const [contentWidth, setContentWidth] = useState(800);

  const nodeRefs = useRef([]);
  const svgRef = useRef(null);
  const scrollContainerRef = useRef(null);

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
      if (resp.status !== 200) {
        setError(respBody as ApiResponse);
        setDialogOpen(true);
        return;
      }

      if (!respBody.sourceBlog || !respBody.targetBlog) {
        setError({
          code: "params_invalid",
          message: "源博客或目的博客域名无效",
        });
        setDialogOpen(true);
        return;
      }

      setSourceBlog(respBody.sourceBlog);
      setTargetBlog(respBody.targetBlog);

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
        el.style.position = "absolute";
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

      // 自动滚动到最左侧
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft = 0;
      }
    }, 50);

    window.addEventListener("resize", computeLayout);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", computeLayout);
    };
  }, [path]);

  const nodes =
    path.length > 0
      ? [path[0]?.sourceBlog, ...path.map((item) => item.targetBlog)]
      : [];

  const renderContent = () => {
    if (!sourceBlog || !targetBlog) {
      return (
        <Image
          src="/assets/images/sites/link-graph/spherical_network_25_nodes_static.svg"
          alt="No Data"
          preview={false}
          style={{ width: 300, marginTop: 40 }}
        />
      );
    }

    if (searching) {
      return (
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <Spin size="large" />
        </div>
      );
    }

    return (
      <div
        ref={scrollContainerRef}
        style={{
          width: "100%",
          overflowX: "auto",
          overflowY: "hidden",
        }}
      >
        <LinkGraphRelationResult
          contentWidth={contentWidth}
          lines={lines}
          nodes={nodes}
          svgRef={svgRef}
          nodeRefs={nodeRefs}
        />
      </div>
    );
  };

  return (
    <Card style={{ width: "100%" }}>
      <Flex vertical align="center" gap={16}>
        <div>
          {!sourceBlog || !targetBlog ? (
            <Text type="secondary" style={{ fontSize: 14 }}>
              填入源博客域名和目的博客域名，然后检索源博客到目的博客的连接系数
            </Text>
          ) : searching ? (
            <Text type="secondary" style={{ fontSize: 14 }}>
              正在搜索源博客到目的博客的连接系数...
            </Text>
          ) : (
            <Text type="secondary" style={{ fontSize: 14 }}>
              「
              <Link
                href={`/blogs/${sourceDomainName}`}
                target="_blank"
                style={{ color: "#1677ff" }}
              >
                {sourceBlog.name}
              </Link>
              」到「
              <Link
                href={`/blogs/${targetDomainName}`}
                target="_blank"
                style={{ color: "#1677ff" }}
              >
                {targetBlog.name}
              </Link>
              」的连接系数为 {path.length === 0 ? 0 : score}{" "}
            </Text>
          )}
        </div>

        {renderContent()}
      </Flex>

      <GlobalDialog
        title={"" != error.code ? "错误提示" : "提示"}
        titleColor={"" != error.code ? "crimson" : ""}
        message={error.message}
        closeButtonName={"" != error.code ? "返回" : "关闭窗口"}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
      />
    </Card>
  );
}