import { useEffect, useState } from 'react';
import ChatBox from '../components/ChatBox';
import ChatBoxAI from '../components/ChatBoxAI';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ModuleTemplate = () => {
    const navigate = useNavigate();
    const [userMessage, setUserMessage] = useState(
        'Give me a breif summary about HIPAA'
    );
    const [botMessage, setBotMessage] = useState('');
    const [judgeMessage, setJudgeMessage] = useState(
        'In this session we will discuss HIPPA compliance. Let the session commence'
    );
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .post(`${__API_PATH__}/chat`, {
                message: userMessage,
            })
            .then((res) => {
                setBotMessage(res.data.message);
                if (res.data.continue) setJudgeMessage('');
                else {
                    setTimeout(() => {
                        setJudgeMessage('This session is now adjourned.');
                        setTimeout(() => navigate(-1), 5000);
                    }, 5000);
                }
            })
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
            {!judgeMessage ? (
                <>
                    <div className="fixed top-12 left-10">
                        <ChatBox setUserMessage={setUserMessage} />
                    </div>
                    <div className="fixed top-12 right-17">
                        <ChatBoxAI message={botMessage} loading={loading} />
                    </div>
                </>
            ) : (
                <></>
            )}
            <div className="fixed top-2 left-70">
                <ChatBoxAI message={judgeMessage} />
            </div>
        </div>
    );
};

export default ModuleTemplate;
