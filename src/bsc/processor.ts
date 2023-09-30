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

export const BSC_USDC_ADDRESS = '0x8965349fb649A33a30cbFDa057D8eC2C48AbE2A2'.toLowerCase()

export const processor = new EvmBatchProcessor()
    .setDataSource({
        archive: 'http://localhost:8000/network/binance-mainnet',
        // Disabled for quests to avoid DDoSing Ankr :)
        //chain: 'https://rpc.ankr.com/bsc',
    })
    .setFinalityConfirmation(75)
    .setFields({
        log: {
            transactionHash: true
        }
    })
    .setBlockRange({
        from: 28_000_000,
    })
    .addLog({
        address: [BSC_USDC_ADDRESS],
        topic0: [erc20abi.events.Transfer.topic]
    })

export type Fields = EvmBatchProcessorFields<typeof processor>
export type Context = DataHandlerContext<Store, Fields>
export type Block = BlockHeader<Fields>
export type Log = _Log<Fields>
export type Transaction = _Transaction<Fields>
