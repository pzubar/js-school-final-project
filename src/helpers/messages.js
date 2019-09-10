import PNotify from 'pnotify/dist/es/PNotify';
import 'pnotify/dist/es/PNotifyHistory';
import 'pnotify/dist/es/PNotifyButtons';
import 'pnotify/dist/PNotifyBrightTheme.css';

PNotify.modules.History.defaults.maxInStack = 2;

export const showErrorMessage = errorMessage =>
	PNotify.error(errorMessage || `An error occurred!`);
export const showInfoMessage = message => PNotify.info(message);
