var test = require('tape'),
    paths = require('../paths');

test('[/] is a path', function(t) {
    t.plan(1);
    t.ok(paths.is('[/]'), 'path is a path');
    t.end();
});

test('/ is not a path', function(t) {
    t.plan(1);
    t.notOk(paths.is('/'), '/ is not a path');
    t.end();
});

test('5 is not a path', function(t) {
    t.plan(1);
    t.notOk(paths.is(5), '5 is not a path');
    t.end();
});

test('root', function(t) {
    var path = '[/]';

    t.plan(1);
    t.ok(paths.isRoot(path), 'path is root');
    t.end();
});

test('absolute path', function(t) {
    var path = '[/majigger]';

    t.plan(1);
    t.ok(paths.isAbsolute(path), 'path is absolute');
    t.end();
});

test('relative path', function(t) {
    var path = '[majigger]';

    t.plan(1);
    t.notOk(paths.isAbsolute(path), 'path is not absolute');
    t.end();
});

test('create', function(t) {
    var path = paths.create('thing');

    t.plan(1);

    t.equal(
        path,
        '[thing]'
    );

    t.end();
});

test('append', function(t) {
    var path = paths.append('[thing]', '[stuff]');

    t.plan(1);

    t.equal(
        path,
        '[thing/stuff]'
    );

    t.end();
});

test('append non path string', function(t) {
    t.plan(1);
    t.equal(
        paths.append('[thing]', 'stuff'),
        '[thing/stuff]'
    );
    t.end();
});

test('append integer to path', function(t) {
    t.plan(1);
    t.equal(
        paths.append('[thing]', 5),
        '[thing/5]'
    );
    t.end();
});

test('append null returns original path', function(t) {
    t.plan(1);
    t.equal(
        paths.append('[thing]', null),
        '[thing]'
    );
    t.end();
});

test('resolve up a level', function(t) {
    var path = paths.resolve('[thing]', '[/stuff]', '[majigger]', '[..]');

    t.plan(1);

    t.equal(
        path,
        '[/stuff]'
    );

    t.end();
});

test('resolve up to key', function(t) {
    var path = paths.resolve('[thing/stuff/majigger]', '[..stuff]');

    t.plan(1);

    t.equal(
        path,
        '[thing/stuff]'
    );

    t.end();
});

test('resolve up to key, then down a step', function(t) {
    var path = paths.resolve('[thing/stuff/3/whatsits]', '[..stuff/#]');

    t.plan(1);

    t.equal(
        path,
        '[thing/stuff/3]'
    );

    t.end();
});

test('bubble capturing path', function(t) {
    var path = paths.resolve('[thing/stuff...]');

    t.plan(1);

    t.equal(
        path,
        '[thing/stuff]'
    );

    t.end();
});

test('bubble capturing root path', function(t) {
    var path = paths.resolve('[...]');

    t.plan(1);

    t.equal(
        path,
        '[]'
    );

    t.end();
});