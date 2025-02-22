import { ChangeEvent, useState } from 'react';
import { Chevron } from '../assets/SVGs';

const ChatBox = ({ setUserMessage }: { setUserMessage: Function }) => {
    const [value, setValue] = useState('');

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
    };

    const handleClick = () => {
        setUserMessage(value);
        setValue('');
    };

    return (
        <div className="flex flex-col w-80 h-44">
            <textarea
                value={value}
                onChange={handleChange}
                placeholder={'Type your response'}
                className="bg-gray-100 no-scrollbar p-2 border border-gray-300 rounded-md resize-none break-words text-gray-700 h-full w-full"
                rows={6}
            />
            <Chevron
                className="h-4 relative -top-6 text-gray-800 left-34 cursor-pointer"
                onClick={() => handleClick()}
            />
        </div>
    );
};

export default ChatBox;
