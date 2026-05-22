"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Pause, Play, Settings2 } from "lucide-react";

const colorOptions = [
  { label: "Red", value: "#FF3B3B" },
  { label: "Green", value: "#00FF99" },
  { label: "Blue", value: "#00D1FF" },
  { label: "Amber", value: "#FFC14D" },
];

const presets = [
  "WELCOME TO NEONPIXEL - LIVE DEMO",
  "SPECIAL OFFER - ORDER TODAY",
  "EID MUBARAK - MASJID BOARD",
  "RAMADAN KAREEM - IFTAR 06:36 PM",
];

export function LedDemo() {
  const [message, setMessage] = useState("WELCOME TO NEONPIXEL - LIVE DEMO");
  const [running, setRunning] = useState(true);
  const [speed, setSpeed] = useState(18);
  const [ledColor, setLedColor] = useState("#00FF99");
  const [now, setNow] = useState(new Date());
  const [kolkataTimes, setKolkataTimes] = useState<Record<string, string>>({});
  const [hijriLabel, setHijriLabel] = useState("1447 AH");
  const [nextPrayerLabel, setNextPrayerLabel] = useState("FAJR --:--");
  const [nextPrayerCountdown, setNextPrayerCountdown] = useState("--:--:--");
  const [ramadanCountdown, setRamadanCountdown] = useState("--d : --h : --m");

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const timeLabel = useMemo(
    () =>
      now.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }),
    [now],
  );

  useEffect(() => {
    let mounted = true;
    async function loadKolkataData() {
      try {
        const ts = Math.floor(Date.now() / 1000);
        const url = `https://api.aladhan.com/v1/timings/${ts}?latitude=22.5726&longitude=88.3639&method=1&tune=0,0,0,0,0,0,0,0,0`;
        const res = await fetch(url);
        const json = await res.json();
        if (!mounted || !json?.data) return;
        const timings = json.data.timings ?? {};
        const hijri = json.data.date?.hijri;
        setKolkataTimes({
          Fajr: (timings.Fajr ?? "").slice(0, 5),
          Dhuhr: (timings.Dhuhr ?? "").slice(0, 5),
          Asr: (timings.Asr ?? "").slice(0, 5),
          Maghrib: (timings.Maghrib ?? "").slice(0, 5),
          Isha: (timings.Isha ?? "").slice(0, 5),
        });
        if (hijri?.year) setHijriLabel(`${hijri.year} AH`);
      } catch {
        // keep graceful fallback values
      }
    }
    loadKolkataData();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const entries = [
      ["Fajr", kolkataTimes.Fajr],
      ["Dhuhr", kolkataTimes.Dhuhr],
      ["Asr", kolkataTimes.Asr],
      ["Maghrib", kolkataTimes.Maghrib],
      ["Isha", kolkataTimes.Isha],
    ].filter((x): x is [string, string] => Boolean(x[1]));

    if (!entries.length) return;

    const nowDate = new Date();
    const nowMs = nowDate.getTime();
    const today = new Date(nowDate);
    const toMs = (hhmm: string) => {
      const [h, m] = hhmm.split(":").map(Number);
      const d = new Date(today);
      d.setHours(h, m, 0, 0);
      return d.getTime();
    };

    let targetName = entries[0][0];
    let targetMs = toMs(entries[0][1]);
    for (const [name, hm] of entries) {
      const t = toMs(hm);
      if (t > nowMs) {
        targetName = name;
        targetMs = t;
        break;
      }
    }
    if (targetMs <= nowMs) {
      const [name, hm] = entries[0];
      const t = toMs(hm) + 24 * 60 * 60 * 1000;
      targetName = name;
      targetMs = t;
    }

    const diff = Math.max(0, targetMs - nowMs);
    const hh = String(Math.floor(diff / 3600000)).padStart(2, "0");
    const mm = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
    const ss = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");
    setNextPrayerCountdown(`${hh}:${mm}:${ss}`);
    setNextPrayerLabel(`${targetName} ${entries.find((e) => e[0] === targetName)?.[1] ?? ""}`);
  }, [now, kolkataTimes]);

  useEffect(() => {
    // Approx Ramadan start for next cycle in Kolkata: Feb 18, 2027 (adjusts annually by moon sighting)
    const nowDate = new Date();
    const target = new Date("2027-02-18T00:00:00+05:30");
    if (nowDate > target) {
      target.setFullYear(target.getFullYear() + 1);
    }
    const diff = Math.max(0, target.getTime() - nowDate.getTime());
    const d = Math.floor(diff / (24 * 3600000));
    const h = Math.floor((diff % (24 * 3600000)) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    setRamadanCountdown(`${String(d).padStart(2, "0")}d : ${String(h).padStart(2, "0")}h : ${String(m).padStart(2, "0")}m`);
  }, [now]);

  return (
    <section className="section-space">
      <div className="container-shell">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45 }}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="mx-auto inline-flex rounded-lg border border-[#00D1FF]/40 bg-[#00D1FF]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#00D1FF]">
            Live Preview
          </p>
          <h2 className="mt-4 text-4xl font-bold leading-[1.05] text-white sm:text-6xl">
            Try our <span className="text-[#00D1FF] drop-shadow-[0_0_14px_rgba(0,209,255,0.8)]">LED display</span> in
            <br />
            real-time
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-[#9aa0a8]">
            Type your message, pick a color, and see exactly how your sign will look right now.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[420px_1fr]">
          <div className="glass-panel rounded-3xl border-white/15 bg-gradient-to-b from-[#11131a]/85 to-[#090b12]/90 p-6">
            <p className="flex items-center gap-2 text-3xl font-semibold text-white">
              <Settings2 className="h-5 w-5 text-[#00FF99]" />
              LED Text Generator
            </p>

            <label className="mt-8 block text-xs font-medium uppercase tracking-[0.18em] text-[#9ca3af]">Your Message</label>
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value.toUpperCase().slice(0, 72))}
              className="mt-3 h-12 w-full rounded-xl border border-white/15 bg-black/50 px-4 text-base text-white outline-none focus:border-[#00D1FF]/55"
            />

            <div className="mt-4 flex flex-wrap gap-2">
              {presets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setMessage(preset)}
                  className="rounded-full border border-white/15 bg-white/[0.02] px-3 py-1 text-xs text-[#aeb4bf] hover:border-[#00D1FF]/50 hover:text-white"
                >
                  {preset.slice(0, 22)}...
                </button>
              ))}
            </div>

            <label className="mt-8 block text-xs font-medium uppercase tracking-[0.18em] text-[#9ca3af]">Color</label>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => setLedColor(color.value)}
                  className={`rounded-xl border px-3 py-2 text-sm font-medium transition ${
                    ledColor === color.value
                      ? "border-current bg-white/5"
                      : "border-white/15 text-[#8f95a0] hover:border-white/35"
                  }`}
                  style={{ color: color.value }}
                >
                  {color.label}
                </button>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-[#9ca3af]">
              <span>Speed</span>
              <span style={{ color: ledColor }}>{speed}s/loop</span>
            </div>
            <input
              type="range"
              min={8}
              max={30}
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="mt-3 w-full accent-[#00FF99]"
            />

            <div className="mt-8 flex gap-3">
              <button
                type="button"
                onClick={() => setRunning((v) => !v)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0ecf99] to-[#11b8a2] px-4 py-3 text-sm font-semibold text-black"
              >
                {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {running ? "Pause" : "Play"}
              </button>
              <button type="button" className="rounded-xl border border-[#00D1FF]/50 px-4 py-3 text-sm font-semibold text-[#00D1FF]">
                Order This
              </button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="glass-panel rounded-3xl border-[#00FF99]/40 bg-gradient-to-b from-[#0f131c]/85 to-[#090b12]/95 p-5">
              <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-[#8c93a0]">
                <span>Scrolling LED Board</span>
                <span style={{ color: ledColor }}>Live</span>
              </div>
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[length:8px_8px] px-4 py-5">
                <p
                  className={`inline-block min-w-full whitespace-nowrap font-mono text-4xl font-bold tracking-wide ${running ? "animate-marquee" : ""}`}
                  style={{ animationDuration: `${speed}s`, color: ledColor, textShadow: `0 0 12px ${ledColor}` }}
                >
                  DEMO * {message}
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="glass-panel rounded-3xl p-4">
                <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.16em] text-[#8c93a0]">
                  <span>Live Prayer - Kolkata</span>
                  <span style={{ color: ledColor }}>{hijriLabel}</span>
                </div>
                <div className="rounded-2xl border border-white/10 bg-[radial-gradient(circle,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[length:8px_8px] p-5 text-center">
                  <p className="text-xs uppercase tracking-[0.16em] text-[#8c93a0]">Next Prayer in {nextPrayerCountdown}</p>
                  <p className="mt-2 font-mono text-5xl font-semibold leading-[1.05]" style={{ color: ledColor, textShadow: `0 0 14px ${ledColor}` }}>
                    {nextPrayerLabel}
                  </p>
                </div>
              </div>

              <div className="glass-panel rounded-3xl p-4">
                <div className="mb-3 text-xs uppercase tracking-[0.16em] text-[#8c93a0]">Ramadan Countdown - {hijriLabel}</div>
                <div className="rounded-2xl border border-white/10 bg-[radial-gradient(circle,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[length:8px_8px] p-5 text-center">
                  <p className="mb-2 text-xs uppercase tracking-[0.16em]" style={{ color: ledColor }}>
                    Ramadan Mubarak
                  </p>
                  <p className="font-mono text-5xl font-semibold" style={{ color: ledColor, textShadow: `0 0 14px ${ledColor}` }}>
                    {ramadanCountdown}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}



