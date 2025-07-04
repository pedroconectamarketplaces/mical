/*
* HSCore
* @version: 4.0.0 (01 June, 2021)
* @author: HtmlStream
* @event-namespace: .HSCore
* @license: Htmlstream Libraries (https://htmlstream.com/licenses)
* Copyright 2021 Htmlstream
*/
"use strict";
const HSCore = {
    init: () => {
        [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map((function(e) {
            return new bootstrap.Tooltip(e)
        }
        )),
        [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]')).map((function(e) {
            return new bootstrap.Popover(e)
        }
        ))
    }
    ,
    components: {}
};
HSCore.init();
const HSBsDropdown = {
    init(e) {
        this.setAnimations(),
        this.openOnHover()
    },
    setAnimations() {
        window.addEventListener("show.bs.dropdown", (e => {
            if (!e.target.hasAttribute("data-bs-dropdown-animation"))
                return;
            const t = e.target.nextElementSibling;
            t.style.opacity = 0,
            setTimeout(( () => {
                t.style.transform = `${t.style.transform} translateY(10px)`
            }
            )),
            setTimeout(( () => {
                t.style.transform = `${t.style.transform} translateY(-10px)`,
                t.style.transition = "transform 300ms, opacity 300ms",
                t.style.opacity = 1
            }
            ), 100)
        }
        )),
        window.addEventListener("hide.bs.dropdown", (e => {
            if (!e.target.hasAttribute("data-bs-dropdown-animation"))
                return;
            const t = e.target.nextElementSibling;
            setTimeout(( () => {
                t.style.removeProperty("transform"),
                t.style.removeProperty("transition")
            }
            ))
        }
        ))
    },
    openOnHover() {
        Array.from(document.querySelectorAll("[data-bs-open-on-hover]")).forEach((e => {
            var t;
            const i = new bootstrap.Dropdown(e);
            function l() {
                t = setTimeout(( () => {
                    i.hide()
                }
                ), 500)
            }
            e.addEventListener("mouseenter", ( () => {
                clearTimeout(t),
                i.show()
            }
            )),
            i._menu.addEventListener("mouseenter", ( () => {
                window.clearTimeout(t)
            }
            )),
            Array.from([i._menu, e]).forEach((e => e.addEventListener("mouseleave", l)))
        }
        ))
    }
}
  , validators = {
    "data-hs-validation-equal-field": e => {
        const t = document.querySelector(e.getAttribute("data-hs-validation-equal-field"));
        e.addEventListener("input", (i => {
            t.value.toString().toLocaleLowerCase() !== i.target.value.toString().toLocaleLowerCase() ? e.setCustomValidity("qual-field") : e.setCustomValidity(""),
            HSBsValidation.updateFieldStete(e)
        }
        )),
        t.addEventListener("input", (t => {
            e.value.toString().toLocaleLowerCase() !== t.target.value.toString().toLocaleLowerCase() ? e.setCustomValidity("qual-field") : e.setCustomValidity(""),
            HSBsValidation.updateFieldStete(e)
        }
        ))
    }
}
  , HSBsValidation = {
    init(e, t) {
        var i = document.querySelectorAll(e);
        return Array.prototype.slice.call(i).forEach((e => {
            for (const t in validators)
                Array.prototype.slice.call(e.querySelectorAll(`[${t}]`)).forEach(validators[t]);
            this.addVlidationListners(e.elements),
            e.addEventListener("submit", (i => {
                e.checkValidity() ? this.onSubmit({
                    event: i,
                    form: e,
                    options: t
                }) : (i.preventDefault(),
                i.stopPropagation(),
                this.checkFieldsState(e.elements)),
                e.classList.add("was-validated")
            }
            ), !1)
        }
        )),
        this
    },
    addVlidationListners(e) {
        Array.prototype.slice.call(e).forEach((e => {
            const t = e.closest("[data-hs-validation-validate-class]");
            t && (e.addEventListener("input", (e => this.updateFieldStete(e.target))),
            e.addEventListener("focus", (e => t.classList.add("focus"))),
            e.addEventListener("blur", (e => t.classList.remove("focus"))))
        }
        ))
    },
    checkFieldsState(e) {
        Array.prototype.slice.call(e).forEach((e => this.updateFieldStete(e)))
    },
    updateFieldStete(e) {
        const t = e.closest("[data-hs-validation-validate-class]");
        t && (e.checkValidity() ? (t.classList.add("is-valid"),
        t.classList.remove("is-invalid")) : (t.classList.add("is-invalid"),
        t.classList.remove("is-valid")))
    },
    onSubmit: e => !(!e.options || "function" != typeof e.options.onSubmit) && e.options.onSubmit(e)
}/*
* HSMask Plugin
* @version: 2.0.1 (Sat, 30 Jul 2021)
* @requires: imask v1.14.16
* @author: HtmlStream
* @event-namespace: .HSMask
* @license: Htmlstream Libraries (https://htmlstream.com/)
* Copyright 2021 Htmlstream
*/
;
/*
* Leaflet wrapper
* @version: 2.0.0 (Sat, 22 May 2021)
* @requires: Leafletjs v1.6.0
* @author: HtmlStream
* @event-namespace: .HSCore.components.HSLeaflet
* @license: Htmlstream Libraries (https://htmlstream.com/licenses)
* Copyright 2021 Htmlstream
*/
function isObject(e) {
    return e && "object" == typeof e && !Array.isArray(e)
}
function mergeDeep(e, ...t) {
    if (!t.length)
        return e;
    const i = t.shift();
    if (isObject(e) && isObject(i))
        for (const t in i)
            isObject(i[t]) ? (e[t] || Object.assign(e, {
                [t]: {}
            }),
            mergeDeep(e[t], i[t])) : Object.assign(e, {
                [t]: i[t]
            });
    return mergeDeep(e, ...t)
}
/*
* Chart.js wrapper
* @version: 3.0.0 (Mon, 25 Nov 2021)
* @requires: Chart.js v2.8.0
* @author: HtmlStream
* @event-namespace: .HSCore.components.HSValidation
* @license: Htmlstream Libraries (https://htmlstream.com/licenses)
* Copyright 2021 Htmlstream
*/
function isObject(e) {
    return e && "object" == typeof e && !Array.isArray(e)
}
function mergeDeep(e, ...t) {
    if (!t.length)
        return e;
    const i = t.shift();
    if (isObject(e) && isObject(i))
        for (const t in i)
            isObject(i[t]) ? (e[t] || Object.assign(e, {
                [t]: {}
            }),
            mergeDeep(e[t], i[t])) : Object.assign(e, {
                [t]: i[t]
            });
    return mergeDeep(e, ...t)
}
HSCore.components.HSMask = {
    dataAttributeName: "data-hs-mask-options",
    defaults: {
        mask: null
    },
    collection: [],
    init(e, t, i) {
        const l = this;
        let o;
        o = e instanceof HTMLElement ? [e] : e instanceof Object ? e : document.querySelectorAll(e);
        for (let e = 0; e < o.length; e += 1)
            l.addToCollection(o[e], t, i || o[e].id);
        if (!l.collection.length)
            return !1;
        l._init()
    },
    addToCollection(e, t, i) {
        const l = this;
        this.collection.push({
            $el: e,
            id: i || null,
            options: Object.assign({}, l.defaults, e.hasAttribute(l.dataAttributeName) ? JSON.parse(e.getAttribute(l.dataAttributeName)) : {}, t)
        })
    },
    getItems() {
        const e = this;
        let t = [];
        for (let i = 0; i < e.collection.length; i += 1)
            t.push(e.collection[i].$initializedEl);
        return t
    },
    getItem(e) {
        return "number" == typeof e ? this.collection[e].$initializedEl : this.collection.find((t => t.id === e)).$initializedEl
    },
    _init() {
        const e = this;
        for (let t = 0; t < e.collection.length; t += 1) {
            let i, l;
            e.collection[t].hasOwnProperty("$initializedEl") || (i = e.collection[t].options,
            l = e.collection[t].$el,
            e.collection[t].$initializedEl = new IMask(l,i))
        }
    }
}/*
* HSTomSelect Plugin
* @version: 1.0.0 (Mon, 24 May 2021)
* @requires: tom-select 1.7.26
* @author: HtmlStream
* @event-namespace: .HSTomSelect
* @license: Htmlstream Libraries (https://htmlstream.com/)
* Copyright 2021 Htmlstream
*/
,
HSCore.components.HSTomSelect = {
    dataAttributeName: "data-hs-tom-select-options",
    defaults: {
        dropdownWrapperClass: "tom-select-custom",
        searchInDropdown: !0,
        plugins: ["change_listener", "hs_smart_position"],
        hideSelected: !1,
        render: {
            option: function(e, t) {
                return e.optionTemplate || `<div>${e.text}</div>>`
            },
            item: function(e, t) {
                return e.optionTemplate || `<div>${e.text}</div>>`
            }
        }
    },
    collection: [],
    init(e, t, i) {
        const l = this;
        let o;
        o = e instanceof HTMLElement ? [e] : e instanceof Object ? e : document.querySelectorAll(e);
        for (let e = 0; e < o.length; e += 1)
            l.addToCollection(o[e], t, i || o[e].id);
        if (!l.collection.length)
            return !1;
        l._init()
    },
    addToCollection(e, t, i) {
        const l = this;
        this.collection.push({
            $el: e,
            id: i || null,
            options: Object.assign({}, l.defaults, e.hasAttribute(l.dataAttributeName) ? JSON.parse(e.getAttribute(l.dataAttributeName)) : {}, t)
        })
    },
    getItems() {
        const e = this;
        let t = [];
        for (let i = 0; i < e.collection.length; i += 1)
            t.push(e.collection[i].$initializedEl);
        return t
    },
    getItem(e) {
        return "number" == typeof e ? this.collection[e].$initializedEl : this.collection.find((t => t.id === e)).$initializedEl
    },
    _init() {
        const e = this;
        for (let t = 0; t < e.collection.length; t += 1) {
            let i, l;
            e.collection[t].hasOwnProperty("$initializedEl") || (i = e.collection[t].options,
            l = e.collection[t].$el,
            i.plugins.hasOwnProperty("hs_smart_position") && !l.closest(".modal") && (i.dropdownParent = "body"),
            l.hasAttribute("multiple") && (i.plugins = [...i.plugins, "remove_button"]),
            i.searchInDropdown && (i.plugins = [...i.plugins, "dropdown_input"]),
            TomSelect.define("hs_smart_position", (function(e) {
                this.hook("after", "setup", (function() {
                    this.$menu = this.dropdown_content.parentElement,
                    this.on("dropdown_open", (e => {
                        const t = e.getBoundingClientRect()
                          , l = this.wrapper.getBoundingClientRect();
                        t.bottom > window.innerHeight && (e.style.top = parseInt(e.style.top) - (this.control.clientHeight + e.clientHeight + 10) + "px"),
                        e.style.opacity = 0,
                        setTimeout(( () => {
                            const o = parseInt(e.style.width);
                            o > l.width && i.dropdownLeft && (e.style.left = parseInt(e.style.left) - Math.abs(t.width - o) + "px"),
                            e.style.opacity = 1
                        }
                        ))
                    }
                    )),
                    window.addEventListener("scroll", ( () => function(e) {
                        const t = e.$menu.getBoundingClientRect();
                        t.bottom > window.innerHeight ? e.$menu.style.top = parseInt(e.$menu.style.top) - (e.control.clientHeight + e.$menu.clientHeight + 10) + "px" : t.top < 0 && (e.$menu.style.top = `${parseInt(e.$menu.style.top) + (e.control.clientHeight + e.$menu.clientHeight + 10)}px`)
                    }(this)))
                }
                ))
            }
            )),
            e.collection[t].$initializedEl = new TomSelect(l,i),
            i.hideSearch && e.hideSearch(e.collection[t].$initializedEl, i),
            i.disableSearch && e.disableSearch(e.collection[t].$initializedEl, i),
            i.width && e.width(e.collection[t].$initializedEl, i),
            i.singleMultiple && e.singleMultiple(e.collection[t].$initializedEl, i),
            i.hidePlaceholderOnSearch && e.hidePlaceholderOnSearch(e.collection[t].$initializedEl, i),
            i.create && e.openIfEmpty(e.collection[t].$initializedEl, i),
            i.hideSelectedFromField && e.hideSelectedFromField(e.collection[t].$initializedEl, i),
            i.dropdownWidth && e.dropdownWidth(e.collection[t].$initializedEl, i),
            e.renderPlaceholder(e.collection[t].$initializedEl, i),
            e.wrapContainer(e.collection[t].$initializedEl, i))
        }
    },
    hideSearch(e, t) {
        e.control_input.parentElement.removeChild(e.control_input)
    },
    disableSearch(e, t) {
        e.control_input.readOnly = !0
    },
    singleMultiple(e, t) {
        e.control.classList.add("hs-select-single-multiple");
        const i = (e.control_input.getAttribute("placeholder") || t.placeholder).replace(/(<([^>]+)>)/gi, "")
          , l = t => {
            t.target.closest("[data-selectable].selected") && (t.target.classList.remove("selected"),
            setTimeout(( () => {
                e.removeItem(t.target.getAttribute("data-value"), !1),
                e.refreshItems()
            }
            )))
        }
          , o = t => {
            if (!e.wrapper.querySelector(".ts-selected-count")) {
                const t = document.createElement("span");
                t.classList.add("ts-selected-count"),
                e.wrapper.querySelector(".ts-control").appendChild(t)
            }
            return e.wrapper.querySelector(".ts-selected-count").innerHTML = t
        }
        ;
        e.items.length && (t.searchInDropdown ? o(e.items.length ? `${e.items.length} item(s) selected` : i) : e.control_input.setAttribute("placeholder", `${e.items.length} item(s) selected`)),
        e.on("dropdown_open", (e => {
            e.addEventListener("mouseup", l)
        }
        )),
        e.on("dropdown_close", (e => {
            window.removeEventListener("mouseup", l)
        }
        )),
        e.on("item_add", ( () => {
            e.items.length && (t.searchInDropdown ? o(`${e.items.length} item(s) selected`) : e.control_input.setAttribute("placeholder", `${e.items.length} item(s) selected`))
        }
        )),
        e.on("item_remove", ( () => {
            e.items.length ? t.searchInDropdown ? o(`${e.items.length} item(s) selected`) : e.control_input.setAttribute("placeholder", `${e.items.length} item(s) selected`) : t.searchInDropdown ? o(i) : e.control_input.setAttribute("placeholder", i)
        }
        ))
    },
    width(e, t) {
        e.wrapper.style.maxWidth = t.width
    },
    hidePlaceholderOnSearch(e, t) {
        const i = (e.control_input.getAttribute("placeholder") || t.placeholder).replace(/(<([^>]+)>)/gi, "");
        i && (e.on("dropdown_open", ( () => {
            e.control_input.setAttribute("placeholder", "")
        }
        )),
        e.on("dropdown_close", ( () => {
            e.control_input.setAttribute("placeholder", i)
        }
        )))
    },
    openIfEmpty(e, t) {
        e.control_input.addEventListener("focus", ( () => {
            e.$menu.querySelector(".option") || (e.open(),
            setTimeout(( () => {
                e.$menu.style.display = "block",
                e.$menu.querySelector(".ts-dropdown-content").append(e.render("no_results"))
            }
            ), 10))
        }
        ))
    },
    hideSelectedFromField(e, t) {
        const i = () => {
            console.log(e)
        }
        ;
        e.on("item_select", i),
        e.on("item_add", i)
    },
    dropdownWidth(e, t) {
        e.on("dropdown_open", ( () => e.$menu.style.width = t.dropdownWidth))
    },
    width(e, t) {
        e.wrapper.style.width = t.width
    },
    renderPlaceholder(e, t) {
        if (t.singleMultiple || e.items.length)
            return;
        const i = e.input.getAttribute("placeholder") || t.placeholder;
        if (t.searchInDropdown && !t.hideSelected) {
            let t = null;
            const l = function() {
                if (t = e.wrapper.querySelector(".ts-custom-placeholder"),
                e.items.length && t)
                    return t.parentElement && t.parentElement.removeChild(t),
                    t = null;
                e.items.length || t || o()
            }
              , o = function() {
                e.items.length || (e.wrapper.querySelector(".ts-control").innerHTML = `<span class="ts-custom-placeholder">${i}</span>`,
                t = e.wrapper.querySelector(".ts-custom-placeholder"))
            };
            o(),
            e.on("change", l)
        }
        i && (e.control_input.offsetParent ? function(t) {
            e.control_input.setAttribute("placeholder", t.replace(/(<([^>]+)>)/gi, ""))
        }(i) : function(t) {
            const i = () => {
                e.control.innerHTML = `<div class="ts-custom-placeholder">${t}</div>`
            }
            ;
            i(),
            e.on("change", ( () => {
                e.items.length && ( () => {
                    const t = e.wrapper.querySelector(".items .ts-custom-placeholder");
                    t && t.parentElement && t.parentElement.removeChild(t)
                }
                )(),
                e.items.length || i()
            }
            ))
        }(i))
    },
    wrapContainer(e, t) {
        var i = document.createElement("div");
        i.className += t.dropdownWrapperClass,
        e.$menu.parentNode.insertBefore(i, e.$menu),
        i.appendChild(e.$menu)
    }
}/*
* Quill wrapper
* @version: 2.0.0 (Wed, 28 Jul 2021)
* @requires: quill v1.3.7
* @author: HtmlStream
* @event-namespace: .HSCore.components.HSQuill
* @license: Htmlstream Libraries (https://htmlstream.com/licenses)
* Copyright 2021 Htmlstream
*/
,
HSCore.components.HSQuill = {
    dataAttributeName: "data-hs-quill-options",
    defaults: {
        theme: "snow",
        attach: !1
    },
    collection: [],
    init(e, t, i) {
        const l = this;
        let o;
        o = e instanceof HTMLElement ? [e] : e instanceof Object ? e : document.querySelectorAll(e);
        for (let e = 0; e < o.length; e += 1)
            l.addToCollection(o[e], t, i || o[e].id);
        if (!l.collection.length)
            return !1;
        l._init()
    },
    addToCollection(e, t, i) {
        const l = this;
        this.collection.push({
            $el: e,
            id: i || null,
            options: Object.assign({}, l.defaults, e.hasAttribute(l.dataAttributeName) ? JSON.parse(e.getAttribute(l.dataAttributeName)) : {}, t)
        })
    },
    getItems() {
        const e = this;
        let t = [];
        for (let i = 0; i < e.collection.length; i += 1)
            t.push(e.collection[i].$initializedEl);
        return t
    },
    getItem(e) {
        return "number" == typeof e ? this.collection[e].$initializedEl : this.collection.find((t => t.id === e)).$initializedEl
    },
    _init() {
        const e = this;
        for (let t = 0; t < e.collection.length; t += 1) {
            let i, l;
            e.collection[t].hasOwnProperty("$initializedEl") || (i = e.collection[t].options,
            l = e.collection[t].$el,
            e.collection[t].$initializedEl = new Quill(l,i),
            l.classList.add("hs-quill-initialized"),
            this.toolbarBottom(i, e.collection[t].$initializedEl))
        }
    },
    toolbarBottom: function(e, t) {
        if (e.toolbarBottom) {
            const i = t.container
              , l = i.previousElementSibling;
            if (i.parentElement.classList.add("ql-toolbar-bottom"),
            e.attach) {
                document.querySelector(e.attach).addEventListener("shown.bs.modal", ( () => {
                    i.style.paddingBottom = l.offsetHeight + "px"
                }
                ))
            } else
                i.style.paddingBottom = l.offsetHeight + "px";
            l.style.position = "absolute",
            l.style.width = "100%",
            l.style.bottom = 0
        }
    }
},
HSCore.components.HSTyped = {
    dataAttributeName: "data-hs-typed-options",
    defaults: {},
    collection: [],
    init(e, t, i) {
        const l = this;
        let o;
        o = e instanceof HTMLElement ? [e] : e instanceof Object ? e : document.querySelectorAll(e);
        for (let e = 0; e < o.length; e += 1)
            l.addToCollection(o[e], t, i || o[e].id);
        if (!l.collection.length)
            return !1;
        l._init()
    },
    addToCollection(e, t, i) {
        const l = this;
        this.collection.push({
            $el: e,
            id: i || null,
            options: Object.assign({}, l.defaults, e.hasAttribute(l.dataAttributeName) ? JSON.parse(e.getAttribute(l.dataAttributeName)) : {}, t)
        })
    },
    _init: function() {
        const e = this;
        for (let t = 0; t < e.collection.length; t += 1) {
            let i, l;
            e.collection[t].hasOwnProperty("$initializedEl") || (i = e.collection[t].$el,
            l = e.collection[t].options,
            e.collection[t].$initializedEl = new Typed(i,l))
        }
    }
}/*
* HSMask Plugin
* @version: 3.0.0 (Sun, 12 June 2021)
* @requires: nouislider v15.1.1
* @author: HtmlStream
* @event-namespace: .HSNoUISlider
* @license: Htmlstream Libraries (https://htmlstream.com/)
* Copyright 2021 Htmlstream
*/
,
HSCore.components.HSNoUISlider = {
    dataAttributeName: "data-hs-nouislider-options",
    defaults: {
        connect: !0,
        result_min_target_el: null,
        result_max_target_el: null,
        foreground_target_el: null,
        tooltip: {}
    },
    collection: [],
    init(e, t, i) {
        const l = this;
        let o;
        o = e instanceof HTMLElement ? [e] : e instanceof Object ? e : document.querySelectorAll(e);
        for (let e = 0; e < o.length; e += 1)
            l.addToCollection(o[e], t, i || o[e].id);
        if (!l.collection.length)
            return !1;
        l._init()
    },
    addToCollection(e, t, i) {
        const l = this;
        this.collection.push({
            $el: e,
            id: i || null,
            options: Object.assign({}, l.defaults, e.hasAttribute(l.dataAttributeName) ? JSON.parse(e.getAttribute(l.dataAttributeName)) : {}, t)
        })
    },
    getItems() {
        const e = this;
        let t = [];
        for (let i = 0; i < e.collection.length; i += 1)
            t.push(e.collection[i].$initializedEl);
        return t
    },
    getItem(e) {
        return "number" == typeof e ? this.collection[e].$initializedEl : this.collection.find((t => t.id === e)).$initializedEl
    },
    _init() {
        const e = this;
        for (let t = 0; t < e.collection.length; t += 1) {
            let i, l;
            e.collection[t].hasOwnProperty("$initializedEl") || (i = e.collection[t].options,
            l = e.collection[t].$el,
            e.collection[t].$initializedEl = noUiSlider.create(l, i),
            e.collection[t].$initializedEl.on("update", ( () => {
                e.updateMinField(e.collection[t].$initializedEl, i),
                e.updateMaxField(e.collection[t].$initializedEl, i),
                e.updateChart(e.collection[t].$initializedEl, i)
            }
            )),
            i.showTooltips && e.showTooltips(e.collection[t].$initializedEl, i),
            i.result_min_target_el && e.resultMinTargetEl(e.collection[t].$initializedEl, i),
            i.result_max_target_el && e.resultMaxTargetEl(e.collection[t].$initializedEl, i))
        }
    },
    updateMinField: function(e, t) {
        if (t.result_min_target_el && e.get().length) {
            const i = document.querySelector(t.result_min_target_el);
            i instanceof HTMLInputElement ? i.value = typeof e.get() === Array ? parseInt(e.get()[0]) : parseInt(e.get()) : i.innerHTML = typeof e.get() === Array ? parseInt(e.get()[0]) : parseInt(e.get())
        }
    },
    updateMaxField: function(e, t) {
        if (t.result_max_target_el && e.get().length <= 2) {
            const i = document.querySelector(t.result_max_target_el);
            i instanceof HTMLInputElement ? i.value = "object" == typeof e.get() ? parseInt(e.get()[1]) : parseInt(e.get()) : i.innerHTML = "object" == typeof e.get() ? parseInt(e.get()[1]) : parseInt(e.get())
        }
    },
    updateChart: function(e, t) {
        const i = 100 * parseInt(e.get()[0]) / t.range.max
          , l = 100 * parseInt(e.get()[1]) / t.range.max;
        if (t.foreground_target_el && e.get().length <= 2) {
            var o = 100 - (i + (100 - l));
            const e = document.querySelector(t.foreground_target_el);
            e.style.left = `${i}%`,
            e.style.width = `${o}%`;
            const n = document.querySelector(t.foreground_target_el + "> *");
            n.style.width = `${e.parentElement.clientWidth}px`,
            n.style.marginLeft = -e.parentElement.clientWidth / 100 * i + "px"
        }
    },
    showTooltips: function(e, t) {
        const i = Array.from("object" == typeof e.get() ? e.get() : [!0]);
        e.updateOptions({
            tooltips: i.map((e => wNumb({
                decimals: 0,
                postfix: t.tooltip.postfix,
                prefix: t.tooltip.prefix
            })))
        })
    },
    resultMinTargetEl: function(e, t) {
        document.querySelector(t.result_min_target_el).addEventListener("change", (t => {
            e.set([t.target.value, null])
        }
        ))
    },
    resultMaxTargetEl: function(e, t) {
        document.querySelector(t.result_max_target_el).addEventListener("change", (t => {
            e.set([null, t.target.value])
        }
        ))
    }
}/*  * Circles wrapper
  * @version: 2.0.0 (Mon, 25 Nov 2019)
  * @requires: jQuery v3.0 or later, circles v0.0.6, appear.js v1.0.3
  * @author: HtmlStream
  * @event-namespace: .HSCore.components.HSCircles
  * @license: Htmlstream Libraries (https://htmlstream.com/licenses)
  * Copyright 2020 Htmlstream
  */
,
HSCore.components.HSCircles = {
    dataAttributeName: "data-hs-circles-options",
    defaults: {
        radius: 80,
        duration: 1e3,
        wrpClass: "circles-wrap",
        colors: ["#3170e5", "#e7eaf3"],
        bounds: -100,
        debounce: 10,
        rtl: !1,
        isHideValue: !1,
        dividerSpace: null,
        isViewportInit: !1,
        fgStrokeLinecap: null,
        fgStrokeMiterlimit: null,
        additionalTextType: null,
        additionalText: null,
        textFontSize: null,
        textFontWeight: null,
        textColor: null,
        secondaryText: null,
        secondaryTextFontWeight: null,
        secondaryTextFontSize: null,
        secondaryTextColor: null
    },
    collection: [],
    init(e, t, i) {
        const l = this;
        let o;
        o = e instanceof HTMLElement ? [e] : e instanceof Object ? e : document.querySelectorAll(e);
        for (let e = 0; e < o.length; e += 1)
            l.addToCollection(o[e], t, i || o[e].id);
        if (!l.collection.length)
            return !1;
        l._init()
    },
    setId: function(e, t) {
        e.setAttribute("id", t.id)
    },
    setTextStyles: function(e, t, i) {
        e.querySelectorAll('[class="' + (t.textClass || i._textClass) + '"]').forEach((e => {
            e.style.fontSize = `${t.textFontSize}px`,
            e.style.fontWeight = t.textFontWeight,
            e.style.color = t.textColor,
            e.style.lineHeight = "normal",
            e.style.height = "auto",
            e.style.top = "",
            e.style.left = ""
        }
        ))
    },
    setRtl: function(e, t) {
        e.querySelectorAll("svg").forEach((e => {
            e.style.transform = "transform"
        }
        ))
    },
    setStrokeLineCap: function(e, t, i) {
        e.querySelectorAll('[class="' + i._valClass + '"]').forEach((e => {
            e.setAttribute("stroke-linecap", t.fgStrokeLinecap)
        }
        ))
    },
    setStrokeMiterLimit: function(e, t, i) {
        e.querySelectorAll('[class="' + i._valClass + '"]').forEach((e => {
            e.setAttribute("stroke-miterlimit", t.fgStrokeMiterlimit)
        }
        ))
    },
    initAppear: function(e, t, i, l) {
        appear({
            bounds: t.bounds,
            debounce: t.debounce,
            elements: () => document.querySelectorAll("#" + t.id),
            appear: function(e) {
                i.update(JSON.parse(e.getAttribute("data-hs-circles-options")).value)
            }
        })
    },
    addToCollection(e, t, i) {
        const l = this
          , o = Object.assign({}, l.defaults, e.hasAttribute(l.dataAttributeName) ? JSON.parse(e.getAttribute(l.dataAttributeName)) : {}, t);
        this.collection.push({
            $el: e,
            options: Object.assign({}, {
                id: "circle-" + Math.random().toString().slice(2),
                value: 0,
                text: function(e) {
                    return "iconic" === o.type ? o.icon : "prefix" === o.additionalTextType ? o.secondaryText ? (o.additionalText || "") + (o.isHideValue ? "" : e) + '<div style="margin-top: ' + (o.dividerSpace / 2 + "px" || "0") + "; margin-bottom: " + (o.dividerSpace / 2 + "px" || "0") + ';"></div><div style="font-weight: ' + o.secondaryTextFontWeight + "; font-size: " + o.secondaryTextFontSize + "px; color: " + o.secondaryTextColor + ';">' + o.secondaryText + "</div>" : (o.additionalText || "") + (o.isHideValue ? "" : e) : o.secondaryText ? (o.isHideValue ? "" : e) + (o.additionalText || "") + '<div style="margin-top: ' + (o.dividerSpace / 2 + "px" || "0") + "; margin-bottom: " + (o.dividerSpace / 2 + "px" || "0") + ';"></div><div style="font-weight: ' + o.secondaryTextFontWeight + "; font-size: " + o.secondaryTextFontSize + "px; color: " + o.secondaryTextColor + ';">' + o.secondaryText + "</div>" : (o.isHideValue ? "" : e) + (o.additionalText || "")
                }
            }, o),
            id: i || null
        })
    },
    getItems() {
        const e = this;
        let t = [];
        for (let i = 0; i < e.collection.length; i += 1)
            t.push(e.collection[i].$initializedEl);
        return t
    },
    getItem(e) {
        return "number" == typeof e ? this.collection[e].$initializedEl : this.collection.find((t => t.id === e)).$initializedEl
    },
    _init() {
        const e = this;
        for (let t = 0; t < e.collection.length; t += 1) {
            let i, l;
            e.collection[t].hasOwnProperty("$initializedEl") || (i = e.collection[t].options,
            l = e.collection[t].$el,
            i.isViewportInit && (i.value = 0),
            e.setId(l, i),
            e.collection[t].$initializedEl = Circles.create(i),
            e.setTextStyles(l, i, e.collection[t].$initializedEl),
            i.rtl && e.setRtl(l, i),
            i.fgStrokeLinecap && e.setStrokeLineCap(l, i, e.collection[t].$initializedEl),
            i.fgStrokeMiterlimit && e.setStrokeMiterLimit(l, i, e.collection[t].$initializedEl),
            i.isViewportInit && e.initAppear(l, i, e.collection[t].$initializedEl))
        }
    }
},
HSCore.components.HSLeaflet = {
    init: function(e, t) {
        if (this.$el = "string" == typeof e ? document.querySelector(e) : e,
        this.$el) {
            this.defaults = {
                map: {
                    coords: [51.505, -.09],
                    zoom: 13
                },
                layer: {
                    token: "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
                    id: "mapbox/streets-v11",
                    maxZoom: 18
                },
                marker: null
            };
            var i = this.$el.hasAttribute("data-hs-leaflet-options") ? JSON.parse(this.$el.getAttribute("data-hs-leaflet-options")) : {};
            this.settings = mergeDeep(this.defaults, {
                ...t,
                ...i
            });
            var l = L.map(this.$el, this.settings.map);
            if (l.setView(this.settings.map.coords, this.settings.map.zoom),
            L.tileLayer(this.settings.layer.token, this.settings.layer).addTo(l),
            this.settings.marker)
                for (var o = 0; o < this.settings.marker.length; o++) {
                    this.settings.marker[o].icon = L.icon(this.settings.marker[o].icon);
                    let e = L.marker(this.settings.marker[o].coords, this.settings.marker[o]).addTo(l);
                    this.settings.marker[o].popup && e.bindPopup(this.settings.marker[o].popup.text)
                }
            return l
        }
    }
},
/*
* Dropzone wrapper
* @version: 3.0.1 (Wed, 28 Jul 2021)
* @requires: dropzone v5.5.0
* @author: HtmlStream
* @event-namespace: .HSCore.components.HSDropzone
* @license: Htmlstream Libraries (https://htmlstream.com/licenses)
* Copyright 2021 Htmlstream
*/
HSCore.components.HSDropzone = {
    dataAttributeName: "data-hs-dropzone-options",
    defaults: {
        url: "index.html",
        thumbnailWidth: 300,
        thumbnailHeight: 300,
        previewTemplate: '<div class="col h-100 mb-4">    <div class="dz-preview dz-file-preview">      <div class="d-flex justify-content-end dz-close-icon">        <small class="bi-x" data-dz-remove></small>      </div>      <div class="dz-details d-flex">        <div class="dz-img flex-shrink-0">         <img class="img-fluid dz-img-inner" data-dz-thumbnail>        </div>        <div class="dz-file-wrapper flex-grow-1">         <h6 class="dz-filename">          <span class="dz-title" data-dz-name></span>         </h6>         <div class="dz-size" data-dz-size></div>        </div>      </div>      <div class="dz-progress progress">        <div class="dz-upload progress-bar bg-success" role="progressbar" style="width: 0" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" data-dz-uploadprogress></div>      </div>      <div class="d-flex align-items-center">        <div class="dz-success-mark">          <span class="bi-check-lg"></span>        </div>        <div class="dz-error-mark">          <span class="bi-x-lg"></span>        </div>        <div class="dz-error-message">          <small data-dz-errormessage></small>        </div>      </div>    </div></div>'
    },
    collection: [],
    init(e, t, i) {
        const l = this;
        let o;
        o = e instanceof HTMLElement ? [e] : e instanceof Object ? e : document.querySelectorAll(e);
        for (let e = 0; e < o.length; e += 1)
            l.addToCollection(o[e], t, i || o[e].id);
        if (!l.collection.length)
            return !1;
        l._init()
    },
    addToCollection(e, t, i) {
        const l = this;
        this.collection.push({
            $el: e,
            id: i || null,
            options: Object.assign({}, l.defaults, e.hasAttribute(l.dataAttributeName) ? JSON.parse(e.getAttribute(l.dataAttributeName)) : {}, t)
        })
    },
    getItems() {
        const e = this;
        let t = [];
        for (let i = 0; i < e.collection.length; i += 1)
            t.push(e.collection[i].$initializedEl);
        return t
    },
    getItem(e) {
        return "number" == typeof e ? this.collection[e].$initializedEl : this.collection.find((t => t.id === e)).$initializedEl
    },
    _init() {
        const e = this;
        for (let t = 0; t < e.collection.length; t += 1) {
            let i, l;
            e.collection[t].hasOwnProperty("$initializedEl") || (i = e.collection[t].options,
            l = e.collection[t].$el,
            e.collection[t].$initializedEl = new Dropzone(l,i))
        }
    }
},
HSCore.components.HSChartJS = {
    init: function(e, t) {
        if (this.$el = "string" == typeof e ? document.querySelector(e) : e,
        this.$el) {
            this.defaults = {
                options: {
                    responsive: !0,
                    maintainAspectRatio: !1,
                    plugins: {
                        legend: {
                            display: !1
                        },
                        tooltip: {
                            enabled: !1,
                            mode: "nearest",
                            prefix: "",
                            postfix: "",
                            hasIndicator: !1,
                            indicatorWidth: "8px",
                            indicatorHeight: "8px",
                            transition: "0.2s",
                            lineWithLineColor: null,
                            yearStamp: !0
                        }
                    },
                    gradientPosition: {
                        x0: 0,
                        y0: 0,
                        x1: 0,
                        y1: 0
                    }
                }
            };
            var i = this.$el.hasAttribute("data-hs-chartjs-options") ? JSON.parse(this.$el.getAttribute("data-hs-chartjs-options")) : {};
            return this.settings = mergeDeep(this.defaults, {
                ...t,
                ...i
            }),
            new Chart(e,this.settings)
        }
    }
},
HSCore.components.HSList = {
    dataAttributeName: "data-hs-list-options",
    defaults: {
        searchMenu: !1,
        searchMenuDelay: 300,
        searchMenuOutsideClose: !0,
        searchMenuInsideClose: !0,
        clearSearchInput: !0,
        keyboard: !1,
        empty: !1
    },
    collection: [],
    init: function(e, t, i) {
        const l = this;
        let o;
        o = e instanceof HTMLElement ? [e] : e instanceof Object ? e : document.querySelectorAll(e);
        for (let e = 0; e < o.length; e += 1)
            l.addToCollection(o[e], t, i || o[e].id);
        return !!l.collection.length && (l._init(),
        this)
    },
    initializeHover: function(e, t, i) {
        const l = this;
        var o = e.querySelector(`.${i.searchClass}`)
          , n = !1;
        o.addEventListener("keydown", (s => {
            if (40 === s.which)
                s.preventDefault(),
                l.searchMenuShow(e, t, i),
                (a = i.list.querySelector(".active")) ? a.nextElementSibling && ((r = a.nextElementSibling).classList.add("active"),
                n.classList.remove("active"),
                n = r,
                i.list.offsetHeight < r.getBoundingClientRect().top && (i.list.scrollTop = r.getBoundingClientRect().top + i.list.scrollTop)) : (n = i.list.firstChild).classList.add("active");
            else if (38 === s.which) {
                var a, r;
                if (s.preventDefault(),
                a = i.list.querySelector(".active")) {
                    if (a.previousElementSibling)
                        (r = a.previousElementSibling).classList.add("active"),
                        n.classList.remove("active"),
                        n = r,
                        0 > r.getBoundingClientRect().top && (i.list.scrollTop = r.getBoundingClientRect().top + i.list.scrollTop - i.list.offsetHeight)
                } else
                    (n = i.list.firstChild.parentNode).classList.add("active")
            } else if (13 == s.which && o.value.length > 0) {
                s.preventDefault();
                const e = n.querySelector("a").getAttribute("href");
                e && (window.location = e)
            }
        }
        ))
    },
    searchMenu: function(e, t, i) {
        const l = this;
        if (0 === e.querySelector(`.${i.searchClass}`).value.length || 0 === i.visibleItems.length && !t.empty)
            return l.helpers.fadeOut(i.list, t.searchMenuDelay),
            l.helpers.hide(t.empty);
        l.searchMenuShow(e, t, i)
    },
    searchMenuShow: function(e, t, i) {
        const l = this;
        if (l.helpers.fadeIn(i.list, t.searchMenuDelay),
        !i.visibleItems.length) {
            var o = l.helpers.show(document.querySelector(t.empty).cloneNode(!0));
            i.list.innerHTML = o.outerHTML
        }
    },
    searchMenuHide: function(e, t, i) {
        const l = this;
        var o = e.querySelector(`.${i.searchClass}`);
        t.searchMenuOutsideClose && document.addEventListener("click", ( () => {
            l.helpers.fadeOut(i.list, t.searchMenuDelay),
            t.clearSearchInput && (o.value = "")
        }
        )),
        t.searchMenuInsideClose || i.list.addEventListener("click", (e => {
            e.stopPropagation(),
            t.clearSearchInput && o.val("")
        }
        ))
    },
    emptyBlock: function(e, t, i) {
        const l = this;
        if (0 === e.querySelector(`.${i.searchClass}`).value.length || 0 === i.visibleItems.length && !t.empty)
            l.helpers.hide(t.empty);
        else if (l.helpers.fadeIn(i.list, t.searchMenuDelay),
        !i.visibleItems.length) {
            var o = document.querySelector(t.empty).clone();
            l.helpers.show(o),
            i.list.innerHTML = o.outerHTML
        }
    },
    helpers: {
        fadeIn: (e, t) => {
            if (!e || null !== e.offsetParent)
                return e;
            e.style.opacity = 0,
            e.style.display = "block";
            var i = +new Date
              , l = function() {
                e.style.opacity = +e.style.opacity + (new Date - i) / t,
                i = +new Date,
                +e.style.opacity < 1 && (window.requestAnimationFrame && requestAnimationFrame(l) || setTimeout(l, 16))
            };
            l()
        }
        ,
        fadeOut: (e, t) => {
            if (!e || null === e.offsetParent)
                return e;
            if (!t)
                return e.style.display = "none";
            var i = setInterval((function() {
                e.style.opacity || (e.style.opacity = 1),
                e.style.opacity > 0 ? e.style.opacity -= .1 : (clearInterval(i),
                e.style.display = "none")
            }
            ), t / 10)
        }
        ,
        hide: e => ((e = "object" == typeof e ? e : document.querySelector(e)) && (e.style.display = "none"),
        e),
        show: e => ((e = "object" == typeof e ? e : document.querySelector(e)) && (e.style.display = "block"),
        e)
    },
    addToCollection(e, t, i) {
        const l = this;
        this.collection.push({
            $el: e,
            id: i || null,
            options: Object.assign({}, l.defaults, e.hasAttribute(l.dataAttributeName) ? JSON.parse(e.getAttribute(l.dataAttributeName)) : {}, t)
        })
    },
    _init() {
        const e = this;
        for (let t = 0; t < e.collection.length; t += 1) {
            let i, l;
            e.collection[t].hasOwnProperty("$initializedEl") || (i = e.collection[t].$el,
            l = e.collection[t].options,
            e.collection[t].$initializedEl = new List(i,l,l.values),
            l.searchMenu && e.helpers.hide(e.collection[t].$initializedEl.list),
            e.collection[t].$initializedEl.on("searchComplete", ( () => {
                l.searchMenu && (e.searchMenu(i, l, e.collection[t].$initializedEl),
                e.searchMenuHide(i, l, e.collection[t].$initializedEl)),
                !l.searchMenu && l.empty && e.emptyBlock(i, l, e.collection[t].$initializedEl)
            }
            )),
            l.searchMenu && l.keyboard && e.initializeHover(i, l, e.collection[t].$initializedEl))
        }
    },
    getItem(e) {
        return "number" == typeof e ? this.collection[e].$initializedEl : this.collection.find((t => t.id === e)).$initializedEl
    }
};
