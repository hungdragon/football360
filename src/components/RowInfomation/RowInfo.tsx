import AppText from 'components/text/AppText';
import AppView from 'components/view/AppView';
import * as React from 'react';
import {StyleSheet} from 'react-native';
interface IRowInformation {
  label: string;
  content: string;
  color?: string;
}
const RowInfo: React.FC<IRowInformation> = ({label, content, color}) => {
  return (
    <AppView style={styles.container}>
      <AppText style={styles.labelTxt}>{label || '...'}</AppText>
      <AppText style={[styles.content, {color: color}]} boldOrLight="bold">
        {content || '...'}
      </AppText>
    </AppView>
  );
};
export default RowInfo;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
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
});
