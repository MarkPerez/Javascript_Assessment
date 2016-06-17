//Event Listener for calculate button
var event1 = document.getElementById("button1");
event1.addEventListener('click', calculate, false);

//Event Listener for reset button
var event2 = document.getElementById("button2");
event2.addEventListener('click', reset, false);

//function to round values to whole integer
function roundToInt(value){
    return Math.round(value);
}

//function for calculating and displaying tax data upon clicking 'calculate' button

function calculate(){
    var personalAllowance = 11000;
    
    //take user input for gross salary    
    var grossSalary = parseInt(document.getElementById("salary").value);
    
    var basicRateTax = 0;
    var higherRateTax = 0;
    var additionalRateTax = 0;
    var totalTax = 0;
    
    var nationalInsurance = 0;
    
    //calculate NI contributions
    if ((grossSalary / 52) <= 155) {
        nationalInsurance = 0;
    }
    
    else if ((grossSalary / 52) <= 827) {
        nationalInsurance = roundToInt((((grossSalary / 52) - 155) * 0.12) * 52);
    }
    
    else {
        nationalInsurance = roundToInt(((((grossSalary / 52) - 827) * 0.02) * 52) + (((672 * 0.12) * 52)));
    }
    
    //to adjust personal allowance (PA) if salary is less than £11,000
    if (grossSalary < 11000) {
        personalAllowance = grossSalary;
    }
    
    //calculation for tax on salary
    if (grossSalary <= 11000) {
        //no charge
    }
    
    else if (grossSalary <= 43000) {
        //20% tax on salary after deducting PA
        basicRateTax = roundToInt((grossSalary - 11000) * 0.2);
        totalTax = basicRateTax;
        }
    
    else if (grossSalary <= 150000) {
        basicRateTax = 6400;
        higherRateTax = roundToInt((grossSalary - 43000) * 0.4);
        totalTax = basicRateTax + higherRateTax;
        if (grossSalary > 100000) {
            //to reduce PA by £1 for every £2 above £100,000
            for (i = 100000; i < grossSalary; i++) {
                personalAllowance -= 0.5;
                if (personalAllowance == 0) {
                    break;
                }                
            }
            higherRateTax = roundToInt((grossSalary - (32000 + personalAllowance))* 0.4);
            totalTax = basicRateTax + higherRateTax;
        }
    }
        
    else {
        basicRateTax = 6400;
        higherRateTax = 47200;
        personalAllowance = 0;
        additionalRateTax = roundToInt((grossSalary-150000) * 0.45);
        totalTax = basicRateTax + higherRateTax + additionalRateTax;
    }
    
    var netSalary = grossSalary - totalTax;

    document.getElementById("demo").innerHTML = "Your gross salary is: £" + grossSalary + "<br>" + "Your personal allowance is: £" + personalAllowance + "<br>" + "Your total tax to pay is: £" + totalTax + "<br>" + "Your net salary is £" + netSalary + "<br><br>" + "National Insurance: £" + nationalInsurance + "<br><br>" + "Your tax breakdown is as follows: " + "<br>" + "Tax to pay at 20%: £" + basicRateTax + "<br>" + "Tax to pay at 40%: £" + higherRateTax + "<br>" + "Tax to pay at 45%: £" + additionalRateTax;
    
} 
    
function reset() {
    document.getElementById("demo").innerHTML = "";
    document.getElementById("inputField").reset();
    
}