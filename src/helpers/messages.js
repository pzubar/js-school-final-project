import PNotify from 'pnotify/dist/es/PNotify';
import 'pnotify/dist/es/PNotifyHistory';
import 'pnotify/dist/es/PNotifyButtons';
import 'pnotify/dist/es/PNotifyConfirm';
import 'pnotify/dist/PNotifyBrightTheme.css';

PNotify.modules.History.defaults.maxInStack = 2;

export const showErrorMessage = errorMessage =>
	PNotify.error(errorMessage.toString() || `An error occurred!`);
export const showInfoMessage = message => PNotify.info(message);

export const showPrompt = title =>
	new Promise((resolve, reject) => {
		const notice = PNotify.notice({
			title,
			text: 'Are you sure?',
			hide: false,
			modules: {
				Confirm: {
					confirm: true,
				},
				Buttons: {
					closer: false,
					sticker: false,
				},
				History: {
					history: false,
				},
			},
		});
		notice.on('pnotify.confirm', resolve);
		notice.on('pnotify.cancel', reject);
	});
