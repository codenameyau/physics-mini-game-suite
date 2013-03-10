#!/bin/bash

# Path to impact.js and your game's main .js
IMPACT_LIBRARY=lib/impact/impact.js

# Change CWD to Impact's base dir and bake!
cd ..
php tools/bake.php $IMPACT_LIBRARY lib/game/pandaplay.js pandaplay.min.js
php tools/bake.php $IMPACT_LIBRARY lib/game/gravityDemo.js gravityDemo.min.js
php tools/bake.php $IMPACT_LIBRARY lib/game/jetpack.js jetpack.min.js
