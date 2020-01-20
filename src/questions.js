const questions = [
    {
        prompt: 'What is your first name?',
        type: 'string', 
        paramKey: 'firstName',
    },
    {
        prompt: 'What is your address?',
        type: 'string', 
        paramKey: 'address',
    },
    {
        prompt: 'What is your occupation?',
        type: 'string', 
        options: [
            {
                value: 'EMPLOYED',
                label: 'Employed',
            },
            {
                value: 'SELF_EMPLOYED',
                label: 'Self employed',            },
            {
                value: 'STUDENT',
                label: 'Student',
            },
        ],
        paramKey: 'occupation',
    },
    {
        prompt: 'Do you have any children?',
        type: 'string', 
        options: [
            { value: 'YES', label: 'yes' },
            { value: 'NO', label: 'No', isNextQuestionSkipped: true }
        ],
    },
    {
        prompt: 'How many children do you have?',
        type: 'number', 
        paramKey: 'numberOfChildren',
        defaultAnswer: 0,
    },
    {
        prompt: 'What is your email?',
        type: 'string', 
        paramKey: 'email',
    },
];


export { questions };

