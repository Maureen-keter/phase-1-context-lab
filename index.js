function createEmployeeRecord(employeeArray) {
  return {
    firstName: employeeArray[0],
    familyName: employeeArray[1],
    title: employeeArray[2],
    payPerHour: employeeArray[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(employeesArray) {
  return employeesArray.map(createEmployeeRecord);
}

function createTimeInEvent(employeeRecord, dateStamp) {
  const [date, hour] = dateStamp.split(" ");
  employeeRecord.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour),
    date: date,
  });
  return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateStamp) {
  const [date, hour] = dateStamp.split(" ");
  employeeRecord.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour),
    date: date,
  });
  return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
  const timeIn = employeeRecord.timeInEvents.find((event) => event.date === date);
  const timeOut = employeeRecord.timeOutEvents.find((event) => event.date === date);
  return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(employeeRecord, date) {
  const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
  return hoursWorked * employeeRecord.payPerHour;
}

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find((employee) => employee.firstName === firstName);
}

function calculatePayroll(employeesArray) {
  return employeesArray.reduce((totalPayroll, employee) => {
    return totalPayroll + allWagesFor(employee);
  }, 0);
}

const allWagesFor = function () {
  const eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  const payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate(this, d);
    }.bind(this),
    0
  );

  return payable;
};


  
  
  