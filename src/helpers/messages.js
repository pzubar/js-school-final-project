import PNotify from 'pnotify/dist/es/PNotify';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons';
import "pnotify/dist/PNotifyBrightTheme.css"

export const showErrorMessage = () => PNotify.error('An error occurred');
export const showInfoMessage = message => PNotify.info(message);