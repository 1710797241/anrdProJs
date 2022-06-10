import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Button, DatePicker, Row, Col } from 'antd';
const { Option } = Select;
import styles from './index.less';
import WrappedFormItem from './components/WrappedFormItem';
import { renderFormComponent } from '@/components/CustomForm/common/index';
import { formArr } from '@/components/CustomForm/common/index';
import classNames from 'classnames';
const Demo = ({
  labelStyle = {},
  span,
  searchColumns,
  searchFormRef,
  toolBarRender,
  form,
  initialValues,
}) => {
  const onFinish = values => {
    console.log('Received values from form: ', values);
  };

  const checkPrice = (_, value) => {
    if (value.number > 0) {
      return Promise.resolve();
    }

    return Promise.reject(new Error('Price must be greater than zero!'));
  };
  useEffect(() => {
    console.log('searchColumns', searchColumns);
    searchFormRef.current = form;
  }, []);

  return (
    <Form
      name="customized_form_controls"
      formLayout="horizontal"
      onFinish={onFinish}
      initialValues={{
        price: {
          number: 0,
          currency: 'rmb',
        },
      }}
    >
      <div>
        {formArr(searchColumns, span || 3).map((item1, index1) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <div key={`${index1}searchColumns`} className={'custom-row'}>
              {searchColumns &&
                item1.map((item, index) => {
                  return (
                    // eslint-disable-next-line react/no-array-index-key
                    <div key={`${index}searchColumns`} className={classNames(styles['custom-col'])}>
                      {renderFormComponent(item, form, initialValues)}
                    </div>
                  );
                })}
              {index1 == Math.ceil(searchColumns.length / span) - 1 ? (
                <div key={`action`} className={classNames(styles['custom-col'])}>
                  <WrappedFormItem>
                    {toolBarRender ? toolBarRender.map(item => item) : null}
                  </WrappedFormItem>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </Form>
  );
};

export default Form.create()(Demo);