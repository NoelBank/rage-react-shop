!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=28)}({28:function(e,t,n){(function(e){mp.game.graphics.notify("Loaded nbank.shop"),mp.events.add({guiReady:function(){e.browser=mp.browsers.new("package://nbank/index.html"),mp.gui.cursor.show(!1,!1),mp.players.local.setArmour(100)},shopInventory:function(t){e.browser.execute("trigger('shopInventory', '".concat(t,"')"))},responsePreviewProduct:function(t,n){e.browser.execute("trigger('responsePreviewProduct', '".concat(n,"')"))},responseBuyProduct:function(t,n){e.browser.execute("trigger('responseBuyProduct', '".concat(n,"')"))},playerChat:function(t){e.browser.execute("trigger('onMessage', '".concat(t,"')")),mp.gui.chat.push("You wrote '".concat(t,"' in chat."))},onMessageFromServer:function(t){e.browser.execute("trigger('onMessage', '".concat(t,"')"))},playerSpawn:function(e){mp.gui.chat.push("Hey "+e.name+", you just spawned"),mp.colshapes.newSphere(e.position.x,e.position.y,e.position.z,25,2)}}),mp.events.add("buyProduct",(function(e,t){mp.events.callRemote("buyProduct",e.ID,e.variant,t)})),mp.events.add("previewProduct",(function(e,t){mp.game.graphics.notify(e),mp.game.graphics.notify("aufmachen?"),mp.events.callRemote("previewProduct",e,t)})),mp.keys.bind(114,!0,(function(){var t=!mp.gui.cursor.visible;mp.gui.cursor.show(t,t),e.browser.execute("trigger('openShop')"),mp.events.callRemote("triggerInteraction")})),mp.keys.bind(113,!0,(function(){e.browser.reload()})),mp.events.add("initialized",(function(){mp.game.graphics.notify("The Framework was loaded")})),mp.events.add("logToChat",(function(e){mp.game.graphics.notify(e)})),mp.events.add("toggleCursor",(function(){var e=!mp.gui.cursor.visible;mp.gui.cursor.show(e,e)}))}).call(this,n(29))},29:function(e,t){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(e){"object"==typeof window&&(n=window)}e.exports=n}});