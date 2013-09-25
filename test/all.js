var test = require('tape'),
    paths = require('../paths');

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