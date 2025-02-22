import { useNavigate } from 'react-router-dom';
import { Button, Card } from 'flowbite-react';
import axios from 'axios';
import { useState, useEffect } from 'react';

type Module = { title: string; summary: string };

const HomePage = () => {
    const navigate = useNavigate();
    const [moduleList, setModuleList] = useState<Module[]>([]);
    useEffect(() => {
        axios
            .get(`${__API_PATH__}/modules-list`)
            .then((res) => setModuleList(res.data as Module[]))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="flex flex-col">
            <div className="text-5xl w-screen text-center">Module List</div>
            <div className="flex flex-wrap flex-row justify-center">
                {moduleList.map((element, index) => (
                    <Card className="m-4 w-md">
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {element.title}
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            {element.summary}
                        </p>
                        <Button
                            onClick={() => {
                                if (index === 0) navigate('health-and-safety');
                            }}
                            disabled={index != 0}
                        >
                            Read more
                            <svg
                                className="-mr-1 ml-2 h-4 w-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </Button>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
