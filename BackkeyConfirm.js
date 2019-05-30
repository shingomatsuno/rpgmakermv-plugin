//=============================================================================
// BackkeyConfirm.js
// ----------------------------------------------------------------------------
// (C) 2019 shingo.matsuno
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
//=============================================================================
//
/*:
 * @plugindesc バックキー終了確認プラグイン
 * @author 松野慎吾
 * @help
 *  ※使用上の注意※
 * バックキーを押すと終了確認ダイアログを表示します。
 * 必ずcordovaプラグインをインストールしてください。
 * cordova-plugin-dialogs
 * 
 *
 * @param ダイアログメッセージ
 * @desc 
 * @default アプリケーションを終了しますか？
 *
 * @param タイトル
 * @desc 
 * @default 終了確認
 *
 * @param 終了ボタン
 * @desc 
 * @default 終了
 *
 * @param キャンセルボタン
 * @desc 
 * @default キャンセル
 *
 * *
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 */


var isLoadInterstitial = false;
var isLoadReword = false;
var reworded = false;

(function() {
    'use strict';
    
    var pluginName = 'BackkeyConfirm'

    //=============================================================================
    // パラメータの取得
    //=============================================================================
    var message   = String(PluginManager.parameters(pluginName)['ダイアログメッセージ']);
    var title     = String(PluginManager.parameters(pluginName)['タイトル']);
    var quitButton        = String(PluginManager.parameters(pluginName)['終了ボタン']);
    var cancelButton    = String(PluginManager.parameters(pluginName)['キャンセルボタン']);


    document.addEventListener("backbutton", onBackClickEvent, false);
    function confirmCallback(id) {
        if (1 == id) { //終了のボタンが押されたら
            navigator.app.exitApp(); //アプリ終了
        }
    }

    function onBackClickEvent() {
        navigator.notification.confirm ( // 確認用ダイアログを表示
            message, // 本文
            confirmCallback,
            title, // タイトル
            quitButton + "," + cancelButton // ボタンの表示名
        )
    }
    
})();

