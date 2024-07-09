const handler = async (event,context,callback) => {

    console.log("Create custom challenge: " + JSON.stringify(event));

    event.request.session.request.challengeResult= true;
    event.response.finalStatus = 'CONFIRMED';
    event.response.messageAction = 'SUPPRESS';

        return event
    };
    export { handler };


