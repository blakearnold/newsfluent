/*================================================================================
The use, disclosure, reproduction, modification, transfer, or transmittal
of this work for any purpose in any form or by any means without th
written permission of Akamai Technologies is strictly prohibited.

Confidential, Unpublished Property of Akamai Technologies.
Use and Distribution Limited Solely to Authorized Personnel.

Copyright 2016 Akamai Technologies, Inc.  All Rights Reserved.
================================================================================*/

var namespace = {};
(function (ns, amp) {
  ns.amp = amp;
  ns.isTouch = false;

  ns.onInit = function (ev) {
    if ('flash' !== akamai.amp.AMP.getPlaybackMode()) {
      ns.isTouch = (akamai.amp.utils.Utils.isIPhone() || akamai.amp.utils.Utils.isAndroid());
      if (ns.amp.react) {
        /*Creates mobile viewport for Fox News*/
        var playOverlay = React.createElement("button", {
          className: "amp-pause-overlay amp-icon amp-control amp-small",
          id: "amp-play-overlay",
          key: "playoverlay",
          onClick: function () {
            if (ns.amp.playState == "ready" || ns.amp.paused) {
              ns.amp.play();
            }
            else if (ns.amp.ended || ns.amp.playState == "ended") {
              ns.amp.replay();
              setTimeout(ns.amp.play.bind(ns.amp), 150);
            }
            else {
              ns.amp.pause();
            }
          }
        });

        var backBtn = React.createElement("button", {
          className: "amp-icon amp-jump-back amp-small",
          id: "amp-back-button",
          key: "back",
          onClick: function () {
            if (ns.amp.playState === "playing" || ns.amp.playState === "paused") {
              ns.amp.currentTime = Math.max(ns.amp.currentTime - 10, 0);
            } else if (ns.amp.ended === true) {
              ns.amp.replay();
            }
          }
        });

        var forwardBtn = React.createElement("button", {
          className: "amp-icon amp-jump-forward amp-small",
          id: "amp-forward-button",
          key: "forward",
          onClick: function () {
            if (!ns.amp.ended && (ns.amp.playState == "playing" || ns.amp.playState == "paused")) {
              ns.amp.currentTime = Math.min(ns.amp.currentTime + 10, ns.amp.duration - 1);
            }
          }
        });

        ns.amp.react.container.addComponent(backBtn);
        ns.amp.react.container.addComponent(forwardBtn);
        ns.amp.react.container.addComponent(playOverlay);
      }
    }

    /** Collapsed volume bar*/
    var isVolumeBarCollapsed = true;
    var volumeBar = document.getElementsByClassName('amp-volume amp-icon amp-control amp-slider')[0]

    ns.amp.react.addEventListener("mutemouseover", function () {
      ns.amp.sendNotification("addApplicationState", "volume-open");
      isVolumeBarCollapsed = false;
    });
    ns.amp.react.addEventListener("volumemouseover", function () {
      ns.amp.sendNotification("addApplicationState", "volume-open");
      isVolumeBarCollapsed = true;
    });
    ns.amp.react.addEventListener("mutemouseout", function (e) {
      setTimeout(function () {
            if(!isVolumeBarCollapsed){
              ns.amp.sendNotification("removeApplicationState", "volume-open");
              isVolumeBarCollapsed = true;
            }
        }, 500
      )
    });
    if(volumeBar)
    {
      volumeBar.addEventListener("mouseleave",function(){
        setTimeout(function () { isVolumeBarCollapsed = true; ns.amp.sendNotification("removeApplicationState", "volume-open")},500);
      })
    }
    
  }

  if (ns.amp) {
    ns.amp.once("ready", ns.onInit);
  }
}(namespace, amp));