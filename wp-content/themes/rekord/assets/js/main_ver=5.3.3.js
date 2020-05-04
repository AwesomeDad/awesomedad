/*
	| ----------------------------------------------------------------------------------
	| PRELOADER - JS
	| ----------------------------------------------------------------------------------
  */
document.addEventListener("DOMContentLoaded", function () {
  NProgress.start();
});
window.addEventListener(
  "load",
  function () {
    var body = document.body;
    var loader = document.getElementById("loader");
    body.classList.add("loaded");
    loader.classList.add("loader-fade");
    NProgress.done();
  },
  true
);

jQuery(document).ready(function ($) {
  "use strict";
  /*
	| ----------------------------------------------------------------------------------
	| MENU ADD ACTIVE CLASS
	| ----------------------------------------------------------------------------------
  */

  if ($(".sidebar-menu > .menu-item-has-children > a").length) {
    $(".sidebar-menu > .menu-item-has-children > a").attr("href", "#");
  }

  $(".sidebar ul li").on("click", function (e) {
    $(".sidebar li").removeClass("active");
    $(this).addClass("active");
  });

  /*
	| ----------------------------------------------------------------------------------
	| POPOVER PLUGIN
	| ----------------------------------------------------------------------------------
	*/
  var poper = function () {
    if ($('[data-toggle="popover"]').length)
      $('[data-toggle="popover"]').popover();
  };

  /*
	| ----------------------------------------------------------------------------------
	| LIGHT SLIDER PLUGIN
	| ----------------------------------------------------------------------------------
	*/
  window.lightSlider = function () {
    var rtl = false;
    if ($('html[dir="rtl"]').length) {
      rtl = true;
    }
    var light = $(".lightSlider");
    light.each(function () {
      var $this = $(this);
      $this.lightSlider({
        verticalHeight: $this.data("vertical-height"),
        autoWidth: $this.data("auto-width"),
        slideWidth: $this.data("slide-width"),
        centerSlide: $this.data("center-slide"),
        gallery: $this.data("gallery"),
        thumbItem: $this.data("thumbs"),
        thumbMargin: $this.data("margin"),
        item: $this.data("item"),
        loop: $this.data("loop"),
        mode: $this.data("mode"),
        rtl: rtl,
        speed: $this.data("speed"),
        auto: $this.data("auto"),
        pause: $this.data("pause"),
        enableDrag: $this.data("drag"),
        pauseOnHover: $this.data("pause-on-hover"),
        pager: $this.data("pager"),
        slideMargin: $this.data("slide-margin"),
        vThumbWidth: 80,
        currentPagerPosition: $this.data("position"),
        controls: $this.data("controls"),
        prevHtml: '<span class="icon icon-angle-left"></span>',
        nextHtml: '<span class="icon icon-angle-right"></span>',
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              item: $this.data("item-lg"),
              slideMove: 1,
              slideMargin: 6
            }
          },
          {
            breakpoint: 768,
            settings: {
              item: $this.data("item-md"),
              slideMove: 1,
              slideMargin: 6
            }
          },
          {
            breakpoint: 480,
            settings: {
              item: $this.data("item-sm"),
              slideMove: 1
            }
          }
        ],
        onSliderLoad: function (el) {
          if ($this.data("start")) {
            $this.goToSlide($this.data("start"));
          }
          $this.addClass("showSlider");

          el.find(".lslide .animated").addClass("go");
        },

        onBeforeNextSlide: function (el) {
          el.find(".lslide .animated").removeClass("go");
        },
        onAfterSlide: function (el) {
          el.find(".lslide .animated").addClass("go");
        }
      });
    });
  };

  /*
	| ----------------------------------------------------------------------------------
	| LIGHT GALLERY PLUGIN
	| ----------------------------------------------------------------------------------
	*/

  var lightGallery = function () {
    if ($(".lightGallery").length > 0) {
      var ele = $(".lightGallery");
      ele.lightGallery({
        selector: ".light-post"
      });
    }
  };

  /*
	| ----------------------------------------------------------------------------------
	| WAVESURFER PLUGIN
	| ----------------------------------------------------------------------------------
  */

  var wavesurfer;
  var warveSurferInit = function () {
    var ele = $("#waveform");
    var progressColor = "#ff1744";
    if (ele.length > 0) {
      if (ele.data("color") != "") {
        progressColor = ele.data("progressColor");
      }
      wavesurfer = WaveSurfer.create({
        container: "#waveform",
        backend: "MediaElement",
        waveColor: $("#app").hasClass("theme-dark") ? "#243049" : "#ecf0f5",
        progressColor: progressColor,
        height: 50,
        responsive: false,
        barWidth: ele.data("barWidth"),
        normalize: true
      });
    }


    ////////////////


    ////////



    /////////////////
    // // Bind controls
    if ($("#playPause").length > 0) {


      var toggleMainPlayButton = function () {
        if (wavesurfer.isPlaying()) {
          document.querySelector("#play").style.display = "none";
          document.querySelector("#pause").style.display = "";
          $(".music_pseudo_bars").show();
        } else {
          document.querySelector("#play").style.display = "";
          document.querySelector("#pause").style.display = "none";
          $(".music_pseudo_bars").hide();

        }
      }

      var toggleCurrentPlayingButton = function (iconElement) {

        $("a.media-url i").removeClass("icon-pause").addClass('icon-play');
        // $(".media-url").removeClass("active");

        if (wavesurfer.isPlaying()) {
          iconElement
            .removeClass("icon-play")
            .addClass("icon-pause");


        } else {
          iconElement
            .removeClass("icon-pause")
            .addClass("icon-play");

        }
      }

      var resetActiveTracks = function () {
        wavesurfer.pause();
        $(".playlist .media-url.active i")
          .removeClass("icon-pause")
          .addClass("icon-play");
        $(".playlist .media-url").removeClass('active');
      }

      var playPause = document.querySelector("#playPause");

      playPause.addEventListener("click", function () {
        wavesurfer.playPause();
        toggleMainPlayButton();
        toggleCurrentPlayingButton($(".playlist a.active i"));
      });


      var activeCurrentlyPlayingTrack = function () {
        $(".playlist a.active i")
          .removeClass("icon-play")
          .addClass("icon-pause");

      }

      // Toggle play/pause text
      wavesurfer.on("play", function () {
        document.querySelector("#play").style.display = "none";
        document.querySelector("#pause").style.display = "";
        activeCurrentlyPlayingTrack();
        $(".music_pseudo_bars").show();
      });
    }



    if ($(".playlist .media-url").length > 0) {
      // The playlist links
      var links = $(".playlist .media-url");
      var currentTrack = 0;
      var setTrackTitle = function (url) {
        var $trackImage = "";
        var $thisTrack = "";
        var $trackTitle = "";
        var $trackPermalink = "";
        var $trackTime = "";


        $thisTrack = $("a[href='" + url + "'].media-url")
          .closest("li")
          .first();

        $trackPermalink = $("a[href='" + url + "'].media-url").data(
          "permalink"
        );
        $trackTime = $("a[href='" + url + "'].media-url").data("time");
        $trackTitle = $("a[href='" + url + "'].media-url").data("title");
        $trackImage = $("a[href='" + url + "'].media-url").data("thumbnail");


        //Update in player bar
        var $activeTrack =
          '<a href="' +
          $trackPermalink +
          '"><div class="avatar-md mr-3"><img class="r-3" width="65" height="65" src="' +
          $trackImage +
          '" alt="" /></div></a>';
        $(".active-track").html($activeTrack);

        //Show Notification
        var $trackNotification =
          '<div class="d-flex"><div class="float-left">' +
          $activeTrack +
          '</div><div><h6><a href="' +
          $trackPermalink +
          '">' +
          $trackTitle +
          "</a></h6><small>" +
          $trackTime +
          "</small></div></div>";
        Snackbar.show({
          text: $trackNotification,
          pos: "top-right",
          actionTextColor: "red",
          backgroundColor: "#0c101b",

          actionText: '<i class="icon-close"></i>',

        });
      };

      //   //Player Actions

      var nextTrackSelector = $("#nextTrack");
      var prevTrackSelector = $("#previousTrack");

      var disablePrevNextBtn = function (track) {
        if (track === 0) {
          prevTrackSelector.addClass("disabled");
        } else {
          prevTrackSelector.removeClass("disabled");
        }
        if (track === links.length) {
          nextTrackSelector.addClass("disabled");
        } else {
          nextTrackSelector.removeClass("disabled");
        }
      };

      var nextTrack = function () {

        resetActiveTracks();
        if (currentTrack <= links.length) {
          setCurrentSong((currentTrack + 1) % links.length);
        }
      };

      var previousTrack = function () {
        resetActiveTracks();
        if (currentTrack > 0) {
          setCurrentSong((currentTrack - 1) % links.length);
        }
      };

      var playTrack = function () {
        setTimeout(function () {
          wavesurfer.play();
        }, 1000);
      };


      nextTrackSelector.on("click", function (e) {
        e.preventDefault();
        nextTrack();
        playTrack();
      });
      prevTrackSelector.on("click", function (e) {
        e.preventDefault();
        previousTrack();
        playTrack();
      });

      window.playlistLoop = function (links) {

        Array.prototype.forEach.call(links, function (link, index) {
          link.addEventListener("click", function (e) {
            e.preventDefault();

            //Making sure we are selecting i tag so that we can change class
            var iconElement = $(e.target);
            if ($(e.target).hasClass('media-url')) {
              iconElement = $(e.target).children('i');
            }


            //Check if play or paused current running track
            if (window.currentTrack == index) {
              wavesurfer.playPause();
              toggleMainPlayButton();
              toggleCurrentPlayingButton(iconElement)


            } else { // else if clicked on any other track 
              $("a.media-url i").removeClass("icon-pause").addClass('icon-play');
              $(".media-url").removeClass("active");
              links[index].classList.add("active");
              $(".playlist a.active i")
                .removeClass("icon-play")
                .addClass("icon-pause");
              window.setCurrentSong(index);
              playTrack();
            }


          });
        });
      };


      // Load a track by index and highlight the corresponding link
      var setCurrentSong = (window.setCurrentSong = function (index) {
        disablePrevNextBtn(index);
        links = $(".playlist .media-url");
        currentTrack = index;
        links[currentTrack].classList.remove("active");
        links[currentTrack].classList.add("active");
        var waveUrl = links[currentTrack].dataset.wave;

        if (waveUrl !== undefined) {
          $.getJSON(waveUrl, function (data) {
            wavesurfer.load(links[currentTrack].href, data.data);
            $("#waveform").removeClass("d-none");
            $(".music_pseudo_bars").addClass("d-none");
          });
        } else {
          $("#waveform").addClass("d-none");
          $(".music_pseudo_bars").removeClass("d-none");
          wavesurfer.load(links[currentTrack].href, [0, 0]);
        }
        window.media = links[currentTrack].href;

        window.currentTrack = currentTrack;

        setTrackTitle(links[currentTrack].href);
      });

      playlistLoop(links);

      // Auto Play on audio load
      wavesurfer.on("ready", function () {
        if ($("#mediaPlayer").data("auto")) {
          wavesurfer.play();
        }
      });

      // Go to the next track on finish
      wavesurfer.on("finish", function () {
        nextTrack();
      });

      // Load the first track
      setCurrentSong(currentTrack);

      // Show current time
      wavesurfer.on("audioprocess", function () {
        $("#mediaPlayer-time").text(formatTime(wavesurfer.getCurrentTime()));
      });

      //Volume Control
      if ($("#volume").length) {
        var volumeInput = document.querySelector("#volume");
        var onChangeVolume = function (e) {
          wavesurfer.setVolume(e.target.value);
        };
        volumeInput.addEventListener("input", onChangeVolume);
        volumeInput.addEventListener("change", onChangeVolume);
      }

      var formatTime = function (time) {
        return [
          Math.floor((time % 3600) / 60), // minutes
          ("00" + Math.floor(time % 60)).slice(-2) // seconds
        ].join(":");
      };

      //loading
      wavesurfer.on("loading", function (percents, eventTarget) {
        NProgress.start();
        if (percents >= 100) {
          NProgress.done();
        }
      });
    }
  };

  /*
  | ----------------------------------------------------------------------------------
  | SLIM SCROLL PLUGIN
  | ----------------------------------------------------------------------------------
  */
  var slimScroll = (window.slimScroll = function () {
    var ele = $(".slimScroll");
    var headerDiv = 0;
    if (ele.length) {
      ele.each(function () {
        var $this = $(this);
        var attrData = $this.data();
        $this.slimscroll({
          height: attrData.height
            ? attrData.height + "px"
            : $(window).height() - headerDiv + "px",
          color: attrData.color ? attrData.color : "rgba(0,0,0,0.95)",
          size: attrData.size ? attrData.size + "px" : "5px",
          alwaysVisible: attrData.visible,
          railOpacity: attrData.opacity
        });
      });
    }
  });

  /*
  | ----------------------------------------------------------------------------------
  | COUNTDOWN PLUGIN
  | ----------------------------------------------------------------------------------
  */
  var countDown = function () {
    var ele = $(".countDown");
    ele.each(function () {
      var $this = $(this);
      $this.each(function () {
        var $this = $(this);
        var eventDate = $this.data("date");
        function callback(event) {
          var $this = $(this);
          $.each(event.offset, function (key, value) {
            $this.find("div span." + key).html(value);
          });
        }

        $this.countdown(eventDate.valueOf(), callback);
      });
    });
  };

  /*
  | ----------------------------------------------------------------------------------
  | GOOGLE MAP
  | ----------------------------------------------------------------------------------
  */
  function mapRender(selector, address, type, zoom_lvl, mapPin) {
    // Specify features and elements to define styles.
    var styleArray = [
      {
        featureType: "all",
        stylers: [
          {
            saturation: -100
          }
        ]
      },
      {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [
          {
            hue: "#131722"
          },
          {
            saturation: 50
          }
        ]
      },
      {
        featureType: "poi.business",
        elementType: "labels",
        stylers: [
          {
            visibility: "off"
          }
        ]
      }
    ];
    var map = new google.maps.Map(document.getElementById(selector), {
      styles: styleArray,
      scrollwheel: false,
      draggable: false,
      zoom: zoom_lvl,
      mapTypeControl: false
    });

    var map_pin = "assets/img/basic/pin.png";

    if (mapPin) {
      map_pin = mapPin;
    }
    var latlng = new google.maps.LatLng(-34.397, 150.644);

    var geocoder = new google.maps.Geocoder();
    geocoder.geocode(
      {
        address: address
      },
      function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          new google.maps.Marker({
            position: results[0].geometry.location,
            map: map
          });
          map.setCenter(results[0].geometry.location);
        }
      }
    );
  }

  var mapInit = (window.mapInit = function () {
    var ele = $(".g-map");
    if (ele.length) {
      ele.each(function (index, element) {
        var map_selector = $(this).data("id"),
          mapAddress = $(this).data("address"),
          mapType = $(this).data("maptype"),
          mapPin = $(this).data("mapPin"),
          zoomLvl = $(this).data("zoomlvl");
        $(this).attr("id", map_selector);
        mapRender(map_selector, mapAddress, mapType, zoomLvl, mapPin);
      });
    }
  });

  /*
  | ----------------------------------------------------------------------------------
  | MASONARY & FILTER
  | ----------------------------------------------------------------------------------
  */
  var initfilter = function ($masonryContainer, $ele) {
    var $filterElement = $(".project-filter li, .filter li");

    $filterElement.removeClass("active");
    $ele.addClass("active");

    if ($(".masonry-container .animated").length > 0) {
      $(".masonry-container .animated").addClass("go");
    }

    var selector = $ele.attr("data-filter");
    $masonryContainer.isotope({
      filter: selector,
      animationOptions: {
        duration: 750,
        easing: "linear",
        queue: false
      }
    });
    return false;
  };
  var initMasonary = (window.initMasonary = function initMasonary() {
    var $masonryContainer = $(".masonry-container");
    var $filterElement = $(".project-filter li, .filter li");

    if ($("#filter-items").length) {
      $(".filter li a").on("click", function () {
        $("html, body").animate(
          {
            scrollTop: $("#filter-items").offset().top - 0
          },
          1500,
          function () { }
        );
        return false;
      });
    }

    $masonryContainer.waitForImages(function () {
      $(".masonry-container").show();
      $(".masonry-container").masonry({
        itemSelector: ".masonry-post"
      });
    });

    $(window).on("load", function () {
      var $ele = $(".project-filter .active");
      initfilter($masonryContainer, $ele);
    });

    $filterElement.on("click", function () {
      $filterElement.removeClass("active");
      var $ele = $(this).addClass("active");

      var $filterElement2 = $(".project-filter li a, .filter li a");
      $filterElement2.removeClass("active");
      $(this)
        .children("a")
        .addClass("active");

      initfilter($masonryContainer, $ele, $filterElement);
    });
  });

  /*
  | ----------------------------------------------------------------------------------
  | JS SHARE PLUGIN
  | ----------------------------------------------------------------------------------
  */

  var jsShare = function () {
    //custom button for homepage

    $(".sharer").on("click", function (e) {
      e.preventDefault();
      $(".sharer-bar").removeClass("active");
      $(this)
        .siblings(".sharer-bar")
        .toggleClass("active");
    });
    $(".social_share").on("click", function (e) {
      e.preventDefault();

      return JSShare.go(this);
    });
  };

  /*
  | ----------------------------------------------------------------------------------
  | MATERIAL FORMS
  | ----------------------------------------------------------------------------------
  */
  if ($(".form-control").length) {
    //On focus event
    $(".form-control").focus(function () {
      $(this)
        .parent()
        .addClass("focused");
    });

    //On focusout event
    $(".form-control").focusout(function () {
      var $this = $(this);
      if ($this.parents(".form-group").hasClass("form-float")) {
        if ($this.val() == "") {
          $this.parents(".form-line").removeClass("focused");
        }
      } else {
        $this.parents(".form-line").removeClass("focused");
      }
    });

    //On label click
    $("body").on("click", ".form-float .form-line .form-label", function () {
      $(this)
        .parent()
        .find("input")
        .focus();
    });

    //Not blank form
    $(".form-control").each(function () {
      if ($(this).val() !== "") {
        $(this)
          .parents(".form-line")
          .addClass("focused");
      }
    });
  }

  /*
  | ----------------------------------------------------------------------------------
  | Worpdress Comments AJAXIFY
  | ----------------------------------------------------------------------------------
  */
  var commentForm = function () {
    $("#commentform input#submit").addClass("btn btn-primary");
  };

  /*
  | ----------------------------------------------------------------------------------
  | Snackbar Plugin
  | ----------------------------------------------------------------------------------
  */
  var snackbarInit = function () {
    $(".snackbar").on("click", function () {
      var $this = $(this);
      snakIt($this);
    });
  };

  function snakIt(el) {
    if (el) {
      var text = el.data("text");
      if (el.hasClass("fav-snackbar") && el.children().hasClass("active")) {
        text = el.data("text2");
      }
      Snackbar.show({
        text: text,
        textColor: el.data("textColor"),

        pos: el.data("pos"),
        customClass: el.data("customClass"),
        actionTextColor: "red",
        backgroundColor: el.data("backgroundColor")
      });
    }
  }
  /*
  | ----------------------------------------------------------------------------------
  | Ajaxify site
  | ----------------------------------------------------------------------------------
  */
  if ($("body").hasClass("ajaxify")) {
    $.ajaxify({
      contentSelector: "#pageContent",
      backContentSelector: "#pageContent",
      linkSelector: ".ajaxifyPage"
    });

    $(window).on("statechangestart", function () {
      NProgress.start();
    });

    // Call myInit again after each AJAX load.
    $(window).on("statechangecomplete", function () {
      initAjax();
      NProgress.done();
    });
  }
  /*
  | ----------------------------------------------------------------------------------
  | WaveSurfer After Ajax Load
  | ----------------------------------------------------------------------------------
  */
  window.waveSurgerPlaylist = function () {

    console.log('in ajax');
    console.log($(".playlist .media-url").length);

    if ($(".playlist .media-url").length) {
      var links = document.querySelectorAll(".playlist .media-url");
      playlistLoop(links);





      if (
        wavesurfer.isPlaying() &&
        $("a[href='" + window.media + "']").length > 0
      ) {
        $("a[href='" + window.media + "'].media-url i")
          //   .first()
          .removeClass("icon-play").addClass('icon-pause');
      }

    }
  };

  /*
  | ----------------------------------------------------------------------------------
  | Woo Quantity Field
  | ----------------------------------------------------------------------------------
  */
  $("body").on("click", ".xv-qyt", function (e) {
    e.preventDefault();
    var $add = parseInt($(this).attr("data-value")),
      $input = $(this).siblings("input.qty"),
      cVal = parseInt($input.val());
    if (cVal >= 1) {
      if ($add === -1 && cVal === 1) return false;
      $input.val(cVal + $add);
    }
  });

  var animationInit = function () {
    $(".animated").addClass("go");
  };

  var acf = function () {
    if ($(".acf-form").length) {
      $(".acf-form input")
        .not('input[type="submit"]')
        .addClass("form-control");
      $(".acf-form textarea").addClass("form-control");
      $("a.acf-button").addClass(" btn btn-outline-primary btn-sm ml-3");
    }
  };

  /*
  | ----------------------------------------------------------------------------------
  | Theme Skin
  | ----------------------------------------------------------------------------------
  */
  var skinOnLoad = function () {
    if ($("#rekord-skin-togglex").length) {
      if (localStorage.getItem("rekordDark") == "0") {
        $("#app").removeClass("theme-dark");
      } else {
        $("#app").addClass("theme-dark");
      }
    }
  };

  var skinToggle = function () {
    if ($("#rekord-skin-togglex").length) {
      $("#rekord-skin-togglex").on("click", function (e) {
        $("#app").toggleClass("theme-dark");

        if (localStorage.getItem("rekordDark") == "0") {
          localStorage.setItem("rekordDark", 1);
          $("body").css("background-color", "#0c101a");
        } else {
          localStorage.setItem("rekordDark", 0);
          $("body").css("background-color", "#fff");
        }
      });
    }
  };

  //Delete Post
  var deletePost = function () {
    $(document).on("click", ".delete-post", function () {
      var id = $(this).data("id");
      var nonce = $(this).data("nonce");
      var post = $(this).parents(".post:first");
      var result = confirm($(this).data("confirm"));
      if (result) {
        $.ajax({
          type: "post",
          url: MyAjax.ajaxurl,
          data: {
            action: "my_delete_post",
            nonce: nonce,
            id: id
          },
          success: function (result) {
            if (result == "success") {
              post.fadeOut(function () {
                post.remove();
              });
            }
          }
        });
        return false;
      }
    });
  };
  /*
  | ----------------------------------------------------------------------------------
  | Ajax initialize
  | ----------------------------------------------------------------------------------
  */
  var initAjax = function () {
    animationInit();
    skinToggle();
    lightSlider();
    lightGallery();
    commentForm();
    initMasonary();
    countDown();
    snackbarInit();
    slimScroll();
    mapInit();
    jsShare();
    if ($("body").hasClass("ajaxify")) {
      wooSingleageScripts();
    }
    if ($("#waveform").length) {
      waveSurgerPlaylist();
    }

    deletePost();

    if (window.acf) {
      acf();
      window.acf.getFields({});
    }
  };
  /*
  | ----------------------------------------------------------------------------------
  | initialize
  | ----------------------------------------------------------------------------------
  */
  var init = function () {
    deletePost();
    poper();
    skinOnLoad();
    skinToggle();
    if (!$(".xv-slide").hasClass("active")) {
      lightSlider();
    }
    animationInit();
    lightGallery();
    if ($("#waveform").length) {
      warveSurferInit();
    }
    slimScroll();
    snackbarInit();
    countDown();
    mapInit();
    jsShare();
    initMasonary();
    commentForm();
    if ($("body").hasClass("ajaxify")) {
      wooSingleageScripts();
    }
    acf();
  };

  init();
});
