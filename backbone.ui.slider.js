define(['backbone.modelview','jquery','backbone','underscore','jquery.ui.slider'],
function(ModelView          , $      , Backbone , undef      , undef            ) {

	Backbone.UI = Backbone.UI || {};

	var Slider = Backbone.UI.Slider = ModelView.extend({
		initialize: function(options) {
			ModelView.prototype.initialize.call(this, options);

			// bind slider event listeners
			_.bindAll(this,'handleSlideStart','handleSlideStop','handleSlide','handleChange')

			// sliderOptions -> directly passed to $(el).slider(sliderOptions)
			this.sliderOptions = options.sliderOptions || this.sliderOptions;

			this.$slider = options.slider || this.$el;

			this._setupSliderUI();
		},

		/**
		 * Methods to be overriden for custom behaviour.
		 */
		handleSlideStart: function(e, ui) {

		},

		handleSlideStop: function(e, ui) {

		},

		handleSlide: function(e, ui) {
			var $target = $(e.currentTarget);

			console.log($target.attr('data-id'));
			console.log(ui);
		},

		handleChange: function(e, ui) {
		//	console.log(ui);
		},


		/**
		 * Starts the slider.
		 * Links the slider to the model.
		 */
		_setupSliderUI: function() {
			var _this = this;

			this.$slider.each(function(index, el) {
				var $el = $(el);

				$el.slider(_this._evaluateSliderOptions($el, _this.sliderOptions))
					.on('slide', _this.handleSlide)
					.on('change', _this.handleChange)
					.on('slidestart', _this.handleSlideStart)
					.on('slidestop', _this.handleSlideStop);
			});
		},

		/**
		 * Evaluate the sliderOptions object on the $el's context
		 */
		_evaluateSliderOptions: function($el, options) {
			var _this = this,
				sliderOptions = {};

			_.each(options, function(value, name) {
				sliderOptions[ name ] = typeof value === 'function' ? value.call(_this, $el) : value;
			});

			return sliderOptions;
		},
	});

	return Slider;
});