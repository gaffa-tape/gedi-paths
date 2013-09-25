Gedi Paths
====

A convenience library for working with gedi paths.

[![browser support](https://ci.testling.com/gaffa-tape/gedi-paths.png)](https://ci.testling.com/gaffa-tape/gedi-paths)

    var paths = require('gedi-paths');

    paths.create(number/string/array);
    // Create a valid gedi path from a string/number, or an array of strings/numbers.

    paths.isAbsolute(path);
    // Checks if a path is absolute (basically, starts with '/'

    paths.isRoot(path);
    // Checks if a path is equivilent to '[]'

    paths.append(path1, path2, ... pathN);
    // Adds paths together to form an unresolved path,
    // eg, paths.append('[stuff]', '[/things]', '[..majigger]');
    // would result in [stuff//things/..majigger], an unresolved, invalid path.

    paths.toParts(path);
    // Breaks a path into an array of path parts/keys.

    paths.createRoot();
    // Returns a root path ('[/]')

    paths.resolve(path1, path2, ... pathN);
    // Resolves an invalid path to a valid one,
    // eg: paths.resolve('[stuff//things/..majigger]')
    // would result in '[/majigger]'