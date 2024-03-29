# 2019 Summit Demo 4 Data Samples

This repository contains sample data for demo 4 and a function for converting data from motion and orientation APIs from (device-motion-and-orientation.firebaseapp.com)[https://device-motion-and-orientation.firebaseapp.com] to the necessary wire format.

## Usage

```
$ git clone $THIS_REPO_URL demo4-motion-data
$ cd demo4-motion-data
```

This will use the existing 15 seconds of sample data and perform a conversion to the wire format:

```
$ npm start
```

This will convert the sample data, drop everything after the first second, i.e it takes just a 1 second sample.

```
npm start 1
```

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

## Data Visiualisation

Here are some sample graphs generated from motion data over approximately 10 seconds. It's useful to familiarise yourself with the representation of the axes in the following image to understand the graphs.

![Accelerometer Axes Illustration](https://developers.google.com/web/fundamentals/native-hardware/device-orientation/images/axes.png)

### Horizintal Fist Pump / Punch  Graph

The graph below was generated by making a fist bumping or punching motion. The phone was held upright in a right hand with the the back of the phone facing the palm, i.e a natural holding position.

![Punch](https://i.giphy.com/media/74K2VF1gd55XW/giphy.webp)

Notes:

* X value changes dramatically, since it is aligned with the punch direction, and captures sudden changes in acceleration to and from body
* Y has less dramatic changes than X since arm distance from the earth is relatively consistent in a forward punch motion, it just captures a quick "wind-up" motion 
* Z doesn't change much since the arm doesn't go across or outward from the body

![Fist Bump](https://github.com/rhdemo/2019-demo4-device-data/raw/master/images/graph.punching-right-hand-screen-facing-left.png)


### Phone Wave Graph

The following graph was generated by waving the phone overhead. The sreen was facing forward, for example toward a stage, and the phone was upright.

![Wave](https://media.giphy.com/media/3oz8xLSuLhQXDLQC52/giphy.gif)

Notes:

* X values change the most due to the arm swaying with the phone facing forward, i.e primary X axis motion
* Y values change similar to X but less so since the vertical position of the arm moves less distance over the same time compared to X
* Z changes the least since there's little motion away or toward the body

![Phone Waving](https://github.com/rhdemo/2019-demo4-device-data/raw/master/images/graph.concert-wave-screen-facing-stage.png)