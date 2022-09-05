import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoView: {
    flex: 0.35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formBlock: {
    flex: 0.65,
    element: 10,
  },
  formGroupView: {
    flex: 0.85,
    backgroundColor: '#fff',
    marginHorizontal: 25,
    borderRadius: 20,
    marginVertical: 10,
  },
  userNameView: {
    margin: 15,
    backgroundColor: '#fff',
    flex: 1,
    marginTop: '10%',
  },
  userNameGroupView: {
    flexDirection: 'row',
  },
  txt_username: {
    height: 40,
    width: '100%',
  },
  IC_user: {
    position: 'absolute',
    right: '5%',
    top: '33%',
  },
  passwordGroupView: {
    flexDirection: 'row',
    marginTop: 20,
  },
  txt_password: {
    height: 40,
    width: '100%',
  },
  IC_password: {
    position: 'absolute',
    right: '5%',
    top: '33%',
  },
  txt_forgetPassword: {
    fontStyle: 'italic',
    fontFamily: 'Roboto-Thin',
    fontSize: 12,
    marginHorizontal: 10,
    padding: 5,
    textDecorationLine: 'underline',
  },
  btnLoginView: {
    marginVertical: 20,
    justifyContent: 'flex-end',
    flex: 0.7,
  },
  txt_login: {
    padding: 10,
    color: '#FFF',
    textAlign: 'center',
  },
  dontHavePasswordView: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    padding: 5,
    marginVertical: 10,
  },
  LoginOtherView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  invalidText: {
    fontSize: 12,
    color: 'red',
    marginBottom: 16,
  },
});
