var test = require('grape'),
    paths = require('../paths');

test('[/] is a path', function(t) {
    t.plan(1);
    t.ok(paths.is('[/]'), 'path is a path');
});

test('[/\]\[] is a path', function(t) {
    t.plan(1);
    t.ok(paths.is('[/\\]\\[]'), 'path is a path');
});

test('/ is not a path', function(t) {
    t.plan(1);
    t.notOk(paths.is('/'), '/ is not a path');
});

test('"[a] [b]" is not a path', function(t) {
    t.plan(1);
    t.notOk(paths.is('[a] [b]'), '"[a] [b]" is not a path');
});

test('5 is not a path', function(t) {
    t.plan(1);
    t.notOk(paths.is(5), '5 is not a path');
});

test('root', function(t) {
    var path = '[/]';

    t.plan(1);
    t.ok(paths.isRoot(path), 'path is root');
});

test('absolute path', function(t) {
    var path = '[/majigger]';

    t.plan(1);
    t.ok(paths.isAbsolute(path), 'path is absolute');
});

test('relative path', function(t) {
    var path = '[majigger]';

    t.plan(1);
    t.notOk(paths.isAbsolute(path), 'path is not absolute');
});

test('is absolute on undefined', function(t) {
    var path = '[/majigger]';

    t.plan(1);
    t.notOk(paths.isAbsolute(undefined), 'path is not absolute');
});

test('create', function(t) {
    var path = paths.create('thing');

    t.plan(1);

    t.equal(
        path,
        '[thing]'
    );
});

test('create with escapes', function(t) {
    var path = paths.create(['[']);

    t.plan(1);

    t.equal(
        path,
        '[\\[]'
    );
});

test('append', function(t) {
    var path = paths.append('[thing]', '[stuff]');

    t.plan(1);

    t.equal(
        path,
        '[thing/stuff]'
    );
});

test('append non path string', function(t) {
    t.plan(1);
    t.equal(
        paths.append('[thing]', 'stuff'),
        '[thing/stuff]'
    );
});

test('append integer to path', function(t) {
    t.plan(1);
    t.equal(
        paths.append('[thing]', 5),
        '[thing/5]'
    );
});

test('append null returns original path', function(t) {
    t.plan(1);
    t.equal(
        paths.append('[thing]', null),
        '[thing]'
    );
});

test('append to root', function(t) {
    t.plan(1);
    t.equal(
        paths.append('[/]', '[things]'),
        '[/things]'
    );
});

test('resolve up a level', function(t) {
    var path = paths.resolve('[thing]', '[/stuff]', '[majigger]', '[..]');

    t.plan(1);

    t.equal(
        path,
        '[/stuff]'
    );
});

test('resolve up to key', function(t) {
    var path = paths.resolve('[thing/stuff/majigger]', '[..stuff]');

    t.plan(1);

    t.equal(
        path,
        '[thing/stuff]'
    );
});

test('resolve up to key, then down a step', function(t) {
    var path = paths.resolve('[thing/stuff/3/whatsits]', '[..stuff/#]');

    t.plan(1);

    t.equal(
        path,
        '[thing/stuff/3]'
    );
});

test('resolve root path', function(t) {
    var path = paths.resolve('[/]','[/]');

    t.plan(1);

    t.equal(
        path,
        '[/]'
    );
});

test('resolve double root path', function(t) {
    var path = paths.resolve('[/]','[/]');

    t.plan(1);

    t.equal(
        path,
        '[/]'
    );
});

test('resolve root and root with key', function(t) {
    var path = paths.resolve('[/]','[/a]');

    t.plan(1);

    t.equal(
        path,
        '[/a]'
    );
});

test('resolve root and non-path', function(t) {
    var path = paths.resolve('[/]','a');

    t.plan(1);

    t.equal(
        path,
        '[/a]'
    );
});

// This is due to a previous memoisation bug.
test('resolve non-root then root', function(t) {
    var path1 = paths.resolve('[a]'),
        path2 = paths.resolve('[/]','[a]');

    t.plan(1);

    t.equal(path2,'[/a]');
});

test('bubble capturing path', function(t) {
    var path = paths.resolve('[thing/stuff...]');

    t.plan(1);

    t.equal(
        path,
        '[thing/stuff]'
    );
});

test('bubble capturing root path', function(t) {
    var path = paths.resolve('[/...]');

    t.plan(1);

    t.equal(
        path,
        '[/]'
    );
});

test('bubble capturing path with bubble capture as only child key', function(t) {
    var path = paths.resolve('[/a]', '[...]');

    t.plan(1);

    t.equal(
        path,
        '[/a]'
    );
});

test('to parts valid path', function(t) {
    var path = '[a/b/c]'

    t.plan(1);

    t.deepEqual(
        paths.toParts(path),
        ['a','b','c']
    );
});

test('to parts valid key', function(t) {
    var path = 'a';

    t.plan(1);

    t.deepEqual(
        paths.toParts(path),
        ['a']
    );
});

test('to parts invalid key', function(t) {
    var path = 'a[b]';

    t.plan(1);

    t.notOk(
        paths.toParts(path),
        'no valid path'
    );
});

test('to parts boolean', function(t) {
    var path = true;

    t.plan(1);

    t.notOk(
        paths.toParts(path),
        'true is not a path'
    );
});

test('to parts boolean', function(t) {
    var path = false;

    t.plan(1);

    t.notOk(
        paths.toParts(path),
        'false is not a path'
    );
});