import * as React from 'react';
import {ActivityIndicator} from 'react-native-paper';

type IProps = React.ComponentProps<typeof ActivityIndicator>;

const AppLoadingIndicator: React.FC<IProps> = (props: IProps) => {
  return <ActivityIndicator {...props} />;
};

export default AppLoadingIndicator;
