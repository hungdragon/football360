import AppText from 'components/text/AppText';
import AppView from 'components/view/AppView';
import * as React from 'react';
import {StyleSheet} from 'react-native';
interface IRowInformation {
  label: string;
  content: string;
  color?: string;
}
const RowInfoMiddle: React.FC<IRowInformation> = ({label, content, color}) => {
  return (
    <AppView style={styles.container}>
      <AppView style={styles.leftView}>
        <AppText style={styles.labelTxt}>{label || '...'}</AppText>
      </AppView>
      <AppView style={styles.rightView}>
        <AppText style={[styles.content, {color: color}]} boldOrLight="bold">
          {content || '...'}
        </AppText>
      </AppView>
    </AppView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
  },
  labelTxt: {
    color: 'gray',
    fontSize: 16,
  },
  content: {
    fontWeight: 'bold',
    fontSize: 14,
    // textTransform: 'uppercase',
  },
  leftView: {
    width: '50%',
  },
  rightView: {
    width: '50%',
  },
});
export default RowInfoMiddle;
