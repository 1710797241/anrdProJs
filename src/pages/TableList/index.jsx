import DeleteBtn from '@/components/CustomForm/components/ButtonList/DeleteBtn';
import EditBtn from '@/components/CustomForm/components/ButtonList/EditBtn';
import DeleteModal from '@/components/CustomForm/components/Modal/DeleteModal';
import UpdateModal from '@/components/CustomForm/components/Modal/UpdateModal';
import SearchForm from '@/components/CustomForm/SearchForm/index';
import { columnEmptyText, pagination } from '@/config/constant';
import { add, list, remove, update } from '@/services/ant-design-pro/api';
import ProTable from '@ant-design/pro-table';
import { Button, Input, message } from 'antd';
import { useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'umi';
/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */

const handleAdd = async (fields) => {
  const hide = message.loading('正在添加');

  try {
    await add({ ...fields });
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
    return false;
  }
};
/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */

const handleUpdate = async (fields) => {
  const hide = message.loading('Configuring');

  try {
    await update({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();
    message.success('Configuration is successful');
    return true;
  } catch (error) {
    hide();
    message.error('Configuration failed, please try again!');
    return false;
  }
};
/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */

const handleRemove = async (selectedRows) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {
    await remove({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('Deleted successfully and will refresh soon');
    return true;
  } catch (error) {
    hide();
    message.error('Delete failed, please try again');
    return false;
  }
};

const TableList = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalVisible, handleModalVisible] = useState(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */

  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  /**
   * 删除modal
   */
  const [deleteModalVisible, handleDeleteModalVisible] = useState(false);
  /**
   * 详情Mdoal
   */
  const [showDetail, setShowDetail] = useState(false);
  /**
   * table action
   */
  const actionRef = useRef();
  /**
   * form
   */
  const formRef = useRef();
  /**
   * search form
   */
  const searchFormRef = useRef();
  /**
   * current record
   */
  const [currentRow, setCurrentRow] = useState();
  /**
   * current selectRows
   */
  const [selectedRowsState, setSelectedRows] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const handleRequest = async (params) => {
    let searchParams = { ...params };
    try {
      if (searchFormRef && searchFormRef.current) {
        let values = await searchFormRef.current.validateFields();

        searchParams = { ...searchParams, ...values };
      }
      console.log('handleRequestsearchParams', searchParams);
      const data = await list(searchParams);
      console.log('data', data);
      return {
        data: data.data || [],
        total: data.data && data.data.length ? data.total : 0,
        success: true,
      };
    } catch (error) {
      return false;
    }
  };
  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */

  const intl = useIntl();
  const columns = [
    {
      title: (
        <FormattedMessage
          id="pages.searchTable.updateForm.ruleName.nameLabel"
          defaultMessage="Rule name"
        />
      ),
      dataIndex: 'name',
      ellipsis: true,
      width: 60,
      align: 'center',
      search: true,
      type: 'Input',
      tip: 'The rule name is the unique key',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleDesc" defaultMessage="Description" />,
      dataIndex: 'desc',
      align: 'center',
      valueType: 'textarea',
      search: false,
    },
    {
      title: (
        <FormattedMessage
          id="pages.searchTable.titleCallNo"
          defaultMessage="Number of service calls"
        />
      ),
      dataIndex: 'callNo',
      sorter: true,
      hideInForm: true,
      align: 'center',
      search: false,
      renderText: (val) =>
        `${val}${intl.formatMessage({
          id: 'pages.searchTable.tenThousand',
          defaultMessage: ' 万 ',
        })}`,
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleStatus" defaultMessage="Status" />,
      dataIndex: 'status',
      hideInForm: true,
      align: 'center',
      type: 'Select',

      labelStyle: {
        width: 56,
      },
      fieldProps: {
        width: 200,
        options: [
          {
            label: 'success',
            value: 'value',
          },
          {
            label: 'success1',
            value: 'value',
          },
          {
            label: 'success11',
            value: 'value',
          },
          {
            label: 'success111',
            value: 'value',
          },
          {
            label: 'success1111',
            value: 'value',
          },
          {
            label: 'success11111',
            value: 'value',
          },
          {
            label: 'success1111111',
            value: 'value',
          },
          {
            label: 'success1111111111',
            value: 'value',
          },
          {
            label: 'success1111111',
            value: 'value',
          },
          {
            label: 'succes1s',
            value: 'value',
          },
          {
            label: 'suc1cess',
            value: 'value',
          },
        ],
      },
      valueEnum: {
        0: {
          text: (
            <FormattedMessage
              id="pages.searchTable.nameStatus.default"
              defaultMessage="Shut down"
            />
          ),
          status: 'Default',
        },
        1: {
          text: (
            <FormattedMessage id="pages.searchTable.nameStatus.running" defaultMessage="Running" />
          ),
          status: 'Processing',
        },
        2: {
          text: (
            <FormattedMessage id="pages.searchTable.nameStatus.online" defaultMessage="Online" />
          ),
          status: 'Success',
        },
        3: {
          text: (
            <FormattedMessage
              id="pages.searchTable.nameStatus.abnormal"
              defaultMessage="Abnormal"
            />
          ),
          status: 'Error',
        },
      },
    },
    {
      title: (
        <FormattedMessage
          id="pages.searchTable.titleUpdatedAt"
          defaultMessage="Last scheduled time"
        />
      ),
      sorter: true,
      dataIndex: 'updatedAt',
      valueType: 'dateTime',

      align: 'center',
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        const status = form.getFieldValue('status');

        if (`${status}` === '0') {
          return false;
        }

        if (`${status}` === '3') {
          return (
            <Input
              {...rest}
              placeholder={intl.formatMessage({
                id: 'pages.searchTable.exception',
                defaultMessage: 'Please enter the reason for the exception!',
              })}
            />
          );
        }

        return defaultRender(item);
      },
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="Operating" />,
      dataIndex: 'option',
      valueType: 'option',
      align: 'center',
      render: (_, record) => [
        <EditBtn
          onClick={() => {
            handleUpdateModalVisible(true);
            setCurrentRow(record);
          }}
          key={'edit'}
        />,
        <DeleteBtn
          onClick={() => {
            handleDeleteModalVisible(true);
            setCurrentRow(record);
          }}
          key={'del'}
        />,
      ],
    },
  ];
  const handleSearchColumns = () => {
    return columns
      .filter((item) => item.search !== false && item.type)
      .map((item) => {
        return {
          ...item,
          name: item.name || item.dataIndex,
          labelName: item.labelName || item.title,
        };
      });
  };
  return (
    <div>
      <SearchForm
        searchFormRef={searchFormRef}
        searchColumns={handleSearchColumns()}
        span={3}
        toolBarRender={[
          <Button
            style={{ marginRight: 16 }}
            onClick={() => {
              formRef?.current.submit();
            }}
            key="search"
            type="primary"
          >
            查询
          </Button>,
          <Button htmlType="reset" key="reset">
            重置
          </Button>,
        ]}
        labelStyle={{
          width: 100,
          letterSpacing: 3,
        }}
      />
      <ProTable
        actionRef={actionRef}
        formRef={formRef}
        rowKey="key"
        search={{ optionRender: () => null }}
        toolBarRender={false}
        request={handleRequest}
        // bordered
        columns={columns}
        // rowSelection={{
        //   onChange: (_, selectedRows) => {
        //     setSelectedRows(selectedRows);
        //   },
        // }}
        columnEmptyText={columnEmptyText}
        pagination={{
          ...pagination,
        }}
      />
      <UpdateModal
        onSubmit={() => {
          setConfirmLoading(true);

          message.loading('loading', 3, () => {
            setConfirmLoading(false);
            handleUpdateModalVisible(false);
          });
        }}
        confirmLoading={confirmLoading}
        onCancel={() => {
          handleUpdateModalVisible(false);
        }}
        footerStyle={{
          paddingBottom: 20,
        }}
        visible={updateModalVisible}
      />
      <DeleteModal
        onSubmit={() => {
          handleDeleteModalVisible(false);
        }}
        onCancel={() => {
          handleDeleteModalVisible(false);
        }}
        visible={deleteModalVisible}
      />

      {/* <ModalForm
        title={intl.formatMessage({
          id: 'pages.searchTable.createForm.newRule',
          defaultMessage: 'New rule',
        })}
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value);

          if (success) {
            handleModalVisible(false);

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.ruleName"
                  defaultMessage="Rule name is required"
                />
              ),
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormTextArea width="md" name="desc" />
      </ModalForm> */}
      {/* <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value);

          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);

          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        updateModalVisible={updateModalVisible}
        values={currentRow || {}}
      /> */}

      {/* <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns}
          />
        )}
      </Drawer> */}
    </div>
  );
};

export default TableList;
