/**
 * @property {Element | Node} element
 * @property {Fieldset | null} parent
 * @property {Array<Fieldset>} children
 * @property {Object} indexes
 */
const Fieldset = class {
	/**
	 * @param {Element | Node} fieldset
	 * @param {Fieldset|null} parent
	 * @param {Array<Fieldset> | null} children
	 * @param {Array<Element | Node>} inputs
	 * @constructor
	 */
	constructor(fieldset, parent = null, children = null, inputs = null) {
		this.element = fieldset;
		this.parent = parent;
		this.children = children;
		this.indexes = {};
		this.inputs = [];

		if (this.rightFieldset && this.element.hasAttribute(Fieldset.config.keys.fsName)) {
			this.element.setAttribute(Fieldset.config.keys.iName, this.name);
		}

		if (this.children === null) {
			this.children = [];
			const queue = Array.from(this.element.children);

			for (let child of queue) {
				if (Fieldset.isRightFieldset(child)) {
					let fs = new Fieldset(child, this);
					this.indexes[fs.nativeName || fs.name] = 0;

					this.children.push(fs);
				} else {
					if (Fieldset.isRightInput(child)) {
						child.setAttribute(Fieldset.config.keys.iName, child.getAttribute('name'));

						this.inputs.push(child);
					}

					[].push.apply(queue, Array.from(child.children));
				}
			}

			this.children.sort((a, b) => a.nativeName < b.nativeName ? 1 : 0);
		}

		if (this.parent === null && Fieldset.isRightFieldset(this.element)) {
			let p = this.element.parentNode;

			while (p && !Fieldset.isRightFieldset(p)) {
				p = p.parentNode;
			}

			this.parent = p === null ? null : new Fieldset(p, null, this.children);
		}
	}

	get name() {
		return this.element.getAttribute(Fieldset.config.keys.fsName);
	}

	set name(value) {
		this.element.setAttribute(Fieldset.config.keys.fsName, value);
	}

	get nativeName() {
		return this.element.getAttribute(Fieldset.config.keys.iName);
	}

	get multiple() {
		return this.name.endsWith('[]');
	}

	get rightFieldset() {
		return Fieldset.isRightFieldset(this.element);
	}

	/**
	 * @returns {Fieldset}
	 */
	forceReset() {
		this.name = this.nativeName;
		// this.element.removeAttribute(Fieldset.config.keys.iName);
		this.element.removeAttribute(Fieldset.config.keys.fieldsetIndex);

		this.children.forEach(child => child.forceReset());

		for (let i in this.indexes) {
			this.indexes[i] = 0;
		}

		return this;
	}

	/**
	 * @param {Fieldset} child
	 */
	getIncIndex(child) {
		return this.indexes[child.nativeName]++;
	}

	/**
	 * @returns {Fieldset}
	 */
	applyName() {
		if (this.parent !== null) {
			this.name = this.multiple
				? this.name.substr(0, this.name.length - 1) + this.parent.getIncIndex(this) + ']'
				: this.name;
		}

		this.children.map(c => c.applyName());

		return this;
	}

	/**
	 * @returns {Fieldset}
	 */
	applyInputs() {
		this.children.forEach(child => child.applyInputs());

		this.inputs.forEach(input => {
			let inputName = input.getAttribute(Fieldset.config.keys.iName);

			const matches = inputName.match(/(^[^[]+)(.*)/ui);

			input.setAttribute('name', `${this.name}[${matches[1]}]${matches[2]}`);
		});

		return this;
	}

	/**
	 * @param {Element | Node} el
	 *
	 * @returns {Boolean}
	 */
	static isRightFieldset(el) {
		return el.tagName === 'FIELDSET' && el.hasAttribute(Fieldset.config.keys.fsName);
	}

	/**
	 * @param {Element | Node} el
	 *
	 * @returns {Boolean}
	 */
	static isRightInput(el) {
		return el.hasAttribute('name') && !el.hasAttribute(Fieldset.config.keys.skip);
	}

	static apply(...forms) {
		for (let form of forms) {
			(new Fieldset(form))
				.forceReset()
				.applyName()
				.applyInputs();
		}
	}
};

Fieldset.config = {
	keys: {
		skip: 'data-fs-skip',
		fsName: 'data-fs-name',
		iName: 'data-fs-native-name',
		formKey: 'data-fs-form-key',
		fieldsetKey: 'data-fs-fieldset-key',
		fieldsetIndex: 'data-fs-index',
		initFormOnFieldsetInit: 'data-fs-on-init',
	},
};

if (typeof document !== 'undefined') {
	Fieldset.applyOnForms.apply(`form[${Fieldset.config.keys.initFormOnFieldsetInit}]`)
}

module.exports = Fieldset;

