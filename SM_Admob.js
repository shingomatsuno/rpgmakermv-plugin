//=============================================================================
// SM_Admob.js
// ----------------------------------------------------------------------------
// (C) 2019 shingo.matsuno
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
//=============================================================================
//
/*:
 * @plugindesc Admobプラグイン
 * @author 松野慎吾
 * @help
 *  ※使用上の注意※
 * 必ずAdmobのcordovaプラグインをインストールしてください。
 * cordova-plugin-admob-free
 *  
 * デフォルトの広告IDはAdmob公式のテスト用IDです。
 * コモンイベントはそれぞれ１つしか設定できませんが、複数設定したい場合は変数で条件分岐させてください。
 * 使わない広告IDは空白にしてください。
 * 
 * 
 * イベントコマンド「プラグインコマンド」から実行。
 *  SM_インステ広告  # インステ広告を開きます。
 *  SM_リワード広告  # リワード広告を開きます。
 *
 * @param IOSのバナー広告ID
 * @desc 
 * @default ca-app-pub-3940256099942544/6300978111
 *
 * @param IOSのインステ広告ID
 * @desc 
 * @default ca-app-pub-3940256099942544/8691691433
 *
 * @param IOSのリワード広告ID
 * @desc 
 * @default ca-app-pub-3940256099942544/5224354917
 *
 * @param Androidのバナー広告ID
 * @desc 
 * @default ca-app-pub-3940256099942544/6300978111
 *
 * @param Androidのインステ広告ID
 * @desc 
 * @default ca-app-pub-3940256099942544/8691691433
 *
 * @param Androidのリワード広告ID
 * @desc 
 * @default ca-app-pub-3940256099942544/5224354917
 *
 * 
 * @param バナー広告の位置
 * @type boolean
 * @on  上
 * @off 下
 * @desc （true:上 or false:下）
 * @default false
 * 
 * @param 動画リワード後のコモンイベントID
 * @desc 
 * @default 1
 *
 * @param 動画リワード読み込み失敗時のコモンイベントID
 * @desc 
 * @default 2
 *
 * @param テストモード
 * @type boolean
 * @on  テストモードON
 * @off テストモードOFF
 * @desc テストモードONの場合Admobのテスト広告が表示されます。
 * @default true
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
    
    var pluginName = 'SM_Admob'

    var bannerId = "";
    var interstitialId = "";
    var rewordId = "";
    var isMobile = false;

    //=============================================================================
    // パラメータの取得
    //=============================================================================
    var paramIosBannerId            = String(PluginManager.parameters(pluginName)['IOSのバナー広告ID']);
    var paramAndroidBannerId        = String(PluginManager.parameters(pluginName)['Androidのバナー広告ID']);
    var paramIosInterstitialId      = String(PluginManager.parameters(pluginName)['IOSのインステ広告ID']);
    var paramAndroidInterstitialId  = String(PluginManager.parameters(pluginName)['Androidのインステ広告ID']);
    var paramIosRewordId            = String(PluginManager.parameters(pluginName)['IOSのリワード広告ID']);
    var paramAndroidRewordId        = String(PluginManager.parameters(pluginName)['Androidのリワード広告ID']);
    var paramRewordCommonEventId    = Number(PluginManager.parameters(pluginName)['動画リワード後のコモンイベントID']);
    var paramRewordMissCommonEventId  = Number(PluginManager.parameters(pluginName)['動画リワード読み込み失敗時のコモンイベントID']);
    var paramBannerTopFlag          = String(PluginManager.parameters(pluginName)['バナー広告の位置']) == 'true';
    var paramTestFlag               = String(PluginManager.parameters(pluginName)['テストモード']) == 'true';

    // 広告ID
    var ua = navigator.userAgent;
    if (ua.match(/Android/)) {
        bannerId = paramAndroidBannerId;
        interstitialId = paramAndroidInterstitialId
        rewordId = paramAndroidRewordId;
        isMobile = true;
    } else if (ua.match(/iPhone|iPad|iPod/)){
        bannerId = paramIosBannerId;
        interstitialId = paramIosInterstitialId;
        rewordId = paramIosRewordId;
        isMobile = true;
    } 

    if(paramTestFlag === true){
        // テスト広告
        if(bannerId){
            bannerId = 'ca-app-pub-3940256099942544/6300978111';
        }
        if(interstitialId){
            interstitialId = 'ca-app-pub-3940256099942544/8691691433';
        }
        if(rewordId){
            rewordId = 'ca-app-pub-3940256099942544/5224354917';
        }
    }

    if(isMobile){
        document.addEventListener('deviceready', function() {
            if(bannerId){
                admob.banner.config({
                    id: bannerId,
                    bannerAtTop: paramBannerTopFlag,
                    isTesting: paramTestFlag,
                    autoShow: true,
                });
                admob.banner.prepare();
                admob.banner.show();
            }
            if(interstitialId){
                admob.interstitial.config({
                    id: interstitialId,
                    isTesting: paramTestFlag,
                    autoShow: false,
                })
                admob.interstitial.prepare();
            }
            if(rewordId){
                admob.rewardvideo.config({
                    id: rewordId,
                    isTesting: paramTestFlag,
                    autoShow: false,
                });
                admob.rewardvideo.prepare();
            }
        }, false);
        if(bannerId){
            document.addEventListener('admob.banner.events.LOAD_FAIL', function(event) {

            });
        }
        if(interstitialId){
            document.addEventListener('admob.interstitial.events.LOAD', function(event) {
                isLoadInterstitial = true;
            });        
            document.addEventListener('admob.interstitial.events.LOAD_FAIL', function(event) {
                isLoadInterstitial = false;
            });
            document.addEventListener('admob.interstitial.events.CLOSE', function(event) {
                $gameSystem.replayBgm();
                isLoadInterstitial = false;
                admob.interstitial.prepare();
            });
        }
        if(rewordId){
            document.addEventListener('admob.rewardvideo.events.LOAD', function(event) {
                isLoadReword = true;
            });
            document.addEventListener('admob.rewardvideo.events.LOAD_FAIL', function(event) {
                isLoadReword = false;
            });
            document.addEventListener('admob.rewardvideo.events.REWARD', function(event) {
                //リワードの処理を実装する箇所
                reworded = true;
            });
            document.addEventListener('admob.rewardvideo.events.CLOSE', function(event) {
                //広告を閉じた時に呼ばれる。
                if(reworded){
                    $gameTemp.reserveCommonEvent(paramRewordCommonEventId);
                    reworded = false;
                }else{
                    $gameTemp.reserveCommonEvent(paramRewordMissCommonEventId);
                }
               $gameSystem.replayBgm();
               isLoadReword = false;
               admob.rewardvideo.prepare();
           });
        }
    }

    //=============================================================================
    // Game_Interpreter
    //  プラグインコマンドを追加定義します。
    //=============================================================================
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
      if (command === 'SM_インステ広告') {
        if(isMobile){ 
            if(isLoadInterstitial){
                // mute
                $gameSystem.saveBgm();
                AudioManager.fadeOutBgm(1);
                admob.interstitial.show();
            }else{
                admob.interstitial.prepare();
            }
        }
      }
      if (command === 'SM_リワード広告') {
        if(isMobile){
            if(isLoadReword){
                // mute
                $gameSystem.saveBgm();
                AudioManager.fadeOutBgm(1);
                // 表示
                admob.rewardvideo.show();                        
            }else{
                $gameTemp.reserveCommonEvent(paramRewordMissCommonEventId);
                admob.rewardvideo.prepare();
            }
         } else {
            $gameTemp.reserveCommonEvent(paramRewordMissCommonEventId);
         }
      }
    };
})();

