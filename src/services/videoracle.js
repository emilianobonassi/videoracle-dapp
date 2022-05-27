import videoracleAbi from '../abi.json'
import {ethers} from "ethers";

const contractAddress = '0xFA2Ec1d9ed2357717F9fFD7D4800302AD5EC8678'

export async function askQuestion({
    provider,
    time2answer,
    reward,
    questionURI
  }) {  
    const videoracleContract = new ethers.Contract(contractAddress, videoracleAbi, provider.getSigner())
    
    videoracleContract.askQuestion(time2answer, reward, questionURI, {value: reward})
  }