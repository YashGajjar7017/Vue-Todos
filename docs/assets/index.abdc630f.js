var N = Object.defineProperty,
  D = Object.defineProperties;
var U = Object.getOwnPropertyDescriptors;
var M = Object.getOwnPropertySymbols;
var j = Object.prototype.hasOwnProperty,
  I = Object.prototype.propertyIsEnumerable;
var S = (t, e, o) =>
    e in t
      ? N(t, e, { enumerable: !0, configurable: !0, writable: !0, value: o })
      : (t[e] = o),
  y = (t, e) => {
    for (var o in e || (e = {})) j.call(e, o) && S(t, o, e[o]);
    if (M) for (var o of M(e)) I.call(e, o) && S(t, o, e[o]);
    return t;
  },
  k = (t, e) => D(t, U(e));
import {
  d as _,
  u as B,
  r as g,
  o as d,
  c as f,
  a as i,
  w as O,
  v as V,
  t as q,
  b as P,
  e as Y,
  f as E,
  F,
  g as K,
  n as L,
  h as b,
  i as G,
  j as J,
  k as R,
  l as W,
  m as Q,
  p as X,
  q as Z,
  s as $,
  x as ee,
} from "./vendor.16b0679c.js";
const te = function () {
  const e = document.createElement("link").relList;
  if (e && e.supports && e.supports("modulepreload")) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) a(s);
  new MutationObserver((s) => {
    for (const n of s)
      if (n.type === "childList")
        for (const l of n.addedNodes)
          l.tagName === "LINK" && l.rel === "modulepreload" && a(l);
  }).observe(document, { childList: !0, subtree: !0 });
  function o(s) {
    const n = {};
    return (
      s.integrity && (n.integrity = s.integrity),
      s.referrerpolicy && (n.referrerPolicy = s.referrerpolicy),
      s.crossorigin === "use-credentials"
        ? (n.credentials = "include")
        : s.crossorigin === "anonymous"
        ? (n.credentials = "omit")
        : (n.credentials = "same-origin"),
      n
    );
  }
  function a(s) {
    if (s.ep) return;
    s.ep = !0;
    const n = o(s);
    fetch(s.href, n);
  }
};
te();
const oe = { class: "flex items-center justify-center" },
  se = { class: "mt-1 flex rounded-md" },
  ne = ["rows"],
  re = _({
    setup(t) {
      const e = B(),
        o = g(1),
        a = g(""),
        s = (l) => (o.value = l),
        n = () => {
          a.value.trim() !== "" && (e.dispatch("add", a.value), (a.value = ""));
        };
      return (l, r) => (
        d(),
        f("div", oe, [
          i("div", se, [
            O(
              i(
                "textarea",
                {
                  "onUpdate:modelValue": r[0] || (r[0] = (c) => (a.value = c)),
                  name: "todo-input",
                  class:
                    "focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-7 sm:text-sm border-gray-300 rounded-md mr-3 resize-none",
                  rows: o.value,
                  cols: "33",
                  onFocus: r[1] || (r[1] = (c) => s(5)),
                  onBlur: r[2] || (r[2] = (c) => s(1)),
                },
                null,
                40,
                ne
              ),
              [[V, a.value]]
            ),
            i(
              "button",
              {
                class:
                  "h-10 w-20 text-white rounded-lg bg-red-500 hover:bg-red-600",
                onClick: n,
              },
              "\uCD94\uAC00"
            ),
          ]),
        ])
      );
    },
  }),
  le = ["data-index"],
  ae = _({
    props: {
      columnWidth: { default: 400 },
      items: null,
      gap: { default: 0 },
      rtl: { type: Boolean, default: !1 },
      ssrColumns: { default: 0 },
    },
    emits: ["redraw", "redraw-skip"],
    setup(t, { emit: e }) {
      const o = t,
        { columnWidth: a, items: s, gap: n, rtl: l, ssrColumns: r } = q(o),
        c = g([]),
        w = g();
      function T() {
        const u = Math.floor(
          (w.value.getBoundingClientRect().width + n.value) /
            (a.value + n.value)
        );
        return u > 0 ? u : 1;
      }
      function A(u) {
        return [...new Array(u)].map(() => []);
      }
      if (r.value > 0) {
        const u = A(r.value);
        s.value.forEach((v, m) => u[m % r.value].push(m)), (c.value = u);
      }
      async function z(u) {
        if (u >= s.value.length) return;
        await J();
        const v = Array.from(w.value.children);
        l.value && v.reverse();
        const m = v.reduce((x, p) =>
          p.getBoundingClientRect().height < x.getBoundingClientRect().height
            ? p
            : x
        );
        c.value[+m.dataset.index].push(u), await z(u + 1);
      }
      async function C(u = !1) {
        if (c.value.length === T() && !u) {
          e("redraw-skip");
          return;
        }
        c.value = A(T());
        const v = window.scrollY;
        await z(0), window.scrollTo({ top: v }), e("redraw");
      }
      const H = new ResizeObserver(() => C());
      return (
        P(() => {
          C(), H.observe(w.value);
        }),
        Y(() => H.unobserve(w.value)),
        E([s, l], () => C(!0)),
        E([a, n], () => C()),
        (u, v) => (
          d(),
          f(
            "div",
            {
              ref_key: "wall",
              ref: w,
              class: "masonry-wall",
              style: L({ display: "flex", gap: `${b(n)}px` }),
            },
            [
              (d(!0),
              f(
                F,
                null,
                K(
                  c.value,
                  (m, x) => (
                    d(),
                    f(
                      "div",
                      {
                        key: x,
                        class: "masonry-column",
                        "data-index": x,
                        style: L({
                          display: "flex",
                          "flex-basis": 0,
                          "flex-direction": "column",
                          "flex-grow": 1,
                          height: "max-content",
                          gap: `${b(n)}px`,
                        }),
                      },
                      [
                        (d(!0),
                        f(
                          F,
                          null,
                          K(
                            m,
                            (p) => (
                              d(),
                              f(
                                "div",
                                {
                                  key: p,
                                  class:
                                    "masonry-item flex items-center justify-center",
                                },
                                [
                                  G(
                                    u.$slots,
                                    "default",
                                    { item: b(s)[p], index: p },
                                    () => [R(W(b(s)[p]), 1)]
                                  ),
                                ]
                              )
                            )
                          ),
                          128
                        )),
                      ],
                      12,
                      le
                    )
                  )
                ),
                128
              )),
            ],
            4
          )
        )
      );
    },
  }),
  h = { BLACK: "#000000", WHITE: "#ffffff" },
  ie = () =>
    "xxxxxxxx".replace(/x/g, (t) => {
      const e = (Math.random() * 8) | 0;
      return (t === "x" ? e : (e & 3) | 8).toString(8);
    }),
  ce = Q({
    state: { todoList: [] },
    actions: {
      add({ commit: t }, e) {
        t("insert", e);
      },
      delete({ commit: t }, e) {
        t("remove", e);
      },
      sync({ commit: t }, e) {
        t("update", e);
      },
    },
    mutations: {
      insert(t, e) {
        t.todoList.push({
          id: ie(),
          content: e,
          height: "auto",
          noteColor: h.WHITE,
          color: h.BLACK,
          isFinish: !1,
        });
      },
      remove(t, e) {
        t.todoList = t.todoList.filter(({ id: o }) => o !== e);
      },
      update(t, e) {
        const o = t.todoList.findIndex(({ id: a }) => a === e.id);
        t.todoList.splice(o, 1, y(y({}, t.todoList[o]), e));
      },
    },
  }),
  ue = { class: "self-end flex mt-2" },
  de = i(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      class: "h-5 w-5",
      viewBox: "0 0 20 20",
      fill: "currentColor",
    },
    [
      i("path", {
        "fill-rule": "evenodd",
        d: "M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z",
        "clip-rule": "evenodd",
      }),
    ],
    -1
  ),
  fe = [de],
  he = i(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      class: "h-5 w-5",
      viewBox: "0 0 20 20",
      fill: "currentColor",
    },
    [
      i("path", {
        "fill-rule": "evenodd",
        d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
        "clip-rule": "evenodd",
      }),
    ],
    -1
  ),
  pe = [he],
  ve = i(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      class: "h-5 w-5",
      viewBox: "0 0 20 20",
      fill: "currentColor",
    },
    [
      i("path", {
        "fill-rule": "evenodd",
        d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
        "clip-rule": "evenodd",
      }),
    ],
    -1
  ),
  me = [ve],
  ge = _({
    props: { item: null },
    setup(t) {
      const e = t,
        o = B(),
        a = () => {
          const l = k(y({}, e.item), {
            color: e.item.color === h.BLACK ? h.WHITE : h.BLACK,
            noteColor: e.item.noteColor === h.WHITE ? h.BLACK : h.WHITE,
          });
          o.dispatch("sync", l);
        },
        s = () => {
          const l = k(y({}, e.item), { isFinish: !e.item.isFinish });
          o.dispatch("sync", l);
        },
        n = () => {
          o.dispatch("delete", e.item.id);
        };
      return (l, r) => (
        d(),
        f("div", ue, [
          i("button", { onClick: a }, fe),
          i("button", { onClick: s }, pe),
          i("button", { onClick: n }, me),
        ])
      );
    },
  }),
  _e = ["onUpdate:modelValue", "onKeyup", "onBlur"],
  we = _({
    setup(t) {
      const e = B(),
        o = g([]);
      e.subscribe((n, l) => (o.value = [...l.todoList]));
      const a = (n, l) => {
          let r = n.target;
          (r.style.height = "auto"),
            (l.height = r.scrollHeight + "px"),
            (r.style.height = l.height);
        },
        s = ({ target: n }, l) => {
          const r = n.value;
          e.dispatch("sync", { id: l, content: r });
        };
      return (n, l) => (
        d(),
        X(
          ae,
          { items: o.value, "column-width": 350, gap: 16 },
          {
            default: Z(({ item: r }) => [
              i(
                "div",
                {
                  class:
                    "w-80 p-4 flex flex-col border-2 rounded-lg border-rose-600 float-left",
                  style: L({
                    backgroundColor: r.noteColor,
                    color: r.color,
                    textDecoration: r.isFinish ? "line-through" : "",
                  }),
                },
                [
                  O(
                    i(
                      "textarea",
                      {
                        "onUpdate:modelValue": (c) => (r.content = c),
                        class:
                          "form-control w-full px-3 py-1.5 font-normal text-gray-700 bg-white bg-clip-padding border-none rounded m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:border-solid focus:outline-none p-3 overflow-hidden resize-none transition ease-in-out text-base form-control block tracking-widest",
                        style: L({ height: r.height }),
                        onKeyup: (c) => a(c, r),
                        onBlur: (c) => s(c, r.id),
                      },
                      `\r
        `,
                      44,
                      _e
                    ),
                    [[V, r.content]]
                  ),
                  $(ge, { item: r }, null, 8, ["item"]),
                ],
                4
              ),
            ]),
            _: 1,
          },
          8,
          ["items"]
        )
      );
    },
  }),
  xe = { class: "body w-full flex flex-col my-8" },
  ye = _({
    setup(t) {
      return (e, o) => (d(), f("div", xe, [$(we)]));
    },
  }),
  Ce = { class: "w-full h-full" },
  be = { class: "body mt-14 px-4 py-8" },
  Le = { class: "m-auto", style: { width: "1100px" } },
  $e = { class: "text-center mt-6" },
  Be = R(" \uC644\uB8CC\uB41C \uC77C\uC758 \uAC1C\uC218 "),
  ke = { class: "text-lg font-bold" },
  Te = _({
    setup(t) {
      const e = B(),
        o = g(0);
      return (
        e.subscribe((a, s) => {
          o.value = s.todoList.filter(({ isFinish: n }) => n).length;
        }),
        (a, s) => (
          d(),
          f("main", Ce, [
            i("div", be, [
              i("div", Le, [
                $(re),
                i("div", $e, [Be, i("span", ke, W(o.value), 1)]),
                $(ye),
              ]),
            ]),
          ])
        )
      );
    },
  });
ee(Te).use(ce).mount("#app");
