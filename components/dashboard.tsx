"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { Logo } from "./site";
import {
  FiPlus,
  FiLogOut,
  FiArrowUpRight,
  FiRefreshCw,
  FiShield,
  FiCalendar,
  FiMessageSquare,
  FiMessageCircle,
  FiFileText,
  FiTool,
  FiHelpCircle,
  FiStar,
  FiMenu,
  FiChevronLeft,
} from "react-icons/fi";
type RecordItem = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  category: string;
  label: string;
  image: string;
  location: string;
  rating: number;
  published: boolean;
  name?: string;
  email?: string;
  phone?: string;
  brand?: string;
  postcode?: string;
  address?: string;
  problem?: string;
  preferredDate?: string;
  calendlyStartTime?: string;
  calendlyTimezone?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
};
const blank = {
  title: "",
  slug: "",
  description: "",
  content: "",
  category: "",
  label: "",
  image: "",
  location: "",
  rating: 5,
  published: false,
};
const tabs = [
  "appointments",
  "enquiries",
  "chatbot",
  "posts",
  "services",
  "faqs",
  "reviews",
];
const sectionIcons = [
  FiCalendar,
  FiMessageSquare,
  FiMessageCircle,
  FiFileText,
  FiTool,
  FiHelpCircle,
  FiStar,
];
const sectionLabels = [
  "Appointments",
  "Customer messages",
  "Chatbot leads",
  "Blog posts",
  "Services",
  "FAQs",
  "Reviews",
];
const slugify = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
async function api(path: string, options?: RequestInit) {
  const r = await fetch(`/api/admin/${path}`, options);
  const data = await r
    .json()
    .catch(() => ({ error: "The service is unavailable. Please try again." }));
  if (!r.ok)
    throw Object.assign(new Error(data.error || "Request failed."), {
      status: r.status,
    });
  return data;
}
export default function Dashboard() {
  const [auth, setAuth] = useState<"loading" | "in" | "out">("loading");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [tab, setTab] = useState("appointments");
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [stats, setStats] = useState<Record<string, number>>({});
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  const [editor, setEditor] = useState<
    (typeof blank & Partial<RecordItem>) | null
  >(null);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: "",
    brand: "",
    published: "",
    sort: "newest",
  });
  const [options, setOptions] = useState<{
    brands: string[];
  }>({ brands: [] });
  const requestId = useRef({ value: 0 });
  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(search.trim());
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);
  const listPath = `${tab}?${new URLSearchParams({ page: String(page), q: query, ...filters })}`;
  const load = useCallback(async () => {
    const id = ++requestId.current.value;
    await Promise.resolve();
    if (id !== requestId.current.value) return;
    setBusy(true);
    setError("");
    try {
      const [data, counts] = await Promise.all([api(listPath), api("stats")]);
      if (id !== requestId.current.value) return;
      setRecords(data.items);
      setTotal(data.total);
      setPages(data.pages);
      setPage(data.page);
      setOptions({ brands: data.brands });
      setStats(counts);
    } catch (e) {
      if (id !== requestId.current.value) return;
      const err = e as Error & { status?: number };
      setError(err.message);
      if (err.status === 401) setAuth("out");
    } finally {
      if (id === requestId.current.value) setBusy(false);
    }
  }, [listPath]);
  useEffect(() => {
    api("me")
      .then(() => setAuth("in"))
      .catch(() => setAuth("out"));
  }, []);
  useEffect(() => {
    if (auth !== "in") return;
    const timer = setTimeout(() => void load(), 0);
    const activeRequest = requestId.current;
    return () => {
      clearTimeout(timer);
      activeRequest.value++;
    };
  }, [auth, load]);
  function updateFilter(key: keyof typeof filters, value: string) {
    setFilters((current) => ({ ...current, [key]: value }));
    setPage(1);
  }
  function clearFilters() {
    setSearch("");
    setQuery("");
    setPage(1);
    setFilters({
      status: "",
      brand: "",
      published: "",
      sort: "newest",
    });
  }
  async function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const values = Object.fromEntries(new FormData(e.currentTarget));
    try {
      await api("login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      setAuth("in");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function logout() {
    try {
      await api("logout", { method: "POST" });
      setAuth("out");
      setRecords([]);
      setStats({});
      setEditor(null);
    } catch (e) {
      setError((e as Error).message);
    }
  }
  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!editor) return;
    setBusy(true);
    setError("");
    try {
      await api(`${tab}${editor._id ? `/${editor._id}` : ""}`, {
        method: editor._id ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editor),
      });
      setEditor(null);
      setNotice(
        ["appointments", "enquiries"].includes(tab)
          ? "Customer request updated."
          : "Content saved. Published content is now available on the website.",
      );
      await load();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function changeStatus(id: string, status: string) {
    setError("");
    try {
      await api(`${tab}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      await load();
      setNotice("Appointment status updated.");
    } catch (e) {
      setError((e as Error).message);
    }
  }
  async function upload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const data = new FormData();
      data.append("image", file);
      const result = await api("upload", { method: "POST", body: data });
      setEditor((current) =>
        current ? { ...current, image: result.url } : current,
      );
      setNotice("Image uploaded. Save the content to use it.");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  if (auth === "loading")
    return (
      <div className="admin-page">
        <div className="admin-login">
          <Logo />
          <p role="status">Checking your session…</p>
        </div>
      </div>
    );
  if (auth === "out")
    return (
      <div className="admin-page">
        <form onSubmit={login} className="admin-login">
          <Logo />
          <span className="eyebrow">PINTEROK ADMIN</span>
          <h1>Welcome back.</h1>
          <p>Sign in to manage your repairs, enquiries and website content.</p>
          <label className="admin-field">
            Email address
            <input type="email" name="email" autoComplete="username" required />
          </label>
          <label className="admin-field">
            Password
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              required
            />
          </label>
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <button className="button form-submit" disabled={busy}>
            {busy ? "Signing in…" : "Sign in"}
            <FiArrowUpRight />
          </button>
          <p className="form-note">
            <FiShield /> Authorised staff only
          </p>
          <Link className="text-link" href="/" style={{ marginTop: 24 }}>
            ? Back to website
          </Link>
        </form>
      </div>
    );
  const lead = ["appointments", "enquiries", "chatbot"].includes(tab);
  const chatbotTab = tab === "chatbot";
  return (
    <div className="admin-page">
      <div className="admin-top">
        <div>
          <Logo />
          <span className="status-pill">Admin workspace</span>
        </div>
        <div>
          <Link href="/" className="text-link">
            View website <FiArrowUpRight />
          </Link>
          <button className="button small" onClick={logout}>
            <FiLogOut /> Sign out
          </button>
        </div>
      </div>
      <div
        className={`admin-workspace${sidebarCollapsed ? " sidebar-collapsed" : ""}`}
      >
        <aside className="admin-sidebar" aria-label="Admin sidebar">
          <div className="admin-sidebar-heading">
            <span>Workspace</span>
            <button
              type="button"
              className="admin-sidebar-toggle"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              aria-expanded={!sidebarCollapsed}
              aria-controls="admin-section-navigation"
              aria-label={
                sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
              }
              title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {sidebarCollapsed ? (
                <FiMenu aria-hidden="true" />
              ) : (
                <FiChevronLeft aria-hidden="true" />
              )}
            </button>
          </div>
          <nav id="admin-section-navigation" aria-label="Dashboard sections">
            {tabs.map((t, i) => {
              const Icon = sectionIcons[i];
              return (
                <button
                  key={t}
                  type="button"
                  className={t === tab ? "active" : ""}
                  aria-current={t === tab ? "page" : undefined}
                  aria-label={sectionLabels[i]}
                  title={sectionLabels[i]}
                  onClick={() => {
                    setTab(t);
                    clearFilters();
                    setTotal(0);
                    setPages(1);
                    setRecords([]);
                    setEditor(null);
                    setNotice("");
                  }}
                >
                  <Icon aria-hidden="true" />
                  <span>{sectionLabels[i]}</span>
                </button>
              );
            })}
          </nav>
        </aside>
        <main className="admin-main">
          <div className="admin-heading">
            <span className="eyebrow">YOUR BUSINESS, AT A GLANCE</span>
            <h1>Service overview</h1>
            <p>
              Manage your repairs, customer conversations and website content.
            </p>
          </div>
          <div className="admin-stats">
            {[
              ["appointments", "Total appointments"],
              ["pending", "Pending repairs"],
              ["completed", "Completed repairs"],
              ["posts", "Blog posts"],
              ["messages", "Customer messages"],
              ["chats", "Chatbot leads"],
            ].map(([key, label]) => (
              <div className="stat-card" key={key}>
                <span>{label}</span>
                <strong>{stats[key] ?? "—"}</strong>
              </div>
            ))}
          </div>

          {error && (
            <div className="form-error" role="alert">
              {error}
            </div>
          )}
          {notice && (
            <p role="status" style={{ marginBottom: 20, color: "#19734d" }}>
              {notice}
            </p>
          )}
          <div className="admin-panel">
            <div className="admin-panel-header">
              <h2>{tab === "posts" ? "Blog posts" : tab}</h2>
              <div>
                <button
                  className="button small"
                  onClick={load}
                  disabled={busy}
                  aria-label="Refresh records"
                >
                  <FiRefreshCw />
                </button>
                {!lead && (
                  <button
                    className="button small"
                    style={{ marginLeft: 10 }}
                    onClick={() => {
                      setEditor({ ...blank });
                      setNotice("");
                    }}
                  >
                    <FiPlus />
                    Create new
                  </button>
                )}
              </div>
            </div>
            {!editor && (
              <div className="admin-list-controls">
                <div className="admin-search-row">
                  <label className="admin-field admin-search">
                    Search all {tab}
                    <input
                      type="search"
                      value={search}
                      maxLength={200}
                      placeholder={
                        chatbotTab
                          ? "Name, phone, address or problem…"
                          : lead
                            ? "Name, phone, email, postcode or printer issue…"
                            : "Title, category or content…"
                      }
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </label>
                  <button
                    className="button small"
                    aria-expanded={filtersOpen}
                    aria-controls="admin-filters"
                    onClick={() => setFiltersOpen(!filtersOpen)}
                  >
                    Filters
                  </button>
                  <button className="text-link" onClick={clearFilters}>
                    Clear all
                  </button>
                </div>
                {filtersOpen && (
                  <div id="admin-filters" className="admin-filter-grid">
                    {lead ? (
                      <>
                        <label className="admin-field">
                          Repair status
                          <select
                            value={filters.status}
                            onChange={(e) =>
                              updateFilter("status", e.target.value)
                            }
                          >
                            <option value="">All statuses</option>
                            {[
                              "pending",
                              "confirmed",
                              "in-progress",
                              "completed",
                              "cancelled",
                            ].map((value) => (
                              <option key={value}>{value}</option>
                            ))}
                          </select>
                        </label>
                        {!chatbotTab && (
                          <label className="admin-field">
                            Printer brand
                            <select
                              value={filters.brand}
                              onChange={(e) =>
                                updateFilter("brand", e.target.value)
                              }
                            >
                              <option value="">All brands</option>
                              {options.brands.map((value) => (
                                <option key={value}>{value}</option>
                              ))}
                            </select>
                          </label>
                        )}
                      </>
                    ) : (
                      <label className="admin-field">
                        Publication status
                        <select
                          value={filters.published}
                          onChange={(e) =>
                            updateFilter("published", e.target.value)
                          }
                        >
                          <option value="">All content</option>
                          <option value="true">Published</option>
                          <option value="false">Draft</option>
                        </select>
                      </label>
                    )}
                    <label className="admin-field">
                      Sort by
                      <select
                        value={filters.sort}
                        onChange={(e) => updateFilter("sort", e.target.value)}
                      >
                        <option value="newest">Newest first</option>
                        <option value="oldest">Oldest first</option>
                      </select>
                    </label>
                  </div>
                )}
                <p role="status">
                  {busy
                    ? "Loading records…"
                    : `${total} matching records · Search covers all records in this section`}
                </p>
              </div>
            )}
            {editor ? (
              <form onSubmit={save} className="admin-editor">
                <h3>
                  {editor._id ? "Edit" : "Create"}{" "}
                  {tab === "posts" ? "blog post" : tab.replace(/s$/, "")}
                </h3>
                {lead ? (
                  <>
                    {(chatbotTab
                      ? ([
                          ["name", "Customer name", "text", 100],
                          ["phone", "Phone number", "tel", 25],
                          ["address", "Address", "text", 200],
                        ] as const)
                      : ([
                          ["name", "Customer name", "text", 100],
                          ["email", "Email address", "email", 254],
                          ["phone", "Phone number", "tel", 25],
                          ["brand", "Printer brand", "text", 80],
                          ["postcode", "Postcode", "text", 12],
                          [
                            "preferredDate",
                            "Preferred date",
                            "date",
                            undefined,
                          ],
                        ] as const)
                    ).map(([key, label, type, maxLength]) => (
                      <label className="admin-field" key={key}>
                        {label}
                        <input
                          type={type}
                          maxLength={maxLength}
                          value={editor[key] || ""}
                          required={
                            key !== "postcode" && key !== "preferredDate"
                          }
                          minLength={key === "name" ? 2 : undefined}
                          pattern={
                            key === "phone" ? "[+0-9 ()-]{7,25}" : undefined
                          }
                          onChange={(e) =>
                            setEditor({ ...editor, [key]: e.target.value })
                          }
                        />
                      </label>
                    ))}
                    <label className="admin-field">
                      {chatbotTab ? "Problem" : "Printer problem"}
                      <textarea
                        required
                        minLength={10}
                        maxLength={3000}
                        rows={4}
                        value={editor.problem || ""}
                        onChange={(e) =>
                          setEditor({ ...editor, problem: e.target.value })
                        }
                      />
                    </label>
                    <label className="admin-field">
                      Repair status
                      <select
                        value={editor.status || "pending"}
                        onChange={(e) =>
                          setEditor({ ...editor, status: e.target.value })
                        }
                      >
                        {[
                          "pending",
                          "confirmed",
                          "in-progress",
                          "completed",
                          "cancelled",
                        ].map((status) => (
                          <option key={status}>{status}</option>
                        ))}
                      </select>
                    </label>
                  </>
                ) : (
                  <>
                    <label className="admin-field">
                      {tab === "faqs"
                        ? "Question"
                        : tab === "reviews"
                          ? "Customer name"
                          : "Title"}
                      <input
                        required
                        minLength={2}
                        maxLength={200}
                        value={editor.title}
                        onChange={(e) =>
                          setEditor({
                            ...editor,
                            title: e.target.value,
                            ...(!editor._id &&
                            editor.slug === slugify(editor.title)
                              ? {
                                  slug: e.target.value
                                    .toLowerCase()
                                    .replace(/[^a-z0-9]+/g, "-")
                                    .replace(/^-|-$/g, ""),
                                }
                              : {}),
                          })
                        }
                      />
                    </label>
                    <label className="admin-field">
                      URL slug / unique identifier
                      <input
                        required
                        pattern="[a-z0-9]+(-[a-z0-9]+)*"
                        value={editor.slug}
                        onChange={(e) =>
                          setEditor({ ...editor, slug: e.target.value })
                        }
                      />
                    </label>
                    {["posts", "services"].includes(tab) && (
                      <>
                        <label className="admin-field">
                          Short description / SEO description
                          <textarea
                            maxLength={500}
                            rows={3}
                            value={editor.description}
                            onChange={(e) =>
                              setEditor({
                                ...editor,
                                description: e.target.value,
                              })
                            }
                          />
                        </label>
                        <label className="admin-field">
                          {tab === "posts" ? "Category" : "Service tagline"}
                          <input
                            value={
                              tab === "posts" ? editor.category : editor.label
                            }
                            onChange={(e) =>
                              setEditor({
                                ...editor,
                                [tab === "posts" ? "category" : "label"]:
                                  e.target.value,
                              })
                            }
                          />
                        </label>
                      </>
                    )}
                    <label className="admin-field">
                      {tab === "faqs"
                        ? "Answer"
                        : tab === "reviews"
                          ? "Review"
                          : "Content"}
                      <textarea
                        rows={12}
                        maxLength={60000}
                        value={editor.content}
                        onChange={(e) =>
                          setEditor({ ...editor, content: e.target.value })
                        }
                      />
                    </label>
                    {tab === "posts" && (
                      <p className="form-note">
                        For articles, put each section heading on its own line,
                        followed by the paragraph. Separate sections with a
                        blank line.
                      </p>
                    )}
                    {["posts", "reviews"].includes(tab) && (
                      <label className="admin-field">
                        {tab === "reviews"
                          ? "Customer photo (with permission)"
                          : "Article image"}
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          onChange={upload}
                        />
                        <span>
                          {editor.image || "JPEG, PNG or WebP, up to 5 MB"}
                        </span>
                        {editor.image && (
                          <button
                            type="button"
                            className="text-link"
                            onClick={() => setEditor({ ...editor, image: "" })}
                          >
                            Remove image
                          </button>
                        )}
                      </label>
                    )}
                    {tab === "reviews" && (
                      <>
                        <label className="admin-field">
                          Location
                          <input
                            value={editor.location}
                            onChange={(e) =>
                              setEditor({ ...editor, location: e.target.value })
                            }
                          />
                        </label>
                        <label className="admin-field">
                          Rating
                          <select
                            value={editor.rating}
                            onChange={(e) =>
                              setEditor({
                                ...editor,
                                rating: Number(e.target.value),
                              })
                            }
                          >
                            {[5, 4, 3, 2, 1].map((r) => (
                              <option key={r} value={r}>
                                {r} stars
                              </option>
                            ))}
                          </select>
                        </label>
                        <p>
                          Only publish authentic customer reviews and photos you
                          have permission to use.
                        </p>
                      </>
                    )}
                    <label className="consent">
                      <input
                        type="checkbox"
                        checked={editor.published}
                        onChange={(e) =>
                          setEditor({ ...editor, published: e.target.checked })
                        }
                      />
                      Publish on website
                    </label>
                  </>
                )}
                <button className="button" disabled={busy}>
                  {busy ? "Saving…" : "Save changes"}
                </button>
                <button
                  className="button"
                  type="button"
                  onClick={() => setEditor(null)}
                >
                  Cancel
                </button>
              </form>
            ) : busy ? (
              <p className="admin-empty" role="status">
                Loading records…
              </p>
            ) : records.length === 0 ? (
              <div className="admin-empty">
                <h3>No matching {tab}.</h3>
                <p>
                  {lead
                    ? "Try another search or clear the filters. New requests will appear here."
                    : "Clear the filters or create a new entry."}
                </p>
              </div>
            ) : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>{lead ? "Customer" : "Title"}</th>
                      <th>{lead ? "Request details" : "Visibility"}</th>
                      <th>{lead ? "Repair status" : "Last updated"}</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((item) => (
                      <tr key={item._id}>
                        <td>
                          <span className="admin-data-label">
                            {lead ? "Name" : "Title"}
                          </span>
                          <strong>{lead ? item.name : item.title}</strong>
                          {lead ? (
                            <>
                              {!chatbotTab && (
                                <p>
                                  <span className="admin-data-label">
                                    Email
                                  </span>
                                  <a href={`mailto:${item.email}`}>
                                    {item.email}
                                  </a>
                                </p>
                              )}
                              <p>
                                <span className="admin-data-label">Phone</span>
                                <a href={`tel:${item.phone}`}>{item.phone}</a>
                              </p>
                              <p>
                                <span className="admin-data-label">
                                  {chatbotTab ? "Address" : "Postcode"}
                                </span>
                                {(chatbotTab ? item.address : item.postcode) ||
                                  "Not supplied"}
                              </p>
                            </>
                          ) : (
                            <p>
                              <span className="admin-data-label">Slug</span>
                              {item.slug || "Not specified"}
                            </p>
                          )}
                        </td>
                        <td>
                          {lead ? (
                            <>
                              {!chatbotTab && (
                                <>
                                  <span className="admin-data-label">
                                    Printer brand
                                  </span>
                                  <strong>{item.brand}</strong>
                                </>
                              )}
                              <p>
                                <span className="admin-data-label">
                                  Problem
                                </span>
                                {item.problem}
                              </p>
                              {!chatbotTab && (
                                <p>
                                  <span className="admin-data-label">
                                    Preferred date
                                  </span>
                                  {item.preferredDate || "Not specified"}
                                </p>
                              )}
                              {item.calendlyStartTime && (
                                <p>
                                  <span className="admin-data-label">
                                    Calendly appointment (UK time)
                                  </span>
                                  {new Date(
                                    item.calendlyStartTime,
                                  ).toLocaleString("en-GB", {
                                    timeZone: "Europe/London",
                                    dateStyle: "medium",
                                    timeStyle: "short",
                                  })}
                                  <span className="admin-data-label">
                                    Customer timezone
                                  </span>
                                  {item.calendlyTimezone || "UTC"}
                                </p>
                              )}
                            </>
                          ) : (
                            <span className="status-pill">
                              {item.published ? "Published" : "Draft"}
                            </span>
                          )}
                        </td>
                        <td>
                          {lead ? (
                            <>
                              <span className="admin-data-label">
                                Repair status
                              </span>
                              <select
                                aria-label={`Status for ${item.name}`}
                                value={item.status}
                                onChange={(e) =>
                                  changeStatus(item._id, e.target.value)
                                }
                              >
                                {[
                                  "pending",
                                  "confirmed",
                                  "in-progress",
                                  "completed",
                                  "cancelled",
                                ].map((s) => (
                                  <option key={s}>{s}</option>
                                ))}
                              </select>
                            </>
                          ) : item.updatedAt || item.createdAt ? (
                            new Date(
                              item.updatedAt || item.createdAt!,
                            ).toLocaleDateString("en-GB")
                          ) : (
                            "—"
                          )}
                        </td>
                        <td>
                          <button
                            onClick={() => {
                              setEditor({ ...blank, ...item });
                              setNotice("");
                              setError("");
                            }}
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <nav className="admin-pagination" aria-label="Record pages">
                  <span>
                    Showing {(page - 1) * 10 + 1}–{Math.min(page * 10, total)}{" "}
                    of {total}
                  </span>
                  <div>
                    <button
                      disabled={page <= 1 || busy}
                      onClick={() => setPage(1)}
                    >
                      First
                    </button>
                    <button
                      disabled={page <= 1 || busy}
                      onClick={() => setPage(page - 1)}
                    >
                      Previous
                    </button>
                    <span aria-current="page">
                      Page {page} of {pages}
                    </span>
                    <button
                      disabled={page >= pages || busy}
                      onClick={() => setPage(page + 1)}
                    >
                      Next
                    </button>
                    <button
                      disabled={page >= pages || busy}
                      onClick={() => setPage(pages)}
                    >
                      Last
                    </button>
                  </div>
                </nav>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
