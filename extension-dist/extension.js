/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(__webpack_require__(1));
const ReactPanel_1 = __webpack_require__(2);
function activate(context) {
    console.log('Congratulations, your extension "funny-editor" is now active!');
    context.subscriptions.push(vscode.commands.registerCommand('funny-editor.helloWorld', () => {
        ReactPanel_1.ReactPanel.createOrShowInstance(context.extensionUri);
    }));
    context.subscriptions.push(vscode.commands.registerCommand('funny-editor.doRefactor', () => {
        if (ReactPanel_1.ReactPanel.currentPanel) {
            ReactPanel_1.ReactPanel.currentPanel.dispose();
        }
    }));
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReactPanel = void 0;
const vscode = __importStar(__webpack_require__(1));
/**
 * Manages react webview panels
 */
class ReactPanel {
    constructor(panel, extensionUri) {
        this.disposables = [];
        this.panel = panel;
        this.extensionUri = extensionUri;
        // Set the webview's initial html content
        this.update();
        // Listen for when the panel is disposed
        // This happens when the user closes the panel or when the panel is closed programatically
        this.panel.onDidDispose(() => this.dispose(), null, this.disposables);
        // // Handle messages from the webview
        // this._panel.webview.onDidReceiveMessage(
        //   (message) => {
        //     switch (message.command) {
        //       case "alert":
        //         vscode.window.showErrorMessage(message.text);
        //         return;
        //     }
        //   },
        //   null,
        //   this._disposables
        // );
    }
    /**
     * @description 创建webview单例
     */
    static createOrShowInstance(extensionUri) {
        var _a;
        const column = (_a = vscode.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.viewColumn;
        // If we already have a panel, show it.
        if (ReactPanel.currentPanel) {
            ReactPanel.currentPanel.panel.reveal(column);
            ReactPanel.currentPanel.update();
            return;
        }
        // Otherwise, create a new panel.
        const panel = vscode.window.createWebviewPanel(ReactPanel.viewType, 'funny editor', column !== null && column !== void 0 ? column : vscode.ViewColumn.One, {
            // Enable javascript in the webview
            enableScripts: true,
            // And restrict the webview to only loading content from our extension's `media` directory.
            localResourceRoots: [
                vscode.Uri.joinPath(extensionUri, 'webview-dist'),
                vscode.Uri.joinPath(extensionUri, 'extension-dist'),
            ],
            retainContextWhenHidden: true,
        });
        ReactPanel.currentPanel = new ReactPanel(panel, extensionUri);
    }
    static kill() {
        var _a;
        (_a = ReactPanel.currentPanel) === null || _a === void 0 ? void 0 : _a.dispose();
        ReactPanel.currentPanel = undefined;
    }
    static revive(panel, extensionUri) {
        ReactPanel.currentPanel = new ReactPanel(panel, extensionUri);
    }
    dispose() {
        ReactPanel.currentPanel = undefined;
        // Clean up our resources
        this.panel.dispose();
        while (this.disposables.length) {
            const x = this.disposables.pop();
            if (x) {
                x.dispose();
            }
        }
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            const webview = this.panel.webview;
            this.panel.webview.html = this.getHtmlForWebview(webview);
            webview.onDidReceiveMessage((data) => __awaiter(this, void 0, void 0, function* () {
                switch (data.type) {
                    // case 'report': {
                    //   const message = await vscode.window.showInputBox({
                    //     placeHolder: 'why are you reporting this user?',
                    //   })
                    //   if (message) {
                    //     await mutationNoErr(`/report`, { message, ...data.value })
                    //     webview.postMessage({
                    //       command: 'report-done',
                    //       data,
                    //     })
                    //     vscode.window.showInformationMessage('Thank you for reporting!')
                    //   }
                    //   break
                    // }
                    // case 'set-window-info': {
                    //   const { displayName, flair } = data.value
                    //   this._panel.title = displayName
                    //   if (flair in flairMap) {
                    //     const both = vscode.Uri.parse(
                    //       `https://flair.benawad.com/` + flairMap[flair as keyof typeof flairMap]
                    //     )
                    //     this._panel.iconPath = {
                    //       light: both,
                    //       dark: both,
                    //     }
                    //   }
                    //   break
                    // }
                    case 'onInfo': {
                        if (!data.value) {
                            return;
                        }
                        vscode.window.showInformationMessage(data.value);
                        break;
                    }
                    case 'onError': {
                        if (!data.value) {
                            return;
                        }
                        vscode.window.showErrorMessage(data.value);
                        break;
                    }
                    // case 'tokens': {
                    //   await Util.globalState.update(accessTokenKey, data.accessToken)
                    //   await Util.globalState.update(refreshTokenKey, data.refreshToken)
                    //   break
                    // }
                }
            }));
        });
    }
    /**
     * @description webview配置
     */
    getHtmlForWebview(webview) {
        // Get the local path to main script run in the webview, then convert it to a uri we can use in the webview.
        const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this.extensionUri, 'webview-dist', 'js', 'bundle.js'));
        // Use a nonce to only allow specific scripts to be run
        const nonce = getNonce();
        return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <!--
        Use a content security policy to only allow loading images from https or from our extension directory,
        and only allow scripts that have a specific nonce.
      -->
      <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>React App</title>
    </head>
    <body>
      <div id="root"></div>
      <script nonce="${nonce}" src="${scriptUri}"></script>
    </body>
    </html>`;
    }
}
exports.ReactPanel = ReactPanel;
ReactPanel.viewType = 'react';
function getNonce() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=extension.js.map