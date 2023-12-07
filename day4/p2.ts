import * as fs from 'fs'
import test from 'node:test'

// Specify the file path
const filePath = 'input.txt'

// Use 'fs.readFile' to read the file asynchronously
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading file: ${err}`)
        return
    }
    let tickets=data.split('\n').map((line,index,lines)=>transformTickets(line,index))
    let finalResult=getWinningTickets(tickets,tickets)
    console.log(finalResult)
})
function getWinningTickets(tickets,allTickets){
    let ticketsWon=[]
    tickets.forEach(ticket => {
        let result=process(ticket).filter(ticketNumber=>ticketNumber<allTickets.length)
        if(result.length>0){
            result.forEach(number=>ticketsWon.push(allTickets[number]))
        }
    })
    if(ticketsWon.length>0){
        return ticketsWon.length + getWinningTickets(ticketsWon,allTickets)
    }
    return allTickets.length
}
function transformTickets(line,index){
    return {numbers:line.split(':')[1].split('|').map(number=>number.split(' ')).map(number=>number.filter(n=>n!='')),ticketNumber:index+1}
}

function process(ticket){
    let tickets=[]
    let ticketsWon=0
    ticket.numbers[1].forEach(number=>{
        if(ticket.numbers[0].includes(number)){
            tickets.push(ticket.ticketNumber+ticketsWon)
            ticketsWon++
        }
    })
    return tickets

}