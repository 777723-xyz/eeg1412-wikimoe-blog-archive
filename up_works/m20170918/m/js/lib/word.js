'use strict';

window.onload = function () {
	var KEYMAP = {
		'Java': 8,
		'Python': 9,
		'C#': 13,
		'PHP': 16,
		'JavaScript': 17,
		'Ruby': 18,
		'Perl': 20,
		'HTML': 32,
		'Scala': 33,
		'Go': 34,
		'CSS': 35,
		'Delphi': 36
	},
	    key_els = {};

	var rand = function rand() {
		var max = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
		var min = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

		var _int = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

		var gen = min + (max - min) * Math.random();
		return _int ? Math.round(gen) : gen;
	};

	(function init() {
		var a3d = document.querySelector('.a3d'),
		    f = document.createDocumentFragment(),
		    lims = [33, 41, 47, 58, 91, 127, 146],
		    len = lims.length,
		    unit = 360 / (len + 1);
		for (var p in KEYMAP) {
			var rot = document.createElement('div'),
			    key = document.createElement('div');

			//key.dataset.name = p.replace('NUM_', '');
			//key.dataset.code = KEYMAP[p];
			$(key).attr('data-name',p.replace('NUM_', ''));
			$(key).attr('data-code',KEYMAP[p]);
			key.classList.add('key');

			for (var i = 0; i < len; i++) {
				if (KEYMAP[p] < lims[i]) {
					//var hue = rand((i + .8) * unit, (i + .2) * unit, 1);
					key.style.color = 'rgb(144,144,144)';
					break;
				}
			}

			rot.classList.add('rot');

			key_els[p] = key;
			rot.appendChild(key);
			f.appendChild(rot);
		}

		a3d.appendChild(f);
	})();
	addEventListener('animationend', function (e) {
		var t = e.target;
		if (e.animationName === 'hl') t.classList.remove('vis');
	}, false);
};