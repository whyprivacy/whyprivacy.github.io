$(document).ready(function() {

  // Set browser fingerprint attributes
  var fingerprint = {
    browser: navigator.appName,
    bVendor: navigator.vendor,
    bCodeName: navigator.appCodeName,
    bProduct: navigator.product,
    bPlatform: navigator.appVersion,
    bUserAgent: navigator.userAgent,
    canvasEnabled: isCanvasSupported(),
    colorDepth: screen.colorDepth,
    cookiesEnabled: navigator.cookieEnabled,
    cookPersistent: hasLocalStorage(),
    cookSession: hasSessionStorage(),
    cpu: [navigator.cpuClass, navigator.oscpu],
    timezone: getTimeZone(),
    dntEnabled: navigator.doNotTrack == 1,
    hostOS: navigator.platform,
    isOnline: navigator.onLine,
    language: navigator.language,
    plugins: getPlugins(),
    previousUrl: document.referrer,
    screenRes: screen.width + " x " + screen.height,
    screenResMax: (screen.width != screen.availWidth)? screen.availWidth + " x " + screen.availHeight : '',
    javaEnabled: navigator.javaEnabled(),
    flashEnabled: isFlashEnabled(),
    mimeTypes: getMimeTypes(),
    lastVisit: lastVisit()
  };
  buildTable(document.getElementById('fingerprint'), fingerprint);
console.log(navigator.mimeTypes);


  function hasLocalStorage() {
    try {
      return !!window.localStorage;
    } catch (e) {
      return true; // SecurityError when referencing it means it exists
    }
  }

  function hasSessionStorage() {
    try {
      return !!window.sessionStorage;
    } catch (e) {
      return true; // SecurityError when referencing it means it exists
    }
  }

  function isCanvasSupported() {
    var elem = document.createElement('canvas');
    try {
      return !!(elem.getContext && elem.getContext('2d'));
    } catch (e) {
      return false;
    }
  }

  function isDntEnabled() {
    try {
      return !!navigator.doNotTrack;
    } catch (e) {
      return false;
    }
  }

  function getPlugins() {
    var pluginsList = "";

    for (var i = 0; i < navigator.plugins.length; i++) {
      if (i == navigator.plugins.length - 1) {
        pluginsList += navigator.plugins[i].name;
      } else {
        pluginsList += navigator.plugins[i].name + ", ";
      }
    }
    return pluginsList;
  }

  function isFlashEnabled() {
    var objPlugin = navigator.plugins["Shockwave Flash"];
    if (objPlugin) {
      return true;
    }
    return false;
  }

  function getTimeZone() {
    var rightNow = new Date();
    return String(String(rightNow).split("(")[1]).split(")")[0];
  }

  function getMimeTypes() {
    var mimeTypes = navigator.mimeTypes,
        str = '';
    for (var i = 0; i < mimeTypes.length; i++) {
      str += mimeTypes[i].enabledPlugin.name;
      str += (i < mimeTypes.length - 1)? ', ' : '';
    }
    return str;
  }

  // Display last cookie date in table, update cookie with new date
  function lastVisit() {
    var lastVisit = document.cookie,
        thisVisit = new Date(),
        expireDate = new Date();

    // Set expire date for a month from now
    expireDate.setMonth(expireDate.getMonth() + 1);

    // Encode date to remove whitespace
    thisVisit = escape(thisVisit.toLocaleString());

    // Overwrite cookie with new date
    document.cookie = 'lastVisit=' + thisVisit + ';expires=' + expireDate.toUTCString() + ';';

    // Return date of last visit
    if (lastVisit.length != 0 || lastVisit != '') {
      return unescape(lastVisit.substring(10));
    }
    return '';
  }
});
