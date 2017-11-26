import "../stylesheets/app.css";
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract';
import { default as CryptoJS } from 'crypto-js';


var accounts;
var account;
var foodSafeABI;
var foodSafeContract;
var foodSafeCode;


window.App = {
  start: function() {
    var self = this;
    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      account = accounts[0];
      web3.eth.defaultAccount = account;
      
      var foodSafeSource = "pragma solidity ^0.4.6; contract FoodSafe { struct Location { string name; uint locationId; uint previousLocationId; uint timestamp; string secret; } mapping(uint => Location) Trail; // by default trail count is zero; uint8 TrailCount; function addNewLocation(uint locationId, string name,string secret) { Location memory newLocation; newLocation.name = name; newLocation.locationId = locationId; newLocation.secret = secret; newLocation.timestamp = now; if (TrailCount!=0) { newLocation.previousLocationId = Trail[TrailCount].locationId; } Trail[TrailCount] = newLocation; TrailCount++; } function getTrailCount() returns(uint8) { return TrailCount; } function getLocation(uint8 trailNo) returns(string,uint,uint,uint,string) { return (Trail[trailNo].name,Trail[trailNo].locationId,Trail[trailNo].previousLocationId,Trail[trailNo].timestamp,Trail[trailNo].secret); } }";
      //web3.eth.compile.solidity(foodSafeSource,function(err,foodSafeCompiled) {
        foodSafeABI = '[{"constant":false,"inputs":[{"name":"locationId","type":"uint256"},{"name":"name","type":"string"},{"name":"secret","type":"string"}],"name":"addNewLocation","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getTrailCount","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"trailNo","type":"uint8"}],"name":"getLocation","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]';
        foodSafeContract = web3.eth.contract(JSON.parse(foodSafeABI));
        foodSafeCode = '0x6060604052341561000f57600080fd5b5b6106ac8061001f6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063602c80971461005457806373f0101c146100fd578063c0d25cf81461012c575b600080fd5b341561005f57600080fd5b6100fb600480803590602001909190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190505061024e565b005b341561010857600080fd5b610110610383565b604051808260ff1660ff16815260200191505060405180910390f35b341561013757600080fd5b610150600480803560ff1690602001909190505061039b565b604051808060200186815260200185815260200184815260200180602001838103835288818151815260200191508051906020019080838360005b838110156101a75780820151818401525b60208101905061018b565b50505050905090810190601f1680156101d45780820380516001836020036101000a031916815260200191505b50838103825284818151815260200191508051906020019080838360005b8381101561020e5780820151818401525b6020810190506101f2565b50505050905090810190601f16801561023b5780820380516001836020036101000a031916815260200191505b5097505050505050505060405180910390f35b610256610577565b82816000018190525083816020018181525050818160800181905250428160600181815250506000600160009054906101000a900460ff1660ff161415156102ca57600080600160009054906101000a900460ff1660ff168152602001908152602001600020600101548160400181815250505b80600080600160009054906101000a900460ff1660ff168152602001908152602001600020600082015181600001908051906020019061030b9291906105b3565b5060208201518160010155604082015181600201556060820151816003015560808201518160040190805190602001906103469291906105b3565b509050506001600081819054906101000a900460ff168092919060010191906101000a81548160ff021916908360ff160217905550505b50505050565b6000600160009054906101000a900460ff1690505b90565b6103a3610633565b60008060006103b0610633565b6000808760ff1681526020019081526020016000206000016000808860ff168152602001908152602001600020600101546000808960ff168152602001908152602001600020600201546000808a60ff168152602001908152602001600020600301546000808b60ff168152602001908152602001600020600401848054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156104c05780601f10610495576101008083540402835291602001916104c0565b820191906000526020600020905b8154815290600101906020018083116104a357829003601f168201915b50505050509450808054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561055c5780601f106105315761010080835404028352916020019161055c565b820191906000526020600020905b81548152906001019060200180831161053f57829003601f168201915b50505050509050945094509450945094505b91939590929450565b60a06040519081016040528061058b610647565b81526020016000815260200160008152602001600081526020016105ad610647565b81525090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106105f457805160ff1916838001178555610622565b82800160010185558215610622579182015b82811115610621578251825591602001919060010190610606565b5b50905061062f919061065b565b5090565b602060405190810160405280600081525090565b602060405190810160405280600081525090565b61067d91905b80821115610679576000816000905550600101610661565b5090565b905600a165627a7a72305820e777b5fbcf4911240bae39443875fd218c3472baa6335a681433c7985204da6d0029';

    });
  },
  // uplload the contract to blockchain
  createContract : function(){
    document.getElementById("contractAddress").value = "0x5bb2370367295b246eba759a187719fcae8201bd";
    // const contractInstance = foodSafeContract.new("",{from : account,data : foodSafeCode,gas : 450000000},function(error,deployedContract){
    //   if(deployedContract.address) {
    //     document.getElementById("contractAddress").value =  deployedContract.address;
    //   }
    // });
  },
  addNewLocation : function() {
    var contractAddress = document.getElementById("contractAddress").value;
    var deployedFoodSafe = foodSafeContract.at(contractAddress);
    var locationId = document.getElementById("locationId").value;
    var locationName  = document.getElementById("locationName").value;
    var locationSecret = document.getElementById("secret").value;
    var passPhrase = document.getElementById("passPhrase").value;
    

    var encrytedSecret = CryptoJS.AES.encrypt(locationSecret,passPhrase).toString();
    deployedFoodSafe.addNewLocation(locationId,locationName,encrytedSecret,function(err) {
       console.log(err);
    });

  },
  getCurrentLocation : function() {
    var contractAddress = document.getElementById("contractAddress").value;
    var deployedFoodSafe = foodSafeContract.at(contractAddress);
    var passphrase = document.getElementById("passPhrase").value;

    deployedFoodSafe.getTrailCount.call(function(err,trailCount) {
        deployedFoodSafe.getLocation.call(trailCount-1,function(err,returnValues) {
          document.getElementById("locationId").value = returnValues[1];
          document.getElementById("locationName").value = returnValues[0];
          var encrytedSecret = returnValues[4];
          var decryptedSecret = CryptoJS.AES.decrypt(encrytedSecret,passphrase).toString(CryptoJS.enc.Utf8);

          document.getElementById("secret").value = decryptedSecret;


        });
    });


  }
};

window.addEventListener('load', function() {
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source.  If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }
  App.start();
});
