console.log('Starting conversion...')

const start = Date.now()
const fs = require('fs')
const orientation = require('./orientation.original.json')
const motion = require('./motion.original.json')


const orientationStartTs = orientation[0].ts
const motionStartTs = orientation[0].ts

function timeFilter (input) {
    const seconds = process.argv[2] ? parseInt(process.argv[2], 10) : null

    if (isNaN(seconds)) {
        throw new Error('seconds argument must be a number, i.e "node index.js 2"')
    }
    
    if (!seconds) {
        // No timeframe specified, so don't filter anything
        return true
    } else {
        return Math.abs(input.ts - orientationStartTs) < seconds * 1000
    }
}

fs.writeFileSync(
    'orientation.compressed.json',
    JSON.stringify(
        orientation.filter(timeFilter).map(o => [
            parseFloat(o.alpha.toFixed(5)),
            parseFloat(o.beta.toFixed(5)),
            parseFloat(o.gamma.toFixed(5))
        ])
    )
)

fs.writeFileSync(
    'motion.acceleration.compressed.json',
    JSON.stringify(
        motion.filter(timeFilter).map(m => [
            parseFloat(m.acceleration.x.toFixed(5)),
            parseFloat(m.acceleration.y.toFixed(5)),
            parseFloat(m.acceleration.z.toFixed(5))
        ])
    )
)

console.log(`Finished conversion in ${Date.now() - start}ms...`)

const originalStats = {
    orientation: fs.statSync('./orientation.original.json'),
    motion: fs.statSync('./motion.original.json')
}

const compressedStats = {
    orientation: fs.statSync('./orientation.compressed.json'),
    motion: fs.statSync('./motion.acceleration.compressed.json')
}

console.log(`
Orientation before: ${originalStats.orientation.size / 1024}kb
Orientation after: ${originalStats.orientation.size / 1024}kb

Motion acceleration before: ${compressedStats.motion.size / 1024}kb
Motion acceleration after: ${compressedStats.motion.size / 1024}kb
`)