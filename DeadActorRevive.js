//=============================================================================
// DeadActorRevive.js
// ----------------------------------------------------------------------------
// (C) 2019 shingo.matsuno
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
//=============================================================================
//
/*:
 * @plugindesc 戦闘不能HP１プラグイン
 * @author 松野慎吾
 * @help
 *  戦闘不能になったアクターが戦闘終了後HP1で復活します。
 *
 * *
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 */

(function() {
    BattleManager.updateBattleEnd = function() {
        if (this.isBattleTest()) {
            AudioManager.stopBgm();
            SceneManager.exit();
        } else if (!this._escaped && $gameParty.isAllDead()) {
            if (this._canLose) {
                $gameParty.reviveBattleMembers();
                SceneManager.pop();
            } else {
                SceneManager.goto(Scene_Gameover);
            }
        } else {
            $gameParty.reviveBattleMembers();
            SceneManager.pop();
        }
        this._phase = null;
    };
})();

