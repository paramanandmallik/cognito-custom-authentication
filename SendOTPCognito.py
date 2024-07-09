export const handler = async (event) => {
    // Check if the user signed in using phone number (assuming phone_number is present)
    if (event.request.userAttributes['phone_number']) {
        // Send OTP if the method is mobile number
        if (event.triggerSource === 'PostAuthentication_Authentication') {
            const otp = generateOTP();
            // Simulating sending an OTP
            console.log(`Your OTP code is ${otp}`);
            // Here you would integrate with an SMS service to send the OTP to the user
        }
    } else {
        // Handle username and password login (no OTP needed)
        console.log('User authenticated using username and password.');
    }
    
    // Ensure the function returns the event object
    return event;
};

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}
