class Calculator{
    constructor(previousOperand,currentOperand){
        this.previousOperand = previousOperand;
        this.currentOperand = currentOperand;
        this.clear();
    }
    clear(){
        this.currentopr = '';
        this.previousopr ='';
        this.operation = undefined;
    }
    delete(){
        this.currentopr = this.currentopr.toString().slice(0,-1);
    }
    appendNumber(number){
        if(number === '.' && this.currentopr.includes('.')) return 
        this.currentopr = this.currentopr.toString() +number.toString();
    }
    chooseOperation(operation){
        if(this.currentopr === '')return
        if(this.currentopr !== ''){
            this.compute();
        }
        this.operation = operation ;
        this.previousopr = this.currentopr;
        this.currentopr ='';
    }
    compute(){
        let computation
        const prev = parseFloat(this.previousopr);
        const curr = parseFloat(this.currentopr);
        if(isNaN(prev) || isNaN(curr)) return
        switch (this.operation) {
            case '+':
                computation = prev +curr;
                break;
            case '-':
                computation = prev -curr;
                break;
            case '*':
                computation = prev *curr;
                break;
            case '÷':
                computation = prev /curr;
                break;
            default:
                break;
        }
        this.currentopr = computation;
        this.operation= undefined;
        this.previousopr =''
    }
    getDisplayNumber(number){
        const stringNumber = number.toString();
        const interDigit = parseFloat(stringNumber.split('.')[0]);
        const decimalDigit = stringNumber.split('.')[1];
        let interDispaly
        if(isNaN(interDigit)){
            interDispaly = ''
        }else{
            interDispaly= interDigit.toLocaleString('en',{maximumFractionDigits:0});
        }
        if(decimalDigit != null){
             return `${interDispaly}.${decimalDigit}`
        }
        else{
            return `${interDispaly}`
        }
    }
    updateDisplay(){
        this.currentOperand.innerText = this.getDisplayNumber(this.currentopr);
        if(this.operation != null){
            this.previousOperand.innerText = `${this.getDisplayNumber(this.previousopr)} ${this.operation}`;
        }
        else{
            this.previousOperand.innerText = this.getDisplayNumber(this.previousopr);
        }
    }
}


const numberButttons = document.querySelectorAll('[data-number]')
const operationButttons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equal]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperand = document.querySelector('[data-previous-operation]')
const currentOperand = document.querySelector('[data-current-operation]')


const calculator = new Calculator(previousOperand,currentOperand );

numberButttons.forEach((buttons)=>{
    buttons.addEventListener('click',()=>{
        calculator.appendNumber(buttons.innerText)
        calculator.updateDisplay();
    })
})

operationButttons.forEach((buttons)=>{
    buttons.addEventListener('click',()=>{
        calculator.chooseOperation(buttons.innerText)
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click',(buttons)=>{
    calculator.compute();
    calculator.updateDisplay();
})
allClearButton.addEventListener('click',(buttons)=>{
    calculator.clear();
    calculator.updateDisplay();
})
deleteButton.addEventListener('click',(buttons)=>{
    calculator.delete();
    calculator.updateDisplay();
})