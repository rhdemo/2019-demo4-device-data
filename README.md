# 2019 Summit Demo 4 Data Samples

This repository contains sample data for demo 4 and a function for converting data from motion and orientation APIs from (device-motion-and-orientation.firebaseapp.com)[https://device-motion-and-orientation.firebaseapp.com] to the necessary wire format.

## Usage

```
$ git clone $THIS_REPO_URL demo4-motion-data
$ cd demo4-motion-data
$ npm start
```

This will use the existing 15 seconds of sample data and perform a conversion to the wire format.

```
npm start 1
```

This will convert the sample data, drop everything after the first second, i.e it takes just a 1 second sample.

If you'd like to use your own data simply replace the contents of the `motion.original` and `orientation.original` files.

## Data Format

*NOTE: Timing is not discussed here. We may need to include a millisecond timestamp with data, or agree on a fixed frame rate so delta time can be determined.*

The format we capture data on the device is as follows for a motion event:

```json
{
    "acceleration": {
        "x": -0.0011076927185058594,
        "y": -0.060723304748535156,
        "z": -0.07527446746826172
    },
    "accelerationIncludingGravity": {
        "x": 0.287750244140625,
        "y": 6.3225555419921875,
        "z": 7.5971221923828125
    },
    "rotationRate": {
        "alpha": 0.9275943308010917,
        "beta": -0.3811791972000716,
        "gamma": -0.320854966450519
    },
    "interval": 16
}
```

And like so for an orientation event:

```json
{
    "absolute": false,
    "alpha": 272.2940660035605,
    "beta": 39.88342654342948,
    "gamma": -3.6924383101608496,
    "ts": 1550081584632
}
```

These events can fire approximately 60 times per second on device, so to cope with this volume of data we need to:

* Sample at a lower rate (i.e drop frames)
* Convert to a wire format
* Lower the precision of floats to N decimals

A sample wire example might be like so for two motion events. This sample is capturing the acceleration vector `[x,y,z]`:

```json
[ [-0.00111,-0.06072,-0.07527], [-0.00774,-0.05188,0.0049] ]
```

Orientation can be similar, `[alpha, beta, gamma]`. Below we show two captured events:

```json
[ [272.29407,39.88343,-3.69244], [272.34559,39.76428,-3.82513] ]
```
