import React, { useState } from 'react';
import { Form, Input, Select, Button } from 'antd';
const { Option } = Select;
export default ({ children, label, name }) => {
  return (
    <Form.Item name={name} label={label}>
      {children}
    </Form.Item>
  );
};
