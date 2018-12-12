import { gql } from 'apollo-boost';     ////  create query for frontend


//// constructor query 
const getLatestBlockQuery = gql`
  {
    latestBlock {
      hash
      time
      block_index
      height
      txIndexes
    }
  }
`


const getSingleBlockQuery = gql`
    mutation($hashID: String!) {
        singleblock(hashID: $hashID) {
          tx {
            lock_time
            ver
            size
            weight
            time
            tx_index
            vin_sz
            hash
            vout_sz
          }
        }
      }
`

const getSingleTransactionQuery = gql`
    mutation($transactionID: String!) {
      singleTransaction(transactionID: $transactionID) {
          hash
          ver
          vin_sz
          vout_sz
          lock_time
          size
          block_height
          tx_index
        }
      }
`

const getBlockHeightQuery = gql`
    mutation($blockHeightID: String!) {
      blockHeight(blockHeightID: $blockHeightID) {
        blocks
        }
      }
`

const getSingleAddressQuery = gql`
    mutation($singleAddressID: String!) {
      singleAddress(singleAddressID: $singleAddressID) {
        hash160
        address
        n_tx
        n_unredeemed
        total_received
        total_sent
        final_balance
        }
      }
`

export { getLatestBlockQuery, getSingleBlockQuery, getSingleTransactionQuery, getBlockHeightQuery, getSingleAddressQuery }