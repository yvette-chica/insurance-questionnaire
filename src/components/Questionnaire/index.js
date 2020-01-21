import React, { Component } from 'react';
import { Redirect } from 'react-router';
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
        // Check if the questionaire state is saved in localStorage
        if (localStorage.questionnaireState) {
            const newState = JSON.parse(localStorage.questionnaireState);
            this.setState(newState);
        }
    }

    saveQuestionnaireState = () => {
        localStorage.setItem('questionnaireState', JSON.stringify(this.state));
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
        const { previousQuestionIndices } = this.state;
        const updatedPreviousQuestionIndices = [...previousQuestionIndices];
        const newCurrentQuestionIndex = updatedPreviousQuestionIndices.pop();
        this.setState({
            currentQuestionIndex: newCurrentQuestionIndex,
            previousQuestionIndices: updatedPreviousQuestionIndices,
        });
        this.saveQuestionnaireState();
    }

    handleNext = () => {
        const { questions, currentQuestionIndex, previousQuestionIndices } = this.state;
        let nextQuestionIndex = currentQuestionIndex + 1
        const currentQuestion = questions[currentQuestionIndex];

        if (currentQuestion.options) {
            const optionSelected = currentQuestion.options.find(option => option.value === currentQuestion.answer);
            if (optionSelected.isNextQuestionSkipped) {
                nextQuestionIndex += 1;
            }
        }

        this.setState({
            currentQuestionIndex: nextQuestionIndex,
            previousQuestionIndices: [
                ...previousQuestionIndices,
                currentQuestionIndex,
            ],
        });
        this.saveQuestionnaireState();
    }

    handleSubmit = async () => {
        this.saveQuestionnaireState();
        const { questions } = this.state;
        const requestObject = {};

        questions.forEach(question => {
            if (question.paramKey) {
                requestObject[question.paramKey] = question.answer || question.defaultAnswer;
            }
        })

        let response = await sendQuestionnaire(requestObject);
        let jwt = response.data.jwt;
        setAuthToken(jwt);
        let recommendation =  await getRecommendation()
        localStorage.setItem('recommendation', JSON.stringify(recommendation.data));
        localStorage.setItem('jwt', jwt);
        window.location.reload(true);
    }

    render() {
        if (localStorage.jwt) {
            return <Redirect to={{ pathname: '/recommendations' }} />
        }

        const { currentQuestionIndex, questions } = this.state;
        const currentQuestion = questions[currentQuestionIndex];
        const finalQuestionIndex = questions.length - 1;

        const nextButton = (
            <Button
                onClick={this.handleNext}
                type="primary"
                disabled={!currentQuestion.answer}
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

export default Questionnaire
