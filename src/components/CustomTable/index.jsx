import { Table, Button, Pagination, Typography } from 'antd';
import SearchForm from '@/components/CustomForm/SearchForm';
import { useEffect, useRef, useState } from 'react';
import styles from './index.less';
import classNames from 'classnames';
import { isEmpty, formatTime } from './utils';
import EllipsisText from '@/components/Ellipsis';

const ProTable = ({
  columns,
  paginationStyle,
  pagination,
  paginationLeft,
  paginationRight,
  columnEmptyText = '--',
  onChange,
  toolBarRender,
  search = true,
  request,
  actionRef,
  formRef,
}) => {
  const [tableColumns, setTableColumns] = useState([]);

  const [searchColumns, setSearchColumns] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [dataSource, setDataSource] = useState([]);
  const [formValues, setFormValues] = useState({});

  const [total, setTotal] = useState(0);
  const searchFormRef = useRef();
  useEffect(() => {
    handleSearchColumns();
    handleTableColumns();
    handleRequest({ current: 1, pageSize });
    handleActionRef();
    console.log('searchFormRef', searchFormRef);
  }, []);
  //处理搜索列表
  const handleSearchColumns = () => {
    const columnsForSearch = columns
      .filter(item => item.search !== false && item.type)
      .map(item => {
        return {
          ...item,
          name: item.name || item.dataIndex,
          labelName: item.labelName || item.title,
        };
      });

    setSearchColumns(columnsForSearch);
  };

  //处理表格列表
  const handleTableColumns = () => {
    const newColumns = columns
      .filter(item => item.hideInTable !== true)
      .map((item, index) => {
        console.log(' item.render', item.render);
        return {
          ...item,
          render:
            item.render !== undefined
              ? item.render
              : (text, record) => {
                  const newText = item.format ? formatTime(text, item.format) : text;

                  if (isEmpty(record[item.dataIndex])) {
                    return columnEmptyText;
                  }
                  return (
                    <Typography.Text
                      style={{ display: 'flex' }}
                      copyable={item.copyable ? { text: newText } : null}
                    >
                      <EllipsisText
                        tooltip={item.ellipsisTooltip}
                        lines={item.ellipsisTooltip?.lines}
                      >
                        {newText}
                      </EllipsisText>
                    </Typography.Text>
                  );
                },
        };
      });

    setTableColumns(newColumns);
  };

  const handleActionRef = () => {
    //刷新reload
    // 刷新并清空,页码也会重置，不包括表单reloadAndRest
    // 重置到默认值，包括表单reset
    //重置所有并查询resetAndSubmit
    //查询 submit
    actionRef.current = {
      reload,
      reloadAndRest,
      reset,
      resetAndSubmit,
      submit,
    };
  };

  const reload = () => {
    handleRequest({ current });
  };

  const reloadAndRest = (pageNumber = 1) => {
    handleRequest({ current: pageNumber });
  };

  const reset = () => {
    searchFormRef?.current.resetFields();
    setFormValues({});
  };

  const resetAndSubmit = () => {
    searchFormRef?.current.resetFields();
    handleRequest({ current: 1, pageSize }, {}, true);
  };

  //分页
  const handleChangeNumber = page => {
    handleRequest({ current: page, pageSize });
  };
  //收集表单
  const submit = () => {
    searchFormRef?.current.validateFields().then(values => {
      console.log('values', values);
      handleRequest({ current: 1, pageSize }, values);
    });
  };

  //获取数据
  const handleRequest = (originParams = {}, values, isReset = false) => {
    if (request) {
      let params = { ...originParams };
      if (!isReset) {
        params = { ...params, ...formValues, ...values };
      }
      console.log('params', params);
      request(params).then(data => {
        console.log('handleRequest', data);
        if (data.success) {
          setDataSource(data.data);
          setTotal(data.total);
          setCurrent(params.current || 1);
          if (values) {
            setFormValues(values);
          }
        }
      });
    }
  };

  return (
    <div>
      <SearchForm
        searchColumns={searchColumns}
        searchFormRef={searchFormRef}
        initialValues={{
          name1: 'hello',
        }}
        span={3}
        toolBarRender={
          toolBarRender
            ? toolBarRender
            : [
                <Button
                  style={{ marginRight: 16 }}
                  htmlType="reset"
                  key="reset"
                  onClick={() => {
                    searchFormRef?.current.resetFields();
                    handleRequest({ current: 1, pageSize }, {}, true);
                  }}
                >
                  重置
                </Button>,
                <Button onClick={submit} key="search" type="primary">
                  查询
                </Button>,
              ]
        }
      />
      <Table columns={tableColumns} dataSource={dataSource} pagination={false} />
      {dataSource.length ? (
        <div className={classNames(styles['custom-pagination-container'])} style={paginationStyle}>
          {paginationLeft ? paginationLeft : null}
          <div>
            <Pagination
              pageSize={pageSize}
              current={current}
              total={total}
              onChange={handleChangeNumber}
              {...pagination}
            />
          </div>
          {paginationRight ? paginationRight : null}
        </div>
      ) : null}
    </div>
  );
};

export default ProTable;
