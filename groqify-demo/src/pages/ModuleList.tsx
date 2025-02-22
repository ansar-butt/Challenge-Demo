import { useNavigate } from 'react-router-dom';

const ModuleList = () => {
    // const
    const navigate = useNavigate();
    return (
        <>
            <div className="text-9xl" onClick={() => navigate('lesson1')}>
                Test Mod
            </div>
        </>
    );
};

export default ModuleList;
