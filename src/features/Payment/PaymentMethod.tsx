import {image} from 'assets/icons';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {useStripe} from '@stripe/stripe-react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import { useAppSelector } from 'app/hooks';
interface Props {
  route: any;
}
const PaymentMethod: React.FC<Props> = ({route}) => {
  const {ID_goback, Total} = route.params;
  const navigation = useNavigation();
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [loading, setLoading] = useState(false);
  const code = useAppSelector(state => state.FootballState.code);
  const id = useAppSelector(state => state.FootballState.id);
  console.log('ID123-----', ID_goback);
  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`${'http://localhost:3000'}/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const {paymentIntent, ephemeralKey, customer} = await response.json();

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    const {paymentIntent, ephemeralKey, customer, publishableKey} =
      await fetchPaymentSheetParams();

    const {error} = await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      merchantDisplayName: '',
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    // see below
    const {error} = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      //Alert.alert('Success', 'Your order is confirmed!');
      updateFootballBooking();
    }
  };
  const updateFootballBooking = async () => {
    await axios
      .post('http://localhost:3000/api/football-booking', {
        code: code,
        id: id,
        idSlot: ID_goback,
      })
      .then(() => {
        navigation.navigate('ModalPayment', {ID_goback: ID_goback});
      })
      .catch(error => {
        console.log('error--6--', error);
      });
  };
  useEffect(() => {
    initializePaymentSheet();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <TouchableOpacity
          disabled={!loading}
          style={styles.cardView}
          onPress={openPaymentSheet}>
          <Image source={image.card} style={{width: 40, height: 25}} />
          <Text style={styles.titleCard}>Master Card</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardView}>
          <Image
            source={image.momo}
            style={{width: 25, height: 25, marginHorizontal: 5}}
          />
          <Text style={styles.titleCard}>Ví Momo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardView}>
          <FontAwesomeIcon
            name="credit-card-alt"
            size={22}
            style={{marginHorizontal: 5}}
          />
          <Text style={styles.titleCard}>Master Card</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: '80%',
    // backgroundColor:'red'
  },
  cardView: {
    flexDirection: 'row',
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 10,
    elevation: 3,

    alignItems: 'center',
  },
  titleCard: {
    fontSize: 16,
  },
});
export default PaymentMethod;
