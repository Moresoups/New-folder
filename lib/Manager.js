const Employee = require('./Employee');

class Manager extends Employee {
    constructor(Mgmt, Email, Onumber) {
        super(Mgmt, Email, Onumber);
        this.officeNum = officeNum;
    }

    getRole() {
        return 'Manager';
    }

    getOffice() {
        return this.officeNum;
    }
}

module.exports = Manager;