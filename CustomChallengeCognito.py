exports.handler = async (event) => {
    if (event.request.session.length === 0) {
        event.response.publicChallengeParameters = { phone_number: event.request.userAttributes.phone_number };
        event.response.privateChallengeParameters = { answer: generateOTP() };
        event.response.challengeMetadata = "CUSTOM_CHALLENGE";
    }
    return event;
};

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}
