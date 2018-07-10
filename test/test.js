const Fieldset = require('../src/app');
const assert = require('assert');
const dom = require('./helpers/dom');
const window = dom.window;
const document = window.document;
const $ = require('jquery')(window);

describe('Fieldset', function () {
	describe('First initialize', function () {
		Fieldset.apply(...document.querySelectorAll('form[data-fs-on-init]'));

		let $form = $('form:eq(0)');
		let serialized = $form.serializeArray();

		for (let i = 0; i < 3; i++) {
			it(`should be persons[${i}][name] in form serialize array`, function () {
				assert.notEqual(serialized.find(o => o.name === `persons[${i}][name]`), undefined, `persons[${i}][name] is not in form`);
			});

			it(`should be persons[${i}][surname] in form serialize array`, function () {
				assert.notEqual(serialized.find(o => o.name === `persons[${i}][surname]`), undefined, `persons[${i}][surname] is not in form`);
			});
		}
	});
});