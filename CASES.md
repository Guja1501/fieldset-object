If you want to add some cases, feel free to **send** [pull request](https://github.com/Guja1501/fieldset-object/pulls)

### Case 1

Add person and something

```html
<form action="action" method="post">
  <fieldset data-fs-name="person">
    <input name="name">
    <input name="surname">
    <input name="email">
    <input name="ID">
  </fieldset>
  <input name="something">
</form>
```
Result

```json
{
  "person": {
    "name": "",
    "surname": "",
    "email": "",
    "ID": ""
  },
  "something": ""
}
```


### Case 2

Add multiple persons

```html
<form action="action" method="post">
  <fieldset data-fs-name="persons[]">
    <input name="name">
    <input name="surname">
    <input name="email">
    <input name="ID">
  </fieldset>
  <fieldset data-fs-name="persons[]">
    <input name="name">
    <input name="surname">
    <input name="email">
    <input name="ID">
  </fieldset>
  <fieldset data-fs-name="persons[]">
    <input name="name">
    <input name="surname">
    <input name="email">
    <input name="ID">
  </fieldset>
</form>
```

Result

```json
{
  "persons": [
    {
      "name": "",
      "surname": "",
      "email": "",
      "ID": ""
    },
    {
      "name": "",
      "surname": "",
      "email": "",
      "ID": ""
    },
    {
      "name": "",
      "surname": "",
      "email": "",
      "ID": ""
    }
  ]
}
```
