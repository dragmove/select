
(function() {
	var JQUERY_URL = 'http://code.jquery.com/jquery-1.7.0.min.js',
		DATA_JSON_URL = './data/data-select.json';

	var json = {};
	/*
	 * implement
	 */
	init();

	/*
	 * functions
	 */
	function init() {
		var jquery = (window.jQuery) ? window.jQuery : null;
		if(!jquery) {
			console.log('no jquery. start load external jquery file :', JQUERY_URL);
			setExternalJavascriptFile(JQUERY_URL, '', onloadJqueryFile, null);
		}else{
			console.log('jquery exist. use this jquery');
			getSelectJson(jquery);
		}
	}

	function onloadJqueryFile() {
		var jquery = (window.jQuery) ? window.jQuery : null;
		console.log('load complete external jquery :', jquery);

		getSelectJson(jquery);
	}

	function getSelectJson($) {
		var request = $.ajax({
			type: 'GET',
			url: DATA_JSON_URL,
			contentType: 'application/json;charset=utf-8',
			dataType: 'json',
			data: '',
		}).done(function(data, textStatus, jqXHR) {
			console.log('success load json', data);
			if(data) json = data;
			setContents($);
		}).fail(function(jqXHR, textStatus, errorThrown) {
			console.log('fail load json :', textStatus);
		});
	}

	function setContents($) {
		$(document).ready(function() {
			// const
			var TARGET = {
				SELF: '_self',
				BLANK: '_blank'
			};

			// variables
			var selectDatas = (json.gnbSelect) ? json.gnbSelect : [],
				select;

			// implement
			init();
			setEvents(selectDatas);

			// functions
			function init() {
				select = $('#sampleSelect').get(0);

				var tmpObj, optionStr = '';
				for(var i=0,max=selectDatas.length; i<max; i++) {
					tmpObj = selectDatas[i];
					optionStr += '<option value="' + trim( toStr(tmpObj.value) ) + '">' + toStr(tmpObj.title) + '</option>';
				}
				$(select).html( optionStr );
			}

			function setEvents(datas) {
				var obj, url = '';
				$(select).on('change', function(event) {
					obj = datas[ select.selectedIndex ];
					if(!obj) return;

					url = trim( toStr(obj.url) );
					if(url === '') return;

					switch( toStr(obj.target) ) {
						case TARGET.SELF :
							window.location.href = url
						break;

						case TARGET.BLANK :
							openWindow(obj);
						break;

						default :
							window.location.href = url;
					}
				});
			}

			function openWindow(obj) {
				if(!obj) return;
				var url = toStr(obj.url),
					windowName = '',
					optionStr = '';
					// optionStr : 'width='+_width+',height='+_height+',left='+_left+',top='+_top+',scrollbars='+_scrollbars+',resizable='+_resizable+',status='+_status+',location='+_location+',toolbar='+_toolbar+',menubar='+_menubar+',fullscreen='+_fullscreen+',channelmode='+_channelmode;
				window.open( url, windowName, optionStr );
			}
		});
	}

	function trim(str) {
		return str.replace(/^\s+/, "").replace(/\s+$/, "");
	}

	function toStr(obj) {
		if(obj === null || obj === undefined) return '';
		return String(obj);
	}

	function setExternalJavascriptFile($jsFileUrl, $jsFileId, $jsFileLoadCompleteEventHandler, $scope) {
		var scriptElementArr = document.getElementsByTagName("script");
		var firstJsElement = scriptElementArr[0];
		
		var jsFileId = toStr($jsFileId);
		if( document.getElementById(jsFileId) ) {
			console.log("already some javascript file have this id");
			$jsFileLoadCompleteEventHandler.call($scope);
			return;
		}
		
		var jsElement = document.createElement("script");
		if(jsFileId) jsElement.id = jsFileId;

		jsElement.src = $jsFileUrl;
		jsElement.type = "text/javascript";
		jsElement.onload = $jsFileLoadCompleteEventHandler;
		if(firstJsElement.parentNode) {
			firstJsElement.parentNode.insertBefore(jsElement, firstJsElement);
		}
	};
})();
