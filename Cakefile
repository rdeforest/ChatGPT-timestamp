task 'build', 'Coffee -> JS conversion',
(options) ->
  { spawn } = require 'node:child_process'

  spawn 'coffee', ['-c', '-b', '-o', '.', 'src']
