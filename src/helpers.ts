export function isBrowser() {
	try {
		return window != undefined;
	} catch (e) {
		return false;
	}
}

export async function fetchJson(url: string) {
	let r = await fetch(url);
	let data = await r.json();
	return data || {};
}

export function uniqueID() {
	return (
		Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
	).toUpperCase();
}

export function redirect(url: string) {
	if (isBrowser()) {
		window.location.replace(url);
	}
}
