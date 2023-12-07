import { time } from 'console';
import * as fs from 'fs';

// Specify the file path
const filePath = 'input.txt';

// Use 'fs.readFile' to read the file asynchronously
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading file: ${err}`);
        return;
    }
    let lines=data.split("\n")
    let times=[...lines[0].matchAll(/\d+/g)].map(match=>match[0])
    let distances=[...lines[1].matchAll(/\d+/g)].map(match=>match[0])
    let sum=1
    for (let index = 0; index < times.length; index++) {
        let range=getRange(times[index],distances[index])
        sum*=range
    }
    console.log(sum)
})

function getRange(time,distance){
    //console.log("calculating lowest acc for distance: " + distance+ " in time: "+time)
    let distanceTraveled=0
    let secondsCharged=0
    let timePassed=0
    while(distanceTraveled<=distance){
        timePassed=0
        distanceTraveled=0
        secondsCharged++
        while(timePassed+secondsCharged<time){
            timePassed++
            distanceTraveled=secondsCharged*timePassed
        }
    }
    //console.log("charged for " + secondsCharged + " covered distance " + distanceTraveled + " in " + timePassed);

    return (timePassed-secondsCharged)+1
}
function getLowestAcc(time,distance){
    //console.log("calculating lowest acc for distance: " + distance+ " in time: "+time)
    let distanceTraveled=0
    let secondsCharged=0
    let timePassed=0
    while(distanceTraveled<=distance){
        timePassed=0
        distanceTraveled=0
        secondsCharged++
        while(timePassed+secondsCharged<time){
            timePassed++
            distanceTraveled=secondsCharged*timePassed
        }
    }
    //console.log("charged for " + secondsCharged + " covered distance " + distanceTraveled + " in " + timePassed);
    //console.log("range from min "  + (timePassed-secondsCharged))

    return secondsCharged
}
function getHighestAcc(time,distance){
    //console.log("calculating highest acc for distance: " + distance+ " in time: "+time)
    let distanceTraveled=0
    let secondsCharged=time
    let timePassed=0
    while(distanceTraveled<=distance){
        timePassed=0
        distanceTraveled=0
        secondsCharged--
        while(timePassed+secondsCharged<time){
            timePassed++
            distanceTraveled=secondsCharged*timePassed
        }
    }
    //console.log("charged for " + secondsCharged + " covered distance " + distanceTraveled + " in " + timePassed);
    //console.log("range from max "  + (secondsCharged-timePassed))
    return secondsCharged

}