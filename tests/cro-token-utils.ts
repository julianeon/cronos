import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  UpdatedTokenInformation,
  Upgrade,
  UpgradeAgentSet,
  Mint,
  MintFinished,
  OwnershipRenounced,
  OwnershipTransferred,
  Approval,
  Transfer
} from "../generated/CroToken/CroToken"

export function createUpdatedTokenInformationEvent(
  newName: string,
  newSymbol: string
): UpdatedTokenInformation {
  let updatedTokenInformationEvent = changetype<UpdatedTokenInformation>(
    newMockEvent()
  )

  updatedTokenInformationEvent.parameters = new Array()

  updatedTokenInformationEvent.parameters.push(
    new ethereum.EventParam("newName", ethereum.Value.fromString(newName))
  )
  updatedTokenInformationEvent.parameters.push(
    new ethereum.EventParam("newSymbol", ethereum.Value.fromString(newSymbol))
  )

  return updatedTokenInformationEvent
}

export function createUpgradeEvent(
  _from: Address,
  _to: Address,
  _value: BigInt
): Upgrade {
  let upgradeEvent = changetype<Upgrade>(newMockEvent())

  upgradeEvent.parameters = new Array()

  upgradeEvent.parameters.push(
    new ethereum.EventParam("_from", ethereum.Value.fromAddress(_from))
  )
  upgradeEvent.parameters.push(
    new ethereum.EventParam("_to", ethereum.Value.fromAddress(_to))
  )
  upgradeEvent.parameters.push(
    new ethereum.EventParam("_value", ethereum.Value.fromUnsignedBigInt(_value))
  )

  return upgradeEvent
}

export function createUpgradeAgentSetEvent(agent: Address): UpgradeAgentSet {
  let upgradeAgentSetEvent = changetype<UpgradeAgentSet>(newMockEvent())

  upgradeAgentSetEvent.parameters = new Array()

  upgradeAgentSetEvent.parameters.push(
    new ethereum.EventParam("agent", ethereum.Value.fromAddress(agent))
  )

  return upgradeAgentSetEvent
}

export function createMintEvent(to: Address, amount: BigInt): Mint {
  let mintEvent = changetype<Mint>(newMockEvent())

  mintEvent.parameters = new Array()

  mintEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  mintEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return mintEvent
}

export function createMintFinishedEvent(): MintFinished {
  let mintFinishedEvent = changetype<MintFinished>(newMockEvent())

  mintFinishedEvent.parameters = new Array()

  return mintFinishedEvent
}

export function createOwnershipRenouncedEvent(
  previousOwner: Address
): OwnershipRenounced {
  let ownershipRenouncedEvent = changetype<OwnershipRenounced>(newMockEvent())

  ownershipRenouncedEvent.parameters = new Array()

  ownershipRenouncedEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )

  return ownershipRenouncedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createApprovalEvent(
  owner: Address,
  spender: Address,
  value: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("spender", ethereum.Value.fromAddress(spender))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return approvalEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  value: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return transferEvent
}
