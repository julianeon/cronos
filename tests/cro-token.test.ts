import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { UpdatedTokenInformation } from "../generated/schema"
import { UpdatedTokenInformation as UpdatedTokenInformationEvent } from "../generated/CroToken/CroToken"
import { handleUpdatedTokenInformation } from "../src/cro-token"
import { createUpdatedTokenInformationEvent } from "./cro-token-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let newName = "Example string value"
    let newSymbol = "Example string value"
    let newUpdatedTokenInformationEvent = createUpdatedTokenInformationEvent(
      newName,
      newSymbol
    )
    handleUpdatedTokenInformation(newUpdatedTokenInformationEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("UpdatedTokenInformation created and stored", () => {
    assert.entityCount("UpdatedTokenInformation", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "UpdatedTokenInformation",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "newName",
      "Example string value"
    )
    assert.fieldEquals(
      "UpdatedTokenInformation",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "newSymbol",
      "Example string value"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
