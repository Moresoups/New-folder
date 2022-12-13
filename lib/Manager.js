const Employee = require('./Employee');

class Manager extends Employee {
    constructor(Mgmt, Email, Onumber) {
        super(Mgmt, Email, Onumber);
        this.officeNum = Onumber;
    }

    getRole() {
        return 'Manager';
    }

    getOffice() {
        return this.Onumber;
    }
}

module.exports = Manager;