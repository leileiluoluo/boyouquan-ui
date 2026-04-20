import React from 'react';
import { Typography } from 'antd';

const { Text } = Typography;

interface AbstractDescriptionProps {
  description: string;
}

export default function AbstractDescription({ description }: AbstractDescriptionProps) {
  return (
    <div>
      <Text
        style={{
          fontSize: 14,
          color: '#8c8c8c', // antd 标准灰色
          display: '-webkit-box',
          WebkitLineClamp: 6,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {description}
      </Text>
    </div>
  );
}