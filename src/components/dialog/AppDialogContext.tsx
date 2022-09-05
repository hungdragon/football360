import React, {useState, useMemo} from 'react';
import AppDialog from './AppDialog';

export type DialogType = 'error' | 'warning' | 'info' | 'loading';
export interface IDialog {
  dialogType: DialogType;
  title: string;
  message: string;
  description?: string;
  buttonCancel?: ButtonDialog;
  buttonAccept?: ButtonDialog;
}
export interface ButtonDialog {
  label: string;
  color?: string;
  onPress?: () => unknown;
}
export interface IDialogContext {
  showDialog: (dialog: IDialog) => void;
  hideDialog: () => void;
}
const AppDialogContext = React.createContext<IDialogContext>(
  {} as IDialogContext,
);
interface Props {
  children: React.ReactNode;
}
const AppDialogProvider: React.FC<Props> = props => {
  const [mDialog, setMDialog] = useState<IDialog | undefined>(undefined);
  const _showDialog = (dialog: IDialog) => {
    setMDialog(dialog);
  };
  const _hideDialog = () => {
    setMDialog(undefined);
  };

  const dialogContext = useMemo<IDialogContext>(() => {
    return {
      showDialog: _showDialog,
      hideDialog: _hideDialog,
    };
  }, []);
  return (
    <AppDialogContext.Provider value={dialogContext} {...props}>
      {props.children}
      {mDialog ? <AppDialog dialog={mDialog} /> : null}
    </AppDialogContext.Provider>
  );
};

const useDialog = (): IDialogContext => {
  const context = React.useContext<IDialogContext>(AppDialogContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a UserProvider');
  }
  return context;
};
export {AppDialogProvider, useDialog};
