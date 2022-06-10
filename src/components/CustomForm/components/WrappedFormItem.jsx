import { Form } from 'antd';
import React from 'react';
export default ({ children, label, name, inline, inlineStyle }) => {
  return (
    <Form.Item
      style={inline ? { flexDirection: 'row', alignItems: 'center', ...inlineStyle } : {}}
      required={false}
      name={name}
      label={label}
    >
      {children}
    </Form.Item>
  );
};
