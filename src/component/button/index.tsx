
import "./button.css";


export type ButtonProps = {
    label: string,
    onClick: (e:React.MouseEvent<HTMLButtonElement>) => void,
    backgroundColor?: string,
    fontColor?: string
    minWidth?: string
};


export const CustomButton = ({
    label, 
    onClick, 
    backgroundColor = "", 
    fontColor = "",
    minWidth = ""
}: ButtonProps) => {

    return (
        <div className="button-wrapper">
            <button 
                style={{
                    backgroundColor,
                    color: fontColor,
                    minWidth
                }}
                className="default-button" 
                onClick={onClick}>
                <span>{label}</span>
            </button>
        </div>
    );
};