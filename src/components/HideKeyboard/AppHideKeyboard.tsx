import React from 'react';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';
interface Props {
  children: any;
}
const AppHideKeyboard: React.FC<Props> = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default AppHideKeyboard;
