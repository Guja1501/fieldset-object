const {JSDOM} = require("jsdom");

const dom = new JSDOM(`
<!doctype html>
<html>
<head></head>
<body>
	<form action="/" method="post" data-fs-on-init>
		<fieldset data-fs-name="persons[]">
			<label for="name">First name:</label>
			<input type="text" id="name" name="name" placeholder="Mickey">
			<label for="surname">Last name:</label>
			<input type="text" id="surname" name="surname" placeholder="Mouse">
		</fieldset>
		<fieldset data-fs-name="persons[]">
			<label for="name">First name:</label>
			<input type="text" id="name" name="name" placeholder="Mickey">
			<label for="surname">Last name:</label>
			<input type="text" id="surname" name="surname" placeholder="Mouse">
		</fieldset>
		<fieldset data-fs-name="persons[]">
			<label for="name">First name:</label>
			<input type="text" id="name" name="name" placeholder="Mickey">
			<label for="surname">Last name:</label>
			<input type="text" id="surname" name="surname" placeholder="Mouse">
		</fieldset>
		<input type="submit" class="submit" value="Submit">
	</form>
</body>
</html>
`);

module.exports = dom;