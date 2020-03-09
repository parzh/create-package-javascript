# create-package-javascript

Utility to create npm packages

```sh
npm init package-javascript <name> [--in <path>]
```

```sh
npm init package-javascript my-package
npm init package-javascript my-foo-package --in ./my-packages/foo
```

## Usage:

### As initializer (recommended)

See <code>npm init &hellip;</code> examples above, &mdash; `create-package-javascript` was designed with this approach in mind ([learn more](https://docs.npmjs.com/cli/init) about `npm init` works):

<pre>
npm init package-javascript <&hellip;<i>options</i>>
</pre>

For example, this command:

```sh
cd ~
npm init package-javascript my-foo-package --in ./my-packages/foo
```

&hellip; creates these files:

```yml
~/
  my-packages/
    foo/
      src/
        index.js
      .gitignore
      package.json	# "name": "my-foo-package",
      				# "version": "0.0.1"
      README.md
```

### Via [`npx`]((https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b))

<pre>
npx create-package-javascript <&hellip;<i>options</i>>
</pre>

### As a globally-instaled package (☹ not recommended)

<pre>
npm install --global create-package-javascript
create-package-javascript <&hellip;<i>options</i>>
</pre>
