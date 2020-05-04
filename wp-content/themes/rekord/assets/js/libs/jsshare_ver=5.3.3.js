JSShare = {
  go: function(element, options) {
    var self = JSShare,
      withoutPopup = ["unknown", "viber", "telegram", "whatsapp", "email"],
      tryLocation = true,
      link,
      defaultOptions = {
        type: "vk",
        fb_api_id: "",
        url: "",
        title: document.title,
        image: "",
        text: "",
        utm_source: "",
        utm_medium: "",
        utm_campaign: "",
        popup_width: 626,
        popup_height: 436
      };
    options = self._extend(
      defaultOptions,
      self._getData(element, defaultOptions),
      options
    );
    if (typeof self[options.type] == "undefined") {
      options.type = "unknown";
    }
    link = self[options.type](options);
    if (withoutPopup.indexOf(options.type) == -1) {
      tryLocation = self._popup(link, options) === null;
    }
    if (tryLocation) {
      if (element.tagName == "A" && element.tagName == "a") {
        element.setAttribute("href", link);
        return true;
      } else {
        location.href = link;
        return false;
      }
    } else {
      return false;
    }
  },
  unknown: function(options) {
    return encodeURIComponent(JSShare._getURL(options));
  },
  vk: function(options) {
    return (
      "http://vkontakte.ru/share.php?" +
      "url=" +
      encodeURIComponent(JSShare._getURL(options)) +
      "&title=" +
      encodeURIComponent(options.title) +
      "&description=" +
      encodeURIComponent(options.text) +
      "&image=" +
      encodeURIComponent(options.image) +
      "&noparse=true"
    );
  },
  ok: function(options) {
    return (
      "http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1" +
      "&st.comments=" +
      encodeURIComponent(options.text) +
      "&st._surl=" +
      encodeURIComponent(JSShare._getURL(options))
    );
  },
  fb: function(options) {
    var url = JSShare._getURL(options);
    return (
      "https://www.facebook.com/dialog/share?" +
      "app_id=" +
      options.fb_api_id +
      "&display=popup" +
      "&href=" +
      encodeURIComponent(url) +
      "&redirect_uri=" +
      encodeURIComponent(url)
    );
  },
  lj: function(options) {
    return (
      "http://livejournal.com/update.bml?" +
      "subject=" +
      encodeURIComponent(options.title) +
      "&event=" +
      encodeURIComponent(
        options.text +
          '<br/><a href="' +
          JSShare._getURL(options) +
          '">' +
          options.title +
          "</a>"
      ) +
      "&transform=1"
    );
  },
  tw: function(options) {
    var url = JSShare._getURL(options);

    return (
      "http://twitter.com/share?" +
      "text=" +
      encodeURIComponent(options.title) +
      "&url=" +
      encodeURIComponent(url) +
      "&counturl=" +
      encodeURIComponent(url)
    );
  },
  mailru: function(options) {
    return (
      "http://connect.mail.ru/share?" +
      "url=" +
      encodeURIComponent(JSShare._getURL(options)) +
      "&title=" +
      encodeURIComponent(options.title) +
      "&description=" +
      encodeURIComponent(options.text) +
      "&imageurl=" +
      encodeURIComponent(options.image)
    );
  },
  gplus: function(options) {
    return (
      "https://plus.google.com/share?url=" +
      encodeURIComponent(JSShare._getURL(options))
    );
  },
  telegram: function(options) {
    return "tg://msg_url?url=" + encodeURIComponent(JSShare._getURL(options));
  },
  whatsapp: function(options) {
    return (
      "whatsapp://send?text=" + encodeURIComponent(JSShare._getURL(options))
    );
  },
  viber: function(options) {
    return (
      "viber://forward?text=" + encodeURIComponent(JSShare._getURL(options))
    );
  },
  email: function(options) {
    return (
      "mailto:?" +
      "subject=" +
      encodeURIComponent(options.title) +
      "&body=" +
      encodeURIComponent(JSShare._getURL(options)) +
      encodeURIComponent("\n" + options.text)
    );
  },
  _getURL: function(options) {
    if (options.url == "") {
      options.url = location.href;
    }
    var url = options.url,
      utm = "";
    if (options.utm_source != "") {
      utm += "&utm_source=" + options.utm_source;
    }
    if (options.utm_medium != "") {
      utm += "&utm_medium=" + options.utm_medium;
    }
    if (options.utm_campaign != "") {
      utm += "&utm_campaign=" + options.utm_campaign;
    }
    if (utm != "") {
      url = url + "?" + utm;
    }
    return url;
  },
  _popup: function(url, _options) {
    return window.open(
      url,
      "",
      "toolbar=0,status=0,scrollbars=1,width=" +
        _options.popup_width +
        ",height=" +
        _options.popup_height
    );
  },
  _extend: function(out) {
    out = out || {};
    for (var i = 1; i < arguments.length; i++) {
      if (!arguments[i]) continue;
      for (var key in arguments[i]) {
        if (arguments[i].hasOwnProperty(key)) out[key] = arguments[i][key];
      }
    }
    return out;
  },
  _getData: function(el, defaultOptions) {
    var data = {};
    for (var key in defaultOptions) {
      var value = el.getAttribute("data-" + key);
      if (value !== null && typeof value != "undefined") {
        data[key] = value;
      }
    }
    return data;
  }
};
