
var VegaToken = artifacts.require("./tokens/VegaToken.sol");
var VegaCampaign = artifacts.require("./campaigns/VegaCampaign.sol");
var MiniMeTokenFactory = artifacts.require("MiniMeTokenFactory");
var MiniMeToken = artifacts.require("../node_modules/minimetoken/contracts/MiniMeToken.sol");
var StandardVote = artifacts.require("./voting/StandardVote.sol");
var Allocation = artifacts.require("./proposals/financial/Allocation.sol");


module.exports = async function(deployer) {
    let accounts = await web3.eth.accounts
    let now = web3.eth.getBlock(web3.eth.blockNumber).timestamp
    const TIME_INCREMENT = 10000
    const TRANSFER_ONE = 10000
    const TRANSFER_TWO = 12345
    const CAMPAIGN_CAP = 1000000

    
    await deployer.deploy(MiniMeTokenFactory)
    
    await deployer.deploy(VegaToken, MiniMeTokenFactory.address)    
    
    await deployer.deploy(
        VegaCampaign,
        now,
        now + TIME_INCREMENT,
        accounts[0],
        VegaToken.address 
    )

    let vega = await VegaToken.deployed()
    await vega.changeController(VegaCampaign.address)
    await deployer.deploy(
        StandardVote,
        VegaToken.address
    )
    
    await deployer.deploy(
        Allocation,
        TIME_INCREMENT,
        accounts[4],
        VegaToken.address,
        TRANSFER_ONE,
        StandardVote.address
    )

};
