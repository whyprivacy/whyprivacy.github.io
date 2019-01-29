$(document).ready(function() {

  // Set browser fingerprint attributes
  var fingerprint = {
    browser: navigator.appName,
    browserVendor: navigator.vendor,
    browserCodeName: navigator.appCodeName,
    browserProduct: navigator.product,
    browserVersionPlatform: navigator.appVersion,
    browserUserAgent: navigator.userAgent,
    canvasEnabled: isCanvasSupported(),
    colorDepth: screen.colorDepth,
    cookiesEnabled: navigator.cookieEnabled,
    cookiesPersistent: hasLocalStorage(),
    cookiesSession: hasSessionStorage(),
    cpu: [navigator.cpuClass, navigator.oscpu],
    timezone: getTimeZone(),
    dntEnabled: navigator.doNotTrack == 1,
    hostOS: navigator.platform,
    isOnline: navigator.onLine,
    language: navigator.language,
    plugins: getPlugins(),
    previousUrl: document.referrer,
    screenResolution: screen.width + " x " + screen.height,
    screenResolutionMax: screen.availWidth + " x " + screen.availHeight,
    javaEnabled: navigator.javaEnabled(),
    flashEnabled: isFlashEnabled(),
    mimeTypes: navigator.mimeTypes,
    lastVisit: lastVisit()
  };
  buildTable(document.getElementById('fingerprint'), fingerprint);



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
