// SPDX-License-Identifier: GPL-3.0

// 구조체 예시 1.

pragma solidity >=0.7.0 <0.9.0;

contract StructExample1 {

    struct Customer {
        string name;
        uint amount;
    }

    Customer[] public customers;     // 동적 storage 배열. 원소는 "Cutomer" 자료형.

    function addCustomer(string memory _name, uint _amount) public {
    /*    Customer memory aCustomer;
        aCustomer.name = _name;
        aCustomer.amount = _amount;
        customers.push(aCustomer);                        */
    //    customers.push(Customer( {name:_name, amount:_amount}));
        customers.push(Customer(_name, _amount));
    }

}
