// Studio panel — a small, safe Markdown renderer for the to-do document (docs/YAPILACAKLAR.md): headings, paragraphs,
// nested lists, task boxes (shown, not clickable), **bold**, *italic*, `code`, [links](https://…), code fences; in a
// plan's notes also its own pictures (![caption](n)).
// Everything is escaped first; only these few tags are produced. Links open in a new tab and must be http(s).

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function inline(text, opts = {}) {
  const codes = [], pics = [];
  let s = esc(text).replace(/`([^`]+)`/g, (_, c) => `\u0000${codes.push(c) - 1}\u0000`);
  // a plan's own picture in its notes: ![caption](2) = its 2nd picture, drawn by opts.image (the caption is already
  // escaped); without opts.image only the caption stays
  s = s.replace(/!\[([^\]]*)\]\((\d{1,2})\)/g, (_, alt, n) => `\u0001${pics.push((opts.image && opts.image(+n, alt)) || alt) - 1}\u0001`);
  s = s.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, (_, t, u) => `<a href="${u}" target="_blank" rel="noopener noreferrer">${t}</a>`);
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/(^|[^*])\*([^*\s][^*]*)\*/g, '$1<em>$2</em>');
  return s.replace(/\u0000(\d+)\u0000/g, (_, i) => `<code>${codes[+i]}</code>`).replace(/\u0001(\d+)\u0001/g, (_, i) => pics[+i]);
}

/** One line of Markdown (bold, italic, code, links) as HTML. */
export const inlineMd = (t) => inline(String(t || ''));

/** opts.image(n, caption) → the HTML of a plan's n-th picture (1-based), for ![caption](n) in its notes */
export function renderMarkdown(src, opts = {}) {
  const il = (t) => inline(t, opts);
  const lines = String(src || '').replace(/\r\n/g, '\n').split('\n');
  const out = [];
  const stack = []; // open lists: indent levels
  let para = [];
  let fence = null;
  const flushPara = () => {
    if (para.length) out.push(`<p>${il(para.join(' '))}</p>`);
    para = [];
  };
  const closeLists = (to = -1) => {
    while (stack.length && stack[stack.length - 1] > to) {
      out.push('</li></ul>');
      stack.pop();
    }
  };
  for (const raw of lines) {
    if (fence !== null) {
      if (/^\s*```/.test(raw)) { out.push(`<pre><code>${esc(fence.join('\n'))}</code></pre>`); fence = null; } else fence.push(raw);
      continue;
    }
    if (/^\s*```/.test(raw)) { flushPara(); closeLists(); fence = []; continue; }
    const h = /^(#{1,4})\s+(.*)$/.exec(raw);
    const li = /^(\s*)[-*]\s+(.*)$/.exec(raw);
    if (h) {
      flushPara(); closeLists();
      const n = Math.min(4, h[1].length + 1);
      out.push(`<h${n}>${il(h[2])}</h${n}>`);
    } else if (li) {
      flushPara();
      const ind = li[1].replace(/\t/g, '  ').length;
      let body = li[2];
      const task = /^\[( |x|X)\]\s+(.*)$/.exec(body);
      let cls = '';
      if (task) {
        cls = task[1] === ' ' ? ' class="task"' : ' class="task done"';
        body = `<span class="box" aria-hidden="true">${task[1] === ' ' ? '' : '✓'}</span><span class="sr">${task[1] === ' ' ? 'Yapılacak: ' : 'Bitti: '}</span>${il(task[2])}`;
      } else body = il(body);
      if (!stack.length || ind > stack[stack.length - 1]) {
        out.push('<ul>');
        stack.push(ind);
      } else {
        closeLists(ind);
        if (!stack.length || stack[stack.length - 1] < ind) { out.push('<ul>'); stack.push(ind); } else out.push('</li>');
      }
      out.push(`<li${cls}>${body}`);
    } else if (!raw.trim()) {
      flushPara(); closeLists();
    } else if (stack.length && /^\s+\S/.test(raw)) {
      out.push(' ' + il(raw.trim())); // a wrapped list line
    } else {
      closeLists();
      para.push(raw.trim());
    }
  }
  if (fence !== null) out.push(`<pre><code>${esc(fence.join('\n'))}</code></pre>`);
  flushPara(); closeLists();
  return out.join('');
}

// ------------------------------------------------------------------ the to-do document, split per game
// The rule (also written at the top of docs/YAPILACAKLAR.md):
//   * Every section starts with a level-2 heading "## <Tag> — <title>" (an em dash —, or an en dash –, with a space on
//     both sides). The tag is a game's name as the panel shows it (st_games title, e.g. "Shadow Duel") or its id
//     ("shadow-duel"), compared without case, accents or punctuation; "Stüdyo (genel)" (anything starting with
//     "Stüdyo") is the studio-wide page.
//   * A section runs until the next "## " heading; its "###" sub-headings and lists stay inside it.
//   * Text before the first "## " (the title and the notes) is not shown in the panel.
//   * A "## " heading without a tag, or with a tag no game has, goes to the studio page (so nothing is ever lost).
//   * A section titled "Bitenler" is shown folded.
export const tagKey = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ı/g, 'i').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
export const STUDIO_TAG = 'studyo';

/** → { intro, sections: [{ tag, key, title, body }] }; key: tagKey of the tag, 'studyo' for the studio, '' when untagged */
export function splitTodo(src) {
  const lines = String(src || '').replace(/\r\n/g, '\n').split('\n');
  const intro = [];
  const sections = [];
  let cur = null;
  let fence = false;
  for (const line of lines) {
    if (/^\s*```/.test(line)) fence = !fence;
    const h = !fence && /^##\s+(.*?)\s*$/.exec(line);
    if (h && !/^###/.test(line)) {
      const m = /^(.+?)\s+[—–]\s+(.+)$/.exec(h[1]);
      const tag = m ? m[1].trim() : '';
      let key = tagKey(tag);
      if (key.startsWith(STUDIO_TAG)) key = STUDIO_TAG;
      cur = { tag, key, title: m ? m[2].trim() : h[1].trim(), body: [] };
      sections.push(cur);
    } else if (cur) cur.body.push(line);
    else intro.push(line);
  }
  return { intro: intro.join('\n'), sections: sections.map((s) => ({ ...s, body: s.body.join('\n').replace(/^\n+|\n+$/g, '') })) };
}

/** The sections for one page: a game ({ game, title }) or null for the studio page. games: every game with a page. */
export function sectionsFor(doc, page, games) {
  const keysOf = (g) => [tagKey(g.game), tagKey(g.title)].filter(Boolean);
  const known = new Set(games.flatMap(keysOf));
  if (!page) return doc.sections.filter((s) => s.key === STUDIO_TAG || !known.has(s.key));
  const mine = new Set(keysOf(page));
  return doc.sections.filter((s) => s.key !== STUDIO_TAG && mine.has(s.key));
}

/** Task boxes in a piece of the document: { open, done } */
export function countTasks(md) {
  const open = (String(md).match(/^\s*[-*]\s+\[ \]/gm) || []).length;
  const done = (String(md).match(/^\s*[-*]\s+\[[xX]\]/gm) || []).length;
  return { open, done };
}

// ------------------------------------------------------------------ development progress (the to-do list by state)
// Every top-level list item of a page's sections, with the state it is in. The words that decide it are the ones the
// to-do list already uses (docs/STUDYO-PANELI.md "Gelişim görünümü" lists them):
//   done      a ticked box "- [x]", or any item of a "Bitenler" section; its date is the first YYYY-MM-DD in it
//   waiting   waits for the owner: "BEKLEMEDE", "Karar bekleyen", "Kararlar:", "sahiple", "sahipte", "sahip sorana",
//             "(sahip)", or any item of a "Senin yapacakların" section
//   external  an item of a "Bekleyen dış onaylar" section (a portal or company has to answer)
//   doing     an agent is on it: "Ajan çalışıyor", "YAPILIYOR", "çalışılıyor", "yapılıyor", "sürüyor", "çekiliyor",
//             "hazırlanıyor", "yenileniyor" (a branch name alone is not enough: old items keep theirs)
//   later     everything else that is still open (planned)
// A ticked box always wins; "BEKLEMEDE" / "Karar bekleyen" win over "Ajan çalışıyor".
export const ITEM_STATES = [['doing', 'Yapılıyor'], ['waiting', 'Seni bekliyor'], ['external', 'Dış onay'], ['later', 'Sırada'], ['done', 'Bitti']];
const RX_HOLD = /\bBEKLEMEDE\b|karar bekl/i;
const RX_DOING = /ajan çalışıyor|\bYAPILIYOR\b|çalışılıyor|\byapılıyor\b|\bsürüyor\b|çekiliyor|hazırlanıyor|yenileniyor/i;
const RX_OWNER = /\bkararlar:|sahiple\b|sahipte\b|sahip sorana|\(sahip\)/i;

/** sections (from sectionsFor) → [{ state, date, head, rest, more, section, sub }] in document order */
export function todoItems(sections) {
  const items = [];
  for (const sec of sections) {
    const done = /bitenler/i.test(sec.title), owner = /senin yapacakların/i.test(sec.title), ext = /dış onay/i.test(sec.title);
    let sub = '', cur = null, fence = false;
    const close = () => { if (cur) items.push(finish(cur)); cur = null; };
    const finish = (it) => {
      const text = it.text.join(' ').trim(), more = it.more.join('\n').replace(/^\n+|\n+$/g, '');
      const all = text + '\n' + more;
      const box = /^\[( |x|X)\]\s+/.exec(text);
      let body = box ? text.slice(box[0].length) : text;
      const date = (/\b(20\d\d-\d\d-\d\d)\b/.exec(body) || [])[1] || '';
      // "2026-10-04: …" (a Bitenler line) and a leading "(note)" are not the headline: the date is shown on its own,
      // the note goes with the details
      body = body.replace(/^20\d\d-\d\d-\d\d:\s*/, '');
      const pre = /^\(([^()]{1,120})\)\s+(?=\*\*)/.exec(body);
      if (pre) body = body.slice(pre[0].length) + ` (${pre[1]})`;
      let state;
      if ((box && box[1] !== ' ') || (done && !box)) state = 'done';
      else if (done) state = 'done';
      else if (RX_HOLD.test(all)) state = 'waiting';
      else if (RX_DOING.test(all)) state = 'doing';
      else if (owner || RX_OWNER.test(all)) state = 'waiting';
      else if (ext) state = 'external';
      else state = 'later';
      // a short headline: the bold lead, else the text up to ~140 characters; the rest folds away
      const lead = /^\*\*([^*]+)\*\*:?\s*/.exec(body);
      let head, rest;
      if (lead) { head = lead[1].replace(/:$/, ''); rest = body.slice(lead[0].length); }
      else if (body.length <= 160) { head = body; rest = ''; }
      else {
        const cut = body.lastIndexOf(' ', 140);
        head = body.slice(0, cut > 60 ? cut : 140);
        if ((head.match(/`/g) || []).length % 2) head = head.slice(0, head.lastIndexOf('`')).trimEnd(); // not inside `code`
        if ((head.match(/\*\*/g) || []).length % 2) head = head.slice(0, head.lastIndexOf('**')).trimEnd();
        head += ' …';
        rest = body;
      }
      // the date is shown beside the headline: not again inside it ("(2026-10-05, sahip)" → "(sahip)")
      if (date) head = head.replace(` (${date})`, '').replace(`(${date}, `, '(').replace(`, ${date})`, ')').replace(`, ${date};`, ';').replace(`(${date}; `, '(');
      return { state, date, head, rest, more, section: sec.title, tag: sec.tag, key: sec.key, sub };
    };
    for (const line of String(sec.body).split('\n')) {
      if (/^\s*```/.test(line)) fence = !fence;
      if (!fence && /^###\s+/.test(line)) { close(); sub = line.replace(/^#+\s+/, '').trim(); continue; }
      const top = !fence && /^[-*]\s+(.*)$/.exec(line);
      if (top) { close(); cur = { text: [top[1]], more: [], wrap: true }; continue; }
      if (!cur) continue;
      if (!line.trim()) { cur.wrap = false; cur.more.push(''); continue; }
      if (/^\s+\S/.test(line)) {
        // a wrapped line of the item itself, or its nested list / text
        if (cur.wrap && !/^\s*[-*]\s+/.test(line)) cur.text.push(line.trim());
        else { cur.wrap = false; cur.more.push(line.replace(/^ {2}/, '')); }
      } else close(); // a paragraph after the list: not an item
    }
    close();
  }
  return items;
}
