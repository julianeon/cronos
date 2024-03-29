import { BigInt, Bytes } from "@graphprotocol/graph-ts"
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
  Holder,
  DailySale,
  Watchlist,
  Sampler
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
  saveTransfer(event)
  updateHolderBalances(event)
  saveDailySale(event)
  watchlistCheck(event)
  saveSampler(event)
}

function saveTransfer(event: TransferEvent): void {
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
}

function updateHolderBalances(event: TransferEvent): void {
  let fromAddress = event.params.from.toHex();
  let toAddress = event.params.to.toHex();
  let value = event.params.value;
  let lastUpdated = event.block.timestamp;
  let fromHolder = Holder.load(fromAddress)
  if (!fromHolder) {
    fromHolder = new Holder(fromAddress)
    fromHolder.balance = BigInt.fromI32(0)
  }
  fromHolder.balance = fromHolder.balance.minus(value)
  fromHolder.lastUpdated = lastUpdated
  fromHolder.save()

  let toHolder = Holder.load(toAddress)
  if (!toHolder) {
    toHolder = new Holder(toAddress)
    toHolder.balance = BigInt.fromI32(0)
  }
  toHolder.balance = toHolder.balance.plus(value)
  toHolder.lastUpdated = lastUpdated
  toHolder.save()
}

export function saveDailySale(event: TransferEvent): void {
  let date = event.block.timestamp.toI32()
  let dayId = date / 86400 
  let dailySaleId = dayId.toString()

  let dailySale = DailySale.load(dailySaleId)
  if (!dailySale) {
    dailySale = new DailySale(dailySaleId)
    dailySale.totalSales = BigInt.fromI32(0)
    dailySale.numberOfSales = 0
  }

  dailySale.totalSales = dailySale.totalSales.plus(event.params.value)
  dailySale.numberOfSales = dailySale.numberOfSales + 1
  dailySale.save()
}

function addressInList(address: Bytes, list: Bytes[]): boolean {
  for (let i = 0; i < list.length; i++) {
    if (list[i] === address) {
      return true;
    }
  }
  return false;
}

function watchlistCheck(event: TransferEvent): void {
  const specialAddressSmart: Bytes[] = [
  Bytes.fromHexString("0xF78930A80E73b7343a3dd93E711A31800cb1cCd3"),
  Bytes.fromHexString("0x8deEA861b99eBc48CED966C8e87fc2E4983a3170"),
  Bytes.fromHexString("0x243Bb7Bf74D517D5585829Faf31f3cB5210C538e")
  ];
  const specialAddressFamous: Bytes[] = [
  Bytes.fromHexString("0xA4218A698E77CCb93c2710fbCaA116A04e837295"),
  Bytes.fromHexString("0xeF3f7c1009084Bf4b920F2FB2559Fa89ea0E573D"),
  Bytes.fromHexString("0x794493883E7D354493349461C90AC59028682610"),
  Bytes.fromHexString("0x0D0707963952f2fBA59dD06f2b425ace40b492Fe"),
  Bytes.fromHexString("0xb2c02210b4136ef9273cbea10c574d17ed9e67e2")
  ];
  const specialAddressConcern: Bytes[] = [
  Bytes.fromHexString("0xf431dA0523D426Aa75C52723C9d128326963C66e"),
  Bytes.fromHexString("0x15DD58888Dc351ebb73DaadDE4313B9C78003fB6"),
  Bytes.fromHexString("0xf4cbeb8DA815188Bf3e2b13BFf26D1aa1B0635D1"),
  Bytes.fromHexString("0x46340b20830761efd32832a74d7169b29feb9758")
  ];

  let fromAddress = event.params.from;
  let toAddress = event.params.to;
  let transactionValue = event.params.value;
  let blockTimestamp = event.block.timestamp;


  let matchingSpecialAddress: Bytes | null = null;
  let watchlistCategory = "";

  for (let i = 0; i < specialAddressSmart.length; i++) {
    if (specialAddressSmart[i].equals(fromAddress) || specialAddressSmart[i].equals(toAddress)) {
      matchingSpecialAddress = specialAddressSmart[i];
      watchlistCategory = "watchlistSmart";
      break;
    }
  }

  if (!matchingSpecialAddress) {
    for (let i = 0; i < specialAddressFamous.length; i++) {
      if (specialAddressFamous[i].equals(fromAddress) || specialAddressFamous[i].equals(toAddress)) {
        matchingSpecialAddress = specialAddressFamous[i];
        watchlistCategory = "watchlistFamous";
        break;
      }
    }
  }

  if (!matchingSpecialAddress) {
    for (let i = 0; i < specialAddressConcern.length; i++) {
      if (specialAddressConcern[i].equals(fromAddress) || specialAddressConcern[i].equals(toAddress)) {
        matchingSpecialAddress = specialAddressConcern[i];
        watchlistCategory = "watchlistConcern";
        break;
      }
    }
  }

  if (matchingSpecialAddress && watchlistCategory) {
    saveWatchlist(watchlistCategory, transactionValue, blockTimestamp, toAddress, matchingSpecialAddress);
  }
}

function saveWatchlist(watchlistId: string, transactionValue: BigInt, blockTimestamp: BigInt, toAddress: Bytes, specialAddress: Bytes): void {
  let converter = BigInt.fromI64(10).pow(8);

  let watchlist = Watchlist.load(watchlistId);
  if (!watchlist) {
    watchlist = new Watchlist(watchlistId);
    watchlist.totalValue = BigInt.fromI32(0); 
    watchlist.lastTimestamp = blockTimestamp;
    watchlist.toLastAddress = toAddress;
    watchlist.specialLastAddress = specialAddress;
  }
  let adjustedValue = transactionValue.div(converter);
  watchlist.totalValue = watchlist.totalValue.plus(adjustedValue); 
  watchlist.lastTimestamp = blockTimestamp;
  watchlist.toLastAddress = toAddress;
  watchlist.specialLastAddress = specialAddress;
  watchlist.save();
}

function saveSampler(event: TransferEvent): void {
  let startBlock = BigInt.fromI32(16933384);
  let currentBlock = event.block.number;
  let blockDifference = currentBlock.minus(startBlock);

  if (blockDifference.mod(BigInt.fromI32(100)).equals(BigInt.fromI32(0))) {
    let samplerId = currentBlock.toString() + "-" + event.transaction.hash.toHex();
    let sampler = Sampler.load(samplerId);
    if (!sampler) {
      sampler = new Sampler(samplerId);
      sampler.from = event.params.from;
      sampler.to = event.params.to;
      sampler.value = event.params.value;
      sampler.blockNumber = currentBlock;
      sampler.blockTimestamp = event.block.timestamp;
      sampler.transactionHash = event.transaction.hash;
      sampler.count = blockDifference.div(BigInt.fromI32(100)).toI32() + 1; 
      sampler.save();
    }
  }
}

