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

const renderRequired = fieldProps =>
  fieldProps?.required && <span style={{ color: 'red' }}>*</span>;

const renderLabel = (fieldProps, labelStyle, labelName) => (
  <span className="custom-label-container">
    {fieldProps?.justify && renderRequired(fieldProps)}
    <span
      className={classNames(fieldProps?.justify ? 'custom-label' : '')}
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
 * @returns
 */
export const renderFormComponent = (item, form, initialValues) => {
  const { getFieldDecorator } = form;
  const {
    type,
    name,
    labelName,
    fieldProps,
    labelStyle,
    disabled,
    readonly,
    suffix,
    inline = false,
    style = {},
    inlineStyle = {},
  } = item;
  let styles = { width: fieldProps?.width || '100%' };

  let readonlySyle = readonly
    ? { backgroundColor: '#fff', cursor: 'default', color: '#0E2949' }
    : {};
  styles = Object.assign(styles, readonlySyle, style);
  switch (type) {
    case 'Input':
      return (
        <WrappedFormItem
          name={name}
          rules={fieldProps?.rules || []}
          label={renderLabel(fieldProps, labelStyle, labelName)}
        >
          {getFieldDecorator(`${name}`, {
            initialValue: initialValues[name],
          })(<Input suffix={suffix} style={{ ...styles }} disabled={!!disabled} {...fieldProps} />)}
        </WrappedFormItem>
      );
    case 'InputSelect':
      return (
        <WrappedFormItem
          name={name}
          rules={fieldProps?.rules || []}
          label={renderLabel(fieldProps, labelStyle, labelName)}
        >
          {getFieldDecorator(`${name}`, {
            initialValue: initialValues[name],
          })(<CustomInput style={{ ...styles }} disabled={!!disabled} {...fieldProps} />)}
        </WrappedFormItem>
      );
    case 'Cascader':
      return (
        <WrappedFormItem
          name={name}
          rules={fieldProps?.rules || []}
          label={renderLabel(fieldProps, labelStyle, labelName)}
        >
          {getFieldDecorator(`${name}`, {
            initialValue: initialValues[name],
          })(<Cascader style={{ ...styles }} disabled={!!disabled} {...fieldProps} />)}
        </WrappedFormItem>
      );
    case 'Upload':
      return (
        <WrappedFormItem
          name={name}
          inline={inline}
          inlineStyle={inlineStyle}
          rules={fieldProps?.rules || []}
          label={renderLabel(fieldProps, labelStyle, labelName)}
        >
          {getFieldDecorator(`${name}`, {
            initialValue: initialValues[name],
          })(<CustomUpload style={styles} {...fieldProps} />)}
        </WrappedFormItem>
      );
    case 'InputNumber':
      return (
        <WrappedFormItem
          name={name}
          rules={fieldProps?.rules || []}
          label={renderLabel(fieldProps, labelStyle, labelName)}
        >
          {getFieldDecorator(`${name}`, {
            initialValue: initialValues[name],
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
        <WrappedFormItem
          name={name}
          rules={fieldProps?.rules || []}
          label={renderLabel(fieldProps, labelStyle, labelName)}
        >
          {getFieldDecorator(`${name}`, {
            initialValue: initialValues[name],
          })(<TextArea style={styles} disabled={!!disabled} {...fieldProps} />)}
        </WrappedFormItem>
      );
    case 'Select':
      return (
        <WrappedFormItem
          name={name}
          rules={fieldProps?.rules || []}
          label={renderLabel(fieldProps, labelStyle, labelName)}
        >
          {getFieldDecorator(`${name}`, {
            initialValue: initialValues[name],
          })(<Select disabled={!!disabled} style={styles} {...fieldProps} />)}
        </WrappedFormItem>
      );
    case 'Checkbox':
      return (
        <WrappedFormItem
          name={name}
          rules={fieldProps?.rules || []}
          label={renderLabel(fieldProps, labelStyle, labelName)}
        >
          {getFieldDecorator(`${name}`, {
            initialValue: initialValues[name],
          })(<Checkbox.Group disabled={!!disabled} style={styles} {...fieldProps} />)}
        </WrappedFormItem>
      );
    case 'Radio':
      return (
        <WrappedFormItem
          name={name}
          rules={fieldProps?.rules || []}
          label={renderLabel(fieldProps, labelStyle, labelName)}
        >
          {getFieldDecorator(`${name}`, {
            initialValue: initialValues[name],
          })(<Radio.Group disabled={!!disabled} style={styles} {...fieldProps} />)}
        </WrappedFormItem>
      );
    case 'Tree':
      return (
        <WrappedFormItem
          name={name}
          rules={fieldProps?.rules || []}
          label={renderLabel(fieldProps, labelStyle, labelName)}
        >
          {getFieldDecorator(`${name}`, {
            initialValue: initialValues[name],
          })(<Tree disabled={!!disabled} style={styles} {...fieldProps} />)}
        </WrappedFormItem>
      );
    case 'TreeSelect':
      return (
        <WrappedFormItem
          name={name}
          rules={fieldProps?.rules || []}
          label={renderLabel(fieldProps, labelStyle, labelName)}
        >
          {getFieldDecorator(`${name}`, {
            initialValue: initialValues[name],
          })(<TreeSelect disabled={!!disabled} style={styles} {...fieldProps} />)}
        </WrappedFormItem>
      );
    case 'Rate':
      return (
        <WrappedFormItem
          name={name}
          rules={fieldProps?.rules || []}
          label={renderLabel(fieldProps, labelStyle, labelName)}
        >
          {getFieldDecorator(`${name}`, {
            initialValue: initialValues[name],
          })(<Rate disabled={!!disabled} style={styles} {...fieldProps} />)}
        </WrappedFormItem>
      );
    case 'Switch':
      return (
        <WrappedFormItem
          name={name}
          rules={fieldProps?.rules || []}
          label={renderLabel(fieldProps, labelStyle, labelName)}
        >
          {getFieldDecorator(`${name}`, {
            initialValue: initialValues[name],
          })(<Switch disabled={!!disabled} style={styles} {...fieldProps} />)}
        </WrappedFormItem>
      );
    case 'Slider':
      return (
        <WrappedFormItem
          name={name}
          rules={fieldProps?.rules || []}
          label={renderLabel(fieldProps, labelStyle, labelName)}
        >
          {getFieldDecorator(`${name}`, {
            initialValue: initialValues[name],
          })(<Slider disabled={!!disabled} style={styles} {...fieldProps} />)}
        </WrappedFormItem>
      );
    case 'TimePicker':
      return (
        <WrappedFormItem
          name={name}
          rules={fieldProps?.rules || []}
          label={renderLabel(fieldProps, labelStyle, labelName)}
        >
          {getFieldDecorator(`${name}`, {
            initialValue: initialValues[name],
          })(<TimePicker disabled={!!disabled} style={styles} {...fieldProps} />)}
        </WrappedFormItem>
      );
    case 'DatePicker':
      return (
        <WrappedFormItem
          name={name}
          rules={fieldProps?.rules || []}
          label={renderLabel(fieldProps, labelStyle, labelName)}
        >
          {getFieldDecorator(`${name}`, {
            initialValue: initialValues[name],
          })(<DatePicker disabled={!!disabled} style={styles} {...fieldProps} />)}
        </WrappedFormItem>
      );
    case 'RangePicker':
      return (
        <WrappedFormItem
          name={name}
          rules={fieldProps?.rules || []}
          label={renderLabel(fieldProps, labelStyle, labelName)}
        >
          {getFieldDecorator(`${name}`, {
            initialValue: initialValues[name],
          })(<RangePicker disabled={!!disabled} style={styles} {...fieldProps} />)}
        </WrappedFormItem>
      );
    default:
      return (
        <WrappedFormItem
          name={name}
          rules={fieldProps?.rules || []}
          label={renderLabel(fieldProps, labelStyle, labelName)}
        >
          {getFieldDecorator(`${name}`, {
            initialValue: initialValues[name],
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
