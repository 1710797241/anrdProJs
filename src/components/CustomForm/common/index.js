import {
  Cascader,
  Checkbox,
  DatePicker,
  Input,
  InputNumber,
  Radio,
  Rate,
  Select,
  Slider,
  Switch,
  TimePicker,
  Tree,
  TreeSelect,
} from 'antd';
import classNames from 'classnames';
import WrappedFormItem from '../components/WrappedFormItem';
import CustomInput from '../CustomInputSelect';
import CustomUpload from '../CustomIUpload';
import styles from './index.less';
const { TextArea } = Input;
const RangePicker = DatePicker.RangePicker;
const renderRequired = (fieldProps) =>
  fieldProps?.required && <span style={{ color: 'red' }}>*</span>;

const renderLabel = (fieldProps, labelStyle, labelName) => (
  <span className={classNames(styles['custom-label-container'])}>
    {fieldProps?.justify && renderRequired(fieldProps)}
    <span
      className={classNames(fieldProps?.justify ? styles['custom-label'] : '')}
      style={{
        ...labelStyle,
      }}
    >
      {!fieldProps?.justify && renderRequired(fieldProps)}
      {labelName}
    </span>
  </span>
);
/**
 *
 * @param {*} item
 * name:字段名
 * type:组件类型
 * labelName:标签名
 * labelStyle:标签css
 * disabled & readonly 禁用选择只读样式,
 * inline-- inlineStyle-upload 专用
 * fieldProps:表单属性
 * style 表单css
 * @returns
 */
export const renderFormComponent = (item, form, initialValues = {}) => {
  const { getFieldDecorator } = form;
  const {
    type,
    name,
    labelName,
    fieldProps = {},
    labelStyle,
    disabled,
    readonly,
    inline = false,
    style = {},
    inlineStyle = {},
    Component,
  } = item;

  let styles = { width: fieldProps?.width || '100%' };
  fieldProps.rules = fieldProps?.rules || [
    { required: !!fieldProps?.required, message: '此为必填' },
  ];
  let readonlySyle = readonly
    ? { backgroundColor: '#fff', cursor: 'default', color: '#0E2949' }
    : {};
  styles = Object.assign(styles, readonlySyle, style);
  switch (type) {
    case 'custom':
      return (
        <WrappedFormItem
          name={name + 'custom'}
          label={renderLabel(fieldProps, labelStyle, labelName)}
        >
          {getFieldDecorator(`${name}`, {
            initialValue: initialValues[name],

            rules: fieldProps?.rules || [],
          })(<Component style={{ ...styles }} disabled={!!disabled} {...fieldProps} />)}
        </WrappedFormItem>
      );
    case 'Input':
      return (
        <WrappedFormItem name={name} label={renderLabel(fieldProps, labelStyle, labelName)}>
          {getFieldDecorator(`${name}`, {
            initialValue: initialValues[name],

            rules: fieldProps?.rules || [],
          })(<Input style={{ ...styles }} disabled={!!disabled} {...fieldProps} />)}
        </WrappedFormItem>
      );
    case 'InputSelect':
      return (
        <WrappedFormItem name={name} label={renderLabel(fieldProps, labelStyle, labelName)}>
          {getFieldDecorator(`${name}`, {
            initialValue: initialValues[name],

            rules: fieldProps?.rules || [],
          })(<CustomInput style={{ ...styles }} disabled={!!disabled} {...fieldProps} />)}
        </WrappedFormItem>
      );
    case 'Cascader':
      return (
        <WrappedFormItem name={name} label={renderLabel(fieldProps, labelStyle, labelName)}>
          {getFieldDecorator(`${name}`, {
            initialValue: initialValues[name],
            rules: fieldProps?.rules || [],
          })(<Cascader style={{ ...styles }} disabled={!!disabled} {...fieldProps} />)}
        </WrappedFormItem>
      );
    case 'Upload':
      return (
        <WrappedFormItem
          name={name}
          inline={inline}
          inlineStyle={inlineStyle}
          label={renderLabel(fieldProps, labelStyle, labelName)}
        >
          {getFieldDecorator(`${name}`, {
            initialValue: initialValues[name],
            rules: fieldProps?.rules || [],
          })(<CustomUpload style={styles} {...fieldProps} />)}
        </WrappedFormItem>
      );
    case 'InputNumber':
      return (
        <WrappedFormItem name={name} label={renderLabel(fieldProps, labelStyle, labelName)}>
          {getFieldDecorator(`${name}`, {
            initialValue: initialValues[name],
            rules: fieldProps?.rules || [],
          })(
            <InputNumber
              placeholder={fieldProps.placeholder || ''}
              style={styles}
              disabled={!!disabled}
              {...fieldProps}
            />
          )}
        </WrappedFormItem>
      );
    case 'TextArea':
      return (
        <WrappedFormItem name={name} label={renderLabel(fieldProps, labelStyle, labelName)}>
          {getFieldDecorator(`${name}`, {
            initialValue: initialValues[name],
            rules: fieldProps?.rules || [],
          })(<TextArea style={styles} disabled={!!disabled} {...fieldProps} />)}
        </WrappedFormItem>
      );
    case 'Select':
      return (
        <WrappedFormItem name={name} label={renderLabel(fieldProps, labelStyle, labelName)}>
          {getFieldDecorator(`${name}`, {
            initialValue: initialValues[name],
            rules: fieldProps?.rules || [],
          })(<Select disabled={!!disabled} style={styles} {...fieldProps} />)}
        </WrappedFormItem>
      );
    case 'Checkbox':
      return (
        <WrappedFormItem name={name} label={renderLabel(fieldProps, labelStyle, labelName)}>
          {getFieldDecorator(`${name}`, {
            initialValue: initialValues[name],
            rules: fieldProps?.rules || [],
          })(<Checkbox.Group disabled={!!disabled} style={styles} {...fieldProps} />)}
        </WrappedFormItem>
      );
    case 'Radio':
      return (
        <WrappedFormItem name={name} label={renderLabel(fieldProps, labelStyle, labelName)}>
          {getFieldDecorator(`${name}`, {
            initialValue: initialValues[name],
            rules: fieldProps?.rules || [],
          })(<Radio.Group disabled={!!disabled} style={styles} {...fieldProps} />)}
        </WrappedFormItem>
      );
    case 'Tree':
      return (
        <WrappedFormItem name={name} label={renderLabel(fieldProps, labelStyle, labelName)}>
          {getFieldDecorator(`${name}`, {
            initialValue: initialValues[name],
            rules: fieldProps?.rules || [],
          })(<Tree disabled={!!disabled} style={styles} {...fieldProps} />)}
        </WrappedFormItem>
      );
    case 'TreeSelect':
      return (
        <WrappedFormItem name={name} label={renderLabel(fieldProps, labelStyle, labelName)}>
          {getFieldDecorator(`${name}`, {
            initialValue: initialValues[name],
            rules: fieldProps?.rules || [],
          })(<TreeSelect disabled={!!disabled} style={styles} {...fieldProps} />)}
        </WrappedFormItem>
      );
    case 'Rate':
      return (
        <WrappedFormItem name={name} label={renderLabel(fieldProps, labelStyle, labelName)}>
          {getFieldDecorator(`${name}`, {
            initialValue: initialValues[name],
            rules: fieldProps?.rules || [],
          })(<Rate disabled={!!disabled} style={styles} {...fieldProps} />)}
        </WrappedFormItem>
      );
    case 'Switch':
      return (
        <WrappedFormItem name={name} label={renderLabel(fieldProps, labelStyle, labelName)}>
          {getFieldDecorator(`${name}`, {
            initialValue: initialValues[name],
            rules: fieldProps?.rules || [],
          })(<Switch disabled={!!disabled} style={styles} {...fieldProps} />)}
        </WrappedFormItem>
      );
    case 'Slider':
      return (
        <WrappedFormItem name={name} label={renderLabel(fieldProps, labelStyle, labelName)}>
          {getFieldDecorator(`${name}`, {
            initialValue: initialValues[name],
            rules: fieldProps?.rules || [],
          })(<Slider disabled={!!disabled} style={styles} {...fieldProps} />)}
        </WrappedFormItem>
      );
    case 'TimePicker':
      return (
        <WrappedFormItem name={name} label={renderLabel(fieldProps, labelStyle, labelName)}>
          {getFieldDecorator(`${name}`, {
            initialValue: initialValues[name],
            rules: fieldProps?.rules || [],
          })(<TimePicker disabled={!!disabled} style={styles} {...fieldProps} />)}
        </WrappedFormItem>
      );
    case 'DatePicker':
      return (
        <WrappedFormItem name={name} label={renderLabel(fieldProps, labelStyle, labelName)}>
          {getFieldDecorator(`${name}`, {
            initialValue: initialValues[name],
            rules: fieldProps?.rules || [],
          })(<DatePicker disabled={!!disabled} style={styles} {...fieldProps} />)}
        </WrappedFormItem>
      );
    case 'RangePicker':
      return (
        <WrappedFormItem name={name} label={renderLabel(fieldProps, labelStyle, labelName)}>
          {getFieldDecorator(`${name}`, {
            initialValue: initialValues[name],
            rules: fieldProps?.rules || [],
          })(<RangePicker disabled={!!disabled} style={styles} {...fieldProps} />)}
        </WrappedFormItem>
      );
    default:
      return (
        <WrappedFormItem name={name} label={renderLabel(fieldProps, labelStyle, labelName)}>
          {getFieldDecorator(`${name}`, {
            initialValue: initialValues[name],
            rules: fieldProps?.rules || [],
          })(<Input style={styles} disabled={!!disabled} {...fieldProps} />)}
        </WrappedFormItem>
      );
  }
};

export const formArr = (arr, span) => {
  let arr2 = [];
  let tempArr = [];
  for (let i = 0; i < arr.length / span; i++) {
    arr2.push(arr.slice(i * span, span * (i + 1)));
  }

  return arr2;
};
