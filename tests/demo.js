define(['backbone.ui.slider','backbone','jquery'], function(BackboneSlider, Backbone, $) {

	/**
	 * BackboneSlider extends Backbone.Modelview.
	 */
	var Slider = BackboneSlider.extend({
		sliderOptions: {
			range: function($el) { return $el.attr('data-type') === 'range'; },
			min: function($el) { return parseInt($el.attr('data-min')) },
			max: function($el) { return parseInt($el.attr('data-max')) },
			step: function($el) { return parseInt($el.attr('data-step')) || 1; },
		//	values: [140, 390]
		},

		// override handleSlide for custom behaviour
		handleSlide: function(e, ui) {
			var $target = $(e.target),
				attribute = $target.attr('data-attribute'),
				// if ui.values is set, val is values, otherwise, use the ui.value prop
				val = ui.values || ui.value;

			console.log($target.attr('data-attribute'));
			console.log(val);

			this.model.set(attribute, val);
		},

		map: {
			'.max-price': 'maxPrice',
			'.min-price': 'minPrice',

			'.size': 'size',
		},

		data: function(model) {
			var priceRange = model.get('price') || [];

			return {
				minPrice: priceRange[0],
				maxPrice: priceRange[1],

				size: model.get('size')
			};
		},
	});



	var filter = window.filter = _.bindAll( new Backbone.Model(), 'set' );

	var slider = window.slider = new Slider({
		el: $('#slider-section'),
		slider: $('#slider-section .slider'),

		model: filter,
	})

});