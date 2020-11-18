const ContractA = artifacts.require('./ContractA.sol');
const ContractB = artifacts.require('./ContractB.sol');
const Factory = artifacts.require('./Factory.sol');
const Lib = artifacts.require('./Lib.sol');

let sawExpected;
let expectedPushData = "aaaaaaaa";

const { experimentalAddHardhatNetworkMessageTraceHook } = require("hardhat/config");

experimentalAddHardhatNetworkMessageTraceHook(
  async (hre, trace, isMessageTraceFromACall) => {
    for (const step of trace.steps){
      if (trace.bytecode && trace.bytecode._pcToInstruction){
        const instruction = trace.bytecode._pcToInstruction.get(step.pc)

        // If expected pushData is anywhere in the trace, set the testable flag.
        if (instruction && instruction.pushData){
          if (instruction.pushData.toString('hex') === expectedPushData)
            sawExpected = true;
        }
      }
    }
  }
);

contract('Libraries', function (accounts) {
  let instance;

  before(async function(){
    const lib = await Lib.new();
    await ContractA.link(lib);
    instance = await ContractA.new();
  })

  // Reset testable flag
  beforeEach(() => sawExpected = false)

  // Succeeds
  it('should see pushData in a regular method', async function(){
    const result = await instance.add()
    assert.equal(result, 5, "should have added 5");
    assert(sawExpected, "should have seen 'aaaaaaaa' in the trace");
  });

  // Fails
  it('should see pushData in a linked library method', async function () {
    const result = await instance.addViaLib()
    assert.equal(result, 5, "should have added 5");
    assert(sawExpected, "should have seen 'aaaaaaaa' in the trace");
  });
});

contract('Factory deployed contract with forwarded call', function(accounts) {
  let factory, instance;

  before(async function(){
    factory = await Factory.new();
    await factory.deployContractB();
  })

  // Reset testable flag
  beforeEach(() => sawExpected = false)

  // Succeeds
  it('should see pushData in a regular method', async function(){
    const deployedAddress = await factory.contractB();
    instance = await ContractB.at(deployedAddress);

    const result = await instance.add()
    assert.equal(result, 5, "should have added 5");
    assert(sawExpected, "should have seen 'aaaaaaaa' in the trace");
  });

  // Fails
  it('should see pushData when call is forwarded', async function(){
    const result = await factory.wrappedAdd();
    assert.equal(result, 5, "should have added 5");
    assert(sawExpected, "should have seen 'aaaaaaaa' in the trace");
  })
})
