const CAT_TRIGGER = "پیش پیش";
const DUCK_TRIGGER = "کوئک کوئک";
const CAT_BUTTON = "🐱 پیش پیش";
const DUCK_BUTTON = "🦆 کوئک کوئک";
const ANON_BUTTON = "🥷 پیام ناشناس";
const DAILY_ON_BUTTON = "🔔 فعال کردن میو روزانه";
const DAILY_OFF_BUTTON = "🔕 قطع میو روزانه";
const CANCEL_BUTTON = "❌ لغو";

const USER_KEY_PREFIX = "user:";
const STARTER_KEY_PREFIX = "starter:";
const DAILY_KEY_PREFIX = "daily:";
const STREAK_KEY_PREFIX = "streak:";
const CRON_LAST_KEY = "cron:last";
const BROADCAST_DRAFT_PREFIX = "broadcast:draft:";
const ANON_SESSION_PREFIX = "anon_session:";
const ANON_CLOSED_PREFIX = "anon_closed:";
const ANON_WAIT_TTL = 15 * 60;
const ANON_SESSION_TTL = 7 * 24 * 60 * 60;
const BROADCAST_DRAFT_TTL = 10 * 60;
const REPLY_ROUTE_TTL = 30 * 24 * 60 * 60;

const WELCOME_TEXT = `بالاخره پیدات شد 😼

🐱 «پیش پیش» کنی، عکس گربه می‌گیری.
🦆 «کوئک کوئک» کنی، عکس اردک می‌گیری.
🎙️ حتی اگه با ویس بگی «پیش پیش» یا «کوئک کوئک»، برات عکس می‌رستم.
🥷 «پیام ناشناس» رو بزن تا حرفت بی‌اسم برسه به امیرآقا.

روزی دو بار هم می‌تونم خودم برات میو بفرستم.
بهترین ربات تلگرام.`;

const HELP_TEXT = `راهنما 😼

🐱 پیش پیش — یک عکس گربه
🦆 کوئک کوئک — یک عکس اردک
🎙️ ویسِ «پیش پیش» — یک عکس گربه
🎙️ ویسِ «کوئک کوئک» — یک عکس اردک
🔥 /streak — دیدن استریک پیش‌پیش
🥷 پیام ناشناس — فرستادن پیام بی‌اسم برای مدیر
🔔/🔕 میو روزانه — روشن/خاموش کردن ارسال خودکار
❌ لغو — لغو پیام ناشناس`;

const ANON_PROMPT = `پیامت رو بفرست.

اسمت برای امیرآقا نشون داده نمی‌شه.
متن، عکس، ویس، ویدیو، فایل و استیکر هم قبول می‌کنم.

منصرف شدی، «لغو» رو بزن.وقت مارم نگیر`;

export default {
  async fetch(request, env, ctx) {
    if (request.method !== "POST") {
      return new Response("OK");
    }

    const receivedSecret = request.headers.get(
      "X-Telegram-Bot-Api-Secret-Token"
    );

    if (receivedSecret !== env.WEBHOOK_SECRET) {
      return new Response("Forbidden", { status: 403 });
    }

    let update;

    try {
      update = await request.json();
    } catch {
      return new Response("OK");
    }

    if (update.message) {
      ctx.waitUntil(
        handleMessage(update.message, env).catch((error) => {
          console.error("handleMessage error:", error);
        })
      );
    }

    if (update.callback_query) {
      ctx.waitUntil(
        handleCallbackQuery(update.callback_query, env).catch((error) => {
          console.error("handleCallbackQuery error:", error);
        })
      );
    }

    return new Response("OK");
  },

  async scheduled(controller, env, ctx) {
    const cronInfo = {
      cron: controller?.cron || "unknown",
      scheduledTime: Number(controller?.scheduledTime) || Date.now(),
      startedAt: new Date().toISOString(),
    };

    console.log("CRON STARTED", JSON.stringify(cronInfo));

    ctx.waitUntil(
      runScheduledDaily(cronInfo, env).catch((error) => {
        console.error("scheduled error:", error);
      })
    );
  },
};

async function handleMessage(message, env) {
  const chatId = String(message.chat.id);
  const isPrivate = message.chat.type === "private";
  const text = message.text?.trim() || "";

  const command = text.startsWith("/")
    ? text.split(/\s+/)[0].split("@")[0].toLowerCase()
    : "";

  const isAdmin =
    isPrivate &&
    env.ADMIN_CHAT_ID &&
    chatId === String(env.ADMIN_CHAT_ID);

  if (isPrivate) {
    await rememberPrivateUser(message, env);
  }

  // دستورهای مدیریتی باید قبل از مسیر Reply ناشناس بررسی شوند.
  if (isAdmin && command === "/stats") {
    await handleAdminStats(chatId, env);
    return;
  }

  if (isAdmin && command === "/users") {
    await handleUserList(chatId, env, false);
    return;
  }

  if (isAdmin && command === "/starters") {
    await handleUserList(chatId, env, true);
    return;
  }

  if (isAdmin && command === "/health") {
    await handleHealth(chatId, env);
    return;
  }

  if (isAdmin && command === "/anonclose") {
    await handleAnonCloseCommand(message, env);
    return;
  }

  if (isAdmin && command === "/broadcast") {
    await handleBroadcastCommand(message, env);
    return;
  }

  if (isAdmin && command === "/testdaily") {
    await handleTestDaily(chatId, env);
    return;
  }

  if (isAdmin && command === "/cronstatus") {
    await handleCronStatus(chatId, env);
    return;
  }

  if (isAdmin && command === "/adminhelp") {
    await sendText(
      chatId,
      `دستورهای مدیر:
/stats — آمار کاربران و فعالیت
/users — لیست کاربران، نام، @username و آخرین فعالیت
/starters — استارت‌زن‌ها با نام و @username
/health — سلامت KV، تلگرام، AI، عکس گربه/اردک و Cron
/broadcast متن — پیش‌نمایش و تأیید ارسال همگانی
/broadcast active7 متن — فقط فعال‌های ۷ روز اخیر
/broadcast daily متن — فقط کسانی که میو روزانه روشن دارند
/broadcast — روی یک پیام Reply کن تا همان محتوا با تأیید همگانی شود
/anonclose — با Reply روی گفت‌وگوی ناشناس، مکالمه را ببند
/testdaily — اجرای دستی میو روزانه
/cronstatus — وضعیت آخرین اجرای Cron`,
      env
    );
    return;
  }

  if (
    !isAdmin &&
    [
      "/broadcast", "/testdaily", "/cronstatus", "/adminhelp",
      "/stats", "/users", "/starters", "/health", "/anonclose"
    ].includes(command)
  ) {
    await sendText(chatId, "این دستور فقط برای مدیر رباته.", env);
    return;
  }

  // مدیر با Reply روی پیام ناشناس، پاسخ را برای همان کاربر می‌فرستد.
  if (
    isAdmin &&
    message.reply_to_message
  ) {
    const handled = await handleAdminReply(message, env);

    if (handled) {
      return;
    }
  }

  // در گروه فقط تریگرهای متنی کار می‌کنند تا هر ویسی برای transcription ارسال نشود.
  if (!isPrivate) {
    if (isCatTriggerText(text)) {
      await sendRandomCat(chatId, env);
    } else if (isDuckTriggerText(text)) {
      await sendRandomDuck(chatId, env);
    }

    return;
  }

  if (command === "/id") {
    await sendText(chatId, chatId, env);
    return;
  }

  if (command === "/start") {
    await markStarter(message, env);
    await env.BOT_KV.put(`${DAILY_KEY_PREFIX}${chatId}`, "1");

    await sendText(chatId, WELCOME_TEXT, env, {
      reply_markup: mainKeyboard(true),
    });

    return;
  }

  if (command === "/help") {
    const helpText = isAdmin
      ? `${HELP_TEXT}

مدیر: /adminhelp`
      : HELP_TEXT;

    await sendText(chatId, helpText, env, {
      reply_markup: await getMainKeyboard(chatId, env),
    });

    return;
  }

  if (command === "/cancel" || text === CANCEL_BUTTON || text === "لغو") {
    await env.BOT_KV.delete(`anon_wait:${chatId}`);

    await sendText(chatId, "لغو شد. تصمیم سختی هم نبود.", env, {
      reply_markup: await getMainKeyboard(chatId, env),
    });

    return;
  }

  if (command === "/daily_on") {
    await setDailyEnabled(chatId, true, env);
    await sendText(
      chatId,
      "باشه. میو روزانه روشن شد 😼",
      env,
      { reply_markup: mainKeyboard(true) }
    );
    return;
  }

  if (command === "/daily_off") {
    await setDailyEnabled(chatId, false, env);
    await sendText(
      chatId,
      "خیلی ناراحتم کردی. میو روزانه خاموش شد.",
      env,
      { reply_markup: mainKeyboard(false) }
    );
    return;
  }

  if (
    command === "/daily" ||
    text === DAILY_ON_BUTTON ||
    text === DAILY_OFF_BUTTON ||
    text === "فعال کردن میو روزانه" ||
    text === "قطع میو روزانه"
  ) {
    const wasEnabled = await isDailyEnabled(chatId, env);
    const nowEnabled = !wasEnabled;

    await setDailyEnabled(chatId, nowEnabled, env);

    await sendText(
      chatId,
      nowEnabled
        ? "میو روزانه روشن شد 😼 روزی دو بار منتظرم باش."
        : "خیلی ناراحتم کردی. میو روزانه خاموش شد.",
      env,
      { reply_markup: mainKeyboard(nowEnabled) }
    );

    return;
  }

  if (command === "/streak") {
    await handleStreakStatus(chatId, env);
    return;
  }

  if (command === "/anon") {
    const anonymousText = text
      .replace(/^\/anon(?:@\w+)?\s*/i, "")
      .trim();

    if (anonymousText) {
      await sendAnonymousText(
        chatId,
        anonymousText,
        env,
        false
      );
    } else {
      await prepareAnonymousMessage(chatId, env);
    }

    return;
  }

  if (text === ANON_BUTTON || text === "پیام ناشناس") {
    await prepareAnonymousMessage(chatId, env);
    return;
  }

  // کاربر می‌تواند روی پاسخ مدیر Reply کند و گفتگو را ادامه دهد.
  if (message.reply_to_message) {
    const handled = await handleUserThreadReply(
      message,
      env
    );

    if (handled) {
      return;
    }
  }

  const waitingForAnonymous = await env.BOT_KV.get(
    `anon_wait:${chatId}`
  );

  if (waitingForAnonymous) {
    await env.BOT_KV.delete(`anon_wait:${chatId}`);

    await copyAnonymousMessage(
      message,
      env,
      false
    );

    return;
  }

  if (isCatTriggerText(text)) {
    await sendCatForUser(chatId, env);
    return;
  }

  if (isDuckTriggerText(text)) {
    await sendRandomDuck(chatId, env);
    return;
  }

  if (message.voice) {
    const spokenText = await transcribeTelegramVoice(message.voice, env);

    if (isCatTriggerText(spokenText)) {
      await sendCatForUser(chatId, env);
      return;
    }

    if (isDuckTriggerText(spokenText)) {
      await sendRandomDuck(chatId, env);
    }
  }
}

function mainKeyboard(dailyEnabled) {
  return {
    keyboard: [
      [{ text: CAT_BUTTON }, { text: DUCK_BUTTON }],
      [{ text: ANON_BUTTON }],
      [{ text: dailyEnabled ? DAILY_OFF_BUTTON : DAILY_ON_BUTTON }],
    ],
    resize_keyboard: true,
  };
}

async function getMainKeyboard(chatId, env) {
  const enabled = await isDailyEnabled(chatId, env);
  return mainKeyboard(enabled);
}

async function isDailyEnabled(chatId, env) {
  const value = await env.BOT_KV.get(`${DAILY_KEY_PREFIX}${chatId}`);
  return value !== null;
}

async function setDailyEnabled(chatId, enabled, env) {
  const key = `${DAILY_KEY_PREFIX}${chatId}`;

  if (enabled) {
    await env.BOT_KV.put(key, "1");
  } else {
    await env.BOT_KV.delete(key);
  }
}

function cancelKeyboard() {
  return {
    keyboard: [[{ text: CANCEL_BUTTON }]],
    resize_keyboard: true,
    one_time_keyboard: true,
  };
}

async function rememberPrivateUser(message, env) {
  const chatId = String(message.chat.id);
  const key = `${USER_KEY_PREFIX}${chatId}`;
  const now = new Date().toISOString();
  const raw = await env.BOT_KV.get(key);
  const old = parseJsonValue(raw, {});
  const from = message.from || {};

  const data = {
    chatId,
    firstName: from.first_name || old.firstName || "",
    lastName: from.last_name || old.lastName || "",
    username: from.username || old.username || "",
    firstSeenAt: old.firstSeenAt || now,
    lastSeenAt: now,
  };

  await env.BOT_KV.put(key, JSON.stringify(data));
}

async function markStarter(message, env) {
  const chatId = String(message.chat.id);
  const key = `${STARTER_KEY_PREFIX}${chatId}`;
  const now = new Date().toISOString();
  const raw = await env.BOT_KV.get(key);
  const old = parseJsonValue(raw, {});

  await env.BOT_KV.put(
    key,
    JSON.stringify({
      firstStartedAt: old.firstStartedAt || now,
      lastStartedAt: now,
      count: Number(old.count || 0) + 1,
    })
  );
}

function parseJsonValue(raw, fallback = null) {
  if (!raw || raw === "1") return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

async function listChatIdsByPrefix(namespace, prefix) {
  const ids = [];
  let cursor;

  do {
    const options = { prefix, limit: 1000 };

    if (cursor) {
      options.cursor = cursor;
    }

    const page = await namespace.list(options);

    for (const key of page.keys) {
      ids.push(key.name.slice(prefix.length));
    }

    cursor = page.list_complete ? undefined : page.cursor;
  } while (cursor);

  return ids;
}

async function deleteKeysByPrefix(namespace, prefix) {
  const ids = await listChatIdsByPrefix(namespace, prefix);
  await Promise.all(ids.map((suffix) => namespace.delete(`${prefix}${suffix}`)));
  return ids.length;
}

async function getKnownUserIds(env) {
  const [knownUsers, dailyUsers, starters] = await Promise.all([
    listChatIdsByPrefix(env.BOT_KV, USER_KEY_PREFIX),
    listChatIdsByPrefix(env.BOT_KV, DAILY_KEY_PREFIX),
    listChatIdsByPrefix(env.BOT_KV, STARTER_KEY_PREFIX),
  ]);

  const adminId = env.ADMIN_CHAT_ID ? String(env.ADMIN_CHAT_ID) : "";

  return [...new Set([...knownUsers, ...dailyUsers, ...starters])].filter(
    (chatId) => chatId && chatId !== adminId
  );
}

async function getUserRecord(chatId, env) {
  const [rawUser, rawStarter, daily] = await Promise.all([
    env.BOT_KV.get(`${USER_KEY_PREFIX}${chatId}`),
    env.BOT_KV.get(`${STARTER_KEY_PREFIX}${chatId}`),
    env.BOT_KV.get(`${DAILY_KEY_PREFIX}${chatId}`),
  ]);

  const user = parseJsonValue(rawUser, {}) || {};
  const starter = parseJsonValue(rawStarter, null);

  return {
    chatId,
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    username: user.username || "",
    firstSeenAt: user.firstSeenAt || null,
    lastSeenAt: user.lastSeenAt || null,
    starter,
    dailyEnabled: daily !== null,
  };
}

async function getAllUserRecords(env) {
  const ids = await getKnownUserIds(env);
  return Promise.all(ids.map((id) => getUserRecord(id, env)));
}

async function refreshUserProfileFromTelegram(user, env) {
  try {
    const result = await telegram(env, "getChat", {
      chat_id: user.chatId,
    });

    if (!result?.ok || !result?.result) {
      return user;
    }

    const chat = result.result;
    const now = new Date().toISOString();
    const updated = {
      ...user,
      firstName: chat.first_name || user.firstName || "",
      lastName: chat.last_name || user.lastName || "",
      // اگر getChat یوزرنیم برنگرداند یعنی کاربر در حال حاضر یوزرنیم ندارد.
      username: chat.username || "",
      profileCheckedAt: now,
    };

    const raw = await env.BOT_KV.get(`${USER_KEY_PREFIX}${user.chatId}`);
    const old = parseJsonValue(raw, {}) || {};

    await env.BOT_KV.put(
      `${USER_KEY_PREFIX}${user.chatId}`,
      JSON.stringify({
        chatId: user.chatId,
        firstName: updated.firstName,
        lastName: updated.lastName,
        username: updated.username,
        firstSeenAt: old.firstSeenAt || user.firstSeenAt || now,
        lastSeenAt: old.lastSeenAt || user.lastSeenAt || null,
        profileCheckedAt: now,
      })
    );

    return updated;
  } catch (error) {
    console.error("getChat profile refresh failed:", user.chatId, error);
    return user;
  }
}

async function refreshUserProfilesFromTelegram(users, env) {
  const refreshed = [];

  for (let index = 0; index < users.length; index += 20) {
    const group = users.slice(index, index + 20);
    const results = await Promise.all(
      group.map((user) => refreshUserProfileFromTelegram(user, env))
    );

    refreshed.push(...results);

    if (index + 20 < users.length) {
      await sleep(1100);
    }
  }

  return refreshed;
}

function userDisplayName(user) {
  const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ").trim();
  if (fullName) return fullName;
  if (user.username) return `@${user.username}`;
  return "کاربر ناشناخته";
}

function formatRelativeTime(iso) {
  if (!iso) return "نامشخص";
  const ms = Date.now() - Date.parse(iso);
  if (!Number.isFinite(ms) || ms < 0) return "نامشخص";
  const minutes = Math.floor(ms / 60000);
  if (minutes < 1) return "همین الان";
  if (minutes < 60) return `${minutes} دقیقه پیش`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} ساعت پیش`;
  const days = Math.floor(hours / 24);
  return `${days} روز پیش`;
}

function wasActiveWithin(user, days) {
  if (!user.lastSeenAt) return false;
  const age = Date.now() - Date.parse(user.lastSeenAt);
  return Number.isFinite(age) && age >= 0 && age <= days * 24 * 60 * 60 * 1000;
}

async function handleAdminStats(adminChatId, env) {
  const users = await getAllUserRecords(env);
  const starterIds = await listChatIdsByPrefix(env.BOT_KV, STARTER_KEY_PREFIX);
  const dailyIds = await listChatIdsByPrefix(env.BOT_KV, DAILY_KEY_PREFIX);
  const adminId = env.ADMIN_CHAT_ID ? String(env.ADMIN_CHAT_ID) : "";

  const starters = starterIds.filter((id) => id !== adminId).length;
  const daily = dailyIds.filter((id) => id !== adminId).length;
  const active24h = users.filter((u) => wasActiveWithin(u, 1)).length;
  const active7d = users.filter((u) => wasActiveWithin(u, 7)).length;
  const active30d = users.filter((u) => wasActiveWithin(u, 30)).length;

  await sendText(
    adminChatId,
    `📊 آمار ربات
👥 کاربران ثبت‌شده: ${users.length}
▶️ /start ثبت‌شده: ${starters}
🔔 میو روزانه روشن: ${daily}

🟢 فعال ۲۴ ساعت اخیر: ${active24h}
🟡 فعال ۷ روز اخیر: ${active7d}
⚪ فعال ۳۰ روز اخیر: ${active30d}

نکته: آمار دقیق /start از زمان نصب این نسخه به بعد ثبت می‌شود.`,
    env
  );
}

async function handleUserList(adminChatId, env, startersOnly) {
  let users = await getAllUserRecords(env);

  if (startersOnly) {
    users = users.filter((u) => u.starter);
  }

  // هنگام درخواست مدیر، نام و @username را از خود Telegram تازه می‌کنیم.
  // این کار برای کاربران قدیمی که قبلاً فقط ID عددی‌شان ذخیره شده هم مفید است.
  users = await refreshUserProfilesFromTelegram(users, env);

  users.sort((a, b) => {
    const at = a.lastSeenAt ? Date.parse(a.lastSeenAt) : 0;
    const bt = b.lastSeenAt ? Date.parse(b.lastSeenAt) : 0;
    return bt - at;
  });

  if (!users.length) {
    await sendText(adminChatId, startersOnly ? "هنوز /start ثبت‌شده‌ای نداریم." : "هنوز کاربری ثبت نشده.", env);
    return;
  }

  const title = startersOnly
    ? `▶️ استارت‌زن‌ها: ${users.length}`
    : `👥 کاربران: ${users.length}`;

  const lines = [title, ""];
  users.forEach((user, index) => {
    const fullName = [user.firstName, user.lastName]
      .filter(Boolean)
      .join(" ")
      .trim() || "نام ثبت نشده";
    const username = user.username ? `@${user.username}` : "بدون یوزرنیم";
    const startMark = user.starter ? "▶️" : "▫️";
    const dailyMark = user.dailyEnabled ? "🔔" : "🔕";

    lines.push(
      `${index + 1}. ${startMark}${dailyMark} ${fullName}\n` +
      `${username}\n` +
      `ID عددی: ${user.chatId} | آخرین فعالیت: ${formatRelativeTime(user.lastSeenAt)}`
    );
  });

  await sendLongText(adminChatId, lines.join("\n"), env);
}

async function getBroadcastRecipients(env, target = "all") {
  const users = await getAllUserRecords(env);

  if (target === "daily") {
    return users.filter((u) => u.dailyEnabled).map((u) => u.chatId);
  }

  if (target === "active7") {
    return users.filter((u) => wasActiveWithin(u, 7)).map((u) => u.chatId);
  }

  return users.map((u) => u.chatId);
}

function parseBroadcastTarget(body, hasReply) {
  const trimmed = String(body || "").trim();
  const first = trimmed.split(/\s+/)[0]?.toLowerCase() || "";

  if (["all", "active7", "daily"].includes(first)) {
    return {
      target: first,
      content: trimmed.slice(first.length).trim(),
    };
  }

  return { target: "all", content: trimmed };
}

function broadcastTargetLabel(target) {
  if (target === "daily") return "فقط میو روزانه روشن";
  if (target === "active7") return "فعال‌های ۷ روز اخیر";
  return "همه کاربران";
}

function isTelegramGone(result) {
  const description = result?.description?.toLowerCase() || "";

  return (
    result?.error_code === 403 ||
    description.includes("blocked by the user") ||
    description.includes("chat not found") ||
    description.includes("user is deactivated")
  );
}

async function forgetUser(chatId, env) {
  await Promise.all([
    env.BOT_KV.delete(`${USER_KEY_PREFIX}${chatId}`),
    env.BOT_KV.delete(`${STARTER_KEY_PREFIX}${chatId}`),
    env.BOT_KV.delete(`${DAILY_KEY_PREFIX}${chatId}`),
    env.BOT_KV.delete(`${STREAK_KEY_PREFIX}${chatId}`),
    env.BOT_KV.delete(`${ANON_SESSION_PREFIX}${chatId}`),
    env.BOT_KV.delete(`${ANON_CLOSED_PREFIX}${chatId}`),
  ]);
}

async function handleBroadcastCommand(message, env) {
  const adminChatId = String(message.chat.id);
  const rawBody = (message.text || "")
    .replace(/^\/broadcast(?:@\w+)?\s*/i, "")
    .trim();
  const repliedMessage = message.reply_to_message;
  const parsed = parseBroadcastTarget(rawBody, Boolean(repliedMessage));

  if (!parsed.content && !repliedMessage) {
    await sendText(
      adminChatId,
      `برای پیام همگانی:
/broadcast متن پیام
/broadcast active7 متن — فعال‌های ۷ روز اخیر
/broadcast daily متن — کسانی که میو روزانه روشن دارند

برای عکس/ویس/ویدیو/فایل هم روی پیام Reply کن و بنویس:
/broadcast
یا /broadcast active7
یا /broadcast daily`,
      env
    );
    return;
  }

  const recipients = await getBroadcastRecipients(env, parsed.target);

  if (!recipients.length) {
    await sendText(adminChatId, "برای این گروه مخاطبی پیدا نشد.", env);
    return;
  }

  const draftId = crypto.randomUUID().replace(/-/g, "").slice(0, 12);
  const draft = {
    id: draftId,
    target: parsed.target,
    kind: repliedMessage ? "copy" : "text",
    text: repliedMessage ? "" : parsed.content,
    fromChatId: repliedMessage ? adminChatId : "",
    messageId: repliedMessage?.message_id || null,
    createdAt: new Date().toISOString(),
  };

  await env.BOT_KV.put(
    `${BROADCAST_DRAFT_PREFIX}${draftId}`,
    JSON.stringify(draft),
    { expirationTtl: BROADCAST_DRAFT_TTL }
  );

  if (!repliedMessage) {
    await sendText(adminChatId, `📣 پیش‌نمایش:\n\n${parsed.content}`, env);
  }

  await sendText(
    adminChatId,
    `ارسال برای ${recipients.length} نفر آماده است.\n🎯 مقصد: ${broadcastTargetLabel(parsed.target)}\n\nتأیید می‌کنی؟`,
    env,
    {
      reply_markup: {
        inline_keyboard: [[
          { text: "✅ ارسال", callback_data: `bc_ok:${draftId}` },
          { text: "❌ لغو", callback_data: `bc_no:${draftId}` },
        ]],
      },
    }
  );
}

async function handleCallbackQuery(callback, env) {
  const callbackId = callback.id;
  const data = callback.data || "";
  const adminId = env.ADMIN_CHAT_ID ? String(env.ADMIN_CHAT_ID) : "";
  const fromId = callback.from?.id ? String(callback.from.id) : "";

  if (!data.startsWith("bc_")) {
    await answerCallback(callbackId, "این دکمه منقضی شده.", env);
    return;
  }

  if (!adminId || fromId !== adminId) {
    await answerCallback(callbackId, "فقط مدیر می‌تونه این کار رو انجام بده.", env, true);
    return;
  }

  const [action, draftId] = data.split(":");
  const key = `${BROADCAST_DRAFT_PREFIX}${draftId}`;
  const raw = await env.BOT_KV.get(key);
  const draft = parseJsonValue(raw, null);

  if (!draft) {
    await answerCallback(callbackId, "این پیش‌نویس منقضی شده.", env, true);
    return;
  }

  if (action === "bc_no") {
    await env.BOT_KV.delete(key);
    await answerCallback(callbackId, "لغو شد.", env);
    await clearInlineKeyboard(callback.message, env);
    await sendText(adminId, "ارسال همگانی لغو شد.", env);
    return;
  }

  if (action !== "bc_ok") {
    await answerCallback(callbackId, "دستور نامعتبره.", env, true);
    return;
  }

  await env.BOT_KV.delete(key);
  await answerCallback(callbackId, "ارسال شروع شد…", env);
  await clearInlineKeyboard(callback.message, env);
  await executeBroadcastDraft(draft, adminId, env);
}

async function answerCallback(callbackQueryId, text, env, showAlert = false) {
  if (!callbackQueryId) return;
  await telegram(env, "answerCallbackQuery", {
    callback_query_id: callbackQueryId,
    text,
    show_alert: showAlert,
  });
}

async function clearInlineKeyboard(message, env) {
  if (!message?.chat?.id || !message?.message_id) return;
  await telegram(env, "editMessageReplyMarkup", {
    chat_id: message.chat.id,
    message_id: message.message_id,
    reply_markup: { inline_keyboard: [] },
  });
}

async function executeBroadcastDraft(draft, adminChatId, env) {
  const recipients = await getBroadcastRecipients(env, draft.target || "all");

  await sendText(
    adminChatId,
    `ارسال همگانی برای ${recipients.length} مخاطب شروع شد…`,
    env
  );

  let sent = 0;
  let failed = 0;
  let removed = 0;

  for (let index = 0; index < recipients.length; index += 20) {
    const group = recipients.slice(index, index + 20);

    const results = await Promise.all(
      group.map(async (targetChatId) => {
        let result;

        if (draft.kind === "copy") {
          result = await telegram(env, "copyMessage", {
            chat_id: targetChatId,
            from_chat_id: draft.fromChatId,
            message_id: draft.messageId,
          });
        } else {
          result = await sendText(targetChatId, draft.text, env);
        }

        if (result?.ok) return "sent";

        if (isTelegramGone(result)) {
          await forgetUser(targetChatId, env);
          return "removed";
        }

        return "failed";
      })
    );

    for (const status of results) {
      if (status === "sent") sent += 1;
      else if (status === "removed") removed += 1;
      else failed += 1;
    }

    if (index + 20 < recipients.length) {
      await sleep(1100);
    }
  }

  await sendText(
    adminChatId,
    `ارسال همگانی تمام شد.
✅ موفق: ${sent}
❌ ناموفق: ${failed}
🧹 حذف مخاطب غیرفعال: ${removed}`,
    env
  );
}

async function handleTestDaily(adminChatId, env) {
  await sendText(adminChatId, "تست میو روزانه شروع شد...", env);

  const stats = await sendDailyCats(env);

  await sendText(
    adminChatId,
    `تست تمام شد.
مخاطب فعال: ${stats.recipients}
✅ ارسال موفق: ${stats.sent}
❌ ناموفق: ${stats.failed}
🧹 حذف غیرفعال: ${stats.removed}`,
    env
  );
}

async function handleCronStatus(adminChatId, env) {
  const raw = await env.BOT_KV.get(CRON_LAST_KEY);

  if (!raw) {
    await sendText(
      adminChatId,
      "هنوز هیچ اجرای Cron داخل ربات ثبت نشده. اگر Trigger ساخته‌ای ولی این پیام را می‌بینی، Cron هنوز Worker را اجرا نکرده.",
      env
    );
    return;
  }

  let data;

  try {
    data = JSON.parse(raw);
  } catch {
    data = { raw };
  }

  const lines = [
    "آخرین وضعیت Cron:",
    `status: ${data.status || "unknown"}`,
    `cron: ${data.cron || "unknown"}`,
    `startedAt: ${data.startedAt || "unknown"}`,
    `finishedAt: ${data.finishedAt || "-"}`,
  ];

  if (data.stats) {
    lines.push(
      `recipients: ${data.stats.recipients ?? "-"}`,
      `sent: ${data.stats.sent ?? "-"}`,
      `failed: ${data.stats.failed ?? "-"}`,
      `removed: ${data.stats.removed ?? "-"}`
    );
  }

  await sendText(adminChatId, lines.join("\n"), env);
}

async function handleHealth(adminChatId, env) {
  const checks = [];

  // KV
  try {
    const key = `health:${crypto.randomUUID()}`;
    await env.BOT_KV.put(key, "ok", { expirationTtl: 60 });
    const value = await env.BOT_KV.get(key);
    await env.BOT_KV.delete(key);
    checks.push(`KV: ${value === "ok" ? "✅" : "❌"}`);
  } catch (error) {
    checks.push("KV: ❌");
  }

  // Telegram
  const me = await telegram(env, "getMe", {});
  checks.push(`Telegram: ${me?.ok ? "✅" : "❌"}`);

  // Workers AI binding
  checks.push(`Workers AI: ${env.AI ? "✅" : "❌ Binding AI پیدا نشد"}`);

  // Duck API
  try {
    const response = await fetch("https://ducks.now/api/v0/random/");
    checks.push(`Duck API: ${response.ok ? "✅" : `❌ ${response.status}`}`);
  } catch {
    checks.push("Duck API: ❌");
  }

  // Cat API
  try {
    const response = await fetch(
      `https://cataas.com/cat?random=health-${crypto.randomUUID()}`
    );
    checks.push(`Cat API: ${response.ok ? "✅" : `❌ ${response.status}`}`);
  } catch {
    checks.push("Cat API: ❌");
  }

  const users = await getAllUserRecords(env);
  const daily = users.filter((u) => u.dailyEnabled).length;
  const cronRaw = await env.BOT_KV.get(CRON_LAST_KEY);
  const cron = parseJsonValue(cronRaw, null);
  const cronText = cron
    ? `${cron.status || "unknown"} • ${formatRelativeTime(cron.finishedAt || cron.startedAt)}`
    : "هنوز ثبت نشده";

  await sendText(
    adminChatId,
    `🩺 Health
${checks.join("\n")}

👥 کاربران: ${users.length}
🔔 میو روشن: ${daily}
⏱ آخرین Cron: ${cronText}`,
    env
  );
}

async function runScheduledDaily(cronInfo, env) {
  const started = {
    ...cronInfo,
    status: "running",
  };

  await env.BOT_KV.put(CRON_LAST_KEY, JSON.stringify(started));

  try {
    const stats = await sendDailyCats(env);
    const finished = {
      ...started,
      status: "success",
      finishedAt: new Date().toISOString(),
      stats,
    };

    await env.BOT_KV.put(CRON_LAST_KEY, JSON.stringify(finished));
    console.log("CRON FINISHED", JSON.stringify(finished));
    return stats;
  } catch (error) {
    const failed = {
      ...started,
      status: "error",
      finishedAt: new Date().toISOString(),
      error: String(error),
    };

    await env.BOT_KV.put(CRON_LAST_KEY, JSON.stringify(failed));
    console.error("CRON FAILED", error);
    throw error;
  }
}

async function getAnonSession(chatId, env, createIfMissing = false) {
  const key = `${ANON_SESSION_PREFIX}${chatId}`;
  const raw = await env.BOT_KV.get(key);
  const existing = parseJsonValue(raw, null);

  if (existing?.id) return existing;
  if (!createIfMissing) return null;

  const session = {
    id: crypto.randomUUID().replace(/-/g, "").slice(0, 5).toUpperCase(),
    createdAt: new Date().toISOString(),
  };

  await env.BOT_KV.put(key, JSON.stringify(session), {
    expirationTtl: ANON_SESSION_TTL,
  });

  return session;
}

async function handleAnonCloseCommand(message, env) {
  const repliedMessageId = message.reply_to_message?.message_id;

  if (!repliedMessageId) {
    await sendText(
      message.chat.id,
      "روی پیام ناشناس یا راهنمای زیرش Reply کن و بعد /anonclose بفرست.",
      env
    );
    return;
  }

  const targetChatId = await getKvWithRetry(
    env.BOT_KV,
    `anon_admin_route:${repliedMessageId}`
  );

  if (!targetChatId) {
    await sendText(message.chat.id, "این پیام به گفت‌وگوی ناشناس وصل نیست.", env);
    return;
  }

  await Promise.all([
    env.BOT_KV.put(`${ANON_CLOSED_PREFIX}${targetChatId}`, "1", {
      expirationTtl: REPLY_ROUTE_TTL,
    }),
    env.BOT_KV.delete(`${ANON_SESSION_PREFIX}${targetChatId}`),
    env.BOT_KV.delete(`anon_wait:${targetChatId}`),
  ]);

  await deleteKeysByPrefix(env.BOT_KV, `anon_user_route:${targetChatId}:`);

  await sendText(
    targetChatId,
    "این گفت‌وگوی ناشناس بسته شد. برای پیام جدید دوباره «پیام ناشناس» رو بزن.",
    env,
    { reply_markup: await getMainKeyboard(targetChatId, env) }
  );

  await sendText(message.chat.id, "گفت‌وگوی ناشناس بسته شد. 🔒", env);
}

async function prepareAnonymousMessage(chatId, env) {
  await env.BOT_KV.delete(`${ANON_CLOSED_PREFIX}${chatId}`);
  await getAnonSession(chatId, env, true);

  await env.BOT_KV.put(
    `anon_wait:${chatId}`,
    "1",
    {
      expirationTtl: ANON_WAIT_TTL,
    }
  );

  await sendText(chatId, ANON_PROMPT, env, {
    reply_markup: cancelKeyboard(),
  });
}

async function sendAnonymousText(
  chatId,
  text,
  env,
  isContinuation
) {
  if (!isContinuation) {
    await env.BOT_KV.delete(`${ANON_CLOSED_PREFIX}${chatId}`);
    await getAnonSession(chatId, env, true);
  }

  if (!env.ADMIN_CHAT_ID) {
    await sendText(
      chatId,
      "مدیر هنوز تنظیمات خودش رو کامل نکرده.",
      env,
      { reply_markup: await getMainKeyboard(chatId, env) }
    );

    return;
  }

  const contentResult = await sendText(
    env.ADMIN_CHAT_ID,
    text,
    env
  );

  const delivered = await registerAdminReplyRoutes(
    contentResult,
    chatId,
    env,
    isContinuation
  );

  await sendDeliveryResult(chatId, delivered, env);
}

async function copyAnonymousMessage(
  message,
  env,
  isContinuation
) {
  const chatId = String(message.chat.id);

  if (!isContinuation) {
    await env.BOT_KV.delete(`${ANON_CLOSED_PREFIX}${chatId}`);
    await getAnonSession(chatId, env, true);
  }

  if (!env.ADMIN_CHAT_ID) {
    await sendText(
      chatId,
      "مدیر هنوز تنظیمات خودش رو کامل نکرده.",
      env,
      { reply_markup: await getMainKeyboard(chatId, env) }
    );

    return;
  }

  const contentResult = await telegram(
    env,
    "copyMessage",
    {
      chat_id: env.ADMIN_CHAT_ID,
      from_chat_id: chatId,
      message_id: message.message_id,
    }
  );

  const delivered = await registerAdminReplyRoutes(
    contentResult,
    chatId,
    env,
    isContinuation
  );

  if (!delivered && !isContinuation) {
    await env.BOT_KV.put(
      `anon_wait:${chatId}`,
      "1",
      {
        expirationTtl: ANON_WAIT_TTL,
      }
    );
  }

  await sendDeliveryResult(chatId, delivered, env);
}

async function registerAdminReplyRoutes(
  contentResult,
  userChatId,
  env,
  isContinuation
) {
  const contentMessageId =
    getTelegramMessageId(contentResult);

  if (!contentResult?.ok || !contentMessageId) {
    return false;
  }

  await saveAdminRoute(
    contentMessageId,
    userChatId,
    env
  );

  const session = await getAnonSession(userChatId, env, true);
  const threadId = session?.id || "?????";
  const noteText = isContinuation
    ? `🕵️ ادامه گفت‌وگوی ناشناس #${threadId}
برای جواب روی پیام بالا یا همین راهنما ریپلای کن.`
    : `🕵️ پیام ناشناس جدید #${threadId}
برای جواب روی پیام بالا یا همین راهنما ریپلای کن.`;

  const noteResult = await sendText(
    env.ADMIN_CHAT_ID,
    noteText,
    env
  );

  const noteMessageId =
    getTelegramMessageId(noteResult);

  if (noteResult?.ok && noteMessageId) {
    await saveAdminRoute(
      noteMessageId,
      userChatId,
      env
    );
  }

  return true;
}

async function saveAdminRoute(
  messageId,
  userChatId,
  env
) {
  await env.BOT_KV.put(
    `anon_admin_route:${messageId}`,
    String(userChatId),
    {
      expirationTtl: REPLY_ROUTE_TTL,
    }
  );
}

async function saveUserRoute(
  userChatId,
  messageId,
  env
) {
  await env.BOT_KV.put(
    `anon_user_route:${userChatId}:${messageId}`,
    "1",
    {
      expirationTtl: REPLY_ROUTE_TTL,
    }
  );
}

async function handleAdminReply(message, env) {
  const repliedMessageId =
    message.reply_to_message?.message_id;

  if (!repliedMessageId) {
    return false;
  }

  const targetChatId = await getKvWithRetry(
    env.BOT_KV,
    `anon_admin_route:${repliedMessageId}`
  );

  if (!targetChatId) {
    await sendText(
      message.chat.id,
      "مسیر این پیام پیدا نشد. روی خود پیام ناشناس یا پیام راهنمای زیرش ریپلای کن. اگر تازه رسیده، چند ثانیه صبر کن.",
      env
    );

    return true;
  }

  const copiedResult = await telegram(
    env,
    "copyMessage",
    {
      chat_id: targetChatId,
      from_chat_id: message.chat.id,
      message_id: message.message_id,
    }
  );

  const copiedMessageId =
    getTelegramMessageId(copiedResult);

  if (copiedResult?.ok && copiedMessageId) {
    await saveUserRoute(
      targetChatId,
      copiedMessageId,
      env
    );

    await sendText(
      message.chat.id,
      "فرستادم. حالا صبر کن ببین جواب می‌ده یا نه.",
      env
    );
  } else {
    await sendText(
      message.chat.id,
      "نرفت. احتمالاً کاربر ربات رو بسته یا بلاک کرده.",
      env
    );
  }

  return true;
}

async function handleUserThreadReply(
  message,
  env
) {
  const chatId = String(message.chat.id);
  const closed = await env.BOT_KV.get(`${ANON_CLOSED_PREFIX}${chatId}`);

  if (closed) {
    await sendText(
      chatId,
      "این گفت‌وگو بسته شده. برای پیام جدید «پیام ناشناس» رو بزن.",
      env,
      { reply_markup: await getMainKeyboard(chatId, env) }
    );
    return true;
  }

  const repliedMessageId =
    message.reply_to_message?.message_id;

  if (!repliedMessageId) {
    return false;
  }

  const routeExists = await getKvWithRetry(
    env.BOT_KV,
    `anon_user_route:${chatId}:${repliedMessageId}`
  );

  if (!routeExists) {
    return false;
  }

  await copyAnonymousMessage(
    message,
    env,
    true
  );

  return true;
}

async function sendDeliveryResult(
  chatId,
  delivered,
  env
) {
  if (delivered) {
    await sendText(
      chatId,
      "ارسال شد. حالا صبر کن ببین جواب می‌ده یا نه چون سرش خیلی شلوغه. پیشته ",
      env,
      {
        reply_markup: await getMainKeyboard(chatId, env),
      }
    );
  } else {
    await sendText(
      chatId,
      "نشد. دوباره بفرست، شاید این بار با پیامت حال کردم.",
      env,
      {
        reply_markup: cancelKeyboard(),
      }
    );
  }
}

function getTelegramMessageId(result) {
  return result?.result?.message_id || null;
}

async function getKvWithRetry(namespace, key) {
  const delays = [0, 400, 900, 1600];

  for (const delay of delays) {
    if (delay > 0) {
      await sleep(delay);
    }

    const value = await namespace.get(key);

    if (value !== null) {
      return value;
    }
  }

  return null;
}

function tehranDateKey(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Tehran",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const map = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${map.year}-${map.month}-${map.day}`;
}

function dateKeyDiffDays(fromKey, toKey) {
  const from = Date.parse(`${fromKey}T00:00:00Z`);
  const to = Date.parse(`${toKey}T00:00:00Z`);
  if (!Number.isFinite(from) || !Number.isFinite(to)) return 999;
  return Math.round((to - from) / (24 * 60 * 60 * 1000));
}

async function updateCatStreak(chatId, env) {
  const key = `${STREAK_KEY_PREFIX}${chatId}`;
  const today = tehranDateKey();
  const raw = await env.BOT_KV.get(key);
  const old = parseJsonValue(raw, {}) || {};

  if (old.lastDate === today) {
    return {
      count: Number(old.count || 1),
      best: Number(old.best || old.count || 1),
      changed: false,
    };
  }

  const consecutive = old.lastDate && dateKeyDiffDays(old.lastDate, today) === 1;
  const count = consecutive ? Number(old.count || 0) + 1 : 1;
  const best = Math.max(Number(old.best || 0), count);

  await env.BOT_KV.put(
    key,
    JSON.stringify({ count, best, lastDate: today })
  );

  return { count, best, changed: true };
}

async function handleStreakStatus(chatId, env) {
  const raw = await env.BOT_KV.get(`${STREAK_KEY_PREFIX}${chatId}`);
  const streak = parseJsonValue(raw, null);

  if (!streak?.count) {
    await sendText(chatId, "هنوز استریک پیش‌پیش نداری 😼", env);
    return;
  }

  const today = tehranDateKey();
  const gap = dateKeyDiffDays(streak.lastDate, today);
  const current = gap <= 1 ? streak.count : 0;

  await sendText(
    chatId,
    `🔥 استریک پیش‌پیش: ${current} روز\n🏆 رکورد: ${streak.best || streak.count} روز`,
    env
  );
}

async function sendCatForUser(chatId, env) {
  const result = await sendRandomCat(chatId, env);

  if (result?.ok) {
    const streak = await updateCatStreak(chatId, env);
    if (streak.changed) {
      await sendText(
        chatId,
        `🔥 استریک پیش‌پیش: ${streak.count} روز${streak.count === streak.best ? " 🏆" : ""}`,
        env
      );
    }
  }

  return result;
}

function normalizeTriggerText(value = "") {
  return String(value)
    .trim()
    .replace(/ي/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/[\u200c\u200f\u202a-\u202e]/g, " ")
    .replace(/[.,!?؟،؛:؛"'«»()\[\]{}ـ_\-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function isCatTriggerText(value = "") {
  const normalized = normalizeTriggerText(value)
    .replace(/^🐱\s*/, "")
    .trim();

  return normalized === CAT_TRIGGER || normalized.includes(CAT_TRIGGER);
}

function isDuckTriggerText(value = "") {
  const normalized = normalizeTriggerText(value)
    .replace(/^🦆\s*/, "")
    .trim();

  return (
    normalized === DUCK_TRIGGER ||
    normalized.includes(DUCK_TRIGGER) ||
    normalized.includes("کواک کواک") ||
    normalized.includes("کوک کوک")
  );
}

async function transcribeTelegramVoice(voice, env) {
  if (!voice?.file_id) {
    return "";
  }

  if (!env.AI) {
    console.error("Workers AI binding named AI is missing; voice trigger is disabled.");
    return "";
  }

  try {
    const fileInfo = await telegram(env, "getFile", {
      file_id: voice.file_id,
    });

    const filePath = fileInfo?.result?.file_path;

    if (!fileInfo?.ok || !filePath) {
      return "";
    }

    const audioResponse = await fetch(
      `https://api.telegram.org/file/bot${env.BOT_TOKEN}/${filePath}`
    );

    if (!audioResponse.ok) {
      console.error("Telegram voice download failed:", audioResponse.status);
      return "";
    }

    const audioBuffer = await audioResponse.arrayBuffer();
    const audioBase64 = arrayBufferToBase64(audioBuffer);

    const result = await env.AI.run(
      "@cf/openai/whisper-large-v3-turbo",
      {
        audio: audioBase64,
        task: "transcribe",
        language: "fa",
        vad_filter: true,
        initial_prompt: "گفتار فارسی است. عبارت‌های مهم ممکن است «پیش پیش» یا «کوئک کوئک» باشند.",
      }
    );

    return result?.text?.trim() || "";
  } catch (error) {
    console.error("Workers AI voice transcription failed:", error);
    return "";
  }
}

function arrayBufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  let binary = "";

  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(
      ...bytes.subarray(i, i + chunkSize)
    );
  }

  return btoa(binary);
}

async function getRandomDuckUrl() {
  try {
    const response = await fetch("https://ducks.now/api/v0/random/");

    if (!response.ok) {
      console.error("Duck API error:", response.status);
      return "";
    }

    const data = await response.json();
    return data?.download_url || data?.image_url || "";
  } catch (error) {
    console.error("Random duck failed:", error);
    return "";
  }
}

async function sendRandomDuck(chatId, env) {
  const duckUrl = await getRandomDuckUrl();

  if (!duckUrl) {
    await sendText(chatId, "اردکه قایم شده 😾 دوباره بزن.", env, {
      reply_markup: await getMainKeyboard(chatId, env),
    });
    return;
  }

  const result = await telegram(env, "sendPhoto", {
    chat_id: chatId,
    photo: duckUrl,
    reply_markup: await getMainKeyboard(chatId, env),
  });

  if (!result?.ok) {
    await sendText(chatId, "اردکه لجبازی کرد 😾 دوباره امتحان کن.", env, {
      reply_markup: await getMainKeyboard(chatId, env),
    });
  }
}

async function sendRandomCat(chatId, env, extra = {}) {
  const randomCatUrl =
    `https://cataas.com/cat?random=${crypto.randomUUID()}`;

  return telegram(env, "sendPhoto", {
    chat_id: chatId,
    photo: randomCatUrl,
    ...extra,
  });
}

async function sendDailyCats(env) {
  const chatIds = await listChatIdsByPrefix(
    env.BOT_KV,
    DAILY_KEY_PREFIX
  );

  const stats = {
    recipients: chatIds.length,
    sent: 0,
    failed: 0,
    removed: 0,
  };

  for (let index = 0; index < chatIds.length; index += 15) {
    const group = chatIds.slice(index, index + 15);

    const results = await Promise.all(
      group.map(async (chatId) => {
        const result = await sendRandomCat(chatId, env, { caption: "میو." });

        if (result?.ok) {
          return "sent";
        }

        if (isTelegramGone(result)) {
          await forgetUser(chatId, env);
          return "removed";
        }

        return "failed";
      })
    );

    for (const status of results) {
      if (status === "sent") stats.sent += 1;
      else if (status === "removed") stats.removed += 1;
      else stats.failed += 1;
    }

    if (index + 15 < chatIds.length) {
      await sleep(1100);
    }
  }

  return stats;
}

async function sendLongText(chatId, text, env) {
  const maxLength = 3800;
  let remaining = String(text || "");

  while (remaining.length > maxLength) {
    let cut = remaining.lastIndexOf("\n", maxLength);
    if (cut < maxLength * 0.6) cut = maxLength;
    const part = remaining.slice(0, cut).trim();
    remaining = remaining.slice(cut).trim();
    if (part) await sendText(chatId, part, env);
  }

  if (remaining) {
    await sendText(chatId, remaining, env);
  }
}

async function sendText(
  chatId,
  text,
  env,
  extra = {}
) {
  return telegram(env, "sendMessage", {
    chat_id: chatId,
    text,
    ...extra,
  });
}

async function telegram(
  env,
  method,
  payload
) {
  try {
    const response = await fetch(
      `https://api.telegram.org/bot${env.BOT_TOKEN}/${method}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();

    if (!result.ok) {
      console.error(
        `Telegram ${method} error:`,
        result.error_code,
        result.description
      );
    }

    return result;
  } catch (error) {
    console.error(
      `Telegram ${method} request failed:`,
      error
    );

    return {
      ok: false,
      description: String(error),
    };
  }
}

function sleep(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}