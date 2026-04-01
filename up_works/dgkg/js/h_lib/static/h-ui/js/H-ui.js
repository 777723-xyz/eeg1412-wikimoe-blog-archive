/* -----------H-ui前端框架-------------
* H-ui.js v3.2
* http://www.h-ui.net/
* Created & Modified by guojunhui
* Date modified 2016-11.18
*
* Copyright 2013-2016 北京颖杰联创科技有限公司 All rights reserved.
* Licensed under MIT license.
* http://opensource.org/licenses/MIT
*
*/
/*Includes：
jquery.cookie.js v1.4.1
jquery.form.js v3.51.0
lazyload.js v1.9.3
responsive-nav.js v1.0.39
Bootstrap.modal.js v3.3.0
Bootstrap.dropdown.js v3.3.0
Bootstrap.transition.js v3.3.0
Bootstrap.tooltip.js v3.3.0
Bootstrap.popover.js v3.3.0
Bootstrap.alert.js v3.3.0
jQuery.Spinner.js
jquery.emailsuggest.js v1.0
jquery.placeholder.js
jquery.format.js
jquery.togglePassword.js
jquery.addFavorite.js
jquery.Huimodalalert.js
jquery.Huiselect.js
jquery.Huihover.js
jquery.Huifocusblur.js
jquery.Huitab.js
jquery.Huifold.js
jquery.Huitags.js
jquery.Huitextarealength.js
jquery.Huipreview.js
jquery.Huitags.js
*/

/* ========================================================================
 * jquery.cookie.js v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2006, 2014 Klaus Hartl
 * Released under the MIT license
 * ======================================================================== */
!(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD (Register as an anonymous module)
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// Node/CommonJS
		module.exports = factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}
(function ($) {
	var pluses = /\+/g;
	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}
	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}
	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}
	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}
	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}
	var config = $.cookie = function (key, value, options) {
		// Write
		if (arguments.length > 1 && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setMilliseconds(t.getMilliseconds() + days * 864e+5);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}
		// Read
		var result = key ? undefined : {},
			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling $.cookie().
			cookies = document.cookie ? document.cookie.split('; ') : [],
			i = 0,
			l = cookies.length;
		for (; i < l; i++) {
			var parts = cookies[i].split('='),
				name = decode(parts.shift()),
				cookie = parts.join('=');
			if (key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}
			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}
		return result;
	};
	config.defaults = {};
	$.removeCookie = function (key, options) {
		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};
}));

/* ========================================================================
 * jQuery Form Plugin v3.51.0 2014.06.20
 * Requires jQuery v1.5 or later
 * Copyright (c) 2014 M. Alsup
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Project repository: https://github.com/malsup/form
 * Dual licensed under the MIT and GPL licenses.
 * https://github.com/malsup/form#copyright-and-license
 * ======================================================================== */
// AMD support
(function (factory){
		"use strict";
		if (typeof define === 'function' && define.amd) {
			// using AMD; register as anon module
			define(['jquery'], factory);
		} else {
			// no AMD; invoke directly
			factory( (typeof(jQuery) != 'undefined') ? jQuery : window.Zepto );
		}
	}
	(function($) {
		"use strict";
		/*
			Usage Note:
			-----------
			Do not use both ajaxSubmit and ajaxForm on the same form.  These
			functions are mutually exclusive.  Use ajaxSubmit if you want
			to bind your own submit handler to the form.  For example,
		
			$(document).ready(function() {
				$('#myForm').on('submit', function(e) {
					e.preventDefault(); // <-- important
					$(this).ajaxSubmit({
						target: '#output'
					});
				});
			});
		
			Use ajaxForm when you want the plugin to manage all the event binding
			for you.  For example,
		
			$(document).ready(function() {
				$('#myForm').ajaxForm({
					target: '#output'
				});
			});
		
			You can also use ajaxForm with delegation (requires jQuery v1.7+), so the
			form does not have to exist when you invoke ajaxForm:
		
			$('#myForm').ajaxForm({
				delegation: true,
				target: '#output'
			});
		
			When using ajaxForm, the ajaxSubmit function will be invoked for you
			at the appropriate time.
		*/
		/**
		 * Feature detection
		 */
		var feature = {};
		feature.fileapi = $("<input type='file'/>").get(0).files !== undefined;
		feature.formdata = window.FormData !== undefined;
		var hasProp = !!$.fn.prop;
		// attr2 uses prop when it can but checks the return type for
		// an expected string.  this accounts for the case where a form 
		// contains inputs with names like "action" or "method"; in those
		// cases "prop" returns the element
		$.fn.attr2 = function() {
			if ( ! hasProp ) {
				return this.attr.apply(this, arguments);
			}
			var val = this.prop.apply(this, arguments);
			if ( ( val && val.jquery ) || typeof val === 'string' ) {
				return val;
			}
			return this.attr.apply(this, arguments);
		};
	
		/**
		 * ajaxSubmit() provides a mechanism for immediately submitting
		 * an HTML form using AJAX.
		 */
		$.fn.ajaxSubmit = function(options) {
			/*jshint scripturl:true */
			// fast fail if nothing selected (http://dev.jquery.com/ticket/2752)
			if (!this.length) {
				log('ajaxSubmit: skipping submit process - no element selected');
				return this;
			}
			var method, action, url, $form = this;
			if (typeof options == 'function') {
				options = { success: options };
			}
			else if ( options === undefined ) {
				options = {};
			}
			method = options.type || this.attr2('method');
			action = options.url  || this.attr2('action');
			url = (typeof action === 'string') ? $.trim(action) : '';
			url = url || window.location.href || '';
			if (url) {
				// clean url (don't include hash vaue)
				url = (url.match(/^([^#]+)/)||[])[1];
			}
		
			options = $.extend(true, {
				url:  url,
				success: $.ajaxSettings.success,
				type: method || $.ajaxSettings.type,
				iframeSrc: /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank'
			}, options);
		
			// hook for manipulating the form data before it is extracted;
			// convenient for use with rich editors like tinyMCE or FCKEditor
			var veto = {};
			this.trigger('form-pre-serialize', [this, options, veto]);
			if (veto.veto) {
				log('ajaxSubmit: submit vetoed via form-pre-serialize trigger');
				return this;
			}
		
			// provide opportunity to alter form data before it is serialized
			if (options.beforeSerialize && options.beforeSerialize(this, options) === false) {
				log('ajaxSubmit: submit aborted via beforeSerialize callback');
				return this;
			}
		
			var traditional = options.traditional;
			if ( traditional === undefined ) {
				traditional = $.ajaxSettings.traditional;
			}
		
			var elements = [];
			var qx, a = this.formToArray(options.semantic, elements);
			if (options.data) {
				options.extraData = options.data;
				qx = $.param(options.data, traditional);
			}
		
			// give pre-submit callback an opportunity to abort the submit
			if (options.beforeSubmit && options.beforeSubmit(a, this, options) === false) {
				log('ajaxSubmit: submit aborted via beforeSubmit callback');
				return this;
			}
		
			// fire vetoable 'validate' event
			this.trigger('form-submit-validate', [a, this, options, veto]);
			if (veto.veto) {
				log('ajaxSubmit: submit vetoed via form-submit-validate trigger');
				return this;
			}
		
			var q = $.param(a, traditional);
			if (qx) {
				q = ( q ? (q + '&' + qx) : qx );
			}
			if (options.type.toUpperCase() == 'GET') {
				options.url += (options.url.indexOf('?') >= 0 ? '&' : '?') + q;
				options.data = null;  // data is null for 'get'
			}
			else {
				options.data = q; // data is the query string for 'post'
			}
		
			var callbacks = [];
			if (options.resetForm) {
				callbacks.push(function() { $form.resetForm(); });
			}
			if (options.clearForm) {
				callbacks.push(function() { $form.clearForm(options.includeHidden); });
			}
		
			// perform a load on the target only if dataType is not provided
			if (!options.dataType && options.target) {
				var oldSuccess = options.success || function(){};
				callbacks.push(function(data) {
					var fn = options.replaceTarget ? 'replaceWith' : 'html';
					$(options.target)[fn](data).each(oldSuccess, arguments);
				});
			}
			else if (options.success) {
				callbacks.push(options.success);
			}
		
			options.success = function(data, status, xhr) { // jQuery 1.4+ passes xhr as 3rd arg
				var context = options.context || this ;    // jQuery 1.4+ supports scope context
				for (var i=0, max=callbacks.length; i < max; i++) {
					callbacks[i].apply(context, [data, status, xhr || $form, $form]);
				}
			};
		
			if (options.error) {
				var oldError = options.error;
				options.error = function(xhr, status, error) {
					var context = options.context || this;
					oldError.apply(context, [xhr, status, error, $form]);
				};
			}
		
			 if (options.complete) {
				var oldComplete = options.complete;
				options.complete = function(xhr, status) {
					var context = options.context || this;
					oldComplete.apply(context, [xhr, status, $form]);
				};
			}
		
			// are there files to upload?
		
			// [value] (issue #113), also see comment:
			// https://github.com/malsup/form/commit/588306aedba1de01388032d5f42a60159eea9228#commitcomment-2180219
			var fileInputs = $('input[type=file]:enabled', this).filter(function() { return $(this).val() !== ''; });
		
			var hasFileInputs = fileInputs.length > 0;
			var mp = 'multipart/form-data';
			var multipart = ($form.attr('enctype') == mp || $form.attr('encoding') == mp);
		
			var fileAPI = feature.fileapi && feature.formdata;
			log("fileAPI :" + fileAPI);
			var shouldUseFrame = (hasFileInputs || multipart) && !fileAPI;
		
			var jqxhr;
		
			// options.iframe allows user to force iframe mode
			// 06-NOV-09: now defaulting to iframe mode if file input is detected
			if (options.iframe !== false && (options.iframe || shouldUseFrame)) {
				// hack to fix Safari hang (thanks to Tim Molendijk for this)
				// see:  http://groups.google.com/group/jquery-dev/browse_thread/thread/36395b7ab510dd5d
				if (options.closeKeepAlive) {
					$.get(options.closeKeepAlive, function() {
						jqxhr = fileUploadIframe(a);
					});
				}
				else {
					jqxhr = fileUploadIframe(a);
				}
			}
			else if ((hasFileInputs || multipart) && fileAPI) {
				jqxhr = fileUploadXhr(a);
			}
			else {
				jqxhr = $.ajax(options);
			}
		
			$form.removeData('jqxhr').data('jqxhr', jqxhr);
		
			// clear element array
			for (var k=0; k < elements.length; k++) {
				elements[k] = null;
			}
		
			// fire 'notify' event
			this.trigger('form-submit-notify', [this, options]);
			return this;
		
			// utility fn for deep serialization
			function deepSerialize(extraData){
				var serialized = $.param(extraData, options.traditional).split('&');
				var len = serialized.length;
				var result = [];
				var i, part;
				for (i=0; i < len; i++) {
					// #252; undo param space replacement
					serialized[i] = serialized[i].replace(/\+/g,' ');
					part = serialized[i].split('=');
					// #278; use array instead of object storage, favoring array serializations
					result.push([decodeURIComponent(part[0]), decodeURIComponent(part[1])]);
				}
				return result;
			}
		
			 // XMLHttpRequest Level 2 file uploads (big hat tip to francois2metz)
			function fileUploadXhr(a) {
				var formdata = new FormData();
		
				for (var i=0; i < a.length; i++) {
					formdata.append(a[i].name, a[i].value);
				}
		
				if (options.extraData) {
					var serializedData = deepSerialize(options.extraData);
					for (i=0; i < serializedData.length; i++) {
						if (serializedData[i]) {
							formdata.append(serializedData[i][0], serializedData[i][1]);
						}
					}
				}
		
				options.data = null;
		
				var s = $.extend(true, {}, $.ajaxSettings, options, {
					contentType: false,
					processData: false,
					cache: false,
					type: method || 'POST'
				});
		
				if (options.uploadProgress) {
					// workaround because jqXHR does not expose upload property
					s.xhr = function() {
						var xhr = $.ajaxSettings.xhr();
						if (xhr.upload) {
							xhr.upload.addEventListener('progress', function(event) {
								var percent = 0;
								var position = event.loaded || event.position; /*event.position is deprecated*/
								var total = event.total;
								if (event.lengthComputable) {
									percent = Math.ceil(position / total * 100);
								}
								options.uploadProgress(event, position, total, percent);
							}, false);
						}
						return xhr;
					};
				}
		
				s.data = null;
				var beforeSend = s.beforeSend;
				s.beforeSend = function(xhr, o) {
					//Send FormData() provided by user
					if (options.formData) {
						o.data = options.formData;
					}
					else {
						o.data = formdata;
					}
					if(beforeSend) {
						beforeSend.call(this, xhr, o);
					}
				};
				return $.ajax(s);
			}
		
			// private function for handling file uploads (hat tip to YAHOO!)
			function fileUploadIframe(a) {
				var form = $form[0], el, i, s, g, id, $io, io, xhr, sub, n, timedOut, timeoutHandle;
				var deferred = $.Deferred();
		
				// #341
				deferred.abort = function(status) {
					xhr.abort(status);
				};
		
				if (a) {
					// ensure that every serialized input is still enabled
					for (i=0; i < elements.length; i++) {
						el = $(elements[i]);
						if ( hasProp ) {
							el.prop('disabled', false);
						}
						else {
							el.removeAttr('disabled');
						}
					}
				}
		
				s = $.extend(true, {}, $.ajaxSettings, options);
				s.context = s.context || s;
				id = 'jqFormIO' + (new Date().getTime());
				if (s.iframeTarget) {
					$io = $(s.iframeTarget);
					n = $io.attr2('name');
					if (!n) {
						$io.attr2('name', id);
					}
					else {
						id = n;
					}
				}
				else {
					$io = $('<iframe name="' + id + '" src="'+ s.iframeSrc +'" />');
					$io.css({ position: 'absolute', top: '-1000px', left: '-1000px' });
				}
				io = $io[0];
		
		
				xhr = { // mock object
					aborted: 0,
					responseText: null,
					responseXML: null,
					status: 0,
					statusText: 'n/a',
					getAllResponseHeaders: function() {},
					getResponseHeader: function() {},
					setRequestHeader: function() {},
					abort: function(status) {
						var e = (status === 'timeout' ? 'timeout' : 'aborted');
						log('aborting upload... ' + e);
						this.aborted = 1;
		
						try { // #214, #257
							if (io.contentWindow.document.execCommand) {
								io.contentWindow.document.execCommand('Stop');
							}
						}
						catch(ignore) {}
		
						$io.attr('src', s.iframeSrc); // abort op in progress
						xhr.error = e;
						if (s.error) {
							s.error.call(s.context, xhr, e, status);
						}
						if (g) {
							$.event.trigger("ajaxError", [xhr, s, e]);
						}
						if (s.complete) {
							s.complete.call(s.context, xhr, e);
						}
					}
				};
		
				g = s.global;
				// trigger ajax global events so that activity/block indicators work like normal
				if (g && 0 === $.active++) {
					$.event.trigger("ajaxStart");
				}
				if (g) {
					$.event.trigger("ajaxSend", [xhr, s]);
				}
		
				if (s.beforeSend && s.beforeSend.call(s.context, xhr, s) === false) {
					if (s.global) {
						$.active--;
					}
					deferred.reject();
					return deferred;
				}
				if (xhr.aborted) {
					deferred.reject();
					return deferred;
				}
		
				// add submitting element to data if we know it
				sub = form.clk;
				if (sub) {
					n = sub.name;
					if (n && !sub.disabled) {
						s.extraData = s.extraData || {};
						s.extraData[n] = sub.value;
						if (sub.type == "image") {
							s.extraData[n+'.x'] = form.clk_x;
							s.extraData[n+'.y'] = form.clk_y;
						}
					}
				}
		
				var CLIENT_TIMEOUT_ABORT = 1;
				var SERVER_ABORT = 2;
						
				function getDoc(frame) {
					/* it looks like contentWindow or contentDocument do not
					 * carry the protocol property in ie8, when running under ssl
					 * frame.document is the only valid response document, since
					 * the protocol is know but not on the other two objects. strange?
					 * "Same origin policy" http://en.wikipedia.org/wiki/Same_origin_policy
					 */
					
					var doc = null;
					
					// IE8 cascading access check
					try {
						if (frame.contentWindow) {
							doc = frame.contentWindow.document;
						}
					} catch(err) {
						// IE8 access denied under ssl & missing protocol
						log('cannot get iframe.contentWindow document: ' + err);
					}
		
					if (doc) { // successful getting content
						return doc;
					}
		
					try { // simply checking may throw in ie8 under ssl or mismatched protocol
						doc = frame.contentDocument ? frame.contentDocument : frame.document;
					} catch(err) {
						// last attempt
						log('cannot get iframe.contentDocument: ' + err);
						doc = frame.document;
					}
					return doc;
				}
		
				// Rails CSRF hack (thanks to Yvan Barthelemy)
				var csrf_token = $('meta[name=csrf-token]').attr('content');
				var csrf_param = $('meta[name=csrf-param]').attr('content');
				if (csrf_param && csrf_token) {
					s.extraData = s.extraData || {};
					s.extraData[csrf_param] = csrf_token;
				}
		
				// take a breath so that pending repaints get some cpu time before the upload starts
				function doSubmit() {
					// make sure form attrs are set
					var t = $form.attr2('target'), 
						a = $form.attr2('action'), 
						mp = 'multipart/form-data',
						et = $form.attr('enctype') || $form.attr('encoding') || mp;
		
					// update form attrs in IE friendly way
					form.setAttribute('target',id);
					if (!method || /post/i.test(method) ) {
						form.setAttribute('method', 'POST');
					}
					if (a != s.url) {
						form.setAttribute('action', s.url);
					}
		
					// ie borks in some cases when setting encoding
					if (! s.skipEncodingOverride && (!method || /post/i.test(method))) {
						$form.attr({
							encoding: 'multipart/form-data',
							enctype:  'multipart/form-data'
						});
					}
		
					// support timout
					if (s.timeout) {
						timeoutHandle = setTimeout(function() { timedOut = true; cb(CLIENT_TIMEOUT_ABORT); }, s.timeout);
					}
		
					// look for server aborts
					function checkState() {
						try {
							var state = getDoc(io).readyState;
							log('state = ' + state);
							if (state && state.toLowerCase() == 'uninitialized') {
								setTimeout(checkState,50);
							}
						}
						catch(e) {
							log('Server abort: ' , e, ' (', e.name, ')');
							cb(SERVER_ABORT);
							if (timeoutHandle) {
								clearTimeout(timeoutHandle);
							}
							timeoutHandle = undefined;
						}
					}
		
					// add "extra" data to form if provided in options
					var extraInputs = [];
					try {
						if (s.extraData) {
							for (var n in s.extraData) {
								if (s.extraData.hasOwnProperty(n)) {
								   // if using the $.param format that allows for multiple values with the same name
								   if($.isPlainObject(s.extraData[n]) && s.extraData[n].hasOwnProperty('name') && s.extraData[n].hasOwnProperty('value')) {
									   extraInputs.push(
									   $('<input type="hidden" name="'+s.extraData[n].name+'">').val(s.extraData[n].value)
										   .appendTo(form)[0]);
								   } else {
									   extraInputs.push(
									   $('<input type="hidden" name="'+n+'">').val(s.extraData[n])
										   .appendTo(form)[0]);
								   }
								}
							}
						}
		
						if (!s.iframeTarget) {
							// add iframe to doc and submit the form
							$io.appendTo('body');
						}
						if (io.attachEvent) {
							io.attachEvent('onload', cb);
						}
						else {
							io.addEventListener('load', cb, false);
						}
						setTimeout(checkState,15);
		
						try {
							form.submit();
						} catch(err) {
							// just in case form has element with name/id of 'submit'
							var submitFn = document.createElement('form').submit;
							submitFn.apply(form);
						}
					}
					finally {
						// reset attrs and remove "extra" input elements
						form.setAttribute('action',a);
						form.setAttribute('enctype', et); // #380
						if(t) {
							form.setAttribute('target', t);
						} else {
							$form.removeAttr('target');
						}
						$(extraInputs).remove();
					}
				}
		
				if (s.forceSync) {
					doSubmit();
				}
				else {
					setTimeout(doSubmit, 10); // this lets dom updates render
				}
		
				var data, doc, domCheckCount = 50, callbackProcessed;
		
				function cb(e) {
					if (xhr.aborted || callbackProcessed) {
						return;
					}
					
					doc = getDoc(io);
					if(!doc) {
						log('cannot access response document');
						e = SERVER_ABORT;
					}
					if (e === CLIENT_TIMEOUT_ABORT && xhr) {
						xhr.abort('timeout');
						deferred.reject(xhr, 'timeout');
						return;
					}
					else if (e == SERVER_ABORT && xhr) {
						xhr.abort('server abort');
						deferred.reject(xhr, 'error', 'server abort');
						return;
					}
		
					if (!doc || doc.location.href == s.iframeSrc) {
						// response not received yet
						if (!timedOut) {
							return;
						}
					}
					if (io.detachEvent) {
						io.detachEvent('onload', cb);
					}
					else {
						io.removeEventListener('load', cb, false);
					}
		
					var status = 'success', errMsg;
					try {
						if (timedOut) {
							throw 'timeout';
						}
		
						var isXml = s.dataType == 'xml' || doc.XMLDocument || $.isXMLDoc(doc);
						log('isXml='+isXml);
						if (!isXml && window.opera && (doc.body === null || !doc.body.innerHTML)) {
							if (--domCheckCount) {
								// in some browsers (Opera) the iframe DOM is not always traversable when
								// the onload callback fires, so we loop a bit to accommodate
								log('requeing onLoad callback, DOM not available');
								setTimeout(cb, 250);
								return;
							}
							// let this fall through because server response could be an empty document
							//log('Could not access iframe DOM after mutiple tries.');
							//throw 'DOMException: not available';
						}
		
						//log('response detected');
						var docRoot = doc.body ? doc.body : doc.documentElement;
						xhr.responseText = docRoot ? docRoot.innerHTML : null;
						xhr.responseXML = doc.XMLDocument ? doc.XMLDocument : doc;
						if (isXml) {
							s.dataType = 'xml';
						}
						xhr.getResponseHeader = function(header){
							var headers = {'content-type': s.dataType};
							return headers[header.toLowerCase()];
						};
						// support for XHR 'status' & 'statusText' emulation :
						if (docRoot) {
							xhr.status = Number( docRoot.getAttribute('status') ) || xhr.status;
							xhr.statusText = docRoot.getAttribute('statusText') || xhr.statusText;
						}
		
						var dt = (s.dataType || '').toLowerCase();
						var scr = /(json|script|text)/.test(dt);
						if (scr || s.textarea) {
							// see if user embedded response in textarea
							var ta = doc.getElementsByTagName('textarea')[0];
							if (ta) {
								xhr.responseText = ta.value;
								// support for XHR 'status' & 'statusText' emulation :
								xhr.status = Number( ta.getAttribute('status') ) || xhr.status;
								xhr.statusText = ta.getAttribute('statusText') || xhr.statusText;
							}
							else if (scr) {
								// account for browsers injecting pre around json response
								var pre = doc.getElementsByTagName('pre')[0];
								var b = doc.getElementsByTagName('body')[0];
								if (pre) {
									xhr.responseText = pre.textContent ? pre.textContent : pre.innerText;
								}
								else if (b) {
									xhr.responseText = b.textContent ? b.textContent : b.innerText;
								}
							}
						}
						else if (dt == 'xml' && !xhr.responseXML && xhr.responseText) {
							xhr.responseXML = toXml(xhr.responseText);
						}
		
						try {
							data = httpData(xhr, dt, s);
						}
						catch (err) {
							status = 'parsererror';
							xhr.error = errMsg = (err || status);
						}
					}
					catch (err) {
						log('error caught: ',err);
						status = 'error';
						xhr.error = errMsg = (err || status);
					}
		
					if (xhr.aborted) {
						log('upload aborted');
						status = null;
					}
		
					if (xhr.status) { // we've set xhr.status
						status = (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) ? 'success' : 'error';
					}
		
					// ordering of these callbacks/triggers is odd, but that's how $.ajax does it
					if (status === 'success') {
						if (s.success) {
							s.success.call(s.context, data, 'success', xhr);
						}
						deferred.resolve(xhr.responseText, 'success', xhr);
						if (g) {
							$.event.trigger("ajaxSuccess", [xhr, s]);
						}
					}
					else if (status) {
						if (errMsg === undefined) {
							errMsg = xhr.statusText;
						}
						if (s.error) {
							s.error.call(s.context, xhr, status, errMsg);
						}
						deferred.reject(xhr, 'error', errMsg);
						if (g) {
							$.event.trigger("ajaxError", [xhr, s, errMsg]);
						}
					}
		
					if (g) {
						$.event.trigger("ajaxComplete", [xhr, s]);
					}
		
					if (g && ! --$.active) {
						$.event.trigger("ajaxStop");
					}
		
					if (s.complete) {
						s.complete.call(s.context, xhr, status);
					}
		
					callbackProcessed = true;
					if (s.timeout) {
						clearTimeout(timeoutHandle);
					}
		
					// clean up
					setTimeout(function() {
						if (!s.iframeTarget) {
							$io.remove();
						}
						else { //adding else to clean up existing iframe response.
							$io.attr('src', s.iframeSrc);
						}
						xhr.responseXML = null;
					}, 100);
				}
		
				var toXml = $.parseXML || function(s, doc) { // use parseXML if available (jQuery 1.5+)
					if (window.ActiveXObject) {
						doc = new ActiveXObject('Microsoft.XMLDOM');
						doc.async = 'false';
						doc.loadXML(s);
					}
					else {
						doc = (new DOMParser()).parseFromString(s, 'text/xml');
					}
					return (doc && doc.documentElement && doc.documentElement.nodeName != 'parsererror') ? doc : null;
				};
				var parseJSON = $.parseJSON || function(s) {
					/*jslint evil:true */
					return window['eval']('(' + s + ')');
				};
		
				var httpData = function( xhr, type, s ) { // mostly lifted from jq1.4.4
		
					var ct = xhr.getResponseHeader('content-type') || '',
						xml = type === 'xml' || !type && ct.indexOf('xml') >= 0,
						data = xml ? xhr.responseXML : xhr.responseText;
		
					if (xml && data.documentElement.nodeName === 'parsererror') {
						if ($.error) {
							$.error('parsererror');
						}
					}
					if (s && s.dataFilter) {
						data = s.dataFilter(data, type);
					}
					if (typeof data === 'string') {
						if (type === 'json' || !type && ct.indexOf('json') >= 0) {
							data = parseJSON(data);
						} else if (type === "script" || !type && ct.indexOf("javascript") >= 0) {
							$.globalEval(data);
						}
					}
					return data;
				};
		
				return deferred;
			}
		};
	
		/**
		 * ajaxForm() provides a mechanism for fully automating form submission.
		 *
		 * The advantages of using this method instead of ajaxSubmit() are:
		 *
		 * 1: This method will include coordinates for <input type="image" /> elements (if the element
		 *    is used to submit the form).
		 * 2. This method will include the submit element's name/value data (for the element that was
		 *    used to submit the form).
		 * 3. This method binds the submit() method to the form for you.
		 *
		 * The options argument for ajaxForm works exactly as it does for ajaxSubmit.  ajaxForm merely
		 * passes the options argument along after properly binding events for submit elements and
		 * the form itself.
		 */
		$.fn.ajaxForm = function(options) {
			options = options || {};
			options.delegation = options.delegation && $.isFunction($.fn.on);
		
			// in jQuery 1.3+ we can fix mistakes with the ready state
			if (!options.delegation && this.length === 0) {
				var o = { s: this.selector, c: this.context };
				if (!$.isReady && o.s) {
					log('DOM not ready, queuing ajaxForm');
					$(function() {
						$(o.s,o.c).ajaxForm(options);
					});
					return this;
				}
				// is your DOM ready?  http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
				log('terminating; zero elements found by selector' + ($.isReady ? '' : ' (DOM not ready)'));
				return this;
			}
		
			if ( options.delegation ) {
				$(document)
					.off('submit.form-plugin', this.selector, doAjaxSubmit)
					.off('click.form-plugin', this.selector, captureSubmittingElement)
					.on('submit.form-plugin', this.selector, options, doAjaxSubmit)
					.on('click.form-plugin', this.selector, options, captureSubmittingElement);
				return this;
			}
		
			return this.ajaxFormUnbind()
				.on('submit.form-plugin', options, doAjaxSubmit)
				.on('click.form-plugin', options, captureSubmittingElement);
		};
	
		// private event handlers
		function doAjaxSubmit(e) {
			/*jshint validthis:true */
			var options = e.data;
			if (!e.isDefaultPrevented()) { // if event has been canceled, don't proceed
				e.preventDefault();
				$(e.target).ajaxSubmit(options); // #365
			}
		}
	
		function captureSubmittingElement(e) {
			/*jshint validthis:true */
			var target = e.target;
			var $el = $(target);
			if (!($el.is("[type=submit],[type=image]"))) {
				// is this a child element of the submit el?  (ex: a span within a button)
				var t = $el.closest('[type=submit]');
				if (t.length === 0) {
					return;
				}
				target = t[0];
			}
			var form = this;
			form.clk = target;
			if (target.type == 'image') {
				if (e.offsetX !== undefined) {
					form.clk_x = e.offsetX;
					form.clk_y = e.offsetY;
				} else if (typeof $.fn.offset == 'function') {
					var offset = $el.offset();
					form.clk_x = e.pageX - offset.left;
					form.clk_y = e.pageY - offset.top;
				} else {
					form.clk_x = e.pageX - target.offsetLeft;
					form.clk_y = e.pageY - target.offsetTop;
				}
			}
			// clear form vars
			setTimeout(function() { form.clk = form.clk_x = form.clk_y = null; }, 100);
		}
	
		// ajaxFormUnbind unbinds the event handlers that were bound by ajaxForm
		$.fn.ajaxFormUnbind = function() {
			return this.unbind('submit.form-plugin click.form-plugin');
		};
	
		/**
		 * formToArray() gathers form element data into an array of objects that can
		 * be passed to any of the following ajax functions: $.get, $.post, or load.
		 * Each object in the array has both a 'name' and 'value' property.  An example of
		 * an array for a simple login form might be:
		 *
		 * [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ]
		 *
		 * It is this array that is passed to pre-submit callback functions provided to the
		 * ajaxSubmit() and ajaxForm() methods.
		 */
		$.fn.formToArray = function(semantic, elements) {
			var a = [];
			if (this.length === 0) {
				return a;
			}
		
			var form = this[0];
			var formId = this.attr('id');
			var els = semantic ? form.getElementsByTagName('*') : form.elements;
			var els2;
		
			if (els && !/MSIE [678]/.test(navigator.userAgent)) { // #390
				els = $(els).get();  // convert to standard array
			}
		
			// #386; account for inputs outside the form which use the 'form' attribute
			if ( formId ) {
				els2 = $(':input[form="' + formId + '"]').get(); // hat tip @thet
				if ( els2.length ) {
					els = (els || []).concat(els2);
				}
			}
		
			if (!els || !els.length) {
				return a;
			}
		
			var i,j,n,v,el,max,jmax;
			for(i=0, max=els.length; i < max; i++) {
				el = els[i];
				n = el.name;
				if (!n || el.disabled) {
					continue;
				}
		
				if (semantic && form.clk && el.type == "image") {
					// handle image inputs on the fly when semantic == true
					if(form.clk == el) {
						a.push({name: n, value: $(el).val(), type: el.type });
						a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
					}
					continue;
				}
		
				v = $.fieldValue(el, true);
				if (v && v.constructor == Array) {
					if (elements) {
						elements.push(el);
					}
					for(j=0, jmax=v.length; j < jmax; j++) {
						a.push({name: n, value: v[j]});
					}
				}
				else if (feature.fileapi && el.type == 'file') {
					if (elements) {
						elements.push(el);
					}
					var files = el.files;
					if (files.length) {
						for (j=0; j < files.length; j++) {
							a.push({name: n, value: files[j], type: el.type});
						}
					}
					else {
						// #180
						a.push({ name: n, value: '', type: el.type });
					}
				}
				else if (v !== null && typeof v != 'undefined') {
					if (elements) {
						elements.push(el);
					}
					a.push({name: n, value: v, type: el.type, required: el.required});
				}
			}
		
			if (!semantic && form.clk) {
				// input type=='image' are not found in elements array! handle it here
				var $input = $(form.clk), input = $input[0];
				n = input.name;
				if (n && !input.disabled && input.type == 'image') {
					a.push({name: n, value: $input.val()});
					a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
				}
			}
			return a;
		};
	
		/**
		 * Serializes form data into a 'submittable' string. This method will return a string
		 * in the format: name1=value1&amp;name2=value2
		 */
		$.fn.formSerialize = function(semantic) {
			//hand off to jQuery.param for proper encoding
			return $.param(this.formToArray(semantic));
		};
	
		/**
		 * Serializes all field elements in the jQuery object into a query string.
		 * This method will return a string in the format: name1=value1&amp;name2=value2
		 */
		$.fn.fieldSerialize = function(successful) {
			var a = [];
			this.each(function() {
				var n = this.name;
				if (!n) {
					return;
				}
				var v = $.fieldValue(this, successful);
				if (v && v.constructor == Array) {
					for (var i=0,max=v.length; i < max; i++) {
						a.push({name: n, value: v[i]});
					}
				}
				else if (v !== null && typeof v != 'undefined') {
					a.push({name: this.name, value: v});
				}
			});
			//hand off to jQuery.param for proper encoding
			return $.param(a);
		};
	
		/**
		 * Returns the value(s) of the element in the matched set.  For example, consider the following form:
		 *
		 *  <form><fieldset>
		 *      <input name="A" type="text" />
		 *      <input name="A" type="text" />
		 *      <input name="B" type="checkbox" value="B1" />
		 *      <input name="B" type="checkbox" value="B2"/>
		 *      <input name="C" type="radio" value="C1" />
		 *      <input name="C" type="radio" value="C2" />
		 *  </fieldset></form>
		 *
		 *  var v = $('input[type=text]').fieldValue();
		 *  // if no values are entered into the text inputs
		 *  v == ['','']
		 *  // if values entered into the text inputs are 'foo' and 'bar'
		 *  v == ['foo','bar']
		 *
		 *  var v = $('input[type=checkbox]').fieldValue();
		 *  // if neither checkbox is checked
		 *  v === undefined
		 *  // if both checkboxes are checked
		 *  v == ['B1', 'B2']
		 *
		 *  var v = $('input[type=radio]').fieldValue();
		 *  // if neither radio is checked
		 *  v === undefined
		 *  // if first radio is checked
		 *  v == ['C1']
		 *
		 * The successful argument controls whether or not the field element must be 'successful'
		 * (per http://www.w3.org/TR/html4/interact/forms.html#successful-controls).
		 * The default value of the successful argument is true.  If this value is false the value(s)
		 * for each element is returned.
		 *
		 * Note: This method *always* returns an array.  If no valid value can be determined the
		 *    array will be empty, otherwise it will contain one or more values.
		 */
		$.fn.fieldValue = function(successful) {
			for (var val=[], i=0, max=this.length; i < max; i++) {
				var el = this[i];
				var v = $.fieldValue(el, successful);
				if (v === null || typeof v == 'undefined' || (v.constructor == Array && !v.length)) {
					continue;
				}
				if (v.constructor == Array) {
					$.merge(val, v);
				}
				else {
					val.push(v);
				}
			}
			return val;
		};
	
		/**
		 * Returns the value of the field element.
		 */
		$.fieldValue = function(el, successful) {
			var n = el.name, t = el.type, tag = el.tagName.toLowerCase();
			if (successful === undefined) {
				successful = true;
			}
		
			if (successful && (!n || el.disabled || t == 'reset' || t == 'button' ||
				(t == 'checkbox' || t == 'radio') && !el.checked ||
				(t == 'submit' || t == 'image') && el.form && el.form.clk != el ||
				tag == 'select' && el.selectedIndex == -1)) {
					return null;
			}
		
			if (tag == 'select') {
				var index = el.selectedIndex;
				if (index < 0) {
					return null;
				}
				var a = [], ops = el.options;
				var one = (t == 'select-one');
				var max = (one ? index+1 : ops.length);
				for(var i=(one ? index : 0); i < max; i++) {
					var op = ops[i];
					if (op.selected) {
						var v = op.value;
						if (!v) { // extra pain for IE...
							v = (op.attributes && op.attributes.value && !(op.attributes.value.specified)) ? op.text : op.value;
						}
						if (one) {
							return v;
						}
						a.push(v);
					}
				}
				return a;
			}
			return $(el).val();
		};
	
		/**
		 * Clears the form data.  Takes the following actions on the form's input fields:
		 *  - input text fields will have their 'value' property set to the empty string
		 *  - select elements will have their 'selectedIndex' property set to -1
		 *  - checkbox and radio inputs will have their 'checked' property set to false
		 *  - inputs of type submit, button, reset, and hidden will *not* be effected
		 *  - button elements will *not* be effected
		 */
		$.fn.clearForm = function(includeHidden) {
			return this.each(function() {
				$('input,select,textarea', this).clearFields(includeHidden);
			});
		};
		
		/**
		 * Clears the selected form elements.
		 */
		$.fn.clearFields = $.fn.clearInputs = function(includeHidden) {
			var re = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i; // 'hidden' is not in this list
			return this.each(function() {
				var t = this.type, tag = this.tagName.toLowerCase();
				if (re.test(t) || tag == 'textarea') {
					this.value = '';
				}
				else if (t == 'checkbox' || t == 'radio') {
					this.checked = false;
				}
				else if (tag == 'select') {
					this.selectedIndex = -1;
				}
				else if (t == "file") {
					if (/MSIE/.test(navigator.userAgent)) {
						$(this).replaceWith($(this).clone(true));
					} else {
						$(this).val('');
					}
				}
				else if (includeHidden) {
					// includeHidden can be the value true, or it can be a selector string
					// indicating a special test; for example:
					//  $('#myForm').clearForm('.special:hidden')
					// the above would clean hidden inputs that have the class of 'special'
					if ( (includeHidden === true && /hidden/.test(t)) ||
						 (typeof includeHidden == 'string' && $(this).is(includeHidden)) ) {
						this.value = '';
					}
				}
			});
		};
	
		/**
		 * Resets the form data.  Causes all form elements to be reset to their original value.
		 */
		$.fn.resetForm = function() {
			return this.each(function() {
				// guard against an input with the name of 'reset'
				// note that IE reports the reset function as an 'object'
				if (typeof this.reset == 'function' || (typeof this.reset == 'object' && !this.reset.nodeType)) {
					this.reset();
				}
			});
		};
	
		/**
		 * Enables or disables any matching elements.
		 */
		$.fn.enable = function(b) {
			if (b === undefined) {
				b = true;
			}
			return this.each(function() {
				this.disabled = !b;
			});
		};
	
		/**
		 * Checks/unchecks any matching checkboxes or radio buttons and
		 * selects/deselects and matching option elements.
		 */
		$.fn.selected = function(select) {
			if (select === undefined) {
				select = true;
			}
			return this.each(function() {
				var t = this.type;
				if (t == 'checkbox' || t == 'radio') {
					this.checked = select;
				}
				else if (this.tagName.toLowerCase() == 'option') {
					var $sel = $(this).parent('select');
					if (select && $sel[0] && $sel[0].type == 'select-one') {
						// deselect all other options
						$sel.find('option').selected(false);
					}
					this.selected = select;
				}
			});
		};
		
		// expose debug var
		$.fn.ajaxSubmit.debug = false;
		function log() {
			if (!$.fn.ajaxSubmit.debug) {
				return;
			}
			var msg = '[jquery.form] ' + Array.prototype.join.call(arguments,'');
			if (window.console && window.console.log) {
				window.console.log(msg);
			}
			else if (window.opera && window.opera.postError) {
				window.opera.postError(msg);
			}
		}
	})
);

/* ========================================================================
 * lazyload v1.9.3
 * Lazy Load - jQuery plugin for lazy loading images
 * Copyright (c) 2007-2013 Mika Tuupola
 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
 * Project home: http://www.appelsiini.net/projects/lazyload
 * ======================================================================== */
!(function($, window, document, undefined) {
	var $window = $(window);
	$.fn.lazyload = function(options) {
		var elements = this;
		var $container;
		var settings = {
			threshold       : 0,
			failure_limit   : 0,
			event           : "scroll",
			effect          : "show",
			container       : window,
			data_attribute  : "original",
			skip_invisible  : true,
			appear          : null,
			load            : null,
			placeholder     : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
		};
		function update() {
			var counter = 0;
			elements.each(function() {
				var $this = $(this);
				if (settings.skip_invisible && !$this.is(":visible")) {
					return;
				}
				if ($.abovethetop(this, settings) ||
					$.leftofbegin(this, settings)) {
						/* Nothing. */
				} else if (!$.belowthefold(this, settings) &&
					!$.rightoffold(this, settings)) {
						$this.trigger("appear");
						/* if we found an image we'll load, reset the counter */
						counter = 0;
				} else {
					if (++counter > settings.failure_limit) {
						return false;
					}
				}
			});
		}
		if(options) {
			/* Maintain BC for a couple of versions. */
			if (undefined !== options.failurelimit) {
				options.failure_limit = options.failurelimit;
				delete options.failurelimit;
			}
			if (undefined !== options.effectspeed) {
				options.effect_speed = options.effectspeed;
				delete options.effectspeed;
			}
			$.extend(settings, options);
		}

		/* Cache container as jQuery as object. */
		$container = (settings.container === undefined || settings.container === window) ? $window : $(settings.container);

		/* Fire one scroll event per scroll. Not one scroll event per image. */
		if (0 === settings.event.indexOf("scroll")) {
			$container.on(settings.event, function() {
				return update();
			});
		}
		this.each(function() {
			var self = this;
			var $self = $(self);
			self.loaded = false;

			/* If no src attribute given use data:uri. */
			if ($self.attr("src") === undefined || $self.attr("src") === false) {
				if ($self.is("img")) {
					$self.attr("src", settings.placeholder);
				}
			}

			/* When appear is triggered load original image. */
			$self.one("appear", function() {
				if (!this.loaded) {
					if (settings.appear) {
						var elements_left = elements.length;
						settings.appear.call(self, elements_left, settings);
					}
					$("<img />").on("load", function() {	
						var original = $self.attr("data-" + settings.data_attribute);
						$self.hide();
						if ($self.is("img")) {
							$self.attr("src", original);
						} else {
							$self.css("background-image", "url('" + original + "')");
						}
						$self[settings.effect](settings.effect_speed);	
						self.loaded = true;
			
						/* Remove image from array so it is not looped next time. */
						var temp = $.grep(elements, function(element) {
							return !element.loaded;
						});
						elements = $(temp);	
						if (settings.load){
							var elements_left = elements.length;
							settings.load.call(self, elements_left, settings);
						}
					}).attr("src", $self.attr("data-" + settings.data_attribute));
				}
			});
	
			/* When wanted event is triggered load original image */
			/* by triggering appear.                              */
			if (0 !== settings.event.indexOf("scroll")) {
				$self.on(settings.event, function() {
					if (!self.loaded) {
						$self.trigger("appear");
					}
				});
			}
		});
	
		/* Check if something appears when window is resized. */
		$window.on("resize", function() {
			update();
		});
		
		/* With IOS5 force loading images when navigating with back button. */
		/* Non optimal workaround. */
		if ((/(?:iphone|ipod|ipad).*os 5/gi).test(navigator.appVersion)) {
			$window.on("pageshow", function(event) {
				if (event.originalEvent && event.originalEvent.persisted) {
					elements.each(function() {
						$(this).trigger("appear");
					});
				}
			});
		}
	
		/* Force initial check if images should appear. */
		$(document).ready(function() {
			update();
		});	
		return this;
	};
	
	/* Convenience methods in jQuery namespace.           */
	/* Use as  $.belowthefold(element, {threshold : 100, container : window}) */	
	$.belowthefold = function(element, settings) {
		var fold;	
		if (settings.container === undefined || settings.container === window) {
			fold = (window.innerHeight ? window.innerHeight : $window.height()) + $window.scrollTop();
		} else {
			fold = $(settings.container).offset().top + $(settings.container).height();
		}	
		return fold <= $(element).offset().top - settings.threshold;
	};
	
	$.rightoffold = function(element, settings) {
		var fold;	
		if (settings.container === undefined || settings.container === window) {
			fold = $window.width() + $window.scrollLeft();
		} else {
			fold = $(settings.container).offset().left + $(settings.container).width();
		}	
		return fold <= $(element).offset().left - settings.threshold;
	};
	
	$.abovethetop = function(element, settings) {
		var fold;	
		if (settings.container === undefined || settings.container === window) {
			fold = $window.scrollTop();
		} else {
			fold = $(settings.container).offset().top;
		}	
		return fold >= $(element).offset().top + settings.threshold  + $(element).height();
	};
	
	$.leftofbegin = function(element, settings) {
		var fold;		
		if (settings.container === undefined || settings.container === window) {
			fold = $window.scrollLeft();
		} else {
			fold = $(settings.container).offset().left;
		}	
		return fold >= $(element).offset().left + settings.threshold + $(element).width();
	};
	
	$.inviewport = function(element, settings) {
		return !$.rightoffold(element, settings) && !$.leftofbegin(element, settings) &&
		!$.belowthefold(element, settings) && !$.abovethetop(element, settings);
	};
	
	/* Custom selectors for your convenience.   */
	/* Use as $("img:below-the-fold").something() or */
	/* $("img").filter(":below-the-fold").something() which is faster */
	$.extend($.expr[":"], {
		"below-the-fold" : function(a) { return $.belowthefold(a, {threshold : 0}); },
		"above-the-top"  : function(a) { return !$.belowthefold(a, {threshold : 0}); },
		"right-of-screen": function(a) { return $.rightoffold(a, {threshold : 0}); },
		"left-of-screen" : function(a) { return !$.rightoffold(a, {threshold : 0}); },
		"in-viewport"    : function(a) { return $.inviewport(a, {threshold : 0}); },
		/* Maintain BC for couple of versions. */
		"above-the-fold" : function(a) { return !$.belowthefold(a, {threshold : 0}); },
		"right-of-fold"  : function(a) { return $.rightoffold(a, {threshold : 0}); },
		"left-of-fold"   : function(a) { return !$.rightoffold(a, {threshold : 0}); }
	});
})(jQuery, window, document);

/* ========================================================================
* responsive-nav.js v1.0.39
* https://github.com/viljamis/responsive-nav.js
* http://responsive-nav.com
*
* Copyright (c) 2015 @viljamis
* Available under the MIT license
 * ======================================================================== */

/* global Event */
(function (document, window, index) {
// Index is used to keep multiple navs on the same page namespaced
	"use strict";
	var responsiveNav = function (el, options) {
		var computed = !!window.getComputedStyle;

		/**
		* getComputedStyle polyfill for old browsers
		*/
		if (!computed) {
			window.getComputedStyle = function(el) {
				this.el = el;
				this.getPropertyValue = function(prop) {
					var re = /(\-([a-z]){1})/g;
					if (prop === "float") {
						prop = "styleFloat";
					}
					if (re.test(prop)) {
						prop = prop.replace(re, function () {
							return arguments[2].toUpperCase();
						});
					}
					return el.currentStyle[prop] ? el.currentStyle[prop] : null;
				};
				return this;
			};
		}
		/* exported addEvent, removeEvent, getChildren, setAttributes, addClass, removeClass, forEach */
		
		/**
		* Add Event
		* fn arg can be an object or a function, thanks to handleEvent
		* read more at: http://www.thecssninja.com/javascript/handleevent
		*
		* @param  {element}  element
		* @param  {event}    event
		* @param  {Function} fn
		* @param  {boolean}  bubbling
		*/
		var addEvent = function (el, evt, fn, bubble) {
			if ("addEventListener" in el) {
			// BBOS6 doesn't support handleEvent, catch and polyfill
			try {
				el.addEventListener(evt, fn, bubble);
			} catch (e) {
				if (typeof fn === "object" && fn.handleEvent) {
					el.addEventListener(evt, function (e) {
						// Bind fn as this and set first arg as event object
						fn.handleEvent.call(fn, e);
					}, bubble);
				} else {
					throw e;
				}
			}
		} else if ("attachEvent" in el) {
			// check if the callback is an object and contains handleEvent
			if (typeof fn === "object" && fn.handleEvent) {
				el.attachEvent("on" + evt, function () {
					// Bind fn as this
					fn.handleEvent.call(fn);
				});
			} else {
				el.attachEvent("on" + evt, fn);
			}
		}
	},

	/**
	* Remove Event
	*
	* @param  {element}  element
	* @param  {event}    event
	* @param  {Function} fn
	* @param  {boolean}  bubbling
	*/
	removeEvent = function (el, evt, fn, bubble) {
		if ("removeEventListener" in el) {
			try {
				el.removeEventListener(evt, fn, bubble);
			} catch (e) {
				if (typeof fn === "object" && fn.handleEvent) {
					el.removeEventListener(evt, function (e) {
						fn.handleEvent.call(fn, e);
					}, bubble);
				} else {
					throw e;
				}
			}
		} else if ("detachEvent" in el) {
			if (typeof fn === "object" && fn.handleEvent) {
				el.detachEvent("on" + evt, function () {
					fn.handleEvent.call(fn);
				});
			} else {
				el.detachEvent("on" + evt, fn);
			}
		}
	},

	/**
	* Get the children of any element
	*
	* @param  {element}
	* @return {array} Returns matching elements in an array
	*/
	getChildren = function (e) {
		if (e.children.length < 1) {
			throw new Error("The Nav container has no containing elements");
		}
		// Store all children in array
		var children = [];
		// Loop through children and store in array if child != TextNode
		for (var i = 0; i < e.children.length; i++) {
			if (e.children[i].nodeType === 1) {
				children.push(e.children[i]);
			}
		}
		return children;
	},

	/**
	* Sets multiple attributes at once
	*
	* @param {element} element
	* @param {attrs}   attrs
	*/
	setAttributes = function (el, attrs) {
		for (var key in attrs) {
			el.setAttribute(key, attrs[key]);
		}
	},

	/**
	* Adds a class to any element
	*
	* @param {element} element
	* @param {string}  class
	*/
	addClass = function (el, cls) {
		if (el.className.indexOf(cls) !== 0) {
			el.className += " " + cls;
			el.className = el.className.replace(/(^\s*)|(\s*$)/g,"");
		}
	},

	/**
	* Remove a class from any element
	*
	* @param  {element} element
	* @param  {string}  class
	*/
	removeClass = function (el, cls) {
		var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
		el.className = el.className.replace(reg, " ").replace(/(^\s*)|(\s*$)/g,"");
	},

	/**
	* forEach method that passes back the stuff we need
	*
	* @param  {array}    array
	* @param  {Function} callback
	* @param  {scope}    scope
	*/
	forEach = function (array, callback, scope) {
		for (var i = 0; i < array.length; i++) {
			callback.call(scope, i, array[i]);
		}
	};

	var nav,
	opts,
	navToggle,
	styleElement = document.createElement("style"),
	htmlEl = document.documentElement,
	hasAnimFinished,
	isMobile,
	navOpen;
	
	var ResponsiveNav = function (el, options) {
		var i;

		/**
		* Default options
		* @type {Object}
		*/
		this.options = {
			animate: true,                    // Boolean: Use CSS3 transitions, true or false
			transition: 284,                  // Integer: Speed of the transition, in milliseconds
			label: "Menu",                    // String: Label for the navigation toggle
			insert: "before",                 // String: Insert the toggle before or after the navigation
			customToggle: "",                 // Selector: Specify the ID of a custom toggle
			closeOnNavClick: false,           // Boolean: Close the navigation when one of the links are clicked
			openPos: "relative",              // String: Position of the opened nav, relative or static
			navClass: "nav-collapse",         // String: Default CSS class. If changed, you need to edit the CSS too!
			navActiveClass: "js-nav-active",  // String: Class that is added to <html> element when nav is active
			jsClass: "js",                    // String: 'JS enabled' class which is added to <html> element
			init: function(){},               // Function: Init callback
			open: function(){},               // Function: Open callback
			close: function(){}               // Function: Close callback
		};

		// User defined options
		for (i in options) {
			this.options[i] = options[i];
		}

		// Adds "js" class for <html>
		addClass(htmlEl, this.options.jsClass);
		
		// Wrapper
		this.wrapperEl = el.replace("#", "");
	
		// Try selecting ID first
		if (document.getElementById(this.wrapperEl)) {
			this.wrapper = document.getElementById(this.wrapperEl);
		
		// If element with an ID doesn't exist, use querySelector
		} else if (document.querySelector(this.wrapperEl)) {
			this.wrapper = document.querySelector(this.wrapperEl);
		
		// If element doesn't exists, stop here.
		} else {
			throw new Error("The nav element you are trying to select doesn't exist");
		}
	
		// Inner wrapper
		this.wrapper.inner = getChildren(this.wrapper);
		
		// For minification
		opts = this.options;
		nav = this.wrapper;
		
		// Init
		this._init(this);
	};
	
	ResponsiveNav.prototype = {
	
		/**
		* Unattaches events and removes any classes that were added
		*/
		destroy: function () {
			this._removeStyles();
			removeClass(nav, "closed");
			removeClass(nav, "opened");
			removeClass(nav, opts.navClass);
			removeClass(nav, opts.navClass + "-" + this.index);
			removeClass(htmlEl, opts.navActiveClass);
			nav.removeAttribute("style");
			nav.removeAttribute("aria-hidden");
			
			removeEvent(window, "resize", this, false);
			removeEvent(window, "focus", this, false);
			removeEvent(document.body, "touchmove", this, false);
			removeEvent(navToggle, "touchstart", this, false);
			removeEvent(navToggle, "touchend", this, false);
			removeEvent(navToggle, "mouseup", this, false);
			removeEvent(navToggle, "keyup", this, false);
			removeEvent(navToggle, "click", this, false);
			
			if (!opts.customToggle) {
				navToggle.parentNode.removeChild(navToggle);
			} else {
				navToggle.removeAttribute("aria-hidden");
			}
		},
	
		/**
		* Toggles the navigation open/close
		*/
		toggle: function () {
			if (hasAnimFinished === true) {
				if (!navOpen) {
					this.open();
				} else {
					this.close();
				}
			}
		},
	
		/**
		* Opens the navigation
		*/
		open: function () {
			if (!navOpen) {
				removeClass(nav, "closed");
				addClass(nav, "opened");
				addClass(htmlEl, opts.navActiveClass);
				addClass(navToggle, "active");
				nav.style.position = opts.openPos;
				setAttributes(nav, {"aria-hidden": "false"});
				navOpen = true;
				opts.open();
			}
		},
	
		/**
		* Closes the navigation
		*/
		close: function () {
			if (navOpen) {
				addClass(nav, "closed");
				removeClass(nav, "opened");
				removeClass(htmlEl, opts.navActiveClass);
				removeClass(navToggle, "active");
				setAttributes(nav, {"aria-hidden": "true"});
		
				// If animations are enabled, wait until they finish
				if (opts.animate) {
					hasAnimFinished = false;
					setTimeout(function () {
						nav.style.position = "absolute";
						hasAnimFinished = true;
					}, opts.transition + 10);
		
				// Animations aren't enabled, we can do these immediately
				} else {
					nav.style.position = "absolute";
				}
		
				navOpen = false;
				opts.close();
			}
		},
	
		/**
		* Resize is called on window resize and orientation change.
		* It initializes the CSS styles and height calculations.
		*/
		resize: function () {
		
			// Resize watches navigation toggle's display state
			if (window.getComputedStyle(navToggle, null).getPropertyValue("display") !== "none") {
			
				isMobile = true;
				setAttributes(navToggle, {"aria-hidden": "false"});
			
				// If the navigation is hidden
				if (nav.className.match(/(^|\s)closed(\s|$)/)) {
					setAttributes(nav, {"aria-hidden": "true"});
					nav.style.position = "absolute";
				}
				
				this._createStyles();
				this._calcHeight();
			} else {			
				isMobile = false;
				setAttributes(navToggle, {"aria-hidden": "true"});
				setAttributes(nav, {"aria-hidden": "false"});
				nav.style.position = opts.openPos;
				this._removeStyles();
			}
		},
	
		/**
		* Takes care of all even handling
		*
		* @param  {event} event
		* @return {type} returns the type of event that should be used
		*/
		handleEvent: function (e) {
			var evt = e || window.event;		
			switch (evt.type) {
				case "touchstart":
				this._onTouchStart(evt);
				break;
				case "touchmove":
				this._onTouchMove(evt);
				break;
				case "touchend":
				case "mouseup":
				this._onTouchEnd(evt);
				break;
				case "click":
				this._preventDefault(evt);
				break;
				case "keyup":
				this._onKeyUp(evt);
				break;
				case "focus":
				case "resize":
				this.resize(evt);
				break;
			}
		},
	
		/**
		* Initializes the widget
		*/
		_init: function () {
			this.index = index++;
		
			addClass(nav, opts.navClass);
			addClass(nav, opts.navClass + "-" + this.index);
			addClass(nav, "closed");
			hasAnimFinished = true;
			navOpen = false;
		
			this._closeOnNavClick();
			this._createToggle();
			this._transitions();
			this.resize();
	
			/**
			* On IE8 the resize event triggers too early for some reason
			* so it's called here again on init to make sure all the
			* calculated styles are correct.
			*/
			var self = this;
			setTimeout(function () {
				self.resize();
			}, 20);
	
			addEvent(window, "resize", this, false);
			addEvent(window, "focus", this, false);
			addEvent(document.body, "touchmove", this, false);
			addEvent(navToggle, "touchstart", this, false);
			addEvent(navToggle, "touchend", this, false);
			addEvent(navToggle, "mouseup", this, false);
			addEvent(navToggle, "keyup", this, false);
			addEvent(navToggle, "click", this, false);
	
			/**
			* Init callback here
			*/
			opts.init();
		},
	
		/**
		* Creates Styles to the <head>
		*/
		_createStyles: function () {
			if (!styleElement.parentNode) {
				styleElement.type = "text/css";
				document.getElementsByTagName("head")[0].appendChild(styleElement);
			}
		},
	
		/**
		* Removes styles from the <head>
		*/
		_removeStyles: function () {
			if (styleElement.parentNode) {
				styleElement.parentNode.removeChild(styleElement);
			}
		},
	
		/**
		* Creates Navigation Toggle
		*/
		_createToggle: function () {		
			// If there's no toggle, let's create one
			if (!opts.customToggle) {
				var toggle = document.createElement("a");
				toggle.innerHTML = opts.label;
				setAttributes(toggle, {
					"href": "#",
					"class": "nav-toggle"
				});
		
				// Determine where to insert the toggle
				if (opts.insert === "after") {
					nav.parentNode.insertBefore(toggle, nav.nextSibling);
				} else {
					nav.parentNode.insertBefore(toggle, nav);
				}
		
				navToggle = toggle;
		
			// There is a toggle already, let's use that one
			} else {
				var toggleEl = opts.customToggle.replace("#", "");
		
				if (document.getElementById(toggleEl)) {
					navToggle = document.getElementById(toggleEl);
				} else if (document.querySelector(toggleEl)) {
					navToggle = document.querySelector(toggleEl);
				} else {
					throw new Error("The custom nav toggle you are trying to select doesn't exist");
				}
			}
		},
	
		/**
		* Closes the navigation when a link inside is clicked.
		*/
		_closeOnNavClick: function () {
			if (opts.closeOnNavClick) {
				var links = nav.getElementsByTagName("a"),
				self = this;
				forEach(links, function (i, el) {
					addEvent(links[i], "click", function () {
						if (isMobile) {
							self.toggle();
						}
					}, false);
				});
			}
		},
	
		/**
		* Prevents the default functionality.
		*
		* @param  {event} event
		*/
		_preventDefault: function(e) {
			if (e.preventDefault) {
				if (e.stopImmediatePropagation) {
					e.stopImmediatePropagation();
				}
				e.preventDefault();
				e.stopPropagation();
				return false;
		
			// This is strictly for old IE
			} else {
				e.returnValue = false;
			}
		},
	
		/**
		* On touch start we get the location of the touch.
		*
		* @param  {event} event
		*/
		_onTouchStart: function (e) {
			if (!Event.prototype.stopImmediatePropagation) {
				this._preventDefault(e);
			}
			this.startX = e.touches[0].clientX;
			this.startY = e.touches[0].clientY;
			this.touchHasMoved = false;
		
			/**
			* Remove mouseup event completely here to avoid
			* double triggering the event.
			*/
			removeEvent(navToggle, "mouseup", this, false);
		},
	
		/**
		* Check if the user is scrolling instead of tapping.
		*
		* @param  {event} event
		*/
		_onTouchMove: function (e) {
			if (Math.abs(e.touches[0].clientX - this.startX) > 10 ||
			Math.abs(e.touches[0].clientY - this.startY) > 10) {
				this.touchHasMoved = true;
			}
		},
	
		/**
		* On touch end toggle the navigation.
		*
		* @param  {event} event
		*/
		_onTouchEnd: function (e) {
			this._preventDefault(e);
			if (!isMobile) {
				return;
			}
		
			// If the user isn't scrolling
			if (!this.touchHasMoved) {
		
				// If the event type is touch
				if (e.type === "touchend") {
					this.toggle();
					return;
		
				// Event type was click, not touch
				} else {
					var evt = e || window.event;
		
					// If it isn't a right click, do toggling
					if (!(evt.which === 3 || evt.button === 2)) {
						this.toggle();
					}
				}
			}
		},
	
		/**
		* For keyboard accessibility, toggle the navigation on Enter
		* keypress too.
		*
		* @param  {event} event
		*/
		_onKeyUp: function (e) {
			var evt = e || window.event;
			if (evt.keyCode === 13) {
				this.toggle();
			}
		},
	
		/**
		* Adds the needed CSS transitions if animations are enabled
		*/
		_transitions: function () {
			if (opts.animate) {
				var objStyle = nav.style,
				transition = "max-height " + opts.transition + "ms";
				
				objStyle.WebkitTransition =
				objStyle.MozTransition =
				objStyle.OTransition =
				objStyle.transition = transition;
			}
		},
	
		/**
		* Calculates the height of the navigation and then creates
		* styles which are later added to the page <head>
		*/
		_calcHeight: function () {
			var savedHeight = 0;
			for (var i = 0; i < nav.inner.length; i++) {
				savedHeight += nav.inner[i].offsetHeight;
			}
			
			var innerStyles = "." + opts.jsClass + " ." + opts.navClass + "-" + this.index + ".opened{max-height:" + savedHeight + "px !important} ." + opts.jsClass + " ." + opts.navClass + "-" + this.index + ".opened.dropdown-active {max-height:9999px !important}";
			
			if (styleElement.styleSheet) {
				styleElement.styleSheet.cssText = innerStyles;
			} else {
				styleElement.innerHTML = innerStyles;
			}		
				innerStyles = "";
			}		
		};	
		/**
		* Return new Responsive Nav
		*/
		return new ResponsiveNav(el, options);	
	};	
	if (typeof module !== "undefined" && module.exports) {
		module.exports = responsiveNav;
	} else {
		window.responsiveNav = responsiveNav;
	}
}(document, window, 0));

/* ========================================================================
 * Bootstrap.modal.js v3.3.0
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
!function ($) {
	'use strict';	
	// MODAL CLASS DEFINITION
	// ======================	
	var Modal = function (element, options) {
	this.options        = options
	this.$body          = $(document.body)
	this.$element       = $(element)
	this.$backdrop      =
	this.isShown        = null
	this.scrollbarWidth = 0
	
	if (this.options.remote) {
		this.$element
		.find('.modal-content')
		.load(this.options.remote, $.proxy(function () {
			this.$element.trigger('loaded.bs.modal')
			}, this))
		}
	}
	
	Modal.VERSION  = '3.3.0'
	
	Modal.TRANSITION_DURATION = 300
	Modal.BACKDROP_TRANSITION_DURATION = 150
	
	Modal.DEFAULTS = {
		backdrop: true,
		keyboard: true,
		show: true
	}
	
	Modal.prototype.toggle = function (_relatedTarget) {
		return this.isShown ? this.hide() : this.show(_relatedTarget)
	}
	
	Modal.prototype.show = function (_relatedTarget) {
		var that = this
		var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })
		
		this.$element.trigger(e)
		
		if (this.isShown || e.isDefaultPrevented()) return
		
		this.isShown = true
		
		this.checkScrollbar()
		this.$body.addClass('modal-open')
		
		this.setScrollbar()
		this.escape()
		
		this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))
		
		this.backdrop(function () {
			var transition = $.support.transition && that.$element.hasClass('fade')
		
			if (!that.$element.parent().length) {
				that.$element.appendTo(that.$body) // don't move modals dom position
			}
		
			that.$element.show().scrollTop(0)
		
			if (transition) {
				that.$element[0].offsetWidth // force reflow
			}
		
			that.$element.addClass('in').attr('aria-hidden', false)
		
			that.enforceFocus()
		
			var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })
		
			transition ?
			that.$element.find('.modal-dialog') // wait for modal to slide in
			.one('bsTransitionEnd', function () {
			that.$element.trigger('focus').trigger(e)
			})
			.emulateTransitionEnd(Modal.TRANSITION_DURATION) :
			that.$element.trigger('focus').trigger(e)
		})
	}
	
	Modal.prototype.hide = function (e) {
		if (e) e.preventDefault()
	
		e = $.Event('hide.bs.modal')
	
		this.$element.trigger(e)
	
		if (!this.isShown || e.isDefaultPrevented()) return
	
		this.isShown = false
	
		this.escape()
	
		$(document).off('focusin.bs.modal')
	
		this.$element.removeClass('in').attr('aria-hidden', true).off('click.dismiss.bs.modal')
	
		$.support.transition && this.$element.hasClass('fade') ?
		this.$element.one('bsTransitionEnd', $.proxy(this.hideModal, this)).emulateTransitionEnd(Modal.TRANSITION_DURATION) : this.hideModal()
	}
	
	Modal.prototype.enforceFocus = function () {
		$(document)
		.off('focusin.bs.modal') // guard against infinite focus loop
		.on('focusin.bs.modal', $.proxy(function (e) {
			if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
				this.$element.trigger('focus')
			}
		}, this))
	}
	
	Modal.prototype.escape = function () {
		if (this.isShown && this.options.keyboard) {
			this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
				e.which == 27 && this.hide()
			}, this))
		} else if (!this.isShown) {
			this.$element.off('keydown.dismiss.bs.modal')
		}
	}
	
	Modal.prototype.hideModal = function () {
		var that = this
		this.$element.hide()
		this.backdrop(function () {
			that.$body.removeClass('modal-open')
			that.resetScrollbar()
			that.$element.trigger('hidden.bs.modal')
		})
	}
	
	Modal.prototype.removeBackdrop = function () {
		this.$backdrop && this.$backdrop.remove()
		this.$backdrop = null
	}
	
	Modal.prototype.backdrop = function (callback) {
		var that = this
		var animate = this.$element.hasClass('fade') ? 'fade' : ''
	
		if (this.isShown && this.options.backdrop) {
			var doAnimate = $.support.transition && animate
	
			this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />').prependTo(this.$element).on('click.dismiss.bs.modal', $.proxy(function (e) {
				if (e.target !== e.currentTarget) return
					this.options.backdrop == 'static'
					? this.$element[0].focus.call(this.$element[0])
					: this.hide.call(this)
				}, this))
	
			if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

			this.$backdrop.addClass('in')	
			if (!callback) return	
			doAnimate ?
			this.$backdrop
			.one('bsTransitionEnd', callback)
			.emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
			callback()	
		}
		else if (!this.isShown && this.$backdrop) {
			this.$backdrop.removeClass('in')
			var callbackRemove = function () {
				that.removeBackdrop()
				callback && callback()
			}
			$.support.transition && this.$element.hasClass('fade') ?
			this.$backdrop
			.one('bsTransitionEnd', callbackRemove)
			.emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
			callbackRemove()

		} else if (callback) {
			callback()
		}
	}
	
	Modal.prototype.checkScrollbar = function () {
		this.scrollbarWidth = this.measureScrollbar()
	}

	Modal.prototype.setScrollbar = function () {
		var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
		if (this.scrollbarWidth) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
	}

	Modal.prototype.resetScrollbar = function () {
		this.$body.css('padding-right', '')
	}
	
	Modal.prototype.measureScrollbar = function () { // thx walsh
		if (document.body.clientWidth >= window.innerWidth) return 0
		var scrollDiv = document.createElement('div')
		scrollDiv.className = 'modal-scrollbar-measure'
		this.$body.append(scrollDiv)
		var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
		this.$body[0].removeChild(scrollDiv)
		return scrollbarWidth
	}
	
	
		// MODAL PLUGIN DEFINITION
		// =======================
		
	function Plugin(option, _relatedTarget) {
		return this.each(function () {
		var $this   = $(this)
		var data    = $this.data('bs.modal')
		var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)
		
		if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
		if (typeof option == 'string') data[option](_relatedTarget)
			else if (options.show) data.show(_relatedTarget)
		})
	}
	
	var old = $.fn.modal
	
	$.fn.modal             = Plugin
	$.fn.modal.Constructor = Modal
	
	
	// MODAL NO CONFLICT
	// =================
	
	$.fn.modal.noConflict = function () {
		$.fn.modal = old
		return this
	}
	
	
	// MODAL DATA-API
	// ==============
	
	$(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
		var $this   = $(this)
		var href    = $this.attr('href')
		var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
		var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())
	
	if ($this.is('a')) e.preventDefault()
	
	$target.one('show.bs.modal', function (showEvent) {
		if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
			$target.one('hidden.bs.modal', function () {
				$this.is(':visible') && $this.trigger('focus')
			})
		})
		Plugin.call($target, option, this)
	})
}(window.jQuery);

/* ========================================================================
 * jquery.Huimodalalert.js 图片预览
 * ========================================================================*/
!function ($){
	$.Huimodalalert = function (info,speed){
		if(speed==0||typeof(speed) == "undefined"){
			$(document.body).append(
				'<div id="modal-alert" class="modal modal-alert radius">'+
					'<div class="modal-alert-info">'+info+'</div>'+
					'<div class="modal-footer"> <button class="btn btn-primary radius" onClick="$.Huimodal_alert.hide()">确定</button></div>'+
				'</div>'
			);
			$("#modal-alert").fadeIn();
		}else{
			$(document.body).append(
				'<div id="modal-alert" class="modal modal-alert radius">'+
					'<div class="modal-alert-info">'+info+'</div>'+
				'</div>'
			);
			$("#modal-alert").fadeIn();
			setTimeout($.Huimodalalert.hide,speed);
		}	
	}
	$.Huimodalalert.hide=function () {
		$("#modal-alert").fadeOut("normal",function(){
			$("#modal-alert").remove();
		});
	}
}(window.jQuery);

/* ========================================================================
 * Bootstrap.dropdown.js v3.3.0
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
!function ($) {
	'use strict';
	var backdrop = '.dropdown-backdrop';
	var toggle   = '[data-toggle="dropdown"]';
	var Dropdown = function (element) {
		$(element).on('click.bs.dropdown', this.toggle)
	}
	Dropdown.VERSION = '3.3.5';
	function getParent($this) {
		var selector = $this.attr('data-target');
		if (!selector) {
			selector = $this.attr('href');
			selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, ''); // strip for ie7
		}
		var $parent = selector && $(selector);
		return $parent && $parent.length ? $parent : $this.parent();
	}
	function clearMenus(e) {
		if (e && e.which === 3) return
		$(backdrop).remove();
		$(toggle).each(function () {
			var $this = $(this)
			var $parent = getParent($this)
			var relatedTarget = { relatedTarget: this }
			if (!$parent.hasClass('open')) return
			if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return
			$parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget));
			if (e.isDefaultPrevented()) return
			$this.attr('aria-expanded', 'false');
			$parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget);
		});
	}
	Dropdown.prototype.toggle = function (e) {
		var $this = $(this)
		if ($this.is('.disabled, :disabled')) return
		var $parent  = getParent($this);
		var isActive = $parent.hasClass('open');
		clearMenus();
		if (!isActive) {
		if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
			// if mobile we use a backdrop because click events don't delegate
			$(document.createElement('div')).addClass('dropdown-backdrop').insertAfter($(this)).on('click', clearMenus);
		}
		var relatedTarget = { relatedTarget: this }
		$parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget));
		if (e.isDefaultPrevented()) return
			$this.trigger('focus').attr('aria-expanded', 'true');
			$parent.toggleClass('open').trigger('shown.bs.dropdown', relatedTarget);
		}
		return false
	}
	Dropdown.prototype.keydown = function (e) {
		if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return
		var $this = $(this)
		e.preventDefault()
		e.stopPropagation()
		if ($this.is('.disabled, :disabled')) return
		var $parent  = getParent($this);
		var isActive = $parent.hasClass('open');
		if (!isActive && e.which != 27 || isActive && e.which == 27) {
			if (e.which == 27) $parent.find(toggle).trigger('focus')
			return $this.trigger('click')
		}
		var desc = ' li:not(.disabled):visible a'
		var $items = $parent.find('.dropdown-menu' + desc)
		if (!$items.length) return
		var index = $items.index(e.target);
		if (e.which == 38 && index > 0)                 index--         // up
		if (e.which == 40 && index < $items.length - 1) index++         // down
		if (!~index)                                    index = 0
		$items.eq(index).trigger('focus');
	}
	function Plugin(option) {
		return this.each(function () {
			var $this = $(this);
			var data  = $this.data('bs.dropdown');
			if (!data){
				$this.data('bs.dropdown', (data = new Dropdown(this)));
			}
			if (typeof option == 'string'){
				data[option].call($this);
			}
		});
	}
	var old = $.fn.dropdown;
	$.fn.dropdown             = Plugin;
	$.fn.dropdown.Constructor = Dropdown;
	$.fn.dropdown.noConflict = function () {
		$.fn.dropdown = old;
		return this;
	}
	$(document).on('click.bs.dropdown.data-api', clearMenus).on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() }).on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle).on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown).on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown);
}(window.jQuery);

/* ========================================================================
 * Bootstrap.transition.js v3.3.0
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
!function ($) {
	'use strict';	
	function transitionEnd() {
		var el = document.createElement('bootstrap');	
		var transEndEventNames = {
			WebkitTransition : 'webkitTransitionEnd',
			MozTransition    : 'transitionend',
			OTransition      : 'oTransitionEnd otransitionend',
			transition       : 'transitionend'
		}	
		for (var name in transEndEventNames) {
			if (el.style[name] !== undefined) {
				return { end: transEndEventNames[name] }
			}
		}		
		return false // explicit for ie8 (  ._.)
	}	
	// http://blog.alexmaccaw.com/css-transitions
	$.fn.emulateTransitionEnd = function (duration) {
		var called = false
		var $el = this
		$(this).one('bsTransitionEnd', function () { called = true })
		var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
		setTimeout(callback, duration)
		return this
	}	
	$(function () {
		$.support.transition = transitionEnd()		
		if (!$.support.transition) return		
		$.event.special.bsTransitionEnd = {
			bindType: $.support.transition.end,
			delegateType: $.support.transition.end,
			handle: function (e) {
				if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
			}
		}
	})	
}(window.jQuery);

/* ========================================================================
 * Bootstrap.tooltip.js v3.3.0
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
!function ($) {
	'use strict';
	
	// TOOLTIP PUBLIC CLASS DEFINITION
	// ===============================
	
	var Tooltip = function (element, options) {
		this.type       =
		this.options    =
		this.enabled    =
		this.timeout    =
		this.hoverState =
		this.$element   = null	
		this.init('tooltip', element, options)
	}

	Tooltip.VERSION  = '3.3.0'	
	Tooltip.TRANSITION_DURATION = 150

	Tooltip.DEFAULTS = {
		animation: true,
		placement: 'top',
		selector: false,
		template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
		trigger: 'hover focus',
		title: '',
		delay: 0,
		html: false,
		container: false,
		viewport: {
			selector: 'body',
			padding: 0
		}
	}

	Tooltip.prototype.init = function (type, element, options) {
		this.enabled   = true
		this.type      = type
		this.$element  = $(element)
		this.options   = this.getOptions(options)
		this.$viewport = this.options.viewport && $(this.options.viewport.selector || this.options.viewport)
		
		var triggers = this.options.trigger.split(' ')
		
		for (var i = triggers.length; i--;) {
			var trigger = triggers[i]
			
			if (trigger == 'click') {
				this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
			} else if (trigger != 'manual') {
				var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
				var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'
			
				this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
				this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
			}
		}
		
		this.options.selector ?
		(this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
		this.fixTitle()
	}

	Tooltip.prototype.getDefaults = function () {
		return Tooltip.DEFAULTS
	}

	Tooltip.prototype.getOptions = function (options) {
		options = $.extend({}, this.getDefaults(), this.$element.data(), options)	
		if (options.delay && typeof options.delay == 'number') {
			options.delay = {
				show: options.delay,
				hide: options.delay
			}
		}	
		return options
	}

	Tooltip.prototype.getDelegateOptions = function () {
		var options  = {}
		var defaults = this.getDefaults()
	
	this._options && $.each(this._options, function (key, value) {
		if (defaults[key] != value) options[key] = value
	})
	
		return options
	}

	Tooltip.prototype.enter = function (obj) {
		var self = obj instanceof this.constructor ?
		obj : $(obj.currentTarget).data('bs.' + this.type)
		
		if (self && self.$tip && self.$tip.is(':visible')) {
			self.hoverState = 'in'
			return
		}
		
		if (!self) {
			self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
			$(obj.currentTarget).data('bs.' + this.type, self)
		}
		
		clearTimeout(self.timeout)
		
		self.hoverState = 'in'
		
		if (!self.options.delay || !self.options.delay.show) return self.show()
		
		self.timeout = setTimeout(function () {
			if (self.hoverState == 'in') self.show()
		}, self.options.delay.show)
	}

	Tooltip.prototype.leave = function (obj) {
		var self = obj instanceof this.constructor ?
		obj : $(obj.currentTarget).data('bs.' + this.type)
	
		if (!self) {
			self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
			$(obj.currentTarget).data('bs.' + this.type, self)
		}
	
		clearTimeout(self.timeout)
	
		self.hoverState = 'out'
	
		if (!self.options.delay || !self.options.delay.hide) return self.hide()
	
		self.timeout = setTimeout(function () {
			if (self.hoverState == 'out') self.hide()
		}, self.options.delay.hide)
	}

	Tooltip.prototype.show = function () {
		var e = $.Event('show.bs.' + this.type)		
		if (this.hasContent() && this.enabled) {
			this.$element.trigger(e)
		
			var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
			if (e.isDefaultPrevented() || !inDom) return
			var that = this			
			var $tip = this.tip()			
			var tipId = this.getUID(this.type)
		
			this.setContent()
			$tip.attr('id', tipId)
			this.$element.attr('aria-describedby', tipId)
		
			if (this.options.animation) $tip.addClass('fade')
					
			var placement = typeof this.options.placement == 'function' ?
			this.options.placement.call(this, $tip[0], this.$element[0]) :
			this.options.placement
		
			var autoToken = /\s?auto?\s?/i
			var autoPlace = autoToken.test(placement)
			if (autoPlace) placement = placement.replace(autoToken, '') || 'top'
		
			$tip.detach().css({ top: 0, left: 0, display: 'block' }).addClass(placement).data('bs.' + this.type, this)
		
			this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
		
			var pos          = this.getPosition()
			var actualWidth  = $tip[0].offsetWidth
			var actualHeight = $tip[0].offsetHeight
		
			if (autoPlace) {
				var orgPlacement = placement
				var $container   = this.options.container ? $(this.options.container) : this.$element.parent()
				var containerDim = this.getPosition($container)
		
				placement = placement == 'bottom' && pos.bottom + actualHeight > containerDim.bottom ? 'top'    :
				placement == 'top'    && pos.top    - actualHeight < containerDim.top    ? 'bottom' :
				placement == 'right'  && pos.right  + actualWidth  > containerDim.width  ? 'left'   :
				placement == 'left'   && pos.left   - actualWidth  < containerDim.left   ? 'right'  :
				placement
		
				$tip.removeClass(orgPlacement).addClass(placement)
			}
		
			var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)
		
			this.applyPlacement(calculatedOffset, placement)
			
			var complete = function () {
				var prevHoverState = that.hoverState
				that.$element.trigger('shown.bs.' + that.type)
				that.hoverState = null			
				if (prevHoverState == 'out') that.leave(that)
			}
		
			$.support.transition && this.$tip.hasClass('fade') ? $tip.one('bsTransitionEnd', complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION) : complete()
		}
	}

	Tooltip.prototype.applyPlacement = function (offset, placement) {
		var $tip   = this.tip()
		var width  = $tip[0].offsetWidth
		var height = $tip[0].offsetHeight
		
		// manually read margins because getBoundingClientRect includes difference
		var marginTop = parseInt($tip.css('margin-top'), 10)
		var marginLeft = parseInt($tip.css('margin-left'), 10)
		
		// we must check for NaN for ie 8/9
		if (isNaN(marginTop))  marginTop  = 0
		if (isNaN(marginLeft)) marginLeft = 0
		
		offset.top  = offset.top  + marginTop
		offset.left = offset.left + marginLeft
		
		// $.fn.offset doesn't round pixel values
		// so we use setOffset directly with our own function B-0
		$.offset.setOffset($tip[0], $.extend({
			using: function (props) {
				$tip.css({
				top: Math.round(props.top),
				left: Math.round(props.left)
				})
			}
		}, offset), 0)
		
		$tip.addClass('in')
		
		// check to see if placing tip in new offset caused the tip to resize itself
		var actualWidth  = $tip[0].offsetWidth
		var actualHeight = $tip[0].offsetHeight
		
		if (placement == 'top' && actualHeight != height) {
			offset.top = offset.top + height - actualHeight
		}
		
		var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)
		
		if (delta.left) offset.left += delta.left
		else offset.top += delta.top
		
		var isVertical          = /top|bottom/.test(placement)
		var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
		var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'
		
		$tip.offset(offset)
		this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
	}

	Tooltip.prototype.replaceArrow = function (delta, dimension, isHorizontal) {
		this.arrow().css(isHorizontal ? 'left' : 'top', 50 * (1 - delta / dimension) + '%').css(isHorizontal ? 'top' : 'left', '')
	}

	Tooltip.prototype.setContent = function () {
		var $tip  = this.tip()
		var title = this.getTitle()	
		$tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
		$tip.removeClass('fade in top bottom left right')
	}

	Tooltip.prototype.hide = function (callback) {
		var that = this
		var $tip = this.tip()
		var e    = $.Event('hide.bs.' + this.type)	
		function complete() {
			if (that.hoverState != 'in') $tip.detach()
			that.$element
			.removeAttr('aria-describedby')
			.trigger('hidden.bs.' + that.type)
			callback && callback()
		}	
		this.$element.trigger(e)	
		if (e.isDefaultPrevented()) return	
		$tip.removeClass('in')
	
		$.support.transition && this.$tip.hasClass('fade') ?
		$tip.one('bsTransitionEnd', complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION) : complete()	
		this.hoverState = null	
		return this
	}

	Tooltip.prototype.fixTitle = function () {
		var $e = this.$element
		if ($e.attr('title') || typeof ($e.attr('data-original-title')) != 'string') {
	  		$e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
		}
	}

	Tooltip.prototype.hasContent = function () {
		return this.getTitle()
	}

	Tooltip.prototype.getPosition = function ($element) {
		$element   = $element || this.$element	
		var el     = $element[0]
		var isBody = el.tagName == 'BODY'	
		var elRect    = el.getBoundingClientRect()
		if (elRect.width == null) {
	  		// width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
	 		elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
		}
		var elOffset  = isBody ? { top: 0, left: 0 } : $element.offset()
		var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
		var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null	
		return $.extend({}, elRect, scroll, outerDims, elOffset)
	}

	Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
		return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2  } :
		placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2  } :
		placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
		/* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width   }
	
	}

	Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
		var delta = { top: 0, left: 0 }
		if (!this.$viewport) return delta
		
		var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
		var viewportDimensions = this.getPosition(this.$viewport)
		
		if (/right|left/.test(placement)) {
			var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
			var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
			if (topEdgeOffset < viewportDimensions.top) { // top overflow
				delta.top = viewportDimensions.top - topEdgeOffset
			} else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
				delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
			}
		} else {
			var leftEdgeOffset  = pos.left - viewportPadding
			var rightEdgeOffset = pos.left + viewportPadding + actualWidth
			if (leftEdgeOffset < viewportDimensions.left) { // left overflow
				delta.left = viewportDimensions.left - leftEdgeOffset
			} else if (rightEdgeOffset > viewportDimensions.width) { // right overflow
				delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
			}
		}	
		return delta
	}

	Tooltip.prototype.getTitle = function () {
		var title
		var $e = this.$element
		var o  = this.options	
		title = $e.attr('data-original-title') || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)	
		return title
	}

	Tooltip.prototype.getUID = function (prefix) {
		do prefix += ~~(Math.random() * 1000000)
		while (document.getElementById(prefix))
		return prefix
	}

	Tooltip.prototype.tip = function () {
		return (this.$tip = this.$tip || $(this.options.template))
	}

	Tooltip.prototype.arrow = function () {
		return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
	}

	Tooltip.prototype.enable = function () {
		this.enabled = true
	}

	Tooltip.prototype.disable = function () {
		this.enabled = false
	}

	Tooltip.prototype.toggleEnabled = function () {
		this.enabled = !this.enabled
	}

	Tooltip.prototype.toggle = function (e) {
		var self = this
		if (e) {
			self = $(e.currentTarget).data('bs.' + this.type)
			if (!self) {
				self = new this.constructor(e.currentTarget, this.getDelegateOptions())
				$(e.currentTarget).data('bs.' + this.type, self)
			}
    	}
		self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
	}

	Tooltip.prototype.destroy = function () {
		var that = this
		clearTimeout(this.timeout)
		this.hide(function () {
			that.$element.off('.' + that.type).removeData('bs.' + that.type)
		})
	}

	// TOOLTIP PLUGIN DEFINITION
	// =========================
	function Plugin(option) {
		return this.each(function () {
			var $this    = $(this)
			var data     = $this.data('bs.tooltip')
			var options  = typeof option == 'object' && option
			var selector = options && options.selector

			if (!data && option == 'destroy') return
			if (selector) {
				if (!data) $this.data('bs.tooltip', (data = {}))
				if (!data[selector]) data[selector] = new Tooltip(this, options)
			} else {
				if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
			}
			if (typeof option == 'string') data[option]()
		})
	}

	var old = $.fn.tooltip
	$.fn.tooltip             = Plugin
	$.fn.tooltip.Constructor = Tooltip
	// TOOLTIP NO CONFLICT
	// ===================
	$.fn.tooltip.noConflict = function () {
		$.fn.tooltip = old
		return this
	}
}(window.jQuery);
$(function () {
	$("[data-toggle='tooltip']").tooltip();
});

/* ========================================================================
 * Bootstrap.popover.js v3.3.0
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
!function ($) {
	'use strict';	
	// POPOVER PUBLIC CLASS DEFINITION
	// ===============================	
	var Popover = function (element, options) {
		this.init('popover', element, options)
	}
	
	if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')	
	Popover.VERSION  = '3.3.0'	
	Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
		placement: 'right',
		trigger: 'click',
		content: '',
		template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
	})
	
	
	// NOTE: POPOVER EXTENDS tooltip.js
	// ================================	
	Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)
	
	Popover.prototype.constructor = Popover
	
	Popover.prototype.getDefaults = function () {
		return Popover.DEFAULTS
	}
	
	Popover.prototype.setContent = function () {
		var $tip    = this.tip()
		var title   = this.getTitle()
		var content = this.getContent()
	
		$tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
		$tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
			this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
		](content)
	
		$tip.removeClass('fade top bottom left right in')
	
		// IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
		// this manually by checking the contents.
		if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
	}
	
	Popover.prototype.hasContent = function () {
		return this.getTitle() || this.getContent()
	}
	
	Popover.prototype.getContent = function () {
		var $e = this.$element
		var o  = this.options
	
		return $e.attr('data-content')
		|| (typeof o.content == 'function' ?
		o.content.call($e[0]) :
		o.content)
	}
	
	Popover.prototype.arrow = function () {
		return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
	}
	
	Popover.prototype.tip = function () {
		if (!this.$tip) this.$tip = $(this.options.template)
		return this.$tip
	}
	
	
	// POPOVER PLUGIN DEFINITION
	// =========================	
	function Plugin(option) {
		return this.each(function () {
			var $this    = $(this)
			var data     = $this.data('bs.popover')
			var options  = typeof option == 'object' && option
			var selector = options && options.selector
		
			if (!data && option == 'destroy') return
			if (selector) {
				if (!data) $this.data('bs.popover', (data = {}))
				if (!data[selector]) data[selector] = new Popover(this, options)
			} else {
				if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
			}
			if (typeof option == 'string') data[option]()
		})
	}
	
	var old = $.fn.popover
	
	$.fn.popover             = Plugin
	$.fn.popover.Constructor = Popover
	
	
	// POPOVER NO CONFLICT
	// ===================
	
	$.fn.popover.noConflict = function () {
		$.fn.popover = old
		return this
	}
}(window.jQuery);
$(function () {
	$("[data-toggle='popover']").popover();
});

/* ========================================================================
 * Bootstrap.alert.js v3.3.0
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
!function ($) {
	'use strict';
	// ALERT CLASS DEFINITION
	// ======================
	var dismiss = '[data-dismiss="alert"]'
	var Alert   = function (el) {
		$(el).on('click', dismiss, this.close)
	}

	Alert.VERSION = '3.3.0'
	
	Alert.TRANSITION_DURATION = 150
	
	Alert.prototype.close = function (e) {
	var $this    = $(this)
	var selector = $this.attr('data-target')

	if (!selector) {
		selector = $this.attr('href')
		selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
	}

	var $parent = $(selector)	
	if (e) e.preventDefault()	
	if (!$parent.length) {
		$parent = $this.closest('.alert')
	}

	$parent.trigger(e = $.Event('close.bs.alert'))

	if (e.isDefaultPrevented()) return

	$parent.removeClass('in')
	function removeElement() {
		// detach from parent, fire event then clean up data
		$parent.detach().trigger('closed.bs.alert').remove()
	}

	$.support.transition && $parent.hasClass('fade') ?
		$parent.one('bsTransitionEnd', removeElement).emulateTransitionEnd(Alert.TRANSITION_DURATION) : removeElement()
	}

	// ALERT PLUGIN DEFINITION
	// =======================
	function Plugin(option) {
		return this.each(function () {
			var $this = $(this)
			var data  = $this.data('bs.alert')
	
			if (!data) $this.data('bs.alert', (data = new Alert(this)))
			if (typeof option == 'string') data[option].call($this)
		})
	}

	var old = $.fn.alert
	$.fn.alert             = Plugin
	$.fn.alert.Constructor = Alert


	// ALERT NO CONFLICT
	// =================	
	$.fn.alert.noConflict = function () {
		$.fn.alert = old
		return this
	}	
	// ALERT DATA-API
	// ==============
	$(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)
}(window.jQuery);

/* ========================================================================
 * jQuery.Spinner.js 微调器
 * ========================================================================*/
!function($) {
	$.fn.Spinner = function (opts) {	
		var defaults = {value:1, min:1, len:3, max:99}
		var options = $.extend(defaults, opts)
		var keyCodes = {up:38, down:40}
		return this.each(function() {		
			var a = $('<a></a>'); f(a,0,"decrease","-");	//加
			var c = $('<a></a>'); f(c,0,"increase","+");	//减
			var b = $('<input/>');f(b,1,"amount input-text");cv(0);	//值
			
			$(this).append(a).append(b).append(c);
			a.click(function(){cv(-1)});
			b.keyup(function(){cv(0)});
			c.click(function(){cv(+1)});
			b.on('keyup paste change',function(e){
				e.keyCode==keyCodes.up&&cv(+1);
				e.keyCode==keyCodes.down&&cv(-1);
			});			
			function cv(n){
				b.val(b.val().replace(/[^\d]/g,''));
				bv=parseInt(b.val()||options.min)+n;
				bv>=options.min&&bv<=options.max&&b.val(bv);
				if(bv<=options.min){
					b.val(options.min);
					f(a,2,"disDe","decrease");
				}else{
					f(a,2,"decrease","disDe");
				}
				if(bv>=options.max){
					b.val(options.max);f(c,2,"disIn","Increase");
				}else{
					f(c,2,"increase","disIn");
				}
			}
			
		});

		function f(o,t,c,s){
			t==0&&o.addClass(c).attr("href","javascript:void(0)").append("<i></i>").find("i").append(s);
			t==1&&o.addClass(c).attr({"value":options.value,"autocomplete":"off","maxlength":options.len});
			t==2&&o.addClass(c).removeClass(s);
		}
	}	
}(window.jQuery);

/* ========================================================================
 * jquery.emailsuggest.js v1.0 邮箱自动提示
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
!function($) {
	var 
		// 插件名 
		plugin = 'emailsuggest',

		// 默认参数配置
		defaults = {
			sugClass: 'emailSug',
			domains: [
				'163.com',
				'126.com',
				'sohu.com',
				'139.com',
				'sina.com',
				'qq.com',
				'gmail.com'
			]
		};

	function EmailSug(elem, options) {
		this.$field = $(elem); 
		this.options = $.extend(true, {}, defaults, options);
		this._defaults = defaults;
		this._domains = this.options.domains;
		// 当前选中元素下标
		this.selectedIndex = 0;

		this.init();
	}

	EmailSug.prototype = {
		init: function() {
			this.addEvent();      
		},

		addEvent: function() {
			var 
				that = this,
				value;

				this.$field.on('keyup.ema', function(e) {
				value = $.trim(this.value);

				if (value) {
					that.create(this, value);
					that.doSelect(e.keyCode);
				} else {
					that.hide();
				}
			}).on('blur.ema', function() {
				setTimeout(function() {
					that.hide(); 
				}, 200);
			});
		},
        create: function(elem, value) {
			var 
				that = this,
				arr,
				len,
				fragment,
				ul = [],
				offset,
				left,                
				top,                
				width,
				height,
				style,                
				// 左右边框 
				borderWidth = 2;

			elem = $(elem);
			offset = elem.offset();
			width = elem.outerWidth(true) - borderWidth;
			height = elem.outerHeight(true);
			left = offset.left; 
			top = offset.top + height;
			style = 'left: ' + left + 'px; top: ' + top + 'px; width: ' + width + 'px; border: 1px solid #e2e2e2; border-top: 0; display: none';
			fragment = $('<div class="' + this.options.sugClass + '-wrapper" style="' + style + '" />');
			ul.push('<ul class="' + this.options.sugClass + '-list">');

			arr = this.filter(value, this._domains);
			len = arr.length;
			$.each(arr, function(i, domain) {
				var 
					_class = that.options.sugClass + '-item';

				if (that.selectedIndex > len - 1) {
					if (i === 0) {
						_class += ' active';
						that.selectedIndex = 0;
					}
				} else {
					if (i === that.selectedIndex) {
						_class += ' active';
					} 
				}
				ul.push('<li class="' + _class + '" data-index="' + i + '">' + value.replace(/@.*/, '') + '@' + domain  + '</li>'); 
			});

			ul.push('</ul>');
			ul = ul.join('');
			if (this.$suggest) {
				this.$suggest.empty();
				this.$suggest.append(ul);
			} else {
				fragment.append(ul);
				// 显示到页面
				$('body').append(fragment);
				this.$suggest = fragment;
				this.$suggest.on('mouseenter click', '.' + this.options.sugClass + '-item', function(e) {
					var lis,                    
						li;
					li = $(this);
					lis = li.parent().children();
					if (e.type === 'mouseenter') {
						li.addClass('active').siblings().removeClass('active');
						that.selectedIndex = $.inArray(this, lis);
					} else {
						// 当前选中
						that.$field.val(lis.eq(that.selectedIndex).text());
						// 隐藏email sug
						that.hide();
					}
				});
			}
			this.show();
		},

		doSelect: function(keyCode) {
			var 
				elems = $('.' + this.options.sugClass + '-item', this.$suggest),  
				min = 0,
				max = elems.length - 1;                
			switch (keyCode) {
				case 13:
					// 回车选中当前已选项
					$('li.active', this.$suggest).trigger('click');

					// 下标重置
					this.selectedIndex = 0;

					break;
					// 向上
				case 38:
					this.selectedIndex --;

					if (this.selectedIndex < min) {
						this.selectedIndex = max;
					} 

					elems.removeClass('active').eq(this.selectedIndex).addClass('active'); 
					break;
					// 向下 
				case 40:
					this.selectedIndex ++;

					if (this.selectedIndex > max) {
						this.selectedIndex = min;
					}

					elems.removeClass('active').eq(this.selectedIndex).addClass('active'); 
					break;
				default:
					break;
			}       
		},
		filter: function(value, arr) {
			var
				start,
				suffix,
				r = [];

			start = value.indexOf('@');
			if (start > -1) {
				suffix = value.substring(start + 1);
				$.each(arr, function(i, str) {
					if (str.indexOf(suffix) > -1) {
						r.push(str); 
					}
				});
			} else {
				r = arr;
			}
			return r;
		},
		show: function() {
            if (this.$suggest) {
                this.$suggest.show(); 
            }
        },

		hide: function() {
			if (this.$suggest) {
				this.$suggest.hide(); 
			}
		}
	}

	$.fn[plugin] = function(options) {
		return this.each(function() {
			if (!$.data(this, plugin)) {
				$.data(this, plugin, new EmailSug(this, options));  
			}  
		});
	}
}(window.jQuery);

/* ========================================================================
 * jquery.placeholder.js 兼容性处理
 * ======================================================================== */
!function(window, document, $) {
	var isInputSupported = 'placeholder' in document.createElement('input');
	var isTextareaSupported = 'placeholder' in document.createElement('textarea');
	var prototype = $.fn;
	var valHooks = $.valHooks;
	var propHooks = $.propHooks;
	var hooks;
	var placeholder;

	if (isInputSupported && isTextareaSupported) {
		placeholder = prototype.placeholder = function() {
			return this;
		};
		placeholder.input = placeholder.textarea = true;
	} else {
		placeholder = prototype.placeholder = function() {
			var $this = this;
			$this
				.filter((isInputSupported ? 'textarea' : ':input') + '[placeholder]')
				.not('.placeholder')
				.on({
					'focus.placeholder': clearPlaceholder,
					'blur.placeholder': setPlaceholder
				})
				.data('placeholder-enabled', true)
				.trigger('blur.placeholder');
			return $this;
		};
		placeholder.input = isInputSupported;
		placeholder.textarea = isTextareaSupported;
		hooks = {
			'get': function(element) {
				var $element = $(element);
				var $passwordInput = $element.data('placeholder-password');
				if ($passwordInput) {
					return $passwordInput[0].value;
				}
				return $element.data('placeholder-enabled') && $element.hasClass('placeholder') ? '' : element.value;
			},
			'set': function(element, value) {
				var $element = $(element);
				var $passwordInput = $element.data('placeholder-password');
				if ($passwordInput) {
					return $passwordInput[0].value = value;
				}
				if (!$element.data('placeholder-enabled')) {
					return element.value = value;
				}
				if (value == '') {
					element.value = value;
					if (element != safeActiveElement()) {
						setPlaceholder.call(element);
					}
				} else if ($element.hasClass('placeholder')) {
					clearPlaceholder.call(element, true, value) || (element.value = value);
				} else {
					element.value = value;
				}
				return $element;
			}
		};

		if (!isInputSupported) {
			valHooks.input = hooks;
			propHooks.value = hooks;
		}
		if (!isTextareaSupported) {
			valHooks.textarea = hooks;
			propHooks.value = hooks;
		}

		$(function() {
			$(document).delegate('form', 'submit.placeholder', function() {
				var $inputs = $('.placeholder', this).each(clearPlaceholder);
				setTimeout(function() {
					$inputs.each(setPlaceholder);
				}, 10);
			});
		});

		$(window).on('beforeunload.placeholder', function() {
			$('.placeholder').each(function() {
				this.value = '';
			});
		});
	}

	function args(elem) {
		var newAttrs = {};
		var rinlinejQuery = /^jQuery\d+$/;
		$.each(elem.attributes, function(i, attr) {
			if (attr.specified && !rinlinejQuery.test(attr.name)) {
				newAttrs[attr.name] = attr.value;
			}
		});
		return newAttrs;
	}

	function clearPlaceholder(event, value) {
		var input = this;
		var $input = $(input);
		if (input.value == $input.attr('placeholder') && $input.hasClass('placeholder')) {
			if ($input.data('placeholder-password')) {
				$input = $input.hide().next().show().attr('id', $input.removeAttr('id').data('placeholder-id'));
				if (event === true) {
					return $input[0].value = value;
				}
				$input.focus();
			} else {
				input.value = '';
				$input.removeClass('placeholder');
				input == safeActiveElement() && input.select();
			}
		}
	}

	function setPlaceholder() {
		var $replacement;
		var input = this;
		var $input = $(input);
		var id = this.id;
		if (input.value == '') {
			if (input.type == 'password') {
				if (!$input.data('placeholder-textinput')) {
					try {
						$replacement = $input.clone().prop('type','text');
					} catch(e) {
						$replacement = $('<input>').prop($.extend(args(this), { 'type': 'text' }));
					}
					$replacement
						.removeAttr('name')
						.data({
							'placeholder-password': $input,
							'placeholder-id': id
						})
						.on('focus.placeholder', clearPlaceholder);
					$input
						.data({
							'placeholder-textinput': $replacement,
							'placeholder-id': id
						})
						.before($replacement);
				}
				$input = $input.removeAttr('id').hide().prev().attr('id', id).show();
			}
			$input.addClass('placeholder');
			$input[0].value = $input.attr('placeholder');
		} else {
			$input.removeClass('placeholder');
		}
	}
	function safeActiveElement() {
		try {
			return document.activeElement;
		} catch (exception) {}
	}
}(this, document, jQuery);

/* ========================================================================
 * jquery.format.js 金额格式化
 * ========================================================================*/
!function($) {
    $.extend({
        format : function(str, step, splitor) {
            str = str.toString();
            var len = str.length;
  
            if(len > step) {
                 var l1 = len%step, 
                     l2 = parseInt(len/step),
                     arr = [],
                     first = str.substr(0, l1);
                 if(first != '') {
                     arr.push(first);
                 };
                 for(var i=0; i<l2 ; i++) {
                     arr.push(str.substr(l1 + i*step, step));                                    
                 };
                 str = arr.join(splitor);
             };
             return str;
        }
    });
}(window.jQuery);

/* ========================================================================
 * jquery.togglePassword.js 金额格式化
 * type="password" 隐藏显示密码
 * ========================================================================*/
!function ($) {
    $.fn.togglePassword = function( options ) {
        var s = $.extend( $.fn.togglePassword.defaults, options ),
        input = $( this );

        $( s.el ).on( s.ev, function() {
            "password" == $( input ).attr( "type" ) ?
                $( input ).attr( "type", "text" ) :
                $( input ).attr( "type", "password" );
        });
    };

    $.fn.togglePassword.defaults = {
        ev: "click"
    };
}(window.jQuery);

/* ========================================================================
 * jquery.addFavorite.js 添加收藏
 * <a title="收藏本站" href="javascript:;" onClick="addFavoritepage('H-ui前端框架','http://www.h-ui.net/');">收藏本站</a>
 * function shoucang(name,site){
	$.addFavorite({
		name:name,
		site:site,
	});
 * ========================================================================*/
!function ($) {
	$.addFavorite = function(obj) {
		obj.site=obj.site||window.location.href;
		obj.name=obj.name||document.title;	
		try{
			window.external.addFavorite(obj.site,obj.name);
		}
		catch(e){
			try{window.sidebar.addPanel(name,site,"");}
			catch(e){$.Huimodalalert("加入收藏失败，请使用Ctrl+D进行添加",2000);}
		}
	}
}(window.jQuery);

/* ========================================================================
 * jquery.Huiselect.js 选择
 * ========================================================================*/
!function ($) {
	$.Huiselect = function(divselectid,inputselectid) {
		var inputselect = $(inputselectid);
		$(divselectid+" cite").click(function(){
			var ul = $(divselectid+" ul");
			ul.slideToggle();
		});
		$(divselectid+" ul li a").click(function(){
			var txt = $(this).text();
			$(divselectid+" cite").html(txt);
			var value = $(this).attr("selectid");
			inputselect.val(value);
			$(divselectid+" ul").hide();
		});
		$(document).click(function(){$(divselectid+" ul").hide();});
	};
}(window.jQuery);

/* ========================================================================
 * jquery.Huihover.js 得到失去焦点
 * ========================================================================*/
!function ($) {
	$.Huihover = function(obj) {
		$(obj).hover(function(){
			$(this).addClass("hover");
		},function(){
			$(this).removeClass("hover");
		});
	}
}(window.jQuery);

/* ========================================================================
 * jquery.Huifocusblur.js 得到失去焦点
 * ========================================================================*/
!function ($) {
	$.Huifocusblur = function(obj) {
		$(obj).focus(function() {
			$(this).addClass("focus").removeClass("inputError");
		});
		$(obj).blur(function() {
			$(this).removeClass("focus");
		});
	}
}(window.jQuery);
$(function(){
	/*****表单*****/
    $.Huifocusblur(".input-text,.textarea");
});

/* ========================================================================
 * jquery.Huitab.js 选项卡
 * ========================================================================*/
!function ($) {
	$.Huitab =function(tabBar,tabCon,class_name,tabEvent,i){
		var $tab_menu=$(tabBar);
		// 初始化操作
		$tab_menu.removeClass(class_name);
		$(tabBar).eq(i).addClass(class_name);
		$(tabCon).hide();
		$(tabCon).eq(i).show();
		
		$tab_menu.on(tabEvent,function(){
			$tab_menu.removeClass(class_name);
			$(this).addClass(class_name);
			var index=$tab_menu.index(this);
			$(tabCon).hide();
			$(tabCon).eq(index).show();
		});
	}
}(window.jQuery);

/* ========================================================================
 * jquery.Huifold.js 折叠
 * ========================================================================*/
!function ($) {
	$.Huifold = function(obj,obj_c,speed,obj_type,Event){
		if(obj_type == 2){
			$(obj+":first").find("b").html("-");
			$(obj_c+":first").show();
		}			
		$(obj).on(Event,function(){
			if($(this).next().is(":visible")){
				if(obj_type == 2){
					return false;
				}else{
					$(this).next().slideUp(speed).end().removeClass("selected");
					if($(this).find("b")){
						$(this).find("b").html("+");
					}
				}
			}
			else{
				if(obj_type == 3){
					$(this).next().slideDown(speed).end().addClass("selected");
					if($(this).find("b")){
						$(this).find("b").html("-");
					}
				}else{
					$(obj_c).slideUp(speed);
					$(obj).removeClass("selected");
					if($(this).find("b")){
						$(obj).find("b").html("+");
					}
					$(this).next().slideDown(speed).end().addClass("selected");
					if($(this).find("b")){
						$(this).find("b").html("-");
					}
				}
			}
		});
	}
}(window.jQuery);

/* ========================================================================
 * jquery.Huitags.js 随机标签
 * ========================================================================*/
!function ($){
	$.Huitags = function(obj){
		$(obj).each(function(){
			var x = 9;
			var y = 0;
			var rand = parseInt(Math.random() * (x - y + 1) + y);
			$(this).addClass("tags"+rand);
		});
	}
}(window.jQuery);

/* ========================================================================
 * jquery.Huitextarealength.js 字数限制
 * ========================================================================*/
!function ($){
	$.Huitextarealength =function(obj,maxlength){
		var v = $(obj).val();
		var l = v.length;
		if( l > maxlength){
			v = v.substring(0,maxlength);
			$(obj).val(v);
		}
		$(obj).parent().find(".textarea-length").text(v.length);
	}
}(window.jQuery);

/* ========================================================================
 * jquery.Huipreview.js 图片预览
 * ========================================================================*/
!function ($){
	$.Huipreview = function(obj){
		/*图片预览*/
		$(obj).hover(
			function(){
				$(this).addClass("active");
				$("#tooltip-preview").remove();
				var winW=$(window).width();
				var winW5=winW/2;
				this.myTitle = this.title;
				this.title = "";
				var midimg = $(this).attr('data-preview');
				if(midimg ==''){return false;}
				else{
					var imgT=$(this).parents(".imgItem").offset().top;
					var imgL=$(this).parents(".imgItem").offset().left;	
					var imgW=$(this).parents(".imgItem").width();
					var imgH=$(this).parents(".imgItem").height();
					var ww=(imgL+imgW/2);
					if(ww < winW5){
						var tooltipLeft=(imgW+imgL)+"px";	
					}
					else{
						var tooltipRight=(winW-imgL)+"px";
					}
					var tooltip_keleyi_com = "<div id='tooltip-preview' style='top:"+ imgT +"px;right:"+ tooltipRight +";left:"+ tooltipLeft +"'><span id='tooltip-keleyi-div' class='loading' style='width:50px; height:50px'></span></div>";
					$("body").append(tooltip_keleyi_com);
					var midimgW = $(this).attr('data-width');
					var midimgH = $(this).attr('data-height');
					var imgTitle = this.myTitle ? "<br />" + this.myTitle + " 产品预览图" : "";
					/*图片预加载*/
					var image = new Image();/*创建一个Image对象*/
					image.onload = function () {
						if($('a.preview.active').attr('data-preview') == midimg){
							var midingW2 = this.width;
							var midingH2 = this.height;
							$("#tooltip-keleyi-div").css({"width":midingW2+"px","height":midingH2+"px"});
							$('#tooltip-keleyi-div').append(this);	
						}
					};
					image.src = midimg;
				}
			},
			function(){
				$(this).removeClass("active");
				this.title = this.myTitle;
				$("#tooltip-preview").remove();
			}
		);
	}
}(window.jQuery);

/* ========================================================================
 * jquery.Huitags.js 标签
 * ========================================================================*/
!function($){
	/*tag标签*/
	var time1;
	$(".Hui-tags-lable").show();
	$(".Hui-tags-input").val("");
	$(document).on("blur",".Hui-tags-input",function(){
		time1 = setTimeout(function(){
			$(this).parents(".Hui-tags").find(".Hui-tags-list").slideUp();
		}, 400);
	});
	$(document).on("focus",".Hui-tags-input",function(){
		clearTimeout(time1);
	});
	$(document).on("click",".Hui-tags-input",function(){
		$(this).find(".Hui-tags-input").focus();
		$(this).find(".Hui-tags-list").slideDown();
	});
	function gettagval(obj){
		var str ="";
		var token =$(obj).parents(".Hui-tags").find(".Hui-tags-token");
		if(token.length<1){
			$(obj).parents(".Hui-tags").find(".Hui-tags-val").val("");
			return false;
		}
		for(var i = 0;i< token.length;i++){
			str += token.eq(i).text() + ",";
			$(obj).parents(".Hui-tags").find(".Hui-tags-val").val(str);
		}
	}
	$(document).on("keydown",".Hui-tags-input",function(event){
		$(this).next().hide();
		var v = $(this).val().replace(/\s+/g, "");
		var reg=/^,|,$/gi;
		v=v.replace(reg,"");
		v=$.trim(v);
		var token =$(this).parents(".Hui-tags").find(".Hui-tags-token");
		if(v!=''){
			if(event.keyCode==13||event.keyCode==108||event.keyCode==32){
				$('<span class="Hui-tags-token">'+v+'</span>').insertBefore($(this).parents(".Hui-tags").find(".Hui-tags-iptwrap"));
				$(this).val("");
				gettagval(this);
			}
		}else{
			if(event.keyCode==8){
				if(token.length>=1){
					$(this).parents(".Hui-tags").find(".Hui-tags-token:last").remove();
					gettagval(this);
				}
				else{
					$(this).parents(".Hui-tags").find(".Hui-tags-lable").show();
					return false;
				}
				
			}
		}	
	});
	
	$(document).on("click",".Hui-tags-has span",function(){
		var taghasV = $(this).text();
		taghasV=taghasV.replace(/(^\s*)|(\s*$)/g,"");
		$('<span class="Hui-tags-token">'+taghasV+'</span>').insertBefore($(this).parents(".Hui-tags").find(".Hui-tags-iptwrap"));
		gettagval(this);
		$(this).parents(".Hui-tags").find(".Hui-tags-input").focus();
	});
	$(document).on("click",".Hui-tags-token",function(){
		var token =$(this).parents(".Hui-tags").find(".Hui-tags-token");
		var it = $(this).parents(".Hui-tags");
		$(this).remove();
		switch(token.length){
			case 1 : it.find(".Hui-tags-lable").show();
			break;
		}
		var str ="";
		var token =it.find(".Hui-tags-token");
		if(token.length<1){
			it.find(".Hui-tags-val").val("");
			return false;
		}
		for(var i = 0;i< token.length;i++){
			str += token.eq(i).text() + ",";
			it.find(".Hui-tags-val").val(str);
		}		
	});
}(window.jQuery);

function Huialert(){
	$.Huihover('.Huialert i');
	$(".Huialert i").on("click",function(){
		var Huialert = $(this).parents(".Huialert");
		Huialert.fadeOut("normal",function(){
		  Huialert.remove();
		});
	});
}
$(function(){
	Huialert();
});

/* ========================================================================
 * 判断浏览器
 * ======================================================================== */
!function(){
	if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
		var msViewportStyle = document.createElement("style")
		msViewportStyle.appendChild(
		document.createTextNode(
			"@-ms-viewport{width:auto!important}"
		)
	)
		document.getElementsByTagName("head")[0].appendChild(msViewportStyle);
	}
}();

/*设为首页*/
!function ($) {
	$.setHome = function(obj){
		try{
			obj.style.behavior="url(#default#homepage)";
			obj.setHomePage(webSite);
		}
		catch(e){
			if(window.netscape){
				try {
					netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
					}
				catch(e){
					$.Huimodalalert("此操作被浏览器拒绝！\n请在浏览器地址栏输入\"about:config\"并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。",2000);
				}
				var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
				prefs.setCharPref('browser.startup.homepage',url);
			}
		}
	}
}(window.jQuery);

/*返回顶部*/
var $backToTopEle = $('<a href="javascript:void(0)" class="tools-right toTop Hui-iconfont" title="返回顶部" alt="返回顶部" style="display:none">&#xe684;</a>').appendTo($("body")).click(function () {
    $("html, body").animate({
        scrollTop: 0
    }, 120);
});
var backToTopFun = function () {
    var st = $(document).scrollTop(),
        winh = $(window).height();
    (st > 0) ? $backToTopEle.show() : $backToTopEle.hide();
    /*IE6下的定位*/
    if (!window.XMLHttpRequest) {
        $backToTopEle.css("top", st + winh - 166);
    }
};

/*滚动*/
function marquee(height,speed,delay){
	var scrollT;
	var pause = false;
	var ScrollBox = document.getElementById("marquee");
	if(document.getElementById("holder").offsetHeight <= height) return;
	var _tmp = ScrollBox.innerHTML.replace('holder', 'holder2')
	ScrollBox.innerHTML += _tmp;
	ScrollBox.onmouseover = function(){pause = true}
	ScrollBox.onmouseout = function(){pause = false}
	ScrollBox.scrollTop = 0;
	function start(){
	    scrollT = setInterval(scrolling,speed);
	    if(!pause) ScrollBox.scrollTop += 2;
	}
	function scrolling(){
	    if(ScrollBox.scrollTop % height != 0){
	        ScrollBox.scrollTop += 2;
	        if(ScrollBox.scrollTop >= ScrollBox.scrollHeight/2) ScrollBox.scrollTop = 0;
	    }
		else{
	        clearInterval(scrollT);
	        setTimeout(start,delay);
	    }
	}
	setTimeout(start,delay);
}

/*左侧菜单-隐藏显示*/
function displaynavbar(obj){
	if($(obj).hasClass("open")){
		$(obj).removeClass("open");
		$("body").removeClass("big-page");
	}else{
		$(obj).addClass("open");
		$("body").addClass("big-page");					
	}
}

function stopDefault(e) {
	//阻止默认浏览器动作(W3C)
	if (e && e.preventDefault)e.preventDefault();
	//IE中阻止函数器默认动作的方式
	else window.event.returnValue = false;
	return false;
}

$(function(){
	/*按钮loading*/
	$('.btn-loading').click(function () {
		var $btn = $(this);
		var btnval = $btn.val();
		$btn.addClass("disabled").val("loading").attr("disabled","disabled");
		setTimeout(function(){
			$btn.removeClass("disabled").val(btnval).removeAttr("disabled");
		}, 3000);
	});
	/**/
	$.Huiselect("#divselect","#inputselect");

	/*全选*/
	$("table thead th input:checkbox").on("click" , function(){
		$(this).closest("table").find("tr > td:first-child input:checkbox").prop("checked",$("table thead th input:checkbox").prop("checked"));
    });
	
    /*上传*/
    $(document).on("change",".input-file",function(){
		var uploadVal=$(this).val();
		$(this).parent().find(".upload-url").val(uploadVal).focus().blur();
	});
	
	/*下拉菜单*/
	$(document).on("mouseenter",".dropDown",function(){
		$(this).addClass("hover");
	});
	$(document).on("mouseleave",".dropDown",function(){
		$(this).removeClass("hover");
	});
	$(document).on("mouseenter",".dropDown_hover",function(){
		$(this).addClass("open");
	});
	$(document).on("mouseleave",".dropDown_hover",function(){
		$(this).removeClass("open");
	});
	$(document).on("click",".dropDown-menu li a",function(){
		$(".dropDown").removeClass('open');
	});
	$(document).on("mouseenter",".menu > li",function(){
		$(this).addClass("open");
	});
	$(document).on("mouseleave",".menu > li",function(){
		$(this).removeClass("open");
	});
	
	/*tag标签*/
	$.Huitags(".tags a");
		
	/*对联广告*/
	var dual = $(".dual");
	var dual_close = $("a.dual_close");	
	var screen_w = screen.width;
	if(screen_w>1024){dual.show();}
	$(window).scroll(function(){
		var scrollTop = $(window).scrollTop();
		dual.stop().animate({top:scrollTop+260});
	});
	dual_close.click(function(){
		$(this).parent().hide();
		return false;
	});

	/*顶部展开定时自动关闭广告*/ 
	$("#banner").slideDown("slow");	
});

function displayimg(){
	$("#banner").slideUp(1000,function(){
		$("#top").slideDown(1000);
	});
}
setTimeout("displayimg()",4000);