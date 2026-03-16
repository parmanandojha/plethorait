import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CONSENT_KEY = "plethora_cookie_consent";
const METRICS_KEY = "plethora_consent_metrics";

function getDeviceInfo() {
  if (typeof navigator === "undefined") return "Unknown";
  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(ua)) return "Tablet";
  if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua))
    return "Mobile";
  return "Desktop";
}

function ConsentBanner() {
  const [visible, setVisible] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const accepted = localStorage.getItem(CONSENT_KEY);
    if (accepted === "accepted") setVisible(false);
  }, []);

  const recordConsentAndHide = async () => {
    const device = getDeviceInfo();
    let location = { country: "Unknown", city: "", region: "" };
    try {
      const res = await fetch("https://ipapi.co/json/");
      if (res.ok) {
        const data = await res.json();
        location = {
          country: data.country_name || data.country || "Unknown",
          city: data.city || "",
          region: data.region || ""
        };
      }
    } catch {
      // keep default location
    }

    try {
      const raw = localStorage.getItem(METRICS_KEY);
      const list = raw ? JSON.parse(raw) : [];
      list.push({
        id: `m-${Date.now()}`,
        timestamp: new Date().toISOString(),
        device,
        location: `${[location.city, location.region].filter(Boolean).join(", ") || location.country} (${location.country})`
      });
      localStorage.setItem(METRICS_KEY, JSON.stringify(list));
    } catch {
      // ignore
    }
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
    setShowSettings(false);
  };

  const handleClose = () => {
    recordConsentAndHide();
  };

  if (!visible) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-[99999] bg-white text-black shadow-[0_-4px_20px_rgba(0,0,0,0.15)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm text-black/90 flex-1">
            This website uses cookies. We use them to give you the best experience.
            If you continue using our website, we&apos;ll assume that you are happy to
            receive all cookies on this website.{" "}
            <Link
              to="/privacy-policy"
              className="underline font-medium"
              onClick={() => setShowSettings(false)}
            >
              Privacy policy
            </Link>
          </p>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setShowSettings(true)}
              className="px-4 py-2 text-sm border border-black rounded hover:bg-black/5 transition-colors"
            >
              Settings
            </button>
            <button
              type="button"
              onClick={recordConsentAndHide}
              className="px-4 py-2 text-sm bg-black text-white rounded hover:bg-black/80 transition-colors"
            >
              Continue
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="p-2 text-black/60 hover:text-black"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>
      </div>

      {showSettings && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/40">
          <div className="bg-white text-black rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide">
                Cookie settings
              </h3>
              <button
                type="button"
                onClick={() => setShowSettings(false)}
                className="text-black/60 hover:text-black"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-black/80 mb-4">
              We use necessary cookies for the site to function. By clicking
              &quot;Accept all&quot; below you consent to our use of cookies as described in
              our{" "}
              <Link to="/privacy-policy" className="underline">
                Privacy policy
              </Link>
              .
            </p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowSettings(false)}
                className="px-3 py-2 text-sm border border-black rounded"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={recordConsentAndHide}
                className="px-3 py-2 text-sm bg-black text-white rounded"
              >
                Accept all
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ConsentBanner;
