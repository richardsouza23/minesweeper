
import "./button.css";


export type ButtonProps = {
    label: string,
    onClick: (e:React.MouseEvent<HTMLButtonElement>) => void,
    backgroundColor?: string,
    fontColor?: string
};


export const CustomButton = ({
    label, 
    onClick, 
    backgroundColor = "", 
    fontColor = ""
}: ButtonProps) => {

    return (
        <div className="button-wrapper">
            <button 
                style={{
                    backgroundColor,
                    color: fontColor
                }}
                className="default-button" 
                onClick={onClick}>
                <span>{label}</span>
            </button>
        </div>
    );
};