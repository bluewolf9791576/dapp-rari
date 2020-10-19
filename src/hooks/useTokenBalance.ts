import { useQuery } from "react-query";
import { Token } from "rari-tokens-generator";

import { toBig } from "../utils/bigUtils";


import { useRari } from "../context/RariContext";

export const getTokenBalance = async (
  token: Token,
  rari: any,
  address: string
) => {




  let stringBalance;

  const allTokens = rari.getAllTokens();

  if (token.symbol !== "ETH") {






    
    stringBalance = await allTokens[token.symbol].contract
      .methods.balanceOf(address)
      .call();
  } else {    
    stringBalance = await   rari.web3.eth.getBalance(address);
  }

  return toBig(stringBalance).div(10 ** token.decimals);
};

export function useTokenBalance(token: Token) {
  const { rari, address } = useRari();

  return useQuery(address + " balanceOf " + token.symbol, () =>
    getTokenBalance(token, rari.web3, address)
  );
}
