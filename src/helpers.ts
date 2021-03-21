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

export function dateDiffInHours(a: Date, b: Date) {
	const utc1 = Date.UTC(
		a.getFullYear(),
		a.getMonth(),
		a.getDate(),
		a.getHours(),
		a.getMinutes()
	);
	const utc2 = Date.UTC(
		b.getFullYear(),
		b.getMonth(),
		b.getDate(),
		b.getHours(),
		b.getMinutes()
	);

	return Math.floor((utc2 - utc1) / (1000 * 60 * 60));
}
