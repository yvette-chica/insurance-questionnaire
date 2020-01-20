import React, { Component } from 'react';
import { Button, Card } from 'antd';
import setAuthToken from '../../utils/setAuthorizationToken';
import { sendQuestionnaire, getRecommendation } from '../../utils/requests';
import { questions } from '../../questions';
import UserInput from './UserInput';

import './style.scss';

class Questionnaire extends Component {
    state = { 
        questions,
        currentQuestionIndex: 0,
        previousQuestionIndices: [],
    };

    componentDidMount() {
        // TODO: Check if there is state saved in localStorage
    }

    handleUserInput = userInput => {
        const { questions, currentQuestionIndex } = this.state;
        const updatedQuestions  = [...questions];
        updatedQuestions[currentQuestionIndex].answer = userInput;

        this.setState({
            questions: updatedQuestions,
        });
    }

    handlePrevious = () => {
        const updatedPreviousQuestionIndices = [...this.state.previousQuestionIndices];
        const newCurrentQuestionIndex = updatedPreviousQuestionIndices.pop();
        this.setState({
            currentQuestionIndex: newCurrentQuestionIndex,
            previousQuestionIndices: updatedPreviousQuestionIndices,
        });
    }

    handleNext = () => {
        const { questions, currentQuestionIndex, previousQuestionIndices } = this.state;
        let nextQuestionIndex = currentQuestionIndex + 1
        const currentQuestion = questions[currentQuestionIndex];

        if (currentQuestion.options) {
            const optionSelected = currentQuestion.options.find(option => option.value === currentQuestion.answer);
            if (optionSelected.isNextQuestionSkipped) {
                nextQuestionIndex++;
            }
        }
        this.setState({
            currentQuestionIndex: nextQuestionIndex,
            previousQuestionIndices: [
                ...previousQuestionIndices,
                currentQuestionIndex,
            ],
        });
    }

    handleSubmit = async () => {
        const { questions } = this.state;
        const requestObject = {};

        questions.forEach(question => {
            if (question.paramKey) {
                requestObject[question.paramKey] = question.answer;
            }
        })

        let response = await sendQuestionnaire(requestObject);

        let jwt = response.data.jwt;
        localStorage.setItem('jwt', jwt);
        setAuthToken(jwt);
        
        let recommendation =  await getRecommendation()
    }

    render() {
        const { currentQuestionIndex, questions } = this.state;
        const currentQuestion = questions[currentQuestionIndex];
        const finalQuestionIndex = questions.length - 1;

        const nextButton = (
            <Button
                onClick={this.handleNext}
                type="primary"
            >
                Next
            </Button>
        );

        const previousButton = (
            <Button
                onClick={this.handlePrevious}
                type="primary"
            >
                Previous
            </Button>
        );

        const submitButton = (
            <Button
                onClick={this.handleSubmit}
                type="primary"
            >
                Submit Answers
            </Button>
        );

        return (
            <div className="questionaire__container">
                <Card
                    title={currentQuestion.prompt}
                    bordered={false}
                    style={{ maxWidth: 800 }}
                >
                    <UserInput
                        handleUserInput={this.handleUserInput}
                        handleNext={this.handleNext}
                        question={currentQuestion}
                    />
                    <div className="questionaire__buttons">
                        {currentQuestionIndex > 0 && previousButton}
                        {currentQuestionIndex < finalQuestionIndex && nextButton}
                        {currentQuestionIndex === finalQuestionIndex && submitButton}
                    </div>
                </Card>
            </div>
        );
    }
}

export default Questionnaire;

