// SPDX-License-Identifier: GPL-3.0

// Try~Catch 오류 처리 예시 1.

pragma solidity >=0.8.1 <0.9.0;

contract TryCatchExample1{

    uint[] myArray;

    event catchError(string _name,string _err);
    event catchPanic(string _name,uint256 _err);
    event catchLowLevelError(string _name,bytes _err);
    
    // 오류 테스트 함수.
    // 본 계약의 함수 실행 도중 오류 발생.
    function tryCatchTest(uint _x, uint _y) public returns(uint, bool){
        
        try this.errFunction(_x, _y) returns(uint _res){                // 본 계약안의 함수. 반환값 받는 방식에 주목!
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
