/**
 * 基本编辑器
 * @class $kit.ui.Editor
 * @requires kit.js
 * @requires ieFix.js
 * @see <a href="https://github.com/xueduany/KitJs/blob/master/KitJs/src/js/widget/Editor/editor.js">Source code</a>
 */
$kit.ui.Editor = function(config) {
	var me = this;
	me.config = $kit.join(me.constructor.defaultConfig, config);
}
$kit.merge($kit.ui.Editor,
/**
 * @lends $kit.ui.Editor
 */
{
	/**
	 * @enum
	 */
	defaultConfig : {
		kitWidgetName : "kitEditor",
		el : undefined
	}
});
$kit.merge($kit.ui.Editor.prototype,
/**
 * @lends $kit.ui.Editor.prototype
 */
{
	/**
	 * 注册自定义事件
	 * @param {Object} config
	 * @param {String} config.ev
	 * @param {Function} config.fn
	 */
	ev : function() {
		if(arguments.length == 1) {
			var evCfg = arguments[0];
			var scope = evCfg.scope || this;
			if($kit.isFn(evCfg.fn) && $kit.isStr(evCfg.ev)) {
				var evCfg = {
					ev : evCfg.ev,
					fn : evCfg.fn,
					scope : this
				};
				this.event = this.event || {};
				this.event[evCfg.ev] = this.event[evCfg.ev] || [];
				this.event[evCfg.ev].push(evCfg);
			}
		}
	},
	/**
	 * 触发自定义事件
	 * @param {Object} config
	 * @param {String} config.ev
	 */
	newEv : function() {
		if(arguments.length == 1 && !$kit.isEmpty(this.event)) {
			var evAry, evCfg, _evCfg = {};
			if($kit.isStr(arguments[0])) {
				var ev = arguments[0];
				evAry = this.event[ev];
			} else if($kit.isObj(arguments[0])) {
				_evCfg = arguments[0];
				evAry = this.event[_evCfg.ev];
			}
			if(!$kit.isEmpty(evAry)) {
				for(var i = 0; evAry != null && i < evAry.length; i++) {
					evCfg = $kit.merge(evAry[i], _evCfg);
					var e = {
						target : this,
						type : evCfg.ev
					}
					evCfg.fn.call(evCfg.scope, e, evCfg);
				}
			}
		}
	}
});
