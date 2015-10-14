(function () {

	function loader(url, callback) {
		var script = document.createElement('script');
		script.onload = script.onerror = function () {
			if (!this.executed) {
				this.executed = true;
				callback && callback();
			}
		};
		script.onreadystatechange = function () {
			var self = this;
			if (this.readyState == 'complete' || this.readyState == 'loaded') {
				setTimeout(function () {
					self.onload()
				}, 0);
			}
		};
		script.src = url;
		document.getElementsByTagName('head')[0].appendChild(script);
	}

	function init() {
		var $ = jQuery;
		CMS_WHAT_IT = window.CMS_WHAT_IT || 'Что это?';
		CMS_CALL_ME = window.CMS_CALL_ME || 'Перезвоните мне';

		var html = [
			'<div class="s3-solution-panel s3-solution-transition">',
			'	<div class="s3-solution-wrapper">',
			'		<div class="s3-solution-box s3-solution-price">',
			'			Цена сайта: <strong>' + window.CMS_SITE_PRICE + '</strong>',
			'		</div>',
			'		<div class="s3-solution-box s3-solution-buttons">',
			'			<a class="s3-solution-button" href="' + window.CMS_ABOUT_SITE + '">' + CMS_WHAT_IT + '</a>',
			'			<a class="s3-solution-button s3-solution-button-green s3-solution-button-offset" href="' + window.CMS_ABOUT_SITE + '&a=yes">' + CMS_CALL_ME + '</a>',

			(window.CMS_DESIGN_CHOICES ? '<a class="s3-solution-a" href="' + window.CMS_DESIGN_CHOICES + '">Выбрать дизайн</a>' : ''),
			(window.CMS_LINK ? '<a class="s3-solution-a" href="' + window.CMS_LINK + '">Редактировать сайт</a>' : ''),

			'		</div>',
			'		<a class="s3-solution-arrow" href="#"><img src="s3-solution-adaptive-arr.png" alt=""/></a>',
			'		<a class="s3-solution-tail" href="#"><img src="s3-solution-adaptive-arr-up.png" alt=""/></a>',
			'	</div>',
			'</div>'
		].join('\n');

		$(document.body).append(html);

		var panel = $('.s3-solution-panel');
		var btnDown = $('.s3-solution-arrow');
		var btnUp = $('.s3-solution-tail');

		btnDown.on('click', function (e) {
			e.preventDefault();
			if (panel.is(':animated')) {
				return;
			}
			panel.removeClass('s3-solution-transition').animate({
				bottom: -parseInt(panel.outerHeight(true)) + 4
			}, 500, function () {
				btnUp.fadeIn(500, function () {
					panel.addClass('s3-solution-transition');
				});
			});
		});

		btnUp.on('click', function (e) {
			e.preventDefault();
			if (panel.is(':animated')) {
				return;
			}
			panel.removeClass('s3-solution-transition').animate({
				bottom: 0
			}, 500, function () {
				panel.addClass('s3-solution-transition');
			});
			btnUp.hide();
		});
	}

	if (!window.jQuery) {
		loader('/g/libs/jquery/1.10.1/jquery.min.js', init);
	} else {
		init();
	}

})();