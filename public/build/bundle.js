
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function exclude_internal_props(props) {
        const result = {};
        for (const k in props)
            if (k[0] !== '$')
                result[k] = props[k];
        return result;
    }
    function compute_rest_props(props, keys) {
        const rest = {};
        keys = new Set(keys);
        for (const k in props)
            if (!keys.has(k) && k[0] !== '$')
                rest[k] = props[k];
        return rest;
    }
    function null_to_empty(value) {
        return value == null ? '' : value;
    }
    function append$1(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text$1(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text$1(' ');
    }
    function empty() {
        return text$1('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr$1(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function set_attributes(node, attributes) {
        // @ts-ignore
        const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
        for (const key in attributes) {
            if (attributes[key] == null) {
                node.removeAttribute(key);
            }
            else if (key === 'style') {
                node.style.cssText = attributes[key];
            }
            else if (key === '__value') {
                node.value = node[key] = attributes[key];
            }
            else if (descriptors[key] && descriptors[key].set) {
                node[key] = attributes[key];
            }
            else {
                attr$1(node, key, attributes[key]);
            }
        }
    }
    function set_svg_attributes(node, attributes) {
        for (const key in attributes) {
            attr$1(node, key, attributes[key]);
        }
    }
    function children$1(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        if (value === null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false }) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }
    class HtmlTag {
        constructor(is_svg) {
            this.is_svg = false;
            this.is_svg = is_svg;
            this.e = this.n = null;
        }
        c(html) {
            this.h(html);
        }
        m(html, target, anchor = null) {
            if (!this.e) {
                if (this.is_svg)
                    this.e = svg_element(target.nodeName);
                else
                    this.e = element(target.nodeName);
                this.t = target;
                this.c(html);
            }
            this.i(anchor);
        }
        h(html) {
            this.e.innerHTML = html;
            this.n = Array.from(this.e.childNodes);
        }
        i(anchor) {
            for (let i = 0; i < this.n.length; i += 1) {
                insert(this.t, this.n[i], anchor);
            }
        }
        p(html) {
            this.d();
            this.h(html);
            this.i(this.a);
        }
        d() {
            this.n.forEach(detach);
        }
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function beforeUpdate(fn) {
        get_current_component().$$.before_update.push(fn);
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    function afterUpdate(fn) {
        get_current_component().$$.after_update.push(fn);
    }
    function onDestroy(fn) {
        get_current_component().$$.on_destroy.push(fn);
    }
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail, { cancelable = false } = {}) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail, { cancelable });
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
                return !event.defaultPrevented;
            }
            return true;
        };
    }
    function setContext(key, context) {
        get_current_component().$$.context.set(key, context);
        return context;
    }
    function getContext(key) {
        return get_current_component().$$.context.get(key);
    }
    // TODO figure out if we still want to support
    // shorthand events, or if we want to implement
    // a real bubbling mechanism
    function bubble(component, event) {
        const callbacks = component.$$.callbacks[event.type];
        if (callbacks) {
            // @ts-ignore
            callbacks.slice().forEach(fn => fn.call(this, event));
        }
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function tick() {
        schedule_update();
        return resolved_promise;
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update$1(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update$1($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children$1(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.48.0' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append$1(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr$1(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /**
     * @typedef {Object} WrappedComponent Object returned by the `wrap` method
     * @property {SvelteComponent} component - Component to load (this is always asynchronous)
     * @property {RoutePrecondition[]} [conditions] - Route pre-conditions to validate
     * @property {Object} [props] - Optional dictionary of static props
     * @property {Object} [userData] - Optional user data dictionary
     * @property {bool} _sveltesparouter - Internal flag; always set to true
     */

    /**
     * @callback AsyncSvelteComponent
     * @returns {Promise<SvelteComponent>} Returns a Promise that resolves with a Svelte component
     */

    /**
     * @callback RoutePrecondition
     * @param {RouteDetail} detail - Route detail object
     * @returns {boolean|Promise<boolean>} If the callback returns a false-y value, it's interpreted as the precondition failed, so it aborts loading the component (and won't process other pre-condition callbacks)
     */

    /**
     * @typedef {Object} WrapOptions Options object for the call to `wrap`
     * @property {SvelteComponent} [component] - Svelte component to load (this is incompatible with `asyncComponent`)
     * @property {AsyncSvelteComponent} [asyncComponent] - Function that returns a Promise that fulfills with a Svelte component (e.g. `{asyncComponent: () => import('Foo.svelte')}`)
     * @property {SvelteComponent} [loadingComponent] - Svelte component to be displayed while the async route is loading (as a placeholder); when unset or false-y, no component is shown while component
     * @property {object} [loadingParams] - Optional dictionary passed to the `loadingComponent` component as params (for an exported prop called `params`)
     * @property {object} [userData] - Optional object that will be passed to events such as `routeLoading`, `routeLoaded`, `conditionsFailed`
     * @property {object} [props] - Optional key-value dictionary of static props that will be passed to the component. The props are expanded with {...props}, so the key in the dictionary becomes the name of the prop.
     * @property {RoutePrecondition[]|RoutePrecondition} [conditions] - Route pre-conditions to add, which will be executed in order
     */

    /**
     * Wraps a component to enable multiple capabilities:
     * 1. Using dynamically-imported component, with (e.g. `{asyncComponent: () => import('Foo.svelte')}`), which also allows bundlers to do code-splitting.
     * 2. Adding route pre-conditions (e.g. `{conditions: [...]}`)
     * 3. Adding static props that are passed to the component
     * 4. Adding custom userData, which is passed to route events (e.g. route loaded events) or to route pre-conditions (e.g. `{userData: {foo: 'bar}}`)
     * 
     * @param {WrapOptions} args - Arguments object
     * @returns {WrappedComponent} Wrapped component
     */
    function wrap$1(args) {
        if (!args) {
            throw Error('Parameter args is required')
        }

        // We need to have one and only one of component and asyncComponent
        // This does a "XNOR"
        if (!args.component == !args.asyncComponent) {
            throw Error('One and only one of component and asyncComponent is required')
        }

        // If the component is not async, wrap it into a function returning a Promise
        if (args.component) {
            args.asyncComponent = () => Promise.resolve(args.component);
        }

        // Parameter asyncComponent and each item of conditions must be functions
        if (typeof args.asyncComponent != 'function') {
            throw Error('Parameter asyncComponent must be a function')
        }
        if (args.conditions) {
            // Ensure it's an array
            if (!Array.isArray(args.conditions)) {
                args.conditions = [args.conditions];
            }
            for (let i = 0; i < args.conditions.length; i++) {
                if (!args.conditions[i] || typeof args.conditions[i] != 'function') {
                    throw Error('Invalid parameter conditions[' + i + ']')
                }
            }
        }

        // Check if we have a placeholder component
        if (args.loadingComponent) {
            args.asyncComponent.loading = args.loadingComponent;
            args.asyncComponent.loadingParams = args.loadingParams || undefined;
        }

        // Returns an object that contains all the functions to execute too
        // The _sveltesparouter flag is to confirm the object was created by this router
        const obj = {
            component: args.asyncComponent,
            userData: args.userData,
            conditions: (args.conditions && args.conditions.length) ? args.conditions : undefined,
            props: (args.props && Object.keys(args.props).length) ? args.props : {},
            _sveltesparouter: true
        };

        return obj
    }

    const subscriber_queue = [];
    /**
     * Creates a `Readable` store that allows reading by subscription.
     * @param value initial value
     * @param {StartStopNotifier}start start and stop notifications for subscriptions
     */
    function readable(value, start) {
        return {
            subscribe: writable(value, start).subscribe
        };
    }
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }
    function derived(stores, fn, initial_value) {
        const single = !Array.isArray(stores);
        const stores_array = single
            ? [stores]
            : stores;
        const auto = fn.length < 2;
        return readable(initial_value, (set) => {
            let inited = false;
            const values = [];
            let pending = 0;
            let cleanup = noop;
            const sync = () => {
                if (pending) {
                    return;
                }
                cleanup();
                const result = fn(single ? values[0] : values, set);
                if (auto) {
                    set(result);
                }
                else {
                    cleanup = is_function(result) ? result : noop;
                }
            };
            const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
                values[i] = value;
                pending &= ~(1 << i);
                if (inited) {
                    sync();
                }
            }, () => {
                pending |= (1 << i);
            }));
            inited = true;
            sync();
            return function stop() {
                run_all(unsubscribers);
                cleanup();
            };
        });
    }

    function parse(str, loose) {
    	if (str instanceof RegExp) return { keys:false, pattern:str };
    	var c, o, tmp, ext, keys=[], pattern='', arr = str.split('/');
    	arr[0] || arr.shift();

    	while (tmp = arr.shift()) {
    		c = tmp[0];
    		if (c === '*') {
    			keys.push('wild');
    			pattern += '/(.*)';
    		} else if (c === ':') {
    			o = tmp.indexOf('?', 1);
    			ext = tmp.indexOf('.', 1);
    			keys.push( tmp.substring(1, !!~o ? o : !!~ext ? ext : tmp.length) );
    			pattern += !!~o && !~ext ? '(?:/([^/]+?))?' : '/([^/]+?)';
    			if (!!~ext) pattern += (!!~o ? '?' : '') + '\\' + tmp.substring(ext);
    		} else {
    			pattern += '/' + tmp;
    		}
    	}

    	return {
    		keys: keys,
    		pattern: new RegExp('^' + pattern + (loose ? '(?=$|\/)' : '\/?$'), 'i')
    	};
    }

    /* node_modules\svelte-spa-router\Router.svelte generated by Svelte v3.48.0 */

    const { Error: Error_1, Object: Object_1$1, console: console_1 } = globals;

    // (251:0) {:else}
    function create_else_block$2(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	const switch_instance_spread_levels = [/*props*/ ctx[2]];
    	var switch_value = /*component*/ ctx[0];

    	function switch_props(ctx) {
    		let switch_instance_props = {};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props());
    		switch_instance.$on("routeEvent", /*routeEvent_handler_1*/ ctx[7]);
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = (dirty & /*props*/ 4)
    			? get_spread_update(switch_instance_spread_levels, [get_spread_object(/*props*/ ctx[2])])
    			: {};

    			if (switch_value !== (switch_value = /*component*/ ctx[0])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props());
    					switch_instance.$on("routeEvent", /*routeEvent_handler_1*/ ctx[7]);
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$2.name,
    		type: "else",
    		source: "(251:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (244:0) {#if componentParams}
    function create_if_block$6(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	const switch_instance_spread_levels = [{ params: /*componentParams*/ ctx[1] }, /*props*/ ctx[2]];
    	var switch_value = /*component*/ ctx[0];

    	function switch_props(ctx) {
    		let switch_instance_props = {};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props());
    		switch_instance.$on("routeEvent", /*routeEvent_handler*/ ctx[6]);
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = (dirty & /*componentParams, props*/ 6)
    			? get_spread_update(switch_instance_spread_levels, [
    					dirty & /*componentParams*/ 2 && { params: /*componentParams*/ ctx[1] },
    					dirty & /*props*/ 4 && get_spread_object(/*props*/ ctx[2])
    				])
    			: {};

    			if (switch_value !== (switch_value = /*component*/ ctx[0])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props());
    					switch_instance.$on("routeEvent", /*routeEvent_handler*/ ctx[6]);
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$6.name,
    		type: "if",
    		source: "(244:0) {#if componentParams}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$Y(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$6, create_else_block$2];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*componentParams*/ ctx[1]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error_1("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$Y.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function wrap(component, userData, ...conditions) {
    	// Use the new wrap method and show a deprecation warning
    	// eslint-disable-next-line no-console
    	console.warn('Method `wrap` from `svelte-spa-router` is deprecated and will be removed in a future version. Please use `svelte-spa-router/wrap` instead. See http://bit.ly/svelte-spa-router-upgrading');

    	return wrap$1({ component, userData, conditions });
    }

    /**
     * @typedef {Object} Location
     * @property {string} location - Location (page/view), for example `/book`
     * @property {string} [querystring] - Querystring from the hash, as a string not parsed
     */
    /**
     * Returns the current location from the hash.
     *
     * @returns {Location} Location object
     * @private
     */
    function getLocation() {
    	const hashPosition = window.location.href.indexOf('#/');

    	let location = hashPosition > -1
    	? window.location.href.substr(hashPosition + 1)
    	: '/';

    	// Check if there's a querystring
    	const qsPosition = location.indexOf('?');

    	let querystring = '';

    	if (qsPosition > -1) {
    		querystring = location.substr(qsPosition + 1);
    		location = location.substr(0, qsPosition);
    	}

    	return { location, querystring };
    }

    const loc = readable(null, // eslint-disable-next-line prefer-arrow-callback
    function start(set) {
    	set(getLocation());

    	const update = () => {
    		set(getLocation());
    	};

    	window.addEventListener('hashchange', update, false);

    	return function stop() {
    		window.removeEventListener('hashchange', update, false);
    	};
    });

    const location = derived(loc, $loc => $loc.location);
    const querystring = derived(loc, $loc => $loc.querystring);
    const params = writable(undefined);

    async function push(location) {
    	if (!location || location.length < 1 || location.charAt(0) != '/' && location.indexOf('#/') !== 0) {
    		throw Error('Invalid parameter location');
    	}

    	// Execute this code when the current call stack is complete
    	await tick();

    	// Note: this will include scroll state in history even when restoreScrollState is false
    	history.replaceState(
    		{
    			...history.state,
    			__svelte_spa_router_scrollX: window.scrollX,
    			__svelte_spa_router_scrollY: window.scrollY
    		},
    		undefined,
    		undefined
    	);

    	window.location.hash = (location.charAt(0) == '#' ? '' : '#') + location;
    }

    async function pop() {
    	// Execute this code when the current call stack is complete
    	await tick();

    	window.history.back();
    }

    async function replace(location) {
    	if (!location || location.length < 1 || location.charAt(0) != '/' && location.indexOf('#/') !== 0) {
    		throw Error('Invalid parameter location');
    	}

    	// Execute this code when the current call stack is complete
    	await tick();

    	const dest = (location.charAt(0) == '#' ? '' : '#') + location;

    	try {
    		const newState = { ...history.state };
    		delete newState['__svelte_spa_router_scrollX'];
    		delete newState['__svelte_spa_router_scrollY'];
    		window.history.replaceState(newState, undefined, dest);
    	} catch(e) {
    		// eslint-disable-next-line no-console
    		console.warn('Caught exception while replacing the current page. If you\'re running this in the Svelte REPL, please note that the `replace` method might not work in this environment.');
    	}

    	// The method above doesn't trigger the hashchange event, so let's do that manually
    	window.dispatchEvent(new Event('hashchange'));
    }

    function link(node, opts) {
    	opts = linkOpts(opts);

    	// Only apply to <a> tags
    	if (!node || !node.tagName || node.tagName.toLowerCase() != 'a') {
    		throw Error('Action "link" can only be used with <a> tags');
    	}

    	updateLink(node, opts);

    	return {
    		update(updated) {
    			updated = linkOpts(updated);
    			updateLink(node, updated);
    		}
    	};
    }

    // Internal function used by the link function
    function updateLink(node, opts) {
    	let href = opts.href || node.getAttribute('href');

    	// Destination must start with '/' or '#/'
    	if (href && href.charAt(0) == '/') {
    		// Add # to the href attribute
    		href = '#' + href;
    	} else if (!href || href.length < 2 || href.slice(0, 2) != '#/') {
    		throw Error('Invalid value for "href" attribute: ' + href);
    	}

    	node.setAttribute('href', href);

    	node.addEventListener('click', event => {
    		// Prevent default anchor onclick behaviour
    		event.preventDefault();

    		if (!opts.disabled) {
    			scrollstateHistoryHandler(event.currentTarget.getAttribute('href'));
    		}
    	});
    }

    // Internal function that ensures the argument of the link action is always an object
    function linkOpts(val) {
    	if (val && typeof val == 'string') {
    		return { href: val };
    	} else {
    		return val || {};
    	}
    }

    /**
     * The handler attached to an anchor tag responsible for updating the
     * current history state with the current scroll state
     *
     * @param {string} href - Destination
     */
    function scrollstateHistoryHandler(href) {
    	// Setting the url (3rd arg) to href will break clicking for reasons, so don't try to do that
    	history.replaceState(
    		{
    			...history.state,
    			__svelte_spa_router_scrollX: window.scrollX,
    			__svelte_spa_router_scrollY: window.scrollY
    		},
    		undefined,
    		undefined
    	);

    	// This will force an update as desired, but this time our scroll state will be attached
    	window.location.hash = href;
    }

    function instance$Y($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Router', slots, []);
    	let { routes = {} } = $$props;
    	let { prefix = '' } = $$props;
    	let { restoreScrollState = false } = $$props;

    	/**
     * Container for a route: path, component
     */
    	class RouteItem {
    		/**
     * Initializes the object and creates a regular expression from the path, using regexparam.
     *
     * @param {string} path - Path to the route (must start with '/' or '*')
     * @param {SvelteComponent|WrappedComponent} component - Svelte component for the route, optionally wrapped
     */
    		constructor(path, component) {
    			if (!component || typeof component != 'function' && (typeof component != 'object' || component._sveltesparouter !== true)) {
    				throw Error('Invalid component object');
    			}

    			// Path must be a regular or expression, or a string starting with '/' or '*'
    			if (!path || typeof path == 'string' && (path.length < 1 || path.charAt(0) != '/' && path.charAt(0) != '*') || typeof path == 'object' && !(path instanceof RegExp)) {
    				throw Error('Invalid value for "path" argument - strings must start with / or *');
    			}

    			const { pattern, keys } = parse(path);
    			this.path = path;

    			// Check if the component is wrapped and we have conditions
    			if (typeof component == 'object' && component._sveltesparouter === true) {
    				this.component = component.component;
    				this.conditions = component.conditions || [];
    				this.userData = component.userData;
    				this.props = component.props || {};
    			} else {
    				// Convert the component to a function that returns a Promise, to normalize it
    				this.component = () => Promise.resolve(component);

    				this.conditions = [];
    				this.props = {};
    			}

    			this._pattern = pattern;
    			this._keys = keys;
    		}

    		/**
     * Checks if `path` matches the current route.
     * If there's a match, will return the list of parameters from the URL (if any).
     * In case of no match, the method will return `null`.
     *
     * @param {string} path - Path to test
     * @returns {null|Object.<string, string>} List of paramters from the URL if there's a match, or `null` otherwise.
     */
    		match(path) {
    			// If there's a prefix, check if it matches the start of the path.
    			// If not, bail early, else remove it before we run the matching.
    			if (prefix) {
    				if (typeof prefix == 'string') {
    					if (path.startsWith(prefix)) {
    						path = path.substr(prefix.length) || '/';
    					} else {
    						return null;
    					}
    				} else if (prefix instanceof RegExp) {
    					const match = path.match(prefix);

    					if (match && match[0]) {
    						path = path.substr(match[0].length) || '/';
    					} else {
    						return null;
    					}
    				}
    			}

    			// Check if the pattern matches
    			const matches = this._pattern.exec(path);

    			if (matches === null) {
    				return null;
    			}

    			// If the input was a regular expression, this._keys would be false, so return matches as is
    			if (this._keys === false) {
    				return matches;
    			}

    			const out = {};
    			let i = 0;

    			while (i < this._keys.length) {
    				// In the match parameters, URL-decode all values
    				try {
    					out[this._keys[i]] = decodeURIComponent(matches[i + 1] || '') || null;
    				} catch(e) {
    					out[this._keys[i]] = null;
    				}

    				i++;
    			}

    			return out;
    		}

    		/**
     * Dictionary with route details passed to the pre-conditions functions, as well as the `routeLoading`, `routeLoaded` and `conditionsFailed` events
     * @typedef {Object} RouteDetail
     * @property {string|RegExp} route - Route matched as defined in the route definition (could be a string or a reguar expression object)
     * @property {string} location - Location path
     * @property {string} querystring - Querystring from the hash
     * @property {object} [userData] - Custom data passed by the user
     * @property {SvelteComponent} [component] - Svelte component (only in `routeLoaded` events)
     * @property {string} [name] - Name of the Svelte component (only in `routeLoaded` events)
     */
    		/**
     * Executes all conditions (if any) to control whether the route can be shown. Conditions are executed in the order they are defined, and if a condition fails, the following ones aren't executed.
     * 
     * @param {RouteDetail} detail - Route detail
     * @returns {boolean} Returns true if all the conditions succeeded
     */
    		async checkConditions(detail) {
    			for (let i = 0; i < this.conditions.length; i++) {
    				if (!await this.conditions[i](detail)) {
    					return false;
    				}
    			}

    			return true;
    		}
    	}

    	// Set up all routes
    	const routesList = [];

    	if (routes instanceof Map) {
    		// If it's a map, iterate on it right away
    		routes.forEach((route, path) => {
    			routesList.push(new RouteItem(path, route));
    		});
    	} else {
    		// We have an object, so iterate on its own properties
    		Object.keys(routes).forEach(path => {
    			routesList.push(new RouteItem(path, routes[path]));
    		});
    	}

    	// Props for the component to render
    	let component = null;

    	let componentParams = null;
    	let props = {};

    	// Event dispatcher from Svelte
    	const dispatch = createEventDispatcher();

    	// Just like dispatch, but executes on the next iteration of the event loop
    	async function dispatchNextTick(name, detail) {
    		// Execute this code when the current call stack is complete
    		await tick();

    		dispatch(name, detail);
    	}

    	// If this is set, then that means we have popped into this var the state of our last scroll position
    	let previousScrollState = null;

    	let popStateChanged = null;

    	if (restoreScrollState) {
    		popStateChanged = event => {
    			// If this event was from our history.replaceState, event.state will contain
    			// our scroll history. Otherwise, event.state will be null (like on forward
    			// navigation)
    			if (event.state && event.state.__svelte_spa_router_scrollY) {
    				previousScrollState = event.state;
    			} else {
    				previousScrollState = null;
    			}
    		};

    		// This is removed in the destroy() invocation below
    		window.addEventListener('popstate', popStateChanged);

    		afterUpdate(() => {
    			// If this exists, then this is a back navigation: restore the scroll position
    			if (previousScrollState) {
    				window.scrollTo(previousScrollState.__svelte_spa_router_scrollX, previousScrollState.__svelte_spa_router_scrollY);
    			} else {
    				// Otherwise this is a forward navigation: scroll to top
    				window.scrollTo(0, 0);
    			}
    		});
    	}

    	// Always have the latest value of loc
    	let lastLoc = null;

    	// Current object of the component loaded
    	let componentObj = null;

    	// Handle hash change events
    	// Listen to changes in the $loc store and update the page
    	// Do not use the $: syntax because it gets triggered by too many things
    	const unsubscribeLoc = loc.subscribe(async newLoc => {
    		lastLoc = newLoc;

    		// Find a route matching the location
    		let i = 0;

    		while (i < routesList.length) {
    			const match = routesList[i].match(newLoc.location);

    			if (!match) {
    				i++;
    				continue;
    			}

    			const detail = {
    				route: routesList[i].path,
    				location: newLoc.location,
    				querystring: newLoc.querystring,
    				userData: routesList[i].userData,
    				params: match && typeof match == 'object' && Object.keys(match).length
    				? match
    				: null
    			};

    			// Check if the route can be loaded - if all conditions succeed
    			if (!await routesList[i].checkConditions(detail)) {
    				// Don't display anything
    				$$invalidate(0, component = null);

    				componentObj = null;

    				// Trigger an event to notify the user, then exit
    				dispatchNextTick('conditionsFailed', detail);

    				return;
    			}

    			// Trigger an event to alert that we're loading the route
    			// We need to clone the object on every event invocation so we don't risk the object to be modified in the next tick
    			dispatchNextTick('routeLoading', Object.assign({}, detail));

    			// If there's a component to show while we're loading the route, display it
    			const obj = routesList[i].component;

    			// Do not replace the component if we're loading the same one as before, to avoid the route being unmounted and re-mounted
    			if (componentObj != obj) {
    				if (obj.loading) {
    					$$invalidate(0, component = obj.loading);
    					componentObj = obj;
    					$$invalidate(1, componentParams = obj.loadingParams);
    					$$invalidate(2, props = {});

    					// Trigger the routeLoaded event for the loading component
    					// Create a copy of detail so we don't modify the object for the dynamic route (and the dynamic route doesn't modify our object too)
    					dispatchNextTick('routeLoaded', Object.assign({}, detail, {
    						component,
    						name: component.name,
    						params: componentParams
    					}));
    				} else {
    					$$invalidate(0, component = null);
    					componentObj = null;
    				}

    				// Invoke the Promise
    				const loaded = await obj();

    				// Now that we're here, after the promise resolved, check if we still want this component, as the user might have navigated to another page in the meanwhile
    				if (newLoc != lastLoc) {
    					// Don't update the component, just exit
    					return;
    				}

    				// If there is a "default" property, which is used by async routes, then pick that
    				$$invalidate(0, component = loaded && loaded.default || loaded);

    				componentObj = obj;
    			}

    			// Set componentParams only if we have a match, to avoid a warning similar to `<Component> was created with unknown prop 'params'`
    			// Of course, this assumes that developers always add a "params" prop when they are expecting parameters
    			if (match && typeof match == 'object' && Object.keys(match).length) {
    				$$invalidate(1, componentParams = match);
    			} else {
    				$$invalidate(1, componentParams = null);
    			}

    			// Set static props, if any
    			$$invalidate(2, props = routesList[i].props);

    			// Dispatch the routeLoaded event then exit
    			// We need to clone the object on every event invocation so we don't risk the object to be modified in the next tick
    			dispatchNextTick('routeLoaded', Object.assign({}, detail, {
    				component,
    				name: component.name,
    				params: componentParams
    			})).then(() => {
    				params.set(componentParams);
    			});

    			return;
    		}

    		// If we're still here, there was no match, so show the empty component
    		$$invalidate(0, component = null);

    		componentObj = null;
    		params.set(undefined);
    	});

    	onDestroy(() => {
    		unsubscribeLoc();
    		popStateChanged && window.removeEventListener('popstate', popStateChanged);
    	});

    	const writable_props = ['routes', 'prefix', 'restoreScrollState'];

    	Object_1$1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<Router> was created with unknown prop '${key}'`);
    	});

    	function routeEvent_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function routeEvent_handler_1(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$props => {
    		if ('routes' in $$props) $$invalidate(3, routes = $$props.routes);
    		if ('prefix' in $$props) $$invalidate(4, prefix = $$props.prefix);
    		if ('restoreScrollState' in $$props) $$invalidate(5, restoreScrollState = $$props.restoreScrollState);
    	};

    	$$self.$capture_state = () => ({
    		readable,
    		writable,
    		derived,
    		tick,
    		_wrap: wrap$1,
    		wrap,
    		getLocation,
    		loc,
    		location,
    		querystring,
    		params,
    		push,
    		pop,
    		replace,
    		link,
    		updateLink,
    		linkOpts,
    		scrollstateHistoryHandler,
    		onDestroy,
    		createEventDispatcher,
    		afterUpdate,
    		parse,
    		routes,
    		prefix,
    		restoreScrollState,
    		RouteItem,
    		routesList,
    		component,
    		componentParams,
    		props,
    		dispatch,
    		dispatchNextTick,
    		previousScrollState,
    		popStateChanged,
    		lastLoc,
    		componentObj,
    		unsubscribeLoc
    	});

    	$$self.$inject_state = $$props => {
    		if ('routes' in $$props) $$invalidate(3, routes = $$props.routes);
    		if ('prefix' in $$props) $$invalidate(4, prefix = $$props.prefix);
    		if ('restoreScrollState' in $$props) $$invalidate(5, restoreScrollState = $$props.restoreScrollState);
    		if ('component' in $$props) $$invalidate(0, component = $$props.component);
    		if ('componentParams' in $$props) $$invalidate(1, componentParams = $$props.componentParams);
    		if ('props' in $$props) $$invalidate(2, props = $$props.props);
    		if ('previousScrollState' in $$props) previousScrollState = $$props.previousScrollState;
    		if ('popStateChanged' in $$props) popStateChanged = $$props.popStateChanged;
    		if ('lastLoc' in $$props) lastLoc = $$props.lastLoc;
    		if ('componentObj' in $$props) componentObj = $$props.componentObj;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*restoreScrollState*/ 32) {
    			// Update history.scrollRestoration depending on restoreScrollState
    			history.scrollRestoration = restoreScrollState ? 'manual' : 'auto';
    		}
    	};

    	return [
    		component,
    		componentParams,
    		props,
    		routes,
    		prefix,
    		restoreScrollState,
    		routeEvent_handler,
    		routeEvent_handler_1
    	];
    }

    class Router extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$Y, create_fragment$Y, safe_not_equal, {
    			routes: 3,
    			prefix: 4,
    			restoreScrollState: 5
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Router",
    			options,
    			id: create_fragment$Y.name
    		});
    	}

    	get routes() {
    		throw new Error_1("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set routes(value) {
    		throw new Error_1("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get prefix() {
    		throw new Error_1("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set prefix(value) {
    		throw new Error_1("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get restoreScrollState() {
    		throw new Error_1("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set restoreScrollState(value) {
    		throw new Error_1("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules\svelte-bootstrap-icons\lib\ArrowLeft\ArrowLeft.svelte generated by Svelte v3.48.0 */

    const file$U = "node_modules\\svelte-bootstrap-icons\\lib\\ArrowLeft\\ArrowLeft.svelte";

    function create_fragment$X(ctx) {
    	let svg;
    	let path;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[2].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

    	let svg_levels = [
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		{ width: "16" },
    		{ height: "16" },
    		{ fill: "currentColor" },
    		{ viewBox: "0 0 16 16" },
    		/*$$restProps*/ ctx[0]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if (default_slot) default_slot.c();
    			path = svg_element("path");
    			attr_dev(path, "fill-rule", "evenodd");
    			attr_dev(path, "d", "M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z");
    			add_location(path, file$U, 1, 2, 291);
    			set_svg_attributes(svg, svg_data);
    			toggle_class(svg, "bi", true);
    			toggle_class(svg, "bi-arrow-left", true);
    			add_location(svg, file$U, 0, 56, 56);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);

    			if (default_slot) {
    				default_slot.m(svg, null);
    			}

    			append_dev(svg, path);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(svg, "click", /*click_handler*/ ctx[3], false, false, false),
    					listen_dev(svg, "mouseover", /*mouseover_handler*/ ctx[4], false, false, false),
    					listen_dev(svg, "mouseenter", /*mouseenter_handler*/ ctx[5], false, false, false),
    					listen_dev(svg, "mouseleave", /*mouseleave_handler*/ ctx[6], false, false, false),
    					listen_dev(svg, "keydown", /*keydown_handler*/ ctx[7], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[1],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[1], dirty, null),
    						null
    					);
    				}
    			}

    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				{ width: "16" },
    				{ height: "16" },
    				{ fill: "currentColor" },
    				{ viewBox: "0 0 16 16" },
    				dirty & /*$$restProps*/ 1 && /*$$restProps*/ ctx[0]
    			]));

    			toggle_class(svg, "bi", true);
    			toggle_class(svg, "bi-arrow-left", true);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$X.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$X($$self, $$props, $$invalidate) {
    	const omit_props_names = [];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ArrowLeft', slots, ['default']);

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseover_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseenter_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseleave_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(0, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('$$scope' in $$new_props) $$invalidate(1, $$scope = $$new_props.$$scope);
    	};

    	return [
    		$$restProps,
    		$$scope,
    		slots,
    		click_handler,
    		mouseover_handler,
    		mouseenter_handler,
    		mouseleave_handler,
    		keydown_handler
    	];
    }

    class ArrowLeft extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$X, create_fragment$X, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ArrowLeft",
    			options,
    			id: create_fragment$X.name
    		});
    	}
    }

    var ArrowLeft$1 = ArrowLeft;

    /* node_modules\svelte-bootstrap-icons\lib\ArrowUpShort\ArrowUpShort.svelte generated by Svelte v3.48.0 */

    const file$T = "node_modules\\svelte-bootstrap-icons\\lib\\ArrowUpShort\\ArrowUpShort.svelte";

    function create_fragment$W(ctx) {
    	let svg;
    	let path;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[2].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

    	let svg_levels = [
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		{ width: "16" },
    		{ height: "16" },
    		{ fill: "currentColor" },
    		{ viewBox: "0 0 16 16" },
    		/*$$restProps*/ ctx[0]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if (default_slot) default_slot.c();
    			path = svg_element("path");
    			attr_dev(path, "fill-rule", "evenodd");
    			attr_dev(path, "d", "M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z");
    			add_location(path, file$T, 1, 2, 295);
    			set_svg_attributes(svg, svg_data);
    			toggle_class(svg, "bi", true);
    			toggle_class(svg, "bi-arrow-up-short", true);
    			add_location(svg, file$T, 0, 56, 56);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);

    			if (default_slot) {
    				default_slot.m(svg, null);
    			}

    			append_dev(svg, path);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(svg, "click", /*click_handler*/ ctx[3], false, false, false),
    					listen_dev(svg, "mouseover", /*mouseover_handler*/ ctx[4], false, false, false),
    					listen_dev(svg, "mouseenter", /*mouseenter_handler*/ ctx[5], false, false, false),
    					listen_dev(svg, "mouseleave", /*mouseleave_handler*/ ctx[6], false, false, false),
    					listen_dev(svg, "keydown", /*keydown_handler*/ ctx[7], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[1],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[1], dirty, null),
    						null
    					);
    				}
    			}

    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				{ width: "16" },
    				{ height: "16" },
    				{ fill: "currentColor" },
    				{ viewBox: "0 0 16 16" },
    				dirty & /*$$restProps*/ 1 && /*$$restProps*/ ctx[0]
    			]));

    			toggle_class(svg, "bi", true);
    			toggle_class(svg, "bi-arrow-up-short", true);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$W.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$W($$self, $$props, $$invalidate) {
    	const omit_props_names = [];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ArrowUpShort', slots, ['default']);

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseover_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseenter_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseleave_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(0, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('$$scope' in $$new_props) $$invalidate(1, $$scope = $$new_props.$$scope);
    	};

    	return [
    		$$restProps,
    		$$scope,
    		slots,
    		click_handler,
    		mouseover_handler,
    		mouseenter_handler,
    		mouseleave_handler,
    		keydown_handler
    	];
    }

    class ArrowUpShort extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$W, create_fragment$W, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ArrowUpShort",
    			options,
    			id: create_fragment$W.name
    		});
    	}
    }

    var ArrowUpShort$1 = ArrowUpShort;

    /* node_modules\svelte-bootstrap-icons\lib\Binoculars\Binoculars.svelte generated by Svelte v3.48.0 */

    const file$S = "node_modules\\svelte-bootstrap-icons\\lib\\Binoculars\\Binoculars.svelte";

    function create_fragment$V(ctx) {
    	let svg;
    	let path;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[2].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

    	let svg_levels = [
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		{ width: "16" },
    		{ height: "16" },
    		{ fill: "currentColor" },
    		{ viewBox: "0 0 16 16" },
    		/*$$restProps*/ ctx[0]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if (default_slot) default_slot.c();
    			path = svg_element("path");
    			attr_dev(path, "d", "M3 2.5A1.5 1.5 0 0 1 4.5 1h1A1.5 1.5 0 0 1 7 2.5V5h2V2.5A1.5 1.5 0 0 1 10.5 1h1A1.5 1.5 0 0 1 13 2.5v2.382a.5.5 0 0 0 .276.447l.895.447A1.5 1.5 0 0 1 15 7.118V14.5a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 14.5v-3a.5.5 0 0 1 .146-.354l.854-.853V9.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v.793l.854.853A.5.5 0 0 1 7 11.5v3A1.5 1.5 0 0 1 5.5 16h-3A1.5 1.5 0 0 1 1 14.5V7.118a1.5 1.5 0 0 1 .83-1.342l.894-.447A.5.5 0 0 0 3 4.882V2.5zM4.5 2a.5.5 0 0 0-.5.5V3h2v-.5a.5.5 0 0 0-.5-.5h-1zM6 4H4v.882a1.5 1.5 0 0 1-.83 1.342l-.894.447A.5.5 0 0 0 2 7.118V13h4v-1.293l-.854-.853A.5.5 0 0 1 5 10.5v-1A1.5 1.5 0 0 1 6.5 8h3A1.5 1.5 0 0 1 11 9.5v1a.5.5 0 0 1-.146.354l-.854.853V13h4V7.118a.5.5 0 0 0-.276-.447l-.895-.447A1.5 1.5 0 0 1 12 4.882V4h-2v1.5a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V4zm4-1h2v-.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5V3zm4 11h-4v.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5V14zm-8 0H2v.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5V14z");
    			add_location(path, file$S, 1, 2, 291);
    			set_svg_attributes(svg, svg_data);
    			toggle_class(svg, "bi", true);
    			toggle_class(svg, "bi-binoculars", true);
    			add_location(svg, file$S, 0, 56, 56);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);

    			if (default_slot) {
    				default_slot.m(svg, null);
    			}

    			append_dev(svg, path);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(svg, "click", /*click_handler*/ ctx[3], false, false, false),
    					listen_dev(svg, "mouseover", /*mouseover_handler*/ ctx[4], false, false, false),
    					listen_dev(svg, "mouseenter", /*mouseenter_handler*/ ctx[5], false, false, false),
    					listen_dev(svg, "mouseleave", /*mouseleave_handler*/ ctx[6], false, false, false),
    					listen_dev(svg, "keydown", /*keydown_handler*/ ctx[7], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[1],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[1], dirty, null),
    						null
    					);
    				}
    			}

    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				{ width: "16" },
    				{ height: "16" },
    				{ fill: "currentColor" },
    				{ viewBox: "0 0 16 16" },
    				dirty & /*$$restProps*/ 1 && /*$$restProps*/ ctx[0]
    			]));

    			toggle_class(svg, "bi", true);
    			toggle_class(svg, "bi-binoculars", true);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$V.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$V($$self, $$props, $$invalidate) {
    	const omit_props_names = [];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Binoculars', slots, ['default']);

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseover_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseenter_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseleave_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(0, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('$$scope' in $$new_props) $$invalidate(1, $$scope = $$new_props.$$scope);
    	};

    	return [
    		$$restProps,
    		$$scope,
    		slots,
    		click_handler,
    		mouseover_handler,
    		mouseenter_handler,
    		mouseleave_handler,
    		keydown_handler
    	];
    }

    class Binoculars extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$V, create_fragment$V, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Binoculars",
    			options,
    			id: create_fragment$V.name
    		});
    	}
    }

    var Binoculars$1 = Binoculars;

    /* node_modules\svelte-bootstrap-icons\lib\CardChecklist\CardChecklist.svelte generated by Svelte v3.48.0 */

    const file$R = "node_modules\\svelte-bootstrap-icons\\lib\\CardChecklist\\CardChecklist.svelte";

    function create_fragment$U(ctx) {
    	let svg;
    	let path0;
    	let path1;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[2].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

    	let svg_levels = [
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		{ width: "16" },
    		{ height: "16" },
    		{ fill: "currentColor" },
    		{ viewBox: "0 0 16 16" },
    		/*$$restProps*/ ctx[0]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if (default_slot) default_slot.c();
    			path0 = svg_element("path");
    			path1 = svg_element("path");
    			attr_dev(path0, "d", "M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z");
    			add_location(path0, file$R, 1, 2, 295);
    			attr_dev(path1, "d", "M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0zM7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z");
    			add_location(path1, file$R, 2, 2, 499);
    			set_svg_attributes(svg, svg_data);
    			toggle_class(svg, "bi", true);
    			toggle_class(svg, "bi-card-checklist", true);
    			add_location(svg, file$R, 0, 56, 56);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);

    			if (default_slot) {
    				default_slot.m(svg, null);
    			}

    			append_dev(svg, path0);
    			append_dev(svg, path1);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(svg, "click", /*click_handler*/ ctx[3], false, false, false),
    					listen_dev(svg, "mouseover", /*mouseover_handler*/ ctx[4], false, false, false),
    					listen_dev(svg, "mouseenter", /*mouseenter_handler*/ ctx[5], false, false, false),
    					listen_dev(svg, "mouseleave", /*mouseleave_handler*/ ctx[6], false, false, false),
    					listen_dev(svg, "keydown", /*keydown_handler*/ ctx[7], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[1],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[1], dirty, null),
    						null
    					);
    				}
    			}

    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				{ width: "16" },
    				{ height: "16" },
    				{ fill: "currentColor" },
    				{ viewBox: "0 0 16 16" },
    				dirty & /*$$restProps*/ 1 && /*$$restProps*/ ctx[0]
    			]));

    			toggle_class(svg, "bi", true);
    			toggle_class(svg, "bi-card-checklist", true);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$U.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$U($$self, $$props, $$invalidate) {
    	const omit_props_names = [];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('CardChecklist', slots, ['default']);

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseover_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseenter_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseleave_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(0, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('$$scope' in $$new_props) $$invalidate(1, $$scope = $$new_props.$$scope);
    	};

    	return [
    		$$restProps,
    		$$scope,
    		slots,
    		click_handler,
    		mouseover_handler,
    		mouseenter_handler,
    		mouseleave_handler,
    		keydown_handler
    	];
    }

    class CardChecklist extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$U, create_fragment$U, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CardChecklist",
    			options,
    			id: create_fragment$U.name
    		});
    	}
    }

    var CardChecklist$1 = CardChecklist;

    /* node_modules\svelte-bootstrap-icons\lib\CardHeading\CardHeading.svelte generated by Svelte v3.48.0 */

    const file$Q = "node_modules\\svelte-bootstrap-icons\\lib\\CardHeading\\CardHeading.svelte";

    function create_fragment$T(ctx) {
    	let svg;
    	let path0;
    	let path1;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[2].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

    	let svg_levels = [
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		{ width: "16" },
    		{ height: "16" },
    		{ fill: "currentColor" },
    		{ viewBox: "0 0 16 16" },
    		/*$$restProps*/ ctx[0]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if (default_slot) default_slot.c();
    			path0 = svg_element("path");
    			path1 = svg_element("path");
    			attr_dev(path0, "d", "M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z");
    			add_location(path0, file$Q, 1, 2, 293);
    			attr_dev(path1, "d", "M3 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm0-5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-1z");
    			add_location(path1, file$Q, 2, 2, 497);
    			set_svg_attributes(svg, svg_data);
    			toggle_class(svg, "bi", true);
    			toggle_class(svg, "bi-card-heading", true);
    			add_location(svg, file$Q, 0, 56, 56);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);

    			if (default_slot) {
    				default_slot.m(svg, null);
    			}

    			append_dev(svg, path0);
    			append_dev(svg, path1);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(svg, "click", /*click_handler*/ ctx[3], false, false, false),
    					listen_dev(svg, "mouseover", /*mouseover_handler*/ ctx[4], false, false, false),
    					listen_dev(svg, "mouseenter", /*mouseenter_handler*/ ctx[5], false, false, false),
    					listen_dev(svg, "mouseleave", /*mouseleave_handler*/ ctx[6], false, false, false),
    					listen_dev(svg, "keydown", /*keydown_handler*/ ctx[7], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[1],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[1], dirty, null),
    						null
    					);
    				}
    			}

    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				{ width: "16" },
    				{ height: "16" },
    				{ fill: "currentColor" },
    				{ viewBox: "0 0 16 16" },
    				dirty & /*$$restProps*/ 1 && /*$$restProps*/ ctx[0]
    			]));

    			toggle_class(svg, "bi", true);
    			toggle_class(svg, "bi-card-heading", true);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$T.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$T($$self, $$props, $$invalidate) {
    	const omit_props_names = [];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('CardHeading', slots, ['default']);

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseover_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseenter_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseleave_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(0, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('$$scope' in $$new_props) $$invalidate(1, $$scope = $$new_props.$$scope);
    	};

    	return [
    		$$restProps,
    		$$scope,
    		slots,
    		click_handler,
    		mouseover_handler,
    		mouseenter_handler,
    		mouseleave_handler,
    		keydown_handler
    	];
    }

    class CardHeading extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$T, create_fragment$T, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CardHeading",
    			options,
    			id: create_fragment$T.name
    		});
    	}
    }

    var CardHeading$1 = CardHeading;

    /* node_modules\svelte-bootstrap-icons\lib\CheckLg\CheckLg.svelte generated by Svelte v3.48.0 */

    const file$P = "node_modules\\svelte-bootstrap-icons\\lib\\CheckLg\\CheckLg.svelte";

    function create_fragment$S(ctx) {
    	let svg;
    	let path;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[2].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

    	let svg_levels = [
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		{ width: "16" },
    		{ height: "16" },
    		{ fill: "currentColor" },
    		{ viewBox: "0 0 16 16" },
    		/*$$restProps*/ ctx[0]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if (default_slot) default_slot.c();
    			path = svg_element("path");
    			attr_dev(path, "d", "M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z");
    			add_location(path, file$P, 1, 2, 289);
    			set_svg_attributes(svg, svg_data);
    			toggle_class(svg, "bi", true);
    			toggle_class(svg, "bi-check-lg", true);
    			add_location(svg, file$P, 0, 56, 56);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);

    			if (default_slot) {
    				default_slot.m(svg, null);
    			}

    			append_dev(svg, path);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(svg, "click", /*click_handler*/ ctx[3], false, false, false),
    					listen_dev(svg, "mouseover", /*mouseover_handler*/ ctx[4], false, false, false),
    					listen_dev(svg, "mouseenter", /*mouseenter_handler*/ ctx[5], false, false, false),
    					listen_dev(svg, "mouseleave", /*mouseleave_handler*/ ctx[6], false, false, false),
    					listen_dev(svg, "keydown", /*keydown_handler*/ ctx[7], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[1],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[1], dirty, null),
    						null
    					);
    				}
    			}

    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				{ width: "16" },
    				{ height: "16" },
    				{ fill: "currentColor" },
    				{ viewBox: "0 0 16 16" },
    				dirty & /*$$restProps*/ 1 && /*$$restProps*/ ctx[0]
    			]));

    			toggle_class(svg, "bi", true);
    			toggle_class(svg, "bi-check-lg", true);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$S.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$S($$self, $$props, $$invalidate) {
    	const omit_props_names = [];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('CheckLg', slots, ['default']);

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseover_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseenter_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseleave_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(0, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('$$scope' in $$new_props) $$invalidate(1, $$scope = $$new_props.$$scope);
    	};

    	return [
    		$$restProps,
    		$$scope,
    		slots,
    		click_handler,
    		mouseover_handler,
    		mouseenter_handler,
    		mouseleave_handler,
    		keydown_handler
    	];
    }

    class CheckLg extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$S, create_fragment$S, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CheckLg",
    			options,
    			id: create_fragment$S.name
    		});
    	}
    }

    var CheckLg$1 = CheckLg;

    /* node_modules\svelte-bootstrap-icons\lib\ChevronDown\ChevronDown.svelte generated by Svelte v3.48.0 */

    const file$O = "node_modules\\svelte-bootstrap-icons\\lib\\ChevronDown\\ChevronDown.svelte";

    function create_fragment$R(ctx) {
    	let svg;
    	let path;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[2].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

    	let svg_levels = [
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		{ width: "16" },
    		{ height: "16" },
    		{ fill: "currentColor" },
    		{ viewBox: "0 0 16 16" },
    		/*$$restProps*/ ctx[0]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if (default_slot) default_slot.c();
    			path = svg_element("path");
    			attr_dev(path, "fill-rule", "evenodd");
    			attr_dev(path, "d", "M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z");
    			add_location(path, file$O, 1, 2, 293);
    			set_svg_attributes(svg, svg_data);
    			toggle_class(svg, "bi", true);
    			toggle_class(svg, "bi-chevron-down", true);
    			add_location(svg, file$O, 0, 56, 56);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);

    			if (default_slot) {
    				default_slot.m(svg, null);
    			}

    			append_dev(svg, path);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(svg, "click", /*click_handler*/ ctx[3], false, false, false),
    					listen_dev(svg, "mouseover", /*mouseover_handler*/ ctx[4], false, false, false),
    					listen_dev(svg, "mouseenter", /*mouseenter_handler*/ ctx[5], false, false, false),
    					listen_dev(svg, "mouseleave", /*mouseleave_handler*/ ctx[6], false, false, false),
    					listen_dev(svg, "keydown", /*keydown_handler*/ ctx[7], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[1],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[1], dirty, null),
    						null
    					);
    				}
    			}

    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				{ width: "16" },
    				{ height: "16" },
    				{ fill: "currentColor" },
    				{ viewBox: "0 0 16 16" },
    				dirty & /*$$restProps*/ 1 && /*$$restProps*/ ctx[0]
    			]));

    			toggle_class(svg, "bi", true);
    			toggle_class(svg, "bi-chevron-down", true);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$R.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$R($$self, $$props, $$invalidate) {
    	const omit_props_names = [];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ChevronDown', slots, ['default']);

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseover_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseenter_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseleave_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(0, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('$$scope' in $$new_props) $$invalidate(1, $$scope = $$new_props.$$scope);
    	};

    	return [
    		$$restProps,
    		$$scope,
    		slots,
    		click_handler,
    		mouseover_handler,
    		mouseenter_handler,
    		mouseleave_handler,
    		keydown_handler
    	];
    }

    class ChevronDown extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$R, create_fragment$R, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ChevronDown",
    			options,
    			id: create_fragment$R.name
    		});
    	}
    }

    var ChevronDown$1 = ChevronDown;

    /* node_modules\svelte-bootstrap-icons\lib\Discord\Discord.svelte generated by Svelte v3.48.0 */

    const file$N = "node_modules\\svelte-bootstrap-icons\\lib\\Discord\\Discord.svelte";

    function create_fragment$Q(ctx) {
    	let svg;
    	let path;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[2].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

    	let svg_levels = [
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		{ width: "16" },
    		{ height: "16" },
    		{ fill: "currentColor" },
    		{ viewBox: "0 0 16 16" },
    		/*$$restProps*/ ctx[0]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if (default_slot) default_slot.c();
    			path = svg_element("path");
    			attr_dev(path, "d", "M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z");
    			add_location(path, file$N, 1, 2, 288);
    			set_svg_attributes(svg, svg_data);
    			toggle_class(svg, "bi", true);
    			toggle_class(svg, "bi-discord", true);
    			add_location(svg, file$N, 0, 56, 56);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);

    			if (default_slot) {
    				default_slot.m(svg, null);
    			}

    			append_dev(svg, path);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(svg, "click", /*click_handler*/ ctx[3], false, false, false),
    					listen_dev(svg, "mouseover", /*mouseover_handler*/ ctx[4], false, false, false),
    					listen_dev(svg, "mouseenter", /*mouseenter_handler*/ ctx[5], false, false, false),
    					listen_dev(svg, "mouseleave", /*mouseleave_handler*/ ctx[6], false, false, false),
    					listen_dev(svg, "keydown", /*keydown_handler*/ ctx[7], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[1],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[1], dirty, null),
    						null
    					);
    				}
    			}

    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				{ width: "16" },
    				{ height: "16" },
    				{ fill: "currentColor" },
    				{ viewBox: "0 0 16 16" },
    				dirty & /*$$restProps*/ 1 && /*$$restProps*/ ctx[0]
    			]));

    			toggle_class(svg, "bi", true);
    			toggle_class(svg, "bi-discord", true);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$Q.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$Q($$self, $$props, $$invalidate) {
    	const omit_props_names = [];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Discord', slots, ['default']);

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseover_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseenter_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseleave_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(0, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('$$scope' in $$new_props) $$invalidate(1, $$scope = $$new_props.$$scope);
    	};

    	return [
    		$$restProps,
    		$$scope,
    		slots,
    		click_handler,
    		mouseover_handler,
    		mouseenter_handler,
    		mouseleave_handler,
    		keydown_handler
    	];
    }

    class Discord extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$Q, create_fragment$Q, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Discord",
    			options,
    			id: create_fragment$Q.name
    		});
    	}
    }

    var Discord$1 = Discord;

    /* node_modules\svelte-bootstrap-icons\lib\Easel\Easel.svelte generated by Svelte v3.48.0 */

    const file$M = "node_modules\\svelte-bootstrap-icons\\lib\\Easel\\Easel.svelte";

    function create_fragment$P(ctx) {
    	let svg;
    	let path;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[2].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

    	let svg_levels = [
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		{ width: "16" },
    		{ height: "16" },
    		{ fill: "currentColor" },
    		{ viewBox: "0 0 16 16" },
    		/*$$restProps*/ ctx[0]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if (default_slot) default_slot.c();
    			path = svg_element("path");
    			attr_dev(path, "d", "M8 0a.5.5 0 0 1 .473.337L9.046 2H14a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1.85l1.323 3.837a.5.5 0 1 1-.946.326L11.092 11H8.5v3a.5.5 0 0 1-1 0v-3H4.908l-1.435 4.163a.5.5 0 1 1-.946-.326L3.85 11H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h4.954L7.527.337A.5.5 0 0 1 8 0zM2 3v7h12V3H2z");
    			add_location(path, file$M, 1, 2, 286);
    			set_svg_attributes(svg, svg_data);
    			toggle_class(svg, "bi", true);
    			toggle_class(svg, "bi-easel", true);
    			add_location(svg, file$M, 0, 56, 56);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);

    			if (default_slot) {
    				default_slot.m(svg, null);
    			}

    			append_dev(svg, path);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(svg, "click", /*click_handler*/ ctx[3], false, false, false),
    					listen_dev(svg, "mouseover", /*mouseover_handler*/ ctx[4], false, false, false),
    					listen_dev(svg, "mouseenter", /*mouseenter_handler*/ ctx[5], false, false, false),
    					listen_dev(svg, "mouseleave", /*mouseleave_handler*/ ctx[6], false, false, false),
    					listen_dev(svg, "keydown", /*keydown_handler*/ ctx[7], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[1],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[1], dirty, null),
    						null
    					);
    				}
    			}

    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				{ width: "16" },
    				{ height: "16" },
    				{ fill: "currentColor" },
    				{ viewBox: "0 0 16 16" },
    				dirty & /*$$restProps*/ 1 && /*$$restProps*/ ctx[0]
    			]));

    			toggle_class(svg, "bi", true);
    			toggle_class(svg, "bi-easel", true);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$P.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$P($$self, $$props, $$invalidate) {
    	const omit_props_names = [];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Easel', slots, ['default']);

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseover_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseenter_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseleave_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(0, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('$$scope' in $$new_props) $$invalidate(1, $$scope = $$new_props.$$scope);
    	};

    	return [
    		$$restProps,
    		$$scope,
    		slots,
    		click_handler,
    		mouseover_handler,
    		mouseenter_handler,
    		mouseleave_handler,
    		keydown_handler
    	];
    }

    class Easel extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$P, create_fragment$P, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Easel",
    			options,
    			id: create_fragment$P.name
    		});
    	}
    }

    var Easel$1 = Easel;

    /* node_modules\svelte-bootstrap-icons\lib\Easel2\Easel2.svelte generated by Svelte v3.48.0 */

    const file$L = "node_modules\\svelte-bootstrap-icons\\lib\\Easel2\\Easel2.svelte";

    function create_fragment$O(ctx) {
    	let svg;
    	let path;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[2].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

    	let svg_levels = [
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		{ width: "16" },
    		{ height: "16" },
    		{ fill: "currentColor" },
    		{ viewBox: "0 0 16 16" },
    		/*$$restProps*/ ctx[0]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if (default_slot) default_slot.c();
    			path = svg_element("path");
    			attr_dev(path, "fill-rule", "evenodd");
    			attr_dev(path, "d", "M8 0a.5.5 0 0 1 .447.276L8.81 1h4.69A1.5 1.5 0 0 1 15 2.5V11h.5a.5.5 0 0 1 0 1h-2.86l.845 3.379a.5.5 0 0 1-.97.242L12.11 14H3.89l-.405 1.621a.5.5 0 0 1-.97-.242L3.36 12H.5a.5.5 0 0 1 0-1H1V2.5A1.5 1.5 0 0 1 2.5 1h4.691l.362-.724A.5.5 0 0 1 8 0ZM2 11h12V2.5a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5V11Zm9.61 1H4.39l-.25 1h7.72l-.25-1Z");
    			add_location(path, file$L, 1, 2, 287);
    			set_svg_attributes(svg, svg_data);
    			toggle_class(svg, "bi", true);
    			toggle_class(svg, "bi-easel2", true);
    			add_location(svg, file$L, 0, 56, 56);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);

    			if (default_slot) {
    				default_slot.m(svg, null);
    			}

    			append_dev(svg, path);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(svg, "click", /*click_handler*/ ctx[3], false, false, false),
    					listen_dev(svg, "mouseover", /*mouseover_handler*/ ctx[4], false, false, false),
    					listen_dev(svg, "mouseenter", /*mouseenter_handler*/ ctx[5], false, false, false),
    					listen_dev(svg, "mouseleave", /*mouseleave_handler*/ ctx[6], false, false, false),
    					listen_dev(svg, "keydown", /*keydown_handler*/ ctx[7], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[1],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[1], dirty, null),
    						null
    					);
    				}
    			}

    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				{ width: "16" },
    				{ height: "16" },
    				{ fill: "currentColor" },
    				{ viewBox: "0 0 16 16" },
    				dirty & /*$$restProps*/ 1 && /*$$restProps*/ ctx[0]
    			]));

    			toggle_class(svg, "bi", true);
    			toggle_class(svg, "bi-easel2", true);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$O.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$O($$self, $$props, $$invalidate) {
    	const omit_props_names = [];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Easel2', slots, ['default']);

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseover_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseenter_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseleave_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(0, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('$$scope' in $$new_props) $$invalidate(1, $$scope = $$new_props.$$scope);
    	};

    	return [
    		$$restProps,
    		$$scope,
    		slots,
    		click_handler,
    		mouseover_handler,
    		mouseenter_handler,
    		mouseleave_handler,
    		keydown_handler
    	];
    }

    class Easel2 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$O, create_fragment$O, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Easel2",
    			options,
    			id: create_fragment$O.name
    		});
    	}
    }

    var Easel2$1 = Easel2;

    /* node_modules\svelte-bootstrap-icons\lib\Envelope\Envelope.svelte generated by Svelte v3.48.0 */

    const file$K = "node_modules\\svelte-bootstrap-icons\\lib\\Envelope\\Envelope.svelte";

    function create_fragment$N(ctx) {
    	let svg;
    	let path;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[2].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

    	let svg_levels = [
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		{ width: "16" },
    		{ height: "16" },
    		{ fill: "currentColor" },
    		{ viewBox: "0 0 16 16" },
    		/*$$restProps*/ ctx[0]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if (default_slot) default_slot.c();
    			path = svg_element("path");
    			attr_dev(path, "d", "M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z");
    			add_location(path, file$K, 1, 2, 289);
    			set_svg_attributes(svg, svg_data);
    			toggle_class(svg, "bi", true);
    			toggle_class(svg, "bi-envelope", true);
    			add_location(svg, file$K, 0, 56, 56);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);

    			if (default_slot) {
    				default_slot.m(svg, null);
    			}

    			append_dev(svg, path);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(svg, "click", /*click_handler*/ ctx[3], false, false, false),
    					listen_dev(svg, "mouseover", /*mouseover_handler*/ ctx[4], false, false, false),
    					listen_dev(svg, "mouseenter", /*mouseenter_handler*/ ctx[5], false, false, false),
    					listen_dev(svg, "mouseleave", /*mouseleave_handler*/ ctx[6], false, false, false),
    					listen_dev(svg, "keydown", /*keydown_handler*/ ctx[7], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[1],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[1], dirty, null),
    						null
    					);
    				}
    			}

    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				{ width: "16" },
    				{ height: "16" },
    				{ fill: "currentColor" },
    				{ viewBox: "0 0 16 16" },
    				dirty & /*$$restProps*/ 1 && /*$$restProps*/ ctx[0]
    			]));

    			toggle_class(svg, "bi", true);
    			toggle_class(svg, "bi-envelope", true);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$N.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$N($$self, $$props, $$invalidate) {
    	const omit_props_names = [];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Envelope', slots, ['default']);

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseover_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseenter_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseleave_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(0, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('$$scope' in $$new_props) $$invalidate(1, $$scope = $$new_props.$$scope);
    	};

    	return [
    		$$restProps,
    		$$scope,
    		slots,
    		click_handler,
    		mouseover_handler,
    		mouseenter_handler,
    		mouseleave_handler,
    		keydown_handler
    	];
    }

    class Envelope extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$N, create_fragment$N, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Envelope",
    			options,
    			id: create_fragment$N.name
    		});
    	}
    }

    var Envelope$1 = Envelope;

    /* node_modules\svelte-bootstrap-icons\lib\Facebook\Facebook.svelte generated by Svelte v3.48.0 */

    const file$J = "node_modules\\svelte-bootstrap-icons\\lib\\Facebook\\Facebook.svelte";

    function create_fragment$M(ctx) {
    	let svg;
    	let path;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[2].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

    	let svg_levels = [
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		{ width: "16" },
    		{ height: "16" },
    		{ fill: "currentColor" },
    		{ viewBox: "0 0 16 16" },
    		/*$$restProps*/ ctx[0]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if (default_slot) default_slot.c();
    			path = svg_element("path");
    			attr_dev(path, "d", "M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z");
    			add_location(path, file$J, 1, 2, 289);
    			set_svg_attributes(svg, svg_data);
    			toggle_class(svg, "bi", true);
    			toggle_class(svg, "bi-facebook", true);
    			add_location(svg, file$J, 0, 56, 56);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);

    			if (default_slot) {
    				default_slot.m(svg, null);
    			}

    			append_dev(svg, path);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(svg, "click", /*click_handler*/ ctx[3], false, false, false),
    					listen_dev(svg, "mouseover", /*mouseover_handler*/ ctx[4], false, false, false),
    					listen_dev(svg, "mouseenter", /*mouseenter_handler*/ ctx[5], false, false, false),
    					listen_dev(svg, "mouseleave", /*mouseleave_handler*/ ctx[6], false, false, false),
    					listen_dev(svg, "keydown", /*keydown_handler*/ ctx[7], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[1],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[1], dirty, null),
    						null
    					);
    				}
    			}

    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				{ width: "16" },
    				{ height: "16" },
    				{ fill: "currentColor" },
    				{ viewBox: "0 0 16 16" },
    				dirty & /*$$restProps*/ 1 && /*$$restProps*/ ctx[0]
    			]));

    			toggle_class(svg, "bi", true);
    			toggle_class(svg, "bi-facebook", true);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$M.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$M($$self, $$props, $$invalidate) {
    	const omit_props_names = [];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Facebook', slots, ['default']);

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseover_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseenter_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseleave_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(0, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('$$scope' in $$new_props) $$invalidate(1, $$scope = $$new_props.$$scope);
    	};

    	return [
    		$$restProps,
    		$$scope,
    		slots,
    		click_handler,
    		mouseover_handler,
    		mouseenter_handler,
    		mouseleave_handler,
    		keydown_handler
    	];
    }

    class Facebook extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$M, create_fragment$M, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Facebook",
    			options,
    			id: create_fragment$M.name
    		});
    	}
    }

    var Facebook$1 = Facebook;

    /* node_modules\svelte-bootstrap-icons\lib\Globe\Globe.svelte generated by Svelte v3.48.0 */

    const file$I = "node_modules\\svelte-bootstrap-icons\\lib\\Globe\\Globe.svelte";

    function create_fragment$L(ctx) {
    	let svg;
    	let path;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[2].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

    	let svg_levels = [
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		{ width: "16" },
    		{ height: "16" },
    		{ fill: "currentColor" },
    		{ viewBox: "0 0 16 16" },
    		/*$$restProps*/ ctx[0]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if (default_slot) default_slot.c();
    			path = svg_element("path");
    			attr_dev(path, "d", "M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z");
    			add_location(path, file$I, 1, 2, 286);
    			set_svg_attributes(svg, svg_data);
    			toggle_class(svg, "bi", true);
    			toggle_class(svg, "bi-globe", true);
    			add_location(svg, file$I, 0, 56, 56);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);

    			if (default_slot) {
    				default_slot.m(svg, null);
    			}

    			append_dev(svg, path);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(svg, "click", /*click_handler*/ ctx[3], false, false, false),
    					listen_dev(svg, "mouseover", /*mouseover_handler*/ ctx[4], false, false, false),
    					listen_dev(svg, "mouseenter", /*mouseenter_handler*/ ctx[5], false, false, false),
    					listen_dev(svg, "mouseleave", /*mouseleave_handler*/ ctx[6], false, false, false),
    					listen_dev(svg, "keydown", /*keydown_handler*/ ctx[7], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[1],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[1], dirty, null),
    						null
    					);
    				}
    			}

    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				{ width: "16" },
    				{ height: "16" },
    				{ fill: "currentColor" },
    				{ viewBox: "0 0 16 16" },
    				dirty & /*$$restProps*/ 1 && /*$$restProps*/ ctx[0]
    			]));

    			toggle_class(svg, "bi", true);
    			toggle_class(svg, "bi-globe", true);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$L.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$L($$self, $$props, $$invalidate) {
    	const omit_props_names = [];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Globe', slots, ['default']);

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseover_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseenter_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseleave_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(0, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('$$scope' in $$new_props) $$invalidate(1, $$scope = $$new_props.$$scope);
    	};

    	return [
    		$$restProps,
    		$$scope,
    		slots,
    		click_handler,
    		mouseover_handler,
    		mouseenter_handler,
    		mouseleave_handler,
    		keydown_handler
    	];
    }

    class Globe extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$L, create_fragment$L, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Globe",
    			options,
    			id: create_fragment$L.name
    		});
    	}
    }

    var Globe$1 = Globe;

    /* node_modules\svelte-bootstrap-icons\lib\Instagram\Instagram.svelte generated by Svelte v3.48.0 */

    const file$H = "node_modules\\svelte-bootstrap-icons\\lib\\Instagram\\Instagram.svelte";

    function create_fragment$K(ctx) {
    	let svg;
    	let path;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[2].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

    	let svg_levels = [
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		{ width: "16" },
    		{ height: "16" },
    		{ fill: "currentColor" },
    		{ viewBox: "0 0 16 16" },
    		/*$$restProps*/ ctx[0]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if (default_slot) default_slot.c();
    			path = svg_element("path");
    			attr_dev(path, "d", "M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z");
    			add_location(path, file$H, 1, 2, 290);
    			set_svg_attributes(svg, svg_data);
    			toggle_class(svg, "bi", true);
    			toggle_class(svg, "bi-instagram", true);
    			add_location(svg, file$H, 0, 56, 56);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);

    			if (default_slot) {
    				default_slot.m(svg, null);
    			}

    			append_dev(svg, path);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(svg, "click", /*click_handler*/ ctx[3], false, false, false),
    					listen_dev(svg, "mouseover", /*mouseover_handler*/ ctx[4], false, false, false),
    					listen_dev(svg, "mouseenter", /*mouseenter_handler*/ ctx[5], false, false, false),
    					listen_dev(svg, "mouseleave", /*mouseleave_handler*/ ctx[6], false, false, false),
    					listen_dev(svg, "keydown", /*keydown_handler*/ ctx[7], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[1],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[1], dirty, null),
    						null
    					);
    				}
    			}

    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				{ width: "16" },
    				{ height: "16" },
    				{ fill: "currentColor" },
    				{ viewBox: "0 0 16 16" },
    				dirty & /*$$restProps*/ 1 && /*$$restProps*/ ctx[0]
    			]));

    			toggle_class(svg, "bi", true);
    			toggle_class(svg, "bi-instagram", true);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$K.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$K($$self, $$props, $$invalidate) {
    	const omit_props_names = [];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Instagram', slots, ['default']);

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseover_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseenter_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseleave_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(0, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('$$scope' in $$new_props) $$invalidate(1, $$scope = $$new_props.$$scope);
    	};

    	return [
    		$$restProps,
    		$$scope,
    		slots,
    		click_handler,
    		mouseover_handler,
    		mouseenter_handler,
    		mouseleave_handler,
    		keydown_handler
    	];
    }

    class Instagram extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$K, create_fragment$K, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Instagram",
    			options,
    			id: create_fragment$K.name
    		});
    	}
    }

    var Instagram$1 = Instagram;

    /* node_modules\svelte-bootstrap-icons\lib\JournalAlbum\JournalAlbum.svelte generated by Svelte v3.48.0 */

    const file$G = "node_modules\\svelte-bootstrap-icons\\lib\\JournalAlbum\\JournalAlbum.svelte";

    function create_fragment$J(ctx) {
    	let svg;
    	let path0;
    	let path1;
    	let path2;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[2].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

    	let svg_levels = [
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		{ width: "16" },
    		{ height: "16" },
    		{ fill: "currentColor" },
    		{ viewBox: "0 0 16 16" },
    		/*$$restProps*/ ctx[0]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if (default_slot) default_slot.c();
    			path0 = svg_element("path");
    			path1 = svg_element("path");
    			path2 = svg_element("path");
    			attr_dev(path0, "d", "M5.5 4a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5v-5a.5.5 0 0 0-.5-.5h-5zm1 7a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3z");
    			add_location(path0, file$G, 1, 2, 294);
    			attr_dev(path1, "d", "M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z");
    			add_location(path1, file$G, 2, 2, 432);
    			attr_dev(path2, "d", "M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z");
    			add_location(path2, file$G, 3, 2, 592);
    			set_svg_attributes(svg, svg_data);
    			toggle_class(svg, "bi", true);
    			toggle_class(svg, "bi-journal-album", true);
    			add_location(svg, file$G, 0, 56, 56);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);

    			if (default_slot) {
    				default_slot.m(svg, null);
    			}

    			append_dev(svg, path0);
    			append_dev(svg, path1);
    			append_dev(svg, path2);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(svg, "click", /*click_handler*/ ctx[3], false, false, false),
    					listen_dev(svg, "mouseover", /*mouseover_handler*/ ctx[4], false, false, false),
    					listen_dev(svg, "mouseenter", /*mouseenter_handler*/ ctx[5], false, false, false),
    					listen_dev(svg, "mouseleave", /*mouseleave_handler*/ ctx[6], false, false, false),
    					listen_dev(svg, "keydown", /*keydown_handler*/ ctx[7], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[1],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[1], dirty, null),
    						null
    					);
    				}
    			}

    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				{ width: "16" },
    				{ height: "16" },
    				{ fill: "currentColor" },
    				{ viewBox: "0 0 16 16" },
    				dirty & /*$$restProps*/ 1 && /*$$restProps*/ ctx[0]
    			]));

    			toggle_class(svg, "bi", true);
    			toggle_class(svg, "bi-journal-album", true);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$J.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$J($$self, $$props, $$invalidate) {
    	const omit_props_names = [];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('JournalAlbum', slots, ['default']);

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseover_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseenter_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseleave_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(0, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('$$scope' in $$new_props) $$invalidate(1, $$scope = $$new_props.$$scope);
    	};

    	return [
    		$$restProps,
    		$$scope,
    		slots,
    		click_handler,
    		mouseover_handler,
    		mouseenter_handler,
    		mouseleave_handler,
    		keydown_handler
    	];
    }

    class JournalAlbum extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$J, create_fragment$J, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "JournalAlbum",
    			options,
    			id: create_fragment$J.name
    		});
    	}
    }

    var JournalAlbum$1 = JournalAlbum;

    /* node_modules\svelte-bootstrap-icons\lib\Line\Line.svelte generated by Svelte v3.48.0 */

    const file$F = "node_modules\\svelte-bootstrap-icons\\lib\\Line\\Line.svelte";

    function create_fragment$I(ctx) {
    	let svg;
    	let path;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[2].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

    	let svg_levels = [
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		{ width: "16" },
    		{ height: "16" },
    		{ fill: "currentColor" },
    		{ viewBox: "0 0 16 16" },
    		/*$$restProps*/ ctx[0]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if (default_slot) default_slot.c();
    			path = svg_element("path");
    			attr_dev(path, "d", "M8 0c4.411 0 8 2.912 8 6.492 0 1.433-.555 2.723-1.715 3.994-1.678 1.932-5.431 4.285-6.285 4.645-.83.35-.734-.197-.696-.413l.003-.018.114-.685c.027-.204.055-.521-.026-.723-.09-.223-.444-.339-.704-.395C2.846 12.39 0 9.701 0 6.492 0 2.912 3.59 0 8 0ZM5.022 7.686H3.497V4.918a.156.156 0 0 0-.155-.156H2.78a.156.156 0 0 0-.156.156v3.486c0 .041.017.08.044.107v.001l.002.002.002.002a.154.154 0 0 0 .108.043h2.242c.086 0 .155-.07.155-.156v-.56a.156.156 0 0 0-.155-.157Zm.791-2.924a.156.156 0 0 0-.156.156v3.486c0 .086.07.155.156.155h.562c.086 0 .155-.07.155-.155V4.918a.156.156 0 0 0-.155-.156h-.562Zm3.863 0a.156.156 0 0 0-.156.156v2.07L7.923 4.832a.17.17 0 0 0-.013-.015v-.001a.139.139 0 0 0-.01-.01l-.003-.003a.092.092 0 0 0-.011-.009h-.001L7.88 4.79l-.003-.002a.029.029 0 0 0-.005-.003l-.008-.005h-.002l-.003-.002-.01-.004-.004-.002a.093.093 0 0 0-.01-.003h-.002l-.003-.001-.009-.002h-.006l-.003-.001h-.004l-.002-.001h-.574a.156.156 0 0 0-.156.155v3.486c0 .086.07.155.156.155h.56c.087 0 .157-.07.157-.155v-2.07l1.6 2.16a.154.154 0 0 0 .039.038l.001.001.01.006.004.002a.066.066 0 0 0 .008.004l.007.003.005.002a.168.168 0 0 0 .01.003h.003a.155.155 0 0 0 .04.006h.56c.087 0 .157-.07.157-.155V4.918a.156.156 0 0 0-.156-.156h-.561Zm3.815.717v-.56a.156.156 0 0 0-.155-.157h-2.242a.155.155 0 0 0-.108.044h-.001l-.001.002-.002.003a.155.155 0 0 0-.044.107v3.486c0 .041.017.08.044.107l.002.003.002.002a.155.155 0 0 0 .108.043h2.242c.086 0 .155-.07.155-.156v-.56a.156.156 0 0 0-.155-.157H11.81v-.589h1.525c.086 0 .155-.07.155-.156v-.56a.156.156 0 0 0-.155-.157H11.81v-.589h1.525c.086 0 .155-.07.155-.156Z");
    			add_location(path, file$F, 1, 2, 285);
    			set_svg_attributes(svg, svg_data);
    			toggle_class(svg, "bi", true);
    			toggle_class(svg, "bi-line", true);
    			add_location(svg, file$F, 0, 56, 56);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);

    			if (default_slot) {
    				default_slot.m(svg, null);
    			}

    			append_dev(svg, path);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(svg, "click", /*click_handler*/ ctx[3], false, false, false),
    					listen_dev(svg, "mouseover", /*mouseover_handler*/ ctx[4], false, false, false),
    					listen_dev(svg, "mouseenter", /*mouseenter_handler*/ ctx[5], false, false, false),
    					listen_dev(svg, "mouseleave", /*mouseleave_handler*/ ctx[6], false, false, false),
    					listen_dev(svg, "keydown", /*keydown_handler*/ ctx[7], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[1],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[1], dirty, null),
    						null
    					);
    				}
    			}

    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				{ width: "16" },
    				{ height: "16" },
    				{ fill: "currentColor" },
    				{ viewBox: "0 0 16 16" },
    				dirty & /*$$restProps*/ 1 && /*$$restProps*/ ctx[0]
    			]));

    			toggle_class(svg, "bi", true);
    			toggle_class(svg, "bi-line", true);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$I.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$I($$self, $$props, $$invalidate) {
    	const omit_props_names = [];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Line', slots, ['default']);

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseover_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseenter_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseleave_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(0, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('$$scope' in $$new_props) $$invalidate(1, $$scope = $$new_props.$$scope);
    	};

    	return [
    		$$restProps,
    		$$scope,
    		slots,
    		click_handler,
    		mouseover_handler,
    		mouseenter_handler,
    		mouseleave_handler,
    		keydown_handler
    	];
    }

    class Line extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$I, create_fragment$I, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Line",
    			options,
    			id: create_fragment$I.name
    		});
    	}
    }

    var Line$1 = Line;

    /* node_modules\svelte-bootstrap-icons\lib\Linkedin\Linkedin.svelte generated by Svelte v3.48.0 */

    const file$E = "node_modules\\svelte-bootstrap-icons\\lib\\Linkedin\\Linkedin.svelte";

    function create_fragment$H(ctx) {
    	let svg;
    	let path;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[2].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

    	let svg_levels = [
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		{ width: "16" },
    		{ height: "16" },
    		{ fill: "currentColor" },
    		{ viewBox: "0 0 16 16" },
    		/*$$restProps*/ ctx[0]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if (default_slot) default_slot.c();
    			path = svg_element("path");
    			attr_dev(path, "d", "M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z");
    			add_location(path, file$E, 1, 2, 289);
    			set_svg_attributes(svg, svg_data);
    			toggle_class(svg, "bi", true);
    			toggle_class(svg, "bi-linkedin", true);
    			add_location(svg, file$E, 0, 56, 56);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);

    			if (default_slot) {
    				default_slot.m(svg, null);
    			}

    			append_dev(svg, path);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(svg, "click", /*click_handler*/ ctx[3], false, false, false),
    					listen_dev(svg, "mouseover", /*mouseover_handler*/ ctx[4], false, false, false),
    					listen_dev(svg, "mouseenter", /*mouseenter_handler*/ ctx[5], false, false, false),
    					listen_dev(svg, "mouseleave", /*mouseleave_handler*/ ctx[6], false, false, false),
    					listen_dev(svg, "keydown", /*keydown_handler*/ ctx[7], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[1],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[1], dirty, null),
    						null
    					);
    				}
    			}

    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				{ width: "16" },
    				{ height: "16" },
    				{ fill: "currentColor" },
    				{ viewBox: "0 0 16 16" },
    				dirty & /*$$restProps*/ 1 && /*$$restProps*/ ctx[0]
    			]));

    			toggle_class(svg, "bi", true);
    			toggle_class(svg, "bi-linkedin", true);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$H.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$H($$self, $$props, $$invalidate) {
    	const omit_props_names = [];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Linkedin', slots, ['default']);

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseover_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseenter_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseleave_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(0, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('$$scope' in $$new_props) $$invalidate(1, $$scope = $$new_props.$$scope);
    	};

    	return [
    		$$restProps,
    		$$scope,
    		slots,
    		click_handler,
    		mouseover_handler,
    		mouseenter_handler,
    		mouseleave_handler,
    		keydown_handler
    	];
    }

    class Linkedin extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$H, create_fragment$H, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Linkedin",
    			options,
    			id: create_fragment$H.name
    		});
    	}
    }

    var Linkedin$1 = Linkedin;

    /* node_modules\svelte-bootstrap-icons\lib\List\List.svelte generated by Svelte v3.48.0 */

    const file$D = "node_modules\\svelte-bootstrap-icons\\lib\\List\\List.svelte";

    function create_fragment$G(ctx) {
    	let svg;
    	let path;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[2].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

    	let svg_levels = [
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		{ width: "16" },
    		{ height: "16" },
    		{ fill: "currentColor" },
    		{ viewBox: "0 0 16 16" },
    		/*$$restProps*/ ctx[0]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if (default_slot) default_slot.c();
    			path = svg_element("path");
    			attr_dev(path, "fill-rule", "evenodd");
    			attr_dev(path, "d", "M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z");
    			add_location(path, file$D, 1, 2, 285);
    			set_svg_attributes(svg, svg_data);
    			toggle_class(svg, "bi", true);
    			toggle_class(svg, "bi-list", true);
    			add_location(svg, file$D, 0, 56, 56);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);

    			if (default_slot) {
    				default_slot.m(svg, null);
    			}

    			append_dev(svg, path);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(svg, "click", /*click_handler*/ ctx[3], false, false, false),
    					listen_dev(svg, "mouseover", /*mouseover_handler*/ ctx[4], false, false, false),
    					listen_dev(svg, "mouseenter", /*mouseenter_handler*/ ctx[5], false, false, false),
    					listen_dev(svg, "mouseleave", /*mouseleave_handler*/ ctx[6], false, false, false),
    					listen_dev(svg, "keydown", /*keydown_handler*/ ctx[7], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[1],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[1], dirty, null),
    						null
    					);
    				}
    			}

    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				{ width: "16" },
    				{ height: "16" },
    				{ fill: "currentColor" },
    				{ viewBox: "0 0 16 16" },
    				dirty & /*$$restProps*/ 1 && /*$$restProps*/ ctx[0]
    			]));

    			toggle_class(svg, "bi", true);
    			toggle_class(svg, "bi-list", true);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$G.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$G($$self, $$props, $$invalidate) {
    	const omit_props_names = [];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('List', slots, ['default']);

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseover_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseenter_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseleave_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(0, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('$$scope' in $$new_props) $$invalidate(1, $$scope = $$new_props.$$scope);
    	};

    	return [
    		$$restProps,
    		$$scope,
    		slots,
    		click_handler,
    		mouseover_handler,
    		mouseenter_handler,
    		mouseleave_handler,
    		keydown_handler
    	];
    }

    class List extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$G, create_fragment$G, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "List",
    			options,
    			id: create_fragment$G.name
    		});
    	}
    }

    var List$1 = List;

    /* node_modules\svelte-bootstrap-icons\lib\Mortarboard\Mortarboard.svelte generated by Svelte v3.48.0 */

    const file$C = "node_modules\\svelte-bootstrap-icons\\lib\\Mortarboard\\Mortarboard.svelte";

    function create_fragment$F(ctx) {
    	let svg;
    	let path0;
    	let path1;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[2].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

    	let svg_levels = [
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		{ width: "16" },
    		{ height: "16" },
    		{ fill: "currentColor" },
    		{ viewBox: "0 0 16 16" },
    		/*$$restProps*/ ctx[0]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if (default_slot) default_slot.c();
    			path0 = svg_element("path");
    			path1 = svg_element("path");
    			attr_dev(path0, "d", "M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917l-7.5-3.5ZM8 8.46 1.758 5.965 8 3.052l6.242 2.913L8 8.46Z");
    			add_location(path0, file$C, 1, 2, 292);
    			attr_dev(path1, "d", "M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466 4.176 9.032Zm-.068 1.873.22-.748 3.496 1.311a.5.5 0 0 0 .352 0l3.496-1.311.22.748L8 12.46l-3.892-1.556Z");
    			add_location(path1, file$C, 2, 2, 530);
    			set_svg_attributes(svg, svg_data);
    			toggle_class(svg, "bi", true);
    			toggle_class(svg, "bi-mortarboard", true);
    			add_location(svg, file$C, 0, 56, 56);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);

    			if (default_slot) {
    				default_slot.m(svg, null);
    			}

    			append_dev(svg, path0);
    			append_dev(svg, path1);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(svg, "click", /*click_handler*/ ctx[3], false, false, false),
    					listen_dev(svg, "mouseover", /*mouseover_handler*/ ctx[4], false, false, false),
    					listen_dev(svg, "mouseenter", /*mouseenter_handler*/ ctx[5], false, false, false),
    					listen_dev(svg, "mouseleave", /*mouseleave_handler*/ ctx[6], false, false, false),
    					listen_dev(svg, "keydown", /*keydown_handler*/ ctx[7], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[1],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[1], dirty, null),
    						null
    					);
    				}
    			}

    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				{ width: "16" },
    				{ height: "16" },
    				{ fill: "currentColor" },
    				{ viewBox: "0 0 16 16" },
    				dirty & /*$$restProps*/ 1 && /*$$restProps*/ ctx[0]
    			]));

    			toggle_class(svg, "bi", true);
    			toggle_class(svg, "bi-mortarboard", true);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$F.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$F($$self, $$props, $$invalidate) {
    	const omit_props_names = [];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Mortarboard', slots, ['default']);

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseover_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseenter_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseleave_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(0, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('$$scope' in $$new_props) $$invalidate(1, $$scope = $$new_props.$$scope);
    	};

    	return [
    		$$restProps,
    		$$scope,
    		slots,
    		click_handler,
    		mouseover_handler,
    		mouseenter_handler,
    		mouseleave_handler,
    		keydown_handler
    	];
    }

    class Mortarboard extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$F, create_fragment$F, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Mortarboard",
    			options,
    			id: create_fragment$F.name
    		});
    	}
    }

    var Mortarboard$1 = Mortarboard;

    /* node_modules\svelte-bootstrap-icons\lib\People\People.svelte generated by Svelte v3.48.0 */

    const file$B = "node_modules\\svelte-bootstrap-icons\\lib\\People\\People.svelte";

    function create_fragment$E(ctx) {
    	let svg;
    	let path;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[2].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

    	let svg_levels = [
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		{ width: "16" },
    		{ height: "16" },
    		{ fill: "currentColor" },
    		{ viewBox: "0 0 16 16" },
    		/*$$restProps*/ ctx[0]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if (default_slot) default_slot.c();
    			path = svg_element("path");
    			attr_dev(path, "d", "M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z");
    			add_location(path, file$B, 1, 2, 287);
    			set_svg_attributes(svg, svg_data);
    			toggle_class(svg, "bi", true);
    			toggle_class(svg, "bi-people", true);
    			add_location(svg, file$B, 0, 56, 56);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);

    			if (default_slot) {
    				default_slot.m(svg, null);
    			}

    			append_dev(svg, path);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(svg, "click", /*click_handler*/ ctx[3], false, false, false),
    					listen_dev(svg, "mouseover", /*mouseover_handler*/ ctx[4], false, false, false),
    					listen_dev(svg, "mouseenter", /*mouseenter_handler*/ ctx[5], false, false, false),
    					listen_dev(svg, "mouseleave", /*mouseleave_handler*/ ctx[6], false, false, false),
    					listen_dev(svg, "keydown", /*keydown_handler*/ ctx[7], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[1],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[1], dirty, null),
    						null
    					);
    				}
    			}

    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				{ width: "16" },
    				{ height: "16" },
    				{ fill: "currentColor" },
    				{ viewBox: "0 0 16 16" },
    				dirty & /*$$restProps*/ 1 && /*$$restProps*/ ctx[0]
    			]));

    			toggle_class(svg, "bi", true);
    			toggle_class(svg, "bi-people", true);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$E.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$E($$self, $$props, $$invalidate) {
    	const omit_props_names = [];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('People', slots, ['default']);

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseover_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseenter_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseleave_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(0, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('$$scope' in $$new_props) $$invalidate(1, $$scope = $$new_props.$$scope);
    	};

    	return [
    		$$restProps,
    		$$scope,
    		slots,
    		click_handler,
    		mouseover_handler,
    		mouseenter_handler,
    		mouseleave_handler,
    		keydown_handler
    	];
    }

    class People extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$E, create_fragment$E, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "People",
    			options,
    			id: create_fragment$E.name
    		});
    	}
    }

    var People$1 = People;

    /* node_modules\svelte-bootstrap-icons\lib\PersonVideo3\PersonVideo3.svelte generated by Svelte v3.48.0 */

    const file$A = "node_modules\\svelte-bootstrap-icons\\lib\\PersonVideo3\\PersonVideo3.svelte";

    function create_fragment$D(ctx) {
    	let svg;
    	let path0;
    	let path1;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[2].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

    	let svg_levels = [
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		{ width: "16" },
    		{ height: "16" },
    		{ fill: "currentColor" },
    		{ viewBox: "0 0 16 16" },
    		/*$$restProps*/ ctx[0]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if (default_slot) default_slot.c();
    			path0 = svg_element("path");
    			path1 = svg_element("path");
    			attr_dev(path0, "d", "M14 9.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm-6 5.7c0 .8.8.8.8.8h6.4s.8 0 .8-.8-.8-3.2-4-3.2-4 2.4-4 3.2Z");
    			add_location(path0, file$A, 1, 2, 294);
    			attr_dev(path1, "d", "M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h5.243c.122-.326.295-.668.526-1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v7.81c.353.23.656.496.91.783.059-.187.09-.386.09-.593V4a2 2 0 0 0-2-2H2Z");
    			add_location(path1, file$A, 2, 2, 406);
    			set_svg_attributes(svg, svg_data);
    			toggle_class(svg, "bi", true);
    			toggle_class(svg, "bi-person-video3", true);
    			add_location(svg, file$A, 0, 56, 56);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);

    			if (default_slot) {
    				default_slot.m(svg, null);
    			}

    			append_dev(svg, path0);
    			append_dev(svg, path1);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(svg, "click", /*click_handler*/ ctx[3], false, false, false),
    					listen_dev(svg, "mouseover", /*mouseover_handler*/ ctx[4], false, false, false),
    					listen_dev(svg, "mouseenter", /*mouseenter_handler*/ ctx[5], false, false, false),
    					listen_dev(svg, "mouseleave", /*mouseleave_handler*/ ctx[6], false, false, false),
    					listen_dev(svg, "keydown", /*keydown_handler*/ ctx[7], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[1],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[1], dirty, null),
    						null
    					);
    				}
    			}

    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				{ width: "16" },
    				{ height: "16" },
    				{ fill: "currentColor" },
    				{ viewBox: "0 0 16 16" },
    				dirty & /*$$restProps*/ 1 && /*$$restProps*/ ctx[0]
    			]));

    			toggle_class(svg, "bi", true);
    			toggle_class(svg, "bi-person-video3", true);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$D.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$D($$self, $$props, $$invalidate) {
    	const omit_props_names = [];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('PersonVideo3', slots, ['default']);

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseover_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseenter_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseleave_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(0, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('$$scope' in $$new_props) $$invalidate(1, $$scope = $$new_props.$$scope);
    	};

    	return [
    		$$restProps,
    		$$scope,
    		slots,
    		click_handler,
    		mouseover_handler,
    		mouseenter_handler,
    		mouseleave_handler,
    		keydown_handler
    	];
    }

    class PersonVideo3 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$D, create_fragment$D, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "PersonVideo3",
    			options,
    			id: create_fragment$D.name
    		});
    	}
    }

    var PersonVideo3$1 = PersonVideo3;

    /* node_modules\svelte-bootstrap-icons\lib\StarFill\StarFill.svelte generated by Svelte v3.48.0 */

    const file$z = "node_modules\\svelte-bootstrap-icons\\lib\\StarFill\\StarFill.svelte";

    function create_fragment$C(ctx) {
    	let svg;
    	let path;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[2].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

    	let svg_levels = [
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		{ width: "16" },
    		{ height: "16" },
    		{ fill: "currentColor" },
    		{ viewBox: "0 0 16 16" },
    		/*$$restProps*/ ctx[0]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if (default_slot) default_slot.c();
    			path = svg_element("path");
    			attr_dev(path, "d", "M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z");
    			add_location(path, file$z, 1, 2, 290);
    			set_svg_attributes(svg, svg_data);
    			toggle_class(svg, "bi", true);
    			toggle_class(svg, "bi-star-fill", true);
    			add_location(svg, file$z, 0, 56, 56);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);

    			if (default_slot) {
    				default_slot.m(svg, null);
    			}

    			append_dev(svg, path);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(svg, "click", /*click_handler*/ ctx[3], false, false, false),
    					listen_dev(svg, "mouseover", /*mouseover_handler*/ ctx[4], false, false, false),
    					listen_dev(svg, "mouseenter", /*mouseenter_handler*/ ctx[5], false, false, false),
    					listen_dev(svg, "mouseleave", /*mouseleave_handler*/ ctx[6], false, false, false),
    					listen_dev(svg, "keydown", /*keydown_handler*/ ctx[7], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[1],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[1], dirty, null),
    						null
    					);
    				}
    			}

    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				{ width: "16" },
    				{ height: "16" },
    				{ fill: "currentColor" },
    				{ viewBox: "0 0 16 16" },
    				dirty & /*$$restProps*/ 1 && /*$$restProps*/ ctx[0]
    			]));

    			toggle_class(svg, "bi", true);
    			toggle_class(svg, "bi-star-fill", true);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$C.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$C($$self, $$props, $$invalidate) {
    	const omit_props_names = [];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('StarFill', slots, ['default']);

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseover_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseenter_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseleave_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(0, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('$$scope' in $$new_props) $$invalidate(1, $$scope = $$new_props.$$scope);
    	};

    	return [
    		$$restProps,
    		$$scope,
    		slots,
    		click_handler,
    		mouseover_handler,
    		mouseenter_handler,
    		mouseleave_handler,
    		keydown_handler
    	];
    }

    class StarFill extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$C, create_fragment$C, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "StarFill",
    			options,
    			id: create_fragment$C.name
    		});
    	}
    }

    var StarFill$1 = StarFill;

    /* node_modules\svelte-bootstrap-icons\lib\Tiktok\Tiktok.svelte generated by Svelte v3.48.0 */

    const file$y = "node_modules\\svelte-bootstrap-icons\\lib\\Tiktok\\Tiktok.svelte";

    function create_fragment$B(ctx) {
    	let svg;
    	let path;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[2].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

    	let svg_levels = [
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		{ width: "16" },
    		{ height: "16" },
    		{ fill: "currentColor" },
    		{ viewBox: "0 0 16 16" },
    		/*$$restProps*/ ctx[0]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if (default_slot) default_slot.c();
    			path = svg_element("path");
    			attr_dev(path, "d", "M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z");
    			add_location(path, file$y, 1, 2, 287);
    			set_svg_attributes(svg, svg_data);
    			toggle_class(svg, "bi", true);
    			toggle_class(svg, "bi-tiktok", true);
    			add_location(svg, file$y, 0, 56, 56);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);

    			if (default_slot) {
    				default_slot.m(svg, null);
    			}

    			append_dev(svg, path);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(svg, "click", /*click_handler*/ ctx[3], false, false, false),
    					listen_dev(svg, "mouseover", /*mouseover_handler*/ ctx[4], false, false, false),
    					listen_dev(svg, "mouseenter", /*mouseenter_handler*/ ctx[5], false, false, false),
    					listen_dev(svg, "mouseleave", /*mouseleave_handler*/ ctx[6], false, false, false),
    					listen_dev(svg, "keydown", /*keydown_handler*/ ctx[7], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[1],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[1], dirty, null),
    						null
    					);
    				}
    			}

    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				{ width: "16" },
    				{ height: "16" },
    				{ fill: "currentColor" },
    				{ viewBox: "0 0 16 16" },
    				dirty & /*$$restProps*/ 1 && /*$$restProps*/ ctx[0]
    			]));

    			toggle_class(svg, "bi", true);
    			toggle_class(svg, "bi-tiktok", true);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$B.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$B($$self, $$props, $$invalidate) {
    	const omit_props_names = [];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Tiktok', slots, ['default']);

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseover_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseenter_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseleave_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(0, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('$$scope' in $$new_props) $$invalidate(1, $$scope = $$new_props.$$scope);
    	};

    	return [
    		$$restProps,
    		$$scope,
    		slots,
    		click_handler,
    		mouseover_handler,
    		mouseenter_handler,
    		mouseleave_handler,
    		keydown_handler
    	];
    }

    class Tiktok extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$B, create_fragment$B, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Tiktok",
    			options,
    			id: create_fragment$B.name
    		});
    	}
    }

    var Tiktok$1 = Tiktok;

    /* node_modules\svelte-bootstrap-icons\lib\Twitter\Twitter.svelte generated by Svelte v3.48.0 */

    const file$x = "node_modules\\svelte-bootstrap-icons\\lib\\Twitter\\Twitter.svelte";

    function create_fragment$A(ctx) {
    	let svg;
    	let path;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[2].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

    	let svg_levels = [
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		{ width: "16" },
    		{ height: "16" },
    		{ fill: "currentColor" },
    		{ viewBox: "0 0 16 16" },
    		/*$$restProps*/ ctx[0]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if (default_slot) default_slot.c();
    			path = svg_element("path");
    			attr_dev(path, "d", "M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z");
    			add_location(path, file$x, 1, 2, 288);
    			set_svg_attributes(svg, svg_data);
    			toggle_class(svg, "bi", true);
    			toggle_class(svg, "bi-twitter", true);
    			add_location(svg, file$x, 0, 56, 56);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);

    			if (default_slot) {
    				default_slot.m(svg, null);
    			}

    			append_dev(svg, path);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(svg, "click", /*click_handler*/ ctx[3], false, false, false),
    					listen_dev(svg, "mouseover", /*mouseover_handler*/ ctx[4], false, false, false),
    					listen_dev(svg, "mouseenter", /*mouseenter_handler*/ ctx[5], false, false, false),
    					listen_dev(svg, "mouseleave", /*mouseleave_handler*/ ctx[6], false, false, false),
    					listen_dev(svg, "keydown", /*keydown_handler*/ ctx[7], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[1],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[1], dirty, null),
    						null
    					);
    				}
    			}

    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				{ width: "16" },
    				{ height: "16" },
    				{ fill: "currentColor" },
    				{ viewBox: "0 0 16 16" },
    				dirty & /*$$restProps*/ 1 && /*$$restProps*/ ctx[0]
    			]));

    			toggle_class(svg, "bi", true);
    			toggle_class(svg, "bi-twitter", true);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$A.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$A($$self, $$props, $$invalidate) {
    	const omit_props_names = [];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Twitter', slots, ['default']);

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseover_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseenter_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseleave_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(0, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('$$scope' in $$new_props) $$invalidate(1, $$scope = $$new_props.$$scope);
    	};

    	return [
    		$$restProps,
    		$$scope,
    		slots,
    		click_handler,
    		mouseover_handler,
    		mouseenter_handler,
    		mouseleave_handler,
    		keydown_handler
    	];
    }

    class Twitter extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$A, create_fragment$A, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Twitter",
    			options,
    			id: create_fragment$A.name
    		});
    	}
    }

    var Twitter$1 = Twitter;

    /* node_modules\svelte-bootstrap-icons\lib\Whatsapp\Whatsapp.svelte generated by Svelte v3.48.0 */

    const file$w = "node_modules\\svelte-bootstrap-icons\\lib\\Whatsapp\\Whatsapp.svelte";

    function create_fragment$z(ctx) {
    	let svg;
    	let path;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[2].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

    	let svg_levels = [
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		{ width: "16" },
    		{ height: "16" },
    		{ fill: "currentColor" },
    		{ viewBox: "0 0 16 16" },
    		/*$$restProps*/ ctx[0]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if (default_slot) default_slot.c();
    			path = svg_element("path");
    			attr_dev(path, "d", "M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z");
    			add_location(path, file$w, 1, 2, 289);
    			set_svg_attributes(svg, svg_data);
    			toggle_class(svg, "bi", true);
    			toggle_class(svg, "bi-whatsapp", true);
    			add_location(svg, file$w, 0, 56, 56);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);

    			if (default_slot) {
    				default_slot.m(svg, null);
    			}

    			append_dev(svg, path);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(svg, "click", /*click_handler*/ ctx[3], false, false, false),
    					listen_dev(svg, "mouseover", /*mouseover_handler*/ ctx[4], false, false, false),
    					listen_dev(svg, "mouseenter", /*mouseenter_handler*/ ctx[5], false, false, false),
    					listen_dev(svg, "mouseleave", /*mouseleave_handler*/ ctx[6], false, false, false),
    					listen_dev(svg, "keydown", /*keydown_handler*/ ctx[7], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[1],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[1], dirty, null),
    						null
    					);
    				}
    			}

    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				{ width: "16" },
    				{ height: "16" },
    				{ fill: "currentColor" },
    				{ viewBox: "0 0 16 16" },
    				dirty & /*$$restProps*/ 1 && /*$$restProps*/ ctx[0]
    			]));

    			toggle_class(svg, "bi", true);
    			toggle_class(svg, "bi-whatsapp", true);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$z.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$z($$self, $$props, $$invalidate) {
    	const omit_props_names = [];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Whatsapp', slots, ['default']);

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseover_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseenter_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseleave_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(0, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('$$scope' in $$new_props) $$invalidate(1, $$scope = $$new_props.$$scope);
    	};

    	return [
    		$$restProps,
    		$$scope,
    		slots,
    		click_handler,
    		mouseover_handler,
    		mouseenter_handler,
    		mouseleave_handler,
    		keydown_handler
    	];
    }

    class Whatsapp extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$z, create_fragment$z, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Whatsapp",
    			options,
    			id: create_fragment$z.name
    		});
    	}
    }

    var Whatsapp$1 = Whatsapp;

    /* node_modules\svelte-bootstrap-icons\lib\Wifi\Wifi.svelte generated by Svelte v3.48.0 */

    const file$v = "node_modules\\svelte-bootstrap-icons\\lib\\Wifi\\Wifi.svelte";

    function create_fragment$y(ctx) {
    	let svg;
    	let path0;
    	let path1;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[2].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

    	let svg_levels = [
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		{ width: "16" },
    		{ height: "16" },
    		{ fill: "currentColor" },
    		{ viewBox: "0 0 16 16" },
    		/*$$restProps*/ ctx[0]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if (default_slot) default_slot.c();
    			path0 = svg_element("path");
    			path1 = svg_element("path");
    			attr_dev(path0, "d", "M15.384 6.115a.485.485 0 0 0-.047-.736A12.444 12.444 0 0 0 8 3C5.259 3 2.723 3.882.663 5.379a.485.485 0 0 0-.048.736.518.518 0 0 0 .668.05A11.448 11.448 0 0 1 8 4c2.507 0 4.827.802 6.716 2.164.205.148.49.13.668-.049z");
    			add_location(path0, file$v, 1, 2, 285);
    			attr_dev(path1, "d", "M13.229 8.271a.482.482 0 0 0-.063-.745A9.455 9.455 0 0 0 8 6c-1.905 0-3.68.56-5.166 1.526a.48.48 0 0 0-.063.745.525.525 0 0 0 .652.065A8.46 8.46 0 0 1 8 7a8.46 8.46 0 0 1 4.576 1.336c.206.132.48.108.653-.065zm-2.183 2.183c.226-.226.185-.605-.1-.75A6.473 6.473 0 0 0 8 9c-1.06 0-2.062.254-2.946.704-.285.145-.326.524-.1.75l.015.015c.16.16.407.19.611.09A5.478 5.478 0 0 1 8 10c.868 0 1.69.201 2.42.56.203.1.45.07.61-.091l.016-.015zM9.06 12.44c.196-.196.198-.52-.04-.66A1.99 1.99 0 0 0 8 11.5a1.99 1.99 0 0 0-1.02.28c-.238.14-.236.464-.04.66l.706.706a.5.5 0 0 0 .707 0l.707-.707z");
    			add_location(path1, file$v, 2, 2, 516);
    			set_svg_attributes(svg, svg_data);
    			toggle_class(svg, "bi", true);
    			toggle_class(svg, "bi-wifi", true);
    			add_location(svg, file$v, 0, 56, 56);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);

    			if (default_slot) {
    				default_slot.m(svg, null);
    			}

    			append_dev(svg, path0);
    			append_dev(svg, path1);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(svg, "click", /*click_handler*/ ctx[3], false, false, false),
    					listen_dev(svg, "mouseover", /*mouseover_handler*/ ctx[4], false, false, false),
    					listen_dev(svg, "mouseenter", /*mouseenter_handler*/ ctx[5], false, false, false),
    					listen_dev(svg, "mouseleave", /*mouseleave_handler*/ ctx[6], false, false, false),
    					listen_dev(svg, "keydown", /*keydown_handler*/ ctx[7], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[1],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[1], dirty, null),
    						null
    					);
    				}
    			}

    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				{ width: "16" },
    				{ height: "16" },
    				{ fill: "currentColor" },
    				{ viewBox: "0 0 16 16" },
    				dirty & /*$$restProps*/ 1 && /*$$restProps*/ ctx[0]
    			]));

    			toggle_class(svg, "bi", true);
    			toggle_class(svg, "bi-wifi", true);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$y.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$y($$self, $$props, $$invalidate) {
    	const omit_props_names = [];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Wifi', slots, ['default']);

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseover_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseenter_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseleave_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(0, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('$$scope' in $$new_props) $$invalidate(1, $$scope = $$new_props.$$scope);
    	};

    	return [
    		$$restProps,
    		$$scope,
    		slots,
    		click_handler,
    		mouseover_handler,
    		mouseenter_handler,
    		mouseleave_handler,
    		keydown_handler
    	];
    }

    class Wifi extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$y, create_fragment$y, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Wifi",
    			options,
    			id: create_fragment$y.name
    		});
    	}
    }

    var Wifi$1 = Wifi;

    /* node_modules\svelte-bootstrap-icons\lib\XLg\XLg.svelte generated by Svelte v3.48.0 */

    const file$u = "node_modules\\svelte-bootstrap-icons\\lib\\XLg\\XLg.svelte";

    function create_fragment$x(ctx) {
    	let svg;
    	let path;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[2].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

    	let svg_levels = [
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		{ width: "16" },
    		{ height: "16" },
    		{ fill: "currentColor" },
    		{ viewBox: "0 0 16 16" },
    		/*$$restProps*/ ctx[0]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if (default_slot) default_slot.c();
    			path = svg_element("path");
    			attr_dev(path, "d", "M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z");
    			add_location(path, file$u, 1, 2, 285);
    			set_svg_attributes(svg, svg_data);
    			toggle_class(svg, "bi", true);
    			toggle_class(svg, "bi-x-lg", true);
    			add_location(svg, file$u, 0, 56, 56);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);

    			if (default_slot) {
    				default_slot.m(svg, null);
    			}

    			append_dev(svg, path);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(svg, "click", /*click_handler*/ ctx[3], false, false, false),
    					listen_dev(svg, "mouseover", /*mouseover_handler*/ ctx[4], false, false, false),
    					listen_dev(svg, "mouseenter", /*mouseenter_handler*/ ctx[5], false, false, false),
    					listen_dev(svg, "mouseleave", /*mouseleave_handler*/ ctx[6], false, false, false),
    					listen_dev(svg, "keydown", /*keydown_handler*/ ctx[7], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[1],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[1], dirty, null),
    						null
    					);
    				}
    			}

    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				{ width: "16" },
    				{ height: "16" },
    				{ fill: "currentColor" },
    				{ viewBox: "0 0 16 16" },
    				dirty & /*$$restProps*/ 1 && /*$$restProps*/ ctx[0]
    			]));

    			toggle_class(svg, "bi", true);
    			toggle_class(svg, "bi-x-lg", true);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$x.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$x($$self, $$props, $$invalidate) {
    	const omit_props_names = [];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('XLg', slots, ['default']);

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseover_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseenter_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseleave_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(0, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('$$scope' in $$new_props) $$invalidate(1, $$scope = $$new_props.$$scope);
    	};

    	return [
    		$$restProps,
    		$$scope,
    		slots,
    		click_handler,
    		mouseover_handler,
    		mouseenter_handler,
    		mouseleave_handler,
    		keydown_handler
    	];
    }

    class XLg extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$x, create_fragment$x, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "XLg",
    			options,
    			id: create_fragment$x.name
    		});
    	}
    }

    var XLg$1 = XLg;

    /* node_modules\svelte-bootstrap-icons\lib\Youtube\Youtube.svelte generated by Svelte v3.48.0 */

    const file$t = "node_modules\\svelte-bootstrap-icons\\lib\\Youtube\\Youtube.svelte";

    function create_fragment$w(ctx) {
    	let svg;
    	let path;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[2].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

    	let svg_levels = [
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		{ width: "16" },
    		{ height: "16" },
    		{ fill: "currentColor" },
    		{ viewBox: "0 0 16 16" },
    		/*$$restProps*/ ctx[0]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if (default_slot) default_slot.c();
    			path = svg_element("path");
    			attr_dev(path, "d", "M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z");
    			add_location(path, file$t, 1, 2, 288);
    			set_svg_attributes(svg, svg_data);
    			toggle_class(svg, "bi", true);
    			toggle_class(svg, "bi-youtube", true);
    			add_location(svg, file$t, 0, 56, 56);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);

    			if (default_slot) {
    				default_slot.m(svg, null);
    			}

    			append_dev(svg, path);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(svg, "click", /*click_handler*/ ctx[3], false, false, false),
    					listen_dev(svg, "mouseover", /*mouseover_handler*/ ctx[4], false, false, false),
    					listen_dev(svg, "mouseenter", /*mouseenter_handler*/ ctx[5], false, false, false),
    					listen_dev(svg, "mouseleave", /*mouseleave_handler*/ ctx[6], false, false, false),
    					listen_dev(svg, "keydown", /*keydown_handler*/ ctx[7], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[1],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[1], dirty, null),
    						null
    					);
    				}
    			}

    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				{ width: "16" },
    				{ height: "16" },
    				{ fill: "currentColor" },
    				{ viewBox: "0 0 16 16" },
    				dirty & /*$$restProps*/ 1 && /*$$restProps*/ ctx[0]
    			]));

    			toggle_class(svg, "bi", true);
    			toggle_class(svg, "bi-youtube", true);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$w.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$w($$self, $$props, $$invalidate) {
    	const omit_props_names = [];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Youtube', slots, ['default']);

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseover_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseenter_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseleave_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(0, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('$$scope' in $$new_props) $$invalidate(1, $$scope = $$new_props.$$scope);
    	};

    	return [
    		$$restProps,
    		$$scope,
    		slots,
    		click_handler,
    		mouseover_handler,
    		mouseenter_handler,
    		mouseleave_handler,
    		keydown_handler
    	];
    }

    class Youtube extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$w, create_fragment$w, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Youtube",
    			options,
    			id: create_fragment$w.name
    		});
    	}
    }

    var Youtube$1 = Youtube;

    /* src\component\BackTop.svelte generated by Svelte v3.48.0 */
    const file$s = "src\\component\\BackTop.svelte";

    function create_fragment$v(ctx) {
    	let div;
    	let arrowupshort;
    	let current;
    	let mounted;
    	let dispose;

    	arrowupshort = new ArrowUpShort$1({
    			props: { width: 30, height: 30 },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(arrowupshort.$$.fragment);
    			attr_dev(div, "class", "back_to_start svelte-4ie0cc");
    			toggle_class(div, "hidden", /*hidden*/ ctx[0]);
    			add_location(div, file$s, 26, 0, 544);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(arrowupshort, div, null);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(window, "scroll", /*handleOnScroll*/ ctx[2], false, false, false),
    					listen_dev(div, "click", /*goStart*/ ctx[1], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*hidden*/ 1) {
    				toggle_class(div, "hidden", /*hidden*/ ctx[0]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(arrowupshort.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(arrowupshort.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(arrowupshort);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$v.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$v($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('BackTop', slots, []);
    	let { buttonVisibleOnPX = 200 } = $$props;
    	let hidden = true;

    	const goStart = () => {
    		document.body.scrollIntoView();
    	};

    	const scrollElement = () => {
    		return document.documentElement || document.body;
    	};

    	const handleOnScroll = () => {
    		if (scrollElement().scrollTop > buttonVisibleOnPX) {
    			$$invalidate(0, hidden = false);
    		} else {
    			$$invalidate(0, hidden = true);
    		}
    	};

    	const writable_props = ['buttonVisibleOnPX'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<BackTop> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('buttonVisibleOnPX' in $$props) $$invalidate(3, buttonVisibleOnPX = $$props.buttonVisibleOnPX);
    	};

    	$$self.$capture_state = () => ({
    		ArrowUpShort: ArrowUpShort$1,
    		buttonVisibleOnPX,
    		hidden,
    		goStart,
    		scrollElement,
    		handleOnScroll
    	});

    	$$self.$inject_state = $$props => {
    		if ('buttonVisibleOnPX' in $$props) $$invalidate(3, buttonVisibleOnPX = $$props.buttonVisibleOnPX);
    		if ('hidden' in $$props) $$invalidate(0, hidden = $$props.hidden);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [hidden, goStart, handleOnScroll, buttonVisibleOnPX];
    }

    class BackTop extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$v, create_fragment$v, safe_not_equal, { buttonVisibleOnPX: 3 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "BackTop",
    			options,
    			id: create_fragment$v.name
    		});
    	}

    	get buttonVisibleOnPX() {
    		throw new Error("<BackTop>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set buttonVisibleOnPX(value) {
    		throw new Error("<BackTop>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\Footer.svelte generated by Svelte v3.48.0 */

    const file$r = "src\\component\\Footer.svelte";

    function create_fragment$u(ctx) {
    	let footer;
    	let div6;
    	let div5;
    	let div4;
    	let div0;
    	let h3;
    	let t1;
    	let p0;
    	let t3;
    	let div1;
    	let h40;
    	let t5;
    	let ul;
    	let li0;
    	let a0;
    	let t7;
    	let li1;
    	let a1;
    	let t9;
    	let li2;
    	let a2;
    	let t11;
    	let div3;
    	let h41;
    	let t13;
    	let p1;
    	let t14;
    	let br0;
    	let t15;
    	let br1;
    	let t16;
    	let br2;
    	let t17;
    	let strong0;
    	let t19;
    	let br3;
    	let t20;
    	let strong1;
    	let t22;
    	let br4;
    	let t23;
    	let div2;
    	let a3;
    	let i0;
    	let twitter;
    	let t24;
    	let a4;
    	let i1;
    	let facebook;
    	let t25;
    	let a5;
    	let i2;
    	let instagram;
    	let t26;
    	let a6;
    	let i3;
    	let youtube;
    	let t27;
    	let a7;
    	let i4;
    	let linkedin;
    	let t28;
    	let a8;
    	let i5;
    	let tiktok;
    	let t29;
    	let a9;
    	let i6;
    	let discord;
    	let t30;
    	let a10;
    	let i7;
    	let whatsapp;
    	let t31;
    	let a11;
    	let i8;
    	let line;
    	let t32;
    	let div9;
    	let div7;
    	let t33;
    	let strong2;
    	let t35;
    	let t36;
    	let div8;
    	let t37;
    	let a12;
    	let current;
    	twitter = new Twitter$1({ $$inline: true });
    	facebook = new Facebook$1({ $$inline: true });
    	instagram = new Instagram$1({ $$inline: true });
    	youtube = new Youtube$1({ $$inline: true });
    	linkedin = new Linkedin$1({ $$inline: true });
    	tiktok = new Tiktok$1({ $$inline: true });
    	discord = new Discord$1({ $$inline: true });
    	whatsapp = new Whatsapp$1({ $$inline: true });
    	line = new Line$1({ $$inline: true });

    	const block = {
    		c: function create() {
    			footer = element("footer");
    			div6 = element("div");
    			div5 = element("div");
    			div4 = element("div");
    			div0 = element("div");
    			h3 = element("h3");
    			h3.textContent = "TORCHE";
    			t1 = space();
    			p0 = element("p");
    			p0.textContent = "TORCHE Education is a education technology startup company based in Indonesia, focusing on chemical engineering, bioprocess engineering, and other process engineering subjects.";
    			t3 = space();
    			div1 = element("div");
    			h40 = element("h4");
    			h40.textContent = "Useful Links";
    			t5 = space();
    			ul = element("ul");
    			li0 = element("li");
    			a0 = element("a");
    			a0.textContent = "Home";
    			t7 = space();
    			li1 = element("li");
    			a1 = element("a");
    			a1.textContent = "About us";
    			t9 = space();
    			li2 = element("li");
    			a2 = element("a");
    			a2.textContent = "Services";
    			t11 = space();
    			div3 = element("div");
    			h41 = element("h4");
    			h41.textContent = "Contact Us";
    			t13 = space();
    			p1 = element("p");
    			t14 = text$1("Jl. Kelapa Lilin Utara XIV Blok DG 8 No. 27");
    			br0 = element("br");
    			t15 = text$1("\r\n              Kab. Tangerang, Banten 15810");
    			br1 = element("br");
    			t16 = text$1("\r\n              Indonesia ");
    			br2 = element("br");
    			t17 = space();
    			strong0 = element("strong");
    			strong0.textContent = "Whatsapp Business:";
    			t19 = text$1(" +62 851 5521 6117");
    			br3 = element("br");
    			t20 = space();
    			strong1 = element("strong");
    			strong1.textContent = "Email:";
    			t22 = text$1(" admin@torche.app");
    			br4 = element("br");
    			t23 = space();
    			div2 = element("div");
    			a3 = element("a");
    			i0 = element("i");
    			create_component(twitter.$$.fragment);
    			t24 = space();
    			a4 = element("a");
    			i1 = element("i");
    			create_component(facebook.$$.fragment);
    			t25 = space();
    			a5 = element("a");
    			i2 = element("i");
    			create_component(instagram.$$.fragment);
    			t26 = space();
    			a6 = element("a");
    			i3 = element("i");
    			create_component(youtube.$$.fragment);
    			t27 = space();
    			a7 = element("a");
    			i4 = element("i");
    			create_component(linkedin.$$.fragment);
    			t28 = space();
    			a8 = element("a");
    			i5 = element("i");
    			create_component(tiktok.$$.fragment);
    			t29 = space();
    			a9 = element("a");
    			i6 = element("i");
    			create_component(discord.$$.fragment);
    			t30 = space();
    			a10 = element("a");
    			i7 = element("i");
    			create_component(whatsapp.$$.fragment);
    			t31 = space();
    			a11 = element("a");
    			i8 = element("i");
    			create_component(line.$$.fragment);
    			t32 = space();
    			div9 = element("div");
    			div7 = element("div");
    			t33 = text$1("© Copyright ");
    			strong2 = element("strong");
    			strong2.textContent = "NewBiz";
    			t35 = text$1(". All Rights Reserved");
    			t36 = space();
    			div8 = element("div");
    			t37 = text$1("Designed by ");
    			a12 = element("a");
    			a12.textContent = "BootstrapMade";
    			attr_dev(h3, "class", "svelte-n7znvc");
    			add_location(h3, file$r, 10, 12, 366);
    			attr_dev(p0, "class", "svelte-n7znvc");
    			add_location(p0, file$r, 11, 12, 395);
    			attr_dev(div0, "class", "col-lg-6 col-md-6 footer-info svelte-n7znvc");
    			add_location(div0, file$r, 9, 10, 309);
    			attr_dev(h40, "class", "svelte-n7znvc");
    			add_location(h40, file$r, 14, 12, 666);
    			attr_dev(a0, "href", "#hero");
    			attr_dev(a0, "class", "svelte-n7znvc");
    			add_location(a0, file$r, 16, 18, 725);
    			attr_dev(li0, "class", "svelte-n7znvc");
    			add_location(li0, file$r, 16, 14, 721);
    			attr_dev(a1, "href", "#about");
    			attr_dev(a1, "class", "svelte-n7znvc");
    			add_location(a1, file$r, 17, 18, 774);
    			attr_dev(li1, "class", "svelte-n7znvc");
    			add_location(li1, file$r, 17, 14, 770);
    			attr_dev(a2, "href", "#services");
    			attr_dev(a2, "class", "svelte-n7znvc");
    			add_location(a2, file$r, 18, 18, 828);
    			attr_dev(li2, "class", "svelte-n7znvc");
    			add_location(li2, file$r, 18, 14, 824);
    			attr_dev(ul, "class", "svelte-n7znvc");
    			add_location(ul, file$r, 15, 12, 701);
    			attr_dev(div1, "class", "col-lg-2 col-md-6 footer-links svelte-n7znvc");
    			add_location(div1, file$r, 13, 10, 608);
    			attr_dev(h41, "class", "svelte-n7znvc");
    			add_location(h41, file$r, 22, 12, 974);
    			add_location(br0, file$r, 24, 57, 1069);
    			add_location(br1, file$r, 25, 42, 1119);
    			add_location(br2, file$r, 26, 24, 1151);
    			add_location(strong0, file$r, 27, 14, 1173);
    			add_location(br3, file$r, 27, 67, 1226);
    			add_location(strong1, file$r, 28, 14, 1248);
    			add_location(br4, file$r, 28, 54, 1288);
    			attr_dev(p1, "class", "svelte-n7znvc");
    			add_location(p1, file$r, 23, 12, 1007);
    			attr_dev(i0, "class", "bi bi-twitter svelte-n7znvc");
    			add_location(i0, file$r, 31, 70, 1424);
    			attr_dev(a3, "href", "https://twitter.com/TorcheEdu");
    			attr_dev(a3, "class", "twitter svelte-n7znvc");
    			add_location(a3, file$r, 31, 14, 1368);
    			attr_dev(i1, "class", "bi bi-facebook svelte-n7znvc");
    			add_location(i1, file$r, 32, 77, 1547);
    			attr_dev(a4, "href", "https://www.facebook.com/torche.edu");
    			attr_dev(a4, "class", "facebook svelte-n7znvc");
    			add_location(a4, file$r, 32, 14, 1484);
    			attr_dev(i2, "class", "bi bi-instagram svelte-n7znvc");
    			add_location(i2, file$r, 33, 80, 1674);
    			attr_dev(a5, "href", "https://www.instagram.com/torche.app/");
    			attr_dev(a5, "class", "instagram svelte-n7znvc");
    			add_location(a5, file$r, 33, 14, 1608);
    			attr_dev(i3, "class", "bi bi-youtube svelte-n7znvc");
    			add_location(i3, file$r, 34, 97, 1820);
    			attr_dev(a6, "href", "https://www.youtube.com/channel/UCQnYuE3KU3CzcAjVhuCQtNw");
    			attr_dev(a6, "class", "youtube svelte-n7znvc");
    			add_location(a6, file$r, 34, 14, 1737);
    			attr_dev(i4, "class", "bi bi-linkedin svelte-n7znvc");
    			add_location(i4, file$r, 35, 92, 1957);
    			attr_dev(a7, "href", "https://www.linkedin.com/company/torche-education/");
    			attr_dev(a7, "class", "linkedin svelte-n7znvc");
    			add_location(a7, file$r, 35, 14, 1879);
    			attr_dev(i5, "class", "bi bi-tiktok svelte-n7znvc");
    			add_location(i5, file$r, 36, 72, 2076);
    			attr_dev(a8, "href", "https://vt.tiktok.com/ZSeu2n4ca/");
    			attr_dev(a8, "class", "tiktok svelte-n7znvc");
    			add_location(a8, file$r, 36, 14, 2018);
    			attr_dev(i6, "class", "bi bi-discord svelte-n7znvc");
    			add_location(i6, file$r, 37, 78, 2197);
    			attr_dev(a9, "href", "https://discord.com/invite/2fYBrcK785");
    			attr_dev(a9, "class", "discord svelte-n7znvc");
    			add_location(a9, file$r, 37, 14, 2133);
    			attr_dev(i7, "class", "bi bi-whatsapp svelte-n7znvc");
    			add_location(i7, file$r, 38, 70, 2312);
    			attr_dev(a10, "href", "https://wa.me/+6285155216117");
    			attr_dev(a10, "class", "whatsapp svelte-n7znvc");
    			add_location(a10, file$r, 38, 14, 2256);
    			attr_dev(i8, "class", "bi bi-line svelte-n7znvc");
    			add_location(i8, file$r, 39, 67, 2426);
    			attr_dev(a11, "href", "https://page.line.me/229wiguf");
    			attr_dev(a11, "class", "line svelte-n7znvc");
    			add_location(a11, file$r, 39, 14, 2373);
    			attr_dev(div2, "class", "social-links");
    			add_location(div2, file$r, 30, 12, 1326);
    			attr_dev(div3, "class", "col-lg-4 col-md-6 footer-contact svelte-n7znvc");
    			add_location(div3, file$r, 21, 10, 914);
    			attr_dev(div4, "class", "row");
    			add_location(div4, file$r, 8, 8, 280);
    			attr_dev(div5, "class", "container");
    			add_location(div5, file$r, 7, 6, 247);
    			attr_dev(div6, "class", "footer-top svelte-n7znvc");
    			add_location(div6, file$r, 6, 4, 215);
    			add_location(strong2, file$r, 47, 46, 2622);
    			attr_dev(div7, "class", "copyright svelte-n7znvc");
    			add_location(div7, file$r, 47, 6, 2582);
    			attr_dev(a12, "href", "https://bootstrapmade.com/");
    			attr_dev(a12, "class", "svelte-n7znvc");
    			add_location(a12, file$r, 55, 20, 3051);
    			attr_dev(div8, "class", "credits svelte-n7znvc");
    			add_location(div8, file$r, 48, 6, 2680);
    			attr_dev(div9, "class", "container");
    			add_location(div9, file$r, 46, 4, 2551);
    			attr_dev(footer, "id", "footer");
    			attr_dev(footer, "class", "svelte-n7znvc");
    			add_location(footer, file$r, 5, 1, 189);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, footer, anchor);
    			append_dev(footer, div6);
    			append_dev(div6, div5);
    			append_dev(div5, div4);
    			append_dev(div4, div0);
    			append_dev(div0, h3);
    			append_dev(div0, t1);
    			append_dev(div0, p0);
    			append_dev(div4, t3);
    			append_dev(div4, div1);
    			append_dev(div1, h40);
    			append_dev(div1, t5);
    			append_dev(div1, ul);
    			append_dev(ul, li0);
    			append_dev(li0, a0);
    			append_dev(ul, t7);
    			append_dev(ul, li1);
    			append_dev(li1, a1);
    			append_dev(ul, t9);
    			append_dev(ul, li2);
    			append_dev(li2, a2);
    			append_dev(div4, t11);
    			append_dev(div4, div3);
    			append_dev(div3, h41);
    			append_dev(div3, t13);
    			append_dev(div3, p1);
    			append_dev(p1, t14);
    			append_dev(p1, br0);
    			append_dev(p1, t15);
    			append_dev(p1, br1);
    			append_dev(p1, t16);
    			append_dev(p1, br2);
    			append_dev(p1, t17);
    			append_dev(p1, strong0);
    			append_dev(p1, t19);
    			append_dev(p1, br3);
    			append_dev(p1, t20);
    			append_dev(p1, strong1);
    			append_dev(p1, t22);
    			append_dev(p1, br4);
    			append_dev(div3, t23);
    			append_dev(div3, div2);
    			append_dev(div2, a3);
    			append_dev(a3, i0);
    			mount_component(twitter, i0, null);
    			append_dev(div2, t24);
    			append_dev(div2, a4);
    			append_dev(a4, i1);
    			mount_component(facebook, i1, null);
    			append_dev(div2, t25);
    			append_dev(div2, a5);
    			append_dev(a5, i2);
    			mount_component(instagram, i2, null);
    			append_dev(div2, t26);
    			append_dev(div2, a6);
    			append_dev(a6, i3);
    			mount_component(youtube, i3, null);
    			append_dev(div2, t27);
    			append_dev(div2, a7);
    			append_dev(a7, i4);
    			mount_component(linkedin, i4, null);
    			append_dev(div2, t28);
    			append_dev(div2, a8);
    			append_dev(a8, i5);
    			mount_component(tiktok, i5, null);
    			append_dev(div2, t29);
    			append_dev(div2, a9);
    			append_dev(a9, i6);
    			mount_component(discord, i6, null);
    			append_dev(div2, t30);
    			append_dev(div2, a10);
    			append_dev(a10, i7);
    			mount_component(whatsapp, i7, null);
    			append_dev(div2, t31);
    			append_dev(div2, a11);
    			append_dev(a11, i8);
    			mount_component(line, i8, null);
    			append_dev(footer, t32);
    			append_dev(footer, div9);
    			append_dev(div9, div7);
    			append_dev(div7, t33);
    			append_dev(div7, strong2);
    			append_dev(div7, t35);
    			append_dev(div9, t36);
    			append_dev(div9, div8);
    			append_dev(div8, t37);
    			append_dev(div8, a12);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(twitter.$$.fragment, local);
    			transition_in(facebook.$$.fragment, local);
    			transition_in(instagram.$$.fragment, local);
    			transition_in(youtube.$$.fragment, local);
    			transition_in(linkedin.$$.fragment, local);
    			transition_in(tiktok.$$.fragment, local);
    			transition_in(discord.$$.fragment, local);
    			transition_in(whatsapp.$$.fragment, local);
    			transition_in(line.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(twitter.$$.fragment, local);
    			transition_out(facebook.$$.fragment, local);
    			transition_out(instagram.$$.fragment, local);
    			transition_out(youtube.$$.fragment, local);
    			transition_out(linkedin.$$.fragment, local);
    			transition_out(tiktok.$$.fragment, local);
    			transition_out(discord.$$.fragment, local);
    			transition_out(whatsapp.$$.fragment, local);
    			transition_out(line.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(footer);
    			destroy_component(twitter);
    			destroy_component(facebook);
    			destroy_component(instagram);
    			destroy_component(youtube);
    			destroy_component(linkedin);
    			destroy_component(tiktok);
    			destroy_component(discord);
    			destroy_component(whatsapp);
    			destroy_component(line);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$u.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$u($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Footer', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Footer> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Discord: Discord$1,
    		Facebook: Facebook$1,
    		Instagram: Instagram$1,
    		Line: Line$1,
    		Linkedin: Linkedin$1,
    		Tiktok: Tiktok$1,
    		Twitter: Twitter$1,
    		Whatsapp: Whatsapp$1,
    		Youtube: Youtube$1
    	});

    	return [];
    }

    class Footer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$u, create_fragment$u, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Footer",
    			options,
    			id: create_fragment$u.name
    		});
    	}
    }

    function cubicOut(t) {
        const f = t - 1.0;
        return f * f * f + 1.0;
    }

    function slide$1(node, { delay = 0, duration = 400, easing = cubicOut } = {}) {
        const style = getComputedStyle(node);
        const opacity = +style.opacity;
        const height = parseFloat(style.height);
        const padding_top = parseFloat(style.paddingTop);
        const padding_bottom = parseFloat(style.paddingBottom);
        const margin_top = parseFloat(style.marginTop);
        const margin_bottom = parseFloat(style.marginBottom);
        const border_top_width = parseFloat(style.borderTopWidth);
        const border_bottom_width = parseFloat(style.borderBottomWidth);
        return {
            delay,
            duration,
            easing,
            css: t => 'overflow: hidden;' +
                `opacity: ${Math.min(t * 20, 1) * opacity};` +
                `height: ${t * height}px;` +
                `padding-top: ${t * padding_top}px;` +
                `padding-bottom: ${t * padding_bottom}px;` +
                `margin-top: ${t * margin_top}px;` +
                `margin-bottom: ${t * margin_bottom}px;` +
                `border-top-width: ${t * border_top_width}px;` +
                `border-bottom-width: ${t * border_bottom_width}px;`
        };
    }

    var top = 'top';
    var bottom = 'bottom';
    var right = 'right';
    var left = 'left';
    var auto = 'auto';
    var basePlacements = [top, bottom, right, left];
    var start = 'start';
    var end = 'end';
    var clippingParents = 'clippingParents';
    var viewport = 'viewport';
    var popper = 'popper';
    var reference = 'reference';
    var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
      return acc.concat([placement + "-" + start, placement + "-" + end]);
    }, []);
    var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
      return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
    }, []); // modifiers that need to read the DOM

    var beforeRead = 'beforeRead';
    var read = 'read';
    var afterRead = 'afterRead'; // pure-logic modifiers

    var beforeMain = 'beforeMain';
    var main = 'main';
    var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

    var beforeWrite = 'beforeWrite';
    var write = 'write';
    var afterWrite = 'afterWrite';
    var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

    function getNodeName(element) {
      return element ? (element.nodeName || '').toLowerCase() : null;
    }

    function getWindow$1(node) {
      if (node == null) {
        return window;
      }

      if (node.toString() !== '[object Window]') {
        var ownerDocument = node.ownerDocument;
        return ownerDocument ? ownerDocument.defaultView || window : window;
      }

      return node;
    }

    function isElement(node) {
      var OwnElement = getWindow$1(node).Element;
      return node instanceof OwnElement || node instanceof Element;
    }

    function isHTMLElement(node) {
      var OwnElement = getWindow$1(node).HTMLElement;
      return node instanceof OwnElement || node instanceof HTMLElement;
    }

    function isShadowRoot(node) {
      // IE 11 has no ShadowRoot
      if (typeof ShadowRoot === 'undefined') {
        return false;
      }

      var OwnElement = getWindow$1(node).ShadowRoot;
      return node instanceof OwnElement || node instanceof ShadowRoot;
    }

    // and applies them to the HTMLElements such as popper and arrow

    function applyStyles(_ref) {
      var state = _ref.state;
      Object.keys(state.elements).forEach(function (name) {
        var style = state.styles[name] || {};
        var attributes = state.attributes[name] || {};
        var element = state.elements[name]; // arrow is optional + virtual elements

        if (!isHTMLElement(element) || !getNodeName(element)) {
          return;
        } // Flow doesn't support to extend this property, but it's the most
        // effective way to apply styles to an HTMLElement
        // $FlowFixMe[cannot-write]


        Object.assign(element.style, style);
        Object.keys(attributes).forEach(function (name) {
          var value = attributes[name];

          if (value === false) {
            element.removeAttribute(name);
          } else {
            element.setAttribute(name, value === true ? '' : value);
          }
        });
      });
    }

    function effect$2(_ref2) {
      var state = _ref2.state;
      var initialStyles = {
        popper: {
          position: state.options.strategy,
          left: '0',
          top: '0',
          margin: '0'
        },
        arrow: {
          position: 'absolute'
        },
        reference: {}
      };
      Object.assign(state.elements.popper.style, initialStyles.popper);
      state.styles = initialStyles;

      if (state.elements.arrow) {
        Object.assign(state.elements.arrow.style, initialStyles.arrow);
      }

      return function () {
        Object.keys(state.elements).forEach(function (name) {
          var element = state.elements[name];
          var attributes = state.attributes[name] || {};
          var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

          var style = styleProperties.reduce(function (style, property) {
            style[property] = '';
            return style;
          }, {}); // arrow is optional + virtual elements

          if (!isHTMLElement(element) || !getNodeName(element)) {
            return;
          }

          Object.assign(element.style, style);
          Object.keys(attributes).forEach(function (attribute) {
            element.removeAttribute(attribute);
          });
        });
      };
    } // eslint-disable-next-line import/no-unused-modules


    var applyStyles$1 = {
      name: 'applyStyles',
      enabled: true,
      phase: 'write',
      fn: applyStyles,
      effect: effect$2,
      requires: ['computeStyles']
    };

    function getBasePlacement(placement) {
      return placement.split('-')[0];
    }

    var max = Math.max;
    var min = Math.min;
    var round = Math.round;

    function getBoundingClientRect(element, includeScale) {
      if (includeScale === void 0) {
        includeScale = false;
      }

      var rect = element.getBoundingClientRect();
      var scaleX = 1;
      var scaleY = 1;

      if (isHTMLElement(element) && includeScale) {
        var offsetHeight = element.offsetHeight;
        var offsetWidth = element.offsetWidth; // Do not attempt to divide by 0, otherwise we get `Infinity` as scale
        // Fallback to 1 in case both values are `0`

        if (offsetWidth > 0) {
          scaleX = round(rect.width) / offsetWidth || 1;
        }

        if (offsetHeight > 0) {
          scaleY = round(rect.height) / offsetHeight || 1;
        }
      }

      return {
        width: rect.width / scaleX,
        height: rect.height / scaleY,
        top: rect.top / scaleY,
        right: rect.right / scaleX,
        bottom: rect.bottom / scaleY,
        left: rect.left / scaleX,
        x: rect.left / scaleX,
        y: rect.top / scaleY
      };
    }

    // means it doesn't take into account transforms.

    function getLayoutRect(element) {
      var clientRect = getBoundingClientRect(element); // Use the clientRect sizes if it's not been transformed.
      // Fixes https://github.com/popperjs/popper-core/issues/1223

      var width = element.offsetWidth;
      var height = element.offsetHeight;

      if (Math.abs(clientRect.width - width) <= 1) {
        width = clientRect.width;
      }

      if (Math.abs(clientRect.height - height) <= 1) {
        height = clientRect.height;
      }

      return {
        x: element.offsetLeft,
        y: element.offsetTop,
        width: width,
        height: height
      };
    }

    function contains(parent, child) {
      var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

      if (parent.contains(child)) {
        return true;
      } // then fallback to custom implementation with Shadow DOM support
      else if (rootNode && isShadowRoot(rootNode)) {
          var next = child;

          do {
            if (next && parent.isSameNode(next)) {
              return true;
            } // $FlowFixMe[prop-missing]: need a better way to handle this...


            next = next.parentNode || next.host;
          } while (next);
        } // Give up, the result is false


      return false;
    }

    function getComputedStyle$2(element) {
      return getWindow$1(element).getComputedStyle(element);
    }

    function isTableElement(element) {
      return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
    }

    function getDocumentElement(element) {
      // $FlowFixMe[incompatible-return]: assume body is always available
      return ((isElement(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
      element.document) || window.document).documentElement;
    }

    function getParentNode(element) {
      if (getNodeName(element) === 'html') {
        return element;
      }

      return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
        // $FlowFixMe[incompatible-return]
        // $FlowFixMe[prop-missing]
        element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
        element.parentNode || ( // DOM Element detected
        isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
        // $FlowFixMe[incompatible-call]: HTMLElement is a Node
        getDocumentElement(element) // fallback

      );
    }

    function getTrueOffsetParent(element) {
      if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
      getComputedStyle$2(element).position === 'fixed') {
        return null;
      }

      return element.offsetParent;
    } // `.offsetParent` reports `null` for fixed elements, while absolute elements
    // return the containing block


    function getContainingBlock(element) {
      var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') !== -1;
      var isIE = navigator.userAgent.indexOf('Trident') !== -1;

      if (isIE && isHTMLElement(element)) {
        // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
        var elementCss = getComputedStyle$2(element);

        if (elementCss.position === 'fixed') {
          return null;
        }
      }

      var currentNode = getParentNode(element);

      if (isShadowRoot(currentNode)) {
        currentNode = currentNode.host;
      }

      while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
        var css = getComputedStyle$2(currentNode); // This is non-exhaustive but covers the most common CSS properties that
        // create a containing block.
        // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

        if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
          return currentNode;
        } else {
          currentNode = currentNode.parentNode;
        }
      }

      return null;
    } // Gets the closest ancestor positioned element. Handles some edge cases,
    // such as table ancestors and cross browser bugs.


    function getOffsetParent(element) {
      var window = getWindow$1(element);
      var offsetParent = getTrueOffsetParent(element);

      while (offsetParent && isTableElement(offsetParent) && getComputedStyle$2(offsetParent).position === 'static') {
        offsetParent = getTrueOffsetParent(offsetParent);
      }

      if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle$2(offsetParent).position === 'static')) {
        return window;
      }

      return offsetParent || getContainingBlock(element) || window;
    }

    function getMainAxisFromPlacement(placement) {
      return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
    }

    function within(min$1, value, max$1) {
      return max(min$1, min(value, max$1));
    }
    function withinMaxClamp(min, value, max) {
      var v = within(min, value, max);
      return v > max ? max : v;
    }

    function getFreshSideObject() {
      return {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      };
    }

    function mergePaddingObject(paddingObject) {
      return Object.assign({}, getFreshSideObject(), paddingObject);
    }

    function expandToHashMap(value, keys) {
      return keys.reduce(function (hashMap, key) {
        hashMap[key] = value;
        return hashMap;
      }, {});
    }

    var toPaddingObject = function toPaddingObject(padding, state) {
      padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
        placement: state.placement
      })) : padding;
      return mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
    };

    function arrow(_ref) {
      var _state$modifiersData$;

      var state = _ref.state,
          name = _ref.name,
          options = _ref.options;
      var arrowElement = state.elements.arrow;
      var popperOffsets = state.modifiersData.popperOffsets;
      var basePlacement = getBasePlacement(state.placement);
      var axis = getMainAxisFromPlacement(basePlacement);
      var isVertical = [left, right].indexOf(basePlacement) >= 0;
      var len = isVertical ? 'height' : 'width';

      if (!arrowElement || !popperOffsets) {
        return;
      }

      var paddingObject = toPaddingObject(options.padding, state);
      var arrowRect = getLayoutRect(arrowElement);
      var minProp = axis === 'y' ? top : left;
      var maxProp = axis === 'y' ? bottom : right;
      var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
      var startDiff = popperOffsets[axis] - state.rects.reference[axis];
      var arrowOffsetParent = getOffsetParent(arrowElement);
      var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
      var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
      // outside of the popper bounds

      var min = paddingObject[minProp];
      var max = clientSize - arrowRect[len] - paddingObject[maxProp];
      var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
      var offset = within(min, center, max); // Prevents breaking syntax highlighting...

      var axisProp = axis;
      state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
    }

    function effect$1(_ref2) {
      var state = _ref2.state,
          options = _ref2.options;
      var _options$element = options.element,
          arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;

      if (arrowElement == null) {
        return;
      } // CSS selector


      if (typeof arrowElement === 'string') {
        arrowElement = state.elements.popper.querySelector(arrowElement);

        if (!arrowElement) {
          return;
        }
      }

      if (!contains(state.elements.popper, arrowElement)) {

        return;
      }

      state.elements.arrow = arrowElement;
    } // eslint-disable-next-line import/no-unused-modules


    var arrow$1 = {
      name: 'arrow',
      enabled: true,
      phase: 'main',
      fn: arrow,
      effect: effect$1,
      requires: ['popperOffsets'],
      requiresIfExists: ['preventOverflow']
    };

    function getVariation(placement) {
      return placement.split('-')[1];
    }

    var unsetSides = {
      top: 'auto',
      right: 'auto',
      bottom: 'auto',
      left: 'auto'
    }; // Round the offsets to the nearest suitable subpixel based on the DPR.
    // Zooming can change the DPR, but it seems to report a value that will
    // cleanly divide the values into the appropriate subpixels.

    function roundOffsetsByDPR(_ref) {
      var x = _ref.x,
          y = _ref.y;
      var win = window;
      var dpr = win.devicePixelRatio || 1;
      return {
        x: round(x * dpr) / dpr || 0,
        y: round(y * dpr) / dpr || 0
      };
    }

    function mapToStyles(_ref2) {
      var _Object$assign2;

      var popper = _ref2.popper,
          popperRect = _ref2.popperRect,
          placement = _ref2.placement,
          variation = _ref2.variation,
          offsets = _ref2.offsets,
          position = _ref2.position,
          gpuAcceleration = _ref2.gpuAcceleration,
          adaptive = _ref2.adaptive,
          roundOffsets = _ref2.roundOffsets,
          isFixed = _ref2.isFixed;
      var _offsets$x = offsets.x,
          x = _offsets$x === void 0 ? 0 : _offsets$x,
          _offsets$y = offsets.y,
          y = _offsets$y === void 0 ? 0 : _offsets$y;

      var _ref3 = typeof roundOffsets === 'function' ? roundOffsets({
        x: x,
        y: y
      }) : {
        x: x,
        y: y
      };

      x = _ref3.x;
      y = _ref3.y;
      var hasX = offsets.hasOwnProperty('x');
      var hasY = offsets.hasOwnProperty('y');
      var sideX = left;
      var sideY = top;
      var win = window;

      if (adaptive) {
        var offsetParent = getOffsetParent(popper);
        var heightProp = 'clientHeight';
        var widthProp = 'clientWidth';

        if (offsetParent === getWindow$1(popper)) {
          offsetParent = getDocumentElement(popper);

          if (getComputedStyle$2(offsetParent).position !== 'static' && position === 'absolute') {
            heightProp = 'scrollHeight';
            widthProp = 'scrollWidth';
          }
        } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


        offsetParent = offsetParent;

        if (placement === top || (placement === left || placement === right) && variation === end) {
          sideY = bottom;
          var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : // $FlowFixMe[prop-missing]
          offsetParent[heightProp];
          y -= offsetY - popperRect.height;
          y *= gpuAcceleration ? 1 : -1;
        }

        if (placement === left || (placement === top || placement === bottom) && variation === end) {
          sideX = right;
          var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : // $FlowFixMe[prop-missing]
          offsetParent[widthProp];
          x -= offsetX - popperRect.width;
          x *= gpuAcceleration ? 1 : -1;
        }
      }

      var commonStyles = Object.assign({
        position: position
      }, adaptive && unsetSides);

      var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
        x: x,
        y: y
      }) : {
        x: x,
        y: y
      };

      x = _ref4.x;
      y = _ref4.y;

      if (gpuAcceleration) {
        var _Object$assign;

        return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
      }

      return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
    }

    function computeStyles(_ref5) {
      var state = _ref5.state,
          options = _ref5.options;
      var _options$gpuAccelerat = options.gpuAcceleration,
          gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
          _options$adaptive = options.adaptive,
          adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
          _options$roundOffsets = options.roundOffsets,
          roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;

      var commonStyles = {
        placement: getBasePlacement(state.placement),
        variation: getVariation(state.placement),
        popper: state.elements.popper,
        popperRect: state.rects.popper,
        gpuAcceleration: gpuAcceleration,
        isFixed: state.options.strategy === 'fixed'
      };

      if (state.modifiersData.popperOffsets != null) {
        state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
          offsets: state.modifiersData.popperOffsets,
          position: state.options.strategy,
          adaptive: adaptive,
          roundOffsets: roundOffsets
        })));
      }

      if (state.modifiersData.arrow != null) {
        state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
          offsets: state.modifiersData.arrow,
          position: 'absolute',
          adaptive: false,
          roundOffsets: roundOffsets
        })));
      }

      state.attributes.popper = Object.assign({}, state.attributes.popper, {
        'data-popper-placement': state.placement
      });
    } // eslint-disable-next-line import/no-unused-modules


    var computeStyles$1 = {
      name: 'computeStyles',
      enabled: true,
      phase: 'beforeWrite',
      fn: computeStyles,
      data: {}
    };

    var passive = {
      passive: true
    };

    function effect(_ref) {
      var state = _ref.state,
          instance = _ref.instance,
          options = _ref.options;
      var _options$scroll = options.scroll,
          scroll = _options$scroll === void 0 ? true : _options$scroll,
          _options$resize = options.resize,
          resize = _options$resize === void 0 ? true : _options$resize;
      var window = getWindow$1(state.elements.popper);
      var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

      if (scroll) {
        scrollParents.forEach(function (scrollParent) {
          scrollParent.addEventListener('scroll', instance.update, passive);
        });
      }

      if (resize) {
        window.addEventListener('resize', instance.update, passive);
      }

      return function () {
        if (scroll) {
          scrollParents.forEach(function (scrollParent) {
            scrollParent.removeEventListener('scroll', instance.update, passive);
          });
        }

        if (resize) {
          window.removeEventListener('resize', instance.update, passive);
        }
      };
    } // eslint-disable-next-line import/no-unused-modules


    var eventListeners = {
      name: 'eventListeners',
      enabled: true,
      phase: 'write',
      fn: function fn() {},
      effect: effect,
      data: {}
    };

    var hash$1 = {
      left: 'right',
      right: 'left',
      bottom: 'top',
      top: 'bottom'
    };
    function getOppositePlacement(placement) {
      return placement.replace(/left|right|bottom|top/g, function (matched) {
        return hash$1[matched];
      });
    }

    var hash = {
      start: 'end',
      end: 'start'
    };
    function getOppositeVariationPlacement(placement) {
      return placement.replace(/start|end/g, function (matched) {
        return hash[matched];
      });
    }

    function getWindowScroll(node) {
      var win = getWindow$1(node);
      var scrollLeft = win.pageXOffset;
      var scrollTop = win.pageYOffset;
      return {
        scrollLeft: scrollLeft,
        scrollTop: scrollTop
      };
    }

    function getWindowScrollBarX(element) {
      // If <html> has a CSS width greater than the viewport, then this will be
      // incorrect for RTL.
      // Popper 1 is broken in this case and never had a bug report so let's assume
      // it's not an issue. I don't think anyone ever specifies width on <html>
      // anyway.
      // Browsers where the left scrollbar doesn't cause an issue report `0` for
      // this (e.g. Edge 2019, IE11, Safari)
      return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
    }

    function getViewportRect(element) {
      var win = getWindow$1(element);
      var html = getDocumentElement(element);
      var visualViewport = win.visualViewport;
      var width = html.clientWidth;
      var height = html.clientHeight;
      var x = 0;
      var y = 0; // NB: This isn't supported on iOS <= 12. If the keyboard is open, the popper
      // can be obscured underneath it.
      // Also, `html.clientHeight` adds the bottom bar height in Safari iOS, even
      // if it isn't open, so if this isn't available, the popper will be detected
      // to overflow the bottom of the screen too early.

      if (visualViewport) {
        width = visualViewport.width;
        height = visualViewport.height; // Uses Layout Viewport (like Chrome; Safari does not currently)
        // In Chrome, it returns a value very close to 0 (+/-) but contains rounding
        // errors due to floating point numbers, so we need to check precision.
        // Safari returns a number <= 0, usually < -1 when pinch-zoomed
        // Feature detection fails in mobile emulation mode in Chrome.
        // Math.abs(win.innerWidth / visualViewport.scale - visualViewport.width) <
        // 0.001
        // Fallback here: "Not Safari" userAgent

        if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
          x = visualViewport.offsetLeft;
          y = visualViewport.offsetTop;
        }
      }

      return {
        width: width,
        height: height,
        x: x + getWindowScrollBarX(element),
        y: y
      };
    }

    // of the `<html>` and `<body>` rect bounds if horizontally scrollable

    function getDocumentRect(element) {
      var _element$ownerDocumen;

      var html = getDocumentElement(element);
      var winScroll = getWindowScroll(element);
      var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
      var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
      var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
      var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
      var y = -winScroll.scrollTop;

      if (getComputedStyle$2(body || html).direction === 'rtl') {
        x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
      }

      return {
        width: width,
        height: height,
        x: x,
        y: y
      };
    }

    function isScrollParent(element) {
      // Firefox wants us to check `-x` and `-y` variations as well
      var _getComputedStyle = getComputedStyle$2(element),
          overflow = _getComputedStyle.overflow,
          overflowX = _getComputedStyle.overflowX,
          overflowY = _getComputedStyle.overflowY;

      return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
    }

    function getScrollParent(node) {
      if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
        // $FlowFixMe[incompatible-return]: assume body is always available
        return node.ownerDocument.body;
      }

      if (isHTMLElement(node) && isScrollParent(node)) {
        return node;
      }

      return getScrollParent(getParentNode(node));
    }

    /*
    given a DOM element, return the list of all scroll parents, up the list of ancesors
    until we get to the top window object. This list is what we attach scroll listeners
    to, because if any of these parent elements scroll, we'll need to re-calculate the
    reference element's position.
    */

    function listScrollParents(element, list) {
      var _element$ownerDocumen;

      if (list === void 0) {
        list = [];
      }

      var scrollParent = getScrollParent(element);
      var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
      var win = getWindow$1(scrollParent);
      var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
      var updatedList = list.concat(target);
      return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
      updatedList.concat(listScrollParents(getParentNode(target)));
    }

    function rectToClientRect(rect) {
      return Object.assign({}, rect, {
        left: rect.x,
        top: rect.y,
        right: rect.x + rect.width,
        bottom: rect.y + rect.height
      });
    }

    function getInnerBoundingClientRect(element) {
      var rect = getBoundingClientRect(element);
      rect.top = rect.top + element.clientTop;
      rect.left = rect.left + element.clientLeft;
      rect.bottom = rect.top + element.clientHeight;
      rect.right = rect.left + element.clientWidth;
      rect.width = element.clientWidth;
      rect.height = element.clientHeight;
      rect.x = rect.left;
      rect.y = rect.top;
      return rect;
    }

    function getClientRectFromMixedType(element, clippingParent) {
      return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
    } // A "clipping parent" is an overflowable container with the characteristic of
    // clipping (or hiding) overflowing elements with a position different from
    // `initial`


    function getClippingParents(element) {
      var clippingParents = listScrollParents(getParentNode(element));
      var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle$2(element).position) >= 0;
      var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;

      if (!isElement(clipperElement)) {
        return [];
      } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


      return clippingParents.filter(function (clippingParent) {
        return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
      });
    } // Gets the maximum area that the element is visible in due to any number of
    // clipping parents


    function getClippingRect(element, boundary, rootBoundary) {
      var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
      var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
      var firstClippingParent = clippingParents[0];
      var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
        var rect = getClientRectFromMixedType(element, clippingParent);
        accRect.top = max(rect.top, accRect.top);
        accRect.right = min(rect.right, accRect.right);
        accRect.bottom = min(rect.bottom, accRect.bottom);
        accRect.left = max(rect.left, accRect.left);
        return accRect;
      }, getClientRectFromMixedType(element, firstClippingParent));
      clippingRect.width = clippingRect.right - clippingRect.left;
      clippingRect.height = clippingRect.bottom - clippingRect.top;
      clippingRect.x = clippingRect.left;
      clippingRect.y = clippingRect.top;
      return clippingRect;
    }

    function computeOffsets(_ref) {
      var reference = _ref.reference,
          element = _ref.element,
          placement = _ref.placement;
      var basePlacement = placement ? getBasePlacement(placement) : null;
      var variation = placement ? getVariation(placement) : null;
      var commonX = reference.x + reference.width / 2 - element.width / 2;
      var commonY = reference.y + reference.height / 2 - element.height / 2;
      var offsets;

      switch (basePlacement) {
        case top:
          offsets = {
            x: commonX,
            y: reference.y - element.height
          };
          break;

        case bottom:
          offsets = {
            x: commonX,
            y: reference.y + reference.height
          };
          break;

        case right:
          offsets = {
            x: reference.x + reference.width,
            y: commonY
          };
          break;

        case left:
          offsets = {
            x: reference.x - element.width,
            y: commonY
          };
          break;

        default:
          offsets = {
            x: reference.x,
            y: reference.y
          };
      }

      var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;

      if (mainAxis != null) {
        var len = mainAxis === 'y' ? 'height' : 'width';

        switch (variation) {
          case start:
            offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
            break;

          case end:
            offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
            break;
        }
      }

      return offsets;
    }

    function detectOverflow(state, options) {
      if (options === void 0) {
        options = {};
      }

      var _options = options,
          _options$placement = _options.placement,
          placement = _options$placement === void 0 ? state.placement : _options$placement,
          _options$boundary = _options.boundary,
          boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
          _options$rootBoundary = _options.rootBoundary,
          rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
          _options$elementConte = _options.elementContext,
          elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
          _options$altBoundary = _options.altBoundary,
          altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
          _options$padding = _options.padding,
          padding = _options$padding === void 0 ? 0 : _options$padding;
      var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
      var altContext = elementContext === popper ? reference : popper;
      var popperRect = state.rects.popper;
      var element = state.elements[altBoundary ? altContext : elementContext];
      var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
      var referenceClientRect = getBoundingClientRect(state.elements.reference);
      var popperOffsets = computeOffsets({
        reference: referenceClientRect,
        element: popperRect,
        strategy: 'absolute',
        placement: placement
      });
      var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
      var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
      // 0 or negative = within the clipping rect

      var overflowOffsets = {
        top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
        bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
        left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
        right: elementClientRect.right - clippingClientRect.right + paddingObject.right
      };
      var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

      if (elementContext === popper && offsetData) {
        var offset = offsetData[placement];
        Object.keys(overflowOffsets).forEach(function (key) {
          var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
          var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
          overflowOffsets[key] += offset[axis] * multiply;
        });
      }

      return overflowOffsets;
    }

    function computeAutoPlacement(state, options) {
      if (options === void 0) {
        options = {};
      }

      var _options = options,
          placement = _options.placement,
          boundary = _options.boundary,
          rootBoundary = _options.rootBoundary,
          padding = _options.padding,
          flipVariations = _options.flipVariations,
          _options$allowedAutoP = _options.allowedAutoPlacements,
          allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
      var variation = getVariation(placement);
      var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
        return getVariation(placement) === variation;
      }) : basePlacements;
      var allowedPlacements = placements$1.filter(function (placement) {
        return allowedAutoPlacements.indexOf(placement) >= 0;
      });

      if (allowedPlacements.length === 0) {
        allowedPlacements = placements$1;
      } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


      var overflows = allowedPlacements.reduce(function (acc, placement) {
        acc[placement] = detectOverflow(state, {
          placement: placement,
          boundary: boundary,
          rootBoundary: rootBoundary,
          padding: padding
        })[getBasePlacement(placement)];
        return acc;
      }, {});
      return Object.keys(overflows).sort(function (a, b) {
        return overflows[a] - overflows[b];
      });
    }

    function getExpandedFallbackPlacements(placement) {
      if (getBasePlacement(placement) === auto) {
        return [];
      }

      var oppositePlacement = getOppositePlacement(placement);
      return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
    }

    function flip(_ref) {
      var state = _ref.state,
          options = _ref.options,
          name = _ref.name;

      if (state.modifiersData[name]._skip) {
        return;
      }

      var _options$mainAxis = options.mainAxis,
          checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
          _options$altAxis = options.altAxis,
          checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
          specifiedFallbackPlacements = options.fallbackPlacements,
          padding = options.padding,
          boundary = options.boundary,
          rootBoundary = options.rootBoundary,
          altBoundary = options.altBoundary,
          _options$flipVariatio = options.flipVariations,
          flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
          allowedAutoPlacements = options.allowedAutoPlacements;
      var preferredPlacement = state.options.placement;
      var basePlacement = getBasePlacement(preferredPlacement);
      var isBasePlacement = basePlacement === preferredPlacement;
      var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
      var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
        return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
          placement: placement,
          boundary: boundary,
          rootBoundary: rootBoundary,
          padding: padding,
          flipVariations: flipVariations,
          allowedAutoPlacements: allowedAutoPlacements
        }) : placement);
      }, []);
      var referenceRect = state.rects.reference;
      var popperRect = state.rects.popper;
      var checksMap = new Map();
      var makeFallbackChecks = true;
      var firstFittingPlacement = placements[0];

      for (var i = 0; i < placements.length; i++) {
        var placement = placements[i];

        var _basePlacement = getBasePlacement(placement);

        var isStartVariation = getVariation(placement) === start;
        var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
        var len = isVertical ? 'width' : 'height';
        var overflow = detectOverflow(state, {
          placement: placement,
          boundary: boundary,
          rootBoundary: rootBoundary,
          altBoundary: altBoundary,
          padding: padding
        });
        var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;

        if (referenceRect[len] > popperRect[len]) {
          mainVariationSide = getOppositePlacement(mainVariationSide);
        }

        var altVariationSide = getOppositePlacement(mainVariationSide);
        var checks = [];

        if (checkMainAxis) {
          checks.push(overflow[_basePlacement] <= 0);
        }

        if (checkAltAxis) {
          checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
        }

        if (checks.every(function (check) {
          return check;
        })) {
          firstFittingPlacement = placement;
          makeFallbackChecks = false;
          break;
        }

        checksMap.set(placement, checks);
      }

      if (makeFallbackChecks) {
        // `2` may be desired in some cases – research later
        var numberOfChecks = flipVariations ? 3 : 1;

        var _loop = function _loop(_i) {
          var fittingPlacement = placements.find(function (placement) {
            var checks = checksMap.get(placement);

            if (checks) {
              return checks.slice(0, _i).every(function (check) {
                return check;
              });
            }
          });

          if (fittingPlacement) {
            firstFittingPlacement = fittingPlacement;
            return "break";
          }
        };

        for (var _i = numberOfChecks; _i > 0; _i--) {
          var _ret = _loop(_i);

          if (_ret === "break") break;
        }
      }

      if (state.placement !== firstFittingPlacement) {
        state.modifiersData[name]._skip = true;
        state.placement = firstFittingPlacement;
        state.reset = true;
      }
    } // eslint-disable-next-line import/no-unused-modules


    var flip$1 = {
      name: 'flip',
      enabled: true,
      phase: 'main',
      fn: flip,
      requiresIfExists: ['offset'],
      data: {
        _skip: false
      }
    };

    function getSideOffsets(overflow, rect, preventedOffsets) {
      if (preventedOffsets === void 0) {
        preventedOffsets = {
          x: 0,
          y: 0
        };
      }

      return {
        top: overflow.top - rect.height - preventedOffsets.y,
        right: overflow.right - rect.width + preventedOffsets.x,
        bottom: overflow.bottom - rect.height + preventedOffsets.y,
        left: overflow.left - rect.width - preventedOffsets.x
      };
    }

    function isAnySideFullyClipped(overflow) {
      return [top, right, bottom, left].some(function (side) {
        return overflow[side] >= 0;
      });
    }

    function hide(_ref) {
      var state = _ref.state,
          name = _ref.name;
      var referenceRect = state.rects.reference;
      var popperRect = state.rects.popper;
      var preventedOffsets = state.modifiersData.preventOverflow;
      var referenceOverflow = detectOverflow(state, {
        elementContext: 'reference'
      });
      var popperAltOverflow = detectOverflow(state, {
        altBoundary: true
      });
      var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
      var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
      var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
      var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
      state.modifiersData[name] = {
        referenceClippingOffsets: referenceClippingOffsets,
        popperEscapeOffsets: popperEscapeOffsets,
        isReferenceHidden: isReferenceHidden,
        hasPopperEscaped: hasPopperEscaped
      };
      state.attributes.popper = Object.assign({}, state.attributes.popper, {
        'data-popper-reference-hidden': isReferenceHidden,
        'data-popper-escaped': hasPopperEscaped
      });
    } // eslint-disable-next-line import/no-unused-modules


    var hide$1 = {
      name: 'hide',
      enabled: true,
      phase: 'main',
      requiresIfExists: ['preventOverflow'],
      fn: hide
    };

    function distanceAndSkiddingToXY(placement, rects, offset) {
      var basePlacement = getBasePlacement(placement);
      var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;

      var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
        placement: placement
      })) : offset,
          skidding = _ref[0],
          distance = _ref[1];

      skidding = skidding || 0;
      distance = (distance || 0) * invertDistance;
      return [left, right].indexOf(basePlacement) >= 0 ? {
        x: distance,
        y: skidding
      } : {
        x: skidding,
        y: distance
      };
    }

    function offset$1(_ref2) {
      var state = _ref2.state,
          options = _ref2.options,
          name = _ref2.name;
      var _options$offset = options.offset,
          offset = _options$offset === void 0 ? [0, 0] : _options$offset;
      var data = placements.reduce(function (acc, placement) {
        acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
        return acc;
      }, {});
      var _data$state$placement = data[state.placement],
          x = _data$state$placement.x,
          y = _data$state$placement.y;

      if (state.modifiersData.popperOffsets != null) {
        state.modifiersData.popperOffsets.x += x;
        state.modifiersData.popperOffsets.y += y;
      }

      state.modifiersData[name] = data;
    } // eslint-disable-next-line import/no-unused-modules


    var offset$2 = {
      name: 'offset',
      enabled: true,
      phase: 'main',
      requires: ['popperOffsets'],
      fn: offset$1
    };

    function popperOffsets(_ref) {
      var state = _ref.state,
          name = _ref.name;
      // Offsets are the actual position the popper needs to have to be
      // properly positioned near its reference element
      // This is the most basic placement, and will be adjusted by
      // the modifiers in the next step
      state.modifiersData[name] = computeOffsets({
        reference: state.rects.reference,
        element: state.rects.popper,
        strategy: 'absolute',
        placement: state.placement
      });
    } // eslint-disable-next-line import/no-unused-modules


    var popperOffsets$1 = {
      name: 'popperOffsets',
      enabled: true,
      phase: 'read',
      fn: popperOffsets,
      data: {}
    };

    function getAltAxis(axis) {
      return axis === 'x' ? 'y' : 'x';
    }

    function preventOverflow(_ref) {
      var state = _ref.state,
          options = _ref.options,
          name = _ref.name;
      var _options$mainAxis = options.mainAxis,
          checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
          _options$altAxis = options.altAxis,
          checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
          boundary = options.boundary,
          rootBoundary = options.rootBoundary,
          altBoundary = options.altBoundary,
          padding = options.padding,
          _options$tether = options.tether,
          tether = _options$tether === void 0 ? true : _options$tether,
          _options$tetherOffset = options.tetherOffset,
          tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
      var overflow = detectOverflow(state, {
        boundary: boundary,
        rootBoundary: rootBoundary,
        padding: padding,
        altBoundary: altBoundary
      });
      var basePlacement = getBasePlacement(state.placement);
      var variation = getVariation(state.placement);
      var isBasePlacement = !variation;
      var mainAxis = getMainAxisFromPlacement(basePlacement);
      var altAxis = getAltAxis(mainAxis);
      var popperOffsets = state.modifiersData.popperOffsets;
      var referenceRect = state.rects.reference;
      var popperRect = state.rects.popper;
      var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
        placement: state.placement
      })) : tetherOffset;
      var normalizedTetherOffsetValue = typeof tetherOffsetValue === 'number' ? {
        mainAxis: tetherOffsetValue,
        altAxis: tetherOffsetValue
      } : Object.assign({
        mainAxis: 0,
        altAxis: 0
      }, tetherOffsetValue);
      var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
      var data = {
        x: 0,
        y: 0
      };

      if (!popperOffsets) {
        return;
      }

      if (checkMainAxis) {
        var _offsetModifierState$;

        var mainSide = mainAxis === 'y' ? top : left;
        var altSide = mainAxis === 'y' ? bottom : right;
        var len = mainAxis === 'y' ? 'height' : 'width';
        var offset = popperOffsets[mainAxis];
        var min$1 = offset + overflow[mainSide];
        var max$1 = offset - overflow[altSide];
        var additive = tether ? -popperRect[len] / 2 : 0;
        var minLen = variation === start ? referenceRect[len] : popperRect[len];
        var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
        // outside the reference bounds

        var arrowElement = state.elements.arrow;
        var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
          width: 0,
          height: 0
        };
        var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
        var arrowPaddingMin = arrowPaddingObject[mainSide];
        var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
        // to include its full size in the calculation. If the reference is small
        // and near the edge of a boundary, the popper can overflow even if the
        // reference is not overflowing as well (e.g. virtual elements with no
        // width or height)

        var arrowLen = within(0, referenceRect[len], arrowRect[len]);
        var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
        var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
        var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
        var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
        var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
        var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
        var tetherMax = offset + maxOffset - offsetModifierValue;
        var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset, tether ? max(max$1, tetherMax) : max$1);
        popperOffsets[mainAxis] = preventedOffset;
        data[mainAxis] = preventedOffset - offset;
      }

      if (checkAltAxis) {
        var _offsetModifierState$2;

        var _mainSide = mainAxis === 'x' ? top : left;

        var _altSide = mainAxis === 'x' ? bottom : right;

        var _offset = popperOffsets[altAxis];

        var _len = altAxis === 'y' ? 'height' : 'width';

        var _min = _offset + overflow[_mainSide];

        var _max = _offset - overflow[_altSide];

        var isOriginSide = [top, left].indexOf(basePlacement) !== -1;

        var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;

        var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;

        var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;

        var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);

        popperOffsets[altAxis] = _preventedOffset;
        data[altAxis] = _preventedOffset - _offset;
      }

      state.modifiersData[name] = data;
    } // eslint-disable-next-line import/no-unused-modules


    var preventOverflow$1 = {
      name: 'preventOverflow',
      enabled: true,
      phase: 'main',
      fn: preventOverflow,
      requiresIfExists: ['offset']
    };

    function getHTMLElementScroll(element) {
      return {
        scrollLeft: element.scrollLeft,
        scrollTop: element.scrollTop
      };
    }

    function getNodeScroll(node) {
      if (node === getWindow$1(node) || !isHTMLElement(node)) {
        return getWindowScroll(node);
      } else {
        return getHTMLElementScroll(node);
      }
    }

    function isElementScaled(element) {
      var rect = element.getBoundingClientRect();
      var scaleX = round(rect.width) / element.offsetWidth || 1;
      var scaleY = round(rect.height) / element.offsetHeight || 1;
      return scaleX !== 1 || scaleY !== 1;
    } // Returns the composite rect of an element relative to its offsetParent.
    // Composite means it takes into account transforms as well as layout.


    function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
      if (isFixed === void 0) {
        isFixed = false;
      }

      var isOffsetParentAnElement = isHTMLElement(offsetParent);
      var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
      var documentElement = getDocumentElement(offsetParent);
      var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled);
      var scroll = {
        scrollLeft: 0,
        scrollTop: 0
      };
      var offsets = {
        x: 0,
        y: 0
      };

      if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
        if (getNodeName(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
        isScrollParent(documentElement)) {
          scroll = getNodeScroll(offsetParent);
        }

        if (isHTMLElement(offsetParent)) {
          offsets = getBoundingClientRect(offsetParent, true);
          offsets.x += offsetParent.clientLeft;
          offsets.y += offsetParent.clientTop;
        } else if (documentElement) {
          offsets.x = getWindowScrollBarX(documentElement);
        }
      }

      return {
        x: rect.left + scroll.scrollLeft - offsets.x,
        y: rect.top + scroll.scrollTop - offsets.y,
        width: rect.width,
        height: rect.height
      };
    }

    function order(modifiers) {
      var map = new Map();
      var visited = new Set();
      var result = [];
      modifiers.forEach(function (modifier) {
        map.set(modifier.name, modifier);
      }); // On visiting object, check for its dependencies and visit them recursively

      function sort(modifier) {
        visited.add(modifier.name);
        var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
        requires.forEach(function (dep) {
          if (!visited.has(dep)) {
            var depModifier = map.get(dep);

            if (depModifier) {
              sort(depModifier);
            }
          }
        });
        result.push(modifier);
      }

      modifiers.forEach(function (modifier) {
        if (!visited.has(modifier.name)) {
          // check for visited object
          sort(modifier);
        }
      });
      return result;
    }

    function orderModifiers(modifiers) {
      // order based on dependencies
      var orderedModifiers = order(modifiers); // order based on phase

      return modifierPhases.reduce(function (acc, phase) {
        return acc.concat(orderedModifiers.filter(function (modifier) {
          return modifier.phase === phase;
        }));
      }, []);
    }

    function debounce(fn) {
      var pending;
      return function () {
        if (!pending) {
          pending = new Promise(function (resolve) {
            Promise.resolve().then(function () {
              pending = undefined;
              resolve(fn());
            });
          });
        }

        return pending;
      };
    }

    function mergeByName(modifiers) {
      var merged = modifiers.reduce(function (merged, current) {
        var existing = merged[current.name];
        merged[current.name] = existing ? Object.assign({}, existing, current, {
          options: Object.assign({}, existing.options, current.options),
          data: Object.assign({}, existing.data, current.data)
        }) : current;
        return merged;
      }, {}); // IE11 does not support Object.values

      return Object.keys(merged).map(function (key) {
        return merged[key];
      });
    }

    var DEFAULT_OPTIONS = {
      placement: 'bottom',
      modifiers: [],
      strategy: 'absolute'
    };

    function areValidElements() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return !args.some(function (element) {
        return !(element && typeof element.getBoundingClientRect === 'function');
      });
    }

    function popperGenerator(generatorOptions) {
      if (generatorOptions === void 0) {
        generatorOptions = {};
      }

      var _generatorOptions = generatorOptions,
          _generatorOptions$def = _generatorOptions.defaultModifiers,
          defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
          _generatorOptions$def2 = _generatorOptions.defaultOptions,
          defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
      return function createPopper(reference, popper, options) {
        if (options === void 0) {
          options = defaultOptions;
        }

        var state = {
          placement: 'bottom',
          orderedModifiers: [],
          options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
          modifiersData: {},
          elements: {
            reference: reference,
            popper: popper
          },
          attributes: {},
          styles: {}
        };
        var effectCleanupFns = [];
        var isDestroyed = false;
        var instance = {
          state: state,
          setOptions: function setOptions(setOptionsAction) {
            var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
            cleanupModifierEffects();
            state.options = Object.assign({}, defaultOptions, state.options, options);
            state.scrollParents = {
              reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
              popper: listScrollParents(popper)
            }; // Orders the modifiers based on their dependencies and `phase`
            // properties

            var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

            state.orderedModifiers = orderedModifiers.filter(function (m) {
              return m.enabled;
            }); // Validate the provided modifiers so that the consumer will get warned

            runModifierEffects();
            return instance.update();
          },
          // Sync update – it will always be executed, even if not necessary. This
          // is useful for low frequency updates where sync behavior simplifies the
          // logic.
          // For high frequency updates (e.g. `resize` and `scroll` events), always
          // prefer the async Popper#update method
          forceUpdate: function forceUpdate() {
            if (isDestroyed) {
              return;
            }

            var _state$elements = state.elements,
                reference = _state$elements.reference,
                popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
            // anymore

            if (!areValidElements(reference, popper)) {

              return;
            } // Store the reference and popper rects to be read by modifiers


            state.rects = {
              reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
              popper: getLayoutRect(popper)
            }; // Modifiers have the ability to reset the current update cycle. The
            // most common use case for this is the `flip` modifier changing the
            // placement, which then needs to re-run all the modifiers, because the
            // logic was previously ran for the previous placement and is therefore
            // stale/incorrect

            state.reset = false;
            state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
            // is filled with the initial data specified by the modifier. This means
            // it doesn't persist and is fresh on each update.
            // To ensure persistent data, use `${name}#persistent`

            state.orderedModifiers.forEach(function (modifier) {
              return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
            });

            for (var index = 0; index < state.orderedModifiers.length; index++) {

              if (state.reset === true) {
                state.reset = false;
                index = -1;
                continue;
              }

              var _state$orderedModifie = state.orderedModifiers[index],
                  fn = _state$orderedModifie.fn,
                  _state$orderedModifie2 = _state$orderedModifie.options,
                  _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
                  name = _state$orderedModifie.name;

              if (typeof fn === 'function') {
                state = fn({
                  state: state,
                  options: _options,
                  name: name,
                  instance: instance
                }) || state;
              }
            }
          },
          // Async and optimistically optimized update – it will not be executed if
          // not necessary (debounced to run at most once-per-tick)
          update: debounce(function () {
            return new Promise(function (resolve) {
              instance.forceUpdate();
              resolve(state);
            });
          }),
          destroy: function destroy() {
            cleanupModifierEffects();
            isDestroyed = true;
          }
        };

        if (!areValidElements(reference, popper)) {

          return instance;
        }

        instance.setOptions(options).then(function (state) {
          if (!isDestroyed && options.onFirstUpdate) {
            options.onFirstUpdate(state);
          }
        }); // Modifiers have the ability to execute arbitrary code before the first
        // update cycle runs. They will be executed in the same order as the update
        // cycle. This is useful when a modifier adds some persistent data that
        // other modifiers need to use, but the modifier is run after the dependent
        // one.

        function runModifierEffects() {
          state.orderedModifiers.forEach(function (_ref3) {
            var name = _ref3.name,
                _ref3$options = _ref3.options,
                options = _ref3$options === void 0 ? {} : _ref3$options,
                effect = _ref3.effect;

            if (typeof effect === 'function') {
              var cleanupFn = effect({
                state: state,
                name: name,
                instance: instance,
                options: options
              });

              var noopFn = function noopFn() {};

              effectCleanupFns.push(cleanupFn || noopFn);
            }
          });
        }

        function cleanupModifierEffects() {
          effectCleanupFns.forEach(function (fn) {
            return fn();
          });
          effectCleanupFns = [];
        }

        return instance;
      };
    }

    var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$2, flip$1, preventOverflow$1, arrow$1, hide$1];
    var createPopper = /*#__PURE__*/popperGenerator({
      defaultModifiers: defaultModifiers
    }); // eslint-disable-next-line import/no-unused-modules

    /* node_modules\sv-bootstrap-dropdown\src\Dropdown.svelte generated by Svelte v3.48.0 */
    const file$q = "node_modules\\sv-bootstrap-dropdown\\src\\Dropdown.svelte";
    const get_DropdownMenu_slot_changes = dirty => ({});
    const get_DropdownMenu_slot_context = ctx => ({});

    // (210:2) {#if open}
    function create_if_block$5(ctx) {
    	let div;
    	let div_class_value;
    	let current;
    	let mounted;
    	let dispose;
    	const DropdownMenu_slot_template = /*#slots*/ ctx[18].DropdownMenu;
    	const DropdownMenu_slot = create_slot(DropdownMenu_slot_template, ctx, /*$$scope*/ ctx[17], get_DropdownMenu_slot_context);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (DropdownMenu_slot) DropdownMenu_slot.c();
    			attr_dev(div, "class", div_class_value = "dropdown-menu show " + /*menuClasses*/ ctx[1]);
    			attr_dev(div, "aria-labelledby", /*labelledby*/ ctx[3]);
    			add_location(div, file$q, 210, 4, 4786);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (DropdownMenu_slot) {
    				DropdownMenu_slot.m(div, null);
    			}

    			/*div_binding*/ ctx[19](div);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(div, "click", /*menuClick*/ ctx[6], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (DropdownMenu_slot) {
    				if (DropdownMenu_slot.p && (!current || dirty[0] & /*$$scope*/ 131072)) {
    					update_slot_base(
    						DropdownMenu_slot,
    						DropdownMenu_slot_template,
    						ctx,
    						/*$$scope*/ ctx[17],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[17])
    						: get_slot_changes(DropdownMenu_slot_template, /*$$scope*/ ctx[17], dirty, get_DropdownMenu_slot_changes),
    						get_DropdownMenu_slot_context
    					);
    				}
    			}

    			if (!current || dirty[0] & /*menuClasses*/ 2 && div_class_value !== (div_class_value = "dropdown-menu show " + /*menuClasses*/ ctx[1])) {
    				attr_dev(div, "class", div_class_value);
    			}

    			if (!current || dirty[0] & /*labelledby*/ 8) {
    				attr_dev(div, "aria-labelledby", /*labelledby*/ ctx[3]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(DropdownMenu_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(DropdownMenu_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (DropdownMenu_slot) DropdownMenu_slot.d(detaching);
    			/*div_binding*/ ctx[19](null);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$5.name,
    		type: "if",
    		source: "(210:2) {#if open}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$t(ctx) {
    	let div;
    	let t;
    	let div_class_value;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[18].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[17], null);
    	let if_block = /*open*/ ctx[0] && create_if_block$5(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			t = space();
    			if (if_block) if_block.c();
    			attr_dev(div, "class", div_class_value = "" + (/*_dropdownClass*/ ctx[5] + " " + /*classes*/ ctx[2]));
    			toggle_class(div, "show", /*open*/ ctx[0]);
    			add_location(div, file$q, 207, 0, 4699);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			append_dev(div, t);
    			if (if_block) if_block.m(div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty[0] & /*$$scope*/ 131072)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[17],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[17])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[17], dirty, null),
    						null
    					);
    				}
    			}

    			if (/*open*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty[0] & /*open*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$5(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(div, null);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}

    			if (!current || dirty[0] & /*_dropdownClass, classes*/ 36 && div_class_value !== (div_class_value = "" + (/*_dropdownClass*/ ctx[5] + " " + /*classes*/ ctx[2]))) {
    				attr_dev(div, "class", div_class_value);
    			}

    			if (dirty[0] & /*_dropdownClass, classes, open*/ 37) {
    				toggle_class(div, "show", /*open*/ ctx[0]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$t.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const ESCAPE_KEY = "Escape";
    const ARROW_UP_KEY = "ArrowUp";
    const ARROW_DOWN_KEY = "ArrowDown";
    const SELECTOR_VISIBLE_ITEMS = ".dropdown-item:not(.disabled):not(:disabled)";

    function attachEvent(target, ...args) {
    	target.addEventListener(...args);

    	return {
    		remove: () => target.removeEventListener(...args)
    	};
    }

    function _isVisible(element) {
    	if (!element) {
    		return false;
    	}

    	if (element.style && element.parentNode && element.parentNode.style) {
    		const elementStyle = getComputedStyle(element);
    		const parentNodeStyle = getComputedStyle(element.parentNode);
    		return elementStyle.display !== "none" && parentNodeStyle.display !== "none" && elementStyle.visibility !== "hidden";
    	}

    	return false;
    }

    function instance$t($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Dropdown', slots, ['default','DropdownMenu']);

    	const noop = () => {
    		
    	};

    	let { open = false } = $$props;
    	let { flip = true } = $$props;
    	let { placement = "bottom-start" } = $$props;
    	let { displayStatic = false } = $$props;
    	let { keyboard = true } = $$props;
    	let { insideClick = false } = $$props;
    	let { closeOnOutsideClick = true } = $$props;
    	let { offset = [0, 2] } = $$props;
    	let { menuClasses = "" } = $$props;
    	let { classes = "" } = $$props;
    	let { triggerElement } = $$props;
    	let { onOpened = noop } = $$props;
    	let { onClosed = noop } = $$props;
    	let { labelledby = "" } = $$props;
    	let _menuItem;
    	let _popperInstance;
    	let _dropdownClass;
    	let _keyboardEvent;
    	let _outsideClickEvent;
    	let _triggerEvent;
    	let _items = [];
    	const REGEXP_KEYDOWN = new RegExp(`${ARROW_UP_KEY}|${ARROW_DOWN_KEY}|${ESCAPE_KEY}`);

    	const placementClassMap = {
    		top: "dropup",
    		bottom: "dropdown",
    		right: "dropright",
    		left: "dropleft"
    	};

    	function menuClick() {
    		if (!insideClick) {
    			$$invalidate(0, open = false);
    		}
    	}

    	async function _createPopperInstance() {
    		await tick();

    		_popperInstance = createPopper(triggerElement, _menuItem, {
    			placement,
    			modifiers: [
    				{ name: "flip", enabled: flip },
    				{ name: "offset", options: { offset } },
    				{
    					name: "preventOverflow",
    					options: { altBoundary: true }
    				}
    			]
    		});
    	}

    	async function getItems() {
    		await tick();
    		const nodeList = _menuItem.querySelectorAll(SELECTOR_VISIBLE_ITEMS);
    		_items = [...nodeList].filter(_isVisible);
    	}

    	function _keyBoradEvents() {
    		if (keyboard) {
    			_keyboardEvent = attachEvent(document, "keydown", event => {
    				if (!(/input|textarea/i).test(event.target.tagName) && REGEXP_KEYDOWN.test(event.key)) {
    					event.preventDefault();
    					event.stopPropagation();

    					if (event.key === ESCAPE_KEY) {
    						$$invalidate(0, open = false);
    					}

    					if (!_items.length) {
    						return;
    					}

    					let index = _items.indexOf(event.target);

    					if (event.key === ARROW_UP_KEY && index > 0) {
    						// Up
    						index--;
    					}

    					if (event.key === ARROW_DOWN_KEY && index < _items.length - 1) {
    						// Down
    						index++;
    					}

    					// index is -1 if the first keydown is an ArrowUp
    					index = index === -1 ? 0 : index;

    					_items[index].focus();
    				}
    			});
    		}
    	}

    	function _outsideEventAttacher() {
    		if (closeOnOutsideClick) {
    			_outsideClickEvent = attachEvent(document, "click", event => {
    				if (event.target !== _menuItem && !_menuItem.contains(event.target)) {
    					$$invalidate(0, open = false);
    				}
    			});
    		}
    	}

    	async function onDropdownOpend() {
    		getItems();
    		_keyBoradEvents();
    		_outsideEventAttacher();

    		if (!displayStatic) {
    			_createPopperInstance();
    		}

    		onOpened();
    	}

    	function _commonExit() {
    		if (_keyboardEvent) {
    			_keyboardEvent.remove();
    		}

    		if (_outsideClickEvent) {
    			_outsideClickEvent.remove();
    		}

    		_destroyPopperInstance();
    	}

    	function onDropdownClosed() {
    		_commonExit();
    		onClosed();
    	}

    	function _destroyPopperInstance() {
    		if (_popperInstance) {
    			_popperInstance.destroy();
    			_popperInstance = null;
    		}
    	}

    	onMount(async () => {
    		await tick();

    		_triggerEvent = attachEvent(triggerElement, "click", event => {
    			event.stopPropagation();
    			$$invalidate(0, open = !open);
    		});
    	});

    	onDestroy(() => {
    		_commonExit();
    		_triggerEvent.remove();
    	});

    	const writable_props = [
    		'open',
    		'flip',
    		'placement',
    		'displayStatic',
    		'keyboard',
    		'insideClick',
    		'closeOnOutsideClick',
    		'offset',
    		'menuClasses',
    		'classes',
    		'triggerElement',
    		'onOpened',
    		'onClosed',
    		'labelledby'
    	];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Dropdown> was created with unknown prop '${key}'`);
    	});

    	function div_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			_menuItem = $$value;
    			$$invalidate(4, _menuItem);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ('open' in $$props) $$invalidate(0, open = $$props.open);
    		if ('flip' in $$props) $$invalidate(7, flip = $$props.flip);
    		if ('placement' in $$props) $$invalidate(8, placement = $$props.placement);
    		if ('displayStatic' in $$props) $$invalidate(9, displayStatic = $$props.displayStatic);
    		if ('keyboard' in $$props) $$invalidate(10, keyboard = $$props.keyboard);
    		if ('insideClick' in $$props) $$invalidate(11, insideClick = $$props.insideClick);
    		if ('closeOnOutsideClick' in $$props) $$invalidate(12, closeOnOutsideClick = $$props.closeOnOutsideClick);
    		if ('offset' in $$props) $$invalidate(13, offset = $$props.offset);
    		if ('menuClasses' in $$props) $$invalidate(1, menuClasses = $$props.menuClasses);
    		if ('classes' in $$props) $$invalidate(2, classes = $$props.classes);
    		if ('triggerElement' in $$props) $$invalidate(14, triggerElement = $$props.triggerElement);
    		if ('onOpened' in $$props) $$invalidate(15, onOpened = $$props.onOpened);
    		if ('onClosed' in $$props) $$invalidate(16, onClosed = $$props.onClosed);
    		if ('labelledby' in $$props) $$invalidate(3, labelledby = $$props.labelledby);
    		if ('$$scope' in $$props) $$invalidate(17, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		onDestroy,
    		tick,
    		createPopper,
    		noop,
    		open,
    		flip,
    		placement,
    		displayStatic,
    		keyboard,
    		insideClick,
    		closeOnOutsideClick,
    		offset,
    		menuClasses,
    		classes,
    		triggerElement,
    		onOpened,
    		onClosed,
    		labelledby,
    		_menuItem,
    		_popperInstance,
    		_dropdownClass,
    		_keyboardEvent,
    		_outsideClickEvent,
    		_triggerEvent,
    		_items,
    		ESCAPE_KEY,
    		ARROW_UP_KEY,
    		ARROW_DOWN_KEY,
    		REGEXP_KEYDOWN,
    		SELECTOR_VISIBLE_ITEMS,
    		placementClassMap,
    		attachEvent,
    		menuClick,
    		_createPopperInstance,
    		_isVisible,
    		getItems,
    		_keyBoradEvents,
    		_outsideEventAttacher,
    		onDropdownOpend,
    		_commonExit,
    		onDropdownClosed,
    		_destroyPopperInstance
    	});

    	$$self.$inject_state = $$props => {
    		if ('open' in $$props) $$invalidate(0, open = $$props.open);
    		if ('flip' in $$props) $$invalidate(7, flip = $$props.flip);
    		if ('placement' in $$props) $$invalidate(8, placement = $$props.placement);
    		if ('displayStatic' in $$props) $$invalidate(9, displayStatic = $$props.displayStatic);
    		if ('keyboard' in $$props) $$invalidate(10, keyboard = $$props.keyboard);
    		if ('insideClick' in $$props) $$invalidate(11, insideClick = $$props.insideClick);
    		if ('closeOnOutsideClick' in $$props) $$invalidate(12, closeOnOutsideClick = $$props.closeOnOutsideClick);
    		if ('offset' in $$props) $$invalidate(13, offset = $$props.offset);
    		if ('menuClasses' in $$props) $$invalidate(1, menuClasses = $$props.menuClasses);
    		if ('classes' in $$props) $$invalidate(2, classes = $$props.classes);
    		if ('triggerElement' in $$props) $$invalidate(14, triggerElement = $$props.triggerElement);
    		if ('onOpened' in $$props) $$invalidate(15, onOpened = $$props.onOpened);
    		if ('onClosed' in $$props) $$invalidate(16, onClosed = $$props.onClosed);
    		if ('labelledby' in $$props) $$invalidate(3, labelledby = $$props.labelledby);
    		if ('_menuItem' in $$props) $$invalidate(4, _menuItem = $$props._menuItem);
    		if ('_popperInstance' in $$props) _popperInstance = $$props._popperInstance;
    		if ('_dropdownClass' in $$props) $$invalidate(5, _dropdownClass = $$props._dropdownClass);
    		if ('_keyboardEvent' in $$props) _keyboardEvent = $$props._keyboardEvent;
    		if ('_outsideClickEvent' in $$props) _outsideClickEvent = $$props._outsideClickEvent;
    		if ('_triggerEvent' in $$props) _triggerEvent = $$props._triggerEvent;
    		if ('_items' in $$props) _items = $$props._items;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*open*/ 1) {
    			{
    				if (open) {
    					onDropdownOpend();
    				} else {
    					onDropdownClosed();
    				}
    			}
    		}

    		if ($$self.$$.dirty[0] & /*placement*/ 256) {
    			{
    				$$invalidate(5, _dropdownClass = placementClassMap[placement.split("-")[0]]);
    			}
    		}
    	};

    	return [
    		open,
    		menuClasses,
    		classes,
    		labelledby,
    		_menuItem,
    		_dropdownClass,
    		menuClick,
    		flip,
    		placement,
    		displayStatic,
    		keyboard,
    		insideClick,
    		closeOnOutsideClick,
    		offset,
    		triggerElement,
    		onOpened,
    		onClosed,
    		$$scope,
    		slots,
    		div_binding
    	];
    }

    class Dropdown extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(
    			this,
    			options,
    			instance$t,
    			create_fragment$t,
    			safe_not_equal,
    			{
    				open: 0,
    				flip: 7,
    				placement: 8,
    				displayStatic: 9,
    				keyboard: 10,
    				insideClick: 11,
    				closeOnOutsideClick: 12,
    				offset: 13,
    				menuClasses: 1,
    				classes: 2,
    				triggerElement: 14,
    				onOpened: 15,
    				onClosed: 16,
    				labelledby: 3
    			},
    			null,
    			[-1, -1]
    		);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Dropdown",
    			options,
    			id: create_fragment$t.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*triggerElement*/ ctx[14] === undefined && !('triggerElement' in props)) {
    			console.warn("<Dropdown> was created without expected prop 'triggerElement'");
    		}
    	}

    	get open() {
    		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set open(value) {
    		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get flip() {
    		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set flip(value) {
    		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get placement() {
    		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set placement(value) {
    		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get displayStatic() {
    		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set displayStatic(value) {
    		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get keyboard() {
    		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set keyboard(value) {
    		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get insideClick() {
    		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set insideClick(value) {
    		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get closeOnOutsideClick() {
    		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set closeOnOutsideClick(value) {
    		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get offset() {
    		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set offset(value) {
    		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get menuClasses() {
    		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set menuClasses(value) {
    		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get classes() {
    		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set classes(value) {
    		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get triggerElement() {
    		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set triggerElement(value) {
    		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get onOpened() {
    		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set onOpened(value) {
    		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get onClosed() {
    		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set onClosed(value) {
    		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get labelledby() {
    		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set labelledby(value) {
    		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\Burger.svelte generated by Svelte v3.48.0 */

    const file$p = "src\\component\\Burger.svelte";

    // (19:5) {:else}
    function create_else_block$1(ctx) {
    	let list;
    	let current;

    	list = new List$1({
    			props: { width: 28, height: 28 },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(list.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(list, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(list.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(list.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(list, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(19:5) {:else}",
    		ctx
    	});

    	return block;
    }

    // (17:5) {#if visible}
    function create_if_block_1$3(ctx) {
    	let xlg;
    	let current;
    	xlg = new XLg$1({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(xlg.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(xlg, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(xlg.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(xlg.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(xlg, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$3.name,
    		type: "if",
    		source: "(17:5) {#if visible}",
    		ctx
    	});

    	return block;
    }

    // (25:5) {#if visible}
    function create_if_block$4(ctx) {
    	let div;
    	let li0;
    	let a0;
    	let t0;
    	let a0_class_value;
    	let t1;
    	let li1;
    	let a1;
    	let t2;
    	let a1_class_value;
    	let t3;
    	let li2;
    	let a2;
    	let t4;
    	let a2_class_value;
    	let t5;
    	let li3;
    	let a3;
    	let t6;
    	let a3_class_value;
    	let t7;
    	let li4;
    	let a4;
    	let t8;
    	let a4_class_value;
    	let t9;
    	let dropdown0;
    	let t10;
    	let li5;
    	let a5;
    	let t11;
    	let a5_class_value;
    	let t12;
    	let dropdown1;
    	let current;
    	let mounted;
    	let dispose;

    	dropdown0 = new Dropdown({
    			props: {
    				triggerElement: /*dropdownTrigger*/ ctx[2],
    				$$slots: {
    					DropdownMenu: [create_DropdownMenu_slot_1],
    					default: [create_default_slot_1$1]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	dropdown1 = new Dropdown({
    			props: {
    				triggerElement: /*dropdownLanguage*/ ctx[3],
    				$$slots: {
    					DropdownMenu: [create_DropdownMenu_slot],
    					default: [create_default_slot$2]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			li0 = element("li");
    			a0 = element("a");
    			t0 = text$1("Home");
    			t1 = space();
    			li1 = element("li");
    			a1 = element("a");
    			t2 = text$1("About");
    			t3 = space();
    			li2 = element("li");
    			a2 = element("a");
    			t4 = text$1("Services");
    			t5 = space();
    			li3 = element("li");
    			a3 = element("a");
    			t6 = text$1("Team");
    			t7 = space();
    			li4 = element("li");
    			a4 = element("a");
    			t8 = text$1("Clients");
    			t9 = space();
    			create_component(dropdown0.$$.fragment);
    			t10 = space();
    			li5 = element("li");
    			a5 = element("a");
    			t11 = text$1("Contact Us");
    			t12 = space();
    			create_component(dropdown1.$$.fragment);

    			attr_dev(a0, "class", a0_class_value = /*current*/ ctx[1] === 'nav-link-home'
    			? 'activeted'
    			: '');

    			attr_dev(a0, "href", "#hero");
    			add_location(a0, file$p, 26, 10, 636);
    			attr_dev(li0, "class", "svelte-1e4tdem");
    			add_location(li0, file$p, 26, 6, 632);

    			attr_dev(a1, "class", a1_class_value = /*current*/ ctx[1] === 'nav-link-about'
    			? 'activeted'
    			: '');

    			attr_dev(a1, "href", "#about");
    			add_location(a1, file$p, 27, 10, 780);
    			attr_dev(li1, "class", "svelte-1e4tdem");
    			add_location(li1, file$p, 27, 6, 776);

    			attr_dev(a2, "class", a2_class_value = /*current*/ ctx[1] === 'nav-link-service'
    			? 'activeted'
    			: '');

    			attr_dev(a2, "href", "#services");
    			add_location(a2, file$p, 28, 10, 928);
    			attr_dev(li2, "class", "svelte-1e4tdem");
    			add_location(li2, file$p, 28, 6, 924);

    			attr_dev(a3, "class", a3_class_value = /*current*/ ctx[1] === 'nav-link-team'
    			? 'activeted'
    			: '');

    			attr_dev(a3, "href", "#team");
    			add_location(a3, file$p, 29, 10, 1086);
    			attr_dev(li3, "class", "svelte-1e4tdem");
    			add_location(li3, file$p, 29, 6, 1082);

    			attr_dev(a4, "class", a4_class_value = /*current*/ ctx[1] === 'nav-link-client'
    			? 'activeted'
    			: '');

    			attr_dev(a4, "href", "#clients");
    			add_location(a4, file$p, 30, 10, 1230);
    			attr_dev(li4, "class", "svelte-1e4tdem");
    			add_location(li4, file$p, 30, 6, 1226);

    			attr_dev(a5, "class", a5_class_value = /*current*/ ctx[1] === 'nav-link-contact'
    			? 'activeted'
    			: '');

    			attr_dev(a5, "href", "#contact");
    			add_location(a5, file$p, 49, 10, 2158);
    			attr_dev(li5, "class", "svelte-1e4tdem");
    			add_location(li5, file$p, 49, 6, 2154);
    			attr_dev(div, "class", "links svelte-1e4tdem");
    			add_location(div, file$p, 25, 5, 605);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, li0);
    			append_dev(li0, a0);
    			append_dev(a0, t0);
    			append_dev(div, t1);
    			append_dev(div, li1);
    			append_dev(li1, a1);
    			append_dev(a1, t2);
    			append_dev(div, t3);
    			append_dev(div, li2);
    			append_dev(li2, a2);
    			append_dev(a2, t4);
    			append_dev(div, t5);
    			append_dev(div, li3);
    			append_dev(li3, a3);
    			append_dev(a3, t6);
    			append_dev(div, t7);
    			append_dev(div, li4);
    			append_dev(li4, a4);
    			append_dev(a4, t8);
    			append_dev(div, t9);
    			mount_component(dropdown0, div, null);
    			append_dev(div, t10);
    			append_dev(div, li5);
    			append_dev(li5, a5);
    			append_dev(a5, t11);
    			append_dev(div, t12);
    			mount_component(dropdown1, div, null);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(a0, "click", /*click_handler_1*/ ctx[5], false, false, false),
    					listen_dev(a1, "click", /*click_handler_2*/ ctx[6], false, false, false),
    					listen_dev(a2, "click", /*click_handler_3*/ ctx[7], false, false, false),
    					listen_dev(a3, "click", /*click_handler_4*/ ctx[8], false, false, false),
    					listen_dev(a4, "click", /*click_handler_5*/ ctx[9], false, false, false),
    					listen_dev(a5, "click", /*click_handler_6*/ ctx[11], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (!current || dirty & /*current*/ 2 && a0_class_value !== (a0_class_value = /*current*/ ctx[1] === 'nav-link-home'
    			? 'activeted'
    			: '')) {
    				attr_dev(a0, "class", a0_class_value);
    			}

    			if (!current || dirty & /*current*/ 2 && a1_class_value !== (a1_class_value = /*current*/ ctx[1] === 'nav-link-about'
    			? 'activeted'
    			: '')) {
    				attr_dev(a1, "class", a1_class_value);
    			}

    			if (!current || dirty & /*current*/ 2 && a2_class_value !== (a2_class_value = /*current*/ ctx[1] === 'nav-link-service'
    			? 'activeted'
    			: '')) {
    				attr_dev(a2, "class", a2_class_value);
    			}

    			if (!current || dirty & /*current*/ 2 && a3_class_value !== (a3_class_value = /*current*/ ctx[1] === 'nav-link-team'
    			? 'activeted'
    			: '')) {
    				attr_dev(a3, "class", a3_class_value);
    			}

    			if (!current || dirty & /*current*/ 2 && a4_class_value !== (a4_class_value = /*current*/ ctx[1] === 'nav-link-client'
    			? 'activeted'
    			: '')) {
    				attr_dev(a4, "class", a4_class_value);
    			}

    			const dropdown0_changes = {};
    			if (dirty & /*dropdownTrigger*/ 4) dropdown0_changes.triggerElement = /*dropdownTrigger*/ ctx[2];

    			if (dirty & /*$$scope, dropdownTrigger*/ 8196) {
    				dropdown0_changes.$$scope = { dirty, ctx };
    			}

    			dropdown0.$set(dropdown0_changes);

    			if (!current || dirty & /*current*/ 2 && a5_class_value !== (a5_class_value = /*current*/ ctx[1] === 'nav-link-contact'
    			? 'activeted'
    			: '')) {
    				attr_dev(a5, "class", a5_class_value);
    			}

    			const dropdown1_changes = {};
    			if (dirty & /*dropdownLanguage*/ 8) dropdown1_changes.triggerElement = /*dropdownLanguage*/ ctx[3];

    			if (dirty & /*$$scope, dropdownLanguage*/ 8200) {
    				dropdown1_changes.$$scope = { dirty, ctx };
    			}

    			dropdown1.$set(dropdown1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(dropdown0.$$.fragment, local);
    			transition_in(dropdown1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(dropdown0.$$.fragment, local);
    			transition_out(dropdown1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(dropdown0);
    			destroy_component(dropdown1);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$4.name,
    		type: "if",
    		source: "(25:5) {#if visible}",
    		ctx
    	});

    	return block;
    }

    // (33:6) <Dropdown triggerElement={dropdownTrigger} >
    function create_default_slot_1$1(ctx) {
    	let button;

    	const block = {
    		c: function create() {
    			button = element("button");
    			button.textContent = "Courses";
    			attr_dev(button, "type", "button");
    			attr_dev(button, "class", "btn dropdown-toggle dropdown-course svelte-1e4tdem");
    			add_location(button, file$p, 33, 8, 1440);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			/*button_binding*/ ctx[10](button);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			/*button_binding*/ ctx[10](null);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$1.name,
    		type: "slot",
    		source: "(33:6) <Dropdown triggerElement={dropdownTrigger} >",
    		ctx
    	});

    	return block;
    }

    // (42:8) 
    function create_DropdownMenu_slot_1(ctx) {
    	let div;
    	let button0;
    	let a0;
    	let t1;
    	let button1;
    	let a1;
    	let t3;
    	let button2;
    	let a2;
    	let t5;
    	let button3;
    	let a3;

    	const block = {
    		c: function create() {
    			div = element("div");
    			button0 = element("button");
    			a0 = element("a");
    			a0.textContent = "Our Courses";
    			t1 = space();
    			button1 = element("button");
    			a1 = element("a");
    			a1.textContent = "Our Tutors";
    			t3 = space();
    			button2 = element("button");
    			a2 = element("a");
    			a2.textContent = "Register for Classes";
    			t5 = space();
    			button3 = element("button");
    			a3 = element("a");
    			a3.textContent = "Pricing";
    			attr_dev(a0, "href", "/#/ourcourse");
    			add_location(a0, file$p, 42, 56, 1748);
    			attr_dev(button0, "class", "dropdown-item svelte-1e4tdem");
    			attr_dev(button0, "type", "button");
    			add_location(button0, file$p, 42, 12, 1704);
    			attr_dev(a1, "href", "/#/ourtutors");
    			add_location(a1, file$p, 43, 56, 1853);
    			attr_dev(button1, "class", "dropdown-item svelte-1e4tdem");
    			attr_dev(button1, "type", "button");
    			add_location(button1, file$p, 43, 12, 1809);
    			attr_dev(a2, "href", "/#/register");
    			add_location(a2, file$p, 44, 56, 1957);
    			attr_dev(button2, "class", "dropdown-item svelte-1e4tdem");
    			attr_dev(button2, "type", "button");
    			add_location(button2, file$p, 44, 12, 1913);
    			attr_dev(a3, "href", "/#/price");
    			add_location(a3, file$p, 45, 56, 2070);
    			attr_dev(button3, "class", "dropdown-item svelte-1e4tdem");
    			attr_dev(button3, "type", "button");
    			add_location(button3, file$p, 45, 12, 2026);
    			attr_dev(div, "slot", "DropdownMenu");
    			attr_dev(div, "class", "drops svelte-1e4tdem");
    			add_location(div, file$p, 41, 8, 1650);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, button0);
    			append_dev(button0, a0);
    			append_dev(div, t1);
    			append_dev(div, button1);
    			append_dev(button1, a1);
    			append_dev(div, t3);
    			append_dev(div, button2);
    			append_dev(button2, a2);
    			append_dev(div, t5);
    			append_dev(div, button3);
    			append_dev(button3, a3);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_DropdownMenu_slot_1.name,
    		type: "slot",
    		source: "(42:8) ",
    		ctx
    	});

    	return block;
    }

    // (51:6) <Dropdown triggerElement={dropdownLanguage} >
    function create_default_slot$2(ctx) {
    	let button;
    	let globe;
    	let current;
    	globe = new Globe$1({ $$inline: true });

    	const block = {
    		c: function create() {
    			button = element("button");
    			create_component(globe.$$.fragment);
    			attr_dev(button, "type", "button");
    			attr_dev(button, "class", "btn dropdown-toggle svelte-1e4tdem");
    			add_location(button, file$p, 51, 8, 2368);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			mount_component(globe, button, null);
    			/*button_binding_1*/ ctx[12](button);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(globe.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(globe.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			destroy_component(globe);
    			/*button_binding_1*/ ctx[12](null);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$2.name,
    		type: "slot",
    		source: "(51:6) <Dropdown triggerElement={dropdownLanguage} >",
    		ctx
    	});

    	return block;
    }

    // (59:8) 
    function create_DropdownMenu_slot(ctx) {
    	let div;
    	let button0;
    	let a0;
    	let t1;
    	let button1;
    	let a1;

    	const block = {
    		c: function create() {
    			div = element("div");
    			button0 = element("button");
    			a0 = element("a");
    			a0.textContent = "English";
    			t1 = space();
    			button1 = element("button");
    			a1 = element("a");
    			a1.textContent = "Indonesia";
    			attr_dev(a0, "href", "https://torche.app");
    			add_location(a0, file$p, 59, 58, 2650);
    			attr_dev(button0, "class", "dropdown-item svelte-1e4tdem");
    			attr_dev(button0, "type", "button");
    			add_location(button0, file$p, 59, 14, 2606);
    			attr_dev(a1, "href", "https://torche.app/id/");
    			add_location(a1, file$p, 60, 58, 2759);
    			attr_dev(button1, "class", "dropdown-item svelte-1e4tdem");
    			attr_dev(button1, "type", "button");
    			add_location(button1, file$p, 60, 14, 2715);
    			attr_dev(div, "slot", "DropdownMenu");
    			attr_dev(div, "class", "drops svelte-1e4tdem");
    			add_location(div, file$p, 58, 8, 2551);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, button0);
    			append_dev(button0, a0);
    			append_dev(div, t1);
    			append_dev(div, button1);
    			append_dev(button1, a1);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_DropdownMenu_slot.name,
    		type: "slot",
    		source: "(59:8) ",
    		ctx
    	});

    	return block;
    }

    function create_fragment$s(ctx) {
    	let div2;
    	let div0;
    	let current_block_type_index;
    	let if_block0;
    	let t;
    	let div1;
    	let current;
    	let mounted;
    	let dispose;
    	const if_block_creators = [create_if_block_1$3, create_else_block$1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*visible*/ ctx[0]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	let if_block1 = /*visible*/ ctx[0] && create_if_block$4(ctx);

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			if_block0.c();
    			t = space();
    			div1 = element("div");
    			if (if_block1) if_block1.c();
    			attr_dev(div0, "class", "hamburger svelte-1e4tdem");
    			add_location(div0, file$p, 15, 5, 370);
    			attr_dev(div1, "class", "navbar-links svelte-1e4tdem");
    			add_location(div1, file$p, 23, 5, 551);
    			attr_dev(div2, "class", "navbar svelte-1e4tdem");
    			add_location(div2, file$p, 14, 3, 343);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			if_blocks[current_block_type_index].m(div0, null);
    			append_dev(div2, t);
    			append_dev(div2, div1);
    			if (if_block1) if_block1.m(div1, null);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(div0, "click", /*click_handler*/ ctx[4], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index !== previous_block_index) {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block0 = if_blocks[current_block_type_index];

    				if (!if_block0) {
    					if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block0.c();
    				}

    				transition_in(if_block0, 1);
    				if_block0.m(div0, null);
    			}

    			if (/*visible*/ ctx[0]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty & /*visible*/ 1) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block$4(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(div1, null);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			transition_in(if_block1);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			transition_out(if_block1);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			if_blocks[current_block_type_index].d();
    			if (if_block1) if_block1.d();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$s.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$s($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Burger', slots, []);
    	let visible = false;
    	let current = 'nav-link-home';
    	let dropdownTrigger;
    	let dropdownLanguage;
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Burger> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => $$invalidate(0, visible = !visible);
    	const click_handler_1 = () => $$invalidate(1, current = 'nav-link-home');
    	const click_handler_2 = () => $$invalidate(1, current = 'nav-link-about');
    	const click_handler_3 = () => $$invalidate(1, current = 'nav-link-service');
    	const click_handler_4 = () => $$invalidate(1, current = 'nav-link-team');
    	const click_handler_5 = () => $$invalidate(1, current = 'nav-link-client');

    	function button_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			dropdownTrigger = $$value;
    			$$invalidate(2, dropdownTrigger);
    		});
    	}

    	const click_handler_6 = () => $$invalidate(1, current = 'nav-link-contact');

    	function button_binding_1($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			dropdownLanguage = $$value;
    			$$invalidate(3, dropdownLanguage);
    		});
    	}

    	$$self.$capture_state = () => ({
    		slide: slide$1,
    		List: List$1,
    		XLg: XLg$1,
    		Globe: Globe$1,
    		ChevronDown: ChevronDown$1,
    		visible,
    		current,
    		Dropdown,
    		dropdownTrigger,
    		dropdownLanguage
    	});

    	$$self.$inject_state = $$props => {
    		if ('visible' in $$props) $$invalidate(0, visible = $$props.visible);
    		if ('current' in $$props) $$invalidate(1, current = $$props.current);
    		if ('dropdownTrigger' in $$props) $$invalidate(2, dropdownTrigger = $$props.dropdownTrigger);
    		if ('dropdownLanguage' in $$props) $$invalidate(3, dropdownLanguage = $$props.dropdownLanguage);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		visible,
    		current,
    		dropdownTrigger,
    		dropdownLanguage,
    		click_handler,
    		click_handler_1,
    		click_handler_2,
    		click_handler_3,
    		click_handler_4,
    		click_handler_5,
    		button_binding,
    		click_handler_6,
    		button_binding_1
    	];
    }

    class Burger extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$s, create_fragment$s, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Burger",
    			options,
    			id: create_fragment$s.name
    		});
    	}
    }

    /* src\component\Header.svelte generated by Svelte v3.48.0 */
    const file$o = "src\\component\\Header.svelte";

    function create_fragment$r(ctx) {
    	let header;
    	let div1;
    	let div0;
    	let a0;
    	let img;
    	let img_src_value;
    	let t0;
    	let nav;
    	let ul2;
    	let li0;
    	let a1;
    	let t1;
    	let a1_class_value;
    	let t2;
    	let li1;
    	let a2;
    	let t3;
    	let a2_class_value;
    	let t4;
    	let li2;
    	let a3;
    	let t5;
    	let a3_class_value;
    	let t6;
    	let li3;
    	let a4;
    	let t7;
    	let a4_class_value;
    	let t8;
    	let li4;
    	let a5;
    	let t9;
    	let a5_class_value;
    	let t10;
    	let li9;
    	let a6;
    	let span;
    	let t12;
    	let i0;
    	let chevrondown;
    	let a6_class_value;
    	let t13;
    	let ul0;
    	let li5;
    	let a7;
    	let t15;
    	let li6;
    	let a8;
    	let t17;
    	let li7;
    	let a9;
    	let t19;
    	let li8;
    	let a10;
    	let t21;
    	let li10;
    	let a11;
    	let t22;
    	let a11_class_value;
    	let t23;
    	let li13;
    	let a12;
    	let i1;
    	let globe;
    	let a12_class_value;
    	let t24;
    	let ul1;
    	let li11;
    	let a13;
    	let t26;
    	let li12;
    	let a14;
    	let t28;
    	let i2;
    	let burger;
    	let current;
    	let mounted;
    	let dispose;
    	chevrondown = new ChevronDown$1({ $$inline: true });
    	globe = new Globe$1({ $$inline: true });
    	burger = new Burger({ $$inline: true });

    	const block = {
    		c: function create() {
    			header = element("header");
    			div1 = element("div");
    			div0 = element("div");
    			a0 = element("a");
    			img = element("img");
    			t0 = space();
    			nav = element("nav");
    			ul2 = element("ul");
    			li0 = element("li");
    			a1 = element("a");
    			t1 = text$1("Home");
    			t2 = space();
    			li1 = element("li");
    			a2 = element("a");
    			t3 = text$1("About");
    			t4 = space();
    			li2 = element("li");
    			a3 = element("a");
    			t5 = text$1("Services");
    			t6 = space();
    			li3 = element("li");
    			a4 = element("a");
    			t7 = text$1("Team");
    			t8 = space();
    			li4 = element("li");
    			a5 = element("a");
    			t9 = text$1("Clients");
    			t10 = space();
    			li9 = element("li");
    			a6 = element("a");
    			span = element("span");
    			span.textContent = "Courses";
    			t12 = space();
    			i0 = element("i");
    			create_component(chevrondown.$$.fragment);
    			t13 = space();
    			ul0 = element("ul");
    			li5 = element("li");
    			a7 = element("a");
    			a7.textContent = "Our Courses";
    			t15 = space();
    			li6 = element("li");
    			a8 = element("a");
    			a8.textContent = "Our Tutors";
    			t17 = space();
    			li7 = element("li");
    			a9 = element("a");
    			a9.textContent = "Register for Classes";
    			t19 = space();
    			li8 = element("li");
    			a10 = element("a");
    			a10.textContent = "Pricing";
    			t21 = space();
    			li10 = element("li");
    			a11 = element("a");
    			t22 = text$1("Contact Us");
    			t23 = space();
    			li13 = element("li");
    			a12 = element("a");
    			i1 = element("i");
    			create_component(globe.$$.fragment);
    			t24 = space();
    			ul1 = element("ul");
    			li11 = element("li");
    			a13 = element("a");
    			a13.textContent = "English";
    			t26 = space();
    			li12 = element("li");
    			a14 = element("a");
    			a14.textContent = "Indonesia";
    			t28 = space();
    			i2 = element("i");
    			create_component(burger.$$.fragment);
    			if (!src_url_equal(img.src, img_src_value = "assets/img/logo.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			attr_dev(img, "class", "img-fluid");
    			add_location(img, file$o, 16, 22, 494);
    			attr_dev(a0, "href", "/#/");
    			add_location(a0, file$o, 16, 8, 480);
    			attr_dev(div0, "class", "logo");
    			add_location(div0, file$o, 15, 6, 452);

    			attr_dev(a1, "class", a1_class_value = "" + (null_to_empty(/*current*/ ctx[0] === 'nav-link-home'
    			? 'activeted'
    			: '') + " svelte-jt1c5e"));

    			attr_dev(a1, "href", "#hero");
    			add_location(a1, file$o, 21, 14, 642);
    			add_location(li0, file$o, 21, 10, 638);

    			attr_dev(a2, "class", a2_class_value = "" + (null_to_empty(/*current*/ ctx[0] === 'nav-link-about'
    			? 'activeted'
    			: '') + " svelte-jt1c5e"));

    			attr_dev(a2, "href", "#about");
    			add_location(a2, file$o, 22, 14, 792);
    			add_location(li1, file$o, 22, 10, 788);

    			attr_dev(a3, "class", a3_class_value = "" + (null_to_empty(/*current*/ ctx[0] === 'nav-link-service'
    			? 'activeted'
    			: '') + " svelte-jt1c5e"));

    			attr_dev(a3, "href", "#services");
    			add_location(a3, file$o, 23, 14, 944);
    			add_location(li2, file$o, 23, 10, 940);

    			attr_dev(a4, "class", a4_class_value = "" + (null_to_empty(/*current*/ ctx[0] === 'nav-link-team'
    			? 'activeted'
    			: '') + " svelte-jt1c5e"));

    			attr_dev(a4, "href", "#team");
    			add_location(a4, file$o, 24, 14, 1108);
    			add_location(li3, file$o, 24, 10, 1104);

    			attr_dev(a5, "class", a5_class_value = "" + (null_to_empty(/*current*/ ctx[0] === 'nav-link-client'
    			? 'activeted'
    			: '') + " svelte-jt1c5e"));

    			attr_dev(a5, "href", "#clients");
    			add_location(a5, file$o, 25, 14, 1258);
    			add_location(li4, file$o, 25, 10, 1254);
    			add_location(span, file$o, 28, 13, 1583);
    			attr_dev(i0, "class", "bi bi-chevron-down");
    			add_location(i0, file$o, 28, 34, 1604);
    			attr_dev(a6, "href", "/#");

    			attr_dev(a6, "class", a6_class_value = "" + (null_to_empty(/*current*/ ctx[0] === 'nav-link-course'
    			? 'activeted'
    			: '') + " svelte-jt1c5e"));

    			add_location(a6, file$o, 27, 12, 1449);
    			attr_dev(a7, "href", "/#/ourcourse");
    			add_location(a7, file$o, 30, 18, 1694);
    			add_location(li5, file$o, 30, 14, 1690);
    			attr_dev(a8, "href", "/#/ourtutors");
    			add_location(a8, file$o, 31, 18, 1758);
    			add_location(li6, file$o, 31, 14, 1754);
    			attr_dev(a9, "href", "/#/register");
    			add_location(a9, file$o, 32, 18, 1820);
    			add_location(li7, file$o, 32, 14, 1816);
    			attr_dev(a10, "href", "/#/price");
    			add_location(a10, file$o, 33, 18, 1892);
    			add_location(li8, file$o, 33, 14, 1888);
    			add_location(ul0, file$o, 29, 12, 1670);
    			attr_dev(li9, "class", "dropdown");
    			add_location(li9, file$o, 26, 10, 1414);

    			attr_dev(a11, "class", a11_class_value = "" + (null_to_empty(/*current*/ ctx[0] === 'nav-link-contact'
    			? 'activeted'
    			: '') + " svelte-jt1c5e"));

    			attr_dev(a11, "href", "#contact");
    			add_location(a11, file$o, 36, 14, 1979);
    			add_location(li10, file$o, 36, 10, 1975);
    			attr_dev(i1, "class", "bi bi-globe");
    			add_location(i1, file$o, 38, 136, 2297);

    			attr_dev(a12, "class", a12_class_value = "" + (null_to_empty(/*current*/ ctx[0] === 'nav-link-language'
    			? 'activeted'
    			: '') + " svelte-jt1c5e"));

    			attr_dev(a12, "href", "/#");
    			add_location(a12, file$o, 38, 12, 2173);
    			attr_dev(a13, "href", "https://torche.app");
    			add_location(a13, file$o, 40, 18, 2374);
    			add_location(li11, file$o, 40, 14, 2370);
    			attr_dev(a14, "href", "https://torche.app/id/");
    			add_location(a14, file$o, 41, 18, 2439);
    			add_location(li12, file$o, 41, 14, 2435);
    			add_location(ul1, file$o, 39, 12, 2350);
    			attr_dev(li13, "class", "dropdown");
    			add_location(li13, file$o, 37, 10, 2138);
    			add_location(ul2, file$o, 20, 8, 622);
    			attr_dev(i2, "class", "bi bi-list mobile-nav-toggle");
    			add_location(i2, file$o, 45, 8, 2551);
    			attr_dev(nav, "id", "navbar");
    			attr_dev(nav, "class", "navbar");
    			add_location(nav, file$o, 19, 6, 580);
    			attr_dev(div1, "class", "container d-flex justify-content-between");
    			add_location(div1, file$o, 14, 4, 390);
    			attr_dev(header, "id", "header");
    			attr_dev(header, "class", "fixed-top d-flex align-items-center");
    			add_location(header, file$o, 13, 0, 320);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, header, anchor);
    			append_dev(header, div1);
    			append_dev(div1, div0);
    			append_dev(div0, a0);
    			append_dev(a0, img);
    			append_dev(div1, t0);
    			append_dev(div1, nav);
    			append_dev(nav, ul2);
    			append_dev(ul2, li0);
    			append_dev(li0, a1);
    			append_dev(a1, t1);
    			append_dev(ul2, t2);
    			append_dev(ul2, li1);
    			append_dev(li1, a2);
    			append_dev(a2, t3);
    			append_dev(ul2, t4);
    			append_dev(ul2, li2);
    			append_dev(li2, a3);
    			append_dev(a3, t5);
    			append_dev(ul2, t6);
    			append_dev(ul2, li3);
    			append_dev(li3, a4);
    			append_dev(a4, t7);
    			append_dev(ul2, t8);
    			append_dev(ul2, li4);
    			append_dev(li4, a5);
    			append_dev(a5, t9);
    			append_dev(ul2, t10);
    			append_dev(ul2, li9);
    			append_dev(li9, a6);
    			append_dev(a6, span);
    			append_dev(a6, t12);
    			append_dev(a6, i0);
    			mount_component(chevrondown, i0, null);
    			append_dev(li9, t13);
    			append_dev(li9, ul0);
    			append_dev(ul0, li5);
    			append_dev(li5, a7);
    			append_dev(ul0, t15);
    			append_dev(ul0, li6);
    			append_dev(li6, a8);
    			append_dev(ul0, t17);
    			append_dev(ul0, li7);
    			append_dev(li7, a9);
    			append_dev(ul0, t19);
    			append_dev(ul0, li8);
    			append_dev(li8, a10);
    			append_dev(ul2, t21);
    			append_dev(ul2, li10);
    			append_dev(li10, a11);
    			append_dev(a11, t22);
    			append_dev(ul2, t23);
    			append_dev(ul2, li13);
    			append_dev(li13, a12);
    			append_dev(a12, i1);
    			mount_component(globe, i1, null);
    			append_dev(li13, t24);
    			append_dev(li13, ul1);
    			append_dev(ul1, li11);
    			append_dev(li11, a13);
    			append_dev(ul1, t26);
    			append_dev(ul1, li12);
    			append_dev(li12, a14);
    			append_dev(nav, t28);
    			append_dev(nav, i2);
    			mount_component(burger, i2, null);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(a1, "click", /*click_handler*/ ctx[1], false, false, false),
    					listen_dev(a2, "click", /*click_handler_1*/ ctx[2], false, false, false),
    					listen_dev(a3, "click", /*click_handler_2*/ ctx[3], false, false, false),
    					listen_dev(a4, "click", /*click_handler_3*/ ctx[4], false, false, false),
    					listen_dev(a5, "click", /*click_handler_4*/ ctx[5], false, false, false),
    					listen_dev(a6, "click", /*click_handler_5*/ ctx[6], false, false, false),
    					listen_dev(a11, "click", /*click_handler_6*/ ctx[7], false, false, false),
    					listen_dev(a12, "click", /*click_handler_7*/ ctx[8], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*current*/ 1 && a1_class_value !== (a1_class_value = "" + (null_to_empty(/*current*/ ctx[0] === 'nav-link-home'
    			? 'activeted'
    			: '') + " svelte-jt1c5e"))) {
    				attr_dev(a1, "class", a1_class_value);
    			}

    			if (!current || dirty & /*current*/ 1 && a2_class_value !== (a2_class_value = "" + (null_to_empty(/*current*/ ctx[0] === 'nav-link-about'
    			? 'activeted'
    			: '') + " svelte-jt1c5e"))) {
    				attr_dev(a2, "class", a2_class_value);
    			}

    			if (!current || dirty & /*current*/ 1 && a3_class_value !== (a3_class_value = "" + (null_to_empty(/*current*/ ctx[0] === 'nav-link-service'
    			? 'activeted'
    			: '') + " svelte-jt1c5e"))) {
    				attr_dev(a3, "class", a3_class_value);
    			}

    			if (!current || dirty & /*current*/ 1 && a4_class_value !== (a4_class_value = "" + (null_to_empty(/*current*/ ctx[0] === 'nav-link-team'
    			? 'activeted'
    			: '') + " svelte-jt1c5e"))) {
    				attr_dev(a4, "class", a4_class_value);
    			}

    			if (!current || dirty & /*current*/ 1 && a5_class_value !== (a5_class_value = "" + (null_to_empty(/*current*/ ctx[0] === 'nav-link-client'
    			? 'activeted'
    			: '') + " svelte-jt1c5e"))) {
    				attr_dev(a5, "class", a5_class_value);
    			}

    			if (!current || dirty & /*current*/ 1 && a6_class_value !== (a6_class_value = "" + (null_to_empty(/*current*/ ctx[0] === 'nav-link-course'
    			? 'activeted'
    			: '') + " svelte-jt1c5e"))) {
    				attr_dev(a6, "class", a6_class_value);
    			}

    			if (!current || dirty & /*current*/ 1 && a11_class_value !== (a11_class_value = "" + (null_to_empty(/*current*/ ctx[0] === 'nav-link-contact'
    			? 'activeted'
    			: '') + " svelte-jt1c5e"))) {
    				attr_dev(a11, "class", a11_class_value);
    			}

    			if (!current || dirty & /*current*/ 1 && a12_class_value !== (a12_class_value = "" + (null_to_empty(/*current*/ ctx[0] === 'nav-link-language'
    			? 'activeted'
    			: '') + " svelte-jt1c5e"))) {
    				attr_dev(a12, "class", a12_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(chevrondown.$$.fragment, local);
    			transition_in(globe.$$.fragment, local);
    			transition_in(burger.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(chevrondown.$$.fragment, local);
    			transition_out(globe.$$.fragment, local);
    			transition_out(burger.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(header);
    			destroy_component(chevrondown);
    			destroy_component(globe);
    			destroy_component(burger);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$r.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$r($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Header', slots, []);
    	let current = 'nav-link-home';
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Header> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => $$invalidate(0, current = 'nav-link-home');
    	const click_handler_1 = () => $$invalidate(0, current = 'nav-link-about');
    	const click_handler_2 = () => $$invalidate(0, current = 'nav-link-service');
    	const click_handler_3 = () => $$invalidate(0, current = 'nav-link-team');
    	const click_handler_4 = () => $$invalidate(0, current = 'nav-link-client');
    	const click_handler_5 = () => $$invalidate(0, current = 'nav-link-course');
    	const click_handler_6 = () => $$invalidate(0, current = 'nav-link-contact');
    	const click_handler_7 = () => $$invalidate(0, current = 'nav-link-language');

    	$$self.$capture_state = () => ({
    		List: List$1,
    		Globe: Globe$1,
    		ChevronDown: ChevronDown$1,
    		Burger,
    		current
    	});

    	$$self.$inject_state = $$props => {
    		if ('current' in $$props) $$invalidate(0, current = $$props.current);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		current,
    		click_handler,
    		click_handler_1,
    		click_handler_2,
    		click_handler_3,
    		click_handler_4,
    		click_handler_5,
    		click_handler_6,
    		click_handler_7
    	];
    }

    class Header extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$r, create_fragment$r, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Header",
    			options,
    			id: create_fragment$r.name
    		});
    	}
    }

    /* src\component\BreadCrum.svelte generated by Svelte v3.48.0 */

    const file$n = "src\\component\\BreadCrum.svelte";

    function create_fragment$q(ctx) {
    	let section;
    	let div1;
    	let div0;
    	let h2;
    	let t0;
    	let t1;
    	let ol;
    	let li0;
    	let a;
    	let t3;
    	let li1;
    	let t4;

    	const block = {
    		c: function create() {
    			section = element("section");
    			div1 = element("div");
    			div0 = element("div");
    			h2 = element("h2");
    			t0 = text$1(/*name*/ ctx[0]);
    			t1 = space();
    			ol = element("ol");
    			li0 = element("li");
    			a = element("a");
    			a.textContent = "Courses";
    			t3 = space();
    			li1 = element("li");
    			t4 = text$1(/*subName*/ ctx[1]);
    			add_location(h2, file$n, 9, 8, 262);
    			attr_dev(a, "href", "/#");
    			add_location(a, file$n, 11, 14, 307);
    			add_location(li0, file$n, 11, 10, 303);
    			add_location(li1, file$n, 12, 10, 348);
    			add_location(ol, file$n, 10, 8, 287);
    			attr_dev(div0, "class", "d-flex justify-content-between align-items-center");
    			add_location(div0, file$n, 8, 6, 189);
    			attr_dev(div1, "class", "container");
    			add_location(div1, file$n, 7, 4, 158);
    			attr_dev(section, "class", "breadcrumbs");
    			add_location(section, file$n, 6, 1, 123);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, div1);
    			append_dev(div1, div0);
    			append_dev(div0, h2);
    			append_dev(h2, t0);
    			append_dev(div0, t1);
    			append_dev(div0, ol);
    			append_dev(ol, li0);
    			append_dev(li0, a);
    			append_dev(ol, t3);
    			append_dev(ol, li1);
    			append_dev(li1, t4);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*name*/ 1) set_data_dev(t0, /*name*/ ctx[0]);
    			if (dirty & /*subName*/ 2) set_data_dev(t4, /*subName*/ ctx[1]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$q.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$q($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('BreadCrum', slots, []);
    	let { name } = $$props;
    	let { subName } = $$props;
    	const writable_props = ['name', 'subName'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<BreadCrum> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('name' in $$props) $$invalidate(0, name = $$props.name);
    		if ('subName' in $$props) $$invalidate(1, subName = $$props.subName);
    	};

    	$$self.$capture_state = () => ({ name, subName });

    	$$self.$inject_state = $$props => {
    		if ('name' in $$props) $$invalidate(0, name = $$props.name);
    		if ('subName' in $$props) $$invalidate(1, subName = $$props.subName);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [name, subName];
    }

    class BreadCrum extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$q, create_fragment$q, safe_not_equal, { name: 0, subName: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "BreadCrum",
    			options,
    			id: create_fragment$q.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*name*/ ctx[0] === undefined && !('name' in props)) {
    			console.warn("<BreadCrum> was created without expected prop 'name'");
    		}

    		if (/*subName*/ ctx[1] === undefined && !('subName' in props)) {
    			console.warn("<BreadCrum> was created without expected prop 'subName'");
    		}
    	}

    	get name() {
    		throw new Error("<BreadCrum>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<BreadCrum>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get subName() {
    		throw new Error("<BreadCrum>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set subName(value) {
    		throw new Error("<BreadCrum>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\DetailTeam.svelte generated by Svelte v3.48.0 */

    const file$m = "src\\component\\DetailTeam.svelte";

    function create_fragment$p(ctx) {
    	let img;
    	let img_src_value;
    	let t0;
    	let p0;
    	let t1;
    	let t2;
    	let p1;
    	let t3;

    	const block = {
    		c: function create() {
    			img = element("img");
    			t0 = space();
    			p0 = element("p");
    			t1 = text$1(/*title*/ ctx[1]);
    			t2 = space();
    			p1 = element("p");
    			t3 = text$1(/*name*/ ctx[2]);
    			if (!src_url_equal(img.src, img_src_value = /*photo*/ ctx[0])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "img-team");
    			attr_dev(img, "class", "img-fluid rounded-circle mb-3");
    			set_style(img, "width", "12.5rem");
    			add_location(img, file$m, 7, 0, 93);
    			attr_dev(p0, "class", "fw-bold mb-0");
    			add_location(p0, file$m, 8, 0, 189);
    			add_location(p1, file$m, 9, 0, 226);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, p0, anchor);
    			append_dev(p0, t1);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, p1, anchor);
    			append_dev(p1, t3);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*photo*/ 1 && !src_url_equal(img.src, img_src_value = /*photo*/ ctx[0])) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*title*/ 2) set_data_dev(t1, /*title*/ ctx[1]);
    			if (dirty & /*name*/ 4) set_data_dev(t3, /*name*/ ctx[2]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(p0);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(p1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$p.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$p($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('DetailTeam', slots, []);
    	let { photo } = $$props;
    	let { title } = $$props;
    	let { name } = $$props;
    	const writable_props = ['photo', 'title', 'name'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<DetailTeam> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('photo' in $$props) $$invalidate(0, photo = $$props.photo);
    		if ('title' in $$props) $$invalidate(1, title = $$props.title);
    		if ('name' in $$props) $$invalidate(2, name = $$props.name);
    	};

    	$$self.$capture_state = () => ({ photo, title, name });

    	$$self.$inject_state = $$props => {
    		if ('photo' in $$props) $$invalidate(0, photo = $$props.photo);
    		if ('title' in $$props) $$invalidate(1, title = $$props.title);
    		if ('name' in $$props) $$invalidate(2, name = $$props.name);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [photo, title, name];
    }

    class DetailTeam extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$p, create_fragment$p, safe_not_equal, { photo: 0, title: 1, name: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "DetailTeam",
    			options,
    			id: create_fragment$p.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*photo*/ ctx[0] === undefined && !('photo' in props)) {
    			console.warn("<DetailTeam> was created without expected prop 'photo'");
    		}

    		if (/*title*/ ctx[1] === undefined && !('title' in props)) {
    			console.warn("<DetailTeam> was created without expected prop 'title'");
    		}

    		if (/*name*/ ctx[2] === undefined && !('name' in props)) {
    			console.warn("<DetailTeam> was created without expected prop 'name'");
    		}
    	}

    	get photo() {
    		throw new Error("<DetailTeam>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set photo(value) {
    		throw new Error("<DetailTeam>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<DetailTeam>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<DetailTeam>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get name() {
    		throw new Error("<DetailTeam>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<DetailTeam>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\Teams.svelte generated by Svelte v3.48.0 */
    const file$l = "src\\component\\Teams.svelte";

    function create_fragment$o(ctx) {
    	let section;
    	let div18;
    	let div17;
    	let div1;
    	let div0;
    	let detailteam0;
    	let t0;
    	let div6;
    	let div2;
    	let detailteam1;
    	let t1;
    	let div3;
    	let detailteam2;
    	let t2;
    	let div4;
    	let detailteam3;
    	let t3;
    	let div5;
    	let detailteam4;
    	let t4;
    	let div11;
    	let div7;
    	let detailteam5;
    	let t5;
    	let div8;
    	let detailteam6;
    	let t6;
    	let div9;
    	let detailteam7;
    	let t7;
    	let div10;
    	let t8;
    	let div13;
    	let div12;
    	let h4;
    	let t10;
    	let div16;
    	let div14;
    	let detailteam8;
    	let t11;
    	let div15;
    	let detailteam9;
    	let current;

    	detailteam0 = new DetailTeam({
    			props: {
    				photo: "./assets/img/team-1.jpg",
    				title: 'Chief Executive Officer, Chief Marketing Officer & CO-Founder',
    				name: 'Muhammad Yusuf Arya Ramadhan'
    			},
    			$$inline: true
    		});

    	detailteam1 = new DetailTeam({
    			props: {
    				photo: "./assets/img/team-2.jpg",
    				title: 'Chief Operating Officer & CO-Founder',
    				name: 'Felix Pratama'
    			},
    			$$inline: true
    		});

    	detailteam2 = new DetailTeam({
    			props: {
    				photo: "./assets/img/team-3.jpg",
    				title: 'Chief Financial Officer & CO-Founder',
    				name: 'Leon Lukhas Santoso'
    			},
    			$$inline: true
    		});

    	detailteam3 = new DetailTeam({
    			props: {
    				photo: "./assets/img/team-4.jpg",
    				title: 'Chief Human Resource Officer & CO-Founder',
    				name: 'Sendy Winata'
    			},
    			$$inline: true
    		});

    	detailteam4 = new DetailTeam({
    			props: {
    				photo: "./assets/img/team/cto.jpg",
    				title: 'Chief Technology Officer',
    				name: 'Samuel Pangeran Aletheia'
    			},
    			$$inline: true
    		});

    	detailteam5 = new DetailTeam({
    			props: {
    				photo: "./assets/img/team/curr.jpg",
    				title: 'Manager of Curriculum',
    				name: 'Syahdan Amir Muhammad'
    			},
    			$$inline: true
    		});

    	detailteam6 = new DetailTeam({
    			props: {
    				photo: "./assets/img/team/contr.jpg",
    				title: `Manager of Controller and Sales`,
    				name: 'Athallia Qatrunnada'
    			},
    			$$inline: true
    		});

    	detailteam7 = new DetailTeam({
    			props: {
    				photo: "./assets/img/team/audit.jpg",
    				title: `Manager of Financial Audit`,
    				name: 'Sharen Kevin'
    			},
    			$$inline: true
    		});

    	detailteam8 = new DetailTeam({
    			props: {
    				photo: "./assets/img/team/comm1.jpg",
    				title: `Commisioner`,
    				name: 'Ir. Pahala P Silalahi'
    			},
    			$$inline: true
    		});

    	detailteam9 = new DetailTeam({
    			props: {
    				photo: "./assets/img/team/comm2.jpg",
    				title: `Commisioner`,
    				name: 'Pariama Carolin S, S.H.'
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			section = element("section");
    			div18 = element("div");
    			div17 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			create_component(detailteam0.$$.fragment);
    			t0 = space();
    			div6 = element("div");
    			div2 = element("div");
    			create_component(detailteam1.$$.fragment);
    			t1 = space();
    			div3 = element("div");
    			create_component(detailteam2.$$.fragment);
    			t2 = space();
    			div4 = element("div");
    			create_component(detailteam3.$$.fragment);
    			t3 = space();
    			div5 = element("div");
    			create_component(detailteam4.$$.fragment);
    			t4 = space();
    			div11 = element("div");
    			div7 = element("div");
    			create_component(detailteam5.$$.fragment);
    			t5 = space();
    			div8 = element("div");
    			create_component(detailteam6.$$.fragment);
    			t6 = space();
    			div9 = element("div");
    			create_component(detailteam7.$$.fragment);
    			t7 = space();
    			div10 = element("div");
    			t8 = space();
    			div13 = element("div");
    			div12 = element("div");
    			h4 = element("h4");
    			h4.textContent = "Board of Commissioners";
    			t10 = space();
    			div16 = element("div");
    			div14 = element("div");
    			create_component(detailteam8.$$.fragment);
    			t11 = space();
    			div15 = element("div");
    			create_component(detailteam9.$$.fragment);
    			attr_dev(div0, "class", "col-12 text-center");
    			attr_dev(div0, "data-aos", "fade-down");
    			add_location(div0, file$l, 9, 16, 203);
    			attr_dev(div1, "class", "row");
    			add_location(div1, file$l, 8, 12, 168);
    			attr_dev(div2, "class", "col-md-6 col-lg-3 text-center");
    			attr_dev(div2, "data-aos", "fade-down-right");
    			add_location(div2, file$l, 14, 16, 544);
    			attr_dev(div3, "class", "col-md-6 col-lg-3 text-center ");
    			attr_dev(div3, "data-aos", "fade-down-right");
    			add_location(div3, file$l, 17, 16, 806);
    			attr_dev(div4, "class", "col-md-6 col-lg-3 text-center ");
    			attr_dev(div4, "data-aos", "fade-down-left");
    			add_location(div4, file$l, 20, 16, 1077);
    			attr_dev(div5, "class", "col-md-6 col-lg-3 text-center ");
    			attr_dev(div5, "data-aos", "fade-down-left");
    			add_location(div5, file$l, 23, 16, 1344);
    			attr_dev(div6, "class", "row my-3");
    			add_location(div6, file$l, 13, 14, 504);
    			attr_dev(div7, "class", "col-md-6 col-lg-3 text-center");
    			attr_dev(div7, "data-aos", "fade-right");
    			add_location(div7, file$l, 29, 16, 1670);
    			attr_dev(div8, "class", "col-md-6 col-lg-3 text-center");
    			attr_dev(div8, "data-aos", "fade-right");
    			add_location(div8, file$l, 32, 16, 1923);
    			attr_dev(div9, "class", "col-md-6 col-lg-3 text-center");
    			attr_dev(div9, "data-aos", "fade-left");
    			add_location(div9, file$l, 35, 18, 2176);
    			attr_dev(div10, "class", "col-md-6 col-lg-3 text-center");
    			attr_dev(div10, "data-aos", "fade-left");
    			add_location(div10, file$l, 38, 18, 2416);
    			attr_dev(div11, "class", "row my-3");
    			add_location(div11, file$l, 28, 14, 1630);
    			attr_dev(h4, "class", "fw-bold");
    			add_location(h4, file$l, 44, 20, 2682);
    			attr_dev(div12, "class", "col-md-6 col-lg-12");
    			attr_dev(div12, "data-aos", "fade-up");
    			add_location(div12, file$l, 43, 18, 2608);
    			attr_dev(div13, "class", "row mt-3");
    			add_location(div13, file$l, 42, 16, 2566);
    			attr_dev(div14, "class", "col-md-6 col-lg-3 text-center offset-lg-3");
    			attr_dev(div14, "data-aos", "fade-up");
    			attr_dev(div14, "data-aos-delay", "200");
    			add_location(div14, file$l, 48, 18, 2839);
    			attr_dev(div15, "class", "col-md-6 col-lg-3 text-center");
    			attr_dev(div15, "data-aos", "fade-up");
    			attr_dev(div15, "data-aos-delay", "200");
    			add_location(div15, file$l, 51, 16, 3100);
    			attr_dev(div16, "class", "row my-3");
    			add_location(div16, file$l, 47, 16, 2797);
    			attr_dev(div17, "class", "container");
    			add_location(div17, file$l, 7, 8, 131);
    			attr_dev(div18, "class", "container-fluid my-5");
    			add_location(div18, file$l, 6, 4, 87);
    			add_location(section, file$l, 5, 0, 72);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, div18);
    			append_dev(div18, div17);
    			append_dev(div17, div1);
    			append_dev(div1, div0);
    			mount_component(detailteam0, div0, null);
    			append_dev(div17, t0);
    			append_dev(div17, div6);
    			append_dev(div6, div2);
    			mount_component(detailteam1, div2, null);
    			append_dev(div6, t1);
    			append_dev(div6, div3);
    			mount_component(detailteam2, div3, null);
    			append_dev(div6, t2);
    			append_dev(div6, div4);
    			mount_component(detailteam3, div4, null);
    			append_dev(div6, t3);
    			append_dev(div6, div5);
    			mount_component(detailteam4, div5, null);
    			append_dev(div17, t4);
    			append_dev(div17, div11);
    			append_dev(div11, div7);
    			mount_component(detailteam5, div7, null);
    			append_dev(div11, t5);
    			append_dev(div11, div8);
    			mount_component(detailteam6, div8, null);
    			append_dev(div11, t6);
    			append_dev(div11, div9);
    			mount_component(detailteam7, div9, null);
    			append_dev(div11, t7);
    			append_dev(div11, div10);
    			append_dev(div17, t8);
    			append_dev(div17, div13);
    			append_dev(div13, div12);
    			append_dev(div12, h4);
    			append_dev(div17, t10);
    			append_dev(div17, div16);
    			append_dev(div16, div14);
    			mount_component(detailteam8, div14, null);
    			append_dev(div16, t11);
    			append_dev(div16, div15);
    			mount_component(detailteam9, div15, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(detailteam0.$$.fragment, local);
    			transition_in(detailteam1.$$.fragment, local);
    			transition_in(detailteam2.$$.fragment, local);
    			transition_in(detailteam3.$$.fragment, local);
    			transition_in(detailteam4.$$.fragment, local);
    			transition_in(detailteam5.$$.fragment, local);
    			transition_in(detailteam6.$$.fragment, local);
    			transition_in(detailteam7.$$.fragment, local);
    			transition_in(detailteam8.$$.fragment, local);
    			transition_in(detailteam9.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(detailteam0.$$.fragment, local);
    			transition_out(detailteam1.$$.fragment, local);
    			transition_out(detailteam2.$$.fragment, local);
    			transition_out(detailteam3.$$.fragment, local);
    			transition_out(detailteam4.$$.fragment, local);
    			transition_out(detailteam5.$$.fragment, local);
    			transition_out(detailteam6.$$.fragment, local);
    			transition_out(detailteam7.$$.fragment, local);
    			transition_out(detailteam8.$$.fragment, local);
    			transition_out(detailteam9.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			destroy_component(detailteam0);
    			destroy_component(detailteam1);
    			destroy_component(detailteam2);
    			destroy_component(detailteam3);
    			destroy_component(detailteam4);
    			destroy_component(detailteam5);
    			destroy_component(detailteam6);
    			destroy_component(detailteam7);
    			destroy_component(detailteam8);
    			destroy_component(detailteam9);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$o.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$o($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Teams', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Teams> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ DetailTeam });
    	return [];
    }

    class Teams extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$o, create_fragment$o, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Teams",
    			options,
    			id: create_fragment$o.name
    		});
    	}
    }

    /* src\pages\AllTeam.svelte generated by Svelte v3.48.0 */
    const file$k = "src\\pages\\AllTeam.svelte";

    function create_fragment$n(ctx) {
    	let section;
    	let div1;
    	let div0;
    	let h2;
    	let t1;
    	let ol;
    	let li0;
    	let a;
    	let t3;
    	let li1;
    	let t5;
    	let teams;
    	let current;
    	teams = new Teams({ $$inline: true });

    	const block = {
    		c: function create() {
    			section = element("section");
    			div1 = element("div");
    			div0 = element("div");
    			h2 = element("h2");
    			h2.textContent = "Our Team";
    			t1 = space();
    			ol = element("ol");
    			li0 = element("li");
    			a = element("a");
    			a.textContent = "Team";
    			t3 = space();
    			li1 = element("li");
    			li1.textContent = "Boards";
    			t5 = space();
    			create_component(teams.$$.fragment);
    			add_location(h2, file$k, 12, 8, 321);
    			attr_dev(a, "href", "http://localhost:57600/#team");
    			add_location(a, file$k, 14, 14, 368);
    			add_location(li0, file$k, 14, 10, 364);
    			add_location(li1, file$k, 15, 10, 432);
    			add_location(ol, file$k, 13, 8, 348);
    			attr_dev(div0, "class", "d-flex justify-content-between align-items-center");
    			add_location(div0, file$k, 11, 6, 248);
    			attr_dev(div1, "class", "container");
    			add_location(div1, file$k, 10, 4, 217);
    			attr_dev(section, "class", "breadcrumbs");
    			add_location(section, file$k, 9, 1, 181);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, div1);
    			append_dev(div1, div0);
    			append_dev(div0, h2);
    			append_dev(div0, t1);
    			append_dev(div0, ol);
    			append_dev(ol, li0);
    			append_dev(li0, a);
    			append_dev(ol, t3);
    			append_dev(ol, li1);
    			insert_dev(target, t5, anchor);
    			mount_component(teams, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(teams.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(teams.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			if (detaching) detach_dev(t5);
    			destroy_component(teams, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$n.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$n($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('AllTeam', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<AllTeam> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ BreadCrum, Teams });
    	return [];
    }

    class AllTeam extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$n, create_fragment$n, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "AllTeam",
    			options,
    			id: create_fragment$n.name
    		});
    	}
    }

    let course = [
      {
        id: 1,
        img: "./assets/img/courses/course-calculus.webp",
        subTitle: "Basic Engineering",
        rating: "9/10",
        title: "Fundamentals of Calculus",
        desc: "This course provides student with mathematical knowledge and analytical skills so that they are able to apply techniques of calculus to solve scientific and engineering problems.",
        tutor: {
          tutor1: {
            name: "Syailendra",
            photo: "./assets/img/trainers/tutors-5.jpg",
            rating: "4,62 / 5,0",
            descs: `Chemical Engineering Mathematics, Fundamentals of Calculus, Fluid Particle Mechanics, Numerical Computation for Engineers`,
            review: "44",
            about: `Syailendra currently pursuing master degree in chemical engineering at Institut Teknologi Bandung. He obtained his bachelor degree in chemical engineering from Universitas Indonesia and become research assistant there. Previously, he became lecturer assistant in some chemical engineering subjects at Universitas Indonesia, namely numerical computation, chemical engineering modelling, bioreactor engineering, and bioprocess equipment design course.`,
            schedule: `<iframe  style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=853803407/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
          },
          tutor2: {
            name: "",
            link: "",
            photo: "",
          },
          tutor3: {
            name: "",
            link: "",
            photo: "",
          },
        },
      },

      {
        id: 2,
        img: "./assets/img/courses/course-physics1.webp",
        subTitle: "Basic Engineering",
        rating: "8,7/10",
        title: "Fundamentals of Physics - Mechanics & Heat",
        desc: `This course provides introduction to basic physics for engineers and knowledge and problems in newton's law of motion and conservation of energy.`,
        tutor: {
          tutor1: {
            name: "Yevonnael",
            photo: "assets/img/trainers/tutors-18.jpg",
            rating: " 0,0 / 5,0",
            review: "0",
            about: ``,
            schedule: ` <iframe  style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=232143025/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
            descs: `Fundamentals of Physics, Numerical Computation for Engineers, Statistics & Probability`,
          },
          tutor2: {
            name: "",
            link: "",
            photo: "",
          },
          tutor3: {
            name: "",
            link: "",
            photo: "",
          },
        },
      },

      {
        id: 3,
        img: "./assets/img/courses/course-physics2.webp",
        subTitle: "Basic Engineering",
        rating: "0/10",
        title: `Fundamentals of Physics - Magnets, Electrics, Waves, Optics`,
        desc: `This course provides basic physics for engineers in magnets, electrics, waves, and optics problems. Subjects including modern physics, electromagnets, and light will be covered.`,
        tutor: {
          tutor1: {
            name: "Yevonnael",
            photo: "assets/img/trainers/tutors-18.jpg",
            rating: " 0,0 / 5,0",
            review: "0",
            about: ``,
            schedule: ` <iframe  style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=232143025/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
            descs: `Fundamentals of Physics, Numerical Computation for Engineers, Statistics & Probability`,
          },
          tutor2: {
            name: "",
            link: "",
            photo: "",
          },
          tutor3: {
            name: "",
            link: "",
            photo: "",
          },
        },
      },
      {
        id: 4,
        img: "./assets/img/courses/course-chemistry.webp",
        subTitle: "Basic Engineering",
        rating: "8/10",
        title: `Fundamentals of Chemistry`,
        desc: `This course will provide basics and fundamentals of chemistry to solve common problems in engineering. The course covers subjects in chemical reaction, thermochemistry, chemical equilibrium, electrochemistry, and kinetics.`,
        tutor: {
          tutor1: {
            name: "Ajeng",
            photo: "assets/img/trainers/tutors-21.jpg",
            rating: "0,0 / 5,0",
            review: "0",
            about: `Chemistry Lecturer at Universitas Islam Nusantara and Akademi Industri Tekstil Bandung.<br>
        Assistant Lecturer for Organic Chemistry 2015-2017 at Institut Teknologi Bandung.<br> Chemistry Tutor for high school students with a strong background in Masters of Chemistry to guide students into preparation for the National Science Competition and Cambridge IGCSE Level Examinations. `,
            schedule: `<iframe  style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=1180678746/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
            descs: `Fundamental of Chemistry`,
          },
          tutor2: {
            name: "Adam",
            photo: "assets/img/trainers/tutors-20.jpg",
            rating: " 0,0 / 5,0",
            review: "0",
            about: ``,
            schedule: `<iframe  style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=2058222731/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
            descs: `Fundamentals of Chemistry, Fundamentals of Analytical Chemistry`,
          },
          tutor3: {
            name: "Hani",
            photo: "assets/img/trainers/tutors-16.jpg",
            rating: "4,8 / 5,0",
            review: "2",
            about: `D III: Polytechnic of AKA Bogor (2013-2016) IPK: 3.55 <br>S-1: Malang State University (UM) (2017-2019) IPK: 3.60<br> S-2 : Institute of Technology Bandung (ITB) (2020-2022) IPK : 3.85<br><br><b>Experience:</b><br>QA Microbiology intern at PT. Capsugel Indonesia (2015)<br>
        Tutor of National Exam (Chemistry Subject) (2017)<br>
        Fundamentals of Chemistry Laboratory Teaching Assistant at ITB (2021)<br>
        Separation method and electrochemical Laboratory Teaching Assistant at ITB (2021)<br>
        Environmental Chemistry Laboratory Assistant at UM (2018)<br>
        Publication: Second author of Exploration of the leached Fe geochemical fractions in Tiga Warna Beach sediment, Indonesia<br>`,
            schedule: `<iframe  style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=217406522/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
            descs: `Fundamentals of Analytical Chemistry, Fundamentals of Chemistry`,
          },
        },
      },
      {
        id: 5,
        img: "./assets/img/courses/course-statistics.webp",
        subTitle: "Basic Engineering",
        rating: "8/10",
        title: `Statistics and Probability`,
        desc: `Statistics and probability course will introduce basics in statistics for engineers, statistics tests, and probability to solve common problems in engineering and daily life.`,
        tutor: {
          tutor1: {
            name: "Yevonnael",
            photo: "assets/img/trainers/tutors-18.jpg",
            rating: " 0,0 / 5,0",
            review: "0",
            about: ``,
            schedule: ` <iframe  style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=232143025/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
            descs: `Fundamentals of Physics, Numerical Computation for Engineers, Statistics & Probability`,
          },
          tutor2: {
            name: "",
            link: "",
            photo: "",
          },
          tutor3: {
            name: "",
            link: "",
            photo: "",
          },
        },
      },
      {
        id: 6,
        img: "./assets/img/courses/course-engeco.webp",
        subTitle: "Basic Engineering",
        rating: "9,6/10",
        title: `Engineering Economy`,
        desc: `The engineering economy course covers subjects including time value of money, ROR, cost analysis, project financing, and sensitivty analysis. The course also provides real-life problems including industry-related economy problems.`,
        tutor: {
          tutor1: {
            name: "Arya",
            photo: "assets/img/trainers/tutors-3.jpg",
            rating: "4,8 / 5,0",
            review: "22",
            about: `Arya graduated from Universitas Indonesia, with bachelor degree in bioprocess Engineering and master degree in chemical engineering. Currently, he is the Chief Executive Officer at TORCHE Education and tutors in engineering economy, product design, and plant design course. Arya experienced in faty acid manufacturing when he was an intern at Unilever Oleochemical Indonesia. He became research assistant at Universitas Indonesia at 2016 and lecturer assistant in numerous courses at Universitas Indonesia. `,
            schedule: `<iframe  style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=1509109124/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
            descs: `Bioprocess Engineering, Engineering Economy`,
          },
          tutor2: {
            name: "",
            link: "",
            photo: "",
          },
          tutor3: {
            name: "",
            link: "",
            photo: "",
          },
        },
      },
      {
        id: 7,
        img: "./assets/img/courses/course-achem.webp",
        subTitle: "Basic Process Engineering",
        rating: "9/10",
        title: `Fundamentals of Analytical Chemistry`,
        desc: `This course covers basics and fundamentals of analytical and instrumental chemistry, including gravimetry, titrations, electrochemical, potentiometry, specstroscopy, and chromatography.`,
        tutor: {
          tutor1: {
            name: "Hani",
            photo: "assets/img/trainers/tutors-16.jpg",
            rating: "4,8 / 5,0",
            review: "2",
            about: `D III: Polytechnic of AKA Bogor (2013-2016) IPK: 3.55 <br>S-1: Malang State University (UM) (2017-2019) IPK: 3.60<br> S-2 : Institute of Technology Bandung (ITB) (2020-2022) IPK : 3.85<br><br><b>Experience:</b><br>QA Microbiology intern at PT. Capsugel Indonesia (2015)<br>
        Tutor of National Exam (Chemistry Subject) (2017)<br>
        Fundamentals of Chemistry Laboratory Teaching Assistant at ITB (2021)<br>
        Separation method and electrochemical Laboratory Teaching Assistant at ITB (2021)<br>
        Environmental Chemistry Laboratory Assistant at UM (2018)<br>
        Publication: Second author of Exploration of the leached Fe geochemical fractions in Tiga Warna Beach sediment, Indonesia<br>`,
            schedule: `<iframe  style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=217406522/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
            descs: `Fundamentals of Analytical Chemistry, Fundamentals of Chemistry`,
          },
          tutor2: {
            name: "Arif",
            photo: "./assets/img/trainers/tutors-9.jpg",
            rating: "4,67 / 5,0",
            review: "6",
            about: `I am someone who is pursuing a doctoral study program (S3) in the field of biorefinery. I am the best graduate of UI Parallel Chemistry with a GPA of 3.42 and Master of Chemical Engineering at UI with a GPA of 3.69. Has experience teaching high school chemistry Olympiad and basic chemistry courses such as basic chemistry, organic chemistry and analytical chemistry. Has 10 Scopus indexed publications with 3 Q1 articles and 1 Q2 article. I have a Scopus H Index and a google scholar of 3 and 4 . respectively`,
            schedule: `<iframe  style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=20045515/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
            descs: `Fundamentals of Analytical Chemistry, Fundamentals of Chemistry, Organic Chemistry for Engineers`,
          },
          tutor3: {
            name: "Adam",
            photo: "assets/img/trainers/tutors-20.jpg",
            rating: " 0,0 / 5,0",
            review: "0",
            about: ``,
            schedule: `<iframe  style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=2058222731/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
            descs: `Fundamentals of Chemistry, Fundamentals of Analytical Chemistry`,
          },
        },
      },
      {
        id: 8,
        img: "./assets/img/courses/course-cellcult.webp",
        subTitle: "Basic Process Engineering",
        rating: "9,8/10",
        title: `Cell Culture for Engineers`,
        desc: `Cell culture course is a specialization course for bioprocess engineers, that covers subjects in tissue culture, animal culture, and bioprocess cell culture.`,
        tutor: {
          tutor1: {
            name: "Amalia",
            photo: "assets/img/trainers/tutors-7.jpg",
            rating: "4,74 / 5,0",
            review: "11",
            about: `Amalia has a Bachelor’s Degree in Engineering. She graduated from Bioprocess Engineering, University of Indonesia, in 2021 with a cumlaude predicate. She teaches Cell Culture and Heat Transfer in Torche since 2020. Her undergraduate thesis was about microalgae. The title of her thesis is “The Effect of Types and Concentration of Nitrogen Sources in Cultivation Media on the Content and Antioxidant Activity of Phycocyanin from Spirulina platensis Microalgae”. During her time at University, she was a lecturer assistant for Statistics and Probability. She was also a part of Ikatan Mahasiswa Teknik Kimia (IMTK) and Society for Biological Engineering (SBE). She speaks Indonesian, English, and a little bit of German. She is now about to start her early career in Boehringer Ingelheim.`,
            schedule: `<iframe  style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=258252140/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
            descs: `Cell Culture for Engineers, Heat Transfer`,
          },
          tutor2: {
            name: "",
            link: "",
            photo: "",
          },
          tutor3: {
            name: "",
            link: "",
            photo: "",
          },
        },
      },
      {
        id: 9,
        img: "./assets/img/courses/course-chetermo.webp",
        subTitle: "Basic Process Engineering",
        rating: "8,9/10",
        title: `Chemical Engineering Thermodynamics`,
        desc: `This course covers subjects in basic thermodynamics, ideal and non-ideal properties, process cycle, vapor-liquid equilibrium, and chemical equilibirium reaction.`,
        tutor: {
          tutor1: {
            name: "Shafira",
            photo: "assets/img/trainers/tutors-15.jpg",
            rating: " 4,5 / 5,0",
            review: "1",
            about: ``,
            schedule: `<iframe  style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=1190485885/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
            descs: `Chemical Engineering Thermodynamics, Mass and Energy Balances, Numerical Computation for Engineers`,
          },
          tutor2: {
            name: "Syahdan",
            photo: "assets/img/trainers/tutors-10.jpg",
            rating: "4,69 / 5,0",
            review: "14",
            about: `Syahdan has been graduated from Chemical Engineering of ITS in 2018 with 3,71 GPA and currently pursuing master degree of Chemical Engineering at ITB. In his professional career, he has experienced as Regional Logistics unit Head at PT. Propan Raya ICC - Branch Makassar for a year. During his master study, he was experienced as Assistant Lecturer of "Advanced Chemical Engineering Thermodynamics" and Lab. Assistant Coordinator of "Measurement and Analytical Method Laboratory".
        <br>Field of Research: Biorefinery, fermentation technology, and lignocellulose fractionation<br>
        <b>Scientific publication:</b> <br>Food Safety Analysis and Improvement Concept of p -Carotene Extraction from Fungal Fermented Palm Oil Empty Fruit Bunches (EFB); Extraction Method and Solvent Selection`,
            schedule: `<iframe  style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=1441497619/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
            descs: `Chemical Engineering Thermodynamics, Chemical Reaction Engineering, Fundamentals of Heat Transfer, Transport Phenomena`,
          },
          tutor3: {
            name: "Samuel",
            photo: "assets/img/trainers/tutors-6.jpg",
            rating: "4,6 / 5,0",
            review: "156",
            about: `Samuel is a process engineer and educator graduated from Universitas Indonesia (2019) and Institut Teknologi Bandung (2022) majoring in chemical engineering. As a process engineer, Samuel has handled many projects in oil and gas indsutries and petrochemical industries across Indonesia. Some of them are PT. Pertamina's (Persero) CB-III Pipeline project, BBWM Refrigeration FEED, PT Bukit Asam TBBC at South Sumatera,
        PT Petromine's Biodiesel storage, PT. Medco Energy's Water-Oil separator improvement, etc.<br><br> As an educator, Samuel teaches more than 200 students in chemical engineering and become lecturer assistant since he was studying at Universitas Indonesia. He teaches
        numerous subjects in chemical engineering and specialized in Computer-Aided Chemical Engineering. Samuel skilled in most process engineering softwares, such as Unisim Design, Aspen HYSYS, Aspen Plus, COMSOL Multiphysics, ANSYS, and Schlumberger PIPESIM and Symmetry.`,
            schedule: `<iframe  style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=341757435/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
            descs: `Chemical Engineering Mathematics, Chemical Engineering Thermodynamics, Process Equipment Design`,
          },
        },
      },
      {
        id: 10,
        img: "./assets/img/courses/course-chereaction.webp",
        subTitle: "Basic Process Engineering",
        rating: "9,2/10",
        title: `Chemical Reaction Engineering`,
        desc: `This course covers chemical reaction kinetics and mechanism, diffusion, multiple reactions, reactors and sizing, steady-state and unsteady-state operations, and non-isothermal reactors`,
        tutor: {
          tutor1: {
            name: "Nadia",
            photo: "assets/img/trainers/tutors-13.jpg",
            rating: "4,8 / 5,0",
            review: "4",
            about: `<b>GPA</b><br>- Bachelor : 3.83<br> - Master : 3.73<br><br>
        <b>Experience</b><br>
        - Assistant of Organic Chemistry Laboratory<br>
        - Assistant of Analytical Chemistry Laboratory<br>
        - Lecturer of P3TIK - FT UNTIRTA<br><br>
    
        <b>Achievement</b><br>
        - Silver award at 38th Taiwan Catalyst and Reaction Engineering Symposium<br>
        - Best Presentation at 11th ICAST (International Student Conference on Advance Science and Technology), Japan<br>
        - Delegation of Japan-Asia Youth Exchange Scholarship Program at Kumamoto University, Japan<br><br>
    
        <b>Publication</b><br>
        - Computational Liquid Dynamic Simulation Mixing Time from Side Inlet Mixer Tank`,
            schedule: `<iframe  style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=1281159756/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
            descs: `Chemical Reaction Engineering, Mass and Energy Balances`,
          },
          tutor2: {
            name: "Syahdan",
            photo: "assets/img/trainers/tutors-10.jpg",
            rating: "4,69 / 5,0",
            review: "14",
            about: `Syahdan has been graduated from Chemical Engineering of ITS in 2018 with 3,71 GPA and currently pursuing master degree of Chemical Engineering at ITB. In his professional career, he has experienced as Regional Logistics unit Head at PT. Propan Raya ICC - Branch Makassar for a year. During his master study, he was experienced as Assistant Lecturer of "Advanced Chemical Engineering Thermodynamics" and Lab. Assistant Coordinator of "Measurement and Analytical Method Laboratory".
        <br>Field of Research: Biorefinery, fermentation technology, and lignocellulose fractionation<br>
        <b>Scientific publication:</b> <br>Food Safety Analysis and Improvement Concept of p -Carotene Extraction from Fungal Fermented Palm Oil Empty Fruit Bunches (EFB); Extraction Method and Solvent Selection`,
            schedule: `<iframe  style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=1441497619/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
            descs: `Chemical Engineering Thermodynamics, Chemical Reaction Engineering, Fundamentals of Heat Transfer, Transport Phenomena`,
          },
          tutor3: {
            name: "Leon",
            photo: "assets/img/trainers/tutors-2.jpg",
            about: `Leon currently pursuing Master of Science in Chemical Engineering at National Taiwan University of Science and Technology, Taipei. At TORCHE Education, he is a co-founder and tutor in chemical reaction engineering course. Leon graduated from Unviersitas Indonesia, and he was a lecturer assistant in numerous subjects, including product design and plant design course.`,
            review: "97",
            rating: "4,79 / 5,0",
            schedule: `<iframe style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=903016931/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
            descs: `Chemical Reaction Engineering`,
          },
        },
      },
      {
        id: 11,
        img: "assets/img/courses/course-fluidmech.webp",
        subTitle: "Basic Process Engineering",
        rating: "9,6/10",
        title: `Fluid & Particles Mechanics`,
        desc: `Subjects covered in this course are properties of fluid, compressible and incompressible fluid, flow equipments (pumps, blowers, compressors), boundary layer, fluidized and fixed bed, and motion of particle.`,
        tutor: {
          tutor1: {
            name: "Felix",
            photo: "assets/img/trainers/tutors-1.jpg",
            about: `Felix is currently Head of Section - Logistic Solution at Wings Group Indonesia (PT. Sayap Mas Utama). He is graduated from Universitas Indonesia with 3,91 GPA. While he was a student at Universitas
        Indonesia, he became lecturer assistant in transport phenomena and plant design course. At TORCHE Education, he tutors some subjects including transport phenomena, fluid mechanics, product design, and plant design.`,
            review: "277",
            rating: "4,9 / 5,0",
            schedule: `<iframe style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=134206045/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
            descs: `Process Plant Design, Product Design and Development, Transport Phenomena, Fluid and Particle Mechanics`,
          },
          tutor2: {
            name: "Syailendra",
            photo: "./assets/img/trainers/tutors-5.jpg",
            rating: "4,62 / 5,0",
            descs: `Chemical Engineering Mathematics, Fundamentals of Calculus, Fluid Particle Mechanics, Numerical Computation for Engineers`,
            review: "44",
            about: `Syailendra currently pursuing master degree in chemical engineering at Institut Teknologi Bandung. He obtained his bachelor degree in chemical engineering from Universitas Indonesia and become research assistant there. Previously, he became lecturer assistant in some chemical engineering subjects at Universitas Indonesia, namely numerical computation, chemical engineering modelling, bioreactor engineering, and bioprocess equipment design course.`,
            schedule: `<iframe  style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=853803407/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
          },
          tutor3: {
            name: "",
            link: "",
            photo: "",
          },
        },
      },
      {
        id: 12,
        img: "assets/img/courses/course-heattrans.webp",
        subTitle: "Basic Process Engineering",
        rating: "8,7/10",
        title: `Fundamentals of Heat Transfer`,
        desc: `This course provides basic heat transfer principles: conduction, convection, and radiation, with some application in process engineering, including heat exchanger.`,
        tutor: {
          tutor1: {
            name: "Amalia",
            photo: "assets/img/trainers/tutors-7.jpg",
            rating: "4,74 / 5,0",
            review: "11",
            about: `Amalia has a Bachelor’s Degree in Engineering. She graduated from Bioprocess Engineering, University of Indonesia, in 2021 with a cumlaude predicate. She teaches Cell Culture and Heat Transfer in Torche since 2020. Her undergraduate thesis was about microalgae. The title of her thesis is “The Effect of Types and Concentration of Nitrogen Sources in Cultivation Media on the Content and Antioxidant Activity of Phycocyanin from Spirulina platensis Microalgae”. During her time at University, she was a lecturer assistant for Statistics and Probability. She was also a part of Ikatan Mahasiswa Teknik Kimia (IMTK) and Society for Biological Engineering (SBE). She speaks Indonesian, English, and a little bit of German. She is now about to start her early career in Boehringer Ingelheim.`,
            schedule: `<iframe  style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=258252140/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
            descs: `Cell Culture for Engineers, Heat Transfer`,
          },
          tutor2: {
            name: "Syahdan",
            photo: "assets/img/trainers/tutors-10.jpg",
            rating: "4,69 / 5,0",
            review: "14",
            about: `Syahdan has been graduated from Chemical Engineering of ITS in 2018 with 3,71 GPA and currently pursuing master degree of Chemical Engineering at ITB. In his professional career, he has experienced as Regional Logistics unit Head at PT. Propan Raya ICC - Branch Makassar for a year. During his master study, he was experienced as Assistant Lecturer of "Advanced Chemical Engineering Thermodynamics" and Lab. Assistant Coordinator of "Measurement and Analytical Method Laboratory".
        <br>Field of Research: Biorefinery, fermentation technology, and lignocellulose fractionation<br>
        <b>Scientific publication:</b> <br>Food Safety Analysis and Improvement Concept of p -Carotene Extraction from Fungal Fermented Palm Oil Empty Fruit Bunches (EFB); Extraction Method and Solvent Selection`,
            schedule: `<iframe  style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=1441497619/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
            descs: `Chemical Engineering Thermodynamics, Chemical Reaction Engineering, Fundamentals of Heat Transfer, Transport Phenomena`,
          },
          tutor3: {
            name: "",
            link: "",
            photo: "",
          },
        },
      },
      {
        id: 13,
        img: "assets/img/courses/course-massenergy.webp",
        subTitle: "Basic Process Engineering",
        rating: "9,4/10",
        title: `Mass and Energy Balances`,
        desc: `This basic course for process engineers discuss mass balance, energy balance, reactions, separations, and processes that commonly faced by process engineers.`,
        tutor: {
          tutor1: {
            name: "Sharen",
            photo: "assets/img/trainers/tutors-8.jpg",
            rating: "4,7 / 5,0",
            review: "8",
            about: `Sharen graduated from Universitas Indonesia with bachelor degree in chemical engineering. She teaches Mass & Energy Balances and Engineering Drawing. Her undegraduate thesis was about photocatalysis focusing on antibactetial and self-cleaning coating. During her university years,
        She was an assistant lecturer for Thermal & Mechanics Physics and Mass & Energy Balances and a laboratory assistant for Basics & Organics Chemistry. `,
            schedule: `<iframe  style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=1235378485/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
            descs: `Mass and Energy Balance, Process Engineering Drawing`,
          },
          tutor2: {
            name: "Nadia",
            photo: "assets/img/trainers/tutors-13.jpg",
            rating: "4,8 / 5,0",
            review: "4",
            about: `<b>GPA</b><br>- Bachelor : 3.83<br> - Master : 3.73<br><br>
        <b>Experience</b><br>
        - Assistant of Organic Chemistry Laboratory<br>
        - Assistant of Analytical Chemistry Laboratory<br>
        - Lecturer of P3TIK - FT UNTIRTA<br><br>
    
        <b>Achievement</b><br>
        - Silver award at 38th Taiwan Catalyst and Reaction Engineering Symposium<br>
        - Best Presentation at 11th ICAST (International Student Conference on Advance Science and Technology), Japan<br>
        - Delegation of Japan-Asia Youth Exchange Scholarship Program at Kumamoto University, Japan<br><br>
    
        <b>Publication</b><br>
        - Computational Liquid Dynamic Simulation Mixing Time from Side Inlet Mixer Tank`,
            schedule: `<iframe  style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=1281159756/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
            descs: `Chemical Reaction Engineering, Mass and Energy Balances`,
          },
          tutor3: {
            name: "Shafira",
            photo: "assets/img/trainers/tutors-15.jpg",
            rating: " 4,5 / 5,0",
            review: "1",
            about: ``,
            schedule: `<iframe  style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=1190485885/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
            descs: `Chemical Engineering Thermodynamics, Mass and Energy Balances, Numerical Computation for Engineers`,
          },
        },
      },
      {
        id: 14,
        img: "assets/img/courses/course-masstrans.webp",
        subTitle: "Basic Process Engineering",
        rating: "8,4/10",
        title: `Fundamentals of Mass Transfer`,
        desc: `Mass transfer course discuss topics in diffusion, multicomponent distillation, absorption and stripping, extraction, drying, adsorption, and membrane separations.`,
        tutor: {
          tutor1: {
            name: "Hendri",
            photo: "assets/img/trainers/tutors-19.jpg",
            rating: " 0,0 / 5,0",
            review: "0",
            about: `Hendri is a chemical engineering graduate. He completed his bachelor's degree at the National Institute of Technology Malang with fully funded scholarships. He was experienced in laboratory practice, production processes in agribusiness companies, and research in waste technologies. He graduated with honors and became the best graduate in 2021.
        He completed his bachelor's degree by making his final project Acetic Anhydride with Ketene Process and Research in Microbiology using Local Microorganisms as a Bio-activator. He has also published an AlP journal in Applied Science focused on renewable energy and equipment efficiency. `,
            schedule: `<iframe  style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=563776228/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
            descs: `Fundamentals of Mass Transfer`,
          },
          tutor2: {
            name: "Sendy",
            photo: "assets/img/trainers/tutors-4.jpg",
            rating: "4,66 / 5,0",
            review: "203",
            about: `Sendy is a tutor and co-founder at TORCHE Education. He is a PDCA Officer at PT Sayap Mas Utama (Wings Group), managing supply chain in one of the biggest Fast Moving Consumer Goods company in Indonesia. Previously, he is an engineer at ExxonMobil, handling process control in oil and gas indsutry. He teaches process control and mass transfer subjects at TORCHE Education. `,
            schedule: `<iframe  style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=129721676/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
            descs: `Fundamentals of Mass Transfer, Process Control and Dynamics`,
          },
          tutor3: {
            name: "",
            link: "",
            photo: "",
          },
        },
      },
      {
        id: 15,
        img: "assets/img/courses/course-numcom.webp",
        subTitle: "Basic Process Engineering",
        rating: "8,7/10",
        title: `Numerical Computation for Engineers`,
        desc: `This course provides various topics in numerical computations and methods, including linear-nonlinear equations, numerical integration-differentiation, and ordinary-partial differential equations.`,
        tutor: {
          tutor1: {
            name: "Shafira",
            photo: "assets/img/trainers/tutors-15.jpg",
            rating: " 4,5 / 5,0",
            review: "1",
            about: ``,
            schedule: `<iframe  style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=1190485885/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
            descs: `Chemical Engineering Thermodynamics, Mass and Energy Balances, Numerical Computation for Engineers`,
          },
          tutor2: {
            name: "Yevonnael",
            photo: "assets/img/trainers/tutors-18.jpg",
            rating: " 0,0 / 5,0",
            review: "0",
            about: ``,
            schedule: ` <iframe  style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=232143025/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
            descs: `Fundamentals of Physics, Numerical Computation for Engineers, Statistics & Probability`,
          },
          tutor3: {
            name: "",
            link: "",
            photo: "",
          },
        },
      },
      {
        id: 16,
        img: "assets/img/courses/course-transportphen.webp",
        subTitle: "Basic Process Engineering",
        rating: "9,3/10",
        title: `Transport Phenomena`,
        desc: `Transport phenomena course explains macro and micro balances phenomena that occurs in common until specific process engineering problems. The analysis is based on shell balances in a system.`,
        tutor: {
          tutor1: {
            name: "Syahdan",
            photo: "assets/img/trainers/tutors-10.jpg",
            rating: "4,69 / 5,0",
            review: "14",
            about: `Syahdan has been graduated from Chemical Engineering of ITS in 2018 with 3,71 GPA and currently pursuing master degree of Chemical Engineering at ITB. In his professional career, he has experienced as Regional Logistics unit Head at PT. Propan Raya ICC - Branch Makassar for a year. During his master study, he was experienced as Assistant Lecturer of "Advanced Chemical Engineering Thermodynamics" and Lab. Assistant Coordinator of "Measurement and Analytical Method Laboratory".
        <br>Field of Research: Biorefinery, fermentation technology, and lignocellulose fractionation<br>
        <b>Scientific publication:</b> <br>Food Safety Analysis and Improvement Concept of p -Carotene Extraction from Fungal Fermented Palm Oil Empty Fruit Bunches (EFB); Extraction Method and Solvent Selection`,
            schedule: `<iframe  style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=1441497619/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
            descs: `Chemical Engineering Thermodynamics, Chemical Reaction Engineering, Fundamentals of Heat Transfer, Transport Phenomena`,
          },
          tutor2: {
            name: "Felix",
            photo: "assets/img/trainers/tutors-1.jpg",
            about: `Felix is currently Head of Section - Logistic Solution at Wings Group Indonesia (PT. Sayap Mas Utama). He is graduated from Universitas Indonesia with 3,91 GPA. While he was a student at Universitas
        Indonesia, he became lecturer assistant in transport phenomena and plant design course. At TORCHE Education, he tutors some subjects including transport phenomena, fluid mechanics, product design, and plant design.`,
            review: "277",
            rating: "4,9 / 5,0",
            schedule: `<iframe style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=134206045/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
            descs: `Process Plant Design, Product Design and Development, Transport Phenomena, Fluid and Particle Mechanics`,
          },
          tutor3: {
            name: "",
            link: "",
            photo: "",
          },
        },
      },
      {
        id: 17,
        img: "assets/img/courses/course-cheq.webp",
        subTitle: "Advanced Process Engineering",
        rating: "8,8/10",
        title: `Process Equipment Design`,
        desc: `This course provides explanation in heuristics when conducting design in process equipment, from pipe, flow equipments, separation equipments, heat exchangers, etc.`,
        tutor: {
          tutor1: {
            name: "Riswanda",
            photo: "assets/img/trainers/tutors-14.jpg",
            rating: "4,7 / 5,0",
            review: "3",
            about: `Petrochemical Process Engineer who graduated from Institute Technology of Sepuluh Nopember Surabaya with GPA 3.90 and appreciated as best ITS GPA 2018, has experience as Chemical Engineer tutor since in campus and belong to increase PP Plant capacity project from 480 to 590 KTA`,
            schedule: `<iframe  style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=184355625/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
            descs: `Chemical Process Simulation, Process Equipment Design`,
          },
          tutor2: {
            name: "Samuel",
            photo: "assets/img/trainers/tutors-6.jpg",
            rating: "4,6 / 5,0",
            review: "156",
            about: `Samuel is a process engineer and educator graduated from Universitas Indonesia (2019) and Institut Teknologi Bandung (2022) majoring in chemical engineering. As a process engineer, Samuel has handled many projects in oil and gas indsutries and petrochemical industries across Indonesia. Some of them are PT. Pertamina's (Persero) CB-III Pipeline project, BBWM Refrigeration FEED, PT Bukit Asam TBBC at South Sumatera,
        PT Petromine's Biodiesel storage, PT. Medco Energy's Water-Oil separator improvement, etc.<br><br> As an educator, Samuel teaches more than 200 students in chemical engineering and become lecturer assistant since he was studying at Universitas Indonesia. He teaches
        numerous subjects in chemical engineering and specialized in Computer-Aided Chemical Engineering. Samuel skilled in most process engineering softwares, such as Unisim Design, Aspen HYSYS, Aspen Plus, COMSOL Multiphysics, ANSYS, and Schlumberger PIPESIM and Symmetry.`,
            schedule: `<iframe  style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=341757435/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
            descs: `Chemical Engineering Mathematics, Chemical Engineering Thermodynamics, Process Equipment Design`,
          },
          tutor3: {
            name: "",
            link: "",
            photo: "",
          },
        },
      },
      {
        id: 18,
        img: "assets/img/courses/course-plantdesign.webp",
        subTitle: "Advanced Process Engineering",
        rating: "9,2/10",
        title: `Process Plant Design`,
        desc: `As a capstone process engineering course, plant design includes topics in process synthesis, equipment design, heat exchanger network, process safety, and economical analysis of the plant.`,
        tutor: {
          tutor1: {
            name: "Ridzki",
            photo: "assets/img/trainers/tutors-12.jpg",
            rating: "0,0 / 5,0",
            review: "0",
            about: `Process engineer from on of the petrochemical plant in Indonesia. Several times as guest lecturer at STEM Akamigas Cepu.`,
            schedule: `<iframe  style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=336568314/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
            descs: `Chemical Process Simulation, Process Plant Design`,
          },
          tutor2: {
            name: "Felix",
            photo: "assets/img/trainers/tutors-1.jpg",
            about: `Felix is currently Head of Section - Logistic Solution at Wings Group Indonesia (PT. Sayap Mas Utama). He is graduated from Universitas Indonesia with 3,91 GPA. While he was a student at Universitas
        Indonesia, he became lecturer assistant in transport phenomena and plant design course. At TORCHE Education, he tutors some subjects including transport phenomena, fluid mechanics, product design, and plant design.`,
            review: "277",
            rating: "4,9 / 5,0",
            schedule: `<iframe style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=134206045/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
            descs: `Process Plant Design, Product Design and Development, Transport Phenomena, Fluid and Particle Mechanics`,
          },
          tutor3: {
            name: "",
            link: "",
            photo: "",
          },
        },
      },
      {
        id: 19,
        img: "assets/img/courses/course-product.webp",
        subTitle: "Advanced Process Engineering",
        rating: " 8,9/10",
        title: `Product Design and Development`,
        desc: `This capstone course provides topics in chemical and biological product design, and discuss topics including product manufacture, supply chain, and economic analysis.`,
        tutor: {
          tutor1: {
            name: "Arya",
            photo: "assets/img/trainers/tutors-3.jpg",
            rating: "4,8 / 5,0",
            review: "22",
            about: `Arya graduated from Universitas Indonesia, with bachelor degree in bioprocess Engineering and master degree in chemical engineering. Currently, he is the Chief Executive Officer at TORCHE Education and tutors in engineering economy, product design, and plant design course. Arya experienced in faty acid manufacturing when he was an intern at Unilever Oleochemical Indonesia. He became research assistant at Universitas Indonesia at 2016 and lecturer assistant in numerous courses at Universitas Indonesia. `,
            schedule: `<iframe  style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=1509109124/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
            descs: `Bioprocess Engineering, Engineering Economy`,
          },
          tutor2: {
            name: "Felix",
            photo: "assets/img/trainers/tutors-1.jpg",
            about: `Felix is currently Head of Section - Logistic Solution at Wings Group Indonesia (PT. Sayap Mas Utama). He is graduated from Universitas Indonesia with 3,91 GPA. While he was a student at Universitas
        Indonesia, he became lecturer assistant in transport phenomena and plant design course. At TORCHE Education, he tutors some subjects including transport phenomena, fluid mechanics, product design, and plant design.`,
            review: "277",
            rating: "4,9 / 5,0",
            schedule: `<iframe style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=134206045/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
            descs: `Process Plant Design, Product Design and Development, Transport Phenomena, Fluid and Particle Mechanics`,
          },
          tutor3: {
            name: "",
            link: "",
            photo: "",
          },
        },
      },
      {
        id: 20,
        img: "assets/img/courses/course-bioreactor.webp",
        subTitle: "Advanced Process Engineering",
        rating: "  9/10",
        title: `Bioreactor Engineering`,
        desc: `Specialized course in bioprocess engineering that focuses on designing and engineering of bioreactors, with consideration in bacterial behaviours and kinetics.`,
        tutor: {
          tutor1: {
            name: "Syailendra",
            photo: "assets/img/trainers/tutors-5.jpg",
            rating: "4,62 / 5,0",
            review: "44",
            about: `Syailendra currently pursuing master degree in chemical engineering at Institut Teknologi Bandung. He obtained his bachelor degree in chemical engineering from Universitas Indonesia and become research assistant there. Previously, he became lecturer assistant in some chemical engineering subjects at Universitas Indonesia, namely numerical computation, chemical engineering modelling, bioreactor engineering, and bioprocess equipment design course.`,
            schedule: `<iframe  style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=853803407/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
            descs: `Chemical Engineering Mathematics, Fundamentals of Calculus, Fluid Particle Mechanics, Numerical Computation for Engineers`,
          },
          tutor2: {
            name: "",
            link: "",
            photo: "",
          },
          tutor3: {
            name: "",
            link: "",
            photo: "",
          },
        },
      },
      {
        id: 21,
        img: "assets/img/courses/course-cps.webp",
        subTitle: "Advanced Process Engineering",
        rating: " 9,6/10",
        title: `Chemical Process Simulation`,
        desc: `Process simulation course provides hands-on experience in multiple process engineering software, like Aspen HYSYS, Aspen Plus, SuperPro, COMSOL Multiphysics, ANSYS Fluent, etc.`,
        tutor: {
          tutor1: {
            name: "Ridzki",
            photo: "assets/img/trainers/tutors-12.jpg",
            rating: "0,0 / 5,0",
            review: "0",
            about: `Process engineer from on of the petrochemical plant in Indonesia. Several times as guest lecturer at STEM Akamigas Cepu.`,
            schedule: `<iframe  style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=336568314/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
            descs: `Chemical Process Simulation, Process Plant Design`,
          },
          tutor2: {
            name: "Riswanda",
            photo: "assets/img/trainers/tutors-14.jpg",
            rating: "4,7 / 5,0",
            review: "3",
            about: `Petrochemical Process Engineer who graduated from Institute Technology of Sepuluh Nopember Surabaya with GPA 3.90 and appreciated as best ITS GPA 2018, has experience as Chemical Engineer tutor since in campus and belong to increase PP Plant capacity project from 480 to 590 KTA`,
            schedule: `<iframe  style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=184355625/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
            descs: `Chemical Process Simulation, Process Equipment Design`,
          },
          tutor3: {
            name: "",
            link: "",
            photo: "",
          },
        },
      },
      {
        id: 22,
        img: "assets/img/courses/course-chemath.webp",
        subTitle: "Advanced Process Engineering",
        rating: " 8,4/10",
        title: `Chemical Engineering Mathematics`,
        desc: `This course provides topics in chemical engineering mathematics and analysis, that uses methods like ordinary differential equations, series solutions, and partial differential equations.`,
        tutor: {
          tutor1: {
            name: "Samuel",
            photo: "assets/img/trainers/tutors-6.jpg",
            rating: "4,6 / 5,0",
            review: "156",
            about: `Samuel is a process engineer and educator graduated from Universitas Indonesia (2019) and Institut Teknologi Bandung (2022) majoring in chemical engineering. As a process engineer, Samuel has handled many projects in oil and gas indsutries and petrochemical industries across Indonesia. Some of them are PT. Pertamina's (Persero) CB-III Pipeline project, BBWM Refrigeration FEED, PT Bukit Asam TBBC at South Sumatera,
        PT Petromine's Biodiesel storage, PT. Medco Energy's Water-Oil separator improvement, etc.<br><br> As an educator, Samuel teaches more than 200 students in chemical engineering and become lecturer assistant since he was studying at Universitas Indonesia. He teaches
        numerous subjects in chemical engineering and specialized in Computer-Aided Chemical Engineering. Samuel skilled in most process engineering softwares, such as Unisim Design, Aspen HYSYS, Aspen Plus, COMSOL Multiphysics, ANSYS, and Schlumberger PIPESIM and Symmetry.`,
            schedule: `<iframe  style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=341757435/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
            descs: `Chemical Engineering Mathematics, Chemical Engineering Thermodynamics, Process Equipment Design`,
          },
          tutor2: {
            name: "Syailendra",
            photo: "assets/img/trainers/tutors-5.jpg",
            rating: "4,62 / 5,0",
            review: "44",
            about: `Syailendra currently pursuing master degree in chemical engineering at Institut Teknologi Bandung. He obtained his bachelor degree in chemical engineering from Universitas Indonesia and become research assistant there. Previously, he became lecturer assistant in some chemical engineering subjects at Universitas Indonesia, namely numerical computation, chemical engineering modelling, bioreactor engineering, and bioprocess equipment design course.`,
            schedule: `<iframe  style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=853803407/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
            descs: `Chemical Engineering Mathematics, Fundamentals of Calculus, Fluid Particle Mechanics, Numerical Computation for Engineers`,
          },
          tutor3: {
            name: "",
            link: "",
            photo: "",
          },
        },
      },
      {
        id: 23,
        img: "assets/img/courses/course-processcontrol.webp",
        subTitle: "Advanced Process Engineering",
        rating: "9,1/10",
        title: `Process Control and Dynamics`,
        desc: `This capstone course provides explanation in process controls fundamentals and methods, including PID algorithm, instrumentation, stability analysis, and dynamics behaviour.`,
        tutor: {
          tutor1: {
            name: "Sendy",
            photo: "assets/img/trainers/tutors-4.jpg",
            rating: "4,66 / 5,0",
            review: "203",
            about: `Sendy is a tutor and co-founder at TORCHE Education. He is a PDCA Officer at PT Sayap Mas Utama (Wings Group), managing supply chain in one of the biggest Fast Moving Consumer Goods company in Indonesia. Previously, he is an engineer at ExxonMobil, handling process control in oil and gas indsutry. He teaches process control and mass transfer subjects at TORCHE Education. `,
            schedule: `<iframe  style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=129721676/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
            descs: `Fundamentals of Mass Transfer, Process Control and Dynamics`,
          },
          tutor2: {
            name: "",
            link: "",
            photo: "",
          },
          tutor3: {
            name: "",
            link: "",
            photo: "",
          },
        },
      },
      {
        id: 24,
        img: "assets/img/courses/course-organicchem.webp",
        subTitle: "Basic Engineering",
        rating: " 8,9/10",
        title: `Organic Chemistry for Engineers`,
        desc: `This course introduces organic chemistry fundamentals and applications for process engineers. The topics includes isomers, stereochemistry, hydrocarbons, etc.`,
        tutor: {
          tutor1: {
            name: "Yulia",
            photo: "assets/img/trainers/tutors-17.jpg",
            rating: " 0,0 / 5,0",
            review: "0",
            about: `Lulusan Kimia ITB tahun 2018 dan Pengajaran Kimia ITB 2022.<br>
        Menjadi asisten praktikum laboratorium kimia dasar ITB (2016-2017)<br> Menjadi asisten praktikum laboratorium kimia organik (ITB) (2018)<br>
        Menjadi pimpinan praktikum laboratorium kimia dasar ITB (2020-2021)<br>
        Guru kimia di SMA Boarding School Motivator Qur'an Ekselensia Indonesia (2021-Now)<br>
        Magang di laboratorium forensik Mabes Polri (2017)<br>`,
            schedule: `<iframe  style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=1395972756/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
            descs: `Organic Chemistry for Engineers`,
          },
          tutor2: {
            name: "Arif",
            photo: "assets/img/trainers/tutors-9.jpg",
            rating: "4,67 / 5,0",
            review: "6",
            about: `I am someone who is pursuing a doctoral study program (S3) in the field of biorefinery. I am the best graduate of UI Parallel Chemistry with a GPA of 3.42 and Master of Chemical Engineering at UI with a GPA of 3.69. Has experience teaching high school chemistry Olympiad and basic chemistry courses such as basic chemistry, organic chemistry and analytical chemistry. Has 10 Scopus indexed publications with 3 Q1 articles and 1 Q2 article. I have a Scopus H Index and a google scholar of 3 and 4 . respectively`,
            schedule: `<iframe  style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=20045515/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
            descs: `Fundamentals of Analytical Chemistry, Fundamentals of Chemistry, Organic Chemistry for Engineers`,
          },
          tutor3: {
            name: "",
            link: "",
            photo: "",
          },
        },
      },
      {
        id: 25,
        img: "assets/img/courses/course-drawing.webp",
        subTitle: "Basic Process Engineering",
        rating: " 9/10",
        title: `Process Engineering Drawing`,
        desc: `Process flow diagrams and Piping and Instrument Diagram is very fundamentals for process engineers and other engineers. This course will introduce PFD and P&ID using softwares like AutoCad and MS Visio.`,
        tutor: {
          tutor1: {
            name: "Sharen",
            photo: "assets/img/trainers/tutors-8.jpg",
            rating: "4,7 / 5,0",
            review: "8",
            about: `Sharen graduated from Universitas Indonesia with bachelor degree in chemical engineering. She teaches Mass & Energy Balances and Engineering Drawing. Her undegraduate thesis was about photocatalysis focusing on antibactetial and self-cleaning coating. During her university years,
        She was an assistant lecturer for Thermal & Mechanics Physics and Mass & Energy Balances and a laboratory assistant for Basics & Organics Chemistry. `,
            schedule: `<iframe  style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=1235378485/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
            descs: `Mass and Energy Balance, Process Engineering Drawing`,
          },
          tutor2: {
            name: "",
            link: "",
            photo: "",
          },
          tutor3: {
            name: "",
            link: "",
            photo: "",
          },
        },
      },
      {
        id: 26,
        img: "assets/img/courses/course-wasteutility.webp",
        subTitle: "Advanced Process Engineering",
        rating: "8,5/10",
        title: `Plant Waste and Utility System`,
        desc: `Utilites and waste are the most common processes in process industries. This course introduces utilities and wastes that most commonly met in process industries.`,
        tutor: {
          tutor1: {
            name: "Felix",
            photo: "assets/img/trainers/tutors-1.jpg",
            about: `Felix is currently Head of Section - Logistic Solution at Wings Group Indonesia (PT. Sayap Mas Utama). He is graduated from Universitas Indonesia with 3,91 GPA. While he was a student at Universitas
        Indonesia, he became lecturer assistant in transport phenomena and plant design course. At TORCHE Education, he tutors some subjects including transport phenomena, fluid mechanics, product design, and plant design.`,
            review: "277",
            rating: "4,9 / 5,0",
            schedule: `<iframe style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=134206045/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
            descs: `Process Plant Design, Product Design and Development, Transport Phenomena, Fluid and Particle Mechanics`,
          },
          tutor2: {
            name: "",
            link: "",
            photo: "",
          },
          tutor3: {
            name: "",
            link: "",
            photo: "",
          },
        },
      },
    ];

    var Course$1 = course;

    /* src\pages\DetailCourseTutor1.svelte generated by Svelte v3.48.0 */
    const file$j = "src\\pages\\DetailCourseTutor1.svelte";

    function create_fragment$m(ctx) {
    	let main;
    	let section0;
    	let div1;
    	let div0;
    	let h2;
    	let t1;
    	let ol;
    	let li0;
    	let a0;
    	let t3;
    	let li1;
    	let a1;
    	let t5;
    	let li2;
    	let t6_value = /*course*/ ctx[0].tutor.tutor1.name + "";
    	let t6;
    	let t7;
    	let div2;
    	let span0;
    	let i0;
    	let arrowleft;
    	let t8;
    	let t9;
    	let section1;
    	let div13;
    	let div8;
    	let div7;
    	let div3;
    	let img;
    	let img_src_value;
    	let t10;
    	let div6;
    	let h1;
    	let t11_value = /*course*/ ctx[0].tutor.tutor1.name + "";
    	let t11;
    	let t12;
    	let p0;
    	let t13_value = /*course*/ ctx[0].tutor.tutor1.descs + "";
    	let t13;
    	let t14;
    	let div5;
    	let div4;
    	let span1;
    	let i1;
    	let starfill;
    	let t15_value = /*course*/ ctx[0].tutor.tutor1.rating + "";
    	let t15;
    	let t16;
    	let p1;
    	let t17;
    	let t18_value = /*course*/ ctx[0].tutor.tutor1.review + "";
    	let t18;
    	let t19;
    	let t20;
    	let div10;
    	let div9;
    	let h40;
    	let t22;
    	let p2;
    	let raw0_value = /*course*/ ctx[0].tutor.tutor1.about + "";
    	let t23;
    	let div12;
    	let div11;
    	let h41;
    	let t25;
    	let html_tag;
    	let raw1_value = /*course*/ ctx[0].tutor.tutor1.schedule + "";
    	let current;
    	let mounted;
    	let dispose;
    	arrowleft = new ArrowLeft$1({ $$inline: true });
    	starfill = new StarFill$1({ $$inline: true });

    	const block = {
    		c: function create() {
    			main = element("main");
    			section0 = element("section");
    			div1 = element("div");
    			div0 = element("div");
    			h2 = element("h2");
    			h2.textContent = "Tutors";
    			t1 = space();
    			ol = element("ol");
    			li0 = element("li");
    			a0 = element("a");
    			a0.textContent = "Courses";
    			t3 = space();
    			li1 = element("li");
    			a1 = element("a");
    			a1.textContent = "Tutors";
    			t5 = space();
    			li2 = element("li");
    			t6 = text$1(t6_value);
    			t7 = space();
    			div2 = element("div");
    			span0 = element("span");
    			i0 = element("i");
    			create_component(arrowleft.$$.fragment);
    			t8 = text$1("Back");
    			t9 = space();
    			section1 = element("section");
    			div13 = element("div");
    			div8 = element("div");
    			div7 = element("div");
    			div3 = element("div");
    			img = element("img");
    			t10 = space();
    			div6 = element("div");
    			h1 = element("h1");
    			t11 = text$1(t11_value);
    			t12 = space();
    			p0 = element("p");
    			t13 = text$1(t13_value);
    			t14 = space();
    			div5 = element("div");
    			div4 = element("div");
    			span1 = element("span");
    			i1 = element("i");
    			create_component(starfill.$$.fragment);
    			t15 = text$1(t15_value);
    			t16 = space();
    			p1 = element("p");
    			t17 = text$1("(");
    			t18 = text$1(t18_value);
    			t19 = text$1("  reviews )");
    			t20 = space();
    			div10 = element("div");
    			div9 = element("div");
    			h40 = element("h4");
    			h40.textContent = "About The Tutor";
    			t22 = space();
    			p2 = element("p");
    			t23 = space();
    			div12 = element("div");
    			div11 = element("div");
    			h41 = element("h4");
    			h41.textContent = "Tutor Schedule";
    			t25 = space();
    			html_tag = new HtmlTag(false);
    			add_location(h2, file$j, 22, 12, 582);
    			attr_dev(a0, "href", "/#");
    			add_location(a0, file$j, 24, 18, 635);
    			add_location(li0, file$j, 24, 14, 631);
    			attr_dev(a1, "href", "/#/ourtutors");
    			add_location(a1, file$j, 25, 18, 684);
    			add_location(li1, file$j, 25, 14, 680);
    			add_location(li2, file$j, 26, 14, 738);
    			add_location(ol, file$j, 23, 12, 611);
    			attr_dev(div0, "class", "d-flex justify-content-between align-items-center");
    			add_location(div0, file$j, 21, 10, 505);
    			attr_dev(div1, "class", "container");
    			add_location(div1, file$j, 20, 8, 470);
    			attr_dev(section0, "class", "breadcrumbs");
    			add_location(section0, file$j, 19, 6, 431);
    			attr_dev(i0, "class", "bi bi-arrow-left me-2 fs-4");
    			add_location(i0, file$j, 34, 57, 1006);
    			attr_dev(span0, "class", "fs-5 text-dark backs svelte-1qw1zq1");
    			add_location(span0, file$j, 34, 6, 955);
    			attr_dev(div2, "class", "container mt-3");
    			add_location(div2, file$j, 33, 3, 919);
    			if (!src_url_equal(img.src, img_src_value = /*course*/ ctx[0].tutor.tutor1.photo)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "img-team");
    			attr_dev(img, "class", "img-fluid rounded-circle mb-3");
    			set_style(img, "width", "14.5rem");
    			add_location(img, file$j, 42, 28, 1373);
    			attr_dev(div3, "class", "col-lg-3 offset-lg-1 text-center");
    			add_location(div3, file$j, 41, 24, 1296);
    			add_location(h1, file$j, 45, 28, 1599);
    			add_location(p0, file$j, 46, 28, 1664);
    			attr_dev(i1, "class", "bi bi-star-fill");
    			add_location(i1, file$j, 49, 56, 1875);
    			attr_dev(span1, "class", "fw-bold");
    			add_location(span1, file$j, 49, 34, 1853);
    			add_location(p1, file$j, 50, 34, 1988);
    			attr_dev(div4, "class", "stars me-4");
    			add_location(div4, file$j, 48, 32, 1793);
    			attr_dev(div5, "class", "d-lg-flex rating");
    			add_location(div5, file$j, 47, 28, 1728);
    			attr_dev(div6, "class", "col-lg-7 ");
    			add_location(div6, file$j, 44, 24, 1545);
    			attr_dev(div7, "class", "row");
    			add_location(div7, file$j, 40, 19, 1253);
    			attr_dev(div8, "class", "container");
    			add_location(div8, file$j, 39, 15, 1209);
    			add_location(h40, file$j, 59, 21, 2395);
    			attr_dev(p2, "class", "m-0");
    			add_location(p2, file$j, 60, 21, 2442);
    			attr_dev(div9, "class", "col-lg-9 offset-lg-2 border-top border-bottom border-end border-start rounded-3 px-4 py-3");
    			add_location(div9, file$j, 58, 19, 2269);
    			attr_dev(div10, "class", "container-fluid my-4");
    			add_location(div10, file$j, 57, 15, 2214);
    			add_location(h41, file$j, 66, 20, 2740);
    			html_tag.a = null;
    			attr_dev(div11, "class", "col-lg-9 offset-lg-2 border-top border-bottom border-end border-start rounded-3 px-4 py-2");
    			add_location(div11, file$j, 65, 19, 2615);
    			attr_dev(div12, "class", "container-fluid");
    			add_location(div12, file$j, 64, 15, 2565);
    			attr_dev(div13, "class", "container-fluid");
    			add_location(div13, file$j, 38, 11, 1163);
    			attr_dev(section1, "id", "detail-tutors");
    			attr_dev(section1, "class", "tutors-details my-5");
    			add_location(section1, file$j, 36, 6, 1090);
    			attr_dev(main, "id", "main");
    			add_location(main, file$j, 17, 2, 355);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, section0);
    			append_dev(section0, div1);
    			append_dev(div1, div0);
    			append_dev(div0, h2);
    			append_dev(div0, t1);
    			append_dev(div0, ol);
    			append_dev(ol, li0);
    			append_dev(li0, a0);
    			append_dev(ol, t3);
    			append_dev(ol, li1);
    			append_dev(li1, a1);
    			append_dev(ol, t5);
    			append_dev(ol, li2);
    			append_dev(li2, t6);
    			append_dev(main, t7);
    			append_dev(main, div2);
    			append_dev(div2, span0);
    			append_dev(span0, i0);
    			mount_component(arrowleft, i0, null);
    			append_dev(span0, t8);
    			append_dev(main, t9);
    			append_dev(main, section1);
    			append_dev(section1, div13);
    			append_dev(div13, div8);
    			append_dev(div8, div7);
    			append_dev(div7, div3);
    			append_dev(div3, img);
    			append_dev(div7, t10);
    			append_dev(div7, div6);
    			append_dev(div6, h1);
    			append_dev(h1, t11);
    			append_dev(div6, t12);
    			append_dev(div6, p0);
    			append_dev(p0, t13);
    			append_dev(div6, t14);
    			append_dev(div6, div5);
    			append_dev(div5, div4);
    			append_dev(div4, span1);
    			append_dev(span1, i1);
    			mount_component(starfill, i1, null);
    			append_dev(span1, t15);
    			append_dev(div4, t16);
    			append_dev(div4, p1);
    			append_dev(p1, t17);
    			append_dev(p1, t18);
    			append_dev(p1, t19);
    			append_dev(div13, t20);
    			append_dev(div13, div10);
    			append_dev(div10, div9);
    			append_dev(div9, h40);
    			append_dev(div9, t22);
    			append_dev(div9, p2);
    			p2.innerHTML = raw0_value;
    			append_dev(div13, t23);
    			append_dev(div13, div12);
    			append_dev(div12, div11);
    			append_dev(div11, h41);
    			append_dev(div11, t25);
    			html_tag.m(raw1_value, div11);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(span0, "click", pop, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if ((!current || dirty & /*course*/ 1) && t6_value !== (t6_value = /*course*/ ctx[0].tutor.tutor1.name + "")) set_data_dev(t6, t6_value);

    			if (!current || dirty & /*course*/ 1 && !src_url_equal(img.src, img_src_value = /*course*/ ctx[0].tutor.tutor1.photo)) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if ((!current || dirty & /*course*/ 1) && t11_value !== (t11_value = /*course*/ ctx[0].tutor.tutor1.name + "")) set_data_dev(t11, t11_value);
    			if ((!current || dirty & /*course*/ 1) && t13_value !== (t13_value = /*course*/ ctx[0].tutor.tutor1.descs + "")) set_data_dev(t13, t13_value);
    			if ((!current || dirty & /*course*/ 1) && t15_value !== (t15_value = /*course*/ ctx[0].tutor.tutor1.rating + "")) set_data_dev(t15, t15_value);
    			if ((!current || dirty & /*course*/ 1) && t18_value !== (t18_value = /*course*/ ctx[0].tutor.tutor1.review + "")) set_data_dev(t18, t18_value);
    			if ((!current || dirty & /*course*/ 1) && raw0_value !== (raw0_value = /*course*/ ctx[0].tutor.tutor1.about + "")) p2.innerHTML = raw0_value;			if ((!current || dirty & /*course*/ 1) && raw1_value !== (raw1_value = /*course*/ ctx[0].tutor.tutor1.schedule + "")) html_tag.p(raw1_value);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(arrowleft.$$.fragment, local);
    			transition_in(starfill.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(arrowleft.$$.fragment, local);
    			transition_out(starfill.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(arrowleft);
    			destroy_component(starfill);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$m.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$m($$self, $$props, $$invalidate) {
    	let course;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('DetailCourseTutor1', slots, []);
    	let { params = {} } = $$props;

    	function findCourse(id) {
    		return Course$1[id];
    	}

    	const writable_props = ['params'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<DetailCourseTutor1> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('params' in $$props) $$invalidate(1, params = $$props.params);
    	};

    	$$self.$capture_state = () => ({
    		ArrowLeft: ArrowLeft$1,
    		StarFill: StarFill$1,
    		pop,
    		courses: Course$1,
    		params,
    		findCourse,
    		course
    	});

    	$$self.$inject_state = $$props => {
    		if ('params' in $$props) $$invalidate(1, params = $$props.params);
    		if ('course' in $$props) $$invalidate(0, course = $$props.course);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*params*/ 2) {
    			$$invalidate(0, course = findCourse(parseInt(params.id)));
    		}
    	};

    	return [course, params];
    }

    class DetailCourseTutor1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$m, create_fragment$m, safe_not_equal, { params: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "DetailCourseTutor1",
    			options,
    			id: create_fragment$m.name
    		});
    	}

    	get params() {
    		throw new Error("<DetailCourseTutor1>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set params(value) {
    		throw new Error("<DetailCourseTutor1>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\pages\DetailCourseTutor2.svelte generated by Svelte v3.48.0 */
    const file$i = "src\\pages\\DetailCourseTutor2.svelte";

    function create_fragment$l(ctx) {
    	let main;
    	let section0;
    	let div1;
    	let div0;
    	let h2;
    	let t1;
    	let ol;
    	let li0;
    	let a0;
    	let t3;
    	let li1;
    	let a1;
    	let t5;
    	let li2;
    	let t6_value = /*course*/ ctx[0].tutor.tutor2.name + "";
    	let t6;
    	let t7;
    	let div2;
    	let span0;
    	let i0;
    	let arrowleft;
    	let t8;
    	let t9;
    	let section1;
    	let div13;
    	let div8;
    	let div7;
    	let div3;
    	let img;
    	let img_src_value;
    	let t10;
    	let div6;
    	let h1;
    	let t11_value = /*course*/ ctx[0].tutor.tutor2.name + "";
    	let t11;
    	let t12;
    	let p0;
    	let t13_value = /*course*/ ctx[0].tutor.tutor2.descs + "";
    	let t13;
    	let t14;
    	let div5;
    	let div4;
    	let span1;
    	let i1;
    	let starfill;
    	let t15_value = /*course*/ ctx[0].tutor.tutor2.rating + "";
    	let t15;
    	let t16;
    	let p1;
    	let t17;
    	let t18_value = /*course*/ ctx[0].tutor.tutor2.review + "";
    	let t18;
    	let t19;
    	let t20;
    	let div10;
    	let div9;
    	let h40;
    	let t22;
    	let p2;
    	let raw0_value = /*course*/ ctx[0].tutor.tutor2.about + "";
    	let t23;
    	let div12;
    	let div11;
    	let h41;
    	let t25;
    	let html_tag;
    	let raw1_value = /*course*/ ctx[0].tutor.tutor2.schedule + "";
    	let current;
    	let mounted;
    	let dispose;
    	arrowleft = new ArrowLeft$1({ $$inline: true });
    	starfill = new StarFill$1({ $$inline: true });

    	const block = {
    		c: function create() {
    			main = element("main");
    			section0 = element("section");
    			div1 = element("div");
    			div0 = element("div");
    			h2 = element("h2");
    			h2.textContent = "Tutors";
    			t1 = space();
    			ol = element("ol");
    			li0 = element("li");
    			a0 = element("a");
    			a0.textContent = "Courses";
    			t3 = space();
    			li1 = element("li");
    			a1 = element("a");
    			a1.textContent = "Tutors";
    			t5 = space();
    			li2 = element("li");
    			t6 = text$1(t6_value);
    			t7 = space();
    			div2 = element("div");
    			span0 = element("span");
    			i0 = element("i");
    			create_component(arrowleft.$$.fragment);
    			t8 = text$1("Back");
    			t9 = space();
    			section1 = element("section");
    			div13 = element("div");
    			div8 = element("div");
    			div7 = element("div");
    			div3 = element("div");
    			img = element("img");
    			t10 = space();
    			div6 = element("div");
    			h1 = element("h1");
    			t11 = text$1(t11_value);
    			t12 = space();
    			p0 = element("p");
    			t13 = text$1(t13_value);
    			t14 = space();
    			div5 = element("div");
    			div4 = element("div");
    			span1 = element("span");
    			i1 = element("i");
    			create_component(starfill.$$.fragment);
    			t15 = text$1(t15_value);
    			t16 = space();
    			p1 = element("p");
    			t17 = text$1("(");
    			t18 = text$1(t18_value);
    			t19 = text$1("  reviews )");
    			t20 = space();
    			div10 = element("div");
    			div9 = element("div");
    			h40 = element("h4");
    			h40.textContent = "About The Tutor";
    			t22 = space();
    			p2 = element("p");
    			t23 = space();
    			div12 = element("div");
    			div11 = element("div");
    			h41 = element("h4");
    			h41.textContent = "Tutor Schedule";
    			t25 = space();
    			html_tag = new HtmlTag(false);
    			add_location(h2, file$i, 22, 12, 582);
    			attr_dev(a0, "href", "/#");
    			add_location(a0, file$i, 24, 18, 635);
    			add_location(li0, file$i, 24, 14, 631);
    			attr_dev(a1, "href", "/#/ourtutors");
    			add_location(a1, file$i, 25, 18, 684);
    			add_location(li1, file$i, 25, 14, 680);
    			add_location(li2, file$i, 26, 14, 738);
    			add_location(ol, file$i, 23, 12, 611);
    			attr_dev(div0, "class", "d-flex justify-content-between align-items-center");
    			add_location(div0, file$i, 21, 10, 505);
    			attr_dev(div1, "class", "container");
    			add_location(div1, file$i, 20, 8, 470);
    			attr_dev(section0, "class", "breadcrumbs");
    			add_location(section0, file$i, 19, 6, 431);
    			attr_dev(i0, "class", "bi bi-arrow-left me-2 fs-4");
    			add_location(i0, file$i, 34, 57, 1006);
    			attr_dev(span0, "class", "fs-5 text-dark backs svelte-1qw1zq1");
    			add_location(span0, file$i, 34, 6, 955);
    			attr_dev(div2, "class", "container mt-3");
    			add_location(div2, file$i, 33, 3, 919);
    			if (!src_url_equal(img.src, img_src_value = /*course*/ ctx[0].tutor.tutor2.photo)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "img-team");
    			attr_dev(img, "class", "img-fluid rounded-circle mb-3");
    			set_style(img, "width", "14.5rem");
    			add_location(img, file$i, 42, 28, 1373);
    			attr_dev(div3, "class", "col-lg-3 offset-lg-1 text-center");
    			add_location(div3, file$i, 41, 24, 1296);
    			add_location(h1, file$i, 45, 28, 1599);
    			add_location(p0, file$i, 46, 28, 1664);
    			attr_dev(i1, "class", "bi bi-star-fill");
    			add_location(i1, file$i, 49, 56, 1875);
    			attr_dev(span1, "class", "fw-bold");
    			add_location(span1, file$i, 49, 34, 1853);
    			add_location(p1, file$i, 50, 34, 1988);
    			attr_dev(div4, "class", "stars me-4");
    			add_location(div4, file$i, 48, 32, 1793);
    			attr_dev(div5, "class", "d-lg-flex rating");
    			add_location(div5, file$i, 47, 28, 1728);
    			attr_dev(div6, "class", "col-lg-7 ");
    			add_location(div6, file$i, 44, 24, 1545);
    			attr_dev(div7, "class", "row");
    			add_location(div7, file$i, 40, 19, 1253);
    			attr_dev(div8, "class", "container");
    			add_location(div8, file$i, 39, 15, 1209);
    			add_location(h40, file$i, 59, 21, 2395);
    			attr_dev(p2, "class", "m-0");
    			add_location(p2, file$i, 60, 21, 2442);
    			attr_dev(div9, "class", "col-lg-9 offset-lg-2 border-top border-bottom border-end border-start rounded-3 px-4 py-3");
    			add_location(div9, file$i, 58, 19, 2269);
    			attr_dev(div10, "class", "container-fluid my-4");
    			add_location(div10, file$i, 57, 15, 2214);
    			add_location(h41, file$i, 66, 20, 2740);
    			html_tag.a = null;
    			attr_dev(div11, "class", "col-lg-9 offset-lg-2 border-top border-bottom border-end border-start rounded-3 px-4 py-2");
    			add_location(div11, file$i, 65, 19, 2615);
    			attr_dev(div12, "class", "container-fluid");
    			add_location(div12, file$i, 64, 15, 2565);
    			attr_dev(div13, "class", "container-fluid");
    			add_location(div13, file$i, 38, 11, 1163);
    			attr_dev(section1, "id", "detail-tutors");
    			attr_dev(section1, "class", "tutors-details my-5");
    			add_location(section1, file$i, 36, 6, 1090);
    			attr_dev(main, "id", "main");
    			add_location(main, file$i, 17, 2, 355);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, section0);
    			append_dev(section0, div1);
    			append_dev(div1, div0);
    			append_dev(div0, h2);
    			append_dev(div0, t1);
    			append_dev(div0, ol);
    			append_dev(ol, li0);
    			append_dev(li0, a0);
    			append_dev(ol, t3);
    			append_dev(ol, li1);
    			append_dev(li1, a1);
    			append_dev(ol, t5);
    			append_dev(ol, li2);
    			append_dev(li2, t6);
    			append_dev(main, t7);
    			append_dev(main, div2);
    			append_dev(div2, span0);
    			append_dev(span0, i0);
    			mount_component(arrowleft, i0, null);
    			append_dev(span0, t8);
    			append_dev(main, t9);
    			append_dev(main, section1);
    			append_dev(section1, div13);
    			append_dev(div13, div8);
    			append_dev(div8, div7);
    			append_dev(div7, div3);
    			append_dev(div3, img);
    			append_dev(div7, t10);
    			append_dev(div7, div6);
    			append_dev(div6, h1);
    			append_dev(h1, t11);
    			append_dev(div6, t12);
    			append_dev(div6, p0);
    			append_dev(p0, t13);
    			append_dev(div6, t14);
    			append_dev(div6, div5);
    			append_dev(div5, div4);
    			append_dev(div4, span1);
    			append_dev(span1, i1);
    			mount_component(starfill, i1, null);
    			append_dev(span1, t15);
    			append_dev(div4, t16);
    			append_dev(div4, p1);
    			append_dev(p1, t17);
    			append_dev(p1, t18);
    			append_dev(p1, t19);
    			append_dev(div13, t20);
    			append_dev(div13, div10);
    			append_dev(div10, div9);
    			append_dev(div9, h40);
    			append_dev(div9, t22);
    			append_dev(div9, p2);
    			p2.innerHTML = raw0_value;
    			append_dev(div13, t23);
    			append_dev(div13, div12);
    			append_dev(div12, div11);
    			append_dev(div11, h41);
    			append_dev(div11, t25);
    			html_tag.m(raw1_value, div11);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(span0, "click", pop, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if ((!current || dirty & /*course*/ 1) && t6_value !== (t6_value = /*course*/ ctx[0].tutor.tutor2.name + "")) set_data_dev(t6, t6_value);

    			if (!current || dirty & /*course*/ 1 && !src_url_equal(img.src, img_src_value = /*course*/ ctx[0].tutor.tutor2.photo)) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if ((!current || dirty & /*course*/ 1) && t11_value !== (t11_value = /*course*/ ctx[0].tutor.tutor2.name + "")) set_data_dev(t11, t11_value);
    			if ((!current || dirty & /*course*/ 1) && t13_value !== (t13_value = /*course*/ ctx[0].tutor.tutor2.descs + "")) set_data_dev(t13, t13_value);
    			if ((!current || dirty & /*course*/ 1) && t15_value !== (t15_value = /*course*/ ctx[0].tutor.tutor2.rating + "")) set_data_dev(t15, t15_value);
    			if ((!current || dirty & /*course*/ 1) && t18_value !== (t18_value = /*course*/ ctx[0].tutor.tutor2.review + "")) set_data_dev(t18, t18_value);
    			if ((!current || dirty & /*course*/ 1) && raw0_value !== (raw0_value = /*course*/ ctx[0].tutor.tutor2.about + "")) p2.innerHTML = raw0_value;			if ((!current || dirty & /*course*/ 1) && raw1_value !== (raw1_value = /*course*/ ctx[0].tutor.tutor2.schedule + "")) html_tag.p(raw1_value);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(arrowleft.$$.fragment, local);
    			transition_in(starfill.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(arrowleft.$$.fragment, local);
    			transition_out(starfill.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(arrowleft);
    			destroy_component(starfill);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$l.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$l($$self, $$props, $$invalidate) {
    	let course;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('DetailCourseTutor2', slots, []);
    	let { params = {} } = $$props;

    	function findCourse(id) {
    		return Course$1[id];
    	}

    	const writable_props = ['params'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<DetailCourseTutor2> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('params' in $$props) $$invalidate(1, params = $$props.params);
    	};

    	$$self.$capture_state = () => ({
    		ArrowLeft: ArrowLeft$1,
    		StarFill: StarFill$1,
    		pop,
    		courses: Course$1,
    		params,
    		findCourse,
    		course
    	});

    	$$self.$inject_state = $$props => {
    		if ('params' in $$props) $$invalidate(1, params = $$props.params);
    		if ('course' in $$props) $$invalidate(0, course = $$props.course);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*params*/ 2) {
    			$$invalidate(0, course = findCourse(parseInt(params.id)));
    		}
    	};

    	return [course, params];
    }

    class DetailCourseTutor2 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$l, create_fragment$l, safe_not_equal, { params: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "DetailCourseTutor2",
    			options,
    			id: create_fragment$l.name
    		});
    	}

    	get params() {
    		throw new Error("<DetailCourseTutor2>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set params(value) {
    		throw new Error("<DetailCourseTutor2>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\pages\DetailCourseTutor3.svelte generated by Svelte v3.48.0 */
    const file$h = "src\\pages\\DetailCourseTutor3.svelte";

    function create_fragment$k(ctx) {
    	let main;
    	let section0;
    	let div1;
    	let div0;
    	let h2;
    	let t1;
    	let ol;
    	let li0;
    	let a0;
    	let t3;
    	let li1;
    	let a1;
    	let t5;
    	let li2;
    	let t6_value = /*course*/ ctx[0].tutor.tutor3.name + "";
    	let t6;
    	let t7;
    	let div2;
    	let span0;
    	let i0;
    	let arrowleft;
    	let t8;
    	let t9;
    	let section1;
    	let div13;
    	let div8;
    	let div7;
    	let div3;
    	let img;
    	let img_src_value;
    	let t10;
    	let div6;
    	let h1;
    	let t11_value = /*course*/ ctx[0].tutor.tutor3.name + "";
    	let t11;
    	let t12;
    	let p0;
    	let t13_value = /*course*/ ctx[0].tutor.tutor3.descs + "";
    	let t13;
    	let t14;
    	let div5;
    	let div4;
    	let span1;
    	let i1;
    	let starfill;
    	let t15_value = /*course*/ ctx[0].tutor.tutor3.rating + "";
    	let t15;
    	let t16;
    	let p1;
    	let t17;
    	let t18_value = /*course*/ ctx[0].tutor.tutor3.review + "";
    	let t18;
    	let t19;
    	let t20;
    	let div10;
    	let div9;
    	let h40;
    	let t22;
    	let p2;
    	let raw0_value = /*course*/ ctx[0].tutor.tutor3.about + "";
    	let t23;
    	let div12;
    	let div11;
    	let h41;
    	let t25;
    	let html_tag;
    	let raw1_value = /*course*/ ctx[0].tutor.tutor3.schedule + "";
    	let current;
    	let mounted;
    	let dispose;
    	arrowleft = new ArrowLeft$1({ $$inline: true });
    	starfill = new StarFill$1({ $$inline: true });

    	const block = {
    		c: function create() {
    			main = element("main");
    			section0 = element("section");
    			div1 = element("div");
    			div0 = element("div");
    			h2 = element("h2");
    			h2.textContent = "Tutors";
    			t1 = space();
    			ol = element("ol");
    			li0 = element("li");
    			a0 = element("a");
    			a0.textContent = "Courses";
    			t3 = space();
    			li1 = element("li");
    			a1 = element("a");
    			a1.textContent = "Tutors";
    			t5 = space();
    			li2 = element("li");
    			t6 = text$1(t6_value);
    			t7 = space();
    			div2 = element("div");
    			span0 = element("span");
    			i0 = element("i");
    			create_component(arrowleft.$$.fragment);
    			t8 = text$1("Back");
    			t9 = space();
    			section1 = element("section");
    			div13 = element("div");
    			div8 = element("div");
    			div7 = element("div");
    			div3 = element("div");
    			img = element("img");
    			t10 = space();
    			div6 = element("div");
    			h1 = element("h1");
    			t11 = text$1(t11_value);
    			t12 = space();
    			p0 = element("p");
    			t13 = text$1(t13_value);
    			t14 = space();
    			div5 = element("div");
    			div4 = element("div");
    			span1 = element("span");
    			i1 = element("i");
    			create_component(starfill.$$.fragment);
    			t15 = text$1(t15_value);
    			t16 = space();
    			p1 = element("p");
    			t17 = text$1("(");
    			t18 = text$1(t18_value);
    			t19 = text$1("  reviews )");
    			t20 = space();
    			div10 = element("div");
    			div9 = element("div");
    			h40 = element("h4");
    			h40.textContent = "About The Tutor";
    			t22 = space();
    			p2 = element("p");
    			t23 = space();
    			div12 = element("div");
    			div11 = element("div");
    			h41 = element("h4");
    			h41.textContent = "Tutor Schedule";
    			t25 = space();
    			html_tag = new HtmlTag(false);
    			add_location(h2, file$h, 22, 12, 582);
    			attr_dev(a0, "href", "/#");
    			add_location(a0, file$h, 24, 18, 635);
    			add_location(li0, file$h, 24, 14, 631);
    			attr_dev(a1, "href", "/#/ourtutors");
    			add_location(a1, file$h, 25, 18, 684);
    			add_location(li1, file$h, 25, 14, 680);
    			add_location(li2, file$h, 26, 14, 738);
    			add_location(ol, file$h, 23, 12, 611);
    			attr_dev(div0, "class", "d-flex justify-content-between align-items-center");
    			add_location(div0, file$h, 21, 10, 505);
    			attr_dev(div1, "class", "container");
    			add_location(div1, file$h, 20, 8, 470);
    			attr_dev(section0, "class", "breadcrumbs");
    			add_location(section0, file$h, 19, 6, 431);
    			attr_dev(i0, "class", "bi bi-arrow-left me-2 fs-4");
    			add_location(i0, file$h, 34, 57, 1006);
    			attr_dev(span0, "class", "fs-5 text-dark backs svelte-1qw1zq1");
    			add_location(span0, file$h, 34, 6, 955);
    			attr_dev(div2, "class", "container mt-3");
    			add_location(div2, file$h, 33, 3, 919);
    			if (!src_url_equal(img.src, img_src_value = /*course*/ ctx[0].tutor.tutor3.photo)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "img-team");
    			attr_dev(img, "class", "img-fluid rounded-circle mb-3");
    			set_style(img, "width", "14.5rem");
    			add_location(img, file$h, 42, 28, 1373);
    			attr_dev(div3, "class", "col-lg-3 offset-lg-1 text-center");
    			add_location(div3, file$h, 41, 24, 1296);
    			add_location(h1, file$h, 45, 28, 1599);
    			add_location(p0, file$h, 46, 28, 1664);
    			attr_dev(i1, "class", "bi bi-star-fill");
    			add_location(i1, file$h, 49, 56, 1875);
    			attr_dev(span1, "class", "fw-bold");
    			add_location(span1, file$h, 49, 34, 1853);
    			add_location(p1, file$h, 50, 34, 1988);
    			attr_dev(div4, "class", "stars me-4");
    			add_location(div4, file$h, 48, 32, 1793);
    			attr_dev(div5, "class", "d-lg-flex rating");
    			add_location(div5, file$h, 47, 28, 1728);
    			attr_dev(div6, "class", "col-lg-7 ");
    			add_location(div6, file$h, 44, 24, 1545);
    			attr_dev(div7, "class", "row");
    			add_location(div7, file$h, 40, 19, 1253);
    			attr_dev(div8, "class", "container");
    			add_location(div8, file$h, 39, 15, 1209);
    			add_location(h40, file$h, 59, 21, 2395);
    			attr_dev(p2, "class", "m-0");
    			add_location(p2, file$h, 60, 21, 2442);
    			attr_dev(div9, "class", "col-lg-9 offset-lg-2 border-top border-bottom border-end border-start rounded-3 px-4 py-3");
    			add_location(div9, file$h, 58, 19, 2269);
    			attr_dev(div10, "class", "container-fluid my-4");
    			add_location(div10, file$h, 57, 15, 2214);
    			add_location(h41, file$h, 66, 20, 2740);
    			html_tag.a = null;
    			attr_dev(div11, "class", "col-lg-9 offset-lg-2 border-top border-bottom border-end border-start rounded-3 px-4 py-2");
    			add_location(div11, file$h, 65, 19, 2615);
    			attr_dev(div12, "class", "container-fluid");
    			add_location(div12, file$h, 64, 15, 2565);
    			attr_dev(div13, "class", "container-fluid");
    			add_location(div13, file$h, 38, 11, 1163);
    			attr_dev(section1, "id", "detail-tutors");
    			attr_dev(section1, "class", "tutors-details my-5");
    			add_location(section1, file$h, 36, 6, 1090);
    			attr_dev(main, "id", "main");
    			add_location(main, file$h, 17, 2, 355);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, section0);
    			append_dev(section0, div1);
    			append_dev(div1, div0);
    			append_dev(div0, h2);
    			append_dev(div0, t1);
    			append_dev(div0, ol);
    			append_dev(ol, li0);
    			append_dev(li0, a0);
    			append_dev(ol, t3);
    			append_dev(ol, li1);
    			append_dev(li1, a1);
    			append_dev(ol, t5);
    			append_dev(ol, li2);
    			append_dev(li2, t6);
    			append_dev(main, t7);
    			append_dev(main, div2);
    			append_dev(div2, span0);
    			append_dev(span0, i0);
    			mount_component(arrowleft, i0, null);
    			append_dev(span0, t8);
    			append_dev(main, t9);
    			append_dev(main, section1);
    			append_dev(section1, div13);
    			append_dev(div13, div8);
    			append_dev(div8, div7);
    			append_dev(div7, div3);
    			append_dev(div3, img);
    			append_dev(div7, t10);
    			append_dev(div7, div6);
    			append_dev(div6, h1);
    			append_dev(h1, t11);
    			append_dev(div6, t12);
    			append_dev(div6, p0);
    			append_dev(p0, t13);
    			append_dev(div6, t14);
    			append_dev(div6, div5);
    			append_dev(div5, div4);
    			append_dev(div4, span1);
    			append_dev(span1, i1);
    			mount_component(starfill, i1, null);
    			append_dev(span1, t15);
    			append_dev(div4, t16);
    			append_dev(div4, p1);
    			append_dev(p1, t17);
    			append_dev(p1, t18);
    			append_dev(p1, t19);
    			append_dev(div13, t20);
    			append_dev(div13, div10);
    			append_dev(div10, div9);
    			append_dev(div9, h40);
    			append_dev(div9, t22);
    			append_dev(div9, p2);
    			p2.innerHTML = raw0_value;
    			append_dev(div13, t23);
    			append_dev(div13, div12);
    			append_dev(div12, div11);
    			append_dev(div11, h41);
    			append_dev(div11, t25);
    			html_tag.m(raw1_value, div11);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(span0, "click", pop, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if ((!current || dirty & /*course*/ 1) && t6_value !== (t6_value = /*course*/ ctx[0].tutor.tutor3.name + "")) set_data_dev(t6, t6_value);

    			if (!current || dirty & /*course*/ 1 && !src_url_equal(img.src, img_src_value = /*course*/ ctx[0].tutor.tutor3.photo)) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if ((!current || dirty & /*course*/ 1) && t11_value !== (t11_value = /*course*/ ctx[0].tutor.tutor3.name + "")) set_data_dev(t11, t11_value);
    			if ((!current || dirty & /*course*/ 1) && t13_value !== (t13_value = /*course*/ ctx[0].tutor.tutor3.descs + "")) set_data_dev(t13, t13_value);
    			if ((!current || dirty & /*course*/ 1) && t15_value !== (t15_value = /*course*/ ctx[0].tutor.tutor3.rating + "")) set_data_dev(t15, t15_value);
    			if ((!current || dirty & /*course*/ 1) && t18_value !== (t18_value = /*course*/ ctx[0].tutor.tutor3.review + "")) set_data_dev(t18, t18_value);
    			if ((!current || dirty & /*course*/ 1) && raw0_value !== (raw0_value = /*course*/ ctx[0].tutor.tutor3.about + "")) p2.innerHTML = raw0_value;			if ((!current || dirty & /*course*/ 1) && raw1_value !== (raw1_value = /*course*/ ctx[0].tutor.tutor3.schedule + "")) html_tag.p(raw1_value);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(arrowleft.$$.fragment, local);
    			transition_in(starfill.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(arrowleft.$$.fragment, local);
    			transition_out(starfill.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(arrowleft);
    			destroy_component(starfill);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$k.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$k($$self, $$props, $$invalidate) {
    	let course;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('DetailCourseTutor3', slots, []);
    	let { params = {} } = $$props;

    	function findCourse(id) {
    		return Course$1[id];
    	}

    	const writable_props = ['params'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<DetailCourseTutor3> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('params' in $$props) $$invalidate(1, params = $$props.params);
    	};

    	$$self.$capture_state = () => ({
    		ArrowLeft: ArrowLeft$1,
    		StarFill: StarFill$1,
    		pop,
    		courses: Course$1,
    		params,
    		findCourse,
    		course
    	});

    	$$self.$inject_state = $$props => {
    		if ('params' in $$props) $$invalidate(1, params = $$props.params);
    		if ('course' in $$props) $$invalidate(0, course = $$props.course);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*params*/ 2) {
    			$$invalidate(0, course = findCourse(parseInt(params.id)));
    		}
    	};

    	return [course, params];
    }

    class DetailCourseTutor3 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$k, create_fragment$k, safe_not_equal, { params: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "DetailCourseTutor3",
    			options,
    			id: create_fragment$k.name
    		});
    	}

    	get params() {
    		throw new Error("<DetailCourseTutor3>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set params(value) {
    		throw new Error("<DetailCourseTutor3>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    let tutors = [
      {
        //isdone
        img: "./assets/img/trainers/tutors-1.jpg",
        name: "Felix Pratama",
        desc: `Process Plant Design, Product Design and Development, Transport Phenomena, Fluid and Particle Mechanics`,
        experience: `Felix has 4 years-experience in handling supply chain management at consumer goods company in Indonesia. He teaches chemical engineering subjects since 2016 as a lecturer assistant at Universitas Indonesia.`,
        media: {
          fb: null,
          tw: null,
          ig: "https://www.instagram.com/lixpratama/",
          linked: "https://www.linkedin.com/in/felix-pratama-257295112/",
          research: null,
        },
        about: `Felix is currently Head of Section - Logistic Solution at Wings Group Indonesia (PT. Sayap Mas Utama). He is graduated from Universitas Indonesia with 3,91 GPA. While he was a student at Universitas
    Indonesia, he became lecturer assistant in transport phenomena and plant design course. At TORCHE Education, he tutors some subjects including transport phenomena, fluid mechanics, product design, and plant design.`,
        review: "277",
        rating: "4,9 / 5,0",
        schedule: `<iframe style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=134206045/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
      },
      //isdone
      {
        img: "./assets/img/trainers/tutors-2.jpg",
        name: "Leon Lukhas Santoso",
        desc: `Chemical Reaction Engineering`,
        experience: `Leon teaches chemical engineering subjects since 2018 as lecturer assistant at Universitas Indonesia. He obtained his Master Degree in Chemical Engineering Science at National Taiwan University of Science and Technology, Taipei.`,
        media: {
          fb: `https://www.facebook.com/leon.santoso/`,
          tw: `https://twitter.com/Leonsantoso`,
          ig: null,
          linked: "https://www.linkedin.com/in/leon-santoso/",
          research: null,
        },
        about: `Leon currently pursuing Master of Science in Chemical Engineering at National Taiwan University of Science and Technology, Taipei. At TORCHE Education, he is a co-founder and tutor in chemical reaction engineering course. Leon graduated from Unviersitas Indonesia, and he was a lecturer assistant in numerous subjects, including product design and plant design course.`,
        review: "97",
        rating: "4,79 / 5,0",
        schedule: `<iframe style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=903016931/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
      },
      {
        //isdone
        img: "./assets/img/trainers/tutors-3.jpg",
        name: "Muhammad Yusuf Arya Ramadhan",
        desc: `Bioprocess Engineering, Engineering Economy`,
        experience: `Arya is a researcher in bioprocess topics since 2016 at Universitas Indonesia. He experienced handling manufacturing in fatty acid at Unilever Oleochemical Indonesia.`,
        media: {
          tw: `https://twitter.com/arya1302`,
          fb: null,
          ig: "https://www.instagram.com/ary.ramadhan/",
          linked: "https://www.linkedin.com/in/arya-ramadhan/",
          research: `https://www.researchgate.net/profile/Muhammad-Ramadhan-27`,
        },
        rating: "4,8 / 5,0",
        review: "22",
        about: `Arya graduated from Universitas Indonesia, with bachelor degree in bioprocess Engineering and master degree in chemical engineering. Currently, he is the Chief Executive Officer at TORCHE Education and tutors in engineering economy, product design, and plant design course. Arya experienced in faty acid manufacturing when he was an intern at Unilever Oleochemical Indonesia. He became research assistant at Universitas Indonesia at 2016 and lecturer assistant in numerous courses at Universitas Indonesia. `,
        schedule: `<iframe  style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=1509109124/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
      },
      {
        //isdone
        img: "./assets/img/trainers/tutors-4.jpg",
        name: "Sendy Winata",
        desc: `Fundamentals of Mass Transfer, Process Control and Dynamics`,
        experience: `Sendy experienced in process control in oil and gas industry and handling supply chain management at fast moving customer goods company in Indonesia`,
        media: {
          fb: null,
          tw: null,
          ig: "https://www.instagram.com/sendywee/?hl=en/",
          linked: "https://id.linkedin.com/in/sendy-winata-941265168",
          research: null,
        },
        rating: "4,66 / 5,0",
        review: "203",
        about: `Sendy is a tutor and co-founder at TORCHE Education. He is a PDCA Officer at PT Sayap Mas Utama (Wings Group), managing supply chain in one of the biggest Fast Moving Consumer Goods company in Indonesia. Previously, he is an engineer at ExxonMobil, handling process control in oil and gas indsutry. He teaches process control and mass transfer subjects at TORCHE Education. `,
        schedule: `<iframe  style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=129721676/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
      },
      //isdone
      {
        img: "./assets/img/trainers/tutors-5.jpg",
        name: "Syailendra Supit",
        desc: `Chemical Engineering Mathematics, Fundamentals of Calculus, Fluid Particle Mechanics, Numerical Computation for Engineers`,
        experience: `Syailendra is a tutor at TORCHE Education and currently pursuing master degree at Institut Teknologi Bandung`,
        media: {
          fb: null,
          tw: null,
          ig: null,
          linked: null,
          research: null,
        },
        rating: "4,62 / 5,0",
        review: "44",
        about: `Syailendra currently pursuing master degree in chemical engineering at Institut Teknologi Bandung. He obtained his bachelor degree in chemical engineering from Universitas Indonesia and become research assistant there. Previously, he became lecturer assistant in some chemical engineering subjects at Universitas Indonesia, namely numerical computation, chemical engineering modelling, bioreactor engineering, and bioprocess equipment design course.`,
        schedule: `<iframe  style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=853803407/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
      },
      {
        //isdone
        img: "./assets/img/trainers/tutors-6.jpg",
        name: "Samuel Pangeran Aletheia",
        desc: `Chemical Engineering Mathematics, Chemical Engineering Thermodynamics, Process Equipment Design`,
        experience: `Graduated from Chemical Engineering major at Universitas Indonesia (Bachelor Degree) and Institut Teknologi Bandung (Master Degree), Samuel handles many projects in oil and gas industries.`,
        media: {
          fb: `https://ms-my.facebook.com/samuel.p.silalahi`,
          tw: `https://twitter.com/sam_pangeran`,
          ig: `https://www.instagram.com/sam_pangeran`,
          linked: "https://id.linkedin.com/in/samuel-pangeran-aletheia-ba616a118",
          research: null,
        },
        rating: "4,6 / 5,0",
        review: "156",
        about: `Samuel is a process engineer and educator graduated from Universitas Indonesia (2019) and Institut Teknologi Bandung (2022) majoring in chemical engineering. As a process engineer, Samuel has handled many projects in oil and gas indsutries and petrochemical industries across Indonesia. Some of them are PT. Pertamina's (Persero) CB-III Pipeline project, BBWM Refrigeration FEED, PT Bukit Asam TBBC at South Sumatera,
    PT Petromine's Biodiesel storage, PT. Medco Energy's Water-Oil separator improvement, etc.<br><br> As an educator, Samuel teaches more than 200 students in chemical engineering and become lecturer assistant since he was studying at Universitas Indonesia. He teaches
    numerous subjects in chemical engineering and specialized in Computer-Aided Chemical Engineering. Samuel skilled in most process engineering softwares, such as Unisim Design, Aspen HYSYS, Aspen Plus, COMSOL Multiphysics, ANSYS, and Schlumberger PIPESIM and Symmetry.`,
        schedule: `<iframe  style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=341757435/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
      },
      {
        //isdone
        img: "./assets/img/trainers/tutors-7.jpg",
        name: "Amalia Weediyanti",
        desc: `Cell Culture for Engineers, Heat Transfer`,
        experience: `Amalia graduated from Bioprocess Engineering University of Indonesia in 2021. She teaches Cell Culture and Heat Transfer since 2020.`,
        media: {
          fb: null,
          tw: null,
          ig: "https://www.instagram.com/amaliaweediy/",
          linked: "https://www.linkedin.com/in/amalia-weediyanti-5882b0232/",
          research: null,
        },
        rating: "4,74 / 5,0",
        review: "11",
        about: `Amalia has a Bachelor’s Degree in Engineering. She graduated from Bioprocess Engineering, University of Indonesia, in 2021 with a cumlaude predicate. She teaches Cell Culture and Heat Transfer in Torche since 2020. Her undergraduate thesis was about microalgae. The title of her thesis is “The Effect of Types and Concentration of Nitrogen Sources in Cultivation Media on the Content and Antioxidant Activity of Phycocyanin from Spirulina platensis Microalgae”. During her time at University, she was a lecturer assistant for Statistics and Probability. She was also a part of Ikatan Mahasiswa Teknik Kimia (IMTK) and Society for Biological Engineering (SBE). She speaks Indonesian, English, and a little bit of German. She is now about to start her early career in Boehringer Ingelheim.`,
        schedule: `<iframe  style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=258252140/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
      },
      {
        //isdone
        img: "./assets/img/trainers/tutors-8.jpg",
        name: "Sharen Kevin",
        desc: `Mass and Energy Balance, Process Engineering Drawing`,
        experience: `Sharen graduated from Universitas Indonesia with bachelor degree in chemical engineering. She teaches Mass & Energy Balances and Engineering Drawing.`,
        media: {
          fb: null,
          tw: null,
          ig: "https://www.instagram.com/sharenkevin/",
          linked: "http://www.linkedin.com/in/sharenkevin",
          research: null,
        },
        rating: "4,7 / 5,0",
        review: "8",
        about: `Sharen graduated from Universitas Indonesia with bachelor degree in chemical engineering. She teaches Mass & Energy Balances and Engineering Drawing. Her undegraduate thesis was about photocatalysis focusing on antibactetial and self-cleaning coating. During her university years,
    She was an assistant lecturer for Thermal & Mechanics Physics and Mass & Energy Balances and a laboratory assistant for Basics & Organics Chemistry. `,
        schedule: `<iframe  style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=1235378485/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
      },
      {
        //isdone
        img: "./assets/img/trainers/tutors-9.jpg",
        name: "Muhammad Arif Darmawan",
        desc: `Fundamentals of Analytical Chemistry, Fundamentals of Chemistry, Organic Chemistry for Engineers`,
        experience: `Arif is someone who is innovative, collaborative and has an interest in the world of education and science`,
        media: {
          fb: null,
          tw: null,
          ig: null,
          linked: null,
          research: null,
        },
        rating: "4,67 / 5,0",
        review: "6",
        about: `I am someone who is pursuing a doctoral study program (S3) in the field of biorefinery. I am the best graduate of UI Parallel Chemistry with a GPA of 3.42 and Master of Chemical Engineering at UI with a GPA of 3.69. Has experience teaching high school chemistry Olympiad and basic chemistry courses such as basic chemistry, organic chemistry and analytical chemistry. Has 10 Scopus indexed publications with 3 Q1 articles and 1 Q2 article. I have a Scopus H Index and a google scholar of 3 and 4 . respectively`,
        schedule: `<iframe  style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=20045515/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
      },
      {
        //isdone
        img: "./assets/img/trainers/tutors-10.jpg",
        name: "Syahdan Amir Muhammad",
        desc: `Chemical Engineering Thermodynamics, Chemical Reaction Engineering, Fundamentals of Heat Transfer, Transport Phenomena`,
        experience: `Syahdan is a Master of Chemical Engineering candidate at Institut Teknologi Bandung, which has been experienced as an assistant lecturer and laboratory assistant coordinator. He also has been awarded with LPDP Kemenkeu RI (PK-153)`,
        media: {
          fb: null,
          tw: null,
          ig: null,
          linked: "https://www.linkedin.com/in/syahdan-amir-muhammad-8323b9144/",
          research: null,
        },
        rating: "4,69 / 5,0",
        review: "14",
        about: `Syahdan has been graduated from Chemical Engineering of ITS in 2018 with 3,71 GPA and currently pursuing master degree of Chemical Engineering at ITB. In his professional career, he has experienced as Regional Logistics unit Head at PT. Propan Raya ICC - Branch Makassar for a year. During his master study, he was experienced as Assistant Lecturer of "Advanced Chemical Engineering Thermodynamics" and Lab. Assistant Coordinator of "Measurement and Analytical Method Laboratory".
    <br>Field of Research: Biorefinery, fermentation technology, and lignocellulose fractionation<br>
    <b>Scientific publication:</b> <br>Food Safety Analysis and Improvement Concept of p -Carotene Extraction from Fungal Fermented Palm Oil Empty Fruit Bunches (EFB); Extraction Method and Solvent Selection`,
        schedule: `<iframe  style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=1441497619/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
      },
      {
        //isdone
        img: "assets/img/trainers/tutors-11.jpg",
        name: "Athallia Qatrunnada",
        desc: `Biochemical Engineering, Biological Cell`,
        experience: "",
        media: {
          fb: null,
          tw: null,
          ig: null,
          linked: null,
          research: null,
        },
        rating: "0,0 / 5,0",
        review: "0",
        about: ``,
        schedule: `<iframe  style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=533380482/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
      },
      {
        //isdone
        img: "./assets/img/trainers/tutors-12.jpg",
        name: "Ridzki Ramadhan",
        desc: `Chemical Process Simulation, Process Plant Design`,
        experience: `Ridzki is a process engineer at one of the Petrochemical Plant in Indonesia. He graduated from Chemical Engineering ITS Surabaya.`,
        media: {
          fb: null,
          tw: null,
          ig: `https://www.instagram.com/ridzki93/`,
          linked: "https://id.linkedin.com/in/ridzki-ramadhan-158b55108",
          research: null,
        },
        rating: "0,0 / 5,0",
        review: "0",
        about: `Process engineer from on of the petrochemical plant in Indonesia. Several times as guest lecturer at STEM Akamigas Cepu.`,
        schedule: `<iframe  style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=336568314/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
      },
      {
        //isdone
        img: "./assets/img/trainers/tutors-13.jpg",
        name: "Nadia Mumtazah",
        desc: `Chemical Reaction Engineering, Mass and Energy Balances`,
        experience: `Nadia is a lecturer in one of university in banten. She achieved her master degree in National Taiwan University of Science and Technology`,
        media: {
          fb: null,
          tw: null,
          ig: "https://instagram.com/nadiaamumtaz",
          linked: null,
          research: null,
        },
        rating: "4,8 / 5,0",
        review: "4",
        about: `<b>GPA</b><br>- Bachelor : 3.83<br> - Master : 3.73<br><br>
    <b>Experience</b><br>
    - Assistant of Organic Chemistry Laboratory<br>
    - Assistant of Analytical Chemistry Laboratory<br>
    - Lecturer of P3TIK - FT UNTIRTA<br><br>

    <b>Achievement</b><br>
    - Silver award at 38th Taiwan Catalyst and Reaction Engineering Symposium<br>
    - Best Presentation at 11th ICAST (International Student Conference on Advance Science and Technology), Japan<br>
    - Delegation of Japan-Asia Youth Exchange Scholarship Program at Kumamoto University, Japan<br><br>

    <b>Publication</b><br>
    - Computational Liquid Dynamic Simulation Mixing Time from Side Inlet Mixer Tank`,
        schedule: `<iframe  style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=1281159756/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
      },
      {
        //isdone
        img: "./assets/img/trainers/tutors-14.jpg",
        name: "Riswanda Himawan",
        desc: `Chemical Process Simulation, Process Equipment Design`,
        experience: `Process Engineer Petrochemical and Chemical Engineer enthausiast`,
        media: {
          fb: null,
          tw: null,
          ig: "https://www.instagram.com/riswandahimawan/",
          linked: "https://id.linkedin.com/in/riswanda-himawan-5184aa137",
          research: null,
        },
        rating: "4,7 / 5,0",
        review: "3",
        about: `Petrochemical Process Engineer who graduated from Institute Technology of Sepuluh Nopember Surabaya with GPA 3.90 and appreciated as best ITS GPA 2018, has experience as Chemical Engineer tutor since in campus and belong to increase PP Plant capacity project from 480 to 590 KTA`,
        schedule: `<iframe  style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=184355625/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
      },
      {
        //isdone
        img: "./assets/img/trainers/tutors-15.jpg",
        name: "Shafira Nur Adiningsih",
        desc: `Chemical Engineering Thermodynamics, Mass and Energy Balances, Numerical Computation for Engineers`,
        experience: "",
        media: {
          fb: null,
          tw: null,
          ig: null,
          linked: null,
          research: null,
        },
        rating: " 4,5 / 5,0",
        review: "1",
        about: ``,
        schedule: `<iframe  style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=1190485885/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
      },
      {
        //isdone
        img: "./assets/img/trainers/tutors-16.jpg",
        name: "Sabtin Maulidiyah Hani",
        desc: `Fundamentals of Analytical Chemistry, Fundamentals of Chemistry`,
        experience: `Hani has over 3 years-experience in analytical chemistry laboratory. She started teaching in analytical chemistry field since 2018 as laboratory teaching assistant at Universitas Negeri Malang (UM).`,
        media: {
          fb: `https://www.facebook.com/sabtin.hani`,
          tw: null,
          ig: "https://www.instagram.com/sabtinhani",
          linked: "https://id.linkedin.com/in/sabtinhani",
          research: null,
        },
        rating: "4,8 / 5,0",
        review: "2",
        about: `D III: Polytechnic of AKA Bogor (2013-2016) IPK: 3.55 <br>S-1: Malang State University (UM) (2017-2019) IPK: 3.60<br> S-2 : Institute of Technology Bandung (ITB) (2020-2022) IPK : 3.85<br><br><b>Experience:</b><br>QA Microbiology intern at PT. Capsugel Indonesia (2015)<br>
    Tutor of National Exam (Chemistry Subject) (2017)<br>
    Fundamentals of Chemistry Laboratory Teaching Assistant at ITB (2021)<br>
    Separation method and electrochemical Laboratory Teaching Assistant at ITB (2021)<br>
    Environmental Chemistry Laboratory Assistant at UM (2018)<br>
    Publication: Second author of Exploration of the leached Fe geochemical fractions in Tiga Warna Beach sediment, Indonesia<br>`,
        schedule: `<iframe  style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=217406522/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
      },
      {
        //isdone
        img: "./assets/img/trainers/tutors-17.jpg",
        name: "Yulia Dwi Putri",
        desc: `Organic Chemistry for Engineers`,
        experience: `Organic chemistry tutors at TORCHE Education`,
        media: {
          fb: null,
          tw: null,
          ig: "https://www.instagram.com/yuliadwptri/?hl=en",
          linked: "https://www.linkedin.com/in/yulia-dwi-putri-524686137/",
          research: null,
        },
        rating: " 0,0 / 5,0",
        review: "0",
        about: `Lulusan Kimia ITB tahun 2018 dan Pengajaran Kimia ITB 2022.<br>
    Menjadi asisten praktikum laboratorium kimia dasar ITB (2016-2017)<br> Menjadi asisten praktikum laboratorium kimia organik (ITB) (2018)<br>
    Menjadi pimpinan praktikum laboratorium kimia dasar ITB (2020-2021)<br>
    Guru kimia di SMA Boarding School Motivator Qur'an Ekselensia Indonesia (2021-Now)<br>
    Magang di laboratorium forensik Mabes Polri (2017)<br>`,
        schedule: `<iframe  style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=1395972756/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
      },
      {
        //isdone
        img: "./assets/img/trainers/tutors-18.jpg",
        name: "Yevonnael Andrew",
        desc: `Fundamentals of Physics, Numerical Computation for Engineers, Statistics & Probability`,
        experience: "",
        media: {
          fb: null,
          tw: null,
          ig: null,
          linked: null,
          research: null,
        },
        rating: " 0,0 / 5,0",
        review: "0",
        about: ``,
        schedule: ` <iframe  style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=232143025/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
      },
      {
        //isdone
        img: "./assets/img/trainers/tutors-19.jpg",
        name: "Nur Hendri Wahyu Firdaus",
        desc: `Fundamentals of Mass Transfer`,
        experience: `Hendri has been teaching chemical engineering since he was in college and has been a laboratory engineer for at least four years at the National Institute of Technology Malang. He had experience handling waste research and laboratory analysis.`,
        media: {
          fb: null,
          tw: null,
          ig: "https://www.instagram.com/hendry_wf/",
          linked: "https://linkedin.com/in/nurhendriwahyuf",
          research: null,
        },
        rating: " 0,0 / 5,0",
        review: "0",
        about: `Hendri is a chemical engineering graduate. He completed his bachelor's degree at the National Institute of Technology Malang with fully funded scholarships. He was experienced in laboratory practice, production processes in agribusiness companies, and research in waste technologies. He graduated with honors and became the best graduate in 2021.
    He completed his bachelor's degree by making his final project Acetic Anhydride with Ketene Process and Research in Microbiology using Local Microorganisms as a Bio-activator. He has also published an AlP journal in Applied Science focused on renewable energy and equipment efficiency. `,
        schedule: `<iframe  style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=563776228/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
      },
      {
        //isdone
        img: "./assets/img/trainers/tutors-20.jpg",
        name: "Adam Aji Prayoga",
        desc: `Fundamentals of Chemistry, Fundamentals of Analytical Chemistry`,
        experience: "",
        media: {
          fb: null,
          tw: null,
          ig: null,
          linked: null,
          research: null,
        },
        rating: " 0,0 / 5,0",
        review: "0",
        about: ``,
        schedule: `<iframe  style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=2058222731/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
      },
      {
        //isdone
        img: "./assets/img/trainers/tutors-21.jpg",
        name: "Ajeng Triane Syawalia",
        desc: `Fundamental of Chemistry`,
        experience: `Chemistry Lecturer, Chemistry Tutor`,
        media: {
          fb: null,
          tw: null,
          ig: "https://www.instagram.com/ajeng_syawalia/",
          linked: "https://id.linkedin.com/in/ajengtrianes",
          research: null,
        },
        rating: "0,0 / 5,0",
        review: "0",
        about: `Chemistry Lecturer at Universitas Islam Nusantara and Akademi Industri Tekstil Bandung.<br>
    Assistant Lecturer for Organic Chemistry 2015-2017 at Institut Teknologi Bandung.<br> Chemistry Tutor for high school students with a strong background in Masters of Chemistry to guide students into preparation for the National Science Competition and Cambridge IGCSE Level Examinations. `,
        schedule: `<iframe  style="width: 100%;" height="950px" src="https://docs.google.com/spreadsheets/d/1vI27aRhAQnTB4uuFZiZuJzXRd_3NkjvWwgaaraijGB0/edit#gid=1180678746/pubhtml?widget=true&amp;headers=false" frameborder="0"></iframe>`,
      },
    ];

    var Tutors = tutors;

    /* src\pages\DetailTutor.svelte generated by Svelte v3.48.0 */
    const file$g = "src\\pages\\DetailTutor.svelte";

    function create_fragment$j(ctx) {
    	let main;
    	let section0;
    	let div1;
    	let div0;
    	let h2;
    	let t1;
    	let ol;
    	let li0;
    	let a0;
    	let t3;
    	let li1;
    	let a1;
    	let t5;
    	let li2;
    	let t6_value = /*tutor*/ ctx[0].name + "";
    	let t6;
    	let t7;
    	let div2;
    	let span0;
    	let i0;
    	let arrowleft;
    	let t8;
    	let t9;
    	let section1;
    	let div13;
    	let div8;
    	let div7;
    	let div3;
    	let img;
    	let img_src_value;
    	let t10;
    	let div6;
    	let h1;
    	let t11_value = /*tutor*/ ctx[0].name + "";
    	let t11;
    	let t12;
    	let p0;
    	let t13_value = /*tutor*/ ctx[0].desc + "";
    	let t13;
    	let t14;
    	let div5;
    	let div4;
    	let span1;
    	let i1;
    	let starfill;
    	let t15_value = /*tutor*/ ctx[0].rating + "";
    	let t15;
    	let t16;
    	let p1;
    	let t17;
    	let t18_value = /*tutor*/ ctx[0].review + "";
    	let t18;
    	let t19;
    	let t20;
    	let div10;
    	let div9;
    	let h40;
    	let t22;
    	let p2;
    	let raw0_value = /*tutor*/ ctx[0].about + "";
    	let t23;
    	let div12;
    	let div11;
    	let h41;
    	let t25;
    	let html_tag;
    	let raw1_value = /*tutor*/ ctx[0].schedule + "";
    	let current;
    	let mounted;
    	let dispose;
    	arrowleft = new ArrowLeft$1({ $$inline: true });
    	starfill = new StarFill$1({ $$inline: true });

    	const block = {
    		c: function create() {
    			main = element("main");
    			section0 = element("section");
    			div1 = element("div");
    			div0 = element("div");
    			h2 = element("h2");
    			h2.textContent = "Tutors";
    			t1 = space();
    			ol = element("ol");
    			li0 = element("li");
    			a0 = element("a");
    			a0.textContent = "Courses";
    			t3 = space();
    			li1 = element("li");
    			a1 = element("a");
    			a1.textContent = "Tutors";
    			t5 = space();
    			li2 = element("li");
    			t6 = text$1(t6_value);
    			t7 = space();
    			div2 = element("div");
    			span0 = element("span");
    			i0 = element("i");
    			create_component(arrowleft.$$.fragment);
    			t8 = text$1("Back");
    			t9 = space();
    			section1 = element("section");
    			div13 = element("div");
    			div8 = element("div");
    			div7 = element("div");
    			div3 = element("div");
    			img = element("img");
    			t10 = space();
    			div6 = element("div");
    			h1 = element("h1");
    			t11 = text$1(t11_value);
    			t12 = space();
    			p0 = element("p");
    			t13 = text$1(t13_value);
    			t14 = space();
    			div5 = element("div");
    			div4 = element("div");
    			span1 = element("span");
    			i1 = element("i");
    			create_component(starfill.$$.fragment);
    			t15 = text$1(t15_value);
    			t16 = space();
    			p1 = element("p");
    			t17 = text$1("(");
    			t18 = text$1(t18_value);
    			t19 = text$1("  reviews )");
    			t20 = space();
    			div10 = element("div");
    			div9 = element("div");
    			h40 = element("h4");
    			h40.textContent = "About The Tutor";
    			t22 = space();
    			p2 = element("p");
    			t23 = space();
    			div12 = element("div");
    			div11 = element("div");
    			h41 = element("h4");
    			h41.textContent = "Tutor Schedule";
    			t25 = space();
    			html_tag = new HtmlTag(false);
    			add_location(h2, file$g, 22, 10, 533);
    			attr_dev(a0, "href", "/#");
    			add_location(a0, file$g, 24, 16, 582);
    			add_location(li0, file$g, 24, 12, 578);
    			attr_dev(a1, "href", "/#/ourtutors");
    			add_location(a1, file$g, 25, 16, 629);
    			add_location(li1, file$g, 25, 12, 625);
    			add_location(li2, file$g, 26, 12, 681);
    			add_location(ol, file$g, 23, 10, 560);
    			attr_dev(div0, "class", "d-flex justify-content-between align-items-center");
    			add_location(div0, file$g, 21, 8, 458);
    			attr_dev(div1, "class", "container");
    			add_location(div1, file$g, 20, 6, 425);
    			attr_dev(section0, "class", "breadcrumbs");
    			add_location(section0, file$g, 19, 4, 388);
    			attr_dev(i0, "class", "bi bi-arrow-left me-2 fs-4");
    			add_location(i0, file$g, 34, 55, 919);
    			attr_dev(span0, "class", "fs-5 text-dark backs svelte-nsjpqx");
    			add_location(span0, file$g, 34, 4, 868);
    			attr_dev(div2, "class", "container mt-3");
    			add_location(div2, file$g, 33, 1, 834);
    			if (!src_url_equal(img.src, img_src_value = /*tutor*/ ctx[0].img)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "img-team");
    			attr_dev(img, "class", "img-fluid rounded-circle mb-3");
    			set_style(img, "width", "14.5rem");
    			add_location(img, file$g, 42, 26, 1270);
    			attr_dev(div3, "class", "col-lg-3 offset-lg-1 text-center");
    			add_location(div3, file$g, 41, 22, 1195);
    			add_location(h1, file$g, 45, 26, 1474);
    			add_location(p0, file$g, 46, 26, 1523);
    			attr_dev(i1, "class", "bi bi-star-fill");
    			add_location(i1, file$g, 49, 54, 1713);
    			attr_dev(span1, "class", "fw-bold");
    			add_location(span1, file$g, 49, 32, 1691);
    			add_location(p1, file$g, 50, 32, 1810);
    			attr_dev(div4, "class", "stars me-4");
    			add_location(div4, file$g, 48, 30, 1633);
    			attr_dev(div5, "class", "d-lg-flex rating");
    			add_location(div5, file$g, 47, 26, 1570);
    			attr_dev(div6, "class", "col-lg-7 ");
    			add_location(div6, file$g, 44, 22, 1422);
    			attr_dev(div7, "class", "row");
    			add_location(div7, file$g, 40, 17, 1154);
    			attr_dev(div8, "class", "container");
    			add_location(div8, file$g, 39, 13, 1112);
    			add_location(h40, file$g, 59, 19, 2185);
    			attr_dev(p2, "class", "m-0");
    			add_location(p2, file$g, 60, 19, 2230);
    			attr_dev(div9, "class", "col-lg-9 offset-lg-2 border-top border-bottom border-end border-start rounded-3 px-4 py-3");
    			add_location(div9, file$g, 58, 17, 2061);
    			attr_dev(div10, "class", "container-fluid my-4");
    			add_location(div10, file$g, 57, 13, 2008);
    			add_location(h41, file$g, 66, 18, 2502);
    			html_tag.a = null;
    			attr_dev(div11, "class", "col-lg-9 offset-lg-2 border-top border-bottom border-end border-start rounded-3 px-4 py-2");
    			add_location(div11, file$g, 65, 17, 2379);
    			attr_dev(div12, "class", "container-fluid");
    			add_location(div12, file$g, 64, 13, 2331);
    			attr_dev(div13, "class", "container-fluid");
    			add_location(div13, file$g, 38, 9, 1068);
    			attr_dev(section1, "id", "detail-tutors");
    			attr_dev(section1, "class", "tutors-details my-5");
    			add_location(section1, file$g, 36, 4, 999);
    			attr_dev(main, "id", "main");
    			add_location(main, file$g, 17, 0, 316);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, section0);
    			append_dev(section0, div1);
    			append_dev(div1, div0);
    			append_dev(div0, h2);
    			append_dev(div0, t1);
    			append_dev(div0, ol);
    			append_dev(ol, li0);
    			append_dev(li0, a0);
    			append_dev(ol, t3);
    			append_dev(ol, li1);
    			append_dev(li1, a1);
    			append_dev(ol, t5);
    			append_dev(ol, li2);
    			append_dev(li2, t6);
    			append_dev(main, t7);
    			append_dev(main, div2);
    			append_dev(div2, span0);
    			append_dev(span0, i0);
    			mount_component(arrowleft, i0, null);
    			append_dev(span0, t8);
    			append_dev(main, t9);
    			append_dev(main, section1);
    			append_dev(section1, div13);
    			append_dev(div13, div8);
    			append_dev(div8, div7);
    			append_dev(div7, div3);
    			append_dev(div3, img);
    			append_dev(div7, t10);
    			append_dev(div7, div6);
    			append_dev(div6, h1);
    			append_dev(h1, t11);
    			append_dev(div6, t12);
    			append_dev(div6, p0);
    			append_dev(p0, t13);
    			append_dev(div6, t14);
    			append_dev(div6, div5);
    			append_dev(div5, div4);
    			append_dev(div4, span1);
    			append_dev(span1, i1);
    			mount_component(starfill, i1, null);
    			append_dev(span1, t15);
    			append_dev(div4, t16);
    			append_dev(div4, p1);
    			append_dev(p1, t17);
    			append_dev(p1, t18);
    			append_dev(p1, t19);
    			append_dev(div13, t20);
    			append_dev(div13, div10);
    			append_dev(div10, div9);
    			append_dev(div9, h40);
    			append_dev(div9, t22);
    			append_dev(div9, p2);
    			p2.innerHTML = raw0_value;
    			append_dev(div13, t23);
    			append_dev(div13, div12);
    			append_dev(div12, div11);
    			append_dev(div11, h41);
    			append_dev(div11, t25);
    			html_tag.m(raw1_value, div11);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(span0, "click", pop, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if ((!current || dirty & /*tutor*/ 1) && t6_value !== (t6_value = /*tutor*/ ctx[0].name + "")) set_data_dev(t6, t6_value);

    			if (!current || dirty & /*tutor*/ 1 && !src_url_equal(img.src, img_src_value = /*tutor*/ ctx[0].img)) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if ((!current || dirty & /*tutor*/ 1) && t11_value !== (t11_value = /*tutor*/ ctx[0].name + "")) set_data_dev(t11, t11_value);
    			if ((!current || dirty & /*tutor*/ 1) && t13_value !== (t13_value = /*tutor*/ ctx[0].desc + "")) set_data_dev(t13, t13_value);
    			if ((!current || dirty & /*tutor*/ 1) && t15_value !== (t15_value = /*tutor*/ ctx[0].rating + "")) set_data_dev(t15, t15_value);
    			if ((!current || dirty & /*tutor*/ 1) && t18_value !== (t18_value = /*tutor*/ ctx[0].review + "")) set_data_dev(t18, t18_value);
    			if ((!current || dirty & /*tutor*/ 1) && raw0_value !== (raw0_value = /*tutor*/ ctx[0].about + "")) p2.innerHTML = raw0_value;			if ((!current || dirty & /*tutor*/ 1) && raw1_value !== (raw1_value = /*tutor*/ ctx[0].schedule + "")) html_tag.p(raw1_value);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(arrowleft.$$.fragment, local);
    			transition_in(starfill.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(arrowleft.$$.fragment, local);
    			transition_out(starfill.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(arrowleft);
    			destroy_component(starfill);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$j.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$j($$self, $$props, $$invalidate) {
    	let tutor;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('DetailTutor', slots, []);
    	let { params = {} } = $$props;

    	function findTutor(id) {
    		return Tutors[id];
    	}

    	const writable_props = ['params'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<DetailTutor> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('params' in $$props) $$invalidate(1, params = $$props.params);
    	};

    	$$self.$capture_state = () => ({
    		ArrowLeft: ArrowLeft$1,
    		StarFill: StarFill$1,
    		pop,
    		tutors: Tutors,
    		params,
    		findTutor,
    		tutor
    	});

    	$$self.$inject_state = $$props => {
    		if ('params' in $$props) $$invalidate(1, params = $$props.params);
    		if ('tutor' in $$props) $$invalidate(0, tutor = $$props.tutor);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*params*/ 2) {
    			$$invalidate(0, tutor = findTutor(parseInt(params.id)));
    		}
    	};

    	return [tutor, params];
    }

    class DetailTutor extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$j, create_fragment$j, safe_not_equal, { params: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "DetailTutor",
    			options,
    			id: create_fragment$j.name
    		});
    	}

    	get params() {
    		throw new Error("<DetailTutor>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set params(value) {
    		throw new Error("<DetailTutor>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\Hero.svelte generated by Svelte v3.48.0 */

    const file$f = "src\\component\\Hero.svelte";

    function create_fragment$i(ctx) {
    	let section;
    	let div3;
    	let div0;
    	let img;
    	let img_src_value;
    	let t0;
    	let div2;
    	let h2;
    	let t1;
    	let br;
    	let span;
    	let t3;
    	let t4;
    	let h3;
    	let t6;
    	let div1;
    	let a0;
    	let t8;
    	let a1;

    	const block = {
    		c: function create() {
    			section = element("section");
    			div3 = element("div");
    			div0 = element("div");
    			img = element("img");
    			t0 = space();
    			div2 = element("div");
    			h2 = element("h2");
    			t1 = text$1("Supporting Your Career in");
    			br = element("br");
    			span = element("span");
    			span.textContent = "Chemical Engineering";
    			t3 = text$1(" Field.");
    			t4 = space();
    			h3 = element("h3");
    			h3.textContent = "We have several certain quality programs, especially for you!";
    			t6 = space();
    			div1 = element("div");
    			a0 = element("a");
    			a0.textContent = "Register for Class";
    			t8 = space();
    			a1 = element("a");
    			a1.textContent = "Services";
    			if (!src_url_equal(img.src, img_src_value = "./assets/img/hero-img.webp")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			attr_dev(img, "class", "img-fluid");
    			add_location(img, file$f, 4, 8, 207);
    			attr_dev(div0, "class", "hero-img");
    			attr_dev(div0, "data-aos", "zoom-out");
    			attr_dev(div0, "data-aos-delay", "200");
    			add_location(div0, file$f, 3, 6, 134);
    			add_location(br, file$f, 8, 37, 398);
    			add_location(span, file$f, 8, 43, 404);
    			add_location(h2, file$f, 8, 8, 369);
    			add_location(h3, file$f, 9, 8, 459);
    			attr_dev(a0, "href", "https://torche.app/registration");
    			attr_dev(a0, "class", "btn-get-started scrollto");
    			add_location(a0, file$f, 11, 10, 556);
    			attr_dev(a1, "href", "#services");
    			attr_dev(a1, "class", "btn-services scrollto");
    			add_location(a1, file$f, 12, 10, 665);
    			add_location(div1, file$f, 10, 8, 539);
    			attr_dev(div2, "class", "hero-info");
    			attr_dev(div2, "data-aos", "zoom-in");
    			attr_dev(div2, "data-aos-delay", "100");
    			add_location(div2, file$f, 7, 6, 296);
    			attr_dev(div3, "class", "container");
    			attr_dev(div3, "data-aos", "fade-up");
    			add_location(div3, file$f, 2, 4, 84);
    			attr_dev(section, "id", "hero");
    			attr_dev(section, "class", "clearfix");
    			add_location(section, file$f, 1, 1, 42);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, div3);
    			append_dev(div3, div0);
    			append_dev(div0, img);
    			append_dev(div3, t0);
    			append_dev(div3, div2);
    			append_dev(div2, h2);
    			append_dev(h2, t1);
    			append_dev(h2, br);
    			append_dev(h2, span);
    			append_dev(h2, t3);
    			append_dev(div2, t4);
    			append_dev(div2, h3);
    			append_dev(div2, t6);
    			append_dev(div2, div1);
    			append_dev(div1, a0);
    			append_dev(div1, t8);
    			append_dev(div1, a1);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$i.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$i($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Hero', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Hero> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Hero extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$i, create_fragment$i, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Hero",
    			options,
    			id: create_fragment$i.name
    		});
    	}
    }

    /* src\pages\About.svelte generated by Svelte v3.48.0 */
    const file$e = "src\\pages\\About.svelte";

    function create_fragment$h(ctx) {
    	let section;
    	let div12;
    	let header;
    	let h3;
    	let t1;
    	let p0;
    	let t3;
    	let div8;
    	let div6;
    	let p1;
    	let t5;
    	let div1;
    	let div0;
    	let i0;
    	let cardchecklist;
    	let t6;
    	let h40;
    	let a0;
    	let t8;
    	let p2;
    	let t10;
    	let div3;
    	let div2;
    	let i1;
    	let wifi;
    	let t11;
    	let h41;
    	let a1;
    	let t13;
    	let p3;
    	let t15;
    	let div5;
    	let div4;
    	let i2;
    	let checklg;
    	let t16;
    	let h42;
    	let a2;
    	let t18;
    	let p4;
    	let t20;
    	let div7;
    	let img0;
    	let img0_src_value;
    	let t21;
    	let div11;
    	let div9;
    	let img1;
    	let img1_src_value;
    	let t22;
    	let div10;
    	let h43;
    	let t24;
    	let p5;
    	let t26;
    	let p6;
    	let current;

    	cardchecklist = new CardChecklist$1({
    			props: { width: 24, height: 24 },
    			$$inline: true
    		});

    	wifi = new Wifi$1({
    			props: { width: 24, height: 24 },
    			$$inline: true
    		});

    	checklg = new CheckLg$1({
    			props: { width: 24, height: 24 },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			section = element("section");
    			div12 = element("div");
    			header = element("header");
    			h3 = element("h3");
    			h3.textContent = "About Us";
    			t1 = space();
    			p0 = element("p");
    			p0.textContent = "TORCHE Education is an Education Technology Start-Up that set the goals to create a decentralized higher education platform on a global scale. In 2019, the four co-founders met and discussed the platform we wanted to develop.\r\n          Torche launched our e-tutoring classes, which cover four subjects of a process engineering study for Universitas Indonesia's students, on 21st September 2020.";
    			t3 = space();
    			div8 = element("div");
    			div6 = element("div");
    			p1 = element("p");
    			p1.textContent = "Today, TORCHE has more than 30 subjects available, with 800 unique students spread around more than 8 universities. We are committed to providing an accelerated, comprehensive, and internationally standardized higher\r\n            education to all chemical engineering, bioprocess engineering, and, in the future, all higher education students across the globe.";
    			t5 = space();
    			div1 = element("div");
    			div0 = element("div");
    			i0 = element("i");
    			create_component(cardchecklist.$$.fragment);
    			t6 = space();
    			h40 = element("h4");
    			a0 = element("a");
    			a0.textContent = "Internationally Standardized Curriculum";
    			t8 = space();
    			p2 = element("p");
    			p2.textContent = "TORCHE provides the best process engineering curriculum from top 5 universities in Indonesia combined with top 5 universities in the world.";
    			t10 = space();
    			div3 = element("div");
    			div2 = element("div");
    			i1 = element("i");
    			create_component(wifi.$$.fragment);
    			t11 = space();
    			h41 = element("h4");
    			a1 = element("a");
    			a1.textContent = "Full Online";
    			t13 = space();
    			p3 = element("p");
    			p3.textContent = "We held classes on-demand with premium meeting platforms (Google Meet and Zoom Meetings) and handout materials integrated to your Google Workspace account.";
    			t15 = space();
    			div5 = element("div");
    			div4 = element("div");
    			i2 = element("i");
    			create_component(checklg.$$.fragment);
    			t16 = space();
    			h42 = element("h4");
    			a2 = element("a");
    			a2.textContent = "Trusted";
    			t18 = space();
    			p4 = element("p");
    			p4.textContent = "Our tutors are qualified and trained to deliver the materials that suits the needs of our students from all around Indonesia.";
    			t20 = space();
    			div7 = element("div");
    			img0 = element("img");
    			t21 = space();
    			div11 = element("div");
    			div9 = element("div");
    			img1 = element("img");
    			t22 = space();
    			div10 = element("div");
    			h43 = element("h4");
    			h43.textContent = "Tutors Background";
    			t24 = space();
    			p5 = element("p");
    			p5.textContent = "TORCHE has tutors who are experts in their field and have experience working in national and multinational companies, both in Indonesia and abroad.";
    			t26 = space();
    			p6 = element("p");
    			p6.textContent = "These are some of our tutors' experiences and mastery.";
    			add_location(h3, file$e, 10, 8, 260);
    			attr_dev(p0, "class", "svelte-1jvbm2e");
    			add_location(p0, file$e, 11, 8, 287);
    			attr_dev(header, "class", "section-header svelte-1jvbm2e");
    			add_location(header, file$e, 9, 6, 219);
    			attr_dev(p1, "class", "svelte-1jvbm2e");
    			add_location(p1, file$e, 19, 10, 842);
    			attr_dev(i0, "class", "bi bi-card-checklist svelte-1jvbm2e");
    			add_location(i0, file$e, 25, 30, 1343);
    			attr_dev(div0, "class", "icon svelte-1jvbm2e");
    			add_location(div0, file$e, 25, 12, 1325);
    			attr_dev(a0, "href", "/#");
    			attr_dev(a0, "class", "svelte-1jvbm2e");
    			add_location(a0, file$e, 26, 30, 1456);
    			attr_dev(h40, "class", "title svelte-1jvbm2e");
    			add_location(h40, file$e, 26, 12, 1438);
    			attr_dev(p2, "class", "description svelte-1jvbm2e");
    			add_location(p2, file$e, 27, 12, 1531);
    			attr_dev(div1, "class", "icon-box svelte-1jvbm2e");
    			attr_dev(div1, "data-aos", "fade-up");
    			attr_dev(div1, "data-aos-delay", "100");
    			add_location(div1, file$e, 24, 10, 1249);
    			attr_dev(i1, "class", "bi bi-wifi svelte-1jvbm2e");
    			add_location(i1, file$e, 31, 30, 1823);
    			attr_dev(div2, "class", "icon svelte-1jvbm2e");
    			add_location(div2, file$e, 31, 12, 1805);
    			attr_dev(a1, "href", "/#");
    			attr_dev(a1, "class", "svelte-1jvbm2e");
    			add_location(a1, file$e, 32, 30, 1917);
    			attr_dev(h41, "class", "title svelte-1jvbm2e");
    			add_location(h41, file$e, 32, 12, 1899);
    			attr_dev(p3, "class", "description svelte-1jvbm2e");
    			add_location(p3, file$e, 33, 12, 1964);
    			attr_dev(div3, "class", "icon-box svelte-1jvbm2e");
    			attr_dev(div3, "data-aos", "fade-up");
    			attr_dev(div3, "data-aos-delay", "200");
    			add_location(div3, file$e, 30, 10, 1729);
    			attr_dev(i2, "class", "bi bi-check-lg svelte-1jvbm2e");
    			add_location(i2, file$e, 37, 30, 2272);
    			attr_dev(div4, "class", "icon svelte-1jvbm2e");
    			add_location(div4, file$e, 37, 12, 2254);
    			attr_dev(a2, "href", "/#");
    			attr_dev(a2, "class", "svelte-1jvbm2e");
    			add_location(a2, file$e, 38, 30, 2373);
    			attr_dev(h42, "class", "title svelte-1jvbm2e");
    			add_location(h42, file$e, 38, 12, 2355);
    			attr_dev(p4, "class", "description svelte-1jvbm2e");
    			add_location(p4, file$e, 39, 12, 2416);
    			attr_dev(div5, "class", "icon-box svelte-1jvbm2e");
    			attr_dev(div5, "data-aos", "fade-up");
    			attr_dev(div5, "data-aos-delay", "300");
    			add_location(div5, file$e, 36, 10, 2178);
    			attr_dev(div6, "class", "col-lg-6 content order-lg-1 order-2 svelte-1jvbm2e");
    			add_location(div6, file$e, 18, 8, 781);
    			if (!src_url_equal(img0.src, img0_src_value = "./assets/img/about-img.svg")) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "class", "img-fluid");
    			attr_dev(img0, "alt", "");
    			add_location(img0, file$e, 44, 10, 2689);
    			attr_dev(div7, "class", "col-lg-6 background order-lg-2 svelte-1jvbm2e");
    			attr_dev(div7, "data-aos", "zoom-in");
    			add_location(div7, file$e, 43, 8, 2614);
    			attr_dev(div8, "class", "row about-container");
    			add_location(div8, file$e, 17, 6, 738);
    			if (!src_url_equal(img1.src, img1_src_value = "./assets/img/quality-tutor.webp")) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "class", "img-fluid");
    			attr_dev(img1, "alt", "");
    			add_location(img1, file$e, 50, 10, 2889);
    			attr_dev(div9, "class", "col-lg-6");
    			attr_dev(div9, "data-aos", "fade-right");
    			add_location(div9, file$e, 49, 8, 2833);
    			attr_dev(h43, "class", "svelte-1jvbm2e");
    			add_location(h43, file$e, 53, 10, 3053);
    			attr_dev(p5, "class", "svelte-1jvbm2e");
    			add_location(p5, file$e, 54, 10, 3091);
    			attr_dev(p6, "class", "svelte-1jvbm2e");
    			add_location(p6, file$e, 55, 10, 3257);
    			attr_dev(div10, "class", "col-lg-6 pt-5 pt-lg-0");
    			attr_dev(div10, "data-aos", "fade-left");
    			add_location(div10, file$e, 52, 8, 2985);
    			attr_dev(div11, "class", "row about-extra svelte-1jvbm2e");
    			add_location(div11, file$e, 48, 6, 2794);
    			attr_dev(div12, "class", "container");
    			attr_dev(div12, "data-aos", "fade-up");
    			add_location(div12, file$e, 8, 4, 169);
    			attr_dev(section, "id", "about");
    			attr_dev(section, "class", "svelte-1jvbm2e");
    			add_location(section, file$e, 7, 2, 143);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, div12);
    			append_dev(div12, header);
    			append_dev(header, h3);
    			append_dev(header, t1);
    			append_dev(header, p0);
    			append_dev(div12, t3);
    			append_dev(div12, div8);
    			append_dev(div8, div6);
    			append_dev(div6, p1);
    			append_dev(div6, t5);
    			append_dev(div6, div1);
    			append_dev(div1, div0);
    			append_dev(div0, i0);
    			mount_component(cardchecklist, i0, null);
    			append_dev(div1, t6);
    			append_dev(div1, h40);
    			append_dev(h40, a0);
    			append_dev(div1, t8);
    			append_dev(div1, p2);
    			append_dev(div6, t10);
    			append_dev(div6, div3);
    			append_dev(div3, div2);
    			append_dev(div2, i1);
    			mount_component(wifi, i1, null);
    			append_dev(div3, t11);
    			append_dev(div3, h41);
    			append_dev(h41, a1);
    			append_dev(div3, t13);
    			append_dev(div3, p3);
    			append_dev(div6, t15);
    			append_dev(div6, div5);
    			append_dev(div5, div4);
    			append_dev(div4, i2);
    			mount_component(checklg, i2, null);
    			append_dev(div5, t16);
    			append_dev(div5, h42);
    			append_dev(h42, a2);
    			append_dev(div5, t18);
    			append_dev(div5, p4);
    			append_dev(div8, t20);
    			append_dev(div8, div7);
    			append_dev(div7, img0);
    			append_dev(div12, t21);
    			append_dev(div12, div11);
    			append_dev(div11, div9);
    			append_dev(div9, img1);
    			append_dev(div11, t22);
    			append_dev(div11, div10);
    			append_dev(div10, h43);
    			append_dev(div10, t24);
    			append_dev(div10, p5);
    			append_dev(div10, t26);
    			append_dev(div10, p6);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(cardchecklist.$$.fragment, local);
    			transition_in(wifi.$$.fragment, local);
    			transition_in(checklg.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(cardchecklist.$$.fragment, local);
    			transition_out(wifi.$$.fragment, local);
    			transition_out(checklg.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			destroy_component(cardchecklist);
    			destroy_component(wifi);
    			destroy_component(checklg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$h.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$h($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('About', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<About> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ CardChecklist: CardChecklist$1, CheckLg: CheckLg$1, Wifi: Wifi$1 });
    	return [];
    }

    class About extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$h, create_fragment$h, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "About",
    			options,
    			id: create_fragment$h.name
    		});
    	}
    }

    /* src\pages\Client.svelte generated by Svelte v3.48.0 */

    const file$d = "src\\pages\\Client.svelte";

    function create_fragment$g(ctx) {
    	let section;
    	let div18;
    	let div0;
    	let h3;
    	let t1;
    	let p;
    	let t3;
    	let div17;
    	let div2;
    	let div1;
    	let img0;
    	let img0_src_value;
    	let t4;
    	let div4;
    	let div3;
    	let img1;
    	let img1_src_value;
    	let t5;
    	let div6;
    	let div5;
    	let img2;
    	let img2_src_value;
    	let t6;
    	let div8;
    	let div7;
    	let img3;
    	let img3_src_value;
    	let t7;
    	let div10;
    	let div9;
    	let img4;
    	let img4_src_value;
    	let t8;
    	let div12;
    	let div11;
    	let img5;
    	let img5_src_value;
    	let t9;
    	let div14;
    	let div13;
    	let img6;
    	let img6_src_value;
    	let t10;
    	let div16;
    	let div15;
    	let img7;
    	let img7_src_value;

    	const block = {
    		c: function create() {
    			section = element("section");
    			div18 = element("div");
    			div0 = element("div");
    			h3 = element("h3");
    			h3.textContent = "Trusted by Academics & Professionals";
    			t1 = space();
    			p = element("p");
    			p.textContent = "University students, engineers, practitioners, and organizations from around Indonesia and International is satisfied with our services.";
    			t3 = space();
    			div17 = element("div");
    			div2 = element("div");
    			div1 = element("div");
    			img0 = element("img");
    			t4 = space();
    			div4 = element("div");
    			div3 = element("div");
    			img1 = element("img");
    			t5 = space();
    			div6 = element("div");
    			div5 = element("div");
    			img2 = element("img");
    			t6 = space();
    			div8 = element("div");
    			div7 = element("div");
    			img3 = element("img");
    			t7 = space();
    			div10 = element("div");
    			div9 = element("div");
    			img4 = element("img");
    			t8 = space();
    			div12 = element("div");
    			div11 = element("div");
    			img5 = element("img");
    			t9 = space();
    			div14 = element("div");
    			div13 = element("div");
    			img6 = element("img");
    			t10 = space();
    			div16 = element("div");
    			div15 = element("div");
    			img7 = element("img");
    			add_location(h3, file$d, 6, 8, 183);
    			add_location(p, file$d, 7, 8, 238);
    			attr_dev(div0, "class", "section-header svelte-ovjjlh");
    			add_location(div0, file$d, 5, 6, 145);
    			if (!src_url_equal(img0.src, img0_src_value = "./assets/img/clients/client-1.webp")) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "class", "img-fluid svelte-ovjjlh");
    			attr_dev(img0, "alt", "University of Indonesia");
    			add_location(img0, file$d, 13, 12, 589);
    			attr_dev(div1, "class", "client-logo svelte-ovjjlh");
    			add_location(div1, file$d, 12, 10, 550);
    			attr_dev(div2, "class", "col-lg-3 col-md-4 col-xs-6");
    			add_location(div2, file$d, 11, 8, 498);
    			if (!src_url_equal(img1.src, img1_src_value = "./assets/img/clients/client-2.webp")) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "class", "img-fluid svelte-ovjjlh");
    			attr_dev(img1, "alt", "Bandung Institute of Technology");
    			add_location(img1, file$d, 19, 12, 822);
    			attr_dev(div3, "class", "client-logo svelte-ovjjlh");
    			add_location(div3, file$d, 18, 10, 783);
    			attr_dev(div4, "class", "col-lg-3 col-md-4 col-xs-6");
    			add_location(div4, file$d, 17, 8, 731);
    			if (!src_url_equal(img2.src, img2_src_value = "./assets/img/clients/client-3.webp")) attr_dev(img2, "src", img2_src_value);
    			attr_dev(img2, "class", "img-fluid svelte-ovjjlh");
    			attr_dev(img2, "alt", "Sepuluh Nopember Institute of Technology");
    			add_location(img2, file$d, 25, 12, 1063);
    			attr_dev(div5, "class", "client-logo svelte-ovjjlh");
    			add_location(div5, file$d, 24, 10, 1024);
    			attr_dev(div6, "class", "col-lg-3 col-md-4 col-xs-6");
    			add_location(div6, file$d, 23, 8, 972);
    			if (!src_url_equal(img3.src, img3_src_value = "./assets/img/clients/client-4.webp")) attr_dev(img3, "src", img3_src_value);
    			attr_dev(img3, "class", "img-fluid svelte-ovjjlh");
    			attr_dev(img3, "alt", "Wageningen University and Research");
    			add_location(img3, file$d, 31, 12, 1313);
    			attr_dev(div7, "class", "client-logo svelte-ovjjlh");
    			add_location(div7, file$d, 30, 10, 1274);
    			attr_dev(div8, "class", "col-lg-3 col-md-4 col-xs-6");
    			add_location(div8, file$d, 29, 8, 1222);
    			if (!src_url_equal(img4.src, img4_src_value = "./assets/img/clients/client-5.webp")) attr_dev(img4, "src", img4_src_value);
    			attr_dev(img4, "class", "img-fluid svelte-ovjjlh");
    			attr_dev(img4, "alt", "Badan Koordinasi Kegiatan Mahasiswa Teknik Kimia Indonesia");
    			add_location(img4, file$d, 37, 12, 1557);
    			attr_dev(div9, "class", "client-logo svelte-ovjjlh");
    			add_location(div9, file$d, 36, 10, 1518);
    			attr_dev(div10, "class", "col-lg-3 col-md-4 col-xs-6");
    			add_location(div10, file$d, 35, 8, 1466);
    			if (!src_url_equal(img5.src, img5_src_value = "./assets/img/clients/client-6.webp")) attr_dev(img5, "src", img5_src_value);
    			attr_dev(img5, "class", "img-fluid svelte-ovjjlh");
    			attr_dev(img5, "alt", "Ikatan Mahasiswa Teknik Kimia Universitas Indonesia");
    			add_location(img5, file$d, 43, 12, 1825);
    			attr_dev(div11, "class", "client-logo svelte-ovjjlh");
    			add_location(div11, file$d, 42, 10, 1786);
    			attr_dev(div12, "class", "col-lg-3 col-md-4 col-xs-6");
    			add_location(div12, file$d, 41, 8, 1734);
    			if (!src_url_equal(img6.src, img6_src_value = "./assets/img/clients/client-7.webp")) attr_dev(img6, "src", img6_src_value);
    			attr_dev(img6, "class", "img-fluid svelte-ovjjlh");
    			attr_dev(img6, "alt", "Society of Biological Engineering Universitas Indonesia Student Chapter");
    			add_location(img6, file$d, 49, 12, 2086);
    			attr_dev(div13, "class", "client-logo svelte-ovjjlh");
    			add_location(div13, file$d, 48, 10, 2047);
    			attr_dev(div14, "class", "col-lg-3 col-md-4 col-xs-6");
    			add_location(div14, file$d, 47, 8, 1995);
    			if (!src_url_equal(img7.src, img7_src_value = "./assets/img/clients/client-8.webp")) attr_dev(img7, "src", img7_src_value);
    			attr_dev(img7, "class", "img-fluid svelte-ovjjlh");
    			attr_dev(img7, "alt", "American Institute of Chemical Engineering Universitas Indonesia Student Chapter");
    			add_location(img7, file$d, 55, 12, 2367);
    			attr_dev(div15, "class", "client-logo svelte-ovjjlh");
    			add_location(div15, file$d, 54, 10, 2328);
    			attr_dev(div16, "class", "col-lg-3 col-md-4 col-xs-6");
    			add_location(div16, file$d, 53, 8, 2276);
    			attr_dev(div17, "class", "row g-0 clients-wrap clearfix svelte-ovjjlh");
    			attr_dev(div17, "data-aos", "zoom-in");
    			attr_dev(div17, "data-aos-delay", "100");
    			add_location(div17, file$d, 10, 6, 405);
    			attr_dev(div18, "class", "container");
    			attr_dev(div18, "data-aos", "fade-up");
    			add_location(div18, file$d, 4, 4, 95);
    			attr_dev(section, "id", "clients");
    			attr_dev(section, "class", "section-bg svelte-ovjjlh");
    			add_location(section, file$d, 3, 1, 48);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, div18);
    			append_dev(div18, div0);
    			append_dev(div0, h3);
    			append_dev(div0, t1);
    			append_dev(div0, p);
    			append_dev(div18, t3);
    			append_dev(div18, div17);
    			append_dev(div17, div2);
    			append_dev(div2, div1);
    			append_dev(div1, img0);
    			append_dev(div17, t4);
    			append_dev(div17, div4);
    			append_dev(div4, div3);
    			append_dev(div3, img1);
    			append_dev(div17, t5);
    			append_dev(div17, div6);
    			append_dev(div6, div5);
    			append_dev(div5, img2);
    			append_dev(div17, t6);
    			append_dev(div17, div8);
    			append_dev(div8, div7);
    			append_dev(div7, img3);
    			append_dev(div17, t7);
    			append_dev(div17, div10);
    			append_dev(div10, div9);
    			append_dev(div9, img4);
    			append_dev(div17, t8);
    			append_dev(div17, div12);
    			append_dev(div12, div11);
    			append_dev(div11, img5);
    			append_dev(div17, t9);
    			append_dev(div17, div14);
    			append_dev(div14, div13);
    			append_dev(div13, img6);
    			append_dev(div17, t10);
    			append_dev(div17, div16);
    			append_dev(div16, div15);
    			append_dev(div15, img7);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$g.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$g($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Client', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Client> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Client extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$g, create_fragment$g, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Client",
    			options,
    			id: create_fragment$g.name
    		});
    	}
    }

    /* src\pages\Contact.svelte generated by Svelte v3.48.0 */

    const file$c = "src\\pages\\Contact.svelte";

    function create_fragment$f(ctx) {
    	let section;
    	let div10;
    	let div0;
    	let h3;
    	let t1;
    	let div9;
    	let div8;
    	let div7;
    	let div1;
    	let i0;
    	let envelope;
    	let t2;
    	let p0;
    	let t4;
    	let div2;
    	let i1;
    	let whatsapp;
    	let t5;
    	let p1;
    	let t7;
    	let div3;
    	let i2;
    	let line;
    	let t8;
    	let p2;
    	let t10;
    	let div4;
    	let i3;
    	let twitter;
    	let t11;
    	let p3;
    	let t13;
    	let div5;
    	let i4;
    	let instagram;
    	let t14;
    	let p4;
    	let t16;
    	let div6;
    	let i5;
    	let linkedin;
    	let t17;
    	let p5;
    	let current;

    	envelope = new Envelope$1({
    			props: { width: 28, height: 28 },
    			$$inline: true
    		});

    	whatsapp = new Whatsapp$1({
    			props: { width: 28, height: 28 },
    			$$inline: true
    		});

    	line = new Line$1({
    			props: { width: 28, height: 28 },
    			$$inline: true
    		});

    	twitter = new Twitter$1({
    			props: { width: 28, height: 28 },
    			$$inline: true
    		});

    	instagram = new Instagram$1({
    			props: { width: 28, height: 28 },
    			$$inline: true
    		});

    	linkedin = new Linkedin$1({
    			props: { width: 28, height: 28 },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			section = element("section");
    			div10 = element("div");
    			div0 = element("div");
    			h3 = element("h3");
    			h3.textContent = "Contact Us";
    			t1 = space();
    			div9 = element("div");
    			div8 = element("div");
    			div7 = element("div");
    			div1 = element("div");
    			i0 = element("i");
    			create_component(envelope.$$.fragment);
    			t2 = space();
    			p0 = element("p");
    			p0.textContent = "admin@torche.app";
    			t4 = space();
    			div2 = element("div");
    			i1 = element("i");
    			create_component(whatsapp.$$.fragment);
    			t5 = space();
    			p1 = element("p");
    			p1.textContent = "+62 851 5521 6117";
    			t7 = space();
    			div3 = element("div");
    			i2 = element("i");
    			create_component(line.$$.fragment);
    			t8 = space();
    			p2 = element("p");
    			p2.textContent = "@229wiguf";
    			t10 = space();
    			div4 = element("div");
    			i3 = element("i");
    			create_component(twitter.$$.fragment);
    			t11 = space();
    			p3 = element("p");
    			p3.textContent = "@TorcheEdu";
    			t13 = space();
    			div5 = element("div");
    			i4 = element("i");
    			create_component(instagram.$$.fragment);
    			t14 = space();
    			p4 = element("p");
    			p4.textContent = "@torche.app";
    			t16 = space();
    			div6 = element("div");
    			i5 = element("i");
    			create_component(linkedin.$$.fragment);
    			t17 = space();
    			p5 = element("p");
    			p5.textContent = "TORCHE Education";
    			add_location(h3, file$c, 11, 8, 291);
    			attr_dev(div0, "class", "section-header");
    			add_location(div0, file$c, 10, 6, 253);
    			attr_dev(i0, "class", "bi bi-envelope");
    			add_location(i0, file$c, 18, 14, 470);
    			add_location(p0, file$c, 19, 14, 550);
    			attr_dev(div1, "class", "col-md-2 info");
    			add_location(div1, file$c, 17, 12, 427);
    			attr_dev(i1, "class", "bi bi-whatsapp");
    			add_location(i1, file$c, 22, 14, 650);
    			add_location(p1, file$c, 23, 14, 730);
    			attr_dev(div2, "class", "col-md-2 info");
    			add_location(div2, file$c, 21, 12, 607);
    			attr_dev(i2, "class", "bi bi-line");
    			add_location(i2, file$c, 26, 14, 831);
    			add_location(p2, file$c, 27, 14, 903);
    			attr_dev(div3, "class", "col-md-2 info");
    			add_location(div3, file$c, 25, 12, 788);
    			attr_dev(i3, "class", "bi bi-twitter");
    			add_location(i3, file$c, 30, 14, 996);
    			add_location(p3, file$c, 31, 14, 1074);
    			attr_dev(div4, "class", "col-md-2 info");
    			add_location(div4, file$c, 29, 12, 953);
    			attr_dev(i4, "class", "bi bi-instagram");
    			add_location(i4, file$c, 34, 14, 1168);
    			add_location(p4, file$c, 35, 14, 1250);
    			attr_dev(div5, "class", "col-md-2 info");
    			add_location(div5, file$c, 33, 12, 1125);
    			attr_dev(i5, "class", "bi bi-linkedin");
    			add_location(i5, file$c, 38, 14, 1345);
    			add_location(p5, file$c, 39, 14, 1425);
    			attr_dev(div6, "class", "col-md-2 info");
    			add_location(div6, file$c, 37, 12, 1302);
    			attr_dev(div7, "class", "row");
    			add_location(div7, file$c, 16, 10, 396);
    			attr_dev(div8, "class", "col-lg-12");
    			add_location(div8, file$c, 15, 8, 361);
    			attr_dev(div9, "class", "row");
    			add_location(div9, file$c, 14, 6, 334);
    			attr_dev(div10, "class", "container-fluid");
    			attr_dev(div10, "data-aos", "fade-up");
    			add_location(div10, file$c, 9, 4, 197);
    			attr_dev(section, "id", "contact");
    			add_location(section, file$c, 8, 0, 169);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, div10);
    			append_dev(div10, div0);
    			append_dev(div0, h3);
    			append_dev(div10, t1);
    			append_dev(div10, div9);
    			append_dev(div9, div8);
    			append_dev(div8, div7);
    			append_dev(div7, div1);
    			append_dev(div1, i0);
    			mount_component(envelope, i0, null);
    			append_dev(div1, t2);
    			append_dev(div1, p0);
    			append_dev(div7, t4);
    			append_dev(div7, div2);
    			append_dev(div2, i1);
    			mount_component(whatsapp, i1, null);
    			append_dev(div2, t5);
    			append_dev(div2, p1);
    			append_dev(div7, t7);
    			append_dev(div7, div3);
    			append_dev(div3, i2);
    			mount_component(line, i2, null);
    			append_dev(div3, t8);
    			append_dev(div3, p2);
    			append_dev(div7, t10);
    			append_dev(div7, div4);
    			append_dev(div4, i3);
    			mount_component(twitter, i3, null);
    			append_dev(div4, t11);
    			append_dev(div4, p3);
    			append_dev(div7, t13);
    			append_dev(div7, div5);
    			append_dev(div5, i4);
    			mount_component(instagram, i4, null);
    			append_dev(div5, t14);
    			append_dev(div5, p4);
    			append_dev(div7, t16);
    			append_dev(div7, div6);
    			append_dev(div6, i5);
    			mount_component(linkedin, i5, null);
    			append_dev(div6, t17);
    			append_dev(div6, p5);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(envelope.$$.fragment, local);
    			transition_in(whatsapp.$$.fragment, local);
    			transition_in(line.$$.fragment, local);
    			transition_in(twitter.$$.fragment, local);
    			transition_in(instagram.$$.fragment, local);
    			transition_in(linkedin.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(envelope.$$.fragment, local);
    			transition_out(whatsapp.$$.fragment, local);
    			transition_out(line.$$.fragment, local);
    			transition_out(twitter.$$.fragment, local);
    			transition_out(instagram.$$.fragment, local);
    			transition_out(linkedin.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			destroy_component(envelope);
    			destroy_component(whatsapp);
    			destroy_component(line);
    			destroy_component(twitter);
    			destroy_component(instagram);
    			destroy_component(linkedin);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$f.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$f($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Contact', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Contact> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Envelope: Envelope$1,
    		Instagram: Instagram$1,
    		Line: Line$1,
    		Linkedin: Linkedin$1,
    		Twitter: Twitter$1,
    		Whatsapp: Whatsapp$1
    	});

    	return [];
    }

    class Contact extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$f, create_fragment$f, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Contact",
    			options,
    			id: create_fragment$f.name
    		});
    	}
    }

    /**
     * SSR Window 4.0.2
     * Better handling for window object in SSR environment
     * https://github.com/nolimits4web/ssr-window
     *
     * Copyright 2021, Vladimir Kharlampidi
     *
     * Licensed under MIT
     *
     * Released on: December 13, 2021
     */
    /* eslint-disable no-param-reassign */
    function isObject$2(obj) {
        return (obj !== null &&
            typeof obj === 'object' &&
            'constructor' in obj &&
            obj.constructor === Object);
    }
    function extend$2(target = {}, src = {}) {
        Object.keys(src).forEach((key) => {
            if (typeof target[key] === 'undefined')
                target[key] = src[key];
            else if (isObject$2(src[key]) &&
                isObject$2(target[key]) &&
                Object.keys(src[key]).length > 0) {
                extend$2(target[key], src[key]);
            }
        });
    }

    const ssrDocument = {
        body: {},
        addEventListener() { },
        removeEventListener() { },
        activeElement: {
            blur() { },
            nodeName: '',
        },
        querySelector() {
            return null;
        },
        querySelectorAll() {
            return [];
        },
        getElementById() {
            return null;
        },
        createEvent() {
            return {
                initEvent() { },
            };
        },
        createElement() {
            return {
                children: [],
                childNodes: [],
                style: {},
                setAttribute() { },
                getElementsByTagName() {
                    return [];
                },
            };
        },
        createElementNS() {
            return {};
        },
        importNode() {
            return null;
        },
        location: {
            hash: '',
            host: '',
            hostname: '',
            href: '',
            origin: '',
            pathname: '',
            protocol: '',
            search: '',
        },
    };
    function getDocument() {
        const doc = typeof document !== 'undefined' ? document : {};
        extend$2(doc, ssrDocument);
        return doc;
    }

    const ssrWindow = {
        document: ssrDocument,
        navigator: {
            userAgent: '',
        },
        location: {
            hash: '',
            host: '',
            hostname: '',
            href: '',
            origin: '',
            pathname: '',
            protocol: '',
            search: '',
        },
        history: {
            replaceState() { },
            pushState() { },
            go() { },
            back() { },
        },
        CustomEvent: function CustomEvent() {
            return this;
        },
        addEventListener() { },
        removeEventListener() { },
        getComputedStyle() {
            return {
                getPropertyValue() {
                    return '';
                },
            };
        },
        Image() { },
        Date() { },
        screen: {},
        setTimeout() { },
        clearTimeout() { },
        matchMedia() {
            return {};
        },
        requestAnimationFrame(callback) {
            if (typeof setTimeout === 'undefined') {
                callback();
                return null;
            }
            return setTimeout(callback, 0);
        },
        cancelAnimationFrame(id) {
            if (typeof setTimeout === 'undefined') {
                return;
            }
            clearTimeout(id);
        },
    };
    function getWindow() {
        const win = typeof window !== 'undefined' ? window : {};
        extend$2(win, ssrWindow);
        return win;
    }

    /**
     * Dom7 4.0.4
     * Minimalistic JavaScript library for DOM manipulation, with a jQuery-compatible API
     * https://framework7.io/docs/dom7.html
     *
     * Copyright 2022, Vladimir Kharlampidi
     *
     * Licensed under MIT
     *
     * Released on: January 11, 2022
     */

    /* eslint-disable no-proto */
    function makeReactive(obj) {
      const proto = obj.__proto__;
      Object.defineProperty(obj, '__proto__', {
        get() {
          return proto;
        },

        set(value) {
          proto.__proto__ = value;
        }

      });
    }

    class Dom7 extends Array {
      constructor(items) {
        if (typeof items === 'number') {
          super(items);
        } else {
          super(...(items || []));
          makeReactive(this);
        }
      }

    }

    function arrayFlat(arr = []) {
      const res = [];
      arr.forEach(el => {
        if (Array.isArray(el)) {
          res.push(...arrayFlat(el));
        } else {
          res.push(el);
        }
      });
      return res;
    }
    function arrayFilter(arr, callback) {
      return Array.prototype.filter.call(arr, callback);
    }
    function arrayUnique(arr) {
      const uniqueArray = [];

      for (let i = 0; i < arr.length; i += 1) {
        if (uniqueArray.indexOf(arr[i]) === -1) uniqueArray.push(arr[i]);
      }

      return uniqueArray;
    }

    // eslint-disable-next-line

    function qsa(selector, context) {
      if (typeof selector !== 'string') {
        return [selector];
      }

      const a = [];
      const res = context.querySelectorAll(selector);

      for (let i = 0; i < res.length; i += 1) {
        a.push(res[i]);
      }

      return a;
    }

    function $(selector, context) {
      const window = getWindow();
      const document = getDocument();
      let arr = [];

      if (!context && selector instanceof Dom7) {
        return selector;
      }

      if (!selector) {
        return new Dom7(arr);
      }

      if (typeof selector === 'string') {
        const html = selector.trim();

        if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
          let toCreate = 'div';
          if (html.indexOf('<li') === 0) toCreate = 'ul';
          if (html.indexOf('<tr') === 0) toCreate = 'tbody';
          if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) toCreate = 'tr';
          if (html.indexOf('<tbody') === 0) toCreate = 'table';
          if (html.indexOf('<option') === 0) toCreate = 'select';
          const tempParent = document.createElement(toCreate);
          tempParent.innerHTML = html;

          for (let i = 0; i < tempParent.childNodes.length; i += 1) {
            arr.push(tempParent.childNodes[i]);
          }
        } else {
          arr = qsa(selector.trim(), context || document);
        } // arr = qsa(selector, document);

      } else if (selector.nodeType || selector === window || selector === document) {
        arr.push(selector);
      } else if (Array.isArray(selector)) {
        if (selector instanceof Dom7) return selector;
        arr = selector;
      }

      return new Dom7(arrayUnique(arr));
    }

    $.fn = Dom7.prototype;

    // eslint-disable-next-line

    function addClass(...classes) {
      const classNames = arrayFlat(classes.map(c => c.split(' ')));
      this.forEach(el => {
        el.classList.add(...classNames);
      });
      return this;
    }

    function removeClass(...classes) {
      const classNames = arrayFlat(classes.map(c => c.split(' ')));
      this.forEach(el => {
        el.classList.remove(...classNames);
      });
      return this;
    }

    function toggleClass(...classes) {
      const classNames = arrayFlat(classes.map(c => c.split(' ')));
      this.forEach(el => {
        classNames.forEach(className => {
          el.classList.toggle(className);
        });
      });
    }

    function hasClass(...classes) {
      const classNames = arrayFlat(classes.map(c => c.split(' ')));
      return arrayFilter(this, el => {
        return classNames.filter(className => el.classList.contains(className)).length > 0;
      }).length > 0;
    }

    function attr(attrs, value) {
      if (arguments.length === 1 && typeof attrs === 'string') {
        // Get attr
        if (this[0]) return this[0].getAttribute(attrs);
        return undefined;
      } // Set attrs


      for (let i = 0; i < this.length; i += 1) {
        if (arguments.length === 2) {
          // String
          this[i].setAttribute(attrs, value);
        } else {
          // Object
          for (const attrName in attrs) {
            this[i][attrName] = attrs[attrName];
            this[i].setAttribute(attrName, attrs[attrName]);
          }
        }
      }

      return this;
    }

    function removeAttr(attr) {
      for (let i = 0; i < this.length; i += 1) {
        this[i].removeAttribute(attr);
      }

      return this;
    }

    function transform(transform) {
      for (let i = 0; i < this.length; i += 1) {
        this[i].style.transform = transform;
      }

      return this;
    }

    function transition$1(duration) {
      for (let i = 0; i < this.length; i += 1) {
        this[i].style.transitionDuration = typeof duration !== 'string' ? `${duration}ms` : duration;
      }

      return this;
    }

    function on(...args) {
      let [eventType, targetSelector, listener, capture] = args;

      if (typeof args[1] === 'function') {
        [eventType, listener, capture] = args;
        targetSelector = undefined;
      }

      if (!capture) capture = false;

      function handleLiveEvent(e) {
        const target = e.target;
        if (!target) return;
        const eventData = e.target.dom7EventData || [];

        if (eventData.indexOf(e) < 0) {
          eventData.unshift(e);
        }

        if ($(target).is(targetSelector)) listener.apply(target, eventData);else {
          const parents = $(target).parents(); // eslint-disable-line

          for (let k = 0; k < parents.length; k += 1) {
            if ($(parents[k]).is(targetSelector)) listener.apply(parents[k], eventData);
          }
        }
      }

      function handleEvent(e) {
        const eventData = e && e.target ? e.target.dom7EventData || [] : [];

        if (eventData.indexOf(e) < 0) {
          eventData.unshift(e);
        }

        listener.apply(this, eventData);
      }

      const events = eventType.split(' ');
      let j;

      for (let i = 0; i < this.length; i += 1) {
        const el = this[i];

        if (!targetSelector) {
          for (j = 0; j < events.length; j += 1) {
            const event = events[j];
            if (!el.dom7Listeners) el.dom7Listeners = {};
            if (!el.dom7Listeners[event]) el.dom7Listeners[event] = [];
            el.dom7Listeners[event].push({
              listener,
              proxyListener: handleEvent
            });
            el.addEventListener(event, handleEvent, capture);
          }
        } else {
          // Live events
          for (j = 0; j < events.length; j += 1) {
            const event = events[j];
            if (!el.dom7LiveListeners) el.dom7LiveListeners = {};
            if (!el.dom7LiveListeners[event]) el.dom7LiveListeners[event] = [];
            el.dom7LiveListeners[event].push({
              listener,
              proxyListener: handleLiveEvent
            });
            el.addEventListener(event, handleLiveEvent, capture);
          }
        }
      }

      return this;
    }

    function off(...args) {
      let [eventType, targetSelector, listener, capture] = args;

      if (typeof args[1] === 'function') {
        [eventType, listener, capture] = args;
        targetSelector = undefined;
      }

      if (!capture) capture = false;
      const events = eventType.split(' ');

      for (let i = 0; i < events.length; i += 1) {
        const event = events[i];

        for (let j = 0; j < this.length; j += 1) {
          const el = this[j];
          let handlers;

          if (!targetSelector && el.dom7Listeners) {
            handlers = el.dom7Listeners[event];
          } else if (targetSelector && el.dom7LiveListeners) {
            handlers = el.dom7LiveListeners[event];
          }

          if (handlers && handlers.length) {
            for (let k = handlers.length - 1; k >= 0; k -= 1) {
              const handler = handlers[k];

              if (listener && handler.listener === listener) {
                el.removeEventListener(event, handler.proxyListener, capture);
                handlers.splice(k, 1);
              } else if (listener && handler.listener && handler.listener.dom7proxy && handler.listener.dom7proxy === listener) {
                el.removeEventListener(event, handler.proxyListener, capture);
                handlers.splice(k, 1);
              } else if (!listener) {
                el.removeEventListener(event, handler.proxyListener, capture);
                handlers.splice(k, 1);
              }
            }
          }
        }
      }

      return this;
    }

    function trigger(...args) {
      const window = getWindow();
      const events = args[0].split(' ');
      const eventData = args[1];

      for (let i = 0; i < events.length; i += 1) {
        const event = events[i];

        for (let j = 0; j < this.length; j += 1) {
          const el = this[j];

          if (window.CustomEvent) {
            const evt = new window.CustomEvent(event, {
              detail: eventData,
              bubbles: true,
              cancelable: true
            });
            el.dom7EventData = args.filter((data, dataIndex) => dataIndex > 0);
            el.dispatchEvent(evt);
            el.dom7EventData = [];
            delete el.dom7EventData;
          }
        }
      }

      return this;
    }

    function transitionEnd$1(callback) {
      const dom = this;

      function fireCallBack(e) {
        if (e.target !== this) return;
        callback.call(this, e);
        dom.off('transitionend', fireCallBack);
      }

      if (callback) {
        dom.on('transitionend', fireCallBack);
      }

      return this;
    }

    function outerWidth(includeMargins) {
      if (this.length > 0) {
        if (includeMargins) {
          const styles = this.styles();
          return this[0].offsetWidth + parseFloat(styles.getPropertyValue('margin-right')) + parseFloat(styles.getPropertyValue('margin-left'));
        }

        return this[0].offsetWidth;
      }

      return null;
    }

    function outerHeight(includeMargins) {
      if (this.length > 0) {
        if (includeMargins) {
          const styles = this.styles();
          return this[0].offsetHeight + parseFloat(styles.getPropertyValue('margin-top')) + parseFloat(styles.getPropertyValue('margin-bottom'));
        }

        return this[0].offsetHeight;
      }

      return null;
    }

    function offset() {
      if (this.length > 0) {
        const window = getWindow();
        const document = getDocument();
        const el = this[0];
        const box = el.getBoundingClientRect();
        const body = document.body;
        const clientTop = el.clientTop || body.clientTop || 0;
        const clientLeft = el.clientLeft || body.clientLeft || 0;
        const scrollTop = el === window ? window.scrollY : el.scrollTop;
        const scrollLeft = el === window ? window.scrollX : el.scrollLeft;
        return {
          top: box.top + scrollTop - clientTop,
          left: box.left + scrollLeft - clientLeft
        };
      }

      return null;
    }

    function styles() {
      const window = getWindow();
      if (this[0]) return window.getComputedStyle(this[0], null);
      return {};
    }

    function css(props, value) {
      const window = getWindow();
      let i;

      if (arguments.length === 1) {
        if (typeof props === 'string') {
          // .css('width')
          if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(props);
        } else {
          // .css({ width: '100px' })
          for (i = 0; i < this.length; i += 1) {
            for (const prop in props) {
              this[i].style[prop] = props[prop];
            }
          }

          return this;
        }
      }

      if (arguments.length === 2 && typeof props === 'string') {
        // .css('width', '100px')
        for (i = 0; i < this.length; i += 1) {
          this[i].style[props] = value;
        }

        return this;
      }

      return this;
    }

    function each(callback) {
      if (!callback) return this;
      this.forEach((el, index) => {
        callback.apply(el, [el, index]);
      });
      return this;
    }

    function filter(callback) {
      const result = arrayFilter(this, callback);
      return $(result);
    }

    function html(html) {
      if (typeof html === 'undefined') {
        return this[0] ? this[0].innerHTML : null;
      }

      for (let i = 0; i < this.length; i += 1) {
        this[i].innerHTML = html;
      }

      return this;
    }

    function text(text) {
      if (typeof text === 'undefined') {
        return this[0] ? this[0].textContent.trim() : null;
      }

      for (let i = 0; i < this.length; i += 1) {
        this[i].textContent = text;
      }

      return this;
    }

    function is(selector) {
      const window = getWindow();
      const document = getDocument();
      const el = this[0];
      let compareWith;
      let i;
      if (!el || typeof selector === 'undefined') return false;

      if (typeof selector === 'string') {
        if (el.matches) return el.matches(selector);
        if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector);
        if (el.msMatchesSelector) return el.msMatchesSelector(selector);
        compareWith = $(selector);

        for (i = 0; i < compareWith.length; i += 1) {
          if (compareWith[i] === el) return true;
        }

        return false;
      }

      if (selector === document) {
        return el === document;
      }

      if (selector === window) {
        return el === window;
      }

      if (selector.nodeType || selector instanceof Dom7) {
        compareWith = selector.nodeType ? [selector] : selector;

        for (i = 0; i < compareWith.length; i += 1) {
          if (compareWith[i] === el) return true;
        }

        return false;
      }

      return false;
    }

    function index() {
      let child = this[0];
      let i;

      if (child) {
        i = 0; // eslint-disable-next-line

        while ((child = child.previousSibling) !== null) {
          if (child.nodeType === 1) i += 1;
        }

        return i;
      }

      return undefined;
    }

    function eq(index) {
      if (typeof index === 'undefined') return this;
      const length = this.length;

      if (index > length - 1) {
        return $([]);
      }

      if (index < 0) {
        const returnIndex = length + index;
        if (returnIndex < 0) return $([]);
        return $([this[returnIndex]]);
      }

      return $([this[index]]);
    }

    function append(...els) {
      let newChild;
      const document = getDocument();

      for (let k = 0; k < els.length; k += 1) {
        newChild = els[k];

        for (let i = 0; i < this.length; i += 1) {
          if (typeof newChild === 'string') {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = newChild;

            while (tempDiv.firstChild) {
              this[i].appendChild(tempDiv.firstChild);
            }
          } else if (newChild instanceof Dom7) {
            for (let j = 0; j < newChild.length; j += 1) {
              this[i].appendChild(newChild[j]);
            }
          } else {
            this[i].appendChild(newChild);
          }
        }
      }

      return this;
    }

    function prepend(newChild) {
      const document = getDocument();
      let i;
      let j;

      for (i = 0; i < this.length; i += 1) {
        if (typeof newChild === 'string') {
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = newChild;

          for (j = tempDiv.childNodes.length - 1; j >= 0; j -= 1) {
            this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
          }
        } else if (newChild instanceof Dom7) {
          for (j = 0; j < newChild.length; j += 1) {
            this[i].insertBefore(newChild[j], this[i].childNodes[0]);
          }
        } else {
          this[i].insertBefore(newChild, this[i].childNodes[0]);
        }
      }

      return this;
    }

    function next(selector) {
      if (this.length > 0) {
        if (selector) {
          if (this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector)) {
            return $([this[0].nextElementSibling]);
          }

          return $([]);
        }

        if (this[0].nextElementSibling) return $([this[0].nextElementSibling]);
        return $([]);
      }

      return $([]);
    }

    function nextAll(selector) {
      const nextEls = [];
      let el = this[0];
      if (!el) return $([]);

      while (el.nextElementSibling) {
        const next = el.nextElementSibling; // eslint-disable-line

        if (selector) {
          if ($(next).is(selector)) nextEls.push(next);
        } else nextEls.push(next);

        el = next;
      }

      return $(nextEls);
    }

    function prev(selector) {
      if (this.length > 0) {
        const el = this[0];

        if (selector) {
          if (el.previousElementSibling && $(el.previousElementSibling).is(selector)) {
            return $([el.previousElementSibling]);
          }

          return $([]);
        }

        if (el.previousElementSibling) return $([el.previousElementSibling]);
        return $([]);
      }

      return $([]);
    }

    function prevAll(selector) {
      const prevEls = [];
      let el = this[0];
      if (!el) return $([]);

      while (el.previousElementSibling) {
        const prev = el.previousElementSibling; // eslint-disable-line

        if (selector) {
          if ($(prev).is(selector)) prevEls.push(prev);
        } else prevEls.push(prev);

        el = prev;
      }

      return $(prevEls);
    }

    function parent(selector) {
      const parents = []; // eslint-disable-line

      for (let i = 0; i < this.length; i += 1) {
        if (this[i].parentNode !== null) {
          if (selector) {
            if ($(this[i].parentNode).is(selector)) parents.push(this[i].parentNode);
          } else {
            parents.push(this[i].parentNode);
          }
        }
      }

      return $(parents);
    }

    function parents(selector) {
      const parents = []; // eslint-disable-line

      for (let i = 0; i < this.length; i += 1) {
        let parent = this[i].parentNode; // eslint-disable-line

        while (parent) {
          if (selector) {
            if ($(parent).is(selector)) parents.push(parent);
          } else {
            parents.push(parent);
          }

          parent = parent.parentNode;
        }
      }

      return $(parents);
    }

    function closest(selector) {
      let closest = this; // eslint-disable-line

      if (typeof selector === 'undefined') {
        return $([]);
      }

      if (!closest.is(selector)) {
        closest = closest.parents(selector).eq(0);
      }

      return closest;
    }

    function find(selector) {
      const foundElements = [];

      for (let i = 0; i < this.length; i += 1) {
        const found = this[i].querySelectorAll(selector);

        for (let j = 0; j < found.length; j += 1) {
          foundElements.push(found[j]);
        }
      }

      return $(foundElements);
    }

    function children(selector) {
      const children = []; // eslint-disable-line

      for (let i = 0; i < this.length; i += 1) {
        const childNodes = this[i].children;

        for (let j = 0; j < childNodes.length; j += 1) {
          if (!selector || $(childNodes[j]).is(selector)) {
            children.push(childNodes[j]);
          }
        }
      }

      return $(children);
    }

    function remove() {
      for (let i = 0; i < this.length; i += 1) {
        if (this[i].parentNode) this[i].parentNode.removeChild(this[i]);
      }

      return this;
    }

    const Methods = {
      addClass,
      removeClass,
      hasClass,
      toggleClass,
      attr,
      removeAttr,
      transform,
      transition: transition$1,
      on,
      off,
      trigger,
      transitionEnd: transitionEnd$1,
      outerWidth,
      outerHeight,
      styles,
      offset,
      css,
      each,
      html,
      text,
      is,
      index,
      eq,
      append,
      prepend,
      next,
      nextAll,
      prev,
      prevAll,
      parent,
      parents,
      closest,
      find,
      children,
      filter,
      remove
    };
    Object.keys(Methods).forEach(methodName => {
      Object.defineProperty($.fn, methodName, {
        value: Methods[methodName],
        writable: true
      });
    });

    function deleteProps(obj) {
      const object = obj;
      Object.keys(object).forEach(key => {
        try {
          object[key] = null;
        } catch (e) {// no getter for object
        }

        try {
          delete object[key];
        } catch (e) {// something got wrong
        }
      });
    }

    function nextTick(callback, delay) {
      if (delay === void 0) {
        delay = 0;
      }

      return setTimeout(callback, delay);
    }

    function now() {
      return Date.now();
    }

    function getComputedStyle$1(el) {
      const window = getWindow();
      let style;

      if (window.getComputedStyle) {
        style = window.getComputedStyle(el, null);
      }

      if (!style && el.currentStyle) {
        style = el.currentStyle;
      }

      if (!style) {
        style = el.style;
      }

      return style;
    }

    function getTranslate(el, axis) {
      if (axis === void 0) {
        axis = 'x';
      }

      const window = getWindow();
      let matrix;
      let curTransform;
      let transformMatrix;
      const curStyle = getComputedStyle$1(el);

      if (window.WebKitCSSMatrix) {
        curTransform = curStyle.transform || curStyle.webkitTransform;

        if (curTransform.split(',').length > 6) {
          curTransform = curTransform.split(', ').map(a => a.replace(',', '.')).join(', ');
        } // Some old versions of Webkit choke when 'none' is passed; pass
        // empty string instead in this case


        transformMatrix = new window.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
      } else {
        transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
        matrix = transformMatrix.toString().split(',');
      }

      if (axis === 'x') {
        // Latest Chrome and webkits Fix
        if (window.WebKitCSSMatrix) curTransform = transformMatrix.m41; // Crazy IE10 Matrix
        else if (matrix.length === 16) curTransform = parseFloat(matrix[12]); // Normal Browsers
        else curTransform = parseFloat(matrix[4]);
      }

      if (axis === 'y') {
        // Latest Chrome and webkits Fix
        if (window.WebKitCSSMatrix) curTransform = transformMatrix.m42; // Crazy IE10 Matrix
        else if (matrix.length === 16) curTransform = parseFloat(matrix[13]); // Normal Browsers
        else curTransform = parseFloat(matrix[5]);
      }

      return curTransform || 0;
    }

    function isObject$1(o) {
      return typeof o === 'object' && o !== null && o.constructor && Object.prototype.toString.call(o).slice(8, -1) === 'Object';
    }

    function isNode(node) {
      // eslint-disable-next-line
      if (typeof window !== 'undefined' && typeof window.HTMLElement !== 'undefined') {
        return node instanceof HTMLElement;
      }

      return node && (node.nodeType === 1 || node.nodeType === 11);
    }

    function extend$1() {
      const to = Object(arguments.length <= 0 ? undefined : arguments[0]);
      const noExtend = ['__proto__', 'constructor', 'prototype'];

      for (let i = 1; i < arguments.length; i += 1) {
        const nextSource = i < 0 || arguments.length <= i ? undefined : arguments[i];

        if (nextSource !== undefined && nextSource !== null && !isNode(nextSource)) {
          const keysArray = Object.keys(Object(nextSource)).filter(key => noExtend.indexOf(key) < 0);

          for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
            const nextKey = keysArray[nextIndex];
            const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);

            if (desc !== undefined && desc.enumerable) {
              if (isObject$1(to[nextKey]) && isObject$1(nextSource[nextKey])) {
                if (nextSource[nextKey].__swiper__) {
                  to[nextKey] = nextSource[nextKey];
                } else {
                  extend$1(to[nextKey], nextSource[nextKey]);
                }
              } else if (!isObject$1(to[nextKey]) && isObject$1(nextSource[nextKey])) {
                to[nextKey] = {};

                if (nextSource[nextKey].__swiper__) {
                  to[nextKey] = nextSource[nextKey];
                } else {
                  extend$1(to[nextKey], nextSource[nextKey]);
                }
              } else {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }
      }

      return to;
    }

    function setCSSProperty(el, varName, varValue) {
      el.style.setProperty(varName, varValue);
    }

    function animateCSSModeScroll(_ref) {
      let {
        swiper,
        targetPosition,
        side
      } = _ref;
      const window = getWindow();
      const startPosition = -swiper.translate;
      let startTime = null;
      let time;
      const duration = swiper.params.speed;
      swiper.wrapperEl.style.scrollSnapType = 'none';
      window.cancelAnimationFrame(swiper.cssModeFrameID);
      const dir = targetPosition > startPosition ? 'next' : 'prev';

      const isOutOfBound = (current, target) => {
        return dir === 'next' && current >= target || dir === 'prev' && current <= target;
      };

      const animate = () => {
        time = new Date().getTime();

        if (startTime === null) {
          startTime = time;
        }

        const progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
        const easeProgress = 0.5 - Math.cos(progress * Math.PI) / 2;
        let currentPosition = startPosition + easeProgress * (targetPosition - startPosition);

        if (isOutOfBound(currentPosition, targetPosition)) {
          currentPosition = targetPosition;
        }

        swiper.wrapperEl.scrollTo({
          [side]: currentPosition
        });

        if (isOutOfBound(currentPosition, targetPosition)) {
          swiper.wrapperEl.style.overflow = 'hidden';
          swiper.wrapperEl.style.scrollSnapType = '';
          setTimeout(() => {
            swiper.wrapperEl.style.overflow = '';
            swiper.wrapperEl.scrollTo({
              [side]: currentPosition
            });
          });
          window.cancelAnimationFrame(swiper.cssModeFrameID);
          return;
        }

        swiper.cssModeFrameID = window.requestAnimationFrame(animate);
      };

      animate();
    }

    let support;

    function calcSupport() {
      const window = getWindow();
      const document = getDocument();
      return {
        smoothScroll: document.documentElement && 'scrollBehavior' in document.documentElement.style,
        touch: !!('ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch),
        passiveListener: function checkPassiveListener() {
          let supportsPassive = false;

          try {
            const opts = Object.defineProperty({}, 'passive', {
              // eslint-disable-next-line
              get() {
                supportsPassive = true;
              }

            });
            window.addEventListener('testPassiveListener', null, opts);
          } catch (e) {// No support
          }

          return supportsPassive;
        }(),
        gestures: function checkGestures() {
          return 'ongesturestart' in window;
        }()
      };
    }

    function getSupport() {
      if (!support) {
        support = calcSupport();
      }

      return support;
    }

    let deviceCached;

    function calcDevice(_temp) {
      let {
        userAgent
      } = _temp === void 0 ? {} : _temp;
      const support = getSupport();
      const window = getWindow();
      const platform = window.navigator.platform;
      const ua = userAgent || window.navigator.userAgent;
      const device = {
        ios: false,
        android: false
      };
      const screenWidth = window.screen.width;
      const screenHeight = window.screen.height;
      const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/); // eslint-disable-line

      let ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
      const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
      const iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
      const windows = platform === 'Win32';
      let macos = platform === 'MacIntel'; // iPadOs 13 fix

      const iPadScreens = ['1024x1366', '1366x1024', '834x1194', '1194x834', '834x1112', '1112x834', '768x1024', '1024x768', '820x1180', '1180x820', '810x1080', '1080x810'];

      if (!ipad && macos && support.touch && iPadScreens.indexOf(`${screenWidth}x${screenHeight}`) >= 0) {
        ipad = ua.match(/(Version)\/([\d.]+)/);
        if (!ipad) ipad = [0, 1, '13_0_0'];
        macos = false;
      } // Android


      if (android && !windows) {
        device.os = 'android';
        device.android = true;
      }

      if (ipad || iphone || ipod) {
        device.os = 'ios';
        device.ios = true;
      } // Export object


      return device;
    }

    function getDevice(overrides) {
      if (overrides === void 0) {
        overrides = {};
      }

      if (!deviceCached) {
        deviceCached = calcDevice(overrides);
      }

      return deviceCached;
    }

    let browser;

    function calcBrowser() {
      const window = getWindow();

      function isSafari() {
        const ua = window.navigator.userAgent.toLowerCase();
        return ua.indexOf('safari') >= 0 && ua.indexOf('chrome') < 0 && ua.indexOf('android') < 0;
      }

      return {
        isSafari: isSafari(),
        isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent)
      };
    }

    function getBrowser() {
      if (!browser) {
        browser = calcBrowser();
      }

      return browser;
    }

    function Resize(_ref) {
      let {
        swiper,
        on,
        emit
      } = _ref;
      const window = getWindow();
      let observer = null;
      let animationFrame = null;

      const resizeHandler = () => {
        if (!swiper || swiper.destroyed || !swiper.initialized) return;
        emit('beforeResize');
        emit('resize');
      };

      const createObserver = () => {
        if (!swiper || swiper.destroyed || !swiper.initialized) return;
        observer = new ResizeObserver(entries => {
          animationFrame = window.requestAnimationFrame(() => {
            const {
              width,
              height
            } = swiper;
            let newWidth = width;
            let newHeight = height;
            entries.forEach(_ref2 => {
              let {
                contentBoxSize,
                contentRect,
                target
              } = _ref2;
              if (target && target !== swiper.el) return;
              newWidth = contentRect ? contentRect.width : (contentBoxSize[0] || contentBoxSize).inlineSize;
              newHeight = contentRect ? contentRect.height : (contentBoxSize[0] || contentBoxSize).blockSize;
            });

            if (newWidth !== width || newHeight !== height) {
              resizeHandler();
            }
          });
        });
        observer.observe(swiper.el);
      };

      const removeObserver = () => {
        if (animationFrame) {
          window.cancelAnimationFrame(animationFrame);
        }

        if (observer && observer.unobserve && swiper.el) {
          observer.unobserve(swiper.el);
          observer = null;
        }
      };

      const orientationChangeHandler = () => {
        if (!swiper || swiper.destroyed || !swiper.initialized) return;
        emit('orientationchange');
      };

      on('init', () => {
        if (swiper.params.resizeObserver && typeof window.ResizeObserver !== 'undefined') {
          createObserver();
          return;
        }

        window.addEventListener('resize', resizeHandler);
        window.addEventListener('orientationchange', orientationChangeHandler);
      });
      on('destroy', () => {
        removeObserver();
        window.removeEventListener('resize', resizeHandler);
        window.removeEventListener('orientationchange', orientationChangeHandler);
      });
    }

    function Observer(_ref) {
      let {
        swiper,
        extendParams,
        on,
        emit
      } = _ref;
      const observers = [];
      const window = getWindow();

      const attach = function (target, options) {
        if (options === void 0) {
          options = {};
        }

        const ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
        const observer = new ObserverFunc(mutations => {
          // The observerUpdate event should only be triggered
          // once despite the number of mutations.  Additional
          // triggers are redundant and are very costly
          if (mutations.length === 1) {
            emit('observerUpdate', mutations[0]);
            return;
          }

          const observerUpdate = function observerUpdate() {
            emit('observerUpdate', mutations[0]);
          };

          if (window.requestAnimationFrame) {
            window.requestAnimationFrame(observerUpdate);
          } else {
            window.setTimeout(observerUpdate, 0);
          }
        });
        observer.observe(target, {
          attributes: typeof options.attributes === 'undefined' ? true : options.attributes,
          childList: typeof options.childList === 'undefined' ? true : options.childList,
          characterData: typeof options.characterData === 'undefined' ? true : options.characterData
        });
        observers.push(observer);
      };

      const init = () => {
        if (!swiper.params.observer) return;

        if (swiper.params.observeParents) {
          const containerParents = swiper.$el.parents();

          for (let i = 0; i < containerParents.length; i += 1) {
            attach(containerParents[i]);
          }
        } // Observe container


        attach(swiper.$el[0], {
          childList: swiper.params.observeSlideChildren
        }); // Observe wrapper

        attach(swiper.$wrapperEl[0], {
          attributes: false
        });
      };

      const destroy = () => {
        observers.forEach(observer => {
          observer.disconnect();
        });
        observers.splice(0, observers.length);
      };

      extendParams({
        observer: false,
        observeParents: false,
        observeSlideChildren: false
      });
      on('init', init);
      on('destroy', destroy);
    }

    /* eslint-disable no-underscore-dangle */
    var eventsEmitter = {
      on(events, handler, priority) {
        const self = this;
        if (!self.eventsListeners || self.destroyed) return self;
        if (typeof handler !== 'function') return self;
        const method = priority ? 'unshift' : 'push';
        events.split(' ').forEach(event => {
          if (!self.eventsListeners[event]) self.eventsListeners[event] = [];
          self.eventsListeners[event][method](handler);
        });
        return self;
      },

      once(events, handler, priority) {
        const self = this;
        if (!self.eventsListeners || self.destroyed) return self;
        if (typeof handler !== 'function') return self;

        function onceHandler() {
          self.off(events, onceHandler);

          if (onceHandler.__emitterProxy) {
            delete onceHandler.__emitterProxy;
          }

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          handler.apply(self, args);
        }

        onceHandler.__emitterProxy = handler;
        return self.on(events, onceHandler, priority);
      },

      onAny(handler, priority) {
        const self = this;
        if (!self.eventsListeners || self.destroyed) return self;
        if (typeof handler !== 'function') return self;
        const method = priority ? 'unshift' : 'push';

        if (self.eventsAnyListeners.indexOf(handler) < 0) {
          self.eventsAnyListeners[method](handler);
        }

        return self;
      },

      offAny(handler) {
        const self = this;
        if (!self.eventsListeners || self.destroyed) return self;
        if (!self.eventsAnyListeners) return self;
        const index = self.eventsAnyListeners.indexOf(handler);

        if (index >= 0) {
          self.eventsAnyListeners.splice(index, 1);
        }

        return self;
      },

      off(events, handler) {
        const self = this;
        if (!self.eventsListeners || self.destroyed) return self;
        if (!self.eventsListeners) return self;
        events.split(' ').forEach(event => {
          if (typeof handler === 'undefined') {
            self.eventsListeners[event] = [];
          } else if (self.eventsListeners[event]) {
            self.eventsListeners[event].forEach((eventHandler, index) => {
              if (eventHandler === handler || eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler) {
                self.eventsListeners[event].splice(index, 1);
              }
            });
          }
        });
        return self;
      },

      emit() {
        const self = this;
        if (!self.eventsListeners || self.destroyed) return self;
        if (!self.eventsListeners) return self;
        let events;
        let data;
        let context;

        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        if (typeof args[0] === 'string' || Array.isArray(args[0])) {
          events = args[0];
          data = args.slice(1, args.length);
          context = self;
        } else {
          events = args[0].events;
          data = args[0].data;
          context = args[0].context || self;
        }

        data.unshift(context);
        const eventsArray = Array.isArray(events) ? events : events.split(' ');
        eventsArray.forEach(event => {
          if (self.eventsAnyListeners && self.eventsAnyListeners.length) {
            self.eventsAnyListeners.forEach(eventHandler => {
              eventHandler.apply(context, [event, ...data]);
            });
          }

          if (self.eventsListeners && self.eventsListeners[event]) {
            self.eventsListeners[event].forEach(eventHandler => {
              eventHandler.apply(context, data);
            });
          }
        });
        return self;
      }

    };

    function updateSize() {
      const swiper = this;
      let width;
      let height;
      const $el = swiper.$el;

      if (typeof swiper.params.width !== 'undefined' && swiper.params.width !== null) {
        width = swiper.params.width;
      } else {
        width = $el[0].clientWidth;
      }

      if (typeof swiper.params.height !== 'undefined' && swiper.params.height !== null) {
        height = swiper.params.height;
      } else {
        height = $el[0].clientHeight;
      }

      if (width === 0 && swiper.isHorizontal() || height === 0 && swiper.isVertical()) {
        return;
      } // Subtract paddings


      width = width - parseInt($el.css('padding-left') || 0, 10) - parseInt($el.css('padding-right') || 0, 10);
      height = height - parseInt($el.css('padding-top') || 0, 10) - parseInt($el.css('padding-bottom') || 0, 10);
      if (Number.isNaN(width)) width = 0;
      if (Number.isNaN(height)) height = 0;
      Object.assign(swiper, {
        width,
        height,
        size: swiper.isHorizontal() ? width : height
      });
    }

    function updateSlides() {
      const swiper = this;

      function getDirectionLabel(property) {
        if (swiper.isHorizontal()) {
          return property;
        } // prettier-ignore


        return {
          'width': 'height',
          'margin-top': 'margin-left',
          'margin-bottom ': 'margin-right',
          'margin-left': 'margin-top',
          'margin-right': 'margin-bottom',
          'padding-left': 'padding-top',
          'padding-right': 'padding-bottom',
          'marginRight': 'marginBottom'
        }[property];
      }

      function getDirectionPropertyValue(node, label) {
        return parseFloat(node.getPropertyValue(getDirectionLabel(label)) || 0);
      }

      const params = swiper.params;
      const {
        $wrapperEl,
        size: swiperSize,
        rtlTranslate: rtl,
        wrongRTL
      } = swiper;
      const isVirtual = swiper.virtual && params.virtual.enabled;
      const previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
      const slides = $wrapperEl.children(`.${swiper.params.slideClass}`);
      const slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
      let snapGrid = [];
      const slidesGrid = [];
      const slidesSizesGrid = [];
      let offsetBefore = params.slidesOffsetBefore;

      if (typeof offsetBefore === 'function') {
        offsetBefore = params.slidesOffsetBefore.call(swiper);
      }

      let offsetAfter = params.slidesOffsetAfter;

      if (typeof offsetAfter === 'function') {
        offsetAfter = params.slidesOffsetAfter.call(swiper);
      }

      const previousSnapGridLength = swiper.snapGrid.length;
      const previousSlidesGridLength = swiper.slidesGrid.length;
      let spaceBetween = params.spaceBetween;
      let slidePosition = -offsetBefore;
      let prevSlideSize = 0;
      let index = 0;

      if (typeof swiperSize === 'undefined') {
        return;
      }

      if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
        spaceBetween = parseFloat(spaceBetween.replace('%', '')) / 100 * swiperSize;
      }

      swiper.virtualSize = -spaceBetween; // reset margins

      if (rtl) slides.css({
        marginLeft: '',
        marginBottom: '',
        marginTop: ''
      });else slides.css({
        marginRight: '',
        marginBottom: '',
        marginTop: ''
      }); // reset cssMode offsets

      if (params.centeredSlides && params.cssMode) {
        setCSSProperty(swiper.wrapperEl, '--swiper-centered-offset-before', '');
        setCSSProperty(swiper.wrapperEl, '--swiper-centered-offset-after', '');
      }

      const gridEnabled = params.grid && params.grid.rows > 1 && swiper.grid;

      if (gridEnabled) {
        swiper.grid.initSlides(slidesLength);
      } // Calc slides


      let slideSize;
      const shouldResetSlideSize = params.slidesPerView === 'auto' && params.breakpoints && Object.keys(params.breakpoints).filter(key => {
        return typeof params.breakpoints[key].slidesPerView !== 'undefined';
      }).length > 0;

      for (let i = 0; i < slidesLength; i += 1) {
        slideSize = 0;
        const slide = slides.eq(i);

        if (gridEnabled) {
          swiper.grid.updateSlide(i, slide, slidesLength, getDirectionLabel);
        }

        if (slide.css('display') === 'none') continue; // eslint-disable-line

        if (params.slidesPerView === 'auto') {
          if (shouldResetSlideSize) {
            slides[i].style[getDirectionLabel('width')] = ``;
          }

          const slideStyles = getComputedStyle(slide[0]);
          const currentTransform = slide[0].style.transform;
          const currentWebKitTransform = slide[0].style.webkitTransform;

          if (currentTransform) {
            slide[0].style.transform = 'none';
          }

          if (currentWebKitTransform) {
            slide[0].style.webkitTransform = 'none';
          }

          if (params.roundLengths) {
            slideSize = swiper.isHorizontal() ? slide.outerWidth(true) : slide.outerHeight(true);
          } else {
            // eslint-disable-next-line
            const width = getDirectionPropertyValue(slideStyles, 'width');
            const paddingLeft = getDirectionPropertyValue(slideStyles, 'padding-left');
            const paddingRight = getDirectionPropertyValue(slideStyles, 'padding-right');
            const marginLeft = getDirectionPropertyValue(slideStyles, 'margin-left');
            const marginRight = getDirectionPropertyValue(slideStyles, 'margin-right');
            const boxSizing = slideStyles.getPropertyValue('box-sizing');

            if (boxSizing && boxSizing === 'border-box') {
              slideSize = width + marginLeft + marginRight;
            } else {
              const {
                clientWidth,
                offsetWidth
              } = slide[0];
              slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight + (offsetWidth - clientWidth);
            }
          }

          if (currentTransform) {
            slide[0].style.transform = currentTransform;
          }

          if (currentWebKitTransform) {
            slide[0].style.webkitTransform = currentWebKitTransform;
          }

          if (params.roundLengths) slideSize = Math.floor(slideSize);
        } else {
          slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;
          if (params.roundLengths) slideSize = Math.floor(slideSize);

          if (slides[i]) {
            slides[i].style[getDirectionLabel('width')] = `${slideSize}px`;
          }
        }

        if (slides[i]) {
          slides[i].swiperSlideSize = slideSize;
        }

        slidesSizesGrid.push(slideSize);

        if (params.centeredSlides) {
          slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
          if (prevSlideSize === 0 && i !== 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
          if (i === 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
          if (Math.abs(slidePosition) < 1 / 1000) slidePosition = 0;
          if (params.roundLengths) slidePosition = Math.floor(slidePosition);
          if (index % params.slidesPerGroup === 0) snapGrid.push(slidePosition);
          slidesGrid.push(slidePosition);
        } else {
          if (params.roundLengths) slidePosition = Math.floor(slidePosition);
          if ((index - Math.min(swiper.params.slidesPerGroupSkip, index)) % swiper.params.slidesPerGroup === 0) snapGrid.push(slidePosition);
          slidesGrid.push(slidePosition);
          slidePosition = slidePosition + slideSize + spaceBetween;
        }

        swiper.virtualSize += slideSize + spaceBetween;
        prevSlideSize = slideSize;
        index += 1;
      }

      swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;

      if (rtl && wrongRTL && (params.effect === 'slide' || params.effect === 'coverflow')) {
        $wrapperEl.css({
          width: `${swiper.virtualSize + params.spaceBetween}px`
        });
      }

      if (params.setWrapperSize) {
        $wrapperEl.css({
          [getDirectionLabel('width')]: `${swiper.virtualSize + params.spaceBetween}px`
        });
      }

      if (gridEnabled) {
        swiper.grid.updateWrapperSize(slideSize, snapGrid, getDirectionLabel);
      } // Remove last grid elements depending on width


      if (!params.centeredSlides) {
        const newSlidesGrid = [];

        for (let i = 0; i < snapGrid.length; i += 1) {
          let slidesGridItem = snapGrid[i];
          if (params.roundLengths) slidesGridItem = Math.floor(slidesGridItem);

          if (snapGrid[i] <= swiper.virtualSize - swiperSize) {
            newSlidesGrid.push(slidesGridItem);
          }
        }

        snapGrid = newSlidesGrid;

        if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) {
          snapGrid.push(swiper.virtualSize - swiperSize);
        }
      }

      if (snapGrid.length === 0) snapGrid = [0];

      if (params.spaceBetween !== 0) {
        const key = swiper.isHorizontal() && rtl ? 'marginLeft' : getDirectionLabel('marginRight');
        slides.filter((_, slideIndex) => {
          if (!params.cssMode) return true;

          if (slideIndex === slides.length - 1) {
            return false;
          }

          return true;
        }).css({
          [key]: `${spaceBetween}px`
        });
      }

      if (params.centeredSlides && params.centeredSlidesBounds) {
        let allSlidesSize = 0;
        slidesSizesGrid.forEach(slideSizeValue => {
          allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
        });
        allSlidesSize -= params.spaceBetween;
        const maxSnap = allSlidesSize - swiperSize;
        snapGrid = snapGrid.map(snap => {
          if (snap < 0) return -offsetBefore;
          if (snap > maxSnap) return maxSnap + offsetAfter;
          return snap;
        });
      }

      if (params.centerInsufficientSlides) {
        let allSlidesSize = 0;
        slidesSizesGrid.forEach(slideSizeValue => {
          allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
        });
        allSlidesSize -= params.spaceBetween;

        if (allSlidesSize < swiperSize) {
          const allSlidesOffset = (swiperSize - allSlidesSize) / 2;
          snapGrid.forEach((snap, snapIndex) => {
            snapGrid[snapIndex] = snap - allSlidesOffset;
          });
          slidesGrid.forEach((snap, snapIndex) => {
            slidesGrid[snapIndex] = snap + allSlidesOffset;
          });
        }
      }

      Object.assign(swiper, {
        slides,
        snapGrid,
        slidesGrid,
        slidesSizesGrid
      });

      if (params.centeredSlides && params.cssMode && !params.centeredSlidesBounds) {
        setCSSProperty(swiper.wrapperEl, '--swiper-centered-offset-before', `${-snapGrid[0]}px`);
        setCSSProperty(swiper.wrapperEl, '--swiper-centered-offset-after', `${swiper.size / 2 - slidesSizesGrid[slidesSizesGrid.length - 1] / 2}px`);
        const addToSnapGrid = -swiper.snapGrid[0];
        const addToSlidesGrid = -swiper.slidesGrid[0];
        swiper.snapGrid = swiper.snapGrid.map(v => v + addToSnapGrid);
        swiper.slidesGrid = swiper.slidesGrid.map(v => v + addToSlidesGrid);
      }

      if (slidesLength !== previousSlidesLength) {
        swiper.emit('slidesLengthChange');
      }

      if (snapGrid.length !== previousSnapGridLength) {
        if (swiper.params.watchOverflow) swiper.checkOverflow();
        swiper.emit('snapGridLengthChange');
      }

      if (slidesGrid.length !== previousSlidesGridLength) {
        swiper.emit('slidesGridLengthChange');
      }

      if (params.watchSlidesProgress) {
        swiper.updateSlidesOffset();
      }

      if (!isVirtual && !params.cssMode && (params.effect === 'slide' || params.effect === 'fade')) {
        const backFaceHiddenClass = `${params.containerModifierClass}backface-hidden`;
        const hasClassBackfaceClassAdded = swiper.$el.hasClass(backFaceHiddenClass);

        if (slidesLength <= params.maxBackfaceHiddenSlides) {
          if (!hasClassBackfaceClassAdded) swiper.$el.addClass(backFaceHiddenClass);
        } else if (hasClassBackfaceClassAdded) {
          swiper.$el.removeClass(backFaceHiddenClass);
        }
      }
    }

    function updateAutoHeight(speed) {
      const swiper = this;
      const activeSlides = [];
      const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
      let newHeight = 0;
      let i;

      if (typeof speed === 'number') {
        swiper.setTransition(speed);
      } else if (speed === true) {
        swiper.setTransition(swiper.params.speed);
      }

      const getSlideByIndex = index => {
        if (isVirtual) {
          return swiper.slides.filter(el => parseInt(el.getAttribute('data-swiper-slide-index'), 10) === index)[0];
        }

        return swiper.slides.eq(index)[0];
      }; // Find slides currently in view


      if (swiper.params.slidesPerView !== 'auto' && swiper.params.slidesPerView > 1) {
        if (swiper.params.centeredSlides) {
          (swiper.visibleSlides || $([])).each(slide => {
            activeSlides.push(slide);
          });
        } else {
          for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
            const index = swiper.activeIndex + i;
            if (index > swiper.slides.length && !isVirtual) break;
            activeSlides.push(getSlideByIndex(index));
          }
        }
      } else {
        activeSlides.push(getSlideByIndex(swiper.activeIndex));
      } // Find new height from highest slide in view


      for (i = 0; i < activeSlides.length; i += 1) {
        if (typeof activeSlides[i] !== 'undefined') {
          const height = activeSlides[i].offsetHeight;
          newHeight = height > newHeight ? height : newHeight;
        }
      } // Update Height


      if (newHeight || newHeight === 0) swiper.$wrapperEl.css('height', `${newHeight}px`);
    }

    function updateSlidesOffset() {
      const swiper = this;
      const slides = swiper.slides;

      for (let i = 0; i < slides.length; i += 1) {
        slides[i].swiperSlideOffset = swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop;
      }
    }

    function updateSlidesProgress(translate) {
      if (translate === void 0) {
        translate = this && this.translate || 0;
      }

      const swiper = this;
      const params = swiper.params;
      const {
        slides,
        rtlTranslate: rtl,
        snapGrid
      } = swiper;
      if (slides.length === 0) return;
      if (typeof slides[0].swiperSlideOffset === 'undefined') swiper.updateSlidesOffset();
      let offsetCenter = -translate;
      if (rtl) offsetCenter = translate; // Visible Slides

      slides.removeClass(params.slideVisibleClass);
      swiper.visibleSlidesIndexes = [];
      swiper.visibleSlides = [];

      for (let i = 0; i < slides.length; i += 1) {
        const slide = slides[i];
        let slideOffset = slide.swiperSlideOffset;

        if (params.cssMode && params.centeredSlides) {
          slideOffset -= slides[0].swiperSlideOffset;
        }

        const slideProgress = (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + params.spaceBetween);
        const originalSlideProgress = (offsetCenter - snapGrid[0] + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + params.spaceBetween);
        const slideBefore = -(offsetCenter - slideOffset);
        const slideAfter = slideBefore + swiper.slidesSizesGrid[i];
        const isVisible = slideBefore >= 0 && slideBefore < swiper.size - 1 || slideAfter > 1 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;

        if (isVisible) {
          swiper.visibleSlides.push(slide);
          swiper.visibleSlidesIndexes.push(i);
          slides.eq(i).addClass(params.slideVisibleClass);
        }

        slide.progress = rtl ? -slideProgress : slideProgress;
        slide.originalProgress = rtl ? -originalSlideProgress : originalSlideProgress;
      }

      swiper.visibleSlides = $(swiper.visibleSlides);
    }

    function updateProgress(translate) {
      const swiper = this;

      if (typeof translate === 'undefined') {
        const multiplier = swiper.rtlTranslate ? -1 : 1; // eslint-disable-next-line

        translate = swiper && swiper.translate && swiper.translate * multiplier || 0;
      }

      const params = swiper.params;
      const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
      let {
        progress,
        isBeginning,
        isEnd
      } = swiper;
      const wasBeginning = isBeginning;
      const wasEnd = isEnd;

      if (translatesDiff === 0) {
        progress = 0;
        isBeginning = true;
        isEnd = true;
      } else {
        progress = (translate - swiper.minTranslate()) / translatesDiff;
        isBeginning = progress <= 0;
        isEnd = progress >= 1;
      }

      Object.assign(swiper, {
        progress,
        isBeginning,
        isEnd
      });
      if (params.watchSlidesProgress || params.centeredSlides && params.autoHeight) swiper.updateSlidesProgress(translate);

      if (isBeginning && !wasBeginning) {
        swiper.emit('reachBeginning toEdge');
      }

      if (isEnd && !wasEnd) {
        swiper.emit('reachEnd toEdge');
      }

      if (wasBeginning && !isBeginning || wasEnd && !isEnd) {
        swiper.emit('fromEdge');
      }

      swiper.emit('progress', progress);
    }

    function updateSlidesClasses() {
      const swiper = this;
      const {
        slides,
        params,
        $wrapperEl,
        activeIndex,
        realIndex
      } = swiper;
      const isVirtual = swiper.virtual && params.virtual.enabled;
      slides.removeClass(`${params.slideActiveClass} ${params.slideNextClass} ${params.slidePrevClass} ${params.slideDuplicateActiveClass} ${params.slideDuplicateNextClass} ${params.slideDuplicatePrevClass}`);
      let activeSlide;

      if (isVirtual) {
        activeSlide = swiper.$wrapperEl.find(`.${params.slideClass}[data-swiper-slide-index="${activeIndex}"]`);
      } else {
        activeSlide = slides.eq(activeIndex);
      } // Active classes


      activeSlide.addClass(params.slideActiveClass);

      if (params.loop) {
        // Duplicate to all looped slides
        if (activeSlide.hasClass(params.slideDuplicateClass)) {
          $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${realIndex}"]`).addClass(params.slideDuplicateActiveClass);
        } else {
          $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${realIndex}"]`).addClass(params.slideDuplicateActiveClass);
        }
      } // Next Slide


      let nextSlide = activeSlide.nextAll(`.${params.slideClass}`).eq(0).addClass(params.slideNextClass);

      if (params.loop && nextSlide.length === 0) {
        nextSlide = slides.eq(0);
        nextSlide.addClass(params.slideNextClass);
      } // Prev Slide


      let prevSlide = activeSlide.prevAll(`.${params.slideClass}`).eq(0).addClass(params.slidePrevClass);

      if (params.loop && prevSlide.length === 0) {
        prevSlide = slides.eq(-1);
        prevSlide.addClass(params.slidePrevClass);
      }

      if (params.loop) {
        // Duplicate to all looped slides
        if (nextSlide.hasClass(params.slideDuplicateClass)) {
          $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${nextSlide.attr('data-swiper-slide-index')}"]`).addClass(params.slideDuplicateNextClass);
        } else {
          $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${nextSlide.attr('data-swiper-slide-index')}"]`).addClass(params.slideDuplicateNextClass);
        }

        if (prevSlide.hasClass(params.slideDuplicateClass)) {
          $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${prevSlide.attr('data-swiper-slide-index')}"]`).addClass(params.slideDuplicatePrevClass);
        } else {
          $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${prevSlide.attr('data-swiper-slide-index')}"]`).addClass(params.slideDuplicatePrevClass);
        }
      }

      swiper.emitSlidesClasses();
    }

    function updateActiveIndex(newActiveIndex) {
      const swiper = this;
      const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
      const {
        slidesGrid,
        snapGrid,
        params,
        activeIndex: previousIndex,
        realIndex: previousRealIndex,
        snapIndex: previousSnapIndex
      } = swiper;
      let activeIndex = newActiveIndex;
      let snapIndex;

      if (typeof activeIndex === 'undefined') {
        for (let i = 0; i < slidesGrid.length; i += 1) {
          if (typeof slidesGrid[i + 1] !== 'undefined') {
            if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2) {
              activeIndex = i;
            } else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1]) {
              activeIndex = i + 1;
            }
          } else if (translate >= slidesGrid[i]) {
            activeIndex = i;
          }
        } // Normalize slideIndex


        if (params.normalizeSlideIndex) {
          if (activeIndex < 0 || typeof activeIndex === 'undefined') activeIndex = 0;
        }
      }

      if (snapGrid.indexOf(translate) >= 0) {
        snapIndex = snapGrid.indexOf(translate);
      } else {
        const skip = Math.min(params.slidesPerGroupSkip, activeIndex);
        snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
      }

      if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;

      if (activeIndex === previousIndex) {
        if (snapIndex !== previousSnapIndex) {
          swiper.snapIndex = snapIndex;
          swiper.emit('snapIndexChange');
        }

        return;
      } // Get real index


      const realIndex = parseInt(swiper.slides.eq(activeIndex).attr('data-swiper-slide-index') || activeIndex, 10);
      Object.assign(swiper, {
        snapIndex,
        realIndex,
        previousIndex,
        activeIndex
      });
      swiper.emit('activeIndexChange');
      swiper.emit('snapIndexChange');

      if (previousRealIndex !== realIndex) {
        swiper.emit('realIndexChange');
      }

      if (swiper.initialized || swiper.params.runCallbacksOnInit) {
        swiper.emit('slideChange');
      }
    }

    function updateClickedSlide(e) {
      const swiper = this;
      const params = swiper.params;
      const slide = $(e).closest(`.${params.slideClass}`)[0];
      let slideFound = false;
      let slideIndex;

      if (slide) {
        for (let i = 0; i < swiper.slides.length; i += 1) {
          if (swiper.slides[i] === slide) {
            slideFound = true;
            slideIndex = i;
            break;
          }
        }
      }

      if (slide && slideFound) {
        swiper.clickedSlide = slide;

        if (swiper.virtual && swiper.params.virtual.enabled) {
          swiper.clickedIndex = parseInt($(slide).attr('data-swiper-slide-index'), 10);
        } else {
          swiper.clickedIndex = slideIndex;
        }
      } else {
        swiper.clickedSlide = undefined;
        swiper.clickedIndex = undefined;
        return;
      }

      if (params.slideToClickedSlide && swiper.clickedIndex !== undefined && swiper.clickedIndex !== swiper.activeIndex) {
        swiper.slideToClickedSlide();
      }
    }

    var update = {
      updateSize,
      updateSlides,
      updateAutoHeight,
      updateSlidesOffset,
      updateSlidesProgress,
      updateProgress,
      updateSlidesClasses,
      updateActiveIndex,
      updateClickedSlide
    };

    function getSwiperTranslate(axis) {
      if (axis === void 0) {
        axis = this.isHorizontal() ? 'x' : 'y';
      }

      const swiper = this;
      const {
        params,
        rtlTranslate: rtl,
        translate,
        $wrapperEl
      } = swiper;

      if (params.virtualTranslate) {
        return rtl ? -translate : translate;
      }

      if (params.cssMode) {
        return translate;
      }

      let currentTranslate = getTranslate($wrapperEl[0], axis);
      if (rtl) currentTranslate = -currentTranslate;
      return currentTranslate || 0;
    }

    function setTranslate(translate, byController) {
      const swiper = this;
      const {
        rtlTranslate: rtl,
        params,
        $wrapperEl,
        wrapperEl,
        progress
      } = swiper;
      let x = 0;
      let y = 0;
      const z = 0;

      if (swiper.isHorizontal()) {
        x = rtl ? -translate : translate;
      } else {
        y = translate;
      }

      if (params.roundLengths) {
        x = Math.floor(x);
        y = Math.floor(y);
      }

      if (params.cssMode) {
        wrapperEl[swiper.isHorizontal() ? 'scrollLeft' : 'scrollTop'] = swiper.isHorizontal() ? -x : -y;
      } else if (!params.virtualTranslate) {
        $wrapperEl.transform(`translate3d(${x}px, ${y}px, ${z}px)`);
      }

      swiper.previousTranslate = swiper.translate;
      swiper.translate = swiper.isHorizontal() ? x : y; // Check if we need to update progress

      let newProgress;
      const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();

      if (translatesDiff === 0) {
        newProgress = 0;
      } else {
        newProgress = (translate - swiper.minTranslate()) / translatesDiff;
      }

      if (newProgress !== progress) {
        swiper.updateProgress(translate);
      }

      swiper.emit('setTranslate', swiper.translate, byController);
    }

    function minTranslate() {
      return -this.snapGrid[0];
    }

    function maxTranslate() {
      return -this.snapGrid[this.snapGrid.length - 1];
    }

    function translateTo(translate, speed, runCallbacks, translateBounds, internal) {
      if (translate === void 0) {
        translate = 0;
      }

      if (speed === void 0) {
        speed = this.params.speed;
      }

      if (runCallbacks === void 0) {
        runCallbacks = true;
      }

      if (translateBounds === void 0) {
        translateBounds = true;
      }

      const swiper = this;
      const {
        params,
        wrapperEl
      } = swiper;

      if (swiper.animating && params.preventInteractionOnTransition) {
        return false;
      }

      const minTranslate = swiper.minTranslate();
      const maxTranslate = swiper.maxTranslate();
      let newTranslate;
      if (translateBounds && translate > minTranslate) newTranslate = minTranslate;else if (translateBounds && translate < maxTranslate) newTranslate = maxTranslate;else newTranslate = translate; // Update progress

      swiper.updateProgress(newTranslate);

      if (params.cssMode) {
        const isH = swiper.isHorizontal();

        if (speed === 0) {
          wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = -newTranslate;
        } else {
          if (!swiper.support.smoothScroll) {
            animateCSSModeScroll({
              swiper,
              targetPosition: -newTranslate,
              side: isH ? 'left' : 'top'
            });
            return true;
          }

          wrapperEl.scrollTo({
            [isH ? 'left' : 'top']: -newTranslate,
            behavior: 'smooth'
          });
        }

        return true;
      }

      if (speed === 0) {
        swiper.setTransition(0);
        swiper.setTranslate(newTranslate);

        if (runCallbacks) {
          swiper.emit('beforeTransitionStart', speed, internal);
          swiper.emit('transitionEnd');
        }
      } else {
        swiper.setTransition(speed);
        swiper.setTranslate(newTranslate);

        if (runCallbacks) {
          swiper.emit('beforeTransitionStart', speed, internal);
          swiper.emit('transitionStart');
        }

        if (!swiper.animating) {
          swiper.animating = true;

          if (!swiper.onTranslateToWrapperTransitionEnd) {
            swiper.onTranslateToWrapperTransitionEnd = function transitionEnd(e) {
              if (!swiper || swiper.destroyed) return;
              if (e.target !== this) return;
              swiper.$wrapperEl[0].removeEventListener('transitionend', swiper.onTranslateToWrapperTransitionEnd);
              swiper.$wrapperEl[0].removeEventListener('webkitTransitionEnd', swiper.onTranslateToWrapperTransitionEnd);
              swiper.onTranslateToWrapperTransitionEnd = null;
              delete swiper.onTranslateToWrapperTransitionEnd;

              if (runCallbacks) {
                swiper.emit('transitionEnd');
              }
            };
          }

          swiper.$wrapperEl[0].addEventListener('transitionend', swiper.onTranslateToWrapperTransitionEnd);
          swiper.$wrapperEl[0].addEventListener('webkitTransitionEnd', swiper.onTranslateToWrapperTransitionEnd);
        }
      }

      return true;
    }

    var translate = {
      getTranslate: getSwiperTranslate,
      setTranslate,
      minTranslate,
      maxTranslate,
      translateTo
    };

    function setTransition(duration, byController) {
      const swiper = this;

      if (!swiper.params.cssMode) {
        swiper.$wrapperEl.transition(duration);
      }

      swiper.emit('setTransition', duration, byController);
    }

    function transitionEmit(_ref) {
      let {
        swiper,
        runCallbacks,
        direction,
        step
      } = _ref;
      const {
        activeIndex,
        previousIndex
      } = swiper;
      let dir = direction;

      if (!dir) {
        if (activeIndex > previousIndex) dir = 'next';else if (activeIndex < previousIndex) dir = 'prev';else dir = 'reset';
      }

      swiper.emit(`transition${step}`);

      if (runCallbacks && activeIndex !== previousIndex) {
        if (dir === 'reset') {
          swiper.emit(`slideResetTransition${step}`);
          return;
        }

        swiper.emit(`slideChangeTransition${step}`);

        if (dir === 'next') {
          swiper.emit(`slideNextTransition${step}`);
        } else {
          swiper.emit(`slidePrevTransition${step}`);
        }
      }
    }

    function transitionStart(runCallbacks, direction) {
      if (runCallbacks === void 0) {
        runCallbacks = true;
      }

      const swiper = this;
      const {
        params
      } = swiper;
      if (params.cssMode) return;

      if (params.autoHeight) {
        swiper.updateAutoHeight();
      }

      transitionEmit({
        swiper,
        runCallbacks,
        direction,
        step: 'Start'
      });
    }

    function transitionEnd(runCallbacks, direction) {
      if (runCallbacks === void 0) {
        runCallbacks = true;
      }

      const swiper = this;
      const {
        params
      } = swiper;
      swiper.animating = false;
      if (params.cssMode) return;
      swiper.setTransition(0);
      transitionEmit({
        swiper,
        runCallbacks,
        direction,
        step: 'End'
      });
    }

    var transition = {
      setTransition,
      transitionStart,
      transitionEnd
    };

    function slideTo(index, speed, runCallbacks, internal, initial) {
      if (index === void 0) {
        index = 0;
      }

      if (speed === void 0) {
        speed = this.params.speed;
      }

      if (runCallbacks === void 0) {
        runCallbacks = true;
      }

      if (typeof index !== 'number' && typeof index !== 'string') {
        throw new Error(`The 'index' argument cannot have type other than 'number' or 'string'. [${typeof index}] given.`);
      }

      if (typeof index === 'string') {
        /**
         * The `index` argument converted from `string` to `number`.
         * @type {number}
         */
        const indexAsNumber = parseInt(index, 10);
        /**
         * Determines whether the `index` argument is a valid `number`
         * after being converted from the `string` type.
         * @type {boolean}
         */

        const isValidNumber = isFinite(indexAsNumber);

        if (!isValidNumber) {
          throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${index}] given.`);
        } // Knowing that the converted `index` is a valid number,
        // we can update the original argument's value.


        index = indexAsNumber;
      }

      const swiper = this;
      let slideIndex = index;
      if (slideIndex < 0) slideIndex = 0;
      const {
        params,
        snapGrid,
        slidesGrid,
        previousIndex,
        activeIndex,
        rtlTranslate: rtl,
        wrapperEl,
        enabled
      } = swiper;

      if (swiper.animating && params.preventInteractionOnTransition || !enabled && !internal && !initial) {
        return false;
      }

      const skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);
      let snapIndex = skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);
      if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;

      if ((activeIndex || params.initialSlide || 0) === (previousIndex || 0) && runCallbacks) {
        swiper.emit('beforeSlideChangeStart');
      }

      const translate = -snapGrid[snapIndex]; // Update progress

      swiper.updateProgress(translate); // Normalize slideIndex

      if (params.normalizeSlideIndex) {
        for (let i = 0; i < slidesGrid.length; i += 1) {
          const normalizedTranslate = -Math.floor(translate * 100);
          const normalizedGrid = Math.floor(slidesGrid[i] * 100);
          const normalizedGridNext = Math.floor(slidesGrid[i + 1] * 100);

          if (typeof slidesGrid[i + 1] !== 'undefined') {
            if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2) {
              slideIndex = i;
            } else if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext) {
              slideIndex = i + 1;
            }
          } else if (normalizedTranslate >= normalizedGrid) {
            slideIndex = i;
          }
        }
      } // Directions locks


      if (swiper.initialized && slideIndex !== activeIndex) {
        if (!swiper.allowSlideNext && translate < swiper.translate && translate < swiper.minTranslate()) {
          return false;
        }

        if (!swiper.allowSlidePrev && translate > swiper.translate && translate > swiper.maxTranslate()) {
          if ((activeIndex || 0) !== slideIndex) return false;
        }
      }

      let direction;
      if (slideIndex > activeIndex) direction = 'next';else if (slideIndex < activeIndex) direction = 'prev';else direction = 'reset'; // Update Index

      if (rtl && -translate === swiper.translate || !rtl && translate === swiper.translate) {
        swiper.updateActiveIndex(slideIndex); // Update Height

        if (params.autoHeight) {
          swiper.updateAutoHeight();
        }

        swiper.updateSlidesClasses();

        if (params.effect !== 'slide') {
          swiper.setTranslate(translate);
        }

        if (direction !== 'reset') {
          swiper.transitionStart(runCallbacks, direction);
          swiper.transitionEnd(runCallbacks, direction);
        }

        return false;
      }

      if (params.cssMode) {
        const isH = swiper.isHorizontal();
        const t = rtl ? translate : -translate;

        if (speed === 0) {
          const isVirtual = swiper.virtual && swiper.params.virtual.enabled;

          if (isVirtual) {
            swiper.wrapperEl.style.scrollSnapType = 'none';
            swiper._immediateVirtual = true;
          }

          wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = t;

          if (isVirtual) {
            requestAnimationFrame(() => {
              swiper.wrapperEl.style.scrollSnapType = '';
              swiper._swiperImmediateVirtual = false;
            });
          }
        } else {
          if (!swiper.support.smoothScroll) {
            animateCSSModeScroll({
              swiper,
              targetPosition: t,
              side: isH ? 'left' : 'top'
            });
            return true;
          }

          wrapperEl.scrollTo({
            [isH ? 'left' : 'top']: t,
            behavior: 'smooth'
          });
        }

        return true;
      }

      swiper.setTransition(speed);
      swiper.setTranslate(translate);
      swiper.updateActiveIndex(slideIndex);
      swiper.updateSlidesClasses();
      swiper.emit('beforeTransitionStart', speed, internal);
      swiper.transitionStart(runCallbacks, direction);

      if (speed === 0) {
        swiper.transitionEnd(runCallbacks, direction);
      } else if (!swiper.animating) {
        swiper.animating = true;

        if (!swiper.onSlideToWrapperTransitionEnd) {
          swiper.onSlideToWrapperTransitionEnd = function transitionEnd(e) {
            if (!swiper || swiper.destroyed) return;
            if (e.target !== this) return;
            swiper.$wrapperEl[0].removeEventListener('transitionend', swiper.onSlideToWrapperTransitionEnd);
            swiper.$wrapperEl[0].removeEventListener('webkitTransitionEnd', swiper.onSlideToWrapperTransitionEnd);
            swiper.onSlideToWrapperTransitionEnd = null;
            delete swiper.onSlideToWrapperTransitionEnd;
            swiper.transitionEnd(runCallbacks, direction);
          };
        }

        swiper.$wrapperEl[0].addEventListener('transitionend', swiper.onSlideToWrapperTransitionEnd);
        swiper.$wrapperEl[0].addEventListener('webkitTransitionEnd', swiper.onSlideToWrapperTransitionEnd);
      }

      return true;
    }

    function slideToLoop(index, speed, runCallbacks, internal) {
      if (index === void 0) {
        index = 0;
      }

      if (speed === void 0) {
        speed = this.params.speed;
      }

      if (runCallbacks === void 0) {
        runCallbacks = true;
      }

      const swiper = this;
      let newIndex = index;

      if (swiper.params.loop) {
        newIndex += swiper.loopedSlides;
      }

      return swiper.slideTo(newIndex, speed, runCallbacks, internal);
    }

    /* eslint no-unused-vars: "off" */
    function slideNext(speed, runCallbacks, internal) {
      if (speed === void 0) {
        speed = this.params.speed;
      }

      if (runCallbacks === void 0) {
        runCallbacks = true;
      }

      const swiper = this;
      const {
        animating,
        enabled,
        params
      } = swiper;
      if (!enabled) return swiper;
      let perGroup = params.slidesPerGroup;

      if (params.slidesPerView === 'auto' && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
        perGroup = Math.max(swiper.slidesPerViewDynamic('current', true), 1);
      }

      const increment = swiper.activeIndex < params.slidesPerGroupSkip ? 1 : perGroup;

      if (params.loop) {
        if (animating && params.loopPreventsSlide) return false;
        swiper.loopFix(); // eslint-disable-next-line

        swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
      }

      if (params.rewind && swiper.isEnd) {
        return swiper.slideTo(0, speed, runCallbacks, internal);
      }

      return swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
    }

    /* eslint no-unused-vars: "off" */
    function slidePrev(speed, runCallbacks, internal) {
      if (speed === void 0) {
        speed = this.params.speed;
      }

      if (runCallbacks === void 0) {
        runCallbacks = true;
      }

      const swiper = this;
      const {
        params,
        animating,
        snapGrid,
        slidesGrid,
        rtlTranslate,
        enabled
      } = swiper;
      if (!enabled) return swiper;

      if (params.loop) {
        if (animating && params.loopPreventsSlide) return false;
        swiper.loopFix(); // eslint-disable-next-line

        swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
      }

      const translate = rtlTranslate ? swiper.translate : -swiper.translate;

      function normalize(val) {
        if (val < 0) return -Math.floor(Math.abs(val));
        return Math.floor(val);
      }

      const normalizedTranslate = normalize(translate);
      const normalizedSnapGrid = snapGrid.map(val => normalize(val));
      let prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];

      if (typeof prevSnap === 'undefined' && params.cssMode) {
        let prevSnapIndex;
        snapGrid.forEach((snap, snapIndex) => {
          if (normalizedTranslate >= snap) {
            // prevSnap = snap;
            prevSnapIndex = snapIndex;
          }
        });

        if (typeof prevSnapIndex !== 'undefined') {
          prevSnap = snapGrid[prevSnapIndex > 0 ? prevSnapIndex - 1 : prevSnapIndex];
        }
      }

      let prevIndex = 0;

      if (typeof prevSnap !== 'undefined') {
        prevIndex = slidesGrid.indexOf(prevSnap);
        if (prevIndex < 0) prevIndex = swiper.activeIndex - 1;

        if (params.slidesPerView === 'auto' && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
          prevIndex = prevIndex - swiper.slidesPerViewDynamic('previous', true) + 1;
          prevIndex = Math.max(prevIndex, 0);
        }
      }

      if (params.rewind && swiper.isBeginning) {
        const lastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
        return swiper.slideTo(lastIndex, speed, runCallbacks, internal);
      }

      return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
    }

    /* eslint no-unused-vars: "off" */
    function slideReset(speed, runCallbacks, internal) {
      if (speed === void 0) {
        speed = this.params.speed;
      }

      if (runCallbacks === void 0) {
        runCallbacks = true;
      }

      const swiper = this;
      return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
    }

    /* eslint no-unused-vars: "off" */
    function slideToClosest(speed, runCallbacks, internal, threshold) {
      if (speed === void 0) {
        speed = this.params.speed;
      }

      if (runCallbacks === void 0) {
        runCallbacks = true;
      }

      if (threshold === void 0) {
        threshold = 0.5;
      }

      const swiper = this;
      let index = swiper.activeIndex;
      const skip = Math.min(swiper.params.slidesPerGroupSkip, index);
      const snapIndex = skip + Math.floor((index - skip) / swiper.params.slidesPerGroup);
      const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;

      if (translate >= swiper.snapGrid[snapIndex]) {
        // The current translate is on or after the current snap index, so the choice
        // is between the current index and the one after it.
        const currentSnap = swiper.snapGrid[snapIndex];
        const nextSnap = swiper.snapGrid[snapIndex + 1];

        if (translate - currentSnap > (nextSnap - currentSnap) * threshold) {
          index += swiper.params.slidesPerGroup;
        }
      } else {
        // The current translate is before the current snap index, so the choice
        // is between the current index and the one before it.
        const prevSnap = swiper.snapGrid[snapIndex - 1];
        const currentSnap = swiper.snapGrid[snapIndex];

        if (translate - prevSnap <= (currentSnap - prevSnap) * threshold) {
          index -= swiper.params.slidesPerGroup;
        }
      }

      index = Math.max(index, 0);
      index = Math.min(index, swiper.slidesGrid.length - 1);
      return swiper.slideTo(index, speed, runCallbacks, internal);
    }

    function slideToClickedSlide() {
      const swiper = this;
      const {
        params,
        $wrapperEl
      } = swiper;
      const slidesPerView = params.slidesPerView === 'auto' ? swiper.slidesPerViewDynamic() : params.slidesPerView;
      let slideToIndex = swiper.clickedIndex;
      let realIndex;

      if (params.loop) {
        if (swiper.animating) return;
        realIndex = parseInt($(swiper.clickedSlide).attr('data-swiper-slide-index'), 10);

        if (params.centeredSlides) {
          if (slideToIndex < swiper.loopedSlides - slidesPerView / 2 || slideToIndex > swiper.slides.length - swiper.loopedSlides + slidesPerView / 2) {
            swiper.loopFix();
            slideToIndex = $wrapperEl.children(`.${params.slideClass}[data-swiper-slide-index="${realIndex}"]:not(.${params.slideDuplicateClass})`).eq(0).index();
            nextTick(() => {
              swiper.slideTo(slideToIndex);
            });
          } else {
            swiper.slideTo(slideToIndex);
          }
        } else if (slideToIndex > swiper.slides.length - slidesPerView) {
          swiper.loopFix();
          slideToIndex = $wrapperEl.children(`.${params.slideClass}[data-swiper-slide-index="${realIndex}"]:not(.${params.slideDuplicateClass})`).eq(0).index();
          nextTick(() => {
            swiper.slideTo(slideToIndex);
          });
        } else {
          swiper.slideTo(slideToIndex);
        }
      } else {
        swiper.slideTo(slideToIndex);
      }
    }

    var slide = {
      slideTo,
      slideToLoop,
      slideNext,
      slidePrev,
      slideReset,
      slideToClosest,
      slideToClickedSlide
    };

    function loopCreate() {
      const swiper = this;
      const document = getDocument();
      const {
        params,
        $wrapperEl
      } = swiper; // Remove duplicated slides

      const $selector = $wrapperEl.children().length > 0 ? $($wrapperEl.children()[0].parentNode) : $wrapperEl;
      $selector.children(`.${params.slideClass}.${params.slideDuplicateClass}`).remove();
      let slides = $selector.children(`.${params.slideClass}`);

      if (params.loopFillGroupWithBlank) {
        const blankSlidesNum = params.slidesPerGroup - slides.length % params.slidesPerGroup;

        if (blankSlidesNum !== params.slidesPerGroup) {
          for (let i = 0; i < blankSlidesNum; i += 1) {
            const blankNode = $(document.createElement('div')).addClass(`${params.slideClass} ${params.slideBlankClass}`);
            $selector.append(blankNode);
          }

          slides = $selector.children(`.${params.slideClass}`);
        }
      }

      if (params.slidesPerView === 'auto' && !params.loopedSlides) params.loopedSlides = slides.length;
      swiper.loopedSlides = Math.ceil(parseFloat(params.loopedSlides || params.slidesPerView, 10));
      swiper.loopedSlides += params.loopAdditionalSlides;

      if (swiper.loopedSlides > slides.length) {
        swiper.loopedSlides = slides.length;
      }

      const prependSlides = [];
      const appendSlides = [];
      slides.each((el, index) => {
        const slide = $(el);

        if (index < swiper.loopedSlides) {
          appendSlides.push(el);
        }

        if (index < slides.length && index >= slides.length - swiper.loopedSlides) {
          prependSlides.push(el);
        }

        slide.attr('data-swiper-slide-index', index);
      });

      for (let i = 0; i < appendSlides.length; i += 1) {
        $selector.append($(appendSlides[i].cloneNode(true)).addClass(params.slideDuplicateClass));
      }

      for (let i = prependSlides.length - 1; i >= 0; i -= 1) {
        $selector.prepend($(prependSlides[i].cloneNode(true)).addClass(params.slideDuplicateClass));
      }
    }

    function loopFix() {
      const swiper = this;
      swiper.emit('beforeLoopFix');
      const {
        activeIndex,
        slides,
        loopedSlides,
        allowSlidePrev,
        allowSlideNext,
        snapGrid,
        rtlTranslate: rtl
      } = swiper;
      let newIndex;
      swiper.allowSlidePrev = true;
      swiper.allowSlideNext = true;
      const snapTranslate = -snapGrid[activeIndex];
      const diff = snapTranslate - swiper.getTranslate(); // Fix For Negative Oversliding

      if (activeIndex < loopedSlides) {
        newIndex = slides.length - loopedSlides * 3 + activeIndex;
        newIndex += loopedSlides;
        const slideChanged = swiper.slideTo(newIndex, 0, false, true);

        if (slideChanged && diff !== 0) {
          swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
        }
      } else if (activeIndex >= slides.length - loopedSlides) {
        // Fix For Positive Oversliding
        newIndex = -slides.length + activeIndex + loopedSlides;
        newIndex += loopedSlides;
        const slideChanged = swiper.slideTo(newIndex, 0, false, true);

        if (slideChanged && diff !== 0) {
          swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
        }
      }

      swiper.allowSlidePrev = allowSlidePrev;
      swiper.allowSlideNext = allowSlideNext;
      swiper.emit('loopFix');
    }

    function loopDestroy() {
      const swiper = this;
      const {
        $wrapperEl,
        params,
        slides
      } = swiper;
      $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass},.${params.slideClass}.${params.slideBlankClass}`).remove();
      slides.removeAttr('data-swiper-slide-index');
    }

    var loop = {
      loopCreate,
      loopFix,
      loopDestroy
    };

    function setGrabCursor(moving) {
      const swiper = this;
      if (swiper.support.touch || !swiper.params.simulateTouch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
      const el = swiper.params.touchEventsTarget === 'container' ? swiper.el : swiper.wrapperEl;
      el.style.cursor = 'move';
      el.style.cursor = moving ? 'grabbing' : 'grab';
    }

    function unsetGrabCursor() {
      const swiper = this;

      if (swiper.support.touch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) {
        return;
      }

      swiper[swiper.params.touchEventsTarget === 'container' ? 'el' : 'wrapperEl'].style.cursor = '';
    }

    var grabCursor = {
      setGrabCursor,
      unsetGrabCursor
    };

    function closestElement(selector, base) {
      if (base === void 0) {
        base = this;
      }

      function __closestFrom(el) {
        if (!el || el === getDocument() || el === getWindow()) return null;
        if (el.assignedSlot) el = el.assignedSlot;
        const found = el.closest(selector);

        if (!found && !el.getRootNode) {
          return null;
        }

        return found || __closestFrom(el.getRootNode().host);
      }

      return __closestFrom(base);
    }

    function onTouchStart(event) {
      const swiper = this;
      const document = getDocument();
      const window = getWindow();
      const data = swiper.touchEventsData;
      const {
        params,
        touches,
        enabled
      } = swiper;
      if (!enabled) return;

      if (swiper.animating && params.preventInteractionOnTransition) {
        return;
      }

      if (!swiper.animating && params.cssMode && params.loop) {
        swiper.loopFix();
      }

      let e = event;
      if (e.originalEvent) e = e.originalEvent;
      let $targetEl = $(e.target);

      if (params.touchEventsTarget === 'wrapper') {
        if (!$targetEl.closest(swiper.wrapperEl).length) return;
      }

      data.isTouchEvent = e.type === 'touchstart';
      if (!data.isTouchEvent && 'which' in e && e.which === 3) return;
      if (!data.isTouchEvent && 'button' in e && e.button > 0) return;
      if (data.isTouched && data.isMoved) return; // change target el for shadow root component

      const swipingClassHasValue = !!params.noSwipingClass && params.noSwipingClass !== '';

      if (swipingClassHasValue && e.target && e.target.shadowRoot && event.path && event.path[0]) {
        $targetEl = $(event.path[0]);
      }

      const noSwipingSelector = params.noSwipingSelector ? params.noSwipingSelector : `.${params.noSwipingClass}`;
      const isTargetShadow = !!(e.target && e.target.shadowRoot); // use closestElement for shadow root element to get the actual closest for nested shadow root element

      if (params.noSwiping && (isTargetShadow ? closestElement(noSwipingSelector, $targetEl[0]) : $targetEl.closest(noSwipingSelector)[0])) {
        swiper.allowClick = true;
        return;
      }

      if (params.swipeHandler) {
        if (!$targetEl.closest(params.swipeHandler)[0]) return;
      }

      touches.currentX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
      touches.currentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
      const startX = touches.currentX;
      const startY = touches.currentY; // Do NOT start if iOS edge swipe is detected. Otherwise iOS app cannot swipe-to-go-back anymore

      const edgeSwipeDetection = params.edgeSwipeDetection || params.iOSEdgeSwipeDetection;
      const edgeSwipeThreshold = params.edgeSwipeThreshold || params.iOSEdgeSwipeThreshold;

      if (edgeSwipeDetection && (startX <= edgeSwipeThreshold || startX >= window.innerWidth - edgeSwipeThreshold)) {
        if (edgeSwipeDetection === 'prevent') {
          event.preventDefault();
        } else {
          return;
        }
      }

      Object.assign(data, {
        isTouched: true,
        isMoved: false,
        allowTouchCallbacks: true,
        isScrolling: undefined,
        startMoving: undefined
      });
      touches.startX = startX;
      touches.startY = startY;
      data.touchStartTime = now();
      swiper.allowClick = true;
      swiper.updateSize();
      swiper.swipeDirection = undefined;
      if (params.threshold > 0) data.allowThresholdMove = false;

      if (e.type !== 'touchstart') {
        let preventDefault = true;

        if ($targetEl.is(data.focusableElements)) {
          preventDefault = false;

          if ($targetEl[0].nodeName === 'SELECT') {
            data.isTouched = false;
          }
        }

        if (document.activeElement && $(document.activeElement).is(data.focusableElements) && document.activeElement !== $targetEl[0]) {
          document.activeElement.blur();
        }

        const shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;

        if ((params.touchStartForcePreventDefault || shouldPreventDefault) && !$targetEl[0].isContentEditable) {
          e.preventDefault();
        }
      }

      if (swiper.params.freeMode && swiper.params.freeMode.enabled && swiper.freeMode && swiper.animating && !params.cssMode) {
        swiper.freeMode.onTouchStart();
      }

      swiper.emit('touchStart', e);
    }

    function onTouchMove(event) {
      const document = getDocument();
      const swiper = this;
      const data = swiper.touchEventsData;
      const {
        params,
        touches,
        rtlTranslate: rtl,
        enabled
      } = swiper;
      if (!enabled) return;
      let e = event;
      if (e.originalEvent) e = e.originalEvent;

      if (!data.isTouched) {
        if (data.startMoving && data.isScrolling) {
          swiper.emit('touchMoveOpposite', e);
        }

        return;
      }

      if (data.isTouchEvent && e.type !== 'touchmove') return;
      const targetTouch = e.type === 'touchmove' && e.targetTouches && (e.targetTouches[0] || e.changedTouches[0]);
      const pageX = e.type === 'touchmove' ? targetTouch.pageX : e.pageX;
      const pageY = e.type === 'touchmove' ? targetTouch.pageY : e.pageY;

      if (e.preventedByNestedSwiper) {
        touches.startX = pageX;
        touches.startY = pageY;
        return;
      }

      if (!swiper.allowTouchMove) {
        if (!$(e.target).is(data.focusableElements)) {
          swiper.allowClick = false;
        }

        if (data.isTouched) {
          Object.assign(touches, {
            startX: pageX,
            startY: pageY,
            currentX: pageX,
            currentY: pageY
          });
          data.touchStartTime = now();
        }

        return;
      }

      if (data.isTouchEvent && params.touchReleaseOnEdges && !params.loop) {
        if (swiper.isVertical()) {
          // Vertical
          if (pageY < touches.startY && swiper.translate <= swiper.maxTranslate() || pageY > touches.startY && swiper.translate >= swiper.minTranslate()) {
            data.isTouched = false;
            data.isMoved = false;
            return;
          }
        } else if (pageX < touches.startX && swiper.translate <= swiper.maxTranslate() || pageX > touches.startX && swiper.translate >= swiper.minTranslate()) {
          return;
        }
      }

      if (data.isTouchEvent && document.activeElement) {
        if (e.target === document.activeElement && $(e.target).is(data.focusableElements)) {
          data.isMoved = true;
          swiper.allowClick = false;
          return;
        }
      }

      if (data.allowTouchCallbacks) {
        swiper.emit('touchMove', e);
      }

      if (e.targetTouches && e.targetTouches.length > 1) return;
      touches.currentX = pageX;
      touches.currentY = pageY;
      const diffX = touches.currentX - touches.startX;
      const diffY = touches.currentY - touches.startY;
      if (swiper.params.threshold && Math.sqrt(diffX ** 2 + diffY ** 2) < swiper.params.threshold) return;

      if (typeof data.isScrolling === 'undefined') {
        let touchAngle;

        if (swiper.isHorizontal() && touches.currentY === touches.startY || swiper.isVertical() && touches.currentX === touches.startX) {
          data.isScrolling = false;
        } else {
          // eslint-disable-next-line
          if (diffX * diffX + diffY * diffY >= 25) {
            touchAngle = Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180 / Math.PI;
            data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : 90 - touchAngle > params.touchAngle;
          }
        }
      }

      if (data.isScrolling) {
        swiper.emit('touchMoveOpposite', e);
      }

      if (typeof data.startMoving === 'undefined') {
        if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) {
          data.startMoving = true;
        }
      }

      if (data.isScrolling) {
        data.isTouched = false;
        return;
      }

      if (!data.startMoving) {
        return;
      }

      swiper.allowClick = false;

      if (!params.cssMode && e.cancelable) {
        e.preventDefault();
      }

      if (params.touchMoveStopPropagation && !params.nested) {
        e.stopPropagation();
      }

      if (!data.isMoved) {
        if (params.loop && !params.cssMode) {
          swiper.loopFix();
        }

        data.startTranslate = swiper.getTranslate();
        swiper.setTransition(0);

        if (swiper.animating) {
          swiper.$wrapperEl.trigger('webkitTransitionEnd transitionend');
        }

        data.allowMomentumBounce = false; // Grab Cursor

        if (params.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
          swiper.setGrabCursor(true);
        }

        swiper.emit('sliderFirstMove', e);
      }

      swiper.emit('sliderMove', e);
      data.isMoved = true;
      let diff = swiper.isHorizontal() ? diffX : diffY;
      touches.diff = diff;
      diff *= params.touchRatio;
      if (rtl) diff = -diff;
      swiper.swipeDirection = diff > 0 ? 'prev' : 'next';
      data.currentTranslate = diff + data.startTranslate;
      let disableParentSwiper = true;
      let resistanceRatio = params.resistanceRatio;

      if (params.touchReleaseOnEdges) {
        resistanceRatio = 0;
      }

      if (diff > 0 && data.currentTranslate > swiper.minTranslate()) {
        disableParentSwiper = false;
        if (params.resistance) data.currentTranslate = swiper.minTranslate() - 1 + (-swiper.minTranslate() + data.startTranslate + diff) ** resistanceRatio;
      } else if (diff < 0 && data.currentTranslate < swiper.maxTranslate()) {
        disableParentSwiper = false;
        if (params.resistance) data.currentTranslate = swiper.maxTranslate() + 1 - (swiper.maxTranslate() - data.startTranslate - diff) ** resistanceRatio;
      }

      if (disableParentSwiper) {
        e.preventedByNestedSwiper = true;
      } // Directions locks


      if (!swiper.allowSlideNext && swiper.swipeDirection === 'next' && data.currentTranslate < data.startTranslate) {
        data.currentTranslate = data.startTranslate;
      }

      if (!swiper.allowSlidePrev && swiper.swipeDirection === 'prev' && data.currentTranslate > data.startTranslate) {
        data.currentTranslate = data.startTranslate;
      }

      if (!swiper.allowSlidePrev && !swiper.allowSlideNext) {
        data.currentTranslate = data.startTranslate;
      } // Threshold


      if (params.threshold > 0) {
        if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
          if (!data.allowThresholdMove) {
            data.allowThresholdMove = true;
            touches.startX = touches.currentX;
            touches.startY = touches.currentY;
            data.currentTranslate = data.startTranslate;
            touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
            return;
          }
        } else {
          data.currentTranslate = data.startTranslate;
          return;
        }
      }

      if (!params.followFinger || params.cssMode) return; // Update active index in free mode

      if (params.freeMode && params.freeMode.enabled && swiper.freeMode || params.watchSlidesProgress) {
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      }

      if (swiper.params.freeMode && params.freeMode.enabled && swiper.freeMode) {
        swiper.freeMode.onTouchMove();
      } // Update progress


      swiper.updateProgress(data.currentTranslate); // Update translate

      swiper.setTranslate(data.currentTranslate);
    }

    function onTouchEnd(event) {
      const swiper = this;
      const data = swiper.touchEventsData;
      const {
        params,
        touches,
        rtlTranslate: rtl,
        slidesGrid,
        enabled
      } = swiper;
      if (!enabled) return;
      let e = event;
      if (e.originalEvent) e = e.originalEvent;

      if (data.allowTouchCallbacks) {
        swiper.emit('touchEnd', e);
      }

      data.allowTouchCallbacks = false;

      if (!data.isTouched) {
        if (data.isMoved && params.grabCursor) {
          swiper.setGrabCursor(false);
        }

        data.isMoved = false;
        data.startMoving = false;
        return;
      } // Return Grab Cursor


      if (params.grabCursor && data.isMoved && data.isTouched && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
        swiper.setGrabCursor(false);
      } // Time diff


      const touchEndTime = now();
      const timeDiff = touchEndTime - data.touchStartTime; // Tap, doubleTap, Click

      if (swiper.allowClick) {
        const pathTree = e.path || e.composedPath && e.composedPath();
        swiper.updateClickedSlide(pathTree && pathTree[0] || e.target);
        swiper.emit('tap click', e);

        if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) {
          swiper.emit('doubleTap doubleClick', e);
        }
      }

      data.lastClickTime = now();
      nextTick(() => {
        if (!swiper.destroyed) swiper.allowClick = true;
      });

      if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || touches.diff === 0 || data.currentTranslate === data.startTranslate) {
        data.isTouched = false;
        data.isMoved = false;
        data.startMoving = false;
        return;
      }

      data.isTouched = false;
      data.isMoved = false;
      data.startMoving = false;
      let currentPos;

      if (params.followFinger) {
        currentPos = rtl ? swiper.translate : -swiper.translate;
      } else {
        currentPos = -data.currentTranslate;
      }

      if (params.cssMode) {
        return;
      }

      if (swiper.params.freeMode && params.freeMode.enabled) {
        swiper.freeMode.onTouchEnd({
          currentPos
        });
        return;
      } // Find current slide


      let stopIndex = 0;
      let groupSize = swiper.slidesSizesGrid[0];

      for (let i = 0; i < slidesGrid.length; i += i < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup) {
        const increment = i < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;

        if (typeof slidesGrid[i + increment] !== 'undefined') {
          if (currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + increment]) {
            stopIndex = i;
            groupSize = slidesGrid[i + increment] - slidesGrid[i];
          }
        } else if (currentPos >= slidesGrid[i]) {
          stopIndex = i;
          groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
        }
      }

      let rewindFirstIndex = null;
      let rewindLastIndex = null;

      if (params.rewind) {
        if (swiper.isBeginning) {
          rewindLastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
        } else if (swiper.isEnd) {
          rewindFirstIndex = 0;
        }
      } // Find current slide size


      const ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
      const increment = stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;

      if (timeDiff > params.longSwipesMs) {
        // Long touches
        if (!params.longSwipes) {
          swiper.slideTo(swiper.activeIndex);
          return;
        }

        if (swiper.swipeDirection === 'next') {
          if (ratio >= params.longSwipesRatio) swiper.slideTo(params.rewind && swiper.isEnd ? rewindFirstIndex : stopIndex + increment);else swiper.slideTo(stopIndex);
        }

        if (swiper.swipeDirection === 'prev') {
          if (ratio > 1 - params.longSwipesRatio) {
            swiper.slideTo(stopIndex + increment);
          } else if (rewindLastIndex !== null && ratio < 0 && Math.abs(ratio) > params.longSwipesRatio) {
            swiper.slideTo(rewindLastIndex);
          } else {
            swiper.slideTo(stopIndex);
          }
        }
      } else {
        // Short swipes
        if (!params.shortSwipes) {
          swiper.slideTo(swiper.activeIndex);
          return;
        }

        const isNavButtonTarget = swiper.navigation && (e.target === swiper.navigation.nextEl || e.target === swiper.navigation.prevEl);

        if (!isNavButtonTarget) {
          if (swiper.swipeDirection === 'next') {
            swiper.slideTo(rewindFirstIndex !== null ? rewindFirstIndex : stopIndex + increment);
          }

          if (swiper.swipeDirection === 'prev') {
            swiper.slideTo(rewindLastIndex !== null ? rewindLastIndex : stopIndex);
          }
        } else if (e.target === swiper.navigation.nextEl) {
          swiper.slideTo(stopIndex + increment);
        } else {
          swiper.slideTo(stopIndex);
        }
      }
    }

    function onResize() {
      const swiper = this;
      const {
        params,
        el
      } = swiper;
      if (el && el.offsetWidth === 0) return; // Breakpoints

      if (params.breakpoints) {
        swiper.setBreakpoint();
      } // Save locks


      const {
        allowSlideNext,
        allowSlidePrev,
        snapGrid
      } = swiper; // Disable locks on resize

      swiper.allowSlideNext = true;
      swiper.allowSlidePrev = true;
      swiper.updateSize();
      swiper.updateSlides();
      swiper.updateSlidesClasses();

      if ((params.slidesPerView === 'auto' || params.slidesPerView > 1) && swiper.isEnd && !swiper.isBeginning && !swiper.params.centeredSlides) {
        swiper.slideTo(swiper.slides.length - 1, 0, false, true);
      } else {
        swiper.slideTo(swiper.activeIndex, 0, false, true);
      }

      if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
        swiper.autoplay.run();
      } // Return locks after resize


      swiper.allowSlidePrev = allowSlidePrev;
      swiper.allowSlideNext = allowSlideNext;

      if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) {
        swiper.checkOverflow();
      }
    }

    function onClick(e) {
      const swiper = this;
      if (!swiper.enabled) return;

      if (!swiper.allowClick) {
        if (swiper.params.preventClicks) e.preventDefault();

        if (swiper.params.preventClicksPropagation && swiper.animating) {
          e.stopPropagation();
          e.stopImmediatePropagation();
        }
      }
    }

    function onScroll() {
      const swiper = this;
      const {
        wrapperEl,
        rtlTranslate,
        enabled
      } = swiper;
      if (!enabled) return;
      swiper.previousTranslate = swiper.translate;

      if (swiper.isHorizontal()) {
        swiper.translate = -wrapperEl.scrollLeft;
      } else {
        swiper.translate = -wrapperEl.scrollTop;
      } // eslint-disable-next-line


      if (swiper.translate === 0) swiper.translate = 0;
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
      let newProgress;
      const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();

      if (translatesDiff === 0) {
        newProgress = 0;
      } else {
        newProgress = (swiper.translate - swiper.minTranslate()) / translatesDiff;
      }

      if (newProgress !== swiper.progress) {
        swiper.updateProgress(rtlTranslate ? -swiper.translate : swiper.translate);
      }

      swiper.emit('setTranslate', swiper.translate, false);
    }

    let dummyEventAttached = false;

    function dummyEventListener() {}

    const events = (swiper, method) => {
      const document = getDocument();
      const {
        params,
        touchEvents,
        el,
        wrapperEl,
        device,
        support
      } = swiper;
      const capture = !!params.nested;
      const domMethod = method === 'on' ? 'addEventListener' : 'removeEventListener';
      const swiperMethod = method; // Touch Events

      if (!support.touch) {
        el[domMethod](touchEvents.start, swiper.onTouchStart, false);
        document[domMethod](touchEvents.move, swiper.onTouchMove, capture);
        document[domMethod](touchEvents.end, swiper.onTouchEnd, false);
      } else {
        const passiveListener = touchEvents.start === 'touchstart' && support.passiveListener && params.passiveListeners ? {
          passive: true,
          capture: false
        } : false;
        el[domMethod](touchEvents.start, swiper.onTouchStart, passiveListener);
        el[domMethod](touchEvents.move, swiper.onTouchMove, support.passiveListener ? {
          passive: false,
          capture
        } : capture);
        el[domMethod](touchEvents.end, swiper.onTouchEnd, passiveListener);

        if (touchEvents.cancel) {
          el[domMethod](touchEvents.cancel, swiper.onTouchEnd, passiveListener);
        }
      } // Prevent Links Clicks


      if (params.preventClicks || params.preventClicksPropagation) {
        el[domMethod]('click', swiper.onClick, true);
      }

      if (params.cssMode) {
        wrapperEl[domMethod]('scroll', swiper.onScroll);
      } // Resize handler


      if (params.updateOnWindowResize) {
        swiper[swiperMethod](device.ios || device.android ? 'resize orientationchange observerUpdate' : 'resize observerUpdate', onResize, true);
      } else {
        swiper[swiperMethod]('observerUpdate', onResize, true);
      }
    };

    function attachEvents() {
      const swiper = this;
      const document = getDocument();
      const {
        params,
        support
      } = swiper;
      swiper.onTouchStart = onTouchStart.bind(swiper);
      swiper.onTouchMove = onTouchMove.bind(swiper);
      swiper.onTouchEnd = onTouchEnd.bind(swiper);

      if (params.cssMode) {
        swiper.onScroll = onScroll.bind(swiper);
      }

      swiper.onClick = onClick.bind(swiper);

      if (support.touch && !dummyEventAttached) {
        document.addEventListener('touchstart', dummyEventListener);
        dummyEventAttached = true;
      }

      events(swiper, 'on');
    }

    function detachEvents() {
      const swiper = this;
      events(swiper, 'off');
    }

    var events$1 = {
      attachEvents,
      detachEvents
    };

    const isGridEnabled = (swiper, params) => {
      return swiper.grid && params.grid && params.grid.rows > 1;
    };

    function setBreakpoint() {
      const swiper = this;
      const {
        activeIndex,
        initialized,
        loopedSlides = 0,
        params,
        $el
      } = swiper;
      const breakpoints = params.breakpoints;
      if (!breakpoints || breakpoints && Object.keys(breakpoints).length === 0) return; // Get breakpoint for window width and update parameters

      const breakpoint = swiper.getBreakpoint(breakpoints, swiper.params.breakpointsBase, swiper.el);
      if (!breakpoint || swiper.currentBreakpoint === breakpoint) return;
      const breakpointOnlyParams = breakpoint in breakpoints ? breakpoints[breakpoint] : undefined;
      const breakpointParams = breakpointOnlyParams || swiper.originalParams;
      const wasMultiRow = isGridEnabled(swiper, params);
      const isMultiRow = isGridEnabled(swiper, breakpointParams);
      const wasEnabled = params.enabled;

      if (wasMultiRow && !isMultiRow) {
        $el.removeClass(`${params.containerModifierClass}grid ${params.containerModifierClass}grid-column`);
        swiper.emitContainerClasses();
      } else if (!wasMultiRow && isMultiRow) {
        $el.addClass(`${params.containerModifierClass}grid`);

        if (breakpointParams.grid.fill && breakpointParams.grid.fill === 'column' || !breakpointParams.grid.fill && params.grid.fill === 'column') {
          $el.addClass(`${params.containerModifierClass}grid-column`);
        }

        swiper.emitContainerClasses();
      }

      const directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction;
      const needsReLoop = params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);

      if (directionChanged && initialized) {
        swiper.changeDirection();
      }

      extend$1(swiper.params, breakpointParams);
      const isEnabled = swiper.params.enabled;
      Object.assign(swiper, {
        allowTouchMove: swiper.params.allowTouchMove,
        allowSlideNext: swiper.params.allowSlideNext,
        allowSlidePrev: swiper.params.allowSlidePrev
      });

      if (wasEnabled && !isEnabled) {
        swiper.disable();
      } else if (!wasEnabled && isEnabled) {
        swiper.enable();
      }

      swiper.currentBreakpoint = breakpoint;
      swiper.emit('_beforeBreakpoint', breakpointParams);

      if (needsReLoop && initialized) {
        swiper.loopDestroy();
        swiper.loopCreate();
        swiper.updateSlides();
        swiper.slideTo(activeIndex - loopedSlides + swiper.loopedSlides, 0, false);
      }

      swiper.emit('breakpoint', breakpointParams);
    }

    function getBreakpoint(breakpoints, base, containerEl) {
      if (base === void 0) {
        base = 'window';
      }

      if (!breakpoints || base === 'container' && !containerEl) return undefined;
      let breakpoint = false;
      const window = getWindow();
      const currentHeight = base === 'window' ? window.innerHeight : containerEl.clientHeight;
      const points = Object.keys(breakpoints).map(point => {
        if (typeof point === 'string' && point.indexOf('@') === 0) {
          const minRatio = parseFloat(point.substr(1));
          const value = currentHeight * minRatio;
          return {
            value,
            point
          };
        }

        return {
          value: point,
          point
        };
      });
      points.sort((a, b) => parseInt(a.value, 10) - parseInt(b.value, 10));

      for (let i = 0; i < points.length; i += 1) {
        const {
          point,
          value
        } = points[i];

        if (base === 'window') {
          if (window.matchMedia(`(min-width: ${value}px)`).matches) {
            breakpoint = point;
          }
        } else if (value <= containerEl.clientWidth) {
          breakpoint = point;
        }
      }

      return breakpoint || 'max';
    }

    var breakpoints = {
      setBreakpoint,
      getBreakpoint
    };

    function prepareClasses(entries, prefix) {
      const resultClasses = [];
      entries.forEach(item => {
        if (typeof item === 'object') {
          Object.keys(item).forEach(classNames => {
            if (item[classNames]) {
              resultClasses.push(prefix + classNames);
            }
          });
        } else if (typeof item === 'string') {
          resultClasses.push(prefix + item);
        }
      });
      return resultClasses;
    }

    function addClasses() {
      const swiper = this;
      const {
        classNames,
        params,
        rtl,
        $el,
        device,
        support
      } = swiper; // prettier-ignore

      const suffixes = prepareClasses(['initialized', params.direction, {
        'pointer-events': !support.touch
      }, {
        'free-mode': swiper.params.freeMode && params.freeMode.enabled
      }, {
        'autoheight': params.autoHeight
      }, {
        'rtl': rtl
      }, {
        'grid': params.grid && params.grid.rows > 1
      }, {
        'grid-column': params.grid && params.grid.rows > 1 && params.grid.fill === 'column'
      }, {
        'android': device.android
      }, {
        'ios': device.ios
      }, {
        'css-mode': params.cssMode
      }, {
        'centered': params.cssMode && params.centeredSlides
      }, {
        'watch-progress': params.watchSlidesProgress
      }], params.containerModifierClass);
      classNames.push(...suffixes);
      $el.addClass([...classNames].join(' '));
      swiper.emitContainerClasses();
    }

    function removeClasses() {
      const swiper = this;
      const {
        $el,
        classNames
      } = swiper;
      $el.removeClass(classNames.join(' '));
      swiper.emitContainerClasses();
    }

    var classes = {
      addClasses,
      removeClasses
    };

    function loadImage(imageEl, src, srcset, sizes, checkForComplete, callback) {
      const window = getWindow();
      let image;

      function onReady() {
        if (callback) callback();
      }

      const isPicture = $(imageEl).parent('picture')[0];

      if (!isPicture && (!imageEl.complete || !checkForComplete)) {
        if (src) {
          image = new window.Image();
          image.onload = onReady;
          image.onerror = onReady;

          if (sizes) {
            image.sizes = sizes;
          }

          if (srcset) {
            image.srcset = srcset;
          }

          if (src) {
            image.src = src;
          }
        } else {
          onReady();
        }
      } else {
        // image already loaded...
        onReady();
      }
    }

    function preloadImages() {
      const swiper = this;
      swiper.imagesToLoad = swiper.$el.find('img');

      function onReady() {
        if (typeof swiper === 'undefined' || swiper === null || !swiper || swiper.destroyed) return;
        if (swiper.imagesLoaded !== undefined) swiper.imagesLoaded += 1;

        if (swiper.imagesLoaded === swiper.imagesToLoad.length) {
          if (swiper.params.updateOnImagesReady) swiper.update();
          swiper.emit('imagesReady');
        }
      }

      for (let i = 0; i < swiper.imagesToLoad.length; i += 1) {
        const imageEl = swiper.imagesToLoad[i];
        swiper.loadImage(imageEl, imageEl.currentSrc || imageEl.getAttribute('src'), imageEl.srcset || imageEl.getAttribute('srcset'), imageEl.sizes || imageEl.getAttribute('sizes'), true, onReady);
      }
    }

    var images = {
      loadImage,
      preloadImages
    };

    function checkOverflow() {
      const swiper = this;
      const {
        isLocked: wasLocked,
        params
      } = swiper;
      const {
        slidesOffsetBefore
      } = params;

      if (slidesOffsetBefore) {
        const lastSlideIndex = swiper.slides.length - 1;
        const lastSlideRightEdge = swiper.slidesGrid[lastSlideIndex] + swiper.slidesSizesGrid[lastSlideIndex] + slidesOffsetBefore * 2;
        swiper.isLocked = swiper.size > lastSlideRightEdge;
      } else {
        swiper.isLocked = swiper.snapGrid.length === 1;
      }

      if (params.allowSlideNext === true) {
        swiper.allowSlideNext = !swiper.isLocked;
      }

      if (params.allowSlidePrev === true) {
        swiper.allowSlidePrev = !swiper.isLocked;
      }

      if (wasLocked && wasLocked !== swiper.isLocked) {
        swiper.isEnd = false;
      }

      if (wasLocked !== swiper.isLocked) {
        swiper.emit(swiper.isLocked ? 'lock' : 'unlock');
      }
    }

    var checkOverflow$1 = {
      checkOverflow
    };

    var defaults = {
      init: true,
      direction: 'horizontal',
      touchEventsTarget: 'wrapper',
      initialSlide: 0,
      speed: 300,
      cssMode: false,
      updateOnWindowResize: true,
      resizeObserver: true,
      nested: false,
      createElements: false,
      enabled: true,
      focusableElements: 'input, select, option, textarea, button, video, label',
      // Overrides
      width: null,
      height: null,
      //
      preventInteractionOnTransition: false,
      // ssr
      userAgent: null,
      url: null,
      // To support iOS's swipe-to-go-back gesture (when being used in-app).
      edgeSwipeDetection: false,
      edgeSwipeThreshold: 20,
      // Autoheight
      autoHeight: false,
      // Set wrapper width
      setWrapperSize: false,
      // Virtual Translate
      virtualTranslate: false,
      // Effects
      effect: 'slide',
      // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
      // Breakpoints
      breakpoints: undefined,
      breakpointsBase: 'window',
      // Slides grid
      spaceBetween: 0,
      slidesPerView: 1,
      slidesPerGroup: 1,
      slidesPerGroupSkip: 0,
      slidesPerGroupAuto: false,
      centeredSlides: false,
      centeredSlidesBounds: false,
      slidesOffsetBefore: 0,
      // in px
      slidesOffsetAfter: 0,
      // in px
      normalizeSlideIndex: true,
      centerInsufficientSlides: false,
      // Disable swiper and hide navigation when container not overflow
      watchOverflow: true,
      // Round length
      roundLengths: false,
      // Touches
      touchRatio: 1,
      touchAngle: 45,
      simulateTouch: true,
      shortSwipes: true,
      longSwipes: true,
      longSwipesRatio: 0.5,
      longSwipesMs: 300,
      followFinger: true,
      allowTouchMove: true,
      threshold: 0,
      touchMoveStopPropagation: false,
      touchStartPreventDefault: true,
      touchStartForcePreventDefault: false,
      touchReleaseOnEdges: false,
      // Unique Navigation Elements
      uniqueNavElements: true,
      // Resistance
      resistance: true,
      resistanceRatio: 0.85,
      // Progress
      watchSlidesProgress: false,
      // Cursor
      grabCursor: false,
      // Clicks
      preventClicks: true,
      preventClicksPropagation: true,
      slideToClickedSlide: false,
      // Images
      preloadImages: true,
      updateOnImagesReady: true,
      // loop
      loop: false,
      loopAdditionalSlides: 0,
      loopedSlides: null,
      loopFillGroupWithBlank: false,
      loopPreventsSlide: true,
      // rewind
      rewind: false,
      // Swiping/no swiping
      allowSlidePrev: true,
      allowSlideNext: true,
      swipeHandler: null,
      // '.swipe-handler',
      noSwiping: true,
      noSwipingClass: 'swiper-no-swiping',
      noSwipingSelector: null,
      // Passive Listeners
      passiveListeners: true,
      maxBackfaceHiddenSlides: 10,
      // NS
      containerModifierClass: 'swiper-',
      // NEW
      slideClass: 'swiper-slide',
      slideBlankClass: 'swiper-slide-invisible-blank',
      slideActiveClass: 'swiper-slide-active',
      slideDuplicateActiveClass: 'swiper-slide-duplicate-active',
      slideVisibleClass: 'swiper-slide-visible',
      slideDuplicateClass: 'swiper-slide-duplicate',
      slideNextClass: 'swiper-slide-next',
      slideDuplicateNextClass: 'swiper-slide-duplicate-next',
      slidePrevClass: 'swiper-slide-prev',
      slideDuplicatePrevClass: 'swiper-slide-duplicate-prev',
      wrapperClass: 'swiper-wrapper',
      // Callbacks
      runCallbacksOnInit: true,
      // Internals
      _emitClasses: false
    };

    function moduleExtendParams(params, allModulesParams) {
      return function extendParams(obj) {
        if (obj === void 0) {
          obj = {};
        }

        const moduleParamName = Object.keys(obj)[0];
        const moduleParams = obj[moduleParamName];

        if (typeof moduleParams !== 'object' || moduleParams === null) {
          extend$1(allModulesParams, obj);
          return;
        }

        if (['navigation', 'pagination', 'scrollbar'].indexOf(moduleParamName) >= 0 && params[moduleParamName] === true) {
          params[moduleParamName] = {
            auto: true
          };
        }

        if (!(moduleParamName in params && 'enabled' in moduleParams)) {
          extend$1(allModulesParams, obj);
          return;
        }

        if (params[moduleParamName] === true) {
          params[moduleParamName] = {
            enabled: true
          };
        }

        if (typeof params[moduleParamName] === 'object' && !('enabled' in params[moduleParamName])) {
          params[moduleParamName].enabled = true;
        }

        if (!params[moduleParamName]) params[moduleParamName] = {
          enabled: false
        };
        extend$1(allModulesParams, obj);
      };
    }

    /* eslint no-param-reassign: "off" */
    const prototypes = {
      eventsEmitter,
      update,
      translate,
      transition,
      slide,
      loop,
      grabCursor,
      events: events$1,
      breakpoints,
      checkOverflow: checkOverflow$1,
      classes,
      images
    };
    const extendedDefaults = {};

    class Swiper$1 {
      constructor() {
        let el;
        let params;

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        if (args.length === 1 && args[0].constructor && Object.prototype.toString.call(args[0]).slice(8, -1) === 'Object') {
          params = args[0];
        } else {
          [el, params] = args;
        }

        if (!params) params = {};
        params = extend$1({}, params);
        if (el && !params.el) params.el = el;

        if (params.el && $(params.el).length > 1) {
          const swipers = [];
          $(params.el).each(containerEl => {
            const newParams = extend$1({}, params, {
              el: containerEl
            });
            swipers.push(new Swiper$1(newParams));
          });
          return swipers;
        } // Swiper Instance


        const swiper = this;
        swiper.__swiper__ = true;
        swiper.support = getSupport();
        swiper.device = getDevice({
          userAgent: params.userAgent
        });
        swiper.browser = getBrowser();
        swiper.eventsListeners = {};
        swiper.eventsAnyListeners = [];
        swiper.modules = [...swiper.__modules__];

        if (params.modules && Array.isArray(params.modules)) {
          swiper.modules.push(...params.modules);
        }

        const allModulesParams = {};
        swiper.modules.forEach(mod => {
          mod({
            swiper,
            extendParams: moduleExtendParams(params, allModulesParams),
            on: swiper.on.bind(swiper),
            once: swiper.once.bind(swiper),
            off: swiper.off.bind(swiper),
            emit: swiper.emit.bind(swiper)
          });
        }); // Extend defaults with modules params

        const swiperParams = extend$1({}, defaults, allModulesParams); // Extend defaults with passed params

        swiper.params = extend$1({}, swiperParams, extendedDefaults, params);
        swiper.originalParams = extend$1({}, swiper.params);
        swiper.passedParams = extend$1({}, params); // add event listeners

        if (swiper.params && swiper.params.on) {
          Object.keys(swiper.params.on).forEach(eventName => {
            swiper.on(eventName, swiper.params.on[eventName]);
          });
        }

        if (swiper.params && swiper.params.onAny) {
          swiper.onAny(swiper.params.onAny);
        } // Save Dom lib


        swiper.$ = $; // Extend Swiper

        Object.assign(swiper, {
          enabled: swiper.params.enabled,
          el,
          // Classes
          classNames: [],
          // Slides
          slides: $(),
          slidesGrid: [],
          snapGrid: [],
          slidesSizesGrid: [],

          // isDirection
          isHorizontal() {
            return swiper.params.direction === 'horizontal';
          },

          isVertical() {
            return swiper.params.direction === 'vertical';
          },

          // Indexes
          activeIndex: 0,
          realIndex: 0,
          //
          isBeginning: true,
          isEnd: false,
          // Props
          translate: 0,
          previousTranslate: 0,
          progress: 0,
          velocity: 0,
          animating: false,
          // Locks
          allowSlideNext: swiper.params.allowSlideNext,
          allowSlidePrev: swiper.params.allowSlidePrev,
          // Touch Events
          touchEvents: function touchEvents() {
            const touch = ['touchstart', 'touchmove', 'touchend', 'touchcancel'];
            const desktop = ['pointerdown', 'pointermove', 'pointerup'];
            swiper.touchEventsTouch = {
              start: touch[0],
              move: touch[1],
              end: touch[2],
              cancel: touch[3]
            };
            swiper.touchEventsDesktop = {
              start: desktop[0],
              move: desktop[1],
              end: desktop[2]
            };
            return swiper.support.touch || !swiper.params.simulateTouch ? swiper.touchEventsTouch : swiper.touchEventsDesktop;
          }(),
          touchEventsData: {
            isTouched: undefined,
            isMoved: undefined,
            allowTouchCallbacks: undefined,
            touchStartTime: undefined,
            isScrolling: undefined,
            currentTranslate: undefined,
            startTranslate: undefined,
            allowThresholdMove: undefined,
            // Form elements to match
            focusableElements: swiper.params.focusableElements,
            // Last click time
            lastClickTime: now(),
            clickTimeout: undefined,
            // Velocities
            velocities: [],
            allowMomentumBounce: undefined,
            isTouchEvent: undefined,
            startMoving: undefined
          },
          // Clicks
          allowClick: true,
          // Touches
          allowTouchMove: swiper.params.allowTouchMove,
          touches: {
            startX: 0,
            startY: 0,
            currentX: 0,
            currentY: 0,
            diff: 0
          },
          // Images
          imagesToLoad: [],
          imagesLoaded: 0
        });
        swiper.emit('_swiper'); // Init

        if (swiper.params.init) {
          swiper.init();
        } // Return app instance


        return swiper;
      }

      enable() {
        const swiper = this;
        if (swiper.enabled) return;
        swiper.enabled = true;

        if (swiper.params.grabCursor) {
          swiper.setGrabCursor();
        }

        swiper.emit('enable');
      }

      disable() {
        const swiper = this;
        if (!swiper.enabled) return;
        swiper.enabled = false;

        if (swiper.params.grabCursor) {
          swiper.unsetGrabCursor();
        }

        swiper.emit('disable');
      }

      setProgress(progress, speed) {
        const swiper = this;
        progress = Math.min(Math.max(progress, 0), 1);
        const min = swiper.minTranslate();
        const max = swiper.maxTranslate();
        const current = (max - min) * progress + min;
        swiper.translateTo(current, typeof speed === 'undefined' ? 0 : speed);
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      }

      emitContainerClasses() {
        const swiper = this;
        if (!swiper.params._emitClasses || !swiper.el) return;
        const cls = swiper.el.className.split(' ').filter(className => {
          return className.indexOf('swiper') === 0 || className.indexOf(swiper.params.containerModifierClass) === 0;
        });
        swiper.emit('_containerClasses', cls.join(' '));
      }

      getSlideClasses(slideEl) {
        const swiper = this;
        if (swiper.destroyed) return '';
        return slideEl.className.split(' ').filter(className => {
          return className.indexOf('swiper-slide') === 0 || className.indexOf(swiper.params.slideClass) === 0;
        }).join(' ');
      }

      emitSlidesClasses() {
        const swiper = this;
        if (!swiper.params._emitClasses || !swiper.el) return;
        const updates = [];
        swiper.slides.each(slideEl => {
          const classNames = swiper.getSlideClasses(slideEl);
          updates.push({
            slideEl,
            classNames
          });
          swiper.emit('_slideClass', slideEl, classNames);
        });
        swiper.emit('_slideClasses', updates);
      }

      slidesPerViewDynamic(view, exact) {
        if (view === void 0) {
          view = 'current';
        }

        if (exact === void 0) {
          exact = false;
        }

        const swiper = this;
        const {
          params,
          slides,
          slidesGrid,
          slidesSizesGrid,
          size: swiperSize,
          activeIndex
        } = swiper;
        let spv = 1;

        if (params.centeredSlides) {
          let slideSize = slides[activeIndex].swiperSlideSize;
          let breakLoop;

          for (let i = activeIndex + 1; i < slides.length; i += 1) {
            if (slides[i] && !breakLoop) {
              slideSize += slides[i].swiperSlideSize;
              spv += 1;
              if (slideSize > swiperSize) breakLoop = true;
            }
          }

          for (let i = activeIndex - 1; i >= 0; i -= 1) {
            if (slides[i] && !breakLoop) {
              slideSize += slides[i].swiperSlideSize;
              spv += 1;
              if (slideSize > swiperSize) breakLoop = true;
            }
          }
        } else {
          // eslint-disable-next-line
          if (view === 'current') {
            for (let i = activeIndex + 1; i < slides.length; i += 1) {
              const slideInView = exact ? slidesGrid[i] + slidesSizesGrid[i] - slidesGrid[activeIndex] < swiperSize : slidesGrid[i] - slidesGrid[activeIndex] < swiperSize;

              if (slideInView) {
                spv += 1;
              }
            }
          } else {
            // previous
            for (let i = activeIndex - 1; i >= 0; i -= 1) {
              const slideInView = slidesGrid[activeIndex] - slidesGrid[i] < swiperSize;

              if (slideInView) {
                spv += 1;
              }
            }
          }
        }

        return spv;
      }

      update() {
        const swiper = this;
        if (!swiper || swiper.destroyed) return;
        const {
          snapGrid,
          params
        } = swiper; // Breakpoints

        if (params.breakpoints) {
          swiper.setBreakpoint();
        }

        swiper.updateSize();
        swiper.updateSlides();
        swiper.updateProgress();
        swiper.updateSlidesClasses();

        function setTranslate() {
          const translateValue = swiper.rtlTranslate ? swiper.translate * -1 : swiper.translate;
          const newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
          swiper.setTranslate(newTranslate);
          swiper.updateActiveIndex();
          swiper.updateSlidesClasses();
        }

        let translated;

        if (swiper.params.freeMode && swiper.params.freeMode.enabled) {
          setTranslate();

          if (swiper.params.autoHeight) {
            swiper.updateAutoHeight();
          }
        } else {
          if ((swiper.params.slidesPerView === 'auto' || swiper.params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) {
            translated = swiper.slideTo(swiper.slides.length - 1, 0, false, true);
          } else {
            translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
          }

          if (!translated) {
            setTranslate();
          }
        }

        if (params.watchOverflow && snapGrid !== swiper.snapGrid) {
          swiper.checkOverflow();
        }

        swiper.emit('update');
      }

      changeDirection(newDirection, needUpdate) {
        if (needUpdate === void 0) {
          needUpdate = true;
        }

        const swiper = this;
        const currentDirection = swiper.params.direction;

        if (!newDirection) {
          // eslint-disable-next-line
          newDirection = currentDirection === 'horizontal' ? 'vertical' : 'horizontal';
        }

        if (newDirection === currentDirection || newDirection !== 'horizontal' && newDirection !== 'vertical') {
          return swiper;
        }

        swiper.$el.removeClass(`${swiper.params.containerModifierClass}${currentDirection}`).addClass(`${swiper.params.containerModifierClass}${newDirection}`);
        swiper.emitContainerClasses();
        swiper.params.direction = newDirection;
        swiper.slides.each(slideEl => {
          if (newDirection === 'vertical') {
            slideEl.style.width = '';
          } else {
            slideEl.style.height = '';
          }
        });
        swiper.emit('changeDirection');
        if (needUpdate) swiper.update();
        return swiper;
      }

      mount(el) {
        const swiper = this;
        if (swiper.mounted) return true; // Find el

        const $el = $(el || swiper.params.el);
        el = $el[0];

        if (!el) {
          return false;
        }

        el.swiper = swiper;

        const getWrapperSelector = () => {
          return `.${(swiper.params.wrapperClass || '').trim().split(' ').join('.')}`;
        };

        const getWrapper = () => {
          if (el && el.shadowRoot && el.shadowRoot.querySelector) {
            const res = $(el.shadowRoot.querySelector(getWrapperSelector())); // Children needs to return slot items

            res.children = options => $el.children(options);

            return res;
          }

          if (!$el.children) {
            return $($el).children(getWrapperSelector());
          }

          return $el.children(getWrapperSelector());
        }; // Find Wrapper


        let $wrapperEl = getWrapper();

        if ($wrapperEl.length === 0 && swiper.params.createElements) {
          const document = getDocument();
          const wrapper = document.createElement('div');
          $wrapperEl = $(wrapper);
          wrapper.className = swiper.params.wrapperClass;
          $el.append(wrapper);
          $el.children(`.${swiper.params.slideClass}`).each(slideEl => {
            $wrapperEl.append(slideEl);
          });
        }

        Object.assign(swiper, {
          $el,
          el,
          $wrapperEl,
          wrapperEl: $wrapperEl[0],
          mounted: true,
          // RTL
          rtl: el.dir.toLowerCase() === 'rtl' || $el.css('direction') === 'rtl',
          rtlTranslate: swiper.params.direction === 'horizontal' && (el.dir.toLowerCase() === 'rtl' || $el.css('direction') === 'rtl'),
          wrongRTL: $wrapperEl.css('display') === '-webkit-box'
        });
        return true;
      }

      init(el) {
        const swiper = this;
        if (swiper.initialized) return swiper;
        const mounted = swiper.mount(el);
        if (mounted === false) return swiper;
        swiper.emit('beforeInit'); // Set breakpoint

        if (swiper.params.breakpoints) {
          swiper.setBreakpoint();
        } // Add Classes


        swiper.addClasses(); // Create loop

        if (swiper.params.loop) {
          swiper.loopCreate();
        } // Update size


        swiper.updateSize(); // Update slides

        swiper.updateSlides();

        if (swiper.params.watchOverflow) {
          swiper.checkOverflow();
        } // Set Grab Cursor


        if (swiper.params.grabCursor && swiper.enabled) {
          swiper.setGrabCursor();
        }

        if (swiper.params.preloadImages) {
          swiper.preloadImages();
        } // Slide To Initial Slide


        if (swiper.params.loop) {
          swiper.slideTo(swiper.params.initialSlide + swiper.loopedSlides, 0, swiper.params.runCallbacksOnInit, false, true);
        } else {
          swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit, false, true);
        } // Attach events


        swiper.attachEvents(); // Init Flag

        swiper.initialized = true; // Emit

        swiper.emit('init');
        swiper.emit('afterInit');
        return swiper;
      }

      destroy(deleteInstance, cleanStyles) {
        if (deleteInstance === void 0) {
          deleteInstance = true;
        }

        if (cleanStyles === void 0) {
          cleanStyles = true;
        }

        const swiper = this;
        const {
          params,
          $el,
          $wrapperEl,
          slides
        } = swiper;

        if (typeof swiper.params === 'undefined' || swiper.destroyed) {
          return null;
        }

        swiper.emit('beforeDestroy'); // Init Flag

        swiper.initialized = false; // Detach events

        swiper.detachEvents(); // Destroy loop

        if (params.loop) {
          swiper.loopDestroy();
        } // Cleanup styles


        if (cleanStyles) {
          swiper.removeClasses();
          $el.removeAttr('style');
          $wrapperEl.removeAttr('style');

          if (slides && slides.length) {
            slides.removeClass([params.slideVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass].join(' ')).removeAttr('style').removeAttr('data-swiper-slide-index');
          }
        }

        swiper.emit('destroy'); // Detach emitter events

        Object.keys(swiper.eventsListeners).forEach(eventName => {
          swiper.off(eventName);
        });

        if (deleteInstance !== false) {
          swiper.$el[0].swiper = null;
          deleteProps(swiper);
        }

        swiper.destroyed = true;
        return null;
      }

      static extendDefaults(newDefaults) {
        extend$1(extendedDefaults, newDefaults);
      }

      static get extendedDefaults() {
        return extendedDefaults;
      }

      static get defaults() {
        return defaults;
      }

      static installModule(mod) {
        if (!Swiper$1.prototype.__modules__) Swiper$1.prototype.__modules__ = [];
        const modules = Swiper$1.prototype.__modules__;

        if (typeof mod === 'function' && modules.indexOf(mod) < 0) {
          modules.push(mod);
        }
      }

      static use(module) {
        if (Array.isArray(module)) {
          module.forEach(m => Swiper$1.installModule(m));
          return Swiper$1;
        }

        Swiper$1.installModule(module);
        return Swiper$1;
      }

    }

    Object.keys(prototypes).forEach(prototypeGroup => {
      Object.keys(prototypes[prototypeGroup]).forEach(protoMethod => {
        Swiper$1.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
      });
    });
    Swiper$1.use([Resize, Observer]);

    function createElementIfNotDefined(swiper, originalParams, params, checkProps) {
      const document = getDocument();

      if (swiper.params.createElements) {
        Object.keys(checkProps).forEach(key => {
          if (!params[key] && params.auto === true) {
            let element = swiper.$el.children(`.${checkProps[key]}`)[0];

            if (!element) {
              element = document.createElement('div');
              element.className = checkProps[key];
              swiper.$el.append(element);
            }

            params[key] = element;
            originalParams[key] = element;
          }
        });
      }

      return params;
    }

    function classesToSelector(classes) {
      if (classes === void 0) {
        classes = '';
      }

      return `.${classes.trim().replace(/([\.:!\/])/g, '\\$1') // eslint-disable-line
  .replace(/ /g, '.')}`;
    }

    function Pagination(_ref) {
      let {
        swiper,
        extendParams,
        on,
        emit
      } = _ref;
      const pfx = 'swiper-pagination';
      extendParams({
        pagination: {
          el: null,
          bulletElement: 'span',
          clickable: false,
          hideOnClick: false,
          renderBullet: null,
          renderProgressbar: null,
          renderFraction: null,
          renderCustom: null,
          progressbarOpposite: false,
          type: 'bullets',
          // 'bullets' or 'progressbar' or 'fraction' or 'custom'
          dynamicBullets: false,
          dynamicMainBullets: 1,
          formatFractionCurrent: number => number,
          formatFractionTotal: number => number,
          bulletClass: `${pfx}-bullet`,
          bulletActiveClass: `${pfx}-bullet-active`,
          modifierClass: `${pfx}-`,
          currentClass: `${pfx}-current`,
          totalClass: `${pfx}-total`,
          hiddenClass: `${pfx}-hidden`,
          progressbarFillClass: `${pfx}-progressbar-fill`,
          progressbarOppositeClass: `${pfx}-progressbar-opposite`,
          clickableClass: `${pfx}-clickable`,
          lockClass: `${pfx}-lock`,
          horizontalClass: `${pfx}-horizontal`,
          verticalClass: `${pfx}-vertical`
        }
      });
      swiper.pagination = {
        el: null,
        $el: null,
        bullets: []
      };
      let bulletSize;
      let dynamicBulletIndex = 0;

      function isPaginationDisabled() {
        return !swiper.params.pagination.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0;
      }

      function setSideBullets($bulletEl, position) {
        const {
          bulletActiveClass
        } = swiper.params.pagination;
        $bulletEl[position]().addClass(`${bulletActiveClass}-${position}`)[position]().addClass(`${bulletActiveClass}-${position}-${position}`);
      }

      function update() {
        // Render || Update Pagination bullets/items
        const rtl = swiper.rtl;
        const params = swiper.params.pagination;
        if (isPaginationDisabled()) return;
        const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
        const $el = swiper.pagination.$el; // Current/Total

        let current;
        const total = swiper.params.loop ? Math.ceil((slidesLength - swiper.loopedSlides * 2) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;

        if (swiper.params.loop) {
          current = Math.ceil((swiper.activeIndex - swiper.loopedSlides) / swiper.params.slidesPerGroup);

          if (current > slidesLength - 1 - swiper.loopedSlides * 2) {
            current -= slidesLength - swiper.loopedSlides * 2;
          }

          if (current > total - 1) current -= total;
          if (current < 0 && swiper.params.paginationType !== 'bullets') current = total + current;
        } else if (typeof swiper.snapIndex !== 'undefined') {
          current = swiper.snapIndex;
        } else {
          current = swiper.activeIndex || 0;
        } // Types


        if (params.type === 'bullets' && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {
          const bullets = swiper.pagination.bullets;
          let firstIndex;
          let lastIndex;
          let midIndex;

          if (params.dynamicBullets) {
            bulletSize = bullets.eq(0)[swiper.isHorizontal() ? 'outerWidth' : 'outerHeight'](true);
            $el.css(swiper.isHorizontal() ? 'width' : 'height', `${bulletSize * (params.dynamicMainBullets + 4)}px`);

            if (params.dynamicMainBullets > 1 && swiper.previousIndex !== undefined) {
              dynamicBulletIndex += current - (swiper.previousIndex - swiper.loopedSlides || 0);

              if (dynamicBulletIndex > params.dynamicMainBullets - 1) {
                dynamicBulletIndex = params.dynamicMainBullets - 1;
              } else if (dynamicBulletIndex < 0) {
                dynamicBulletIndex = 0;
              }
            }

            firstIndex = Math.max(current - dynamicBulletIndex, 0);
            lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
            midIndex = (lastIndex + firstIndex) / 2;
          }

          bullets.removeClass(['', '-next', '-next-next', '-prev', '-prev-prev', '-main'].map(suffix => `${params.bulletActiveClass}${suffix}`).join(' '));

          if ($el.length > 1) {
            bullets.each(bullet => {
              const $bullet = $(bullet);
              const bulletIndex = $bullet.index();

              if (bulletIndex === current) {
                $bullet.addClass(params.bulletActiveClass);
              }

              if (params.dynamicBullets) {
                if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) {
                  $bullet.addClass(`${params.bulletActiveClass}-main`);
                }

                if (bulletIndex === firstIndex) {
                  setSideBullets($bullet, 'prev');
                }

                if (bulletIndex === lastIndex) {
                  setSideBullets($bullet, 'next');
                }
              }
            });
          } else {
            const $bullet = bullets.eq(current);
            const bulletIndex = $bullet.index();
            $bullet.addClass(params.bulletActiveClass);

            if (params.dynamicBullets) {
              const $firstDisplayedBullet = bullets.eq(firstIndex);
              const $lastDisplayedBullet = bullets.eq(lastIndex);

              for (let i = firstIndex; i <= lastIndex; i += 1) {
                bullets.eq(i).addClass(`${params.bulletActiveClass}-main`);
              }

              if (swiper.params.loop) {
                if (bulletIndex >= bullets.length) {
                  for (let i = params.dynamicMainBullets; i >= 0; i -= 1) {
                    bullets.eq(bullets.length - i).addClass(`${params.bulletActiveClass}-main`);
                  }

                  bullets.eq(bullets.length - params.dynamicMainBullets - 1).addClass(`${params.bulletActiveClass}-prev`);
                } else {
                  setSideBullets($firstDisplayedBullet, 'prev');
                  setSideBullets($lastDisplayedBullet, 'next');
                }
              } else {
                setSideBullets($firstDisplayedBullet, 'prev');
                setSideBullets($lastDisplayedBullet, 'next');
              }
            }
          }

          if (params.dynamicBullets) {
            const dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
            const bulletsOffset = (bulletSize * dynamicBulletsLength - bulletSize) / 2 - midIndex * bulletSize;
            const offsetProp = rtl ? 'right' : 'left';
            bullets.css(swiper.isHorizontal() ? offsetProp : 'top', `${bulletsOffset}px`);
          }
        }

        if (params.type === 'fraction') {
          $el.find(classesToSelector(params.currentClass)).text(params.formatFractionCurrent(current + 1));
          $el.find(classesToSelector(params.totalClass)).text(params.formatFractionTotal(total));
        }

        if (params.type === 'progressbar') {
          let progressbarDirection;

          if (params.progressbarOpposite) {
            progressbarDirection = swiper.isHorizontal() ? 'vertical' : 'horizontal';
          } else {
            progressbarDirection = swiper.isHorizontal() ? 'horizontal' : 'vertical';
          }

          const scale = (current + 1) / total;
          let scaleX = 1;
          let scaleY = 1;

          if (progressbarDirection === 'horizontal') {
            scaleX = scale;
          } else {
            scaleY = scale;
          }

          $el.find(classesToSelector(params.progressbarFillClass)).transform(`translate3d(0,0,0) scaleX(${scaleX}) scaleY(${scaleY})`).transition(swiper.params.speed);
        }

        if (params.type === 'custom' && params.renderCustom) {
          $el.html(params.renderCustom(swiper, current + 1, total));
          emit('paginationRender', $el[0]);
        } else {
          emit('paginationUpdate', $el[0]);
        }

        if (swiper.params.watchOverflow && swiper.enabled) {
          $el[swiper.isLocked ? 'addClass' : 'removeClass'](params.lockClass);
        }
      }

      function render() {
        // Render Container
        const params = swiper.params.pagination;
        if (isPaginationDisabled()) return;
        const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
        const $el = swiper.pagination.$el;
        let paginationHTML = '';

        if (params.type === 'bullets') {
          let numberOfBullets = swiper.params.loop ? Math.ceil((slidesLength - swiper.loopedSlides * 2) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;

          if (swiper.params.freeMode && swiper.params.freeMode.enabled && !swiper.params.loop && numberOfBullets > slidesLength) {
            numberOfBullets = slidesLength;
          }

          for (let i = 0; i < numberOfBullets; i += 1) {
            if (params.renderBullet) {
              paginationHTML += params.renderBullet.call(swiper, i, params.bulletClass);
            } else {
              paginationHTML += `<${params.bulletElement} class="${params.bulletClass}"></${params.bulletElement}>`;
            }
          }

          $el.html(paginationHTML);
          swiper.pagination.bullets = $el.find(classesToSelector(params.bulletClass));
        }

        if (params.type === 'fraction') {
          if (params.renderFraction) {
            paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass);
          } else {
            paginationHTML = `<span class="${params.currentClass}"></span>` + ' / ' + `<span class="${params.totalClass}"></span>`;
          }

          $el.html(paginationHTML);
        }

        if (params.type === 'progressbar') {
          if (params.renderProgressbar) {
            paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass);
          } else {
            paginationHTML = `<span class="${params.progressbarFillClass}"></span>`;
          }

          $el.html(paginationHTML);
        }

        if (params.type !== 'custom') {
          emit('paginationRender', swiper.pagination.$el[0]);
        }
      }

      function init() {
        swiper.params.pagination = createElementIfNotDefined(swiper, swiper.originalParams.pagination, swiper.params.pagination, {
          el: 'swiper-pagination'
        });
        const params = swiper.params.pagination;
        if (!params.el) return;
        let $el = $(params.el);
        if ($el.length === 0) return;

        if (swiper.params.uniqueNavElements && typeof params.el === 'string' && $el.length > 1) {
          $el = swiper.$el.find(params.el); // check if it belongs to another nested Swiper

          if ($el.length > 1) {
            $el = $el.filter(el => {
              if ($(el).parents('.swiper')[0] !== swiper.el) return false;
              return true;
            });
          }
        }

        if (params.type === 'bullets' && params.clickable) {
          $el.addClass(params.clickableClass);
        }

        $el.addClass(params.modifierClass + params.type);
        $el.addClass(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);

        if (params.type === 'bullets' && params.dynamicBullets) {
          $el.addClass(`${params.modifierClass}${params.type}-dynamic`);
          dynamicBulletIndex = 0;

          if (params.dynamicMainBullets < 1) {
            params.dynamicMainBullets = 1;
          }
        }

        if (params.type === 'progressbar' && params.progressbarOpposite) {
          $el.addClass(params.progressbarOppositeClass);
        }

        if (params.clickable) {
          $el.on('click', classesToSelector(params.bulletClass), function onClick(e) {
            e.preventDefault();
            let index = $(this).index() * swiper.params.slidesPerGroup;
            if (swiper.params.loop) index += swiper.loopedSlides;
            swiper.slideTo(index);
          });
        }

        Object.assign(swiper.pagination, {
          $el,
          el: $el[0]
        });

        if (!swiper.enabled) {
          $el.addClass(params.lockClass);
        }
      }

      function destroy() {
        const params = swiper.params.pagination;
        if (isPaginationDisabled()) return;
        const $el = swiper.pagination.$el;
        $el.removeClass(params.hiddenClass);
        $el.removeClass(params.modifierClass + params.type);
        $el.removeClass(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
        if (swiper.pagination.bullets && swiper.pagination.bullets.removeClass) swiper.pagination.bullets.removeClass(params.bulletActiveClass);

        if (params.clickable) {
          $el.off('click', classesToSelector(params.bulletClass));
        }
      }

      on('init', () => {
        init();
        render();
        update();
      });
      on('activeIndexChange', () => {
        if (swiper.params.loop) {
          update();
        } else if (typeof swiper.snapIndex === 'undefined') {
          update();
        }
      });
      on('snapIndexChange', () => {
        if (!swiper.params.loop) {
          update();
        }
      });
      on('slidesLengthChange', () => {
        if (swiper.params.loop) {
          render();
          update();
        }
      });
      on('snapGridLengthChange', () => {
        if (!swiper.params.loop) {
          render();
          update();
        }
      });
      on('destroy', () => {
        destroy();
      });
      on('enable disable', () => {
        const {
          $el
        } = swiper.pagination;

        if ($el) {
          $el[swiper.enabled ? 'removeClass' : 'addClass'](swiper.params.pagination.lockClass);
        }
      });
      on('lock unlock', () => {
        update();
      });
      on('click', (_s, e) => {
        const targetEl = e.target;
        const {
          $el
        } = swiper.pagination;

        if (swiper.params.pagination.el && swiper.params.pagination.hideOnClick && $el.length > 0 && !$(targetEl).hasClass(swiper.params.pagination.bulletClass)) {
          if (swiper.navigation && (swiper.navigation.nextEl && targetEl === swiper.navigation.nextEl || swiper.navigation.prevEl && targetEl === swiper.navigation.prevEl)) return;
          const isHidden = $el.hasClass(swiper.params.pagination.hiddenClass);

          if (isHidden === true) {
            emit('paginationShow');
          } else {
            emit('paginationHide');
          }

          $el.toggleClass(swiper.params.pagination.hiddenClass);
        }
      });
      Object.assign(swiper.pagination, {
        render,
        update,
        init,
        destroy
      });
    }

    /* eslint no-underscore-dangle: "off" */
    function Autoplay(_ref) {
      let {
        swiper,
        extendParams,
        on,
        emit
      } = _ref;
      let timeout;
      swiper.autoplay = {
        running: false,
        paused: false
      };
      extendParams({
        autoplay: {
          enabled: false,
          delay: 3000,
          waitForTransition: true,
          disableOnInteraction: true,
          stopOnLastSlide: false,
          reverseDirection: false,
          pauseOnMouseEnter: false
        }
      });

      function run() {
        const $activeSlideEl = swiper.slides.eq(swiper.activeIndex);
        let delay = swiper.params.autoplay.delay;

        if ($activeSlideEl.attr('data-swiper-autoplay')) {
          delay = $activeSlideEl.attr('data-swiper-autoplay') || swiper.params.autoplay.delay;
        }

        clearTimeout(timeout);
        timeout = nextTick(() => {
          let autoplayResult;

          if (swiper.params.autoplay.reverseDirection) {
            if (swiper.params.loop) {
              swiper.loopFix();
              autoplayResult = swiper.slidePrev(swiper.params.speed, true, true);
              emit('autoplay');
            } else if (!swiper.isBeginning) {
              autoplayResult = swiper.slidePrev(swiper.params.speed, true, true);
              emit('autoplay');
            } else if (!swiper.params.autoplay.stopOnLastSlide) {
              autoplayResult = swiper.slideTo(swiper.slides.length - 1, swiper.params.speed, true, true);
              emit('autoplay');
            } else {
              stop();
            }
          } else if (swiper.params.loop) {
            swiper.loopFix();
            autoplayResult = swiper.slideNext(swiper.params.speed, true, true);
            emit('autoplay');
          } else if (!swiper.isEnd) {
            autoplayResult = swiper.slideNext(swiper.params.speed, true, true);
            emit('autoplay');
          } else if (!swiper.params.autoplay.stopOnLastSlide) {
            autoplayResult = swiper.slideTo(0, swiper.params.speed, true, true);
            emit('autoplay');
          } else {
            stop();
          }

          if (swiper.params.cssMode && swiper.autoplay.running) run();else if (autoplayResult === false) {
            run();
          }
        }, delay);
      }

      function start() {
        if (typeof timeout !== 'undefined') return false;
        if (swiper.autoplay.running) return false;
        swiper.autoplay.running = true;
        emit('autoplayStart');
        run();
        return true;
      }

      function stop() {
        if (!swiper.autoplay.running) return false;
        if (typeof timeout === 'undefined') return false;

        if (timeout) {
          clearTimeout(timeout);
          timeout = undefined;
        }

        swiper.autoplay.running = false;
        emit('autoplayStop');
        return true;
      }

      function pause(speed) {
        if (!swiper.autoplay.running) return;
        if (swiper.autoplay.paused) return;
        if (timeout) clearTimeout(timeout);
        swiper.autoplay.paused = true;

        if (speed === 0 || !swiper.params.autoplay.waitForTransition) {
          swiper.autoplay.paused = false;
          run();
        } else {
          ['transitionend', 'webkitTransitionEnd'].forEach(event => {
            swiper.$wrapperEl[0].addEventListener(event, onTransitionEnd);
          });
        }
      }

      function onVisibilityChange() {
        const document = getDocument();

        if (document.visibilityState === 'hidden' && swiper.autoplay.running) {
          pause();
        }

        if (document.visibilityState === 'visible' && swiper.autoplay.paused) {
          run();
          swiper.autoplay.paused = false;
        }
      }

      function onTransitionEnd(e) {
        if (!swiper || swiper.destroyed || !swiper.$wrapperEl) return;
        if (e.target !== swiper.$wrapperEl[0]) return;
        ['transitionend', 'webkitTransitionEnd'].forEach(event => {
          swiper.$wrapperEl[0].removeEventListener(event, onTransitionEnd);
        });
        swiper.autoplay.paused = false;

        if (!swiper.autoplay.running) {
          stop();
        } else {
          run();
        }
      }

      function onMouseEnter() {
        if (swiper.params.autoplay.disableOnInteraction) {
          stop();
        } else {
          emit('autoplayPause');
          pause();
        }

        ['transitionend', 'webkitTransitionEnd'].forEach(event => {
          swiper.$wrapperEl[0].removeEventListener(event, onTransitionEnd);
        });
      }

      function onMouseLeave() {
        if (swiper.params.autoplay.disableOnInteraction) {
          return;
        }

        swiper.autoplay.paused = false;
        emit('autoplayResume');
        run();
      }

      function attachMouseEvents() {
        if (swiper.params.autoplay.pauseOnMouseEnter) {
          swiper.$el.on('mouseenter', onMouseEnter);
          swiper.$el.on('mouseleave', onMouseLeave);
        }
      }

      function detachMouseEvents() {
        swiper.$el.off('mouseenter', onMouseEnter);
        swiper.$el.off('mouseleave', onMouseLeave);
      }

      on('init', () => {
        if (swiper.params.autoplay.enabled) {
          start();
          const document = getDocument();
          document.addEventListener('visibilitychange', onVisibilityChange);
          attachMouseEvents();
        }
      });
      on('beforeTransitionStart', (_s, speed, internal) => {
        if (swiper.autoplay.running) {
          if (internal || !swiper.params.autoplay.disableOnInteraction) {
            swiper.autoplay.pause(speed);
          } else {
            stop();
          }
        }
      });
      on('sliderFirstMove', () => {
        if (swiper.autoplay.running) {
          if (swiper.params.autoplay.disableOnInteraction) {
            stop();
          } else {
            pause();
          }
        }
      });
      on('touchEnd', () => {
        if (swiper.params.cssMode && swiper.autoplay.paused && !swiper.params.autoplay.disableOnInteraction) {
          run();
        }
      });
      on('destroy', () => {
        detachMouseEvents();

        if (swiper.autoplay.running) {
          stop();
        }

        const document = getDocument();
        document.removeEventListener('visibilitychange', onVisibilityChange);
      });
      Object.assign(swiper.autoplay, {
        pause,
        run,
        start,
        stop
      });
    }

    function isObject(o) {
      return typeof o === 'object' && o !== null && o.constructor && Object.prototype.toString.call(o).slice(8, -1) === 'Object';
    }

    function extend(target, src) {
      const noExtend = ['__proto__', 'constructor', 'prototype'];
      Object.keys(src).filter(key => noExtend.indexOf(key) < 0).forEach(key => {
        if (typeof target[key] === 'undefined') target[key] = src[key];else if (isObject(src[key]) && isObject(target[key]) && Object.keys(src[key]).length > 0) {
          if (src[key].__swiper__) target[key] = src[key];else extend(target[key], src[key]);
        } else {
          target[key] = src[key];
        }
      });
    }

    function needsNavigation(params) {
      if (params === void 0) {
        params = {};
      }

      return params.navigation && typeof params.navigation.nextEl === 'undefined' && typeof params.navigation.prevEl === 'undefined';
    }

    function needsPagination(params) {
      if (params === void 0) {
        params = {};
      }

      return params.pagination && typeof params.pagination.el === 'undefined';
    }

    function needsScrollbar(params) {
      if (params === void 0) {
        params = {};
      }

      return params.scrollbar && typeof params.scrollbar.el === 'undefined';
    }

    function uniqueClasses(classNames) {
      if (classNames === void 0) {
        classNames = '';
      }

      const classes = classNames.split(' ').map(c => c.trim()).filter(c => !!c);
      const unique = [];
      classes.forEach(c => {
        if (unique.indexOf(c) < 0) unique.push(c);
      });
      return unique.join(' ');
    }

    /* underscore in name -> watch for changes */
    const paramsList = ['modules', 'init', '_direction', 'touchEventsTarget', 'initialSlide', '_speed', 'cssMode', 'updateOnWindowResize', 'resizeObserver', 'nested', 'focusableElements', '_enabled', '_width', '_height', 'preventInteractionOnTransition', 'userAgent', 'url', '_edgeSwipeDetection', '_edgeSwipeThreshold', '_freeMode', '_autoHeight', 'setWrapperSize', 'virtualTranslate', '_effect', 'breakpoints', '_spaceBetween', '_slidesPerView', 'maxBackfaceHiddenSlides', '_grid', '_slidesPerGroup', '_slidesPerGroupSkip', '_slidesPerGroupAuto', '_centeredSlides', '_centeredSlidesBounds', '_slidesOffsetBefore', '_slidesOffsetAfter', 'normalizeSlideIndex', '_centerInsufficientSlides', '_watchOverflow', 'roundLengths', 'touchRatio', 'touchAngle', 'simulateTouch', '_shortSwipes', '_longSwipes', 'longSwipesRatio', 'longSwipesMs', '_followFinger', 'allowTouchMove', '_threshold', 'touchMoveStopPropagation', 'touchStartPreventDefault', 'touchStartForcePreventDefault', 'touchReleaseOnEdges', 'uniqueNavElements', '_resistance', '_resistanceRatio', '_watchSlidesProgress', '_grabCursor', 'preventClicks', 'preventClicksPropagation', '_slideToClickedSlide', '_preloadImages', 'updateOnImagesReady', '_loop', '_loopAdditionalSlides', '_loopedSlides', '_loopFillGroupWithBlank', 'loopPreventsSlide', '_rewind', '_allowSlidePrev', '_allowSlideNext', '_swipeHandler', '_noSwiping', 'noSwipingClass', 'noSwipingSelector', 'passiveListeners', 'containerModifierClass', 'slideClass', 'slideBlankClass', 'slideActiveClass', 'slideDuplicateActiveClass', 'slideVisibleClass', 'slideDuplicateClass', 'slideNextClass', 'slideDuplicateNextClass', 'slidePrevClass', 'slideDuplicatePrevClass', 'wrapperClass', 'runCallbacksOnInit', 'observer', 'observeParents', 'observeSlideChildren', // modules
    'a11y', '_autoplay', '_controller', 'coverflowEffect', 'cubeEffect', 'fadeEffect', 'flipEffect', 'creativeEffect', 'cardsEffect', 'hashNavigation', 'history', 'keyboard', 'lazy', 'mousewheel', '_navigation', '_pagination', 'parallax', '_scrollbar', '_thumbs', '_virtual', 'zoom'];

    function getParams(obj) {
      if (obj === void 0) {
        obj = {};
      }

      const params = {
        on: {}
      };
      const passedParams = {};
      extend(params, Swiper$1.defaults);
      extend(params, Swiper$1.extendedDefaults);
      params._emitClasses = true;
      params.init = false;
      const rest = {};
      const allowedParams = paramsList.map(key => key.replace(/_/, ''));
      Object.keys(obj).forEach(key => {
        if (allowedParams.indexOf(key) >= 0) {
          if (isObject(obj[key])) {
            params[key] = {};
            passedParams[key] = {};
            extend(params[key], obj[key]);
            extend(passedParams[key], obj[key]);
          } else {
            params[key] = obj[key];
            passedParams[key] = obj[key];
          }
        } else if (key.search(/on[A-Z]/) === 0 && typeof obj[key] === 'function') {
          params.on[`${key[2].toLowerCase()}${key.substr(3)}`] = obj[key];
        } else {
          rest[key] = obj[key];
        }
      });
      ['navigation', 'pagination', 'scrollbar'].forEach(key => {
        if (params[key] === true) params[key] = {};
        if (params[key] === false) delete params[key];
      });
      return {
        params,
        passedParams,
        rest
      };
    }

    function initSwiper(swiperParams) {
      return new Swiper$1(swiperParams);
    }

    function mountSwiper(_ref, swiperParams) {
      let {
        el,
        nextEl,
        prevEl,
        paginationEl,
        scrollbarEl,
        swiper
      } = _ref;

      if (needsNavigation(swiperParams) && nextEl && prevEl) {
        swiper.params.navigation.nextEl = nextEl;
        swiper.originalParams.navigation.nextEl = nextEl;
        swiper.params.navigation.prevEl = prevEl;
        swiper.originalParams.navigation.prevEl = prevEl;
      }

      if (needsPagination(swiperParams) && paginationEl) {
        swiper.params.pagination.el = paginationEl;
        swiper.originalParams.pagination.el = paginationEl;
      }

      if (needsScrollbar(swiperParams) && scrollbarEl) {
        swiper.params.scrollbar.el = scrollbarEl;
        swiper.originalParams.scrollbar.el = scrollbarEl;
      }

      swiper.init(el);
    }

    function getChangedParams(swiperParams, oldParams) {
      const keys = [];
      if (!oldParams) return keys;

      const addKey = key => {
        if (keys.indexOf(key) < 0) keys.push(key);
      };

      const watchParams = paramsList.filter(key => key[0] === '_').map(key => key.replace(/_/, ''));
      watchParams.forEach(key => {
        if (key in swiperParams && key in oldParams) {
          if (isObject(swiperParams[key]) && isObject(oldParams[key])) {
            const newKeys = Object.keys(swiperParams[key]);
            const oldKeys = Object.keys(oldParams[key]);

            if (newKeys.length !== oldKeys.length) {
              addKey(key);
            } else {
              newKeys.forEach(newKey => {
                if (swiperParams[key][newKey] !== oldParams[key][newKey]) {
                  addKey(key);
                }
              });
              oldKeys.forEach(oldKey => {
                if (swiperParams[key][oldKey] !== oldParams[key][oldKey]) addKey(key);
              });
            }
          } else if (swiperParams[key] !== oldParams[key]) {
            addKey(key);
          }
        }
      });
      return keys;
    }

    function updateSwiper(_ref) {
      let {
        swiper,
        passedParams,
        changedParams,
        nextEl,
        prevEl,
        scrollbarEl,
        paginationEl
      } = _ref;
      const updateParams = changedParams.filter(key => key !== 'children' && key !== 'direction');
      const {
        params: currentParams,
        pagination,
        navigation,
        scrollbar,
        thumbs
      } = swiper;
      let needThumbsInit;
      let needControllerInit;
      let needPaginationInit;
      let needScrollbarInit;
      let needNavigationInit;

      if (changedParams.includes('thumbs') && passedParams.thumbs && passedParams.thumbs.swiper && currentParams.thumbs && !currentParams.thumbs.swiper) {
        needThumbsInit = true;
      }

      if (changedParams.includes('controller') && passedParams.controller && passedParams.controller.control && currentParams.controller && !currentParams.controller.control) {
        needControllerInit = true;
      }

      if (changedParams.includes('pagination') && passedParams.pagination && (passedParams.pagination.el || paginationEl) && (currentParams.pagination || currentParams.pagination === false) && pagination && !pagination.el) {
        needPaginationInit = true;
      }

      if (changedParams.includes('scrollbar') && passedParams.scrollbar && (passedParams.scrollbar.el || scrollbarEl) && (currentParams.scrollbar || currentParams.scrollbar === false) && scrollbar && !scrollbar.el) {
        needScrollbarInit = true;
      }

      if (changedParams.includes('navigation') && passedParams.navigation && (passedParams.navigation.prevEl || prevEl) && (passedParams.navigation.nextEl || nextEl) && (currentParams.navigation || currentParams.navigation === false) && navigation && !navigation.prevEl && !navigation.nextEl) {
        needNavigationInit = true;
      }

      if (changedParams.includes('virtual')) {
        if (passedParams.virtual && passedParams.virtual.slides && swiper.virtual) {
          swiper.virtual.slides = passedParams.virtual.slides;
          swiper.virtual.update();
        }
      }

      const destroyModule = mod => {
        if (!swiper[mod]) return;
        swiper[mod].destroy();

        if (mod === 'navigation') {
          currentParams[mod].prevEl = undefined;
          currentParams[mod].nextEl = undefined;
          swiper[mod].prevEl = undefined;
          swiper[mod].nextEl = undefined;
        } else {
          currentParams[mod].el = undefined;
          swiper[mod].el = undefined;
        }
      };

      updateParams.forEach(key => {
        if (isObject(currentParams[key]) && isObject(passedParams[key])) {
          extend(currentParams[key], passedParams[key]);
        } else {
          const newValue = passedParams[key];

          if ((newValue === true || newValue === false) && (key === 'navigation' || key === 'pagination' || key === 'scrollbar')) {
            if (newValue === false) {
              destroyModule(key);
            }
          } else {
            currentParams[key] = passedParams[key];
          }
        }
      });

      if (needThumbsInit) {
        const initialized = thumbs.init();

        if (initialized) {
          thumbs.update(true);
        }
      }

      if (needControllerInit) {
        swiper.controller.control = currentParams.controller.control;
      }

      if (needPaginationInit) {
        if (paginationEl) currentParams.pagination.el = paginationEl;
        pagination.init();
        pagination.render();
        pagination.update();
      }

      if (needScrollbarInit) {
        if (scrollbarEl) currentParams.scrollbar.el = scrollbarEl;
        scrollbar.init();
        scrollbar.updateSize();
        scrollbar.setTranslate();
      }

      if (needNavigationInit) {
        if (nextEl) currentParams.navigation.nextEl = nextEl;
        if (prevEl) currentParams.navigation.prevEl = prevEl;
        navigation.init();
        navigation.update();
      }

      if (changedParams.includes('allowSlideNext')) {
        swiper.allowSlideNext = passedParams.allowSlideNext;
      }

      if (changedParams.includes('allowSlidePrev')) {
        swiper.allowSlidePrev = passedParams.allowSlidePrev;
      }

      if (changedParams.includes('direction')) {
        swiper.changeDirection(passedParams.direction, false);
      }

      swiper.update();
    }

    /* node_modules\swiper\svelte\swiper.svelte generated by Svelte v3.48.0 */
    const file$b = "node_modules\\swiper\\svelte\\swiper.svelte";
    const get_container_end_slot_changes = dirty => ({ virtualData: dirty & /*virtualData*/ 512 });
    const get_container_end_slot_context = ctx => ({ virtualData: /*virtualData*/ ctx[9] });
    const get_wrapper_end_slot_changes = dirty => ({ virtualData: dirty & /*virtualData*/ 512 });
    const get_wrapper_end_slot_context = ctx => ({ virtualData: /*virtualData*/ ctx[9] });
    const get_default_slot_changes$2 = dirty => ({ virtualData: dirty & /*virtualData*/ 512 });
    const get_default_slot_context$2 = ctx => ({ virtualData: /*virtualData*/ ctx[9] });
    const get_wrapper_start_slot_changes = dirty => ({ virtualData: dirty & /*virtualData*/ 512 });
    const get_wrapper_start_slot_context = ctx => ({ virtualData: /*virtualData*/ ctx[9] });
    const get_container_start_slot_changes = dirty => ({ virtualData: dirty & /*virtualData*/ 512 });
    const get_container_start_slot_context = ctx => ({ virtualData: /*virtualData*/ ctx[9] });

    // (169:2) {#if needsNavigation(swiperParams)}
    function create_if_block_2$2(ctx) {
    	let div0;
    	let t;
    	let div1;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			t = space();
    			div1 = element("div");
    			attr_dev(div0, "class", "swiper-button-prev");
    			add_location(div0, file$b, 169, 4, 4194);
    			attr_dev(div1, "class", "swiper-button-next");
    			add_location(div1, file$b, 170, 4, 4252);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			/*div0_binding*/ ctx[13](div0);
    			insert_dev(target, t, anchor);
    			insert_dev(target, div1, anchor);
    			/*div1_binding*/ ctx[14](div1);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			/*div0_binding*/ ctx[13](null);
    			if (detaching) detach_dev(t);
    			if (detaching) detach_dev(div1);
    			/*div1_binding*/ ctx[14](null);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$2.name,
    		type: "if",
    		source: "(169:2) {#if needsNavigation(swiperParams)}",
    		ctx
    	});

    	return block;
    }

    // (173:2) {#if needsScrollbar(swiperParams)}
    function create_if_block_1$2(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "swiper-scrollbar");
    			add_location(div, file$b, 173, 4, 4355);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			/*div_binding*/ ctx[15](div);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			/*div_binding*/ ctx[15](null);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$2.name,
    		type: "if",
    		source: "(173:2) {#if needsScrollbar(swiperParams)}",
    		ctx
    	});

    	return block;
    }

    // (176:2) {#if needsPagination(swiperParams)}
    function create_if_block$3(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "swiper-pagination");
    			add_location(div, file$b, 176, 4, 4462);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			/*div_binding_1*/ ctx[16](div);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			/*div_binding_1*/ ctx[16](null);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(176:2) {#if needsPagination(swiperParams)}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$e(ctx) {
    	let div1;
    	let t0;
    	let div0;
    	let t1;
    	let t2;
    	let t3;
    	let show_if_2 = needsNavigation(/*swiperParams*/ ctx[2]);
    	let t4;
    	let show_if_1 = needsScrollbar(/*swiperParams*/ ctx[2]);
    	let t5;
    	let show_if = needsPagination(/*swiperParams*/ ctx[2]);
    	let t6;
    	let div1_class_value;
    	let current;
    	const container_start_slot_template = /*#slots*/ ctx[12]["container-start"];
    	const container_start_slot = create_slot(container_start_slot_template, ctx, /*$$scope*/ ctx[11], get_container_start_slot_context);
    	const wrapper_start_slot_template = /*#slots*/ ctx[12]["wrapper-start"];
    	const wrapper_start_slot = create_slot(wrapper_start_slot_template, ctx, /*$$scope*/ ctx[11], get_wrapper_start_slot_context);
    	const default_slot_template = /*#slots*/ ctx[12].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[11], get_default_slot_context$2);
    	const wrapper_end_slot_template = /*#slots*/ ctx[12]["wrapper-end"];
    	const wrapper_end_slot = create_slot(wrapper_end_slot_template, ctx, /*$$scope*/ ctx[11], get_wrapper_end_slot_context);
    	let if_block0 = show_if_2 && create_if_block_2$2(ctx);
    	let if_block1 = show_if_1 && create_if_block_1$2(ctx);
    	let if_block2 = show_if && create_if_block$3(ctx);
    	const container_end_slot_template = /*#slots*/ ctx[12]["container-end"];
    	const container_end_slot = create_slot(container_end_slot_template, ctx, /*$$scope*/ ctx[11], get_container_end_slot_context);

    	let div1_levels = [
    		{
    			class: div1_class_value = uniqueClasses(`${/*containerClasses*/ ctx[1]}${/*className*/ ctx[0] ? ` ${/*className*/ ctx[0]}` : ''}`)
    		},
    		/*restProps*/ ctx[3]
    	];

    	let div1_data = {};

    	for (let i = 0; i < div1_levels.length; i += 1) {
    		div1_data = assign(div1_data, div1_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			if (container_start_slot) container_start_slot.c();
    			t0 = space();
    			div0 = element("div");
    			if (wrapper_start_slot) wrapper_start_slot.c();
    			t1 = space();
    			if (default_slot) default_slot.c();
    			t2 = space();
    			if (wrapper_end_slot) wrapper_end_slot.c();
    			t3 = space();
    			if (if_block0) if_block0.c();
    			t4 = space();
    			if (if_block1) if_block1.c();
    			t5 = space();
    			if (if_block2) if_block2.c();
    			t6 = space();
    			if (container_end_slot) container_end_slot.c();
    			attr_dev(div0, "class", "swiper-wrapper");
    			add_location(div0, file$b, 163, 2, 4021);
    			set_attributes(div1, div1_data);
    			add_location(div1, file$b, 157, 0, 3856);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);

    			if (container_start_slot) {
    				container_start_slot.m(div1, null);
    			}

    			append_dev(div1, t0);
    			append_dev(div1, div0);

    			if (wrapper_start_slot) {
    				wrapper_start_slot.m(div0, null);
    			}

    			append_dev(div0, t1);

    			if (default_slot) {
    				default_slot.m(div0, null);
    			}

    			append_dev(div0, t2);

    			if (wrapper_end_slot) {
    				wrapper_end_slot.m(div0, null);
    			}

    			append_dev(div1, t3);
    			if (if_block0) if_block0.m(div1, null);
    			append_dev(div1, t4);
    			if (if_block1) if_block1.m(div1, null);
    			append_dev(div1, t5);
    			if (if_block2) if_block2.m(div1, null);
    			append_dev(div1, t6);

    			if (container_end_slot) {
    				container_end_slot.m(div1, null);
    			}

    			/*div1_binding_1*/ ctx[17](div1);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (container_start_slot) {
    				if (container_start_slot.p && (!current || dirty & /*$$scope, virtualData*/ 2560)) {
    					update_slot_base(
    						container_start_slot,
    						container_start_slot_template,
    						ctx,
    						/*$$scope*/ ctx[11],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[11])
    						: get_slot_changes(container_start_slot_template, /*$$scope*/ ctx[11], dirty, get_container_start_slot_changes),
    						get_container_start_slot_context
    					);
    				}
    			}

    			if (wrapper_start_slot) {
    				if (wrapper_start_slot.p && (!current || dirty & /*$$scope, virtualData*/ 2560)) {
    					update_slot_base(
    						wrapper_start_slot,
    						wrapper_start_slot_template,
    						ctx,
    						/*$$scope*/ ctx[11],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[11])
    						: get_slot_changes(wrapper_start_slot_template, /*$$scope*/ ctx[11], dirty, get_wrapper_start_slot_changes),
    						get_wrapper_start_slot_context
    					);
    				}
    			}

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope, virtualData*/ 2560)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[11],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[11])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[11], dirty, get_default_slot_changes$2),
    						get_default_slot_context$2
    					);
    				}
    			}

    			if (wrapper_end_slot) {
    				if (wrapper_end_slot.p && (!current || dirty & /*$$scope, virtualData*/ 2560)) {
    					update_slot_base(
    						wrapper_end_slot,
    						wrapper_end_slot_template,
    						ctx,
    						/*$$scope*/ ctx[11],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[11])
    						: get_slot_changes(wrapper_end_slot_template, /*$$scope*/ ctx[11], dirty, get_wrapper_end_slot_changes),
    						get_wrapper_end_slot_context
    					);
    				}
    			}

    			if (dirty & /*swiperParams*/ 4) show_if_2 = needsNavigation(/*swiperParams*/ ctx[2]);

    			if (show_if_2) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_2$2(ctx);
    					if_block0.c();
    					if_block0.m(div1, t4);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (dirty & /*swiperParams*/ 4) show_if_1 = needsScrollbar(/*swiperParams*/ ctx[2]);

    			if (show_if_1) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block_1$2(ctx);
    					if_block1.c();
    					if_block1.m(div1, t5);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}

    			if (dirty & /*swiperParams*/ 4) show_if = needsPagination(/*swiperParams*/ ctx[2]);

    			if (show_if) {
    				if (if_block2) {
    					if_block2.p(ctx, dirty);
    				} else {
    					if_block2 = create_if_block$3(ctx);
    					if_block2.c();
    					if_block2.m(div1, t6);
    				}
    			} else if (if_block2) {
    				if_block2.d(1);
    				if_block2 = null;
    			}

    			if (container_end_slot) {
    				if (container_end_slot.p && (!current || dirty & /*$$scope, virtualData*/ 2560)) {
    					update_slot_base(
    						container_end_slot,
    						container_end_slot_template,
    						ctx,
    						/*$$scope*/ ctx[11],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[11])
    						: get_slot_changes(container_end_slot_template, /*$$scope*/ ctx[11], dirty, get_container_end_slot_changes),
    						get_container_end_slot_context
    					);
    				}
    			}

    			set_attributes(div1, div1_data = get_spread_update(div1_levels, [
    				(!current || dirty & /*containerClasses, className*/ 3 && div1_class_value !== (div1_class_value = uniqueClasses(`${/*containerClasses*/ ctx[1]}${/*className*/ ctx[0] ? ` ${/*className*/ ctx[0]}` : ''}`))) && { class: div1_class_value },
    				dirty & /*restProps*/ 8 && /*restProps*/ ctx[3]
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(container_start_slot, local);
    			transition_in(wrapper_start_slot, local);
    			transition_in(default_slot, local);
    			transition_in(wrapper_end_slot, local);
    			transition_in(container_end_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(container_start_slot, local);
    			transition_out(wrapper_start_slot, local);
    			transition_out(default_slot, local);
    			transition_out(wrapper_end_slot, local);
    			transition_out(container_end_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (container_start_slot) container_start_slot.d(detaching);
    			if (wrapper_start_slot) wrapper_start_slot.d(detaching);
    			if (default_slot) default_slot.d(detaching);
    			if (wrapper_end_slot) wrapper_end_slot.d(detaching);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			if (if_block2) if_block2.d();
    			if (container_end_slot) container_end_slot.d(detaching);
    			/*div1_binding_1*/ ctx[17](null);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$e.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$e($$self, $$props, $$invalidate) {
    	const omit_props_names = ["class","swiper"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Swiper', slots, ['container-start','wrapper-start','default','wrapper-end','container-end']);
    	const dispatch = createEventDispatcher();
    	let { class: className = undefined } = $$props;
    	let containerClasses = 'swiper';
    	let breakpointChanged = false;
    	let swiperInstance = null;
    	let oldPassedParams = null;
    	let paramsData;
    	let swiperParams;
    	let passedParams;
    	let restProps;
    	let swiperEl = null;
    	let prevEl = null;
    	let nextEl = null;
    	let scrollbarEl = null;
    	let paginationEl = null;
    	let virtualData = { slides: [] };

    	function swiper() {
    		return swiperInstance;
    	}

    	const setVirtualData = data => {
    		$$invalidate(9, virtualData = data);

    		tick().then(() => {
    			swiperInstance.$wrapperEl.children('.swiper-slide').each(el => {
    				if (el.onSwiper) el.onSwiper(swiperInstance);
    			});

    			swiperInstance.updateSlides();
    			swiperInstance.updateProgress();
    			swiperInstance.updateSlidesClasses();

    			if (swiperInstance.lazy && swiperInstance.params.lazy.enabled) {
    				swiperInstance.lazy.load();
    			}
    		});
    	};

    	const calcParams = () => {
    		paramsData = getParams($$restProps);
    		$$invalidate(2, swiperParams = paramsData.params);
    		passedParams = paramsData.passedParams;
    		$$invalidate(3, restProps = paramsData.rest);
    	};

    	calcParams();
    	oldPassedParams = passedParams;

    	const onBeforeBreakpoint = () => {
    		breakpointChanged = true;
    	};

    	swiperParams.onAny = (event, ...args) => {
    		dispatch(event, args);
    	};

    	Object.assign(swiperParams.on, {
    		_beforeBreakpoint: onBeforeBreakpoint,
    		_containerClasses(_swiper, classes) {
    			$$invalidate(1, containerClasses = classes);
    		}
    	});

    	swiperInstance = initSwiper(swiperParams);
    	setContext('swiper', swiperInstance);

    	if (swiperInstance.virtual && swiperInstance.params.virtual.enabled) {
    		const extendWith = {
    			cache: false,
    			renderExternal: data => {
    				setVirtualData(data);

    				if (swiperParams.virtual && swiperParams.virtual.renderExternal) {
    					swiperParams.virtual.renderExternal(data);
    				}
    			},
    			renderExternalUpdate: false
    		};

    		extend(swiperInstance.params.virtual, extendWith);
    		extend(swiperInstance.originalParams.virtual, extendWith);
    	}

    	onMount(() => {
    		if (!swiperEl) return;

    		mountSwiper(
    			{
    				el: swiperEl,
    				nextEl,
    				prevEl,
    				paginationEl,
    				scrollbarEl,
    				swiper: swiperInstance
    			},
    			swiperParams
    		);

    		dispatch('swiper', [swiperInstance]);
    		if (swiperParams.virtual) return;

    		swiperInstance.slides.each(el => {
    			if (el.onSwiper) el.onSwiper(swiperInstance);
    		});
    	});

    	afterUpdate(() => {
    		if (!swiperInstance) return;
    		calcParams();
    		const changedParams = getChangedParams(passedParams, oldPassedParams);

    		if ((changedParams.length || breakpointChanged) && swiperInstance && !swiperInstance.destroyed) {
    			updateSwiper({
    				swiper: swiperInstance,
    				passedParams,
    				changedParams,
    				nextEl,
    				prevEl,
    				scrollbarEl,
    				paginationEl
    			});
    		}

    		breakpointChanged = false;
    		oldPassedParams = passedParams;
    	});

    	onDestroy(() => {
    		// eslint-disable-next-line
    		if (typeof window !== 'undefined' && swiperInstance && !swiperInstance.destroyed) {
    			swiperInstance.destroy(true, false);
    		}
    	});

    	function div0_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			prevEl = $$value;
    			$$invalidate(5, prevEl);
    		});
    	}

    	function div1_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			nextEl = $$value;
    			$$invalidate(6, nextEl);
    		});
    	}

    	function div_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			scrollbarEl = $$value;
    			$$invalidate(7, scrollbarEl);
    		});
    	}

    	function div_binding_1($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			paginationEl = $$value;
    			$$invalidate(8, paginationEl);
    		});
    	}

    	function div1_binding_1($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			swiperEl = $$value;
    			$$invalidate(4, swiperEl);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(27, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('class' in $$new_props) $$invalidate(0, className = $$new_props.class);
    		if ('$$scope' in $$new_props) $$invalidate(11, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		onDestroy,
    		afterUpdate,
    		createEventDispatcher,
    		tick,
    		setContext,
    		beforeUpdate,
    		getParams,
    		initSwiper,
    		mountSwiper,
    		needsScrollbar,
    		needsNavigation,
    		needsPagination,
    		uniqueClasses,
    		extend,
    		getChangedParams,
    		updateSwiper,
    		dispatch,
    		className,
    		containerClasses,
    		breakpointChanged,
    		swiperInstance,
    		oldPassedParams,
    		paramsData,
    		swiperParams,
    		passedParams,
    		restProps,
    		swiperEl,
    		prevEl,
    		nextEl,
    		scrollbarEl,
    		paginationEl,
    		virtualData,
    		swiper,
    		setVirtualData,
    		calcParams,
    		onBeforeBreakpoint
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('className' in $$props) $$invalidate(0, className = $$new_props.className);
    		if ('containerClasses' in $$props) $$invalidate(1, containerClasses = $$new_props.containerClasses);
    		if ('breakpointChanged' in $$props) breakpointChanged = $$new_props.breakpointChanged;
    		if ('swiperInstance' in $$props) swiperInstance = $$new_props.swiperInstance;
    		if ('oldPassedParams' in $$props) oldPassedParams = $$new_props.oldPassedParams;
    		if ('paramsData' in $$props) paramsData = $$new_props.paramsData;
    		if ('swiperParams' in $$props) $$invalidate(2, swiperParams = $$new_props.swiperParams);
    		if ('passedParams' in $$props) passedParams = $$new_props.passedParams;
    		if ('restProps' in $$props) $$invalidate(3, restProps = $$new_props.restProps);
    		if ('swiperEl' in $$props) $$invalidate(4, swiperEl = $$new_props.swiperEl);
    		if ('prevEl' in $$props) $$invalidate(5, prevEl = $$new_props.prevEl);
    		if ('nextEl' in $$props) $$invalidate(6, nextEl = $$new_props.nextEl);
    		if ('scrollbarEl' in $$props) $$invalidate(7, scrollbarEl = $$new_props.scrollbarEl);
    		if ('paginationEl' in $$props) $$invalidate(8, paginationEl = $$new_props.paginationEl);
    		if ('virtualData' in $$props) $$invalidate(9, virtualData = $$new_props.virtualData);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		className,
    		containerClasses,
    		swiperParams,
    		restProps,
    		swiperEl,
    		prevEl,
    		nextEl,
    		scrollbarEl,
    		paginationEl,
    		virtualData,
    		swiper,
    		$$scope,
    		slots,
    		div0_binding,
    		div1_binding,
    		div_binding,
    		div_binding_1,
    		div1_binding_1
    	];
    }

    class Swiper extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$e, create_fragment$e, safe_not_equal, { class: 0, swiper: 10 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Swiper",
    			options,
    			id: create_fragment$e.name
    		});
    	}

    	get class() {
    		throw new Error("<Swiper>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Swiper>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get swiper() {
    		return this.$$.ctx[10];
    	}

    	set swiper(value) {
    		throw new Error("<Swiper>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules\swiper\svelte\swiper-slide.svelte generated by Svelte v3.48.0 */
    const file$a = "node_modules\\swiper\\svelte\\swiper-slide.svelte";
    const get_default_slot_changes_1 = dirty => ({ data: dirty & /*slideData*/ 32 });
    const get_default_slot_context_1 = ctx => ({ data: /*slideData*/ ctx[5] });
    const get_default_slot_changes$1 = dirty => ({ data: dirty & /*slideData*/ 32 });
    const get_default_slot_context$1 = ctx => ({ data: /*slideData*/ ctx[5] });

    // (92:2) {:else}
    function create_else_block(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[8].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[7], get_default_slot_context_1);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope, slideData*/ 160)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[7],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[7])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[7], dirty, get_default_slot_changes_1),
    						get_default_slot_context_1
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(92:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (85:2) {#if zoom}
    function create_if_block$2(ctx) {
    	let div;
    	let div_data_swiper_zoom_value;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[8].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[7], get_default_slot_context$1);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div, "class", "swiper-zoom-container");

    			attr_dev(div, "data-swiper-zoom", div_data_swiper_zoom_value = typeof /*zoom*/ ctx[0] === 'number'
    			? /*zoom*/ ctx[0]
    			: undefined);

    			add_location(div, file$a, 85, 4, 2107);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope, slideData*/ 160)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[7],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[7])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[7], dirty, get_default_slot_changes$1),
    						get_default_slot_context$1
    					);
    				}
    			}

    			if (!current || dirty & /*zoom*/ 1 && div_data_swiper_zoom_value !== (div_data_swiper_zoom_value = typeof /*zoom*/ ctx[0] === 'number'
    			? /*zoom*/ ctx[0]
    			: undefined)) {
    				attr_dev(div, "data-swiper-zoom", div_data_swiper_zoom_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(85:2) {#if zoom}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$d(ctx) {
    	let div;
    	let current_block_type_index;
    	let if_block;
    	let div_class_value;
    	let current;
    	const if_block_creators = [create_if_block$2, create_else_block];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*zoom*/ ctx[0]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	let div_levels = [
    		{
    			class: div_class_value = uniqueClasses(`${/*slideClasses*/ ctx[3]}${/*className*/ ctx[2] ? ` ${/*className*/ ctx[2]}` : ''}`)
    		},
    		{
    			"data-swiper-slide-index": /*virtualIndex*/ ctx[1]
    		},
    		/*$$restProps*/ ctx[6]
    	];

    	let div_data = {};

    	for (let i = 0; i < div_levels.length; i += 1) {
    		div_data = assign(div_data, div_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			if_block.c();
    			set_attributes(div, div_data);
    			add_location(div, file$a, 78, 0, 1923);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if_blocks[current_block_type_index].m(div, null);
    			/*div_binding*/ ctx[9](div);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(div, null);
    			}

    			set_attributes(div, div_data = get_spread_update(div_levels, [
    				(!current || dirty & /*slideClasses, className*/ 12 && div_class_value !== (div_class_value = uniqueClasses(`${/*slideClasses*/ ctx[3]}${/*className*/ ctx[2] ? ` ${/*className*/ ctx[2]}` : ''}`))) && { class: div_class_value },
    				(!current || dirty & /*virtualIndex*/ 2) && {
    					"data-swiper-slide-index": /*virtualIndex*/ ctx[1]
    				},
    				dirty & /*$$restProps*/ 64 && /*$$restProps*/ ctx[6]
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if_blocks[current_block_type_index].d();
    			/*div_binding*/ ctx[9](null);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$d.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$d($$self, $$props, $$invalidate) {
    	let slideData;
    	const omit_props_names = ["zoom","virtualIndex","class"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Swiper_slide', slots, ['default']);
    	let { zoom = undefined } = $$props;
    	let { virtualIndex = undefined } = $$props;
    	let { class: className = undefined } = $$props;
    	let slideEl = null;
    	let slideClasses = 'swiper-slide';
    	let swiper = getContext('swiper');
    	let eventAttached = false;

    	const updateClasses = (_, el, classNames) => {
    		if (el === slideEl) {
    			$$invalidate(3, slideClasses = classNames);
    		}
    	};

    	const attachEvent = () => {
    		if (!swiper || eventAttached) return;
    		swiper.on('_slideClass', updateClasses);
    		eventAttached = true;
    	};

    	const detachEvent = () => {
    		if (!swiper) return;
    		swiper.off('_slideClass', updateClasses);
    		eventAttached = false;
    	};

    	onMount(() => {
    		if (typeof virtualIndex === 'undefined') return;

    		$$invalidate(
    			4,
    			slideEl.onSwiper = _swiper => {
    				swiper = _swiper;
    				attachEvent();
    			},
    			slideEl
    		);

    		attachEvent();
    	});

    	afterUpdate(() => {
    		if (!slideEl || !swiper) return;

    		if (swiper.destroyed) {
    			if (slideClasses !== 'swiper-slide') {
    				$$invalidate(3, slideClasses = 'swiper-slide');
    			}

    			return;
    		}

    		attachEvent();
    	});

    	beforeUpdate(() => {
    		attachEvent();
    	});

    	onDestroy(() => {
    		if (!swiper) return;
    		detachEvent();
    	});

    	function div_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			slideEl = $$value;
    			$$invalidate(4, slideEl);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(6, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('zoom' in $$new_props) $$invalidate(0, zoom = $$new_props.zoom);
    		if ('virtualIndex' in $$new_props) $$invalidate(1, virtualIndex = $$new_props.virtualIndex);
    		if ('class' in $$new_props) $$invalidate(2, className = $$new_props.class);
    		if ('$$scope' in $$new_props) $$invalidate(7, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		onDestroy,
    		beforeUpdate,
    		afterUpdate,
    		setContext,
    		getContext,
    		uniqueClasses,
    		zoom,
    		virtualIndex,
    		className,
    		slideEl,
    		slideClasses,
    		swiper,
    		eventAttached,
    		updateClasses,
    		attachEvent,
    		detachEvent,
    		slideData
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('zoom' in $$props) $$invalidate(0, zoom = $$new_props.zoom);
    		if ('virtualIndex' in $$props) $$invalidate(1, virtualIndex = $$new_props.virtualIndex);
    		if ('className' in $$props) $$invalidate(2, className = $$new_props.className);
    		if ('slideEl' in $$props) $$invalidate(4, slideEl = $$new_props.slideEl);
    		if ('slideClasses' in $$props) $$invalidate(3, slideClasses = $$new_props.slideClasses);
    		if ('swiper' in $$props) swiper = $$new_props.swiper;
    		if ('eventAttached' in $$props) eventAttached = $$new_props.eventAttached;
    		if ('slideData' in $$props) $$invalidate(5, slideData = $$new_props.slideData);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*slideClasses*/ 8) {
    			$$invalidate(5, slideData = {
    				isActive: slideClasses.indexOf('swiper-slide-active') >= 0 || slideClasses.indexOf('swiper-slide-duplicate-active') >= 0,
    				isVisible: slideClasses.indexOf('swiper-slide-visible') >= 0,
    				isDuplicate: slideClasses.indexOf('swiper-slide-duplicate') >= 0,
    				isPrev: slideClasses.indexOf('swiper-slide-prev') >= 0 || slideClasses.indexOf('swiper-slide-duplicate-prev') >= 0,
    				isNext: slideClasses.indexOf('swiper-slide-next') >= 0 || slideClasses.indexOf('swiper-slide-duplicate-next') >= 0
    			});
    		}
    	};

    	return [
    		zoom,
    		virtualIndex,
    		className,
    		slideClasses,
    		slideEl,
    		slideData,
    		$$restProps,
    		$$scope,
    		slots,
    		div_binding
    	];
    }

    class Swiper_slide extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$d, create_fragment$d, safe_not_equal, { zoom: 0, virtualIndex: 1, class: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Swiper_slide",
    			options,
    			id: create_fragment$d.name
    		});
    	}

    	get zoom() {
    		throw new Error("<Swiper_slide>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set zoom(value) {
    		throw new Error("<Swiper_slide>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get virtualIndex() {
    		throw new Error("<Swiper_slide>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set virtualIndex(value) {
    		throw new Error("<Swiper_slide>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<Swiper_slide>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Swiper_slide>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\Testimonial.svelte generated by Svelte v3.48.0 */
    const file$9 = "src\\component\\Testimonial.svelte";

    // (20:8) <SwiperSlide>
    function create_default_slot_5(ctx) {
    	let div1;
    	let div0;
    	let h3;
    	let t1;
    	let h4;
    	let t3;
    	let p;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			h3 = element("h3");
    			h3.textContent = "Kania Putri";
    			t1 = space();
    			h4 = element("h4");
    			h4.textContent = "Undergraduate Chemical Engineering Student at Universitas Indonesia";
    			t3 = space();
    			p = element("p");
    			p.textContent = "The explanation from the tutor is complete and easy to understand, the material is discussed thoroughly.";
    			add_location(h3, file$9, 23, 16, 868);
    			add_location(h4, file$9, 24, 16, 906);
    			add_location(p, file$9, 25, 16, 1000);
    			attr_dev(div0, "class", "testimonial-item");
    			add_location(div0, file$9, 21, 12, 725);
    			attr_dev(div1, "class", "swiper-slide");
    			add_location(div1, file$9, 20, 12, 685);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, h3);
    			append_dev(div0, t1);
    			append_dev(div0, h4);
    			append_dev(div0, t3);
    			append_dev(div0, p);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_5.name,
    		type: "slot",
    		source: "(20:8) <SwiperSlide>",
    		ctx
    	});

    	return block;
    }

    // (31:8) <SwiperSlide>
    function create_default_slot_4(ctx) {
    	let div1;
    	let div0;
    	let h3;
    	let t1;
    	let h4;
    	let t3;
    	let p;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			h3 = element("h3");
    			h3.textContent = "Daniel Harun";
    			t1 = space();
    			h4 = element("h4");
    			h4.textContent = "Undergraduate Chemical Engineering Student at Universitas Sumatera Utara";
    			t3 = space();
    			p = element("p");
    			p.textContent = "The tutor make the class interactive, so it wasn't monotonous and easy to understand some of the hard concepts.";
    			add_location(h3, file$9, 34, 16, 1438);
    			add_location(h4, file$9, 35, 16, 1477);
    			add_location(p, file$9, 36, 16, 1576);
    			attr_dev(div0, "class", "testimonial-item");
    			add_location(div0, file$9, 32, 12, 1295);
    			attr_dev(div1, "class", "swiper-slide");
    			add_location(div1, file$9, 31, 12, 1255);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, h3);
    			append_dev(div0, t1);
    			append_dev(div0, h4);
    			append_dev(div0, t3);
    			append_dev(div0, p);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4.name,
    		type: "slot",
    		source: "(31:8) <SwiperSlide>",
    		ctx
    	});

    	return block;
    }

    // (42:8) <SwiperSlide>
    function create_default_slot_3(ctx) {
    	let div1;
    	let div0;
    	let h3;
    	let t1;
    	let h4;
    	let t3;
    	let p;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			h3 = element("h3");
    			h3.textContent = "Dhanira";
    			t1 = space();
    			h4 = element("h4");
    			h4.textContent = "Undergraduate Chemical Engineering Student Universitas Indonesia";
    			t3 = space();
    			p = element("p");
    			p.textContent = "Very happy with tutors who are interactive and trigger us to think, so we don't only listen to from the tutor but we are also given the opportunity to try to think from the hints given by the tutor.";
    			add_location(h3, file$9, 45, 16, 2021);
    			add_location(h4, file$9, 46, 16, 2055);
    			add_location(p, file$9, 47, 16, 2146);
    			attr_dev(div0, "class", "testimonial-item");
    			add_location(div0, file$9, 43, 12, 1878);
    			attr_dev(div1, "class", "swiper-slide");
    			add_location(div1, file$9, 42, 12, 1838);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, h3);
    			append_dev(div0, t1);
    			append_dev(div0, h4);
    			append_dev(div0, t3);
    			append_dev(div0, p);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3.name,
    		type: "slot",
    		source: "(42:8) <SwiperSlide>",
    		ctx
    	});

    	return block;
    }

    // (53:8) <SwiperSlide>
    function create_default_slot_2(ctx) {
    	let div1;
    	let div0;
    	let h3;
    	let t1;
    	let h4;
    	let t3;
    	let p;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			h3 = element("h3");
    			h3.textContent = "Zakaria";
    			t1 = space();
    			h4 = element("h4");
    			h4.textContent = "Postgraduate Chemical Engineering Student at Institut Teknologi Bandung";
    			t3 = space();
    			p = element("p");
    			p.textContent = "Software tutorials from the tutor is very clear and easy to follow.";
    			add_location(h3, file$9, 56, 16, 2678);
    			add_location(h4, file$9, 57, 16, 2712);
    			add_location(p, file$9, 58, 16, 2810);
    			attr_dev(div0, "class", "testimonial-item");
    			add_location(div0, file$9, 54, 12, 2535);
    			attr_dev(div1, "class", "swiper-slide");
    			add_location(div1, file$9, 53, 12, 2495);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, h3);
    			append_dev(div0, t1);
    			append_dev(div0, h4);
    			append_dev(div0, t3);
    			append_dev(div0, p);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(53:8) <SwiperSlide>",
    		ctx
    	});

    	return block;
    }

    // (64:8) <SwiperSlide>
    function create_default_slot_1(ctx) {
    	let div1;
    	let div0;
    	let h3;
    	let t1;
    	let h4;
    	let t3;
    	let p;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			h3 = element("h3");
    			h3.textContent = "Farah Marda";
    			t1 = space();
    			h4 = element("h4");
    			h4.textContent = "Postgraduate Chemical Engineering Student at Universitas Diponegoro";
    			t3 = space();
    			p = element("p");
    			p.textContent = "Two-way communciations with the tutor in the class makes learning more fun and interactive.";
    			add_location(h3, file$9, 67, 16, 3211);
    			add_location(h4, file$9, 68, 16, 3249);
    			add_location(p, file$9, 69, 16, 3343);
    			attr_dev(div0, "class", "testimonial-item");
    			add_location(div0, file$9, 65, 12, 3068);
    			attr_dev(div1, "class", "swiper-slide");
    			add_location(div1, file$9, 64, 12, 3028);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, h3);
    			append_dev(div0, t1);
    			append_dev(div0, h4);
    			append_dev(div0, t3);
    			append_dev(div0, p);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(64:8) <SwiperSlide>",
    		ctx
    	});

    	return block;
    }

    // (13:12) <Swiper              modules={[Autoplay, Pagination]}              spaceBetween={50}              slidesPerView={1}              pagination={{clickable:true}}              autoplay               >
    function create_default_slot$1(ctx) {
    	let swiperslide0;
    	let t0;
    	let swiperslide1;
    	let t1;
    	let swiperslide2;
    	let t2;
    	let swiperslide3;
    	let t3;
    	let swiperslide4;
    	let current;

    	swiperslide0 = new Swiper_slide({
    			props: {
    				$$slots: { default: [create_default_slot_5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	swiperslide1 = new Swiper_slide({
    			props: {
    				$$slots: { default: [create_default_slot_4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	swiperslide2 = new Swiper_slide({
    			props: {
    				$$slots: { default: [create_default_slot_3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	swiperslide3 = new Swiper_slide({
    			props: {
    				$$slots: { default: [create_default_slot_2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	swiperslide4 = new Swiper_slide({
    			props: {
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(swiperslide0.$$.fragment);
    			t0 = space();
    			create_component(swiperslide1.$$.fragment);
    			t1 = space();
    			create_component(swiperslide2.$$.fragment);
    			t2 = space();
    			create_component(swiperslide3.$$.fragment);
    			t3 = space();
    			create_component(swiperslide4.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(swiperslide0, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(swiperslide1, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(swiperslide2, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(swiperslide3, target, anchor);
    			insert_dev(target, t3, anchor);
    			mount_component(swiperslide4, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const swiperslide0_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				swiperslide0_changes.$$scope = { dirty, ctx };
    			}

    			swiperslide0.$set(swiperslide0_changes);
    			const swiperslide1_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				swiperslide1_changes.$$scope = { dirty, ctx };
    			}

    			swiperslide1.$set(swiperslide1_changes);
    			const swiperslide2_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				swiperslide2_changes.$$scope = { dirty, ctx };
    			}

    			swiperslide2.$set(swiperslide2_changes);
    			const swiperslide3_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				swiperslide3_changes.$$scope = { dirty, ctx };
    			}

    			swiperslide3.$set(swiperslide3_changes);
    			const swiperslide4_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				swiperslide4_changes.$$scope = { dirty, ctx };
    			}

    			swiperslide4.$set(swiperslide4_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(swiperslide0.$$.fragment, local);
    			transition_in(swiperslide1.$$.fragment, local);
    			transition_in(swiperslide2.$$.fragment, local);
    			transition_in(swiperslide3.$$.fragment, local);
    			transition_in(swiperslide4.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(swiperslide0.$$.fragment, local);
    			transition_out(swiperslide1.$$.fragment, local);
    			transition_out(swiperslide2.$$.fragment, local);
    			transition_out(swiperslide3.$$.fragment, local);
    			transition_out(swiperslide4.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(swiperslide0, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(swiperslide1, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(swiperslide2, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(swiperslide3, detaching);
    			if (detaching) detach_dev(t3);
    			destroy_component(swiperslide4, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(13:12) <Swiper              modules={[Autoplay, Pagination]}              spaceBetween={50}              slidesPerView={1}              pagination={{clickable:true}}              autoplay               >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$c(ctx) {
    	let section;
    	let div5;
    	let header;
    	let h3;
    	let t1;
    	let div4;
    	let div3;
    	let div2;
    	let div0;
    	let swiper;
    	let t2;
    	let div1;
    	let current;

    	swiper = new Swiper({
    			props: {
    				modules: [Autoplay, Pagination],
    				spaceBetween: 50,
    				slidesPerView: 1,
    				pagination: { clickable: true },
    				autoplay: true,
    				$$slots: { default: [create_default_slot$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			section = element("section");
    			div5 = element("div");
    			header = element("header");
    			h3 = element("h3");
    			h3.textContent = "What they said about TORCHE";
    			t1 = space();
    			div4 = element("div");
    			div3 = element("div");
    			div2 = element("div");
    			div0 = element("div");
    			create_component(swiper.$$.fragment);
    			t2 = space();
    			div1 = element("div");
    			add_location(h3, file$9, 5, 4, 182);
    			attr_dev(header, "class", "section-header");
    			add_location(header, file$9, 4, 4, 145);
    			attr_dev(div0, "class", "swiper-wrapper");
    			add_location(div0, file$9, 11, 8, 410);
    			attr_dev(div1, "class", "swiper-pagination");
    			add_location(div1, file$9, 76, 8, 3597);
    			attr_dev(div2, "class", "testimonials-slider swiper");
    			attr_dev(div2, "data-aos", "fade-up");
    			attr_dev(div2, "data-aos-delay", "100");
    			add_location(div2, file$9, 10, 8, 320);
    			attr_dev(div3, "class", "col-lg-10");
    			add_location(div3, file$9, 9, 4, 287);
    			attr_dev(div4, "class", "row justify-content-center");
    			add_location(div4, file$9, 8, 4, 241);
    			attr_dev(div5, "class", "container");
    			attr_dev(div5, "data-aso", "zoom-in");
    			add_location(div5, file$9, 3, 0, 97);
    			attr_dev(section, "id", "testimonials");
    			attr_dev(section, "class", "section-bg");
    			add_location(section, file$9, 2, 0, 49);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, div5);
    			append_dev(div5, header);
    			append_dev(header, h3);
    			append_dev(div5, t1);
    			append_dev(div5, div4);
    			append_dev(div4, div3);
    			append_dev(div3, div2);
    			append_dev(div2, div0);
    			mount_component(swiper, div0, null);
    			append_dev(div2, t2);
    			append_dev(div2, div1);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const swiper_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				swiper_changes.$$scope = { dirty, ctx };
    			}

    			swiper.$set(swiper_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(swiper.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(swiper.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			destroy_component(swiper);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$c.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$c($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Testimonial', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Testimonial> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Swiper,
    		SwiperSlide: Swiper_slide,
    		Autoplay,
    		Pagination
    	});

    	return [];
    }

    class Testimonial extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$c, create_fragment$c, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Testimonial",
    			options,
    			id: create_fragment$c.name
    		});
    	}
    }

    /* node_modules\svelte-counter\src\Counter.svelte generated by Svelte v3.48.0 */

    const { Object: Object_1 } = globals;

    const get_default_slot_changes = dirty => ({
    	counterResult: dirty & /*counterResult*/ 1
    });

    const get_default_slot_context = ctx => ({ counterResult: /*counterResult*/ ctx[0] });

    function create_fragment$b(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[6].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[5], get_default_slot_context);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope, counterResult*/ 33)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[5],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[5])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[5], dirty, get_default_slot_changes),
    						get_default_slot_context
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function getRandomInt(min, max) {
    	min = Math.ceil(min);
    	max = Math.floor(max);
    	return Math.floor(Math.random() * (max - min)) + min;
    }

    function instance$b($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Counter', slots, ['default']);
    	let { values, duration, random, minspeed } = $$props;
    	let counterResult = {};
    	var timers = [];

    	onMount(() => {
    		$$invalidate(1, duration = parseInt(duration) || 5000);
    		$$invalidate(3, minspeed = parseInt(minspeed) || 20);
    		$$invalidate(2, random = random == 'true');

    		for (let [key, value] of Object.entries(values)) {
    			let step = 1;
    			let max = parseInt(value);
    			let randomMax = Math.floor(max / 2);
    			let randomMin = 0;

    			while (duration / (max / step) < minspeed) {
    				step++;
    			}

    			$$invalidate(0, counterResult[key] = 0, counterResult);

    			timers[key] = setInterval(
    				function () {
    					if (counterResult[key] < max) {
    						if (random) {
    							randomMin = Math.floor(counterResult[key] / 2);
    							$$invalidate(0, counterResult[key] = getRandomInt(randomMin, randomMax), counterResult);
    							randomMax += step;
    						}

    						$$invalidate(0, counterResult[key] += step, counterResult);
    					} else {
    						$$invalidate(0, counterResult[key] = max, counterResult);
    						clearInterval(timers[key]);
    					}
    				},
    				duration / (max / step)
    			);
    		}
    	});

    	const writable_props = ['values', 'duration', 'random', 'minspeed'];

    	Object_1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Counter> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('values' in $$props) $$invalidate(4, values = $$props.values);
    		if ('duration' in $$props) $$invalidate(1, duration = $$props.duration);
    		if ('random' in $$props) $$invalidate(2, random = $$props.random);
    		if ('minspeed' in $$props) $$invalidate(3, minspeed = $$props.minspeed);
    		if ('$$scope' in $$props) $$invalidate(5, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		values,
    		duration,
    		random,
    		minspeed,
    		counterResult,
    		timers,
    		getRandomInt
    	});

    	$$self.$inject_state = $$props => {
    		if ('values' in $$props) $$invalidate(4, values = $$props.values);
    		if ('duration' in $$props) $$invalidate(1, duration = $$props.duration);
    		if ('random' in $$props) $$invalidate(2, random = $$props.random);
    		if ('minspeed' in $$props) $$invalidate(3, minspeed = $$props.minspeed);
    		if ('counterResult' in $$props) $$invalidate(0, counterResult = $$props.counterResult);
    		if ('timers' in $$props) timers = $$props.timers;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [counterResult, duration, random, minspeed, values, $$scope, slots];
    }

    class Counter extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$b, create_fragment$b, safe_not_equal, {
    			values: 4,
    			duration: 1,
    			random: 2,
    			minspeed: 3
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Counter",
    			options,
    			id: create_fragment$b.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*values*/ ctx[4] === undefined && !('values' in props)) {
    			console.warn("<Counter> was created without expected prop 'values'");
    		}

    		if (/*duration*/ ctx[1] === undefined && !('duration' in props)) {
    			console.warn("<Counter> was created without expected prop 'duration'");
    		}

    		if (/*random*/ ctx[2] === undefined && !('random' in props)) {
    			console.warn("<Counter> was created without expected prop 'random'");
    		}

    		if (/*minspeed*/ ctx[3] === undefined && !('minspeed' in props)) {
    			console.warn("<Counter> was created without expected prop 'minspeed'");
    		}
    	}

    	get values() {
    		throw new Error("<Counter>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set values(value) {
    		throw new Error("<Counter>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get duration() {
    		throw new Error("<Counter>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set duration(value) {
    		throw new Error("<Counter>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get random() {
    		throw new Error("<Counter>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set random(value) {
    		throw new Error("<Counter>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get minspeed() {
    		throw new Error("<Counter>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set minspeed(value) {
    		throw new Error("<Counter>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\component\WhyUs.svelte generated by Svelte v3.48.0 */
    const file$8 = "src\\component\\WhyUs.svelte";

    // (55:6) <Counter values={counters} duration="2000" random="false" minspeed="100" let:counterResult>
    function create_default_slot(ctx) {
    	let div4;
    	let div0;
    	let span0;
    	let t0_value = /*counterResult*/ ctx[1].Students + "";
    	let t0;
    	let t1;
    	let p0;
    	let t3;
    	let div1;
    	let span1;
    	let t4_value = /*counterResult*/ ctx[1].Classes + "";
    	let t4;
    	let t5;
    	let p1;
    	let t7;
    	let div2;
    	let span2;
    	let t9;
    	let p2;
    	let t11;
    	let div3;
    	let span3;
    	let t12_value = /*counterResult*/ ctx[1].Tutors + "";
    	let t12;
    	let t13;
    	let p3;

    	const block = {
    		c: function create() {
    			div4 = element("div");
    			div0 = element("div");
    			span0 = element("span");
    			t0 = text$1(t0_value);
    			t1 = space();
    			p0 = element("p");
    			p0.textContent = "Unique Students*";
    			t3 = space();
    			div1 = element("div");
    			span1 = element("span");
    			t4 = text$1(t4_value);
    			t5 = space();
    			p1 = element("p");
    			p1.textContent = "Classes*";
    			t7 = space();
    			div2 = element("div");
    			span2 = element("span");
    			span2.textContent = "9/10";
    			t9 = space();
    			p2 = element("p");
    			p2.textContent = "Ratings from students*";
    			t11 = space();
    			div3 = element("div");
    			span3 = element("span");
    			t12 = text$1(t12_value);
    			t13 = space();
    			p3 = element("p");
    			p3.textContent = "High Quality Tutors";
    			attr_dev(span0, "class", "svelte-qacghb");
    			add_location(span0, file$8, 57, 12, 2204);
    			attr_dev(p0, "class", "svelte-qacghb");
    			add_location(p0, file$8, 58, 12, 2255);
    			attr_dev(div0, "class", "col-lg-3 col-6 text-center");
    			add_location(div0, file$8, 56, 10, 2150);
    			attr_dev(span1, "class", "svelte-qacghb");
    			add_location(span1, file$8, 62, 12, 2366);
    			attr_dev(p1, "class", "svelte-qacghb");
    			add_location(p1, file$8, 63, 12, 2417);
    			attr_dev(div1, "class", "col-lg-3 col-6 text-center");
    			add_location(div1, file$8, 61, 10, 2312);
    			attr_dev(span2, "class", "svelte-qacghb");
    			add_location(span2, file$8, 67, 12, 2520);
    			attr_dev(p2, "class", "svelte-qacghb");
    			add_location(p2, file$8, 68, 12, 2551);
    			attr_dev(div2, "class", "col-lg-3 col-6 text-center");
    			add_location(div2, file$8, 66, 10, 2466);
    			attr_dev(span3, "class", "svelte-qacghb");
    			add_location(span3, file$8, 72, 12, 2668);
    			attr_dev(p3, "class", "svelte-qacghb");
    			add_location(p3, file$8, 73, 12, 2718);
    			attr_dev(div3, "class", "col-lg-3 col-6 text-center");
    			add_location(div3, file$8, 71, 10, 2614);
    			attr_dev(div4, "class", "row counters svelte-qacghb");
    			attr_dev(div4, "data-aos", "fade-up");
    			attr_dev(div4, "data-aos-delay", "100");
    			add_location(div4, file$8, 55, 8, 2072);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div4, anchor);
    			append_dev(div4, div0);
    			append_dev(div0, span0);
    			append_dev(span0, t0);
    			append_dev(div0, t1);
    			append_dev(div0, p0);
    			append_dev(div4, t3);
    			append_dev(div4, div1);
    			append_dev(div1, span1);
    			append_dev(span1, t4);
    			append_dev(div1, t5);
    			append_dev(div1, p1);
    			append_dev(div4, t7);
    			append_dev(div4, div2);
    			append_dev(div2, span2);
    			append_dev(div2, t9);
    			append_dev(div2, p2);
    			append_dev(div4, t11);
    			append_dev(div4, div3);
    			append_dev(div3, span3);
    			append_dev(span3, t12);
    			append_dev(div3, t13);
    			append_dev(div3, p3);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*counterResult*/ 2 && t0_value !== (t0_value = /*counterResult*/ ctx[1].Students + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*counterResult*/ 2 && t4_value !== (t4_value = /*counterResult*/ ctx[1].Classes + "")) set_data_dev(t4, t4_value);
    			if (dirty & /*counterResult*/ 2 && t12_value !== (t12_value = /*counterResult*/ ctx[1].Tutors + "")) set_data_dev(t12, t12_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div4);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(55:6) <Counter values={counters} duration=\\\"2000\\\" random=\\\"false\\\" minspeed=\\\"100\\\" let:counterResult>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$a(ctx) {
    	let section;
    	let div12;
    	let header;
    	let h3;
    	let t1;
    	let p0;
    	let t3;
    	let div9;
    	let div2;
    	let div1;
    	let i0;
    	let t4;
    	let div0;
    	let h50;
    	let t6;
    	let p1;
    	let t8;
    	let div5;
    	let div4;
    	let i1;
    	let t9;
    	let div3;
    	let h51;
    	let t11;
    	let p2;
    	let t13;
    	let div8;
    	let div7;
    	let i2;
    	let t14;
    	let div6;
    	let h52;
    	let t16;
    	let p3;
    	let t18;
    	let counter;
    	let t19;
    	let div11;
    	let div10;
    	let p4;
    	let current;

    	counter = new Counter({
    			props: {
    				values: /*counters*/ ctx[0],
    				duration: "2000",
    				random: "false",
    				minspeed: "100",
    				$$slots: {
    					default: [
    						create_default_slot,
    						({ counterResult }) => ({ 1: counterResult }),
    						({ counterResult }) => counterResult ? 2 : 0
    					]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			section = element("section");
    			div12 = element("div");
    			header = element("header");
    			h3 = element("h3");
    			h3.textContent = "Why TORCHE?";
    			t1 = space();
    			p0 = element("p");
    			p0.textContent = "Not only giving the best process engineering curriculum, we also provides services that our competitors can't provide.";
    			t3 = space();
    			div9 = element("div");
    			div2 = element("div");
    			div1 = element("div");
    			i0 = element("i");
    			t4 = space();
    			div0 = element("div");
    			h50 = element("h5");
    			h50.textContent = "Flexible Time";
    			t6 = space();
    			p1 = element("p");
    			p1.textContent = "Based on agreement between member and tutor.";
    			t8 = space();
    			div5 = element("div");
    			div4 = element("div");
    			i1 = element("i");
    			t9 = space();
    			div3 = element("div");
    			h51 = element("h5");
    			h51.textContent = "Free Class Recordings";
    			t11 = space();
    			p2 = element("p");
    			p2.textContent = "With no additional cost.";
    			t13 = space();
    			div8 = element("div");
    			div7 = element("div");
    			i2 = element("i");
    			t14 = space();
    			div6 = element("div");
    			h52 = element("h5");
    			h52.textContent = "After-class Consultation";
    			t16 = space();
    			p3 = element("p");
    			p3.textContent = "Valid for 7 days after completing the course by joining our Discord server";
    			t18 = space();
    			create_component(counter.$$.fragment);
    			t19 = space();
    			div11 = element("div");
    			div10 = element("div");
    			p4 = element("p");
    			p4.textContent = "*data from 2021";
    			attr_dev(h3, "class", "svelte-qacghb");
    			add_location(h3, file$8, 16, 8, 306);
    			attr_dev(p0, "class", "svelte-qacghb");
    			add_location(p0, file$8, 17, 8, 336);
    			attr_dev(header, "class", "section-header");
    			add_location(header, file$8, 15, 6, 265);
    			attr_dev(i0, "class", "bi bi-calendar4-week svelte-qacghb");
    			add_location(i0, file$8, 23, 12, 663);
    			attr_dev(h50, "class", "card-title svelte-qacghb");
    			add_location(h50, file$8, 25, 14, 752);
    			attr_dev(p1, "class", "card-text svelte-qacghb");
    			add_location(p1, file$8, 26, 14, 809);
    			attr_dev(div0, "class", "card-body");
    			add_location(div0, file$8, 24, 12, 713);
    			attr_dev(div1, "class", "card svelte-qacghb");
    			attr_dev(div1, "data-aos", "zoom-in");
    			attr_dev(div1, "data-aos-delay", "100");
    			add_location(div1, file$8, 22, 10, 591);
    			attr_dev(div2, "class", "col-lg-4 mb-4");
    			add_location(div2, file$8, 21, 8, 552);
    			attr_dev(i1, "class", "bi bi-camera-reels svelte-qacghb");
    			add_location(i1, file$8, 34, 12, 1123);
    			attr_dev(h51, "class", "card-title svelte-qacghb");
    			add_location(h51, file$8, 36, 14, 1210);
    			attr_dev(p2, "class", "card-text svelte-qacghb");
    			add_location(p2, file$8, 37, 14, 1275);
    			attr_dev(div3, "class", "card-body");
    			add_location(div3, file$8, 35, 12, 1171);
    			attr_dev(div4, "class", "card svelte-qacghb");
    			attr_dev(div4, "data-aos", "zoom-in");
    			attr_dev(div4, "data-aos-delay", "200");
    			add_location(div4, file$8, 33, 10, 1051);
    			attr_dev(div5, "class", "col-lg-4 mb-4");
    			add_location(div5, file$8, 32, 8, 1012);
    			attr_dev(i2, "class", "bi bi-chat-square-text svelte-qacghb");
    			add_location(i2, file$8, 45, 12, 1569);
    			attr_dev(h52, "class", "card-title svelte-qacghb");
    			add_location(h52, file$8, 47, 14, 1660);
    			attr_dev(p3, "class", "card-text svelte-qacghb");
    			add_location(p3, file$8, 48, 14, 1728);
    			attr_dev(div6, "class", "card-body");
    			add_location(div6, file$8, 46, 12, 1621);
    			attr_dev(div7, "class", "card svelte-qacghb");
    			attr_dev(div7, "data-aos", "zoom-in");
    			attr_dev(div7, "data-aos-delay", "300");
    			add_location(div7, file$8, 44, 10, 1497);
    			attr_dev(div8, "class", "col-lg-4 mb-4");
    			add_location(div8, file$8, 43, 8, 1458);
    			attr_dev(div9, "class", "row row-eq-height justify-content-center");
    			add_location(div9, file$8, 20, 6, 488);
    			attr_dev(p4, "class", "svelte-qacghb");
    			add_location(p4, file$8, 80, 10, 2917);
    			attr_dev(div10, "class", "col-lg-12 col-12 text-center");
    			add_location(div10, file$8, 79, 8, 2863);
    			attr_dev(div11, "class", "row counters svelte-qacghb");
    			attr_dev(div11, "data-aos", "fade-up");
    			add_location(div11, file$8, 78, 6, 2808);
    			attr_dev(div12, "class", "container");
    			attr_dev(div12, "data-aos", "fade-up");
    			add_location(div12, file$8, 14, 4, 215);
    			attr_dev(section, "id", "why-us");
    			attr_dev(section, "class", "svelte-qacghb");
    			add_location(section, file$8, 13, 1, 188);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, div12);
    			append_dev(div12, header);
    			append_dev(header, h3);
    			append_dev(header, t1);
    			append_dev(header, p0);
    			append_dev(div12, t3);
    			append_dev(div12, div9);
    			append_dev(div9, div2);
    			append_dev(div2, div1);
    			append_dev(div1, i0);
    			append_dev(div1, t4);
    			append_dev(div1, div0);
    			append_dev(div0, h50);
    			append_dev(div0, t6);
    			append_dev(div0, p1);
    			append_dev(div9, t8);
    			append_dev(div9, div5);
    			append_dev(div5, div4);
    			append_dev(div4, i1);
    			append_dev(div4, t9);
    			append_dev(div4, div3);
    			append_dev(div3, h51);
    			append_dev(div3, t11);
    			append_dev(div3, p2);
    			append_dev(div9, t13);
    			append_dev(div9, div8);
    			append_dev(div8, div7);
    			append_dev(div7, i2);
    			append_dev(div7, t14);
    			append_dev(div7, div6);
    			append_dev(div6, h52);
    			append_dev(div6, t16);
    			append_dev(div6, p3);
    			append_dev(div12, t18);
    			mount_component(counter, div12, null);
    			append_dev(div12, t19);
    			append_dev(div12, div11);
    			append_dev(div11, div10);
    			append_dev(div10, p4);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const counter_changes = {};

    			if (dirty & /*$$scope, counterResult*/ 6) {
    				counter_changes.$$scope = { dirty, ctx };
    			}

    			counter.$set(counter_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(counter.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(counter.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			destroy_component(counter);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('WhyUs', slots, []);

    	let counters = {
    		'Students': 864,
    		'Classes': 1552,
    		'Tutors': 22
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<WhyUs> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Counter, counters });

    	$$self.$inject_state = $$props => {
    		if ('counters' in $$props) $$invalidate(0, counters = $$props.counters);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [counters];
    }

    class WhyUs extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "WhyUs",
    			options,
    			id: create_fragment$a.name
    		});
    	}
    }

    /* src\pages\Service.svelte generated by Svelte v3.48.0 */
    const file$7 = "src\\pages\\Service.svelte";

    function create_fragment$9(ctx) {
    	let section;
    	let div19;
    	let header;
    	let h3;
    	let t1;
    	let p0;
    	let t3;
    	let div18;
    	let div2;
    	let div1;
    	let div0;
    	let i0;
    	let easel2;
    	let t4;
    	let h40;
    	let a0;
    	let t6;
    	let p1;
    	let t8;
    	let div5;
    	let div4;
    	let div3;
    	let i1;
    	let people;
    	let t9;
    	let h41;
    	let a1;
    	let t11;
    	let p2;
    	let t13;
    	let div8;
    	let div7;
    	let div6;
    	let i2;
    	let binoculars;
    	let t14;
    	let h42;
    	let a2;
    	let t16;
    	let p3;
    	let t18;
    	let div11;
    	let div10;
    	let div9;
    	let i3;
    	let personvideo3;
    	let t19;
    	let h43;
    	let a3;
    	let t21;
    	let p4;
    	let t23;
    	let div14;
    	let div13;
    	let div12;
    	let i4;
    	let cardheading;
    	let t24;
    	let h44;
    	let a4;
    	let t26;
    	let p5;
    	let t28;
    	let div17;
    	let div16;
    	let div15;
    	let i5;
    	let mortarboard;
    	let t29;
    	let h45;
    	let a5;
    	let t31;
    	let p6;
    	let t33;
    	let whyus;
    	let t34;
    	let testimonial;
    	let current;

    	easel2 = new Easel2$1({
    			props: { width: 48, height: 48 },
    			$$inline: true
    		});

    	people = new People$1({
    			props: { width: 48, height: 48 },
    			$$inline: true
    		});

    	binoculars = new Binoculars$1({
    			props: { width: 48, height: 48 },
    			$$inline: true
    		});

    	personvideo3 = new PersonVideo3$1({
    			props: { width: 48, height: 48 },
    			$$inline: true
    		});

    	cardheading = new CardHeading$1({
    			props: { width: 48, height: 48 },
    			$$inline: true
    		});

    	mortarboard = new Mortarboard$1({
    			props: { width: 48, height: 48 },
    			$$inline: true
    		});

    	whyus = new WhyUs({ $$inline: true });
    	testimonial = new Testimonial({ $$inline: true });

    	const block = {
    		c: function create() {
    			section = element("section");
    			div19 = element("div");
    			header = element("header");
    			h3 = element("h3");
    			h3.textContent = "Services";
    			t1 = space();
    			p0 = element("p");
    			p0.textContent = "As a complementary education company, we provide services to support your goals to become a high-quality process engineer.";
    			t3 = space();
    			div18 = element("div");
    			div2 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			i0 = element("i");
    			create_component(easel2.$$.fragment);
    			t4 = space();
    			h40 = element("h4");
    			a0 = element("a");
    			a0.textContent = "Tutor Class";
    			t6 = space();
    			p1 = element("p");
    			p1.textContent = "Tutor class consists of materials explanation from our tutors with problem solving examples.";
    			t8 = space();
    			div5 = element("div");
    			div4 = element("div");
    			div3 = element("div");
    			i1 = element("i");
    			create_component(people.$$.fragment);
    			t9 = space();
    			h41 = element("h4");
    			a1 = element("a");
    			a1.textContent = "Consultation Class";
    			t11 = space();
    			p2 = element("p");
    			p2.textContent = "Students can asks about the materials, homeworks, assignments, and projects related to the topics choosen.";
    			t13 = space();
    			div8 = element("div");
    			div7 = element("div");
    			div6 = element("div");
    			i2 = element("i");
    			create_component(binoculars.$$.fragment);
    			t14 = space();
    			h42 = element("h4");
    			a2 = element("a");
    			a2.textContent = "Focus Tutor Class";
    			t16 = space();
    			p3 = element("p");
    			p3.textContent = "Focus tutor class is intended for students who wanted to take part in competitions and projects that needs special coaching.";
    			t18 = space();
    			div11 = element("div");
    			div10 = element("div");
    			div9 = element("div");
    			i3 = element("i");
    			create_component(personvideo3.$$.fragment);
    			t19 = space();
    			h43 = element("h4");
    			a3 = element("a");
    			a3.textContent = "Seminars and Webinars";
    			t21 = space();
    			p4 = element("p");
    			p4.textContent = "We provide seminars and/or webinars in process engineering topics with trained and experienced practitioners";
    			t23 = space();
    			div14 = element("div");
    			div13 = element("div");
    			div12 = element("div");
    			i4 = element("i");
    			create_component(cardheading.$$.fragment);
    			t24 = space();
    			h44 = element("h4");
    			a4 = element("a");
    			a4.textContent = "Training";
    			t26 = space();
    			p5 = element("p");
    			p5.textContent = "Trainings and certifications that can give added value and support students' careers in process engineering.";
    			t28 = space();
    			div17 = element("div");
    			div16 = element("div");
    			div15 = element("div");
    			i5 = element("i");
    			create_component(mortarboard.$$.fragment);
    			t29 = space();
    			h45 = element("h4");
    			a5 = element("a");
    			a5.textContent = "Bootcamp";
    			t31 = space();
    			p6 = element("p");
    			p6.textContent = "Bootcamps are intended for students who want to accelerate their knowledge and careers in process engineering.";
    			t33 = space();
    			create_component(whyus.$$.fragment);
    			t34 = space();
    			create_component(testimonial.$$.fragment);
    			add_location(h3, file$7, 10, 8, 434);
    			add_location(p0, file$7, 11, 8, 461);
    			attr_dev(header, "class", "section-header svelte-39qjdv");
    			add_location(header, file$7, 9, 6, 393);
    			attr_dev(i0, "class", "bi bi-easel2 svelte-39qjdv");
    			set_style(i0, "color", "#ff6442");
    			add_location(i0, file$7, 17, 30, 799);
    			attr_dev(div0, "class", "icon svelte-39qjdv");
    			add_location(div0, file$7, 17, 12, 781);
    			attr_dev(a0, "href", "/#");
    			attr_dev(a0, "class", "svelte-39qjdv");
    			add_location(a0, file$7, 18, 30, 920);
    			attr_dev(h40, "class", "title svelte-39qjdv");
    			add_location(h40, file$7, 18, 12, 902);
    			attr_dev(p1, "class", "description svelte-39qjdv");
    			add_location(p1, file$7, 19, 12, 967);
    			attr_dev(div1, "class", "box svelte-39qjdv");
    			add_location(div1, file$7, 16, 10, 750);
    			attr_dev(div2, "class", "col-md-6 col-lg-5");
    			attr_dev(div2, "data-aos", "zoom-in");
    			attr_dev(div2, "data-aos-delay", "100");
    			add_location(div2, file$7, 15, 8, 667);
    			attr_dev(i1, "class", "bi bi-people svelte-39qjdv");
    			set_style(i1, "color", "#ffae5f");
    			add_location(i1, file$7, 24, 30, 1262);
    			attr_dev(div3, "class", "icon svelte-39qjdv");
    			add_location(div3, file$7, 24, 12, 1244);
    			attr_dev(a1, "href", "/#");
    			attr_dev(a1, "class", "svelte-39qjdv");
    			add_location(a1, file$7, 25, 30, 1383);
    			attr_dev(h41, "class", "title svelte-39qjdv");
    			add_location(h41, file$7, 25, 12, 1365);
    			attr_dev(p2, "class", "description svelte-39qjdv");
    			add_location(p2, file$7, 26, 12, 1437);
    			attr_dev(div4, "class", "box svelte-39qjdv");
    			add_location(div4, file$7, 23, 10, 1213);
    			attr_dev(div5, "class", "col-md-6 col-lg-5");
    			attr_dev(div5, "data-aos", "zoom-in");
    			attr_dev(div5, "data-aos-delay", "200");
    			add_location(div5, file$7, 22, 8, 1130);
    			attr_dev(i2, "class", "bi bi-binoculars svelte-39qjdv");
    			set_style(i2, "color", "#51c1cb");
    			add_location(i2, file$7, 32, 30, 1748);
    			attr_dev(div6, "class", "icon svelte-39qjdv");
    			add_location(div6, file$7, 32, 12, 1730);
    			attr_dev(a2, "href", "/#");
    			attr_dev(a2, "class", "svelte-39qjdv");
    			add_location(a2, file$7, 33, 30, 1877);
    			attr_dev(h42, "class", "title svelte-39qjdv");
    			add_location(h42, file$7, 33, 12, 1859);
    			attr_dev(p3, "class", "description svelte-39qjdv");
    			add_location(p3, file$7, 34, 12, 1930);
    			attr_dev(div7, "class", "box svelte-39qjdv");
    			add_location(div7, file$7, 31, 10, 1699);
    			attr_dev(div8, "class", "col-md-6 col-lg-5");
    			attr_dev(div8, "data-aos", "zoom-in");
    			attr_dev(div8, "data-aos-delay", "100");
    			add_location(div8, file$7, 30, 8, 1616);
    			attr_dev(i3, "class", "bi bi-person-video3 svelte-39qjdv");
    			set_style(i3, "color", "#41cf2e");
    			add_location(i3, file$7, 39, 30, 2257);
    			attr_dev(div9, "class", "icon svelte-39qjdv");
    			add_location(div9, file$7, 39, 12, 2239);
    			attr_dev(a3, "href", "/#");
    			attr_dev(a3, "class", "svelte-39qjdv");
    			add_location(a3, file$7, 40, 30, 2391);
    			attr_dev(h43, "class", "title svelte-39qjdv");
    			add_location(h43, file$7, 40, 12, 2373);
    			attr_dev(p4, "class", "description svelte-39qjdv");
    			add_location(p4, file$7, 41, 12, 2448);
    			attr_dev(div10, "class", "box svelte-39qjdv");
    			add_location(div10, file$7, 38, 10, 2208);
    			attr_dev(div11, "class", "col-md-6 col-lg-5");
    			attr_dev(div11, "data-aos", "zoom-in");
    			attr_dev(div11, "data-aos-delay", "200");
    			add_location(div11, file$7, 37, 8, 2125);
    			attr_dev(i4, "class", "bi bi-card-heading svelte-39qjdv");
    			set_style(i4, "color", "#5885e9");
    			add_location(i4, file$7, 47, 30, 2761);
    			attr_dev(div12, "class", "icon svelte-39qjdv");
    			add_location(div12, file$7, 47, 12, 2743);
    			attr_dev(a4, "href", "/#");
    			attr_dev(a4, "class", "svelte-39qjdv");
    			add_location(a4, file$7, 48, 30, 2893);
    			attr_dev(h44, "class", "title svelte-39qjdv");
    			add_location(h44, file$7, 48, 12, 2875);
    			attr_dev(p5, "class", "description svelte-39qjdv");
    			add_location(p5, file$7, 49, 12, 2937);
    			attr_dev(div13, "class", "box svelte-39qjdv");
    			add_location(div13, file$7, 46, 10, 2712);
    			attr_dev(div14, "class", "col-md-6 col-lg-5");
    			attr_dev(div14, "data-aos", "zoom-in");
    			attr_dev(div14, "data-aos-delay", "100");
    			add_location(div14, file$7, 45, 8, 2629);
    			attr_dev(i5, "class", "bi bi-mortarboard svelte-39qjdv");
    			set_style(i5, "color", "#0b122a");
    			add_location(i5, file$7, 54, 30, 3248);
    			attr_dev(div15, "class", "icon svelte-39qjdv");
    			add_location(div15, file$7, 54, 12, 3230);
    			attr_dev(a5, "href", "/#");
    			attr_dev(a5, "class", "svelte-39qjdv");
    			add_location(a5, file$7, 55, 30, 3379);
    			attr_dev(h45, "class", "title svelte-39qjdv");
    			add_location(h45, file$7, 55, 12, 3361);
    			attr_dev(p6, "class", "description svelte-39qjdv");
    			add_location(p6, file$7, 56, 12, 3423);
    			attr_dev(div16, "class", "box svelte-39qjdv");
    			add_location(div16, file$7, 53, 10, 3199);
    			attr_dev(div17, "class", "col-md-6 col-lg-5");
    			attr_dev(div17, "data-aos", "zoom-in");
    			attr_dev(div17, "data-aos-delay", "200");
    			add_location(div17, file$7, 52, 8, 3116);
    			attr_dev(div18, "class", "row justify-content-center");
    			add_location(div18, file$7, 14, 6, 617);
    			attr_dev(div19, "class", "container");
    			attr_dev(div19, "data-aos", "fade-up");
    			add_location(div19, file$7, 8, 4, 343);
    			attr_dev(section, "id", "services");
    			attr_dev(section, "class", "section-bg svelte-39qjdv");
    			add_location(section, file$7, 7, 2, 295);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, div19);
    			append_dev(div19, header);
    			append_dev(header, h3);
    			append_dev(header, t1);
    			append_dev(header, p0);
    			append_dev(div19, t3);
    			append_dev(div19, div18);
    			append_dev(div18, div2);
    			append_dev(div2, div1);
    			append_dev(div1, div0);
    			append_dev(div0, i0);
    			mount_component(easel2, i0, null);
    			append_dev(div1, t4);
    			append_dev(div1, h40);
    			append_dev(h40, a0);
    			append_dev(div1, t6);
    			append_dev(div1, p1);
    			append_dev(div18, t8);
    			append_dev(div18, div5);
    			append_dev(div5, div4);
    			append_dev(div4, div3);
    			append_dev(div3, i1);
    			mount_component(people, i1, null);
    			append_dev(div4, t9);
    			append_dev(div4, h41);
    			append_dev(h41, a1);
    			append_dev(div4, t11);
    			append_dev(div4, p2);
    			append_dev(div18, t13);
    			append_dev(div18, div8);
    			append_dev(div8, div7);
    			append_dev(div7, div6);
    			append_dev(div6, i2);
    			mount_component(binoculars, i2, null);
    			append_dev(div7, t14);
    			append_dev(div7, h42);
    			append_dev(h42, a2);
    			append_dev(div7, t16);
    			append_dev(div7, p3);
    			append_dev(div18, t18);
    			append_dev(div18, div11);
    			append_dev(div11, div10);
    			append_dev(div10, div9);
    			append_dev(div9, i3);
    			mount_component(personvideo3, i3, null);
    			append_dev(div10, t19);
    			append_dev(div10, h43);
    			append_dev(h43, a3);
    			append_dev(div10, t21);
    			append_dev(div10, p4);
    			append_dev(div18, t23);
    			append_dev(div18, div14);
    			append_dev(div14, div13);
    			append_dev(div13, div12);
    			append_dev(div12, i4);
    			mount_component(cardheading, i4, null);
    			append_dev(div13, t24);
    			append_dev(div13, h44);
    			append_dev(h44, a4);
    			append_dev(div13, t26);
    			append_dev(div13, p5);
    			append_dev(div18, t28);
    			append_dev(div18, div17);
    			append_dev(div17, div16);
    			append_dev(div16, div15);
    			append_dev(div15, i5);
    			mount_component(mortarboard, i5, null);
    			append_dev(div16, t29);
    			append_dev(div16, h45);
    			append_dev(h45, a5);
    			append_dev(div16, t31);
    			append_dev(div16, p6);
    			insert_dev(target, t33, anchor);
    			mount_component(whyus, target, anchor);
    			insert_dev(target, t34, anchor);
    			mount_component(testimonial, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(easel2.$$.fragment, local);
    			transition_in(people.$$.fragment, local);
    			transition_in(binoculars.$$.fragment, local);
    			transition_in(personvideo3.$$.fragment, local);
    			transition_in(cardheading.$$.fragment, local);
    			transition_in(mortarboard.$$.fragment, local);
    			transition_in(whyus.$$.fragment, local);
    			transition_in(testimonial.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(easel2.$$.fragment, local);
    			transition_out(people.$$.fragment, local);
    			transition_out(binoculars.$$.fragment, local);
    			transition_out(personvideo3.$$.fragment, local);
    			transition_out(cardheading.$$.fragment, local);
    			transition_out(mortarboard.$$.fragment, local);
    			transition_out(whyus.$$.fragment, local);
    			transition_out(testimonial.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			destroy_component(easel2);
    			destroy_component(people);
    			destroy_component(binoculars);
    			destroy_component(personvideo3);
    			destroy_component(cardheading);
    			destroy_component(mortarboard);
    			if (detaching) detach_dev(t33);
    			destroy_component(whyus, detaching);
    			if (detaching) detach_dev(t34);
    			destroy_component(testimonial, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Service', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Service> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Binoculars: Binoculars$1,
    		CardHeading: CardHeading$1,
    		Easel: Easel$1,
    		Easel2: Easel2$1,
    		Mortarboard: Mortarboard$1,
    		People: People$1,
    		PersonVideo3: PersonVideo3$1,
    		Testimonial,
    		WhyUs
    	});

    	return [];
    }

    class Service extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Service",
    			options,
    			id: create_fragment$9.name
    		});
    	}
    }

    /* src\pages\Team.svelte generated by Svelte v3.48.0 */

    const file$6 = "src\\pages\\Team.svelte";

    function create_fragment$8(ctx) {
    	let section;
    	let div22;
    	let div0;
    	let h3;
    	let t1;
    	let p;
    	let t2;
    	let a0;
    	let t4;
    	let div21;
    	let div5;
    	let div4;
    	let img0;
    	let img0_src_value;
    	let t5;
    	let div3;
    	let div2;
    	let h40;
    	let t7;
    	let span0;
    	let t8;
    	let br0;
    	let t9;
    	let t10;
    	let div1;
    	let a1;
    	let i0;
    	let twitter0;
    	let t11;
    	let a2;
    	let i1;
    	let journalalbum;
    	let t12;
    	let a3;
    	let i2;
    	let instagram0;
    	let t13;
    	let a4;
    	let i3;
    	let linkedin0;
    	let t14;
    	let div10;
    	let div9;
    	let img1;
    	let img1_src_value;
    	let t15;
    	let div8;
    	let div7;
    	let h41;
    	let t17;
    	let span1;
    	let t18;
    	let br1;
    	let t19;
    	let t20;
    	let div6;
    	let a5;
    	let i4;
    	let instagram1;
    	let t21;
    	let a6;
    	let i5;
    	let linkedin1;
    	let t22;
    	let div15;
    	let div14;
    	let img2;
    	let img2_src_value;
    	let t23;
    	let div13;
    	let div12;
    	let h42;
    	let t25;
    	let span2;
    	let t26;
    	let br2;
    	let t27;
    	let t28;
    	let div11;
    	let a7;
    	let i6;
    	let twitter1;
    	let t29;
    	let a8;
    	let i7;
    	let facebook;
    	let t30;
    	let a9;
    	let i8;
    	let linkedin2;
    	let t31;
    	let div20;
    	let div19;
    	let img3;
    	let img3_src_value;
    	let t32;
    	let div18;
    	let div17;
    	let h43;
    	let t34;
    	let span3;
    	let t35;
    	let br3;
    	let t36;
    	let t37;
    	let div16;
    	let a10;
    	let i9;
    	let instagram2;
    	let t38;
    	let a11;
    	let i10;
    	let linkedin3;
    	let current;
    	twitter0 = new Twitter$1({ $$inline: true });
    	journalalbum = new JournalAlbum$1({ $$inline: true });
    	instagram0 = new Instagram$1({ $$inline: true });
    	linkedin0 = new Linkedin$1({ $$inline: true });
    	instagram1 = new Instagram$1({ $$inline: true });
    	linkedin1 = new Linkedin$1({ $$inline: true });
    	twitter1 = new Twitter$1({ $$inline: true });
    	facebook = new Facebook$1({ $$inline: true });
    	linkedin2 = new Linkedin$1({ $$inline: true });
    	instagram2 = new Instagram$1({ $$inline: true });
    	linkedin3 = new Linkedin$1({ $$inline: true });

    	const block = {
    		c: function create() {
    			section = element("section");
    			div22 = element("div");
    			div0 = element("div");
    			h3 = element("h3");
    			h3.textContent = "Team";
    			t1 = space();
    			p = element("p");
    			t2 = text$1("TORCHE Education's co-founders and partners are working hard to deliver the best process engineering education. ");
    			a0 = element("a");
    			a0.textContent = "Meet our full team.";
    			t4 = space();
    			div21 = element("div");
    			div5 = element("div");
    			div4 = element("div");
    			img0 = element("img");
    			t5 = space();
    			div3 = element("div");
    			div2 = element("div");
    			h40 = element("h4");
    			h40.textContent = "M Yusuf Arya Ramadhan";
    			t7 = space();
    			span0 = element("span");
    			t8 = text$1("CEO & CMO");
    			br0 = element("br");
    			t9 = text$1("Co-founder");
    			t10 = space();
    			div1 = element("div");
    			a1 = element("a");
    			i0 = element("i");
    			create_component(twitter0.$$.fragment);
    			t11 = space();
    			a2 = element("a");
    			i1 = element("i");
    			create_component(journalalbum.$$.fragment);
    			t12 = space();
    			a3 = element("a");
    			i2 = element("i");
    			create_component(instagram0.$$.fragment);
    			t13 = space();
    			a4 = element("a");
    			i3 = element("i");
    			create_component(linkedin0.$$.fragment);
    			t14 = space();
    			div10 = element("div");
    			div9 = element("div");
    			img1 = element("img");
    			t15 = space();
    			div8 = element("div");
    			div7 = element("div");
    			h41 = element("h4");
    			h41.textContent = "Felix Pratama";
    			t17 = space();
    			span1 = element("span");
    			t18 = text$1("COO");
    			br1 = element("br");
    			t19 = text$1("Co-founder");
    			t20 = space();
    			div6 = element("div");
    			a5 = element("a");
    			i4 = element("i");
    			create_component(instagram1.$$.fragment);
    			t21 = space();
    			a6 = element("a");
    			i5 = element("i");
    			create_component(linkedin1.$$.fragment);
    			t22 = space();
    			div15 = element("div");
    			div14 = element("div");
    			img2 = element("img");
    			t23 = space();
    			div13 = element("div");
    			div12 = element("div");
    			h42 = element("h4");
    			h42.textContent = "Leon Lukhas Santoso";
    			t25 = space();
    			span2 = element("span");
    			t26 = text$1("CFO");
    			br2 = element("br");
    			t27 = text$1("Co-founder");
    			t28 = space();
    			div11 = element("div");
    			a7 = element("a");
    			i6 = element("i");
    			create_component(twitter1.$$.fragment);
    			t29 = space();
    			a8 = element("a");
    			i7 = element("i");
    			create_component(facebook.$$.fragment);
    			t30 = space();
    			a9 = element("a");
    			i8 = element("i");
    			create_component(linkedin2.$$.fragment);
    			t31 = space();
    			div20 = element("div");
    			div19 = element("div");
    			img3 = element("img");
    			t32 = space();
    			div18 = element("div");
    			div17 = element("div");
    			h43 = element("h4");
    			h43.textContent = "Sendy Winata";
    			t34 = space();
    			span3 = element("span");
    			t35 = text$1("CHRO");
    			br3 = element("br");
    			t36 = text$1("Co-founder");
    			t37 = space();
    			div16 = element("div");
    			a10 = element("a");
    			i9 = element("i");
    			create_component(instagram2.$$.fragment);
    			t38 = space();
    			a11 = element("a");
    			i10 = element("i");
    			create_component(linkedin3.$$.fragment);
    			add_location(h3, file$6, 11, 8, 279);
    			attr_dev(a0, "href", "/#/allteams");
    			add_location(a0, file$6, 12, 123, 417);
    			add_location(p, file$6, 12, 8, 302);
    			attr_dev(div0, "class", "section-header");
    			add_location(div0, file$6, 10, 6, 241);
    			if (!src_url_equal(img0.src, img0_src_value = "./assets/img/team-1.jpg")) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "class", "img-fluid");
    			attr_dev(img0, "alt", "");
    			add_location(img0, file$6, 18, 12, 635);
    			add_location(h40, file$6, 21, 16, 803);
    			add_location(br0, file$6, 22, 31, 866);
    			add_location(span0, file$6, 22, 16, 851);
    			attr_dev(i0, "class", "bi bi-twitter");
    			add_location(i0, file$6, 24, 57, 986);
    			attr_dev(a1, "href", "https://twitter.com/arya1302");
    			add_location(a1, file$6, 24, 18, 947);
    			attr_dev(i1, "class", "bi bi-journal-album");
    			add_location(i1, file$6, 25, 86, 1117);
    			attr_dev(a2, "href", "https://www.researchgate.net/profile/Muhammad-Ramadhan-27");
    			add_location(a2, file$6, 25, 18, 1049);
    			attr_dev(i2, "class", "bi bi-instagram");
    			add_location(i2, file$6, 26, 68, 1241);
    			attr_dev(a3, "href", "https://www.instagram.com/ary.ramadhan/");
    			add_location(a3, file$6, 26, 18, 1191);
    			attr_dev(i3, "class", "bi bi-linkedin");
    			add_location(i3, file$6, 27, 71, 1361);
    			attr_dev(a4, "href", "https://www.linkedin.com/in/arya-ramadhan/");
    			add_location(a4, file$6, 27, 18, 1308);
    			attr_dev(div1, "class", "social");
    			add_location(div1, file$6, 23, 16, 907);
    			attr_dev(div2, "class", "member-info-content");
    			add_location(div2, file$6, 20, 14, 752);
    			attr_dev(div3, "class", "member-info");
    			add_location(div3, file$6, 19, 12, 711);
    			attr_dev(div4, "class", "member");
    			add_location(div4, file$6, 17, 10, 601);
    			attr_dev(div5, "class", "col-lg-3 col-md-6");
    			attr_dev(div5, "data-aos", "zoom-out");
    			attr_dev(div5, "data-aos-delay", "100");
    			add_location(div5, file$6, 16, 8, 517);
    			if (!src_url_equal(img1.src, img1_src_value = "assets/img/team-2.jpg")) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "class", "img-fluid");
    			attr_dev(img1, "alt", "");
    			add_location(img1, file$6, 36, 12, 1636);
    			add_location(h41, file$6, 39, 16, 1802);
    			add_location(br1, file$6, 40, 25, 1851);
    			add_location(span1, file$6, 40, 16, 1842);
    			attr_dev(i4, "class", "bi bi-instagram");
    			add_location(i4, file$6, 42, 66, 1980);
    			attr_dev(a5, "href", "https://www.instagram.com/lixpratama/");
    			add_location(a5, file$6, 42, 18, 1932);
    			attr_dev(i5, "class", "bi bi-linkedin");
    			add_location(i5, file$6, 43, 81, 2110);
    			attr_dev(a6, "href", "https://www.linkedin.com/in/felix-pratama-257295112/");
    			add_location(a6, file$6, 43, 18, 2047);
    			attr_dev(div6, "class", "social");
    			add_location(div6, file$6, 41, 16, 1892);
    			attr_dev(div7, "class", "member-info-content");
    			add_location(div7, file$6, 38, 14, 1751);
    			attr_dev(div8, "class", "member-info");
    			add_location(div8, file$6, 37, 12, 1710);
    			attr_dev(div9, "class", "member");
    			add_location(div9, file$6, 35, 10, 1602);
    			attr_dev(div10, "class", "col-lg-3 col-md-6");
    			attr_dev(div10, "data-aos", "zoom-out");
    			attr_dev(div10, "data-aos-delay", "200");
    			add_location(div10, file$6, 34, 8, 1518);
    			if (!src_url_equal(img2.src, img2_src_value = "assets/img/team-3.jpg")) attr_dev(img2, "src", img2_src_value);
    			attr_dev(img2, "class", "img-fluid");
    			attr_dev(img2, "alt", "");
    			add_location(img2, file$6, 52, 12, 2385);
    			add_location(h42, file$6, 55, 16, 2551);
    			add_location(br2, file$6, 56, 25, 2606);
    			add_location(span2, file$6, 56, 16, 2597);
    			attr_dev(i6, "class", "bi bi-twitter");
    			add_location(i6, file$6, 58, 60, 2729);
    			attr_dev(a7, "href", "https://twitter.com/Leonsantoso");
    			add_location(a7, file$6, 58, 18, 2687);
    			attr_dev(i7, "class", "bi bi-facebook");
    			add_location(i7, file$6, 59, 67, 2841);
    			attr_dev(a8, "href", "https://www.facebook.com/leon.santoso/");
    			add_location(a8, file$6, 59, 18, 2792);
    			attr_dev(i8, "class", "bi bi-linkedin");
    			add_location(i8, file$6, 60, 70, 2958);
    			attr_dev(a9, "href", "https://www.linkedin.com/in/leon-santoso/");
    			add_location(a9, file$6, 60, 18, 2906);
    			attr_dev(div11, "class", "social");
    			add_location(div11, file$6, 57, 16, 2647);
    			attr_dev(div12, "class", "member-info-content");
    			add_location(div12, file$6, 54, 14, 2500);
    			attr_dev(div13, "class", "member-info");
    			add_location(div13, file$6, 53, 12, 2459);
    			attr_dev(div14, "class", "member");
    			add_location(div14, file$6, 51, 10, 2351);
    			attr_dev(div15, "class", "col-lg-3 col-md-6");
    			attr_dev(div15, "data-aos", "zoom-out");
    			attr_dev(div15, "data-aos-delay", "300");
    			add_location(div15, file$6, 50, 8, 2267);
    			if (!src_url_equal(img3.src, img3_src_value = "assets/img/team-4.jpg")) attr_dev(img3, "src", img3_src_value);
    			attr_dev(img3, "class", "img-fluid");
    			attr_dev(img3, "alt", "");
    			add_location(img3, file$6, 69, 12, 3233);
    			add_location(h43, file$6, 72, 16, 3399);
    			add_location(br3, file$6, 73, 26, 3448);
    			add_location(span3, file$6, 73, 16, 3438);
    			attr_dev(i9, "class", "bi bi-instagram");
    			add_location(i9, file$6, 75, 70, 3581);
    			attr_dev(a10, "href", "https://www.instagram.com/sendywee/?hl=en");
    			add_location(a10, file$6, 75, 18, 3529);
    			attr_dev(i10, "class", "bi bi-linkedin");
    			add_location(i10, file$6, 76, 78, 3708);
    			attr_dev(a11, "href", "https://id.linkedin.com/in/sendy-winata-941265168");
    			add_location(a11, file$6, 76, 18, 3648);
    			attr_dev(div16, "class", "social");
    			add_location(div16, file$6, 74, 16, 3489);
    			attr_dev(div17, "class", "member-info-content");
    			add_location(div17, file$6, 71, 14, 3348);
    			attr_dev(div18, "class", "member-info");
    			add_location(div18, file$6, 70, 12, 3307);
    			attr_dev(div19, "class", "member");
    			add_location(div19, file$6, 68, 10, 3199);
    			attr_dev(div20, "class", "col-lg-3 col-md-6");
    			attr_dev(div20, "data-aos", "zoom-out");
    			attr_dev(div20, "data-aos-delay", "400");
    			add_location(div20, file$6, 67, 8, 3115);
    			attr_dev(div21, "class", "row");
    			add_location(div21, file$6, 15, 6, 490);
    			attr_dev(div22, "class", "container");
    			attr_dev(div22, "data-aos", "fade-up");
    			add_location(div22, file$6, 9, 4, 191);
    			attr_dev(section, "id", "team");
    			add_location(section, file$6, 8, 1, 166);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, div22);
    			append_dev(div22, div0);
    			append_dev(div0, h3);
    			append_dev(div0, t1);
    			append_dev(div0, p);
    			append_dev(p, t2);
    			append_dev(p, a0);
    			append_dev(div22, t4);
    			append_dev(div22, div21);
    			append_dev(div21, div5);
    			append_dev(div5, div4);
    			append_dev(div4, img0);
    			append_dev(div4, t5);
    			append_dev(div4, div3);
    			append_dev(div3, div2);
    			append_dev(div2, h40);
    			append_dev(div2, t7);
    			append_dev(div2, span0);
    			append_dev(span0, t8);
    			append_dev(span0, br0);
    			append_dev(span0, t9);
    			append_dev(div2, t10);
    			append_dev(div2, div1);
    			append_dev(div1, a1);
    			append_dev(a1, i0);
    			mount_component(twitter0, i0, null);
    			append_dev(div1, t11);
    			append_dev(div1, a2);
    			append_dev(a2, i1);
    			mount_component(journalalbum, i1, null);
    			append_dev(div1, t12);
    			append_dev(div1, a3);
    			append_dev(a3, i2);
    			mount_component(instagram0, i2, null);
    			append_dev(div1, t13);
    			append_dev(div1, a4);
    			append_dev(a4, i3);
    			mount_component(linkedin0, i3, null);
    			append_dev(div21, t14);
    			append_dev(div21, div10);
    			append_dev(div10, div9);
    			append_dev(div9, img1);
    			append_dev(div9, t15);
    			append_dev(div9, div8);
    			append_dev(div8, div7);
    			append_dev(div7, h41);
    			append_dev(div7, t17);
    			append_dev(div7, span1);
    			append_dev(span1, t18);
    			append_dev(span1, br1);
    			append_dev(span1, t19);
    			append_dev(div7, t20);
    			append_dev(div7, div6);
    			append_dev(div6, a5);
    			append_dev(a5, i4);
    			mount_component(instagram1, i4, null);
    			append_dev(div6, t21);
    			append_dev(div6, a6);
    			append_dev(a6, i5);
    			mount_component(linkedin1, i5, null);
    			append_dev(div21, t22);
    			append_dev(div21, div15);
    			append_dev(div15, div14);
    			append_dev(div14, img2);
    			append_dev(div14, t23);
    			append_dev(div14, div13);
    			append_dev(div13, div12);
    			append_dev(div12, h42);
    			append_dev(div12, t25);
    			append_dev(div12, span2);
    			append_dev(span2, t26);
    			append_dev(span2, br2);
    			append_dev(span2, t27);
    			append_dev(div12, t28);
    			append_dev(div12, div11);
    			append_dev(div11, a7);
    			append_dev(a7, i6);
    			mount_component(twitter1, i6, null);
    			append_dev(div11, t29);
    			append_dev(div11, a8);
    			append_dev(a8, i7);
    			mount_component(facebook, i7, null);
    			append_dev(div11, t30);
    			append_dev(div11, a9);
    			append_dev(a9, i8);
    			mount_component(linkedin2, i8, null);
    			append_dev(div21, t31);
    			append_dev(div21, div20);
    			append_dev(div20, div19);
    			append_dev(div19, img3);
    			append_dev(div19, t32);
    			append_dev(div19, div18);
    			append_dev(div18, div17);
    			append_dev(div17, h43);
    			append_dev(div17, t34);
    			append_dev(div17, span3);
    			append_dev(span3, t35);
    			append_dev(span3, br3);
    			append_dev(span3, t36);
    			append_dev(div17, t37);
    			append_dev(div17, div16);
    			append_dev(div16, a10);
    			append_dev(a10, i9);
    			mount_component(instagram2, i9, null);
    			append_dev(div16, t38);
    			append_dev(div16, a11);
    			append_dev(a11, i10);
    			mount_component(linkedin3, i10, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(twitter0.$$.fragment, local);
    			transition_in(journalalbum.$$.fragment, local);
    			transition_in(instagram0.$$.fragment, local);
    			transition_in(linkedin0.$$.fragment, local);
    			transition_in(instagram1.$$.fragment, local);
    			transition_in(linkedin1.$$.fragment, local);
    			transition_in(twitter1.$$.fragment, local);
    			transition_in(facebook.$$.fragment, local);
    			transition_in(linkedin2.$$.fragment, local);
    			transition_in(instagram2.$$.fragment, local);
    			transition_in(linkedin3.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(twitter0.$$.fragment, local);
    			transition_out(journalalbum.$$.fragment, local);
    			transition_out(instagram0.$$.fragment, local);
    			transition_out(linkedin0.$$.fragment, local);
    			transition_out(instagram1.$$.fragment, local);
    			transition_out(linkedin1.$$.fragment, local);
    			transition_out(twitter1.$$.fragment, local);
    			transition_out(facebook.$$.fragment, local);
    			transition_out(linkedin2.$$.fragment, local);
    			transition_out(instagram2.$$.fragment, local);
    			transition_out(linkedin3.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			destroy_component(twitter0);
    			destroy_component(journalalbum);
    			destroy_component(instagram0);
    			destroy_component(linkedin0);
    			destroy_component(instagram1);
    			destroy_component(linkedin1);
    			destroy_component(twitter1);
    			destroy_component(facebook);
    			destroy_component(linkedin2);
    			destroy_component(instagram2);
    			destroy_component(linkedin3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Team', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Team> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Facebook: Facebook$1,
    		Instagram: Instagram$1,
    		JournalAlbum: JournalAlbum$1,
    		Linkedin: Linkedin$1,
    		Twitter: Twitter$1
    	});

    	return [];
    }

    class Team extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Team",
    			options,
    			id: create_fragment$8.name
    		});
    	}
    }

    /* src\pages\Home.svelte generated by Svelte v3.48.0 */
    const file$5 = "src\\pages\\Home.svelte";

    function create_fragment$7(ctx) {
    	let main;
    	let hero;
    	let t0;
    	let about;
    	let t1;
    	let service;
    	let t2;
    	let team;
    	let t3;
    	let client;
    	let t4;
    	let contact;
    	let current;
    	hero = new Hero({ $$inline: true });
    	about = new About({ $$inline: true });
    	service = new Service({ $$inline: true });

    	team = new Team({
    			props: { restoreScrollState: true },
    			$$inline: true
    		});

    	client = new Client({ $$inline: true });
    	contact = new Contact({ $$inline: true });

    	const block = {
    		c: function create() {
    			main = element("main");
    			create_component(hero.$$.fragment);
    			t0 = space();
    			create_component(about.$$.fragment);
    			t1 = space();
    			create_component(service.$$.fragment);
    			t2 = space();
    			create_component(team.$$.fragment);
    			t3 = space();
    			create_component(client.$$.fragment);
    			t4 = space();
    			create_component(contact.$$.fragment);
    			add_location(main, file$5, 12, 0, 268);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			mount_component(hero, main, null);
    			append_dev(main, t0);
    			mount_component(about, main, null);
    			append_dev(main, t1);
    			mount_component(service, main, null);
    			append_dev(main, t2);
    			mount_component(team, main, null);
    			append_dev(main, t3);
    			mount_component(client, main, null);
    			append_dev(main, t4);
    			mount_component(contact, main, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(hero.$$.fragment, local);
    			transition_in(about.$$.fragment, local);
    			transition_in(service.$$.fragment, local);
    			transition_in(team.$$.fragment, local);
    			transition_in(client.$$.fragment, local);
    			transition_in(contact.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(hero.$$.fragment, local);
    			transition_out(about.$$.fragment, local);
    			transition_out(service.$$.fragment, local);
    			transition_out(team.$$.fragment, local);
    			transition_out(client.$$.fragment, local);
    			transition_out(contact.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(hero);
    			destroy_component(about);
    			destroy_component(service);
    			destroy_component(team);
    			destroy_component(client);
    			destroy_component(contact);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Home', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Home> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Hero,
    		About,
    		Client,
    		Contact,
    		Service,
    		Team
    	});

    	return [];
    }

    class Home extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Home",
    			options,
    			id: create_fragment$7.name
    		});
    	}
    }

    /* src\component\Course.svelte generated by Svelte v3.48.0 */
    const file$4 = "src\\component\\Course.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[0] = list[i];
    	child_ctx[2] = i;
    	return child_ctx;
    }

    // (27:26) {#if corse.tutor.tutor1.name != ''}
    function create_if_block_2$1(ctx) {
    	let a;
    	let t_value = /*corse*/ ctx[0].tutor.tutor1.name + "";
    	let t;

    	const block = {
    		c: function create() {
    			a = element("a");
    			t = text$1(t_value);
    			attr_dev(a, "href", "/#/detailcoursetutor1/" + /*i*/ ctx[2]);
    			add_location(a, file$4, 27, 26, 1549);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			append_dev(a, t);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$1.name,
    		type: "if",
    		source: "(27:26) {#if corse.tutor.tutor1.name != ''}",
    		ctx
    	});

    	return block;
    }

    // (30:26) {#if corse.tutor.tutor2.name != ''}
    function create_if_block_1$1(ctx) {
    	let t0;
    	let a;
    	let t1_value = /*corse*/ ctx[0].tutor.tutor2.name + "";
    	let t1;

    	const block = {
    		c: function create() {
    			t0 = text$1(", ");
    			a = element("a");
    			t1 = text$1(t1_value);
    			attr_dev(a, "href", "/#/detailcoursetutor2/" + /*i*/ ctx[2]);
    			add_location(a, file$4, 30, 30, 1743);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, a, anchor);
    			append_dev(a, t1);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(a);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(30:26) {#if corse.tutor.tutor2.name != ''}",
    		ctx
    	});

    	return block;
    }

    // (33:26) {#if corse.tutor.tutor3.name != ''}
    function create_if_block$1(ctx) {
    	let t0;
    	let a;
    	let t1_value = /*corse*/ ctx[0].tutor.tutor3.name + "";
    	let t1;

    	const block = {
    		c: function create() {
    			t0 = text$1(", ");
    			a = element("a");
    			t1 = text$1(t1_value);
    			attr_dev(a, "href", "/#/detailcoursetutor3/" + /*i*/ ctx[2]);
    			add_location(a, file$4, 33, 30, 1937);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, a, anchor);
    			append_dev(a, t1);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(a);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(33:26) {#if corse.tutor.tutor3.name != ''}",
    		ctx
    	});

    	return block;
    }

    // (10:12) {#each course as corse, i}
    function create_each_block$1(ctx) {
    	let div5;
    	let div4;
    	let img0;
    	let img0_src_value;
    	let t0;
    	let div3;
    	let div0;
    	let h4;
    	let t1_value = /*corse*/ ctx[0].subTitle + "";
    	let t1;
    	let t2;
    	let p0;
    	let i_1;
    	let starfill;
    	let t3;
    	let t4_value = /*corse*/ ctx[0].rating + "";
    	let t4;
    	let t5;
    	let h3;
    	let t6_value = /*corse*/ ctx[0].title + "";
    	let t6;
    	let t7;
    	let p1;
    	let t8_value = /*corse*/ ctx[0].desc + "";
    	let t8;
    	let t9;
    	let div2;
    	let div1;
    	let img1;
    	let img1_src_value;
    	let t10;
    	let img2;
    	let img2_src_value;
    	let t11;
    	let img3;
    	let img3_src_value;
    	let t12;
    	let span;
    	let t13;
    	let t14;
    	let current;
    	starfill = new StarFill$1({ $$inline: true });
    	let if_block0 = /*corse*/ ctx[0].tutor.tutor1.name != '' && create_if_block_2$1(ctx);
    	let if_block1 = /*corse*/ ctx[0].tutor.tutor2.name != '' && create_if_block_1$1(ctx);
    	let if_block2 = /*corse*/ ctx[0].tutor.tutor3.name != '' && create_if_block$1(ctx);

    	const block = {
    		c: function create() {
    			div5 = element("div");
    			div4 = element("div");
    			img0 = element("img");
    			t0 = space();
    			div3 = element("div");
    			div0 = element("div");
    			h4 = element("h4");
    			t1 = text$1(t1_value);
    			t2 = space();
    			p0 = element("p");
    			i_1 = element("i");
    			create_component(starfill.$$.fragment);
    			t3 = space();
    			t4 = text$1(t4_value);
    			t5 = space();
    			h3 = element("h3");
    			t6 = text$1(t6_value);
    			t7 = space();
    			p1 = element("p");
    			t8 = text$1(t8_value);
    			t9 = space();
    			div2 = element("div");
    			div1 = element("div");
    			img1 = element("img");
    			t10 = space();
    			img2 = element("img");
    			t11 = space();
    			img3 = element("img");
    			t12 = space();
    			span = element("span");
    			if (if_block0) if_block0.c();
    			t13 = space();
    			if (if_block1) if_block1.c();
    			t14 = space();
    			if (if_block2) if_block2.c();
    			if (!src_url_equal(img0.src, img0_src_value = /*corse*/ ctx[0].img)) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "class", "img-fluid");
    			attr_dev(img0, "alt", "img-course");
    			add_location(img0, file$4, 12, 18, 438);
    			add_location(h4, file$4, 15, 22, 656);
    			attr_dev(i_1, "class", "bi bi-star-fill");
    			add_location(i_1, file$4, 16, 40, 723);
    			attr_dev(p0, "class", "rating");
    			add_location(p0, file$4, 16, 22, 705);
    			attr_dev(div0, "class", "d-flex justify-content-between align-items-center mb-3");
    			add_location(div0, file$4, 14, 20, 564);
    			add_location(h3, file$4, 18, 20, 834);
    			attr_dev(p1, "class", "course-description");
    			add_location(p1, file$4, 19, 20, 914);
    			if (!src_url_equal(img1.src, img1_src_value = /*corse*/ ctx[0].tutor.tutor1.photo)) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "class", "img1 img-fluid");
    			attr_dev(img1, "alt", "");
    			add_location(img1, file$4, 22, 24, 1158);
    			if (!src_url_equal(img2.src, img2_src_value = /*corse*/ ctx[0].tutor.tutor2.photo)) attr_dev(img2, "src", img2_src_value);
    			attr_dev(img2, "class", "img2 img-fluid");
    			attr_dev(img2, "alt", "");
    			add_location(img2, file$4, 23, 24, 1250);
    			if (!src_url_equal(img3.src, img3_src_value = /*corse*/ ctx[0].tutor.tutor3.photo)) attr_dev(img3, "src", img3_src_value);
    			attr_dev(img3, "class", "img3 img-fluid");
    			attr_dev(img3, "alt", "");
    			add_location(img3, file$4, 24, 24, 1342);
    			attr_dev(span, "class", "tritutors");
    			add_location(span, file$4, 25, 24, 1434);
    			attr_dev(div1, "class", "trainer-profile d-flex align-items-center");
    			add_location(div1, file$4, 21, 22, 1077);
    			attr_dev(div2, "class", "trainer d-flex justify-content-between align-items-center");
    			add_location(div2, file$4, 20, 20, 982);
    			attr_dev(div3, "class", "course-content");
    			add_location(div3, file$4, 13, 18, 514);
    			attr_dev(div4, "class", "course-item");
    			add_location(div4, file$4, 11, 16, 393);
    			attr_dev(div5, "class", "col-lg-4 col-md-6 d-flex align-items-stretch");
    			attr_dev(div5, "data-aos", "zoom-in");
    			attr_dev(div5, "data-aos-delay", "100");
    			add_location(div5, file$4, 10, 12, 277);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div5, anchor);
    			append_dev(div5, div4);
    			append_dev(div4, img0);
    			append_dev(div4, t0);
    			append_dev(div4, div3);
    			append_dev(div3, div0);
    			append_dev(div0, h4);
    			append_dev(h4, t1);
    			append_dev(div0, t2);
    			append_dev(div0, p0);
    			append_dev(p0, i_1);
    			mount_component(starfill, i_1, null);
    			append_dev(p0, t3);
    			append_dev(p0, t4);
    			append_dev(div3, t5);
    			append_dev(div3, h3);
    			append_dev(h3, t6);
    			append_dev(div3, t7);
    			append_dev(div3, p1);
    			append_dev(p1, t8);
    			append_dev(div3, t9);
    			append_dev(div3, div2);
    			append_dev(div2, div1);
    			append_dev(div1, img1);
    			append_dev(div1, t10);
    			append_dev(div1, img2);
    			append_dev(div1, t11);
    			append_dev(div1, img3);
    			append_dev(div1, t12);
    			append_dev(div1, span);
    			if (if_block0) if_block0.m(span, null);
    			append_dev(span, t13);
    			if (if_block1) if_block1.m(span, null);
    			append_dev(span, t14);
    			if (if_block2) if_block2.m(span, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (/*corse*/ ctx[0].tutor.tutor1.name != '') if_block0.p(ctx, dirty);
    			if (/*corse*/ ctx[0].tutor.tutor2.name != '') if_block1.p(ctx, dirty);
    			if (/*corse*/ ctx[0].tutor.tutor3.name != '') if_block2.p(ctx, dirty);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(starfill.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(starfill.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div5);
    			destroy_component(starfill);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			if (if_block2) if_block2.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(10:12) {#each course as corse, i}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	let section;
    	let div3;
    	let div2;
    	let t0;
    	let div1;
    	let div0;
    	let a;
    	let current;
    	let each_value = Course$1;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			section = element("section");
    			div3 = element("div");
    			div2 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t0 = space();
    			div1 = element("div");
    			div0 = element("div");
    			a = element("a");
    			a.textContent = "See our Full Curriclum Guide";
    			attr_dev(a, "href", "https://bit.ly/3KFAKd0");
    			attr_dev(a, "class", "btn-outline-primary rounded-pill px-5 py-1 border-bottom border-top border-end border-start border-primary");
    			add_location(a, file$4, 49, 14, 2600);
    			attr_dev(div0, "class", "button");
    			add_location(div0, file$4, 48, 12, 2564);
    			attr_dev(div1, "class", "row");
    			add_location(div1, file$4, 47, 8, 2533);
    			attr_dev(div2, "class", "row");
    			add_location(div2, file$4, 8, 8, 206);
    			attr_dev(div3, "class", "container");
    			attr_dev(div3, "data-aos", "fade-up");
    			add_location(div3, file$4, 7, 4, 154);
    			attr_dev(section, "id", "courses");
    			attr_dev(section, "class", "courses");
    			add_location(section, file$4, 6, 0, 110);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, div3);
    			append_dev(div3, div2);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div2, null);
    			}

    			append_dev(div2, t0);
    			append_dev(div2, div1);
    			append_dev(div1, div0);
    			append_dev(div0, a);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*course*/ 0) {
    				each_value = Course$1;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div2, t0);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Course', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Course> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ StarFill: StarFill$1, course: Course$1 });
    	return [];
    }

    class Course extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Course",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    /* src\pages\OurCourse.svelte generated by Svelte v3.48.0 */

    function create_fragment$5(ctx) {
    	let breadcrum;
    	let t;
    	let course;
    	let current;

    	breadcrum = new BreadCrum({
    			props: { name: 'Courses', subName: 'Our Courses' },
    			$$inline: true
    		});

    	course = new Course({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(breadcrum.$$.fragment);
    			t = space();
    			create_component(course.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(breadcrum, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(course, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(breadcrum.$$.fragment, local);
    			transition_in(course.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(breadcrum.$$.fragment, local);
    			transition_out(course.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(breadcrum, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(course, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('OurCourse', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<OurCourse> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ BreadCrum, Course });
    	return [];
    }

    class OurCourse extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "OurCourse",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    /* src\component\Tutor.svelte generated by Svelte v3.48.0 */
    const file$3 = "src\\component\\Tutor.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[0] = list[i];
    	child_ctx[2] = i;
    	return child_ctx;
    }

    // (22:43) {#if tutor.media.ig != null}
    function create_if_block_4(ctx) {
    	let i;
    	let instagram;
    	let current;
    	instagram = new Instagram$1({ $$inline: true });

    	const block = {
    		c: function create() {
    			i = element("i");
    			create_component(instagram.$$.fragment);
    			attr_dev(i, "class", "bi bi-instagram");
    			add_location(i, file$3, 21, 71, 857);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, i, anchor);
    			mount_component(instagram, i, null);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(instagram.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(instagram.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(i);
    			destroy_component(instagram);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4.name,
    		type: "if",
    		source: "(22:43) {#if tutor.media.ig != null}",
    		ctx
    	});

    	return block;
    }

    // (23:47) {#if tutor.media.linked != null}
    function create_if_block_3(ctx) {
    	let i;
    	let linkedin;
    	let current;
    	linkedin = new Linkedin$1({ $$inline: true });

    	const block = {
    		c: function create() {
    			i = element("i");
    			create_component(linkedin.$$.fragment);
    			attr_dev(i, "class", "bi bi-linkedin");
    			add_location(i, file$3, 22, 79, 990);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, i, anchor);
    			mount_component(linkedin, i, null);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(linkedin.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(linkedin.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(i);
    			destroy_component(linkedin);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(23:47) {#if tutor.media.linked != null}",
    		ctx
    	});

    	return block;
    }

    // (24:43) {#if tutor.media.fb != null}
    function create_if_block_2(ctx) {
    	let i;
    	let facebook;
    	let current;
    	facebook = new Facebook$1({ $$inline: true });

    	const block = {
    		c: function create() {
    			i = element("i");
    			create_component(facebook.$$.fragment);
    			attr_dev(i, "class", "bi bi-facebook");
    			add_location(i, file$3, 23, 71, 1113);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, i, anchor);
    			mount_component(facebook, i, null);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(facebook.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(facebook.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(i);
    			destroy_component(facebook);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(24:43) {#if tutor.media.fb != null}",
    		ctx
    	});

    	return block;
    }

    // (25:43) {#if tutor.media.tw != null}
    function create_if_block_1(ctx) {
    	let i;
    	let twitter;
    	let current;
    	twitter = new Twitter$1({ $$inline: true });

    	const block = {
    		c: function create() {
    			i = element("i");
    			create_component(twitter.$$.fragment);
    			attr_dev(i, "class", "bi bi-twitter");
    			add_location(i, file$3, 24, 71, 1236);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, i, anchor);
    			mount_component(twitter, i, null);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(twitter.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(twitter.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(i);
    			destroy_component(twitter);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(25:43) {#if tutor.media.tw != null}",
    		ctx
    	});

    	return block;
    }

    // (26:49) {#if tutor.media.research != null}
    function create_if_block(ctx) {
    	let i;
    	let journalalbum;
    	let current;
    	journalalbum = new JournalAlbum$1({ $$inline: true });

    	const block = {
    		c: function create() {
    			i = element("i");
    			create_component(journalalbum.$$.fragment);
    			attr_dev(i, "class", "bi bi-journal-album");
    			add_location(i, file$3, 25, 83, 1369);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, i, anchor);
    			mount_component(journalalbum, i, null);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(journalalbum.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(journalalbum.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(i);
    			destroy_component(journalalbum);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(26:49) {#if tutor.media.research != null}",
    		ctx
    	});

    	return block;
    }

    // (11:6) {#each tutors as tutor, i}
    function create_each_block(ctx) {
    	let div3;
    	let div2;
    	let img;
    	let img_src_value;
    	let t0;
    	let div1;
    	let h4;
    	let a0;
    	let t1_value = /*tutor*/ ctx[0].name + "";
    	let t1;
    	let t2;
    	let span;
    	let t3_value = /*tutor*/ ctx[0].desc + "";
    	let t3;
    	let t4;
    	let p;
    	let t5_value = /*tutor*/ ctx[0].experience + "";
    	let t5;
    	let t6;
    	let div0;
    	let a1;
    	let t7;
    	let a2;
    	let t8;
    	let a3;
    	let t9;
    	let a4;
    	let t10;
    	let a5;
    	let t11;
    	let current;
    	let if_block0 = /*tutor*/ ctx[0].media.ig != null && create_if_block_4(ctx);
    	let if_block1 = /*tutor*/ ctx[0].media.linked != null && create_if_block_3(ctx);
    	let if_block2 = /*tutor*/ ctx[0].media.fb != null && create_if_block_2(ctx);
    	let if_block3 = /*tutor*/ ctx[0].media.tw != null && create_if_block_1(ctx);
    	let if_block4 = /*tutor*/ ctx[0].media.research != null && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			div2 = element("div");
    			img = element("img");
    			t0 = space();
    			div1 = element("div");
    			h4 = element("h4");
    			a0 = element("a");
    			t1 = text$1(t1_value);
    			t2 = space();
    			span = element("span");
    			t3 = text$1(t3_value);
    			t4 = space();
    			p = element("p");
    			t5 = text$1(t5_value);
    			t6 = space();
    			div0 = element("div");
    			a1 = element("a");
    			if (if_block0) if_block0.c();
    			t7 = space();
    			a2 = element("a");
    			if (if_block1) if_block1.c();
    			t8 = space();
    			a3 = element("a");
    			if (if_block2) if_block2.c();
    			t9 = space();
    			a4 = element("a");
    			if (if_block3) if_block3.c();
    			t10 = space();
    			a5 = element("a");
    			if (if_block4) if_block4.c();
    			t11 = space();
    			if (!src_url_equal(img.src, img_src_value = /*tutor*/ ctx[0].img)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "img-tutor");
    			attr_dev(img, "class", "img-fluid");
    			add_location(img, file$3, 13, 12, 451);
    			attr_dev(a0, "href", "/#/detailtutor/" + /*i*/ ctx[2]);
    			add_location(a0, file$3, 15, 20, 572);
    			add_location(h4, file$3, 15, 16, 568);
    			add_location(span, file$3, 16, 16, 640);
    			add_location(p, file$3, 17, 16, 683);
    			attr_dev(a1, "href", /*tutor*/ ctx[0].media.ig);
    			add_location(a1, file$3, 21, 18, 804);
    			attr_dev(a2, "href", /*tutor*/ ctx[0].media.linked);
    			add_location(a2, file$3, 22, 18, 929);
    			attr_dev(a3, "href", /*tutor*/ ctx[0].media.fb);
    			add_location(a3, file$3, 23, 18, 1060);
    			attr_dev(a4, "href", /*tutor*/ ctx[0].media.tw);
    			add_location(a4, file$3, 24, 18, 1183);
    			attr_dev(a5, "href", /*tutor*/ ctx[0].media.research);
    			add_location(a5, file$3, 25, 18, 1304);
    			attr_dev(div0, "class", "social");
    			add_location(div0, file$3, 20, 16, 764);
    			attr_dev(div1, "class", "member-content");
    			add_location(div1, file$3, 14, 14, 522);
    			attr_dev(div2, "class", "member");
    			add_location(div2, file$3, 12, 8, 415);
    			attr_dev(div3, "class", "col-lg-4 col-md-6 d-flex align-items-stretch flex-wrap");
    			attr_dev(div3, "data-aos", "fade-up");
    			attr_dev(div3, "data-aos-delay", "100");
    			add_location(div3, file$3, 11, 6, 297);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div2);
    			append_dev(div2, img);
    			append_dev(div2, t0);
    			append_dev(div2, div1);
    			append_dev(div1, h4);
    			append_dev(h4, a0);
    			append_dev(a0, t1);
    			append_dev(div1, t2);
    			append_dev(div1, span);
    			append_dev(span, t3);
    			append_dev(div1, t4);
    			append_dev(div1, p);
    			append_dev(p, t5);
    			append_dev(div1, t6);
    			append_dev(div1, div0);
    			append_dev(div0, a1);
    			if (if_block0) if_block0.m(a1, null);
    			append_dev(div0, t7);
    			append_dev(div0, a2);
    			if (if_block1) if_block1.m(a2, null);
    			append_dev(div0, t8);
    			append_dev(div0, a3);
    			if (if_block2) if_block2.m(a3, null);
    			append_dev(div0, t9);
    			append_dev(div0, a4);
    			if (if_block3) if_block3.m(a4, null);
    			append_dev(div0, t10);
    			append_dev(div0, a5);
    			if (if_block4) if_block4.m(a5, null);
    			append_dev(div3, t11);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			transition_in(if_block1);
    			transition_in(if_block2);
    			transition_in(if_block3);
    			transition_in(if_block4);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			transition_out(if_block1);
    			transition_out(if_block2);
    			transition_out(if_block3);
    			transition_out(if_block4);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			if (if_block2) if_block2.d();
    			if (if_block3) if_block3.d();
    			if (if_block4) if_block4.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(11:6) {#each tutors as tutor, i}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let section;
    	let div1;
    	let div0;
    	let current;
    	let each_value = Tutors;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			section = element("section");
    			div1 = element("div");
    			div0 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div0, "class", "row my-3");
    			add_location(div0, file$3, 9, 4, 233);
    			attr_dev(div1, "class", "container");
    			add_location(div1, file$3, 8, 2, 204);
    			attr_dev(section, "id", "tutors");
    			attr_dev(section, "class", "tutors my-5");
    			add_location(section, file$3, 7, 0, 159);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, div1);
    			append_dev(div1, div0);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div0, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*tutors*/ 0) {
    				each_value = Tutors;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div0, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Tutor', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Tutor> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Instagram: Instagram$1,
    		Linkedin: Linkedin$1,
    		Facebook: Facebook$1,
    		Twitter: Twitter$1,
    		JournalAlbum: JournalAlbum$1,
    		tutors: Tutors
    	});

    	return [];
    }

    class Tutor extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Tutor",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src\pages\OurTutor.svelte generated by Svelte v3.48.0 */

    function create_fragment$3(ctx) {
    	let breadcrum;
    	let t;
    	let tutor;
    	let current;

    	breadcrum = new BreadCrum({
    			props: {
    				name: `TORCHE's Tutors`,
    				subName: 'Tutors'
    			},
    			$$inline: true
    		});

    	tutor = new Tutor({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(breadcrum.$$.fragment);
    			t = space();
    			create_component(tutor.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(breadcrum, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(tutor, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(breadcrum.$$.fragment, local);
    			transition_in(tutor.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(breadcrum.$$.fragment, local);
    			transition_out(tutor.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(breadcrum, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(tutor, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('OurTutor', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<OurTutor> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ BreadCrum, Tutor });
    	return [];
    }

    class OurTutor extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "OurTutor",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src\pages\Price.svelte generated by Svelte v3.48.0 */
    const file$2 = "src\\pages\\Price.svelte";

    function create_fragment$2(ctx) {
    	let breadcrum;
    	let t0;
    	let section;
    	let div10;
    	let div9;
    	let div2;
    	let div1;
    	let h30;
    	let t2;
    	let h40;
    	let t3;
    	let span0;
    	let t5;
    	let ul0;
    	let li0;
    	let t7;
    	let li1;
    	let t9;
    	let li2;
    	let t11;
    	let li3;
    	let t13;
    	let li4;
    	let t15;
    	let li5;
    	let t17;
    	let div0;
    	let t18;
    	let div5;
    	let div4;
    	let span1;
    	let t20;
    	let h31;
    	let t22;
    	let h41;
    	let t23;
    	let span2;
    	let t25;
    	let ul1;
    	let li6;
    	let t27;
    	let li7;
    	let t29;
    	let li8;
    	let t31;
    	let li9;
    	let t33;
    	let li10;
    	let t35;
    	let li11;
    	let t36;
    	let sup0;
    	let t38;
    	let sup1;
    	let t40;
    	let t41;
    	let div3;
    	let t42;
    	let div8;
    	let div7;
    	let h32;
    	let t44;
    	let h42;
    	let t46;
    	let ul2;
    	let li12;
    	let t48;
    	let li13;
    	let t50;
    	let li14;
    	let t52;
    	let li15;
    	let t53;
    	let li16;
    	let t54;
    	let li17;
    	let t55;
    	let li18;
    	let t56;
    	let li19;
    	let t58;
    	let li20;
    	let a;
    	let t60;
    	let div6;
    	let current;

    	breadcrum = new BreadCrum({
    			props: {
    				name: "Pricing",
    				subName: "Class Registration"
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(breadcrum.$$.fragment);
    			t0 = space();
    			section = element("section");
    			div10 = element("div");
    			div9 = element("div");
    			div2 = element("div");
    			div1 = element("div");
    			h30 = element("h3");
    			h30.textContent = "Private Class";
    			t2 = space();
    			h40 = element("h4");
    			t3 = text$1("Rp.175.000,-");
    			span0 = element("span");
    			span0.textContent = "/session";
    			t5 = space();
    			ul0 = element("ul");
    			li0 = element("li");
    			li0.textContent = "Max. 3 Person";
    			t7 = space();
    			li1 = element("li");
    			li1.textContent = "2-hour class";
    			t9 = space();
    			li2 = element("li");
    			li2.textContent = "Fully online";
    			t11 = space();
    			li3 = element("li");
    			li3.textContent = "Free module + recording access";
    			t13 = space();
    			li4 = element("li");
    			li4.textContent = "7-days after class consultation at Discord";
    			t15 = space();
    			li5 = element("li");
    			li5.textContent = "Special Discount";
    			t17 = space();
    			div0 = element("div");
    			t18 = space();
    			div5 = element("div");
    			div4 = element("div");
    			span1 = element("span");
    			span1.textContent = "Favourite";
    			t20 = space();
    			h31 = element("h3");
    			h31.textContent = "Group Class";
    			t22 = space();
    			h41 = element("h4");
    			t23 = text$1("Rp.50.000,-");
    			span2 = element("span");
    			span2.textContent = "/person/session";
    			t25 = space();
    			ul1 = element("ul");
    			li6 = element("li");
    			li6.textContent = "4-10 Person";
    			t27 = space();
    			li7 = element("li");
    			li7.textContent = "2-hour class";
    			t29 = space();
    			li8 = element("li");
    			li8.textContent = "Fully online";
    			t31 = space();
    			li9 = element("li");
    			li9.textContent = "Free module + recording access";
    			t33 = space();
    			li10 = element("li");
    			li10.textContent = "7-days after class consultation at Discord";
    			t35 = space();
    			li11 = element("li");
    			t36 = text$1("20% discount for the 6");
    			sup0 = element("sup");
    			sup0.textContent = "th";
    			t38 = text$1(" to 10");
    			sup1 = element("sup");
    			sup1.textContent = "th";
    			t40 = text$1(" person");
    			t41 = space();
    			div3 = element("div");
    			t42 = space();
    			div8 = element("div");
    			div7 = element("div");
    			h32 = element("h3");
    			h32.textContent = "Big Class";
    			t44 = space();
    			h42 = element("h4");
    			h42.textContent = "Special Price";
    			t46 = space();
    			ul2 = element("ul");
    			li12 = element("li");
    			li12.textContent = "More than 10 person";
    			t48 = space();
    			li13 = element("li");
    			li13.textContent = "Fully online";
    			t50 = space();
    			li14 = element("li");
    			li14.textContent = "Special Discount";
    			t52 = space();
    			li15 = element("li");
    			t53 = space();
    			li16 = element("li");
    			t54 = space();
    			li17 = element("li");
    			t55 = space();
    			li18 = element("li");
    			t56 = space();
    			li19 = element("li");
    			li19.textContent = "Please contact our customer support for price details";
    			t58 = space();
    			li20 = element("li");
    			a = element("a");
    			a.textContent = "Contact Us";
    			t60 = space();
    			div6 = element("div");
    			add_location(h30, file$2, 14, 12, 367);
    			add_location(span0, file$2, 15, 28, 419);
    			add_location(h40, file$2, 15, 12, 403);
    			add_location(li0, file$2, 17, 14, 479);
    			add_location(li1, file$2, 18, 14, 517);
    			add_location(li2, file$2, 19, 14, 554);
    			add_location(li3, file$2, 20, 14, 591);
    			add_location(li4, file$2, 21, 14, 646);
    			attr_dev(li5, "class", "na");
    			add_location(li5, file$2, 22, 14, 713);
    			add_location(ul0, file$2, 16, 12, 459);
    			attr_dev(div0, "class", "btn-wrap");
    			add_location(div0, file$2, 24, 12, 782);
    			attr_dev(div1, "class", "box");
    			add_location(div1, file$2, 13, 10, 336);
    			attr_dev(div2, "class", "col-lg-4 col-md-6");
    			add_location(div2, file$2, 12, 8, 293);
    			attr_dev(span1, "class", "favourite");
    			add_location(span1, file$2, 30, 12, 964);
    			add_location(h31, file$2, 31, 12, 1018);
    			add_location(span2, file$2, 32, 27, 1067);
    			add_location(h41, file$2, 32, 12, 1052);
    			add_location(li6, file$2, 34, 14, 1134);
    			add_location(li7, file$2, 35, 14, 1170);
    			add_location(li8, file$2, 36, 14, 1207);
    			add_location(li9, file$2, 37, 14, 1244);
    			add_location(li10, file$2, 38, 14, 1299);
    			add_location(sup0, file$2, 39, 40, 1392);
    			add_location(sup1, file$2, 39, 59, 1411);
    			add_location(li11, file$2, 39, 14, 1366);
    			add_location(ul1, file$2, 33, 12, 1114);
    			attr_dev(div3, "class", "btn-wrap-sp");
    			add_location(div3, file$2, 41, 12, 1469);
    			attr_dev(div4, "class", "box featured");
    			add_location(div4, file$2, 29, 10, 924);
    			attr_dev(div5, "class", "col-lg-4 col-md-6 mt-4 mt-md-0");
    			add_location(div5, file$2, 28, 8, 868);
    			add_location(h32, file$2, 48, 12, 1647);
    			add_location(h42, file$2, 49, 12, 1679);
    			add_location(li12, file$2, 51, 14, 1735);
    			add_location(li13, file$2, 52, 14, 1779);
    			add_location(li14, file$2, 53, 14, 1816);
    			add_location(li15, file$2, 54, 14, 1857);
    			add_location(li16, file$2, 55, 14, 1883);
    			add_location(li17, file$2, 56, 14, 1909);
    			add_location(li18, file$2, 57, 14, 1935);
    			attr_dev(li19, "class", "contact");
    			add_location(li19, file$2, 58, 14, 1961);
    			attr_dev(a, "href", "https://wa.me/+6285155216117");
    			attr_dev(a, "class", "contactbtn");
    			add_location(a, file$2, 59, 18, 2059);
    			add_location(li20, file$2, 59, 14, 2055);
    			add_location(ul2, file$2, 50, 12, 1715);
    			attr_dev(div6, "class", "btn-wrap");
    			add_location(div6, file$2, 61, 12, 2165);
    			attr_dev(div7, "class", "box");
    			add_location(div7, file$2, 47, 10, 1616);
    			attr_dev(div8, "class", "col-lg-4 col-md-6 mt-4 mt-lg-0");
    			add_location(div8, file$2, 46, 8, 1560);
    			attr_dev(div9, "class", "row");
    			add_location(div9, file$2, 11, 6, 266);
    			attr_dev(div10, "class", "container");
    			attr_dev(div10, "data-aos", "fade-up");
    			add_location(div10, file$2, 10, 4, 216);
    			attr_dev(section, "id", "pricing");
    			attr_dev(section, "class", "pricing");
    			add_location(section, file$2, 9, 1, 172);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(breadcrum, target, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, section, anchor);
    			append_dev(section, div10);
    			append_dev(div10, div9);
    			append_dev(div9, div2);
    			append_dev(div2, div1);
    			append_dev(div1, h30);
    			append_dev(div1, t2);
    			append_dev(div1, h40);
    			append_dev(h40, t3);
    			append_dev(h40, span0);
    			append_dev(div1, t5);
    			append_dev(div1, ul0);
    			append_dev(ul0, li0);
    			append_dev(ul0, t7);
    			append_dev(ul0, li1);
    			append_dev(ul0, t9);
    			append_dev(ul0, li2);
    			append_dev(ul0, t11);
    			append_dev(ul0, li3);
    			append_dev(ul0, t13);
    			append_dev(ul0, li4);
    			append_dev(ul0, t15);
    			append_dev(ul0, li5);
    			append_dev(div1, t17);
    			append_dev(div1, div0);
    			append_dev(div9, t18);
    			append_dev(div9, div5);
    			append_dev(div5, div4);
    			append_dev(div4, span1);
    			append_dev(div4, t20);
    			append_dev(div4, h31);
    			append_dev(div4, t22);
    			append_dev(div4, h41);
    			append_dev(h41, t23);
    			append_dev(h41, span2);
    			append_dev(div4, t25);
    			append_dev(div4, ul1);
    			append_dev(ul1, li6);
    			append_dev(ul1, t27);
    			append_dev(ul1, li7);
    			append_dev(ul1, t29);
    			append_dev(ul1, li8);
    			append_dev(ul1, t31);
    			append_dev(ul1, li9);
    			append_dev(ul1, t33);
    			append_dev(ul1, li10);
    			append_dev(ul1, t35);
    			append_dev(ul1, li11);
    			append_dev(li11, t36);
    			append_dev(li11, sup0);
    			append_dev(li11, t38);
    			append_dev(li11, sup1);
    			append_dev(li11, t40);
    			append_dev(div4, t41);
    			append_dev(div4, div3);
    			append_dev(div9, t42);
    			append_dev(div9, div8);
    			append_dev(div8, div7);
    			append_dev(div7, h32);
    			append_dev(div7, t44);
    			append_dev(div7, h42);
    			append_dev(div7, t46);
    			append_dev(div7, ul2);
    			append_dev(ul2, li12);
    			append_dev(ul2, t48);
    			append_dev(ul2, li13);
    			append_dev(ul2, t50);
    			append_dev(ul2, li14);
    			append_dev(ul2, t52);
    			append_dev(ul2, li15);
    			append_dev(ul2, t53);
    			append_dev(ul2, li16);
    			append_dev(ul2, t54);
    			append_dev(ul2, li17);
    			append_dev(ul2, t55);
    			append_dev(ul2, li18);
    			append_dev(ul2, t56);
    			append_dev(ul2, li19);
    			append_dev(ul2, t58);
    			append_dev(ul2, li20);
    			append_dev(li20, a);
    			append_dev(div7, t60);
    			append_dev(div7, div6);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(breadcrum.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(breadcrum.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(breadcrum, detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(section);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Price', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Price> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ BreadCrum });
    	return [];
    }

    class Price extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Price",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src\pages\Register.svelte generated by Svelte v3.48.0 */
    const file$1 = "src\\pages\\Register.svelte";

    function create_fragment$1(ctx) {
    	let main;
    	let breadcrum;
    	let t0;
    	let section;
    	let div;
    	let iframe;
    	let iframe_src_value;
    	let current;

    	breadcrum = new BreadCrum({
    			props: {
    				name: 'Class Registration',
    				subName: 'Class Registration'
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			main = element("main");
    			create_component(breadcrum.$$.fragment);
    			t0 = space();
    			section = element("section");
    			div = element("div");
    			iframe = element("iframe");
    			iframe.textContent = "Loading…";
    			if (!src_url_equal(iframe.src, iframe_src_value = "")) attr_dev(iframe, "src", iframe_src_value);
    			attr_dev(iframe, "width", "640");
    			attr_dev(iframe, "height", "3803");
    			attr_dev(iframe, "frameborder", "0");
    			attr_dev(iframe, "marginheight", "0");
    			attr_dev(iframe, "marginwidth", "0");
    			attr_dev(iframe, "title", "register");
    			add_location(iframe, file$1, 10, 10, 279);
    			attr_dev(div, "class", "row justify-content-center");
    			add_location(div, file$1, 9, 8, 227);
    			attr_dev(section, "class", "inner-page pt-4");
    			add_location(section, file$1, 8, 4, 184);
    			attr_dev(main, "id", "main");
    			add_location(main, file$1, 6, 2, 85);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			mount_component(breadcrum, main, null);
    			append_dev(main, t0);
    			append_dev(main, section);
    			append_dev(section, div);
    			append_dev(div, iframe);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(breadcrum.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(breadcrum.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(breadcrum);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Register', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Register> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ BreadCrum });
    	return [];
    }

    class Register extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Register",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src\App.svelte generated by Svelte v3.48.0 */
    const file = "src\\App.svelte";

    function create_fragment(ctx) {
    	let header;
    	let t0;
    	let main;
    	let router;
    	let t1;
    	let backtop;
    	let t2;
    	let footer;
    	let current;
    	header = new Header({ $$inline: true });

    	router = new Router({
    			props: { routes: /*routes*/ ctx[0] },
    			$$inline: true
    		});

    	backtop = new BackTop({ $$inline: true });
    	footer = new Footer({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(header.$$.fragment);
    			t0 = space();
    			main = element("main");
    			create_component(router.$$.fragment);
    			t1 = space();
    			create_component(backtop.$$.fragment);
    			t2 = space();
    			create_component(footer.$$.fragment);
    			add_location(main, file, 38, 0, 1104);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(header, target, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, main, anchor);
    			mount_component(router, main, null);
    			insert_dev(target, t1, anchor);
    			mount_component(backtop, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(footer, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(header.$$.fragment, local);
    			transition_in(router.$$.fragment, local);
    			transition_in(backtop.$$.fragment, local);
    			transition_in(footer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(header.$$.fragment, local);
    			transition_out(router.$$.fragment, local);
    			transition_out(backtop.$$.fragment, local);
    			transition_out(footer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(header, detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(main);
    			destroy_component(router);
    			if (detaching) detach_dev(t1);
    			destroy_component(backtop, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(footer, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);

    	const routes = {
    		'/': Home,
    		'/price': Price,
    		'/register': Register,
    		'/allteams': AllTeam,
    		'/ourtutors': OurTutor,
    		'/ourcourse': OurCourse,
    		'/detailtutor/:id': DetailTutor,
    		'/detailcoursetutor1/:id': DetailCourseTutor1,
    		'/detailcoursetutor2/:id': DetailCourseTutor2,
    		'/detailcoursetutor3/:id': DetailCourseTutor3
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Router,
    		BackTop,
    		Footer,
    		Header,
    		AllTeam,
    		DetailCourseTutor1,
    		DetailCourseTutor2,
    		DetailCourseTutor3,
    		DetailTutor,
    		Home,
    		OurCourse,
    		OurTutor,
    		Price,
    		Register,
    		routes
    	});

    	return [routes];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function createCommonjsModule(fn) {
      var module = { exports: {} };
    	return fn(module, module.exports), module.exports;
    }

    var aos = createCommonjsModule(function (module, exports) {
    !function(e,t){module.exports=t();}(commonjsGlobal,function(){var e="undefined"!=typeof window?window:"undefined"!=typeof commonjsGlobal?commonjsGlobal:"undefined"!=typeof self?self:{},t="Expected a function",n=NaN,o="[object Symbol]",i=/^\s+|\s+$/g,a=/^[-+]0x[0-9a-f]+$/i,r=/^0b[01]+$/i,c=/^0o[0-7]+$/i,s=parseInt,u="object"==typeof e&&e&&e.Object===Object&&e,d="object"==typeof self&&self&&self.Object===Object&&self,l=u||d||Function("return this")(),f=Object.prototype.toString,m=Math.max,p=Math.min,b=function(){return l.Date.now()};function v(e,n,o){var i,a,r,c,s,u,d=0,l=!1,f=!1,v=!0;if("function"!=typeof e)throw new TypeError(t);function y(t){var n=i,o=a;return i=a=void 0,d=t,c=e.apply(o,n)}function h(e){var t=e-u;return void 0===u||t>=n||t<0||f&&e-d>=r}function k(){var e=b();if(h(e))return x(e);s=setTimeout(k,function(e){var t=n-(e-u);return f?p(t,r-(e-d)):t}(e));}function x(e){return s=void 0,v&&i?y(e):(i=a=void 0,c)}function O(){var e=b(),t=h(e);if(i=arguments,a=this,u=e,t){if(void 0===s)return function(e){return d=e,s=setTimeout(k,n),l?y(e):c}(u);if(f)return s=setTimeout(k,n),y(u)}return void 0===s&&(s=setTimeout(k,n)),c}return n=w(n)||0,g(o)&&(l=!!o.leading,r=(f="maxWait"in o)?m(w(o.maxWait)||0,n):r,v="trailing"in o?!!o.trailing:v),O.cancel=function(){void 0!==s&&clearTimeout(s),d=0,i=u=a=s=void 0;},O.flush=function(){return void 0===s?c:x(b())},O}function g(e){var t=typeof e;return !!e&&("object"==t||"function"==t)}function w(e){if("number"==typeof e)return e;if(function(e){return "symbol"==typeof e||function(e){return !!e&&"object"==typeof e}(e)&&f.call(e)==o}(e))return n;if(g(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=g(t)?t+"":t;}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(i,"");var u=r.test(e);return u||c.test(e)?s(e.slice(2),u?2:8):a.test(e)?n:+e}var y=function(e,n,o){var i=!0,a=!0;if("function"!=typeof e)throw new TypeError(t);return g(o)&&(i="leading"in o?!!o.leading:i,a="trailing"in o?!!o.trailing:a),v(e,n,{leading:i,maxWait:n,trailing:a})},h="Expected a function",k=NaN,x="[object Symbol]",O=/^\s+|\s+$/g,j=/^[-+]0x[0-9a-f]+$/i,E=/^0b[01]+$/i,N=/^0o[0-7]+$/i,z=parseInt,C="object"==typeof e&&e&&e.Object===Object&&e,A="object"==typeof self&&self&&self.Object===Object&&self,q=C||A||Function("return this")(),L=Object.prototype.toString,T=Math.max,M=Math.min,S=function(){return q.Date.now()};function D(e){var t=typeof e;return !!e&&("object"==t||"function"==t)}function H(e){if("number"==typeof e)return e;if(function(e){return "symbol"==typeof e||function(e){return !!e&&"object"==typeof e}(e)&&L.call(e)==x}(e))return k;if(D(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=D(t)?t+"":t;}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(O,"");var n=E.test(e);return n||N.test(e)?z(e.slice(2),n?2:8):j.test(e)?k:+e}var $=function(e,t,n){var o,i,a,r,c,s,u=0,d=!1,l=!1,f=!0;if("function"!=typeof e)throw new TypeError(h);function m(t){var n=o,a=i;return o=i=void 0,u=t,r=e.apply(a,n)}function p(e){var n=e-s;return void 0===s||n>=t||n<0||l&&e-u>=a}function b(){var e=S();if(p(e))return v(e);c=setTimeout(b,function(e){var n=t-(e-s);return l?M(n,a-(e-u)):n}(e));}function v(e){return c=void 0,f&&o?m(e):(o=i=void 0,r)}function g(){var e=S(),n=p(e);if(o=arguments,i=this,s=e,n){if(void 0===c)return function(e){return u=e,c=setTimeout(b,t),d?m(e):r}(s);if(l)return c=setTimeout(b,t),m(s)}return void 0===c&&(c=setTimeout(b,t)),r}return t=H(t)||0,D(n)&&(d=!!n.leading,a=(l="maxWait"in n)?T(H(n.maxWait)||0,t):a,f="trailing"in n?!!n.trailing:f),g.cancel=function(){void 0!==c&&clearTimeout(c),u=0,o=s=i=c=void 0;},g.flush=function(){return void 0===c?r:v(S())},g},W=function(){};function P(e){e&&e.forEach(function(e){var t=Array.prototype.slice.call(e.addedNodes),n=Array.prototype.slice.call(e.removedNodes);if(function e(t){var n=void 0,o=void 0;for(n=0;n<t.length;n+=1){if((o=t[n]).dataset&&o.dataset.aos)return !0;if(o.children&&e(o.children))return !0}return !1}(t.concat(n)))return W()});}function Y(){return window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver}var _={isSupported:function(){return !!Y()},ready:function(e,t){var n=window.document,o=new(Y())(P);W=t,o.observe(n.documentElement,{childList:!0,subtree:!0,removedNodes:!0});}},B=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},F=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o);}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),I=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o]);}return e},K=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,G=/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,J=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i,Q=/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i;function R(){return navigator.userAgent||navigator.vendor||window.opera||""}var U=new(function(){function e(){B(this,e);}return F(e,[{key:"phone",value:function(){var e=R();return !(!K.test(e)&&!G.test(e.substr(0,4)))}},{key:"mobile",value:function(){var e=R();return !(!J.test(e)&&!Q.test(e.substr(0,4)))}},{key:"tablet",value:function(){return this.mobile()&&!this.phone()}},{key:"ie11",value:function(){return "-ms-scroll-limit"in document.documentElement.style&&"-ms-ime-align"in document.documentElement.style}}]),e}()),V=function(e,t){var n=void 0;return U.ie11()?(n=document.createEvent("CustomEvent")).initCustomEvent(e,!0,!0,{detail:t}):n=new CustomEvent(e,{detail:t}),document.dispatchEvent(n)},X=function(e){return e.forEach(function(e,t){return function(e,t){var n=e.options,o=e.position,i=e.node,a=(e.data,function(){e.animated&&(function(e,t){t&&t.forEach(function(t){return e.classList.remove(t)});}(i,n.animatedClassNames),V("aos:out",i),e.options.id&&V("aos:in:"+e.options.id,i),e.animated=!1);});n.mirror&&t>=o.out&&!n.once?a():t>=o.in?e.animated||(function(e,t){t&&t.forEach(function(t){return e.classList.add(t)});}(i,n.animatedClassNames),V("aos:in",i),e.options.id&&V("aos:in:"+e.options.id,i),e.animated=!0):e.animated&&!n.once&&a();}(e,window.pageYOffset)})},Z=function(e){for(var t=0,n=0;e&&!isNaN(e.offsetLeft)&&!isNaN(e.offsetTop);)t+=e.offsetLeft-("BODY"!=e.tagName?e.scrollLeft:0),n+=e.offsetTop-("BODY"!=e.tagName?e.scrollTop:0),e=e.offsetParent;return {top:n,left:t}},ee=function(e,t,n){var o=e.getAttribute("data-aos-"+t);if(void 0!==o){if("true"===o)return !0;if("false"===o)return !1}return o||n},te=function(e,t){return e.forEach(function(e,n){var o=ee(e.node,"mirror",t.mirror),i=ee(e.node,"once",t.once),a=ee(e.node,"id"),r=t.useClassNames&&e.node.getAttribute("data-aos"),c=[t.animatedClassName].concat(r?r.split(" "):[]).filter(function(e){return "string"==typeof e});t.initClassName&&e.node.classList.add(t.initClassName),e.position={in:function(e,t,n){var o=window.innerHeight,i=ee(e,"anchor"),a=ee(e,"anchor-placement"),r=Number(ee(e,"offset",a?0:t)),c=a||n,s=e;i&&document.querySelectorAll(i)&&(s=document.querySelectorAll(i)[0]);var u=Z(s).top-o;switch(c){case"top-bottom":break;case"center-bottom":u+=s.offsetHeight/2;break;case"bottom-bottom":u+=s.offsetHeight;break;case"top-center":u+=o/2;break;case"center-center":u+=o/2+s.offsetHeight/2;break;case"bottom-center":u+=o/2+s.offsetHeight;break;case"top-top":u+=o;break;case"bottom-top":u+=o+s.offsetHeight;break;case"center-top":u+=o+s.offsetHeight/2;}return u+r}(e.node,t.offset,t.anchorPlacement),out:o&&function(e,t){var n=ee(e,"anchor"),o=ee(e,"offset",t),i=e;return n&&document.querySelectorAll(n)&&(i=document.querySelectorAll(n)[0]),Z(i).top+i.offsetHeight-o}(e.node,t.offset)},e.options={once:i,mirror:o,animatedClassNames:c,id:a};}),e},ne=function(){var e=document.querySelectorAll("[data-aos]");return Array.prototype.map.call(e,function(e){return {node:e}})},oe=[],ie=!1,ae={offset:120,delay:0,easing:"ease",duration:400,disable:!1,once:!1,mirror:!1,anchorPlacement:"top-bottom",startEvent:"DOMContentLoaded",animatedClassName:"aos-animate",initClassName:"aos-init",useClassNames:!1,disableMutationObserver:!1,throttleDelay:99,debounceDelay:50},re=function(){return document.all&&!window.atob},ce=function(){arguments.length>0&&void 0!==arguments[0]&&arguments[0]&&(ie=!0),ie&&(oe=te(oe,ae),X(oe),window.addEventListener("scroll",y(function(){X(oe,ae.once);},ae.throttleDelay)));},se=function(){if(oe=ne(),de(ae.disable)||re())return ue();ce();},ue=function(){oe.forEach(function(e,t){e.node.removeAttribute("data-aos"),e.node.removeAttribute("data-aos-easing"),e.node.removeAttribute("data-aos-duration"),e.node.removeAttribute("data-aos-delay"),ae.initClassName&&e.node.classList.remove(ae.initClassName),ae.animatedClassName&&e.node.classList.remove(ae.animatedClassName);});},de=function(e){return !0===e||"mobile"===e&&U.mobile()||"phone"===e&&U.phone()||"tablet"===e&&U.tablet()||"function"==typeof e&&!0===e()};return {init:function(e){return ae=I(ae,e),oe=ne(),ae.disableMutationObserver||_.isSupported()||(console.info('\n      aos: MutationObserver is not supported on this browser,\n      code mutations observing has been disabled.\n      You may have to call "refreshHard()" by yourself.\n    '),ae.disableMutationObserver=!0),ae.disableMutationObserver||_.ready("[data-aos]",se),de(ae.disable)||re()?ue():(document.querySelector("body").setAttribute("data-aos-easing",ae.easing),document.querySelector("body").setAttribute("data-aos-duration",ae.duration),document.querySelector("body").setAttribute("data-aos-delay",ae.delay),-1===["DOMContentLoaded","load"].indexOf(ae.startEvent)?document.addEventListener(ae.startEvent,function(){ce(!0);}):window.addEventListener("load",function(){ce(!0);}),"DOMContentLoaded"===ae.startEvent&&["complete","interactive"].indexOf(document.readyState)>-1&&ce(!0),window.addEventListener("resize",$(ce,ae.debounceDelay,!0)),window.addEventListener("orientationchange",$(ce,ae.debounceDelay,!0)),oe)},refresh:ce,refreshHard:se}});
    });

    aos.init();

    const app = new App({
      target: document.body,
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
