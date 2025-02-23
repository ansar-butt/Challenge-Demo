import { useEffect, useState } from 'react';
import ChatBox from '../components/ChatBox';
import ChatBoxAI from '../components/ChatBoxAI';
import { useNavigate } from 'react-router-dom';
import { getAIChat } from '../services/apiServices';

const ModuleTemplate = () => {
    const navigate = useNavigate();
    const [userMessage, setUserMessage] = useState(
        '"Scenario: HIPAA Compliance in a Hospital Setting\nBackground:\nYou are a compliance office at CityCare Hospital, responsible for ensuring that all departments follow Healthcare & Patient Safety compliance laws, including HIPAA (Health Insurance Portability and Accountability Act) regulations.\nSituation:A nurse accidentally sends a patients medical report to the wrong email address, which belongs to someone outside the hospital. The patient, Mr. Thompson, finds out and files a complaint." Nudge the user to identify compliance violations in this scenario but dont actually point out the violations'
    );
    const [botMessage, setBotMessage] = useState('');
    const [judgeMessage, setJudgeMessage] = useState(
        'Scenario: HIPAA Compliance in a Hospital Setting\nBackground:\nYou are a compliance office at CityCare Hospital, responsible for ensuring that all departments follow Healthcare & Patient Safety compliance laws, including HIPAA (Health Insurance Portability and Accountability Act) regulations.\nSituation:A nurse accidentally sends a patients medical report to the wrong email address, which belongs to someone outside the hospital. The patient, Mr. Thompson, finds out and files a complaint.\nPoint out any compliance issues in this scenario.'
    );
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getAIChat(userMessage)
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
