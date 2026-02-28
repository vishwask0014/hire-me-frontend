"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { apiUrl, requestOptions } from "@/lib/api-client";

export default function ChatPage() {
  const searchParams = useSearchParams();
  const requirementId = searchParams.get("requirementId");

  const [me, setMe] = useState(null);
  const [threads, setThreads] = useState([]);
  const [activeThreadId, setActiveThreadId] = useState("");
  const [activeThread, setActiveThread] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const activeThreadMeta = useMemo(
    () => threads.find((item) => item.id === activeThreadId) || null,
    [threads, activeThreadId],
  );

  const loadThreads = useCallback(async (options = {}) => {
    const query = requirementId ? `?requirementId=${encodeURIComponent(requirementId)}` : "";
    const response = await fetch(apiUrl(`/api/chat/threads${query}`), requestOptions);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Unable to load chat threads.");
    }
    setThreads(data.threads || []);
    if (!options.preserveSelected && data.threads?.length > 0) {
      setActiveThreadId((prev) => prev || data.threads[0].id);
    }
    if (!data.threads?.length) {
      setActiveThreadId("");
      setActiveThread(null);
    }
    return data.threads || [];
  }, [requirementId]);

  const loadThreadDetail = useCallback(async (threadId) => {
    if (!threadId) {
      setActiveThread(null);
      return;
    }
    const response = await fetch(apiUrl(`/api/chat/threads/${threadId}`), requestOptions);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Unable to load chat.");
    }
    setActiveThread(data.thread);
  }, []);

  const ensureFreelancerThread = useCallback(async (targetRequirementId) => {
    const response = await fetch(apiUrl("/api/chat/threads"), {
      ...requestOptions,
      method: "POST",
      body: JSON.stringify({ requirementId: targetRequirementId }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Unable to open chat.");
    }
    return data.thread;
  }, []);

  useEffect(() => {
    async function init() {
      setLoading(true);
      setError("");
      try {
        const meRes = await fetch(apiUrl("/api/auth/me"), requestOptions);
        const meData = await meRes.json();
        const user = meData.user || null;
        if (!user) {
          setMe(null);
          setThreads([]);
          setActiveThreadId("");
          setActiveThread(null);
          return;
        }
        setMe(user);

        if (requirementId) {
          try {
            const thread = await ensureFreelancerThread(requirementId);
            setActiveThreadId(thread.id);
          } catch (threadError) {
            // For hirer users, this can happen if no freelancer is assigned yet.
            const msg = threadError?.message || "Unable to open chat.";
            if (!msg.toLowerCase().includes("freelancer is required")) {
              throw threadError;
            }
            setError("Chat can be opened after a freelancer is assigned to this requirement.");
          }
        }

        await loadThreads({ preserveSelected: Boolean(requirementId) });
      } catch (initError) {
        setError(initError.message || "Unable to load chat.");
      } finally {
        setLoading(false);
      }
    }

    init();
  }, [ensureFreelancerThread, loadThreads, requirementId]);

  useEffect(() => {
    async function run() {
      if (!activeThreadId) return;
      setError("");
      try {
        await loadThreadDetail(activeThreadId);
      } catch (detailError) {
        setError(detailError.message || "Unable to load chat.");
      }
    }
    run();
  }, [activeThreadId, loadThreadDetail]);

  async function sendMessage(event) {
    event.preventDefault();
    const text = messageText.trim();
    if (!text || !activeThreadId) return;

    setSending(true);
    setError("");
    try {
      const response = await fetch(apiUrl(`/api/chat/threads/${activeThreadId}/messages`), {
        ...requestOptions,
        method: "POST",
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Unable to send message.");
      }
      setMessageText("");
      await loadThreadDetail(activeThreadId);
      await loadThreads({ preserveSelected: true });
    } catch (sendError) {
      setError(sendError.message || "Unable to send message.");
    } finally {
      setSending(false);
    }
  }

  if (loading) {
    return <p className="ui-muted text-sm">Loading chat...</p>;
  }

  if (!me) {
    return (
      <section className="ui-card p-6">
        <h1 className="ui-title text-xl">Login Required</h1>
        <p className="ui-muted mt-2 text-sm">Please login to access chat.</p>
        <Link href="/login" className="ui-link mt-4 inline-block text-sm">
          Go to Login
        </Link>
      </section>
    );
  }

  return (
    <section className="space-y-4 md:space-y-6">
      <div className="ui-card-strong p-6 md:p-8">
        <p className="rounded-md px-2 py-1 text-xs font-semibold uppercase text-black tracking-[0.18em]" style={{ background: "var(--accent)", color: "#000", width: "fit-content" }}>Chat</p>
        <h1 className="ui-title mt-3 text-3xl md:text-4xl">Messages</h1>
        <p className="ui-muted mt-2 text-sm md:text-base">
          Ask for more details and coordinate directly with your {me.userType === "hirer" ? "freelancers" : "hirers"}.
        </p>
      </div>

      {error ? <p className="ui-alert-error text-sm">{error}</p> : null}

      <div className="grid gap-4 lg:grid-cols-[340px_1fr] lg:gap-6">
        <aside className="ui-card h-[70vh] overflow-auto p-4 md:p-5">
          <h2 className="ui-title text-base">Conversations</h2>
          <div className="mt-3 space-y-2">
            {threads.length === 0 ? (
              <p className="ui-muted text-sm">No chats yet.</p>
            ) : (
              threads.map((thread) => {
                const counterpart =
                  me.userType === "hirer" ? thread.freelancerName : thread.hirerName;
                return (
                  <button
                    key={thread.id}
                    type="button"
                    onClick={() => setActiveThreadId(thread.id)}
                    className={`block w-full rounded-2xl border p-3 text-left ${activeThreadId === thread.id ? "ring-2" : ""}`}
                    style={
                      activeThreadId === thread.id
                        ? {
                            borderColor: "var(--accent)",
                            boxShadow: "0 0 0 2px color-mix(in srgb, var(--accent) 18%, transparent)",
                            background: "color-mix(in srgb, var(--surface) 75%, var(--surface-2) 25%)",
                          }
                        : {
                            borderColor: "color-mix(in srgb, var(--border) 35%, transparent)",
                            background: "var(--surface)",
                          }
                    }
                  >
                    <p className="ui-title text-sm">{thread.requirementTitle}</p>
                    <p className="ui-muted mt-1 text-xs">with {counterpart}</p>
                    <p className="ui-muted mt-2 line-clamp-1 text-xs">{thread.lastMessage || "No messages yet"}</p>
                  </button>
                );
              })
            )}
          </div>
        </aside>

        <div className="ui-card flex h-[70vh] flex-col">
          {activeThread ? (
            <>
              <header className="border-b px-5 py-4" style={{ borderColor: "var(--border)" }}>
                <p className="ui-title text-sm">{activeThread.requirementTitle}</p>
                <p className="ui-muted mt-1 text-xs">
                  {me.userType === "hirer" ? activeThread.freelancerName : activeThread.hirerName}
                </p>
              </header>

              <div className="flex-1 space-y-3 overflow-auto p-5">
                {activeThread.messages.length === 0 ? (
                  <p className="ui-muted text-sm">Start the conversation.</p>
                ) : (
                  activeThread.messages.map((message) => {
                    const mine = message.senderId === me.id;
                    return (
                      <div key={message.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                        <div
                          className="max-w-[78%] rounded-2xl px-4 py-3 text-sm"
                          style={
                            mine
                              ? { background: "var(--primary)", color: "var(--primary-foreground)" }
                              : { background: "var(--surface-2)", color: "var(--foreground)", border: "1px solid var(--border)" }
                          }
                        >
                          <p className="text-[11px] opacity-70">{mine ? "You" : message.senderName}</p>
                          <p className="mt-1 whitespace-pre-wrap">{message.text}</p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <form onSubmit={sendMessage} className="border-t p-4" style={{ borderColor: "var(--border)" }}>
                <div className="flex gap-2">
                  <input
                    className="ui-input"
                    placeholder="Type your message..."
                    value={messageText}
                    onChange={(event) => setMessageText(event.target.value)}
                    maxLength={1000}
                    required
                  />
                  <button type="submit" className="ui-btn" disabled={sending}>
                    {sending ? "Sending..." : "Send"}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex h-full items-center justify-center p-6">
              <p className="ui-muted text-sm">
                {threads.length ? "Select a conversation." : "No conversations available."}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
