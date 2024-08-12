import { NextResponse } from "next/server";
import {
    getContract,
    prepareContractCall,
    sendTransaction,
    readContract,
    toWei,
    sendAndConfirmTransaction,
    prepareTransaction
} from "thirdweb";
import { baseSepolia } from "thirdweb/chains";
import { createThirdwebClient } from "thirdweb";
import { ThirdwebClient } from "thirdweb";
import { ThirdwebContract } from "thirdweb";

const client = createThirdwebClient({ secretKey: process.env.thirdweb_secret_key || "" });

let create_contract = (client: ThirdwebClient, contract_address: string) => {
    // 2. get the contract
    const contract = getContract({
        client,
        address: contract_address,
        chain: baseSepolia,
    });

    return contract
}

let balance_of = async (contract: ThirdwebContract, wallet: string) => {
    const balance = await readContract({
        contract,
        method: "function balanceOf(address) view returns (uint256)",
        params: [wallet as `0x${string}`],
    });
    return Number(balance)
}

export const GET = async () => {
    let contract_address = "0x227961db24B33D0cb361501D627B4696Fd24C64d"
    let contract = create_contract(client, contract_address)
    let balance = await balance_of(contract, process.env.wallet_original || "")
    let res = { balance };
    return NextResponse.json(res);
}