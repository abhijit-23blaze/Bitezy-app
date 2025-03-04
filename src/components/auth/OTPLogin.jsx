import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setCustomerInformation } from '../../redux/store';
import authService from '../../services/authService';

const OTPLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(0);
  
  const navigation = useNavigation();
  const dispatch = useDispatch();
  
  // References for OTP inputs
  const inputRefs = useRef([]);
  
  // Handle phone number input
  const handlePhoneNumberChange = (text) => {
    // Only allow numbers
    const formattedText = text.replace(/[^0-9]/g, '');
    setPhoneNumber(formattedText);
  };
  
  // Handle OTP input
  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    
    // Auto-focus next input
    if (text && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };
  
  // Handle backspace in OTP input
  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
  
  // Request OTP
  const requestOTP = async () => {
    if (phoneNumber.length < 10) {
      setError('Please enter a valid phone number');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const result = await authService.requestOTP(phoneNumber);
      
      if (result.success) {
        setOtpSent(true);
        startCountdown();
      } else {
        setError(result.message || 'Failed to send OTP');
      }
    } catch (err) {
      console.error('OTP request error:', err);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };
  
  // Verify OTP
  const verifyOTP = async () => {
    const otpValue = otp.join('');
    
    if (otpValue.length !== 4) {
      setError('Please enter the complete OTP');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const result = await authService.loginWithOTP(phoneNumber, otpValue);
      
      if (result.success) {
        dispatch(setCustomerInformation(result.user));
        navigation.navigate('Home');
      } else {
        setError(result.message || 'Invalid OTP');
      }
    } catch (err) {
      console.error('OTP verification error:', err);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };
  
  // Start countdown for OTP resend
  const startCountdown = () => {
    setCountdown(30);
    const timer = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);
  };
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          <View style={styles.logoPlaceholder} />
          <Text style={styles.logoText}>Bitezy</Text>
        </View>
        
        <View style={styles.formContainer}>
          <Text style={styles.title}>Login with OTP</Text>
          <Text style={styles.subtitle}>
            {otpSent 
              ? 'Enter the OTP sent to your phone'
              : 'We\'ll send you a one-time password to your phone'
            }
          </Text>
          
          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}
          
          {!otpSent ? (
            // Phone number input
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Phone Number</Text>
              <View style={styles.phoneInputContainer}>
                <Text style={styles.countryCode}>+91</Text>
                <TextInput
                  style={styles.phoneInput}
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChangeText={handlePhoneNumberChange}
                  keyboardType="phone-pad"
                  maxLength={10}
                />
              </View>
              
              <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={requestOTP}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#ffffff" />
                ) : (
                  <Text style={styles.buttonText}>Send OTP</Text>
                )}
              </TouchableOpacity>
            </View>
          ) : (
            // OTP input
            <View style={styles.inputContainer}>
              <Text style={styles.label}>One-Time Password</Text>
              <View style={styles.otpContainer}>
                {[0, 1, 2, 3].map((index) => (
                  <TextInput
                    key={index}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    style={styles.otpInput}
                    value={otp[index]}
                    onChangeText={(text) => handleOtpChange(text, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    keyboardType="number-pad"
                    maxLength={1}
                  />
                ))}
              </View>
              
              <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={verifyOTP}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#ffffff" />
                ) : (
                  <Text style={styles.buttonText}>Verify OTP</Text>
                )}
              </TouchableOpacity>
              
              {countdown > 0 ? (
                <Text style={styles.countdownText}>
                  Resend OTP in {countdown} seconds
                </Text>
              ) : (
                <TouchableOpacity 
                  onPress={requestOTP}
                  disabled={loading}
                >
                  <Text style={styles.resendText}>Resend OTP</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
          
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.footerLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          
          {otpSent && (
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => setOtpSent(false)}
            >
              <Text style={styles.backButtonText}>← Back to Phone Number</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  logoPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f97316',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f97316',
  },
  formContainer: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1f2937',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 32,
  },
  errorContainer: {
    backgroundColor: '#fee2e2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 14,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#374151',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    backgroundColor: '#f9fafb',
    marginBottom: 20,
  },
  countryCode: {
    paddingHorizontal: 12,
    paddingVertical: 14,
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    borderRightWidth: 1,
    borderRightColor: '#d1d5db',
  },
  phoneInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpInput: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    backgroundColor: '#f9fafb',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#f97316',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    height: 56,
    justifyContent: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#fdba74',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  countdownText: {
    textAlign: 'center',
    color: '#6b7280',
    marginBottom: 20,
  },
  resendText: {
    textAlign: 'center',
    color: '#f97316',
    fontWeight: '500',
    marginBottom: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#6b7280',
    fontSize: 16,
  },
  footerLink: {
    color: '#f97316',
    fontSize: 16,
    fontWeight: '500',
  },
  backButton: {
    marginTop: 20,
    alignSelf: 'center',
  },
  backButtonText: {
    color: '#6b7280',
    fontSize: 16,
  },
});

export default OTPLogin; 