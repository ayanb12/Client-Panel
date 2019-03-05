import { DISABLE_BALANCE_ON_EDIT, DISABLE_BALANCE_ON_ADD, ALLOW_REGISTRATION } from './types';

export const setDisableBalanceonAdd = () => {
	//get settings fromLS
	const settings = JSON.parse(localStorage.getItem('settings'))

	//Toggle
	settings.disableBalanceOnAdd = !settings.disableBalanceOnAdd

	//set back to localstorage
	localStorage.setItem('settings', JSON.stringify(settings))

	return {
		type: DISABLE_BALANCE_ON_ADD,
		payload: settings.disableBalanceOnAdd
	}
}

export const setDisableBalanceonEdit = () => {
	//get settings fromLS
	const settings = JSON.parse(localStorage.getItem('settings'))

	//Toggle
	settings.disableBalanceOnEdit = !settings.disableBalanceOnEdit

	//set back to localstorage
	localStorage.setItem('settings', JSON.stringify(settings))
	return {
		type: DISABLE_BALANCE_ON_EDIT,
		payload: settings.disableBalanceOnEdit
	}
}

export const setAllowRegistration = () => {
	//get settings fromLS
	const settings = JSON.parse(localStorage.getItem('settings'))

	//Toggle
	settings.allowRegistration = !settings.allowRegistration

	//set back to localstorage
	localStorage.setItem('settings', JSON.stringify(settings))
	return {
		type: ALLOW_REGISTRATION,
		payload: settings.allowRegistration
	}
}