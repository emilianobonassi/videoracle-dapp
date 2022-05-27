import videoracleAbi from '../abi.json'
import {ethers} from "ethers";

const contractAddress = '0x12b3121fd4504b3bcff427fa5b05f6a5a6fc5250'

export async function askQuestion({
    provider,
    time2answer,
    reward,
    questionURI
  }) {  
    const videoracleContract = new ethers.Contract(contractAddress, videoracleAbi, provider.getSigner())
    
    videoracleContract.askQuestion(time2answer, reward, questionURI, {value: reward})
  }