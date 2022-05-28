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
  const videoracleContract = new ethers.Contract(contractAddress, videoracleAbi, provider.getSigner())

  const totAnswers = (await videoracleContract.answersCount4Question(questionId)).toNumber()

  let answers = []

  for(let i = 0; i < totAnswers; i++) {
      answers.push(
          await videoracleContract.questions(i)
      );
  }

  return questions
}

export async function answerQuestion({
  questionId, answerVideoId
}) {  
  const videoracleContract = new ethers.Contract(contractAddress, videoracleAbi, provider.getSigner())
  
  videoracleContract.answerQuestion(questionId, answerVideoId)
}