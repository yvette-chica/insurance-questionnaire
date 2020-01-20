import React, { Component } from 'react';
import { Input, InputNumber, Radio } from 'antd';

class UserInput extends Component {
    handleInput = event => {
        this.props.handleUserInput(event.target.value);
    }

    handleNumberInput = value => {
        this.props.handleUserInput(value);
    }

    handleRadio = event => {
        this.handleInput(event);
    }

    render() {
        const { handleNext, question: { type, options, answer } } = this.props;
        let inputComponent;

        if (type === 'string') {
            if (options) {
                inputComponent = (
                    <Radio.Group
                        onChange={this.handleRadio}
                        value={answer}
                    >
                        {
                            options.map(
                                option => (
                                    <Radio
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </Radio>
                                )
                            )
                        }
                    </Radio.Group>
                );
            } else {
                inputComponent = (
                    <Input
                        onChange={this.handleInput}
                        onPressEnter={handleNext}
                        value={answer}
                    />
                );
            }
        } else if (type === 'number') {
            inputComponent = (
                <InputNumber
                    value={answer || 0}
                    onChange={this.handleNumberInput}
                    min={0}
                />
            )
        }

        return (
            <div>
                {inputComponent}
            </div>
        );
    }
}

export default UserInput

