interface btnProps {
    className?: string;
    btnName?: string;
    onClick?: () => void;
}
const Btn: React.FC<btnProps> = ({
    className = "",
    btnName = "",
    onClick = () => {},
}) => {
    return (
        <button
            onClick={onClick}
            className={`bg-indigo-500 px-6 py-3 hover:bg-indigo-600 rounded-3xl ${className}`}
        >
            {btnName}
        </button>
    );
};

export default Btn;
