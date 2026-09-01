/*
 * Shared, privacy-conscious product analytics for Route SNU IE.
 *
 * Custom product events live behind trackEvent() so a failed analytics request
 * can never interrupt the site's normal interactions.
 */
(function () {
  "use strict";

  const POSTHOG_KEY = "phc_nwmdJJVi7TSoxXRputpDyLUicQv6QzXtrZar2tSepFpz";
  const POSTHOG_HOST = "https://us.i.posthog.com";
  const GUIDE_NAMES = {
    "roadmap.html": "roadmap",
    "rules.html": "rules",
    "faq.html": "faq",
    "courses.html": "courses",
    "liberal-arts.html": "liberal_arts"
  };

  function trackEvent(name, properties) {
    try {
      if (!window.posthog || typeof window.posthog.capture !== "function") return false;
      window.posthog.capture(name, properties);
      return true;
    } catch (_) {
      // Analytics is optional: never allow it to affect the academic guide.
      return false;
    }
  }

  window.trackEvent = trackEvent;

  function initializePostHog() {
    try {
      (function (documentRef, posthog) {
        if (posthog.__SV) return;

        let script;
        let firstScript;
        let index;
        const methods = "init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagResult isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug".split(" ");

        window.posthog = posthog;
        posthog._i = [];
        posthog.init = function (projectToken, config, instanceName) {
          function addMethod(target, method) {
            const parts = method.split(".");
            if (parts.length === 2) {
              target = target[parts[0]] = target[parts[0]] || [];
              method = parts[1];
            }
            target[method] = function () {
              target.push([method].concat(Array.prototype.slice.call(arguments, 0)));
            };
          }

          script = documentRef.createElement("script");
          script.type = "text/javascript";
          script.crossOrigin = "anonymous";
          script.async = true;
          script.src = config.api_host.replace(".i.posthog.com", "-assets.i.posthog.com") + "/static/array.js";
          firstScript = documentRef.getElementsByTagName("script")[0];
          firstScript.parentNode.insertBefore(script, firstScript);

          const instance = instanceName ? posthog[instanceName] = [] : posthog;
          instance.people = instance.people || [];
          instance.toString = function (isPeople) {
            let label = "posthog";
            if (instanceName) label += "." + instanceName;
            return isPeople ? label + ".people (stub)" : label + " (stub)";
          };
          instance.people.toString = function () {
            return instance.toString(true);
          };

          for (index = 0; index < methods.length; index += 1) addMethod(instance, methods[index]);
          posthog._i.push([projectToken, config, instanceName]);
        };
        posthog.__SV = 1;
      }(document, window.posthog || []));

      window.posthog.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        defaults: "2026-05-30",
        capture_pageview: true,
        capture_pageleave: "if_capture_pageview",
        autocapture: true,
        session_recording: {
          // Course-search input is deliberately masked in replays.
          maskAllInputs: true
        }
      });
    } catch (_) {
      // A blocked SDK or network error must not affect page rendering.
    }
  }

  function getFileName(href) {
    try {
      return new URL(href, window.location.href).pathname.split("/").pop();
    } catch (_) {
      return "";
    }
  }

  function getSourcePage() {
    const fileName = window.location.pathname.split("/").pop();
    return fileName && fileName !== "index.html" ? fileName.replace(/\.html$/, "") : "home";
  }

  function guideLinkDetails(link) {
    const guideName = GUIDE_NAMES[getFileName(link.getAttribute("href"))];
    if (!guideName) return null;

    if (link.closest(".portal-card")) {
      return { guide_name: guideName, source_location: "home_card" };
    }
    if (link.closest(".nav")) {
      return { guide_name: guideName, source_location: "top_navigation" };
    }
    return null;
  }

  function isOfficialSiteLink(link) {
    try {
      const url = new URL(link.href, window.location.href);
      return url.origin === "https://ie.snu.ac.kr" && url.pathname === "/";
    } catch (_) {
      return false;
    }
  }

  function excludeCustomEventsFromAutocapture() {
    document.querySelectorAll("a[href]").forEach((link) => {
      if (guideLinkDetails(link) || isOfficialSiteLink(link)) {
        link.setAttribute("data-ph-no-autocapture", "true");
      }
    });

    document.querySelectorAll(".filter, .year-chip").forEach((control) => {
      control.setAttribute("data-ph-no-autocapture", "true");
    });
  }

  function bindSharedEvents() {
    document.addEventListener("click", (event) => {
      const link = event.target.closest("a[href]");
      if (!link) return;

      const guide = guideLinkDetails(link);
      if (guide) {
        trackEvent("guide_opened", guide);
        return;
      }

      if (isOfficialSiteLink(link)) {
        trackEvent("official_site_clicked", { source_page: getSourcePage() });
      }
    });
  }

  initializePostHog();
  excludeCustomEventsFromAutocapture();
  bindSharedEvents();
}());
