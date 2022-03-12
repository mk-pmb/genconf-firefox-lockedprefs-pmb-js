// -*- coding: utf-8, tab-width: 2 -*-

import 'p-fatal';
import 'usnam-pmb';

import eq from 'equal-pmb';

import fmtLockPrefs from '../index.mjs';


(function testAnsiEncoding() {
  const prefs = {
    'distribution.about': 'ÄǸƧÍ €ñçôðïŋğ',
    'browser.shell.checkDefaultBrowser': false,
    thisPropIgnored: undefined,
  };
  const aboutEnc = ('"\\u00C4\\u01F8\\u01A7\\u00CD '
      + '\\u20AC\\u00F1\\u00E7\\u00F4\\u00F0\\u00EF\\u014B\\u011F"');

  let data = fmtLockPrefs({ ffVerMajor: 56 }, prefs);
  eq(data[0].slice(0, 2), '//');
  eq.lines(data.slice(1), [
    'lockPref("browser.shell.checkDefaultBrowser", false);',
    ('lockPref("distribution.about", ' + aboutEnc + ');'),
  ]);

  data = fmtLockPrefs({ ffVerMajor: 60 }, prefs);
  eq.lines(data.slice(), [
    'pref("browser.shell.checkDefaultBrowser", false, locked);',
    ('pref("distribution.about", ' + aboutEnc + ', locked);'),
  ]);
}());







console.info('+OK usage tests passed.');
