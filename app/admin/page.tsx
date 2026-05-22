"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowDown,
  ArrowUp,
  Globe,
  Images,
  LayoutDashboard,
  Link2,
  LogOut,
  Plus,
  Save,
  Search,
  Shield,
  Star,
  Trash2,
  Upload,
  Video,
  Wallet,
  Pencil,
  ExternalLink,
  X,
  Zap,
} from "lucide-react";
import type { HeroContent, PortfolioItem, PricingPlan, TestimonialItem } from "@/lib/data";

type SiteContent = {
  portfolio: PortfolioItem[];
  hero: HeroContent;
  testimonials: TestimonialItem[];
  pricing: PricingPlan[];
};

type TabKey = "portfolio" | "hero" | "testimonials" | "pricing";

const emptyPortfolio: PortfolioItem = {
  title: "",
  category: "",
  tag: "",
  image: "",
  videoId: "",
  span: "normal",
};

const emptyTestimonial: TestimonialItem = {
  name: "",
  quote: "",
};

const emptyPricing: PricingPlan = {
  name: "",
  price: "",
  subtitle: "Starting From",
  description: "",
  features: [""],
  cta: "Order",
  accent: "green",
};

export default function AdminPage() {
  const router = useRouter();
  const [tab, setTab] = useState<TabKey>("portfolio");
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const [portfolioQuery, setPortfolioQuery] = useState("");
  const [editingPortfolioIndex, setEditingPortfolioIndex] = useState<number | null>(null);
  const [pricingQuery, setPricingQuery] = useState("");
  const [editingPricingIndex, setEditingPricingIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(id);
  }, [toast]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/admin/content");
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const data = (await res.json()) as SiteContent;
      setContent(data);
      setLoading(false);
    }
    load();
  }, [router]);

  const stats = useMemo(() => {
    if (!content) return { total: 0, withVideo: 0, withUploads: 0 };
    const total = content.portfolio.length;
    const withVideo = content.portfolio.filter((x) => Boolean(x.videoId)).length;
    const withUploads = content.portfolio.filter((x) => x.image.startsWith("/uploads/")).length;
    return { total, withVideo, withUploads };
  }, [content]);

  const filteredPortfolio = useMemo(() => {
    if (!content) return [];
    if (!portfolioQuery.trim()) return content.portfolio.map((item, index) => ({ item, index }));
    const q = portfolioQuery.toLowerCase();
    return content.portfolio
      .map((item, index) => ({ item, index }))
      .filter(({ item }) =>
        [item.title, item.category, item.tag, item.videoId ?? "", item.image].join(" ").toLowerCase().includes(q),
      );
  }, [content, portfolioQuery]);

  const filteredPricing = useMemo(() => {
    if (!content) return [];
    if (!pricingQuery.trim()) return content.pricing.map((item, index) => ({ item, index }));
    const q = pricingQuery.toLowerCase();
    return content.pricing
      .map((item, index) => ({ item, index }))
      .filter(({ item }) =>
        [item.name, item.price, item.subtitle, item.description, item.cta, item.accent, item.features.join(" ")]
          .join(" ")
          .toLowerCase()
          .includes(q),
      );
  }, [content, pricingQuery]);

  function patchContent(updater: (draft: SiteContent) => SiteContent) {
    setContent((prev) => (prev ? updater(prev) : prev));
  }

  function updatePortfolioItem(index: number, key: keyof PortfolioItem, value: string) {
    patchContent((prev) => {
      const next = [...prev.portfolio];
      next[index] = { ...next[index], [key]: value };
      return { ...prev, portfolio: next };
    });
  }

  function movePortfolio(index: number, direction: -1 | 1) {
    patchContent((prev) => {
      const arr = [...prev.portfolio];
      const target = index + direction;
      if (target < 0 || target >= arr.length) return prev;
      [arr[index], arr[target]] = [arr[target], arr[index]];
      return { ...prev, portfolio: arr };
    });
  }

  async function uploadImage(index: number, file: File) {
    setUploadingIndex(index);
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });
    setUploadingIndex(null);
    if (!res.ok) {
      setToast({ type: "error", text: "Image upload failed." });
      return;
    }
    const data = (await res.json()) as { url: string };
    updatePortfolioItem(index, "image", data.url);
    setToast({ type: "success", text: "Image uploaded." });
  }

  async function save(section: TabKey) {
    if (!content) return;
    setSaving(true);
    const res = await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    setSaving(false);
    setToast({
      type: res.ok ? "success" : "error",
      text: res.ok ? `${section[0].toUpperCase() + section.slice(1)} saved successfully.` : "Save failed.",
    });
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  if (loading || !content) {
    return (
      <main className="min-h-screen bg-[#050505] text-white">
        <div className="container-shell py-10 text-[#AAAAAA]">Loading...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <div className="mx-auto grid min-h-screen max-w-[1450px] lg:grid-cols-[270px_1fr]">
        <aside className="border-r border-white/10 bg-[#090b10] p-5">
          <div className="rounded-xl border border-[#00D1FF]/30 bg-[#0b1320] p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-[#00D1FF]">Modern Electric</p>
            <h1 className="mt-2 text-2xl font-bold">Admin Panel</h1>
            <p className="mt-2 text-xs text-[#8f97a4]">Manage website content</p>
          </div>

          <nav className="mt-6 space-y-2">
            <button onClick={() => setTab("portfolio")} className={`flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm ${tab === "portfolio" ? "border-[#00FF99]/35 bg-[#00FF99]/10 text-[#00FF99]" : "border-white/10 text-[#9aa0a8]"}`}><Images className="h-4 w-4" /> Portfolio</button>
            <button onClick={() => setTab("hero")} className={`flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm ${tab === "hero" ? "border-[#00FF99]/35 bg-[#00FF99]/10 text-[#00FF99]" : "border-white/10 text-[#9aa0a8]"}`}><Zap className="h-4 w-4" /> Hero</button>
            <button onClick={() => setTab("testimonials")} className={`flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm ${tab === "testimonials" ? "border-[#00FF99]/35 bg-[#00FF99]/10 text-[#00FF99]" : "border-white/10 text-[#9aa0a8]"}`}><Star className="h-4 w-4" /> Testimonials</button>
            <button onClick={() => setTab("pricing")} className={`flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm ${tab === "pricing" ? "border-[#00FF99]/35 bg-[#00FF99]/10 text-[#00FF99]" : "border-white/10 text-[#9aa0a8]"}`}><Wallet className="h-4 w-4" /> Pricing</button>
            <Link href="/" className="flex w-full items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-left text-sm text-[#9aa0a8]"><Globe className="h-4 w-4" /> View Website</Link>
            <button className="flex w-full items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-left text-sm text-[#9aa0a8]"><Shield className="h-4 w-4" /> Security</button>
          </nav>

          <button type="button" onClick={logout} className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-[#FF3B3B]/40 px-3 py-2 text-sm text-[#ff8b8b]"><LogOut className="h-4 w-4" /> Logout</button>
        </aside>

        <section className="p-5 sm:p-8">
          <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-3xl font-bold">Dashboard</h2>
              <p className="text-sm text-[#9aa0a8]">Edit {tab} content and save changes.</p>
            </div>
            <div className="flex items-center gap-2">
              {tab === "portfolio" && (
                <button
                  type="button"
                  onClick={() => patchContent((prev) => ({ ...prev, portfolio: [...prev.portfolio, { ...emptyPortfolio }] }))}
                  className="inline-flex items-center gap-2 rounded-lg border border-[#00D1FF]/50 px-4 py-2 text-sm text-[#00D1FF]"
                >
                  <Plus className="h-4 w-4" /> Add Item
                </button>
              )}
              <button type="button" onClick={() => save(tab)} disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-[#00FF99] px-4 py-2 text-sm font-semibold text-black disabled:opacity-60">
                <Save className="h-4 w-4" /> {saving ? "Saving..." : `Save ${tab[0].toUpperCase() + tab.slice(1)}`}
              </button>
            </div>
          </header>

          <div className="mb-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-[#0b0b0b] p-4"><p className="text-xs text-[#8f97a4]">Total Portfolio Items</p><p className="mt-2 text-3xl font-bold text-[#00FF99]">{stats.total}</p></div>
            <div className="rounded-xl border border-white/10 bg-[#0b0b0b] p-4"><p className="text-xs text-[#8f97a4]">Items with Video</p><p className="mt-2 text-3xl font-bold text-[#00D1FF]">{stats.withVideo}</p></div>
            <div className="rounded-xl border border-white/10 bg-[#0b0b0b] p-4"><p className="text-xs text-[#8f97a4]">Uploaded Images</p><p className="mt-2 text-3xl font-bold text-[#caa0ff]">{stats.withUploads}</p></div>
          </div>

          {toast && (
            <div className={`fixed right-5 top-5 z-[120] flex items-center gap-3 rounded-lg border px-4 py-3 text-sm shadow-lg ${toast.type === "success" ? "border-[#00FF99]/40 bg-[#062618] text-[#9fffd4]" : "border-[#FF3B3B]/40 bg-[#2a0b0b] text-[#ffb0b0]"}`}>
              <span>{toast.text}</span>
              <button
                type="button"
                onClick={() => setToast(null)}
                className="rounded border border-white/20 px-1.5 py-0.5 text-xs text-white/80 hover:text-white"
                aria-label="Close notification"
              >
                Ã—
              </button>
            </div>
          )}

          {tab === "portfolio" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#0b0b0b] px-3 py-2">
                <Search className="h-4 w-4 text-[#8f97a4]" />
                <input value={portfolioQuery} onChange={(e) => setPortfolioQuery(e.target.value)} placeholder="Search by title/category/tag/video..." className="w-full bg-transparent text-sm outline-none" />
                <Link href="/#portfolio" target="_blank" className="inline-flex items-center gap-1 rounded-md border border-[#00D1FF]/40 px-2 py-1 text-xs text-[#00D1FF]">
                  <ExternalLink className="h-3.5 w-3.5" /> Show Page
                </Link>
              </div>

              <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0b]">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/5 text-xs uppercase tracking-[0.14em] text-[#8f97a4]">
                    <tr>
                      <th className="px-3 py-3">Preview</th>
                      <th className="px-3 py-3">Title</th>
                      <th className="px-3 py-3">Category</th>
                      <th className="px-3 py-3">Video</th>
                      <th className="px-3 py-3">Span</th>
                      <th className="px-3 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPortfolio.map(({ item, index }) => (
                      <tr key={index} className="border-t border-white/10">
                        <td className="px-3 py-2">
                          {item.image ? (
                            <img src={item.image} alt={item.title || "Preview"} className="h-12 w-20 rounded-md object-cover" />
                          ) : (
                            <div className="h-12 w-20 rounded-md bg-white/5" />
                          )}
                        </td>
                        <td className="px-3 py-2 text-white">{item.title || "-"}</td>
                        <td className="px-3 py-2 text-[#9aa0a8]">{item.category || "-"}</td>
                        <td className="px-3 py-2 text-[#9aa0a8]">{item.videoId ? "Yes" : "No"}</td>
                        <td className="px-3 py-2 text-[#9aa0a8]">{item.span ?? "normal"}</td>
                        <td className="px-3 py-2">
                          <div className="flex flex-wrap items-center gap-1">
                            <button type="button" onClick={() => setEditingPortfolioIndex(index)} className="inline-flex items-center gap-1 rounded-md border border-[#00D1FF]/45 px-2 py-1 text-xs text-[#00D1FF]"><Pencil className="h-3.5 w-3.5" /> Edit</button>
                            <button type="button" onClick={() => movePortfolio(index, -1)} className="rounded-md border border-white/20 p-1 text-xs"><ArrowUp className="h-4 w-4" /></button>
                            <button type="button" onClick={() => movePortfolio(index, 1)} className="rounded-md border border-white/20 p-1 text-xs"><ArrowDown className="h-4 w-4" /></button>
                            <button type="button" onClick={() => patchContent((prev) => ({ ...prev, portfolio: prev.portfolio.filter((_, i) => i !== index) }))} className="inline-flex items-center gap-1 rounded-md border border-[#FF3B3B]/50 px-2 py-1 text-xs text-[#FF8585]"><Trash2 className="h-3.5 w-3.5" /> Remove</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {editingPortfolioIndex !== null && content.portfolio[editingPortfolioIndex] && (
                <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
                  <div className="w-full max-w-3xl rounded-2xl border border-white/15 bg-[#0b0b0b] p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Edit Portfolio Item #{editingPortfolioIndex + 1}</h3>
                      <button type="button" onClick={() => setEditingPortfolioIndex(null)} className="rounded-md border border-white/20 p-1"><X className="h-4 w-4" /></button>
                    </div>
                    <div className="grid gap-3 md:grid-cols-2">
                      <label className="text-xs text-[#9aa0a8]">Title<input value={content.portfolio[editingPortfolioIndex].title} onChange={(e) => updatePortfolioItem(editingPortfolioIndex, "title", e.target.value)} className="mt-1 h-10 w-full rounded-lg border border-white/20 bg-black/40 px-3 text-sm" /></label>
                      <label className="text-xs text-[#9aa0a8]">Category<input value={content.portfolio[editingPortfolioIndex].category} onChange={(e) => updatePortfolioItem(editingPortfolioIndex, "category", e.target.value)} className="mt-1 h-10 w-full rounded-lg border border-white/20 bg-black/40 px-3 text-sm" /></label>
                      <label className="text-xs text-[#9aa0a8]">Tag<input value={content.portfolio[editingPortfolioIndex].tag} onChange={(e) => updatePortfolioItem(editingPortfolioIndex, "tag", e.target.value)} className="mt-1 h-10 w-full rounded-lg border border-white/20 bg-black/40 px-3 text-sm" /></label>
                      <label className="text-xs text-[#9aa0a8]">Layout Span<select value={content.portfolio[editingPortfolioIndex].span ?? "normal"} onChange={(e) => updatePortfolioItem(editingPortfolioIndex, "span", e.target.value)} className="mt-1 h-10 w-full rounded-lg border border-white/20 bg-black/40 px-3 text-sm text-white"><option className="bg-[#0b0b0b] text-white" value="normal">normal</option><option className="bg-[#0b0b0b] text-white" value="tall">tall</option><option className="bg-[#0b0b0b] text-white" value="wide">wide</option></select></label>
                      <label className="text-xs text-[#9aa0a8] md:col-span-2"><span className="inline-flex items-center gap-1"><Link2 className="h-3.5 w-3.5" /> Image URL</span><input value={content.portfolio[editingPortfolioIndex].image} onChange={(e) => updatePortfolioItem(editingPortfolioIndex, "image", e.target.value)} className="mt-1 h-10 w-full rounded-lg border border-white/20 bg-black/40 px-3 text-sm" /></label>
                      <label className="text-xs text-[#9aa0a8] md:col-span-2"><span className="inline-flex items-center gap-1"><Video className="h-3.5 w-3.5" /> YouTube Video ID</span><input value={content.portfolio[editingPortfolioIndex].videoId ?? ""} onChange={(e) => updatePortfolioItem(editingPortfolioIndex, "videoId", e.target.value)} className="mt-1 h-10 w-full rounded-lg border border-white/20 bg-black/40 px-3 text-sm" placeholder="Optional" /></label>
                      <label className="text-xs text-[#9aa0a8] md:col-span-2"><span className="inline-flex items-center gap-1"><Upload className="h-3.5 w-3.5" /> Upload Image</span><input type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={(e) => { const file = e.target.files?.[0]; if (file) uploadImage(editingPortfolioIndex, file); }} className="mt-1 w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-sm" />{uploadingIndex === editingPortfolioIndex && <p className="mt-1 text-xs text-[#9aa0a8]">Uploading...</p>}</label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {tab === "hero" && (
            <div className="rounded-2xl border border-white/10 bg-[#0b0b0b] p-4">
              <div className="grid gap-3 md:grid-cols-2">
                <label className="text-xs text-[#9aa0a8]">Badge<input value={content.hero.badge} onChange={(e) => patchContent((p) => ({ ...p, hero: { ...p.hero, badge: e.target.value } }))} className="mt-1 h-10 w-full rounded-lg border border-white/20 bg-black/40 px-3 text-sm" /></label>
                <label className="text-xs text-[#9aa0a8]">Headline Line 1<input value={content.hero.titleLine1} onChange={(e) => patchContent((p) => ({ ...p, hero: { ...p.hero, titleLine1: e.target.value } }))} className="mt-1 h-10 w-full rounded-lg border border-white/20 bg-black/40 px-3 text-sm" /></label>
                <label className="text-xs text-[#9aa0a8]">Headline Line 2<input value={content.hero.titleLine2} onChange={(e) => patchContent((p) => ({ ...p, hero: { ...p.hero, titleLine2: e.target.value } }))} className="mt-1 h-10 w-full rounded-lg border border-white/20 bg-black/40 px-3 text-sm" /></label>
                <label className="text-xs text-[#9aa0a8]">Headline Line 3<input value={content.hero.titleLine3} onChange={(e) => patchContent((p) => ({ ...p, hero: { ...p.hero, titleLine3: e.target.value } }))} className="mt-1 h-10 w-full rounded-lg border border-white/20 bg-black/40 px-3 text-sm" /></label>
                <label className="text-xs text-[#9aa0a8] md:col-span-2">Description<textarea value={content.hero.description} onChange={(e) => patchContent((p) => ({ ...p, hero: { ...p.hero, description: e.target.value } }))} rows={3} className="mt-1 w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-sm" /></label>
                <label className="text-xs text-[#9aa0a8]">Primary CTA<input value={content.hero.ctaPrimary} onChange={(e) => patchContent((p) => ({ ...p, hero: { ...p.hero, ctaPrimary: e.target.value } }))} className="mt-1 h-10 w-full rounded-lg border border-white/20 bg-black/40 px-3 text-sm" /></label>
                <label className="text-xs text-[#9aa0a8]">Secondary CTA<input value={content.hero.ctaSecondary} onChange={(e) => patchContent((p) => ({ ...p, hero: { ...p.hero, ctaSecondary: e.target.value } }))} className="mt-1 h-10 w-full rounded-lg border border-white/20 bg-black/40 px-3 text-sm" /></label>
                <label className="text-xs text-[#9aa0a8] md:col-span-2">Ticker Message<textarea value={content.hero.ticker} onChange={(e) => patchContent((p) => ({ ...p, hero: { ...p.hero, ticker: e.target.value } }))} rows={2} className="mt-1 w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-sm" /></label>
              </div>
            </div>
          )}

          {tab === "testimonials" && (
            <div className="space-y-3">
              {content.testimonials.map((t, i) => (
                <div key={i} className="rounded-xl border border-white/10 bg-[#0b0b0b] p-4">
                  <div className="mb-2 flex items-center justify-between"><h4 className="font-semibold">Testimonial #{i + 1}</h4><button onClick={() => patchContent((p) => ({ ...p, testimonials: p.testimonials.filter((_, idx) => idx !== i) }))} className="text-xs text-[#ff8b8b]">Remove</button></div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <label className="text-xs text-[#9aa0a8]">Name<input value={t.name} onChange={(e) => patchContent((p) => { const arr=[...p.testimonials]; arr[i]={...arr[i],name:e.target.value}; return {...p,testimonials:arr}; })} className="mt-1 h-10 w-full rounded-lg border border-white/20 bg-black/40 px-3 text-sm" /></label>
                    <label className="text-xs text-[#9aa0a8] md:col-span-2">Quote<textarea value={t.quote} onChange={(e) => patchContent((p) => { const arr=[...p.testimonials]; arr[i]={...arr[i],quote:e.target.value}; return {...p,testimonials:arr}; })} rows={2} className="mt-1 w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-sm" /></label>
                  </div>
                </div>
              ))}
              <button onClick={() => patchContent((p) => ({ ...p, testimonials: [...p.testimonials, { ...emptyTestimonial }] }))} className="rounded-lg border border-[#00D1FF]/50 px-3 py-2 text-sm text-[#00D1FF]">Add Testimonial</button>
            </div>
          )}

          {tab === "pricing" && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#0b0b0b] px-3 py-2">
                <Search className="h-4 w-4 text-[#8f97a4]" />
                <input value={pricingQuery} onChange={(e) => setPricingQuery(e.target.value)} placeholder="Search by name/price/accent..." className="w-full bg-transparent text-sm outline-none" />
                <Link href="/#pricing" target="_blank" className="inline-flex items-center gap-1 rounded-md border border-[#00D1FF]/40 px-2 py-1 text-xs text-[#00D1FF]">
                  <ExternalLink className="h-3.5 w-3.5" /> Show Page
                </Link>
              </div>

              <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0b]">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/5 text-xs uppercase tracking-[0.14em] text-[#8f97a4]">
                    <tr>
                      <th className="px-3 py-3">Name</th>
                      <th className="px-3 py-3">Price</th>
                      <th className="px-3 py-3">Subtitle</th>
                      <th className="px-3 py-3">Accent</th>
                      <th className="px-3 py-3">Popular</th>
                      <th className="px-3 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPricing.map(({ item, index }) => (
                      <tr key={index} className="border-t border-white/10">
                        <td className="px-3 py-2 text-white">{item.name || "-"}</td>
                        <td className="px-3 py-2 text-[#9aa0a8]">{item.price || "-"}</td>
                        <td className="px-3 py-2 text-[#9aa0a8]">{item.subtitle || "-"}</td>
                        <td className="px-3 py-2 text-[#9aa0a8]">{item.accent}</td>
                        <td className="px-3 py-2 text-[#9aa0a8]">{item.popular ? "Yes" : "No"}</td>
                        <td className="px-3 py-2">
                          <div className="flex flex-wrap items-center gap-1">
                            <button type="button" onClick={() => setEditingPricingIndex(index)} className="inline-flex items-center gap-1 rounded-md border border-[#00D1FF]/45 px-2 py-1 text-xs text-[#00D1FF]"><Pencil className="h-3.5 w-3.5" /> Edit</button>
                            <button type="button" onClick={() => patchContent((p) => { const arr=[...p.pricing]; if (index>0) [arr[index],arr[index-1]]=[arr[index-1],arr[index]]; return {...p,pricing:arr}; })} className="rounded-md border border-white/20 p-1 text-xs"><ArrowUp className="h-4 w-4" /></button>
                            <button type="button" onClick={() => patchContent((p) => { const arr=[...p.pricing]; if (index<arr.length-1) [arr[index],arr[index+1]]=[arr[index+1],arr[index]]; return {...p,pricing:arr}; })} className="rounded-md border border-white/20 p-1 text-xs"><ArrowDown className="h-4 w-4" /></button>
                            <button type="button" onClick={() => patchContent((p) => ({ ...p, pricing: p.pricing.filter((_, idx) => idx !== index) }))} className="inline-flex items-center gap-1 rounded-md border border-[#FF3B3B]/50 px-2 py-1 text-xs text-[#FF8585]"><Trash2 className="h-3.5 w-3.5" /> Remove</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <button onClick={() => patchContent((p) => ({ ...p, pricing: [...p.pricing, { ...emptyPricing }] }))} className="rounded-lg border border-[#00D1FF]/50 px-3 py-2 text-sm text-[#00D1FF]">Add Pricing Plan</button>

              {editingPricingIndex !== null && content.pricing[editingPricingIndex] && (
                <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
                  <div className="w-full max-w-3xl rounded-2xl border border-white/15 bg-[#0b0b0b] p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Edit Pricing Plan #{editingPricingIndex + 1}</h3>
                      <button type="button" onClick={() => setEditingPricingIndex(null)} className="rounded-md border border-white/20 p-1"><X className="h-4 w-4" /></button>
                    </div>
                    <div className="grid gap-3 md:grid-cols-2">
                      <label className="text-xs text-[#9aa0a8]">Name<input value={content.pricing[editingPricingIndex].name} onChange={(e) => patchContent((p) => { const arr=[...p.pricing]; arr[editingPricingIndex]={...arr[editingPricingIndex],name:e.target.value}; return {...p,pricing:arr}; })} className="mt-1 h-10 w-full rounded-lg border border-white/20 bg-black/40 px-3 text-sm" /></label>
                      <label className="text-xs text-[#9aa0a8]">Price<input value={content.pricing[editingPricingIndex].price} onChange={(e) => patchContent((p) => { const arr=[...p.pricing]; arr[editingPricingIndex]={...arr[editingPricingIndex],price:e.target.value}; return {...p,pricing:arr}; })} className="mt-1 h-10 w-full rounded-lg border border-white/20 bg-black/40 px-3 text-sm" /></label>
                      <label className="text-xs text-[#9aa0a8]">Subtitle<input value={content.pricing[editingPricingIndex].subtitle} onChange={(e) => patchContent((p) => { const arr=[...p.pricing]; arr[editingPricingIndex]={...arr[editingPricingIndex],subtitle:e.target.value}; return {...p,pricing:arr}; })} className="mt-1 h-10 w-full rounded-lg border border-white/20 bg-black/40 px-3 text-sm" /></label>
                      <label className="text-xs text-[#9aa0a8]">CTA<input value={content.pricing[editingPricingIndex].cta} onChange={(e) => patchContent((p) => { const arr=[...p.pricing]; arr[editingPricingIndex]={...arr[editingPricingIndex],cta:e.target.value}; return {...p,pricing:arr}; })} className="mt-1 h-10 w-full rounded-lg border border-white/20 bg-black/40 px-3 text-sm" /></label>
                      <label className="text-xs text-[#9aa0a8]">Accent<select value={content.pricing[editingPricingIndex].accent} onChange={(e) => patchContent((p) => { const arr=[...p.pricing]; arr[editingPricingIndex]={...arr[editingPricingIndex],accent:e.target.value as PricingPlan['accent']}; return {...p,pricing:arr}; })} className="mt-1 h-10 w-full rounded-lg border border-white/20 bg-black/40 px-3 text-sm text-white"><option className="bg-[#0b0b0b] text-white" value="green">green</option><option className="bg-[#0b0b0b] text-white" value="blue">blue</option><option className="bg-[#0b0b0b] text-white" value="purple">purple</option></select></label>
                      <label className="flex items-center gap-2 text-xs text-[#9aa0a8]"><input type="checkbox" checked={Boolean(content.pricing[editingPricingIndex].popular)} onChange={(e) => patchContent((p) => { const arr=[...p.pricing]; arr[editingPricingIndex]={...arr[editingPricingIndex],popular:e.target.checked}; return {...p,pricing:arr}; })} /> Mark as popular</label>
                      <label className="text-xs text-[#9aa0a8] md:col-span-2">Description<textarea value={content.pricing[editingPricingIndex].description} onChange={(e) => patchContent((p) => { const arr=[...p.pricing]; arr[editingPricingIndex]={...arr[editingPricingIndex],description:e.target.value}; return {...p,pricing:arr}; })} rows={2} className="mt-1 w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-sm" /></label>
                      <label className="text-xs text-[#9aa0a8] md:col-span-2">Features (one per line)<textarea value={content.pricing[editingPricingIndex].features.join("\n")} onChange={(e) => patchContent((p) => { const arr=[...p.pricing]; arr[editingPricingIndex]={...arr[editingPricingIndex],features:e.target.value.split("\n").filter(Boolean)}; return {...p,pricing:arr}; })} rows={4} className="mt-1 w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-sm" /></label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

