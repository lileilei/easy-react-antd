/**
 * Created by lilei on 2017/8/23.
 */
module.exports = function (cmd, args, fn) {
    args = args || [];
    var runner = require('child_process').spawn(cmd, args, {
        // keep color
        stdio: "inherit"
    });
    runner.on('close', function (code) {
        if (fn) {
            fn(code);
        }
    });
}