import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';

console.log(Auth);


function CustomSignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [useEmailLogin, setUseEmailLogin] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSignIn = async () => {
        try {
            if (otpSent) {
                // Verify OTP
                await Auth.sendCustomChallengeAnswer(phone, otp);
                setErrorMessage(''); // Clear error message on successful OTP verification
            } else if (useEmailLogin && username && password) {
                // Email and Password login
                await Auth.signIn(username, password);
                setErrorMessage(''); // Clear error message on successful sign-in
            } else if (!useEmailLogin && phone) {
                // Initiate OTP login
                const user = await Auth.signIn(phone);
                if (user.challengeName === 'CUSTOM_CHALLENGE') {
                    setOtpSent(true);
                    setErrorMessage(''); // Clear error message on successful OTP initiation
                }
            } else {
                setErrorMessage('Please fill out the required fields.');
            }
        } catch (error) {
            console.error('Error during sign-in', error);
            setErrorMessage('Error during sign-in: ' + error.message);
        }
    };

    const handleToggleLoginMethod = () => {
        setUseEmailLogin(!useEmailLogin);
        setOtpSent(false);
        setErrorMessage('');
        setUsername('');
        setPassword('');
        setPhone('');
        setOtp('');
    };

    return (
        <div className="App">
            <Authenticator>
                <div className='login-container'>
                    <h1>Custom Sign In</h1>
                    <button onClick={handleToggleLoginMethod}>
                        {useEmailLogin ? 'Use Phone Number' : 'Use Email/Password'}
                    </button>
                    {!otpSent ? (
                        <div>
                            {useEmailLogin ? (
                                <>
                                    <input
                                        type="text"
                                        placeholder="Email or Username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </>
                            ) : (
                                <>
                                    <input
                                        type="tel"
                                        placeholder="Phone Number"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </>
                            )}
                            <button onClick={handleSignIn}>Sign In</button>
                        </div>
                    ) : (
                        <div>
                            <input
                                type="text"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                            <button onClick={handleSignIn}>Verify OTP</button>
                        </div>
                    )}
                    {errorMessage && <p className="error">{errorMessage}</p>}
                </div>
            </Authenticator>
        </div>
    );
}

export default CustomSignIn;
