//var operands = ['48', ['8', '2', ['5', ['2', '4']]], '2', '2'];
//var operations = ['+', ['*', '+', ['^', ['+']]], '+', '+'];
var operands = []
var operations = []
var operationHistory = []
var historyIndex = -1;
var historyInd = document.getElementById("historyIndex")
var hOperation = document.getElementById("hOperation")
var hResult = document.getElementById("hResult")
var actualOprdArray = [0, operands]
var actualOprtArray = [0, operations]
var tempOprdArrays = [operands]
var tempOprtArrays = [operations]

// Funciones terminadas
function backHistory() {
    if (historyIndex == -1) {
        if (operationHistory.length > 0) {
            historyIndex = operationHistory.length - 1
            setHistory()
        }
    }
    else if (historyIndex > 0) {
        historyIndex = historyIndex - 1
        setHistory()
    }
    else {
        setHistory()
    }
}
function forwHistory() {
    if (historyIndex == -1) {
        if (operationHistory.length > 0) {
            historyIndex = operationHistory.length - 1
            setHistory()
        }
    }
    else if (historyIndex < operationHistory.length - 1) {
        historyIndex = historyIndex + 1
        setHistory()
    }
    else {
        setHistory()
    }
}
function setHistory() {
    if ((historyInd.childNodes.length + hOperation.childNodes.length + hResult.childNodes.length) != 0) {
        historyInd.removeChild(historyInd.firstChild)
        hOperation.removeChild(hOperation.firstChild)
        hResult.removeChild(hResult.firstChild)
    }
    historyInd.appendChild(document.createTextNode(historyIndex + 1))
    hOperation.appendChild(document.createTextNode(operationHistory[historyIndex][0]))
    hResult.appendChild(document.createTextNode(operationHistory[historyIndex][1]))
}
function translateOperation(pOperands, pOperations) {
    var string = ''
    for (var i = 0; i < pOperands.length; i++) {
        if (Array.isArray(pOperands[i]) && pOperands[i].length == 1) {
            pOperands[i] = pOperands[i][0]
        }
    }
    while (pOperands.length > 1) {
        console.log(pOperands[0])
        console.log(pOperations[0])
        if (!Array.isArray(pOperands[0])) {
            string += pOperands[0] + pOperations[0]
            pOperands = pOperands.slice(1, pOperands.length)
            pOperations = pOperations.slice(1, pOperations.length)
        }
        else {
            string += '(' + translateOperation(pOperands[0], pOperations[0]) + ')'
            if (pOperations.length > 1) {
                string += pOperations[1]
            }
            pOperands = pOperands.slice(1, pOperands.length)
            pOperations = pOperations.slice(2, pOperations.length)
        }
    }
    console.log(pOperands[0])
    if (!Array.isArray(pOperands[0])) {
        string += pOperands[0]
    }
    else {
        string += '(' + translateOperation(pOperands[0], pOperations[0]) + ')'
    }
    return string
}
function disolveParth(pOperands, pOperations) {
    for (var i = pOperands.length - 1; i >= 0; i--) {
        if (Array.isArray(pOperands[i])) {
            for (var j = pOperations.length - 1; j >= 0; j--) {
                if (Array.isArray(pOperations[j])) {
                    pOperands[i] = disolveParth(pOperands[i], pOperations[j]);
                    pOperations = pOperations.slice(0, j).concat(pOperations.slice(j + 1, pOperations.length));
                }
            }
        }
    }
    var s = resolveEq(pOperands, pOperations);
    return s[0]
}
function resolveEq(pOperands, pOperations) {
    var tempVar = pOperations.indexOf("^");
    while (tempVar != -1) {
        var x = Math.pow(parseFloat(pOperands[tempVar]), parseFloat(pOperands[tempVar + 1]))
        pOperands[tempVar] = '' + x
        var s = moveMarks(pOperands, pOperations, tempVar)
        pOperands = s[0]
        pOperations = s[1]
        tempVar = pOperations.indexOf("^");
    }
    tempVar = pOperations.indexOf("/");
    while (tempVar != -1) {
        var x = parseFloat(pOperands[tempVar]) / parseFloat(pOperands[tempVar + 1])
        pOperands[tempVar] = '' + x
        var s = moveMarks(pOperands, pOperations, tempVar)
        pOperands = s[0]
        pOperations = s[1]
        tempVar = pOperations.indexOf("/");
    }
    tempVar = pOperations.indexOf("*");
    while (tempVar != -1) {
        var x = parseFloat(pOperands[tempVar]) * parseFloat(pOperands[tempVar + 1])
        pOperands[tempVar] = '' + x
        var s = moveMarks(pOperands, pOperations, tempVar)
        pOperands = s[0]
        pOperations = s[1]
        tempVar = pOperations.indexOf("*");
    }
    tempVar = pOperations.indexOf("+");
    while (tempVar != -1) {
        var x = parseFloat(pOperands[tempVar]) + parseFloat(pOperands[tempVar + 1])
        pOperands[tempVar] = '' + x
        var s = moveMarks(pOperands, pOperations, tempVar)
        pOperands = s[0]
        pOperations = s[1]
        tempVar = pOperations.indexOf("+");
    }
    tempVar = pOperations.indexOf("-");
    while (tempVar != -1) {
        var x = parseFloat(pOperands[tempVar]) - parseFloat(pOperands[tempVar + 1])
        pOperands[tempVar] = '' + x
        var s = moveMarks(pOperands, pOperations, tempVar)
        pOperands = s[0]
        pOperations = s[1]
        tempVar = pOperations.indexOf("-");
    }
    return pOperands
}
function moveMarks(pOperands, pOperations, tempVar) {
    console.log('asasasa'+tempVar)
    if (tempVar == 0) {
        console.log('asdas')
        pOperands = pOperands.slice(0, 1).concat(pOperands.slice(2, pOperands.length));
        pOperations = pOperations.slice(1, pOperations.length);
    }
    else if (tempVar + 2 - pOperands.length == 0) {
        console.log('dasdasd')
        pOperands = pOperands.slice(0, tempVar + 1)
        pOperations = pOperations.slice(0, pOperations.length-1)
    }
    else {
        console.log('huehuee')
        pOperands = pOperands.slice(0, tempVar+1).concat(pOperands.slice(tempVar + 2, pOperands.length))
        pOperations = pOperations.slice(0, tempVar).concat(pOperations.slice(tempVar + 1, pOperations.length))
    }
    console.log(pOperands)
    console.log(pOperations)
    return [pOperands, pOperations]
}
function clearAll(){
    operands = []
    operations = []
    actualOprdArray = [0, operands]
    actualOprtArray = [0,operations]
    tempOprdArrays = [operands]
    tempOprtArrays = [operations]
    document.getElementById("display").value = ''
}
function display(vara){
    var g = document.getElementById("display").value
    document.getElementById("display").value = g + vara
}
// Funciones que ya se hacer y me da pereza o estan en proceso

//Funciones en las que estoy pensando cómo es que las voy a hacer
function compute() {
    operands = tempOprdArrays[0]
    operations = tempOprtArrays[0]
    console.log(operands)
    console.log(operations)
    if (operands.length > 0 && operations.length > 0) {
        $("#calloutMessage").hide()
        var translatedOperation = translateOperation(operands, operations)
        var s = disolveParth(operands, operations)
        var r = [translatedOperation, s]
        operationHistory.push(r)
        forwHistory()
        clearAll()
    }
    else if(operands.length==1 && operations.length ==0)
    {
        $("#calloutMessage").hide()
        var translatedOperation = operands[0]
        var s = operands[0]
        var r = [translatedOperation, s]
        operationHistory.push(r)
        forwHistory()
        clearAll()
    }
    else {
        
        $("#calloutMessage").show()
    }
}

function openParth() {
    var temp = [tempOprdArrays.length, []]
    tempOprdArrays.push(temp)
    actualOprdArray = temp
    temp = [tempOprtArrays.length, []]
    tempOprtArrays.push(temp)
    actualOprtArray = temp
}

function closeParth() {
    var par3 = actualOprdArray[2]
    var par4 = actualOprdArray[3]
    var par7 = actualOprtArray[2]
    var par8 = actualOprtArray[3]
    
    if(Array.isArray(par4) && Array.isArray(par8))
    {
        if(par4.length == 1)
        {
            tempOprdArrays[par3][1].push(par4[0])
        }
        if(par4.length > 1)
        {
            tempOprdArrays[par3][1].push(par4)
            tempOprtArrays[par7][1].push(par8)
        }
        actualOprdArray = tempOprdArrays[par3]
        tempOprdArrays.pop()
        actualOprtArray = tempOprtArrays[par7]
        tempOprtArrays.pop()
    }
    console.log()
}

// Funciones que falta desarrollar

function addOperation(operator) {
    if (operands.length > 0 && operations.length == 0) {
        operations.push(operator);
    }
    else if (operands.length > operations.length) {
        operations.push(operator)
    }
    else if (operands.length === operations.length) {
        operations[operations.length - 1] = operator;
    }
}

function addValue(value) {
    if (actualOprdArray[1].length == 0 && actualOprtArray[1].length == 0) {
        operands.push(value);
    }
    else if (actualOprdArray[1].length > 0 && actualOprtArray[1].length > 0) {
        if (actualOprdArray[1].length === actualOprtArray[1].length) {
            actualOprdArray[1].push(value);
            console.log(value);
        }
        else if (actualOprdArray[1].length > actualOprtArray[1].length) {
            actualOprdArray[1][actualOprdArray[1].length - 1] = actualOprdArray[1][actualOprdArray[1].length - 1] + value;
            console.log(actualOprdArray[1][actualOprdArray[1].length - 1]);
        }
    }
    else if (actualOprdArray[1].length > actualOprtArray[1].length) {
        if (actualOprdArray[1][actualOprdArray[1].length - 1] !== undefined) {
            actualOprdArray[1][actualOprdArray[1].length - 1] = actualOprdArray[1][actualOprdArray[1].length - 1] + value;
            console.log(operands[operands.length - 1]);
        }
    }
}

function sin(){
    var value
    var resultSin
    if(operands.length==0){
        value = 0;
    }
    else if(operands.length>0){
        value = operands[operands.length-1];
    }
    resultSin = Math.sin(value)
    actualOprdArray[1].pop()
    actualOprdArray[1].push(resultSin)
    console.log(operands)
}

function cos(){
    var value;
    var resultCos;
    if(operands.length==0){
        value = 0;
    }
    else if(operands.length>0){
        value = operands[operands.length-1];
    }
    resultCos = Math.cos(value)
    actualOprdArray[1].pop()
    actualOprdArray[1].push(resultCos)
    console.log(resultCos)
    console.log(operands)
}

function e(){
    var e = Math.E
    actualOprdArray[1].push(e)
    console.log(actualOprdArray[1])
}

function pi() {
    var pi = Math.PI
    actualOprdArray[1].push(pi)
    console.log(actualOprdArray[1])
}

function factorial(){
    var i;
    var result = 1
    var valueFact = actualOprdArray[1][actualOprdArray[1].length-1]
    var numberValueFact = parseInt(valueFact)
    if(numberValueFact == 0){
        result = 1
    }
    else{
        for(i = 1; i <= numberValueFact; i++){
            result = result * i;
        }
    }
    actualOprdArray[1].pop()
    actualOprdArray[1].push(result)
    console.log(result)
    console.log(operands)
}

function twoTimes(){
    actualOprdArray[1].push('2')
    actualOprtArray[1].push('^')
}
function square(){
    actualOprdArray[1].push('0.5')
    actualOprtArray[1].push('^')
}


function changeSign(){
    var respuesta
    var valValChange = operands[operands.length-1]
    respuesta = valValChange*-1
    operands.splice(operands.length-1,operands.length,respuesta)
    console.log(respuesta)
    console.log(operands)
}

function powTo(){
    var respuestaPow
    var valOne
    var valTwo
    
}
