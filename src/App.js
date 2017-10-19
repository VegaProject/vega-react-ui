import React, { Component } from 'react'

import getWeb3 from './utils/getWeb3'

// contract declerations
import VegaToken from '../build/contracts/VegaToken.json'
import VegaCampaign from '../build/contracts/VegaCampaign.json'
import MiniMeTokenFactory from '../build/contracts/MiniMeTokenFactory.json'
import MiniMeToken from '../build/contracts/MiniMeToken.json'
import StandardVote from '../build/contracts/StandardVote.json'
import Allocation from '../build/contracts/Allocation.json'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'


class App extends Component {
  constructor(props) {
    super(props)

    // Used to store the current web3 instance and 
    this.state = {
      web3: null,
      allocationValue: 0
    }

    this.proposal = {
      
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3,
        allocationValue: 0,
        blockTime: 0
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  async instantiateContract () {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */
    const TRANSFER_ONE = 10000
    const TRANSFER_TWO = 12345
    

    let web3 = this.state.web3
    let now = web3.eth.getBlock(web3.eth.blockNumber).timestamp
    
    let accounts = web3.eth.accounts

    const contract = require('truffle-contract')
    let contracts = [];
    const vegaToken = contract(VegaToken)
    const vegaCampaign = contract(VegaCampaign)
    const miniMeTokenFactory = contract(MiniMeTokenFactory)
    const miniMeToken = contract(MiniMeToken)
    const standardVote = contract(StandardVote)
    const allocationProp = contract(Allocation)
    
    console.log("Constant::")    
    //onsole.log(miniMeTokenFactory)

    vegaToken.setProvider(web3.currentProvider)
    vegaCampaign.setProvider(web3.currentProvider)
    miniMeTokenFactory.setProvider(web3.currentProvider)
    miniMeToken.setProvider(web3.currentProvider)
    standardVote.setProvider(web3.currentProvider)
    allocationProp.setProvider(web3.currentProvider)

    let factory = await miniMeTokenFactory.at("0xce5fd97efa2a9e4103f1be08947003b6c6e08f4f")
    let vega = await vegaToken.at("0xa5ee101455c449e736d3b0ce334677252ea3dec7")
    let campaign = await vegaCampaign.at("0x04c28e5d5062784622d0ae12a5a68f84f74e94dc")
    let vote = await standardVote.at("0xd261a2dc113f811a20d467e56562aaa40beb67f4")
    let allocation = await allocationProp.at("0xd631c752dbfc4658685bf5459bbda55188b98047")
    
    /*
    var VegaToken = artifacts.require("./tokens/VegaToken.sol");
    var VegaCampaign = artifacts.require("./campaigns/VegaCampaign.sol");
    var MiniMeTokenFactory = artifacts.require("MiniMeTokenFactory");
    var MiniMeToken = artifacts.require("../node_modules/minimetoken/contracts/MiniMeToken.sol");
    var StandardVote = artifacts.require("./voting/StandardVote.sol");
    var Allocation = artifacts.require("./proposals/financial/Allocation.sol");
    */

    
    this.setState({        
      blockTime: now})


    // Get accounts.
    let senderOne = accounts[0]
    let senderTwo = accounts[1]     
    
    console.log(senderOne)

    console.log(TRANSFER_ONE)
    
    
    // Use balanceOfAt as current MiniMeToken does not support balance()        
    await campaign.sendTransaction({from: senderOne, value: TRANSFER_ONE})
    //await campaign.sendTransaction({from: senderOne, value: TRANSFER_ONE})
    
    /*
    let valueOne = await vega.balanceOfAt(senderOne, web3.eth.getBlock(web3.eth.blockNumber).timestamp)
    // Transfer tokens to second account
    await campaign.sendTransaction({from: senderTwo, value: TRANSFER_TWO})
    let valueTwo = await vega.balanceOfAt(senderTwo, web3.eth.getBlock(web3.eth.blockNumber).timestamp)

    await vote.vote(true, {from: senderOne})
    await vote.countVote()

    await vega.transfer(vega.address, TRANSFER_ONE, {from: senderOne} )

    let senderOneVoteIndex = await vote.statusMap(senderOne)
    let senderOneVoteInfo = await vote.votes(senderOneVoteIndex[1].toNumber())
    let voteResult = await vote.isVotePassed()
    await vega.executeFinancialProposal(allocation.address)        
    let allocationValue = await vega.balanceOfAt(accounts[4], web3.eth.getBlock(web3.eth.blockNumber).timestamp)

    this.setState({        
      allocationValue: allocationValue,
      blockTime: now})    

      */
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Vega Fund</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Vega MVP</h1>
              <p>The Vega contracts should be ready to go</p>
              <h2>Smart Contract Example</h2>
              <p>If your contracts compiled and migrated successfully, below will show an allocation value of  10000 (by default).</p>
              <p>Try changing the value stored by <strong>TRANSFER_ONE on line 28</strong> of App.js.</p>
              <p>The stored value is: {this.state.allocationValue}</p>
              <p>The block time is: {this.state.blockTime}</p>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
