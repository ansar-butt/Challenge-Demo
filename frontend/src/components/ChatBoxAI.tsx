const ChatBoxAI = ({
    message,
    loading = false,
}: {
    message?: string;
    loading?: boolean;
}) => {
    return loading ? (
        <div className="flex w-88 h-46 justify-start items-end text-xl p-4">
            <span className="w-2.5 h-2.5 bg-white rounded-full mx-1 animate-bounce"></span>
            <span className="w-2.5 h-2.5 bg-white rounded-full mx-1 animate-bounce [animation-delay:0.3s]"></span>
            <span className="w-2.5 h-2.5 bg-white rounded-full mx-1 animate-bounce [animation-delay:0.6s]"></span>
        </div>
    ) : message ? (
        <div className="border border-gray-300 rounded-md w-80 no-scrollbar h-40 bg-white overflow-auto text-gray-700 p-2 pr-0">
            {message}
        </div>
    ) : (
        <></>
    );
};

export default ChatBoxAI;
