## Client-side features for CompoundJS

This package adds number of client-side features to
[CompoundJS MVC](http://compoundjs.com). To get idea of client-side compound
see how GitHub works when you browsing repository: every page could
be loaded as html, but when you navigate through pages by clicking links, it
doesn't reloads page. It's like pjax, but without pjax: everything rendered and
served on client.

## Installation

Step 1. install using npm:

    npm install co-client --save

Step 2. add `co-client` line to config/autoload.js, for example:

```javascript
module.exports = function (compound) {
    return typeof window === 'undefined' ? [
        'ejs-ext',
        'jugglingdb',
        'seedjs',
        'co-client'
    ].map(require) : [
        // some client-side modules
    ];
};
```

## Usage

Work with compoundjs as usual, bundle will created on server startup. To rebuild
bundle on file modification use `compound g cs --watch` command.

One important note: this module uses <%- contentFor('javascripts') %> section of
application layout. If you want to use client-side compound in existing app you
should add following line to end of your
app/views/layouts/application_layout.js:

    <%- contentFor('javascripts') %>

## CLI features

### Bundle generator

    compound generate clientside

or, using shortcuts

    compound g cs

This generator creates bundle which consists of framework, application and all
dependencies. This bundle saved as `public/javascripts/compound.js` file, it
should be included on client.

### Watch for changes

Generator can stay alive and look for changes in application code and rebuild
bundle if it called with `--watch` flag.

    compound g cs --watch

### ORM

Client-Side Compound comes with JugglingDB ORM, which works well on client-side,
but for persistence it still talk to server using JSON API, provided by controller.

If you don't need persistence, just tell compound to use another schema driver (by
default used WebServiceAdapter). Config example:

    app.set('schema adapter', require('jugglingdb/lib/adapters/memory'));

It will force JugglingDB to use in-memory storage, which is not persistent. Feel free
to write your own adapter if you have some API for your client-side app.

### Client-Side Controllers

Same controller serves both HTML and JSON requests, more than that: same controller works
on client-side.

### Routing

Use regular compound routing to tell framework, which controller#action should respond to
request on given path. One addition to routes. Every route now have `pushState` param which
allows to specify, is it necessary to populate browser's history when serving this action.
By default `pushState: true`, that means every click and form submission will update location
and history. Use `pushState: false` to disable this behavior:

    app.get('#displayAlert', 'clientSideConrtoller#alert', {pushState: false});

### More awesome stuff coming soon...

## License (MIT)

```text
Copyright (C) 2011 by Anatoliy Chakkaev <mail [åt] anatoliy [døt] in>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
