pragma solidity ^0.4.11;
import "../Common.sol";

import "../../../node_modules/minimetoken/contracts/MiniMeToken.sol";
import "./Financial.sol";

/**@title Allocation Proposal
* Allocation proposals send tokens held by Vega to another contract or address. This contract could be a token sale,
* prediction market, exchange or lending contract for example.
*
* ~~Potential Issues~~
*/
contract Allocation is Financial {


      function Allocation(
	  bytes32 _title,
          string _description,
	  uint _duration,
          address _contract,
          address _token,
          uint _amount,
          address _vote,
	  address _oracle
  	)    
    Financial(
	_title,
	_description,
        _duration,
        _contract,
        _token,
        _amount,
        _vote
    ){}

    /**
    * This function needs to handle any checks before the contract can be executed.
    * This is function relies on the calling token
    * @dev Function used to cause the contract to execute.
    */
    function execute(address _vga) public {
        MiniMeToken txToken = MiniMeToken(token);
        txToken.transferFrom(_vga, to, amount);
    }
}
