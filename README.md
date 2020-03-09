<center>

# create-package-javascript

<big>Utility to create npm packages</big>

<big>

```sh
npm init package-javascript <name> [--in <path>]
```

</big>
</center>

```sh
npm init package-javascript my-package
npm init package-javascript my-foo-package --in ./path/to/my-packages/foo
```

## Usage

`create-package-javascript` was designed with "<code>npm init &hellip;</code>" approach in mind ([learn more](https://docs.npmjs.com/cli/init)):

<big>
<center>
<pre>
npm init package-javascript <&hellip;<i>options</i>>
</pre>
</center>
</big>

By default, all the files are put to a new directory named after the package name:

```sh
cd ~
npm init package-javascript my-package
```

```yml
~/
  my-package/
    package.json # "name": "my-package"
```

This behavior can be overriden with `--in` option. For example, this command:

```sh
cd ~
npm init package-javascript my-foo-package --in ./path/to/my-packages/foo
```

&hellip; creates these files:

```yml
~/path/to/my-packages/
  foo/
    package.json # "name": "my-foo-package"
```

By default, the `create-package-javascript@latest` is used. To use different version of `create-package-javascript`, consider this syntax:

<pre>
npm init package-javascript@next <&hellip;<i>options</i>>
</pre>
