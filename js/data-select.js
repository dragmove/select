
var nct = (nct) ? nct : {};
if(!nct.admin) nct.admin = {};

nct.admin.jqueryUrl = 'http://code.jquery.com/jquery-2.1.0.min.js';
nct.admin.dataGnbSelect = [
	{
		title: 'select'
	}, {
		title: 'naver, no target',
		value: '',
		url: 'http://www.naver.com' // '', '   '은 무시합니다.
		//target 이 없을 경우 _self 링크.
	}, {
		title: 'daum, target:""',
		value: '',
		url: 'http://www.daum.net',
		target: '' // ''은 _self 링크
	}, {
		title: 'daum, target:"_self"',
		value: '',
		url: 'http://www.daum.net',
		target: '_self'
	}, {
		title: 'daum, target:"_blank"',
		value: '',
		url: 'http://www.daum.net',
		target: '_blank'
	}
];