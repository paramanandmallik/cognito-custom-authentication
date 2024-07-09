exports.handler = async (event) => {
    if (event.request.challengeName === 'CUSTOM_CHALLENGE' && event.request.challengeAnswer === event.request.privateChallengeParameters.answer) {
        event.response.answerCorrect = true;
    } else {
        event.response.answerCorrect = false;
    }
    return event;
};
