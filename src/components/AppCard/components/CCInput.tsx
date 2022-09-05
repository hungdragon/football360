import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const s = StyleSheet.create({
  baseInputStyle: {
    color: 'black',
  },
});
type Props = {
  field: string;
  label: string;
  value: string;
  placeholder: string;
  keyboardType: string;

  status: 'valid' | 'invalid' | 'incomplete';

  containerStyle: any;
  inputStyle: any;
  labelStyle: any;
  validColor: string;
  invalidColor: string;
  placeholderColor: string;
  onFocus: any; //func
  onChange: any; //func
  onBecomeEmpty: any; //func
  onBecomeValid: any; //func
  additionalInputProps: any;
};
const CCInput: React.FC<Props> = props => {
  useEffect(() => {
    const {status, value, onBecomeEmpty, onBecomeValid, field} = props;
    if (value !== '') {
      onBecomeEmpty(field);
    }
    if (status !== 'valid') {
      onBecomeValid(field);
    }
  }, []);
  const refs = useRef();
  const focus = () => refs.input.focus();
  const _onFocus = () => props.onFocus(props.field);
  const _onChange = value => props.onChange(props.field, value);
  const {
    label,
    value,
    placeholder,
    status,
    keyboardType,
    containerStyle,
    inputStyle,
    labelStyle,
    validColor,
    invalidColor,
    placeholderColor,
    additionalInputProps,
  } = props;
  return (
    <TouchableOpacity onPress={focus} activeOpacity={0.99}>
      <View style={[containerStyle]}>
        {!!label && <Text style={[labelStyle]}>{label}</Text>}
        <TextInput
          ref="input"
          {...additionalInputProps}
          keyboardType={keyboardType}
          autoCapitalise="words"
          autoCorrect={false}
          style={[
            s.baseInputStyle,
            inputStyle,
            validColor && status === 'valid'
              ? {color: validColor}
              : invalidColor && status === 'invalid'
              ? {color: invalidColor}
              : {},
          ]}
          underlineColorAndroid={'transparent'}
          placeholderTextColor={placeholderColor}
          placeholder={placeholder}
          value={value}
          onFocus={_onFocus}
          onChangeText={_onChange}
        />
      </View>
    </TouchableOpacity>
  );
};
export default CCInput;
