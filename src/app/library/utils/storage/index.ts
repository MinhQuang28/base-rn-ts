/* eslint-disable @typescript-eslint/no-explicit-any */
import {MMKVOption, MMKVStorage} from '@common';
import {StyleSheet} from 'react-native';
const appName = 'APP_Name';
const AppKey = '7268428d-d814-4eca-8829-3dbe0e2eaa7a';

const optionMMKV: MMKVOption = {
  id: appName,
  cryptKey: AppKey,
};

/**
 * Loads a string from storage.
 *
 * @param key The key to fetch.
 */
export async function loadString(key: string, option?: MMKVOption) {
  try {
    return await MMKVStorage.getString(
      key,
      StyleSheet.flatten([optionMMKV, option]),
    );
  } catch {
    // not sure why this would fail... even reading the RN docs I'm unclear
    return null;
  }
}

/**
 * Saves a string to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export async function saveString(
  key: string,
  value: string,
  option?: MMKVOption,
) {
  try {
    await MMKVStorage.setString(
      key,
      value,
      StyleSheet.flatten([optionMMKV, option]),
    );
    return true;
  } catch {
    return false;
  }
}

/**
 * Loads something from storage and runs it thru JSON.parse.
 *
 * @param key The key to fetch.
 */
export async function load(key: string, option?: MMKVOption) {
  try {
    const almostThere = await MMKVStorage.getString(
      key,
      StyleSheet.flatten([optionMMKV, option]),
    );
    return typeof almostThere === 'string' ? JSON.parse(almostThere) : null;
  } catch {
    return null;
  }
}

/**
 * Saves an object to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export async function save(key: string, value: any, option?: MMKVOption) {
  try {
    await MMKVStorage.setString(
      key,
      JSON.stringify(value),
      StyleSheet.flatten([optionMMKV, option]),
    );
    return true;
  } catch {
    return false;
  }
}

/**
 * Removes something from storage.
 *
 * @param key The key to kill.
 */
export async function remove(key: string, option?: MMKVOption) {
  try {
    await MMKVStorage.delete(key, StyleSheet.flatten([optionMMKV, option]));
  } catch {}
}

interface Storage {
  getItem(key: string, ...args: Array<any>): any;
  setItem(key: string, value: any, ...args: Array<any>): any;
  removeItem(key: string, ...args: Array<any>): any;
}
export const reduxPersistStorage: Storage = {
  setItem: async (key: string, value: string | number | boolean) => {
    if (typeof value === 'string') {
      await MMKVStorage.setString(key, value, optionMMKV);
    }
    if (typeof value === 'boolean') {
      await MMKVStorage.setBoolean(key, value, optionMMKV);
    }
    if (typeof value === 'number') {
      await MMKVStorage.setNumber(key, value, optionMMKV);
    }
    return Promise.resolve(true);
  },
  getItem: async (key: string) => {
    const res = await MMKVStorage.getString(key, optionMMKV);
    return Promise.resolve(res);
  },
  removeItem: async (key: string) => {
    await MMKVStorage.delete(key, optionMMKV);
    return Promise.resolve();
  },
};