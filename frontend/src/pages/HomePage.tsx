import { useNavigate } from 'react-router-dom';
import { Button, Card } from 'flowbite-react';
import { useState, useEffect } from 'react';
import { Chevron } from '../assets/SVGs';
import { getModuleList } from '../services/apiServices';

type Module = { title: string; summary: string };

const HomePage = () => {
    const navigate = useNavigate();
    const [moduleList, setModuleList] = useState<Module[]>([]);
    useEffect(() => {
        getModuleList()
            .then((res) => setModuleList(res.data as Module[]))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="flex flex-col mt-4">
            <div className="text-5xl w-screen text-center">Module List</div>
            <div className="flex flex-wrap flex-row justify-center">
                {moduleList.map((element, index) => (
                    <Card className="m-4 w-md" key={index}>
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
                            <Chevron className="h-4" />
                        </Button>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
