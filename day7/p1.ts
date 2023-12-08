import { time } from 'console';
import * as fs from 'fs';


// Specify the file path
const filePath = 'input.txt';
let cards=["A","K","Q","J","T","9","8","7","6","5","4","3","2"]

// Use 'fs.readFile' to read the file asynchronously
fs.readFile(filePath, 'utf8', (err, data) => {  
    if (err) {
        console.error(`Error reading file: ${err}`);
        return;
    }
    let hands:Hand[]=[]
    data.split("\n").forEach(line=>{
        let card= line.match(/(.+) (\d+)/)
        hands.push({
            hand:card[1],
            bid: parseInt(card[2]),
            rank:getRank(card[1])
        })
    })
    hands=sortHands(hands)
    let sum=0
    console.log(hands)
    let multiplier=hands.length
    hands.forEach(hand=>{
        sum+=hand.bid*multiplier
        multiplier--
    })
    console.log(sum)

})

function sortHands(hands:Hand[]){
    return hands.sort(compareHand)
}

interface Hand{
    hand:String,
    bid: number,
    rank?:number[]
}
function compareHand(a:Hand,b:Hand){
    if(a.rank[0]<b.rank[0]){
        return 1
    }
    if(a.rank[0]>b.rank[0]){
        return -1
    }
    if(a.rank[1]<b.rank[1]){
        return 1
    }
    if(a.rank[1]>b.rank[1]){
        return -1
    }
    if(cards.indexOf(a.hand[0])>cards.indexOf(b.hand[0])){
        return 1
    }
    if(cards.indexOf(a.hand[0])<cards.indexOf(b.hand[0])){
        return -1
    }
    if(cards.indexOf(a.hand[1])>cards.indexOf(b.hand[1])){
        return 1
    }
    if(cards.indexOf(a.hand[1])<cards.indexOf(b.hand[1])){
        return -1
    }
    if(cards.indexOf(a.hand[2])>cards.indexOf(b.hand[2])){
        return 1
    }
    if(cards.indexOf(a.hand[2])<cards.indexOf(b.hand[2])){
        return -1
    }
    if(cards.indexOf(a.hand[3])>cards.indexOf(b.hand[3])){
        return 1
    }
    if(cards.indexOf(a.hand[3])<cards.indexOf(b.hand[3])){
        return -1
    }
    if(cards.indexOf(a.hand[4])>cards.indexOf(b.hand[4])){
        return 1
    }
    if(cards.indexOf(a.hand[4])<cards.indexOf(b.hand[4])){
        return -1
    }
    return 0
    
}
function getRank(hand:String){
    let rank=[...cards].map(card=>{
        let cardRegex= new RegExp(`${card}`,"g")
        let amount= [...hand.matchAll(cardRegex)]
        return amount.length
    }).filter(amount=>amount>0)
    rank.sort((a,b)=>{if (a>b) return -1;if (a<b) return 1;return 0})
    return rank
}