//=============================================================================
// SM_BrowserOpen.js
// ----------------------------------------------------------------------------
// (C) 2019 shingo.matsuno
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
//=============================================================================
//
/*:
 * @plugindesc ブラウザオープンプラグイン
 * @author shingo.matsuno
 * @help
 * 
 *  ※使用上の注意※ 
 * cordovaプラグインを必ずインストールしてください。
 * cordova-plugin-inappbrowser
 * イベントコマンド「プラグインコマンド」から実行。
 *  SM_ブラウザ  # URLをブラウザで開きます 引数１：URL
 *
 *
 * *
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 */

(function() {

    //=============================================================================
    // Game_Interpreter
    //  プラグインコマンドを追加定義します。
    //=============================================================================
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        
        if(command === 'SM_ブラウザ'){
            var url = args[0];
            var ref = cordova.InAppBrowser.open(url, '_blank', 'location=yes');
        }
    }

})();
