const grahpql = require('graphql');
const axiso = require('axios');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, 
  GraphQLID , GraphQLInt, GraphQLList, GraphQLFloat, 
  GraphQLBoolean } = grahpql;


  //// def ObjectType 
const SingleBlockType = new GraphQLObjectType({
  name: 'SingleBlock',
  fields: () => ({ 
    hash: { type: GraphQLString },
    ver: { type: GraphQLInt },
    prev_block: { type: GraphQLString },
    mrkl_root: { type: GraphQLString },
    time: { type: GraphQLInt },
    bits: { type: GraphQLInt },
    nonce: { type: GraphQLInt },
    n_tx: { type: GraphQLInt },
    size: { type: GraphQLInt },
    block_index: { type: GraphQLInt },
    main_chain: { type: GraphQLBoolean },
    height: { type: GraphQLInt },
    received_time: { type: GraphQLInt },
    tx: { type: new GraphQLList(TransactionType) },     //// list of array within object create
  })
});


const TransactionType = new GraphQLObjectType({
  name: 'Transaction',
  fields: () => ({ 
    lock_time: { type: GraphQLInt },
    ver: { type: GraphQLInt },
    size: { type: GraphQLInt },
    inputs: { type: new GraphQLList(InputsType) },     //// list of array within object create
    weight: { type: GraphQLInt },
    time: { type: GraphQLInt },
    tx_index: { type: GraphQLInt },
    vin_sz: { type: GraphQLInt },
    hash: { type: GraphQLString },
    vout_sz: { type: GraphQLInt },
    out: { type: new GraphQLList(OutputsType) },     //// list of array within object create
  })
});

const InputsType = new GraphQLObjectType({
  name: 'input',
  fields: () => ({
    sequence: { type: GraphQLInt },
    witness: { type: GraphQLString },
    prev_out: { type: new GraphQLList(PrevOutType) },     //// list of array within object create
    script: { type: GraphQLString },
  })
});

//// def ObjectType 
const PrevOutType = new GraphQLObjectType({
  name: 'prevOut',
  fields: () => ({
    spent: { type: GraphQLBoolean },
    spending_outpoints: { type: new GraphQLList(SpendingOutpointsType) },     //// list of array within object create
  })
});

const SpendingOutpointsType = new GraphQLObjectType({
  name: 'spendingOutPoint',
  fields: () => ({
    tx_index: { type: GraphQLInt },
    n: { type: GraphQLInt },
  })
});

//// def ObjectType 
const OutputsType = new GraphQLObjectType({
  name: 'output',
  fields: () => ({
    spent: { type: GraphQLBoolean },
    spending_outpoints: { type: new GraphQLList(SpendingOutpointsType) },     //// list of array within object create
    tx_index: { type: GraphQLInt },
    type: { type: GraphQLInt },
    addr: { type: GraphQLString },
    value: { type: GraphQLInt },
    n: { type: GraphQLInt },
    script: { type: GraphQLString },
  })
});

//// def ObjectType 
const SingleTransactionType = new GraphQLObjectType({
  name: 'singleTransaction',
  fields: () => ({ 
    hash: { type: GraphQLString },
    ver: { type: GraphQLInt },
    vin_sz: { type: GraphQLInt },
    vout_sz: { type: GraphQLInt },
    lock_time: { type: GraphQLString },
    size: { type: GraphQLInt },
    block_height: { type: GraphQLString },
    tx_index: { type: GraphQLString },
    inputs: { type: new GraphQLList(InputsType) },     //// list of array within object create
    out: { type: new GraphQLList(OutputsType) },     //// list of array within object create
  })
});

//// def ObjectType 
const BlockHeightType = new GraphQLObjectType({
  name: 'blockHeight',
  fields: () => ({ 
    blocks: { type: new GraphQLList(BlocksType) },     //// list of array within object create
    })
});

//// def ObjectType 
const BlocksType = new GraphQLObjectType({
  name: 'blocks',
  fields: () => ({ 
    hash: { type: GraphQLString },
    ver: { type: GraphQLInt },
    prev_block: { type: GraphQLString },
    mrkl_root: { type: GraphQLString },
    time: { type: GraphQLInt },
    bits: { type: GraphQLInt },
    fee:  { type: GraphQLInt },
    nonce: { type: GraphQLInt },
    n_tx: { type: GraphQLInt },
    size: { type: GraphQLInt },
    block_index: { type: GraphQLInt },
    main_chain: { type: GraphQLBoolean },
    height: { type: GraphQLInt },
    tx: { type: new GraphQLList(TransactionType) },     //// list of array within object create
    })
});

const SingleAddressType = new GraphQLObjectType({
  name: 'singleAddress',
  fields: () => ({
    hash160: { type: GraphQLString },
    address: { type: GraphQLString },
    n_tx: { type: GraphQLInt },
    n_unredeemed: { type: GraphQLInt },
    total_received: { type: GraphQLFloat },
    total_sent: { type: GraphQLFloat },
    final_balance: { type: GraphQLFloat },
    tx: { type: new GraphQLList(TransactionType) },     //// list of array within object create
  })
});

const LatestBlockType = new GraphQLObjectType({
  name: 'latestBlock',
  fields: () => ({
    hash: { type: GraphQLString },
    time: { type: GraphQLInt },
    block_index: { type: GraphQLInt },
    height: { type: GraphQLInt },
    txIndexes: { type: new GraphQLList(GraphQLString) },
  })
});


module.exports = {
  SingleBlockType,
  SingleTransactionType,
  BlockHeightType,
  SingleAddressType,
  LatestBlockType,
}