'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

const languageStrings = {
    'en': {
        translation: {
            PLAYING_YOUTUBE_VIDEO: 'Playing YouTube video',
            ERROR_MESSAGE: 'Sorry, I had trouble understanding you. You can say play Taylor Swift, or, you can say stop... What YouTube video would you like to play?',
            ERROR_MESSAGE_REPROMPT: 'You can say play Taylor Swift, or, you can say stop... What YouTube video would you like to play?',
            HELP_MESSAGE: 'You can say tell me a space fact, or, you can say exit... What can I help you with?',
            HELP_REPROMPT: 'What can I help you with?',
            STOP_MESSAGE: 'Goodbye!'
        }
    }
};

const handlers = {
    'CatchAllIntent': function () {

        const intent = this.event.request.intent;
        const catchAllSlotFilled = intent && intent.slots && intent.slots.CatchAll && intent.slots.CatchAll.value;
        if (catchAllSlotFilled) {
            const speechOutput = `${this.t('PLAYING_YOUTUBE_VIDEO')} ${catchAllSlotFilled}`;
            this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), `Some YouTube Video: ${catchAllSlotFilled}`);
        } else {
            const errorMessage = this.t('ERROR_MESSAGE');
            const errorMessageReprompt = this.t('ERROR_MESSAGE_REPROMPT');
            this.emit(':ask', errorMessage, errorMessageReprompt);
        }

    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    }
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
