import {TypeormDatabase} from '@subsquid/typeorm-store'
import {Transfer} from '../model'
import * as erc20abi from '../abi/erc20'
import {processor, BSC_USDC_ADDRESS} from './processor'

processor.run(new TypeormDatabase({supportHotBlocks: true, stateSchema: 'bsc_processor'}), async (ctx) => {
    const transfers: Transfer[] = []
    for (let c of ctx.blocks) {
        for (let log of c.logs) {
            if (log.address !== BSC_USDC_ADDRESS || log.topics[0] !== erc20abi.events.Transfer.topic) continue
            let {from, to, value} = erc20abi.events.Transfer.decode(log)
            transfers.push(
                new Transfer({
                    id: log.id,
                    network: 'bsc',
                    block: c.header.height,
                    timestamp: new Date(c.header.timestamp),
                    from,
                    to,
                    value,
                    txHash: log.transactionHash
                })
            )
        }
    }
    await ctx.store.upsert(transfers)
})
