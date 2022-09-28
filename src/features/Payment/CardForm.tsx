// import React, {useCallback, useState} from 'react';
// import {FormProvider, useForm} from 'react-hook-form';
// import {
//   Alert,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   SafeAreaView,
//   Text,
// } from 'react-native';
// import LottieView from 'lottie-react-native';
// import CreditCardForm, {Button, FormModel} from 'rn-credit-card';
// import {useNavigation} from '@react-navigation/native';
// import {STRIPE_PUBLISHABLE_KEY} from './PaymentCardInfo';
// import {useAppSelector} from 'app/hooks';
// import {FootballApi} from 'features/book-football-pitch/FootballApi';
// const CURRENCY = 'USD';
// let CARD_TOKEN: null = null;
// const getCreditCardToken = (creditCardData: any) => {
//   // alert()
//   const card = {
//     'card[number]': creditCardData.values.number.replace(/ /g, ''),
//     'card[exp_month]': creditCardData.values.expiry.split('/')[0],
//     'card[exp_year]': creditCardData.values.expiry.split('/')[1],
//     'card[cvc]': creditCardData.values.cvc,
//   };
//   return fetch('https://api.stripe.com/v1/tokens', {
//     headers: {
//       // Use the correct MIME type for your server
//       Accept: 'application/json',
//       // Use the correct Content Type to send data to Stripe
//       'Content-Type': 'application/x-www-form-urlencoded',
//       // Use the Stripe publishable key as Bearer
//       Authorization: `Bearer ${STRIPE_PUBLISHABLE_KEY}`,
//     },
//     // Use a proper HTTP method
//     method: 'post',
//     // Format the credit card data to a string of key-value pairs
//     // divided by &
//     body: Object.keys(card)
//       .map(key => key + '=' + card[key])
//       .join('&'),
//   })
//     .then(response => response.json())
//     .catch(error => console.log(error));
// };
// function subscribeUser(creditCardToken: any) {
//   return new Promise(resolve => {
//     console.log('Credit card token\n', creditCardToken);
//     CARD_TOKEN = creditCardToken.id;
//     setTimeout(() => {
//       resolve({status: true});
//     }, 1000);
//   });
// }
// const CardForm: React.FC = () => {
//   const navigation = useNavigation();
//   const Secret_key = process.env.Secret_key;
//   console.log('Secret_key---', Secret_key);
//   const formMethods = useForm<FormModel>({
//     // to trigger the validation on the blur event
//     mode: 'onBlur',
//     defaultValues: {
//       holderName: '',
//       cardNumber: '',
//       expiration: '',
//       cvv: '',
//     },
//   });
//   const id = useAppSelector(state => state.FootballState.id); // id cua ngay dat san (_id)
//   const params = {
//     //code: code,
//     id: id,
//     idSlot: 1,
//   };
//   const back = useCallback(async () => {
//     FootballApi.football_booking(params)
//       .then(() => {
//         navigation.navigate('ModalPayment', {
//           //   ID_goback: ID_goback,
//           //   Total: Total,
//         });
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }, []);
//   const {handleSubmit, formState} = formMethods;
//   const [cardInput, setCardInput] = React.useState<boolean>(false);
//   const [loading, setLoading] = useState(false);
//   async function onSubmit(model: FormModel) {
//     Alert.alert('Success: ' + JSON.stringify(model, null, 2));
//     let creditCardToken = {
//       error: '',
//     };
//     try {
//       // Create a credit card token
//       creditCardToken = await getCreditCardToken(cardInput);
//       console.log('creditCardToken--------', creditCardToken);
//       if (creditCardToken.error) {
//         Alert.alert('creditCardToken error');
//         return;
//       }
//     } catch (e) {
//       console.log('error card info ----', e);
//       return;
//     }
//     /////
//     const error = (await subscribeUser(creditCardToken)) as string;
//     // Handle any errors from your server
//     if (error) {
//       Alert.alert(error);
//     } else {
//       let pament_data = await charges();
//       console.log('pament_data', pament_data);
//       if (pament_data.status == 'succeeded') {
//         //   Alert.alert("Thanh toán thành công:"+Total+"với ID"+ID_goback);
//         back();
//       } else {
//         Alert.alert('Thanh toán thất bại');
//         setLoading(false);
//       }
//     }
//   }

//   const charges = async () => {
//     const card = {
//       amount: 50,
//       currency: CURRENCY,
//       source: CARD_TOKEN,
//       description: 'Developers Sin Subscription',
//     };

//     return fetch('https://api.stripe.com/v1/charges', {
//       headers: {
//         // Use the correct MIME type for your server
//         Accept: 'application/json',
//         // Use the correct Content Type to send data to Stripe
//         'Content-Type': 'application/x-www-form-urlencoded',
//         // Use the Stripe publishable key as Bearer
//         Authorization: `Bearer ${Secret_key}`,
//       },
//       // Use a proper HTTP method
//       method: 'post',
//       // Format the credit card data to a string of key-value pairs
//       // divided by &
//       body: Object.keys(card)
//         .map(key => key + '=' + card[key])
//         .join('&'),
//     }).then(response => response.json());
//   };

//   //   const _onChange = (data: any) => {
//   //     setCardInput(data);
//   //   };

//   return (
//     <FormProvider {...formMethods}>
//       <SafeAreaView style={styles.container}>
//         <KeyboardAvoidingView
//           style={styles.avoider}
//           behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
//           <CreditCardForm
//             fonts={{
//               regular: 'RobotoCondensed-BoldItalic',
//               bold: 'RobotoCondensed-BoldItalic',
//             }}
//             LottieView={LottieView}
//             horizontalStart
//             overrides={{
//               labelText: {
//                 marginTop: 16,
//               },
//             }}
//           />
//         </KeyboardAvoidingView>
//         {formState.isValid && (
//           <Button
//             style={styles.button}
//             title={'CONFIRM PAYMENT'}
//             onPress={handleSubmit(onSubmit)}
//           />
//         )}
//       </SafeAreaView>
//     </FormProvider>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   avoider: {
//     flex: 1,
//     padding: 36,
//   },
//   button: {
//     margin: 36,
//     marginTop: 0,
//     backgroundColor: 'red',
//     fontFamily: 'Roboto-Regular',
//   },
// });

// export default CardForm;
