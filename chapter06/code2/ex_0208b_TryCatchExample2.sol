// SPDX-License-Identifier: GPL-3.0

// Try~Catch 오류 처리 예시 2.

pragma solidity >=0.8.1 <0.9.0;

// 배포가 필요 없는 계약.
contract AnotherContract {
    uint[] myArray; 
    uint res;

    constructor(uint _param1, uint _param2) {
        res = _param1/_param2;
    }

    function errFunction(uint _x, uint _y) public returns (uint){
        require(_x != 1 , "Require failed!");   // 임의로 _x = 1 이면 require에 의한 오류가 발생하도록 한다.
        assert(_x != 2);                        // 임의로 _x = 2 이면 assert에 의한 오류가 발생하도록 한다.
        if (_x ==3 ) { revert(); }              // 임의로 _x = 3 이면 revert에 의한 오류가 발생하도록 한다.
        myArray.push(1);                        // OK.
        myArray.pop();                          // OK.
//        myArray.pop();                          // 오류 발생.
        return _x/_y;                           // 오류 발생 가능.
    } 

}


// 배포 되는 계약.
contract TryCatchExample2{

    event catchError(string _name,string _err);
    event catchPanic(string _name,uint256 _err);
    event catchLowLevelError(string _name,bytes _err);
    
    AnotherContract aContract = new AnotherContract(3, 2);

    // 오류 테스트 함수 1.
    // 다른 계약 인스턴스의 함수 실행 도중 오류 발생.
    function tryCatchTest1(uint _x, uint _y) public returns(uint, bool){       
        try aContract.errFunction(_x, _y) returns(uint _res){           // 다른 계약안의 함수. 반환값 받는 방식에 주목!
            return(_res, true);                                         // 성공하는 경우.    
        } catch Error(string memory _error) {
            emit catchError("Require error!",_error);                 // Require에 의한 오류 캣치.
            return(0,false);                                                      
        } catch Panic(uint _errorCode) {                                // 0으로 나누기 오류 0x12 = 십진수 18. Pop 오류 0x31 => 십진수 49.
            emit catchPanic("Assert or Panic error!",_errorCode);     // Assert나 Panic에 의한 오류 캣치.
            return(0,false);
        } catch (bytes memory _errorCode) {                              // Revert에 의한 오류 캣치. 모든 오류 캣치. catch Error, catch Panic 없을때 작동.
            emit catchLowLevelError("Low level error (Revert)!",_errorCode);
            return(0,false);
        }        
    }

    // 오류 테스트 함수 2.
    // 다른 계약 인스턴스의 생성 도중 오류 발생.   
    function tryCatchTest2(uint _x, uint _y) public returns(bool){       
        try new AnotherContract( _x, _y) {     // 다른 계약안의 인스턴스 생성 시도.
            return true ;                      // 성공하는 경우.    
        } catch Panic (uint _error ) {
            emit catchPanic("Assert or Panic error!", _error);          // 생성자 함수에서의 Panic 오류 캣치!
            return false;
        }
 
    }
}
