import videoracleAbi from '../abi.json'
import videonftAbi from '../abiVideoNft.json'
import {ethers} from "ethers";
import axios from 'axios';

const contractAddress = '0x12b3121fd4504b3bcff427fa5b05f6a5a6fc5250'
const contractAddressVideoNft = '0xa4e1d8fe768d471b048f9d73ff90ed8fccc03643'

export async function askQuestion({
    provider,
    time2answer,
    reward,
    questionURI
  }) {  
    const videoracleContract = new ethers.Contract(contractAddress, videoracleAbi, provider.getSigner())
    
    videoracleContract.askQuestion(time2answer, reward, questionURI, {value: reward})
  }

  export async function getQuestions({
    provider
  }) {  
    const videoracleContract = new ethers.Contract(contractAddress, videoracleAbi, provider.getSigner())

    const totQuestions = (await videoracleContract.questionsCount()).toNumber()

    let questions = []

    for(let i = 0; i < totQuestions; i++) {
        questions.push(
            await videoracleContract.questions(i)
        );
    }

    return questions
  }

export async function getAnswers({
  provider, questionId
}) {  
  console.log(questionId)
  const videoracleContract = new ethers.Contract(contractAddress, videoracleAbi, provider.getSigner())
  const videoNFTContract = new ethers.Contract(contractAddressVideoNft, videonftAbi, provider.getSigner())
  console.log(videoracleContract)
  console.log(videoNFTContract)

  const totAnswers = (await videoracleContract.answersCount4Question(questionId)).toNumber()
  console.log(totAnswers)

  let answers = []

  for(let i = 0; i < totAnswers; i++) {
      console.log(questionId, i)
      var singAnswer = await videoracleContract.answersByQuestion(questionId, i)
      console.log(singAnswer)

      var answerVideoId = singAnswer[0].toNumber()
      var answerer = singAnswer[1]
      console.log(answerVideoId, answerer)
      try {
        var uri = await videoNFTContract.tokenURI(answerVideoId)
      } catch(e) {
        console.log(e)
        // Go to next answer
        continue
      }
      console.log(answerVideoId, answerer, uri)

      // Get video uri from the uri
      var livepeerURI = "https://ipfs.livepeer.com/ipfs/" + uri.replace("ipfs://", "")
      console.log(livepeerURI)
      var videoURI = (await axios.get(livepeerURI)).data
      console.log(videoURI.properties.video)
      videoURI = "https://ipfs.livepeer.com/ipfs/" + videoURI.properties.video.replace("ipfs://", "")


      var answ = { 
        id: i,
        answerVideoId: answerVideoId,
        answerer: answerer,
        uri:videoURI
      }

      answers.push(answ);
  }

  return answers
}

export async function answerQuestion({
  provider, questionId, answerVideoId
}) {  
  const videoracleContract = new ethers.Contract(contractAddress, videoracleAbi, provider.getSigner())
  
  videoracleContract.answerQuestion(questionId, answerVideoId)
}

export async function answersCount4Question({
  provider, questionId
}) {
  const videoracleContract = new ethers.Contract(contractAddress, videoracleAbi, provider.getSigner())

  return (await videoracleContract.answersCount4Question(questionId)).toNumber()
}

export async function submitVoting({
  provider, questionId, answersIds, points
}) {  
  const videoracleContract = new ethers.Contract(contractAddress, videoracleAbi, provider.getSigner())

  videoracleContract.voteAnswers(questionId, answersIds, points)
}