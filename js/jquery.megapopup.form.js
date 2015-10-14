;(function($) {
	$.fn.megaPopup = function(options) {

		var opts = $.extend({}, options);

		return this.each(function () {

			if (options == ":center") {
				to_center($(this));
			} else if (options == ":close") {
				hide($(this));
			} else {
				$(this).click(function() {
					var self  = this;
					var url   = opts.url || $(this).attr('href') || '';
					var title = opts.title || $(this).attr('title') || '';

					var identificator;

					if ($(self).data('popup_id')) {
						identificator = parseInt($(self).data('popup_id'));
					} else {
						identificator = (new Date()).getTime();
						$(self).data('popup_id', identificator);
					}

					var popup_el = $('.popup-' + identificator);

					var el_id = url.split('#')[1];
					url = url.split('#')[0];

					if (url || el_id) { // win with ajax content


						if (url.indexOf('?') > -1) {
							url += "&popup=1&rnd=" + identificator;
						} else {
							url += "?popup=1&rnd=" + identificator;
						}

						if (popup_el.size()) {
							show(popup_el);
						} else {
							new_win(identificator, url, title, el_id, self);
						}
					} else { // empty win for custom
						if (popup_el.size()) {
							show(popup_el);
						} else {
							new_win(identificator, false, title, false, self);
						}
					}

					return false;
				});
			}
		});

		function show(el) {
			var win = el.is('.popup') ? el : el.parents('.popup:first');
			win.fadeIn(300);
			to_center(win);
		}
		function hide(el) {
			var win = el.is('.popup') ? el : el.parents('.popup:first');
			win.fadeOut(300);
			$('html').css({
				'overflow' : 'auto'
			});
		}
		function to_center(el) {
			var win = el.is('.popup-win') ? el : el.find('.popup-win');
			var tp = ($(window).height() - win.outerHeight()) / 2;
			if (tp < 10) tp = 10;
			win.each(function() {
				var win = $(this);
				win.css({
					"top": tp
				})
			});
		}

		function win_create(identificator, html, title, caller) {
			var popup = $(document.createElement('div'));
			popup.attr('class', 'popup popup-' + identificator + (opts.classes ? ' ' + opts.classes : ''));
			popup.append(
				'<div class="popup-win">' +
				(title ? '<div class="title"><span>' + title + '</span></div>' : '') +
				'<div class="popup-inner">' + html + '</div><a href="#" class="popup-close icon-close"></a></div>'
			)
			$(popup).hide();
			$('body').append(popup);
			show(popup);
			popup.add(popup.find('.popup-close')).click(function() {
				hide(popup);
				return false;
			});
			popup.find(".popup-win").click(function(e) {
				e.stopPropagation();
			});
			if (opts.AfterLoad && typeof opts.AfterLoad == "function") opts.AfterLoad(identificator, popup, caller);
			return popup;
		}

		function new_win(identificator, url, title, getEl, caller) {
			if (opts.BeforeLoad && typeof opts.BeforeLoad == "function") opts.BeforeLoad(identificator);
			if (opts.includeForm && $.fn.includeForm) {
				var includeFormCallBack = opts.AfterLoad;
				opts.AfterLoad = false;
				var popup = win_create(identificator, "", title, caller);
				popup.find('.popup-inner').includeForm(url, function() {
					to_center(popup);
					if (includeFormCallBack && typeof includeFormCallBack == "function") includeFormCallBack(identificator, popup, caller);
				});

			} else if (url) {
				$.get(url,function(html) {
					if (getEl) {
						var div = document.createElement('div');
						$(div).html(html);
						html = $(div).find('#' + getEl).html();
					}
					win_create(identificator, html, title, caller);
				})
			} else {
				win_create(identificator, "", title, caller);
			}
		}

		return this;
	}
})(jQuery);



