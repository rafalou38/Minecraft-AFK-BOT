import { stores } from "@sapper/app";
import { writable } from "svelte/store";
import { fetchJson, isBrowser } from "../helpers";

export const connected: any = writable(undefined);
connected.value = false;
connected.init = () => {
	stores().session.update((sess) => {
		connected.value = sess.user_id != undefined;
		connected.set(sess.user_id != undefined);
		return sess;
	});
};

function createUser() {
	const { subscribe, set, update } = writable({});

	let is_not_set = true;

	return {
		subscribe: (run, invalidate?) => {
			if (is_not_set && isBrowser()) {
				fetchJson("/getUserData").then(set);
			}
			return subscribe(run, invalidate);
		},
		set: (value) => {
			console.log("set to", value);

			is_not_set = false;
			set(value);
		},
		update,
	};
}

// todo bot store

export const user = createUser();
