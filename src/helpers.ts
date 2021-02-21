export async function fetchJson(url: string) {
	let r = await fetch(url);
	let data = await r.json();
	return data;
}
