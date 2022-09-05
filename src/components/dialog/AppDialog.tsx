
import AppLoadingIndicator from 'components/loading-indiacator/AppLoadingIndicator';
import AppText from 'components/text/AppText';
import AppTouchableOpacity from 'components/touchable-opacity/AppTouchableOpacity';
import AppView from 'components/view/AppView';
import React from 'react';
import {Modal, StyleSheet} from 'react-native';
import {translate} from 'utils';
import {IDialog, useDialog} from './AppDialogContext';

export type AppDialogProps = {
  dialog: IDialog;
};
export const AppDialog: React.FC<AppDialogProps> = ({dialog}) => {
  const {dialogType, title, message, buttonAccept, buttonCancel} = dialog;
  const {hideDialog} = useDialog();
  const _onCancel = () => {
    if (buttonCancel) {
      const {onPress} = buttonCancel;
      if (onPress) {
        onPress();
      }
    }
    hideDialog();
  };
  const _onAccept = () => {
    if (buttonAccept) {
      const {onPress} = buttonAccept;
      if (onPress) {
        onPress();
      }
    }
    hideDialog();
  };
  const translateMessage = () => {
    if (message === 'Network Error') {
      return translate('network_error');
    }
    return message;
  };
  const showTitle = () => {
    if (dialogType !== 'warning') {
      return (
        <AppView style={styles.titleContainer}>
          <AppText boldOrLight="bold" style={styles.titleStyle}>
            {title}
          </AppText>
        </AppView>
      );
    }
    return <AppView style={[styles.titleContainer, styles.flex01]} />;
  };
  const showIcon = () => {
    // if (dialogType === 'warning') {
    //   return <AppImage style={styles.iconError} source={} />;
    // }
    return null;
  };

  const showLoading = () => {
    if (dialogType === 'loading') {
      return (
        <AppView
        //style={{marginTop: 16}}
        >
          <AppLoadingIndicator />
        </AppView>
      );
    }
    return null;
  };
  return (
    <Modal
      animationType={'fade'}
      transparent={true}
      visible={true}
      onRequestClose={() => {}}>
      <AppView style={styles.modalContainer}>
        <AppView style={styles.alertContainer}>
          <AppView style={styles.alerContent}>
            {showTitle()}
            {showIcon()}
            <AppView style={styles.messageContainer}>
              <AppText style={styles.messageStyle}>
                {translateMessage()}
              </AppText>
            </AppView>
            {showLoading()}
            <AppView style={styles.buttonContainer}>
              {buttonCancel ? (
                <AppTouchableOpacity
                  style={[
                    styles.buttonCancel,
                    {backgroundColor: buttonCancel?.color},
                  ]}
                  onPress={_onCancel}>
                  <AppText style={styles.textCancelStyle}>
                    {buttonCancel?.label}
                  </AppText>
                </AppTouchableOpacity>
              ) : null}
              {buttonCancel ? <AppView style={styles.whiteSpace} /> : null}
              {buttonAccept ? (
                <AppTouchableOpacity
                  style={[
                    styles.buttonAccept,
                    {backgroundColor: buttonAccept.color},
                  ]}
                  onPress={_onAccept}>
                  <AppText style={styles.textAcceptStyle}>
                    {buttonAccept?.label}
                  </AppText>
                </AppTouchableOpacity>
              ) : null}
            </AppView>
          </AppView>
        </AppView>
      </AppView>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  whiteSpace: {
    width: 16,
  },
  alertContainer: {},
  alerContent: {
    minWidth: 300,
    minHeight: 150,
    borderRadius: 8,
    padding: 16,
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  titleContainer: {
    marginTop: 6,
    justifyContent: 'center',
  },
  flex01: {
    flex: 0.1,
  },
  messageContainer: {
    marginTop: 12,
    marginHorizontal: 32,
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 24,
    flexDirection: 'row',
  },
  titleStyle: {
    fontSize: 16,
    color: 'black',
  },
  messageStyle: {
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
    letterSpacing: 0,
  },
  buttonCancel: {
    backgroundColor: '#EFF2FE',
    elevation: 2,
    borderRadius: 6,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
  },
  cancel: {
    minWidth: 130,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  buttonLabel: {
    fontSize: 14,
    letterSpacing: 0,
  },
  buttonAccept: {
    borderRadius: 6,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
  },
  message: {
    marginBottom: 16,
    textAlign: 'center',
  },
  iconError: {
    height: 60,
    width: 60,
  },
  textAcceptStyle: {
    fontSize: 14,
    color: 'white',
  },
  textCancelStyle: {
    fontSize: 14,
    color: 'black',
  },
});

export default AppDialog;
