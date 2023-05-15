//Anagrams module

const autoAnagrams = () => {
    const restring = (word) => {
        let restringedWord = word.split("").sort().join("")
        
        return restringedWord
    }
    
    const checkForAnagrams = (string, array) => {
        let sameLengthStrings = []
        array.forEach(element => {
            if (element.length === string.length) {
                sameLengthStrings.push(element)
            }
        })
            
        let anagrams = []
        sameLengthStrings.forEach(element => {
            if (restring(element) === restring(string) && element !== string) {
                anagrams.push(element)
            }
        })
        return anagrams
    }
    let text = document.getElementById("anagramsInput").value.toLowerCase()
    let anagramsList = checkForAnagrams(text, words).join(", ")
    if (anagramsList.length > 0) {
        document.getElementById("anagramsOutput").innerHTML = "Possible Anagrams: " + anagramsList
    } else {
        document.getElementById("anagramsOutput").innerHTML = ""
    }
}

//Dates module

let date1 = document.getElementById("dateInput1").value
let date2 = document.getElementById("dateInput2").value


const convertDateFromInput = (value) => {
    let initialArray = value.split("-")
    let date = new Date(initialArray[0], initialArray[1] - 1, initialArray[2])
    console.log(date)
    return date
}

const setDate1 = () => {
    date1 = convertDateFromInput(document.getElementById("dateInput1").value)
    return
}

const setDate2 = () => {
    date2 = convertDateFromInput(document.getElementById("dateInput2").value)
    return
}

const getDaysAgoString = (date1, date2) => {
    console.log("Analyzing new dates...")
    console.log(date1)
    console.log(date2)
    let date1Month = date1.getMonth()
    let date1Day = date1.getDate()
    let date1Year = date1.getFullYear()

    let date2Month = date2.getMonth()
    let date2Day = date2.getDate()
    let date2Year = date2.getFullYear()

    let daysApart = 0
    
    let date1Time = (date1.getTime() / 86400000).toFixed(0)
    let date2Time = (date2.getTime() / 86400000).toFixed(0)

    if (date1Time < 0 && date2Time > 0) {
        daysApart = Number(date1Time * -1) + Number(date2Time)
    } else if (date1Time > 0 && date2Time < 0) {
        daysApart = Number(date1Time) + Number(date2Time * -1)
    } else if (date1Time < 0 && date2Time < 0) {
        daysApart = Number(date1Time * -1) + Number(date2Time * -1)
    }

    if (date1Time > date2Time) {
        daysApart = date1Time - date2Time
    }
    if (date2Time > date1Time) {
        daysApart = date2Time - date1Time
    }
    
    if (date1Month === date2Month && 
        date1Day === date2Day && 
        date1Year === date2Year) {
        console.log("Same Day")
        document.getElementById("dateOutput").innerHTML = "Same Day!"
        return "Same Day"
    }
    if ((date1Month === date2Month && 
        date1Day === date2Day - 1 && 
        date1Year === date2Year) 
        || 
        (date1Month === date2Month && 
        date2Day === date1Day - 1 && 
        date1Year === date2Year)) {
        console.log("Previous Day")
        document.getElementById("dateOutput").innerHTML = "Just one day!"
        return "Previous Day"
    }

    if (daysApart < 0) {
        daysApart = daysApart * -1
    }

    console.log("Days Apart: " + daysApart)
    document.getElementById("dateOutput").innerHTML = "Days Apart: " + daysApart
    return
}

const calculateDate = () => {
    getDaysAgoString(date1, date2)
}

const setOutputTest = () => {
    document.getElementById("dateOutput").innerHTML = document.getElementById("dateInput1").value
}

const dateButton = document.getElementById("dateButton")
dateButton.addEventListener("click", calculateDate)

//Page Timer Module



const pageTimer = () => {
    let timerOutput = document.getElementById("timerOutput")
    let intervalOutput = document.getElementById("timerIntervalOutput")
    let time = 0
    let seconds = 0
    let minutes = 0
    let hours = 0

    const updateModule = () => {
        time++
        seconds++
        if (seconds === 60) {
            minutes++
            seconds = 0
        }
        if (minutes === 60) {
            hours++
            minutes = 0
        }

        if (hours > 0) {
            timerOutput.innerHTML = `You first loaded this page ${hours.toFixed(0)} hour(s), ${minutes.toFixed(0)} minute(s), and ${seconds.toFixed(0)} second(s) ago!`
        } else if (minutes > 0) {
            timerOutput.innerHTML = `You first loaded this page ${minutes.toFixed(0)} minute(s) and ${seconds.toFixed(0)} second(s) ago!`
        } else {
            timerOutput.innerHTML = `You first loaded this page ${seconds.toFixed(0)} second(s) ago!`
        }
        intervalOutput.innerHTML = `This timer has updated itself ${time} time(s) since you've been here! That's once every second, in case it wasn't obvious!`
    }

    setInterval(updateModule, 1000)
}

pageTimer()