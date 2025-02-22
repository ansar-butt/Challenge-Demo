import { useEffect, useState } from 'react';
import ChatBox from '../components/ChatBox';
import ChatBoxAI from '../components/ChatBoxAI';
import axios from 'axios';

const ModuleTemplate = () => {
    const [userMessage, setUserMessage] = useState('');
    const [botMessage, setBotMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .post(`${__API_PATH__}/chat`, {
                message: userMessage,
            })
            .then((res) => setBotMessage(res.data))
            .then(() => setLoading(false))
            .catch((err) => console.log(err));
    }, [userMessage]);

    return (
        <div
            style={{
                backgroundImage: `url('/court.jpg')`,
                backgroundSize: '100%',
                backgroundRepeat: 'no-repeat',
            }}
            className="h-screen w-screen overflow-y-scroll flex flex-col items-center"
        >
            <div className="fixed top-12 left-10">
                <ChatBox setUserMessage={setUserMessage} />
            </div>
            <div className="fixed top-12 right-17">
                <ChatBoxAI message={botMessage} loading={loading} />
            </div>
        </div>
    );
};

export default ModuleTemplate;
