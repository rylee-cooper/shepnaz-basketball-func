import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

/**
 * This is the object that users of the Message Display will use to add a message
 * Once the Message display component mounts, it will set the messageDisplayInstance
 * so this object can talk to the component.
 * 
 * If somehow you attemp to add a message before the messageDisplayInstance has been added,
 * no message will be shown or added.
 */
export const message = {
    /****** Private ******/
    messageDisplayInstance: null,
    currentId: 0,
    get nextId() {
        return this.currentId++;
    },
    /**********************/

    /****** Public *******/
    success(message) {
        const messageId = this.nextId;
        const messageObj = {
            id: messageId,
            variant: 'success',
            text: message,
        };
        this.add(messageObj);
        return messageId;
    },
    warning(message) {
        const messageId = this.nextId;
        const messageObj = {
            id: messageId,
            variant: 'warning',
            text: message,
        };
        this.add(messageObj);
        return messageId;
    },
    info(message) {
        const messageId = this.nextId;
        const messageObj = {
            id: messageId,
            variant: 'info',
            text: message,
        };
        this.add(messageObj);
        return messageId;
    },
    error(message) {
        const messageId = this.nextId;
        const messageObj = {
            id: messageId,
            variant: 'danger',
            text: message,
        };
        this.add(messageObj);
        return messageId;
    },


    dismiss(messageId) {
        if (messageId === undefined || messageId === null) return;
        this.remove(messageId);
    },
    dismissAll() {
        this.remove();
    }
    /**********************/
};

// The names in the array are methods that are on the MessageDisplay instance.  We warp them in another method
// in case the MessageDisplay instance has not been defined yet so we won't blow up in that scenario.
['add', 'remove'].forEach(method => {
    message[method] = (...args) => {
        if (message.messageDisplayInstance) message.messageDisplayInstance[method](...args);
    }
});

/**
 * Component which actually display the messages
 */
export const MessageDisplay = withRouter(class extends Component {

    constructor(props) {
        super(props);

        this.state = {
            messages: []
        };

        this.removeHistoryListener = null;

        this.remove = this.remove.bind(this);
        this.add = this.add.bind(this);
    }

    componentDidMount() {
        const { history } = this.props;

        const self = this;
        message.messageDisplayInstance = self;

        this.removeHistoryListener = history.listen((location, action) => {
            // Remove all messages when the route changes
            self.remove();
        });
    }

    componentWillUnmount() {
        if (this.removeHistoryListener) this.removeHistoryListener();
    }

    // Add message to list
    add(messageObj) {
        this.setState({
            messages: [messageObj, ...this.state.messages]
        });
    }

    // Remove message from list
    // If id is undefined, them removes all messages from list
    remove(id) {
        this.setState({
            messages: this.state.messages.filter(m => id !== undefined && m.id !== id)
        });
    }

    render() {
        const { messages } = this.state;

        return (
            <React.Fragment>
                {messages.map(message => (
                    <Alert
                        key={message.id}
                        variant={message.variant}
                        dismissible
                        onClose={() => this.remove(message.id)}
                    >
                        {message.text}
                    </Alert>
                ))}
            </React.Fragment>
        );
    }
});