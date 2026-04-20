import React from 'react';
import { Checkbox } from 'antd';

// 类型定义（可选，增强代码提示）
interface GlobalCheckboxProps {
  options: { id: string; label: string }[];
  defaultIdOptions?: string[];
  handleChange: (value: string[]) => void;
}

export default function GlobalCheckbox({
  options,
  defaultIdOptions,
  handleChange
}: GlobalCheckboxProps) {
  return (
    <Checkbox.Group
      defaultValue={defaultIdOptions}
      onChange={handleChange}
    >
      {options.map((option) => (
        <Checkbox
          key={option.id}
          value={option.id}
          style={{ display: 'block', marginBottom: 8 }}
        >
          {option.label}
        </Checkbox>
      ))}
    </Checkbox.Group>
  );
}