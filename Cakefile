fs = require 'node:fs'

option '-p', '--patch', 'bump patch version (default)'
option '-m', '--minor', 'bump minor version'
option '-M', '--major', 'bump major version'

option '-s', '--set [VERSION]', 'explicitly set the full version'

task 'build', 'Coffee -> JS conversion',
  (options) ->
    { spawn } = require 'node:child_process'

    spawn 'coffee', ['-c', '-b', '-M', '-o', './js', './src']

task 'build:watch', 'Continuous Coffee -> JS conversion',
  (options) ->
    { spawn } = require 'node:child_process'

    spawn 'coffee', ['-w', '-c', '-b', '-M', '-o', './js', './src']


task 'bumpver', 'Increment patch, minor or major version',
  (options) ->
    pkgConfig = require './package.json'

    if options.set
      version = parseVersion options.set
    else
      version = parseVersion pkgConfig.version

      if options.minor
        version.minor++
        version.patch = 0
      else if options.major
        version.major++
        version.minor =
        version.patch = 0
      else
        version.patch++

    pkgConfig.version = version.toString()
    fs.writeFileSync './package.json', JSON.stringify pkgConfig, null, 2

# Almost certainly re-inventing the wheel here, but I don't want to bloat my
# project with one-size-fits-all packages.
parseVersion = (s) ->
  [_, major, minor, patch] =
    s .match /(\d+)(?:\.(\d+)(?:\.(\d+))?)?/
      .map (n) -> parseInt(n) or 0

  {
    toString: -> [@major, @minor, @patch].join '.'
    major
    minor
    patch
  }

