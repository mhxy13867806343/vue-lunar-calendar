var Qe = Object.defineProperty;
var Xe = (a, l, e) => l in a ? Qe(a, l, { enumerable: !0, configurable: !0, writable: !0, value: e }) : a[l] = e;
var U = (a, l, e) => (Xe(a, typeof l != "symbol" ? l + "" : l, e), e);
import { defineComponent as ke, computed as j, openBlock as T, createElementBlock as Y, normalizeClass as ue, createElementVNode as N, toDisplayString as R, createCommentVNode as Z, Fragment as ne, renderList as le, normalizeStyle as ce, withModifiers as ze, renderSlot as ie, createTextVNode as ea, useSlots as aa, ref as L, watch as de, onMounted as Me, createVNode as ge, withDirectives as $e, vModelSelect as Ce, createBlock as re, withCtx as Ee, unref as ta, withKeys as Fe, resolveDynamicComponent as na, onUnmounted as la } from "vue";
const oa = ["aria-label", "aria-selected", "aria-disabled", "tabindex"], sa = { class: "cell-date" }, ra = { class: "solar-date" }, ia = {
  key: 0,
  class: "lunar-date"
}, ua = {
  key: 0,
  class: "lunar-info"
}, ca = {
  key: 0,
  class: "lunar-month"
}, da = ["title"], ma = {
  key: 1,
  class: "festival-info"
}, fa = ["title"], ga = ["title"], va = {
  key: 2,
  class: "events-container"
}, ha = ["title", "onClick"], ka = { class: "event-title" }, ya = {
  key: 0,
  class: "more-events"
}, pa = ["title"], Da = ["title"], ba = {
  key: 5,
  class: "custom-content"
}, Ma = {
  key: 6,
  class: "selection-indicator"
}, wa = {
  key: 7,
  class: "today-indicator"
}, Ta = /* @__PURE__ */ ke({
  __name: "CalendarCell",
  props: {
    date: {},
    events: { default: () => [] },
    selected: { type: Boolean, default: !1 },
    inRange: { type: Boolean, default: !1 },
    rangeStart: { type: Boolean, default: !1 },
    rangeEnd: { type: Boolean, default: !1 },
    today: { type: Boolean, default: !1 },
    otherMonth: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    showLunar: { type: Boolean, default: !0 },
    showFestivals: { type: Boolean, default: !0 },
    showTerms: { type: Boolean, default: !0 },
    locale: {}
  },
  emits: ["click", "dblclick", "contextmenu", "mouseenter", "eventClick"],
  setup(a, { emit: l }) {
    const e = a, o = l, s = j(() => e.date.week === 0 || e.date.week === 6), r = j(() => e.events.some((f) => f.type === "holiday")), g = j(() => e.events.length > 0), v = j(() => e.events.slice(0, 3)), d = j(() => Math.max(0, e.events.length - 3)), y = j(() => !e.showFestivals || !e.date.festival ? "" : e.date.festival.split(" ").filter((A) => A.trim())[0] || ""), M = j(() => {
      const f = [
        `${e.date.sYear}年${e.date.sMonth}月${e.date.sDay}日`,
        e.date.weekZH
      ];
      return e.showLunar && e.date.lDayZH && f.push(`农历${e.date.lDayZH}`), e.today && f.push("今天"), e.selected && f.push("已选择"), e.disabled && f.push("不可选择"), y.value && f.push(y.value), e.date.term && f.push(e.date.term), g.value && f.push(`${e.events.length}个事件`), f.join(", ");
    }), D = () => {
      e.disabled || o("click", e.date);
    }, C = () => {
      e.disabled || o("dblclick", e.date);
    }, I = (f) => {
      e.disabled || (f.preventDefault(), o("contextmenu", e.date, f));
    }, B = () => {
      e.disabled || o("mouseenter", e.date);
    }, S = (f) => {
      (f.key === "Enter" || f.key === " ") && (f.preventDefault(), D());
    }, F = (f) => ({
      白羊座: "♈",
      金牛座: "♉",
      双子座: "♊",
      巨蟹座: "♋",
      狮子座: "♌",
      处女座: "♍",
      天秤座: "♎",
      天蝎座: "♏",
      射手座: "♐",
      摩羯座: "♑",
      水瓶座: "♒",
      双鱼座: "♓"
    })[f] || "", O = (f) => ({
      鼠: "🐭",
      牛: "🐮",
      虎: "🐯",
      兔: "🐰",
      龙: "🐲",
      蛇: "🐍",
      马: "🐴",
      羊: "🐑",
      猴: "🐵",
      鸡: "🐔",
      狗: "🐶",
      猪: "🐷"
    })[f] || "";
    return (f, A) => (T(), Y("div", {
      class: ue([
        "calendar-cell",
        {
          "is-selected": f.selected,
          "is-today": f.today,
          "is-other-month": f.otherMonth,
          "is-disabled": f.disabled,
          "is-weekend": s.value,
          "is-holiday": r.value,
          "is-in-range": f.inRange,
          "is-range-start": f.rangeStart,
          "is-range-end": f.rangeEnd,
          "has-events": g.value
        }
      ]),
      "aria-label": M.value,
      "aria-selected": f.selected,
      "aria-disabled": f.disabled,
      tabindex: f.disabled ? -1 : 0,
      onClick: D,
      onDblclick: C,
      onContextmenu: I,
      onMouseenter: B,
      onKeydown: S
    }, [
      N("div", sa, [
        N("span", ra, R(f.date.sDay), 1),
        f.showLunar && f.date.lDayZH ? (T(), Y("span", ia, R(f.date.lDayZH), 1)) : Z("", !0)
      ]),
      f.showLunar ? (T(), Y("div", ua, [
        f.date.lMonthZH && f.date.lDay === 1 ? (T(), Y("span", ca, R(f.date.lMonthZH), 1)) : Z("", !0),
        f.date.gzDayZH ? (T(), Y("span", {
          key: 1,
          class: "ganzhi",
          title: `${f.date.gzYearZH}年 ${f.date.gzMonthZH}月 ${f.date.gzDayZH}日`
        }, R(f.date.gzDayZH), 9, da)) : Z("", !0)
      ])) : Z("", !0),
      f.showFestivals || f.showTerms ? (T(), Y("div", ma, [
        f.showTerms && f.date.term ? (T(), Y("span", {
          key: 0,
          class: "term",
          title: f.date.term
        }, R(f.date.term), 9, fa)) : Z("", !0),
        f.showFestivals && y.value ? (T(), Y("span", {
          key: 1,
          class: "festival",
          title: y.value
        }, R(y.value), 9, ga)) : Z("", !0)
      ])) : Z("", !0),
      g.value ? (T(), Y("div", va, [
        (T(!0), Y(ne, null, le(v.value, (_) => (T(), Y("div", {
          key: _.id,
          class: ue([
            "event-dot",
            `event-${_.type}`
          ]),
          style: ce({ backgroundColor: _.color }),
          title: _.title,
          onClick: ze((P) => o("eventClick", _), ["stop"])
        }, [
          ie(f.$slots, "event", { event: _ }, () => [
            N("span", ka, R(_.title), 1)
          ], !0)
        ], 14, ha))), 128)),
        d.value > 0 ? (T(), Y("div", ya, " +" + R(d.value), 1)) : Z("", !0)
      ])) : Z("", !0),
      f.date.zodiac ? (T(), Y("div", {
        key: 3,
        class: "zodiac",
        title: f.date.zodiac
      }, R(F(f.date.zodiac)), 9, pa)) : Z("", !0),
      f.date.animal ? (T(), Y("div", {
        key: 4,
        class: "animal",
        title: `${f.date.animal}年`
      }, R(O(f.date.animal)), 9, Da)) : Z("", !0),
      f.$slots.default ? (T(), Y("div", ba, [
        ie(f.$slots, "default", {
          date: f.date,
          events: f.events
        }, void 0, !0)
      ])) : Z("", !0),
      f.selected ? (T(), Y("div", Ma)) : Z("", !0),
      f.today ? (T(), Y("div", wa)) : Z("", !0)
    ], 42, oa));
  }
});
const ye = (a, l) => {
  const e = a.__vccOpts || a;
  for (const [o, s] of l)
    e[o] = s;
  return e;
}, Sa = /* @__PURE__ */ ye(Ta, [["__scopeId", "data-v-2f72cd97"]]), Ya = { class: "event-header" }, $a = {
  key: 0,
  class: "event-time"
}, Ca = { key: 0 }, Ea = { class: "event-content" }, Fa = { class: "event-title" }, _a = {
  key: 0,
  class: "event-description"
}, ja = {
  key: 0,
  class: "event-reminders"
}, La = { class: "reminder-count" }, qa = {
  key: 1,
  class: "event-recurring"
}, za = { class: "recurring-text" }, Na = /* @__PURE__ */ ke({
  __name: "EventItem",
  props: {
    event: {}
  },
  emits: ["click"],
  setup(a) {
    const l = (s) => s, e = (s) => ({
      event: "事件",
      reminder: "提醒",
      holiday: "节日",
      custom: "自定义"
    })[s] || s, o = (s) => {
      const g = {
        daily: "每日",
        weekly: "每周",
        monthly: "每月",
        yearly: "每年"
      }[s.type] || s.type;
      return `${s.interval > 1 ? `每${s.interval}` : ""}${g}重复`;
    };
    return (s, r) => {
      var g;
      return T(), Y("div", {
        class: ue([
          "event-item",
          `event-${s.event.type}`,
          {
            "is-all-day": !s.event.startTime,
            "is-recurring": s.event.recurring
          }
        ]),
        style: ce({ borderLeftColor: s.event.color }),
        onClick: r[0] || (r[0] = (v) => s.$emit("click", s.event))
      }, [
        N("div", Ya, [
          s.event.startTime ? (T(), Y("div", $a, [
            ea(R(l(s.event.startTime)) + " ", 1),
            s.event.endTime ? (T(), Y("span", Ca, " - " + R(l(s.event.endTime)), 1)) : Z("", !0)
          ])) : Z("", !0),
          N("div", {
            class: "event-type-badge",
            style: ce({ backgroundColor: s.event.color })
          }, R(e(s.event.type)), 5)
        ]),
        N("div", Ea, [
          N("h4", Fa, R(s.event.title), 1),
          s.event.description ? (T(), Y("p", _a, R(s.event.description), 1)) : Z("", !0)
        ]),
        (g = s.event.reminders) != null && g.length ? (T(), Y("div", ja, [
          r[1] || (r[1] = N("span", { class: "reminder-icon" }, "🔔", -1)),
          N("span", La, R(s.event.reminders.length) + "个提醒", 1)
        ])) : Z("", !0),
        s.event.recurring ? (T(), Y("div", qa, [
          r[2] || (r[2] = N("span", { class: "recurring-icon" }, "🔄", -1)),
          N("span", za, R(o(s.event.recurring)), 1)
        ])) : Z("", !0)
      ], 6);
    };
  }
});
const Ia = /* @__PURE__ */ ye(Na, [["__scopeId", "data-v-30a4fd79"]]), Ra = { class: "calendar-header" }, Za = { class: "calendar-nav" }, Ba = ["disabled", "aria-label"], Aa = ["disabled", "aria-label"], Oa = { class: "date-selector" }, xa = ["disabled"], Ha = ["value"], Pa = ["disabled"], Ja = ["value"], Va = ["disabled", "aria-label"], Ka = ["disabled", "aria-label"], Wa = { class: "calendar-actions" }, Ua = ["disabled"], Ga = ["disabled"], Qa = { class: "calendar-weekdays" }, Xa = {
  key: 0,
  class: "event-panel"
}, et = { class: "event-list" }, at = {
  key: 1,
  class: "calendar-sidebar"
}, tt = /* @__PURE__ */ ke({
  __name: "VueLunarCalendar",
  props: {
    modelValue: {},
    mode: { default: "single" },
    locale: { default: "zh-CN" },
    theme: { default: "light" },
    showLunar: { type: Boolean, default: !0 },
    showFestivals: { type: Boolean, default: !0 },
    showTerms: { type: Boolean, default: !0 },
    showWeekNumbers: { type: Boolean, default: !1 },
    firstDayOfWeek: { default: 1 },
    selectable: { type: Boolean, default: !0 },
    readonly: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    clearable: { type: Boolean },
    events: { default: () => [] },
    holidays: { default: () => ({}) },
    minDate: {},
    maxDate: {},
    disabledDates: {}
  },
  emits: ["update:modelValue", "select", "dblclick", "contextmenu", "yearChange", "monthChange", "eventClick"],
  setup(a, { emit: l }) {
    const e = () => "‹", o = () => "›", s = () => "«", r = () => "»", g = () => "☀", v = () => "🌙", d = a, y = l, M = aa(), D = L((/* @__PURE__ */ new Date()).getFullYear()), C = L((/* @__PURE__ */ new Date()).getMonth() + 1), I = L(null), B = L([]), S = L(null), F = L(null), O = L(d.theme || "light"), f = j(() => {
      const u = [], z = D.value, w = C.value, ee = new Date(z, w, 0).getDate();
      for (let ae = 1; ae <= ee; ae++) {
        const Ge = new Date(z, w - 1, ae).toISOString().split("T")[0];
        u.push({
          date: Ge,
          sDay: ae,
          sYear: z,
          sMonth: w,
          lunarDay: `${ae}`,
          lMonth: w,
          lDay: ae,
          isLeapMonth: !1,
          gzYear: "",
          gzMonth: "",
          gzDay: "",
          animal: "",
          term: "",
          festival: "",
          lunarFestival: "",
          worktime: 0
        });
      }
      return u;
    }), A = j(() => ({
      "--primary-color": (O.value === "dark", "#1976d2")
    })), _ = j(() => {
      const u = {
        "zh-CN": {
          prevYear: "上一年",
          nextYear: "下一年",
          prevMonth: "上个月",
          nextMonth: "下个月",
          today: "今天",
          clear: "清除",
          months: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
          weekdays: ["日", "一", "二", "三", "四", "五", "六"]
        },
        "en-US": {
          prevYear: "Previous Year",
          nextYear: "Next Year",
          prevMonth: "Previous Month",
          nextMonth: "Next Month",
          today: "Today",
          clear: "Clear",
          months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        }
      };
      return u[d.locale] || u["zh-CN"];
    }), P = j(() => _.value.weekdays), H = () => {
      const u = /* @__PURE__ */ new Date();
      D.value = u.getFullYear(), C.value = u.getMonth() + 1;
    }, k = () => {
      D.value--;
    }, E = () => {
      D.value++;
    }, t = () => {
      C.value === 1 ? (C.value = 12, D.value--) : C.value--;
    }, m = () => {
      C.value === 12 ? (C.value = 1, D.value++) : C.value++;
    }, $ = () => {
      O.value = O.value === "light" ? "dark" : "light";
    }, i = (u) => `${u}年`, h = (u) => {
      var z;
      return ((z = d.events) == null ? void 0 : z.filter((w) => w.date === u)) || [];
    }, n = (u) => {
      y("eventClick", u);
    }, c = (u) => d.selectionMode === "single" ? I.value === u : d.selectionMode === "multiple" ? B.value.includes(u) : d.selectionMode === "range" ? u === S.value || u === F.value : !1, p = (u) => d.selectionMode !== "range" || !S.value || !F.value ? !1 : u > S.value && u < F.value, b = (u) => d.selectionMode === "range" && u === S.value, V = (u) => d.selectionMode === "range" && u === F.value, X = (u) => {
      if (!Ye(u.date)) {
        if (d.selectionMode === "single")
          I.value = u.date, y("update:modelValue", u.date), y("select", u.date, u);
        else if (d.selectionMode === "multiple") {
          const z = B.value.indexOf(u.date);
          z > -1 ? B.value.splice(z, 1) : B.value.push(u.date), y("update:modelValue", [...B.value]), y("select", u.date, u);
        } else if (d.selectionMode === "range") {
          if (!S.value || S.value && F.value)
            S.value = u.date, F.value = null;
          else if (S.value && !F.value) {
            u.date < S.value ? (F.value = S.value, S.value = u.date) : F.value = u.date;
            const z = { start: S.value, end: F.value };
            y("update:modelValue", z), y("rangeSelect", z);
          }
        }
      }
    }, q = () => {
      I.value = null, B.value = [], S.value = null, F.value = null, y("update:modelValue", null);
    }, J = () => {
    }, fe = () => {
    }, pe = () => {
    }, Ae = () => {
    }, Oe = () => {
    }, xe = (u) => {
      y("dblclick", u.date, u);
    }, He = (u, z) => {
      z.preventDefault(), y("contextmenu", u.date, u, z);
    }, Pe = j(() => {
      const u = d.minDate ? new Date(d.minDate).getFullYear() : 1900, z = d.maxDate ? new Date(d.maxDate).getFullYear() : 2100, w = [];
      for (let K = u; K <= z; K++)
        w.push(K);
      return w;
    }), Je = (u) => {
      const z = /* @__PURE__ */ new Date(), w = new Date(u);
      return z.getFullYear() === w.getFullYear() && z.getMonth() === w.getMonth() && z.getDate() === w.getDate();
    }, Ve = (u) => u.sMonth !== C.value, Ye = (u) => d.disabled || d.minDate && u < d.minDate || d.maxDate && u > d.maxDate ? !0 : Array.isArray(d.disabledDates) ? d.disabledDates.includes(u) : typeof d.disabledDates == "function" ? d.disabledDates(u) : !1, Ke = (u) => new Date(u).toLocaleDateString(d.locale), We = () => {
      y("yearChange", D.value);
    }, Ue = () => {
      y("monthChange", D.value, C.value);
    };
    return de(() => d.modelValue, (u) => {
      d.selectionMode === "single" ? I.value = u || null : d.selectionMode === "multiple" ? B.value = Array.isArray(u) ? u : [] : d.selectionMode === "range" && (u && typeof u == "object" && "start" in u && "end" in u ? (S.value = u.start, F.value = u.end) : (S.value = null, F.value = null));
    }, { immediate: !0 }), Me(() => {
    }), (u, z) => (T(), Y("div", {
      class: ue([
        "vue-lunar-calendar",
        `theme-${O.value}`,
        {
          "is-range": u.mode === "range",
          "is-multiple": u.mode === "multiple",
          "is-readonly": u.readonly,
          "is-disabled": u.disabled
        }
      ]),
      style: ce(A.value)
    }, [
      N("div", Ra, [
        N("div", Za, [
          N("button", {
            class: "nav-btn",
            onClick: k,
            disabled: u.disabled,
            "aria-label": _.value.prevYear
          }, [
            ge(s)
          ], 8, Ba),
          N("button", {
            class: "nav-btn",
            onClick: t,
            disabled: u.disabled,
            "aria-label": _.value.prevMonth
          }, [
            ge(e)
          ], 8, Aa),
          N("div", Oa, [
            $e(N("select", {
              "onUpdate:modelValue": z[0] || (z[0] = (w) => D.value = w),
              onChange: We,
              disabled: u.disabled,
              class: "year-select"
            }, [
              (T(!0), Y(ne, null, le(Pe.value, (w) => (T(), Y("option", {
                key: w,
                value: w
              }, R(i(w)), 9, Ha))), 128))
            ], 40, xa), [
              [Ce, D.value]
            ]),
            $e(N("select", {
              "onUpdate:modelValue": z[1] || (z[1] = (w) => C.value = w),
              onChange: Ue,
              disabled: u.disabled,
              class: "month-select"
            }, [
              (T(!0), Y(ne, null, le(_.value.months, (w, K) => (T(), Y("option", {
                key: K,
                value: K + 1
              }, R(w), 9, Ja))), 128))
            ], 40, Pa), [
              [Ce, C.value]
            ])
          ]),
          N("button", {
            class: "nav-btn",
            onClick: m,
            disabled: u.disabled,
            "aria-label": _.value.nextMonth
          }, [
            ge(o)
          ], 8, Va),
          N("button", {
            class: "nav-btn",
            onClick: E,
            disabled: u.disabled,
            "aria-label": _.value.nextYear
          }, [
            ge(r)
          ], 8, Ka)
        ]),
        N("div", Wa, [
          u.readonly ? Z("", !0) : (T(), Y("button", {
            key: 0,
            class: "action-btn today-btn",
            onClick: H,
            disabled: u.disabled
          }, R(_.value.today), 9, Ua)),
          u.clearable && u.modelValue ? (T(), Y("button", {
            key: 1,
            class: "action-btn clear-btn",
            onClick: q,
            disabled: u.disabled
          }, R(_.value.clear), 9, Ga)) : Z("", !0),
          N("button", {
            class: "action-btn theme-toggle",
            onClick: $,
            "aria-label": "切换主题"
          }, [
            O.value === "dark" ? (T(), re(g, { key: 0 })) : (T(), re(v, { key: 1 }))
          ])
        ])
      ]),
      N("div", Qa, [
        (T(!0), Y(ne, null, le(P.value, (w, K) => (T(), Y("div", {
          key: K,
          class: "weekday"
        }, R(w), 1))), 128))
      ]),
      N("div", {
        class: "calendar-grid",
        onMousedown: J,
        onMousemove: fe,
        onMouseup: pe,
        onMouseleave: Ae
      }, [
        (T(!0), Y(ne, null, le(f.value, (w, K) => (T(), re(Sa, {
          key: `${w.sYear}-${w.sMonth}-${w.sDay}`,
          date: w,
          events: h(w.date),
          selected: c(w.date),
          "in-range": p(w.date),
          "range-start": b(w.date),
          "range-end": V(w.date),
          today: Je(w.date),
          "other-month": Ve(w),
          disabled: Ye(w.date),
          "show-lunar": u.showLunar,
          "show-festivals": u.showFestivals,
          "show-terms": u.showTerms,
          locale: _.value,
          onClick: (ee) => X(w),
          onDblclick: (ee) => xe(w),
          onContextmenu: He,
          onMouseenter: (ee) => Oe(),
          onEventClick: n
        }, {
          default: Ee(({ date: ee, events: ae }) => [
            ie(u.$slots, "default", {
              date: ee,
              events: ae
            }, void 0, !0)
          ]),
          event: Ee(({ event: ee }) => [
            ie(u.$slots, "event", { event: ee }, void 0, !0)
          ]),
          _: 2
        }, 1032, ["date", "events", "selected", "in-range", "range-start", "range-end", "today", "other-month", "disabled", "show-lunar", "show-festivals", "show-terms", "locale", "onClick", "onDblclick", "onMouseenter"]))), 128))
      ], 32),
      I.value && u.events.length > 0 ? (T(), Y("div", Xa, [
        N("h3", null, R(Ke(I.value.date)) + " 的事件", 1),
        N("div", et, [
          (T(!0), Y(ne, null, le(h(I.value.date), (w) => (T(), re(Ia, {
            key: w.id,
            event: w,
            onClick: (K) => n(w)
          }, null, 8, ["event", "onClick"]))), 128))
        ])
      ])) : Z("", !0),
      ta(M).sidebar ? (T(), Y("div", at, [
        ie(u.$slots, "sidebar", { selectedDate: I.value }, void 0, !0)
      ])) : Z("", !0)
    ], 6));
  }
});
const Ne = /* @__PURE__ */ ye(tt, [["__scopeId", "data-v-f28e156c"]]), nt = ["aria-label", "role", "tabindex", "onKeydown"], lt = { key: 1 }, ot = /* @__PURE__ */ ke({
  __name: "IconComponent",
  props: {
    name: {},
    size: { default: "16px" },
    color: { default: "currentColor" },
    clickable: { type: Boolean, default: !1 },
    ariaLabel: {}
  },
  emits: ["click"],
  setup(a, { emit: l }) {
    const e = a, o = l, s = j(() => null), r = (v) => ({
      // 导航图标
      "chevron-left": "‹",
      "chevron-right": "›",
      "chevron-up": "‹",
      "chevron-down": "›",
      "arrow-left": "←",
      "arrow-right": "→",
      // 功能图标
      calendar: "📅",
      today: "📍",
      event: "📝",
      reminder: "🔔",
      holiday: "🎉",
      custom: "⭐",
      recurring: "🔄",
      notification: "🔔",
      settings: "⚙️",
      theme: "🎨",
      language: "🌐",
      // 状态图标
      check: "✓",
      close: "✕",
      add: "+",
      edit: "✏️",
      delete: "🗑️",
      search: "🔍",
      filter: "🔽",
      sort: "↕️",
      // 生肖图标
      rat: "🐭",
      ox: "🐮",
      tiger: "🐯",
      rabbit: "🐰",
      dragon: "🐲",
      snake: "🐍",
      horse: "🐴",
      goat: "🐐",
      monkey: "🐵",
      rooster: "🐔",
      dog: "🐶",
      pig: "🐷",
      // 天干地支
      jia: "甲",
      yi: "乙",
      bing: "丙",
      ding: "丁",
      wu: "戊",
      ji: "己",
      geng: "庚",
      xin: "辛",
      ren: "壬",
      gui: "癸",
      zi: "子",
      chou: "丑",
      yin: "寅",
      mao: "卯",
      chen: "辰",
      si: "巳",
      "wu-branch": "午",
      wei: "未",
      shen: "申",
      you: "酉",
      xu: "戌",
      hai: "亥",
      // 节气
      spring: "🌱",
      summer: "☀️",
      autumn: "🍂",
      winter: "❄️",
      // 月相
      "new-moon": "🌑",
      "waxing-crescent": "🌒",
      "first-quarter": "🌓",
      "waxing-gibbous": "🌔",
      "full-moon": "🌕",
      "waning-gibbous": "🌖",
      "last-quarter": "🌗",
      "waning-crescent": "🌘"
    })[v] || "?", g = () => {
      e.clickable && o("click");
    };
    return (v, d) => (T(), Y("span", {
      class: ue([
        "icon",
        `icon-${v.name}`,
        {
          "is-clickable": v.clickable
        }
      ]),
      style: ce({ fontSize: v.size, color: v.color }),
      onClick: g,
      "aria-label": v.ariaLabel,
      role: v.clickable ? "button" : void 0,
      tabindex: v.clickable ? 0 : void 0,
      onKeydown: [
        Fe(g, ["enter"]),
        Fe(ze(g, ["prevent"]), ["space"])
      ]
    }, [
      s.value ? (T(), re(na(s.value), { key: 0 })) : (T(), Y("span", lt, R(r(v.name)), 1))
    ], 46, nt));
  }
});
const Pt = /* @__PURE__ */ ye(ot, [["__scopeId", "data-v-e0665e22"]]), x = 1900, De = 1, Ie = 30, te = 2100, _e = 12, st = 31, me = [
  "iuo",
  "in0",
  "19bg",
  "l6l",
  "1kj0",
  "1mag",
  "2pak",
  "ll0",
  "16mg",
  "lei",
  "in0",
  "19dm",
  "196g",
  "1kig",
  "3kil",
  "1da0",
  "1ll0",
  "1bd2",
  "15dg",
  "2ibn",
  "ibg",
  "195g",
  "1d5l",
  "qig",
  "ra0",
  "3aqk",
  "ar0",
  "15bg",
  "kni",
  "ibg",
  "pb6",
  "1l50",
  "1qig",
  "rkl",
  "mmg",
  "ar0",
  "31n3",
  "14n0",
  "3i6n",
  "1iag",
  "1l50",
  "3m56",
  "1dag",
  "ll0",
  "39dk",
  "9eg",
  "14mg",
  "1kli",
  "1aag",
  "1dan",
  "r50",
  "1dag",
  "2kql",
  "jd0",
  "19dg",
  "2hbj",
  "klg",
  "1ad8",
  "1qag",
  "ql0",
  "1bl6",
  "1aqg",
  "ir0",
  "1an4",
  "19bg",
  "kj0",
  "1sj3",
  "1mag",
  "mqn",
  "ll0",
  "15mg",
  "jel",
  "img",
  "196g",
  "1l6k",
  "1kig",
  "1lao",
  "1da0",
  "1dl0",
  "35d6",
  "15dg",
  "idg",
  "1abk",
  "195g",
  "1cjq",
  "qig",
  "ra0",
  "1bq6",
  "1ar0",
  "15bg",
  "inl",
  "ibg",
  "p5g",
  "t53",
  "1qig",
  "qqo",
  "le0",
  "1ar0",
  "15ml",
  "14n0",
  "1ib0",
  "1mak",
  "1l50",
  "1mig",
  "tai",
  "ll0",
  "1atn",
  "9eg",
  "14mg",
  "1ill",
  "1aag",
  "1d50",
  "1el4",
  "1bag",
  "lep",
  "it0",
  "19dg",
  "2kbm",
  "klg",
  "1a9g",
  "uak",
  "ql0",
  "1bag",
  "mqi",
  "ir0",
  "19n6",
  "1970",
  "1kj0",
  "1qj5",
  "1l9g",
  "ml0",
  "tl3",
  "15mg",
  "inr",
  "img",
  "196g",
  "3k5m",
  "1kig",
  "1l90",
  "1na5",
  "1dd0",
  "lmg",
  "ldi",
  "idg",
  "19bn",
  "195g",
  "1aig",
  "3cil",
  "r90",
  "1bd0",
  "2ir3",
  "14rg",
  "ifo",
  "ibg",
  "p5g",
  "2q56",
  "1qig",
  "qp0",
  "39m4",
  "1an0",
  "18n0",
  "1kn3",
  "1ib0",
  "1lan",
  "1l50",
  "1mig",
  "nal",
  "ll0",
  "19mg",
  "lek",
  "kmg",
  "1ado",
  "1aag",
  "1d50",
  "1dl6",
  "1bag",
  "ld0",
  "1at4",
  "19dg",
  "klg",
  "1cjj",
  "q9g",
  "spn",
  "ql0",
  "1bag",
  "2iql",
  "ir0",
  "19bg",
  "l74",
  "1kb0",
  "1qb8",
  "1l90",
  "1ml0",
  "2ql6",
  "lmg",
  "in0",
  "1aek",
  "18mg",
  "1kag",
  "1sii",
  "1l90"
], rt = ["正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "冬", "腊"], it = ["初一", "初二", "初三", "初四", "初五", "初六", "初七", "初八", "初九", "初十", "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十", "廿一", "廿二", "廿三", "廿四", "廿五", "廿六", "廿七", "廿八", "廿九", "三十"], Re = Date.UTC(x, De - 1, Ie, 0, 0, 0);
function oe(a) {
  return parseInt(me[a - x], 32) & 15;
}
function we(a) {
  let l = 0, e = parseInt(me[a - x], 32);
  for (let o = 32768; o >= 16; o >>= 1)
    l += e & o ? 30 : 29;
  return oe(a) && (l += e & 65536 ? 30 : 29), l;
}
function Ze(a, l, e) {
  let o = oe(a), s = parseInt(me[a - x], 32), r = s & 1 << 16 - l ? 30 : 29;
  return e && l == o && (r = s & 65536 ? 30 : 29), r;
}
function ut(a, l, e, o) {
  if (a < x || a > te || l < 1 || l > 12)
    return null;
  let s = oe(a);
  if (o && s != l)
    return null;
  let r = (o ? v & 65536 : 1 << 17 - l) ? 30 : 29;
  if (e > r)
    return null;
  let g = 0, v = parseInt(me[a - x], 32);
  for (let d = x; d < a; d++)
    g += we(d);
  for (let d = 1; d < l || o && d == l && l == s; d++)
    g += v & 1 << 16 - d ? 30 : 29;
  return s && l > s && (g += v & 65536 ? 30 : 29), g += e, Re + g * 864e5;
}
function Te(a) {
  let l = Math.floor((a - Re) / 864e5), e = 0, o = 0, s = 0, r = !1, g;
  if (l <= 0)
    return null;
  let v = 0;
  for (e = x; e <= te && (g = we(e), !(v + g >= l)); e++)
    v += g;
  let d = parseInt(me[e - x], 32), y = oe(e);
  for (l -= v, v = 0, o = 1; o <= 12 && (g = d & 1 << 16 - o ? 30 : 29, !(v + g >= l)); o++)
    if (v += g, y && o == y) {
      if (g = d & 65536 ? 30 : 29, v + g >= l) {
        r = !0;
        break;
      }
      v += g;
    }
  return s = l - v, {
    lYear: e,
    lMonth: o,
    lDay: s,
    isLeap: r,
    lMonthZH: (r ? "闰" : "") + rt[o - 1] + "月",
    lDayZH: it[s - 1]
  };
}
function W(...a) {
  return a.map((l) => ("" + l).padStart(2, "0")).join("-");
}
const ct = ["日", "一", "二", "三", "四", "五", "六"];
function ve(a, l, e) {
  return Date.UTC(a, l - 1, e, 0, 0, 0);
}
function se(a) {
  let l = new Date(a), e = l.getDay(), o = {
    sYear: l.getFullYear(),
    sMonth: l.getMonth() + 1,
    sDay: l.getDate(),
    week: e,
    weekZH: "星期" + ct[e]
  };
  return o.date = W(o.sYear, o.sMonth, o.sDay), o;
}
const dt = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
function mt(a, l, e) {
  let o = ve(a, l, e), { lYear: s } = Te(o);
  const g = (s - 1984) % 12;
  return dt[g > -1 ? g : g + 12];
}
const ft = [4, 19, 3, 18, 4, 19, 4, 19, 4, 20, 4, 20, 6, 22, 6, 22, 6, 22, 7, 22, 6, 21, 6, 21], gt = [
  "4lkmd5j6l5",
  "55kql9lal9",
  "59lanalala",
  "5avbnatqla",
  "7akmd5j6l5",
  "55kql9lal9",
  "59lalalala",
  "5avbnatqla",
  "7akmd5j6l5",
  "55kql9lal9",
  "59lalalala",
  "5avbnatqla",
  "7akmd5j6l5",
  "4lkql9lal9",
  "55kqlalala",
  "5ananalqla",
  "5akmd5j5kl",
  "4lkqd9l6l5",
  "55kqlalal9",
  "5ananalqla",
  "5akmd5j5kl",
  "4lkmd9l6l5",
  "55kqlalal9",
  "59lanalqla",
  "5akmd5j5kl",
  "4lkmd9l6l5",
  "55kql9lal9",
  "59lanalala",
  "5akmclj5al",
  "4lkmd5j6l5",
  "55kql9lal9",
  "59lanalala",
  "5akmclj5al",
  "4lkmd5j6l5",
  "55kql9lal9",
  "59lalalala",
  "5akmclj5al",
  "4lkmd5j6l5",
  "55kql9lal9",
  "59lalalala",
  "5akmclj5al",
  "4lkmd5j6l5",
  "55kql9lal9",
  "59lalalala",
  "5aklclj5al",
  "4lkmd5j5kl",
  "4lkql9l6l9",
  "55kqlalala",
  "5aclclb5al",
  "2lkmd5j5kl",
  "4lkmd9l6l9",
  "55kqlalala",
  "5aclclb5al",
  "2lkmd5j5kl",
  "4lkmd9l6l5",
  "55kql9lal9",
  "5aalclb5al",
  "2lkmd5j5kl",
  "4lkmd5j6l5",
  "55kql9lal9",
  "59alclalal",
  "2lkmclj5al",
  "4lkmd5j6l5",
  "55kql9lal9",
  "59alclalal",
  "2lkmclj5al",
  "4lkmd5j6l5",
  "55kql9lal9",
  "59alalalal",
  "2lkmclj5al",
  "4lkmd5j6l5",
  "55kql9lal9",
  "59alalalal",
  "2lklclj5al",
  "4lkmd5j6l5",
  "55kql9l6l9",
  "59a5alalal",
  "2lklclb5al",
  "4lkmd5j5l5",
  "55kqd9l6l9",
  "59a5alalal",
  "2lklclb5al",
  "4lkmd5j5kl",
  "4lkmd9l6l9",
  "55a5akalal",
  "2lclclb5al",
  "2lkmd5j5kl",
  "4lkmd5l6l5",
  "55a5akalak",
  "2lalclalal",
  "2lkmclj5kl",
  "4lkmd5j6l5",
  "55a5akalak",
  "2kalclalal",
  "2lkmclj5al",
  "4lkmd5j6l5",
  "55a5akalak",
  "2kalalalal",
  "2lkmclj5al",
  "4lkmd5j6l5",
  "55a5akalak",
  "2kalalalal",
  "2lkmclj5al",
  "4lkmd5j6l5",
  "55a5akalak",
  "2kalalalal",
  "2lklclb5al",
  "4lkmd5j6l5",
  "55a5akahak",
  "2ka5alalal",
  "2lklclb5al",
  "4lkmd5j5l5",
  "55a52kahak",
  "2ka5akalal",
  "2lklclb5al",
  "4lkmd5j5kl",
  "4la12kahak",
  "2ga5akalal",
  "2lclclb5al",
  "2lkmclj5kl",
  "4la12g8hak",
  "2ga5akalak",
  "2lalclalal",
  "2lkmclj5kl",
  "4la12g8hag",
  "2ga5akalak",
  "2kalalalal",
  "2lkmclj5al",
  "4la12g8hag",
  "2ga5akalak",
  "2kalalalal",
  "2lkmclj5al",
  "4la12g8hag",
  "2ga5akalak",
  "2kalalalal",
  "2lklclb5al",
  "4la12g8hag",
  "2ga5akalak",
  "2kalalalal",
  "2lklclb5al",
  "4la12g8hag",
  "2ga52kahak",
  "2ka5alalal",
  "2lklclb5al",
  "4la12g8gag",
  "2ga12kahak",
  "2ka5akalal",
  "2lklclb5al",
  "4la1208ga0",
  "20a12g8hak",
  "2ga5akalal",
  "2lalclalal",
  "2la1208ga0",
  "20a12g8hak",
  "2ga5akalal",
  "2lalalalal",
  "2la1208ga0",
  "20a12g8hag",
  "2ga5akalak",
  "2lalalalal",
  "2la1208g00",
  "20a12g8hag",
  "2ga5akalak",
  "2kalalalal",
  "2la1208g00",
  "20a12g8hag",
  "2ga5akalak",
  "2kalalalal",
  "2la0200g00",
  "20a12g8hag",
  "2ga52kahak",
  "2kalalalal",
  "2la0200g00",
  "20a12g8gag",
  "2ga52kahak",
  "2ka5akalal",
  "2la0200g00",
  "20a12g8gag",
  "2ga12gahak",
  "2ka5akalal",
  "2la0200g00",
  "20a1208ga0",
  "2ga12g8hak",
  "2ga5akalal",
  "2l00200000",
  "a1208ga0",
  "20a12g8hak",
  "2ga5akalal",
  "2l00000000",
  "a1208ga0",
  "20a12g8hag",
  "2ga5akalak",
  "2l00000000",
  "a1208g00",
  "20a12g8hag",
  "2ga5akalak",
  "2k00000000",
  "a1200g00",
  "20a12g8hag",
  "2ga5akalak",
  "2kalalalal"
], vt = ["小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至"];
function he(a) {
  if (a < x || a > te)
    return !1;
  let l = gt[a - x], e = parseInt(l, 32).toString(4);
  return e.length != 24 && (e = "0" + e), e.split("").map(function(o, s) {
    return +o + ft[s];
  });
}
function ht(a, l, e) {
  let o = "";
  const s = he(a);
  return s && (s.push(31), s.forEach(function(r, g) {
    let v = Math.floor(g / 2) + 1;
    l == v && e == r && (o = vt[g]);
  })), o;
}
const kt = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"], yt = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
function Se(a) {
  a = a % 60, a < 0 && (a += 60);
  let l = a % 10, e = a % 12;
  return kt[l] + yt[e];
}
function pt(a, l, e) {
  let o = ve(a, l, e), { lYear: s } = Te(o), r = s - 1984;
  return Se(r);
}
function Dt(a, l, e) {
  let o = "";
  const s = he(a);
  if (s) {
    let r = 0;
    s.push(31), s.forEach(function(g, v) {
      let d = Math.floor(v / 2) + 1;
      W(l, e) >= W(d, g) && (r = d);
    }), r += (a - 1984) * 12, o = Se(r);
  }
  return o;
}
function be(a, l, e) {
  let s = Math.round((ve(a, l, e) - ve(1900, 1, 30)) / 864e5) + 39;
  return Se(s);
}
const bt = {
  "01-01": [{
    name: "元旦",
    found: "1949"
  }],
  "02-14": [{
    name: "情人节",
    found: "0270"
  }],
  "03-08": [{
    name: "妇女节",
    found: "1949-12"
  }],
  "03-12": [{
    name: "植树节",
    found: "1979"
  }],
  "04-01": [{
    name: "愚人节",
    found: "1564"
  }],
  "05-01": [{
    name: "劳动节",
    found: "1949-12"
  }],
  "05-04": [{
    name: "青年节",
    found: "1949-12"
  }],
  "06-01": [{
    name: "儿童节",
    found: "1949-11"
  }],
  "07-01": [{
    name: "建党节",
    found: "1938-05"
  }],
  "08-01": [{
    name: "建军节",
    found: "1933-07-11"
  }],
  "09-10": [{
    name: "教师节",
    found: "1985-06"
  }],
  "10-01": [{
    name: "国庆节",
    found: "1949-12-02"
  }],
  "11-01": [{
    name: "万圣节",
    found: "0600"
  }],
  "12-05": [{
    name: "国际志愿人员日",
    found: "1985-12-17"
  }],
  "12-13": [{
    name: "国家公祭日",
    found: "2014-02-27"
  }],
  "12-25": [{
    name: "圣诞节",
    found: "0336"
  }]
}, Mt = {
  "01-10": [{
    name: "中国人民警察节",
    found: "2020-07-21"
  }],
  "01-26": [{
    name: "国际海关日",
    found: "1983-01-26"
  }],
  "02-02": [{
    name: "世界湿地日",
    found: "1996"
  }],
  "02-10": [{
    name: "国际气象节",
    found: "1991-02-10"
  }],
  "03-01": [{
    name: "国际海豹日",
    found: "1983"
  }],
  "03-03": [{
    name: "全国爱耳日",
    found: "1998-03"
  }],
  "03-05": [{
    name: "雷锋纪念日",
    found: "1963-03-05"
  }],
  "03-09": [{
    name: "保护母亲河日",
    found: "2002"
  }],
  "03-15": [{
    name: "消费者权益日",
    found: "1983"
  }],
  "03-17": [{
    name: "国际航海日",
    found: "1977-11"
  }],
  "03-18": [{
    name: "全国爱肝日",
    found: "2001"
  }],
  "03-21": [{
    name: "世界森林日",
    found: "2012-12"
  }, {
    name: "世界睡眠日",
    found: "2001"
  }],
  "03-22": [{
    name: "世界水日",
    found: "1993-01-18"
  }],
  "03-23": [{
    name: "世界气象日",
    found: "1961"
  }],
  "03-24": [{
    name: "防治结核病日",
    found: "1995-03-24"
  }],
  "03-27": [{
    name: "学生安全教育日",
    found: "1996-03-25"
  }],
  "04-07": [{
    name: "世界卫生日",
    found: "1948-06"
  }],
  "04-13": [{
    name: "泼水节",
    found: ""
  }],
  "04-15": [{
    name: "国家安全教育日",
    found: "2015-07-01"
  }],
  "04-22": [{
    name: "世界地球日",
    found: "1970"
  }],
  "04-23": [{
    name: "世界读书日",
    found: "1995-11-15"
  }],
  "04-24": [{
    name: "中国航天日",
    found: "2016-03-08"
  }],
  "04-26": [{
    name: "知识产权日",
    found: "2001-04-26"
  }],
  "05-02": [{
    name: "世界防治哮喘日",
    found: "1998-12-11"
  }],
  "05-08": [
    {
      name: "世界微笑日",
      found: "1948"
    },
    {
      name: "世界红十字日",
      found: "1948"
    }
  ],
  "05-12": [
    {
      name: "国际护士节",
      found: "1912"
    },
    {
      name: "防灾减灾日",
      found: "2009-05-12"
    }
  ],
  "05-15": [{
    name: "国际家庭日",
    found: "1994-05-15"
  }],
  "05-18": [{
    name: "国际博物馆日",
    found: "1977-05-18"
  }],
  "05-19": [{
    name: "中国旅游日",
    found: "2001-05-19"
  }],
  "05-20": [{
    name: "学生营养日",
    found: "2001-03"
  }],
  "05-22": [{
    name: "国际生物多样性日",
    found: "2000-12-20"
  }],
  "05-30": [{
    name: "五卅运动纪念日",
    found: "1925-05-30"
  }],
  "05-31": [{
    name: "世界无烟日",
    found: "1987-11"
  }],
  "06-06": [{
    name: "世界环境日",
    found: "1972-06-05"
  }],
  "06-06": [{
    name: "全国爱眼日",
    found: "1996"
  }],
  "06-11": [{
    name: "中国人口日",
    found: "1990"
  }],
  "06-14": [{
    name: "世界献血者日",
    found: "2005-05-24"
  }],
  "06-23": [{
    name: "国际奥林匹克日",
    found: "1948-06-23"
  }],
  "06-25": [{
    name: "全国土地日",
    found: "1991-05-24"
  }],
  "06-26": [{
    name: "国际禁毒日",
    found: "1987-06-12"
  }],
  "07-01": [{
    name: "香港回归纪念日",
    found: "1997-07-01"
  }],
  "07-02": [{
    name: "国际体育记者日",
    found: "1995"
  }],
  "07-11": [{
    name: "世界人口日",
    found: "1989"
  }],
  "08-08": [{
    name: "全民健身日",
    found: "2009"
  }],
  "08-12": [{
    name: "国际青年日",
    found: "1999-12-17"
  }],
  "08-19": [{
    name: "中国医师节",
    found: "2017-11-03"
  }],
  "08-26": [{
    name: "全国律师咨询日",
    found: "1980-08-26"
  }],
  "09-03": [{
    name: "抗战胜利纪念日",
    found: "2014-02-27"
  }],
  "09-08": [{
    name: "国际扫盲日",
    found: "1965-11-17"
  }],
  "09-16": [
    {
      name: "中国脑健康日",
      found: "2000-09-16"
    },
    {
      name: "国际臭氧层保护日",
      found: "1995-01-23"
    }
  ],
  "09-18": [{
    name: "九一八事变纪念日",
    found: "1931-09-18"
  }],
  "09-20": [{
    name: "全国爱牙日",
    found: "1989"
  }],
  "09-21": [{
    name: "国际和平日",
    found: "2001-09-07"
  }],
  "09-27": [{
    name: "世界旅游日",
    found: "1970-09-27"
  }],
  "09-28": [{
    name: "孔子诞辰纪念日",
    found: "1913-09-28"
  }],
  "09-30": [{
    name: "烈士纪念日",
    found: "2014-09-30"
  }],
  "10-04": [{
    name: "世界动物日",
    found: "1931"
  }],
  "10-05": [{
    name: "世界教师日",
    found: "1994"
  }],
  "10-08": [{
    name: "全国高血压日",
    found: "1998"
  }],
  "10-09": [{
    name: "世界邮政日",
    found: "1984"
  }],
  "10-13": [{
    name: "世界保健日",
    found: "1950"
  }],
  "10-14": [{
    name: "世界标准日",
    found: "1946"
  }],
  "10-15": [{
    name: "国际盲人节",
    found: "1984"
  }],
  "10-16": [{
    name: "世界粮食日",
    found: "1981-10-16"
  }],
  "10-24": [{
    name: "联合国日",
    found: "1947-10-24"
  }],
  "11-08": [{
    name: "记者节",
    found: "2000-08-01"
  }],
  "11-09": [{
    name: "消防宣传日",
    found: "1992"
  }],
  "11-14": [{
    name: "世界防治糖尿病日",
    found: "1991"
  }],
  "11-17": [{
    name: "国际大学生节",
    found: "1946-11-17"
  }],
  "12-01": [{
    name: "世界艾滋病日",
    found: "1988"
  }],
  "12-03": [{
    name: "国际残疾人日",
    found: "1992-10-12"
  }],
  "12-04": [{
    name: "国家宪法日",
    found: "2014-11-01"
  }],
  "12-09": [{
    name: "世界足球日",
    found: "1978"
  }],
  "12-10": [{
    name: "世界人权日",
    found: "1948-12-10"
  }],
  "12-11": [{
    name: "国际山岳日",
    found: "2003-12-11"
  }],
  "12-15": [{
    name: "强化免疫日",
    found: "1988"
  }],
  "12-20": [{
    name: "澳门回归纪念日",
    found: "1999-12-20"
  }]
}, je = {
  "01-01": [{
    name: "春节",
    found: ""
  }],
  "01-15": [{
    name: "元宵节",
    found: ""
  }],
  "02-02": [{
    name: "龙头节",
    found: ""
  }],
  "03-03": [{
    name: "上巳节",
    found: ""
  }],
  "05-05": [{
    name: "端午节",
    found: ""
  }],
  "07-07": [{
    name: "七夕节",
    found: ""
  }],
  "07-15": [{
    name: "中元节",
    found: ""
  }],
  "08-15": [{
    name: "中秋节",
    found: ""
  }],
  "09-09": [{
    name: "重阳节",
    found: ""
  }],
  "10-15": [{
    name: "下元节",
    found: ""
  }],
  "12-08": [{
    name: "腊八节",
    found: ""
  }],
  "12-23": [{
    name: "北小年",
    found: ""
  }],
  "12-24": [{
    name: "南小年",
    found: ""
  }],
  "12-30": [{
    name: "除夕",
    found: ""
  }]
}, wt = {
  "03-23": [{
    name: "妈祖圣诞",
    found: "0960"
  }],
  "06-24": [{
    name: "火把节",
    found: ""
  }],
  "10-01": [{
    name: "寒衣节",
    found: ""
  }]
}, Tt = {
  "03-04-01": [{
    name: "中小学生安全教育日",
    found: "1996"
  }],
  "05-02-00": [{
    name: "母亲节",
    found: "1913-05-10"
  }],
  "05-03-00": [{
    name: "全国助残日",
    found: "1990-12-28"
  }],
  "06-03-00": [{
    name: "父亲节",
    found: "1972"
  }],
  "09-03-00": [{
    name: "世界清洁地球日",
    found: "1993"
  }],
  "09-04-00": [{
    name: "国际聋人日",
    found: "1957"
  }],
  "10-01-01": [{
    name: "国际住房日",
    found: "1985-12-17"
  }],
  "11-04-04": [{
    name: "感恩节",
    found: "1941"
  }]
}, Le = ["一九", "二九", "三九", "四九", "五九", "六九", "七九", "八九", "九九"];
function St(a, l, e) {
  const o = new Date(a, l - 1, e), s = o.getDate(), r = o.getDay(), g = Math.ceil(s / 7), v = W(a, l, e);
  return [
    bt[W(l, e)],
    Mt[W(l, e)],
    Tt[W(l, g, r)]
  ].flatMap(function(d = []) {
    return d.filter((y) => v >= y.found).map((y) => y.name);
  });
}
function Yt(a, l, e) {
  let o = [], s = he(a), r = 864e5;
  return function() {
    let g = new Date(a, 3, s[6] - 1).getTime(), v = se(g);
    v.sYear == a && v.sMonth == l && v.sDay == e && o.push("寒食节");
  }(), function() {
    let g = new Date(a, 5, s[11]).getTime(), v = new Date(a, 7, s[14]).getTime(), d = 0;
    for (let y = g; y <= v; y += r) {
      let M = se(y);
      be(M.sYear, M.sMonth, M.sDay).includes("庚") && (d++, M.sYear == a && M.sMonth == l && M.sDay == e && (d == 3 ? o.push("初伏") : d == 4 && o.push("中伏")));
    }
    d = 0;
    for (let y = v; y <= v + r * 20; y += r) {
      let M = se(y);
      be(M.sYear, M.sMonth, M.sDay).includes("庚") && (d++, M.sYear == a && M.sMonth == l && M.sDay == e && (d == 1 ? o.push("末伏") : d == 2 && o.push("出伏")));
    }
  }(), function() {
    let g = he(a - 1), v = new Date(a - 1, 11, g[23]).getTime(), d = new Date(a, 11, s[23]).getTime(), y = 0;
    for (let M = v; M <= v + 8 * 9 * r; M += 9 * r) {
      let D = se(M);
      D.sYear == a && D.sMonth == l && D.sDay == e && o.push(Le[y]), y++;
    }
    y = 0;
    for (let M = d; M <= d + 8 * 9 * r; M += 9 * r) {
      let D = se(M);
      D.sYear == a && D.sMonth == l && D.sDay == e && o.push(Le[y]), y++;
    }
  }(), function() {
    const v = function(d) {
      if (d < 1900 || d > 2100)
        return null;
      const y = d - 1900, M = y % 19, D = Math.floor(y / 4), C = Math.floor((7 * M + 1) / 19), I = (11 * M + 4 - C) % 29, B = (y + D + 31 - I) % 7, S = 25 - I - B;
      return S > 0 ? [4, S] : [3, 31 + S];
    }(a);
    if (v) {
      const [d, y] = v;
      d == l && y == e && o.push("复活节");
    }
  }(), o;
}
function $t(a, l, e) {
  let o = [];
  const s = W(a, l, e), r = W(l, e);
  return l == 12 && e == Ze(a, 12) ? o.push(je["12-30"][0].name) : o = o.concat([
    je[r],
    wt[r]
  ].flatMap(function(g = []) {
    return g.filter((v) => s >= v.found).map((v) => v.name);
  })), o;
}
const Ct = ["水瓶", "双鱼", "白羊", "金牛", "双子", "巨蟹", "狮子", "处女", "天秤", "天蝎", "射手", "摩羯"], Et = [20, 19, 21, 20, 21, 22, 23, 23, 23, 24, 23, 22];
function Ft(a, l) {
  let e = 11;
  return Et.forEach(function(o, s) {
    let r = s + 1;
    W(a, l) >= W(r, o) && (e = s % 12);
  }), Ct[e] + "座";
}
function Be(a, l, e) {
  if (a < x || a > te)
    throw new Error(`年份超出范围 ${x}-${te}`);
  if (l < 1 || l > 12)
    throw new Error("月份必须在1-12之间");
  if (e < 1 || e > 31)
    throw new Error("日期必须在1-31之间");
  const o = new Date(a, l - 1, e);
  if (o.getFullYear() !== a || o.getMonth() !== l - 1 || o.getDate() !== e)
    throw new Error("无效的日期");
  const s = o.getTime(), r = Te(s);
  if (!r)
    throw new Error("农历转换失败");
  const g = {
    year: pt(a, l, e),
    month: Dt(a, l, e),
    day: be(a, l, e)
  }, v = mt(r.lYear, l, e), d = ht(a, l, e), y = St(a, l, e), M = Yt(a, l, e), D = $t(r.lYear, r.lMonth, r.lDay), C = [...y, ...M, ...D].join(" "), I = Ft(l, e);
  return {
    lYear: r.lYear,
    lMonth: r.lMonth,
    lDay: r.lDay,
    isLeap: r.isLeap,
    lMonthZH: r.lMonthZH,
    lDayZH: r.lDayZH,
    IMonthCn: r.lMonthZH,
    IDayCn: r.lDayZH,
    gzYear: g.year,
    gzMonth: g.month,
    gzDay: g.day,
    Animal: v,
    Term: d || "",
    festival: C || "",
    astro: I
  };
}
function _t(a, l, e, o = !1) {
  const s = ut(a, l, e, o);
  if (!s)
    return null;
  const r = new Date(s);
  return {
    sYear: r.getFullYear(),
    sMonth: r.getMonth() + 1,
    sDay: r.getDate()
  };
}
function jt(a) {
  return we(a);
}
function Lt(a, l, e = !1) {
  return Ze(a, l, e);
}
function qt(a) {
  return oe(a);
}
function zt(a) {
  return oe(a) > 0;
}
function Nt() {
  return { min: x, max: te };
}
function It(a, l, e) {
  if (a < x || a > te || a === x && (l < De || l === De && e < Ie) || a === te && (l > _e || l === _e && e > st))
    return !1;
  const o = new Date(a, l - 1, e);
  return o.getFullYear() === a && o.getMonth() === l - 1 && o.getDate() === e;
}
function Rt() {
  const a = /* @__PURE__ */ new Date();
  return Be(a.getFullYear(), a.getMonth() + 1, a.getDate());
}
class G {
}
U(G, "solar2lunar", Be), U(G, "lunar2solar", _t), U(G, "lunarYearDays", jt), U(G, "lunarMonthDays", Lt), U(G, "leapMonth", qt), U(G, "isLeapYear", zt), U(G, "getYearRange", Nt), U(G, "isValidDate", It), U(G, "today", Rt);
function Jt(a) {
  const l = L(/* @__PURE__ */ new Date()), e = L(/* @__PURE__ */ new Date()), o = L([]), s = L(null), r = L(null), g = L(!1), v = j({
    get: () => e.value.getFullYear(),
    set: (n) => {
      const c = new Date(e.value);
      c.setFullYear(n), e.value = c;
    }
  }), d = j({
    get: () => e.value.getMonth() + 1,
    set: (n) => {
      const c = new Date(e.value);
      c.setMonth(n - 1), e.value = c;
    }
  }), y = j(() => new Date(v.value, d.value - 1, 1)), M = j(() => new Date(v.value, d.value, 0)), D = j(() => {
    const n = [], c = new Date(y.value), p = new Date(M.value), b = c.getDay(), V = a.weekStartsOn === "monday" ? b === 0 ? 6 : b - 1 : b;
    for (let q = V - 1; q >= 0; q--) {
      const J = new Date(c);
      J.setDate(J.getDate() - q - 1), n.push(C(J, !1));
    }
    for (let q = new Date(c); q <= p; q.setDate(q.getDate() + 1))
      n.push(C(new Date(q), !0));
    const X = 42 - n.length;
    for (let q = 1; q <= X; q++) {
      const J = new Date(p);
      J.setDate(J.getDate() + q), n.push(C(J, !1));
    }
    return n;
  }), C = (n, c) => {
    const p = G.solar2lunar(
      n.getFullYear(),
      n.getMonth() + 1,
      n.getDate()
    );
    return {
      date: n.toISOString().split("T")[0],
      solar: {
        year: n.getFullYear(),
        month: n.getMonth() + 1,
        day: n.getDate()
      },
      lunar: {
        year: p.lYear,
        month: p.lMonth,
        day: p.lDay,
        isLeap: p.isLeap,
        monthName: p.IMonthCn,
        dayName: p.IDayCn
      },
      // 兼容性属性
      sYear: n.getFullYear(),
      sMonth: n.getMonth() + 1,
      sDay: n.getDate(),
      lYear: p.lYear,
      lMonth: p.lMonth,
      lDay: p.lDay,
      zodiac: p.Animal,
      ganZhi: {
        year: p.gzYear,
        month: p.gzMonth,
        day: p.gzDay
      },
      solarTerm: p.Term || "",
      festival: p.festival || "",
      isToday: t(n, l.value),
      isCurrentMonth: c,
      isWeekend: n.getDay() === 0 || n.getDay() === 6,
      isHoliday: !1,
      // 将在事件系统中处理
      isSelected: !1,
      // 将在选择系统中处理
      isInRange: !1,
      // 将在选择系统中处理
      isRangeStart: !1,
      isRangeEnd: !1,
      isDisabled: !1
      // 将根据props.disabledDates处理
    };
  }, I = () => {
    const n = new Date(e.value);
    n.setMonth(n.getMonth() - 1), e.value = n;
  }, B = () => {
    const n = new Date(e.value);
    n.setMonth(n.getMonth() + 1), e.value = n;
  }, S = () => {
    const n = new Date(e.value);
    n.setFullYear(n.getFullYear() - 1), e.value = n;
  }, F = () => {
    const n = new Date(e.value);
    n.setFullYear(n.getFullYear() + 1), e.value = n;
  }, O = () => {
    e.value = /* @__PURE__ */ new Date();
  }, f = (n) => {
    e.value = new Date(n);
  }, A = (n, c) => {
    if (a.selectionMode === "single")
      o.value = [new Date(n)];
    else if (a.selectionMode === "multiple") {
      const p = o.value.findIndex((b) => t(b, n));
      p >= 0 ? o.value.splice(p, 1) : o.value.push(new Date(n));
    } else
      a.selectionMode === "range" && (c != null && c.shiftKey && s.value ? (r.value = new Date(n), k()) : !s.value || s.value && r.value ? (s.value = new Date(n), r.value = null, o.value = []) : (r.value = new Date(n), k()));
  }, _ = (n) => {
    a.selectionMode === "range" && (g.value = !0, s.value = new Date(n), r.value = null);
  }, P = (n) => {
    g.value && a.selectionMode === "range" && (r.value = new Date(n));
  }, H = () => {
    g.value && (g.value = !1, s.value && r.value && k());
  }, k = () => {
    if (!s.value || !r.value)
      return;
    const n = new Date(Math.min(s.value.getTime(), r.value.getTime())), c = new Date(Math.max(s.value.getTime(), r.value.getTime()));
    o.value = [];
    for (let p = new Date(n); p <= c; p.setDate(p.getDate() + 1))
      o.value.push(new Date(p));
  }, E = () => {
    o.value = [], s.value = null, r.value = null;
  }, t = (n, c) => n.getFullYear() === c.getFullYear() && n.getMonth() === c.getMonth() && n.getDate() === c.getDate(), m = (n) => o.value.some((c) => t(c, n)), $ = (n) => {
    if (!s.value)
      return !1;
    if (!r.value)
      return t(n, s.value);
    const c = Math.min(s.value.getTime(), r.value.getTime()), p = Math.max(s.value.getTime(), r.value.getTime()), b = n.getTime();
    return b >= c && b <= p;
  }, i = (n) => {
    if (!s.value || !r.value)
      return !1;
    const c = s.value.getTime() <= r.value.getTime() ? s.value : r.value;
    return t(n, c);
  }, h = (n) => {
    if (!s.value || !r.value)
      return !1;
    const c = s.value.getTime() > r.value.getTime() ? s.value : r.value;
    return t(n, c);
  };
  return de(() => a.modelValue, (n) => {
    n ? Array.isArray(n) ? o.value = n.map((c) => new Date(c)) : typeof n == "string" && (o.value = [new Date(n)]) : o.value = [];
  }, { immediate: !0 }), {
    // 状态
    currentDate: l,
    viewDate: e,
    selectedDates: o,
    rangeStart: s,
    rangeEnd: r,
    isDragging: g,
    // 计算属性
    currentYear: v,
    currentMonth: d,
    monthStart: y,
    monthEnd: M,
    calendarDates: D,
    // 导航方法
    prevMonth: I,
    nextMonth: B,
    prevYear: S,
    nextYear: F,
    goToday: O,
    goToDate: f,
    // 选择方法
    selectDate: A,
    startDragSelection: _,
    updateDragSelection: P,
    endDragSelection: H,
    clearSelection: E,
    // 工具方法
    isSameDay: t,
    isDateSelected: m,
    isDateInRange: $,
    isRangeStart: i,
    isRangeEnd: h
  };
}
function Vt(a, l) {
  const e = L([...(a == null ? void 0 : a.events) || []]), o = L(null), s = L(""), r = L("all"), g = j(() => {
    const i = {};
    return e.value.forEach((h) => {
      const n = H(h.date);
      i[n] || (i[n] = []), i[n].push(h), h.recurring && F(h).forEach((p) => {
        const b = H(p.date);
        i[b] || (i[b] = []), i[b].push(p);
      });
    }), i;
  }), v = j(() => e.value.filter((i) => {
    var c;
    const h = !s.value || i.title.toLowerCase().includes(s.value.toLowerCase()) || ((c = i.description) == null ? void 0 : c.toLowerCase().includes(s.value.toLowerCase())), n = r.value === "all" || i.type === r.value;
    return h && n;
  })), d = (i) => {
    const h = typeof i == "string" ? i : H(i.toISOString().split("T")[0]);
    return g.value[h] || [];
  }, y = (i, h) => {
    const n = [], c = new Date(i), p = new Date(h);
    for (let b = new Date(c); b <= p; b.setDate(b.getDate() + 1)) {
      const V = d(b);
      n.push(...V);
    }
    return n;
  }, M = (i) => {
    const h = {
      ...i,
      id: k(),
      type: i.type || "event",
      color: i.color || t(i.type || "event")
    };
    return e.value.push(h), h;
  }, D = (i, h) => {
    const n = e.value.findIndex((c) => c.id === i);
    return n >= 0 ? (e.value[n] = { ...e.value[n], ...h }, !0) : !1;
  }, C = (i) => {
    var n;
    const h = e.value.findIndex((c) => c.id === i);
    return h >= 0 ? (e.value.splice(h, 1), ((n = o.value) == null ? void 0 : n.id) === i && (o.value = null), !0) : !1;
  }, I = (i) => {
    let h = 0;
    return i.forEach((n) => {
      C(n) && h++;
    }), h;
  }, B = (i, h) => {
    const n = e.value.find((p) => p.id === i);
    if (!n)
      return null;
    const c = {
      ...n,
      date: h || n.date,
      title: `${n.title} (副本)`
    };
    return delete c.id, M(c);
  }, S = (i, h) => D(i, { date: h }), F = (i, h = 100) => {
    if (!i.recurring)
      return [];
    const n = [], c = new Date(i.date), { type: p, interval: b, endDate: V, count: X } = i.recurring;
    let q = new Date(c), J = 0;
    const fe = V ? new Date(V) : new Date(c.getFullYear() + 2, 11, 31), pe = X || h;
    for (; J < pe && q <= fe; ) {
      switch (p) {
        case "daily":
          q.setDate(q.getDate() + b);
          break;
        case "weekly":
          q.setDate(q.getDate() + 7 * b);
          break;
        case "monthly":
          q.setMonth(q.getMonth() + b);
          break;
        case "yearly":
          q.setFullYear(q.getFullYear() + b);
          break;
      }
      q <= fe && (n.push({
        ...i,
        id: `${i.id}_recurring_${J}`,
        date: q.toISOString().split("T")[0]
      }), J++);
    }
    return n;
  }, O = (i, h) => {
    const n = e.value.find((p) => p.id === i);
    if (!n)
      return !1;
    n.reminders || (n.reminders = []);
    const c = {
      ...h,
      id: E()
    };
    return n.reminders.push(c), !0;
  }, f = (i, h) => {
    const n = e.value.find((p) => p.id === i);
    if (!n || !n.reminders)
      return !1;
    const c = n.reminders.findIndex((p) => p.id === h);
    return c >= 0 ? (n.reminders.splice(c, 1), !0) : !1;
  }, A = (i = 60) => {
    const h = /* @__PURE__ */ new Date(), n = [];
    return e.value.forEach((c) => {
      c.reminders && c.reminders.forEach((p) => {
        const b = /* @__PURE__ */ new Date(`${c.date}T${c.startTime || "00:00"}`), X = new Date(b.getTime() - p.time * 60 * 1e3).getTime() - h.getTime();
        X > 0 && X <= i * 60 * 1e3 && n.push({ event: c, reminder: p });
      });
    }), n.sort((c, p) => {
      const b = (/* @__PURE__ */ new Date(`${c.event.date}T${c.event.startTime || "00:00"}`)).getTime() - c.reminder.time * 60 * 1e3, V = (/* @__PURE__ */ new Date(`${p.event.date}T${p.event.startTime || "00:00"}`)).getTime() - p.reminder.time * 60 * 1e3;
      return b - V;
    });
  }, _ = (i = "json") => {
    if (i === "json")
      return JSON.stringify(e.value, null, 2);
    {
      let h = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Vue Lunar Calendar//EN
`;
      return e.value.forEach((n) => {
        h += `BEGIN:VEVENT
`, h += `UID:${n.id}
`, h += `DTSTART:${n.date.replace(/-/g, "")}
`, h += `SUMMARY:${n.title}
`, n.description && (h += `DESCRIPTION:${n.description}
`), h += `END:VEVENT
`;
      }), h += "END:VCALENDAR", h;
    }
  }, P = (i, h = "json") => {
    try {
      if (h === "json") {
        const n = JSON.parse(i);
        let c = 0;
        return n.forEach((p) => {
          const b = { ...p, id: k() };
          e.value.push(b), c++;
        }), c;
      }
      return 0;
    } catch (n) {
      return console.error("导入事件失败:", n), 0;
    }
  }, H = (i) => i.split("T")[0], k = () => `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, E = () => `reminder_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, t = (i) => ({
    event: "#2196f3",
    reminder: "#ff9800",
    holiday: "#4caf50",
    custom: "#9c27b0"
  })[i] || "#2196f3";
  return a && de(() => a.events, (i) => {
    e.value = [...i || []];
  }, { deep: !0 }), {
    // 状态
    events: e,
    selectedEvent: o,
    eventFilter: s,
    eventTypeFilter: r,
    // 计算属性
    eventsByDate: g,
    filteredEvents: v,
    // 查询方法
    getEventsForDate: d,
    getEventsInRange: y,
    getDateEvents: (i) => d(i),
    // 事件管理
    addEvent: M,
    updateEvent: D,
    deleteEvent: C,
    deleteEvents: I,
    duplicateEvent: B,
    moveEvent: S,
    onEventClick: (i) => {
      o.value = i, l && l("event-click", i);
    },
    // 重复事件
    generateRecurringEvents: F,
    // 提醒管理
    addReminder: O,
    removeReminder: f,
    getUpcomingReminders: A,
    // 导入导出
    exportEvents: _,
    importEvents: P
  };
}
const Zt = {
  primary: "#2196f3",
  secondary: "#1976d2",
  background: "#ffffff",
  text: "#333333",
  border: "#e0e0e0",
  hover: "#f5f5f5",
  selected: "#2196f3",
  today: "#ff5722",
  weekend: "#f44336",
  holiday: "#4caf50",
  disabled: "#bdbdbd"
}, Bt = {
  primary: "#64b5f6",
  secondary: "#42a5f5",
  background: "#121212",
  text: "#ffffff",
  border: "#333333",
  hover: "#1e1e1e",
  selected: "#64b5f6",
  today: "#ff7043",
  weekend: "#ef5350",
  holiday: "#66bb6a",
  disabled: "#616161"
};
function Kt(a = "auto", l) {
  const e = L(a), o = L(!1), s = L(l || {}), r = () => {
    typeof window < "u" && window.matchMedia && (o.value = window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, g = j(() => e.value === "auto" ? o.value ? "dark" : "light" : e.value), v = j(() => ({
    ...g.value === "dark" ? Bt : Zt,
    ...s.value
  })), d = j(() => {
    const k = v.value;
    return {
      "--calendar-primary": k.primary,
      "--calendar-secondary": k.secondary,
      "--calendar-background": k.background,
      "--calendar-text": k.text,
      "--calendar-border": k.border,
      "--calendar-hover": k.hover,
      "--calendar-selected": k.selected,
      "--calendar-today": k.today,
      "--calendar-weekend": k.weekend,
      "--calendar-holiday": k.holiday,
      "--calendar-disabled": k.disabled
    };
  }), y = () => {
    if (typeof document < "u") {
      const k = document.documentElement, E = d.value;
      Object.entries(E).forEach(([t, m]) => {
        k.style.setProperty(t, m);
      }), k.classList.remove("theme-light", "theme-dark"), k.classList.add(`theme-${g.value}`);
    }
  }, M = (k) => {
    e.value = k, f(k);
  }, D = () => {
    e.value === "auto" ? M(o.value ? "light" : "dark") : M(e.value === "dark" ? "light" : "dark");
  }, C = (k) => {
    s.value = {
      ...s.value,
      ...k
    }, _(s.value);
  }, I = () => {
    s.value = {}, _({});
  }, B = (k) => {
    const E = k.replace("#", ""), t = parseInt(E.substr(0, 2), 16), m = parseInt(E.substr(2, 2), 16), $ = parseInt(E.substr(4, 2), 16);
    return (t * 299 + m * 587 + $ * 114) / 1e3 > 128 ? "#000000" : "#ffffff";
  }, S = (k) => {
    const E = k.replace("#", ""), t = parseInt(E.substr(0, 2), 16), m = parseInt(E.substr(2, 2), 16), $ = parseInt(E.substr(4, 2), 16);
    return {
      lighter: `rgb(${Math.min(255, t + 30)}, ${Math.min(255, m + 30)}, ${Math.min(255, $ + 30)})`,
      light: `rgb(${Math.min(255, t + 15)}, ${Math.min(255, m + 15)}, ${Math.min(255, $ + 15)})`,
      base: k,
      dark: `rgb(${Math.max(0, t - 15)}, ${Math.max(0, m - 15)}, ${Math.max(0, $ - 15)})`,
      darker: `rgb(${Math.max(0, t - 30)}, ${Math.max(0, m - 30)}, ${Math.max(0, $ - 30)})`
    };
  }, F = {
    blue: {
      primary: "#2196f3",
      secondary: "#1976d2",
      selected: "#2196f3"
    },
    green: {
      primary: "#4caf50",
      secondary: "#388e3c",
      selected: "#4caf50"
    },
    purple: {
      primary: "#9c27b0",
      secondary: "#7b1fa2",
      selected: "#9c27b0"
    },
    orange: {
      primary: "#ff9800",
      secondary: "#f57c00",
      selected: "#ff9800"
    },
    red: {
      primary: "#f44336",
      secondary: "#d32f2f",
      selected: "#f44336"
    }
  }, O = (k) => {
    const E = F[k];
    E && C(E);
  }, f = (k) => {
    typeof localStorage < "u" && localStorage.setItem("vue-calendar-theme", k);
  }, A = () => {
    if (typeof localStorage < "u") {
      const k = localStorage.getItem("vue-calendar-theme");
      if (k && ["light", "dark", "auto"].includes(k))
        return k;
    }
    return "auto";
  }, _ = (k) => {
    typeof localStorage < "u" && localStorage.setItem("vue-calendar-custom-theme", JSON.stringify(k));
  }, P = () => {
    if (typeof localStorage < "u")
      try {
        const k = localStorage.getItem("vue-calendar-custom-theme");
        return k ? JSON.parse(k) : {};
      } catch (k) {
        return console.warn("加载自定义主题失败:", k), {};
      }
    return {};
  }, H = () => {
    if (typeof window < "u" && window.matchMedia) {
      const k = window.matchMedia("(prefers-color-scheme: dark)"), E = (t) => {
        o.value = t.matches;
      };
      return k.addEventListener("change", E), () => {
        k.removeEventListener("change", E);
      };
    }
    return () => {
    };
  };
  return Me(() => {
    r();
    const k = A(), E = P();
    e.value = k, s.value = E;
    const t = H();
    return y(), t;
  }), de([g, s], () => {
    y();
  }, { deep: !0 }), {
    // 状态
    currentTheme: e,
    systemPrefersDark: o,
    customThemeConfig: s,
    // 计算属性
    effectiveTheme: g,
    themeConfig: v,
    cssVariables: d,
    // 方法
    setTheme: M,
    toggleDarkMode: D,
    updateCustomTheme: C,
    resetCustomTheme: I,
    applyPresetTheme: O,
    // 工具方法
    getContrastColor: B,
    generateColorVariants: S,
    // 预设主题
    presetThemes: F
  };
}
const Q = {
  "zh-CN": {
    name: "简体中文",
    weekdays: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
    weekdaysShort: ["日", "一", "二", "三", "四", "五", "六"],
    months: [
      "一月",
      "二月",
      "三月",
      "四月",
      "五月",
      "六月",
      "七月",
      "八月",
      "九月",
      "十月",
      "十一月",
      "十二月"
    ],
    monthsShort: [
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月"
    ],
    today: "今天",
    clear: "清除",
    confirm: "确认",
    cancel: "取消",
    prevYear: "上一年",
    nextYear: "下一年",
    prevMonth: "上个月",
    nextMonth: "下个月",
    yearFormat: "YYYY年",
    monthFormat: "M月",
    dateFormat: "YYYY-MM-DD"
  },
  "zh-TW": {
    name: "繁體中文",
    weekdays: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
    weekdaysShort: ["日", "一", "二", "三", "四", "五", "六"],
    months: [
      "一月",
      "二月",
      "三月",
      "四月",
      "五月",
      "六月",
      "七月",
      "八月",
      "九月",
      "十月",
      "十一月",
      "十二月"
    ],
    monthsShort: [
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月"
    ],
    today: "今天",
    clear: "清除",
    confirm: "確認",
    cancel: "取消",
    prevYear: "上一年",
    nextYear: "下一年",
    prevMonth: "上個月",
    nextMonth: "下個月",
    yearFormat: "YYYY年",
    monthFormat: "M月",
    dateFormat: "YYYY-MM-DD"
  },
  "en-US": {
    name: "English (US)",
    weekdays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ],
    monthsShort: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    today: "Today",
    clear: "Clear",
    confirm: "Confirm",
    cancel: "Cancel",
    prevYear: "Previous Year",
    nextYear: "Next Year",
    prevMonth: "Previous Month",
    nextMonth: "Next Month",
    yearFormat: "YYYY",
    monthFormat: "MMMM",
    dateFormat: "MM/DD/YYYY"
  },
  "en-GB": {
    name: "English (UK)",
    weekdays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ],
    monthsShort: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    today: "Today",
    clear: "Clear",
    confirm: "Confirm",
    cancel: "Cancel",
    prevYear: "Previous Year",
    nextYear: "Next Year",
    prevMonth: "Previous Month",
    nextMonth: "Next Month",
    yearFormat: "YYYY",
    monthFormat: "MMMM",
    dateFormat: "DD/MM/YYYY"
  },
  "ja-JP": {
    name: "日本語",
    weekdays: ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"],
    weekdaysShort: ["日", "月", "火", "水", "木", "金", "土"],
    months: [
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月"
    ],
    monthsShort: [
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月"
    ],
    today: "今日",
    clear: "クリア",
    confirm: "確認",
    cancel: "キャンセル",
    prevYear: "前年",
    nextYear: "翌年",
    prevMonth: "前月",
    nextMonth: "翌月",
    yearFormat: "YYYY年",
    monthFormat: "M月",
    dateFormat: "YYYY/MM/DD"
  },
  "ko-KR": {
    name: "한국어",
    weekdays: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
    weekdaysShort: ["일", "월", "화", "수", "목", "금", "토"],
    months: [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월"
    ],
    monthsShort: [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월"
    ],
    today: "오늘",
    clear: "지우기",
    confirm: "확인",
    cancel: "취소",
    prevYear: "이전 년도",
    nextYear: "다음 년도",
    prevMonth: "이전 달",
    nextMonth: "다음 달",
    yearFormat: "YYYY년",
    monthFormat: "M월",
    dateFormat: "YYYY-MM-DD"
  }
}, qe = {
  "zh-CN": {
    lunar: "农历",
    solar: "公历",
    zodiac: "生肖",
    ganZhi: "干支",
    solarTerm: "节气",
    festival: "节日",
    leap: "闰",
    month: "月",
    day: "日"
  },
  "zh-TW": {
    lunar: "農曆",
    solar: "公曆",
    zodiac: "生肖",
    ganZhi: "干支",
    solarTerm: "節氣",
    festival: "節日",
    leap: "閏",
    month: "月",
    day: "日"
  },
  "en-US": {
    lunar: "Lunar",
    solar: "Solar",
    zodiac: "Zodiac",
    ganZhi: "Gan Zhi",
    solarTerm: "Solar Term",
    festival: "Festival",
    leap: "Leap",
    month: "Month",
    day: "Day"
  },
  "en-GB": {
    lunar: "Lunar",
    solar: "Solar",
    zodiac: "Zodiac",
    ganZhi: "Gan Zhi",
    solarTerm: "Solar Term",
    festival: "Festival",
    leap: "Leap",
    month: "Month",
    day: "Day"
  },
  "ja-JP": {
    lunar: "旧暦",
    solar: "新暦",
    zodiac: "十二支",
    ganZhi: "干支",
    solarTerm: "二十四節気",
    festival: "祭日",
    leap: "閏",
    month: "月",
    day: "日"
  },
  "ko-KR": {
    lunar: "음력",
    solar: "양력",
    zodiac: "띠",
    ganZhi: "간지",
    solarTerm: "절기",
    festival: "명절",
    leap: "윤",
    month: "월",
    day: "일"
  }
};
function Wt(a) {
  const l = (a == null ? void 0 : a.locale) || "zh-CN", e = L(l), o = L({}), s = () => {
    if (typeof navigator < "u") {
      const t = navigator.language || navigator.userLanguage;
      if (Q[t])
        return t;
      const m = t.split("-")[0];
      return Object.keys(Q).find(
        (i) => i.startsWith(m)
      ) || "zh-CN";
    }
    return "zh-CN";
  }, r = j(() => {
    const t = o.value[e.value];
    return {
      ...Q[e.value] || Q["zh-CN"],
      ...t
    };
  }), g = j(() => {
    const t = { ...Q, ...o.value };
    return Object.keys(t).map((m) => ({
      code: m,
      name: t[m].name
    }));
  }), v = j(() => qe[e.value] || qe["zh-CN"]), d = j(() => {
    const t = (a == null ? void 0 : a.firstDayOfWeek) || 1, m = r.value.weekdaysShort;
    return t === 0 ? m : [...m.slice(1), m[0]];
  }), y = (t) => {
    Q[t] || o.value[t] ? (e.value = t, _(t)) : console.warn(`语言 ${t} 不存在`);
  }, M = (t, m) => {
    o.value[t] = m, H();
  }, D = (t, m) => {
    Q[t] ? o.value[t] = {
      ...Q[t],
      ...o.value[t],
      ...m
    } : o.value[t] && (o.value[t] = {
      ...o.value[t],
      ...m
    }), H();
  }, C = (t) => {
    o.value[t] && (delete o.value[t], H(), e.value === t && y("zh-CN"));
  }, I = (t, m) => {
    const $ = m || r.value.dateFormat, i = t.getFullYear(), h = t.getMonth() + 1, n = t.getDate();
    let c = $;
    return c = c.replace(/YYYY/g, i.toString()), c = c.replace(/YY/g, i.toString().slice(-2)), c = c.replace(/MMMM/g, r.value.months[h - 1] || ""), c = c.replace(/MMM/g, r.value.monthsShort[h - 1] || ""), c = c.replace(/MM/g, h.toString().padStart(2, "0")), c = c.replace(/M/g, h.toString()), c = c.replace(/DD/g, n.toString().padStart(2, "0")), c = c.replace(/D/g, n.toString()), c;
  }, B = (t) => (r.value.yearFormat || "YYYY").replace(/YYYY/g, t.toString()), S = (t) => r.value.monthFormat.replace(/MMMM/g, r.value.months[t - 1]).replace(/MMM/g, r.value.monthsShort[t - 1]).replace(/MM/g, t.toString().padStart(2, "0")).replace(/M/g, t.toString()), F = (t, m = !1) => (m ? r.value.weekdaysShort : r.value.weekdays)[t] || "", O = (t, m = !1) => (m ? r.value.monthsShort : r.value.months)[t - 1] || "", f = (t, m) => {
    const $ = t.split(".");
    let i = r.value;
    for (const n of $)
      if (i = i == null ? void 0 : i[n], i === void 0)
        break;
    if (typeof i == "string")
      return i;
    const h = v.value[t];
    return h || m || t;
  }, A = j(() => {
    const t = ["ar", "he", "fa", "ur"], $ = String(e.value || "zh-CN").split("-")[0];
    return t.includes($);
  }), _ = (t) => {
    typeof localStorage < "u" && localStorage.setItem("vue-calendar-locale", t);
  }, P = () => {
    if (typeof localStorage < "u") {
      const t = localStorage.getItem("vue-calendar-locale");
      if (t && (Q[t] || o.value[t]))
        return t;
    }
    return s();
  }, H = () => {
    typeof localStorage < "u" && localStorage.setItem("vue-calendar-custom-locales", JSON.stringify(o.value));
  }, k = () => {
    if (typeof localStorage < "u")
      try {
        const t = localStorage.getItem("vue-calendar-custom-locales");
        return t ? JSON.parse(t) : {};
      } catch (t) {
        return console.warn("加载自定义语言失败:", t), {};
      }
    return {};
  }, E = () => {
    o.value = k();
    const t = P();
    e.value = t;
  };
  return de(e, (t) => {
    typeof document < "u" && (document.documentElement.lang = t, document.documentElement.dir = A.value ? "rtl" : "ltr");
  }, { immediate: !0 }), E(), {
    // 状态
    currentLocale: e,
    customLocales: o,
    // 计算属性
    locale: r,
    availableLocales: g,
    lunarTexts: v,
    weekdaysDisplay: d,
    isRTL: A,
    // 方法
    setLocale: y,
    addCustomLocale: M,
    updateLocale: D,
    removeCustomLocale: C,
    // 格式化方法
    formatDate: I,
    formatYear: B,
    formatMonth: S,
    getWeekdayName: F,
    getMonthName: O,
    // 翻译方法
    t: f,
    // 工具方法
    detectBrowserLocale: s
  };
}
function Ut() {
  const a = L(null), l = L(!1), e = L([]), o = (t, m, $) => {
    if (!a.value) {
      a.value = /* @__PURE__ */ new Date(), l.value = !0;
      return;
    }
    const i = m.findIndex(
      (c) => F(c.date, a.value)
    );
    if (i === -1)
      return;
    let h = i, n = !0;
    switch (t.key) {
      case "ArrowLeft":
        h = Math.max(0, i - 1);
        break;
      case "ArrowRight":
        h = Math.min(m.length - 1, i + 1);
        break;
      case "ArrowUp":
        h = Math.max(0, i - 7);
        break;
      case "ArrowDown":
        h = Math.min(m.length - 1, i + 7);
        break;
      case "Home":
        h = Math.floor(i / 7) * 7;
        break;
      case "End":
        const p = Math.floor(i / 7);
        h = Math.min(m.length - 1, (p + 1) * 7 - 1);
        break;
      case "PageUp":
        if (t.shiftKey) {
          const b = new Date(a.value);
          b.setFullYear(b.getFullYear() - 1), a.value = b, D(`移动到 ${S(b)}`);
          return;
        } else {
          const b = new Date(a.value);
          b.setMonth(b.getMonth() - 1), a.value = b, D(`移动到 ${S(b)}`);
          return;
        }
      case "PageDown":
        if (t.shiftKey) {
          const b = new Date(a.value);
          b.setFullYear(b.getFullYear() + 1), a.value = b, D(`移动到 ${S(b)}`);
          return;
        } else {
          const b = new Date(a.value);
          b.setMonth(b.getMonth() + 1), a.value = b, D(`移动到 ${S(b)}`);
          return;
        }
      case "Enter":
      case " ":
        $(a.value), D(`选择了 ${S(a.value)}`);
        break;
      case "Escape":
        a.value = null, l.value = !1, D("退出日期选择");
        break;
      default:
        n = !1;
    }
    n && (t.preventDefault(), l.value = !0, h !== i && m[h] && (a.value = new Date(m[h].date), D(`焦点移动到 ${S(a.value)}`)));
  }, s = (t) => {
    l.value || (a.value = new Date(t));
  }, r = () => {
    l.value || (a.value = null);
  }, g = (t) => {
    a.value = new Date(t), l.value = !1;
  }, v = (t) => {
    const m = [];
    return m.push(S(t.date)), t.lunar.monthName && t.lunar.dayName && m.push(`农历${t.lunar.monthName}${t.lunar.dayName}`), t.isToday && m.push("今天"), t.isSelected && m.push("已选择"), t.isWeekend && m.push("周末"), t.isHoliday && m.push("节假日"), t.festival && m.push(`节日：${t.festival}`), t.solarTerm && m.push(`节气：${t.solarTerm}`), t.isDisabled && m.push("不可选择"), m.join("，");
  }, d = () => ({
    role: "grid",
    "aria-label": "日历",
    "aria-readonly": "false",
    "aria-multiselectable": "false"
    // 根据选择模式动态设置
  }), y = (t) => {
    const m = a.value && F(t.date, a.value);
    return {
      role: "gridcell",
      "aria-label": v(t),
      "aria-selected": t.isSelected ? "true" : "false",
      "aria-disabled": t.isDisabled ? "true" : "false",
      "aria-current": t.isToday ? "date" : void 0,
      tabindex: m ? 0 : -1,
      "data-date": t.date.toISOString().split("T")[0]
    };
  }, M = (t) => ({
    "aria-label": {
      prevYear: "上一年",
      nextYear: "下一年",
      prevMonth: "上个月",
      nextMonth: "下个月",
      today: "回到今天"
    }[t],
    type: "button"
  }), D = (t) => {
    e.value.push(t), setTimeout(() => {
      const m = e.value.indexOf(t);
      m > -1 && e.value.splice(m, 1);
    }, 1e3);
  }, C = (t, m) => {
    D(`切换到 ${t}年${m}月`);
  }, I = (t) => {
    t.length === 0 ? D("清除了所有选择") : t.length === 1 ? D(`选择了 ${S(t[0])}`) : D(`选择了 ${t.length} 个日期`);
  }, B = (t, m) => {
    const $ = S(t), i = S(m);
    D(`选择了日期范围：从 ${$} 到 ${i}`);
  }, S = (t) => {
    const m = t.getFullYear(), $ = t.getMonth() + 1, i = t.getDate(), n = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"][t.getDay()];
    return `${m}年${$}月${i}日 ${n}`;
  }, F = (t, m) => t.getFullYear() === m.getFullYear() && t.getMonth() === m.getMonth() && t.getDate() === m.getDate(), O = (t) => {
    a.value = new Date(t), l.value = !0, setTimeout(() => {
      const m = t.toISOString().split("T")[0], $ = document.querySelector(`[data-date="${m}"]`);
      $ && $.focus();
    }, 0);
  }, f = () => {
    a.value = null, l.value = !1;
  }, A = L(!1), _ = () => {
    if (typeof window < "u" && window.matchMedia) {
      const t = window.matchMedia("(prefers-contrast: high)");
      A.value = t.matches;
      const m = ($) => {
        A.value = $.matches;
      };
      return t.addEventListener("change", m), () => t.removeEventListener("change", m);
    }
    return () => {
    };
  }, P = L(!1), H = () => {
    if (typeof window < "u" && window.matchMedia) {
      const t = window.matchMedia("(prefers-reduced-motion: reduce)");
      P.value = t.matches;
      const m = ($) => {
        P.value = $.matches;
      };
      return t.addEventListener("change", m), () => t.removeEventListener("change", m);
    }
    return () => {
    };
  };
  let k, E;
  return Me(() => {
    k = _(), E = H();
  }), la(() => {
    k == null || k(), E == null || E();
  }), {
    // 状态
    focusedDate: a,
    isKeyboardNavigation: l,
    announcements: e,
    isHighContrast: A,
    prefersReducedMotion: P,
    // 键盘导航
    handleKeyDown: o,
    // 鼠标交互
    handleMouseEnter: s,
    handleMouseLeave: r,
    handleClick: g,
    // ARIA属性生成
    getDateAriaLabel: v,
    getCalendarGridProps: d,
    getDateCellProps: y,
    getNavigationButtonProps: M,
    // 屏幕阅读器公告
    announce: D,
    announceMonthChange: C,
    announceSelectionChange: I,
    announceRangeSelection: B,
    // 焦点管理
    focusDate: O,
    clearFocus: f,
    // 工具方法
    formatDateForAnnouncement: S,
    isSameDay: F
  };
}
const At = (a) => {
  a.component("VueLunarCalendar", Ne);
}, Gt = {
  install: At,
  VueLunarCalendar: Ne
}, Qt = "2.0.0";
export {
  Sa as CalendarCell,
  Ia as EventItem,
  Pt as IconComponent,
  Ne as VueLunarCalendar,
  Gt as default,
  At as install,
  Ut as useAccessibility,
  Jt as useCalendar,
  Vt as useEvents,
  Wt as useLocale,
  Kt as useTheme,
  Qt as version
};
