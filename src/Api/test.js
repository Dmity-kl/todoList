function sumOfIntegersInString(s) {
    let out = 0
    let arr = s.split('').map(el=> {
        if (!isNaN(el)) {
            out += +el
        }
    })
}

sumOfIntegersInString("h3ll0w0rld");

