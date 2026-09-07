"use client";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Logo } from "./site";
import {
  FiPlus,
  FiLogOut,
  FiArrowUpRight,
  FiRefreshCw,
  FiShield,
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
  problem?: string;
  preferredDate?: string;
  status?: string;
  notification?: string;
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
  "posts",
  "services",
  "faqs",
  "reviews",
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
  const [tab, setTab] = useState("appointments");
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [stats, setStats] = useState<Record<string, number>>({});
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  const [editor, setEditor] = useState<
    (typeof blank & { _id?: string }) | null
  >(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const load = useCallback(async () => {
    setBusy(true);
    setError("");
    try {
      const [data, counts] = await Promise.all([api(tab), api("stats")]);
      setRecords(data);
      setStats(counts);
    } catch (e) {
      const err = e as Error & { status?: number };
      setError(err.message);
      if (err.status === 401) setAuth("out");
    } finally {
      setBusy(false);
    }
  }, [tab]);
  useEffect(() => {
    api("me")
      .then(() => setAuth("in"))
      .catch(() => setAuth("out"));
  }, []);
  useEffect(() => {
    if (auth !== "in") return;
    let active = true;
    Promise.all([api(tab), api("stats")])
      .then(([data, counts]) => {
        if (active) {
          setRecords(data);
          setStats(counts);
        }
      })
      .catch((e) => {
        if (active) {
          setError(e.message);
          if (e.status === 401) setAuth("out");
        }
      });
    return () => {
      active = false;
    };
  }, [auth, tab]);
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
        "Content saved. Published content is now available on the website.",
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
  async function remove() {
    if (!deleteId) return;
    setBusy(true);
    try {
      await api(`${tab}/${deleteId}`, { method: "DELETE" });
      setDeleteId(null);
      setNotice("Record deleted.");
      await load();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
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
  async function retry(id: string) {
    setBusy(true);
    try {
      const result = await api(`${tab}/${id}/retry-email`, { method: "POST" });
      setNotice(`Notification: ${result.notification}`);
      await load();
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
  const lead = ["appointments", "enquiries"].includes(tab);
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
      <div className="admin-heading">
        <span className="eyebrow">YOUR BUSINESS, AT A GLANCE</span>
        <h1>Service overview</h1>
        <p>Manage your repairs, customer conversations and website content.</p>
      </div>
      <div className="admin-stats">
        {[
          ["appointments", "Total appointments"],
          ["pending", "Pending repairs"],
          ["completed", "Completed repairs"],
          ["posts", "Blog posts"],
          ["messages", "Customer messages"],
        ].map(([key, label]) => (
          <div className="stat-card" key={key}>
            <span>{label}</span>
            <strong>{stats[key] ?? "—"}</strong>
          </div>
        ))}
      </div>
      <nav className="admin-tabs" aria-label="Dashboard sections">
        {tabs.map((t) => (
          <button
            key={t}
            className={t === tab ? "active" : ""}
            onClick={() => {
              setTab(t);
              setRecords([]);
              setEditor(null);
              setNotice("");
              setDeleteId(null);
            }}
          >
            {t === "posts"
              ? "Blog posts"
              : t === "enquiries"
                ? "Customer messages"
                : t}
          </button>
        ))}
      </nav>
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
        {deleteId && (
          <div className="form-error" role="alert">
            <p>Delete this record permanently? This cannot be undone.</p>
            <button className="button small" onClick={remove} disabled={busy}>
              Delete record
            </button>
            <button
              className="button small"
              style={{ marginLeft: 10 }}
              onClick={() => setDeleteId(null)}
            >
              Cancel
            </button>
          </div>
        )}
        {editor ? (
          <form onSubmit={save} className="admin-editor">
            <h3>
              {editor._id ? "Edit" : "Create"}{" "}
              {tab === "posts" ? "blog post" : tab.replace(/s$/, "")}
            </h3>
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
                    ...(!editor._id && editor.slug === slugify(editor.title)
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
                onChange={(e) => setEditor({ ...editor, slug: e.target.value })}
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
                      setEditor({ ...editor, description: e.target.value })
                    }
                  />
                </label>
                <label className="admin-field">
                  {tab === "posts" ? "Category" : "Service tagline"}
                  <input
                    value={tab === "posts" ? editor.category : editor.label}
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
                For articles, put each section heading on its own line, followed
                by the paragraph. Separate sections with a blank line.
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
                <span>{editor.image || "JPEG, PNG or WebP, up to 5 MB"}</span>
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
                      setEditor({ ...editor, rating: Number(e.target.value) })
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
                  Only publish authentic customer reviews and photos you have
                  permission to use.
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
            <button className="button" disabled={busy}>
              {busy ? "Saving…" : "Save content"}
            </button>
            <button
              className="button"
              type="button"
              onClick={() => setEditor(null)}
            >
              Cancel
            </button>
          </form>
        ) : busy && records.length === 0 ? (
          <p className="admin-empty" role="status">
            Loading records…
          </p>
        ) : records.length === 0 ? (
          <div className="admin-empty">
            <h3>No {tab} yet.</h3>
            <p>
              {lead
                ? "New customer requests will appear here."
                : "Create your first entry to get started."}
            </p>
          </div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>{lead ? "Customer" : "Title"}</th>
                  <th>{lead ? "Request details" : "Visibility"}</th>
                  <th>{lead ? "Status & notification" : "Last updated"}</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {records.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <strong>{lead ? item.name : item.title}</strong>
                      {lead ? (
                        <>
                          <p>
                            <a href={`mailto:${item.email}`}>{item.email}</a>
                          </p>
                          <p>
                            <a href={`tel:${item.phone}`}>{item.phone}</a>
                          </p>
                          <p>{item.postcode}</p>
                        </>
                      ) : (
                        <p>{item.slug}</p>
                      )}
                    </td>
                    <td>
                      {lead ? (
                        <>
                          <strong>{item.brand}</strong>
                          <p>{item.problem}</p>
                          <p>
                            Preferred: {item.preferredDate || "Not specified"}
                          </p>
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
                          <p>Email: {item.notification}</p>
                          {item.notification !== "sent" && (
                            <button
                              onClick={() => retry(item._id)}
                              disabled={busy}
                            >
                              Retry email
                            </button>
                          )}
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
                      {!lead && (
                        <button onClick={() => setEditor(item)}>Edit</button>
                      )}
                      <button onClick={() => setDeleteId(item._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
