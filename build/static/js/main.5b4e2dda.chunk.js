(this["webpackJsonpmini-kaios"] = this["webpackJsonpmini-kaios"] || []).push([[0], {
    236: function (e, t, a) {
        e.exports = a(510)
    }, 482: function (e, t, a) {
    }, 495: function (e, t, a) {
    }, 496: function (e, t, a) {
    }, 499: function (e, t, a) {
    }, 506: function (e, t, a) {
    }, 510: function (e, t, a) {
        "use strict";
        a.r(t);
        a(237), a(286);
        var n = a(1), r = a.n(n), o = a(111), s = a.n(o), c = (a(482), a(2)), i = a.n(c), l = a(59), u = a(7), d = a(8),
            v = a(58), m = a(57), p = a(113), g = a(60), f = a(234), h = a(512), b = function (e) {
                Object(v.a)(a, e);
                var t = Object(m.a)(a);

                function a() {
                    return Object(u.a)(this, a), t.apply(this, arguments)
                }

                return Object(d.a)(a, [{
                    key: "render", value: function () {
                        var e = null;
                        return this.props.debug && (e = r.a.createElement("pre", {className: "alert-pre border bg-light p-2"}, r.a.createElement("code", null, this.props.debug))), r.a.createElement(h.a, {color: "danger"}, r.a.createElement("p", {className: "mb-3"}, this.props.message), e)
                    }
                }]), a
            }(r.a.Component), E = a(68), y = a.n(E), k = a(509);

        function w(e) {
            return k.Client.init({
                authProvider: function (t) {
                    t(null, e.accessToken)
                }
            })
        }

        function O(e) {
            return j.apply(this, arguments)
        }

        function j() {
            return (j = Object(l.a)(i.a.mark((function e(t) {
                var a, n;
                return i.a.wrap((function (e) {
                    for (; ;) switch (e.prev = e.next) {
                        case 0:
                            return console.log("getUserDetails"), a = w(t), console.log("getUserDetails", a), e.next = 5, a.api("/me").get();
                        case 5:
                            return n = e.sent, e.abrupt("return", n);
                        case 7:
                        case"end":
                            return e.stop()
                    }
                }), e)
            })))).apply(this, arguments)
        }

        function N(e, t) {
            return x.apply(this, arguments)
        }

        function x() {
            return (x = Object(l.a)(i.a.mark((function e(t, a) {
                var n, r;
                return i.a.wrap((function (e) {
                    for (; ;) switch (e.prev = e.next) {
                        case 0:
                            if (n = w(t), !1 !== a) {
                                e.next = 3;
                                break
                            }
                            return e.abrupt("return");
                        case 3:
                            return e.next = 5, n.api("/me/events").orderby("createdDateTime DESC").select(a).get();
                        case 5:
                            return r = e.sent, e.abrupt("return", r);
                        case 7:
                        case"end":
                            return e.stop()
                    }
                }), e)
            })))).apply(this, arguments)
        }

        a(495);
        var T = function (e) {
                var t = e.start;
                return r.a.createElement("div", {className: "header_4"}, r.a.createElement("div", {className: "header_5"}, r.a.createElement("div", {className: "header_6"}, t[0], " ", t[2])))
            }, A = (a(496), function (e) {
                var t = e.start, a = e.duration, n = e.subject, o = e.location, s = encodeURIComponent(e["@odata.etag"]);
                return r.a.createElement(p.b, {
                    className: "calendar_3",
                    to: "/event-details/".concat(s)
                }, r.a.createElement("div", {className: "calendar_4"}, r.a.createElement("div", {className: "calendar_5"}, t && t[1]), r.a.createElement("div", {className: "calendar_6"}, a)), r.a.createElement("div", {className: "calendar_7"}, r.a.createElement("div", {className: "calendar_8"})), r.a.createElement("div", {className: "calendar_9"}, r.a.createElement("div", {className: "calendar_12"}, r.a.createElement("div", {className: "calendar_13"}, r.a.createElement("div", {className: "calendar_14"}, n)), o && r.a.createElement("div", {className: "calendar_15"}, r.a.createElement("span", {role: "img"}, "\ud83d\udccd"), o))))
            }), _ = (a(499), a(233)), S = a(90), C = Object(S.createStore)("calendarStore", {events: {value: []}}),
            D = Object(S.mutatorAction)("UPDATE_CALENDAR_ITEMS_MAP", (function (e) {
                C().events.value = e.value
            })), U = a(232), M = a(149);

        function R(e) {
            var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
            if (!e) return ["", "", "", "", ""];
            var a, n, r, o = e.split("T"), s = Object(M.a)(o, 2), c = s[0], i = s[1], l = i.split(".")[0].split(":"),
                u = Object(M.a)(l, 2), d = u[0], v = u[1], m = new Date(c), p = m.getDate(), g = (new Date).getDate();
            t && (p === g ? a = "Today" : p === g - 1 ? a = "Yesterday" : p === g + 1 && (a = "Tomorrow"));
            var f = ["".concat(d, ":").concat(v), a || m.toLocaleString("en-us", {weekday: "long"}), c];
            n = f[0], a = f[1], r = f[2];
            var h = p === g ? n : m.getMonth() + "/" + p + " " + n;
            return [p, n, a, r, h]
        }

        a(11);
        var I = function () {
            var e, t = null === (e = C()) || void 0 === e ? void 0 : e.events;
            try {
                var a = {};
                return t.value.forEach((function (e) {
                    var t, n, r, o, s,
                        c = R(null === e || void 0 === e || null === (t = e.start) || void 0 === t ? void 0 : t.dateTime),
                        i = R(null === e || void 0 === e || null === (n = e.end) || void 0 === n ? void 0 : n.dateTime),
                        l = function (e, t) {
                            var a = Math.abs(new Date(e) - new Date(t)), n = Math.floor(a / 36e5);
                            a -= 36e5 * n;
                            var r = Math.floor(a / 6e4);
                            return "".concat(n, ":").concat(("0" + r).slice(-2))
                        }(null === e || void 0 === e || null === (r = e.end) || void 0 === r ? void 0 : r.dateTime, null === e || void 0 === e || null === (o = e.start) || void 0 === o ? void 0 : o.dateTime);
                    a[c[3]] = a[c[3]] || [];
                    var u = Object(U.a)({}, e, {
                        itemId: null === e || void 0 === e ? void 0 : e.id,
                        subject: null === e || void 0 === e ? void 0 : e.subject,
                        isRead: !0,
                        start: c,
                        end: i,
                        location: null === e || void 0 === e || null === (s = e.location) || void 0 === s ? void 0 : s.displayName,
                        duration: l
                    });
                    a[c[3]].push(u)
                })), a
            } catch (n) {
                console.log("Error : " + n)
            }
        }, P = Object(_.a)(function (e) {
            Object(v.a)(a, e);
            var t = Object(m.a)(a);

            function a() {
                return Object(u.a)(this, a), t.apply(this, arguments)
            }

            return Object(d.a)(a, [{
                key: "componentDidMount", value: function () {
                    var e = Object(l.a)(i.a.mark((function e() {
                        var t, a;
                        return i.a.wrap((function (e) {
                            for (; ;) switch (e.prev = e.next) {
                                case 0:
                                    return e.prev = 0, e.next = 3, window.msal.acquireTokenSilent({scopes: y.a.scopes});
                                case 3:
                                    return t = e.sent, e.next = 6, N(t, this.props.select);
                                case 6:
                                    (a = e.sent) && D(a), e.next = 13;
                                    break;
                                case 10:
                                    e.prev = 10, e.t0 = e.catch(0), console.error("ERROR", e.t0);
                                case 13:
                                case"end":
                                    return e.stop()
                            }
                        }), e, this, [[0, 10]])
                    })));
                    return function () {
                        return e.apply(this, arguments)
                    }
                }()
            }, {
                key: "render", value: function () {
                    var e, t, a, n = I(), o = Object.keys(n).sort(),
                        s = null === this || void 0 === this || null === (e = this.props) || void 0 === e || null === (t = e.match) || void 0 === t || null === (a = t.params) || void 0 === a ? void 0 : a.etag;
                    if (s) {
                        var c, i = function (e) {
                            var t, a, n = null === (t = C()) || void 0 === t ? void 0 : t.events,
                                r = decodeURIComponent(e);
                            return null === n || void 0 === n || null === (a = n.value) || void 0 === a ? void 0 : a.find((function (e) {
                                return (null === e || void 0 === e ? void 0 : e["@odata.etag"]) === r
                            }))
                        }(s);
                        return r.a.createElement("div", {dangerouslySetInnerHTML: {__html: null === i || void 0 === i || null === (c = i.body) || void 0 === c ? void 0 : c.content}})
                    }
                    return r.a.createElement("div", {className: "mailListContainer"}, o.map((function (e, t) {
                        var a;
                        return r.a.createElement(r.a.Fragment, {key: t}, r.a.createElement(T, {start: null === (a = n[e][0]) || void 0 === a ? void 0 : a.start}), n[e].map((function (e, t) {
                            return r.a.createElement(A, Object.assign({key: t}, e))
                        })))
                    })))
                }
            }]), a
        }(r.a.Component)), J = (a(506), function (e) {
            var t = e.headerText;
            return r.a.createElement("div", {className: "header"}, r.a.createElement("div", {className: "header-item"}, r.a.createElement("span", null, t)))
        }), L = function (e) {
            return r.a.createElement(r.a.Fragment, null, r.a.createElement(J, e), r.a.createElement(P, e))
        }, q = function (e) {
            Object(v.a)(a, e);
            var t = Object(m.a)(a);

            function a(e) {
                var n;
                Object(u.a)(this, a), ((n = t.call(this, e)).userAgentApplication = new f.a({
                    auth: {
                        clientId: y.a.appId,
                        navigateToLoginRequestUrl: !1,
                        redirectUri: y.a.redirectUri
                    }
                })).handleRedirectCallback((function (e, t) {
                    console.log(e, t.accessToken, t)
                }));
                var r = n.userAgentApplication.getAccount();
                return console.log("got account", r), n.state = {
                    isAuthenticated: null !== r,
                    user: {},
                    error: null
                }, r ? n.getUserProfile() : n.login(), n
            }

            return Object(d.a)(a, [{
                key: "render", value: function () {
                    var e = this, t = this.state.user;
                    return console.log("user in render", t), this.state.error && r.a.createElement(b, {
                        message: this.state.error.message,
                        debug: this.state.error.debug
                    }), r.a.createElement(r.a.Fragment, null, r.a.createElement("pre", null, JSON.stringify(t), JSON.stringify(window.location)), r.a.createElement(p.a, null, r.a.createElement(g.a, {
                        exact: !0,
                        path: "/",
                        render: function (a) {
                            return r.a.createElement(L, Object.assign({}, a, {
                                headerText: "Calendar",
                                user: t,
                                showError: e.setErrorMessage.bind(e),
                                select: "id,subject,start,end,location,body"
                            }))
                        }
                    }), r.a.createElement(g.a, {
                        exact: !0, path: "/event-details/:etag", render: function (a, n) {
                            return r.a.createElement(L, Object.assign({}, a, {
                                params: n,
                                headerText: "Calendar Details",
                                user: t,
                                showError: e.setErrorMessage.bind(e),
                                select: !1
                            }))
                        }
                    })))
                }
            }, {
                key: "setErrorMessage", value: function (e, t) {
                    this.setState({error: {message: e, debug: t}})
                }
            }, {
                key: "login", value: function () {
                    var e = Object(l.a)(i.a.mark((function e() {
                        var t, a, n, r;
                        return i.a.wrap((function (e) {
                            for (; ;) switch (e.prev = e.next) {
                                case 0:
                                    return e.prev = 0, e.next = 3, this.userAgentApplication.loginPopup({
                                        scopes: y.a.scopes,
                                        prompt: "select_account"
                                    });
                                case 3:
                                    return t = e.sent, console.log("login popup closed idToken, idTokenClaims", t.idToken, t.idTokenClaims), e.next = 7, this.getUserProfile();
                                case 7:
                                    a = e.sent, console.log("got User Profile", a), e.next = 17;
                                    break;
                                case 11:
                                    e.prev = 11, e.t0 = e.catch(0), console.log("got error", e.t0), n = {}, "string" === typeof e.t0 ? (r = e.t0.split("|"), n = r.length > 1 ? {
                                        message: r[1],
                                        debug: r[0]
                                    } : {message: e.t0}) : n = {
                                        message: e.t0.message,
                                        debug: JSON.stringify(e.t0)
                                    }, this.setState({isAuthenticated: !1, user: {}, error: n});
                                case 17:
                                case"end":
                                    return e.stop()
                            }
                        }), e, this, [[0, 11]])
                    })));
                    return function () {
                        return e.apply(this, arguments)
                    }
                }()
            }, {
                key: "logout", value: function () {
                    this.userAgentApplication.logout()
                }
            }, {
                key: "getUserProfile", value: function () {
                    var e = Object(l.a)(i.a.mark((function e() {
                        var t, a, n, r;
                        return i.a.wrap((function (e) {
                            for (; ;) switch (e.prev = e.next) {
                                case 0:
                                    return e.prev = 0, e.next = 3, this.userAgentApplication.acquireTokenSilent({scopes: y.a.scopes});
                                case 3:
                                    if (!(t = e.sent)) {
                                        e.next = 11;
                                        break
                                    }
                                    return e.next = 7, O(t);
                                case 7:
                                    a = e.sent, console.log("got acquireTokenSilent, getUserDetails", a), this.setState({
                                        isAuthenticated: !0,
                                        user: {displayName: a.displayName, email: a.mail || a.userPrincipalName},
                                        error: null
                                    }), document.head.getElementsByTagName("title")[0].text = "Calendar - ".concat(a.displayName, " - Outlook");
                                case 11:
                                    e.next = 19;
                                    break;
                                case 13:
                                    e.prev = 13, e.t0 = e.catch(0), console.log(e.t0), n = {}, "string" === typeof e.t0 ? (r = e.t0.split("|"), n = r.length > 1 ? {
                                        message: r[1],
                                        debug: r[0]
                                    } : {message: e.t0}) : (n = {
                                        message: e.t0.message,
                                        debug: JSON.stringify(e.t0)
                                    }, console.log(n)), this.setState({isAuthenticated: !1, user: {}, error: n});
                                case 19:
                                case"end":
                                    return e.stop()
                            }
                        }), e, this, [[0, 13]])
                    })));
                    return function () {
                        return e.apply(this, arguments)
                    }
                }()
            }]), a
        }(n.Component);
        Boolean("localhost" === window.location.hostname || "[::1]" === window.location.hostname || window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));
        a(507);
        !function () {
            new RegExp("[\\?&]devtools="), window.location.href.toLowerCase();
            s.a.render(r.a.createElement(q, null), document.getElementById("root")), "serviceWorker" in navigator && navigator.serviceWorker.ready.then((function (e) {
                e.unregister()
            }))
        }()
    }, 68: function (e, t) {
        e.exports = {
            appId: "98f6c11f-26a7-4309-a75f-b8df6e384711",
            redirectUri: "https://outlook-sdf.office.com/mail/inbox",
            scopes: ["user.read", "calendars.read"]
        }
    }
}, [[236, 1, 2]]]);
//# sourceMappingURL=main.5b4e2dda.chunk.js.map