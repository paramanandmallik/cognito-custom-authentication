exports.handler = async (event) => {
    if (event.request.session && event.request.session.find(attempt => attempt.challengeName === 'CUSTOM_CHALLENGE' && attempt.challengeResult === true)) {
        event.response.finalUserStatus = 'CONFIRMED';
        event.response.messageAction = 'SUPPRESS';
        event.response.userAttributes = event.request.userAttributes;
    }
    return event;
};
