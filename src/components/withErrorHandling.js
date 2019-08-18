import React from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const withErrorHandling = WrappedComponent => ({ messages, children }) => {
    // messages.forEach(showMessage)

    return (
        <WrappedComponent>
            <NotificationContainer/>
        </WrappedComponent>
    );
};