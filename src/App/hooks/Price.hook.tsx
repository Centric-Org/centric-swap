import { useEffect, useCallback, useState, useRef } from "react";
import pricesService from "../services/Prices.service";
import { PriceStatus, Prices as PricesInterface } from "../store/models";

const initalState = {
  priceStatus: PriceStatus.IDLE,
  cnr: 0,
  cns: 0,
  block: 0,
};

const usePrice = () => {
  const pollRef: any = useRef(null);
  const [prices, setPrices]: [PricesInterface, any] = useState(initalState);

  const getPrices = useCallback(async () => {
    try {
      const {
        cashPrice,
        blockNumber,
        price,
      } = await pricesService.getRisePrice();
      setPrices({
        priceStatus: PriceStatus.SUCCESS,
        cnr: price,
        cns: cashPrice,
        block: blockNumber,
      });
    } catch (e) {
      setPrices({
        ...initalState,
        priceStatus: PriceStatus.FAILED,
      });
    }
  }, []);

  const initPrices = useCallback(async () => {
    try {
      pricesService.riseContract = await pricesService.getRiseContract();
      if (pollRef.current !== null) {
        clearInterval(pollRef.current);
      }
      getPrices();
      pollRef.current = setInterval(() => {
        getPrices();
      }, 60000);
    } catch (e) {
      setPrices({
        ...initalState,
        priceStatus: PriceStatus.FAILED,
      });
    }
  }, [getPrices]);

  useEffect(() => {
    if (pricesService.tronWeb) {
      initPrices();
    }
  }, [initPrices]);

  return prices;
};

export default usePrice;
