import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Check, Chevron, Lock } from '../assets/SVGs';
import { getLessonCompletion, getLessonList } from '../services/apiServices';

type Lesson = {
    title: string;
    url: string;
};

const ModuleList = () => {
    const navigate = useNavigate();
    const [completed, setCompleted] = useState(false);

    const [lessonList, setLessonList] = useState<Lesson[]>([]);

    useEffect(() => {
        getLessonList()
            .then((res) => setLessonList(res.data as Lesson[]))
            .catch((err) => console.log(err));

        getLessonCompletion()
            .then((res) => setCompleted(res.data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div
            style={{
                backgroundImage: `url('/hexagon.png')`,
                backgroundSize: '100%',
                backgroundRepeat: 'no-repeat',
            }}
            className="h-screen w-screen overflow-y-scroll flex flex-col items-center"
        >
            <img src="/logo.jpg" width="150px" className="mt-20" />

            <div className="mt-10">
                {lessonList.map((lesson, index) => {
                    return (
                        <div
                            key={index}
                            className={`h-20 w-100 rounded-lg bg-gray-800 text-white mb-10 p-4 flex justify-between items-center ${index === 0 && !completed ? 'transition-transform duration-300 hover:-translate-y-2' : ''} shadow-md hover:shadow-lg`}
                        >
                            {lesson.title}
                            <button
                                className={`!bg-transparent text-white p-1 text-sm flex items-center ${index == 0 && !completed ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                                onClick={() => {
                                    if (index == 0 && !completed)
                                        navigate(lesson.url);
                                }}
                            >
                                {index === 0 ? (
                                    completed ? (
                                        <Check className="text-transparent h-5 stroke-green-500" />
                                    ) : (
                                        <Chevron className="h-5" />
                                    )
                                ) : index === 1 && completed ? (
                                    <Chevron className="h-5" />
                                ) : (
                                    <Lock className="h-5" />
                                )}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ModuleList;
