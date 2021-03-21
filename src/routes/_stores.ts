import { stores } from "@sapper/app";
import { writable } from "svelte/store";
import { asyncable } from "svelte-asyncable";
import { fetchJson, isBrowser } from "../helpers";
import type { IBot } from "../models/bot-model";

export const connected: any = writable(undefined);
connected.value = false;
connected.init = () => {
  stores().session.update((sess) => {
    connected.value = sess.user_id != undefined;
    connected.set(sess.user_id != undefined);
    return sess;
  });
};

function createUserStore() {
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
function createBotStore(initial) {
  const { subscribe, set } = writable(initial);
  let value = initial;
  return {
    subscribe,
    set: (newValue) => {
      value = newValue;
      set(value);
    },
    update: (updater) => {
      value = updater(value);
      set(value);
    },
    updateAsync: async (updater) => {
      value = await updater(value);
      set(value);
    },
    get: () => value,
  };
}

export const botStore = createBotStore({
  name: "",
  ip: "",
  username: "",
  actions: [],
  status: {},
  owner: "",
  health: 0,
  position: "",
  password: "",
  _id: "",
} as IBot);

export const user = createUserStore();
