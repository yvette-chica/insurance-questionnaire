import React from 'react';
import { Result, Button, Icon, Typography } from 'antd';

const { Paragraph, Text } = Typography;

function DisplayError(error) {
    const {
        error: {
            response: { data: { errors } },
            config: { data },
        },
    } = error;
    const requestObject = JSON.parse(data);
    return (
        <Result
            status="error"
            title="Submission Failed"
            subTitle="Please check and modify the following information before resubmitting."
            extra={[
                <Button
                    key="buy"
                    onClick={() => window.location.reload(true)}
                >
                    Try Again
                </Button>,
            ]}
        >
            <div className="desc">
                <Paragraph>
                    <Text
                        strong
                        style={{
                            fontSize: 16,
                        }}
                    >
                        The content you submitted has the following errors:
                    </Text>
                </Paragraph>

                {
                    Object.entries(errors).map(
                        error => {
                            const [paramKey, [errorText]] = error;
                            return (
                                <Paragraph key={paramKey}>
                                    <Icon
                                        style={{ color: 'red' }}
                                        type="close-circle"
                                    />  
                                    <Text strong> {requestObject[paramKey]}:</Text> {errorText}
                                </Paragraph>
                            )
                        }
                    )
                }
            </div>
        </Result>
    )
}

export default DisplayError;