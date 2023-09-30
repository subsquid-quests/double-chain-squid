import {lookupArchive} from '@subsquid/archive-registry'
import {
    BlockHeader,
    DataHandlerContext,
    EvmBatchProcessor,
    EvmBatchProcessorFields,
    Log as _Log,
    Transaction as _Transaction,
} from '@subsquid/evm-processor'
import {Store} from '@subsquid/typeorm-store'
import * as erc20abi from '../abi/erc20'

export const ETH_USDC_ADDRESS = '0x7EA2be2df7BA6E54B1A9C70676f668455E329d29'.toLowerCase()

export const processor = new EvmBatchProcessor()
    .setDataSource({
        archive: 'http://localhost:8000/network/ethereum-mainnet',
        // Disabled for quests to avoid DDoSing Ankr :)
        //chain: 'https://rpc.ankr.com/eth',
    })
    .setFinalityConfirmation(75)
    .setFields({
        log: {
            transactionHash: true
        }
    })
    .setBlockRange({
        from: 16_000_000,
    })
    .addLog({
        address: [ETH_USDC_ADDRESS],
        topic0: [erc20abi.events.Transfer.topic]
    })

export type Fields = EvmBatchProcessorFields<typeof processor>
export type Context = DataHandlerContext<Store, Fields>
export type Block = BlockHeader<Fields>
export type Log = _Log<Fields>
export type Transaction = _Transaction<Fields>
