!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define(t)
    : ((e =
        "undefined" != typeof globalThis ? globalThis : e || self).firebase =
        t());
})(this, function () {
  "use strict";
  const r = function (t) {
      const r = [];
      let n = 0;
      for (let a = 0; a < t.length; a++) {
        let e = t.charCodeAt(a);
        e < 128
          ? (r[n++] = e)
          : (e < 2048
              ? (r[n++] = (e >> 6) | 192)
              : (55296 == (64512 & e) &&
                a + 1 < t.length &&
                56320 == (64512 & t.charCodeAt(a + 1))
                  ? ((e =
                      65536 + ((1023 & e) << 10) + (1023 & t.charCodeAt(++a))),
                    (r[n++] = (e >> 18) | 240),
                    (r[n++] = ((e >> 12) & 63) | 128))
                  : (r[n++] = (e >> 12) | 224),
                (r[n++] = ((e >> 6) & 63) | 128)),
            (r[n++] = (63 & e) | 128));
      }
      return r;
    },
    n = {
      byteToCharMap_: null,
      charToByteMap_: null,
      byteToCharMapWebSafe_: null,
      charToByteMapWebSafe_: null,
      ENCODED_VALS_BASE:
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
      get ENCODED_VALS() {
        return this.ENCODED_VALS_BASE + "+/=";
      },
      get ENCODED_VALS_WEBSAFE() {
        return this.ENCODED_VALS_BASE + "-_.";
      },
      HAS_NATIVE_SUPPORT: "function" == typeof atob,
      encodeByteArray(r, e) {
        if (!Array.isArray(r))
          throw Error("encodeByteArray takes an array as a parameter");
        this.init_();
        var n = e ? this.byteToCharMapWebSafe_ : this.byteToCharMap_;
        const a = [];
        for (let l = 0; l < r.length; l += 3) {
          var i = r[l],
            s = l + 1 < r.length,
            o = s ? r[l + 1] : 0,
            c = l + 2 < r.length,
            h = c ? r[l + 2] : 0;
          let e = ((15 & o) << 2) | (h >> 6),
            t = 63 & h;
          c || ((t = 64), s || (e = 64)),
            a.push(n[i >> 2], n[((3 & i) << 4) | (o >> 4)], n[e], n[t]);
        }
        return a.join("");
      },
      encodeString(e, t) {
        return this.HAS_NATIVE_SUPPORT && !t
          ? btoa(e)
          : this.encodeByteArray(r(e), t);
      },
      decodeString(e, t) {
        return this.HAS_NATIVE_SUPPORT && !t
          ? atob(e)
          : (function (e) {
              const t = [];
              let r = 0,
                n = 0;
              for (; r < e.length; ) {
                var a,
                  i,
                  s = e[r++];
                s < 128
                  ? (t[n++] = String.fromCharCode(s))
                  : 191 < s && s < 224
                  ? ((a = e[r++]),
                    (t[n++] = String.fromCharCode(((31 & s) << 6) | (63 & a))))
                  : 239 < s && s < 365
                  ? ((i =
                      (((7 & s) << 18) |
                        ((63 & e[r++]) << 12) |
                        ((63 & e[r++]) << 6) |
                        (63 & e[r++])) -
                      65536),
                    (t[n++] = String.fromCharCode(55296 + (i >> 10))),
                    (t[n++] = String.fromCharCode(56320 + (1023 & i))))
                  : ((a = e[r++]),
                    (i = e[r++]),
                    (t[n++] = String.fromCharCode(
                      ((15 & s) << 12) | ((63 & a) << 6) | (63 & i)
                    )));
              }
              return t.join("");
            })(this.decodeStringToByteArray(e, t));
      },
      decodeStringToByteArray(e, t) {
        this.init_();
        var r = t ? this.charToByteMapWebSafe_ : this.charToByteMap_;
        const n = [];
        for (let c = 0; c < e.length; ) {
          var a = r[e.charAt(c++)],
            i = c < e.length ? r[e.charAt(c)] : 0;
          ++c;
          var s = c < e.length ? r[e.charAt(c)] : 64;
          ++c;
          var o = c < e.length ? r[e.charAt(c)] : 64;
          if ((++c, null == a || null == i || null == s || null == o))
            throw Error();
          n.push((a << 2) | (i >> 4)),
            64 !== s &&
              (n.push(((i << 4) & 240) | (s >> 2)),
              64 !== o && n.push(((s << 6) & 192) | o));
        }
        return n;
      },
      init_() {
        if (!this.byteToCharMap_) {
          (this.byteToCharMap_ = {}),
            (this.charToByteMap_ = {}),
            (this.byteToCharMapWebSafe_ = {}),
            (this.charToByteMapWebSafe_ = {});
          for (let e = 0; e < this.ENCODED_VALS.length; e++)
            (this.byteToCharMap_[e] = this.ENCODED_VALS.charAt(e)),
              (this.charToByteMap_[this.byteToCharMap_[e]] = e),
              (this.byteToCharMapWebSafe_[e] =
                this.ENCODED_VALS_WEBSAFE.charAt(e)),
              (this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]] = e),
              e >= this.ENCODED_VALS_BASE.length &&
                ((this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)] = e),
                (this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)] = e));
        }
      },
    },
    a = function (e) {
      return (e = e), (t = r(e)), n.encodeByteArray(t, !0).replace(/\./g, "");
      var t;
    };
  function c(e, t) {
    if (!(t instanceof Object)) return t;
    switch (t.constructor) {
      case Date:
        const r = t;
        return new Date(r.getTime());
      case Object:
        void 0 === e && (e = {});
        break;
      case Array:
        e = [];
        break;
      default:
        return t;
    }
    for (const n in t)
      t.hasOwnProperty(n) && "__proto__" !== n && (e[n] = c(e[n], t[n]));
    return e;
  }
  const e = () =>
      (function () {
        if ("undefined" != typeof self) return self;
        if ("undefined" != typeof window) return window;
        if ("undefined" != typeof global) return global;
        throw new Error("Unable to locate global object.");
      })().__FIREBASE_DEFAULTS__,
    t = () => {
      if ("undefined" != typeof document) {
        let e;
        try {
          e = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/);
        } catch (e) {
          return;
        }
        var t =
          e &&
          (function (e) {
            try {
              return n.decodeString(e, !0);
            } catch (e) {
              console.error("base64Decode failed: ", e);
            }
            return null;
          })(e[1]);
        return t && JSON.parse(t);
      }
    },
    i = () => {
      try {
        return (
          e() ||
          (() => {
            if ("undefined" != typeof process && void 0 !== process.env) {
              var e = process.env.__FIREBASE_DEFAULTS__;
              return e ? JSON.parse(e) : void 0;
            }
          })() ||
          t()
        );
      } catch (e) {
        return void console.info(
          `Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`
        );
      }
    },
    h = () => {
      var e;
      return null === (e = i()) || void 0 === e ? void 0 : e.config;
    };
  class s {
    constructor() {
      (this.reject = () => {}),
        (this.resolve = () => {}),
        (this.promise = new Promise((e, t) => {
          (this.resolve = e), (this.reject = t);
        }));
    }
    wrapCallback(r) {
      return (e, t) => {
        e ? this.reject(e) : this.resolve(t),
          "function" == typeof r &&
            (this.promise.catch(() => {}), 1 === r.length ? r(e) : r(e, t));
      };
    }
  }
  class o extends Error {
    constructor(e, t, r) {
      super(t),
        (this.code = e),
        (this.customData = r),
        (this.name = "FirebaseError"),
        Object.setPrototypeOf(this, o.prototype),
        Error.captureStackTrace &&
          Error.captureStackTrace(this, l.prototype.create);
    }
  }
  class l {
    constructor(e, t, r) {
      (this.service = e), (this.serviceName = t), (this.errors = r);
    }
    create(e, ...t) {
      var n,
        r = t[0] || {},
        a = `${this.service}/${e}`,
        i = this.errors[e],
        i = i
          ? ((n = r),
            i.replace(d, (e, t) => {
              var r = n[t];
              return null != r ? String(r) : `<${t}?>`;
            }))
          : "Error",
        i = `${this.serviceName}: ${i} (${a}).`;
      return new o(a, i, r);
    }
  }
  const d = /\{\$([^}]+)}/g;
  function p(e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }
  function u(e, t) {
    if (e === t) return 1;
    const r = Object.keys(e),
      n = Object.keys(t);
    for (const s of r) {
      if (!n.includes(s)) return;
      var a = e[s],
        i = t[s];
      if (f(a) && f(i)) {
        if (!u(a, i)) return;
      } else if (a !== i) return;
    }
    for (const o of n) if (!r.includes(o)) return;
    return 1;
  }
  function f(e) {
    return null !== e && "object" == typeof e;
  }
  function g(e, t) {
    const r = new m(e, t);
    return r.subscribe.bind(r);
  }
  class m {
    constructor(e, t) {
      (this.observers = []),
        (this.unsubscribes = []),
        (this.observerCount = 0),
        (this.task = Promise.resolve()),
        (this.finalized = !1),
        (this.onNoObservers = t),
        this.task
          .then(() => {
            e(this);
          })
          .catch((e) => {
            this.error(e);
          });
    }
    next(t) {
      this.forEachObserver((e) => {
        e.next(t);
      });
    }
    error(t) {
      this.forEachObserver((e) => {
        e.error(t);
      }),
        this.close(t);
    }
    complete() {
      this.forEachObserver((e) => {
        e.complete();
      }),
        this.close();
    }
    subscribe(e, t, r) {
      let n;
      if (void 0 === e && void 0 === t && void 0 === r)
        throw new Error("Missing Observer.");
      (n = (function (e, t) {
        if ("object" != typeof e || null === e) return !1;
        for (const r of t) if (r in e && "function" == typeof e[r]) return !0;
        return !1;
      })(e, ["next", "error", "complete"])
        ? e
        : { next: e, error: t, complete: r }),
        void 0 === n.next && (n.next = b),
        void 0 === n.error && (n.error = b),
        void 0 === n.complete && (n.complete = b);
      var a = this.unsubscribeOne.bind(this, this.observers.length);
      return (
        this.finalized &&
          this.task.then(() => {
            try {
              this.finalError ? n.error(this.finalError) : n.complete();
            } catch (e) {}
          }),
        this.observers.push(n),
        a
      );
    }
    unsubscribeOne(e) {
      void 0 !== this.observers &&
        void 0 !== this.observers[e] &&
        (delete this.observers[e],
        --this.observerCount,
        0 === this.observerCount &&
          void 0 !== this.onNoObservers &&
          this.onNoObservers(this));
    }
    forEachObserver(t) {
      if (!this.finalized)
        for (let e = 0; e < this.observers.length; e++) this.sendOne(e, t);
    }
    sendOne(e, t) {
      this.task.then(() => {
        if (void 0 !== this.observers && void 0 !== this.observers[e])
          try {
            t(this.observers[e]);
          } catch (e) {
            "undefined" != typeof console && console.error && console.error(e);
          }
      });
    }
    close(e) {
      this.finalized ||
        ((this.finalized = !0),
        void 0 !== e && (this.finalError = e),
        this.task.then(() => {
          (this.observers = void 0), (this.onNoObservers = void 0);
        }));
    }
  }
  function b() {}
  class v {
    constructor(e, t, r) {
      (this.name = e),
        (this.instanceFactory = t),
        (this.type = r),
        (this.multipleInstances = !1),
        (this.serviceProps = {}),
        (this.instantiationMode = "LAZY"),
        (this.onInstanceCreated = null);
    }
    setInstantiationMode(e) {
      return (this.instantiationMode = e), this;
    }
    setMultipleInstances(e) {
      return (this.multipleInstances = e), this;
    }
    setServiceProps(e) {
      return (this.serviceProps = e), this;
    }
    setInstanceCreatedCallback(e) {
      return (this.onInstanceCreated = e), this;
    }
  }
  const _ = "[DEFAULT]";
  class E {
    constructor(e, t) {
      (this.name = e),
        (this.container = t),
        (this.component = null),
        (this.instances = new Map()),
        (this.instancesDeferred = new Map()),
        (this.instancesOptions = new Map()),
        (this.onInitCallbacks = new Map());
    }
    get(e) {
      var t = this.normalizeInstanceIdentifier(e);
      if (!this.instancesDeferred.has(t)) {
        const n = new s();
        if (
          (this.instancesDeferred.set(t, n),
          this.isInitialized(t) || this.shouldAutoInitialize())
        )
          try {
            var r = this.getOrInitializeService({ instanceIdentifier: t });
            r && n.resolve(r);
          } catch (e) {}
      }
      return this.instancesDeferred.get(t).promise;
    }
    getImmediate(e) {
      var t = this.normalizeInstanceIdentifier(
          null == e ? void 0 : e.identifier
        ),
        r = null !== (r = null == e ? void 0 : e.optional) && void 0 !== r && r;
      if (!this.isInitialized(t) && !this.shouldAutoInitialize()) {
        if (r) return null;
        throw Error(`Service ${this.name} is not available`);
      }
      try {
        return this.getOrInitializeService({ instanceIdentifier: t });
      } catch (e) {
        if (r) return null;
        throw e;
      }
    }
    getComponent() {
      return this.component;
    }
    setComponent(e) {
      if (e.name !== this.name)
        throw Error(
          `Mismatching Component ${e.name} for Provider ${this.name}.`
        );
      if (this.component)
        throw Error(`Component for ${this.name} has already been provided`);
      if (((this.component = e), this.shouldAutoInitialize())) {
        if ("EAGER" === e.instantiationMode)
          try {
            this.getOrInitializeService({ instanceIdentifier: _ });
          } catch (e) {}
        for (var [t, r] of this.instancesDeferred.entries()) {
          t = this.normalizeInstanceIdentifier(t);
          try {
            var n = this.getOrInitializeService({ instanceIdentifier: t });
            r.resolve(n);
          } catch (e) {}
        }
      }
    }
    clearInstance(e = _) {
      this.instancesDeferred.delete(e),
        this.instancesOptions.delete(e),
        this.instances.delete(e);
    }
    async delete() {
      const e = Array.from(this.instances.values());
      await Promise.all([
        ...e.filter((e) => "INTERNAL" in e).map((e) => e.INTERNAL.delete()),
        ...e.filter((e) => "_delete" in e).map((e) => e._delete()),
      ]);
    }
    isComponentSet() {
      return null != this.component;
    }
    isInitialized(e = _) {
      return this.instances.has(e);
    }
    getOptions(e = _) {
      return this.instancesOptions.get(e) || {};
    }
    initialize(e = {}) {
      var { options: t = {} } = e,
        r = this.normalizeInstanceIdentifier(e.instanceIdentifier);
      if (this.isInitialized(r))
        throw Error(`${this.name}(${r}) has already been initialized`);
      if (!this.isComponentSet())
        throw Error(`Component ${this.name} has not been registered yet`);
      var n,
        a,
        i = this.getOrInitializeService({ instanceIdentifier: r, options: t });
      for ([n, a] of this.instancesDeferred.entries())
        r === this.normalizeInstanceIdentifier(n) && a.resolve(i);
      return i;
    }
    onInit(e, t) {
      var r = this.normalizeInstanceIdentifier(t);
      const n =
        null !== (a = this.onInitCallbacks.get(r)) && void 0 !== a
          ? a
          : new Set();
      n.add(e), this.onInitCallbacks.set(r, n);
      var a = this.instances.get(r);
      return (
        a && e(a, r),
        () => {
          n.delete(e);
        }
      );
    }
    invokeOnInitCallbacks(e, t) {
      var r = this.onInitCallbacks.get(t);
      if (r)
        for (const n of r)
          try {
            n(e, t);
          } catch (e) {}
    }
    getOrInitializeService({ instanceIdentifier: e, options: t = {} }) {
      let r = this.instances.get(e);
      if (
        !r &&
        this.component &&
        ((r = this.component.instanceFactory(this.container, {
          instanceIdentifier: (n = e) === _ ? void 0 : n,
          options: t,
        })),
        this.instances.set(e, r),
        this.instancesOptions.set(e, t),
        this.invokeOnInitCallbacks(r, e),
        this.component.onInstanceCreated)
      )
        try {
          this.component.onInstanceCreated(this.container, e, r);
        } catch (e) {}
      var n;
      return r || null;
    }
    normalizeInstanceIdentifier(e = _) {
      return !this.component || this.component.multipleInstances ? e : _;
    }
    shouldAutoInitialize() {
      return (
        !!this.component && "EXPLICIT" !== this.component.instantiationMode
      );
    }
  }
  class y {
    constructor(e) {
      (this.name = e), (this.providers = new Map());
    }
    addComponent(e) {
      const t = this.getProvider(e.name);
      if (t.isComponentSet())
        throw new Error(
          `Component ${e.name} has already been registered with ${this.name}`
        );
      t.setComponent(e);
    }
    addOrOverwriteComponent(e) {
      const t = this.getProvider(e.name);
      t.isComponentSet() && this.providers.delete(e.name), this.addComponent(e);
    }
    getProvider(e) {
      if (this.providers.has(e)) return this.providers.get(e);
      var t = new E(e, this);
      return this.providers.set(e, t), t;
    }
    getProviders() {
      return Array.from(this.providers.values());
    }
  }
  const I = [];
  var w, C, D;
  ((C = w = w || {})[(C.DEBUG = 0)] = "DEBUG"),
    (C[(C.VERBOSE = 1)] = "VERBOSE"),
    (C[(C.INFO = 2)] = "INFO"),
    (C[(C.WARN = 3)] = "WARN"),
    (C[(C.ERROR = 4)] = "ERROR"),
    (C[(C.SILENT = 5)] = "SILENT");
  const S = {
      debug: w.DEBUG,
      verbose: w.VERBOSE,
      info: w.INFO,
      warn: w.WARN,
      error: w.ERROR,
      silent: w.SILENT,
    },
    A = w.INFO,
    O = {
      [w.DEBUG]: "log",
      [w.VERBOSE]: "log",
      [w.INFO]: "info",
      [w.WARN]: "warn",
      [w.ERROR]: "error",
    },
    L = (e, t, ...r) => {
      if (!(t < e.logLevel)) {
        var n = new Date().toISOString(),
          a = O[t];
        if (!a)
          throw new Error(
            `Attempted to log a message with an invalid logType (value: ${t})`
          );
        console[a](`[${n}]  ${e.name}:`, ...r);
      }
    };
  class N {
    constructor(e) {
      (this.name = e),
        (this._logLevel = A),
        (this._logHandler = L),
        (this._userLogHandler = null),
        I.push(this);
    }
    get logLevel() {
      return this._logLevel;
    }
    set logLevel(e) {
      if (!(e in w))
        throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);
      this._logLevel = e;
    }
    setLogLevel(e) {
      this._logLevel = "string" == typeof e ? S[e] : e;
    }
    get logHandler() {
      return this._logHandler;
    }
    set logHandler(e) {
      if ("function" != typeof e)
        throw new TypeError(
          "Value assigned to `logHandler` must be a function"
        );
      this._logHandler = e;
    }
    get userLogHandler() {
      return this._userLogHandler;
    }
    set userLogHandler(e) {
      this._userLogHandler = e;
    }
    debug(...e) {
      this._userLogHandler && this._userLogHandler(this, w.DEBUG, ...e),
        this._logHandler(this, w.DEBUG, ...e);
    }
    log(...e) {
      this._userLogHandler && this._userLogHandler(this, w.VERBOSE, ...e),
        this._logHandler(this, w.VERBOSE, ...e);
    }
    info(...e) {
      this._userLogHandler && this._userLogHandler(this, w.INFO, ...e),
        this._logHandler(this, w.INFO, ...e);
    }
    warn(...e) {
      this._userLogHandler && this._userLogHandler(this, w.WARN, ...e),
        this._logHandler(this, w.WARN, ...e);
    }
    error(...e) {
      this._userLogHandler && this._userLogHandler(this, w.ERROR, ...e),
        this._logHandler(this, w.ERROR, ...e);
    }
  }
  const B = (t, e) => e.some((e) => t instanceof e);
  let T, P;
  const M = new WeakMap(),
    R = new WeakMap(),
    k = new WeakMap(),
    F = new WeakMap(),
    $ = new WeakMap();
  let j = {
    get(e, t, r) {
      if (e instanceof IDBTransaction) {
        if ("done" === t) return R.get(e);
        if ("objectStoreNames" === t) return e.objectStoreNames || k.get(e);
        if ("store" === t)
          return r.objectStoreNames[1]
            ? void 0
            : r.objectStore(r.objectStoreNames[0]);
      }
      return z(e[t]);
    },
    set(e, t, r) {
      return (e[t] = r), !0;
    },
    has(e, t) {
      return (
        (e instanceof IDBTransaction && ("done" === t || "store" === t)) ||
        t in e
      );
    },
  };
  function H(n) {
    return n !== IDBDatabase.prototype.transaction ||
      "objectStoreNames" in IDBTransaction.prototype
      ? (P = P || [
          IDBCursor.prototype.advance,
          IDBCursor.prototype.continue,
          IDBCursor.prototype.continuePrimaryKey,
        ]).includes(n)
        ? function (...e) {
            return n.apply(V(this), e), z(M.get(this));
          }
        : function (...e) {
            return z(n.apply(V(this), e));
          }
      : function (e, ...t) {
          var r = n.call(V(this), e, ...t);
          return k.set(r, e.sort ? e.sort() : [e]), z(r);
        };
  }
  function x(e) {
    return "function" == typeof e
      ? H(e)
      : (e instanceof IDBTransaction &&
          ((i = e),
          R.has(i) ||
            ((t = new Promise((e, t) => {
              const r = () => {
                  i.removeEventListener("complete", n),
                    i.removeEventListener("error", a),
                    i.removeEventListener("abort", a);
                },
                n = () => {
                  e(), r();
                },
                a = () => {
                  t(i.error || new DOMException("AbortError", "AbortError")),
                    r();
                };
              i.addEventListener("complete", n),
                i.addEventListener("error", a),
                i.addEventListener("abort", a);
            })),
            R.set(i, t))),
        B(
          e,
          (T = T || [
            IDBDatabase,
            IDBObjectStore,
            IDBIndex,
            IDBCursor,
            IDBTransaction,
          ])
        )
          ? new Proxy(e, j)
          : e);
    var i, t;
  }
  function z(e) {
    if (e instanceof IDBRequest)
      return (function (i) {
        const e = new Promise((e, t) => {
          const r = () => {
              i.removeEventListener("success", n),
                i.removeEventListener("error", a);
            },
            n = () => {
              e(z(i.result)), r();
            },
            a = () => {
              t(i.error), r();
            };
          i.addEventListener("success", n), i.addEventListener("error", a);
        });
        return (
          e
            .then((e) => {
              e instanceof IDBCursor && M.set(e, i);
            })
            .catch(() => {}),
          $.set(e, i),
          e
        );
      })(e);
    if (F.has(e)) return F.get(e);
    var t = x(e);
    return t !== e && (F.set(e, t), $.set(t, e)), t;
  }
  const V = (e) => $.get(e);
  const U = ["get", "getKey", "getAll", "getAllKeys", "count"],
    W = ["put", "add", "delete", "clear"],
    G = new Map();
  function J(e, t) {
    if (e instanceof IDBDatabase && !(t in e) && "string" == typeof t) {
      if (G.get(t)) return G.get(t);
      const a = t.replace(/FromIndex$/, ""),
        i = t !== a,
        s = W.includes(a);
      if (
        a in (i ? IDBIndex : IDBObjectStore).prototype &&
        (s || U.includes(a))
      ) {
        var r = async function (e, ...t) {
          var r = this.transaction(e, s ? "readwrite" : "readonly");
          let n = r.store;
          return (
            i && (n = n.index(t.shift())),
            (await Promise.all([n[a](...t), s && r.done]))[0]
          );
        };
        return G.set(t, r), r;
      }
    }
  }
  j = {
    ...(D = j),
    get: (e, t, r) => J(e, t) || D.get(e, t, r),
    has: (e, t) => !!J(e, t) || D.has(e, t),
  };
  class K {
    constructor(e) {
      this.container = e;
    }
    getPlatformInfoString() {
      const e = this.container.getProviders();
      return e
        .map((e) => {
          if ("VERSION" !== (null == (t = e.getComponent()) ? void 0 : t.type))
            return null;
          var t,
            t = e.getImmediate();
          return `${t.library}/${t.version}`;
        })
        .filter((e) => e)
        .join(" ");
    }
  }
  const Y = "@firebase/app",
    X = new N("@firebase/app");
  var q;
  const Z = "[DEFAULT]",
    Q = {
      "@firebase/app": "fire-core",
      "@firebase/app-compat": "fire-core-compat",
      "@firebase/analytics": "fire-analytics",
      "@firebase/analytics-compat": "fire-analytics-compat",
      "@firebase/app-check": "fire-app-check",
      "@firebase/app-check-compat": "fire-app-check-compat",
      "@firebase/auth": "fire-auth",
      "@firebase/auth-compat": "fire-auth-compat",
      "@firebase/database": "fire-rtdb",
      "@firebase/database-compat": "fire-rtdb-compat",
      "@firebase/functions": "fire-fn",
      "@firebase/functions-compat": "fire-fn-compat",
      "@firebase/installations": "fire-iid",
      "@firebase/installations-compat": "fire-iid-compat",
      "@firebase/messaging": "fire-fcm",
      "@firebase/messaging-compat": "fire-fcm-compat",
      "@firebase/performance": "fire-perf",
      "@firebase/performance-compat": "fire-perf-compat",
      "@firebase/remote-config": "fire-rc",
      "@firebase/remote-config-compat": "fire-rc-compat",
      "@firebase/storage": "fire-gcs",
      "@firebase/storage-compat": "fire-gcs-compat",
      "@firebase/firestore": "fire-fst",
      "@firebase/firestore-compat": "fire-fst-compat",
      "fire-js": "fire-js",
      firebase: "fire-js-all",
    },
    ee = new Map(),
    te = new Map();
  function re(t, r) {
    try {
      t.container.addComponent(r);
    } catch (e) {
      X.debug(
        `Component ${r.name} failed to register with FirebaseApp ${t.name}`,
        e
      );
    }
  }
  function ne(e, t) {
    e.container.addOrOverwriteComponent(t);
  }
  function ae(e) {
    var t = e.name;
    if (te.has(t))
      return (
        X.debug(`There were multiple attempts to register component ${t}.`), !1
      );
    te.set(t, e);
    for (const r of ee.values()) re(r, e);
    return !0;
  }
  function ie(e, t) {
    const r = e.container
      .getProvider("heartbeat")
      .getImmediate({ optional: !0 });
    return r && r.triggerHeartbeat(), e.container.getProvider(t);
  }
  const se = new l("app", "Firebase", {
    "no-app":
      "No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()",
    "bad-app-name": "Illegal App name: '{$appName}",
    "duplicate-app":
      "Firebase App named '{$appName}' already exists with different options or config",
    "app-deleted": "Firebase App named '{$appName}' already deleted",
    "no-options":
      "Need to provide options, when not being deployed to hosting via source.",
    "invalid-app-argument":
      "firebase.{$appName}() takes either no argument or a Firebase App instance.",
    "invalid-log-argument":
      "First argument to `onLog` must be null or a function.",
    "idb-open":
      "Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.",
    "idb-get":
      "Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.",
    "idb-set":
      "Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.",
    "idb-delete":
      "Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.",
  });
  class oe {
    constructor(e, t, r) {
      (this._isDeleted = !1),
        (this._options = Object.assign({}, e)),
        (this._config = Object.assign({}, t)),
        (this._name = t.name),
        (this._automaticDataCollectionEnabled =
          t.automaticDataCollectionEnabled),
        (this._container = r),
        this.container.addComponent(new v("app", () => this, "PUBLIC"));
    }
    get automaticDataCollectionEnabled() {
      return this.checkDestroyed(), this._automaticDataCollectionEnabled;
    }
    set automaticDataCollectionEnabled(e) {
      this.checkDestroyed(), (this._automaticDataCollectionEnabled = e);
    }
    get name() {
      return this.checkDestroyed(), this._name;
    }
    get options() {
      return this.checkDestroyed(), this._options;
    }
    get config() {
      return this.checkDestroyed(), this._config;
    }
    get container() {
      return this._container;
    }
    get isDeleted() {
      return this._isDeleted;
    }
    set isDeleted(e) {
      this._isDeleted = e;
    }
    checkDestroyed() {
      if (this.isDeleted)
        throw se.create("app-deleted", { appName: this._name });
    }
  }
  const ce = "9.14.0";
  function he(e, t = {}) {
    let r = e;
    if ("object" != typeof t) {
      const a = t;
      t = { name: a };
    }
    var n = Object.assign({ name: Z, automaticDataCollectionEnabled: !1 }, t);
    const a = n.name;
    if ("string" != typeof a || !a)
      throw se.create("bad-app-name", { appName: String(a) });
    if (((r = r || h()), !r)) throw se.create("no-options");
    var i = ee.get(a);
    if (i) {
      if (u(r, i.options) && u(n, i.config)) return i;
      throw se.create("duplicate-app", { appName: a });
    }
    const s = new y(a);
    for (const o of te.values()) s.addComponent(o);
    n = new oe(r, n, s);
    return ee.set(a, n), n;
  }
  async function le(e) {
    var t = e.name;
    ee.has(t) &&
      (ee.delete(t),
      await Promise.all(e.container.getProviders().map((e) => e.delete())),
      (e.isDeleted = !0));
  }
  function de(e, t, r) {
    let n = null !== (i = Q[e]) && void 0 !== i ? i : e;
    r && (n += `-${r}`);
    var a = n.match(/\s|\//),
      i = t.match(/\s|\//);
    if (a || i) {
      const s = [`Unable to register library "${n}" with version "${t}":`];
      return (
        a &&
          s.push(
            `library name "${n}" contains illegal characters (whitespace or "/")`
          ),
        a && i && s.push("and"),
        i &&
          s.push(
            `version name "${t}" contains illegal characters (whitespace or "/")`
          ),
        void X.warn(s.join(" "))
      );
    }
    ae(new v(`${n}-version`, () => ({ library: n, version: t }), "VERSION"));
  }
  function pe(e, t) {
    if (null !== e && "function" != typeof e)
      throw se.create("invalid-log-argument");
    !(function (i, e) {
      for (const t of I) {
        let a = null;
        e && e.level && (a = S[e.level]),
          (t.userLogHandler =
            null === i
              ? null
              : (e, t, ...r) => {
                  var n = r
                    .map((e) => {
                      if (null == e) return null;
                      if ("string" == typeof e) return e;
                      if ("number" == typeof e || "boolean" == typeof e)
                        return e.toString();
                      if (e instanceof Error) return e.message;
                      try {
                        return JSON.stringify(e);
                      } catch (e) {
                        return null;
                      }
                    })
                    .filter((e) => e)
                    .join(" ");
                  t >= (null !== a && void 0 !== a ? a : e.logLevel) &&
                    i({
                      level: w[t].toLowerCase(),
                      message: n,
                      args: r,
                      type: e.name,
                    });
                });
      }
    })(e, t);
  }
  function ue(e) {
    var t;
    (t = e),
      I.forEach((e) => {
        e.setLogLevel(t);
      });
  }
  const fe = "firebase-heartbeat-database",
    ge = 1,
    me = "firebase-heartbeat-store";
  let be = null;
  function ve() {
    return (
      (be =
        be ||
        (function (
          e,
          t,
          { blocked: r, upgrade: n, blocking: a, terminated: i }
        ) {
          const s = indexedDB.open(e, t),
            o = z(s);
          return (
            n &&
              s.addEventListener("upgradeneeded", (e) => {
                n(z(s.result), e.oldVersion, e.newVersion, z(s.transaction));
              }),
            r && s.addEventListener("blocked", () => r()),
            o
              .then((e) => {
                i && e.addEventListener("close", () => i()),
                  a && e.addEventListener("versionchange", () => a());
              })
              .catch(() => {}),
            o
          );
        })(fe, ge, {
          upgrade: (e, t) => {
            0 === t && e.createObjectStore(me);
          },
        }).catch((e) => {
          throw se.create("idb-open", { originalErrorMessage: e.message });
        })),
      be
    );
  }
  async function _e(e, t) {
    var r;
    try {
      const n = await ve(),
        a = n.transaction(me, "readwrite"),
        i = a.objectStore(me);
      return await i.put(t, Ee(e)), a.done;
    } catch (e) {
      e instanceof o
        ? X.warn(e.message)
        : ((r = se.create("idb-set", {
            originalErrorMessage:
              null === e || void 0 === e ? void 0 : e.message,
          })),
          X.warn(r.message));
    }
  }
  function Ee(e) {
    return `${e.name}!${e.options.appId}`;
  }
  class ye {
    constructor(e) {
      (this.container = e), (this._heartbeatsCache = null);
      var t = this.container.getProvider("app").getImmediate();
      (this._storage = new we(t)),
        (this._heartbeatsCachePromise = this._storage
          .read()
          .then((e) => (this._heartbeatsCache = e)));
    }
    async triggerHeartbeat() {
      const e = this.container.getProvider("platform-logger").getImmediate();
      var t = e.getPlatformInfoString();
      const r = Ie();
      if (
        (null === this._heartbeatsCache &&
          (this._heartbeatsCache = await this._heartbeatsCachePromise),
        this._heartbeatsCache.lastSentHeartbeatDate !== r &&
          !this._heartbeatsCache.heartbeats.some((e) => e.date === r))
      )
        return (
          this._heartbeatsCache.heartbeats.push({ date: r, agent: t }),
          (this._heartbeatsCache.heartbeats =
            this._heartbeatsCache.heartbeats.filter((e) => {
              var t = new Date(e.date).valueOf();
              return Date.now() - t <= 2592e6;
            })),
          this._storage.overwrite(this._heartbeatsCache)
        );
    }
    async getHeartbeatsHeader() {
      if (
        (null === this._heartbeatsCache && (await this._heartbeatsCachePromise),
        null === this._heartbeatsCache ||
          0 === this._heartbeatsCache.heartbeats.length)
      )
        return "";
      var e = Ie(),
        { heartbeatsToSend: t, unsentEntries: r } = (function (e, t = 1024) {
          const r = [];
          let n = e.slice();
          for (const a of e) {
            const i = r.find((e) => e.agent === a.agent);
            if (i) {
              if ((i.dates.push(a.date), Ce(r) > t)) {
                i.dates.pop();
                break;
              }
            } else if (
              (r.push({ agent: a.agent, dates: [a.date] }), Ce(r) > t)
            ) {
              r.pop();
              break;
            }
            n = n.slice(1);
          }
          return { heartbeatsToSend: r, unsentEntries: n };
        })(this._heartbeatsCache.heartbeats),
        t = a(JSON.stringify({ version: 2, heartbeats: t }));
      return (
        (this._heartbeatsCache.lastSentHeartbeatDate = e),
        0 < r.length
          ? ((this._heartbeatsCache.heartbeats = r),
            await this._storage.overwrite(this._heartbeatsCache))
          : ((this._heartbeatsCache.heartbeats = []),
            this._storage.overwrite(this._heartbeatsCache)),
        t
      );
    }
  }
  function Ie() {
    const e = new Date();
    return e.toISOString().substring(0, 10);
  }
  class we {
    constructor(e) {
      (this.app = e),
        (this._canUseIndexedDBPromise = this.runIndexedDBEnvironmentCheck());
    }
    async runIndexedDBEnvironmentCheck() {
      return (
        "object" == typeof indexedDB &&
        new Promise((t, r) => {
          try {
            let e = !0;
            const n = "validate-browser-context-for-indexeddb-analytics-module",
              a = self.indexedDB.open(n);
            (a.onsuccess = () => {
              a.result.close(), e || self.indexedDB.deleteDatabase(n), t(!0);
            }),
              (a.onupgradeneeded = () => {
                e = !1;
              }),
              (a.onerror = () => {
                var e;
                r(
                  (null === (e = a.error) || void 0 === e
                    ? void 0
                    : e.message) || ""
                );
              });
          } catch (e) {
            r(e);
          }
        })
          .then(() => !0)
          .catch(() => !1)
      );
    }
    async read() {
      return (
        ((await this._canUseIndexedDBPromise) &&
          (await (async function (e) {
            var t;
            try {
              const r = await ve();
              return r.transaction(me).objectStore(me).get(Ee(e));
            } catch (e) {
              e instanceof o
                ? X.warn(e.message)
                : ((t = se.create("idb-get", {
                    originalErrorMessage:
                      null === e || void 0 === e ? void 0 : e.message,
                  })),
                  X.warn(t.message));
            }
          })(this.app))) || { heartbeats: [] }
      );
    }
    async overwrite(e) {
      var t;
      if (await this._canUseIndexedDBPromise) {
        var r = await this.read();
        return _e(this.app, {
          lastSentHeartbeatDate:
            null !== (t = e.lastSentHeartbeatDate) && void 0 !== t
              ? t
              : r.lastSentHeartbeatDate,
          heartbeats: e.heartbeats,
        });
      }
    }
    async add(e) {
      var t;
      if (await this._canUseIndexedDBPromise) {
        var r = await this.read();
        return _e(this.app, {
          lastSentHeartbeatDate:
            null !== (t = e.lastSentHeartbeatDate) && void 0 !== t
              ? t
              : r.lastSentHeartbeatDate,
          heartbeats: [...r.heartbeats, ...e.heartbeats],
        });
      }
    }
  }
  function Ce(e) {
    return a(JSON.stringify({ version: 2, heartbeats: e })).length;
  }
  (q = ""),
    ae(new v("platform-logger", (e) => new K(e), "PRIVATE")),
    ae(new v("heartbeat", (e) => new ye(e), "PRIVATE")),
    de(Y, "0.8.4", q),
    de(Y, "0.8.4", "esm2017"),
    de("fire-js", "");
  var De = Object.freeze({
    __proto__: null,
    SDK_VERSION: ce,
    _DEFAULT_ENTRY_NAME: Z,
    _addComponent: re,
    _addOrOverwriteComponent: ne,
    _apps: ee,
    _clearComponents: function () {
      te.clear();
    },
    _components: te,
    _getProvider: ie,
    _registerComponent: ae,
    _removeServiceInstance: function (e, t, r = Z) {
      ie(e, t).clearInstance(r);
    },
    deleteApp: le,
    getApp: function (e = Z) {
      var t = ee.get(e);
      if (!t && e === Z) return he();
      if (!t) throw se.create("no-app", { appName: e });
      return t;
    },
    getApps: function () {
      return Array.from(ee.values());
    },
    initializeApp: he,
    onLog: pe,
    registerVersion: de,
    setLogLevel: ue,
    FirebaseError: o,
  });
  class Se {
    constructor(e, t) {
      (this._delegate = e),
        (this.firebase = t),
        re(e, new v("app-compat", () => this, "PUBLIC")),
        (this.container = e.container);
    }
    get automaticDataCollectionEnabled() {
      return this._delegate.automaticDataCollectionEnabled;
    }
    set automaticDataCollectionEnabled(e) {
      this._delegate.automaticDataCollectionEnabled = e;
    }
    get name() {
      return this._delegate.name;
    }
    get options() {
      return this._delegate.options;
    }
    delete() {
      return new Promise((e) => {
        this._delegate.checkDestroyed(), e();
      }).then(
        () => (this.firebase.INTERNAL.removeApp(this.name), le(this._delegate))
      );
    }
    _getService(e, t = Z) {
      var r;
      this._delegate.checkDestroyed();
      const n = this._delegate.container.getProvider(e);
      return (
        n.isInitialized() ||
          "EXPLICIT" !==
            (null === (r = n.getComponent()) || void 0 === r
              ? void 0
              : r.instantiationMode) ||
          n.initialize(),
        n.getImmediate({ identifier: t })
      );
    }
    _removeServiceInstance(e, t = Z) {
      this._delegate.container.getProvider(e).clearInstance(t);
    }
    _addComponent(e) {
      re(this._delegate, e);
    }
    _addOrOverwriteComponent(e) {
      ne(this._delegate, e);
    }
    toJSON() {
      return {
        name: this.name,
        automaticDataCollectionEnabled: this.automaticDataCollectionEnabled,
        options: this.options,
      };
    }
  }
  const Ae = new l("app-compat", "Firebase", {
    "no-app":
      "No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()",
    "invalid-app-argument":
      "firebase.{$appName}() takes either no argument or a Firebase App instance.",
  });
  function Oe(a) {
    const i = {},
      s = {
        __esModule: !0,
        initializeApp: function (e, t = {}) {
          var r = he(e, t);
          if (p(i, r.name)) return i[r.name];
          var n = new a(r, s);
          return (i[r.name] = n);
        },
        app: o,
        registerVersion: de,
        setLogLevel: ue,
        onLog: pe,
        apps: null,
        SDK_VERSION: ce,
        INTERNAL: {
          registerComponent: function (r) {
            const n = r.name,
              t = n.replace("-compat", "");
            {
              var e;
              ae(r) &&
                "PUBLIC" === r.type &&
                ((e = (e = o()) => {
                  if ("function" != typeof e[t])
                    throw Ae.create("invalid-app-argument", { appName: n });
                  return e[t]();
                }),
                void 0 !== r.serviceProps && c(e, r.serviceProps),
                (s[t] = e),
                (a.prototype[t] = function (...e) {
                  const t = this._getService.bind(this, n);
                  return t.apply(this, r.multipleInstances ? e : []);
                }));
            }
            return "PUBLIC" === r.type ? s[t] : null;
          },
          removeApp: function (e) {
            delete i[e];
          },
          useAsService: function (e, t) {
            if ("serverAuth" === t) return null;
            var r = t;
            return r;
          },
          modularAPIs: De,
        },
      };
    function o(e) {
      if (((e = e || Z), !p(i, e))) throw Ae.create("no-app", { appName: e });
      return i[e];
    }
    return (
      (s.default = s),
      Object.defineProperty(s, "apps", {
        get: function () {
          return Object.keys(i).map((e) => i[e]);
        },
      }),
      (o.App = a),
      s
    );
  }
  var Le = (function e() {
    const t = Oe(Se);
    return (
      (t.INTERNAL = Object.assign(Object.assign({}, t.INTERNAL), {
        createFirebaseNamespace: e,
        extendNamespace: function (e) {
          c(t, e);
        },
        createSubscribe: g,
        ErrorFactory: l,
        deepExtend: c,
      })),
      t
    );
  })();
  const Ne = new N("@firebase/app-compat");
  if (
    "object" == typeof self &&
    self.self === self &&
    void 0 !== self.firebase
  ) {
    Ne.warn(`
    Warning: Firebase is already defined in the global scope. Please make sure
    Firebase library is only loaded once.
  `);
    const Te = self.firebase.SDK_VERSION;
    Te &&
      0 <= Te.indexOf("LITE") &&
      Ne.warn(`
    Warning: You are trying to load Firebase while using Firebase Performance standalone script.
    You should load Firebase Performance with this instance of Firebase to avoid loading duplicate code.
    `);
  }
  const Be = Le;
  de("@firebase/app-compat", "0.1.39", void 0);
  return Be.registerVersion("firebase", "9.14.0", "app-compat-cdn"), Be;
});
//# sourceMappingURL=firebase-app-compat.js.map
