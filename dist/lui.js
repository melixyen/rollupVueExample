(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) :
    typeof define === 'function' && define.amd ? define(['vue'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.lui = factory(global.Vue));
}(this, (function (Vue) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var Vue__default = /*#__PURE__*/_interopDefaultLegacy(Vue);

    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    var script = {
        name: "puk",
        props: ['gap', 'time'],
        computed: {
            timeFormat: function(){
                return this.timeStr + ' ' + this.time.toLocaleString();
            }
        },
        data() {
            return {
                timeStr: '時間為 '
            }
        },
        methods: {
        }

    };

    function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
        if (typeof shadowMode !== 'boolean') {
            createInjectorSSR = createInjector;
            createInjector = shadowMode;
            shadowMode = false;
        }
        // Vue.extend constructor export interop.
        const options = typeof script === 'function' ? script.options : script;
        // render functions
        if (template && template.render) {
            options.render = template.render;
            options.staticRenderFns = template.staticRenderFns;
            options._compiled = true;
            // functional template
            if (isFunctionalTemplate) {
                options.functional = true;
            }
        }
        // scopedId
        if (scopeId) {
            options._scopeId = scopeId;
        }
        let hook;
        if (moduleIdentifier) {
            // server build
            hook = function (context) {
                // 2.3 injection
                context =
                    context || // cached call
                        (this.$vnode && this.$vnode.ssrContext) || // stateful
                        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
                // 2.2 with runInNewContext: true
                if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                    context = __VUE_SSR_CONTEXT__;
                }
                // inject component styles
                if (style) {
                    style.call(this, createInjectorSSR(context));
                }
                // register component module identifier for async chunk inference
                if (context && context._registeredComponents) {
                    context._registeredComponents.add(moduleIdentifier);
                }
            };
            // used by ssr in case component is cached and beforeCreate
            // never gets called
            options._ssrRegister = hook;
        }
        else if (style) {
            hook = shadowMode
                ? function (context) {
                    style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
                }
                : function (context) {
                    style.call(this, createInjector(context));
                };
        }
        if (hook) {
            if (options.functional) {
                // register for functional component in vue file
                const originalRender = options.render;
                options.render = function renderWithStyleInjection(h, context) {
                    hook.call(context);
                    return originalRender(h, context);
                };
            }
            else {
                // inject component registration as beforeCreate hook
                const existing = options.beforeCreate;
                options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
            }
        }
        return script;
    }

    /* script */
    const __vue_script__ = script;
    /* template */
    var __vue_render__ = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("div", [
        _c("span", { staticClass: "puk_span" }, [
          _vm._v(_vm._s(_vm.gap) + ":" + _vm._s(_vm.timeFormat))
        ]),
        _vm._v(" "),
        _vm._m(0)
      ])
    };
    var __vue_staticRenderFns__ = [
      function() {
        var _vm = this;
        var _h = _vm.$createElement;
        var _c = _vm._self._c || _h;
        return _c("div", { staticClass: "div1" }, [
          _c("span", [_vm._v("Test scss blue")]),
          _vm._v(" "),
          _c("div", { staticClass: "div2" }, [
            _c("span", [_vm._v(" Test scss red ")])
          ])
        ])
      }
    ];
    __vue_render__._withStripped = true;

      /* style */
      const __vue_inject_styles__ = undefined;
      /* scoped */
      const __vue_scope_id__ = undefined;
      /* module identifier */
      const __vue_module_identifier__ = undefined;
      /* functional template */
      const __vue_is_functional_template__ = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__ = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
        __vue_inject_styles__,
        __vue_script__,
        __vue_scope_id__,
        __vue_is_functional_template__,
        __vue_module_identifier__,
        false,
        undefined,
        undefined,
        undefined
      );

    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    var script$1 = {
        name: "popuoOption",
        data() {
            return {
                isShowMessageBox: false,
                popup: {},
                promise: '',
                resolve: '',
                reject: ''
            }
        },
        methods: {
            showMsgBox: function (popup) {
                this.popup = popup;
                this.isShowMessageBox = true;
                this.promise = new Promise((resolve, reject) => {
                    this.resolve = resolve;
                    this.reject = reject;
                });
                // 返回promise物件
                return this.promise;
            },
            submit: function (val) {
                this.resolve(val);
                this.isShowMessageBox = false;
            }
        }

    };

    /* script */
    const __vue_script__$1 = script$1;
    /* template */
    var __vue_render__$1 = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.isShowMessageBox,
              expression: "isShowMessageBox"
            }
          ],
          staticClass: "popupWarpper"
        },
        [
          _c("div", { staticClass: "popupMain" }, [
            _c("div", { staticClass: "header" }, [
              _c("i", { staticClass: "icon-arrow-left" }),
              _vm._v(" "),
              _c("h4", {
                staticClass: "modal-title",
                domProps: { textContent: _vm._s(_vm.popup.title) }
              }),
              _vm._v(" "),
              _c("i", {
                staticClass: "icon-cross",
                staticStyle: { cursor: "pointer" }
              })
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "content" }, [
              _c("div", {
                staticClass: "jsContent",
                domProps: { textContent: _vm._s(_vm.popup.content) }
              })
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "footer" }, [
              _vm.popup.boolean
                ? _c(
                    "div",
                    {
                      staticClass: "btn btn-left",
                      on: {
                        click: function($event) {
                          return _vm.submit("no")
                        }
                      }
                    },
                    [_vm._v("\n                NO\n            ")]
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.popup.boolean
                ? _c(
                    "div",
                    {
                      staticClass: "btn btn-right",
                      on: {
                        click: function($event) {
                          return _vm.submit("yes")
                        }
                      }
                    },
                    [_vm._v("\n                YES\n            ")]
                  )
                : _vm._e(),
              _vm._v(" "),
              !_vm.popup.boolean
                ? _c(
                    "div",
                    {
                      staticClass: "btn btn-one",
                      on: {
                        click: function($event) {
                          return _vm.submit("ok")
                        }
                      }
                    },
                    [_vm._v("\n                OK\n            ")]
                  )
                : _vm._e()
            ])
          ])
        ]
      )
    };
    var __vue_staticRenderFns__$1 = [];
    __vue_render__$1._withStripped = true;

      /* style */
      const __vue_inject_styles__$1 = undefined;
      /* scoped */
      const __vue_scope_id__$1 = undefined;
      /* module identifier */
      const __vue_module_identifier__$1 = undefined;
      /* functional template */
      const __vue_is_functional_template__$1 = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$1 = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
        __vue_inject_styles__$1,
        __vue_script__$1,
        __vue_scope_id__$1,
        __vue_is_functional_template__$1,
        __vue_module_identifier__$1,
        false,
        undefined,
        undefined,
        undefined
      );

    const ConfirmBox = Vue__default['default'].extend(__vue_component__$1);

    __vue_component__$1.install = (Vue) => {
        // Vue.prototype.$popup = ConfirmBox;
        const MessageBoxInstance = Vue.extend(ConfirmBox);
        let currentMsg;
        const initInstance = () => {
        // 例項化vue例項
        currentMsg = new MessageBoxInstance();
        let msgBoxEl = currentMsg.$mount().$el;
        document.body.appendChild(msgBoxEl);
        };
        // 在Vue的原型上新增例項方法，以全域性呼叫
        Vue.prototype.$popup = function(options){
                {
                    initInstance();
                }

                return currentMsg.showMsgBox(options);
        };

        __vue_component__$1.mainFunction = Vue.prototype.$popup;
    };

    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    var script$2 = {
        name: "alert",
        data() {
            return {
                isShow: false,
                alert: {},
                promise: '',
                resolve: '',
                reject: ''
            }
        },
        methods: {
            showAlertBox: function (popup) {
                if(typeof(popup)=='string') popup = {msg: popup};
                popup.type = popup.type || 'info';
                popup.duration = popup.duration || 5000;
                this.alert = popup;
                this.isShow = true;
                this.promise = new Promise((resolve, reject) => {
                    this.resolve = resolve;
                    this.reject = reject;
                });
                setTimeout(() => {
                    this.isShow = false;
                }, this.alert.duration);
                // 返回promise物件
                return this.promise;
            },
            submit: function (val) {
                this.resolve(val);
                this.isShowMessageBox = false;
            }
        }

    };

    /* script */
    const __vue_script__$2 = script$2;
    /* template */
    var __vue_render__$2 = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("transition", { attrs: { name: "drop" } }, [
        _vm.isShow
          ? _c(
              "div",
              { staticClass: "notifyjs-corner", staticStyle: { left: "45%" } },
              [
                _c("div", { staticClass: "notifyjs-wrapper notifyjs-hidable" }, [
                  _c("div", { staticClass: "notifyjs-container" }, [
                    _c(
                      "div",
                      {
                        staticClass: "notifyjs-bootstrap-base",
                        class: "notifyjs-bootstrap-" + _vm.alert.type
                      },
                      [
                        _c("div", { staticClass: "notifyjs-arrow" }),
                        _vm._v(" "),
                        _c("span", {
                          domProps: { textContent: _vm._s(_vm.alert.msg) }
                        })
                      ]
                    )
                  ])
                ])
              ]
            )
          : _vm._e()
      ])
    };
    var __vue_staticRenderFns__$2 = [];
    __vue_render__$2._withStripped = true;

      /* style */
      const __vue_inject_styles__$2 = undefined;
      /* scoped */
      const __vue_scope_id__$2 = undefined;
      /* module identifier */
      const __vue_module_identifier__$2 = undefined;
      /* functional template */
      const __vue_is_functional_template__$2 = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$2 = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
        __vue_inject_styles__$2,
        __vue_script__$2,
        __vue_scope_id__$2,
        __vue_is_functional_template__$2,
        __vue_module_identifier__$2,
        false,
        undefined,
        undefined,
        undefined
      );

    const AlertBox = Vue__default['default'].extend(__vue_component__$2);

    __vue_component__$2.install = (Vue) => {
        // Vue.prototype.$popup = ConfirmBox;
        const MessageBoxInstance = Vue.extend(AlertBox);
        let currentMsg;
        const initInstance = () => {
            // 例項化vue例項
            currentMsg = new MessageBoxInstance();
            let msgBoxEl = currentMsg.$mount().$el;
            // document.getElementById('app').appendChild(msgBoxEl);
            document.body.appendChild(msgBoxEl);
        };
        // 在Vue的原型上新增例項方法，以全域性呼叫
        Vue.prototype.$alert = function (options) {
            {
                initInstance();
            }

            return currentMsg.showAlertBox(options);
        };

        __vue_component__$2.mainFunction = Vue.prototype.$alert;
    };

    const components = [__vue_component__, __vue_component__$1, __vue_component__$2];

    let lui = {};
    const PRE_NAME = 'lui-';

    lui.listComponent = [];

    const install = function(Vue){
    	components.forEach((c)=>{
    		var cmpName = PRE_NAME + c.name;
    		Vue.component(cmpName, c);
    		if(typeof(c.install)=='function') c.install(Vue);
    		if(typeof(c.mainFunction)=='function') lui[c.name] = c.mainFunction;
    		lui.listComponent.push(cmpName);
    	});
    };

    if(typeof(window) !== 'undefined' && window.Vue){
    	install(window.Vue);
    }

    lui.install = install;

    return lui;

})));
