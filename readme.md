
# D3 version 4 is coming!

The next version of the data visualisation library D3 is on the way.

One of the major changes is the splitting up (or modularising) of the library into
completely separate, independent modules (which can still depend on one another).
This means that you only need to pull the exact module you need into your project,
as opposed to having to pull in the **whole** d3 library, as you do currently.

This modularisation reflects what D3 is, a **library of separate modules**. Some
depend on other modules, but some are completely independent.
You can see the dependency relationships of all the modules in D3v4 in
this funky [D3 visualisation](http://bl.ocks.org/alisd23/5762cc5912253c4febeb).

D3FC, the financial charting library built on top of D3, is helping to be maintained
by a few guys here at Scott Logic. We want to to follow in D3's footsteps by also
looking at modularising D3FC, and the best place to start with that is by looking
at how D3 is split up, and thus the visualisation was born.
