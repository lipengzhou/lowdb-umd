(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('fs'), require('steno'), require('path')) :
    typeof define === 'function' && define.amd ? define(['exports', 'fs', 'steno', 'path'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.lowdb = {}, global.fs, global.steno, global.path));
})(this, (function (exports, fs, steno, path) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
    var path__default = /*#__PURE__*/_interopDefaultLegacy(path);

    var __classPrivateFieldSet$6 = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
        if (kind === "m") throw new TypeError("Private method is not writable");
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    };
    var __classPrivateFieldGet$6 = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    var _TextFile_filename, _TextFile_writer;
    class TextFile {
        constructor(filename) {
            _TextFile_filename.set(this, void 0);
            _TextFile_writer.set(this, void 0);
            __classPrivateFieldSet$6(this, _TextFile_filename, filename, "f");
            __classPrivateFieldSet$6(this, _TextFile_writer, new steno.Writer(filename), "f");
        }
        async read() {
            let data;
            try {
                data = await fs__default["default"].promises.readFile(__classPrivateFieldGet$6(this, _TextFile_filename, "f"), 'utf-8');
            }
            catch (e) {
                if (e.code === 'ENOENT') {
                    return null;
                }
                throw e;
            }
            return data;
        }
        write(str) {
            return __classPrivateFieldGet$6(this, _TextFile_writer, "f").write(str);
        }
    }
    _TextFile_filename = new WeakMap(), _TextFile_writer = new WeakMap();

    var __classPrivateFieldSet$5 = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
        if (kind === "m") throw new TypeError("Private method is not writable");
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    };
    var __classPrivateFieldGet$5 = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    var _JSONFile_adapter;
    class JSONFile {
        constructor(filename) {
            _JSONFile_adapter.set(this, void 0);
            __classPrivateFieldSet$5(this, _JSONFile_adapter, new TextFile(filename), "f");
        }
        async read() {
            const data = await __classPrivateFieldGet$5(this, _JSONFile_adapter, "f").read();
            if (data === null) {
                return null;
            }
            else {
                return JSON.parse(data);
            }
        }
        write(obj) {
            return __classPrivateFieldGet$5(this, _JSONFile_adapter, "f").write(JSON.stringify(obj, null, 2));
        }
    }
    _JSONFile_adapter = new WeakMap();

    var __classPrivateFieldSet$4 = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
        if (kind === "m") throw new TypeError("Private method is not writable");
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    };
    var __classPrivateFieldGet$4 = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    var _TextFileSync_tempFilename, _TextFileSync_filename;
    class TextFileSync {
        constructor(filename) {
            _TextFileSync_tempFilename.set(this, void 0);
            _TextFileSync_filename.set(this, void 0);
            __classPrivateFieldSet$4(this, _TextFileSync_filename, filename, "f");
            __classPrivateFieldSet$4(this, _TextFileSync_tempFilename, path__default["default"].join(path__default["default"].dirname(filename), `.${path__default["default"].basename(filename)}.tmp`), "f");
        }
        read() {
            let data;
            try {
                data = fs__default["default"].readFileSync(__classPrivateFieldGet$4(this, _TextFileSync_filename, "f"), 'utf-8');
            }
            catch (e) {
                if (e.code === 'ENOENT') {
                    return null;
                }
                throw e;
            }
            return data;
        }
        write(str) {
            fs__default["default"].writeFileSync(__classPrivateFieldGet$4(this, _TextFileSync_tempFilename, "f"), str);
            fs__default["default"].renameSync(__classPrivateFieldGet$4(this, _TextFileSync_tempFilename, "f"), __classPrivateFieldGet$4(this, _TextFileSync_filename, "f"));
        }
    }
    _TextFileSync_tempFilename = new WeakMap(), _TextFileSync_filename = new WeakMap();

    var __classPrivateFieldSet$3 = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
        if (kind === "m") throw new TypeError("Private method is not writable");
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    };
    var __classPrivateFieldGet$3 = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    var _JSONFileSync_adapter;
    class JSONFileSync {
        constructor(filename) {
            _JSONFileSync_adapter.set(this, void 0);
            __classPrivateFieldSet$3(this, _JSONFileSync_adapter, new TextFileSync(filename), "f");
        }
        read() {
            const data = __classPrivateFieldGet$3(this, _JSONFileSync_adapter, "f").read();
            if (data === null) {
                return null;
            }
            else {
                return JSON.parse(data);
            }
        }
        write(obj) {
            __classPrivateFieldGet$3(this, _JSONFileSync_adapter, "f").write(JSON.stringify(obj, null, 2));
        }
    }
    _JSONFileSync_adapter = new WeakMap();

    var __classPrivateFieldSet$2 = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
        if (kind === "m") throw new TypeError("Private method is not writable");
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    };
    var __classPrivateFieldGet$2 = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    var _LocalStorage_key;
    class LocalStorage {
        constructor(key) {
            _LocalStorage_key.set(this, void 0);
            __classPrivateFieldSet$2(this, _LocalStorage_key, key, "f");
        }
        read() {
            const value = globalThis.localStorage.getItem(__classPrivateFieldGet$2(this, _LocalStorage_key, "f"));
            if (value === null) {
                return null;
            }
            return JSON.parse(value);
        }
        write(obj) {
            globalThis.localStorage.setItem(__classPrivateFieldGet$2(this, _LocalStorage_key, "f"), JSON.stringify(obj));
        }
    }
    _LocalStorage_key = new WeakMap();

    var __classPrivateFieldGet$1 = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    var __classPrivateFieldSet$1 = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
        if (kind === "m") throw new TypeError("Private method is not writable");
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    };
    var _Memory_data;
    class Memory {
        constructor() {
            _Memory_data.set(this, null);
        }
        read() {
            return Promise.resolve(__classPrivateFieldGet$1(this, _Memory_data, "f"));
        }
        write(obj) {
            __classPrivateFieldSet$1(this, _Memory_data, obj, "f");
            return Promise.resolve();
        }
    }
    _Memory_data = new WeakMap();

    var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
        if (kind === "m") throw new TypeError("Private method is not writable");
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    };
    var _MemorySync_data;
    class MemorySync {
        constructor() {
            _MemorySync_data.set(this, null);
        }
        read() {
            return __classPrivateFieldGet(this, _MemorySync_data, "f") || null;
        }
        write(obj) {
            __classPrivateFieldSet(this, _MemorySync_data, obj, "f");
        }
    }
    _MemorySync_data = new WeakMap();

    class MissingAdapterError extends Error {
        constructor() {
            super();
            this.message = 'Missing Adapter';
        }
    }

    class Low {
        constructor(adapter) {
            Object.defineProperty(this, "adapter", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "data", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: null
            });
            if (adapter) {
                this.adapter = adapter;
            }
            else {
                throw new MissingAdapterError();
            }
        }
        async read() {
            this.data = await this.adapter.read();
        }
        async write() {
            if (this.data) {
                await this.adapter.write(this.data);
            }
        }
    }

    class LowSync {
        constructor(adapter) {
            Object.defineProperty(this, "adapter", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "data", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: null
            });
            if (adapter) {
                this.adapter = adapter;
            }
            else {
                throw new MissingAdapterError();
            }
        }
        read() {
            this.data = this.adapter.read();
        }
        write() {
            if (this.data !== null) {
                this.adapter.write(this.data);
            }
        }
    }

    exports.JSONFile = JSONFile;
    exports.JSONFileSync = JSONFileSync;
    exports.LocalStorage = LocalStorage;
    exports.Low = Low;
    exports.LowSync = LowSync;
    exports.Memory = Memory;
    exports.MemorySync = MemorySync;
    exports.TextFile = TextFile;
    exports.TextFileSync = TextFileSync;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
