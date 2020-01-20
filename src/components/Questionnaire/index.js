import React, { Component } from 'react';
import { Button, Card } from 'antd';
import { questions } from '../../questions';
import UserInput from './UserInput';

import './style.scss';

class Questionnaire extends Component {
    state = { 
        questions,
        currentIndex: 0,
        answeredQuestions: [],
    };

    componentDidMount() {
        // TODO: Check if there is state saved in localStorage
    }

    handleUserInput = userInput => {
        const { questions, currentIndex } = this.state;
        const updatedQuestions  = [...questions];
        updatedQuestions[currentIndex].answer = userInput;

        this.setState({
            questions: updatedQuestions,
        });
    }

    handlePrevious = () => {
    }

    handleNext = () => {
        this.setState({
            currentIndex: this.state.currentIndex + 1,
        });
    }

    handleSubmit = async () => {
    }

    render() {
        const { currentIndex, questions } = this.state;

        const nextButton = true 
            ? (<Button
                onClick={this.handleNext}
                type="primary"
            >
                Next
            </Button>)
            : null;

        const previousButton = true 
            ? (<Button
                onClick={this.handlePrevious}
                type="primary"
            >
                Previous
            </Button>)
            : null;

        const submitButton = false
            ? (<Button
                onClick={this.handleSubmit}
                type="primary"
            >
                Submit Answers
            </Button>)
            : null;

        const currentQuestion = questions[currentIndex];

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
                        {previousButton}
                        {nextButton}
                        {submitButton}
                    </div>
                </Card>
            </div>
        );
    }
}

export default Questionnaire;

