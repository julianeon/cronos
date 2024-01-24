import {
  UpdatedTokenInformation as UpdatedTokenInformationEvent,
  Upgrade as UpgradeEvent,
  UpgradeAgentSet as UpgradeAgentSetEvent,
  Mint as MintEvent,
  MintFinished as MintFinishedEvent,
  Approval as ApprovalEvent,
  Transfer as TransferEvent
} from "../generated/CroToken/CroToken"
import {
  UpdatedTokenInformation,
  Upgrade,
  UpgradeAgentSet,
  Mint,
  MintFinished,
  Approval,
  Transfer, 
  Info
} from "../generated/schema"

export function handleUpdatedTokenInformation(
  event: UpdatedTokenInformationEvent
): void {
  let entity = new UpdatedTokenInformation(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newName = event.params.newName
  entity.newSymbol = event.params.newSymbol

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUpgrade(event: UpgradeEvent): void {
  let entity = new Upgrade(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._from = event.params._from
  entity._to = event.params._to
  entity._value = event.params._value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUpgradeAgentSet(event: UpgradeAgentSetEvent): void {
  let entity = new UpgradeAgentSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.agent = event.params.agent

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMint(event: MintEvent): void {
  let entity = new Mint(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.to = event.params.to
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMintFinished(event: MintFinishedEvent): void {
  let entity = new MintFinished(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.spender = event.params.spender
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransfer(event: TransferEvent): void {
  let transferEntity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  transferEntity.from = event.params.from
  transferEntity.to = event.params.to
  transferEntity.value = event.params.value

  transferEntity.blockNumber = event.block.number
  transferEntity.blockTimestamp = event.block.timestamp
  transferEntity.transactionHash = event.transaction.hash

  transferEntity.save()

  let infoEntityId = "00000";
  let infoEntity = Info.load(infoEntityId);
  if (infoEntity == null) {
    infoEntity = new Info(infoEntityId);
    infoEntity.title = "This is the title.";
    infoEntity.summary = "This is the summary.";
    infoEntity.description = "This is the description.";
    infoEntity.license = "MIT";
    infoEntity.save();
  }
}

