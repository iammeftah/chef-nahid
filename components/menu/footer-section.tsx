"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";

// ---- LOCATION -------------------------------------------------------------
const LAT = 31.673725782227308;
const LNG = -8.014955557818556;
const ZOOM = 16;
const DIRECTIONS_URL = `https://www.google.com/maps?q=${LAT},${LNG}`;
const PHONE_DISPLAY = "0632-600644";
const PHONE_TEL = "+212632600644";
const WHATSAPP_URL = "https://wa.me/212632600644";
// ---------------------------------------------------------------------------

// Dark-mode reskin: invert only the tile imagery (not the marker or the
// attribution control, which OSM's license requires we keep visible), plus
// the pulsing-pin keyframes. Plain <style> tag — same pattern the
// page-loader uses for its own injected keyframes (no styled-jsx here).
const MAP_CSS = `
.chef-nahid-map .leaflet-tile-pane {
  filter: grayscale(1) invert(92%) contrast(0.92) brightness(0.9) hue-rotate(180deg) saturate(1.3);
}
.chef-nahid-map .leaflet-control-attribution {
  background: rgba(11,10,12,0.55) !important;
  color: rgba(244,239,233,0.6) !important;
  font-size: 8px !important;
  line-height: 1.4;
}
.chef-nahid-map .leaflet-control-attribution a { color: rgba(244,239,233,0.85) !important; }
.chef-nahid-map .leaflet-pane, .chef-nahid-map .leaflet-control { z-index: 0; }
@keyframes pin-pulse {
  0%   { transform: translate(-50%, -50%) scale(0.4); opacity: 0.55; }
  100% { transform: translate(-50%, -50%) scale(2.2); opacity: 0; }
}
`;

export function FooterSection() {
  const mapElRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);

  // Leaflet touches `window` on import, so it's loaded dynamically inside
  // the effect (client-only) rather than as a normal top-level import —
  // otherwise Next's server render/build would blow up.
  useEffect(() => {
    if (!mapElRef.current || mapRef.current) return;
    let cancelled = false;

    import("leaflet").then((mod) => {
      if (cancelled || !mapElRef.current || mapRef.current) return;
      const L = (mod as unknown as { default?: typeof mod }).default ?? mod;

      const map = L.map(mapElRef.current, {
        center: [LAT, LNG],
        zoom: ZOOM,
        zoomControl: false,
        dragging: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        touchZoom: false,
        boxZoom: false,
        keyboard: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      // Custom pin — real coordinates, not a guessed pixel position.
      // The pulse ring is centered on the pin's round "head" (where the
      // white dot sits), not the whole icon box — using top/left with
      // translate(-50%,-50%) so it's centered by its true midpoint instead
      // of its top-left corner.
      const pinIcon = L.divIcon({
        className: "",
        html: `
          <div style="position:relative;width:26px;height:34px;">
            <span style="position:absolute;left:50%;top:12.5px;width:24px;height:24px;border-radius:50%;background:#e63946;animation:pin-pulse 2.2s ease-out infinite;"></span>
            <svg width="26" height="34" viewBox="0 0 22 30" style="position:relative;filter:drop-shadow(0 2px 3px rgba(0,0,0,0.6));">
              <path d="M11 0C4.9 0 0 4.9 0 11c0 8.25 11 19 11 19s11-10.75 11-19C22 4.9 17.1 0 11 0z" fill="#e63946"/>
              <circle cx="11" cy="11" r="4.2" fill="#fff2ee"/>
            </svg>
          </div>
        `,
        iconSize: [26, 34],
        iconAnchor: [13, 34],
      });
      L.marker([LAT, LNG], { icon: pinIcon, interactive: false }).addTo(map);

      mapRef.current = map;
    });

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="border-t border-border px-4 pb-8 pt-14 text-center sm:px-6"
    >
      <style>{MAP_CSS}</style>

      {/* Brand — same treatment as the hero */}
      <h2 className="font-display text-6xl leading-tight text-foreground sm:text-5xl">
        Chef Nahid
      </h2>
      <p className="mx-auto mt-2 max-w-xs text-sm text-muted-foreground">
        Sandwichs, pizzas, jus &amp; douceurs faits maison.
      </p>

      <span className="mx-auto mt-6 block h-px w-12 bg-primary" aria-hidden />

      {/* Hours */}
      <div className=" mx-auto mt-6 max-w-sm border border-border px-3 py-5">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
          Horaires
        </span>
        <p className="mt-2 text-sm font-semibold text-foreground">16h – 4h</p>
        <p className="mt-0.5 text-[11px] uppercase tracking-wide text-muted-foreground">
          Tous les jours
        </p>

        <span aria-hidden className="mx-auto mt-4 block h-px w-8 bg-border" />

        <p className="mx-auto mt-4 max-w-[16rem] text-xs leading-relaxed text-muted-foreground">
          Un petit creux tard le soir ? On est encore là jusqu'à{" "}
          <span className="font-semibold text-foreground">4h du matin</span>.
        </p>
      </div>

      {/* Delivery partner */}
      <div className="mx-auto mt-4 max-w-sm border border-border px-3 py-5">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
          Livraison
        </span>
        <div className="mt-3 flex items-center justify-center">
          <Image
            src="/images/glovo-seeklogo.svg"
            alt="Glovo"
            width={96}
            height={32}
            className="h-8 w-auto"
          />
        </div>
        <p className="mt-2 text-[11px] uppercase tracking-wide text-muted-foreground">
          Nous livrons avec Glovo
        </p>

        <span aria-hidden className="mx-auto mt-4 block h-px w-8 bg-border" />

        <p className="mx-auto mt-4 max-w-[16rem] text-xs leading-relaxed text-muted-foreground">
          Hey, on fait aussi du Glovo, et vous pouvez commander directement sur{" "}
          <span className="font-semibold text-foreground">WhatsApp</span>.
        </p>

        <div className="mx-auto mt-3 flex max-w-[16rem] items-center justify-center gap-2">
          <a
            href={`tel:${PHONE_TEL}`}
            className="flex flex-1 items-center justify-center gap-1.5 border border-border px-2 py-2 text-xs font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.5 21 3 13.5 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.5.6 3.6.1.4 0 .8-.2 1L6.6 10.8z" />
            </svg>
            {PHONE_DISPLAY}
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 border border-border px-2 py-2 text-xs font-semibold text-foreground transition-colors hover:border-[#25D366] hover:text-[#25D366]"
          >
            <Image
              src="/images/whatsapp-icon-seeklogo.svg"
              alt=""
              width={16}
              height={16}
              className="h-4 w-4"
            />
            WhatsApp
          </a>
        </div>
      </div>

      {/* Location — real Leaflet/OSM map, dark-reskinned, accurate marker */}
      <div className="mx-auto mt-4 max-w-sm border border-border px-3 py-5">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
          Localisation
        </span>
        <p className="mt-2 text-sm font-semibold text-foreground">Marrakech, Maroc</p>
        <p className="mt-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">
          {LAT.toFixed(6)}, {LNG.toFixed(6)}
        </p>

        <div className="relative mx-auto mt-4 h-40 w-full overflow-hidden rounded-lg border border-border">
          <div ref={mapElRef} className="chef-nahid-map h-full w-full" />

          {/* brand-color tint over the desaturated tiles, doesn't block the map since it's non-interactive anyway */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 45%, rgba(230,57,70,0.14), transparent 55%), linear-gradient(160deg, rgba(42,157,143,0.16), rgba(18,16,20,0.3))",
              mixBlendMode: "multiply",
            }}
          />

          <a
            href={DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-2 py-1 text-left text-[9px] font-bold uppercase tracking-wider text-white transition-colors hover:text-primary"
          >
            Voir l&apos;itinéraire
          </a>
        </div>
      </div>

      {/* Back to top */}
      <button
        type="button"
        aria-label="Retour en haut"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="mx-auto mt-8 flex flex-col items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 11L8 5L14 11" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <span className="text-[9px] font-semibold uppercase tracking-[0.2em]">Retour en haut</span>
      </button>

      {/* Bottom bar + signature */}
      <div className="mt-10 border-t border-border pt-6">
        <p className="text-[10px] text-muted-foreground">
          © {new Date().getFullYear()} Chef Nahid · Tous droits réservés
        </p>
        <a
          href="https://meftah.me"
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-3 inline-flex items-baseline gap-2 text-muted-foreground transition-colors hover:text-foreground"
        >
          <span className="font-display text-xl text-foreground transition-colors group-hover:text-primary">
            Hmed
          </span>
        </a>
      </div>
    </motion.footer>
  );
}