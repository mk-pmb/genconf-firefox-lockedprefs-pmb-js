// -*- coding: utf-8, tab-width: 2 -*-

function joinNl() { return this.join('\n') + '\n'; }


const EX = function fmtLockedPref(opt, prefs) {
  const fmt = EX.determineFormat(+opt.ffVerMajor);
  const pair = EX.mkPairFunc(fmt);
  const data = [
    ...(fmt.head || []),
    ...Object.keys(prefs).sort().map(key => pair(key, prefs[key])),
    ...(fmt.tail || []),
  ];
  data.toString = joinNl;
  return data;
};


const ignLn1 = ('// First line always ignored, see '
  + 'http://web.archive.org/web/20210529144936/'
  + 'http://kb.mozillazine.org/Lock_Prefs');


Object.assign(EX, {

  determineFormat(major) {
    if (major >= 60) {
      // https://askubuntu.com/questions/1190507/
      // https://blog.mozilla.org/nnethercote/?p=3173
      return {
        prefTpl: 'pref(\n, \v, locked);',
        jsonizer: EX.latin1JSON,
      };
    }
    return {
      head: [ignLn1],
      prefTpl: 'lockPref(\n, \v);',
      jsonizer: EX.latin1JSON,
    };
  },

  latin1JSON(x) {
    return JSON.stringify(x).replace(/[\u007F-\uFFFF]/g, EX.uHHHH);
  },

  uHHHH(c) {
    return ('\\u' + (c.charCodeAt(0) + 0x10000
    ).toString(16).slice(1).toUpperCase());
  },

  mkPairFunc(fmt) {
    if (fmt.pair) { return fmt.pair; }
    const e = (fmt.jsonizer || JSON.stringify);
    const t = fmt.prefTpl;
    function pair(k, v) { return t.replace(/\n/g, e(k)).replace(/\v/g, e(v)); }
    return pair;
  },











});


export default EX;
