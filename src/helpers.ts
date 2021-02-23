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
